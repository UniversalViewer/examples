$(function() {

    var bootstrapper, editor;
    //var uvVersion = 'uv-1.5.26';
    var uvVersion = 'uv';

    function loadViewer() {

        // todo: update embed.js to work with script loaders.
        if (window.initPlayers && window.easyXDM) {
            initPlayers($('.uv'));
        } else {
            setTimeout(loadViewer, 100);
        }
    }

    function loadConfigSchema(cb) {

        var path = uvVersion + '/schema/' + getConfigName() + '.schema.json';

        $.getJSON(path, function (schema) {
            formatSchema(schema);
            cb(schema);
        }).error(function() {
            cb(null);
        });
    }

    function getConfigName(){
        return bootstrapper.config.name + '.' + getLocale();
    }

    function formatSchema(schema){
        collapse(jmespath.search(schema, 'properties.*'));
        collapse(jmespath.search(schema, 'properties.modules.properties.*'));
        hide(jmespath.search(schema, 'properties.[localisation]'));
    }

    function collapse(nodes){
        setOption(nodes, 'collapsed', true);
    }

    function hide(nodes){
        setOption(nodes, 'hidden', true);
    }

    function setOption(nodes, option, value){
        for (var i = 0; i < nodes.length; i++){
            var node = nodes[i];

            if (!node.options){
                node.options = {};
            }

            node.options[option] = value;
        }
    }

    function formatUrl(url) {
        var parts = Utils.Urls.GetUrlParts(location.href);
        return String.format(url, parts.pathname);
    }

    function loadManifests(cb) {

        var manifestsUri = formatUrl('{0}manifests.json');

        // load manifests
        $.getJSON(manifestsUri, function(manifests){

            var $manifestSelect = $('#manifestSelect');

            for (var i = 0; i < manifests.collections.length; i++) {
                var collection = manifests.collections[i];

                if (collection.visible === false) continue;

                $manifestSelect.append('<optgroup label="' + collection.label + '">');

                for (var j = 0; j < collection.manifests.length; j++){
                    var manifest = collection.manifests[j];

                    if (manifest.visible !== false){
                        $manifestSelect.append('<option value="' + manifest['@id'] + '">' + manifest.label + '</option>');
                    }
                }

                $manifestSelect.append('</optgroup>');
            }

            cb();
        });
    }

    function isIE8(){
        return (browserDetect.browser === 'Explorer' && browserDetect.version === 8);
    }

    function createEditor(schema) {

        $('#editor').empty();

        if (isIE8() || typeof(JSONEditor) === 'undefined') {
            return;
        }

        editor = new JSONEditor(document.getElementById('editor'),{
            form_name_root: '',
            theme: 'foundation5',
            iconlib: 'fontawesome4',
            schema: schema,
            disable_edit_json: false,
            disable_properties: true,
            required_by_default: false
        });

        editor.on('change', function() {
            // Get an array of errors from the validator
            var errors = editor.validate();

            // Not valid
            if(errors.length) {
                //console.log(errors);
            }
        });
    }

    function reload() {

        //var jsonp = getJSONPSetting();
        //var testids = $('#testids').is(':checked');
        //var defaultToFullScreen = $('#defaultToFullScreen').is(':checked');
        var manifest = $('#manifest').val();
        var locale = $('#locales').val() || 'en-GB';

        // clear hash params
        clearHashParams();

        var qs = document.location.search.replace('?', '');
        //qs = Utils.Urls.UpdateURIKeyValuePair(qs, 'jsonp', jsonp);
        //qs = Utils.Urls.UpdateURIKeyValuePair(qs, 'testids', testids);
        //qs = Utils.Urls.UpdateURIKeyValuePair(qs, 'defaultToFullScreen', defaultToFullScreen);
        qs = Utils.Urls.UpdateURIKeyValuePair(qs, 'manifest', manifest);
        qs = Utils.Urls.UpdateURIKeyValuePair(qs, 'locale', locale);

        if (window.location.search === '?' + qs){
            window.location.reload();
        } else {
            window.location.search = qs;
        }
    }

    function clearHashParams(){
        document.location.hash = '';
    }

    function getLocale() {
        return getDefaultLocale($('#locales').val());
    }

    function getDefaultLocale(l) {
        var parsed = [];
        var l = l.split(',');

        for (var i = 0; i < l.length; i++) {
            var v = l[i].split(':');
            parsed.push({
                name: v[0],
                label: (v[1]) ? v[1] : ''
            });
        }

        return parsed[0].name;
    }

    function getJSONPSetting() {
        if ($('#jsonp').is(':checked')) {
            return true;
        }
        if ($('#cors').is(':checked')) {
            return false;
        }
        return null;
    }

    function setJSONPEnabled() {

        var jsonp = getJSONPSetting();

        var qs = Utils.Urls.GetQuerystringParameter('jsonp');

        if (qs === 'false'){
            jsonp = false;
        } else if (qs === 'true') {
            jsonp = true;
        }

        if (jsonp === true){
            $('.uv').attr('data-jsonp', 'true');
            $('#jsonp').attr('checked', 'true');
        } else if (jsonp === false){
            $('.uv').attr('data-jsonp', 'false');
            $('#cors').attr('checked', 'true');
        } else {
            $('.uv').removeAttr('data-jsonp');
            $('#cors-or-jsonp-auto').attr('checked', 'true');
        }
    }

    function setSelectedManifest(){

        var manifest = Utils.Urls.GetQuerystringParameter('manifest');

        if (manifest) {
            $('#manifestSelect').val(manifest);
        } else {
            var options = $('#manifestSelect option');

            if (options.length){
                manifest = options[0].value;
            }
        }

        $('#manifest').val(manifest);
        updateDragDrop();

        $('.uv').attr('data-uri', manifest);
    }

    function updateDragDrop(){
        $('#dragndrop').attr('href', location.origin + location.pathname + '?manifest=' + $('#manifest').val());
    }

    // called when the page loads to set the initial data-locale
    function setInitialLocale() {
        var locale = Utils.Urls.GetQuerystringParameter('locale');
        if (locale){
            $('.uv').attr('data-locale', locale);
        }
    }

    // called when the UV loads to set
    // the locale options
    function setSelectedLocale(locale) {
        $('#locale').val(getDefaultLocale(locale));

        $('#locales').val(locale);
    }

    function setTestIds(){
        //var testids = $('#testids').is(':checked');

        var qs = Utils.Urls.GetQuerystringParameter('testids');

        if (qs === 'true') {
            createTestIds();
            $('#testids').attr('checked', 'true');
        } else {
            $('#testids').removeAttr('checked');
        }
    }

    function setDefaultToFullScreen(){
        var defaultToFullScreen = $('#defaultToFullScreen').is(':checked');

        var qs = Utils.Urls.GetQuerystringParameter('defaultToFullScreen');

        if (qs === 'true') {
            $('.uv').attr('data-fullscreen', true);
            $('#defaultToFullScreen').attr('checked', 'true');
        } else {
            $('.uv').removeAttr('data-fullscreen');
            $('#defaultToFullScreen').removeAttr('checked');
        }
    }

    function openEditor() {
        var configName = getConfigName();
        var configDisplayName = configName;

        var sessionConfig = sessionStorage.getItem(configName);

        if (sessionConfig){
            config = JSON.parse(sessionConfig);
            configDisplayName += '*';
            $('.config-name').text('(' + configDisplayName + ')');
            showEditor();
            editor.setValue(config);
        } else {

            var root = '';

            if (isLocalhost || isGithub){
                root = '/examples/';
            }

            $.getJSON(root + uvVersion + '/lib/' + configName + '.config.json', function(config){
                $('.config-name').text('(' + configDisplayName + ')');
                showEditor();
                editor.setValue(config);
            });
        }
    }

    function showEditor() {
        $('#editPnl').swapClass('hide', 'show');
        $('#saveBtn').swapClass('hide', 'show');
        $('#resetBtn').swapClass('show', 'hide');
        $('#editBtn').swapClass('show', 'hide');
        $('#closeBtn').swapClass('hide', 'show');
    }

    function closeEditor() {
        $('.config-name').empty();
        $('#editPnl').swapClass('show', 'hide');
        $('#saveBtn').swapClass('show', 'hide');
        $('#resetBtn').swapClass('hide', 'show');
        $('#editBtn').swapClass('hide', 'show');
        $('#closeBtn').swapClass('show', 'hide');
    }

    function uvEventHandlers() {

        $(document).bind('uv.onAcceptTerms', function (event, obj) {
            console.log('uv.onAcceptTerms');
        });

        $(document).bind('uv.onAuthorizationOccurred', function (event, obj) {
            console.log('uv.onAuthorizationOccurred');
        });

        $(document).bind('uv.onBookmark', function (event, obj) {
            console.log('uv.onBookmark', obj);
        });

        $(document).bind('uv.onCanvasIndexChangeFailed', function (event, obj) {
            console.log('uv.onCanvasIndexChangeFailed');
        });

        $(document).bind('uv.onCanvasIndexChanged', function (event, obj) {
            console.log('uv.onCanvasIndexChanged', obj);
        });

        $(document).bind('uv.onClickthroughOccurred', function (event, obj) {
            console.log('uv.onClickthroughOccurred');
        });

        $(document).bind('uv.onCloseActiveDialogue', function (event, obj) {
            console.log('uv.onCloseActiveDialogue');
        });

        $(document).bind('uv.onCloseLeftPanel', function (event, obj) {
            console.log('uv.onCloseLeftPanel');
        });

        $(document).bind('uv.onCloseRightPanel', function (event, obj) {
            console.log('uv.onCloseRightPanel');
        });

        $(document).bind('uv.onCreated', function (event, obj) {
            console.log('uv.onCreated');
            setTestIds();
        });

        $(document).bind('uv.onDownArrow', function (event, obj) {
            console.log('uv.onDownArrow');
        });

        $(document).bind('uv.onDownload', function (event, obj) {
            console.log('uv.onDownload', obj);
        });

        $(document).bind('uv.onDrop', function (event, manifestUri) {
            console.log('uv.drop: ' + manifestUri);
            clearHashParams();
        });

        $(document).bind('uv.onEnd', function (event, obj) {
            console.log('uv.onEnd');
        });

        $(document).bind('uv.onEscape', function (event, obj) {
            console.log('uv.onEscape');
        });

        $(document).bind('uv.onExternalLinkClicked', function (event, obj) {
            console.log('uv.onExternalLinkClicked', obj);
        });

        $(document).bind('uv.onHideClickthroughDialogue', function (event, obj) {
            console.log('uv.onHideClickthroughDialogue');
        });

        $(document).bind('uv.onHideDownloadDialogue', function (event, obj) {
            console.log('uv.onHideDownloadDialogue');
        });

        $(document).bind('uv.onHideEmbedDialogue', function (event, obj) {
            console.log('uv.onHideEmbedDialogue');
        });

        $(document).bind('uv.onHideExternalContentDialogue', function (event, obj) {
            console.log('uv.onHideExternalContentDialogue');
        });

        $(document).bind('uv.onHideGenericDialogue', function (event, obj) {
            console.log('uv.onHideGenericDialogue');
        });

        $(document).bind('uv.onHideInformation', function (event, obj) {
            console.log('uv.onHideInformation');
        });

        $(document).bind('uv.onHideOverlay', function (event, obj) {
            console.log('uv.onHideOverlay');
        });

        $(document).bind('uv.onHideSettingsDialogue', function (event, obj) {
            // uv uses onHideOverlay
            console.log('uv.onHideSettingsDialogue');
        });

        $(document).bind('uv.onHome', function (event, obj) {
            console.log('uv.onHome');
        });

        $(document).bind('uv.onLeftArrow', function (event, obj) {
            console.log('uv.onLeftArrow');
        });

        $(document).bind('uv.onLeftPanelCollapseFullFinish', function (event, obj) {
            console.log('uv.onLeftPanelCollapseFullFinish');
        });

        $(document).bind('uv.onLeftPanelCollapseFullStart', function (event, obj) {
            console.log('uv.onLeftPanelCollapseFullStart');
        });

        $(document).bind('uv.onLeftPanelExpandFullFinish', function (event, obj) {
            console.log('uv.onLeftPanelExpandFullFinish');
        });

        $(document).bind('uv.onLeftPanelExpandFullStart', function (event, obj) {
            console.log('uv.onLeftPanelExpandFullStart');
        });

        $(document).bind('uv.onLoad', function (event, obj) {

            console.log('uv.onLoad', obj);

            closeEditor();

            bootstrapper = obj.bootstrapper;
            var locales = bootstrapper.config.localisation.locales;

            $('#locale').empty();

            for (var i = 0; i < locales.length; i++){
                var l = locales[i];
                $('#locale').append('<option value="' + l.name + '">' + l.label + '</option>');
            }

            setSelectedLocale(bootstrapper.params.locale);

            loadConfigSchema(function(schema) {
                if (schema){
                    createEditor(schema);
                    if (!isIE8()) {
                        $('#configEditor').show();
                    }
                }
                $('footer').show();
            });
        });

        $(document).bind('uv.onNotFound', function (event, obj) {
            console.log('uv.onNotFound');
        });

        $(document).bind('uv.onMinus', function (event, obj) {
            console.log('uv.onMinus');
        });

        $(document).bind('uv.onOpenLeftPanel', function (event, obj) {
            console.log('uv.onOpenLeftPanel');
        });

        $(document).bind('uv.onOpenExternalResource', function (event, obj) {
            console.log('uv.onOpenExternalResource');
        });

        $(document).bind('uv.onOpenRightPanel', function (event, obj) {
            console.log('uv.onOpenRightPanel');
        });

        $(document).bind('uv.onPageDown', function (event, obj) {
            console.log('uv.onPageDown');
        });

        $(document).bind('uv.onPageUp', function (event, obj) {
            console.log('uv.onPageUp');
        });

        $(document).bind('uv.onPlus', function (event, obj) {
            console.log('uv.onPlus');
        });

        $(document).bind('uv.onRedirect', function (event, obj) {
            console.log('uv.onRedirect');
        });

        $(document).bind('uv.onRefresh', function (event, obj) {
            console.log('uv.onRefresh');
        });

        $(document).bind('uv.onResourceDegraded', function (event, obj) {
            console.log('uv.onResourceDegraded');
        });

        $(document).bind('uv.onReturn', function (event, obj) {
            console.log('uv.onReturn');
        });

        $(document).bind('uv.onRightArrow', function (event, obj) {
            console.log('uv.onRightArrow');
        });

        $(document).bind('uv.onRightPanelCollapseFullFinish', function (event, obj) {
            console.log('uv.onRightPanelCollapseFullFinish');
        });

        $(document).bind('uv.onRightPanelCollapseFullStart', function (event, obj) {
            console.log('uv.onRightPanelCollapseFullStart');
        });

        $(document).bind('uv.onRightPanelExpandFullFinish', function (event, obj) {
            console.log('uv.onRightPanelExpandFullFinish');
        });

        $(document).bind('uv.onRightPanelExpandFullStart', function (event, obj) {
            console.log('uv.onRightPanelExpandFullStart');
        });

        $(document).bind('uv.onSequenceIndexChanged', function (event, sequenceIndex) {
            console.log('uv.onSequenceIndexChanged: ' + sequenceIndex);
        });

        $(document).bind('uv.onSettingsChanged', function (event, settings) {
            console.log('uv.onSettingsChanged', settings);
        });

        $(document).bind('uv.onShowClickThroughDialogue', function (event, obj) {
            console.log('uv.onShowClickThroughDialogue');
        });

        $(document).bind('uv.onShowDownloadDialogue', function (event, obj) {
            console.log('uv.onShowDownloadDialogue');
        });

        $(document).bind('uv.onShowEmbedDialogue', function (event, obj) {
            console.log('uv.onShowEmbedDialogue');
        });

        $(document).bind('uv.onShowExternalContentDialogue', function (event, obj) {
            console.log('uv.onShowExternalContentDialogue');
        });

        $(document).bind('uv.onShowGenericDialogue', function (event, obj) {
            console.log('uv.onShowGenericDialogue');
        });

        $(document).bind('uv.onShowHelpDialogue', function (event, obj) {
            console.log('uv.onShowHelpDialogue');
        });

        $(document).bind('uv.onShowInformation', function (event, obj) {
            console.log('uv.onShowInformation');
        });

        $(document).bind('uv.onShowLoginDialogue', function (event, obj) {
            console.log('uv.onShowLoginDialogue');
        });

        $(document).bind('uv.onShowOverlay', function (event, obj) {
            console.log('uv.onShowOverlay');
        });

        $(document).bind('uv.onShowSettingsDialogue', function (event, obj) {
            console.log('uv.onShowSettingsDialogue');
        });

        $(document).bind('uv.onThumbSelected', function (event, obj) {
            console.log('uv.onThumbSelected');
        });

        $(document).bind('uv.onToggleFullScreen', function (event, obj) {
            console.log('uv.onToggleFullScreen', obj.isFullScreen);
        });

        $(document).bind('uv.onUpArrow', function (event, obj) {
            console.log('uv.onUpArrow');
        });

        $(document).bind('uv.onUpdateSettings', function (event, obj) {
            console.log('uv.onUpdateSettings');
        });

        $(document).bind('uv.onViewFullTerms', function (event, obj) {
            console.log('uv.onViewFullTerms');
        });

        $(document).bind('uv.onWindowUnload', function (event, obj) {
            console.log('uv.onWindowUnload');
        });

        $(document).bind('seadragonExtension.onClearSearch', function (event, obj) {
            console.log('seadragonExtension.onClearSearch');
        });

        $(document).bind('seadragonExtension.onCurrentViewUri', function (event, obj) {
            console.log('seadragonExtension.onCurrentViewUri');
        });

        $(document).bind('seadragonExtension.onDownloadCurrentView', function (event, obj) {
            console.log('seadragonExtension.onDownloadCurrentView');
        });

        $(document).bind('seadragonExtension.onDownloadWholeImageHighRes', function (event, obj) {
            console.log('seadragonExtension.onDownloadWholeImageHighRes');
        });

        $(document).bind('seadragonExtension.onDownloadWholeImageLowRes', function (event, obj) {
            console.log('seadragonExtension.onDownloadWholeImageLowRes');
        });

        $(document).bind('seadragonExtension.onDownloadEntireDocumentAsPDF', function (event, obj) {
            console.log('seadragonExtension.onDownloadEntireDocumentAsPDF');
        });

        $(document).bind('seadragonExtension.onDownloadEntireDocumentAsText', function (event, obj) {
            console.log('seadragonExtension.onDownloadEntireDocumentAsText');
        });

        $(document).bind('seadragonExtension.onFirst', function (event, obj) {
            console.log('seadragonExtension.onFirst');
        });

        $(document).bind('seadragonExtension.onGalleryThumbSelected', function (event, obj) {
            console.log('seadragonExtension.onGalleryThumbSelected');
        });

        $(document).bind('seadragonExtension.onImageSearch', function (event, obj) {
            console.log('seadragonExtension.onImageSearch');
        });

        $(document).bind('seadragonExtension.onLast', function (event, obj) {
            console.log('seadragonExtension.onLast');
        });

        $(document).bind('seadragonExtension.onModeChanged', function (event, obj) {
            console.log('seadragonExtension.onModeChanged', obj);
        });

        $(document).bind('seadragonExtension.onNext', function (event, obj) {
            console.log('seadragonExtension.onNext');
        });

        $(document).bind('seadragonExtension.onNextSearchResult', function (event, obj) {
            console.log('seadragonExtension.onNextSearchResult');
        });

        $(document).bind('seadragonExtension.onOpenThumbsView', function (event, obj) {
            console.log('seadragonExtension.onOpenThumbsView');
        });

        $(document).bind('seadragonExtension.onOpenTreeView', function (event, obj) {
            console.log('seadragonExtension.onOpenTreeView');
        });

        $(document).bind('seadragonExtension.onPageSearch', function (event, obj) {
            console.log('seadragonExtension.onPageSearch');
        });

        $(document).bind('seadragonExtension.onPrev', function (event, obj) {
            console.log('seadragonExtension.onPrev');
        });

        $(document).bind('seadragonExtension.onPrevSearchResult', function (event, obj) {
            console.log('seadragonExtension.onPrevSearchResult');
        });

        $(document).bind('seadragonExtension.onAnimation', function (event, obj) {
            console.log('seadragonExtension.onAnimation');
        });

        $(document).bind('seadragonExtension.onAnimationfinish', function (event, obj) {
            console.log('seadragonExtension.onAnimationfinish');
        });

        $(document).bind('seadragonExtension.onAnimationStart', function (event, obj) {
            console.log('seadragonExtension.onAnimationStart');
        });

        $(document).bind('seadragonExtension.onOpen', function (event, obj) {
            console.log('seadragonExtension.onOpen');
        });

        $(document).bind('seadragonExtension.onSearchPreviewStart', function (event, obj) {
            console.log('seadragonExtension.onSearchPreviewStart');
        });

        $(document).bind('seadragonExtension.onSearchPreviewFinish', function (event, obj) {
            console.log('seadragonExtension.onSearchPreviewFinish');
        });

        $(document).bind('seadragonExtension.onRotation', function (event, obj) {
            console.log('seadragonExtension.onRotation');
        });

        $(document).bind('seadragonExtension.onSearch', function (event, obj) {
            console.log('seadragonExtension.onSearch', obj);
        });

        $(document).bind('seadragonExtension.onSearchResults', function (event, obj) {
            console.log('seadragonExtension.onSearchResults', obj);
        });

        $(document).bind('seadragonExtension.onSearchResultsEmpty', function (event, obj) {
            console.log('seadragonExtension.onSearchResultsEmpty');
        });

        $(document).bind('seadragonExtension.onTreeNodeSelected', function (event, obj) {
            console.log('seadragonExtension.onTreeNodeSelected', obj);
        });

        $(document).bind('seadragonExtension.onViewPage', function (event, obj) {
            console.log('seadragonExtension.onViewPage', obj);
        });

        $(document).bind('seadragonExtension.onCurrentViewUri', function (event, obj) {
            console.log('seadragonExtension.onCurrentViewUri', obj);
        });

        $(document).bind('mediaelementExtension.onMediaEnded', function (event, obj) {
            console.log('mediaelementExtension.onMediaEnded');
        });

        $(document).bind('mediaelementExtension.onMediaPaused', function (event, obj) {
            console.log('mediaelementExtension.onMediaPaused');
        });

        $(document).bind('mediaelementExtension.onMediaPlayed', function (event, obj) {
            console.log('mediaelementExtension.onMediaPlayed');
        });
    }

    function init() {
        if (isLocalhost){
            if (!scriptIncluded) $('body').append('<script type="text/javascript" id="embedUV" src="/src/lib/embed.js"><\/script>');
        } else {
            // built version

            if (!isGithub){
                // remove '/examples' from paths
                $('.uv').updateAttr('data-config', '/examples/', '/');

                $('.uv').updateAttr('data-uri', '/examples/', '/');

                $('#locale option').each(function() {
                    $(this).updateAttr('value', '/examples/', '/');
                });

                $('#manifestSelect option').each(function() {
                    $(this).updateAttr('value', '/examples/', '/');
                });
            }

            $('body').append('<script type="text/javascript" id="embedUV" src="' + uvVersion + '/lib/embed.js"><\/script>');
        }

        $('#setOptionsBtn').on('click', function(e){
            e.preventDefault();
            reload();
        });

        $('#manifestSelect').on('change', function(){
            $('#manifest').val($('#manifestSelect option:selected').val());
            updateDragDrop();
        });

        $('#manifest').click(function() {
            $(this).select();
        });

        $('#manifest').keypress(function(e) {
            if(e.which === 13) {
                reload();
            }
        });

        $('#setManifestBtn').on('click', function(e){
            e.preventDefault();
            reload();
        });

        $('#locale').on('change', function(){
            $('#locales').val($('#locale option:selected').val());
        });

        $('#setLocalesBtn').on('click', function(e){
            e.preventDefault();
            reload();
        });

        $('#resetLocalesBtn').on('click', function(e){
            e.preventDefault();
            $('#locale').text('');
            $('.uv').removeAttr('data-locale');
            reload();
        });

        $('#editBtn').on('click', function(e) {
            e.preventDefault();

            openEditor();
        });

        $('#closeBtn').on('click', function(e) {
            e.preventDefault();

            closeEditor();
        });

        $('#saveBtn').on('click', function(e) {
            e.preventDefault();

            var errors = editor.validate();

            if(errors.length) {
                //console.log(errors);
                return;
            }

            // save contents of #json to session storage
            sessionStorage.setItem(getConfigName(), JSON.stringify(editor.getValue()));

            reload();
        });

        $('#resetBtn').on('click', function(e){
            e.preventDefault();

            sessionStorage.clear();

            reload();
        });

        uvEventHandlers();

        setJSONPEnabled();

        if ($('#manifestSelect option').length || $('#manifestSelect optgroup').length){
            setSelectedManifest();
        }

        setInitialLocale();
        setDefaultToFullScreen();
        loadViewer();
    }

    var isLocalhost = document.location.href.indexOf('localhost') != -1;
    var isGithub = document.location.href.indexOf('github') != -1;

    // if the embed script has been included in the page for testing, don't append it.
    var scriptIncluded = $('#embedUV').length;

    loadManifests(function() {
        init();
    });
});