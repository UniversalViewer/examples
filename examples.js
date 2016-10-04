$(function() {

    var bootstrapper, editor;
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
        var parts = Utils.Urls.getUrlParts(location.href);
        var pathname = parts.pathname;
        if (!pathname.startsWith('/')){
            pathname = '/' + pathname;
        }
        return String.format(url, pathname);
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
        qs = Utils.Urls.updateURIKeyValuePair(qs, 'manifest', manifest);
        qs = Utils.Urls.updateURIKeyValuePair(qs, 'locale', locale);

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

        var qs = Utils.Urls.getQuerystringParameter('jsonp');

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

        var manifest = Utils.Urls.getQuerystringParameter('manifest');

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
        var locale = Utils.Urls.getQuerystringParameter('locale');
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

        var qs = Utils.Urls.getQuerystringParameter('testids');

        if (qs === 'true') {
            createTestIds();
            $('#testids').attr('checked', 'true');
        } else {
            $('#testids').removeAttr('checked');
        }
    }

    function setDefaultToFullScreen(){
        var defaultToFullScreen = $('#defaultToFullScreen').is(':checked');

        var qs = Utils.Urls.getQuerystringParameter('defaultToFullScreen');

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

        $(document).bind('uv.onCreated', function (event, obj) {
            setTestIds();
        });

        $(document).bind('uv.onDrop', function (event, manifestUri) {
            clearHashParams();
        });

        $(document).bind('uv.onLoad', function (event, obj) {

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

            // if(errors.length) {
            //     //console.log(errors);
            //     return;
            // }

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
        //setDefaultToFullScreen();
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