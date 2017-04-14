function createUV(selector, data, dataProvider) {
    var uv;
    var isFullScreen = false;
    var $container = $(selector);
    $container.empty();
    var $parent = $('<div></div>');
    $container.append($parent);
    var $uv = $('<div></div>');
    $parent.append($uv);

    function resize() {
        if (uv) {
            if (isFullScreen) {
                $parent.width(window.innerWidth);
                $parent.height(window.innerHeight);
            } else {
                $parent.width($container.width());
                $parent.height($container.height());
            }
            uv.resize();
        }
    }

    window.onresize = function() {
        resize();
    }

    uv = new UV({
        target: $uv[0],
        data: data
    });

    uv.on('create', function(obj) {
        resize();
    });

    uv.on('created', function(obj) {
       
    });

    uv.on('collectionIndexChanged', function(index) {
        dataProvider.set('c', index);
    });

    uv.on('manifestIndexChanged', function(index) {
        dataProvider.set('m', index);
    });

    uv.on('sequenceIndexChanged', function(index) {
        dataProvider.set('s', index);
    });

    uv.on('canvasIndexChanged', function(index) {
        dataProvider.set('cv', index);
    });

    uv.on('openseadragonExtension.rotationChanged', function(rotation) {
        dataProvider.set('r', rotation);
    });

    uv.on('openseadragonExtension.xywhChanged', function(xywh) {
        dataProvider.set('xywh', xywh);
    });

    uv.on('openseadragonExtension.currentViewUri', function(obj) {
        //console.log('openseadragonExtension.currentViewUri', obj);
    });

    // todo: this should be how the UV is resetting
    // until BaseComponent more closely matches svelte, recreate the component
    // uv.on('reload', function(data) {
    //     data.isReload = true;
    //     uv.set(data);
    // });

    uv.on('toggleFullScreen', function(obj) {
        isFullScreen = obj.isFullScreen;

        if (obj.overrideFullScreen) {
            return;
        }

        var elem = $parent[0];

        if (isFullScreen) {
            var requestFullScreen = getRequestFullScreen(elem);
            if (requestFullScreen) {
                requestFullScreen.call(elem);
                resize();
            }
        } else {
            var exitFullScreen = getExitFullScreen();
            if (exitFullScreen) {
                exitFullScreen.call(document);
                resize();
            }
        }
    });

    uv.on('error', function(message) {
        console.error(message);
    });

    uv.on('bookmark', function(bookmark) {

        var absUri = parent.document.URL;
        var parts = Utils.Urls.getUrlParts(absUri);
        var relUri = parts.pathname + parts.search + parent.document.location.hash;

        if (!relUri.startsWith("/")) {
            relUri = "/" + relUri;
        }

        bookmark.path = relUri;

        console.log('bookmark', bookmark);
    });

    $(document).on('fullscreenchange webkitfullscreenchange mozfullscreenchange MSFullscreenChange', function(e) {
        if (e.type === 'webkitfullscreenchange' && !document.webkitIsFullScreen ||
        e.type === 'mozfullscreenchange' && !document.mozFullScreen ||
        e.type === 'MSFullscreenChange' && document.msFullscreenElement === null) {
            uv.exitFullScreen();
        }
    });

    return uv;
}

function getRequestFullScreen(elem) {

    if (elem.requestFullscreen) {
        return elem.requestFullscreen;
    } else if (elem.msRequestFullscreen) {
        return elem.msRequestFullscreen;
    } else if (elem.mozRequestFullScreen) {
        return elem.mozRequestFullScreen;
    } else if (elem.webkitRequestFullscreen) {
        return elem.webkitRequestFullscreen;
    }
    return false;
}

function getExitFullScreen() {

    if (document.exitFullscreen) {
        return document.exitFullscreen;
    } else if (document.msExitFullscreen) {
        return document.msExitFullscreen;
    } else if (document.mozCancelFullScreen) {
        return document.mozCancelFullScreen;
    } else if (document.webkitExitFullscreen) {
        return document.webkitExitFullscreen;
    }
    return false;
}