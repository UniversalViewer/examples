
$(function(){

    var testBuild = getQuerystringParameter("build");
    var isLocalhost = document.location.href.indexOf('localhost') != -1;

    if (testBuild){
        $("body").append('<script type="text/javascript" id="embedUV" src="/build/uv-1.0.35/js/embed.js"><\/script>');
    } else {
        if (isLocalhost){
            $("body").append('<script type="text/javascript" id="embedUV" src="/src/js/embed.js"><\/script>');
        } else {
            // built version

            // remove '/examples' from paths
            $('.uv').updateAttr('data-config', '/examples/', '/');

            $('.uv').updateAttr('data-uri', '/examples/', '/');

            $("body").append('<script type="text/javascript" id="embedUV" src="/build/uv-1.0.35/js/embed.js"><\/script>');
        }
    }

    setJSONPEnabled();
    setSelectedManifest();
    loadViewer();

    function loadViewer() {

        // todo: update embed.js to work with script loaders.
        if (window.initPlayers && window.easyXDM){
            initPlayers($('.uv'));
        } else {
            setTimeout(loadViewer, 100);
        }

    }

    function setJSONPEnabled() {

        var qs = getQuerystringParameter("jsonp");

        if (qs === 'false'){
            $('.uv').removeAttr('data-jsonp');
        } else if (qs === 'true') {
            $('.uv').attr('data-jsonp', 'true');
        }

    }

    function setSelectedManifest(){

        var manifest = getQuerystringParameter("manifest");

        if (!manifest) {
            manifest = $('.links a').first().prop('href');
            manifest = manifest.substring(manifest.indexOf('manifest=') + 9);
        }

        $('.uv').attr('data-uri', manifest);
    }

    function isIE8(){
        return (browserDetect.browser === "Explorer" && browserDetect.version === 8);
    }

    // test overrideFullScreen option
    $(document).bind("uv.onToggleFullScreen", function (event, isFullScreen) {
        console.log('full screen: ' + isFullScreen);
    });

    $(document).bind("uv.onSequenceIndexChanged", function (event, isFullScreen) {

    });

    // test currentViewUri event
    $(document).bind("uv.onCurrentViewUri", function (event, obj) {

    });

    $(document).bind("uv.onLoad", function (event, obj) {

    });

    $(document).bind("uv.onCreated", function (event, obj) {
        setTestIds();
    });
});