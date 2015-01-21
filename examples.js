// generated with http://jsonschema.net
// todo: look at using typson to generate this from a ts definition file: https://github.com/lbovet/typson
schema = {
    "$schema": "http://json-schema.org/draft-04/schema#",
    "id": "https://github.com/britishlibrary/UniversalViewer",
    "type": "object",
    "properties": {
        "options": {
            "id": "options",
            "type": "object",
            "options": {
                "collapsed": true
            },
            "properties": {
                "IIIF": {
                    "id": "IIIF",
                    "type": "boolean"
                },
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
                "sectionMappings": {
                    "id": "sectionMappings",
                    "type": "object",
                    "properties": {
                        "CoverFrontOutside": {
                            "id": "CoverFrontOutside",
                            "type": "string"
                        },
                        "CoverBackOutside": {
                            "id": "CoverBackOutside",
                            "type": "string"
                        },
                        "TitlePage": {
                            "id": "TitlePage",
                            "type": "string"
                        },
                        "TableOfContents": {
                            "id": "TableOfContents",
                            "type": "string"
                        },
                        "PartOfWork": {
                            "id": "PartOfWork",
                            "type": "string"
                        }
                    }
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
                                "thumbWidth": {
                                    "id": "thumbWidth",
                                    "type": "integer"
                                },
                                "thumbHeight": {
                                    "id": "thumbHeight",
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
    var editor;

    if (testBuild){
        $("body").append('<script type="text/javascript" id="embedUV" src="/build/uv-0.1.26/js/embed.js"><\/script>');
    } else {
        if (isLocalhost){
            $("body").append('<script type="text/javascript" id="embedUV" src="/src/js/embed.js"><\/script>');
        } else {
            // built version

            // remove '/examples' from paths
            $('.uv').updateAttr('data-config', '/examples/', '/');

            if ($('.uv').attr('data-uri')){
                $('.uv').updateAttr('data-uri', '/examples/', '/');
            }

            $('#config option').each(function() {
                $(this).updateAttr('value', '/examples/', '/');
            });

            $('#manifest option').each(function() {
                $(this).updateAttr('value', '/examples/', '/');
            });

            $("body").append('<script type="text/javascript" id="embedUV" src="/build/uv-0.1.26/js/embed.js"><\/script>');
        }
    }

    setTimeout(function(){
        if ($('#manifest option').length || $('#manifest optgroup').length){
            setSelectedManifest();
        }

        if ($('#config option').length || $('#config optgroup').length){
            setSelectedConfig();
        }

        createEditor();

        loadViewer();
    }, 2000);

    function loadViewer() {
        initPlayers($('.uv'));
    }

    function createEditor() {

        editor = new JSONEditor(document.getElementById('editor'),{
            form_name_root: "",
            theme: 'foundation5',
            iconlib: 'fontawesome4',
            schema: schema,
            disable_edit_json: false,
            disable_properties: true,
            required_by_default: true
        });

        editor.on('change',function() {
            // Get an array of errors from the validator
            var errors = editor.validate();

            // Not valid
            if(errors.length) {
                console.log(errors);
            }
        });
    }

    $('#manifest').on('change', function(){
        buildQuerystring();
    });

    $('#config').on('change', function(){
        buildQuerystring();
    });

    function buildQuerystring() {
        var config = $('#config option:selected').val();
        var manifest = $('#manifest option:selected').val();

        // clear hash params
        document.location.hash = "";

        var qs = document.location.search.replace('?', '');
        qs = updateURIKeyValuePair(qs, "config", config);
        qs = updateURIKeyValuePair(qs, "manifest", manifest);

        // reload
        window.location.search = qs;
    }

    function setSelectedManifest(){

        var manifest = getQuerystringParameter("manifest");

        if (manifest) {
            $("#manifest").val(manifest);
        } else {
            manifest = $('#manifest option')[0].value;
        }

        $('.uv').attr('data-uri', manifest);
    }

    function setSelectedConfig(){

        var config = getQuerystringParameter("config");

        if (config) {
            $("#config").val(config);
        } else {
            config = $('#config option')[0].value;
        }

        $('.uv').attr('data-config', config);
    }

    $('#editBtn').on('click', function(e) {
        e.preventDefault();

        $('#editPnl').toggleClass('show', 'hide');
        $('#saveBtn').toggleClass('show', 'hide');
        $(this).toggleText('Edit', 'Close');

        if ($('#editPnl').hasClass('show')){

            // first get the default extension config
            // todo: figure out how to make this work for more than just seadragon extension
            $.getJSON('/build/uv-0.1.26/js/coreplayer-seadragon-extension-config.js', function(baseConfig){
                var configUrl = $('#config option:selected').val();

                $.getJSON(configUrl, function(config){
                    $.extend(true, baseConfig, config);
                    editor.setValue(baseConfig);
                });
            });
        }
    });

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

    // test overrideFullScreen option
    $(document).bind("onToggleFullScreen", function (event, isFullScreen) {
        console.log('full screen: ' + isFullScreen);
    });

    // test currentViewUri event
    $(document).bind("onCurrentViewUri", function (event, obj) {
        console.log(obj);
    });
});