
$(function(){

    var testBuild = getQuerystringParameter("build");
    var isLocalhost = document.location.href.indexOf('localhost') != -1;

    if (testBuild){
        $("body").append('<script type="text/javascript" id="embedUV" src="/build/uv-1.0.31/js/embed.js"><\/script>');
    } else {
        if (isLocalhost){
            $("body").append('<script type="text/javascript" id="embedUV" src="/src/js/embed.js"><\/script>');
        } else {
            // built version

            // remove '/examples' from paths
            $('.uv').updateAttr('data-config', '/examples/', '/');

            $('.uv').updateAttr('data-uri', '/examples/', '/');

            $("body").append('<script type="text/javascript" id="embedUV" src="/build/uv-1.0.31/js/embed.js"><\/script>');
        }
    }

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

    function setSelectedManifest(){

        var manifest = getQuerystringParameter("manifest");

        if (manifest) {
            $('.uv').attr('data-uri', manifest);
        }
    }

    function isIE8(){
        return (browserDetect.browser === "Explorer" && browserDetect.version === 8);
    }

    // test overrideFullScreen option
    $(document).bind("onToggleFullScreen", function (event, isFullScreen) {
        console.log('full screen: ' + isFullScreen);
    });

    // test currentViewUri event
    $(document).bind("onCurrentViewUri", function (event, obj) {
        console.log(obj);
    });

    $(document).bind("onLoad", function (event, obj) {

    });
});