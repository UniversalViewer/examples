// generated with http://jsonschema.net
// todo: look at using typson to generate this from a ts definition file: https://github.com/lbovet/typson
schema = {
    "$schema": "http://json-schema.org/draft-04/schema#",
    "id": "https://github.com/UniversalViewer/universalviewer",
    "type": "object",
    "properties": {
        "extends": {
            "id": "extends",
            "type": "string",
            "options": {
                "hidden": true
            }
        },
        "localisation": {
            "id": "localisation",
            "type": "object",
            "options": {
                "hidden": true
            },
            "properties": {
                "label": {
                    "id": "label",
                    "type": "string"
                },
                "locales": {
                    "id": "locales",
                    "type": "array"
                }
            }
        },
        "options": {
            "id": "options",
            "type": "object",
            "options": {
                "collapsed": true
            },
            "properties": {
                "theme": {
                    "id": "theme",
                    "type": "string"
                },
                "leftPanelEnabled": {
                    "id": "leftPanelEnabled",
                    "type": "boolean"
                },
                "rightPanelEnabled": {
                    "id": "rightPanelEnabled",
                    "type": "boolean"
                },
                "overrideFullScreen": {
                    "id": "overrideFullScreen",
                    "type": "boolean"
                },
                "pagingEnabled": {
                    "id": "pagingEnabled",
                    "type": "boolean"
                },
                "preserveViewport": {
                    "id": "preserveViewport",
                    "type": "boolean"
                },
                "searchWithinEnabled": {
                    "id": "searchWithinEnabled",
                    "type": "boolean"
                }
            }
        },
        "content": {
            "id": "content",
            "type": "object",
            "options": {
                "collapsed": true
            },
            "properties": {
                "canvasIndexOutOfRange": {
                    "id": "canvasIndexOutOfRange",
                    "type": "string"
                }
            }
        },
        "modules": {
            "id": "modules",
            "type": "object",
            "options": {
                "collapsed": true
            },
            "properties": {
                "dialogue": {
                    "id": "dialogue",
                    "type": "object",
                    "options": {
                        "collapsed": true
                    },
                    "properties": {
                        "content": {
                            "id": "content",
                            "type": "object",
                            "properties": {
                                "close": {
                                    "id": "close",
                                    "type": "string"
                                }
                            }
                        }
                    }
                },
                "genericDialogue": {
                    "id": "genericDialogue",
                    "type": "object",
                    "options": {
                        "collapsed": true
                    },
                    "properties": {
                        "content": {
                            "id": "content",
                            "type": "object",
                            "properties": {
                                "emptyValue": {
                                    "id": "emptyValue",
                                    "type": "string"
                                },
                                "pageNotFound": {
                                    "id": "pageNotFound",
                                    "type": "string"
                                },
                                "ok": {
                                    "id": "ok",
                                    "type": "string"
                                },
                                "refresh": {
                                    "id": "refresh",
                                    "type": "string"
                                },
                                "invalidNumber": {
                                    "id": "invalidNumber",
                                    "type": "string"
                                }
                            }
                        }
                    }
                },
                "helpDialogue": {
                    "id": "helpDialogue",
                    "type": "object",
                    "options": {
                        "collapsed": true
                    },
                    "properties": {
                        "content": {
                            "id": "content",
                            "type": "object",
                            "properties": {
                                "title": {
                                    "id": "title",
                                    "type": "string"
                                },
                                "text": {
                                    "id": "text",
                                    "type": "string"
                                }
                            }
                        }
                    }
                },
                "settingsDialogue": {
                    "id": "settingsDialogue",
                    "type": "object",
                    "options": {
                        "collapsed": true
                    },
                    "properties": {
                        "content": {
                            "id": "content",
                            "type": "object",
                            "properties": {
                                "title": {
                                    "id": "title",
                                    "type": "string"
                                },
                                "pagingEnabled": {
                                    "id": "pagingEnabled",
                                    "type": "string"
                                },
                                "locale": {
                                    "id": "locale",
                                    "type": "string"
                                },
                                "preserveViewport": {
                                    "id": "preserveViewport",
                                    "type": "string"
                                }
                            }
                        }
                    }
                },
                "embedDialogue": {
                    "id": "embedDialogue",
                    "type": "object",
                    "options": {
                        "collapsed": true
                    },
                    "properties": {
                        "options": {
                            "id": "options",
                            "type": "object",
                            "properties": {
                                "embedTemplate": {
                                    "id": "embedTemplate",
                                    "type": "string"
                                }
                            }
                        },
                        "content": {
                            "id": "content",
                            "type": "object",
                            "properties": {
                                "title": {
                                    "id": "title",
                                    "type": "string"
                                },
                                "instructions": {
                                    "id": "instructions",
                                    "type": "string"
                                },
                                "width": {
                                    "id": "width",
                                    "type": "string"
                                },
                                "height": {
                                    "id": "height",
                                    "type": "string"
                                },
                                "customSize": {
                                    "id": "customSize",
                                    "type": "string"
                                }
                            }
                        }
                    }
                },
                "downloadDialogue": {
                    "id": "downloadDialogue",
                    "type": "object",
                    "options": {
                        "collapsed": true
                    },
                    "properties": {
                        "options": {
                            "id": "options",
                            "type": "object",
                            "properties": {
                                "confinedImageSize": {
                                    "id": "confinedImageSize",
                                    "type": "number"
                                }
                            }
                        },
                        "content": {
                            "id": "content",
                            "type": "object",
                            "properties": {
                                "title": {
                                    "id": "title",
                                    "type": "string"
                                },
                                "currentViewAsJpg": {
                                    "id": "currentViewAsJpg",
                                    "type": "string"
                                },
                                "wholeImageHighResAsJpg": {
                                    "id": "wholeImageHighResAsJpg",
                                    "type": "string"
                                },
                                "wholeImageLowResAsJpg": {
                                    "id": "wholeImageLowResAsJpg",
                                    "type": "string"
                                },
                                "entireDocumentAsPdf": {
                                    "id": "entireDocumentAsPdf",
                                    "type": "string"
                                },
                                "entireFileAsOriginal": {
                                    "id": "entireFileAsOriginal",
                                    "type": "string"
                                },
                                "preview": {
                                    "id": "preview",
                                    "type": "string"
                                },
                                "download": {
                                    "id": "download",
                                    "type": "string"
                                }
                            }
                        }
                    }
                },
                "pagingHeaderPanel": {
                    "id": "pagingHeaderPanel",
                    "type": "object",
                    "options": {
                        "collapsed": true
                    },
                    "properties": {
                        "options": {
                            "id": "options",
                            "type": "object",
                            "properties": {
                                "localeToggleEnabled": {
                                    "id": "localeToggleEnabled",
                                    "type": "boolean"
                                },
                                "pagingToggleEnabled": {
                                    "id": "pagingToggleEnabled",
                                    "type": "boolean"
                                }
                            }
                        },
                        "content": {
                            "id": "content",
                            "type": "object",
                            "properties": {
                                "help": {
                                    "id": "help",
                                    "type": "string"
                                },
                                "image": {
                                    "id": "image",
                                    "type": "string"
                                },
                                "page": {
                                    "id": "page",
                                    "type": "string",
                                    "required": true
                                },
                                "first": {
                                    "id": "first",
                                    "type": "string"
                                },
                                "previous": {
                                    "id": "previous",
                                    "type": "string"
                                },
                                "next": {
                                    "id": "next",
                                    "type": "string"
                                },
                                "last": {
                                    "id": "last",
                                    "type": "string"
                                },
                                "go": {
                                    "id": "go",
                                    "type": "string"
                                },
                                "of": {
                                    "id": "of",
                                    "type": "string"
                                },
                                "emptyValue": {
                                    "id": "emptyValue",
                                    "type": "string"
                                },
                                "close": {
                                    "id": "close",
                                    "type": "string"
                                },
                                "settings": {
                                    "id": "settings",
                                    "type": "string"
                                },
                                "oneUp": {
                                    "id": "oneUp",
                                    "type": "string"
                                },
                                "twoUp": {
                                    "id": "twoUp",
                                    "type": "string"
                                }
                            },
                            "required": ["page"]
                        }
                    }
                },
                "treeViewLeftPanel": {
                    "id": "treeViewLeftPanel",
                    "type": "object",
                    "options": {
                        "collapsed": true
                    },
                    "properties": {
                        "options": {
                            "id": "options",
                            "type": "object",
                            "properties": {
                                "thumbsLoadRange": {
                                    "id": "thumbsLoadRange",
                                    "type": "integer"
                                },
                                "thumbsImageFadeInDuration": {
                                    "id": "thumbsImageFadeInDuration",
                                    "type": "integer"
                                },
                                "panelCollapsedWidth": {
                                    "id": "panelCollapsedWidth",
                                    "type": "integer"
                                },
                                "panelExpandedWidth": {
                                    "id": "panelExpandedWidth",
                                    "type": "integer"
                                },
                                "panelOpen": {
                                    "id": "panelOpen",
                                    "type": "boolean"
                                },
                                "panelAnimationDuration": {
                                    "id": "panelAnimationDuration",
                                    "type": "integer"
                                },
                                "oneColThumbWidth": {
                                    "id": "oneColThumbWidth",
                                    "type": "integer"
                                },
                                "oneColThumbHeight": {
                                    "id": "oneColThumbHeight",
                                    "type": "integer"
                                },
                                "twoColThumbWidth": {
                                    "id": "twoColThumbWidth",
                                    "type": "integer"
                                },
                                "twoColThumbHeight": {
                                    "id": "twoColThumbHeight",
                                    "type": "integer"
                                },
                                "galleryThumbWidth": {
                                    "id": "galleryThumbWidth",
                                    "type": "integer"
                                },
                                "galleryThumbHeight": {
                                    "id": "galleryThumbHeight",
                                    "type": "integer"
                                },
                                "thumbsExtraHeight": {
                                    "id": "thumbsExtraHeight",
                                    "type": "integer"
                                },
                                "elideCount": {
                                    "id": "ellideCount",
                                    "type": "integer"
                                },
                                "treeEnabled": {
                                    "id": "treeEnabled",
                                    "type": "boolean"
                                },
                                "thumbsEnabled": {
                                    "id": "thumbsEnabled",
                                    "type": "boolean"
                                }
                            }
                        },
                        "content": {
                            "id": "content",
                            "type": "object",
                            "properties": {
                                "index": {
                                    "id": "index",
                                    "type": "string"
                                },
                                "thumbnails": {
                                    "id": "thumbnails",
                                    "type": "string"
                                },
                                "title": {
                                    "id": "title",
                                    "type": "string"
                                },
                                "expand": {
                                    "id": "expand",
                                    "type": "string"
                                },
                                "expandFull": {
                                    "id": "expandFull",
                                    "type": "string"
                                },
                                "collapse": {
                                    "id": "collapse",
                                    "type": "string"
                                },
                                "collapseFull": {
                                    "id": "collapseFull",
                                    "type": "string"
                                }
                            }
                        }
                    }
                },
                "seadragonCenterPanel": {
                    "id": "seadragonCenterPanel",
                    "type": "object",
                    "options": {
                        "collapsed": true
                    },
                    "properties": {
                        "options": {
                            "id": "options",
                            "type": "object",
                            "properties": {
                                "pageGap": {
                                    "id": "pageGap",
                                    "type": "number"
                                },
                                "defaultZoomLevel": {
                                    "id": "defaultZoomLevel",
                                    "type": "integer"
                                },
                                "controlsFadeAfterInactive": {
                                    "id": "controlsFadeAfterInactive",
                                    "type": "integer"
                                },
                                "controlsFadeDelay": {
                                    "id": "controlsFadeDelay",
                                    "type": "integer"
                                },
                                "controlsFadeLength": {
                                    "id": "controlsFadeLength",
                                    "type": "integer"
                                },
                                "navigatorPosition": {
                                    "id": "navigatorPosition",
                                    "type": "string",
                                    "enum": ["BOTTOM_RIGHT", "BOTTOM_LEFT", "TOP_LEFT", "TOP_RIGHT"]
                                },
                                "trimAttributionCount": {
                                    "id": "trimAttributionCount",
                                    "type": "integer"
                                }
                            }
                        },
                        "content": {
                            "id": "content",
                            "type": "object",
                            "properties": {
                                "previous": {
                                    "id": "previous",
                                    "type": "string"
                                },
                                "next": {
                                    "id": "next",
                                    "type": "string"
                                },
                                "zoomIn": {
                                    "id": "zoomIn",
                                    "type": "string"
                                },
                                "zoomOut": {
                                    "id": "zoomOut",
                                    "type": "string"
                                },
                                "imageUnavailable": {
                                    "id": "imageUnavailable",
                                    "type": "string"
                                },
                                "acknowledgements": {
                                    "id": "acknowledgements",
                                    "type": "string"
                                }
                            }
                        }
                    }
                },
                "moreInfoRightPanel": {
                    "id": "moreInfoRightPanel",
                    "type": "object",
                    "options": {
                        "collapsed": true
                    },
                    "properties": {
                        "options": {
                            "id": "options",
                            "type": "object",
                            "properties": {
                                "panelCollapsedWidth": {
                                    "id": "panelCollapsedWidth",
                                    "type": "integer"
                                },
                                "panelExpandedWidth": {
                                    "id": "panelExpandedWidth",
                                    "type": "integer"
                                },
                                "panelAnimationDuration": {
                                    "id": "panelAnimationDuration",
                                    "type": "integer"
                                },
                                "panelOpen": {
                                    "id": "panelOpen",
                                    "type": "boolean"
                                }
                            }
                        },
                        "content": {
                            "id": "content",
                            "type": "object",
                            "properties": {
                                "holdingText": {
                                    "id": "holdingText",
                                    "type": "string"
                                },
                                "noData": {
                                    "id": "noData",
                                    "type": "string"
                                },
                                "title": {
                                    "id": "title",
                                    "type": "string"
                                },
                                "expand": {
                                    "id": "expand",
                                    "type": "string"
                                },
                                "expandFull": {
                                    "id": "expandFull",
                                    "type": "string"
                                },
                                "collapse": {
                                    "id": "collapse",
                                    "type": "string"
                                },
                                "collapseFull": {
                                    "id": "collapseFull",
                                    "type": "string"
                                }
                            }
                        }
                    }
                },
                "footerPanel": {
                    "id": "footerPanel",
                    "type": "object",
                    "options": {
                        "collapsed": true
                    },
                    "properties": {
                        "options": {
                            "id": "options",
                            "type": "object",
                            "properties": {
                                "embedEnabled": {
                                    "id": "embedEnabled",
                                    "type": "boolean"
                                },
                                "downloadEnabled": {
                                    "id": "downloadEnabled",
                                    "type": "boolean"
                                },
                                "fullscreenEnabled": {
                                    "id": "fullscreenEnabled",
                                    "type": "boolean"
                                },
                                "minimiseButtons": {
                                    "id": "minimiseButtons",
                                    "type": "boolean"
                                }
                            }
                        },
                        "content": {
                            "id": "content",
                            "type": "object",
                            "properties": {
                                "fullScreen": {
                                    "id": "fullScreen",
                                    "type": "string"
                                },
                                "exitFullScreen": {
                                    "id": "exitFullScreen",
                                    "type": "string"
                                },
                                "embed": {
                                    "id": "embed",
                                    "type": "string"
                                },
                                "download": {
                                    "id": "download",
                                    "type": "string"
                                }
                            }
                        }
                    }
                },
                "searchFooterPanel": {
                    "id": "searchFooterPanel",
                    "type": "object",
                    "options": {
                        "collapsed": true
                    },
                    "properties": {
                        "options": {
                            "id": "options",
                            "type": "object",
                            "properties": {
                                "elideDetailsTermsCount": {
                                    "id": "elideDetailsTermsCount",
                                    "type": "integer"
                                },
                                "elideResultsTermsCount": {
                                    "id": "elideResultsTermsCount",
                                    "type": "integer"
                                }
                            }
                        },
                        "content": {
                            "id": "content",
                            "type": "object",
                            "properties": {
                                "instanceFound": {
                                    "id": "instanceFound",
                                    "type": "string"
                                },
                                "instancesFound": {
                                    "id": "instancesFound",
                                    "type": "string"
                                },
                                "resultFoundFor": {
                                    "id": "resultFoundFor",
                                    "type": "string"
                                },
                                "resultsFoundFor": {
                                    "id": "resultsFoundFor",
                                    "type": "string"
                                },
                                "displaying": {
                                    "id": "displaying",
                                    "type": "string"
                                },
                                "page": {
                                    "id": "page",
                                    "type": "string"
                                },
                                "image": {
                                    "id": "image",
                                    "type": "string"
                                },
                                "searchWithin": {
                                    "id": "searchWithin",
                                    "type": "string"
                                },
                                "enterKeyword": {
                                    "id": "enterKeyword",
                                    "type": "string"
                                },
                                "pageCaps": {
                                    "id": "pageCaps",
                                    "type": "string"
                                },
                                "imageCaps": {
                                    "id": "imageCaps",
                                    "type": "string"
                                },
                                "clearSearch": {
                                    "id": "clearSearch",
                                    "type": "string"
                                },
                                "previousResult": {
                                    "id": "previousResult",
                                    "type": "string"
                                },
                                "nextResult": {
                                    "id": "nextResult",
                                    "type": "string"
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

$(function(){

    var testBuild = getQuerystringParameter("build");
    var isLocalhost = document.location.href.indexOf('localhost') != -1;
    var config, editor, locales;

    // if the embed script has been included in the page for testing, don't append it.
    var scriptIncluded = $('#embedUV').length;

    if (testBuild){
        $("body").append('<script type="text/javascript" id="embedUV" src="/build/uv-1.0.49/js/embed.js"><\/script>');
    } else {
        if (isLocalhost){
            if (!scriptIncluded) $("body").append('<script type="text/javascript" id="embedUV" src="/src/js/embed.js"><\/script>');
        } else {
            // built version

            // remove '/examples' from paths
            $('.uv').updateAttr('data-config', '/examples/', '/');

            $('.uv').updateAttr('data-uri', '/examples/', '/');

            $('#locale option').each(function() {
                $(this).updateAttr('value', '/examples/', '/');
            });

            $('#manifestSelect option').each(function() {
                $(this).updateAttr('value', '/examples/', '/');
            });

            $("body").append('<script type="text/javascript" id="embedUV" src="/build/uv-1.0.49/js/embed.js"><\/script>');
        }
    }

    setJSONPEnabled();

    if ($('#manifestSelect option').length || $('#manifestSelect optgroup').length){
        setSelectedManifest();
    }

    createEditor();
    setSelectedManifest();
    setSelectedLocale();
    setDefaultToFullScreen();
    loadViewer();

    function loadViewer() {

        // todo: update embed.js to work with script loaders.
        if (window.initPlayers && window.easyXDM){
            initPlayers($('.uv'));
        } else {
            setTimeout(loadViewer, 100);
        }

    }

    function isIE8(){
        return (browserDetect.browser === "Explorer" && browserDetect.version === 8);
    }

    function createEditor() {

        if (isIE8() || typeof(JSONEditor) === "undefined") {
            $("#edit-config").hide();
            return;
        }

        editor = new JSONEditor(document.getElementById('editor'),{
            form_name_root: "",
            theme: 'foundation5',
            iconlib: 'fontawesome4',
            schema: schema,
            disable_edit_json: false,
            disable_properties: true,
            required_by_default: true
        });

        editor.on('change', function() {
            // Get an array of errors from the validator
            var errors = editor.validate();

            // Not valid
            if(errors.length) {
                console.log(errors);
            }
        });
    }

    $('#manifestSelect').on('change', function(){
        $('#manifest').val($('#manifestSelect option:selected').val());
    });

    $('#setManifestBtn').on('click', function(e){
        e.preventDefault();
        buildQuerystring();
    });

    $('#locale').on('change', function(){
        $('#locales').val($('#locale option:selected').val());
    });

    $('#setLocalesBtn').on('click', function(e){
        e.preventDefault();
        buildQuerystring();
    });

    $('#jsonp').on('change', function(){
        buildQuerystring();
    });

    $('#testids').on('change', function(){
        buildQuerystring();
    });

    $('#defaultToFullScreen').on('change', function(){
        buildQuerystring();
    });

    function buildQuerystring() {

        var jsonp = $('#jsonp').is(':checked');
        var testids = $('#testids').is(':checked');
        var defaultToFullScreen = $('#defaultToFullScreen').is(':checked');
        var manifest = $('#manifest').val();
        var locale = $('#locales').val() || "en-GB";

        // clear hash params
        document.location.hash = "";

        var qs = document.location.search.replace('?', '');
        qs = updateURIKeyValuePair(qs, "jsonp", jsonp);
        qs = updateURIKeyValuePair(qs, "testids", testids);
        qs = updateURIKeyValuePair(qs, "defaultToFullScreen", defaultToFullScreen);
        qs = updateURIKeyValuePair(qs, "manifest", manifest);
        qs = updateURIKeyValuePair(qs, "locale", locale);

        // reload
        window.location.search = qs;
    }

    function getDefaultLocale(l) {
        var parsed = [];
        var l = l.split(',');

        for (var i = 0; i < l.length; i++) {
            var v = l[i].split(':');
            parsed.push({
                name: v[0],
                label: (v[1]) ? v[1] : ""
            });
        }

        return parsed[0].name;
    }

    function setJSONPEnabled() {

        var jsonp = $('#jsonp').is(':checked');

        var qs = getQuerystringParameter("jsonp");

        if (qs === 'false'){
            jsonp = false;
        } else if (qs === 'true') {
            jsonp = true;
        }

        if (jsonp){
            $('.uv').attr('data-jsonp', 'true');
            $('#jsonp').attr('checked', 'true');
        } else {
            $('.uv').removeAttr('data-jsonp');
            $('#jsonp').removeAttr('checked');
        }
    }

    function setSelectedManifest(){

        var manifest = getQuerystringParameter("manifest");

        if (manifest) {
            $("#manifestSelect").val(manifest);
        } else {
            manifest = $('#manifestSelect option')[0].value;
        }

        $("#manifest").val(manifest);

        $('.uv').attr('data-uri', manifest);
    }

    function setSelectedLocale() {
        locales = getQuerystringParameter("locale") || "en-GB";

        $("#locale").val(getDefaultLocale(locales));

        $("#locales").val(locales);

        $('.uv').attr('data-locale', locales);
    }

    function setTestIds(){
        //var testids = $('#testids').is(':checked');

        var qs = getQuerystringParameter("testids");

        if (qs === 'true') {
            createTestIds();
            $('#testids').attr('checked', 'true');
        } else {
            $('#testids').removeAttr('checked');
        }
    }

    function setDefaultToFullScreen(){
        var defaultToFullScreen = $('#defaultToFullScreen').is(':checked');

        var qs = getQuerystringParameter("defaultToFullScreen");

        if (qs === 'true') {
            $('.uv').attr('data-fullscreen', true);
            $('#defaultToFullScreen').attr('checked', 'true');
        } else {
            $('.uv').removeAttr('data-fullscreen');
            $('#defaultToFullScreen').removeAttr('checked');
        }
    }

    $('#editBtn').on('click', function(e) {
        e.preventDefault();

        edit();
    });

    function edit() {
        $('#editPnl').toggleClass('show', 'hide');
        $('#saveBtn').toggleClass('show', 'hide');
        $('#resetBtn').toggleClass('show', 'hide')
        $('#editBtn').toggleText('Edit', 'Close');

        if ($('#editPnl').hasClass('show')){

            $.getJSON('/build/uv-1.0.49/js/' + config.name + '.' + getDefaultLocale(locales) + '.config.js', function(config){
                editor.setValue(config);
            });
        }
    }

    $('#saveBtn').on('click', function(e) {
        e.preventDefault();

        var errors = editor.validate();

        if(errors.length) {
            console.log(errors);
            return;
        }

        // save contents of #json to session storage, set data-config attribute to 'sessionstorage' and reload viewer
        sessionStorage.setItem("uv-config", JSON.stringify(editor.getValue()));

        $('.uv').attr('data-config', 'sessionstorage');

        loadViewer();
    });

    $('#resetBtn').on('click', function(e){
        e.preventDefault();

        $('.uv').removeAttr('data-config');
        sessionStorage.removeItem("uv-config");

        loadViewer();

        edit();
    });

    $(document).bind("uv.onToggleFullScreen", function (event, obj) {
        console.log('full screen: ' + obj.isFullScreen);
    });

    $(document).bind("uv.onSequenceIndexChanged", function (event, isFullScreen) {

    });

    $(document).bind("uv.onCurrentViewUri", function (event, obj) {

    });

    $(document).bind("uv.onLoad", function (event, obj) {
        $('#locale').empty();

        config = obj.config;

        var locales = config.localisation.locales;

        for (var i = 0; i < locales.length; i++){
            var l = locales[i];
            $('#locale').append('<option value="' + l.name + '">' + l.label + '</option>');
        }

        setSelectedLocale();

        $('footer').show();
    });

    $(document).bind("uv.onCreated", function (event, obj) {
        setTestIds();
    });
});