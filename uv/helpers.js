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

    window.addEventListener('resize', function() {
        resize();
    });

    uv = new UV({
        target: $uv[0],
        data: data
    });

    uv.on('create', function(obj) {
        resize();
    }, false);

    uv.on('created', function(obj) {
       resize();
    }, false);

    uv.on('pause', function(currentTime) {
        if (currentTime > 0) {
            dataProvider.set('t', currentTime);
        }
    }, false);

    uv.on('collectionIndexChanged', function(collectionIndex) {
        dataProvider.set('c', collectionIndex);
    }, false);

    uv.on('manifestIndexChanged', function(manifestIndex) {
        dataProvider.set('m', manifestIndex);
    }, false);

    uv.on('sequenceIndexChanged', function(sequenceIndex) {
        dataProvider.set('s', sequenceIndex);
    }, false);

    uv.on('canvasIndexChanged', function(canvasIndex) {
        dataProvider.set('cv', canvasIndex);
    }, false);

    uv.on('rangeChanged', function(rangeId) {
        dataProvider.set('rid', rangeId);
    }, false);

    uv.on('openseadragonExtension.rotationChanged', function(rotation) {
        dataProvider.set('r', rotation);
    }, false);

    uv.on('openseadragonExtension.xywhChanged', function(xywh) {
        dataProvider.set('xywh', xywh);
    }, false);

    uv.on('openseadragonExtension.currentViewUri', function(data) {
        //console.log('openseadragonExtension.currentViewUri', obj);
    }, false);

    uv.on('ebookExtension.cfiFragmentChanged', function(cfi) {
        dataProvider.set('cfi', cfi);
    }, false);

    uv.on('reload', function(data) {
        data.isReload = true;
        uv.set(data);
    }, false);

    uv.on('toggleFullScreen', function(data) {
        isFullScreen = data.isFullScreen;

        if (data.overrideFullScreen) {
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
    }, false);

    uv.on('error', function(message) {
        console.error(message);
    }, false);

    uv.on('bookmark', function(data) {

        var absUri = parent.document.URL;
        var parts = Utils.Urls.getUrlParts(absUri);
        var relUri = parts.pathname + parts.search + parent.document.location.hash;

        if (!relUri.startsWith("/")) {
            relUri = "/" + relUri;
        }

        data.path = relUri;

        console.log('bookmark', data);
    },false);

    $(document).on('fullscreenchange webkitfullscreenchange mozfullscreenchange MSFullscreenChange', function(e) {
        if (e.type === 'webkitfullscreenchange' && !document.webkitIsFullScreen ||
        e.type === 'fullscreenchange' && !document.fullscreenElement ||
        e.type === 'mozfullscreenchange' && !document.mozFullScreen ||
        e.type === 'MSFullscreenChange' && document.msFullscreenElement === null) {
            uv.exitFullScreen();
            resize();
        }
    });

    return uv;
}

function getRequestFullScreen(elem) {

    if (elem.webkitRequestFullscreen) {
        return elem.webkitRequestFullscreen;
    }

    if (elem.mozRequestFullScreen) {
        return elem.mozRequestFullScreen;
    }

    if (elem.msRequestFullscreen) {
        return elem.msRequestFullscreen;
    } 

    if (elem.requestFullscreen) {
        return elem.requestFullscreen;
    }

    return false;
}

function getExitFullScreen() {

    if (document.webkitExitFullscreen) {
        return document.webkitExitFullscreen;
    }
    
    if (document.msExitFullscreen) {
        return document.msExitFullscreen;
    }
    
    if (document.mozCancelFullScreen) {
        return document.mozCancelFullScreen;
    }

    if (document.exitFullscreen) {
        return document.exitFullscreen;
    }

    return false;
}