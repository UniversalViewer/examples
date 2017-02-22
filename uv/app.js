/** vim: et:ts=4:sw=4:sts=4
 * @license RequireJS 2.2.0 Copyright jQuery Foundation and other contributors.
 * Released under MIT license, http://github.com/requirejs/requirejs/LICENSE
 */
//Not using strict: uneven strict support in browsers, #392, and causes
//problems with requirejs.exec()/transpiler plugins that may not be strict.
/*jslint regexp: true, nomen: true, sloppy: true */
/*global window, navigator, document, importScripts, setTimeout, opera */

var requirejs, require, define;
(function (global) {
    var req, s, head, baseElement, dataMain, src,
        interactiveScript, currentlyAddingScript, mainScript, subPath,
        version = '2.2.0',
        commentRegExp = /(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/mg,
        cjsRequireRegExp = /[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g,
        jsSuffixRegExp = /\.js$/,
        currDirRegExp = /^\.\//,
        op = Object.prototype,
        ostring = op.toString,
        hasOwn = op.hasOwnProperty,
        isBrowser = !!(typeof window !== 'undefined' && typeof navigator !== 'undefined' && window.document),
        isWebWorker = !isBrowser && typeof importScripts !== 'undefined',
        //PS3 indicates loaded and complete, but need to wait for complete
        //specifically. Sequence is 'loading', 'loaded', execution,
        // then 'complete'. The UA check is unfortunate, but not sure how
        //to feature test w/o causing perf issues.
        readyRegExp = isBrowser && navigator.platform === 'PLAYSTATION 3' ?
                      /^complete$/ : /^(complete|loaded)$/,
        defContextName = '_',
        //Oh the tragedy, detecting opera. See the usage of isOpera for reason.
        isOpera = typeof opera !== 'undefined' && opera.toString() === '[object Opera]',
        contexts = {},
        cfg = {},
        globalDefQueue = [],
        useInteractive = false;

    //Could match something like ')//comment', do not lose the prefix to comment.
    function commentReplace(match, multi, multiText, singlePrefix) {
        return singlePrefix || '';
    }

    function isFunction(it) {
        return ostring.call(it) === '[object Function]';
    }

    function isArray(it) {
        return ostring.call(it) === '[object Array]';
    }

    /**
     * Helper function for iterating over an array. If the func returns
     * a true value, it will break out of the loop.
     */
    function each(ary, func) {
        if (ary) {
            var i;
            for (i = 0; i < ary.length; i += 1) {
                if (ary[i] && func(ary[i], i, ary)) {
                    break;
                }
            }
        }
    }

    /**
     * Helper function for iterating over an array backwards. If the func
     * returns a true value, it will break out of the loop.
     */
    function eachReverse(ary, func) {
        if (ary) {
            var i;
            for (i = ary.length - 1; i > -1; i -= 1) {
                if (ary[i] && func(ary[i], i, ary)) {
                    break;
                }
            }
        }
    }

    function hasProp(obj, prop) {
        return hasOwn.call(obj, prop);
    }

    function getOwn(obj, prop) {
        return hasProp(obj, prop) && obj[prop];
    }

    /**
     * Cycles over properties in an object and calls a function for each
     * property value. If the function returns a truthy value, then the
     * iteration is stopped.
     */
    function eachProp(obj, func) {
        var prop;
        for (prop in obj) {
            if (hasProp(obj, prop)) {
                if (func(obj[prop], prop)) {
                    break;
                }
            }
        }
    }

    /**
     * Simple function to mix in properties from source into target,
     * but only if target does not already have a property of the same name.
     */
    function mixin(target, source, force, deepStringMixin) {
        if (source) {
            eachProp(source, function (value, prop) {
                if (force || !hasProp(target, prop)) {
                    if (deepStringMixin && typeof value === 'object' && value &&
                        !isArray(value) && !isFunction(value) &&
                        !(value instanceof RegExp)) {

                        if (!target[prop]) {
                            target[prop] = {};
                        }
                        mixin(target[prop], value, force, deepStringMixin);
                    } else {
                        target[prop] = value;
                    }
                }
            });
        }
        return target;
    }

    //Similar to Function.prototype.bind, but the 'this' object is specified
    //first, since it is easier to read/figure out what 'this' will be.
    function bind(obj, fn) {
        return function () {
            return fn.apply(obj, arguments);
        };
    }

    function scripts() {
        return document.getElementsByTagName('script');
    }

    function defaultOnError(err) {
        throw err;
    }

    //Allow getting a global that is expressed in
    //dot notation, like 'a.b.c'.
    function getGlobal(value) {
        if (!value) {
            return value;
        }
        var g = global;
        each(value.split('.'), function (part) {
            g = g[part];
        });
        return g;
    }

    /**
     * Constructs an error with a pointer to an URL with more information.
     * @param {String} id the error ID that maps to an ID on a web page.
     * @param {String} message human readable error.
     * @param {Error} [err] the original error, if there is one.
     *
     * @returns {Error}
     */
    function makeError(id, msg, err, requireModules) {
        var e = new Error(msg + '\nhttp://requirejs.org/docs/errors.html#' + id);
        e.requireType = id;
        e.requireModules = requireModules;
        if (err) {
            e.originalError = err;
        }
        return e;
    }

    if (typeof define !== 'undefined') {
        //If a define is already in play via another AMD loader,
        //do not overwrite.
        return;
    }

    if (typeof requirejs !== 'undefined') {
        if (isFunction(requirejs)) {
            //Do not overwrite an existing requirejs instance.
            return;
        }
        cfg = requirejs;
        requirejs = undefined;
    }

    //Allow for a require config object
    if (typeof require !== 'undefined' && !isFunction(require)) {
        //assume it is a config object.
        cfg = require;
        require = undefined;
    }

    function newContext(contextName) {
        var inCheckLoaded, Module, context, handlers,
            checkLoadedTimeoutId,
            config = {
                //Defaults. Do not set a default for map
                //config to speed up normalize(), which
                //will run faster if there is no default.
                waitSeconds: 7,
                baseUrl: './',
                paths: {},
                bundles: {},
                pkgs: {},
                shim: {},
                config: {}
            },
            registry = {},
            //registry of just enabled modules, to speed
            //cycle breaking code when lots of modules
            //are registered, but not activated.
            enabledRegistry = {},
            undefEvents = {},
            defQueue = [],
            defined = {},
            urlFetched = {},
            bundlesMap = {},
            requireCounter = 1,
            unnormalizedCounter = 1;

        /**
         * Trims the . and .. from an array of path segments.
         * It will keep a leading path segment if a .. will become
         * the first path segment, to help with module name lookups,
         * which act like paths, but can be remapped. But the end result,
         * all paths that use this function should look normalized.
         * NOTE: this method MODIFIES the input array.
         * @param {Array} ary the array of path segments.
         */
        function trimDots(ary) {
            var i, part;
            for (i = 0; i < ary.length; i++) {
                part = ary[i];
                if (part === '.') {
                    ary.splice(i, 1);
                    i -= 1;
                } else if (part === '..') {
                    // If at the start, or previous value is still ..,
                    // keep them so that when converted to a path it may
                    // still work when converted to a path, even though
                    // as an ID it is less than ideal. In larger point
                    // releases, may be better to just kick out an error.
                    if (i === 0 || (i === 1 && ary[2] === '..') || ary[i - 1] === '..') {
                        continue;
                    } else if (i > 0) {
                        ary.splice(i - 1, 2);
                        i -= 2;
                    }
                }
            }
        }

        /**
         * Given a relative module name, like ./something, normalize it to
         * a real name that can be mapped to a path.
         * @param {String} name the relative name
         * @param {String} baseName a real name that the name arg is relative
         * to.
         * @param {Boolean} applyMap apply the map config to the value. Should
         * only be done if this normalization is for a dependency ID.
         * @returns {String} normalized name
         */
        function normalize(name, baseName, applyMap) {
            var pkgMain, mapValue, nameParts, i, j, nameSegment, lastIndex,
                foundMap, foundI, foundStarMap, starI, normalizedBaseParts,
                baseParts = (baseName && baseName.split('/')),
                map = config.map,
                starMap = map && map['*'];

            //Adjust any relative paths.
            if (name) {
                name = name.split('/');
                lastIndex = name.length - 1;

                // If wanting node ID compatibility, strip .js from end
                // of IDs. Have to do this here, and not in nameToUrl
                // because node allows either .js or non .js to map
                // to same file.
                if (config.nodeIdCompat && jsSuffixRegExp.test(name[lastIndex])) {
                    name[lastIndex] = name[lastIndex].replace(jsSuffixRegExp, '');
                }

                // Starts with a '.' so need the baseName
                if (name[0].charAt(0) === '.' && baseParts) {
                    //Convert baseName to array, and lop off the last part,
                    //so that . matches that 'directory' and not name of the baseName's
                    //module. For instance, baseName of 'one/two/three', maps to
                    //'one/two/three.js', but we want the directory, 'one/two' for
                    //this normalization.
                    normalizedBaseParts = baseParts.slice(0, baseParts.length - 1);
                    name = normalizedBaseParts.concat(name);
                }

                trimDots(name);
                name = name.join('/');
            }

            //Apply map config if available.
            if (applyMap && map && (baseParts || starMap)) {
                nameParts = name.split('/');

                outerLoop: for (i = nameParts.length; i > 0; i -= 1) {
                    nameSegment = nameParts.slice(0, i).join('/');

                    if (baseParts) {
                        //Find the longest baseName segment match in the config.
                        //So, do joins on the biggest to smallest lengths of baseParts.
                        for (j = baseParts.length; j > 0; j -= 1) {
                            mapValue = getOwn(map, baseParts.slice(0, j).join('/'));

                            //baseName segment has config, find if it has one for
                            //this name.
                            if (mapValue) {
                                mapValue = getOwn(mapValue, nameSegment);
                                if (mapValue) {
                                    //Match, update name to the new value.
                                    foundMap = mapValue;
                                    foundI = i;
                                    break outerLoop;
                                }
                            }
                        }
                    }

                    //Check for a star map match, but just hold on to it,
                    //if there is a shorter segment match later in a matching
                    //config, then favor over this star map.
                    if (!foundStarMap && starMap && getOwn(starMap, nameSegment)) {
                        foundStarMap = getOwn(starMap, nameSegment);
                        starI = i;
                    }
                }

                if (!foundMap && foundStarMap) {
                    foundMap = foundStarMap;
                    foundI = starI;
                }

                if (foundMap) {
                    nameParts.splice(0, foundI, foundMap);
                    name = nameParts.join('/');
                }
            }

            // If the name points to a package's name, use
            // the package main instead.
            pkgMain = getOwn(config.pkgs, name);

            return pkgMain ? pkgMain : name;
        }

        function removeScript(name) {
            if (isBrowser) {
                each(scripts(), function (scriptNode) {
                    if (scriptNode.getAttribute('data-requiremodule') === name &&
                            scriptNode.getAttribute('data-requirecontext') === context.contextName) {
                        scriptNode.parentNode.removeChild(scriptNode);
                        return true;
                    }
                });
            }
        }

        function hasPathFallback(id) {
            var pathConfig = getOwn(config.paths, id);
            if (pathConfig && isArray(pathConfig) && pathConfig.length > 1) {
                //Pop off the first array value, since it failed, and
                //retry
                pathConfig.shift();
                context.require.undef(id);

                //Custom require that does not do map translation, since
                //ID is "absolute", already mapped/resolved.
                context.makeRequire(null, {
                    skipMap: true
                })([id]);

                return true;
            }
        }

        //Turns a plugin!resource to [plugin, resource]
        //with the plugin being undefined if the name
        //did not have a plugin prefix.
        function splitPrefix(name) {
            var prefix,
                index = name ? name.indexOf('!') : -1;
            if (index > -1) {
                prefix = name.substring(0, index);
                name = name.substring(index + 1, name.length);
            }
            return [prefix, name];
        }

        /**
         * Creates a module mapping that includes plugin prefix, module
         * name, and path. If parentModuleMap is provided it will
         * also normalize the name via require.normalize()
         *
         * @param {String} name the module name
         * @param {String} [parentModuleMap] parent module map
         * for the module name, used to resolve relative names.
         * @param {Boolean} isNormalized: is the ID already normalized.
         * This is true if this call is done for a define() module ID.
         * @param {Boolean} applyMap: apply the map config to the ID.
         * Should only be true if this map is for a dependency.
         *
         * @returns {Object}
         */
        function makeModuleMap(name, parentModuleMap, isNormalized, applyMap) {
            var url, pluginModule, suffix, nameParts,
                prefix = null,
                parentName = parentModuleMap ? parentModuleMap.name : null,
                originalName = name,
                isDefine = true,
                normalizedName = '';

            //If no name, then it means it is a require call, generate an
            //internal name.
            if (!name) {
                isDefine = false;
                name = '_@r' + (requireCounter += 1);
            }

            nameParts = splitPrefix(name);
            prefix = nameParts[0];
            name = nameParts[1];

            if (prefix) {
                prefix = normalize(prefix, parentName, applyMap);
                pluginModule = getOwn(defined, prefix);
            }

            //Account for relative paths if there is a base name.
            if (name) {
                if (prefix) {
                    if (pluginModule && pluginModule.normalize) {
                        //Plugin is loaded, use its normalize method.
                        normalizedName = pluginModule.normalize(name, function (name) {
                            return normalize(name, parentName, applyMap);
                        });
                    } else {
                        // If nested plugin references, then do not try to
                        // normalize, as it will not normalize correctly. This
                        // places a restriction on resourceIds, and the longer
                        // term solution is not to normalize until plugins are
                        // loaded and all normalizations to allow for async
                        // loading of a loader plugin. But for now, fixes the
                        // common uses. Details in #1131
                        normalizedName = name.indexOf('!') === -1 ?
                                         normalize(name, parentName, applyMap) :
                                         name;
                    }
                } else {
                    //A regular module.
                    normalizedName = normalize(name, parentName, applyMap);

                    //Normalized name may be a plugin ID due to map config
                    //application in normalize. The map config values must
                    //already be normalized, so do not need to redo that part.
                    nameParts = splitPrefix(normalizedName);
                    prefix = nameParts[0];
                    normalizedName = nameParts[1];
                    isNormalized = true;

                    url = context.nameToUrl(normalizedName);
                }
            }

            //If the id is a plugin id that cannot be determined if it needs
            //normalization, stamp it with a unique ID so two matching relative
            //ids that may conflict can be separate.
            suffix = prefix && !pluginModule && !isNormalized ?
                     '_unnormalized' + (unnormalizedCounter += 1) :
                     '';

            return {
                prefix: prefix,
                name: normalizedName,
                parentMap: parentModuleMap,
                unnormalized: !!suffix,
                url: url,
                originalName: originalName,
                isDefine: isDefine,
                id: (prefix ?
                        prefix + '!' + normalizedName :
                        normalizedName) + suffix
            };
        }

        function getModule(depMap) {
            var id = depMap.id,
                mod = getOwn(registry, id);

            if (!mod) {
                mod = registry[id] = new context.Module(depMap);
            }

            return mod;
        }

        function on(depMap, name, fn) {
            var id = depMap.id,
                mod = getOwn(registry, id);

            if (hasProp(defined, id) &&
                    (!mod || mod.defineEmitComplete)) {
                if (name === 'defined') {
                    fn(defined[id]);
                }
            } else {
                mod = getModule(depMap);
                if (mod.error && name === 'error') {
                    fn(mod.error);
                } else {
                    mod.on(name, fn);
                }
            }
        }

        function onError(err, errback) {
            var ids = err.requireModules,
                notified = false;

            if (errback) {
                errback(err);
            } else {
                each(ids, function (id) {
                    var mod = getOwn(registry, id);
                    if (mod) {
                        //Set error on module, so it skips timeout checks.
                        mod.error = err;
                        if (mod.events.error) {
                            notified = true;
                            mod.emit('error', err);
                        }
                    }
                });

                if (!notified) {
                    req.onError(err);
                }
            }
        }

        /**
         * Internal method to transfer globalQueue items to this context's
         * defQueue.
         */
        function takeGlobalQueue() {
            //Push all the globalDefQueue items into the context's defQueue
            if (globalDefQueue.length) {
                each(globalDefQueue, function(queueItem) {
                    var id = queueItem[0];
                    if (typeof id === 'string') {
                        context.defQueueMap[id] = true;
                    }
                    defQueue.push(queueItem);
                });
                globalDefQueue = [];
            }
        }

        handlers = {
            'require': function (mod) {
                if (mod.require) {
                    return mod.require;
                } else {
                    return (mod.require = context.makeRequire(mod.map));
                }
            },
            'exports': function (mod) {
                mod.usingExports = true;
                if (mod.map.isDefine) {
                    if (mod.exports) {
                        return (defined[mod.map.id] = mod.exports);
                    } else {
                        return (mod.exports = defined[mod.map.id] = {});
                    }
                }
            },
            'module': function (mod) {
                if (mod.module) {
                    return mod.module;
                } else {
                    return (mod.module = {
                        id: mod.map.id,
                        uri: mod.map.url,
                        config: function () {
                            return getOwn(config.config, mod.map.id) || {};
                        },
                        exports: mod.exports || (mod.exports = {})
                    });
                }
            }
        };

        function cleanRegistry(id) {
            //Clean up machinery used for waiting modules.
            delete registry[id];
            delete enabledRegistry[id];
        }

        function breakCycle(mod, traced, processed) {
            var id = mod.map.id;

            if (mod.error) {
                mod.emit('error', mod.error);
            } else {
                traced[id] = true;
                each(mod.depMaps, function (depMap, i) {
                    var depId = depMap.id,
                        dep = getOwn(registry, depId);

                    //Only force things that have not completed
                    //being defined, so still in the registry,
                    //and only if it has not been matched up
                    //in the module already.
                    if (dep && !mod.depMatched[i] && !processed[depId]) {
                        if (getOwn(traced, depId)) {
                            mod.defineDep(i, defined[depId]);
                            mod.check(); //pass false?
                        } else {
                            breakCycle(dep, traced, processed);
                        }
                    }
                });
                processed[id] = true;
            }
        }

        function checkLoaded() {
            var err, usingPathFallback,
                waitInterval = config.waitSeconds * 1000,
                //It is possible to disable the wait interval by using waitSeconds of 0.
                expired = waitInterval && (context.startTime + waitInterval) < new Date().getTime(),
                noLoads = [],
                reqCalls = [],
                stillLoading = false,
                needCycleCheck = true;

            //Do not bother if this call was a result of a cycle break.
            if (inCheckLoaded) {
                return;
            }

            inCheckLoaded = true;

            //Figure out the state of all the modules.
            eachProp(enabledRegistry, function (mod) {
                var map = mod.map,
                    modId = map.id;

                //Skip things that are not enabled or in error state.
                if (!mod.enabled) {
                    return;
                }

                if (!map.isDefine) {
                    reqCalls.push(mod);
                }

                if (!mod.error) {
                    //If the module should be executed, and it has not
                    //been inited and time is up, remember it.
                    if (!mod.inited && expired) {
                        if (hasPathFallback(modId)) {
                            usingPathFallback = true;
                            stillLoading = true;
                        } else {
                            noLoads.push(modId);
                            removeScript(modId);
                        }
                    } else if (!mod.inited && mod.fetched && map.isDefine) {
                        stillLoading = true;
                        if (!map.prefix) {
                            //No reason to keep looking for unfinished
                            //loading. If the only stillLoading is a
                            //plugin resource though, keep going,
                            //because it may be that a plugin resource
                            //is waiting on a non-plugin cycle.
                            return (needCycleCheck = false);
                        }
                    }
                }
            });

            if (expired && noLoads.length) {
                //If wait time expired, throw error of unloaded modules.
                err = makeError('timeout', 'Load timeout for modules: ' + noLoads, null, noLoads);
                err.contextName = context.contextName;
                return onError(err);
            }

            //Not expired, check for a cycle.
            if (needCycleCheck) {
                each(reqCalls, function (mod) {
                    breakCycle(mod, {}, {});
                });
            }

            //If still waiting on loads, and the waiting load is something
            //other than a plugin resource, or there are still outstanding
            //scripts, then just try back later.
            if ((!expired || usingPathFallback) && stillLoading) {
                //Something is still waiting to load. Wait for it, but only
                //if a timeout is not already in effect.
                if ((isBrowser || isWebWorker) && !checkLoadedTimeoutId) {
                    checkLoadedTimeoutId = setTimeout(function () {
                        checkLoadedTimeoutId = 0;
                        checkLoaded();
                    }, 50);
                }
            }

            inCheckLoaded = false;
        }

        Module = function (map) {
            this.events = getOwn(undefEvents, map.id) || {};
            this.map = map;
            this.shim = getOwn(config.shim, map.id);
            this.depExports = [];
            this.depMaps = [];
            this.depMatched = [];
            this.pluginMaps = {};
            this.depCount = 0;

            /* this.exports this.factory
               this.depMaps = [],
               this.enabled, this.fetched
            */
        };

        Module.prototype = {
            init: function (depMaps, factory, errback, options) {
                options = options || {};

                //Do not do more inits if already done. Can happen if there
                //are multiple define calls for the same module. That is not
                //a normal, common case, but it is also not unexpected.
                if (this.inited) {
                    return;
                }

                this.factory = factory;

                if (errback) {
                    //Register for errors on this module.
                    this.on('error', errback);
                } else if (this.events.error) {
                    //If no errback already, but there are error listeners
                    //on this module, set up an errback to pass to the deps.
                    errback = bind(this, function (err) {
                        this.emit('error', err);
                    });
                }

                //Do a copy of the dependency array, so that
                //source inputs are not modified. For example
                //"shim" deps are passed in here directly, and
                //doing a direct modification of the depMaps array
                //would affect that config.
                this.depMaps = depMaps && depMaps.slice(0);

                this.errback = errback;

                //Indicate this module has be initialized
                this.inited = true;

                this.ignore = options.ignore;

                //Could have option to init this module in enabled mode,
                //or could have been previously marked as enabled. However,
                //the dependencies are not known until init is called. So
                //if enabled previously, now trigger dependencies as enabled.
                if (options.enabled || this.enabled) {
                    //Enable this module and dependencies.
                    //Will call this.check()
                    this.enable();
                } else {
                    this.check();
                }
            },

            defineDep: function (i, depExports) {
                //Because of cycles, defined callback for a given
                //export can be called more than once.
                if (!this.depMatched[i]) {
                    this.depMatched[i] = true;
                    this.depCount -= 1;
                    this.depExports[i] = depExports;
                }
            },

            fetch: function () {
                if (this.fetched) {
                    return;
                }
                this.fetched = true;

                context.startTime = (new Date()).getTime();

                var map = this.map;

                //If the manager is for a plugin managed resource,
                //ask the plugin to load it now.
                if (this.shim) {
                    context.makeRequire(this.map, {
                        enableBuildCallback: true
                    })(this.shim.deps || [], bind(this, function () {
                        return map.prefix ? this.callPlugin() : this.load();
                    }));
                } else {
                    //Regular dependency.
                    return map.prefix ? this.callPlugin() : this.load();
                }
            },

            load: function () {
                var url = this.map.url;

                //Regular dependency.
                if (!urlFetched[url]) {
                    urlFetched[url] = true;
                    context.load(this.map.id, url);
                }
            },

            /**
             * Checks if the module is ready to define itself, and if so,
             * define it.
             */
            check: function () {
                if (!this.enabled || this.enabling) {
                    return;
                }

                var err, cjsModule,
                    id = this.map.id,
                    depExports = this.depExports,
                    exports = this.exports,
                    factory = this.factory;

                if (!this.inited) {
                    // Only fetch if not already in the defQueue.
                    if (!hasProp(context.defQueueMap, id)) {
                        this.fetch();
                    }
                } else if (this.error) {
                    this.emit('error', this.error);
                } else if (!this.defining) {
                    //The factory could trigger another require call
                    //that would result in checking this module to
                    //define itself again. If already in the process
                    //of doing that, skip this work.
                    this.defining = true;

                    if (this.depCount < 1 && !this.defined) {
                        if (isFunction(factory)) {
                            //If there is an error listener, favor passing
                            //to that instead of throwing an error. However,
                            //only do it for define()'d  modules. require
                            //errbacks should not be called for failures in
                            //their callbacks (#699). However if a global
                            //onError is set, use that.
                            if ((this.events.error && this.map.isDefine) ||
                                req.onError !== defaultOnError) {
                                try {
                                    exports = context.execCb(id, factory, depExports, exports);
                                } catch (e) {
                                    err = e;
                                }
                            } else {
                                exports = context.execCb(id, factory, depExports, exports);
                            }

                            // Favor return value over exports. If node/cjs in play,
                            // then will not have a return value anyway. Favor
                            // module.exports assignment over exports object.
                            if (this.map.isDefine && exports === undefined) {
                                cjsModule = this.module;
                                if (cjsModule) {
                                    exports = cjsModule.exports;
                                } else if (this.usingExports) {
                                    //exports already set the defined value.
                                    exports = this.exports;
                                }
                            }

                            if (err) {
                                err.requireMap = this.map;
                                err.requireModules = this.map.isDefine ? [this.map.id] : null;
                                err.requireType = this.map.isDefine ? 'define' : 'require';
                                return onError((this.error = err));
                            }

                        } else {
                            //Just a literal value
                            exports = factory;
                        }

                        this.exports = exports;

                        if (this.map.isDefine && !this.ignore) {
                            defined[id] = exports;

                            if (req.onResourceLoad) {
                                var resLoadMaps = [];
                                each(this.depMaps, function (depMap) {
                                    resLoadMaps.push(depMap.normalizedMap || depMap);
                                });
                                req.onResourceLoad(context, this.map, resLoadMaps);
                            }
                        }

                        //Clean up
                        cleanRegistry(id);

                        this.defined = true;
                    }

                    //Finished the define stage. Allow calling check again
                    //to allow define notifications below in the case of a
                    //cycle.
                    this.defining = false;

                    if (this.defined && !this.defineEmitted) {
                        this.defineEmitted = true;
                        this.emit('defined', this.exports);
                        this.defineEmitComplete = true;
                    }

                }
            },

            callPlugin: function () {
                var map = this.map,
                    id = map.id,
                    //Map already normalized the prefix.
                    pluginMap = makeModuleMap(map.prefix);

                //Mark this as a dependency for this plugin, so it
                //can be traced for cycles.
                this.depMaps.push(pluginMap);

                on(pluginMap, 'defined', bind(this, function (plugin) {
                    var load, normalizedMap, normalizedMod,
                        bundleId = getOwn(bundlesMap, this.map.id),
                        name = this.map.name,
                        parentName = this.map.parentMap ? this.map.parentMap.name : null,
                        localRequire = context.makeRequire(map.parentMap, {
                            enableBuildCallback: true
                        });

                    //If current map is not normalized, wait for that
                    //normalized name to load instead of continuing.
                    if (this.map.unnormalized) {
                        //Normalize the ID if the plugin allows it.
                        if (plugin.normalize) {
                            name = plugin.normalize(name, function (name) {
                                return normalize(name, parentName, true);
                            }) || '';
                        }

                        //prefix and name should already be normalized, no need
                        //for applying map config again either.
                        normalizedMap = makeModuleMap(map.prefix + '!' + name,
                                                      this.map.parentMap);
                        on(normalizedMap,
                            'defined', bind(this, function (value) {
                                this.map.normalizedMap = normalizedMap;
                                this.init([], function () { return value; }, null, {
                                    enabled: true,
                                    ignore: true
                                });
                            }));

                        normalizedMod = getOwn(registry, normalizedMap.id);
                        if (normalizedMod) {
                            //Mark this as a dependency for this plugin, so it
                            //can be traced for cycles.
                            this.depMaps.push(normalizedMap);

                            if (this.events.error) {
                                normalizedMod.on('error', bind(this, function (err) {
                                    this.emit('error', err);
                                }));
                            }
                            normalizedMod.enable();
                        }

                        return;
                    }

                    //If a paths config, then just load that file instead to
                    //resolve the plugin, as it is built into that paths layer.
                    if (bundleId) {
                        this.map.url = context.nameToUrl(bundleId);
                        this.load();
                        return;
                    }

                    load = bind(this, function (value) {
                        this.init([], function () { return value; }, null, {
                            enabled: true
                        });
                    });

                    load.error = bind(this, function (err) {
                        this.inited = true;
                        this.error = err;
                        err.requireModules = [id];

                        //Remove temp unnormalized modules for this module,
                        //since they will never be resolved otherwise now.
                        eachProp(registry, function (mod) {
                            if (mod.map.id.indexOf(id + '_unnormalized') === 0) {
                                cleanRegistry(mod.map.id);
                            }
                        });

                        onError(err);
                    });

                    //Allow plugins to load other code without having to know the
                    //context or how to 'complete' the load.
                    load.fromText = bind(this, function (text, textAlt) {
                        /*jslint evil: true */
                        var moduleName = map.name,
                            moduleMap = makeModuleMap(moduleName),
                            hasInteractive = useInteractive;

                        //As of 2.1.0, support just passing the text, to reinforce
                        //fromText only being called once per resource. Still
                        //support old style of passing moduleName but discard
                        //that moduleName in favor of the internal ref.
                        if (textAlt) {
                            text = textAlt;
                        }

                        //Turn off interactive script matching for IE for any define
                        //calls in the text, then turn it back on at the end.
                        if (hasInteractive) {
                            useInteractive = false;
                        }

                        //Prime the system by creating a module instance for
                        //it.
                        getModule(moduleMap);

                        //Transfer any config to this other module.
                        if (hasProp(config.config, id)) {
                            config.config[moduleName] = config.config[id];
                        }

                        try {
                            req.exec(text);
                        } catch (e) {
                            return onError(makeError('fromtexteval',
                                             'fromText eval for ' + id +
                                            ' failed: ' + e,
                                             e,
                                             [id]));
                        }

                        if (hasInteractive) {
                            useInteractive = true;
                        }

                        //Mark this as a dependency for the plugin
                        //resource
                        this.depMaps.push(moduleMap);

                        //Support anonymous modules.
                        context.completeLoad(moduleName);

                        //Bind the value of that module to the value for this
                        //resource ID.
                        localRequire([moduleName], load);
                    });

                    //Use parentName here since the plugin's name is not reliable,
                    //could be some weird string with no path that actually wants to
                    //reference the parentName's path.
                    plugin.load(map.name, localRequire, load, config);
                }));

                context.enable(pluginMap, this);
                this.pluginMaps[pluginMap.id] = pluginMap;
            },

            enable: function () {
                enabledRegistry[this.map.id] = this;
                this.enabled = true;

                //Set flag mentioning that the module is enabling,
                //so that immediate calls to the defined callbacks
                //for dependencies do not trigger inadvertent load
                //with the depCount still being zero.
                this.enabling = true;

                //Enable each dependency
                each(this.depMaps, bind(this, function (depMap, i) {
                    var id, mod, handler;

                    if (typeof depMap === 'string') {
                        //Dependency needs to be converted to a depMap
                        //and wired up to this module.
                        depMap = makeModuleMap(depMap,
                                               (this.map.isDefine ? this.map : this.map.parentMap),
                                               false,
                                               !this.skipMap);
                        this.depMaps[i] = depMap;

                        handler = getOwn(handlers, depMap.id);

                        if (handler) {
                            this.depExports[i] = handler(this);
                            return;
                        }

                        this.depCount += 1;

                        on(depMap, 'defined', bind(this, function (depExports) {
                            if (this.undefed) {
                                return;
                            }
                            this.defineDep(i, depExports);
                            this.check();
                        }));

                        if (this.errback) {
                            on(depMap, 'error', bind(this, this.errback));
                        } else if (this.events.error) {
                            // No direct errback on this module, but something
                            // else is listening for errors, so be sure to
                            // propagate the error correctly.
                            on(depMap, 'error', bind(this, function(err) {
                                this.emit('error', err);
                            }));
                        }
                    }

                    id = depMap.id;
                    mod = registry[id];

                    //Skip special modules like 'require', 'exports', 'module'
                    //Also, don't call enable if it is already enabled,
                    //important in circular dependency cases.
                    if (!hasProp(handlers, id) && mod && !mod.enabled) {
                        context.enable(depMap, this);
                    }
                }));

                //Enable each plugin that is used in
                //a dependency
                eachProp(this.pluginMaps, bind(this, function (pluginMap) {
                    var mod = getOwn(registry, pluginMap.id);
                    if (mod && !mod.enabled) {
                        context.enable(pluginMap, this);
                    }
                }));

                this.enabling = false;

                this.check();
            },

            on: function (name, cb) {
                var cbs = this.events[name];
                if (!cbs) {
                    cbs = this.events[name] = [];
                }
                cbs.push(cb);
            },

            emit: function (name, evt) {
                each(this.events[name], function (cb) {
                    cb(evt);
                });
                if (name === 'error') {
                    //Now that the error handler was triggered, remove
                    //the listeners, since this broken Module instance
                    //can stay around for a while in the registry.
                    delete this.events[name];
                }
            }
        };

        function callGetModule(args) {
            //Skip modules already defined.
            if (!hasProp(defined, args[0])) {
                getModule(makeModuleMap(args[0], null, true)).init(args[1], args[2]);
            }
        }

        function removeListener(node, func, name, ieName) {
            //Favor detachEvent because of IE9
            //issue, see attachEvent/addEventListener comment elsewhere
            //in this file.
            if (node.detachEvent && !isOpera) {
                //Probably IE. If not it will throw an error, which will be
                //useful to know.
                if (ieName) {
                    node.detachEvent(ieName, func);
                }
            } else {
                node.removeEventListener(name, func, false);
            }
        }

        /**
         * Given an event from a script node, get the requirejs info from it,
         * and then removes the event listeners on the node.
         * @param {Event} evt
         * @returns {Object}
         */
        function getScriptData(evt) {
            //Using currentTarget instead of target for Firefox 2.0's sake. Not
            //all old browsers will be supported, but this one was easy enough
            //to support and still makes sense.
            var node = evt.currentTarget || evt.srcElement;

            //Remove the listeners once here.
            removeListener(node, context.onScriptLoad, 'load', 'onreadystatechange');
            removeListener(node, context.onScriptError, 'error');

            return {
                node: node,
                id: node && node.getAttribute('data-requiremodule')
            };
        }

        function intakeDefines() {
            var args;

            //Any defined modules in the global queue, intake them now.
            takeGlobalQueue();

            //Make sure any remaining defQueue items get properly processed.
            while (defQueue.length) {
                args = defQueue.shift();
                if (args[0] === null) {
                    return onError(makeError('mismatch', 'Mismatched anonymous define() module: ' +
                        args[args.length - 1]));
                } else {
                    //args are id, deps, factory. Should be normalized by the
                    //define() function.
                    callGetModule(args);
                }
            }
            context.defQueueMap = {};
        }

        context = {
            config: config,
            contextName: contextName,
            registry: registry,
            defined: defined,
            urlFetched: urlFetched,
            defQueue: defQueue,
            defQueueMap: {},
            Module: Module,
            makeModuleMap: makeModuleMap,
            nextTick: req.nextTick,
            onError: onError,

            /**
             * Set a configuration for the context.
             * @param {Object} cfg config object to integrate.
             */
            configure: function (cfg) {
                //Make sure the baseUrl ends in a slash.
                if (cfg.baseUrl) {
                    if (cfg.baseUrl.charAt(cfg.baseUrl.length - 1) !== '/') {
                        cfg.baseUrl += '/';
                    }
                }

                // Convert old style urlArgs string to a function.
                if (typeof cfg.urlArgs === 'string') {
                    var urlArgs = cfg.urlArgs;
                    cfg.urlArgs = function(id, url) {
                        return (url.indexOf('?') === -1 ? '?' : '&') + urlArgs;
                    };
                }

                //Save off the paths since they require special processing,
                //they are additive.
                var shim = config.shim,
                    objs = {
                        paths: true,
                        bundles: true,
                        config: true,
                        map: true
                    };

                eachProp(cfg, function (value, prop) {
                    if (objs[prop]) {
                        if (!config[prop]) {
                            config[prop] = {};
                        }
                        mixin(config[prop], value, true, true);
                    } else {
                        config[prop] = value;
                    }
                });

                //Reverse map the bundles
                if (cfg.bundles) {
                    eachProp(cfg.bundles, function (value, prop) {
                        each(value, function (v) {
                            if (v !== prop) {
                                bundlesMap[v] = prop;
                            }
                        });
                    });
                }

                //Merge shim
                if (cfg.shim) {
                    eachProp(cfg.shim, function (value, id) {
                        //Normalize the structure
                        if (isArray(value)) {
                            value = {
                                deps: value
                            };
                        }
                        if ((value.exports || value.init) && !value.exportsFn) {
                            value.exportsFn = context.makeShimExports(value);
                        }
                        shim[id] = value;
                    });
                    config.shim = shim;
                }

                //Adjust packages if necessary.
                if (cfg.packages) {
                    each(cfg.packages, function (pkgObj) {
                        var location, name;

                        pkgObj = typeof pkgObj === 'string' ? {name: pkgObj} : pkgObj;

                        name = pkgObj.name;
                        location = pkgObj.location;
                        if (location) {
                            config.paths[name] = pkgObj.location;
                        }

                        //Save pointer to main module ID for pkg name.
                        //Remove leading dot in main, so main paths are normalized,
                        //and remove any trailing .js, since different package
                        //envs have different conventions: some use a module name,
                        //some use a file name.
                        config.pkgs[name] = pkgObj.name + '/' + (pkgObj.main || 'main')
                                     .replace(currDirRegExp, '')
                                     .replace(jsSuffixRegExp, '');
                    });
                }

                //If there are any "waiting to execute" modules in the registry,
                //update the maps for them, since their info, like URLs to load,
                //may have changed.
                eachProp(registry, function (mod, id) {
                    //If module already has init called, since it is too
                    //late to modify them, and ignore unnormalized ones
                    //since they are transient.
                    if (!mod.inited && !mod.map.unnormalized) {
                        mod.map = makeModuleMap(id, null, true);
                    }
                });

                //If a deps array or a config callback is specified, then call
                //require with those args. This is useful when require is defined as a
                //config object before require.js is loaded.
                if (cfg.deps || cfg.callback) {
                    context.require(cfg.deps || [], cfg.callback);
                }
            },

            makeShimExports: function (value) {
                function fn() {
                    var ret;
                    if (value.init) {
                        ret = value.init.apply(global, arguments);
                    }
                    return ret || (value.exports && getGlobal(value.exports));
                }
                return fn;
            },

            makeRequire: function (relMap, options) {
                options = options || {};

                function localRequire(deps, callback, errback) {
                    var id, map, requireMod;

                    if (options.enableBuildCallback && callback && isFunction(callback)) {
                        callback.__requireJsBuild = true;
                    }

                    if (typeof deps === 'string') {
                        if (isFunction(callback)) {
                            //Invalid call
                            return onError(makeError('requireargs', 'Invalid require call'), errback);
                        }

                        //If require|exports|module are requested, get the
                        //value for them from the special handlers. Caveat:
                        //this only works while module is being defined.
                        if (relMap && hasProp(handlers, deps)) {
                            return handlers[deps](registry[relMap.id]);
                        }

                        //Synchronous access to one module. If require.get is
                        //available (as in the Node adapter), prefer that.
                        if (req.get) {
                            return req.get(context, deps, relMap, localRequire);
                        }

                        //Normalize module name, if it contains . or ..
                        map = makeModuleMap(deps, relMap, false, true);
                        id = map.id;

                        if (!hasProp(defined, id)) {
                            return onError(makeError('notloaded', 'Module name "' +
                                        id +
                                        '" has not been loaded yet for context: ' +
                                        contextName +
                                        (relMap ? '' : '. Use require([])')));
                        }
                        return defined[id];
                    }

                    //Grab defines waiting in the global queue.
                    intakeDefines();

                    //Mark all the dependencies as needing to be loaded.
                    context.nextTick(function () {
                        //Some defines could have been added since the
                        //require call, collect them.
                        intakeDefines();

                        requireMod = getModule(makeModuleMap(null, relMap));

                        //Store if map config should be applied to this require
                        //call for dependencies.
                        requireMod.skipMap = options.skipMap;

                        requireMod.init(deps, callback, errback, {
                            enabled: true
                        });

                        checkLoaded();
                    });

                    return localRequire;
                }

                mixin(localRequire, {
                    isBrowser: isBrowser,

                    /**
                     * Converts a module name + .extension into an URL path.
                     * *Requires* the use of a module name. It does not support using
                     * plain URLs like nameToUrl.
                     */
                    toUrl: function (moduleNamePlusExt) {
                        var ext,
                            index = moduleNamePlusExt.lastIndexOf('.'),
                            segment = moduleNamePlusExt.split('/')[0],
                            isRelative = segment === '.' || segment === '..';

                        //Have a file extension alias, and it is not the
                        //dots from a relative path.
                        if (index !== -1 && (!isRelative || index > 1)) {
                            ext = moduleNamePlusExt.substring(index, moduleNamePlusExt.length);
                            moduleNamePlusExt = moduleNamePlusExt.substring(0, index);
                        }

                        return context.nameToUrl(normalize(moduleNamePlusExt,
                                                relMap && relMap.id, true), ext,  true);
                    },

                    defined: function (id) {
                        return hasProp(defined, makeModuleMap(id, relMap, false, true).id);
                    },

                    specified: function (id) {
                        id = makeModuleMap(id, relMap, false, true).id;
                        return hasProp(defined, id) || hasProp(registry, id);
                    }
                });

                //Only allow undef on top level require calls
                if (!relMap) {
                    localRequire.undef = function (id) {
                        //Bind any waiting define() calls to this context,
                        //fix for #408
                        takeGlobalQueue();

                        var map = makeModuleMap(id, relMap, true),
                            mod = getOwn(registry, id);

                        mod.undefed = true;
                        removeScript(id);

                        delete defined[id];
                        delete urlFetched[map.url];
                        delete undefEvents[id];

                        //Clean queued defines too. Go backwards
                        //in array so that the splices do not
                        //mess up the iteration.
                        eachReverse(defQueue, function(args, i) {
                            if (args[0] === id) {
                                defQueue.splice(i, 1);
                            }
                        });
                        delete context.defQueueMap[id];

                        if (mod) {
                            //Hold on to listeners in case the
                            //module will be attempted to be reloaded
                            //using a different config.
                            if (mod.events.defined) {
                                undefEvents[id] = mod.events;
                            }

                            cleanRegistry(id);
                        }
                    };
                }

                return localRequire;
            },

            /**
             * Called to enable a module if it is still in the registry
             * awaiting enablement. A second arg, parent, the parent module,
             * is passed in for context, when this method is overridden by
             * the optimizer. Not shown here to keep code compact.
             */
            enable: function (depMap) {
                var mod = getOwn(registry, depMap.id);
                if (mod) {
                    getModule(depMap).enable();
                }
            },

            /**
             * Internal method used by environment adapters to complete a load event.
             * A load event could be a script load or just a load pass from a synchronous
             * load call.
             * @param {String} moduleName the name of the module to potentially complete.
             */
            completeLoad: function (moduleName) {
                var found, args, mod,
                    shim = getOwn(config.shim, moduleName) || {},
                    shExports = shim.exports;

                takeGlobalQueue();

                while (defQueue.length) {
                    args = defQueue.shift();
                    if (args[0] === null) {
                        args[0] = moduleName;
                        //If already found an anonymous module and bound it
                        //to this name, then this is some other anon module
                        //waiting for its completeLoad to fire.
                        if (found) {
                            break;
                        }
                        found = true;
                    } else if (args[0] === moduleName) {
                        //Found matching define call for this script!
                        found = true;
                    }

                    callGetModule(args);
                }
                context.defQueueMap = {};

                //Do this after the cycle of callGetModule in case the result
                //of those calls/init calls changes the registry.
                mod = getOwn(registry, moduleName);

                if (!found && !hasProp(defined, moduleName) && mod && !mod.inited) {
                    if (config.enforceDefine && (!shExports || !getGlobal(shExports))) {
                        if (hasPathFallback(moduleName)) {
                            return;
                        } else {
                            return onError(makeError('nodefine',
                                             'No define call for ' + moduleName,
                                             null,
                                             [moduleName]));
                        }
                    } else {
                        //A script that does not call define(), so just simulate
                        //the call for it.
                        callGetModule([moduleName, (shim.deps || []), shim.exportsFn]);
                    }
                }

                checkLoaded();
            },

            /**
             * Converts a module name to a file path. Supports cases where
             * moduleName may actually be just an URL.
             * Note that it **does not** call normalize on the moduleName,
             * it is assumed to have already been normalized. This is an
             * internal API, not a public one. Use toUrl for the public API.
             */
            nameToUrl: function (moduleName, ext, skipExt) {
                var paths, syms, i, parentModule, url,
                    parentPath, bundleId,
                    pkgMain = getOwn(config.pkgs, moduleName);

                if (pkgMain) {
                    moduleName = pkgMain;
                }

                bundleId = getOwn(bundlesMap, moduleName);

                if (bundleId) {
                    return context.nameToUrl(bundleId, ext, skipExt);
                }

                //If a colon is in the URL, it indicates a protocol is used and it is just
                //an URL to a file, or if it starts with a slash, contains a query arg (i.e. ?)
                //or ends with .js, then assume the user meant to use an url and not a module id.
                //The slash is important for protocol-less URLs as well as full paths.
                if (req.jsExtRegExp.test(moduleName)) {
                    //Just a plain path, not module name lookup, so just return it.
                    //Add extension if it is included. This is a bit wonky, only non-.js things pass
                    //an extension, this method probably needs to be reworked.
                    url = moduleName + (ext || '');
                } else {
                    //A module that needs to be converted to a path.
                    paths = config.paths;

                    syms = moduleName.split('/');
                    //For each module name segment, see if there is a path
                    //registered for it. Start with most specific name
                    //and work up from it.
                    for (i = syms.length; i > 0; i -= 1) {
                        parentModule = syms.slice(0, i).join('/');

                        parentPath = getOwn(paths, parentModule);
                        if (parentPath) {
                            //If an array, it means there are a few choices,
                            //Choose the one that is desired
                            if (isArray(parentPath)) {
                                parentPath = parentPath[0];
                            }
                            syms.splice(0, i, parentPath);
                            break;
                        }
                    }

                    //Join the path parts together, then figure out if baseUrl is needed.
                    url = syms.join('/');
                    url += (ext || (/^data\:|^blob\:|\?/.test(url) || skipExt ? '' : '.js'));
                    url = (url.charAt(0) === '/' || url.match(/^[\w\+\.\-]+:/) ? '' : config.baseUrl) + url;
                }

                return config.urlArgs && !/^blob\:/.test(url) ?
                       url + config.urlArgs(moduleName, url) : url;
            },

            //Delegates to req.load. Broken out as a separate function to
            //allow overriding in the optimizer.
            load: function (id, url) {
                req.load(context, id, url);
            },

            /**
             * Executes a module callback function. Broken out as a separate function
             * solely to allow the build system to sequence the files in the built
             * layer in the right sequence.
             *
             * @private
             */
            execCb: function (name, callback, args, exports) {
                return callback.apply(exports, args);
            },

            /**
             * callback for script loads, used to check status of loading.
             *
             * @param {Event} evt the event from the browser for the script
             * that was loaded.
             */
            onScriptLoad: function (evt) {
                //Using currentTarget instead of target for Firefox 2.0's sake. Not
                //all old browsers will be supported, but this one was easy enough
                //to support and still makes sense.
                if (evt.type === 'load' ||
                        (readyRegExp.test((evt.currentTarget || evt.srcElement).readyState))) {
                    //Reset interactive script so a script node is not held onto for
                    //to long.
                    interactiveScript = null;

                    //Pull out the name of the module and the context.
                    var data = getScriptData(evt);
                    context.completeLoad(data.id);
                }
            },

            /**
             * Callback for script errors.
             */
            onScriptError: function (evt) {
                var data = getScriptData(evt);
                if (!hasPathFallback(data.id)) {
                    var parents = [];
                    eachProp(registry, function(value, key) {
                        if (key.indexOf('_@r') !== 0) {
                            each(value.depMaps, function(depMap) {
                                if (depMap.id === data.id) {
                                    parents.push(key);
                                    return true;
                                }
                            });
                        }
                    });
                    return onError(makeError('scripterror', 'Script error for "' + data.id +
                                             (parents.length ?
                                             '", needed by: ' + parents.join(', ') :
                                             '"'), evt, [data.id]));
                }
            }
        };

        context.require = context.makeRequire();
        return context;
    }

    /**
     * Main entry point.
     *
     * If the only argument to require is a string, then the module that
     * is represented by that string is fetched for the appropriate context.
     *
     * If the first argument is an array, then it will be treated as an array
     * of dependency string names to fetch. An optional function callback can
     * be specified to execute when all of those dependencies are available.
     *
     * Make a local req variable to help Caja compliance (it assumes things
     * on a require that are not standardized), and to give a short
     * name for minification/local scope use.
     */
    req = requirejs = function (deps, callback, errback, optional) {

        //Find the right context, use default
        var context, config,
            contextName = defContextName;

        // Determine if have config object in the call.
        if (!isArray(deps) && typeof deps !== 'string') {
            // deps is a config object
            config = deps;
            if (isArray(callback)) {
                // Adjust args if there are dependencies
                deps = callback;
                callback = errback;
                errback = optional;
            } else {
                deps = [];
            }
        }

        if (config && config.context) {
            contextName = config.context;
        }

        context = getOwn(contexts, contextName);
        if (!context) {
            context = contexts[contextName] = req.s.newContext(contextName);
        }

        if (config) {
            context.configure(config);
        }

        return context.require(deps, callback, errback);
    };

    /**
     * Support require.config() to make it easier to cooperate with other
     * AMD loaders on globally agreed names.
     */
    req.config = function (config) {
        return req(config);
    };

    /**
     * Execute something after the current tick
     * of the event loop. Override for other envs
     * that have a better solution than setTimeout.
     * @param  {Function} fn function to execute later.
     */
    req.nextTick = typeof setTimeout !== 'undefined' ? function (fn) {
        setTimeout(fn, 4);
    } : function (fn) { fn(); };

    /**
     * Export require as a global, but only if it does not already exist.
     */
    if (!require) {
        require = req;
    }

    req.version = version;

    //Used to filter out dependencies that are already paths.
    req.jsExtRegExp = /^\/|:|\?|\.js$/;
    req.isBrowser = isBrowser;
    s = req.s = {
        contexts: contexts,
        newContext: newContext
    };

    //Create default context.
    req({});

    //Exports some context-sensitive methods on global require.
    each([
        'toUrl',
        'undef',
        'defined',
        'specified'
    ], function (prop) {
        //Reference from contexts instead of early binding to default context,
        //so that during builds, the latest instance of the default context
        //with its config gets used.
        req[prop] = function () {
            var ctx = contexts[defContextName];
            return ctx.require[prop].apply(ctx, arguments);
        };
    });

    if (isBrowser) {
        head = s.head = document.getElementsByTagName('head')[0];
        //If BASE tag is in play, using appendChild is a problem for IE6.
        //When that browser dies, this can be removed. Details in this jQuery bug:
        //http://dev.jquery.com/ticket/2709
        baseElement = document.getElementsByTagName('base')[0];
        if (baseElement) {
            head = s.head = baseElement.parentNode;
        }
    }

    /**
     * Any errors that require explicitly generates will be passed to this
     * function. Intercept/override it if you want custom error handling.
     * @param {Error} err the error object.
     */
    req.onError = defaultOnError;

    /**
     * Creates the node for the load command. Only used in browser envs.
     */
    req.createNode = function (config, moduleName, url) {
        var node = config.xhtml ?
                document.createElementNS('http://www.w3.org/1999/xhtml', 'html:script') :
                document.createElement('script');
        node.type = config.scriptType || 'text/javascript';
        node.charset = 'utf-8';
        node.async = true;
        return node;
    };

    /**
     * Does the request to load a module for the browser case.
     * Make this a separate function to allow other environments
     * to override it.
     *
     * @param {Object} context the require context to find state.
     * @param {String} moduleName the name of the module.
     * @param {Object} url the URL to the module.
     */
    req.load = function (context, moduleName, url) {
        var config = (context && context.config) || {},
            node;
        if (isBrowser) {
            //In the browser so use a script tag
            node = req.createNode(config, moduleName, url);

            node.setAttribute('data-requirecontext', context.contextName);
            node.setAttribute('data-requiremodule', moduleName);

            //Set up load listener. Test attachEvent first because IE9 has
            //a subtle issue in its addEventListener and script onload firings
            //that do not match the behavior of all other browsers with
            //addEventListener support, which fire the onload event for a
            //script right after the script execution. See:
            //https://connect.microsoft.com/IE/feedback/details/648057/script-onload-event-is-not-fired-immediately-after-script-execution
            //UNFORTUNATELY Opera implements attachEvent but does not follow the script
            //script execution mode.
            if (node.attachEvent &&
                    //Check if node.attachEvent is artificially added by custom script or
                    //natively supported by browser
                    //read https://github.com/requirejs/requirejs/issues/187
                    //if we can NOT find [native code] then it must NOT natively supported.
                    //in IE8, node.attachEvent does not have toString()
                    //Note the test for "[native code" with no closing brace, see:
                    //https://github.com/requirejs/requirejs/issues/273
                    !(node.attachEvent.toString && node.attachEvent.toString().indexOf('[native code') < 0) &&
                    !isOpera) {
                //Probably IE. IE (at least 6-8) do not fire
                //script onload right after executing the script, so
                //we cannot tie the anonymous define call to a name.
                //However, IE reports the script as being in 'interactive'
                //readyState at the time of the define call.
                useInteractive = true;

                node.attachEvent('onreadystatechange', context.onScriptLoad);
                //It would be great to add an error handler here to catch
                //404s in IE9+. However, onreadystatechange will fire before
                //the error handler, so that does not help. If addEventListener
                //is used, then IE will fire error before load, but we cannot
                //use that pathway given the connect.microsoft.com issue
                //mentioned above about not doing the 'script execute,
                //then fire the script load event listener before execute
                //next script' that other browsers do.
                //Best hope: IE10 fixes the issues,
                //and then destroys all installs of IE 6-9.
                //node.attachEvent('onerror', context.onScriptError);
            } else {
                node.addEventListener('load', context.onScriptLoad, false);
                node.addEventListener('error', context.onScriptError, false);
            }
            node.src = url;

            //Calling onNodeCreated after all properties on the node have been
            //set, but before it is placed in the DOM.
            if (config.onNodeCreated) {
                config.onNodeCreated(node, config, moduleName, url);
            }

            //For some cache cases in IE 6-8, the script executes before the end
            //of the appendChild execution, so to tie an anonymous define
            //call to the module name (which is stored on the node), hold on
            //to a reference to this node, but clear after the DOM insertion.
            currentlyAddingScript = node;
            if (baseElement) {
                head.insertBefore(node, baseElement);
            } else {
                head.appendChild(node);
            }
            currentlyAddingScript = null;

            return node;
        } else if (isWebWorker) {
            try {
                //In a web worker, use importScripts. This is not a very
                //efficient use of importScripts, importScripts will block until
                //its script is downloaded and evaluated. However, if web workers
                //are in play, the expectation is that a build has been done so
                //that only one script needs to be loaded anyway. This may need
                //to be reevaluated if other use cases become common.

                // Post a task to the event loop to work around a bug in WebKit
                // where the worker gets garbage-collected after calling
                // importScripts(): https://webkit.org/b/153317
                setTimeout(function() {}, 0);
                importScripts(url);

                //Account for anonymous modules
                context.completeLoad(moduleName);
            } catch (e) {
                context.onError(makeError('importscripts',
                                'importScripts failed for ' +
                                    moduleName + ' at ' + url,
                                e,
                                [moduleName]));
            }
        }
    };

    function getInteractiveScript() {
        if (interactiveScript && interactiveScript.readyState === 'interactive') {
            return interactiveScript;
        }

        eachReverse(scripts(), function (script) {
            if (script.readyState === 'interactive') {
                return (interactiveScript = script);
            }
        });
        return interactiveScript;
    }

    //Look for a data-main script attribute, which could also adjust the baseUrl.
    if (isBrowser && !cfg.skipDataMain) {
        //Figure out baseUrl. Get it from the script tag with require.js in it.
        eachReverse(scripts(), function (script) {
            //Set the 'head' where we can append children by
            //using the script's parent.
            if (!head) {
                head = script.parentNode;
            }

            //Look for a data-main attribute to set main script for the page
            //to load. If it is there, the path to data main becomes the
            //baseUrl, if it is not already set.
            dataMain = script.getAttribute('data-main');
            if (dataMain) {
                //Preserve dataMain in case it is a path (i.e. contains '?')
                mainScript = dataMain;

                //Set final baseUrl if there is not already an explicit one,
                //but only do so if the data-main value is not a loader plugin
                //module ID.
                if (!cfg.baseUrl && mainScript.indexOf('!') === -1) {
                    //Pull off the directory of data-main for use as the
                    //baseUrl.
                    src = mainScript.split('/');
                    mainScript = src.pop();
                    subPath = src.length ? src.join('/')  + '/' : './';

                    cfg.baseUrl = subPath;
                }

                //Strip off any trailing .js since mainScript is now
                //like a module name.
                mainScript = mainScript.replace(jsSuffixRegExp, '');

                //If mainScript is still a path, fall back to dataMain
                if (req.jsExtRegExp.test(mainScript)) {
                    mainScript = dataMain;
                }

                //Put the data-main script in the files to load.
                cfg.deps = cfg.deps ? cfg.deps.concat(mainScript) : [mainScript];

                return true;
            }
        });
    }

    /**
     * The function that handles definitions of modules. Differs from
     * require() in that a string for the module should be the first argument,
     * and the function to execute after dependencies are loaded should
     * return a value to define the module corresponding to the first argument's
     * name.
     */
    define = function (name, deps, callback) {
        var node, context;

        //Allow for anonymous modules
        if (typeof name !== 'string') {
            //Adjust args appropriately
            callback = deps;
            deps = name;
            name = null;
        }

        //This module may not have dependencies
        if (!isArray(deps)) {
            callback = deps;
            deps = null;
        }

        //If no name, and callback is a function, then figure out if it a
        //CommonJS thing with dependencies.
        if (!deps && isFunction(callback)) {
            deps = [];
            //Remove comments from the callback string,
            //look for require calls, and pull them into the dependencies,
            //but only if there are function args.
            if (callback.length) {
                callback
                    .toString()
                    .replace(commentRegExp, commentReplace)
                    .replace(cjsRequireRegExp, function (match, dep) {
                        deps.push(dep);
                    });

                //May be a CommonJS thing even without require calls, but still
                //could use exports, and module. Avoid doing exports and module
                //work though if it just needs require.
                //REQUIRES the function to expect the CommonJS variables in the
                //order listed below.
                deps = (callback.length === 1 ? ['require'] : ['require', 'exports', 'module']).concat(deps);
            }
        }

        //If in IE 6-8 and hit an anonymous define() call, do the interactive
        //work.
        if (useInteractive) {
            node = currentlyAddingScript || getInteractiveScript();
            if (node) {
                if (!name) {
                    name = node.getAttribute('data-requiremodule');
                }
                context = contexts[node.getAttribute('data-requirecontext')];
            }
        }

        //Always save off evaluating the def call until the script onload handler.
        //This allows multiple modules to be in a file without prematurely
        //tracing dependencies, and allows for anonymous module support,
        //where the module name is not known until the script onload event
        //occurs. If no context, use the global queue, and get it processed
        //in the onscript load callback.
        if (context) {
            context.defQueue.push([name, deps, callback]);
            context.defQueueMap[name] = true;
        } else {
            globalDefQueue.push([name, deps, callback]);
        }
    };

    define.amd = {
        jQuery: true
    };

    /**
     * Executes the text. Normally just uses eval, but can be modified
     * to use a better, environment-specific call. Only used for transpiling
     * loader plugins, not for plain JS modules.
     * @param {String} text the text to execute/evaluate.
     */
    req.exec = function (text) {
        /*jslint evil: true */
        return eval(text);
    };

    //Set up with config info.
    req(cfg);
}(this));

define("requireLib", function(){});

define('modules/uv-shared-module/BaseCommands',["require", "exports"], function (require, exports) {
    "use strict";
    var BaseCommands = (function () {
        function BaseCommands() {
        }
        return BaseCommands;
    }());
    BaseCommands.namespace = 'uv.';
    BaseCommands.ACCEPT_TERMS = BaseCommands.namespace + 'onAcceptTerms';
    BaseCommands.BOOKMARK = BaseCommands.namespace + 'onBookmark';
    BaseCommands.CANVAS_INDEX_CHANGE_FAILED = BaseCommands.namespace + 'onCanvasIndexChangeFailed';
    BaseCommands.CANVAS_INDEX_CHANGED = BaseCommands.namespace + 'onCanvasIndexChanged';
    BaseCommands.CLICKTHROUGH = BaseCommands.namespace + 'onClickthrough';
    BaseCommands.CLOSE_ACTIVE_DIALOGUE = BaseCommands.namespace + 'onCloseActiveDialogue';
    BaseCommands.CLOSE_LEFT_PANEL = BaseCommands.namespace + 'onCloseLeftPanel';
    BaseCommands.CLOSE_RIGHT_PANEL = BaseCommands.namespace + 'onCloseRightPanel';
    BaseCommands.CREATED = BaseCommands.namespace + 'onCreated';
    BaseCommands.DOWN_ARROW = BaseCommands.namespace + 'onDownArrow';
    BaseCommands.DOWNLOAD = BaseCommands.namespace + 'onDownload';
    BaseCommands.DROP = BaseCommands.namespace + 'onDrop';
    BaseCommands.END = BaseCommands.namespace + 'onEnd';
    BaseCommands.ESCAPE = BaseCommands.namespace + 'onEscape';
    BaseCommands.EXTERNAL_LINK_CLICKED = BaseCommands.namespace + 'onExternalLinkClicked';
    BaseCommands.FEEDBACK = BaseCommands.namespace + 'onFeedback';
    BaseCommands.FORBIDDEN = BaseCommands.namespace + 'onForbidden';
    BaseCommands.HIDE_CLICKTHROUGH_DIALOGUE = BaseCommands.namespace + 'onHideClickthroughDialogue';
    BaseCommands.HIDE_DOWNLOAD_DIALOGUE = BaseCommands.namespace + 'onHideDownloadDialogue';
    BaseCommands.HIDE_EMBED_DIALOGUE = BaseCommands.namespace + 'onHideEmbedDialogue';
    BaseCommands.HIDE_EXTERNALCONTENT_DIALOGUE = BaseCommands.namespace + 'onHideExternalContentDialogue';
    BaseCommands.HIDE_GENERIC_DIALOGUE = BaseCommands.namespace + 'onHideGenericDialogue';
    BaseCommands.HIDE_HELP_DIALOGUE = BaseCommands.namespace + 'onHideHelpDialogue';
    BaseCommands.HIDE_INFORMATION = BaseCommands.namespace + 'onHideInformation';
    BaseCommands.HIDE_LOGIN_DIALOGUE = BaseCommands.namespace + 'onHideLoginDialogue';
    BaseCommands.HIDE_MOREINFO_DIALOGUE = BaseCommands.namespace + 'onHideMoreInfoDialogue';
    BaseCommands.HIDE_OVERLAY = BaseCommands.namespace + 'onHideOverlay';
    BaseCommands.HIDE_RESTRICTED_DIALOGUE = BaseCommands.namespace + 'onHideRestrictedDialogue';
    BaseCommands.HIDE_SETTINGS_DIALOGUE = BaseCommands.namespace + 'onHideSettingsDialogue';
    BaseCommands.HIDE_SHARE_DIALOGUE = BaseCommands.namespace + 'onHideShareDialogue';
    BaseCommands.HOME = BaseCommands.namespace + 'onHome';
    BaseCommands.LEFT_ARROW = BaseCommands.namespace + 'onLeftArrow';
    BaseCommands.LEFTPANEL_COLLAPSE_FULL_FINISH = BaseCommands.namespace + 'onLeftPanelCollapseFullFinish';
    BaseCommands.LEFTPANEL_COLLAPSE_FULL_START = BaseCommands.namespace + 'onLeftPanelCollapseFullStart';
    BaseCommands.LEFTPANEL_EXPAND_FULL_FINISH = BaseCommands.namespace + 'onLeftPanelExpandFullFinish';
    BaseCommands.LEFTPANEL_EXPAND_FULL_START = BaseCommands.namespace + 'onLeftPanelExpandFullStart';
    BaseCommands.LOAD_FAILED = BaseCommands.namespace + 'onLoadFailed';
    BaseCommands.LOAD = BaseCommands.namespace + 'onLoad';
    BaseCommands.LOGIN_FAILED = BaseCommands.namespace + 'onLoginFailed';
    BaseCommands.LOGIN = BaseCommands.namespace + 'onLogin';
    BaseCommands.LOGOUT = BaseCommands.namespace + 'onLogout';
    BaseCommands.METRIC_CHANGED = BaseCommands.namespace + 'onMetricChanged';
    BaseCommands.MINUS = BaseCommands.namespace + 'onMinus';
    BaseCommands.NOT_FOUND = BaseCommands.namespace + 'onNotFound';
    BaseCommands.OPEN_EXTERNAL_RESOURCE = BaseCommands.namespace + 'onOpenExternalResource';
    BaseCommands.OPEN_LEFT_PANEL = BaseCommands.namespace + 'onOpenLeftPanel';
    BaseCommands.OPEN_RIGHT_PANEL = BaseCommands.namespace + 'onOpenRightPanel';
    BaseCommands.OPEN = BaseCommands.namespace + 'onOpen';
    BaseCommands.PAGE_DOWN = BaseCommands.namespace + 'onPageDown';
    BaseCommands.PAGE_UP = BaseCommands.namespace + 'onPageUp';
    BaseCommands.PARENT_EXIT_FULLSCREEN = BaseCommands.namespace + 'onParentExitFullScreen';
    BaseCommands.PLUS = BaseCommands.namespace + 'onPlus';
    BaseCommands.REDIRECT = BaseCommands.namespace + 'onRedirect';
    BaseCommands.REFRESH = BaseCommands.namespace + 'onRefresh';
    BaseCommands.RESIZE = BaseCommands.namespace + 'onResize';
    BaseCommands.RESOURCE_DEGRADED = BaseCommands.namespace + 'onResourceDegraded';
    BaseCommands.RETRY = BaseCommands.namespace + 'onRetry';
    BaseCommands.RETURN = BaseCommands.namespace + 'onReturn';
    BaseCommands.RIGHT_ARROW = BaseCommands.namespace + 'onRightArrow';
    BaseCommands.RIGHTPANEL_COLLAPSE_FULL_FINISH = BaseCommands.namespace + 'onRightPanelCollapseFullFinish';
    BaseCommands.RIGHTPANEL_COLLAPSE_FULL_START = BaseCommands.namespace + 'onRightPanelCollapseFullStart';
    BaseCommands.RIGHTPANEL_EXPAND_FULL_FINISH = BaseCommands.namespace + 'onRightPanelExpandFullFinish';
    BaseCommands.RIGHTPANEL_EXPAND_FULL_START = BaseCommands.namespace + 'onRightPanelExpandFullStart';
    BaseCommands.SEQUENCE_INDEX_CHANGED = BaseCommands.namespace + 'onSequenceIndexChanged';
    BaseCommands.SETTINGS_CHANGED = BaseCommands.namespace + 'onSettingsChanged';
    BaseCommands.SHOW_CLICKTHROUGH_DIALOGUE = BaseCommands.namespace + 'onShowClickThroughDialogue';
    BaseCommands.SHOW_DOWNLOAD_DIALOGUE = BaseCommands.namespace + 'onShowDownloadDialogue';
    BaseCommands.SHOW_EMBED_DIALOGUE = BaseCommands.namespace + 'onShowEmbedDialogue';
    BaseCommands.SHOW_EXTERNALCONTENT_DIALOGUE = BaseCommands.namespace + 'onShowExternalContentDialogue';
    BaseCommands.SHOW_GENERIC_DIALOGUE = BaseCommands.namespace + 'onShowGenericDialogue';
    BaseCommands.SHOW_HELP_DIALOGUE = BaseCommands.namespace + 'onShowHelpDialogue';
    BaseCommands.SHOW_INFORMATION = BaseCommands.namespace + 'onShowInformation';
    BaseCommands.SHOW_LOGIN_DIALOGUE = BaseCommands.namespace + 'onShowLoginDialogue';
    BaseCommands.SHOW_MOREINFO_DIALOGUE = BaseCommands.namespace + 'onShowMoreInfoDialogue';
    BaseCommands.SHOW_OVERLAY = BaseCommands.namespace + 'onShowOverlay';
    BaseCommands.SHOW_RESTRICTED_DIALOGUE = BaseCommands.namespace + 'onShowRestrictedDialogue';
    BaseCommands.SHOW_SETTINGS_DIALOGUE = BaseCommands.namespace + 'onShowSettingsDialogue';
    BaseCommands.SHOW_SHARE_DIALOGUE = BaseCommands.namespace + 'onShowShareDialogue';
    BaseCommands.SHOW_TERMS_OF_USE = BaseCommands.namespace + 'onShowTermsOfUse';
    BaseCommands.THUMB_SELECTED = BaseCommands.namespace + 'onThumbSelected';
    BaseCommands.TOGGLE_EXPAND_LEFT_PANEL = BaseCommands.namespace + 'onToggleExpandLeftPanel';
    BaseCommands.TOGGLE_EXPAND_RIGHT_PANEL = BaseCommands.namespace + 'onToggleExpandRightPanel';
    BaseCommands.TOGGLE_FULLSCREEN = BaseCommands.namespace + 'onToggleFullScreen';
    BaseCommands.UP_ARROW = BaseCommands.namespace + 'onUpArrow';
    BaseCommands.UPDATE_SETTINGS = BaseCommands.namespace + 'onUpdateSettings';
    BaseCommands.VIEW_FULL_TERMS = BaseCommands.namespace + 'onViewFullTerms';
    BaseCommands.WINDOW_UNLOAD = BaseCommands.namespace + 'onWindowUnload';
    exports.BaseCommands = BaseCommands;
});
//# sourceMappingURL=BaseCommands.js.map;
define('Params',["require", "exports"], function (require, exports) {
    "use strict";
    // do not change order, index is important!
    var Params;
    (function (Params) {
        Params[Params["collectionIndex"] = 0] = "collectionIndex";
        Params[Params["manifestIndex"] = 1] = "manifestIndex";
        Params[Params["sequenceIndex"] = 2] = "sequenceIndex";
        Params[Params["canvasIndex"] = 3] = "canvasIndex";
        Params[Params["xywh"] = 4] = "xywh";
        Params[Params["rotation"] = 5] = "rotation";
        Params[Params["highlight"] = 6] = "highlight";
        Params[Params["anchor"] = 7] = "anchor";
    })(Params = exports.Params || (exports.Params = {}));
});
//# sourceMappingURL=Params.js.map;
define('BootstrapParams',["require", "exports", "./Params"], function (require, exports, Params_1) {
    "use strict";
    var BootstrapParams = (function () {
        function BootstrapParams() {
            this.paramMap = ['c', 'm', 's', 'cv', 'xywh', 'r', 'h', 'a']; // todo: move xywh, r, h, a to their respective extensions
            this.config = Utils.Urls.getQuerystringParameter('config');
            this.domain = Utils.Urls.getQuerystringParameter('domain');
            this.embedDomain = Utils.Urls.getQuerystringParameter('embedDomain');
            this.embedScriptUri = Utils.Urls.getQuerystringParameter('embedScriptUri');
            this.isHomeDomain = Utils.Urls.getQuerystringParameter('isHomeDomain') === 'true';
            this.isLightbox = Utils.Urls.getQuerystringParameter('isLightbox') === 'true';
            this.isOnlyInstance = Utils.Urls.getQuerystringParameter('isOnlyInstance') === 'true';
            this.isReload = Utils.Urls.getQuerystringParameter('isReload') === 'true';
            var jsonpParam = Utils.Urls.getQuerystringParameter('jsonp');
            this.jsonp = jsonpParam === null ? null : !(jsonpParam === 'false' || jsonpParam === '0');
            this.manifestUri = Utils.Urls.getQuerystringParameter('manifestUri');
            var locale = Utils.Urls.getQuerystringParameter('locale') || 'en-GB';
            this.setLocale(locale);
            this.collectionIndex = this.getParam(Params_1.Params.collectionIndex);
            this.manifestIndex = this.getParam(Params_1.Params.manifestIndex);
            this.sequenceIndex = this.getParam(Params_1.Params.sequenceIndex);
            this.canvasIndex = this.getParam(Params_1.Params.canvasIndex);
        }
        BootstrapParams.prototype.getLocaleName = function () {
            return this.localeName;
        };
        BootstrapParams.prototype.getParam = function (param) {
            if (this.hashParamsAvailable()) {
                // get param from parent document
                var p = parseInt(Utils.Urls.getHashParameter(this.paramMap[param], parent.document));
                if (p || p === 0)
                    return p;
            }
            // get param from iframe querystring
            return parseInt(Utils.Urls.getQuerystringParameter(this.paramMap[param])) || 0;
        };
        BootstrapParams.prototype.hashParamsAvailable = function () {
            return (this.isHomeDomain && !this.isReload && this.isOnlyInstance);
        };
        // parse string 'en-GB' or 'en-GB:English,cy-GB:Welsh' into array
        BootstrapParams.prototype.setLocale = function (locale) {
            this.locale = locale;
            this.locales = [];
            var l = this.locale.split(',');
            for (var i = 0; i < l.length; i++) {
                var v = l[i].split(':');
                this.locales.push({
                    name: v[0].trim(),
                    label: (v[1]) ? v[1].trim() : ""
                });
            }
            this.localeName = this.locales[0].name;
        };
        return BootstrapParams;
    }());
    exports.BootstrapParams = BootstrapParams;
});
//# sourceMappingURL=BootstrapParams.js.map;
define('Bootstrapper',["require", "exports", "./modules/uv-shared-module/BaseCommands", "./BootstrapParams"], function (require, exports, BaseCommands_1, BootstrapParams_1) {
    "use strict";
    // The Bootstrapper is concerned with loading the manifest/collection (iiifResource)
    // then determining which extension to use and instantiating it.
    var Bootstrapper = (function () {
        function Bootstrapper(extensions) {
            this.isFullScreen = false;
            this.extensions = extensions;
        }
        Bootstrapper.prototype.bootstrap = function (params) {
            var _this = this;
            this.params = new BootstrapParams_1.BootstrapParams();
            // merge new params
            if (params) {
                this.params = $.extend(true, this.params, params);
            }
            if (!this.params.manifestUri)
                return;
            // empty app div
            $('#app').empty();
            // add loading class
            $('#app').addClass('loading');
            // remove any existing css
            $('link[type*="text/css"]').remove();
            jQuery.support.cors = true;
            Manifold.loadManifest({
                iiifResourceUri: this.params.manifestUri,
                collectionIndex: this.params.collectionIndex,
                manifestIndex: this.params.manifestIndex,
                sequenceIndex: this.params.sequenceIndex,
                canvasIndex: this.params.canvasIndex,
                locale: this.params.localeName
            }).then(function (helper) {
                var trackingLabel = helper.getTrackingLabel();
                trackingLabel += ', URI: ' + _this.params.embedDomain;
                window.trackingLabel = trackingLabel;
                var sequence = helper.getSequenceByIndex(_this.params.sequenceIndex);
                if (!sequence) {
                    _this.notFound();
                    return;
                }
                var canvas = helper.getCanvasByIndex(_this.params.canvasIndex);
                if (!canvas) {
                    _this.notFound();
                    return;
                }
                var canvasType = canvas.getType();
                // try using canvasType
                var extension = _this.extensions[canvasType.toString()];
                // if there isn't an extension for the canvasType, try the format
                if (!extension) {
                    var format = canvas.getProperty('format');
                    extension = _this.extensions[format];
                }
                // if there still isn't a matching extension, show an error.
                if (!extension) {
                    alert("No matching UV extension found.");
                    return;
                }
                extension.helper = helper;
                _this.featureDetect(function () {
                    _this.configure(extension, function (config) {
                        _this.injectCss(extension, config, function () {
                            _this.createExtension(extension, config);
                        });
                    });
                });
            })["catch"](function () {
                this.notFound();
            });
        };
        Bootstrapper.prototype.isCORSEnabled = function () {
            // No jsonp setting? Then use autodetection. Otherwise, use explicit setting.
            return (null === this.params.jsonp) ? Modernizr.cors : !this.params.jsonp;
        };
        Bootstrapper.prototype.notFound = function () {
            try {
                parent.$(parent.document).trigger(BaseCommands_1.BaseCommands.NOT_FOUND);
                return;
            }
            catch (e) { }
        };
        Bootstrapper.prototype.featureDetect = function (cb) {
            yepnope({
                test: window.btoa && window.atob,
                nope: 'lib/base64.min.js',
                complete: function () {
                    cb();
                }
            });
        };
        Bootstrapper.prototype.configure = function (extension, cb) {
            var _this = this;
            var that = this;
            this.getConfigExtension(extension, function (configExtension) {
                // todo: use a compiler flag when available
                var configPath = 'lib/' + extension.name + '.' + that.params.getLocaleName() + '.config.json';
                $.getJSON(configPath, function (config) {
                    _this.extendConfig(extension, config, configExtension, cb);
                });
            });
        };
        Bootstrapper.prototype.extendConfig = function (extension, config, configExtension, cb) {
            config.name = extension.name;
            // if data-config has been set, extend the existing config object.
            if (configExtension) {
                // save a reference to the config extension uri.
                config.uri = this.params.config;
                $.extend(true, config, configExtension);
            }
            cb(config);
        };
        Bootstrapper.prototype.getConfigExtension = function (extension, cb) {
            var sessionConfig = sessionStorage.getItem(extension.name + '.' + this.params.localeName);
            if (sessionConfig) {
                cb(JSON.parse(sessionConfig));
            }
            else if (this.params.config) {
                if (this.isCORSEnabled()) {
                    $.getJSON(this.params.config, function (configExtension) {
                        cb(configExtension);
                    });
                }
                else {
                    // use jsonp
                    var settings = {
                        url: this.params.config,
                        type: 'GET',
                        dataType: 'jsonp',
                        jsonp: 'callback',
                        jsonpCallback: 'configExtensionCallback'
                    };
                    $.ajax(settings);
                    window.configExtensionCallback = function (configExtension) {
                        cb(configExtension);
                    };
                }
            }
            else {
                cb(null);
            }
        };
        Bootstrapper.prototype.injectCss = function (extension, config, cb) {
            // todo: use a compiler flag when available
            var cssPath = 'themes/' + config.options.theme + '/css/' + extension.name + '/theme.css';
            yepnope.injectCss(cssPath, function () {
                cb();
            });
        };
        Bootstrapper.prototype.createExtension = function (extension, config) {
            this.config = config;
            var helper = extension.helper;
            this.extension = new extension.type(this);
            this.extension.helper = helper;
            this.extension.name = extension.name;
            this.extension.create();
        };
        return Bootstrapper;
    }());
    exports.Bootstrapper = Bootstrapper;
});
//# sourceMappingURL=Bootstrapper.js.map;
define('modules/uv-shared-module/Panel',["require", "exports", "./BaseCommands"], function (require, exports, BaseCommands_1) {
    "use strict";
    var Panel = (function () {
        function Panel($element, fitToParentWidth, fitToParentHeight) {
            this.isResized = false;
            this.$element = $element;
            this.fitToParentWidth = fitToParentWidth || false;
            this.fitToParentHeight = fitToParentHeight || false;
            this.create();
        }
        Panel.prototype.create = function () {
            var _this = this;
            $.subscribe(BaseCommands_1.BaseCommands.RESIZE, function () {
                _this.resize();
            });
        };
        Panel.prototype.resize = function () {
            var $parent = this.$element.parent();
            if (this.fitToParentWidth) {
                this.$element.width($parent.width());
            }
            if (this.fitToParentHeight) {
                this.$element.height($parent.height());
            }
            this.isResized = true;
        };
        return Panel;
    }());
    exports.Panel = Panel;
});
//# sourceMappingURL=Panel.js.map;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define('modules/uv-shared-module/BaseView',["require", "exports", "./Panel"], function (require, exports, Panel_1) {
    "use strict";
    var BaseView = (function (_super) {
        __extends(BaseView, _super);
        function BaseView($element, fitToParentWidth, fitToParentHeight) {
            return _super.call(this, $element, fitToParentWidth, fitToParentHeight) || this;
        }
        BaseView.prototype.create = function () {
            this.bootstrapper = $("body > #app").data("bootstrapper");
            _super.prototype.create.call(this);
            this.extension = this.bootstrapper.extension;
            this.config = {};
            this.config.content = {};
            this.config.options = {};
            this.content = this.config.content;
            this.options = this.config.options;
            var that = this;
            // build config inheritance chain
            if (that.modules && that.modules.length) {
                that.modules = that.modules.reverse();
                $.each(that.modules, function (index, moduleName) {
                    that.config = $.extend(true, that.config, that.extension.config.modules[moduleName]);
                });
            }
        };
        BaseView.prototype.init = function () {
        };
        BaseView.prototype.setConfig = function (moduleName) {
            if (!this.modules) {
                this.modules = [];
            }
            this.modules.push(moduleName);
        };
        BaseView.prototype.resize = function () {
            _super.prototype.resize.call(this);
        };
        return BaseView;
    }(Panel_1.Panel));
    exports.BaseView = BaseView;
});
//# sourceMappingURL=BaseView.js.map;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define('modules/uv-shared-module/Dialogue',["require", "exports", "./BaseView", "./BaseCommands"], function (require, exports, BaseView_1, BaseCommands_1) {
    "use strict";
    var Dialogue = (function (_super) {
        __extends(Dialogue, _super);
        function Dialogue($element) {
            var _this = _super.call(this, $element, false, false) || this;
            _this.allowClose = true;
            _this.isActive = false;
            _this.isUnopened = true;
            return _this;
        }
        Dialogue.prototype.create = function () {
            var _this = this;
            this.setConfig('dialogue');
            _super.prototype.create.call(this);
            // events.
            $.subscribe(BaseCommands_1.BaseCommands.CLOSE_ACTIVE_DIALOGUE, function () {
                if (_this.isActive) {
                    if (_this.allowClose) {
                        _this.close();
                    }
                }
            });
            $.subscribe(BaseCommands_1.BaseCommands.ESCAPE, function () {
                if (_this.isActive) {
                    if (_this.allowClose) {
                        _this.close();
                    }
                }
            });
            this.$top = $('<div class="top"></div>');
            this.$element.append(this.$top);
            this.$closeButton = $('<a href="#" class="close" tabindex="0">' + this.content.close + '</a>');
            this.$top.append(this.$closeButton);
            this.$middle = $('<div class="middle"></div>');
            this.$element.append(this.$middle);
            this.$content = $('<div class="content"></div>');
            this.$middle.append(this.$content);
            this.$bottom = $('<div class="bottom"></div>');
            this.$element.append(this.$bottom);
            this.$closeButton.on('click', function (e) {
                e.preventDefault();
                _this.close();
            });
            this.returnFunc = this.close;
        };
        Dialogue.prototype.enableClose = function () {
            this.allowClose = true;
            this.$closeButton.show();
        };
        Dialogue.prototype.disableClose = function () {
            this.allowClose = false;
            this.$closeButton.hide();
        };
        Dialogue.prototype.setDockedPosition = function () {
            var top = Math.floor(this.extension.height() - this.$element.outerHeight(true));
            var left = 0;
            var arrowLeft = 0;
            if (this.$triggerButton) {
                // get the normalised position of the button
                var buttonPos = Math.normalise(this.$triggerButton.offset().left, 0, this.extension.width());
                left = Math.floor((this.extension.width() * buttonPos) - (this.$element.width() * buttonPos));
                arrowLeft = (this.$element.width() * buttonPos);
            }
            this.$bottom.css('backgroundPosition', arrowLeft + 'px 0px');
            this.$element.css({
                'top': top,
                'left': left
            });
        };
        Dialogue.prototype.open = function ($triggerButton) {
            var _this = this;
            this.$element.show();
            if ($triggerButton && $triggerButton.length) {
                this.$triggerButton = $triggerButton;
                this.$bottom.show();
            }
            else {
                this.$bottom.hide();
            }
            this.isActive = true;
            // set the focus to the default button.
            setTimeout(function () {
                var $defaultButton = _this.$element.find('.default');
                if ($defaultButton.length) {
                    $defaultButton.focus();
                }
                else {
                    // if there's no default button, focus on the first visible input
                    var $input = _this.$element.find('input:visible').first();
                    if ($input.length) {
                        $input.focus();
                    }
                    else {
                        // if there's no visible first input, focus on the close button
                        _this.$closeButton.focus();
                    }
                }
            }, 1);
            $.publish(BaseCommands_1.BaseCommands.SHOW_OVERLAY);
            if (this.isUnopened) {
                this.isUnopened = false;
                this.afterFirstOpen();
            }
            this.resize();
        };
        Dialogue.prototype.afterFirstOpen = function () {
        };
        Dialogue.prototype.close = function () {
            if (!this.isActive)
                return;
            this.$element.hide();
            this.isActive = false;
            $.publish(this.closeCommand);
            $.publish(BaseCommands_1.BaseCommands.HIDE_OVERLAY);
        };
        Dialogue.prototype.resize = function () {
            _super.prototype.resize.call(this);
            this.$element.css({
                'top': Math.floor((this.extension.height() / 2) - (this.$element.height() / 2)),
                'left': Math.floor((this.extension.width() / 2) - (this.$element.width() / 2))
            });
        };
        return Dialogue;
    }(BaseView_1.BaseView));
    exports.Dialogue = Dialogue;
});
//# sourceMappingURL=Dialogue.js.map;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define('modules/uv-dialogues-module/ClickThroughDialogue',["require", "exports", "../uv-shared-module/BaseCommands", "../uv-shared-module/Dialogue"], function (require, exports, BaseCommands_1, Dialogue_1) {
    "use strict";
    var ClickThroughDialogue = (function (_super) {
        __extends(ClickThroughDialogue, _super);
        function ClickThroughDialogue($element) {
            return _super.call(this, $element) || this;
        }
        ClickThroughDialogue.prototype.create = function () {
            var _this = this;
            this.setConfig('clickThroughDialogue');
            _super.prototype.create.call(this);
            this.openCommand = BaseCommands_1.BaseCommands.SHOW_CLICKTHROUGH_DIALOGUE;
            this.closeCommand = BaseCommands_1.BaseCommands.HIDE_CLICKTHROUGH_DIALOGUE;
            $.subscribe(this.openCommand, function (e, params) {
                _this.acceptCallback = params.acceptCallback;
                _this.resource = params.resource;
                _this.open();
            });
            $.subscribe(this.closeCommand, function (e) {
                _this.close();
            });
            this.$title = $('<h1></h1>');
            this.$content.append(this.$title);
            this.$content.append('\
            <div>\
                <p class="message scroll"></p>\
                <div class="buttons">\
                    <a class="acceptTerms btn btn-primary" href="#" target="_parent"></a>\
                </div>\
            </div>');
            this.$message = this.$content.find(".message");
            this.$acceptTermsButton = this.$content.find(".acceptTerms");
            // TODO: get from config this.$acceptTermsButton.text(this.content.acceptTerms); // figure out config
            this.$acceptTermsButton.text("Accept Terms and Open");
            this.$element.hide();
            this.$acceptTermsButton.on('click', function (e) {
                e.preventDefault();
                _this.close();
                $.publish(BaseCommands_1.BaseCommands.ACCEPT_TERMS);
                if (_this.acceptCallback)
                    _this.acceptCallback();
            });
        };
        ClickThroughDialogue.prototype.open = function () {
            _super.prototype.open.call(this);
            this.$title.text(this.resource.clickThroughService.getProperty('label'));
            this.$message.html(this.resource.clickThroughService.getProperty('description'));
            this.$message.targetBlank();
            this.$message.find('a').on('click', function () {
                var url = $(this).attr('href');
                $.publish(BaseCommands_1.BaseCommands.EXTERNAL_LINK_CLICKED, [url]);
            });
            this.resize();
        };
        ClickThroughDialogue.prototype.resize = function () {
            _super.prototype.resize.call(this);
        };
        return ClickThroughDialogue;
    }(Dialogue_1.Dialogue));
    exports.ClickThroughDialogue = ClickThroughDialogue;
});
//# sourceMappingURL=ClickThroughDialogue.js.map;
define('modules/uv-shared-module/InformationArgs',["require", "exports"], function (require, exports) {
    "use strict";
    var InformationArgs = (function () {
        function InformationArgs(informationType, param) {
            this.informationType = informationType;
            this.param = param;
        }
        return InformationArgs;
    }());
    exports.InformationArgs = InformationArgs;
});
//# sourceMappingURL=InformationArgs.js.map;
define('modules/uv-shared-module/InformationType',["require", "exports"], function (require, exports) {
    "use strict";
    var InformationType;
    (function (InformationType) {
        InformationType[InformationType["AUTH_CORS_ERROR"] = 0] = "AUTH_CORS_ERROR";
        InformationType[InformationType["DEGRADED_RESOURCE"] = 1] = "DEGRADED_RESOURCE";
    })(InformationType = exports.InformationType || (exports.InformationType = {}));
});
//# sourceMappingURL=InformationType.js.map;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define('modules/uv-dialogues-module/LoginDialogue',["require", "exports", "../uv-shared-module/BaseCommands", "../uv-shared-module/Dialogue"], function (require, exports, BaseCommands_1, Dialogue_1) {
    "use strict";
    var LoginDialogue = (function (_super) {
        __extends(LoginDialogue, _super);
        function LoginDialogue($element) {
            return _super.call(this, $element) || this;
        }
        LoginDialogue.prototype.create = function () {
            var _this = this;
            this.setConfig('loginDialogue');
            _super.prototype.create.call(this);
            this.openCommand = BaseCommands_1.BaseCommands.SHOW_LOGIN_DIALOGUE;
            this.closeCommand = BaseCommands_1.BaseCommands.HIDE_LOGIN_DIALOGUE;
            $.subscribe(this.openCommand, function (s, e) {
                _this.loginCallback = e.loginCallback;
                _this.logoutCallback = e.logoutCallback;
                _this.options = e.options;
                _this.resource = e.resource;
                _this.open();
            });
            $.subscribe(this.closeCommand, function (e) {
                _this.close();
            });
            this.$title = $('<h1></h1>');
            this.$content.append(this.$title);
            this.$content.append('\
            <div>\
                <p class="message scroll"></p>\
                <div class="buttons">\
                    <a class="logout btn btn-primary" href="#" target="_parent"></a>\
                    <a class="login btn btn-primary" href="#" target="_parent"></a>\
                    <a class="cancel btn btn-primary" href="#"></a>\
                </div>\
            </div>');
            this.$message = this.$content.find('.message');
            this.$loginButton = this.$content.find('.login');
            this.$loginButton.text(this.content.login);
            this.$logoutButton = this.$content.find('.logout');
            this.$logoutButton.text(this.content.logout);
            this.$cancelButton = this.$content.find('.cancel');
            this.$cancelButton.text(this.content.cancel);
            this.$element.hide();
            this.$loginButton.on('click', function (e) {
                e.preventDefault();
                _this.close();
                if (_this.loginCallback)
                    _this.loginCallback();
            });
            this.$logoutButton.on('click', function (e) {
                e.preventDefault();
                _this.close();
                if (_this.logoutCallback)
                    _this.logoutCallback();
            });
            this.$cancelButton.on('click', function (e) {
                e.preventDefault();
                _this.close();
            });
            this.updateLogoutButton();
        };
        LoginDialogue.prototype.open = function () {
            _super.prototype.open.call(this);
            this.$title.text(this.resource.loginService.getProperty('label'));
            var message = this.resource.loginService.getProperty('description');
            if (this.options.warningMessage) {
                message = '<span class="warning">' + this.extension.config.content[this.options.warningMessage] + '</span><span class="description">' + message + '</span>';
            }
            this.updateLogoutButton();
            this.$message.html(message);
            this.$message.targetBlank();
            this.$message.find('a').on('click', function () {
                var url = $(this).attr('href');
                $.publish(BaseCommands_1.BaseCommands.EXTERNAL_LINK_CLICKED, [url]);
            });
            if (this.options.showCancelButton) {
                this.$cancelButton.show();
            }
            else {
                this.$cancelButton.hide();
            }
            this.resize();
        };
        LoginDialogue.prototype.updateLogoutButton = function () {
            if (this.extension.isLoggedIn) {
                this.$logoutButton.show();
            }
            else {
                this.$logoutButton.hide();
            }
        };
        LoginDialogue.prototype.resize = function () {
            _super.prototype.resize.call(this);
        };
        return LoginDialogue;
    }(Dialogue_1.Dialogue));
    exports.LoginDialogue = LoginDialogue;
});
//# sourceMappingURL=LoginDialogue.js.map;
define('modules/uv-shared-module/LoginWarningMessages',["require", "exports"], function (require, exports) {
    "use strict";
    var LoginWarningMessages = (function () {
        function LoginWarningMessages() {
        }
        return LoginWarningMessages;
    }());
    LoginWarningMessages.FORBIDDEN = "forbiddenResourceMessage";
    exports.LoginWarningMessages = LoginWarningMessages;
});
//# sourceMappingURL=LoginWarningMessages.js.map;
define('modules/uv-shared-module/Metric',["require", "exports"], function (require, exports) {
    "use strict";
    var Metric = (function () {
        function Metric(minWidth, maxWidth) {
            this.minWidth = minWidth;
            this.maxWidth = maxWidth;
        }
        return Metric;
    }());
    exports.Metric = Metric;
});
//# sourceMappingURL=Metric.js.map;
define('modules/uv-shared-module/Metrics',["require", "exports", "./Metric"], function (require, exports, Metric_1) {
    "use strict";
    var Metrics = (function () {
        function Metrics() {
        }
        return Metrics;
    }());
    Metrics.MOBILE_LANDSCAPE = new Metric_1.Metric(0, 640);
    Metrics.LAPTOP = new Metric_1.Metric(640, Infinity);
    exports.Metrics = Metrics;
});
//# sourceMappingURL=Metrics.js.map;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define('modules/uv-dialogues-module/RestrictedDialogue',["require", "exports", "../uv-shared-module/BaseCommands", "../uv-shared-module/Dialogue"], function (require, exports, BaseCommands_1, Dialogue_1) {
    "use strict";
    var RestrictedDialogue = (function (_super) {
        __extends(RestrictedDialogue, _super);
        function RestrictedDialogue($element) {
            return _super.call(this, $element) || this;
        }
        RestrictedDialogue.prototype.create = function () {
            var _this = this;
            this.setConfig('restrictedDialogue');
            _super.prototype.create.call(this);
            this.openCommand = BaseCommands_1.BaseCommands.SHOW_RESTRICTED_DIALOGUE;
            this.closeCommand = BaseCommands_1.BaseCommands.HIDE_RESTRICTED_DIALOGUE;
            $.subscribe(this.openCommand, function (s, e) {
                _this.acceptCallback = e.acceptCallback;
                _this.options = e.options;
                _this.resource = e.resource;
                _this.open();
            });
            $.subscribe(this.closeCommand, function (e) {
                _this.close();
            });
            this.$title = $('<h1></h1>');
            this.$content.append(this.$title);
            this.$content.append('\
            <div>\
                <p class="message scroll"></p>\
                <div class="buttons">\
                    <a class="cancel btn btn-primary" href="#" target="_parent"></a>\
                </div>\
            </div>');
            this.$message = this.$content.find('.message');
            this.$message.targetBlank();
            // todo: revisit?
            //this.$nextVisibleButton = this.$content.find('.nextvisible');
            //this.$nextVisibleButton.text(this.content.nextVisibleItem);
            this.$cancelButton = this.$content.find('.cancel');
            this.$cancelButton.text(this.content.cancel);
            this.$element.hide();
            this.$cancelButton.on('click', function (e) {
                e.preventDefault();
                _this.close();
            });
        };
        RestrictedDialogue.prototype.open = function () {
            _super.prototype.open.call(this);
            this.isAccepted = false;
            this.$title.text(this.resource.restrictedService.getProperty('label'));
            var message = this.resource.restrictedService.getProperty('description');
            this.$message.html(message);
            this.$message.targetBlank();
            this.$message.find('a').on('click', function () {
                var url = $(this).attr('href');
                $.publish(BaseCommands_1.BaseCommands.EXTERNAL_LINK_CLICKED, [url]);
            });
            this.resize();
        };
        RestrictedDialogue.prototype.close = function () {
            _super.prototype.close.call(this);
            if (!this.isAccepted && this.acceptCallback) {
                this.isAccepted = true;
                this.acceptCallback();
            }
        };
        RestrictedDialogue.prototype.resize = function () {
            _super.prototype.resize.call(this);
        };
        return RestrictedDialogue;
    }(Dialogue_1.Dialogue));
    exports.RestrictedDialogue = RestrictedDialogue;
});
//# sourceMappingURL=RestrictedDialogue.js.map;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define('modules/uv-shared-module/GenericDialogue',["require", "exports", "./BaseCommands", "./Dialogue"], function (require, exports, BaseCommands_1, Dialogue_1) {
    "use strict";
    var GenericDialogue = (function (_super) {
        __extends(GenericDialogue, _super);
        function GenericDialogue($element) {
            return _super.call(this, $element) || this;
        }
        GenericDialogue.prototype.create = function () {
            var _this = this;
            this.setConfig('genericDialogue');
            _super.prototype.create.call(this);
            this.openCommand = BaseCommands_1.BaseCommands.SHOW_GENERIC_DIALOGUE;
            this.closeCommand = BaseCommands_1.BaseCommands.HIDE_GENERIC_DIALOGUE;
            $.subscribe(this.openCommand, function (e, params) {
                _this.acceptCallback = params.acceptCallback;
                _this.showMessage(params);
            });
            $.subscribe(this.closeCommand, function (e) {
                _this.close();
            });
            this.$message = $('<p></p>');
            this.$content.append(this.$message);
            this.$acceptButton = $('<a href="#" class="btn btn-primary accept default"></a>');
            this.$content.append(this.$acceptButton);
            this.$acceptButton.text(this.content.ok);
            this.$acceptButton.onPressed(function () {
                _this.accept();
            });
            this.returnFunc = function () {
                if (_this.isActive) {
                    _this.accept();
                }
            };
            this.$element.hide();
        };
        GenericDialogue.prototype.accept = function () {
            $.publish(BaseCommands_1.BaseCommands.CLOSE_ACTIVE_DIALOGUE);
            if (this.acceptCallback)
                this.acceptCallback();
        };
        GenericDialogue.prototype.showMessage = function (params) {
            this.$message.html(params.message);
            if (params.buttonText) {
                this.$acceptButton.text(params.buttonText);
            }
            else {
                this.$acceptButton.text(this.content.ok);
            }
            if (params.allowClose === false) {
                this.disableClose();
            }
            this.open();
        };
        GenericDialogue.prototype.resize = function () {
            _super.prototype.resize.call(this);
        };
        return GenericDialogue;
    }(Dialogue_1.Dialogue));
    exports.GenericDialogue = GenericDialogue;
});
//# sourceMappingURL=GenericDialogue.js.map;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define('modules/uv-shared-module/Shell',["require", "exports", "./BaseCommands", "./BaseView", "./GenericDialogue"], function (require, exports, BaseCommands_1, BaseView_1, GenericDialogue_1) {
    "use strict";
    var Shell = (function (_super) {
        __extends(Shell, _super);
        function Shell($element) {
            var _this = this;
            Shell.$element = $element;
            _this = _super.call(this, Shell.$element, true, true) || this;
            return _this;
        }
        Shell.prototype.create = function () {
            _super.prototype.create.call(this);
            $.subscribe(BaseCommands_1.BaseCommands.SHOW_OVERLAY, function () {
                Shell.$overlays.show();
            });
            $.subscribe(BaseCommands_1.BaseCommands.HIDE_OVERLAY, function () {
                Shell.$overlays.hide();
            });
            Shell.$headerPanel = $('<div class="headerPanel"></div>');
            Shell.$element.append(Shell.$headerPanel);
            Shell.$mainPanel = $('<div class="mainPanel"></div>');
            Shell.$element.append(Shell.$mainPanel);
            Shell.$centerPanel = $('<div class="centerPanel"></div>');
            Shell.$mainPanel.append(Shell.$centerPanel);
            Shell.$leftPanel = $('<div class="leftPanel"></div>');
            Shell.$mainPanel.append(Shell.$leftPanel);
            Shell.$rightPanel = $('<div class="rightPanel"></div>');
            Shell.$mainPanel.append(Shell.$rightPanel);
            Shell.$footerPanel = $('<div class="footerPanel"></div>');
            Shell.$element.append(Shell.$footerPanel);
            Shell.$mobileFooterPanel = $('<div class="footerPanel mobile"></div>');
            Shell.$element.append(Shell.$mobileFooterPanel);
            Shell.$overlays = $('<div class="overlays"></div>');
            Shell.$element.append(Shell.$overlays);
            Shell.$genericDialogue = $('<div class="overlay genericDialogue"></div>');
            Shell.$overlays.append(Shell.$genericDialogue);
            Shell.$overlays.on('click', function (e) {
                if ($(e.target).hasClass('overlays')) {
                    e.preventDefault();
                    $.publish(BaseCommands_1.BaseCommands.CLOSE_ACTIVE_DIALOGUE);
                }
            });
            // create shared views.
            new GenericDialogue_1.GenericDialogue(Shell.$genericDialogue);
        };
        Shell.prototype.resize = function () {
            _super.prototype.resize.call(this);
            Shell.$overlays.width(this.extension.width());
            Shell.$overlays.height(this.extension.height());
            var mainHeight = this.$element.height() - parseInt(Shell.$mainPanel.css('marginTop'))
                - (Shell.$headerPanel.is(':visible') ? Shell.$headerPanel.height() : 0)
                - (Shell.$footerPanel.is(':visible') ? Shell.$footerPanel.height() : 0)
                - (Shell.$mobileFooterPanel.is(':visible') ? Shell.$mobileFooterPanel.height() : 0);
            Shell.$mainPanel.height(mainHeight);
        };
        return Shell;
    }(BaseView_1.BaseView));
    exports.Shell = Shell;
});
//# sourceMappingURL=Shell.js.map;
define('modules/uv-shared-module/BaseExtension',["require", "exports", "./BaseCommands", "../../BootstrapParams", "../../modules/uv-dialogues-module/ClickThroughDialogue", "./InformationArgs", "./InformationType", "../../modules/uv-dialogues-module/LoginDialogue", "./LoginWarningMessages", "../../modules/uv-shared-module/Metrics", "../../Params", "../../modules/uv-dialogues-module/RestrictedDialogue", "./Shell"], function (require, exports, BaseCommands_1, BootstrapParams_1, ClickThroughDialogue_1, InformationArgs_1, InformationType_1, LoginDialogue_1, LoginWarningMessages_1, Metrics_1, Params_1, RestrictedDialogue_1, Shell_1) {
    "use strict";
    var BaseExtension = (function () {
        function BaseExtension(bootstrapper) {
            this.isCreated = false;
            this.isLoggedIn = false;
            this.shifted = false;
            this.tabbing = false;
            this.bootstrapper = bootstrapper;
            this.config = this.bootstrapper.config;
            this.jsonp = this.bootstrapper.params.jsonp;
            this.locale = this.bootstrapper.params.getLocaleName();
            this.isHomeDomain = this.bootstrapper.params.isHomeDomain;
            this.isReload = this.bootstrapper.params.isReload;
            this.embedDomain = this.bootstrapper.params.embedDomain;
            this.isOnlyInstance = this.bootstrapper.params.isOnlyInstance;
            this.embedScriptUri = this.bootstrapper.params.embedScriptUri;
            this.domain = this.bootstrapper.params.domain;
            this.isLightbox = this.bootstrapper.params.isLightbox;
        }
        BaseExtension.prototype.create = function () {
            var _this = this;
            var that = this;
            this.$element = $('#app');
            this.$element.data("bootstrapper", this.bootstrapper);
            // initial sizing.
            var $win = $(window);
            this.embedWidth = $win.width();
            this.embedHeight = $win.height();
            this.$element.width(this.embedWidth);
            this.$element.height(this.embedHeight);
            if (!this.isReload && Utils.Documents.isInIFrame()) {
                // communication with parent frame (if it exists).
                this.bootstrapper.socket = new easyXDM.Socket({
                    onMessage: function (message, origin) {
                        message = $.parseJSON(message);
                        _this.handleParentFrameEvent(message);
                    }
                });
            }
            this.triggerSocket(BaseCommands_1.BaseCommands.LOAD, {
                bootstrapper: {
                    config: this.bootstrapper.config,
                    params: this.bootstrapper.params
                },
                settings: this.getSettings(),
                preview: this.getSharePreview()
            });
            // add/remove classes.
            this.$element.empty();
            this.$element.removeClass();
            this.$element.addClass('browser-' + window.browserDetect.browser);
            this.$element.addClass('browser-version-' + window.browserDetect.version);
            if (!this.isHomeDomain)
                this.$element.addClass('embedded');
            if (this.isLightbox)
                this.$element.addClass('lightbox');
            $(document).on('mousemove', function (e) {
                _this.mouseX = e.pageX;
                _this.mouseY = e.pageY;
            });
            // events
            if (!this.isReload) {
                window.onresize = function () {
                    var $win = $(window);
                    $('body').height($win.height());
                    _this.resize();
                };
                var visibilityProp = Utils.Documents.getHiddenProp();
                if (visibilityProp) {
                    var evtname = visibilityProp.replace(/[H|h]idden/, '') + 'visibilitychange';
                    document.addEventListener(evtname, function () {
                        // resize after a tab has been shown (fixes safari layout issue)
                        if (!Utils.Documents.isHidden()) {
                            _this.resize();
                        }
                    });
                }
                if (Utils.Bools.getBool(this.config.options.dropEnabled, true)) {
                    this.$element.on('drop', (function (e) {
                        e.preventDefault();
                        var dropUrl = e.originalEvent.dataTransfer.getData("URL");
                        var url = Utils.Urls.getUrlParts(dropUrl);
                        var manifestUri = Utils.Urls.getQuerystringParameterFromString('manifest', url.search);
                        //var canvasUri = Utils.Urls.getQuerystringParameterFromString('canvas', url.search);
                        if (manifestUri) {
                            _this.triggerSocket(BaseCommands_1.BaseCommands.DROP, manifestUri);
                            var p = new BootstrapParams_1.BootstrapParams();
                            p.manifestUri = manifestUri;
                            _this.reload(p);
                        }
                    }));
                }
                this.$element.on('dragover', (function (e) {
                    // allow drop
                    e.preventDefault();
                }));
                // keyboard events.
                $(document).on('keyup keydown', function (e) {
                    _this.shifted = e.shiftKey;
                    _this.tabbing = e.keyCode === KeyCodes.KeyDown.Tab;
                });
                $(document).keydown(function (e) {
                    var event = null;
                    var preventDefault = true;
                    if (!e.ctrlKey && !e.altKey && !e.shiftKey) {
                        if (e.keyCode === KeyCodes.KeyDown.Enter) {
                            event = BaseCommands_1.BaseCommands.RETURN;
                            preventDefault = false;
                        }
                        if (e.keyCode === KeyCodes.KeyDown.Escape)
                            event = BaseCommands_1.BaseCommands.ESCAPE;
                        if (e.keyCode === KeyCodes.KeyDown.PageUp)
                            event = BaseCommands_1.BaseCommands.PAGE_UP;
                        if (e.keyCode === KeyCodes.KeyDown.PageDown)
                            event = BaseCommands_1.BaseCommands.PAGE_DOWN;
                        if (e.keyCode === KeyCodes.KeyDown.End)
                            event = BaseCommands_1.BaseCommands.END;
                        if (e.keyCode === KeyCodes.KeyDown.Home)
                            event = BaseCommands_1.BaseCommands.HOME;
                        if (e.keyCode === KeyCodes.KeyDown.NumpadPlus || e.keyCode === 171 || e.keyCode === KeyCodes.KeyDown.Equals) {
                            event = BaseCommands_1.BaseCommands.PLUS;
                            preventDefault = false;
                        }
                        if (e.keyCode === KeyCodes.KeyDown.NumpadMinus || e.keyCode === 173 || e.keyCode === KeyCodes.KeyDown.Dash) {
                            event = BaseCommands_1.BaseCommands.MINUS;
                            preventDefault = false;
                        }
                        if (that.useArrowKeysToNavigate()) {
                            if (e.keyCode === KeyCodes.KeyDown.LeftArrow)
                                event = BaseCommands_1.BaseCommands.LEFT_ARROW;
                            if (e.keyCode === KeyCodes.KeyDown.UpArrow)
                                event = BaseCommands_1.BaseCommands.UP_ARROW;
                            if (e.keyCode === KeyCodes.KeyDown.RightArrow)
                                event = BaseCommands_1.BaseCommands.RIGHT_ARROW;
                            if (e.keyCode === KeyCodes.KeyDown.DownArrow)
                                event = BaseCommands_1.BaseCommands.DOWN_ARROW;
                        }
                    }
                    if (event) {
                        if (preventDefault) {
                            e.preventDefault();
                        }
                        $.publish(event);
                    }
                });
                if (this.bootstrapper.params.isHomeDomain && Utils.Documents.isInIFrame()) {
                    $.subscribe(BaseCommands_1.BaseCommands.PARENT_EXIT_FULLSCREEN, function () {
                        if (_this.isOverlayActive()) {
                            $.publish(BaseCommands_1.BaseCommands.ESCAPE);
                        }
                        $.publish(BaseCommands_1.BaseCommands.ESCAPE);
                        $.publish(BaseCommands_1.BaseCommands.RESIZE);
                    });
                }
            }
            this.$element.append('<a href="/" id="top"></a>');
            this.$element.append('<iframe id="commsFrame" style="display:none"></iframe>');
            $.subscribe(BaseCommands_1.BaseCommands.ACCEPT_TERMS, function () {
                _this.triggerSocket(BaseCommands_1.BaseCommands.ACCEPT_TERMS);
            });
            $.subscribe(BaseCommands_1.BaseCommands.LOGIN_FAILED, function () {
                _this.triggerSocket(BaseCommands_1.BaseCommands.LOGIN_FAILED);
                _this.showMessage(_this.config.content.authorisationFailedMessage);
            });
            $.subscribe(BaseCommands_1.BaseCommands.LOGIN, function () {
                _this.isLoggedIn = true;
                _this.triggerSocket(BaseCommands_1.BaseCommands.LOGIN);
            });
            $.subscribe(BaseCommands_1.BaseCommands.LOGOUT, function () {
                _this.isLoggedIn = false;
                _this.triggerSocket(BaseCommands_1.BaseCommands.LOGOUT);
            });
            $.subscribe(BaseCommands_1.BaseCommands.BOOKMARK, function () {
                _this.bookmark();
                _this.triggerSocket(BaseCommands_1.BaseCommands.BOOKMARK);
            });
            $.subscribe(BaseCommands_1.BaseCommands.CANVAS_INDEX_CHANGE_FAILED, function () {
                _this.triggerSocket(BaseCommands_1.BaseCommands.CANVAS_INDEX_CHANGE_FAILED);
            });
            $.subscribe(BaseCommands_1.BaseCommands.CANVAS_INDEX_CHANGED, function (e, canvasIndex) {
                _this.triggerSocket(BaseCommands_1.BaseCommands.CANVAS_INDEX_CHANGED, canvasIndex);
            });
            $.subscribe(BaseCommands_1.BaseCommands.CLICKTHROUGH, function () {
                _this.triggerSocket(BaseCommands_1.BaseCommands.CLICKTHROUGH);
            });
            $.subscribe(BaseCommands_1.BaseCommands.CLOSE_ACTIVE_DIALOGUE, function () {
                _this.triggerSocket(BaseCommands_1.BaseCommands.CLOSE_ACTIVE_DIALOGUE);
            });
            $.subscribe(BaseCommands_1.BaseCommands.CLOSE_LEFT_PANEL, function () {
                _this.triggerSocket(BaseCommands_1.BaseCommands.CLOSE_LEFT_PANEL);
                _this.resize();
            });
            $.subscribe(BaseCommands_1.BaseCommands.CLOSE_RIGHT_PANEL, function () {
                _this.triggerSocket(BaseCommands_1.BaseCommands.CLOSE_RIGHT_PANEL);
                _this.resize();
            });
            $.subscribe(BaseCommands_1.BaseCommands.CREATED, function () {
                _this.isCreated = true;
                _this.triggerSocket(BaseCommands_1.BaseCommands.CREATED);
            });
            $.subscribe(BaseCommands_1.BaseCommands.DOWN_ARROW, function () {
                _this.triggerSocket(BaseCommands_1.BaseCommands.DOWN_ARROW);
            });
            $.subscribe(BaseCommands_1.BaseCommands.DOWNLOAD, function (e, obj) {
                _this.triggerSocket(BaseCommands_1.BaseCommands.DOWNLOAD, obj);
            });
            $.subscribe(BaseCommands_1.BaseCommands.END, function () {
                _this.triggerSocket(BaseCommands_1.BaseCommands.END);
            });
            $.subscribe(BaseCommands_1.BaseCommands.ESCAPE, function () {
                _this.triggerSocket(BaseCommands_1.BaseCommands.ESCAPE);
                if (_this.isFullScreen() && !_this.isOverlayActive()) {
                    $.publish(BaseCommands_1.BaseCommands.TOGGLE_FULLSCREEN);
                }
            });
            $.subscribe(BaseCommands_1.BaseCommands.EXTERNAL_LINK_CLICKED, function (e, url) {
                _this.triggerSocket(BaseCommands_1.BaseCommands.EXTERNAL_LINK_CLICKED, url);
            });
            $.subscribe(BaseCommands_1.BaseCommands.FEEDBACK, function () {
                _this.feedback();
            });
            $.subscribe(BaseCommands_1.BaseCommands.FORBIDDEN, function () {
                _this.triggerSocket(BaseCommands_1.BaseCommands.FORBIDDEN);
                $.publish(BaseCommands_1.BaseCommands.OPEN_EXTERNAL_RESOURCE);
            });
            $.subscribe(BaseCommands_1.BaseCommands.HIDE_DOWNLOAD_DIALOGUE, function () {
                _this.triggerSocket(BaseCommands_1.BaseCommands.HIDE_DOWNLOAD_DIALOGUE);
            });
            $.subscribe(BaseCommands_1.BaseCommands.HIDE_EMBED_DIALOGUE, function () {
                _this.triggerSocket(BaseCommands_1.BaseCommands.HIDE_EMBED_DIALOGUE);
            });
            $.subscribe(BaseCommands_1.BaseCommands.HIDE_EXTERNALCONTENT_DIALOGUE, function () {
                _this.triggerSocket(BaseCommands_1.BaseCommands.HIDE_EXTERNALCONTENT_DIALOGUE);
            });
            $.subscribe(BaseCommands_1.BaseCommands.HIDE_GENERIC_DIALOGUE, function () {
                _this.triggerSocket(BaseCommands_1.BaseCommands.HIDE_GENERIC_DIALOGUE);
            });
            $.subscribe(BaseCommands_1.BaseCommands.HIDE_HELP_DIALOGUE, function () {
                _this.triggerSocket(BaseCommands_1.BaseCommands.HIDE_HELP_DIALOGUE);
            });
            $.subscribe(BaseCommands_1.BaseCommands.HIDE_INFORMATION, function () {
                _this.triggerSocket(BaseCommands_1.BaseCommands.HIDE_INFORMATION);
            });
            $.subscribe(BaseCommands_1.BaseCommands.HIDE_LOGIN_DIALOGUE, function () {
                _this.triggerSocket(BaseCommands_1.BaseCommands.HIDE_LOGIN_DIALOGUE);
            });
            $.subscribe(BaseCommands_1.BaseCommands.HIDE_OVERLAY, function () {
                _this.triggerSocket(BaseCommands_1.BaseCommands.HIDE_OVERLAY);
            });
            $.subscribe(BaseCommands_1.BaseCommands.HIDE_RESTRICTED_DIALOGUE, function () {
                _this.triggerSocket(BaseCommands_1.BaseCommands.HIDE_RESTRICTED_DIALOGUE);
            });
            $.subscribe(BaseCommands_1.BaseCommands.HIDE_SETTINGS_DIALOGUE, function () {
                _this.triggerSocket(BaseCommands_1.BaseCommands.HIDE_SETTINGS_DIALOGUE);
            });
            $.subscribe(BaseCommands_1.BaseCommands.HOME, function () {
                _this.triggerSocket(BaseCommands_1.BaseCommands.HOME);
            });
            $.subscribe(BaseCommands_1.BaseCommands.LEFT_ARROW, function () {
                _this.triggerSocket(BaseCommands_1.BaseCommands.LEFT_ARROW);
            });
            $.subscribe(BaseCommands_1.BaseCommands.LEFTPANEL_COLLAPSE_FULL_FINISH, function () {
                _this.triggerSocket(BaseCommands_1.BaseCommands.LEFTPANEL_COLLAPSE_FULL_FINISH);
            });
            $.subscribe(BaseCommands_1.BaseCommands.LEFTPANEL_COLLAPSE_FULL_START, function () {
                _this.triggerSocket(BaseCommands_1.BaseCommands.LEFTPANEL_COLLAPSE_FULL_START);
            });
            $.subscribe(BaseCommands_1.BaseCommands.LEFTPANEL_EXPAND_FULL_FINISH, function () {
                _this.triggerSocket(BaseCommands_1.BaseCommands.LEFTPANEL_EXPAND_FULL_FINISH);
            });
            $.subscribe(BaseCommands_1.BaseCommands.LEFTPANEL_EXPAND_FULL_START, function () {
                _this.triggerSocket(BaseCommands_1.BaseCommands.LEFTPANEL_EXPAND_FULL_START);
            });
            $.subscribe(BaseCommands_1.BaseCommands.LOAD_FAILED, function () {
                _this.triggerSocket(BaseCommands_1.BaseCommands.LOAD_FAILED);
                if (!_.isNull(that.lastCanvasIndex) && that.lastCanvasIndex !== that.helper.canvasIndex) {
                    _this.viewCanvas(that.lastCanvasIndex);
                }
            });
            $.subscribe(BaseCommands_1.BaseCommands.NOT_FOUND, function () {
                _this.triggerSocket(BaseCommands_1.BaseCommands.NOT_FOUND);
            });
            $.subscribe(BaseCommands_1.BaseCommands.OPEN, function () {
                _this.triggerSocket(BaseCommands_1.BaseCommands.OPEN);
                var openUri = String.format(_this.config.options.openTemplate, _this.helper.iiifResourceUri);
                window.open(openUri);
            });
            $.subscribe(BaseCommands_1.BaseCommands.OPEN_LEFT_PANEL, function () {
                _this.triggerSocket(BaseCommands_1.BaseCommands.OPEN_LEFT_PANEL);
                _this.resize();
            });
            $.subscribe(BaseCommands_1.BaseCommands.OPEN_EXTERNAL_RESOURCE, function () {
                _this.triggerSocket(BaseCommands_1.BaseCommands.OPEN_EXTERNAL_RESOURCE);
            });
            $.subscribe(BaseCommands_1.BaseCommands.OPEN_RIGHT_PANEL, function () {
                _this.triggerSocket(BaseCommands_1.BaseCommands.OPEN_RIGHT_PANEL);
                _this.resize();
            });
            $.subscribe(BaseCommands_1.BaseCommands.PAGE_DOWN, function () {
                _this.triggerSocket(BaseCommands_1.BaseCommands.PAGE_DOWN);
            });
            $.subscribe(BaseCommands_1.BaseCommands.PAGE_UP, function () {
                _this.triggerSocket(BaseCommands_1.BaseCommands.PAGE_UP);
            });
            $.subscribe(BaseCommands_1.BaseCommands.RESOURCE_DEGRADED, function (e, resource) {
                _this.triggerSocket(BaseCommands_1.BaseCommands.RESOURCE_DEGRADED);
                _this.handleDegraded(resource);
            });
            $.subscribe(BaseCommands_1.BaseCommands.RETURN, function () {
                _this.triggerSocket(BaseCommands_1.BaseCommands.RETURN);
            });
            $.subscribe(BaseCommands_1.BaseCommands.RIGHT_ARROW, function () {
                _this.triggerSocket(BaseCommands_1.BaseCommands.RIGHT_ARROW);
            });
            $.subscribe(BaseCommands_1.BaseCommands.RIGHTPANEL_COLLAPSE_FULL_FINISH, function () {
                _this.triggerSocket(BaseCommands_1.BaseCommands.RIGHTPANEL_COLLAPSE_FULL_FINISH);
            });
            $.subscribe(BaseCommands_1.BaseCommands.RIGHTPANEL_COLLAPSE_FULL_START, function () {
                _this.triggerSocket(BaseCommands_1.BaseCommands.RIGHTPANEL_COLLAPSE_FULL_START);
            });
            $.subscribe(BaseCommands_1.BaseCommands.RIGHTPANEL_EXPAND_FULL_FINISH, function () {
                _this.triggerSocket(BaseCommands_1.BaseCommands.RIGHTPANEL_EXPAND_FULL_FINISH);
            });
            $.subscribe(BaseCommands_1.BaseCommands.RIGHTPANEL_EXPAND_FULL_START, function () {
                _this.triggerSocket(BaseCommands_1.BaseCommands.RIGHTPANEL_EXPAND_FULL_START);
            });
            $.subscribe(BaseCommands_1.BaseCommands.SEQUENCE_INDEX_CHANGED, function () {
                _this.triggerSocket(BaseCommands_1.BaseCommands.SEQUENCE_INDEX_CHANGED);
            });
            $.subscribe(BaseCommands_1.BaseCommands.SETTINGS_CHANGED, function (e, args) {
                _this.triggerSocket(BaseCommands_1.BaseCommands.SETTINGS_CHANGED, args);
            });
            $.subscribe(BaseCommands_1.BaseCommands.SHOW_DOWNLOAD_DIALOGUE, function () {
                _this.triggerSocket(BaseCommands_1.BaseCommands.SHOW_DOWNLOAD_DIALOGUE);
            });
            $.subscribe(BaseCommands_1.BaseCommands.SHOW_EMBED_DIALOGUE, function () {
                _this.triggerSocket(BaseCommands_1.BaseCommands.SHOW_EMBED_DIALOGUE);
            });
            $.subscribe(BaseCommands_1.BaseCommands.SHOW_EXTERNALCONTENT_DIALOGUE, function () {
                _this.triggerSocket(BaseCommands_1.BaseCommands.SHOW_EXTERNALCONTENT_DIALOGUE);
            });
            $.subscribe(BaseCommands_1.BaseCommands.SHOW_GENERIC_DIALOGUE, function () {
                _this.triggerSocket(BaseCommands_1.BaseCommands.SHOW_GENERIC_DIALOGUE);
            });
            $.subscribe(BaseCommands_1.BaseCommands.SHOW_HELP_DIALOGUE, function () {
                _this.triggerSocket(BaseCommands_1.BaseCommands.SHOW_HELP_DIALOGUE);
            });
            $.subscribe(BaseCommands_1.BaseCommands.SHOW_INFORMATION, function () {
                _this.triggerSocket(BaseCommands_1.BaseCommands.SHOW_INFORMATION);
            });
            $.subscribe(BaseCommands_1.BaseCommands.SHOW_LOGIN_DIALOGUE, function () {
                _this.triggerSocket(BaseCommands_1.BaseCommands.SHOW_LOGIN_DIALOGUE);
            });
            $.subscribe(BaseCommands_1.BaseCommands.SHOW_CLICKTHROUGH_DIALOGUE, function () {
                _this.triggerSocket(BaseCommands_1.BaseCommands.SHOW_CLICKTHROUGH_DIALOGUE);
            });
            $.subscribe(BaseCommands_1.BaseCommands.SHOW_RESTRICTED_DIALOGUE, function () {
                _this.triggerSocket(BaseCommands_1.BaseCommands.SHOW_RESTRICTED_DIALOGUE);
            });
            $.subscribe(BaseCommands_1.BaseCommands.SHOW_OVERLAY, function () {
                _this.triggerSocket(BaseCommands_1.BaseCommands.SHOW_OVERLAY);
            });
            $.subscribe(BaseCommands_1.BaseCommands.SHOW_SETTINGS_DIALOGUE, function () {
                _this.triggerSocket(BaseCommands_1.BaseCommands.SHOW_SETTINGS_DIALOGUE);
            });
            $.subscribe(BaseCommands_1.BaseCommands.SHOW_TERMS_OF_USE, function () {
                _this.triggerSocket(BaseCommands_1.BaseCommands.SHOW_TERMS_OF_USE);
                // todo: Eventually this should be replaced with a suitable IIIF Presentation API field - until then, use attribution
                var terms = _this.helper.getAttribution();
                _this.showMessage(terms);
            });
            $.subscribe(BaseCommands_1.BaseCommands.THUMB_SELECTED, function (e, thumb) {
                _this.triggerSocket(BaseCommands_1.BaseCommands.THUMB_SELECTED, thumb.index);
            });
            $.subscribe(BaseCommands_1.BaseCommands.TOGGLE_FULLSCREEN, function () {
                $('#top').focus();
                _this.bootstrapper.isFullScreen = !_this.bootstrapper.isFullScreen;
                _this.triggerSocket(BaseCommands_1.BaseCommands.TOGGLE_FULLSCREEN, {
                    isFullScreen: _this.bootstrapper.isFullScreen,
                    overrideFullScreen: _this.config.options.overrideFullScreen
                });
            });
            $.subscribe(BaseCommands_1.BaseCommands.UP_ARROW, function () {
                _this.triggerSocket(BaseCommands_1.BaseCommands.UP_ARROW);
            });
            $.subscribe(BaseCommands_1.BaseCommands.UPDATE_SETTINGS, function () {
                _this.triggerSocket(BaseCommands_1.BaseCommands.UPDATE_SETTINGS);
            });
            $.subscribe(BaseCommands_1.BaseCommands.VIEW_FULL_TERMS, function () {
                _this.triggerSocket(BaseCommands_1.BaseCommands.VIEW_FULL_TERMS);
            });
            $.subscribe(BaseCommands_1.BaseCommands.WINDOW_UNLOAD, function () {
                _this.triggerSocket(BaseCommands_1.BaseCommands.WINDOW_UNLOAD);
            });
            // create shell and shared views.
            this.shell = new Shell_1.Shell(this.$element);
            // dependencies
            this.getDependencies(function (deps) {
                _this.loadDependencies(deps);
            });
        };
        BaseExtension.prototype.createModules = function () {
            this.$clickThroughDialogue = $('<div class="overlay clickthrough"></div>');
            Shell_1.Shell.$overlays.append(this.$clickThroughDialogue);
            this.clickThroughDialogue = new ClickThroughDialogue_1.ClickThroughDialogue(this.$clickThroughDialogue);
            this.$restrictedDialogue = $('<div class="overlay login"></div>');
            Shell_1.Shell.$overlays.append(this.$restrictedDialogue);
            this.restrictedDialogue = new RestrictedDialogue_1.RestrictedDialogue(this.$restrictedDialogue);
            this.$loginDialogue = $('<div class="overlay login"></div>');
            Shell_1.Shell.$overlays.append(this.$loginDialogue);
            this.loginDialogue = new LoginDialogue_1.LoginDialogue(this.$loginDialogue);
        };
        BaseExtension.prototype.modulesCreated = function () {
        };
        BaseExtension.prototype.getDependencies = function (cb) {
            var that = this;
            // todo: use compiler flag (when available)
            var depsUri = 'lib/' + this.name + '-dependencies';
            // check if the deps are already loaded
            var scripts = $('script[data-requiremodule]')
                .filter(function () {
                var attr = $(this).attr('data-requiremodule');
                return (attr.indexOf(that.name) != -1 && attr.indexOf('dependencies') != -1);
            });
            if (!scripts.length) {
                require([depsUri], function (deps) {
                    var baseUri = 'lib/';
                    // for each dependency, prepend baseUri.
                    for (var i = 0; i < deps.dependencies.length; i++) {
                        deps.dependencies[i] = baseUri + deps.dependencies[i];
                    }
                    cb(deps);
                });
            }
            else {
                cb(null);
            }
        };
        BaseExtension.prototype.loadDependencies = function (deps) {
            var that = this;
            if (deps) {
                require(deps.dependencies, function () {
                    that.dependenciesLoaded();
                });
            }
            else {
                that.dependenciesLoaded();
            }
        };
        BaseExtension.prototype.dependenciesLoaded = function () {
            this.createModules();
            this.modulesCreated();
            $.publish(BaseCommands_1.BaseCommands.RESIZE); // initial sizing
            $.publish(BaseCommands_1.BaseCommands.CREATED);
            this.setParams();
            this.setDefaultFocus();
            this.viewCanvas(this.getCanvasIndexParam());
        };
        BaseExtension.prototype.setParams = function () {
            if (!this.isHomeDomain)
                return;
            this.setParam(Params_1.Params.collectionIndex, this.helper.collectionIndex);
            this.setParam(Params_1.Params.manifestIndex, this.helper.manifestIndex);
            this.setParam(Params_1.Params.sequenceIndex, this.helper.sequenceIndex);
            this.setParam(Params_1.Params.canvasIndex, this.helper.canvasIndex);
        };
        BaseExtension.prototype.setDefaultFocus = function () {
            var _this = this;
            setTimeout(function () {
                if (_this.config.options.allowStealFocus) {
                    $('[tabindex=0]').focus();
                }
            }, 1);
        };
        BaseExtension.prototype.width = function () {
            return $(window).width();
        };
        BaseExtension.prototype.height = function () {
            return $(window).height();
        };
        BaseExtension.prototype.triggerSocket = function (eventName, eventObject) {
            jQuery(document).trigger(eventName, [eventObject]);
            if (this.bootstrapper.socket) {
                this.bootstrapper.socket.postMessage(JSON.stringify({ eventName: eventName, eventObject: eventObject }));
            }
        };
        BaseExtension.prototype.redirect = function (uri) {
            this.triggerSocket(BaseCommands_1.BaseCommands.REDIRECT, uri);
        };
        BaseExtension.prototype.refresh = function () {
            this.triggerSocket(BaseCommands_1.BaseCommands.REFRESH, null);
        };
        BaseExtension.prototype._updateMetric = function () {
            var keys = Object.keys(Metrics_1.Metrics);
            for (var i = 0; i < keys.length; i++) {
                var metric = Metrics_1.Metrics[keys[i]];
                if (this.width() > metric.minWidth && this.width() <= metric.maxWidth) {
                    if (this.metric !== metric) {
                        this.metric = metric;
                        $.publish(BaseCommands_1.BaseCommands.METRIC_CHANGED);
                    }
                }
            }
        };
        BaseExtension.prototype.resize = function () {
            this._updateMetric();
            $.publish(BaseCommands_1.BaseCommands.RESIZE);
        };
        BaseExtension.prototype.handleParentFrameEvent = function (message) {
            var _this = this;
            Utils.Async.waitFor(function () {
                return _this.isCreated;
            }, function () {
                switch (message.eventName) {
                    case BaseCommands_1.BaseCommands.TOGGLE_FULLSCREEN:
                        $.publish(BaseCommands_1.BaseCommands.TOGGLE_FULLSCREEN, message.eventObject);
                        break;
                    case BaseCommands_1.BaseCommands.PARENT_EXIT_FULLSCREEN:
                        $.publish(BaseCommands_1.BaseCommands.PARENT_EXIT_FULLSCREEN);
                        break;
                }
            });
        };
        // re-bootstraps the application with new querystring params
        BaseExtension.prototype.reload = function (params) {
            var p = new BootstrapParams_1.BootstrapParams();
            if (params) {
                p = $.extend(p, params);
            }
            p.isReload = true;
            $.disposePubSub();
            this.bootstrapper.bootstrap(p);
        };
        BaseExtension.prototype.getCanvasIndexParam = function () {
            return this.bootstrapper.params.getParam(Params_1.Params.canvasIndex);
        };
        BaseExtension.prototype.getSequenceIndexParam = function () {
            return this.bootstrapper.params.getParam(Params_1.Params.sequenceIndex);
        };
        BaseExtension.prototype.isSeeAlsoEnabled = function () {
            return this.config.options.seeAlsoEnabled !== false;
        };
        BaseExtension.prototype.getShareUrl = function () {
            // If embedded on the home domain and it's the only instance of the UV on the page
            if (this.isDeepLinkingEnabled()) {
                // Use the current page URL with hash params
                if (Utils.Documents.isInIFrame()) {
                    return parent.document.location.href;
                }
                else {
                    return document.location.href;
                }
            }
            else {
                // If there's a `related` property of format `text/html` in the manifest
                if (this.helper.hasRelatedPage()) {
                    // Use the `related` property in the URL box
                    var related = this.helper.getRelated();
                    if (related && related.length) {
                        related = related[0];
                    }
                    return related['@id'];
                }
            }
            return null;
        };
        BaseExtension.prototype.getIIIFShareUrl = function () {
            return this.helper.iiifResourceUri + "?manifest=" + this.helper.iiifResourceUri;
        };
        BaseExtension.prototype.addTimestamp = function (uri) {
            return uri + "?t=" + Utils.Dates.getTimeStamp();
        };
        BaseExtension.prototype.isDeepLinkingEnabled = function () {
            return (this.isHomeDomain && this.isOnlyInstance);
        };
        BaseExtension.prototype.isOnHomeDomain = function () {
            return this.isDeepLinkingEnabled();
        };
        BaseExtension.prototype.getDomain = function () {
            var parts = Utils.Urls.getUrlParts(this.helper.iiifResourceUri);
            return parts.host;
        };
        BaseExtension.prototype.getEmbedDomain = function () {
            return this.embedDomain;
        };
        BaseExtension.prototype.getSettings = function () {
            if (Utils.Bools.getBool(this.config.options.saveUserSettings, false)) {
                var settings = Utils.Storage.get("uv.settings", Utils.StorageType.local);
                if (settings) {
                    return $.extend(this.config.options, settings.value);
                }
            }
            return this.config.options;
        };
        BaseExtension.prototype.updateSettings = function (settings) {
            if (Utils.Bools.getBool(this.config.options.saveUserSettings, false)) {
                var storedSettings = Utils.Storage.get("uv.settings", Utils.StorageType.local);
                if (storedSettings) {
                    settings = $.extend(storedSettings.value, settings);
                }
                // store for ten years
                Utils.Storage.set("uv.settings", settings, 315360000, Utils.StorageType.local);
            }
            this.config.options = $.extend(this.config.options, settings);
        };
        BaseExtension.prototype.sanitize = function (html) {
            var elem = document.createElement('div');
            var $elem = $(elem);
            $elem.html(html);
            var s = new Sanitize({
                elements: ['a', 'b', 'br', 'img', 'p', 'i', 'span'],
                attributes: {
                    a: ['href'],
                    img: ['src', 'alt']
                },
                protocols: {
                    a: { href: ['http', 'https'] }
                }
            });
            $elem.html(s.clean_node(elem));
            return $elem.html();
        };
        BaseExtension.prototype.getLocales = function () {
            if (this.locales)
                return this.locales;
            // use data-locales to prioritise
            var items = this.config.localisation.locales.clone();
            var sorting = this.bootstrapper.params.locales;
            var result = [];
            // loop through sorting array
            // if items contains sort item, add it to results.
            // if sort item has a label, substitute it
            // mark item as added.
            // if limitLocales is disabled,
            // loop through remaining items and add to results.
            $.each(sorting, function (index, sortItem) {
                var match = _.filter(items, function (item) { return item.name === sortItem.name; });
                if (match.length) {
                    var m = match[0];
                    if (sortItem.label)
                        m.label = sortItem.label;
                    m.added = true;
                    result.push(m);
                }
            });
            var limitLocales = Utils.Bools.getBool(this.config.options.limitLocales, false);
            if (!limitLocales) {
                $.each(items, function (index, item) {
                    if (!item.added) {
                        result.push(item);
                    }
                    delete item.added;
                });
            }
            return this.locales = result;
        };
        BaseExtension.prototype.getAlternateLocale = function () {
            var locales = this.getLocales();
            var alternateLocale;
            for (var i = 0; i < locales.length; i++) {
                var l = locales[i];
                if (l.name !== this.locale) {
                    alternateLocale = l;
                }
            }
            return l;
        };
        BaseExtension.prototype.changeLocale = function (locale) {
            // if the current locale is "en-GB:English,cy-GB:Welsh"
            // and "cy-GB" is passed, it becomes "cy-GB:Welsh,en-GB:English"
            // re-order locales so the passed locale is first
            var locales = this.locales.clone();
            var index = locales.indexOfTest(function (l) {
                return l.name === locale;
            });
            locales.move(index, 0);
            // convert to comma-separated string
            var str = this.serializeLocales(locales);
            var p = new BootstrapParams_1.BootstrapParams();
            p.setLocale(str);
            this.reload(p);
        };
        BaseExtension.prototype.serializeLocales = function (locales) {
            var str = '';
            if (!locales)
                return str;
            for (var i = 0; i < locales.length; i++) {
                var l = locales[i];
                if (i > 0)
                    str += ',';
                str += l.name;
                if (l.label) {
                    str += ':' + l.label;
                }
            }
            return str;
        };
        BaseExtension.prototype.getSerializedLocales = function () {
            return this.serializeLocales(this.locales);
        };
        BaseExtension.prototype.getSharePreview = function () {
            var preview = {};
            preview.title = this.helper.getLabel();
            // todo: use getThumb (when implemented)
            var canvas = this.helper.getCurrentCanvas();
            var thumbnail = canvas.getProperty('thumbnail');
            if (!thumbnail || !_.isString(thumbnail)) {
                thumbnail = canvas.getCanonicalImageUri(this.config.options.bookmarkThumbWidth);
            }
            preview.image = thumbnail;
            return preview;
        };
        BaseExtension.prototype.getPagedIndices = function (canvasIndex) {
            if (typeof (canvasIndex) === 'undefined')
                canvasIndex = this.helper.canvasIndex;
            return [canvasIndex];
        };
        BaseExtension.prototype.getCurrentCanvases = function () {
            var indices = this.getPagedIndices(this.helper.canvasIndex);
            var canvases = [];
            for (var i = 0; i < indices.length; i++) {
                var index = indices[i];
                var canvas = this.helper.getCanvasByIndex(index);
                canvases.push(canvas);
            }
            return canvases;
        };
        BaseExtension.prototype.getCanvasLabels = function (label) {
            var indices = this.getPagedIndices();
            var labels = "";
            if (indices.length === 1) {
                labels = label;
            }
            else {
                for (var i = 1; i <= indices.length; i++) {
                    if (labels.length)
                        labels += ",";
                    labels += label + " " + i;
                }
            }
            return labels;
        };
        BaseExtension.prototype.getCurrentCanvasRange = function () {
            //var rangePath: string = this.currentRangePath ? this.currentRangePath : '';
            //var range: Manifesto.IRange = this.helper.getCanvasRange(this.helper.getCurrentCanvas(), rangePath);
            var range = this.helper.getCanvasRange(this.helper.getCurrentCanvas());
            return range;
        };
        BaseExtension.prototype.getExternalResources = function (resources) {
            var _this = this;
            var indices = this.getPagedIndices();
            var resourcesToLoad = [];
            _.each(indices, function (index) {
                var canvas = _this.helper.getCanvasByIndex(index);
                var r = new Manifold.ExternalResource(canvas, _this.helper.getInfoUri);
                r.index = index;
                // used to reload resources with isResponseHandled = true.
                if (resources) {
                    var found = _.find(resources, function (f) {
                        return f.dataUri === r.dataUri;
                    });
                    if (found) {
                        resourcesToLoad.push(found);
                    }
                    else {
                        resourcesToLoad.push(r);
                    }
                }
                else {
                    resourcesToLoad.push(r);
                }
            });
            var storageStrategy = this.config.options.tokenStorage;
            return new Promise(function (resolve) {
                manifesto.Utils.loadExternalResources(resourcesToLoad, storageStrategy, _this.clickThrough, _this.restricted, _this.login, _this.getAccessToken, _this.storeAccessToken, _this.getStoredAccessToken, _this.handleExternalResourceResponse).then(function (r) {
                    _this.resources = $.map(r, function (resource) {
                        resource.data.index = resource.index;
                        return _.toPlainObject(resource.data);
                    });
                    resolve(_this.resources);
                })['catch'](function (error) {
                    switch (error.name) {
                        case manifesto.StatusCodes.AUTHORIZATION_FAILED.toString():
                            $.publish(BaseCommands_1.BaseCommands.LOGIN_FAILED);
                            break;
                        case manifesto.StatusCodes.FORBIDDEN.toString():
                            $.publish(BaseCommands_1.BaseCommands.FORBIDDEN);
                            break;
                        case manifesto.StatusCodes.RESTRICTED.toString():
                            // do nothing
                            break;
                        default:
                            _this.showMessage(error.message || error);
                    }
                });
            });
        };
        // get hash or data-attribute params depending on whether the UV is embedded.
        BaseExtension.prototype.getParam = function (key) {
            var value;
            // deep linking is only allowed when hosted on home domain.
            if (this.isDeepLinkingEnabled()) {
                // todo: use a static type on bootstrapper.params
                value = Utils.Urls.getHashParameter(this.bootstrapper.params.paramMap[key], parent.document);
            }
            if (!value) {
                // todo: use a static type on bootstrapper.params
                value = Utils.Urls.getQuerystringParameter(this.bootstrapper.params.paramMap[key]);
            }
            return value;
        };
        // set hash params depending on whether the UV is embedded.
        BaseExtension.prototype.setParam = function (key, value) {
            if (this.isDeepLinkingEnabled()) {
                Utils.Urls.setHashParameter(this.bootstrapper.params.paramMap[key], value, parent.document);
            }
        };
        BaseExtension.prototype.viewCanvas = function (canvasIndex) {
            if (this.helper.isCanvasIndexOutOfRange(canvasIndex)) {
                this.showMessage(this.config.content.canvasIndexOutOfRange);
                canvasIndex = 0;
            }
            this.lastCanvasIndex = this.helper.canvasIndex;
            this.helper.canvasIndex = canvasIndex;
            $.publish(BaseCommands_1.BaseCommands.CANVAS_INDEX_CHANGED, [canvasIndex]);
            $.publish(BaseCommands_1.BaseCommands.OPEN_EXTERNAL_RESOURCE);
            this.setParam(Params_1.Params.canvasIndex, canvasIndex);
        };
        BaseExtension.prototype.showMessage = function (message, acceptCallback, buttonText, allowClose) {
            this.closeActiveDialogue();
            $.publish(BaseCommands_1.BaseCommands.SHOW_GENERIC_DIALOGUE, [
                {
                    message: message,
                    acceptCallback: acceptCallback,
                    buttonText: buttonText,
                    allowClose: allowClose
                }
            ]);
        };
        BaseExtension.prototype.closeActiveDialogue = function () {
            $.publish(BaseCommands_1.BaseCommands.CLOSE_ACTIVE_DIALOGUE);
        };
        BaseExtension.prototype.isOverlayActive = function () {
            return Shell_1.Shell.$overlays.is(':visible');
        };
        BaseExtension.prototype.viewManifest = function (manifest) {
            var p = new BootstrapParams_1.BootstrapParams();
            p.manifestUri = this.helper.iiifResourceUri;
            p.collectionIndex = this.helper.getCollectionIndex(manifest);
            p.manifestIndex = manifest.index;
            p.sequenceIndex = 0;
            p.canvasIndex = 0;
            this.reload(p);
        };
        BaseExtension.prototype.viewCollection = function (collection) {
            var p = new BootstrapParams_1.BootstrapParams();
            p.manifestUri = this.helper.iiifResourceUri;
            p.collectionIndex = collection.index;
            p.manifestIndex = 0;
            p.sequenceIndex = 0;
            p.canvasIndex = 0;
            this.reload(p);
        };
        BaseExtension.prototype.isFullScreen = function () {
            return this.bootstrapper.isFullScreen;
        };
        BaseExtension.prototype.isHeaderPanelEnabled = function () {
            return Utils.Bools.getBool(this.config.options.headerPanelEnabled, true);
        };
        BaseExtension.prototype.isLeftPanelEnabled = function () {
            if (Utils.Bools.getBool(this.config.options.leftPanelEnabled, true)) {
                if (this.helper.hasParentCollection()) {
                    return true;
                }
                else if (this.helper.isMultiCanvas()) {
                    if (this.helper.getViewingHint().toString() !== manifesto.ViewingHint.continuous().toString()) {
                        return true;
                    }
                }
            }
            return false;
        };
        BaseExtension.prototype.isRightPanelEnabled = function () {
            return Utils.Bools.getBool(this.config.options.rightPanelEnabled, true);
        };
        BaseExtension.prototype.isFooterPanelEnabled = function () {
            return Utils.Bools.getBool(this.config.options.footerPanelEnabled, true);
        };
        BaseExtension.prototype.useArrowKeysToNavigate = function () {
            return Utils.Bools.getBool(this.config.options.useArrowKeysToNavigate, true);
        };
        BaseExtension.prototype.bookmark = function () {
            // override for each extension
        };
        BaseExtension.prototype.feedback = function () {
            this.triggerSocket(BaseCommands_1.BaseCommands.FEEDBACK, new BootstrapParams_1.BootstrapParams());
        };
        BaseExtension.prototype.getBookmarkUri = function () {
            var absUri = parent.document.URL;
            var parts = Utils.Urls.getUrlParts(absUri);
            var relUri = parts.pathname + parts.search + parent.document.location.hash;
            if (!relUri.startsWith("/")) {
                relUri = "/" + relUri;
            }
            return relUri;
        };
        // auth
        BaseExtension.prototype.clickThrough = function (resource) {
            return new Promise(function (resolve) {
                $.publish(BaseCommands_1.BaseCommands.SHOW_CLICKTHROUGH_DIALOGUE, [{
                        resource: resource,
                        acceptCallback: function () {
                            var win = window.open(resource.clickThroughService.id);
                            var pollTimer = window.setInterval(function () {
                                if (win.closed) {
                                    window.clearInterval(pollTimer);
                                    $.publish(BaseCommands_1.BaseCommands.CLICKTHROUGH);
                                    resolve();
                                }
                            }, 500);
                        }
                    }]);
            });
        };
        BaseExtension.prototype.restricted = function (resource) {
            return new Promise(function (resolve, reject) {
                $.publish(BaseCommands_1.BaseCommands.SHOW_RESTRICTED_DIALOGUE, [{
                        resource: resource,
                        acceptCallback: function () {
                            $.publish(BaseCommands_1.BaseCommands.LOAD_FAILED);
                            reject(resource);
                        }
                    }]);
            });
        };
        BaseExtension.prototype.login = function (resource) {
            return new Promise(function (resolve) {
                var options = {};
                if (resource.status === HTTPStatusCode.FORBIDDEN) {
                    options.warningMessage = LoginWarningMessages_1.LoginWarningMessages.FORBIDDEN;
                    options.showCancelButton = true;
                }
                $.publish(BaseCommands_1.BaseCommands.SHOW_LOGIN_DIALOGUE, [{
                        resource: resource,
                        loginCallback: function () {
                            var win = window.open(resource.loginService.id + "?t=" + new Date().getTime());
                            var pollTimer = window.setInterval(function () {
                                if (win.closed) {
                                    window.clearInterval(pollTimer);
                                    $.publish(BaseCommands_1.BaseCommands.LOGIN);
                                    resolve();
                                }
                            }, 500);
                        },
                        logoutCallback: function () {
                            var win = window.open(resource.logoutService.id + "?t=" + new Date().getTime());
                            var pollTimer = window.setInterval(function () {
                                if (win.closed) {
                                    window.clearInterval(pollTimer);
                                    $.publish(BaseCommands_1.BaseCommands.LOGOUT);
                                    resolve();
                                }
                            }, 500);
                        },
                        options: options
                    }]);
            });
        };
        BaseExtension.prototype.getAccessToken = function (resource, rejectOnError) {
            return new Promise(function (resolve, reject) {
                var serviceUri = resource.tokenService.id;
                // pick an identifier for this message. We might want to keep track of sent messages
                var msgId = serviceUri + "|" + new Date().getTime();
                var receiveAccessToken = function (e) {
                    window.removeEventListener("message", receiveAccessToken);
                    var token = e.data;
                    if (token.error) {
                        if (rejectOnError) {
                            reject(token.errorDescription);
                        }
                        else {
                            resolve(null);
                        }
                    }
                    else {
                        resolve(token);
                    }
                };
                window.addEventListener("message", receiveAccessToken, false);
                var tokenUri = serviceUri + "?messageId=" + msgId;
                $('#commsFrame').prop('src', tokenUri);
            });
            // deprecated JSONP method - keep this around for reference
            //return new Promise<Manifesto.IAccessToken>((resolve, reject) => {
            //    $.getJSON(resource.tokenService.id + "?callback=?", (token: Manifesto.IAccessToken) => {
            //        if (token.error){
            //            if(rejectOnError) {
            //                reject(token.errorDescription);
            //            } else {
            //                resolve(null);
            //            }
            //        } else {
            //            resolve(token);
            //        }
            //    }).fail((error) => {
            //        if(rejectOnError) {
            //            reject(error);
            //        } else {
            //            resolve(null);
            //        }
            //    });
            //});
        };
        BaseExtension.prototype.storeAccessToken = function (resource, token, storageStrategy) {
            return new Promise(function (resolve, reject) {
                Utils.Storage.set(resource.tokenService.id, token, token.expiresIn, new Utils.StorageType(storageStrategy));
                resolve();
            });
        };
        BaseExtension.prototype.getStoredAccessToken = function (resource, storageStrategy) {
            return new Promise(function (resolve, reject) {
                var foundItems = [];
                var item;
                // try to match on the tokenService, if the resource has one:
                if (resource.tokenService) {
                    item = Utils.Storage.get(resource.tokenService.id, new Utils.StorageType(storageStrategy));
                }
                if (item) {
                    foundItems.push(item);
                }
                else {
                    // find an access token for the domain
                    var domain = Utils.Urls.getUrlParts(resource.dataUri).hostname;
                    var items = Utils.Storage.getItems(new Utils.StorageType(storageStrategy));
                    for (var i = 0; i < items.length; i++) {
                        item = items[i];
                        if (item.key.contains(domain)) {
                            foundItems.push(item);
                        }
                    }
                }
                // sort by expiresAt
                foundItems = _.sortBy(foundItems, function (item) {
                    return item.expiresAt;
                });
                var foundToken;
                if (foundItems.length) {
                    foundToken = foundItems.last().value;
                }
                resolve(foundToken);
            });
        };
        BaseExtension.prototype.handleExternalResourceResponse = function (resource) {
            return new Promise(function (resolve, reject) {
                resource.isResponseHandled = true;
                if (resource.status === HTTPStatusCode.OK) {
                    resolve(resource);
                }
                else if (resource.status === HTTPStatusCode.MOVED_TEMPORARILY) {
                    resolve(resource);
                    $.publish(BaseCommands_1.BaseCommands.RESOURCE_DEGRADED, [resource]);
                }
                else {
                    if (resource.error.status === HTTPStatusCode.UNAUTHORIZED ||
                        resource.error.status === HTTPStatusCode.INTERNAL_SERVER_ERROR) {
                        // if the browser doesn't support CORS
                        if (!Modernizr.cors) {
                            var informationArgs = new InformationArgs_1.InformationArgs(InformationType_1.InformationType.AUTH_CORS_ERROR, null);
                            $.publish(BaseCommands_1.BaseCommands.SHOW_INFORMATION, [informationArgs]);
                            resolve(resource);
                        }
                        else {
                            reject(resource.error.statusText);
                        }
                    }
                    else if (resource.error.status === HTTPStatusCode.FORBIDDEN) {
                        var error = new Error();
                        error.message = "Forbidden";
                        error.name = manifesto.StatusCodes.FORBIDDEN.toString();
                        reject(error);
                    }
                    else {
                        reject(resource.error.statusText);
                    }
                }
            });
        };
        BaseExtension.prototype.handleDegraded = function (resource) {
            var informationArgs = new InformationArgs_1.InformationArgs(InformationType_1.InformationType.DEGRADED_RESOURCE, resource);
            $.publish(BaseCommands_1.BaseCommands.SHOW_INFORMATION, [informationArgs]);
        };
        return BaseExtension;
    }());
    exports.BaseExtension = BaseExtension;
});
//# sourceMappingURL=BaseExtension.js.map;
define('modules/uv-shared-module/Bookmark',["require", "exports"], function (require, exports) {
    "use strict";
    var Bookmark = (function () {
        function Bookmark() {
        }
        return Bookmark;
    }());
    exports.Bookmark = Bookmark;
});
//# sourceMappingURL=Bookmark.js.map;
define('extensions/uv-seadragon-extension/Commands',["require", "exports"], function (require, exports) {
    "use strict";
    var Commands = (function () {
        function Commands() {
        }
        return Commands;
    }());
    Commands.namespace = 'seadragonExtension.';
    Commands.CLEAR_SEARCH = Commands.namespace + 'onClearSearch';
    Commands.CURRENT_VIEW_URI = Commands.namespace + 'onCurrentViewUri';
    Commands.FIRST = Commands.namespace + 'onFirst';
    Commands.GALLERY_DECREASE_SIZE = Commands.namespace + 'onGalleryDecreaseSize';
    Commands.GALLERY_INCREASE_SIZE = Commands.namespace + 'onGalleryIncreaseSize';
    Commands.GALLERY_THUMB_SELECTED = Commands.namespace + 'onGalleryThumbSelected';
    Commands.HIDE_MULTISELECT_DIALOGUE = Commands.namespace + 'onHideMultiSelectDialogue';
    Commands.IMAGE_SEARCH = Commands.namespace + 'onImageSearch';
    Commands.LAST = Commands.namespace + 'onLast';
    Commands.MODE_CHANGED = Commands.namespace + 'onModeChanged';
    Commands.MULTISELECT_CHANGE = Commands.namespace + 'onMultiSelectChange';
    Commands.MULTISELECTION_MADE = Commands.namespace + 'onMultiSelectionMade';
    Commands.NEXT_SEARCH_RESULT = Commands.namespace + 'onNextSearchResult';
    Commands.NEXT = Commands.namespace + 'onNext';
    Commands.NEXT_IMAGES_SEARCH_RESULT_UNAVAILABLE = Commands.namespace + 'onNextImagesSearchResultUnavailable';
    Commands.PREV_IMAGES_SEARCH_RESULT_UNAVAILABLE = Commands.namespace + 'onPrevImagesSearchResultUnavailable';
    Commands.OPEN_THUMBS_VIEW = Commands.namespace + 'onOpenThumbsView';
    Commands.OPEN_TREE_VIEW = Commands.namespace + 'onOpenTreeView';
    Commands.PAGE_SEARCH = Commands.namespace + 'onPageSearch';
    Commands.PAGING_TOGGLED = Commands.namespace + 'onPagingToggled';
    Commands.PREV_SEARCH_RESULT = Commands.namespace + 'onPrevSearchResult';
    Commands.PREV = Commands.namespace + 'onPrev';
    Commands.PRINT = Commands.namespace + 'onPrint';
    Commands.ROTATE = Commands.namespace + 'onRotate';
    Commands.SEADRAGON_ANIMATION_FINISH = Commands.namespace + 'onAnimationfinish';
    Commands.SEADRAGON_ANIMATION_START = Commands.namespace + 'onAnimationStart';
    Commands.SEADRAGON_ANIMATION = Commands.namespace + 'onAnimation';
    Commands.SEADRAGON_OPEN = Commands.namespace + 'onOpen';
    Commands.SEADRAGON_RESIZE = Commands.namespace + 'onResize';
    Commands.SEADRAGON_ROTATION = Commands.namespace + 'onRotation';
    Commands.SEARCH_PREVIEW_FINISH = Commands.namespace + 'onSearchPreviewFinish';
    Commands.SEARCH_PREVIEW_START = Commands.namespace + 'onSearchPreviewStart';
    Commands.SEARCH_RESULT_CANVAS_CHANGED = Commands.namespace + 'onSearchResultCanvasChanged';
    Commands.SEARCH_RESULT_RECT_CHANGED = Commands.namespace + 'onSearchResultRectChanged';
    Commands.SEARCH_RESULTS_EMPTY = Commands.namespace + 'onSearchResultsEmpty';
    Commands.SEARCH_RESULTS = Commands.namespace + 'onSearchResults';
    Commands.SEARCH_RESULTS_CLEARED = Commands.namespace + 'onSearchResultsCleared';
    Commands.SEARCH = Commands.namespace + 'onSearch';
    Commands.SHOW_MULTISELECT_DIALOGUE = Commands.namespace + 'onShowMultiSelectDialogue';
    Commands.THUMB_MULTISELECTED = Commands.namespace + 'onThumbMultiSelected';
    Commands.TREE_NODE_MULTISELECTED = Commands.namespace + 'onTreeNodeMultiSelected';
    Commands.TREE_NODE_SELECTED = Commands.namespace + 'onTreeNodeSelected';
    Commands.VIEW_PAGE = Commands.namespace + 'onViewPage';
    Commands.ZOOM_IN = Commands.namespace + 'onZoomIn';
    Commands.ZOOM_OUT = Commands.namespace + 'onZoomOut';
    exports.Commands = Commands;
});
//# sourceMappingURL=Commands.js.map;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define('modules/uv-contentleftpanel-module/GalleryView',["require", "exports", "../uv-shared-module/BaseCommands", "../uv-shared-module/BaseView", "../../extensions/uv-seadragon-extension/Commands"], function (require, exports, BaseCommands_1, BaseView_1, Commands_1) {
    "use strict";
    var GalleryView = (function (_super) {
        __extends(GalleryView, _super);
        function GalleryView($element) {
            var _this = _super.call(this, $element, true, true) || this;
            _this.isOpen = false;
            return _this;
        }
        GalleryView.prototype.create = function () {
            this.setConfig('contentLeftPanel');
            _super.prototype.create.call(this);
            // search preview doesn't work well with the gallery because it loads thumbs in "chunks"
            // $.subscribe(Commands.SEARCH_PREVIEW_START, (e, canvasIndex) => {
            //     this.component.searchPreviewStart(canvasIndex);
            // });
            // $.subscribe(Commands.SEARCH_PREVIEW_FINISH, () => {
            //     this.component.searchPreviewFinish();
            // });
            this.$gallery = $('<div class="iiif-gallery-component"></div>');
            this.$element.append(this.$gallery);
        };
        GalleryView.prototype.setup = function () {
            this.component = new IIIFComponents.GalleryComponent({
                target: this.$gallery[0],
                data: this.galleryData
            });
            this.component.on('thumbSelected', function (args) {
                var thumb = args[0];
                $.publish(Commands_1.Commands.GALLERY_THUMB_SELECTED, [thumb]);
                $.publish(BaseCommands_1.BaseCommands.THUMB_SELECTED, [thumb]);
            });
            this.component.on('decreaseSize', function () {
                $.publish(Commands_1.Commands.GALLERY_DECREASE_SIZE);
            });
            this.component.on('increaseSize', function () {
                $.publish(Commands_1.Commands.GALLERY_INCREASE_SIZE);
            });
        };
        GalleryView.prototype.databind = function () {
            this.component.options.data = this.galleryData;
            this.component.set(null); // todo: should be passing options.data
            this.resize();
        };
        GalleryView.prototype.show = function () {
            var _this = this;
            this.isOpen = true;
            this.$element.show();
            // todo: would be better to have no imperative methods on components and use a reactive pattern
            setTimeout(function () {
                _this.component.selectIndex(_this.extension.helper.canvasIndex);
            }, 10);
        };
        GalleryView.prototype.hide = function () {
            this.isOpen = false;
            this.$element.hide();
        };
        GalleryView.prototype.resize = function () {
            _super.prototype.resize.call(this);
            var $main = this.$gallery.find('.main');
            var $header = this.$gallery.find('.header');
            $main.height(this.$element.height() - $header.height());
        };
        return GalleryView;
    }(BaseView_1.BaseView));
    exports.GalleryView = GalleryView;
});
//# sourceMappingURL=GalleryView.js.map;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define('modules/uv-shared-module/BaseExpandPanel',["require", "exports", "./BaseView"], function (require, exports, BaseView_1) {
    "use strict";
    var BaseExpandPanel = (function (_super) {
        __extends(BaseExpandPanel, _super);
        function BaseExpandPanel($element) {
            var _this = _super.call(this, $element, false, true) || this;
            _this.isExpanded = false;
            _this.isFullyExpanded = false;
            _this.isUnopened = true;
            _this.autoToggled = false;
            _this.expandFullEnabled = true;
            return _this;
        }
        BaseExpandPanel.prototype.create = function () {
            var _this = this;
            _super.prototype.create.call(this);
            this.$top = $('<div class="top"></div>');
            this.$element.append(this.$top);
            this.$title = $('<div class="title"></div>');
            this.$title.prop('title', this.content.title);
            this.$top.append(this.$title);
            this.$expandFullButton = $('<a class="expandFullButton" tabindex="0"></a>');
            this.$expandFullButton.prop('title', this.content.expandFull);
            this.$top.append(this.$expandFullButton);
            if (!Utils.Bools.getBool(this.config.options.expandFullEnabled, true)) {
                this.$expandFullButton.hide();
            }
            this.$collapseButton = $('<div class="collapseButton" tabindex="0"></div>');
            this.$collapseButton.prop('title', this.content.collapse);
            this.$top.append(this.$collapseButton);
            this.$closed = $('<div class="closed"></div>');
            this.$element.append(this.$closed);
            this.$expandButton = $('<a class="expandButton" tabindex="0"></a>');
            this.$expandButton.prop('title', this.content.expand);
            this.$closed.append(this.$expandButton);
            this.$closedTitle = $('<a class="title"></a>');
            this.$closedTitle.prop('title', this.content.title);
            this.$closed.append(this.$closedTitle);
            this.$main = $('<div class="main"></div>');
            this.$element.append(this.$main);
            this.$expandButton.onPressed(function () {
                _this.toggle();
            });
            this.$expandFullButton.onPressed(function () {
                _this.expandFull();
            });
            this.$closedTitle.onPressed(function () {
                _this.toggle();
            });
            this.$title.onPressed(function () {
                if (_this.isFullyExpanded) {
                    _this.collapseFull();
                }
                else {
                    _this.toggle();
                }
            });
            this.$collapseButton.onPressed(function () {
                if (_this.isFullyExpanded) {
                    _this.collapseFull();
                }
                else {
                    _this.toggle();
                }
            });
            this.$top.hide();
            this.$main.hide();
        };
        BaseExpandPanel.prototype.init = function () {
            _super.prototype.init.call(this);
        };
        BaseExpandPanel.prototype.setTitle = function (title) {
            this.$title.text(title);
            this.$closedTitle.text(title);
        };
        BaseExpandPanel.prototype.toggle = function (autoToggled) {
            var _this = this;
            (autoToggled) ? this.autoToggled = true : this.autoToggled = false;
            // if collapsing, hide contents immediately.
            if (this.isExpanded) {
                this.$top.hide();
                this.$main.hide();
                this.$closed.show();
            }
            this.$element.stop().animate({
                width: this.getTargetWidth(),
                left: this.getTargetLeft()
            }, this.options.panelAnimationDuration, function () {
                _this.toggled();
            });
        };
        BaseExpandPanel.prototype.toggled = function () {
            this.toggleStart();
            this.isExpanded = !this.isExpanded;
            // if expanded show content when animation finished.
            if (this.isExpanded) {
                this.$closed.hide();
                this.$top.show();
                this.$main.show();
            }
            this.toggleFinish();
            this.isUnopened = false;
        };
        BaseExpandPanel.prototype.expandFull = function () {
            var _this = this;
            if (!this.isExpanded) {
                this.toggled();
            }
            var targetWidth = this.getFullTargetWidth();
            var targetLeft = this.getFullTargetLeft();
            this.expandFullStart();
            this.$element.stop().animate({
                width: targetWidth,
                left: targetLeft
            }, this.options.panelAnimationDuration, function () {
                _this.expandFullFinish();
            });
        };
        BaseExpandPanel.prototype.collapseFull = function () {
            var _this = this;
            var targetWidth = this.getTargetWidth();
            var targetLeft = this.getTargetLeft();
            this.collapseFullStart();
            this.$element.stop().animate({
                width: targetWidth,
                left: targetLeft
            }, this.options.panelAnimationDuration, function () {
                _this.collapseFullFinish();
            });
        };
        BaseExpandPanel.prototype.getTargetWidth = function () {
            return 0;
        };
        BaseExpandPanel.prototype.getTargetLeft = function () {
            return 0;
        };
        BaseExpandPanel.prototype.getFullTargetWidth = function () {
            return 0;
        };
        BaseExpandPanel.prototype.getFullTargetLeft = function () {
            return 0;
        };
        BaseExpandPanel.prototype.toggleStart = function () {
        };
        BaseExpandPanel.prototype.toggleFinish = function () {
            if (this.isExpanded && !this.autoToggled) {
                this.focusCollapseButton();
            }
            else {
                this.focusExpandButton();
            }
        };
        BaseExpandPanel.prototype.expandFullStart = function () {
        };
        BaseExpandPanel.prototype.expandFullFinish = function () {
            this.isFullyExpanded = true;
            this.$expandFullButton.hide();
            this.focusCollapseButton();
        };
        BaseExpandPanel.prototype.collapseFullStart = function () {
        };
        BaseExpandPanel.prototype.collapseFullFinish = function () {
            this.isFullyExpanded = false;
            if (this.expandFullEnabled) {
                this.$expandFullButton.show();
            }
            this.focusExpandFullButton();
        };
        BaseExpandPanel.prototype.focusExpandButton = function () {
            var _this = this;
            setTimeout(function () {
                _this.$expandButton.focus();
            }, 1);
        };
        BaseExpandPanel.prototype.focusExpandFullButton = function () {
            var _this = this;
            setTimeout(function () {
                _this.$expandFullButton.focus();
            }, 1);
        };
        BaseExpandPanel.prototype.focusCollapseButton = function () {
            var _this = this;
            setTimeout(function () {
                _this.$collapseButton.focus();
            }, 1);
        };
        BaseExpandPanel.prototype.resize = function () {
            _super.prototype.resize.call(this);
            this.$main.height(this.$element.parent().height() - this.$top.outerHeight(true));
        };
        return BaseExpandPanel;
    }(BaseView_1.BaseView));
    exports.BaseExpandPanel = BaseExpandPanel;
});
//# sourceMappingURL=BaseExpandPanel.js.map;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define('modules/uv-shared-module/LeftPanel',["require", "exports", "./BaseCommands", "./BaseExpandPanel"], function (require, exports, BaseCommands_1, BaseExpandPanel_1) {
    "use strict";
    var LeftPanel = (function (_super) {
        __extends(LeftPanel, _super);
        function LeftPanel($element) {
            return _super.call(this, $element) || this;
        }
        LeftPanel.prototype.create = function () {
            var _this = this;
            _super.prototype.create.call(this);
            this.$element.width(this.options.panelCollapsedWidth);
            $.subscribe(BaseCommands_1.BaseCommands.TOGGLE_EXPAND_LEFT_PANEL, function () {
                if (_this.isFullyExpanded) {
                    _this.collapseFull();
                }
                else {
                    _this.expandFull();
                }
            });
        };
        LeftPanel.prototype.init = function () {
            _super.prototype.init.call(this);
            var shouldOpenPanel = Utils.Bools.getBool(this.extension.getSettings().leftPanelOpen, this.options.panelOpen);
            if (shouldOpenPanel) {
                this.toggle(true);
            }
        };
        LeftPanel.prototype.getTargetWidth = function () {
            if (this.isFullyExpanded || !this.isExpanded) {
                return this.options.panelExpandedWidth;
            }
            else {
                return this.options.panelCollapsedWidth;
            }
        };
        LeftPanel.prototype.getFullTargetWidth = function () {
            return this.$element.parent().width();
        };
        LeftPanel.prototype.toggleFinish = function () {
            _super.prototype.toggleFinish.call(this);
            if (this.isExpanded) {
                $.publish(BaseCommands_1.BaseCommands.OPEN_LEFT_PANEL);
            }
            else {
                $.publish(BaseCommands_1.BaseCommands.CLOSE_LEFT_PANEL);
            }
            this.extension.updateSettings({ leftPanelOpen: this.isExpanded });
        };
        LeftPanel.prototype.resize = function () {
            _super.prototype.resize.call(this);
            if (this.isFullyExpanded) {
                this.$element.width(this.$element.parent().width());
            }
        };
        return LeftPanel;
    }(BaseExpandPanel_1.BaseExpandPanel));
    exports.LeftPanel = LeftPanel;
});
//# sourceMappingURL=LeftPanel.js.map;
define('extensions/uv-seadragon-extension/Mode',["require", "exports"], function (require, exports) {
    "use strict";
    var Mode = (function () {
        function Mode(value) {
            this.value = value;
        }
        Mode.prototype.toString = function () {
            return this.value;
        };
        return Mode;
    }());
    Mode.image = new Mode("image");
    Mode.page = new Mode("page");
    exports.Mode = Mode;
});
//# sourceMappingURL=Mode.js.map;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define('modules/uv-shared-module/ThumbsView',["require", "exports", "./BaseCommands", "./BaseView"], function (require, exports, BaseCommands_1, BaseView_1) {
    "use strict";
    var ThumbsView = (function (_super) {
        __extends(ThumbsView, _super);
        function ThumbsView($element) {
            var _this = _super.call(this, $element, true, true) || this;
            _this.isCreated = false;
            _this.isOpen = false;
            return _this;
        }
        ThumbsView.prototype.create = function () {
            var _this = this;
            _super.prototype.create.call(this);
            $.subscribe(BaseCommands_1.BaseCommands.CANVAS_INDEX_CHANGED, function (e, index) {
                _this.selectIndex(parseInt(index));
            });
            $.subscribe(BaseCommands_1.BaseCommands.LOGIN, function () {
                _this.loadThumbs();
            });
            $.subscribe(BaseCommands_1.BaseCommands.CLICKTHROUGH, function () {
                _this.loadThumbs();
            });
            this.$thumbs = $('<div class="thumbs"></div>');
            this.$element.append(this.$thumbs);
            this.$thumbs.addClass(this.extension.helper.getViewingDirection().toString()); // defaults to "left-to-right"
            var that = this;
            $.templates({
                thumbsTemplate: '<div id="thumb{{>index}}" class="{{:~className()}}" data-src="{{>uri}}" data-visible="{{>visible}}" data-index="{{>index}}">\
                                <div class="wrap" style="height:{{>height + ~extraHeight()}}px"></div>\
                                <div class="info">\
                                    <span class="index">{{:#index + 1}}</span>\
                                    <span class="label" title="{{>label}}">{{>label}}&nbsp;</span>\
                                    <span class="searchResults" title="{{:~searchResultsTitle()}}">{{>data.searchResults}}</span>\
                                </div>\
                             </div>\
                             {{if ~separator()}} \
                                 <div class="separator"></div> \
                             {{/if}}'
            });
            var extraHeight = this.options.thumbsExtraHeight;
            $.views.helpers({
                separator: function () {
                    return false;
                },
                extraHeight: function () {
                    return extraHeight;
                },
                className: function () {
                    var className = "thumb";
                    if (this.data.index === 0) {
                        className += " first";
                    }
                    if (!this.data.uri) {
                        className += " placeholder";
                    }
                    var viewingDirection = that.extension.helper.getViewingDirection().toString();
                    if (viewingDirection === manifesto.ViewingDirection.topToBottom().toString() || viewingDirection === manifesto.ViewingDirection.bottomToTop().toString()) {
                        className += " oneCol";
                    }
                    else {
                        className += " twoCol";
                    }
                    return className;
                },
                searchResultsTitle: function () {
                    var searchResults = Number(this.data.data.searchResults);
                    if (searchResults) {
                        if (searchResults > 1) {
                            return String.format(that.content.searchResults, searchResults);
                        }
                        return String.format(that.content.searchResult, searchResults);
                    }
                }
            });
            // use unevent to detect scroll stop.
            this.$element.on('scroll', function () {
                _this.scrollStop();
            }, 100);
            this.resize();
        };
        ThumbsView.prototype.databind = function () {
            if (!this.thumbs)
                return;
            this._thumbsCache = null; // delete cache
            this.createThumbs();
            // do initial load to show padlocks
            this.loadThumbs(0);
            this.selectIndex(this.extension.helper.canvasIndex);
        };
        ThumbsView.prototype.createThumbs = function () {
            var that = this;
            if (!this.thumbs)
                return;
            // get median height
            var heights = [];
            for (var i = 0; i < this.thumbs.length; i++) {
                var thumb = this.thumbs[i];
                heights.push(thumb.height);
            }
            var medianHeight = Math.median(heights);
            for (var i = 0; i < this.thumbs.length; i++) {
                var thumb = this.thumbs[i];
                thumb.height = medianHeight;
            }
            this.$thumbs.link($.templates.thumbsTemplate, this.thumbs);
            this.$thumbs.undelegate('.thumb', 'click');
            this.$thumbs.delegate(".thumb", "click", function (e) {
                e.preventDefault();
                var data = $.view(this).data;
                that.lastThumbClickedIndex = data.index;
                $.publish(BaseCommands_1.BaseCommands.THUMB_SELECTED, [data]);
            });
            this.setLabel();
            this.isCreated = true;
        };
        ThumbsView.prototype.selectAll = function (selected) {
        };
        ThumbsView.prototype.scrollStop = function () {
            var scrollPos = 1 / ((this.$thumbs.height() - this.$element.height()) / this.$element.scrollTop());
            if (scrollPos > 1)
                scrollPos = 1;
            var thumbRangeMid = Math.floor((this.thumbs.length - 1) * scrollPos);
            this.loadThumbs(thumbRangeMid);
        };
        ThumbsView.prototype.loadThumbs = function (index) {
            if (!this.thumbs || !this.thumbs.length)
                return;
            if (_.isUndefined(index)) {
                index = this.extension.helper.canvasIndex;
            }
            var thumbRangeMid = index;
            var thumbLoadRange = this.options.thumbsLoadRange;
            var thumbRange = {
                start: (thumbRangeMid > thumbLoadRange) ? thumbRangeMid - thumbLoadRange : 0,
                end: (thumbRangeMid < (this.thumbs.length - 1) - thumbLoadRange) ? thumbRangeMid + thumbLoadRange : this.thumbs.length - 1
            };
            //console.log('start: ' + thumbRange.start + ' end: ' + thumbRange.end);
            var fadeDuration = this.options.thumbsImageFadeInDuration;
            for (var i = thumbRange.start; i <= thumbRange.end; i++) {
                var $thumb = this.getThumbByIndex(i);
                var $wrap = $thumb.find('.wrap');
                // if no img has been added yet
                if (!$wrap.hasClass('loading') && !$wrap.hasClass('loaded')) {
                    var visible = $thumb.attr('data-visible');
                    if (visible !== "false") {
                        $wrap.removeClass('loadingFailed');
                        $wrap.addClass('loading');
                        var src = $thumb.attr('data-src');
                        src += '?t=' + Utils.Dates.getTimeStamp();
                        //console.log(i, src);
                        var img = $('<img src="' + src + '" />');
                        // fade in on load.
                        $(img).hide().load(function () {
                            $(this).fadeIn(fadeDuration, function () {
                                $(this).parent().swapClass('loading', 'loaded');
                            });
                        }).error(function () {
                            $(this).parent().swapClass('loading', 'loadingFailed');
                        });
                        $wrap.append(img);
                    }
                    else {
                        $wrap.addClass('hidden');
                    }
                }
            }
        };
        ThumbsView.prototype.show = function () {
            var _this = this;
            this.isOpen = true;
            this.$element.show();
            setTimeout(function () {
                _this.selectIndex(_this.extension.helper.canvasIndex);
            }, 1);
        };
        ThumbsView.prototype.hide = function () {
            this.isOpen = false;
            this.$element.hide();
        };
        ThumbsView.prototype.isPDF = function () {
            // todo: use constants
            return (this.extension.helper.getElementType().toString().contains("pdf"));
        };
        ThumbsView.prototype.setLabel = function () {
            $(this.$thumbs).find('span.index').hide();
            $(this.$thumbs).find('span.label').show();
        };
        ThumbsView.prototype.addSelectedClassToThumbs = function (index) {
            this.getThumbByIndex(index).addClass('selected');
        };
        ThumbsView.prototype.selectIndex = function (index) {
            // may be authenticating
            if (index === -1)
                return;
            if (!this.thumbs || !this.thumbs.length)
                return;
            this.getAllThumbs().removeClass('selected');
            this.$selectedThumb = this.getThumbByIndex(index);
            this.addSelectedClassToThumbs(index);
            var indices = this.extension.getPagedIndices(index);
            // scroll to thumb if the index change didn't originate
            // within the thumbs view.
            if (!~indices.indexOf(this.lastThumbClickedIndex)) {
                this.$element.scrollTop(this.$selectedThumb.position().top);
            }
            // make sure visible images are loaded.
            this.loadThumbs(index);
        };
        ThumbsView.prototype.getAllThumbs = function () {
            if (!this._thumbsCache) {
                this._thumbsCache = this.$thumbs.find('.thumb');
            }
            return this._thumbsCache;
        };
        ThumbsView.prototype.getThumbByIndex = function (canvasIndex) {
            return this.$thumbs.find('[data-index="' + canvasIndex + '"]');
        };
        ThumbsView.prototype.scrollToThumb = function (canvasIndex) {
            var $thumb = this.getThumbByIndex(canvasIndex);
            this.$element.scrollTop($thumb.position().top);
        };
        ThumbsView.prototype.resize = function () {
            _super.prototype.resize.call(this);
        };
        return ThumbsView;
    }(BaseView_1.BaseView));
    exports.ThumbsView = ThumbsView;
});
//# sourceMappingURL=ThumbsView.js.map;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define('modules/uv-contentleftpanel-module/ThumbsView',["require", "exports", "../uv-shared-module/ThumbsView", "../../extensions/uv-seadragon-extension/Commands", "../../extensions/uv-seadragon-extension/Mode"], function (require, exports, ThumbsView_1, Commands_1, Mode_1) {
    "use strict";
    var ThumbsView = (function (_super) {
        __extends(ThumbsView, _super);
        function ThumbsView() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ThumbsView.prototype.create = function () {
            var _this = this;
            this.setConfig('contentLeftPanel');
            _super.prototype.create.call(this);
            // todo: this should be a setting
            $.subscribe(Commands_1.Commands.MODE_CHANGED, function (e, mode) {
                _this.setLabel();
            });
            $.subscribe(Commands_1.Commands.SEARCH_PREVIEW_START, function (e, canvasIndex) {
                _this.searchPreviewStart(canvasIndex);
            });
            $.subscribe(Commands_1.Commands.SEARCH_PREVIEW_FINISH, function () {
                _this.searchPreviewFinish();
            });
            if (this.extension.helper.isPaged()) {
                this.$thumbs.addClass('paged');
            }
            var that = this;
            $.views.helpers({
                separator: function () {
                    if (that.extension.helper.isVerticallyAligned()) {
                        return true; // one thumb per line
                    }
                    // two thumbs per line
                    if (that.extension.helper.isPaged()) {
                        return ((this.data.index - 1) % 2 == 0) ? false : true;
                    }
                    return false;
                }
            });
        };
        ThumbsView.prototype.addSelectedClassToThumbs = function (index) {
            if (this.extension.isPagingSettingEnabled()) {
                var indices = this.extension.getPagedIndices(index);
                for (var i = 0; i < indices.length; i++) {
                    this.getThumbByIndex(indices[i]).addClass('selected');
                }
            }
            else {
                this.getThumbByIndex(index).addClass('selected');
            }
        };
        ThumbsView.prototype.isPageModeEnabled = function () {
            if (typeof this.extension.getMode === "function") {
                return this.config.options.pageModeEnabled && this.extension.getMode().toString() === Mode_1.Mode.page.toString();
            }
            return this.config.options.pageModeEnabled;
        };
        ThumbsView.prototype.searchPreviewStart = function (canvasIndex) {
            this.scrollToThumb(canvasIndex);
            var $thumb = this.getThumbByIndex(canvasIndex);
            $thumb.addClass('searchpreview');
        };
        ThumbsView.prototype.searchPreviewFinish = function () {
            this.scrollToThumb(this.extension.helper.canvasIndex);
            this.getAllThumbs().removeClass('searchpreview');
        };
        ThumbsView.prototype.setLabel = function () {
            if (this.isPDF()) {
                $(this.$thumbs).find('span.index').hide();
                $(this.$thumbs).find('span.label').hide();
            }
            else {
                if (this.isPageModeEnabled()) {
                    $(this.$thumbs).find('span.index').hide();
                    $(this.$thumbs).find('span.label').show();
                }
                else {
                    $(this.$thumbs).find('span.index').show();
                    $(this.$thumbs).find('span.label').hide();
                }
            }
        };
        return ThumbsView;
    }(ThumbsView_1.ThumbsView));
    exports.ThumbsView = ThumbsView;
});
//# sourceMappingURL=ThumbsView.js.map;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define('modules/uv-contentleftpanel-module/TreeView',["require", "exports", "../uv-shared-module/BaseView", "../../extensions/uv-seadragon-extension/Commands"], function (require, exports, BaseView_1, Commands_1) {
    "use strict";
    var TreeView = (function (_super) {
        __extends(TreeView, _super);
        function TreeView($element) {
            var _this = _super.call(this, $element, true, true) || this;
            _this.isOpen = false;
            return _this;
        }
        TreeView.prototype.create = function () {
            this.setConfig('contentLeftPanel');
            _super.prototype.create.call(this);
            this.$tree = $('<div class="iiif-tree-component"></div>');
            this.$element.append(this.$tree);
        };
        TreeView.prototype.setup = function () {
            var that = this;
            this.component = new IIIFComponents.TreeComponent({
                target: this.$tree[0],
                data: this.treeData
            });
            // todo: casting as <any> is necessary because IBaseComponent doesn't implement ITinyEmitter
            // it is mixed-in a runtime. figure out how to add .on etc to IBaseComponent without needing
            // to implement it in BaseComponent.
            this.component.on('treeNodeSelected', function (args) {
                var node = args[0];
                $.publish(Commands_1.Commands.TREE_NODE_SELECTED, [node]);
            });
            this.component.on('treeNodeMultiSelected', function (args) {
                var node = args[0];
                $.publish(Commands_1.Commands.TREE_NODE_MULTISELECTED, [node]);
            });
        };
        TreeView.prototype.databind = function () {
            this.component.options.data = this.treeData;
            this.component.set(null); // todo: should be passing options.data
            this.resize();
        };
        TreeView.prototype.show = function () {
            this.isOpen = true;
            this.$element.show();
        };
        TreeView.prototype.hide = function () {
            this.isOpen = false;
            this.$element.hide();
        };
        TreeView.prototype.selectNode = function (node) {
            this.component.selectNode(node);
        };
        TreeView.prototype.deselectCurrentNode = function () {
            this.component.deselectCurrentNode();
        };
        TreeView.prototype.getNodeById = function (id) {
            return this.component.getNodeById(id);
        };
        TreeView.prototype.resize = function () {
            _super.prototype.resize.call(this);
        };
        return TreeView;
    }(BaseView_1.BaseView));
    exports.TreeView = TreeView;
});
//# sourceMappingURL=TreeView.js.map;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define('modules/uv-contentleftpanel-module/ContentLeftPanel',["require", "exports", "../uv-shared-module/BaseCommands", "../../extensions/uv-seadragon-extension/Commands", "./GalleryView", "../uv-shared-module/LeftPanel", "../uv-shared-module/Metrics", "../../extensions/uv-seadragon-extension/Mode", "./ThumbsView", "./TreeView"], function (require, exports, BaseCommands_1, Commands_1, GalleryView_1, LeftPanel_1, Metrics_1, Mode_1, ThumbsView_1, TreeView_1) {
    "use strict";
    var ContentLeftPanel = (function (_super) {
        __extends(ContentLeftPanel, _super);
        function ContentLeftPanel($element) {
            var _this = _super.call(this, $element) || this;
            _this.expandFullEnabled = false;
            _this.isThumbsViewOpen = false;
            _this.isTreeViewOpen = false;
            _this.treeSortType = Manifold.TreeSortType.NONE;
            return _this;
        }
        ContentLeftPanel.prototype.create = function () {
            var _this = this;
            this.setConfig('contentLeftPanel');
            _super.prototype.create.call(this);
            var that = this;
            $.subscribe(BaseCommands_1.BaseCommands.SETTINGS_CHANGED, function () {
                _this.databind();
            });
            $.subscribe(Commands_1.Commands.GALLERY_THUMB_SELECTED, function () {
                _this.collapseFull();
            });
            $.subscribe(BaseCommands_1.BaseCommands.METRIC_CHANGED, function () {
                if (_this.extension.metric === Metrics_1.Metrics.MOBILE_LANDSCAPE) {
                    if (_this.isFullyExpanded) {
                        _this.collapseFull();
                    }
                }
            });
            $.subscribe(Commands_1.Commands.SEARCH_RESULTS, function () {
                _this.databindThumbsView();
                _this.databindGalleryView();
            });
            $.subscribe(Commands_1.Commands.SEARCH_RESULTS_CLEARED, function () {
                _this.databindThumbsView();
                _this.databindGalleryView();
            });
            $.subscribe(Commands_1.Commands.SEARCH_RESULTS_EMPTY, function () {
                _this.databindThumbsView();
                _this.databindGalleryView();
            });
            $.subscribe(BaseCommands_1.BaseCommands.CANVAS_INDEX_CHANGED, function (e, index) {
                if (_this.isFullyExpanded) {
                    _this.collapseFull();
                }
                _this.selectCurrentTreeNode();
                _this.updateTreeTabBySelection();
            });
            this.$tabs = $('<div class="tabs"></div>');
            this.$main.append(this.$tabs);
            this.$treeButton = $('<a class="index tab" tabindex="0">' + this.content.index + '</a>');
            this.$tabs.append(this.$treeButton);
            this.$thumbsButton = $('<a class="thumbs tab" tabindex="0">' + this.content.thumbnails + '</a>');
            this.$thumbsButton.prop('title', this.content.thumbnails);
            this.$tabs.append(this.$thumbsButton);
            this.$tabsContent = $('<div class="tabsContent"></div>');
            this.$main.append(this.$tabsContent);
            this.$options = $('<div class="options"></div>');
            this.$tabsContent.append(this.$options);
            this.$topOptions = $('<div class="top"></div>');
            this.$options.append(this.$topOptions);
            this.$treeSelect = $('<select></select>');
            this.$topOptions.append(this.$treeSelect);
            this.$bottomOptions = $('<div class="bottom"></div>');
            this.$options.append(this.$bottomOptions);
            this.$leftOptions = $('<div class="left"></div>');
            this.$bottomOptions.append(this.$leftOptions);
            this.$rightOptions = $('<div class="right"></div>');
            this.$bottomOptions.append(this.$rightOptions);
            this.$treeViewOptions = $('<div class="treeView"></div>');
            this.$leftOptions.append(this.$treeViewOptions);
            this.$sortByLabel = $('<span class="sort">' + this.content.sortBy + '</span>');
            this.$treeViewOptions.append(this.$sortByLabel);
            this.$sortButtonGroup = $('<div class="btn-group"></div>');
            this.$treeViewOptions.append(this.$sortButtonGroup);
            this.$sortByDateButton = $('<button class="btn tabindex="0"">' + this.content.date + '</button>');
            this.$sortButtonGroup.append(this.$sortByDateButton);
            this.$sortByVolumeButton = $('<button class="btn" tabindex="0">' + this.content.volume + '</button>');
            this.$sortButtonGroup.append(this.$sortByVolumeButton);
            this.$views = $('<div class="views"></div>');
            this.$tabsContent.append(this.$views);
            this.$treeView = $('<div class="treeView"></div>');
            this.$views.append(this.$treeView);
            this.$thumbsView = $('<div class="thumbsView" tabindex="0"></div>');
            this.$views.append(this.$thumbsView);
            this.$galleryView = $('<div class="galleryView"></div>');
            this.$views.append(this.$galleryView);
            this.$treeSelect.hide();
            this.$treeSelect.change(function () {
                _this.databindTreeView();
                _this.selectCurrentTreeNode();
                _this.updateTreeTabBySelection();
            });
            this.$sortByDateButton.on('click', function () {
                _this.sortByDate();
            });
            this.$sortByVolumeButton.on('click', function () {
                _this.sortByVolume();
            });
            this.$treeViewOptions.hide();
            this.$treeButton.onPressed(function () {
                _this.openTreeView();
                $.publish(Commands_1.Commands.OPEN_TREE_VIEW);
            });
            this.$thumbsButton.onPressed(function () {
                _this.openThumbsView();
                $.publish(Commands_1.Commands.OPEN_THUMBS_VIEW);
            });
            this.setTitle(this.content.title);
            this.$sortByVolumeButton.addClass('on');
            var tabOrderConfig = this.options.tabOrder;
            if (tabOrderConfig) {
                // sort tabs
                tabOrderConfig = tabOrderConfig.toLowerCase();
                tabOrderConfig = tabOrderConfig.replace(/ /g, "");
                var tabOrder = tabOrderConfig.split(',');
                if (tabOrder[0] === 'thumbs') {
                    this.$treeButton.before(this.$thumbsButton);
                    this.$thumbsButton.addClass('first');
                }
                else {
                    this.$treeButton.addClass('first');
                }
            }
        };
        ContentLeftPanel.prototype.createTreeView = function () {
            this.treeView = new TreeView_1.TreeView(this.$treeView);
            this.treeView.treeData = this.getTreeData();
            this.treeView.setup();
            this.databindTreeView();
            // populate the tree select drop down when there are multiple top-level ranges
            var topRanges = this.extension.helper.getTopRanges();
            if (topRanges.length > 1) {
                for (var i = 0; i < topRanges.length; i++) {
                    var range = topRanges[i];
                    this.$treeSelect.append('<option value="' + range.id + '">' + Manifesto.TranslationCollection.getValue(range.getLabel()) + '</option>');
                }
            }
            this.updateTreeViewOptions();
        };
        ContentLeftPanel.prototype.databind = function () {
            this.databindThumbsView();
            this.databindTreeView();
            this.databindGalleryView();
        };
        ContentLeftPanel.prototype.updateTreeViewOptions = function () {
            var treeData = this.getTree();
            if (this.isCollection() && this.extension.helper.treeHasNavDates(treeData)) {
                this.$treeViewOptions.show();
            }
            else {
                this.$treeViewOptions.hide();
            }
            if (this.$treeSelect.find('option').length) {
                this.$treeSelect.show();
            }
            else {
                this.$treeSelect.hide();
            }
        };
        ContentLeftPanel.prototype.sortByDate = function () {
            this.treeSortType = Manifold.TreeSortType.DATE;
            this.treeView.treeData = this.getTreeData();
            this.treeView.databind();
            this.selectCurrentTreeNode();
            this.$sortByDateButton.addClass('on');
            this.$sortByVolumeButton.removeClass('on');
            this.resize();
        };
        ContentLeftPanel.prototype.sortByVolume = function () {
            this.treeSortType = Manifold.TreeSortType.NONE;
            this.treeView.treeData = this.getTreeData();
            this.treeView.databind();
            this.selectCurrentTreeNode();
            this.$sortByDateButton.removeClass('on');
            this.$sortByVolumeButton.addClass('on');
            this.resize();
        };
        ContentLeftPanel.prototype.isCollection = function () {
            var treeData = this.getTree();
            return treeData.data.type === manifesto.TreeNodeType.collection().toString();
        };
        ContentLeftPanel.prototype.databindTreeView = function () {
            if (!this.treeView)
                return;
            this.treeView.treeData = this.getTreeData();
            this.treeView.databind();
            this.selectCurrentTreeNode();
        };
        ContentLeftPanel.prototype.getTreeData = function () {
            return {
                branchNodesSelectable: false,
                helper: this.extension.helper,
                topRangeIndex: this.getSelectedTopRangeIndex(),
                treeSortType: this.treeSortType
            };
        };
        ContentLeftPanel.prototype.updateTreeTabByCanvasIndex = function () {
            // update tab to current top range label (if there is one)
            var topRanges = this.extension.helper.getTopRanges();
            if (topRanges.length > 1) {
                var index = this.getCurrentCanvasTopRangeIndex();
                var currentRange = topRanges[index];
                this.setTreeTabTitle(Manifesto.TranslationCollection.getValue(currentRange.getLabel()));
            }
            else {
                this.setTreeTabTitle(this.content.index);
            }
        };
        ContentLeftPanel.prototype.setTreeTabTitle = function (title) {
            this.$treeButton.text(title);
            this.$treeButton.prop('title', title);
        };
        ContentLeftPanel.prototype.updateTreeTabBySelection = function () {
            var title;
            var topRanges = this.extension.helper.getTopRanges();
            if (topRanges.length > 1) {
                if (this.treeView) {
                    title = this.getSelectedTree().text();
                }
                else {
                    title = Manifesto.TranslationCollection.getValue(topRanges[0].getLabel());
                }
            }
            if (title) {
                this.setTreeTabTitle(title);
            }
            else {
                this.setTreeTabTitle(this.content.index);
            }
        };
        ContentLeftPanel.prototype.getViewingDirection = function () {
            return this.extension.helper.getViewingDirection();
        };
        ContentLeftPanel.prototype.createThumbsView = function () {
            this.thumbsView = new ThumbsView_1.ThumbsView(this.$thumbsView);
            this.databindThumbsView();
        };
        ContentLeftPanel.prototype.databindThumbsView = function () {
            if (!this.thumbsView)
                return;
            var width, height;
            var viewingDirection = this.getViewingDirection().toString();
            if (viewingDirection === manifesto.ViewingDirection.topToBottom().toString() || viewingDirection === manifesto.ViewingDirection.bottomToTop().toString()) {
                width = this.config.options.oneColThumbWidth;
                height = this.config.options.oneColThumbHeight;
            }
            else {
                width = this.config.options.twoColThumbWidth;
                height = this.config.options.twoColThumbHeight;
            }
            var thumbs = this.extension.helper.getThumbs(width, height);
            if (viewingDirection === manifesto.ViewingDirection.bottomToTop().toString()) {
                thumbs.reverse();
            }
            // add a search result icon for pages with results
            var searchResults = this.extension.searchResults;
            if (searchResults && searchResults.length) {
                for (var i = 0; i < searchResults.length; i++) {
                    var searchResult = searchResults[i];
                    // find the thumb with the same canvasIndex and add the searchResult
                    var thumb = thumbs.en().where(function (t) { return t.index === searchResult.canvasIndex; }).first();
                    // clone the data so searchResults isn't persisted on the canvas.
                    var data = $.extend(true, {}, thumb.data);
                    data.searchResults = searchResult.rects.length;
                    thumb.data = data;
                }
            }
            this.thumbsView.thumbs = thumbs;
            this.thumbsView.databind();
        };
        ContentLeftPanel.prototype.createGalleryView = function () {
            this.galleryView = new GalleryView_1.GalleryView(this.$galleryView);
            this.galleryView.galleryData = this.getGalleryData();
            this.galleryView.setup();
            this.databindGalleryView();
        };
        ContentLeftPanel.prototype.databindGalleryView = function () {
            if (!this.galleryView)
                return;
            this.galleryView.galleryData = this.getGalleryData();
            this.galleryView.databind();
        };
        ContentLeftPanel.prototype.getGalleryData = function () {
            return {
                helper: this.extension.helper,
                chunkedResizingThreshold: this.config.options.galleryThumbChunkedResizingThreshold,
                content: this.config.content,
                debug: false,
                imageFadeInDuration: 300,
                initialZoom: 6,
                minLabelWidth: 20,
                pageModeEnabled: this.isPageModeEnabled(),
                scrollStopDuration: 100,
                searchResults: this.extension.searchResults,
                sizingEnabled: Modernizr.inputtypes.range,
                thumbHeight: this.config.options.galleryThumbHeight,
                thumbLoadPadding: this.config.options.galleryThumbLoadPadding,
                thumbWidth: this.config.options.galleryThumbWidth,
                viewingDirection: this.getViewingDirection()
            };
        };
        ContentLeftPanel.prototype.isPageModeEnabled = function () {
            // todo: checks if the panel is being used in the openseadragon extension.
            // pass a `isPageModeEnabled` function to the panel's constructor instead?
            if (typeof this.extension.getMode === "function") {
                return Utils.Bools.getBool(this.config.options.pageModeEnabled, true) && this.extension.getMode().toString() === Mode_1.Mode.page.toString();
            }
            return Utils.Bools.getBool(this.config.options.pageModeEnabled, true);
        };
        ContentLeftPanel.prototype.getSelectedTree = function () {
            return this.$treeSelect.find(':selected');
        };
        ContentLeftPanel.prototype.getSelectedTopRangeIndex = function () {
            var topRangeIndex = this.getSelectedTree().index();
            if (topRangeIndex === -1) {
                topRangeIndex = 0;
            }
            return topRangeIndex;
        };
        ContentLeftPanel.prototype.getTree = function () {
            var topRangeIndex = this.getSelectedTopRangeIndex();
            return this.extension.helper.getTree(topRangeIndex, Manifold.TreeSortType.NONE);
        };
        ContentLeftPanel.prototype.toggleFinish = function () {
            _super.prototype.toggleFinish.call(this);
            if (this.isUnopened) {
                var treeEnabled = Utils.Bools.getBool(this.config.options.treeEnabled, true);
                var thumbsEnabled = Utils.Bools.getBool(this.config.options.thumbsEnabled, true);
                var treeData = this.getTree();
                if (!treeData || !treeData.nodes.length) {
                    treeEnabled = false;
                }
                // hide the tabs if either tree or thumbs are disabled
                if (!treeEnabled || !thumbsEnabled)
                    this.$tabs.hide();
                if (thumbsEnabled && this.defaultToThumbsView()) {
                    this.openThumbsView();
                }
                else if (treeEnabled) {
                    this.openTreeView();
                }
            }
        };
        ContentLeftPanel.prototype.defaultToThumbsView = function () {
            var defaultToTreeEnabled = Utils.Bools.getBool(this.config.options.defaultToTreeEnabled, false);
            var defaultToTreeIfGreaterThan = this.config.options.defaultToTreeIfGreaterThan || 0;
            var treeData = this.getTree();
            if (defaultToTreeEnabled) {
                if (treeData.nodes.length > defaultToTreeIfGreaterThan) {
                    return false;
                }
            }
            return true;
        };
        ContentLeftPanel.prototype.expandFullStart = function () {
            _super.prototype.expandFullStart.call(this);
            $.publish(BaseCommands_1.BaseCommands.LEFTPANEL_EXPAND_FULL_START);
        };
        ContentLeftPanel.prototype.expandFullFinish = function () {
            _super.prototype.expandFullFinish.call(this);
            if (this.$treeButton.hasClass('on')) {
                this.openTreeView();
            }
            else if (this.$thumbsButton.hasClass('on')) {
                this.openThumbsView();
            }
            $.publish(BaseCommands_1.BaseCommands.LEFTPANEL_EXPAND_FULL_FINISH);
        };
        ContentLeftPanel.prototype.collapseFullStart = function () {
            _super.prototype.collapseFullStart.call(this);
            $.publish(BaseCommands_1.BaseCommands.LEFTPANEL_COLLAPSE_FULL_START);
        };
        ContentLeftPanel.prototype.collapseFullFinish = function () {
            _super.prototype.collapseFullFinish.call(this);
            // todo: write a more generic tabs system with base tab class.
            // thumbsView may not necessarily have been created yet.
            // replace thumbsView with galleryView.
            if (this.$thumbsButton.hasClass('on')) {
                this.openThumbsView();
            }
            $.publish(BaseCommands_1.BaseCommands.LEFTPANEL_COLLAPSE_FULL_FINISH);
        };
        ContentLeftPanel.prototype.openTreeView = function () {
            this.isTreeViewOpen = true;
            this.isThumbsViewOpen = false;
            if (!this.treeView) {
                this.createTreeView();
            }
            this.$treeButton.addClass('on');
            this.$thumbsButton.removeClass('on');
            this.treeView.show();
            if (this.thumbsView)
                this.thumbsView.hide();
            if (this.galleryView)
                this.galleryView.hide();
            this.updateTreeViewOptions();
            this.selectCurrentTreeNode();
            this.resize();
            this.treeView.resize();
        };
        ContentLeftPanel.prototype.openThumbsView = function () {
            this.isTreeViewOpen = false;
            this.isThumbsViewOpen = true;
            if (!this.thumbsView) {
                this.createThumbsView();
            }
            if (this.isFullyExpanded && !this.galleryView) {
                this.createGalleryView();
            }
            this.$treeButton.removeClass('on');
            this.$thumbsButton.addClass('on');
            if (this.treeView)
                this.treeView.hide();
            this.$treeSelect.hide();
            this.$treeViewOptions.hide();
            this.resize();
            if (this.isFullyExpanded) {
                this.thumbsView.hide();
                if (this.galleryView)
                    this.galleryView.show();
                if (this.galleryView)
                    this.galleryView.resize();
            }
            else {
                if (this.galleryView)
                    this.galleryView.hide();
                this.thumbsView.show();
                this.thumbsView.resize();
            }
        };
        ContentLeftPanel.prototype.selectTopRangeIndex = function (index) {
            this.$treeSelect.prop('selectedIndex', index);
        };
        ContentLeftPanel.prototype.getCurrentCanvasTopRangeIndex = function () {
            var topRangeIndex = -1;
            var range = this.extension.getCurrentCanvasRange();
            if (range) {
                topRangeIndex = Number(range.path.split('/')[0]);
            }
            return topRangeIndex;
        };
        ContentLeftPanel.prototype.selectCurrentTreeNode = function () {
            if (this.treeView) {
                var id;
                var node;
                var currentCanvasTopRangeIndex = this.getCurrentCanvasTopRangeIndex();
                var selectedTopRangeIndex = this.getSelectedTopRangeIndex();
                var usingCorrectTree = currentCanvasTopRangeIndex === selectedTopRangeIndex;
                if (currentCanvasTopRangeIndex != -1) {
                    var range = this.extension.getCurrentCanvasRange();
                    if (range && range.treeNode) {
                        node = this.treeView.getNodeById(range.treeNode.id);
                    }
                }
                // use manifest root node
                // if (!node){
                //     id = this.extension.helper.manifest.defaultTree.id;
                //     node = this.treeView.getNodeById(id);
                // }
                if (node && usingCorrectTree) {
                    this.treeView.selectNode(node);
                }
                else {
                    this.treeView.deselectCurrentNode();
                }
            }
        };
        ContentLeftPanel.prototype.resize = function () {
            _super.prototype.resize.call(this);
            this.$tabsContent.height(this.$main.height() - (this.$tabs.is(':visible') ? this.$tabs.height() : 0) - this.$tabsContent.verticalPadding());
            this.$views.height(this.$tabsContent.height() - this.$options.outerHeight());
        };
        return ContentLeftPanel;
    }(LeftPanel_1.LeftPanel));
    exports.ContentLeftPanel = ContentLeftPanel;
});
//# sourceMappingURL=ContentLeftPanel.js.map;
define('modules/uv-shared-module/Point',["require", "exports"], function (require, exports) {
    "use strict";
    var Point = (function () {
        function Point(x, y) {
            this.x = x;
            this.y = y;
        }
        return Point;
    }());
    exports.Point = Point;
});
//# sourceMappingURL=Point.js.map;
define('extensions/uv-seadragon-extension/CroppedImageDimensions',["require", "exports", "../../modules/uv-shared-module/Point"], function (require, exports, Point_1) {
    "use strict";
    var Size = Utils.Measurements.Size;
    var CroppedImageDimensions = (function () {
        function CroppedImageDimensions() {
            this.region = new Size(0, 0);
            this.regionPos = new Point_1.Point(0, 0);
            this.size = new Size(0, 0);
        }
        return CroppedImageDimensions;
    }());
    exports.CroppedImageDimensions = CroppedImageDimensions;
});
//# sourceMappingURL=CroppedImageDimensions.js.map;
define('modules/uv-shared-module/DownloadOption',["require", "exports"], function (require, exports) {
    "use strict";
    var DownloadOption = (function () {
        function DownloadOption(value) {
            this.value = value;
        }
        DownloadOption.prototype.toString = function () {
            return this.value;
        };
        return DownloadOption;
    }());
    DownloadOption.currentViewAsJpg = new DownloadOption("currentViewAsJpg");
    DownloadOption.dynamicCanvasRenderings = new DownloadOption("dynamicCanvasRenderings");
    DownloadOption.dynamicImageRenderings = new DownloadOption("dynamicImageRenderings");
    DownloadOption.dynamicSequenceRenderings = new DownloadOption("dynamicSequenceRenderings");
    DownloadOption.entireFileAsOriginal = new DownloadOption("entireFileAsOriginal");
    DownloadOption.selection = new DownloadOption("selection");
    DownloadOption.wholeImageHighRes = new DownloadOption("wholeImageHighRes");
    DownloadOption.wholeImagesHighRes = new DownloadOption("wholeImagesHighRes");
    DownloadOption.wholeImageLowResAsJpg = new DownloadOption("wholeImageLowResAsJpg");
    exports.DownloadOption = DownloadOption;
});
//# sourceMappingURL=DownloadOption.js.map;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define('modules/uv-dialogues-module/DownloadDialogue',["require", "exports", "../uv-shared-module/BaseCommands", "../uv-shared-module/Dialogue", "../uv-shared-module/DownloadOption"], function (require, exports, BaseCommands_1, Dialogue_1, DownloadOption_1) {
    "use strict";
    var DownloadDialogue = (function (_super) {
        __extends(DownloadDialogue, _super);
        function DownloadDialogue($element) {
            return _super.call(this, $element) || this;
        }
        DownloadDialogue.prototype.create = function () {
            var _this = this;
            this.setConfig('downloadDialogue');
            _super.prototype.create.call(this);
            this.openCommand = BaseCommands_1.BaseCommands.SHOW_DOWNLOAD_DIALOGUE;
            this.closeCommand = BaseCommands_1.BaseCommands.HIDE_DOWNLOAD_DIALOGUE;
            $.subscribe(this.openCommand, function (e, $triggerButton) {
                _this.open($triggerButton);
            });
            $.subscribe(this.closeCommand, function (e) {
                _this.close();
            });
            // create ui.
            this.$title = $('<h1>' + this.content.title + '</h1>');
            this.$content.append(this.$title);
            this.$noneAvailable = $('<div class="noneAvailable">' + this.content.noneAvailable + '</div>');
            this.$content.append(this.$noneAvailable);
            this.$downloadOptions = $('<ol class="options"></ol>');
            this.$content.append(this.$downloadOptions);
            this.$footer = $('<div class="footer"></div>');
            this.$content.append(this.$footer);
            this.$termsOfUseButton = $('<a href="#">' + this.extension.config.content.termsOfUse + '</a>');
            this.$footer.append(this.$termsOfUseButton);
            this.$termsOfUseButton.onPressed(function () {
                $.publish(BaseCommands_1.BaseCommands.SHOW_TERMS_OF_USE);
            });
            // hide
            this.$element.hide();
            this.updateTermsOfUseButton();
        };
        DownloadDialogue.prototype.addEntireFileDownloadOptions = function () {
            var _this = this;
            if (this.isDownloadOptionAvailable(DownloadOption_1.DownloadOption.entireFileAsOriginal)) {
                this.$downloadOptions.empty();
                // add each file src
                var canvas = this.extension.helper.getCurrentCanvas();
                var renderingFound = false;
                $.each(canvas.getRenderings(), function (index, rendering) {
                    var renderingFormat = rendering.getFormat();
                    var format = '';
                    if (renderingFormat) {
                        format = renderingFormat.toString();
                    }
                    _this.addEntireFileDownloadOption(rendering.id, Manifesto.TranslationCollection.getValue(rendering.getLabel()), format);
                    renderingFound = true;
                });
                if (!renderingFound) {
                    this.addEntireFileDownloadOption(canvas.id, null, null);
                }
            }
        };
        DownloadDialogue.prototype.addEntireFileDownloadOption = function (uri, label, format) {
            if (label) {
                label += " ({0})";
            }
            else {
                label = this.content.entireFileAsOriginal;
            }
            var fileType;
            if (format) {
                fileType = Utils.Files.simplifyMimeType(format);
            }
            else {
                fileType = this.getFileExtension(uri);
            }
            this.$downloadOptions.append('<li><a href="' + uri + '" target="_blank" download tabindex="0">' + String.format(label, fileType) + '</li>');
        };
        DownloadDialogue.prototype.updateNoneAvailable = function () {
            if (!this.$downloadOptions.find('li:visible').length) {
                this.$noneAvailable.show();
            }
            else {
                // select first option.
                this.$noneAvailable.hide();
            }
        };
        DownloadDialogue.prototype.updateTermsOfUseButton = function () {
            var attribution = this.extension.helper.getAttribution(); // todo: this should eventually use a suitable IIIF 'terms' field.
            if (Utils.Bools.getBool(this.extension.config.options.termsOfUseEnabled, false) && attribution) {
                this.$termsOfUseButton.show();
            }
            else {
                this.$termsOfUseButton.hide();
            }
        };
        DownloadDialogue.prototype.getFileExtension = function (fileUri) {
            return fileUri.split('.').pop();
        };
        DownloadDialogue.prototype.isDownloadOptionAvailable = function (option) {
            switch (option) {
                case DownloadOption_1.DownloadOption.entireFileAsOriginal:
                    // check if ui-extensions disable it
                    var uiExtensions = this.extension.helper.manifest.getService(manifesto.ServiceProfile.uiExtensions());
                    if (!this.extension.helper.isUIEnabled('mediaDownload')) {
                        return false;
                    }
            }
            return true;
        };
        DownloadDialogue.prototype.close = function () {
            _super.prototype.close.call(this);
        };
        DownloadDialogue.prototype.resize = function () {
            this.setDockedPosition();
        };
        return DownloadDialogue;
    }(Dialogue_1.Dialogue));
    exports.DownloadDialogue = DownloadDialogue;
});
//# sourceMappingURL=DownloadDialogue.js.map;
define('extensions/uv-seadragon-extension/DownloadType',["require", "exports"], function (require, exports) {
    "use strict";
    var DownloadType = (function () {
        function DownloadType() {
        }
        return DownloadType;
    }());
    DownloadType.CURRENTVIEW = "currentView";
    DownloadType.ENTIREDOCUMENTASPDF = "entireDocumentAsPdf";
    DownloadType.ENTIREDOCUMENTASTEXT = "entireDocumentAsText";
    DownloadType.WHOLEIMAGEHIGHRES = "wholeImageHighRes";
    DownloadType.WHOLEIMAGESHIGHRES = "wholeImageHighRes";
    DownloadType.WHOLEIMAGELOWRES = "wholeImageLowRes";
    DownloadType.UNKNOWN = "unknown";
    exports.DownloadType = DownloadType;
});
//# sourceMappingURL=DownloadType.js.map;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define('extensions/uv-seadragon-extension/DownloadDialogue',["require", "exports", "../../modules/uv-shared-module/BaseCommands", "../../modules/uv-dialogues-module/DownloadDialogue", "./Commands", "../../modules/uv-shared-module/DownloadOption", "./DownloadType"], function (require, exports, BaseCommands_1, DownloadDialogue_1, Commands_1, DownloadOption_1, DownloadType_1) {
    "use strict";
    var Size = Utils.Measurements.Size;
    var DownloadDialogue = (function (_super) {
        __extends(DownloadDialogue, _super);
        function DownloadDialogue($element) {
            return _super.call(this, $element) || this;
        }
        DownloadDialogue.prototype.create = function () {
            var _this = this;
            this.setConfig('downloadDialogue');
            _super.prototype.create.call(this);
            // create ui.
            // this.$settingsButton = $('<a class="settings" href="#">' + this.content.editSettings + '</a>');
            // this.$pagingNote = $('<div class="pagingNote">' + this.content.pagingNote + ' </div>');
            // this.$pagingNote.append(this.$settingsButton);
            // this.$content.append(this.$pagingNote);
            this.$imageOptionsContainer = $('<li class="group image"></li>');
            this.$downloadOptions.append(this.$imageOptionsContainer);
            this.$imageOptions = $('<ul></ul>');
            this.$imageOptionsContainer.append(this.$imageOptions);
            this.$currentViewAsJpgButton = $('<li class="option single"><input id="' + DownloadOption_1.DownloadOption.currentViewAsJpg.toString() + '" type="radio" name="downloadOptions" tabindex="0" /><label for="' + DownloadOption_1.DownloadOption.currentViewAsJpg.toString() + '"></label></li>');
            this.$imageOptions.append(this.$currentViewAsJpgButton);
            this.$currentViewAsJpgButton.hide();
            this.$wholeImageHighResButton = $('<li class="option single"><input id="' + DownloadOption_1.DownloadOption.wholeImageHighRes.toString() + '" type="radio" name="downloadOptions" tabindex="0" /><label id="' + DownloadOption_1.DownloadOption.wholeImageHighRes.toString() + 'label" for="' + DownloadOption_1.DownloadOption.wholeImageHighRes.toString() + '"></label></li>');
            this.$imageOptions.append(this.$wholeImageHighResButton);
            this.$wholeImageHighResButton.hide();
            this.$wholeImagesHighResButton = $('<li class="option multiple"><input id="' + DownloadOption_1.DownloadOption.wholeImagesHighRes.toString() + '" type="radio" name="downloadOptions" tabindex="0" /><label id="' + DownloadOption_1.DownloadOption.wholeImagesHighRes.toString() + 'label" for="' + DownloadOption_1.DownloadOption.wholeImagesHighRes.toString() + '"></label></li>');
            this.$imageOptions.append(this.$wholeImagesHighResButton);
            this.$wholeImageHighResButton.hide();
            this.$wholeImageLowResAsJpgButton = $('<li class="option single"><input id="' + DownloadOption_1.DownloadOption.wholeImageLowResAsJpg.toString() + '" type="radio" name="downloadOptions" tabindex="0" /><label for="' + DownloadOption_1.DownloadOption.wholeImageLowResAsJpg.toString() + '">' + this.content.wholeImageLowResAsJpg + '</label></li>');
            this.$imageOptions.append(this.$wholeImageLowResAsJpgButton);
            this.$wholeImageLowResAsJpgButton.hide();
            this.$canvasOptionsContainer = $('<li class="group canvas"></li>');
            this.$downloadOptions.append(this.$canvasOptionsContainer);
            this.$canvasOptions = $('<ul></ul>');
            this.$canvasOptionsContainer.append(this.$canvasOptions);
            this.$sequenceOptionsContainer = $('<li class="group sequence"></li>');
            this.$downloadOptions.append(this.$sequenceOptionsContainer);
            this.$sequenceOptions = $('<ul></ul>');
            this.$sequenceOptionsContainer.append(this.$sequenceOptions);
            this.$selectionButton = $('<li class="option"><input id="' + DownloadOption_1.DownloadOption.selection.toString() + '" type="radio" name="downloadOptions" tabindex="0" /><label id="' + DownloadOption_1.DownloadOption.selection.toString() + 'label" for="' + DownloadOption_1.DownloadOption.selection.toString() + '"></label></li>');
            this.$sequenceOptions.append(this.$selectionButton);
            this.$selectionButton.hide();
            this.$buttonsContainer = $('<div class="buttons"></div>');
            this.$content.append(this.$buttonsContainer);
            this.$downloadButton = $('<a class="btn btn-primary" href="#" tabindex="0">' + this.content.download + '</a>');
            this.$buttonsContainer.append(this.$downloadButton);
            this.$explanatoryTextTemplate = $('<span class="explanatory"></span>');
            var that = this;
            this.$downloadButton.on('click', function (e) {
                e.preventDefault();
                var $selectedOption = that.getSelectedOption();
                var id = $selectedOption.attr('id');
                var label = $selectedOption.attr('title');
                var mime = $selectedOption.data('mime');
                var type = DownloadType_1.DownloadType.UNKNOWN;
                var canvas = _this.extension.helper.getCurrentCanvas();
                if (_this.renderingUrls[id]) {
                    if (mime) {
                        if (mime.toLowerCase().indexOf('pdf') !== -1) {
                            type = DownloadType_1.DownloadType.ENTIREDOCUMENTASPDF;
                        }
                        else if (mime.toLowerCase().indexOf('txt') !== -1) {
                            type = DownloadType_1.DownloadType.ENTIREDOCUMENTASTEXT;
                        }
                    }
                    if (type = DownloadType_1.DownloadType.ENTIREDOCUMENTASPDF) {
                        //var printService: Manifesto.IService = this.extension.helper.manifest.getService(manifesto.ServiceProfile.printExtensions());
                        // if downloading a pdf - if there's a print service, generate an event instead of opening a new window.
                        // if (printService && this.extension.isOnHomeDomain()){
                        //     $.publish(Commands.PRINT);
                        // } else {
                        window.open(_this.renderingUrls[id]);
                    }
                }
                else {
                    switch (id) {
                        case DownloadOption_1.DownloadOption.currentViewAsJpg.toString():
                            var viewer = that.extension.getViewer();
                            window.open(that.extension.getCroppedImageUri(canvas, viewer));
                            type = DownloadType_1.DownloadType.CURRENTVIEW;
                            break;
                        case DownloadOption_1.DownloadOption.selection.toString():
                            Utils.Async.waitFor(function () {
                                return !_this.isActive;
                            }, function () {
                                $.publish(Commands_1.Commands.SHOW_MULTISELECT_DIALOGUE);
                            });
                            break;
                        case DownloadOption_1.DownloadOption.wholeImageHighRes.toString():
                            window.open(_this.getCanvasHighResImageUri(_this.extension.helper.getCurrentCanvas()));
                            type = DownloadType_1.DownloadType.WHOLEIMAGEHIGHRES;
                            break;
                        case DownloadOption_1.DownloadOption.wholeImagesHighRes.toString():
                            var indices = _this.extension.getPagedIndices();
                            for (var i = 0; i < indices.length; i++) {
                                window.open(_this.getCanvasHighResImageUri(_this.extension.helper.getCanvasByIndex(indices[i])));
                            }
                            type = DownloadType_1.DownloadType.WHOLEIMAGESHIGHRES;
                            break;
                        case DownloadOption_1.DownloadOption.wholeImageLowResAsJpg.toString():
                            window.open(that.extension.getConfinedImageUri(canvas, that.options.confinedImageSize));
                            type = DownloadType_1.DownloadType.WHOLEIMAGELOWRES;
                            break;
                    }
                }
                $.publish(BaseCommands_1.BaseCommands.DOWNLOAD, [{
                        "type": type,
                        "label": label
                    }]);
                _this.close();
            });
            // this.$settingsButton.onPressed(() => {
            //     $.publish(BaseCommands.HIDE_DOWNLOAD_DIALOGUE);
            //     $.publish(BaseCommands.SHOW_SETTINGS_DIALOGUE);
            // });
        };
        DownloadDialogue.prototype.open = function ($triggerButton) {
            _super.prototype.open.call(this, $triggerButton);
            var canvas = this.extension.helper.getCurrentCanvas();
            var rotation = this.extension.getViewerRotation();
            var hasNormalDimensions = rotation % 180 == 0;
            if (this.isDownloadOptionAvailable(DownloadOption_1.DownloadOption.currentViewAsJpg)) {
                var $input = this.$currentViewAsJpgButton.find('input');
                var $label = this.$currentViewAsJpgButton.find('label');
                var label = this.content.currentViewAsJpg;
                var viewer = this.extension.getViewer();
                var dimensions = this.extension.getCroppedImageDimensions(canvas, viewer);
                // dimensions
                if (dimensions) {
                    label = hasNormalDimensions ?
                        String.format(label, dimensions.size.width, dimensions.size.height) :
                        String.format(label, dimensions.size.height, dimensions.size.width);
                    $label.text(label);
                    $input.prop('title', label);
                    this.$currentViewAsJpgButton.data('width', dimensions.size.width);
                    this.$currentViewAsJpgButton.data('height', dimensions.size.height);
                    this.$currentViewAsJpgButton.show();
                }
                else {
                    this.$currentViewAsJpgButton.hide();
                }
                // explanatory text
                if (Utils.Bools.getBool(this.options.optionsExplanatoryTextEnabled, false)) {
                    var text = this.content.currentViewAsJpgExplanation;
                    if (text) {
                        var $span = this.$explanatoryTextTemplate.clone();
                        $span.text(text);
                        $label.append($span);
                    }
                }
            }
            else {
                this.$currentViewAsJpgButton.hide();
            }
            if (this.isDownloadOptionAvailable(DownloadOption_1.DownloadOption.wholeImageHighRes)) {
                var $input = this.$wholeImageHighResButton.find('input');
                var $label = this.$wholeImageHighResButton.find('label');
                var mime = this.getCanvasMimeType(this.extension.helper.getCurrentCanvas());
                if (mime) {
                    mime = Utils.Files.simplifyMimeType(mime);
                }
                else {
                    mime = '?';
                }
                // dimensions
                var size = this.getCanvasComputedDimensions(this.extension.helper.getCurrentCanvas());
                if (!size) {
                    this.$wholeImageHighResButton.hide();
                }
                else {
                    var label = hasNormalDimensions ?
                        String.format(this.content.wholeImageHighRes, size.width, size.height, mime) :
                        String.format(this.content.wholeImageHighRes, size.height, size.width, mime);
                    $label.text(label);
                    $input.prop('title', label);
                    this.$wholeImageHighResButton.data('width', size.width);
                    this.$wholeImageHighResButton.data('height', size.height);
                    this.$wholeImageHighResButton.show();
                }
                // explanatory text
                if (Utils.Bools.getBool(this.options.optionsExplanatoryTextEnabled, false)) {
                    var text = this.content.wholeImageHighResExplanation;
                    if (text) {
                        var $span = this.$explanatoryTextTemplate.clone();
                        $span.text(text);
                        $label.append($span);
                    }
                }
            }
            else {
                this.$wholeImageHighResButton.hide();
            }
            if (this.isDownloadOptionAvailable(DownloadOption_1.DownloadOption.wholeImagesHighRes)) {
                var $input = this.$wholeImagesHighResButton.find('input');
                var $label = this.$wholeImagesHighResButton.find('label');
                var mime = this.getCanvasMimeType(this.extension.helper.getCurrentCanvas());
                if (mime) {
                    mime = Utils.Files.simplifyMimeType(mime);
                }
                else {
                    mime = '?';
                }
                var label = String.format(this.content.wholeImagesHighRes, mime);
                $label.text(label);
                $input.prop('title', label);
                this.$wholeImagesHighResButton.show();
                // explanatory text
                if (Utils.Bools.getBool(this.options.optionsExplanatoryTextEnabled, false)) {
                    var text = this.content.wholeImagesHighResExplanation;
                    if (text) {
                        var $span = this.$explanatoryTextTemplate.clone();
                        $span.text(text);
                        $label.append($span);
                    }
                }
            }
            else {
                this.$wholeImagesHighResButton.hide();
            }
            if (this.isDownloadOptionAvailable(DownloadOption_1.DownloadOption.wholeImageLowResAsJpg)) {
                var $input = this.$wholeImageLowResAsJpgButton.find('input');
                var $label = this.$wholeImageLowResAsJpgButton.find('label');
                var size = this.extension.getConfinedImageDimensions(canvas, this.options.confinedImageSize);
                var label = hasNormalDimensions ?
                    String.format(this.content.wholeImageLowResAsJpg, size.width, size.height) :
                    String.format(this.content.wholeImageLowResAsJpg, size.height, size.width);
                $label.text(label);
                $input.prop('title', label);
                this.$wholeImageLowResAsJpgButton.data('width', size.width);
                this.$wholeImageLowResAsJpgButton.data('height', size.height);
                this.$wholeImageLowResAsJpgButton.show();
                // explanatory text
                if (Utils.Bools.getBool(this.options.optionsExplanatoryTextEnabled, false)) {
                    var text = this.content.wholeImageLowResAsJpgExplanation;
                    if (text) {
                        var $span = this.$explanatoryTextTemplate.clone();
                        $span.text(text);
                        $label.append($span);
                    }
                }
            }
            else {
                this.$wholeImageLowResAsJpgButton.hide();
            }
            if (this.isDownloadOptionAvailable(DownloadOption_1.DownloadOption.selection)) {
                var $input = this.$selectionButton.find('input');
                var $label = this.$selectionButton.find('label');
                $label.text(this.content.downloadSelection);
                $input.prop('title', this.content.downloadSelection);
                this.$selectionButton.show();
                // explanatory text
                if (Utils.Bools.getBool(this.options.optionsExplanatoryTextEnabled, false)) {
                    var text = this.content.selectionExplanation;
                    if (text) {
                        var $span = this.$explanatoryTextTemplate.clone();
                        $span.text(text);
                        $label.append($span);
                    }
                }
            }
            else {
                this.$selectionButton.hide();
            }
            this.resetDynamicDownloadOptions();
            if (this.isDownloadOptionAvailable(DownloadOption_1.DownloadOption.dynamicImageRenderings)) {
                var images = canvas.getImages();
                for (var i = 0; i < images.length; i++) {
                    this.addDownloadOptionsForRenderings(images[i].getResource(), this.content.entireFileAsOriginal, DownloadOption_1.DownloadOption.dynamicImageRenderings);
                }
            }
            if (this.isDownloadOptionAvailable(DownloadOption_1.DownloadOption.dynamicCanvasRenderings)) {
                this.addDownloadOptionsForRenderings(canvas, this.content.entireFileAsOriginal, DownloadOption_1.DownloadOption.dynamicCanvasRenderings);
            }
            if (this.isDownloadOptionAvailable(DownloadOption_1.DownloadOption.dynamicSequenceRenderings)) {
                this.addDownloadOptionsForRenderings(this.extension.helper.getCurrentSequence(), this.content.entireDocument, DownloadOption_1.DownloadOption.dynamicSequenceRenderings);
            }
            // hide the current view option if it's equivalent to whole image.
            if (this.isDownloadOptionAvailable(DownloadOption_1.DownloadOption.currentViewAsJpg)) {
                var currentWidth = parseInt(this.$currentViewAsJpgButton.data('width').toString());
                var currentHeight = parseInt(this.$currentViewAsJpgButton.data('height').toString());
                var wholeWidth = parseInt(this.$wholeImageHighResButton.data('width').toString());
                var wholeHeight = parseInt(this.$wholeImageHighResButton.data('height').toString());
                var percentageWidth = (currentWidth / wholeWidth) * 100;
                var percentageHeight = (currentHeight / wholeHeight) * 100;
                var disabledPercentage = this.options.currentViewDisabledPercentage;
                // if over disabledPercentage of the size of whole image
                if (percentageWidth >= disabledPercentage && percentageHeight >= disabledPercentage) {
                    this.$currentViewAsJpgButton.hide();
                }
                else {
                    this.$currentViewAsJpgButton.show();
                }
            }
            // order by image area
            var $options = this.$imageOptions.find('li.single');
            $options = $options.sort(function (a, b) {
                var aWidth = $(a).data('width');
                aWidth ? aWidth = parseInt(aWidth.toString()) : 0;
                var aHeight = $(a).data('height');
                aHeight ? aHeight = parseInt(aHeight.toString()) : 0;
                var bWidth = $(b).data('width');
                bWidth ? bWidth = parseInt(bWidth.toString()) : 0;
                var bHeight = $(b).data('height');
                bHeight ? bHeight = parseInt(bHeight.toString()) : 0;
                var aArea = aWidth * aHeight;
                var bArea = bWidth * bHeight;
                if (aArea < bArea) {
                    return -1;
                }
                if (aArea > bArea) {
                    return 1;
                }
                return 0;
            });
            $options.detach().appendTo(this.$imageOptions);
            // hide empty groups
            var $groups = this.$downloadOptions.find('li.group');
            $groups.each(function (index, group) {
                var $group = $(group);
                $group.show();
                if ($group.find('li.option:hidden').length === $group.find('li.option').length) {
                    // all options are hidden, hide group.
                    $group.hide();
                }
            });
            this.$downloadOptions.find('li.group:visible').last().addClass('lastVisible');
            if (!this.$downloadOptions.find('li.option:visible').length) {
                this.$noneAvailable.show();
                this.$downloadButton.hide();
            }
            else {
                // select first option.
                this.$downloadOptions.find('li.option input:visible:first').prop("checked", true);
                this.$noneAvailable.hide();
                this.$downloadButton.show();
            }
            this.resize();
        };
        DownloadDialogue.prototype.resetDynamicDownloadOptions = function () {
            this.renderingUrls = [];
            this.renderingUrlsCount = 0;
            this.$downloadOptions.find('li.dynamic').remove();
        };
        DownloadDialogue.prototype.addDownloadOptionsForRenderings = function (resource, defaultLabel, type) {
            var renderings = resource.getRenderings();
            for (var i = 0; i < renderings.length; i++) {
                var rendering = renderings[i];
                if (rendering) {
                    var label = Manifesto.TranslationCollection.getValue(rendering.getLabel());
                    var currentId = "downloadOption" + ++this.renderingUrlsCount;
                    if (label) {
                        label += " ({0})";
                    }
                    else {
                        label = defaultLabel;
                    }
                    var mime = Utils.Files.simplifyMimeType(rendering.getFormat().toString());
                    label = String.format(label, mime);
                    this.renderingUrls[currentId] = rendering.id;
                    var $button = $('<li class="option dynamic"><input id="' + currentId + '" data-mime="' + mime + '" title="' + label + '" type="radio" name="downloadOptions" tabindex="0" /><label for="' + currentId + '">' + label + '</label></li>');
                    switch (type) {
                        case DownloadOption_1.DownloadOption.dynamicImageRenderings:
                            this.$imageOptions.append($button);
                            break;
                        case DownloadOption_1.DownloadOption.dynamicCanvasRenderings:
                            this.$canvasOptions.append($button);
                            break;
                        case DownloadOption_1.DownloadOption.dynamicSequenceRenderings:
                            this.$sequenceOptions.append($button);
                            break;
                    }
                }
            }
        };
        DownloadDialogue.prototype.getSelectedOption = function () {
            return this.$downloadOptions.find("li.option input:checked");
        };
        DownloadDialogue.prototype.getCanvasImageResource = function (canvas) {
            var images = canvas.getImages();
            if (images[0]) {
                return images[0].getResource();
            }
            return null;
        };
        DownloadDialogue.prototype.getCanvasHighResImageUri = function (canvas) {
            var size = this.getCanvasComputedDimensions(canvas);
            if (size) {
                var width = size.width;
                var uri = canvas.getCanonicalImageUri(width);
                var uri_parts = uri.split('/');
                var rotation = this.extension.getViewerRotation();
                uri_parts[uri_parts.length - 2] = String(rotation);
                uri = uri_parts.join('/');
                return uri;
            }
            return '';
        };
        DownloadDialogue.prototype.getCanvasMimeType = function (canvas) {
            var resource = this.getCanvasImageResource(canvas);
            var format = resource.getFormat();
            if (format) {
                return format.toString();
            }
            return null;
        };
        DownloadDialogue.prototype.getCanvasDimensions = function (canvas) {
            // externalResource may not have loaded yet
            if (canvas.externalResource.data) {
                return new Size(canvas.externalResource.data.width, canvas.externalResource.data.height);
            }
            return new Size(0, 0);
        };
        DownloadDialogue.prototype.getCanvasMaxDimensions = function (canvas) {
            if (canvas.externalResource.data && canvas.externalResource.data.profile[1]) {
                return new Size(canvas.externalResource.data.profile[1].maxWidth, canvas.externalResource.data.profile[1].maxHeight);
            }
            return null;
        };
        DownloadDialogue.prototype.getCanvasComputedDimensions = function (canvas) {
            var size = this.getCanvasDimensions(canvas);
            var maxSize = this.getCanvasMaxDimensions(canvas);
            if (!maxSize)
                return null;
            var finalWidth = size.width;
            var finalHeight = size.height;
            // if the maxWidth is less than the advertised width
            if (!_.isUndefined(maxSize.width) && maxSize.width < size.width) {
                finalWidth = maxSize.width;
                if (!_.isUndefined(maxSize.height)) {
                    finalHeight = maxSize.height;
                }
                else {
                    // calculate finalHeight
                    var ratio = Math.normalise(maxSize.width, 0, size.width);
                    finalHeight = Math.floor(size.height * ratio);
                }
            }
            return new Size(finalWidth, finalHeight);
        };
        DownloadDialogue.prototype.isDownloadOptionAvailable = function (option) {
            switch (option) {
                case DownloadOption_1.DownloadOption.currentViewAsJpg:
                case DownloadOption_1.DownloadOption.dynamicCanvasRenderings:
                case DownloadOption_1.DownloadOption.dynamicImageRenderings:
                case DownloadOption_1.DownloadOption.wholeImageHighRes:
                    // if in one-up mode, or in two-up mode with a single page being shown
                    if (!this.extension.isPagingSettingEnabled() ||
                        this.extension.isPagingSettingEnabled() && this.extension.resources && this.extension.resources.length === 1) {
                        var maxSize = this.getCanvasMaxDimensions(this.extension.helper.getCurrentCanvas());
                        if (maxSize) {
                            if (_.isUndefined(maxSize.width)) {
                                return true;
                            }
                            else if (maxSize.width <= this.options.maxImageWidth) {
                                return true;
                            }
                        }
                    }
                    return false;
                case DownloadOption_1.DownloadOption.wholeImagesHighRes:
                    if (this.extension.isPagingSettingEnabled() && this.extension.resources && this.extension.resources.length > 1) {
                        return true;
                    }
                    return false;
                case DownloadOption_1.DownloadOption.wholeImageLowResAsJpg:
                    // hide low-res option if hi-res width is smaller than constraint
                    var size = this.getCanvasComputedDimensions(this.extension.helper.getCurrentCanvas());
                    if (!size)
                        return false;
                    return (!this.extension.isPagingSettingEnabled() && (size.width > this.options.confinedImageSize));
                case DownloadOption_1.DownloadOption.selection:
                    return this.options.selectionEnabled;
                default:
                    return _super.prototype.isDownloadOptionAvailable.call(this, option);
            }
        };
        return DownloadDialogue;
    }(DownloadDialogue_1.DownloadDialogue));
    exports.DownloadDialogue = DownloadDialogue;
});
//# sourceMappingURL=DownloadDialogue.js.map;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define('modules/uv-dialogues-module/ExternalContentDialogue',["require", "exports", "../uv-shared-module/BaseCommands", "../uv-shared-module/Dialogue"], function (require, exports, BaseCommands_1, Dialogue_1) {
    "use strict";
    var ExternalContentDialogue = (function (_super) {
        __extends(ExternalContentDialogue, _super);
        function ExternalContentDialogue($element) {
            return _super.call(this, $element) || this;
        }
        ExternalContentDialogue.prototype.create = function () {
            var _this = this;
            this.setConfig('externalContentDialogue');
            _super.prototype.create.call(this);
            this.openCommand = BaseCommands_1.BaseCommands.SHOW_EXTERNALCONTENT_DIALOGUE;
            this.closeCommand = BaseCommands_1.BaseCommands.HIDE_EXTERNALCONTENT_DIALOGUE;
            $.subscribe(this.openCommand, function (e, params) {
                _this.open();
                _this.$iframe.prop('src', params.uri);
            });
            $.subscribe(this.closeCommand, function (e) {
                _this.close();
            });
            this.$iframe = $('<iframe></iframe>');
            this.$content.append(this.$iframe);
            this.$element.hide();
        };
        ExternalContentDialogue.prototype.resize = function () {
            _super.prototype.resize.call(this);
            this.$iframe.width(this.$content.width());
            this.$iframe.height(this.$content.height());
        };
        return ExternalContentDialogue;
    }(Dialogue_1.Dialogue));
    exports.ExternalContentDialogue = ExternalContentDialogue;
});
//# sourceMappingURL=ExternalContentDialogue.js.map;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define('modules/uv-shared-module/FooterPanel',["require", "exports", "./BaseCommands", "./BaseView", "./Metrics"], function (require, exports, BaseCommands_1, BaseView_1, Metrics_1) {
    "use strict";
    var FooterPanel = (function (_super) {
        __extends(FooterPanel, _super);
        function FooterPanel($element) {
            return _super.call(this, $element) || this;
        }
        FooterPanel.prototype.create = function () {
            var _this = this;
            this.setConfig('footerPanel');
            _super.prototype.create.call(this);
            $.subscribe(BaseCommands_1.BaseCommands.TOGGLE_FULLSCREEN, function () {
                _this.updateFullScreenButton();
            });
            $.subscribe(BaseCommands_1.BaseCommands.METRIC_CHANGED, function () {
                _this.updateMinimisedButtons();
                _this.updateMoreInfoButton();
            });
            $.subscribe(BaseCommands_1.BaseCommands.SETTINGS_CHANGED, function () {
                _this.updateDownloadButton();
            });
            this.$options = $('<div class="options"></div>');
            this.$element.append(this.$options);
            this.$feedbackButton = $('<a class="feedback" title="' + this.content.feedback + '" tabindex="0">' + this.content.feedback + '</a>');
            this.$options.prepend(this.$feedbackButton);
            this.$openButton = $('<a class="open" title="' + this.content.open + '" tabindex="0">' + this.content.open + '</a>');
            this.$options.prepend(this.$openButton);
            this.$bookmarkButton = $('<a class="bookmark" title="' + this.content.bookmark + '" tabindex="0">' + this.content.bookmark + '</a>');
            this.$options.prepend(this.$bookmarkButton);
            this.$shareButton = $('<a href="#" class="share" title="' + this.content.share + '" tabindex="0">' + this.content.share + '</a>');
            this.$options.append(this.$shareButton);
            this.$embedButton = $('<a href="#" class="embed" title="' + this.content.embed + '" tabindex="0">' + this.content.embed + '</a>');
            this.$options.append(this.$embedButton);
            this.$downloadButton = $('<a class="download" title="' + this.content.download + '" tabindex="0">' + this.content.download + '</a>');
            this.$options.prepend(this.$downloadButton);
            this.$moreInfoButton = $('<a href="#" class="moreInfo" title="' + this.content.moreInfo + '" tabindex="0">' + this.content.moreInfo + '</a>');
            this.$options.prepend(this.$moreInfoButton);
            this.$fullScreenBtn = $('<a href="#" class="fullScreen" title="' + this.content.fullScreen + '" tabindex="0">' + this.content.fullScreen + '</a>');
            this.$options.append(this.$fullScreenBtn);
            this.$openButton.onPressed(function () {
                $.publish(BaseCommands_1.BaseCommands.OPEN);
            });
            this.$feedbackButton.onPressed(function () {
                $.publish(BaseCommands_1.BaseCommands.FEEDBACK);
            });
            this.$bookmarkButton.onPressed(function () {
                $.publish(BaseCommands_1.BaseCommands.BOOKMARK);
            });
            this.$shareButton.onPressed(function () {
                $.publish(BaseCommands_1.BaseCommands.SHOW_SHARE_DIALOGUE, [_this.$shareButton]);
            });
            this.$embedButton.onPressed(function () {
                $.publish(BaseCommands_1.BaseCommands.SHOW_EMBED_DIALOGUE, [_this.$embedButton]);
            });
            this.$downloadButton.onPressed(function () {
                $.publish(BaseCommands_1.BaseCommands.SHOW_DOWNLOAD_DIALOGUE, [_this.$downloadButton]);
            });
            this.$moreInfoButton.onPressed(function () {
                $.publish(BaseCommands_1.BaseCommands.SHOW_MOREINFO_DIALOGUE, [_this.$moreInfoButton]);
            });
            this.$fullScreenBtn.on('click', function (e) {
                e.preventDefault();
                $.publish(BaseCommands_1.BaseCommands.TOGGLE_FULLSCREEN);
            });
            if (!Utils.Bools.getBool(this.options.embedEnabled, true)) {
                this.$embedButton.hide();
            }
            this.updateMoreInfoButton();
            this.updateOpenButton();
            this.updateFeedbackButton();
            this.updateBookmarkButton();
            this.updateEmbedButton();
            this.updateDownloadButton();
            this.updateFullScreenButton();
            this.updateShareButton();
            this.updateMinimisedButtons();
        };
        FooterPanel.prototype.updateMinimisedButtons = function () {
            // if configured to always minimise buttons
            if (Utils.Bools.getBool(this.options.minimiseButtons, false)) {
                this.$options.addClass('minimiseButtons');
                return;
            }
            // otherwise, check metric
            if (this.extension.metric === Metrics_1.Metrics.MOBILE_LANDSCAPE) {
                this.$options.addClass('minimiseButtons');
            }
            else {
                this.$options.removeClass('minimiseButtons');
            }
        };
        FooterPanel.prototype.updateMoreInfoButton = function () {
            var configEnabled = Utils.Bools.getBool(this.options.moreInfoEnabled, false);
            if (configEnabled && this.extension.metric === Metrics_1.Metrics.MOBILE_LANDSCAPE) {
                this.$moreInfoButton.show();
            }
            else {
                this.$moreInfoButton.hide();
            }
        };
        FooterPanel.prototype.updateOpenButton = function () {
            var configEnabled = Utils.Bools.getBool(this.options.openEnabled, false);
            if (configEnabled && !this.extension.isHomeDomain) {
                this.$openButton.show();
            }
            else {
                this.$openButton.hide();
            }
        };
        FooterPanel.prototype.updateFullScreenButton = function () {
            if (!Utils.Bools.getBool(this.options.fullscreenEnabled, true)) {
                this.$fullScreenBtn.hide();
            }
            if (this.extension.isLightbox) {
                this.$fullScreenBtn.addClass('lightbox');
            }
            if (this.extension.isFullScreen()) {
                this.$fullScreenBtn.swapClass('fullScreen', 'exitFullscreen');
                this.$fullScreenBtn.text(this.content.exitFullScreen);
                this.$fullScreenBtn.attr('title', this.content.exitFullScreen);
            }
            else {
                this.$fullScreenBtn.swapClass('exitFullscreen', 'fullScreen');
                this.$fullScreenBtn.text(this.content.fullScreen);
                this.$fullScreenBtn.attr('title', this.content.fullScreen);
            }
        };
        FooterPanel.prototype.updateEmbedButton = function () {
            if (this.extension.helper.isUIEnabled('embed') && Utils.Bools.getBool(this.options.embedEnabled, false)) {
                //current jquery version sets display to 'inline' in mobile version, while this should remain hidden (see media query)
                if (!$.browser.mobile) {
                    this.$embedButton.show();
                }
            }
            else {
                this.$embedButton.hide();
            }
        };
        FooterPanel.prototype.updateShareButton = function () {
            if (this.extension.helper.isUIEnabled('share') && Utils.Bools.getBool(this.options.shareEnabled, true)) {
                this.$shareButton.show();
            }
            else {
                this.$shareButton.hide();
            }
        };
        FooterPanel.prototype.updateDownloadButton = function () {
            var configEnabled = Utils.Bools.getBool(this.options.downloadEnabled, true);
            if (configEnabled) {
                this.$downloadButton.show();
            }
            else {
                this.$downloadButton.hide();
            }
        };
        FooterPanel.prototype.updateFeedbackButton = function () {
            var configEnabled = Utils.Bools.getBool(this.options.feedbackEnabled, false);
            if (configEnabled) {
                this.$feedbackButton.show();
            }
            else {
                this.$feedbackButton.hide();
            }
        };
        FooterPanel.prototype.updateBookmarkButton = function () {
            var configEnabled = Utils.Bools.getBool(this.options.bookmarkEnabled, false);
            if (configEnabled) {
                this.$bookmarkButton.show();
            }
            else {
                this.$bookmarkButton.hide();
            }
        };
        FooterPanel.prototype.resize = function () {
            _super.prototype.resize.call(this);
        };
        return FooterPanel;
    }(BaseView_1.BaseView));
    exports.FooterPanel = FooterPanel;
});
//# sourceMappingURL=FooterPanel.js.map;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define('modules/uv-osdmobilefooterpanel-module/MobileFooter',["require", "exports", "../uv-shared-module/FooterPanel", "../../extensions/uv-seadragon-extension/Commands"], function (require, exports, FooterPanel_1, Commands_1) {
    "use strict";
    var FooterPanel = (function (_super) {
        __extends(FooterPanel, _super);
        function FooterPanel($element) {
            return _super.call(this, $element) || this;
        }
        FooterPanel.prototype.create = function () {
            this.setConfig('mobileFooterPanel');
            _super.prototype.create.call(this);
            this.$spacer = $('<div class="spacer"></div>');
            this.$options.prepend(this.$spacer);
            this.$rotateButton = $('<a class="rotate" title="' + this.content.rotateRight + '" tabindex="0">' + this.content.rotateRight + '</a>');
            this.$options.prepend(this.$rotateButton);
            this.$zoomOutButton = $('<a class="zoomOut" title="' + this.content.zoomOut + '" tabindex="0">' + this.content.zoomOut + '</a>');
            this.$options.prepend(this.$zoomOutButton);
            this.$zoomInButton = $('<a class="zoomIn" title="' + this.content.zoomIn + '" tabindex="0">' + this.content.zoomIn + '</a>');
            this.$options.prepend(this.$zoomInButton);
            this.$zoomInButton.onPressed(function () {
                $.publish(Commands_1.Commands.ZOOM_IN);
            });
            this.$zoomOutButton.onPressed(function () {
                $.publish(Commands_1.Commands.ZOOM_OUT);
            });
            this.$rotateButton.onPressed(function () {
                $.publish(Commands_1.Commands.ROTATE);
            });
        };
        FooterPanel.prototype.resize = function () {
            _super.prototype.resize.call(this);
            this.$options.css('left', Math.floor((this.$element.width() / 2) - (this.$options.width() / 2)));
        };
        return FooterPanel;
    }(FooterPanel_1.FooterPanel));
    exports.FooterPanel = FooterPanel;
});
//# sourceMappingURL=MobileFooter.js.map;
define('modules/uv-shared-module/AutoComplete',["require", "exports"], function (require, exports) {
    "use strict";
    var AutoComplete = (function () {
        function AutoComplete(element, autoCompleteFunc, parseResultsFunc, onSelect, delay, minChars, positionAbove) {
            if (delay === void 0) { delay = 300; }
            if (minChars === void 0) { minChars = 2; }
            if (positionAbove === void 0) { positionAbove = false; }
            var _this = this;
            // valid keys that are not 
            this._validKeyDownCodes = [KeyCodes.KeyDown.Backspace, KeyCodes.KeyDown.Spacebar, KeyCodes.KeyDown.Tab, KeyCodes.KeyDown.LeftArrow, KeyCodes.KeyDown.RightArrow, KeyCodes.KeyDown.Delete];
            this._validKeyPressCodes = [KeyCodes.KeyPress.GraveAccent, KeyCodes.KeyPress.DoubleQuote];
            this._lastKeyDownWasValid = false;
            this._$element = element;
            this._autoCompleteFunc = autoCompleteFunc;
            this._delay = delay;
            this._minChars = minChars;
            this._onSelect = onSelect;
            this._parseResultsFunc = parseResultsFunc;
            this._positionAbove = positionAbove;
            // create ui.
            this._$searchResultsList = $('<ul class="autocomplete"></ul>');
            if (this._positionAbove) {
                this._$element.parent().prepend(this._$searchResultsList);
            }
            else {
                this._$element.parent().append(this._$searchResultsList);
            }
            this._$searchResultTemplate = $('<li class="result"><a href="#" tabindex="-1"></a></li>');
            // init ui.
            // callback after set period.
            var typewatch = (function () {
                var timer = 0;
                return function (callback, ms) {
                    clearTimeout(timer);
                    timer = setTimeout(callback, ms);
                };
            })();
            var that = this;
            // validate
            this._$element.on("keydown", function (e) {
                var originalEvent = e.originalEvent;
                that._lastKeyDownWasValid = that._isValidKeyDown(originalEvent);
                var charCode = Utils.Keyboard.getCharCode(originalEvent);
                var cancelEvent = false;
                if (charCode === KeyCodes.KeyDown.LeftArrow) {
                    cancelEvent = true;
                }
                else if (charCode === KeyCodes.KeyDown.RightArrow) {
                    cancelEvent = true;
                }
                if (cancelEvent) {
                    originalEvent.cancelBubble = true;
                    if (originalEvent.stopPropagation)
                        originalEvent.stopPropagation();
                }
            });
            // prevent invalid characters being entered
            this._$element.on("keypress", function (e) {
                var isValidKeyPress = that._isValidKeyPress(e.originalEvent);
                if (!(that._lastKeyDownWasValid || isValidKeyPress)) {
                    e.preventDefault();
                    return false;
                }
                return true;
            });
            // auto complete
            this._$element.on("keyup", function (e) {
                // if pressing enter without a list item selected
                if (!that._getSelectedListItem().length && e.keyCode === KeyCodes.KeyDown.Enter) {
                    that._onSelect(that._getTerms());
                    return;
                }
                // If there are search results
                if (that._$searchResultsList.is(':visible') && that._results.length) {
                    if (e.keyCode === KeyCodes.KeyDown.Enter) {
                        that._searchForItem(that._getSelectedListItem());
                    }
                    else if (e.keyCode === KeyCodes.KeyDown.DownArrow) {
                        that._setSelectedResultIndex(1);
                        return;
                    }
                    else if (e.keyCode === KeyCodes.KeyDown.UpArrow) {
                        that._setSelectedResultIndex(-1);
                        return;
                    }
                }
                if (e.keyCode !== KeyCodes.KeyDown.Enter) {
                    // after a delay, show autocomplete list.
                    typewatch(function () {
                        var val = that._getTerms();
                        // if there are more than x chars and no spaces
                        // update the autocomplete list.
                        if (val && val.length > that._minChars && !val.contains(' ')) {
                            that._search(val);
                        }
                        else {
                            // otherwise, hide the autocomplete list.
                            that._clearResults();
                            that._hideResults();
                        }
                    }, that._delay);
                }
            });
            // hide results if clicked outside.
            $(document).on('mouseup', function (e) {
                if (_this._$searchResultsList.parent().has($(e.target)[0]).length === 0) {
                    _this._clearResults();
                    _this._hideResults();
                }
            });
            this._hideResults();
        }
        AutoComplete.prototype._isValidKeyDown = function (e) {
            var isValid = this._validKeyDownCodes.contains(Utils.Keyboard.getCharCode(e));
            return isValid;
        };
        AutoComplete.prototype._isValidKeyPress = function (e) {
            var charCode = Utils.Keyboard.getCharCode(e);
            var key = String.fromCharCode(charCode);
            var isValid = key.isAlphanumeric() || this._validKeyPressCodes.contains(charCode);
            return isValid;
        };
        AutoComplete.prototype._getTerms = function () {
            return this._$element.val().trim();
        };
        AutoComplete.prototype._setSelectedResultIndex = function (direction) {
            var nextIndex;
            if (direction === 1) {
                nextIndex = this._selectedResultIndex + 1;
            }
            else {
                nextIndex = this._selectedResultIndex - 1;
            }
            var $items = this._$searchResultsList.find('li');
            if (nextIndex < 0) {
                nextIndex = $items.length - 1;
            }
            else if (nextIndex > $items.length - 1) {
                nextIndex = 0;
            }
            this._selectedResultIndex = nextIndex;
            $items.removeClass('selected');
            var $selectedItem = $items.eq(this._selectedResultIndex);
            $selectedItem.addClass('selected');
            //var top = selectedItem.offset().top;
            var top = $selectedItem.outerHeight(true) * this._selectedResultIndex;
            this._$searchResultsList.scrollTop(top);
        };
        AutoComplete.prototype._search = function (term) {
            this._results = [];
            this._clearResults();
            this._showResults();
            this._$searchResultsList.append('<li class="loading"></li>');
            this._updateListPosition();
            var that = this;
            this._autoCompleteFunc(term, function (results) {
                that._listResults(results);
            });
        };
        AutoComplete.prototype._clearResults = function () {
            this._$searchResultsList.empty();
        };
        AutoComplete.prototype._hideResults = function () {
            this._$searchResultsList.hide();
        };
        AutoComplete.prototype._showResults = function () {
            this._selectedResultIndex = -1;
            this._$searchResultsList.show();
        };
        AutoComplete.prototype._updateListPosition = function () {
            if (this._positionAbove) {
                this._$searchResultsList.css({
                    'top': this._$searchResultsList.outerHeight(true) * -1
                });
            }
            else {
                this._$searchResultsList.css({
                    'top': this._$element.outerHeight(true)
                });
            }
        };
        AutoComplete.prototype._listResults = function (results) {
            // get an array of strings
            this._results = this._parseResultsFunc(results);
            this._clearResults();
            if (!this._results.length) {
                // don't do this, because there still may be results for the PHRASE but not the word.
                // they won't know until they do the search.
                //this.searchResultsList.append('<li>no results</li>');
                this._hideResults();
                return;
            }
            for (var i = 0; i < this._results.length; i++) {
                var result = this._results[i];
                var $resultItem = this._$searchResultTemplate.clone();
                var $a = $resultItem.find('a');
                $a.text(result);
                this._$searchResultsList.append($resultItem);
            }
            this._updateListPosition();
            var that = this;
            this._$searchResultsList.find('li').on('click', function (e) {
                e.preventDefault();
                that._searchForItem($(this));
            });
        };
        AutoComplete.prototype._searchForItem = function ($item) {
            var term = $item.find('a').text();
            this._$element.val(term);
            this._hideResults();
            this._onSelect(term);
            this._clearResults();
            this._hideResults();
        };
        AutoComplete.prototype._getSelectedListItem = function () {
            return this._$searchResultsList.find('li.selected');
        };
        return AutoComplete;
    }());
    exports.AutoComplete = AutoComplete;
});
//# sourceMappingURL=AutoComplete.js.map;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define('modules/uv-searchfooterpanel-module/FooterPanel',["require", "exports", "../uv-shared-module/AutoComplete", "../uv-shared-module/BaseCommands", "../uv-shared-module/FooterPanel", "../../extensions/uv-seadragon-extension/Commands", "../../extensions/uv-seadragon-extension/Mode"], function (require, exports, AutoComplete_1, BaseCommands_1, FooterPanel_1, Commands_1, Mode_1) {
    "use strict";
    var FooterPanel = (function (_super) {
        __extends(FooterPanel, _super);
        function FooterPanel($element) {
            var _this = _super.call(this, $element) || this;
            _this.placemarkerTouched = false;
            return _this;
        }
        FooterPanel.prototype.create = function () {
            var _this = this;
            this.setConfig('searchFooterPanel');
            _super.prototype.create.call(this);
            $.subscribe(BaseCommands_1.BaseCommands.CANVAS_INDEX_CHANGED, function (e, canvasIndex) {
                _this.canvasIndexChanged();
                _this.setCurrentSearchResultPlacemarker();
                _this.updatePrevButton();
                _this.updateNextButton();
            });
            // todo: this should be a setting
            $.subscribe(Commands_1.Commands.MODE_CHANGED, function (e, mode) {
                _this.settingsChanged();
            });
            $.subscribe(Commands_1.Commands.SEARCH, function (e, terms) {
                _this.terms = terms;
            });
            $.subscribe(Commands_1.Commands.SEARCH_RESULTS, function (e, obj) {
                _this.displaySearchResults(obj.terms, obj.results);
                _this.setCurrentSearchResultPlacemarker();
            });
            $.subscribe(Commands_1.Commands.SEARCH_RESULTS_EMPTY, function () {
                _this.hideSearchSpinner();
            });
            $.subscribe(Commands_1.Commands.SEARCH_RESULT_RECT_CHANGED, function () {
                _this.updatePrevButton();
                _this.updateNextButton();
            });
            this.$printButton = $('<a class="print" title="' + this.content.print + '" tabindex="0">' + this.content.print + '</a>');
            this.$options.prepend(this.$printButton);
            // search input.
            this.$searchContainer = $('<div class="search"></div>');
            this.$element.prepend(this.$searchContainer);
            this.$searchOptions = $('<div class="searchOptions"></div>');
            this.$searchContainer.append(this.$searchOptions);
            this.$searchLabel = $('<span class="label">' + this.content.searchWithin + '</span>');
            this.$searchOptions.append(this.$searchLabel);
            this.$searchTextContainer = $('<div class="searchTextContainer"></div>');
            this.$searchOptions.append(this.$searchTextContainer);
            this.$searchText = $('<input class="searchText" type="text" maxlength="100" value="' + this.content.enterKeyword + '" />');
            this.$searchTextContainer.append(this.$searchText);
            this.$searchButton = $('<a class="imageButton searchButton" tabindex="0"></a>');
            this.$searchTextContainer.append(this.$searchButton);
            // search results.
            this.$searchPagerContainer = $('<div class="searchPager"></div>');
            this.$element.prepend(this.$searchPagerContainer);
            this.$searchPagerControls = $('<div class="controls"></div>');
            this.$searchPagerContainer.prepend(this.$searchPagerControls);
            this.$previousResultButton = $('<a class="previousResult" title="' + this.content.previousResult + '">' + this.content.previousResult + '</a>');
            this.$searchPagerControls.append(this.$previousResultButton);
            this.$searchResultsInfo = $('<div class="searchResultsInfo"><span class="number">x</span> <span class="foundFor"></span> \'<span class="terms">y</span>\'</div>');
            this.$searchPagerControls.append(this.$searchResultsInfo);
            this.$clearSearchResultsButton = $('<a class="clearSearch" title="' + this.content.clearSearch + '">' + this.content.clearSearch + '</a>');
            this.$searchResultsInfo.append(this.$clearSearchResultsButton);
            this.$nextResultButton = $('<a class="nextResult" title="' + this.content.nextResult + '">' + this.content.nextResult + '</a>');
            this.$searchPagerControls.append(this.$nextResultButton);
            // placemarker line.
            this.$searchResultsContainer = $('<div class="searchResults"></div>');
            this.$element.prepend(this.$searchResultsContainer);
            this.$line = $('<div class="line"></div>');
            this.$searchResultsContainer.append(this.$line);
            this.$pagePositionMarker = $('<div class="positionPlacemarker"></div>');
            this.$searchResultsContainer.append(this.$pagePositionMarker);
            this.$pagePositionLabel = $('<div class="label"></div>');
            this.$searchResultsContainer.append(this.$pagePositionLabel);
            this.$placemarkerDetails = $('<div class="placeMarkerDetails"></div>');
            this.$searchResultsContainer.append(this.$placemarkerDetails);
            this.$placemarkerDetailsTop = $('<h1></h1>');
            this.$placemarkerDetails.append(this.$placemarkerDetailsTop);
            this.$placemarkerDetailsBottom = $('<p></p>');
            this.$placemarkerDetails.append(this.$placemarkerDetailsBottom);
            // initialise ui.
            this.$searchPagerContainer.hide();
            this.$placemarkerDetails.hide();
            // ui event handlers.
            var that = this;
            this.$searchButton.on('click', function (e) {
                e.preventDefault();
                _this.search(_this.$searchText.val());
            });
            this.$searchText.on('focus', function () {
                // clear initial text.
                if (_this.$searchText.val() === _this.content.enterKeyword)
                    _this.$searchText.val('');
            });
            this.$placemarkerDetails.on('mouseover', function () {
                $.publish(Commands_1.Commands.SEARCH_PREVIEW_START, [_this.currentPlacemarkerIndex]);
            });
            this.$placemarkerDetails.on('mouseleave', function () {
                $(this).hide();
                $.publish(Commands_1.Commands.SEARCH_PREVIEW_FINISH);
                // reset all placemarkers.
                var placemarkers = that.getSearchResultPlacemarkers();
                placemarkers.removeClass('hover');
            });
            this.$placemarkerDetails.on('click', function (e) {
                $.publish(Commands_1.Commands.VIEW_PAGE, [_this.currentPlacemarkerIndex]);
            });
            this.$previousResultButton.on('click', function (e) {
                e.preventDefault();
                $.publish(Commands_1.Commands.PREV_SEARCH_RESULT);
            });
            this.$nextResultButton.on('click', function (e) {
                e.preventDefault();
                $.publish(Commands_1.Commands.NEXT_SEARCH_RESULT);
            });
            this.$clearSearchResultsButton.on('click', function (e) {
                e.preventDefault();
                $.publish(Commands_1.Commands.CLEAR_SEARCH);
                _this.clearSearchResults();
            });
            // hide search options if not enabled/supported.
            if (!this.extension.isSearchWithinEnabled()) {
                this.$searchContainer.hide();
                this.$searchPagerContainer.hide();
                this.$searchResultsContainer.hide();
                this.$element.addClass('min');
            }
            if (this.extension.helper.getTotalCanvases() === 1) {
                this.$searchResultsContainer.hide();
            }
            var autocompleteService = this.extension.getAutoCompleteUri();
            if (autocompleteService) {
                new AutoComplete_1.AutoComplete(this.$searchText, function (terms, cb) {
                    $.getJSON(String.format(autocompleteService, terms), function (results) {
                        cb(results);
                    });
                }, function (results) {
                    return $.map(results.terms, function (result) {
                        return result.match;
                    });
                }, function (terms) {
                    _this.search(terms);
                }, 300, 2, true);
            }
            else {
                this.$searchText.on("keyup", function (e) {
                    if (e.keyCode === KeyCodes.KeyDown.Enter) {
                        that.search(that.$searchText.val());
                    }
                });
            }
            this.$printButton.onPressed(function () {
                $.publish(Commands_1.Commands.PRINT);
            });
            this.updatePrintButton();
            var positionMarkerEnabled = Utils.Bools.getBool(this.config.options.positionMarkerEnabled, true);
            if (!positionMarkerEnabled) {
                this.$pagePositionMarker.hide();
                this.$pagePositionLabel.hide();
            }
        };
        FooterPanel.prototype.isZoomToSearchResultEnabled = function () {
            return Utils.Bools.getBool(this.extension.config.options.zoomToSearchResultEnabled, true);
        };
        FooterPanel.prototype.isPreviousButtonEnabled = function () {
            var currentCanvasIndex = this.extension.helper.canvasIndex;
            var firstSearchResultCanvasIndex = this.getFirstSearchResultCanvasIndex();
            var currentSearchResultRectIndex = this.getCurrentSearchResultRectIndex();
            // if zoom to search result is enabled and there is a highlighted search result.
            if (this.isZoomToSearchResultEnabled() && this.extension.currentSearchResultRect) {
                if (currentCanvasIndex < firstSearchResultCanvasIndex) {
                    return false;
                }
                else if (currentCanvasIndex === firstSearchResultCanvasIndex) {
                    if (currentSearchResultRectIndex === 0) {
                        return false;
                    }
                }
                return true;
            }
            return (currentCanvasIndex > firstSearchResultCanvasIndex);
        };
        FooterPanel.prototype.isCanvasIndexLessThanFirstSearchResultIndex = function () {
            var searchResults = this.extension.searchResults;
            return this.extension.helper.canvasIndex <= searchResults[0].canvasIndex;
        };
        FooterPanel.prototype.isNextButtonEnabled = function () {
            var currentCanvasIndex = this.extension.helper.canvasIndex;
            var lastSearchResultCanvasIndex = this.getLastSearchResultCanvasIndex();
            var currentSearchResultRectIndex = this.getCurrentSearchResultRectIndex();
            // if zoom to search result is enabled and there is a highlighted search result.
            if (this.isZoomToSearchResultEnabled() && this.extension.currentSearchResultRect) {
                if (currentCanvasIndex > lastSearchResultCanvasIndex) {
                    return false;
                }
                else if (currentCanvasIndex === lastSearchResultCanvasIndex) {
                    if (currentSearchResultRectIndex === this.getLastSearchResultRectIndex()) {
                        return false;
                    }
                }
                return true;
            }
            return (currentCanvasIndex < lastSearchResultCanvasIndex);
        };
        FooterPanel.prototype.getSearchResults = function () {
            return this.extension.searchResults;
        };
        FooterPanel.prototype.getCurrentSearchResultRectIndex = function () {
            return this.extension.getCurrentSearchResultRectIndex();
        };
        FooterPanel.prototype.getFirstSearchResultCanvasIndex = function () {
            var searchResults = this.getSearchResults();
            var firstSearchResultCanvasIndex = searchResults[0].canvasIndex;
            return firstSearchResultCanvasIndex;
        };
        FooterPanel.prototype.getLastSearchResultCanvasIndex = function () {
            var searchResults = this.getSearchResults();
            var lastSearchResultCanvasIndex = searchResults[searchResults.length - 1].canvasIndex;
            return lastSearchResultCanvasIndex;
        };
        FooterPanel.prototype.getLastSearchResultRectIndex = function () {
            return this.extension.getLastSearchResultRectIndex();
        };
        FooterPanel.prototype.updateNextButton = function () {
            var searchResults = this.extension.searchResults;
            if (searchResults && searchResults.length) {
                if (this.isNextButtonEnabled()) {
                    this.$nextResultButton.removeClass('disabled');
                }
                else {
                    this.$nextResultButton.addClass('disabled');
                }
            }
        };
        FooterPanel.prototype.updatePrevButton = function () {
            var searchResults = this.extension.searchResults;
            if (searchResults && searchResults.length) {
                if (this.isPreviousButtonEnabled()) {
                    this.$previousResultButton.removeClass('disabled');
                }
                else {
                    this.$previousResultButton.addClass('disabled');
                }
            }
        };
        FooterPanel.prototype.updatePrintButton = function () {
            var configEnabled = Utils.Bools.getBool(this.options.printEnabled, false);
            //var printService: Manifesto.IService = this.extension.helper.manifest.getService(manifesto.ServiceProfile.printExtensions());
            //if (configEnabled && printService && this.extension.isOnHomeDomain()){
            if (configEnabled) {
                this.$printButton.show();
            }
            else {
                this.$printButton.hide();
            }
        };
        FooterPanel.prototype.search = function (terms) {
            this.terms = terms;
            if (this.terms === '' || this.terms === this.content.enterKeyword) {
                this.extension.showMessage(this.config.modules.genericDialogue.content.emptyValue, function () {
                    this.$searchText.focus();
                });
                return;
            }
            // blur search field
            this.$searchText.blur();
            this.showSearchSpinner();
            $.publish(Commands_1.Commands.SEARCH, [this.terms]);
        };
        FooterPanel.prototype.getSearchResultPlacemarkers = function () {
            return this.$searchResultsContainer.find('.searchResultPlacemarker');
        };
        FooterPanel.prototype.setCurrentSearchResultPlacemarker = function () {
            var placemarkers = this.getSearchResultPlacemarkers();
            placemarkers.parent().find('.current').removeClass('current');
            var $current = $('.searchResultPlacemarker[data-index="' + this.extension.helper.canvasIndex + '"]');
            $current.addClass('current');
        };
        FooterPanel.prototype.positionSearchResultPlacemarkers = function () {
            var results = this.extension.searchResults;
            if (!results.length)
                return;
            // clear all existing placemarkers
            var placemarkers = this.getSearchResultPlacemarkers();
            placemarkers.remove();
            var pageWidth = this.getPageLineRatio();
            var lineTop = this.$line.position().top;
            var lineLeft = this.$line.position().left;
            var that = this;
            // for each page with a result, place a marker along the line.
            for (var i = 0; i < results.length; i++) {
                var result = results[i];
                var distance = result.canvasIndex * pageWidth;
                var $placemarker = $('<div class="searchResultPlacemarker" data-index="' + result.canvasIndex + '"></div>');
                $placemarker[0].ontouchstart = function (e) { that.onPlacemarkerTouchStart.call(this, that); };
                $placemarker.click(function (e) { that.onPlacemarkerClick.call(this, that); });
                $placemarker.mouseenter(function (e) { that.onPlacemarkerMouseEnter.call(this, that); });
                $placemarker.mouseleave(function (e) { that.onPlacemarkerMouseLeave.call(this, e, that); });
                this.$searchResultsContainer.append($placemarker);
                var top = lineTop - $placemarker.height();
                var left = lineLeft + distance - ($placemarker.width() / 2);
                $placemarker.css({
                    top: top,
                    left: left
                });
            }
        };
        FooterPanel.prototype.onPlacemarkerTouchStart = function (that) {
            that.placemarkerTouched = true;
            var $placemarker = $(this);
            var index = parseInt($placemarker.attr('data-index'));
            $.publish(Commands_1.Commands.VIEW_PAGE, [index]);
        };
        FooterPanel.prototype.onPlacemarkerClick = function (that) {
            if (that.placemarkerTouched)
                return;
            that.placemarkerTouched = false;
            var $placemarker = $(this);
            var index = parseInt($placemarker.attr('data-index'));
            $.publish(Commands_1.Commands.VIEW_PAGE, [index]);
        };
        FooterPanel.prototype.onPlacemarkerMouseEnter = function (that) {
            if (that.placemarkerTouched)
                return;
            var $placemarker = $(this);
            $placemarker.addClass('hover');
            var canvasIndex = parseInt($placemarker.attr('data-index'));
            $.publish(Commands_1.Commands.SEARCH_PREVIEW_START, [canvasIndex]);
            var placemarkers = that.getSearchResultPlacemarkers();
            var elemIndex = placemarkers.index($placemarker[0]);
            that.currentPlacemarkerIndex = canvasIndex;
            that.$placemarkerDetails.show();
            var title = "{0} {1}";
            var mode = that.extension.getMode();
            if (mode.toString() === Mode_1.Mode.page.toString()) {
                var canvas = that.extension.helper.getCanvasByIndex(canvasIndex);
                var label = Manifesto.TranslationCollection.getValue(canvas.getLabel());
                if (label === "") {
                    label = this.extension.helper.manifest.options.defaultLabel;
                }
                title = String.format(title, that.content.pageCaps, label);
            }
            else {
                title = String.format(title, that.content.imageCaps, canvasIndex + 1);
            }
            that.$placemarkerDetailsTop.html(title);
            var result = that.extension.searchResults[elemIndex];
            var terms = Utils.Strings.ellipsis(that.terms, that.options.elideDetailsTermsCount);
            var instancesFoundText;
            if (result.rects.length === 1) {
                instancesFoundText = that.content.instanceFound;
                instancesFoundText = String.format(instancesFoundText, terms);
            }
            else {
                instancesFoundText = that.content.instancesFound;
                instancesFoundText = String.format(instancesFoundText, result.rects.length, terms);
            }
            that.$placemarkerDetailsBottom.html(instancesFoundText);
            var pos = $placemarker.position();
            var top = pos.top - that.$placemarkerDetails.height();
            var left = pos.left;
            if (left < that.$placemarkerDetails.width() / 2) {
                left = 0 - ($placemarker.width() / 2);
            }
            else if (left > that.$line.width() - (that.$placemarkerDetails.width() / 2)) {
                left = that.$line.width() - that.$placemarkerDetails.width() + ($placemarker.width() / 2);
            }
            else {
                left -= (that.$placemarkerDetails.width() / 2);
            }
            that.$placemarkerDetails.css({
                top: top,
                left: left
            });
        };
        FooterPanel.prototype.onPlacemarkerMouseLeave = function (e, that) {
            $.publish(Commands_1.Commands.SEARCH_PREVIEW_FINISH);
            var $placemarker = $(this);
            var newElement = e.toElement || e.relatedTarget;
            var isChild = $(newElement).closest(that.$placemarkerDetails).length;
            if (newElement != that.$placemarkerDetails.get(0) && isChild === 0) {
                that.$placemarkerDetails.hide();
                $placemarker.removeClass('hover');
            }
        };
        FooterPanel.prototype.setPageMarkerPosition = function () {
            if (this.extension.helper.canvasIndex == null)
                return;
            // position placemarker showing current page.
            var pageLineRatio = this.getPageLineRatio();
            var lineTop = this.$line.position().top;
            var lineLeft = this.$line.position().left;
            var position = this.extension.helper.canvasIndex * pageLineRatio;
            var top = lineTop;
            var left = lineLeft + position;
            this.$pagePositionMarker.css({
                top: top,
                left: left
            });
            // if the remaining distance to the right is less than the width of the label
            // shift it to the left.
            var lineWidth = this.$line.width();
            if (left + this.$pagePositionLabel.outerWidth(true) > lineWidth) {
                left -= this.$pagePositionLabel.outerWidth(true);
                this.$pagePositionLabel.removeClass('right');
                this.$pagePositionLabel.addClass('left');
            }
            else {
                this.$pagePositionLabel.removeClass('left');
                this.$pagePositionLabel.addClass('right');
            }
            this.$pagePositionLabel.css({
                top: top,
                left: left
            });
        };
        FooterPanel.prototype.clearSearchResults = function () {
            this.extension.searchResults = [];
            // clear all existing placemarkers
            var placemarkers = this.getSearchResultPlacemarkers();
            placemarkers.remove();
            // clear search input field.
            this.$searchText.val(this.content.enterKeyword);
            // hide pager.
            this.$searchContainer.show();
            this.$searchPagerContainer.hide();
            // set focus to search box.
            this.$searchText.focus();
        };
        FooterPanel.prototype.getPageLineRatio = function () {
            var lineWidth = this.$line.width();
            // find page/width ratio by dividing the line width by the number of pages in the book.
            if (this.extension.helper.getTotalCanvases() === 1)
                return 0;
            return lineWidth / (this.extension.helper.getTotalCanvases() - 1);
        };
        FooterPanel.prototype.canvasIndexChanged = function () {
            this.setPageMarkerPosition();
            this.setPlacemarkerLabel();
        };
        FooterPanel.prototype.settingsChanged = function () {
            this.setPlacemarkerLabel();
        };
        FooterPanel.prototype.setPlacemarkerLabel = function () {
            var displaying = this.content.displaying;
            var index = this.extension.helper.canvasIndex;
            if (this.isPageModeEnabled()) {
                var canvas = this.extension.helper.getCanvasByIndex(index);
                var label = Manifesto.TranslationCollection.getValue(canvas.getLabel());
                if (label === "") {
                    label = this.content.defaultLabel;
                }
                var lastCanvasOrderLabel = this.extension.helper.getLastCanvasLabel(true);
                this.$pagePositionLabel.html(String.format(displaying, this.content.page, this.extension.sanitize(label), this.extension.sanitize(lastCanvasOrderLabel)));
            }
            else {
                this.$pagePositionLabel.html(String.format(displaying, this.content.image, index + 1, this.extension.helper.getTotalCanvases()));
            }
        };
        FooterPanel.prototype.isPageModeEnabled = function () {
            return this.config.options.pageModeEnabled && this.extension.getMode().toString() === Mode_1.Mode.page.toString();
        };
        FooterPanel.prototype.showSearchSpinner = function () {
            this.$searchText.addClass('searching');
        };
        FooterPanel.prototype.hideSearchSpinner = function () {
            this.$searchText.removeClass('searching');
        };
        FooterPanel.prototype.displaySearchResults = function (terms, results) {
            if (!results)
                return;
            this.hideSearchSpinner();
            this.positionSearchResultPlacemarkers();
            // show pager.
            this.$searchContainer.hide();
            this.$searchPagerControls.css({
                'left': 0
            });
            var $number = this.$searchPagerContainer.find('.number');
            $number.text(this.extension.getTotalSearchResultRects());
            var foundFor = this.$searchResultsInfo.find('.foundFor');
            if (results.length === 1) {
                foundFor.html(this.content.resultFoundFor);
            }
            else {
                foundFor.html(this.content.resultsFoundFor);
            }
            var $terms = this.$searchPagerContainer.find('.terms');
            $terms.html(Utils.Strings.ellipsis(terms, this.options.elideResultsTermsCount));
            $terms.prop('title', terms);
            this.$searchPagerContainer.show();
            this.resize();
        };
        FooterPanel.prototype.resize = function () {
            _super.prototype.resize.call(this);
            var searchResults = this.extension.searchResults;
            if (searchResults && searchResults.length) {
                this.positionSearchResultPlacemarkers();
            }
            this.setPageMarkerPosition();
            this.$searchPagerContainer.width(this.$element.width());
            var center = this.$element.width() / 2;
            // position search pager controls.
            this.$searchPagerControls.css({
                'left': center - (this.$searchPagerControls.width() / 2)
            });
            // position search input.
            this.$searchOptions.css({
                'left': center - (this.$searchOptions.outerWidth() / 2)
            });
        };
        return FooterPanel;
    }(FooterPanel_1.FooterPanel));
    exports.FooterPanel = FooterPanel;
});
//# sourceMappingURL=FooterPanel.js.map;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define('modules/uv-dialogues-module/HelpDialogue',["require", "exports", "../uv-shared-module/BaseCommands", "../uv-shared-module/Dialogue"], function (require, exports, BaseCommands_1, Dialogue_1) {
    "use strict";
    var HelpDialogue = (function (_super) {
        __extends(HelpDialogue, _super);
        function HelpDialogue($element) {
            return _super.call(this, $element) || this;
        }
        HelpDialogue.prototype.create = function () {
            var _this = this;
            this.setConfig('helpDialogue');
            _super.prototype.create.call(this);
            this.openCommand = BaseCommands_1.BaseCommands.SHOW_HELP_DIALOGUE;
            this.closeCommand = BaseCommands_1.BaseCommands.HIDE_HELP_DIALOGUE;
            $.subscribe(this.openCommand, function (e, params) {
                _this.open();
            });
            $.subscribe(this.closeCommand, function (e) {
                _this.close();
            });
            this.$title = $('<h1></h1>');
            this.$content.append(this.$title);
            this.$scroll = $('<div class="scroll"></div>');
            this.$content.append(this.$scroll);
            this.$message = $('<p></p>');
            this.$scroll.append(this.$message);
            // initialise ui.
            this.$title.text(this.content.title);
            this.$message.html(this.content.text);
            // ensure anchor tags link to _blank.
            this.$message.targetBlank();
            this.$element.hide();
        };
        HelpDialogue.prototype.resize = function () {
            _super.prototype.resize.call(this);
        };
        return HelpDialogue;
    }(Dialogue_1.Dialogue));
    exports.HelpDialogue = HelpDialogue;
});
//# sourceMappingURL=HelpDialogue.js.map;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define('modules/uv-dialogues-module/MoreInfoDialogue',["require", "exports", "../uv-shared-module/BaseCommands", "../uv-shared-module/Dialogue"], function (require, exports, BaseCommands_1, Dialogue_1) {
    "use strict";
    var MoreInfoDialogue = (function (_super) {
        __extends(MoreInfoDialogue, _super);
        function MoreInfoDialogue($element) {
            return _super.call(this, $element) || this;
        }
        MoreInfoDialogue.prototype.create = function () {
            var _this = this;
            this.setConfig('moreInfoDialogue');
            _super.prototype.create.call(this);
            this.openCommand = BaseCommands_1.BaseCommands.SHOW_MOREINFO_DIALOGUE;
            this.closeCommand = BaseCommands_1.BaseCommands.HIDE_MOREINFO_DIALOGUE;
            $.subscribe(this.openCommand, function (e, $triggerButton) {
                _this.open($triggerButton);
            });
            $.subscribe(this.closeCommand, function (e) {
                _this.close();
            });
            this.config.content = this.extension.config.modules.moreInfoRightPanel.content;
            this.config.options = this.extension.config.modules.moreInfoRightPanel.options;
            // create ui
            this.$title = $('<h1>' + this.config.content.title + '</h1>');
            this.$content.append(this.$title);
            this.$metadata = $('<div class="iiif-metadata-component"></div>');
            this.$content.append(this.$metadata);
            this.component = new IIIFComponents.MetadataComponent({
                target: this.$metadata[0],
                data: this._getData()
            });
            // hide
            this.$element.hide();
        };
        MoreInfoDialogue.prototype.open = function ($triggerButton) {
            _super.prototype.open.call(this, $triggerButton);
            this.component.set(null); // todo: should be passing data
        };
        MoreInfoDialogue.prototype._getData = function () {
            var _this = this;
            return {
                canvasDisplayOrder: this.config.options.canvasDisplayOrder,
                canvases: this.extension.getCurrentCanvases(),
                canvasExclude: this.config.options.canvasExclude,
                canvasLabels: this.extension.getCanvasLabels(this.content.page),
                content: this.config.content,
                copiedMessageDuration: 2000,
                copyToClipboardEnabled: Utils.Bools.getBool(this.config.options.copyToClipboardEnabled, false),
                helper: this.extension.helper,
                licenseFormatter: null,
                limit: this.config.options.textLimit || 4,
                limitType: IIIFComponents.MetadataComponentOptions.LimitType.LINES,
                manifestDisplayOrder: this.config.options.manifestDisplayOrder,
                manifestExclude: this.config.options.manifestExclude,
                range: this.extension.getCurrentCanvasRange(),
                rtlLanguageCodes: this.config.options.rtlLanguageCodes,
                sanitizer: function (html) {
                    return _this.extension.sanitize(html);
                },
                showAllLanguages: this.config.options.showAllLanguages
            };
        };
        MoreInfoDialogue.prototype.close = function () {
            _super.prototype.close.call(this);
        };
        MoreInfoDialogue.prototype.resize = function () {
            this.setDockedPosition();
        };
        return MoreInfoDialogue;
    }(Dialogue_1.Dialogue));
    exports.MoreInfoDialogue = MoreInfoDialogue;
});
//# sourceMappingURL=MoreInfoDialogue.js.map;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define('modules/uv-shared-module/RightPanel',["require", "exports", "./BaseCommands", "./BaseExpandPanel"], function (require, exports, BaseCommands_1, BaseExpandPanel_1) {
    "use strict";
    var RightPanel = (function (_super) {
        __extends(RightPanel, _super);
        function RightPanel($element) {
            return _super.call(this, $element) || this;
        }
        RightPanel.prototype.create = function () {
            _super.prototype.create.call(this);
            this.$element.width(this.options.panelCollapsedWidth);
        };
        RightPanel.prototype.init = function () {
            var _this = this;
            _super.prototype.init.call(this);
            var shouldOpenPanel = Utils.Bools.getBool(this.extension.getSettings().rightPanelOpen, this.options.panelOpen);
            if (shouldOpenPanel) {
                this.toggle(true);
            }
            $.subscribe(BaseCommands_1.BaseCommands.TOGGLE_EXPAND_RIGHT_PANEL, function () {
                if (_this.isFullyExpanded) {
                    _this.collapseFull();
                }
                else {
                    _this.expandFull();
                }
            });
        };
        RightPanel.prototype.getTargetWidth = function () {
            return this.isExpanded ? this.options.panelCollapsedWidth : this.options.panelExpandedWidth;
        };
        RightPanel.prototype.getTargetLeft = function () {
            return this.isExpanded ? this.$element.parent().width() - this.options.panelCollapsedWidth : this.$element.parent().width() - this.options.panelExpandedWidth;
        };
        RightPanel.prototype.toggleFinish = function () {
            _super.prototype.toggleFinish.call(this);
            if (this.isExpanded) {
                $.publish(BaseCommands_1.BaseCommands.OPEN_RIGHT_PANEL);
            }
            else {
                $.publish(BaseCommands_1.BaseCommands.CLOSE_RIGHT_PANEL);
            }
            this.extension.updateSettings({ rightPanelOpen: this.isExpanded });
        };
        RightPanel.prototype.resize = function () {
            _super.prototype.resize.call(this);
            this.$element.css({
                'left': Math.floor(this.$element.parent().width() - this.$element.outerWidth())
            });
        };
        return RightPanel;
    }(BaseExpandPanel_1.BaseExpandPanel));
    exports.RightPanel = RightPanel;
});
//# sourceMappingURL=RightPanel.js.map;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define('modules/uv-moreinforightpanel-module/MoreInfoRightPanel',["require", "exports", "../uv-shared-module/BaseCommands", "../uv-shared-module/RightPanel"], function (require, exports, BaseCommands_1, RightPanel_1) {
    "use strict";
    var MoreInfoRightPanel = (function (_super) {
        __extends(MoreInfoRightPanel, _super);
        function MoreInfoRightPanel($element) {
            return _super.call(this, $element) || this;
        }
        MoreInfoRightPanel.prototype.create = function () {
            var _this = this;
            this.setConfig('moreInfoRightPanel');
            _super.prototype.create.call(this);
            $.subscribe(BaseCommands_1.BaseCommands.CANVAS_INDEX_CHANGED, function (e, canvasIndex) {
                _this.databind();
            });
            this.setTitle(this.config.content.title);
            this.$metadata = $('<div class="iiif-metadata-component"></div>');
            this.$main.append(this.$metadata);
            this.component = new IIIFComponents.MetadataComponent({
                target: this.$metadata[0],
                data: this._getData()
            });
        };
        MoreInfoRightPanel.prototype.toggleFinish = function () {
            _super.prototype.toggleFinish.call(this);
            this.databind();
        };
        MoreInfoRightPanel.prototype.databind = function () {
            this.component.options.data = this._getData();
            this.component.set(null); // todo: should be passing data
        };
        MoreInfoRightPanel.prototype._getData = function () {
            var _this = this;
            return {
                canvasDisplayOrder: this.config.options.canvasDisplayOrder,
                canvases: this.extension.getCurrentCanvases(),
                canvasExclude: this.config.options.canvasExclude,
                canvasLabels: this.extension.getCanvasLabels(this.content.page),
                content: this.config.content,
                copiedMessageDuration: 2000,
                copyToClipboardEnabled: Utils.Bools.getBool(this.config.options.copyToClipboardEnabled, false),
                helper: this.extension.helper,
                licenseFormatter: null,
                limit: this.config.options.textLimit || 4,
                limitType: IIIFComponents.MetadataComponentOptions.LimitType.LINES,
                manifestDisplayOrder: this.config.options.manifestDisplayOrder,
                manifestExclude: this.config.options.manifestExclude,
                range: this.extension.getCurrentCanvasRange(),
                rtlLanguageCodes: this.config.options.rtlLanguageCodes,
                sanitizer: function (html) {
                    return _this.extension.sanitize(html);
                },
                showAllLanguages: this.config.options.showAllLanguages
            };
        };
        MoreInfoRightPanel.prototype.resize = function () {
            _super.prototype.resize.call(this);
            this.$main.height(this.$element.height() - this.$top.height() - this.$main.verticalMargins());
        };
        return MoreInfoRightPanel;
    }(RightPanel_1.RightPanel));
    exports.MoreInfoRightPanel = MoreInfoRightPanel;
});
//# sourceMappingURL=MoreInfoRightPanel.js.map;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define('modules/uv-multiselectdialogue-module/MultiSelectDialogue',["require", "exports", "../../extensions/uv-seadragon-extension/Commands", "../../modules/uv-shared-module/Dialogue", "../../extensions/uv-seadragon-extension/Mode"], function (require, exports, Commands_1, Dialogue_1, Mode_1) {
    "use strict";
    var MultiSelectDialogue = (function (_super) {
        __extends(MultiSelectDialogue, _super);
        function MultiSelectDialogue($element) {
            return _super.call(this, $element) || this;
        }
        MultiSelectDialogue.prototype.create = function () {
            var _this = this;
            this.setConfig('multiSelectDialogue');
            _super.prototype.create.call(this);
            var that = this;
            this.openCommand = Commands_1.Commands.SHOW_MULTISELECT_DIALOGUE;
            this.closeCommand = Commands_1.Commands.HIDE_MULTISELECT_DIALOGUE;
            $.subscribe(this.openCommand, function (e, params) {
                _this.open();
                var multiSelectState = _this.extension.helper.getMultiSelectState();
                multiSelectState.setEnabled(true);
                _this.component.set(null); // todo: should be passing data
            });
            $.subscribe(this.closeCommand, function (e) {
                _this.close();
                var multiSelectState = _this.extension.helper.getMultiSelectState();
                multiSelectState.setEnabled(false);
            });
            this.$title = $('<h1></h1>');
            this.$content.append(this.$title);
            this.$title.text(this.content.title);
            this.$gallery = $('<div class="iiif-gallery-component"></div>');
            this.$content.append(this.$gallery);
            this.data = {
                helper: this.extension.helper,
                chunkedResizingThreshold: this.config.options.galleryThumbChunkedResizingThreshold,
                content: this.config.content,
                debug: false,
                imageFadeInDuration: 300,
                initialZoom: 4,
                minLabelWidth: 20,
                pageModeEnabled: this.isPageModeEnabled(),
                searchResults: [],
                scrollStopDuration: 100,
                sizingEnabled: true,
                thumbHeight: this.config.options.galleryThumbHeight,
                thumbLoadPadding: this.config.options.galleryThumbLoadPadding,
                thumbWidth: this.config.options.galleryThumbWidth,
                viewingDirection: this.extension.helper.getViewingDirection()
            };
            this.component = new IIIFComponents.GalleryComponent({
                target: this.$gallery[0],
                data: this.data
            });
            var $selectButton = this.$gallery.find('a.select');
            $selectButton.addClass('btn btn-primary');
            this.component.on('multiSelectionMade', function (args) {
                var ids = args[0];
                $.publish(Commands_1.Commands.MULTISELECTION_MADE, [ids]);
                that.close();
            });
            this.$element.hide();
        };
        MultiSelectDialogue.prototype.isPageModeEnabled = function () {
            return Utils.Bools.getBool(this.config.options.pageModeEnabled, true) && this.extension.getMode().toString() === Mode_1.Mode.page.toString();
        };
        MultiSelectDialogue.prototype.open = function () {
            _super.prototype.open.call(this);
        };
        MultiSelectDialogue.prototype.close = function () {
            _super.prototype.close.call(this);
        };
        MultiSelectDialogue.prototype.resize = function () {
            _super.prototype.resize.call(this);
            var $main = this.$gallery.find('.main');
            var $header = this.$gallery.find('.header');
            $main.height(this.$content.height() - this.$title.outerHeight() - this.$title.verticalMargins() - $header.height());
        };
        return MultiSelectDialogue;
    }(Dialogue_1.Dialogue));
    exports.MultiSelectDialogue = MultiSelectDialogue;
});
//# sourceMappingURL=MultiSelectDialogue.js.map;
define('extensions/uv-seadragon-extension/MultiSelectionArgs',["require", "exports"], function (require, exports) {
    "use strict";
    var MultiSelectionArgs = (function () {
        function MultiSelectionArgs() {
        }
        return MultiSelectionArgs;
    }());
    exports.MultiSelectionArgs = MultiSelectionArgs;
});
//# sourceMappingURL=MultiSelectionArgs.js.map;
define('modules/uv-shared-module/Information',["require", "exports"], function (require, exports) {
    "use strict";
    var Information = (function () {
        function Information(message, actions) {
            this.message = message;
            this.actions = actions;
        }
        return Information;
    }());
    exports.Information = Information;
});
//# sourceMappingURL=Information.js.map;
define('modules/uv-shared-module/InformationAction',["require", "exports"], function (require, exports) {
    "use strict";
    var InformationAction = (function () {
        function InformationAction() {
        }
        return InformationAction;
    }());
    exports.InformationAction = InformationAction;
});
//# sourceMappingURL=InformationAction.js.map;
define('modules/uv-shared-module/InformationFactory',["require", "exports", "./BaseCommands", "./Information", "./InformationAction", "./InformationType"], function (require, exports, BaseCommands_1, Information_1, InformationAction_1, InformationType_1) {
    "use strict";
    var InformationFactory = (function () {
        function InformationFactory(extension) {
            this.extension = extension;
        }
        InformationFactory.prototype.Get = function (args) {
            switch (args.informationType) {
                case (InformationType_1.InformationType.AUTH_CORS_ERROR):
                    return new Information_1.Information(this.extension.config.content.authCORSError, []);
                case (InformationType_1.InformationType.DEGRADED_RESOURCE):
                    var actions = [];
                    var loginAction = new InformationAction_1.InformationAction();
                    loginAction.label = this.extension.config.content.degradedResourceLogin;
                    loginAction.action = function () {
                        $.publish(BaseCommands_1.BaseCommands.HIDE_INFORMATION);
                        $.publish(BaseCommands_1.BaseCommands.OPEN_EXTERNAL_RESOURCE, [[args.param]]);
                    };
                    actions.push(loginAction);
                    return new Information_1.Information(this.extension.config.content.degradedResourceMessage, actions);
            }
        };
        return InformationFactory;
    }());
    exports.InformationFactory = InformationFactory;
});
//# sourceMappingURL=InformationFactory.js.map;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define('modules/uv-shared-module/HeaderPanel',["require", "exports", "./BaseCommands", "./BaseView", "../uv-shared-module/InformationFactory"], function (require, exports, BaseCommands_1, BaseView_1, InformationFactory_1) {
    "use strict";
    var HeaderPanel = (function (_super) {
        __extends(HeaderPanel, _super);
        function HeaderPanel($element) {
            return _super.call(this, $element, false, false) || this;
        }
        HeaderPanel.prototype.create = function () {
            var _this = this;
            this.setConfig('headerPanel');
            _super.prototype.create.call(this);
            $.subscribe(BaseCommands_1.BaseCommands.SHOW_INFORMATION, function (e, args) {
                _this.showInformation(args);
            });
            $.subscribe(BaseCommands_1.BaseCommands.HIDE_INFORMATION, function () {
                _this.hideInformation();
            });
            this.$options = $('<div class="options"></div>');
            this.$element.append(this.$options);
            this.$centerOptions = $('<div class="centerOptions"></div>');
            this.$options.append(this.$centerOptions);
            this.$rightOptions = $('<div class="rightOptions"></div>');
            this.$options.append(this.$rightOptions);
            //this.$helpButton = $('<a href="#" class="action help">' + this.content.help + '</a>');
            //this.$rightOptions.append(this.$helpButton);
            this.$localeToggleButton = $('<a class="localeToggle" tabindex="0"></a>');
            this.$rightOptions.append(this.$localeToggleButton);
            this.$settingsButton = $('<a class="imageBtn settings" tabindex="0"></a>');
            this.$settingsButton.attr('title', this.content.settings);
            this.$rightOptions.append(this.$settingsButton);
            this.$informationBox = $('<div class="informationBox"> \
                                    <div class="message"></div> \
                                    <div class="actions"></div> \
                                    <div class="close"></div> \
                                  </div>');
            this.$element.append(this.$informationBox);
            this.$informationBox.hide();
            this.$informationBox.find('.close').attr('title', this.content.close);
            this.$informationBox.find('.close').on('click', function (e) {
                e.preventDefault();
                $.publish(BaseCommands_1.BaseCommands.HIDE_INFORMATION);
            });
            this.$localeToggleButton.on('click', function () {
                _this.extension.changeLocale(String(_this.$localeToggleButton.data('locale')));
            });
            this.$settingsButton.onPressed(function () {
                $.publish(BaseCommands_1.BaseCommands.SHOW_SETTINGS_DIALOGUE);
            });
            this.updateLocaleToggle();
            this.updateSettingsButton();
        };
        HeaderPanel.prototype.updateLocaleToggle = function () {
            if (!this.localeToggleIsVisible()) {
                this.$localeToggleButton.hide();
                return;
            }
            var alternateLocale = this.extension.getAlternateLocale();
            var text = alternateLocale.name.split('-')[0].toUpperCase();
            this.$localeToggleButton.data('locale', alternateLocale.name);
            this.$localeToggleButton.attr('title', alternateLocale.label);
            this.$localeToggleButton.text(text);
        };
        HeaderPanel.prototype.updateSettingsButton = function () {
            var settingsEnabled = Utils.Bools.getBool(this.options.settingsButtonEnabled, true);
            if (!settingsEnabled) {
                this.$settingsButton.hide();
            }
            else {
                this.$settingsButton.show();
            }
        };
        HeaderPanel.prototype.localeToggleIsVisible = function () {
            return this.extension.getLocales().length > 1 && Utils.Bools.getBool(this.options.localeToggleEnabled, false);
        };
        HeaderPanel.prototype.showInformation = function (args) {
            var informationFactory = new InformationFactory_1.InformationFactory(this.extension);
            this.information = informationFactory.Get(args);
            var $message = this.$informationBox.find('.message');
            $message.html(this.information.message).find('a').attr('target', '_top');
            var $actions = this.$informationBox.find('.actions');
            $actions.empty();
            for (var i = 0; i < this.information.actions.length; i++) {
                var action = this.information.actions[i];
                var $action = $('<a href="#" class="btn btn-default">' + action.label + '</a>');
                $action.on('click', action.action);
                $actions.append($action);
            }
            this.$informationBox.show();
            this.$element.addClass('showInformation');
            this.extension.resize();
        };
        HeaderPanel.prototype.hideInformation = function () {
            this.$element.removeClass('showInformation');
            this.$informationBox.hide();
            this.extension.resize();
        };
        HeaderPanel.prototype.getSettings = function () {
            return this.extension.getSettings();
        };
        HeaderPanel.prototype.updateSettings = function (settings) {
            this.extension.updateSettings(settings);
            $.publish(BaseCommands_1.BaseCommands.UPDATE_SETTINGS, [settings]);
        };
        HeaderPanel.prototype.resize = function () {
            _super.prototype.resize.call(this);
            var headerWidth = this.$element.width();
            var center = headerWidth / 2;
            var containerWidth = this.$centerOptions.outerWidth();
            var pos = center - (containerWidth / 2);
            this.$centerOptions.css({
                left: pos
            });
            if (this.$informationBox.is(':visible')) {
                var $actions = this.$informationBox.find('.actions');
                var $message = this.$informationBox.find('.message');
                $message.width(this.$element.width() - $message.horizontalMargins() - $actions.outerWidth(true) - this.$informationBox.find('.close').outerWidth(true) - 1);
                $message.ellipsisFill(this.information.message);
            }
            // hide toggle buttons below minimum width
            if (this.extension.width() < this.extension.config.options.minWidthBreakPoint) {
                if (this.localeToggleIsVisible())
                    this.$localeToggleButton.hide();
            }
            else {
                if (this.localeToggleIsVisible())
                    this.$localeToggleButton.show();
            }
        };
        return HeaderPanel;
    }(BaseView_1.BaseView));
    exports.HeaderPanel = HeaderPanel;
});
//# sourceMappingURL=HeaderPanel.js.map;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define('modules/uv-pagingheaderpanel-module/PagingHeaderPanel',["require", "exports", "../uv-shared-module/AutoComplete", "../uv-shared-module/BaseCommands", "../../extensions/uv-seadragon-extension/Commands", "../uv-shared-module/HeaderPanel", "../../extensions/uv-seadragon-extension/Mode"], function (require, exports, AutoComplete_1, BaseCommands_1, Commands_1, HeaderPanel_1, Mode_1) {
    "use strict";
    var PagingHeaderPanel = (function (_super) {
        __extends(PagingHeaderPanel, _super);
        function PagingHeaderPanel($element) {
            var _this = _super.call(this, $element) || this;
            _this.firstButtonEnabled = false;
            _this.lastButtonEnabled = false;
            _this.nextButtonEnabled = false;
            _this.prevButtonEnabled = false;
            return _this;
        }
        PagingHeaderPanel.prototype.create = function () {
            var _this = this;
            this.setConfig('pagingHeaderPanel');
            _super.prototype.create.call(this);
            $.subscribe(BaseCommands_1.BaseCommands.CANVAS_INDEX_CHANGED, function (e, canvasIndex) {
                _this.canvasIndexChanged(canvasIndex);
            });
            $.subscribe(BaseCommands_1.BaseCommands.SETTINGS_CHANGED, function (e) {
                _this.modeChanged();
                _this.updatePagingToggle();
            });
            $.subscribe(BaseCommands_1.BaseCommands.CANVAS_INDEX_CHANGE_FAILED, function (e) {
                _this.setSearchFieldValue(_this.extension.helper.canvasIndex);
            });
            $.subscribe(BaseCommands_1.BaseCommands.LEFTPANEL_EXPAND_FULL_START, function (e) {
                _this.openGallery();
            });
            $.subscribe(BaseCommands_1.BaseCommands.LEFTPANEL_COLLAPSE_FULL_START, function (e) {
                _this.closeGallery();
            });
            this.$prevOptions = $('<div class="prevOptions"></div>');
            this.$centerOptions.append(this.$prevOptions);
            this.$firstButton = $('<a class="imageBtn first" tabindex="0"></a>');
            this.$prevOptions.append(this.$firstButton);
            this.$prevButton = $('<a class="imageBtn prev" tabindex="0"></a>');
            this.$prevOptions.append(this.$prevButton);
            this.$modeOptions = $('<div class="mode"></div>');
            this.$centerOptions.append(this.$modeOptions);
            this.$imageModeLabel = $('<label for="image">' + this.content.image + '</label>');
            this.$modeOptions.append(this.$imageModeLabel);
            this.$imageModeOption = $('<input type="radio" id="image" name="mode" tabindex="0"/>');
            this.$modeOptions.append(this.$imageModeOption);
            this.$pageModeLabel = $('<label for="page"></label>');
            this.$modeOptions.append(this.$pageModeLabel);
            this.$pageModeOption = $('<input type="radio" id="page" name="mode" tabindex="0"/>');
            this.$modeOptions.append(this.$pageModeOption);
            this.$search = $('<div class="search"></div>');
            this.$centerOptions.append(this.$search);
            this.$searchText = $('<input class="searchText" maxlength="50" type="text" tabindex="0"/>');
            this.$search.append(this.$searchText);
            if (Utils.Bools.getBool(this.options.autoCompleteBoxEnabled, true)) {
                this.$searchText.hide();
                this.$autoCompleteBox = $('<input class="autocompleteText" type="text" maxlength="100" />');
                this.$search.append(this.$autoCompleteBox);
                new AutoComplete_1.AutoComplete(this.$autoCompleteBox, function (term, cb) {
                    var results = [];
                    var canvases = _this.extension.helper.getCanvases();
                    // if in page mode, get canvases by label.
                    if (_this.isPageModeEnabled()) {
                        for (var i = 0; i < canvases.length; i++) {
                            var canvas = canvases[i];
                            var label = Manifesto.TranslationCollection.getValue(canvas.getLabel());
                            if (label.startsWith(term)) {
                                results.push(label);
                            }
                        }
                    }
                    else {
                        // get canvas by index
                        for (var i = 0; i < canvases.length; i++) {
                            var canvas = canvases[i];
                            if (canvas.index.toString().startsWith(term)) {
                                results.push(canvas.index.toString());
                            }
                        }
                    }
                    cb(results);
                }, function (results) {
                    return results;
                }, function (terms) {
                    _this.search(terms);
                }, 300, 0);
            }
            else if (Utils.Bools.getBool(this.options.imageSelectionBoxEnabled, true)) {
                this.$selectionBoxOptions = $('<div class="image-selectionbox-options"></div>');
                this.$centerOptions.append(this.$selectionBoxOptions);
                this.$imageSelectionBox = $('<select class="image-selectionbox" name="image-select" tabindex="0" ></select>');
                this.$selectionBoxOptions.append(this.$imageSelectionBox);
                for (var imageIndex = 0; imageIndex < this.extension.helper.getTotalCanvases(); imageIndex++) {
                    var canvas = this.extension.helper.getCanvasByIndex(imageIndex);
                    var label = this.extension.sanitize(Manifesto.TranslationCollection.getValue(canvas.getLabel()));
                    this.$imageSelectionBox.append('<option value=' + (imageIndex) + '>' + label + '</option>');
                }
                this.$imageSelectionBox.change(function () {
                    var imageIndex = parseInt(_this.$imageSelectionBox.val());
                    $.publish(Commands_1.Commands.IMAGE_SEARCH, [imageIndex]);
                });
            }
            this.$total = $('<span class="total"></span>');
            this.$search.append(this.$total);
            this.$searchButton = $('<a class="go btn btn-primary" tabindex="0">' + this.content.go + '</a>');
            this.$search.append(this.$searchButton);
            this.$nextOptions = $('<div class="nextOptions"></div>');
            this.$centerOptions.append(this.$nextOptions);
            this.$nextButton = $('<a class="imageBtn next" tabindex="0"></a>');
            this.$nextOptions.append(this.$nextButton);
            this.$lastButton = $('<a class="imageBtn last" tabindex="0"></a>');
            this.$nextOptions.append(this.$lastButton);
            if (this.isPageModeEnabled()) {
                this.$pageModeOption.attr('checked', 'checked');
                this.$pageModeOption.removeAttr('disabled');
                this.$pageModeLabel.removeClass('disabled');
            }
            else {
                this.$imageModeOption.attr('checked', 'checked');
                // disable page mode option.
                this.$pageModeOption.attr('disabled', 'disabled');
                this.$pageModeLabel.addClass('disabled');
            }
            if (this.extension.helper.getManifestType().toString() === manifesto.ManifestType.manuscript().toString()) {
                this.$pageModeLabel.text(this.content.folio);
            }
            else {
                this.$pageModeLabel.text(this.content.page);
            }
            this.$galleryButton = $('<a class="imageBtn gallery" title="' + this.content.gallery + '" tabindex="0"></a>');
            this.$rightOptions.prepend(this.$galleryButton);
            this.$pagingToggleButtons = $('<div class="pagingToggleButtons"></div>');
            this.$rightOptions.prepend(this.$pagingToggleButtons);
            this.$oneUpButton = $('<a class="imageBtn one-up" title="' + this.content.oneUp + '" tabindex="0"></a>');
            this.$pagingToggleButtons.append(this.$oneUpButton);
            this.$twoUpButton = $('<a class="imageBtn two-up" title="' + this.content.twoUp + '" tabindex="0"></a>');
            this.$pagingToggleButtons.append(this.$twoUpButton);
            this.updatePagingToggle();
            this.updateGalleryButton();
            this.$oneUpButton.onPressed(function () {
                var enabled = false;
                _this.updateSettings({ pagingEnabled: enabled });
                $.publish(Commands_1.Commands.PAGING_TOGGLED, [enabled]);
            });
            this.$twoUpButton.onPressed(function () {
                var enabled = true;
                _this.updateSettings({ pagingEnabled: enabled });
                $.publish(Commands_1.Commands.PAGING_TOGGLED, [enabled]);
            });
            this.$galleryButton.onPressed(function () {
                $.publish(BaseCommands_1.BaseCommands.TOGGLE_EXPAND_LEFT_PANEL);
            });
            this.setTitles();
            this.setTotal();
            var viewingDirection = this.extension.helper.getViewingDirection();
            // check if the book has more than one page, otherwise hide prev/next options.
            if (this.extension.helper.getTotalCanvases() === 1) {
                this.$centerOptions.hide();
            }
            // ui event handlers.
            this.$firstButton.onPressed(function () {
                switch (viewingDirection.toString()) {
                    case manifesto.ViewingDirection.leftToRight().toString():
                    case manifesto.ViewingDirection.topToBottom().toString():
                    case manifesto.ViewingDirection.bottomToTop().toString():
                        $.publish(Commands_1.Commands.FIRST);
                        break;
                    case manifesto.ViewingDirection.rightToLeft().toString():
                        $.publish(Commands_1.Commands.LAST);
                        break;
                }
            });
            this.$prevButton.onPressed(function () {
                switch (viewingDirection.toString()) {
                    case manifesto.ViewingDirection.leftToRight().toString():
                    case manifesto.ViewingDirection.bottomToTop().toString():
                    case manifesto.ViewingDirection.topToBottom().toString():
                        $.publish(Commands_1.Commands.PREV);
                        break;
                    case manifesto.ViewingDirection.rightToLeft().toString():
                        $.publish(Commands_1.Commands.NEXT);
                        break;
                }
            });
            this.$nextButton.onPressed(function () {
                switch (viewingDirection.toString()) {
                    case manifesto.ViewingDirection.leftToRight().toString():
                    case manifesto.ViewingDirection.bottomToTop().toString():
                    case manifesto.ViewingDirection.topToBottom().toString():
                        $.publish(Commands_1.Commands.NEXT);
                        break;
                    case manifesto.ViewingDirection.rightToLeft().toString():
                        $.publish(Commands_1.Commands.PREV);
                        break;
                }
            });
            this.$lastButton.onPressed(function () {
                switch (viewingDirection.toString()) {
                    case manifesto.ViewingDirection.leftToRight().toString():
                    case manifesto.ViewingDirection.topToBottom().toString():
                    case manifesto.ViewingDirection.bottomToTop().toString():
                        $.publish(Commands_1.Commands.LAST);
                        break;
                    case manifesto.ViewingDirection.rightToLeft().toString():
                        $.publish(Commands_1.Commands.FIRST);
                        break;
                }
            });
            // If page mode is disabled, we don't need to show radio buttons since
            // there is only one option:
            if (!this.config.options.pageModeEnabled) {
                this.$imageModeOption.hide();
                this.$pageModeLabel.hide();
                this.$pageModeOption.hide();
            }
            else {
                // Only activate click actions for mode buttons when controls are
                // visible, since otherwise, clicking on the "Image" label can
                // trigger unexpected/undesired side effects.
                this.$imageModeOption.on('click', function (e) {
                    $.publish(Commands_1.Commands.MODE_CHANGED, [Mode_1.Mode.image.toString()]);
                });
                this.$pageModeOption.on('click', function (e) {
                    $.publish(Commands_1.Commands.MODE_CHANGED, [Mode_1.Mode.page.toString()]);
                });
            }
            this.$searchText.onEnter(function () {
                _this.$searchText.blur();
                _this.search(_this.$searchText.val());
            });
            this.$searchText.click(function () {
                $(this).select();
            });
            this.$searchButton.onPressed(function () {
                if (_this.options.autoCompleteBoxEnabled) {
                    _this.search(_this.$autoCompleteBox.val());
                }
                else {
                    _this.search(_this.$searchText.val());
                }
            });
            if (this.options.modeOptionsEnabled === false) {
                this.$modeOptions.hide();
                this.$centerOptions.addClass('modeOptionsDisabled');
            }
            // Search is shown as default
            if (this.options.imageSelectionBoxEnabled === true && this.options.autoCompleteBoxEnabled !== true) {
                this.$search.hide();
            }
            if (this.options.helpEnabled === false) {
                this.$helpButton.hide();
            }
            // todo: discuss on community call
            // Get visible element in centerOptions with greatest tabIndex
            // var $elementWithGreatestTabIndex: JQuery = this.$centerOptions.getVisibleElementWithGreatestTabIndex();
            // // cycle focus back to start.
            // if ($elementWithGreatestTabIndex) {
            //     $elementWithGreatestTabIndex.blur(() => {
            //         if (this.extension.tabbing && !this.extension.shifted) {
            //             this.$nextButton.focus();
            //         }
            //     });
            // }
            // this.$nextButton.blur(() => {
            //     if (this.extension.tabbing && this.extension.shifted) {
            //         setTimeout(() => {
            //             $elementWithGreatestTabIndex.focus();
            //         }, 100);
            //     }
            // });
            if (!Utils.Bools.getBool(this.options.pagingToggleEnabled, true)) {
                this.$pagingToggleButtons.hide();
            }
        };
        PagingHeaderPanel.prototype.openGallery = function () {
            this.$oneUpButton.removeClass('on');
            this.$twoUpButton.removeClass('on');
            this.$galleryButton.addClass('on');
        };
        PagingHeaderPanel.prototype.closeGallery = function () {
            this.updatePagingToggle();
            this.$galleryButton.removeClass('on');
        };
        PagingHeaderPanel.prototype.isPageModeEnabled = function () {
            return this.config.options.pageModeEnabled && this.extension.getMode().toString() === Mode_1.Mode.page.toString();
        };
        PagingHeaderPanel.prototype.setTitles = function () {
            if (this.isPageModeEnabled()) {
                this.$firstButton.prop('title', this.content.firstPage);
                this.$prevButton.prop('title', this.content.previousPage);
                this.$nextButton.prop('title', this.content.nextPage);
                this.$lastButton.prop('title', this.content.lastPage);
            }
            else {
                this.$firstButton.prop('title', this.content.firstImage);
                this.$prevButton.prop('title', this.content.previousImage);
                this.$nextButton.prop('title', this.content.nextImage);
                this.$lastButton.prop('title', this.content.lastImage);
            }
            this.$searchButton.prop('title', this.content.go);
        };
        PagingHeaderPanel.prototype.updatePagingToggle = function () {
            if (!this.pagingToggleIsVisible()) {
                this.$pagingToggleButtons.hide();
                return;
            }
            if (this.extension.isPagingSettingEnabled()) {
                this.$oneUpButton.removeClass('on');
                this.$twoUpButton.addClass('on');
            }
            else {
                this.$twoUpButton.removeClass('on');
                this.$oneUpButton.addClass('on');
            }
        };
        PagingHeaderPanel.prototype.pagingToggleIsVisible = function () {
            return Utils.Bools.getBool(this.options.pagingToggleEnabled, true) && this.extension.helper.isPagingAvailable();
        };
        PagingHeaderPanel.prototype.updateGalleryButton = function () {
            if (!this.galleryIsVisible()) {
                this.$galleryButton.hide();
            }
        };
        PagingHeaderPanel.prototype.galleryIsVisible = function () {
            return Utils.Bools.getBool(this.options.galleryButtonEnabled, true) && this.extension.isLeftPanelEnabled();
        };
        PagingHeaderPanel.prototype.setTotal = function () {
            var of = this.content.of;
            if (this.isPageModeEnabled()) {
                this.$total.html(String.format(of, this.extension.helper.getLastCanvasLabel(true)));
            }
            else {
                this.$total.html(String.format(of, this.extension.helper.getTotalCanvases()));
            }
        };
        PagingHeaderPanel.prototype.setSearchFieldValue = function (index) {
            var canvas = this.extension.helper.getCanvasByIndex(index);
            var value;
            if (this.isPageModeEnabled()) {
                var orderLabel = Manifesto.TranslationCollection.getValue(canvas.getLabel());
                if (orderLabel === "-") {
                    value = "";
                }
                else {
                    value = orderLabel;
                }
            }
            else {
                index += 1;
                value = index;
            }
            if (this.options.autoCompleteBoxEnabled) {
                this.$autoCompleteBox.val(value);
            }
            else {
                this.$searchText.val(value);
            }
        };
        PagingHeaderPanel.prototype.search = function (value) {
            if (!value) {
                this.extension.showMessage(this.content.emptyValue);
                $.publish(BaseCommands_1.BaseCommands.CANVAS_INDEX_CHANGE_FAILED);
                return;
            }
            if (this.isPageModeEnabled()) {
                $.publish(Commands_1.Commands.PAGE_SEARCH, [value]);
            }
            else {
                var index;
                if (this.options.autoCompleteBoxEnabled) {
                    index = parseInt(this.$autoCompleteBox.val(), 10);
                }
                else {
                    index = parseInt(this.$searchText.val(), 10);
                }
                index -= 1;
                if (isNaN(index)) {
                    this.extension.showMessage(this.extension.config.modules.genericDialogue.content.invalidNumber);
                    $.publish(BaseCommands_1.BaseCommands.CANVAS_INDEX_CHANGE_FAILED);
                    return;
                }
                var asset = this.extension.helper.getCanvasByIndex(index);
                if (!asset) {
                    this.extension.showMessage(this.extension.config.modules.genericDialogue.content.pageNotFound);
                    $.publish(BaseCommands_1.BaseCommands.CANVAS_INDEX_CHANGE_FAILED);
                    return;
                }
                $.publish(Commands_1.Commands.IMAGE_SEARCH, [index]);
            }
        };
        PagingHeaderPanel.prototype.canvasIndexChanged = function (index) {
            this.setSearchFieldValue(index);
            if (this.options.imageSelectionBoxEnabled === true && this.options.autoCompleteBoxEnabled !== true) {
                this.$imageSelectionBox.val(index);
            }
            var viewingDirection = this.extension.helper.getViewingDirection();
            if (viewingDirection.toString() === manifesto.ViewingDirection.rightToLeft().toString()) {
                if (this.extension.helper.isFirstCanvas()) {
                    this.disableLastButton();
                    this.disableNextButton();
                }
                else {
                    this.enableLastButton();
                    this.enableNextButton();
                }
                if (this.extension.helper.isLastCanvas()) {
                    this.disableFirstButton();
                    this.disablePrevButton();
                }
                else {
                    this.enableFirstButton();
                    this.enablePrevButton();
                }
            }
            else {
                if (this.extension.helper.isFirstCanvas()) {
                    this.disableFirstButton();
                    this.disablePrevButton();
                }
                else {
                    this.enableFirstButton();
                    this.enablePrevButton();
                }
                if (this.extension.helper.isLastCanvas()) {
                    this.disableLastButton();
                    this.disableNextButton();
                }
                else {
                    this.enableLastButton();
                    this.enableNextButton();
                }
            }
        };
        PagingHeaderPanel.prototype.disableFirstButton = function () {
            this.firstButtonEnabled = false;
            this.$firstButton.disable();
        };
        PagingHeaderPanel.prototype.enableFirstButton = function () {
            this.firstButtonEnabled = true;
            this.$firstButton.enable();
        };
        PagingHeaderPanel.prototype.disableLastButton = function () {
            this.lastButtonEnabled = false;
            this.$lastButton.disable();
        };
        PagingHeaderPanel.prototype.enableLastButton = function () {
            this.lastButtonEnabled = true;
            this.$lastButton.enable();
        };
        PagingHeaderPanel.prototype.disablePrevButton = function () {
            this.prevButtonEnabled = false;
            this.$prevButton.disable();
        };
        PagingHeaderPanel.prototype.enablePrevButton = function () {
            this.prevButtonEnabled = true;
            this.$prevButton.enable();
        };
        PagingHeaderPanel.prototype.disableNextButton = function () {
            this.nextButtonEnabled = false;
            this.$nextButton.disable();
        };
        PagingHeaderPanel.prototype.enableNextButton = function () {
            this.nextButtonEnabled = true;
            this.$nextButton.enable();
        };
        PagingHeaderPanel.prototype.modeChanged = function () {
            this.setSearchFieldValue(this.extension.helper.canvasIndex);
            this.setTitles();
            this.setTotal();
        };
        PagingHeaderPanel.prototype.resize = function () {
            _super.prototype.resize.call(this);
            // hide toggle buttons below minimum width
            if (this.extension.width() < this.extension.config.options.minWidthBreakPoint) {
                if (this.pagingToggleIsVisible())
                    this.$pagingToggleButtons.hide();
                if (this.galleryIsVisible())
                    this.$galleryButton.hide();
            }
            else {
                if (this.pagingToggleIsVisible())
                    this.$pagingToggleButtons.show();
                if (this.galleryIsVisible())
                    this.$galleryButton.show();
            }
        };
        return PagingHeaderPanel;
    }(HeaderPanel_1.HeaderPanel));
    exports.PagingHeaderPanel = PagingHeaderPanel;
});
//# sourceMappingURL=PagingHeaderPanel.js.map;
define('extensions/uv-seadragon-extension/Bounds',["require", "exports"], function (require, exports) {
    "use strict";
    var Bounds = (function () {
        function Bounds(x, y, w, h) {
            this.x = x;
            this.y = y;
            this.w = w;
            this.h = h;
        }
        Bounds.prototype.toString = function () {
            return this.x + "," + this.y + "," + this.w + "," + this.h;
        };
        Bounds.fromString = function (bounds) {
            var boundsArr = bounds.split(',');
            return new Bounds(Number(boundsArr[0]), Number(boundsArr[1]), Number(boundsArr[2]), Number(boundsArr[3]));
        };
        return Bounds;
    }());
    exports.Bounds = Bounds;
});
//# sourceMappingURL=Bounds.js.map;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define('modules/uv-shared-module/CenterPanel',["require", "exports", "./Shell", "./BaseView"], function (require, exports, Shell_1, BaseView_1) {
    "use strict";
    var CenterPanel = (function (_super) {
        __extends(CenterPanel, _super);
        function CenterPanel($element) {
            return _super.call(this, $element, false, true) || this;
        }
        CenterPanel.prototype.create = function () {
            var _this = this;
            _super.prototype.create.call(this);
            this.$title = $('<div class="title"></div>');
            this.$element.append(this.$title);
            this.$content = $('<div id="content" class="content"></div>');
            this.$element.append(this.$content);
            this.$attribution = $('<div class="attribution">\
                                   <div class="header">\
                                       <div class="title"></div>\
                                       <div class="close"></div>\
                                   </div>\
                                   <div class="main">\
                                       <div class="attribution-text"></div>\
                                       <div class="license"></div>\
                                       <div class="logo"></div>\
                                   </div>\
                              </div>');
            this.$attribution.find('.header .title').text(this.content.attribution);
            this.$content.append(this.$attribution);
            this.$attribution.hide();
            this.$closeAttributionButton = this.$attribution.find('.header .close');
            this.$closeAttributionButton.on('click', function (e) {
                e.preventDefault();
                _this.$attribution.hide();
            });
            if (!Utils.Bools.getBool(this.options.titleEnabled, true)) {
                this.$title.hide();
            }
        };
        CenterPanel.prototype.updateAttribution = function () {
            var _this = this;
            var attribution = this.extension.helper.getAttribution();
            //var license = this.provider.getLicense();
            //var logo = this.provider.getLogo();
            var enabled = Utils.Bools.getBool(this.options.attributionEnabled, true);
            if (!attribution || !enabled) {
                return;
            }
            this.$attribution.show();
            var $attribution = this.$attribution.find('.attribution-text');
            var $license = this.$attribution.find('.license');
            var $logo = this.$attribution.find('.logo');
            $attribution.html(this.extension.sanitize(attribution));
            $attribution.find('img').one("load", function () {
                _this.resize();
            }).each(function () {
                if (this.complete)
                    $(this).load();
            });
            $attribution.targetBlank();
            $attribution.toggleExpandText(this.options.trimAttributionCount, function () {
                _this.resize();
            });
            //if (license){
            //    $license.append('<a href="' + license + '">' + license + '</a>');
            //} else {
            $license.hide();
            //}
            //
            //if (logo){
            //    $logo.append('<img src="' + logo + '"/>');
            //} else {
            $logo.hide();
            //}
        };
        CenterPanel.prototype.resize = function () {
            _super.prototype.resize.call(this);
            var leftPanelWidth = Shell_1.Shell.$leftPanel.is(':visible') ? Math.floor(Shell_1.Shell.$leftPanel.width()) : 0;
            var rightPanelWidth = Shell_1.Shell.$rightPanel.is(':visible') ? Math.floor(Shell_1.Shell.$rightPanel.width()) : 0;
            var width = Math.floor(this.$element.parent().width() - leftPanelWidth - rightPanelWidth);
            this.$element.css({
                'left': leftPanelWidth,
                'width': width
            });
            var titleHeight;
            if (this.options && this.options.titleEnabled === false) {
                titleHeight = 0;
            }
            else {
                titleHeight = this.$title.height();
            }
            this.$content.height(this.$element.height() - titleHeight);
            this.$content.width(this.$element.width());
            if (this.$attribution && this.$attribution.is(':visible')) {
                this.$attribution.css('top', this.$content.height() - this.$attribution.outerHeight() - this.$attribution.verticalMargins());
            }
        };
        return CenterPanel;
    }(BaseView_1.BaseView));
    exports.CenterPanel = CenterPanel;
});
//# sourceMappingURL=CenterPanel.js.map;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define('modules/uv-seadragoncenterpanel-module/SeadragonCenterPanel',["require", "exports", "../uv-shared-module/BaseCommands", "../../extensions/uv-seadragon-extension/Bounds", "../uv-shared-module/CenterPanel", "../../extensions/uv-seadragon-extension/Commands", "../uv-shared-module/Metrics", "../../Params"], function (require, exports, BaseCommands_1, Bounds_1, CenterPanel_1, Commands_1, Metrics_1, Params_1) {
    "use strict";
    var SeadragonCenterPanel = (function (_super) {
        __extends(SeadragonCenterPanel, _super);
        function SeadragonCenterPanel($element) {
            var _this = _super.call(this, $element) || this;
            _this.controlsVisible = false;
            _this.isCreated = false;
            _this.isFirstLoad = true;
            _this.nextButtonEnabled = false;
            _this.prevButtonEnabled = false;
            return _this;
        }
        SeadragonCenterPanel.prototype.create = function () {
            var _this = this;
            this.setConfig('seadragonCenterPanel');
            _super.prototype.create.call(this);
            this.$viewer = $('<div id="viewer"></div>');
            this.$content.prepend(this.$viewer);
            $.subscribe(BaseCommands_1.BaseCommands.SETTINGS_CHANGED, function (e, args) {
                _this.viewer.gestureSettingsMouse.clickToZoom = args.clickToZoomEnabled;
            });
            $.subscribe(BaseCommands_1.BaseCommands.OPEN_EXTERNAL_RESOURCE, function (e, resources) {
                _this.whenResized(function () {
                    if (!_this.isCreated)
                        _this.createUI();
                    _this.openMedia(resources);
                });
            });
            $.subscribe(Commands_1.Commands.CLEAR_SEARCH, function () {
                _this.whenCreated(function () {
                    _this.extension.currentSearchResultRect = null;
                    _this.clearSearchResults();
                });
            });
            $.subscribe(Commands_1.Commands.VIEW_PAGE, function () {
                _this.extension.previousSearchResultRect = null;
                _this.extension.currentSearchResultRect = null;
            });
            $.subscribe(Commands_1.Commands.NEXT_SEARCH_RESULT, function () {
                _this.whenCreated(function () {
                    _this.nextSearchResult();
                });
            });
            $.subscribe(Commands_1.Commands.PREV_SEARCH_RESULT, function () {
                _this.whenCreated(function () {
                    _this.prevSearchResult();
                });
            });
            $.subscribe(Commands_1.Commands.ZOOM_IN, function () {
                _this.whenCreated(function () {
                    _this.zoomIn();
                });
            });
            $.subscribe(Commands_1.Commands.ZOOM_OUT, function () {
                _this.whenCreated(function () {
                    _this.zoomOut();
                });
            });
            $.subscribe(Commands_1.Commands.ROTATE, function () {
                _this.whenCreated(function () {
                    _this.rotateRight();
                });
            });
            $.subscribe(BaseCommands_1.BaseCommands.METRIC_CHANGED, function () {
                _this.whenCreated(function () {
                    _this.updateResponsiveView();
                });
            });
        };
        SeadragonCenterPanel.prototype.whenResized = function (cb) {
            var _this = this;
            Utils.Async.waitFor(function () {
                return _this.isResized;
            }, cb);
        };
        SeadragonCenterPanel.prototype.whenCreated = function (cb) {
            var _this = this;
            Utils.Async.waitFor(function () {
                return _this.isCreated;
            }, cb);
        };
        SeadragonCenterPanel.prototype.zoomIn = function () {
            this.viewer.viewport.zoomTo(this.viewer.viewport.getZoom(true) * 2);
        };
        SeadragonCenterPanel.prototype.zoomOut = function () {
            this.viewer.viewport.zoomTo(this.viewer.viewport.getZoom(true) * 0.5);
        };
        SeadragonCenterPanel.prototype.rotateRight = function () {
            this.viewer.viewport.setRotation(this.viewer.viewport.getRotation() + 90);
        };
        SeadragonCenterPanel.prototype.updateResponsiveView = function () {
            this.setNavigatorVisible();
            if (this.extension.metric === Metrics_1.Metrics.MOBILE_LANDSCAPE) {
                this.viewer.autoHideControls = false;
                this.$viewportNavButtons.hide();
            }
            else {
                this.viewer.autoHideControls = true;
                this.$viewportNavButtons.show();
            }
        };
        SeadragonCenterPanel.prototype.createUI = function () {
            var _this = this;
            var that = this;
            this.$spinner = $('<div class="spinner"></div>');
            this.$content.append(this.$spinner);
            this.updateAttribution();
            // todo: use compiler flag (when available)
            var prefixUrl = 'themes/' + this.extension.config.options.theme + '/img/uv-seadragoncenterpanel-module/';
            // add to window object for testing automation purposes.
            window.openSeadragonViewer = this.viewer = OpenSeadragon({
                id: "viewer",
                ajaxWithCredentials: false,
                showNavigationControl: true,
                showNavigator: true,
                showRotationControl: true,
                showHomeControl: Utils.Bools.getBool(this.config.options.showHomeControl, false),
                showFullPageControl: false,
                defaultZoomLevel: this.config.options.defaultZoomLevel || 0,
                maxZoomPixelRatio: this.config.options.maxZoomPixelRatio || 2,
                controlsFadeDelay: this.config.options.controlsFadeDelay || 250,
                controlsFadeLength: this.config.options.controlsFadeLength || 250,
                navigatorPosition: this.config.options.navigatorPosition || "BOTTOM_RIGHT",
                animationTime: this.config.options.animationTime || 1.2,
                visibilityRatio: this.config.options.visibilityRatio || 0.5,
                constrainDuringPan: Utils.Bools.getBool(this.config.options.constrainDuringPan, false),
                immediateRender: Utils.Bools.getBool(this.config.options.immediateRender, false),
                blendTime: this.config.options.blendTime || 0,
                autoHideControls: Utils.Bools.getBool(this.config.options.autoHideControls, true),
                prefixUrl: prefixUrl,
                gestureSettingsMouse: {
                    clickToZoom: !!this.extension.config.options.clickToZoomEnabled
                },
                navImages: {
                    zoomIn: {
                        REST: 'zoom_in.png',
                        GROUP: 'zoom_in.png',
                        HOVER: 'zoom_in.png',
                        DOWN: 'zoom_in.png'
                    },
                    zoomOut: {
                        REST: 'zoom_out.png',
                        GROUP: 'zoom_out.png',
                        HOVER: 'zoom_out.png',
                        DOWN: 'zoom_out.png'
                    },
                    home: {
                        REST: 'home.png',
                        GROUP: 'home.png',
                        HOVER: 'home.png',
                        DOWN: 'home.png'
                    },
                    rotateright: {
                        REST: 'rotate_right.png',
                        GROUP: 'rotate_right.png',
                        HOVER: 'rotate_right.png',
                        DOWN: 'rotate_right.png'
                    },
                    rotateleft: {
                        REST: 'pixel.gif',
                        GROUP: 'pixel.gif',
                        HOVER: 'pixel.gif',
                        DOWN: 'pixel.gif'
                    },
                    next: {
                        REST: 'pixel.gif',
                        GROUP: 'pixel.gif',
                        HOVER: 'pixel.gif',
                        DOWN: 'pixel.gif'
                    },
                    previous: {
                        REST: 'pixel.gif',
                        GROUP: 'pixel.gif',
                        HOVER: 'pixel.gif',
                        DOWN: 'pixel.gif'
                    }
                }
            });
            this.$zoomInButton = this.$viewer.find('div[title="Zoom in"]');
            this.$zoomInButton.attr('tabindex', 0);
            this.$zoomInButton.prop('title', this.content.zoomIn);
            this.$zoomInButton.addClass('zoomIn viewportNavButton');
            this.$zoomOutButton = this.$viewer.find('div[title="Zoom out"]');
            this.$zoomOutButton.attr('tabindex', 0);
            this.$zoomOutButton.prop('title', this.content.zoomOut);
            this.$zoomOutButton.addClass('zoomOut viewportNavButton');
            this.$goHomeButton = this.$viewer.find('div[title="Go home"]');
            this.$goHomeButton.attr('tabindex', 0);
            this.$goHomeButton.prop('title', this.content.goHome);
            this.$goHomeButton.addClass('goHome viewportNavButton');
            this.$rotateButton = this.$viewer.find('div[title="Rotate right"]');
            this.$rotateButton.attr('tabindex', 0);
            this.$rotateButton.prop('title', this.content.rotateRight);
            this.$rotateButton.addClass('rotate viewportNavButton');
            this.$viewportNavButtonsContainer = this.$viewer.find('.openseadragon-container > div:not(.openseadragon-canvas):first');
            this.$viewportNavButtons = this.$viewportNavButtonsContainer.find('.viewportNavButton');
            this.$canvas = $(this.viewer.canvas);
            this.$canvas.on('contextmenu', function (e) { return false; });
            this.$navigator = this.$viewer.find(".navigator");
            this.setNavigatorVisible();
            // events
            this.$element.on('mousemove', function (e) {
                if (_this.controlsVisible)
                    return;
                _this.controlsVisible = true;
                _this.viewer.setControlsEnabled(true);
            });
            this.$element.on('mouseleave', function (e) {
                if (!_this.controlsVisible)
                    return;
                _this.controlsVisible = false;
                _this.viewer.setControlsEnabled(false);
            });
            // when mouse move stopped
            this.$element.on('mousemove', function (e) {
                // if over element, hide controls.
                if (!_this.$viewer.find('.navigator').ismouseover()) {
                    if (!_this.controlsVisible)
                        return;
                    _this.controlsVisible = false;
                    _this.viewer.setControlsEnabled(false);
                }
            }, this.config.options.controlsFadeAfterInactive);
            this.viewer.addHandler('tile-drawn', function () {
                _this.$spinner.hide();
            });
            //this.viewer.addHandler("open-failed", () => {
            //});
            this.viewer.addHandler('resize', function (viewer) {
                $.publish(Commands_1.Commands.SEADRAGON_RESIZE, [viewer]);
                _this.viewerResize(viewer);
            });
            this.viewer.addHandler('animation-start', function (viewer) {
                $.publish(Commands_1.Commands.SEADRAGON_ANIMATION_START, [viewer]);
            });
            this.viewer.addHandler('animation', function (viewer) {
                $.publish(Commands_1.Commands.SEADRAGON_ANIMATION, [viewer]);
            });
            this.viewer.addHandler('animation-finish', function (viewer) {
                _this.currentBounds = _this.getViewportBounds();
                _this.updateVisibleSearchResultRects();
                $.publish(Commands_1.Commands.SEADRAGON_ANIMATION_FINISH, [viewer]);
            });
            this.viewer.addHandler('rotate', function (args) {
                $.publish(Commands_1.Commands.SEADRAGON_ROTATION, [args.degrees]);
            });
            this.title = this.extension.helper.getLabel();
            this.createNavigationButtons();
            this.hidePrevButton();
            this.hideNextButton();
            this.isCreated = true;
            this.resize();
        };
        SeadragonCenterPanel.prototype.createNavigationButtons = function () {
            var viewingDirection = this.extension.helper.getViewingDirection();
            this.$prevButton = $('<div class="paging btn prev" tabindex="0"></div>');
            this.$prevButton.prop('title', this.content.previous);
            this.$nextButton = $('<div class="paging btn next" tabindex="0"></div>');
            this.$nextButton.prop('title', this.content.next);
            this.viewer.addControl(this.$prevButton[0], { anchor: OpenSeadragon.ControlAnchor.TOP_LEFT });
            this.viewer.addControl(this.$nextButton[0], { anchor: OpenSeadragon.ControlAnchor.TOP_RIGHT });
            switch (viewingDirection.toString()) {
                case manifesto.ViewingDirection.bottomToTop().toString():
                case manifesto.ViewingDirection.topToBottom().toString():
                    this.$prevButton.addClass('vertical');
                    this.$nextButton.addClass('vertical');
                    ;
                    break;
            }
            var that = this;
            this.$prevButton.onPressed(function (e) {
                e.preventDefault();
                OpenSeadragon.cancelEvent(e);
                if (!that.prevButtonEnabled)
                    return;
                switch (viewingDirection.toString()) {
                    case manifesto.ViewingDirection.leftToRight().toString():
                    case manifesto.ViewingDirection.bottomToTop().toString():
                    case manifesto.ViewingDirection.topToBottom().toString():
                        $.publish(Commands_1.Commands.PREV);
                        break;
                    case manifesto.ViewingDirection.rightToLeft().toString():
                        $.publish(Commands_1.Commands.NEXT);
                        break;
                }
            });
            this.$nextButton.onPressed(function (e) {
                e.preventDefault();
                OpenSeadragon.cancelEvent(e);
                if (!that.nextButtonEnabled)
                    return;
                switch (viewingDirection.toString()) {
                    case manifesto.ViewingDirection.leftToRight().toString():
                    case manifesto.ViewingDirection.bottomToTop().toString():
                    case manifesto.ViewingDirection.topToBottom().toString():
                        $.publish(Commands_1.Commands.NEXT);
                        break;
                    case manifesto.ViewingDirection.rightToLeft().toString():
                        $.publish(Commands_1.Commands.PREV);
                        break;
                }
            });
        };
        SeadragonCenterPanel.prototype.openMedia = function (resources) {
            var _this = this;
            this.$spinner.show();
            this.items = [];
            // todo: this should be a more specific Manifold.IImageResource
            this.extension.getExternalResources(resources).then(function (resources) {
                // OSD can open an array info.json objects
                //this.viewer.open(resources);
                _this.viewer.close();
                resources = _this.getPagePositions(resources);
                for (var i = 0; i < resources.length; i++) {
                    var resource = resources[i];
                    _this.viewer.addTiledImage({
                        tileSource: resource,
                        x: resource.x,
                        y: resource.y,
                        width: resource.width,
                        success: function (item) {
                            _this.items.push(item);
                            if (_this.items.length === resources.length) {
                                _this.openPagesHandler();
                            }
                            _this.resize();
                        }
                    });
                }
            });
        };
        SeadragonCenterPanel.prototype.getPagePositions = function (resources) {
            var leftPage;
            var rightPage;
            var topPage;
            var bottomPage;
            var page;
            var nextPage;
            // if there's more than one image, determine alignment strategy
            if (resources.length > 1) {
                if (resources.length === 2) {
                    // recto verso
                    if (this.extension.helper.isVerticallyAligned()) {
                        // vertical alignment
                        topPage = resources[0];
                        topPage.y = 0;
                        bottomPage = resources[1];
                        bottomPage.y = topPage.height + this.config.options.pageGap;
                    }
                    else {
                        // horizontal alignment
                        leftPage = resources[0];
                        leftPage.x = 0;
                        rightPage = resources[1];
                        rightPage.x = leftPage.width + this.config.options.pageGap;
                    }
                }
                else {
                    // scroll
                    if (this.extension.helper.isVerticallyAligned()) {
                        // vertical alignment
                        if (this.extension.helper.isTopToBottom()) {
                            // top to bottom
                            for (var i = 0; i < resources.length - 1; i++) {
                                page = resources[i];
                                nextPage = resources[i + 1];
                                nextPage.y = (page.y || 0) + page.height;
                                ;
                            }
                        }
                        else {
                            // bottom to top
                            for (var i = resources.length; i > 0; i--) {
                                page = resources[i];
                                nextPage = resources[i - 1];
                                nextPage.y = (page.y || 0) - page.height;
                            }
                        }
                    }
                    else {
                        // horizontal alignment
                        if (this.extension.helper.isLeftToRight()) {
                            // left to right
                            for (var i = 0; i < resources.length - 1; i++) {
                                page = resources[i];
                                nextPage = resources[i + 1];
                                nextPage.x = (page.x || 0) + page.width;
                            }
                        }
                        else {
                            // right to left
                            for (var i = resources.length - 1; i > 0; i--) {
                                page = resources[i];
                                nextPage = resources[i - 1];
                                nextPage.x = (page.x || 0) - page.width;
                            }
                        }
                    }
                }
            }
            return resources;
        };
        SeadragonCenterPanel.prototype.openPagesHandler = function () {
            $.publish(Commands_1.Commands.SEADRAGON_OPEN);
            if (this.extension.helper.isMultiCanvas() && !this.extension.helper.isContinuous()) {
                this.showPrevButton();
                this.showNextButton();
                $('.navigator').addClass('extraMargin');
                var viewingDirection = this.extension.helper.getViewingDirection();
                if (viewingDirection.toString() === manifesto.ViewingDirection.rightToLeft().toString()) {
                    if (this.extension.helper.isFirstCanvas()) {
                        this.disableNextButton();
                    }
                    else {
                        this.enableNextButton();
                    }
                    if (this.extension.helper.isLastCanvas()) {
                        this.disablePrevButton();
                    }
                    else {
                        this.enablePrevButton();
                    }
                }
                else {
                    if (this.extension.helper.isFirstCanvas()) {
                        this.disablePrevButton();
                    }
                    else {
                        this.enablePrevButton();
                    }
                    if (this.extension.helper.isLastCanvas()) {
                        this.disableNextButton();
                    }
                    else {
                        this.enableNextButton();
                    }
                }
            }
            this.setNavigatorVisible();
            this.overlaySearchResults();
            this.updateBounds();
            var searchResultRect = this.getInitialSearchResultRect();
            this.extension.previousSearchResultRect = null;
            this.extension.currentSearchResultRect = null;
            if (searchResultRect && this.isZoomToSearchResultEnabled()) {
                this.zoomToSearchResult(searchResultRect);
            }
            this.isFirstLoad = false;
        };
        SeadragonCenterPanel.prototype.updateBounds = function () {
            var settings = this.extension.getSettings();
            // if this is the first load and there are initial bounds, fit to those.
            if (this.isFirstLoad) {
                this.initialRotation = this.extension.getParam(Params_1.Params.rotation);
                if (this.initialRotation) {
                    this.viewer.viewport.setRotation(parseInt(this.initialRotation));
                }
                this.initialBounds = this.extension.getParam(Params_1.Params.xywh);
                if (this.initialBounds) {
                    this.initialBounds = Bounds_1.Bounds.fromString(this.initialBounds);
                    this.currentBounds = this.initialBounds;
                    this.fitToBounds(this.currentBounds);
                }
            }
            else if (settings.preserveViewport) {
                this.fitToBounds(this.currentBounds);
            }
            else {
                this.goHome();
            }
        };
        SeadragonCenterPanel.prototype.goHome = function () {
            this.viewer.viewport.goHome(true);
        };
        SeadragonCenterPanel.prototype.disablePrevButton = function () {
            this.prevButtonEnabled = false;
            this.$prevButton.addClass('disabled');
        };
        SeadragonCenterPanel.prototype.enablePrevButton = function () {
            this.prevButtonEnabled = true;
            this.$prevButton.removeClass('disabled');
        };
        SeadragonCenterPanel.prototype.hidePrevButton = function () {
            this.disablePrevButton();
            this.$prevButton.hide();
        };
        SeadragonCenterPanel.prototype.showPrevButton = function () {
            this.enablePrevButton();
            this.$prevButton.show();
        };
        SeadragonCenterPanel.prototype.disableNextButton = function () {
            this.nextButtonEnabled = false;
            this.$nextButton.addClass('disabled');
        };
        SeadragonCenterPanel.prototype.enableNextButton = function () {
            this.nextButtonEnabled = true;
            this.$nextButton.removeClass('disabled');
        };
        SeadragonCenterPanel.prototype.hideNextButton = function () {
            this.disableNextButton();
            this.$nextButton.hide();
        };
        SeadragonCenterPanel.prototype.showNextButton = function () {
            this.enableNextButton();
            this.$nextButton.show();
        };
        SeadragonCenterPanel.prototype.serialiseBounds = function (bounds) {
            return bounds.x + ',' + bounds.y + ',' + bounds.width + ',' + bounds.height;
        };
        SeadragonCenterPanel.prototype.fitToBounds = function (bounds, immediate) {
            if (immediate === void 0) { immediate = true; }
            var rect = new OpenSeadragon.Rect();
            rect.x = Number(bounds.x);
            rect.y = Number(bounds.y);
            rect.width = Number(bounds.w);
            rect.height = Number(bounds.h);
            this.viewer.viewport.fitBoundsWithConstraints(rect, immediate);
        };
        SeadragonCenterPanel.prototype.getCroppedImageBounds = function () {
            if (!this.viewer || !this.viewer.viewport)
                return null;
            var canvas = this.extension.helper.getCurrentCanvas();
            var dimensions = this.extension.getCroppedImageDimensions(canvas, this.viewer);
            var bounds = new Bounds_1.Bounds(dimensions.regionPos.x, dimensions.regionPos.y, dimensions.region.width, dimensions.region.height);
            return bounds.toString();
        };
        SeadragonCenterPanel.prototype.getViewportBounds = function () {
            if (!this.viewer || !this.viewer.viewport)
                return null;
            var b = this.viewer.viewport.getBounds(true);
            var bounds = new Bounds_1.Bounds(Math.floor(b.x), Math.floor(b.y), Math.floor(b.width), Math.floor(b.height));
            return bounds;
        };
        SeadragonCenterPanel.prototype.viewerResize = function (viewer) {
            if (!viewer.viewport)
                return;
            var center = viewer.viewport.getCenter(true);
            if (!center)
                return;
            // postpone pan for a millisecond - fixes iPad image stretching/squashing issue.
            setTimeout(function () {
                viewer.viewport.panTo(center, true);
            }, 1);
        };
        SeadragonCenterPanel.prototype.clearSearchResults = function () {
            this.$canvas.find('.searchOverlay').hide();
        };
        SeadragonCenterPanel.prototype.overlaySearchResults = function () {
            var searchResults = this.getSearchResultsForCurrentImages();
            for (var i = 0; i < searchResults.length; i++) {
                var searchResult = searchResults[i];
                var overlayRects = this.getSearchOverlayRects(searchResult);
                for (var k = 0; k < overlayRects.length; k++) {
                    var overlayRect = overlayRects[k];
                    var div = document.createElement('div');
                    div.id = 'searchResult-' + overlayRect.canvasIndex + '-' + overlayRect.resultIndex;
                    div.className = 'searchOverlay';
                    div.title = this.extension.sanitize(overlayRect.chars);
                    this.viewer.addOverlay(div, overlayRect);
                }
            }
        };
        SeadragonCenterPanel.prototype.getSearchResultsForCurrentImages = function () {
            var searchResultsForCurrentImages = [];
            var searchResults = this.extension.searchResults;
            if (!searchResults.length)
                return searchResultsForCurrentImages;
            var indices = this.extension.getPagedIndices();
            for (var i = 0; i < indices.length; i++) {
                var canvasIndex = indices[i];
                for (var j = 0; j < searchResults.length; j++) {
                    if (searchResults[j].canvasIndex === canvasIndex) {
                        searchResultsForCurrentImages.push(searchResults[j]);
                        break;
                    }
                }
            }
            return searchResultsForCurrentImages;
        };
        SeadragonCenterPanel.prototype.getSearchResultRectsForCurrentImages = function () {
            var searchResults = this.getSearchResultsForCurrentImages();
            return searchResults.en().selectMany(function (x) { return x.rects; }).toArray();
        };
        SeadragonCenterPanel.prototype.updateVisibleSearchResultRects = function () {
            // after animating, loop through all search result rects and flag their visibility based on whether they are inside the current viewport.
            var searchResultRects = this.getSearchResultRectsForCurrentImages();
            for (var i = 0; i < searchResultRects.length; i++) {
                var rect = searchResultRects[i];
                var viewportBounds = this.viewer.viewport.getBounds();
                rect.isVisible = Utils.Measurements.Dimensions.hitRect(viewportBounds.x, viewportBounds.y, viewportBounds.width, viewportBounds.height, rect.viewportX, rect.viewportY);
            }
        };
        SeadragonCenterPanel.prototype.getSearchResultRectIndex = function (searchResultRect) {
            var searchResultRects = this.getSearchResultRectsForCurrentImages();
            return searchResultRects.indexOf(searchResultRect);
        };
        SeadragonCenterPanel.prototype.isZoomToSearchResultEnabled = function () {
            return Utils.Bools.getBool(this.extension.config.options.zoomToSearchResultEnabled, true);
        };
        SeadragonCenterPanel.prototype.nextSearchResult = function () {
            var searchResultRects = this.getSearchResultRectsForCurrentImages();
            var currentSearchResultRectIndex = this.getSearchResultRectIndex(this.extension.currentSearchResultRect);
            var foundRect;
            for (var i = currentSearchResultRectIndex + 1; i < searchResultRects.length; i++) {
                var rect = searchResultRects[i];
                // this was removed as users found it confusing.
                // find the next visible or non-visible rect.
                //if (rect.isVisible) {
                //    continue;
                //} else {
                foundRect = rect;
                break;
            }
            if (foundRect && this.isZoomToSearchResultEnabled()) {
                // if the rect's canvasIndex is greater than the current canvasIndex
                if (rect.canvasIndex > this.extension.helper.canvasIndex) {
                    this.extension.currentSearchResultRect = rect;
                    $.publish(Commands_1.Commands.SEARCH_RESULT_CANVAS_CHANGED, [rect]);
                }
                else {
                    this.zoomToSearchResult(rect);
                }
            }
            else {
                $.publish(Commands_1.Commands.NEXT_IMAGES_SEARCH_RESULT_UNAVAILABLE);
            }
        };
        SeadragonCenterPanel.prototype.prevSearchResult = function () {
            var searchResultRects = this.getSearchResultRectsForCurrentImages();
            var currentSearchResultRectIndex = this.getSearchResultRectIndex(this.extension.currentSearchResultRect);
            var foundRect;
            for (var i = currentSearchResultRectIndex - 1; i >= 0; i--) {
                var rect = searchResultRects[i];
                // this was removed as users found it confusing.
                // find the prev visible or non-visible rect.
                //if (rect.isVisible) {
                //    continue;
                //} else {
                foundRect = rect;
                break;
            }
            if (foundRect && this.isZoomToSearchResultEnabled()) {
                // if the rect's canvasIndex is less than the current canvasIndex
                if (rect.canvasIndex < this.extension.helper.canvasIndex) {
                    this.extension.currentSearchResultRect = rect;
                    $.publish(Commands_1.Commands.SEARCH_RESULT_CANVAS_CHANGED, [rect]);
                }
                else {
                    this.zoomToSearchResult(rect);
                }
            }
            else {
                $.publish(Commands_1.Commands.PREV_IMAGES_SEARCH_RESULT_UNAVAILABLE);
            }
        };
        SeadragonCenterPanel.prototype.getSearchResultRectByIndex = function (index) {
            var searchResultRects = this.getSearchResultRectsForCurrentImages();
            if (!searchResultRects.length)
                return null;
            return searchResultRects[index];
        };
        SeadragonCenterPanel.prototype.getInitialSearchResultRect = function () {
            var _this = this;
            var searchResultRects = this.getSearchResultRectsForCurrentImages();
            if (!searchResultRects.length)
                return null;
            // if the previous SearchResultRect had a canvasIndex higher than the current canvasIndex
            if (this.extension.previousSearchResultRect && this.extension.previousSearchResultRect.canvasIndex > this.extension.helper.canvasIndex) {
                return searchResultRects.en().where(function (x) { return x.canvasIndex === _this.extension.helper.canvasIndex; }).last();
            }
            // get the first rect with the current canvasindex.
            return searchResultRects.en().where(function (x) { return x.canvasIndex === _this.extension.helper.canvasIndex; }).first();
        };
        SeadragonCenterPanel.prototype.zoomToSearchResult = function (searchResultRect) {
            this.extension.previousSearchResultRect = this.extension.currentSearchResultRect || searchResultRect;
            this.extension.currentSearchResultRect = searchResultRect;
            this.fitToBounds(new Bounds_1.Bounds(searchResultRect.viewportX, searchResultRect.viewportY, searchResultRect.width, searchResultRect.height), false);
            this.highlightSearchResultRect(searchResultRect);
            $.publish(Commands_1.Commands.SEARCH_RESULT_RECT_CHANGED);
        };
        SeadragonCenterPanel.prototype.highlightSearchResultRect = function (searchResultRect) {
            var $rect = $('#searchResult-' + searchResultRect.canvasIndex + '-' + searchResultRect.index);
            $rect.addClass('current');
            $('.searchOverlay').not($rect).removeClass('current');
        };
        SeadragonCenterPanel.prototype.getSearchOverlayRects = function (searchResult) {
            var newRects = [];
            var resource = this.extension.resources.en().where(function (x) { return x.index === searchResult.canvasIndex; }).first();
            var index = this.extension.resources.indexOf(resource);
            var width = this.extension.resources[index].width;
            var offsetX = 0;
            if (index > 0) {
                offsetX = this.extension.resources[index - 1].width;
            }
            for (var i = 0; i < searchResult.rects.length; i++) {
                var searchRect = searchResult.rects[i];
                var x = (searchRect.x + offsetX) + ((index > 0) ? this.config.options.pageGap : 0);
                var y = searchRect.y;
                var w = searchRect.width;
                var h = searchRect.height;
                var rect = new OpenSeadragon.Rect(x, y, w, h);
                searchRect.viewportX = x;
                searchRect.viewportY = y;
                rect.canvasIndex = searchRect.canvasIndex;
                rect.resultIndex = searchRect.index;
                rect.chars = searchRect.chars;
                newRects.push(rect);
            }
            return newRects;
        };
        SeadragonCenterPanel.prototype.resize = function () {
            var _this = this;
            _super.prototype.resize.call(this);
            this.$viewer.height(this.$content.height() - this.$viewer.verticalMargins());
            this.$viewer.width(this.$content.width() - this.$viewer.horizontalMargins());
            if (!this.isCreated)
                return;
            this.$title.ellipsisFill(this.extension.sanitize(this.title));
            this.$spinner.css('top', (this.$content.height() / 2) - (this.$spinner.height() / 2));
            this.$spinner.css('left', (this.$content.width() / 2) - (this.$spinner.width() / 2));
            var viewingDirection = this.extension.helper.getViewingDirection();
            if (this.extension.helper.isMultiCanvas() && this.$prevButton && this.$nextButton) {
                var verticalButtonPos = Math.floor(this.$content.width() / 2);
                switch (viewingDirection.toString()) {
                    case manifesto.ViewingDirection.bottomToTop().toString():
                        this.$prevButton.addClass('down');
                        this.$nextButton.addClass('up');
                        this.$prevButton.css('left', verticalButtonPos - (this.$prevButton.outerWidth() / 2));
                        this.$prevButton.css('top', (this.$content.height() - this.$prevButton.height()));
                        this.$nextButton.css('left', (verticalButtonPos * -1) - (this.$nextButton.outerWidth() / 2));
                        break;
                    case manifesto.ViewingDirection.topToBottom().toString():
                        this.$prevButton.css('left', verticalButtonPos - (this.$prevButton.outerWidth() / 2));
                        this.$nextButton.css('left', (verticalButtonPos * -1) - (this.$nextButton.outerWidth() / 2));
                        this.$nextButton.css('top', (this.$content.height() - this.$nextButton.height()));
                        break;
                    default:
                        this.$prevButton.css('top', (this.$content.height() - this.$prevButton.height()) / 2);
                        this.$nextButton.css('top', (this.$content.height() - this.$nextButton.height()) / 2);
                        break;
                }
            }
            // stretch navigator, allowing time for OSD to resize
            setTimeout(function () {
                if (_this.extension.helper.isContinuous()) {
                    if (_this.extension.helper.isHorizontallyAligned()) {
                        var width = _this.$viewer.width() - _this.$viewer.rightMargin();
                        _this.$navigator.width(width);
                    }
                    else {
                        _this.$navigator.height(_this.$viewer.height());
                    }
                }
            }, 100);
        };
        SeadragonCenterPanel.prototype.setFocus = function () {
            if (!this.$canvas.is(":focus")) {
                if (this.extension.config.options.allowStealFocus) {
                    this.$canvas.focus();
                }
            }
        };
        SeadragonCenterPanel.prototype.setNavigatorVisible = function () {
            var navigatorEnabled = Utils.Bools.getBool(this.extension.getSettings().navigatorEnabled, true) && this.extension.metric !== Metrics_1.Metrics.MOBILE_LANDSCAPE;
            this.viewer.navigator.setVisible(navigatorEnabled);
            if (navigatorEnabled) {
                this.$navigator.show();
            }
            else {
                this.$navigator.hide();
            }
        };
        return SeadragonCenterPanel;
    }(CenterPanel_1.CenterPanel));
    exports.SeadragonCenterPanel = SeadragonCenterPanel;
});
//# sourceMappingURL=SeadragonCenterPanel.js.map;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define('modules/uv-dialogues-module/SettingsDialogue',["require", "exports", "../uv-shared-module/BaseCommands", "../uv-shared-module/Dialogue"], function (require, exports, BaseCommands_1, Dialogue_1) {
    "use strict";
    var SettingsDialogue = (function (_super) {
        __extends(SettingsDialogue, _super);
        function SettingsDialogue($element) {
            return _super.call(this, $element) || this;
        }
        SettingsDialogue.prototype.create = function () {
            var _this = this;
            this.setConfig('settingsDialogue');
            _super.prototype.create.call(this);
            this.openCommand = BaseCommands_1.BaseCommands.SHOW_SETTINGS_DIALOGUE;
            this.closeCommand = BaseCommands_1.BaseCommands.HIDE_SETTINGS_DIALOGUE;
            $.subscribe(this.openCommand, function (e, params) {
                _this.open();
            });
            $.subscribe(this.closeCommand, function (e) {
                _this.close();
            });
            this.$title = $('<h1></h1>');
            this.$content.append(this.$title);
            this.$scroll = $('<div class="scroll"></div>');
            this.$content.append(this.$scroll);
            this.$version = $('<div class="version"></div>');
            this.$content.append(this.$version);
            this.$website = $('<div class="website"></div>');
            this.$content.append(this.$website);
            this.$locale = $('<div class="setting locale"></div>');
            this.$scroll.append(this.$locale);
            this.$localeLabel = $('<label for="locale">' + this.content.locale + '</label>');
            this.$locale.append(this.$localeLabel);
            this.$localeDropDown = $('<select id="locale"></select>');
            this.$locale.append(this.$localeDropDown);
            // initialise ui.
            this.$title.text(this.content.title);
            this.$website.html(this.content.website);
            this.$website.targetBlank();
            var locales = this.extension.getLocales();
            for (var i = 0; i < locales.length; i++) {
                var locale = locales[i];
                this.$localeDropDown.append('<option value="' + locale.name + '">' + locale.label + '</option>');
            }
            this.$localeDropDown.val(this.extension.locale);
            this.$localeDropDown.change(function () {
                _this.extension.changeLocale(_this.$localeDropDown.val());
            });
            if (this.extension.getLocales().length < 2) {
                this.$locale.hide();
            }
            this.$element.hide();
        };
        SettingsDialogue.prototype.getSettings = function () {
            return this.extension.getSettings();
        };
        SettingsDialogue.prototype.updateSettings = function (settings) {
            this.extension.updateSettings(settings);
            $.publish(BaseCommands_1.BaseCommands.UPDATE_SETTINGS, [settings]);
        };
        SettingsDialogue.prototype.open = function () {
            var _this = this;
            _super.prototype.open.call(this);
            $.getJSON("package.json", function (pjson) {
                _this.$version.text("v" + pjson.version);
            });
        };
        SettingsDialogue.prototype.resize = function () {
            _super.prototype.resize.call(this);
        };
        return SettingsDialogue;
    }(Dialogue_1.Dialogue));
    exports.SettingsDialogue = SettingsDialogue;
});
//# sourceMappingURL=SettingsDialogue.js.map;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define('extensions/uv-seadragon-extension/SettingsDialogue',["require", "exports", "../../modules/uv-dialogues-module/SettingsDialogue"], function (require, exports, SettingsDialogue_1) {
    "use strict";
    var SettingsDialogue = (function (_super) {
        __extends(SettingsDialogue, _super);
        function SettingsDialogue($element) {
            return _super.call(this, $element) || this;
        }
        SettingsDialogue.prototype.create = function () {
            var _this = this;
            this.setConfig('settingsDialogue');
            _super.prototype.create.call(this);
            this.$navigatorEnabled = $('<div class="setting navigatorEnabled"></div>');
            this.$scroll.append(this.$navigatorEnabled);
            // todo: use .checkboxButton jquery extension
            this.$navigatorEnabledCheckbox = $('<input id="navigatorEnabled" type="checkbox" tabindex="0" />');
            this.$navigatorEnabled.append(this.$navigatorEnabledCheckbox);
            this.$navigatorEnabledLabel = $('<label for="navigatorEnabled">' + this.content.navigatorEnabled + '</label>');
            this.$navigatorEnabled.append(this.$navigatorEnabledLabel);
            this.$pagingEnabled = $('<div class="setting pagingEnabled"></div>');
            this.$scroll.append(this.$pagingEnabled);
            this.$pagingEnabledCheckbox = $('<input id="pagingEnabled" type="checkbox" tabindex="0" />');
            this.$pagingEnabled.append(this.$pagingEnabledCheckbox);
            this.$pagingEnabledLabel = $('<label for="pagingEnabled">' + this.content.pagingEnabled + '</label>');
            this.$pagingEnabled.append(this.$pagingEnabledLabel);
            this.$clickToZoomEnabled = $('<div class="setting clickToZoom"></div>');
            this.$scroll.append(this.$clickToZoomEnabled);
            this.$clickToZoomEnabledCheckbox = $('<input id="clickToZoomEnabled" type="checkbox" />');
            this.$clickToZoomEnabled.append(this.$clickToZoomEnabledCheckbox);
            this.$clickToZoomEnabledLabel = $('<label for="clickToZoomEnabled">' + this.content.clickToZoomEnabled + '</label>');
            this.$clickToZoomEnabled.append(this.$clickToZoomEnabledLabel);
            this.$preserveViewport = $('<div class="setting preserveViewport"></div>');
            this.$scroll.append(this.$preserveViewport);
            this.$preserveViewportCheckbox = $('<input id="preserveViewport" type="checkbox" tabindex="0" />');
            this.$preserveViewport.append(this.$preserveViewportCheckbox);
            this.$preserveViewportLabel = $('<label for="preserveViewport">' + this.content.preserveViewport + '</label>');
            this.$preserveViewport.append(this.$preserveViewportLabel);
            this.$navigatorEnabledCheckbox.change(function () {
                var settings = {};
                if (_this.$navigatorEnabledCheckbox.is(":checked")) {
                    settings.navigatorEnabled = true;
                }
                else {
                    settings.navigatorEnabled = false;
                }
                _this.updateSettings(settings);
            });
            this.$clickToZoomEnabledCheckbox.change(function () {
                var settings = {};
                if (_this.$clickToZoomEnabledCheckbox.is(":checked")) {
                    settings.clickToZoomEnabled = true;
                }
                else {
                    settings.clickToZoomEnabled = false;
                }
                _this.updateSettings(settings);
            });
            this.$pagingEnabledCheckbox.change(function () {
                var settings = {};
                if (_this.$pagingEnabledCheckbox.is(":checked")) {
                    settings.pagingEnabled = true;
                }
                else {
                    settings.pagingEnabled = false;
                }
                _this.updateSettings(settings);
            });
            this.$preserveViewportCheckbox.change(function () {
                var settings = {};
                if (_this.$preserveViewportCheckbox.is(":checked")) {
                    settings.preserveViewport = true;
                }
                else {
                    settings.preserveViewport = false;
                }
                _this.updateSettings(settings);
            });
        };
        SettingsDialogue.prototype.open = function () {
            _super.prototype.open.call(this);
            var settings = this.getSettings();
            if (settings.navigatorEnabled) {
                this.$navigatorEnabledCheckbox.prop("checked", true);
            }
            else {
                this.$navigatorEnabledCheckbox.removeAttr("checked");
            }
            if (settings.clickToZoomEnabled) {
                this.$clickToZoomEnabledCheckbox.prop("checked", true);
            }
            else {
                this.$clickToZoomEnabledCheckbox.removeAttr("checked");
            }
            if (!this.extension.helper.isPagingAvailable()) {
                this.$pagingEnabled.hide();
            }
            else {
                if (settings.pagingEnabled) {
                    this.$pagingEnabledCheckbox.prop("checked", true);
                }
                else {
                    this.$pagingEnabledCheckbox.removeAttr("checked");
                }
            }
            if (settings.preserveViewport) {
                this.$preserveViewportCheckbox.prop("checked", true);
            }
            else {
                this.$preserveViewportCheckbox.removeAttr("checked");
            }
        };
        return SettingsDialogue;
    }(SettingsDialogue_1.SettingsDialogue));
    exports.SettingsDialogue = SettingsDialogue;
});
//# sourceMappingURL=SettingsDialogue.js.map;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define('modules/uv-dialogues-module/ShareDialogue',["require", "exports", "../uv-shared-module/BaseCommands", "../uv-shared-module/Dialogue"], function (require, exports, BaseCommands_1, Dialogue_1) {
    "use strict";
    var ShareDialogue = (function (_super) {
        __extends(ShareDialogue, _super);
        function ShareDialogue($element) {
            var _this = _super.call(this, $element) || this;
            _this.aspectRatio = .75;
            _this.isEmbedViewVisible = false;
            _this.isShareViewVisible = false;
            _this.maxHeight = _this.maxWidth * _this.aspectRatio;
            _this.maxWidth = 8000;
            _this.minHeight = _this.minWidth * _this.aspectRatio;
            _this.minWidth = 200;
            return _this;
        }
        ShareDialogue.prototype.create = function () {
            var _this = this;
            this.setConfig('shareDialogue');
            _super.prototype.create.call(this);
            this.openCommand = BaseCommands_1.BaseCommands.SHOW_SHARE_DIALOGUE;
            this.closeCommand = BaseCommands_1.BaseCommands.HIDE_SHARE_DIALOGUE;
            $.subscribe(this.openCommand, function (e, $triggerButton) {
                _this.open($triggerButton);
                if (_this.isShareAvailable()) {
                    _this.openShareView();
                }
                else {
                    _this.openEmbedView();
                }
            });
            $.subscribe(this.closeCommand, function (e) {
                _this.close();
            });
            $.subscribe(BaseCommands_1.BaseCommands.SHOW_EMBED_DIALOGUE, function (e, $triggerButton) {
                _this.open($triggerButton);
                _this.openEmbedView();
            });
            this.$tabs = $('<div class="tabs"></div>');
            this.$content.append(this.$tabs);
            this.$shareButton = $('<a class="share tab default" tabindex="0">' + this.content.share + '</a>');
            this.$shareButton.prop('title', this.content.share);
            this.$tabs.append(this.$shareButton);
            this.$embedButton = $('<a class="embed tab" tabindex="0">' + this.content.embed + '</a>');
            this.$embedButton.prop('title', this.content.embed);
            this.$tabs.append(this.$embedButton);
            this.$tabsContent = $('<div class="tabsContent"></div>');
            this.$content.append(this.$tabsContent);
            this.$footer = $('<div class="footer"></div>');
            this.$content.append(this.$footer);
            this.$shareView = $('<div class="shareView view"></div>');
            this.$tabsContent.append(this.$shareView);
            this.$shareHeader = $('<div class="header"></div>');
            this.$shareView.append(this.$shareHeader);
            this.$shareLink = $('<a class="shareLink" onclick="return false;"></a>');
            this.$shareView.append(this.$shareLink);
            this.$shareInput = $('<input class="shareInput" type="text" readonly="true" />');
            this.$shareView.append(this.$shareInput);
            this.$shareFrame = $('<iframe class="shareFrame"></iframe>');
            this.$shareView.append(this.$shareFrame);
            this.$embedView = $('<div class="embedView view"></div>');
            this.$tabsContent.append(this.$embedView);
            this.$embedHeader = $('<div class="header"></div>');
            this.$embedView.append(this.$embedHeader);
            // this.$link = $('<a target="_blank"></a>');
            // this.$embedView.find('.leftCol').append(this.$link);
            // this.$image = $('<img class="share" />');
            // this.$embedView.append(this.$image);
            this.$code = $('<input class="code" type="text" readonly="true" />');
            this.$embedView.append(this.$code);
            this.$customSize = $('<div class="customSize"></div>');
            this.$embedView.append(this.$customSize);
            this.$size = $('<span class="size">' + this.content.size + '</span>');
            this.$customSize.append(this.$size);
            this.$customSizeDropDown = $('<select id="size"></select>');
            this.$customSize.append(this.$customSizeDropDown);
            this.$customSizeDropDown.append('<option value="small" data-width="560" data-height="420">560 x 420</option>');
            this.$customSizeDropDown.append('<option value="medium" data-width="640" data-height="480">640 x 480</option>');
            this.$customSizeDropDown.append('<option value="large" data-width="800" data-height="600">800 x 600</option>');
            this.$customSizeDropDown.append('<option value="custom">' + this.content.customSize + '</option>');
            this.$widthInput = $('<input class="width" type="text" maxlength="10" />');
            this.$customSize.append(this.$widthInput);
            this.$x = $('<span class="x">x</span>');
            this.$customSize.append(this.$x);
            this.$heightInput = $('<input class="height" type="text" maxlength="10" />');
            this.$customSize.append(this.$heightInput);
            var iiifUrl = this.extension.getIIIFShareUrl();
            this.$iiifButton = $('<a class="imageBtn iiif" href="' + iiifUrl + '" title="' + this.content.iiif + '" target="_blank"></a>');
            this.$footer.append(this.$iiifButton);
            this.$termsOfUseButton = $('<a href="#">' + this.extension.config.content.termsOfUse + '</a>');
            this.$footer.append(this.$termsOfUseButton);
            this.$widthInput.on('keydown', function (e) {
                return Utils.Numbers.numericalInput(e);
            });
            this.$heightInput.on('keydown', function (e) {
                return Utils.Numbers.numericalInput(e);
            });
            this.$shareInput.focus(function () {
                $(this).select();
            });
            this.$code.focus(function () {
                $(this).select();
            });
            this.$shareButton.onPressed(function () {
                _this.openShareView();
            });
            this.$embedButton.onPressed(function () {
                _this.openEmbedView();
            });
            this.$customSizeDropDown.change(function () {
                _this.update();
            });
            this.$widthInput.change(function () {
                _this.updateHeightRatio();
                _this.update();
            });
            this.$heightInput.change(function () {
                _this.updateWidthRatio();
                _this.update();
            });
            this.$termsOfUseButton.onPressed(function () {
                $.publish(BaseCommands_1.BaseCommands.SHOW_TERMS_OF_USE);
            });
            this.$element.hide();
            this.update();
        };
        ShareDialogue.prototype.open = function ($triggerButton) {
            _super.prototype.open.call(this, $triggerButton);
            this.update();
        };
        ShareDialogue.prototype.getShareUrl = function () {
            return this.extension.getShareUrl();
        };
        ShareDialogue.prototype.isShareAvailable = function () {
            return !!this.getShareUrl();
        };
        ShareDialogue.prototype.update = function () {
            if (this.isShareAvailable()) {
                this.$shareButton.show();
            }
            else {
                this.$shareButton.hide();
            }
            var $selected = this.getSelectedSize();
            if ($selected.val() === 'custom') {
                this.$widthInput.show();
                this.$x.show();
                this.$heightInput.show();
            }
            else {
                this.$widthInput.hide();
                this.$x.hide();
                this.$heightInput.hide();
                this.currentWidth = Number($selected.data('width'));
                this.currentHeight = Number($selected.data('height'));
                this.$widthInput.val(String(this.currentWidth));
                this.$heightInput.val(String(this.currentHeight));
            }
            this.updateInstructions();
            this.updateShareOptions();
            this.updateShareFrame();
            this.updateTermsOfUseButton();
        };
        ShareDialogue.prototype.updateShareOptions = function () {
            this.$shareInput.val(this.getShareUrl());
            this.$shareLink.prop('href', this.getShareUrl());
            this.$shareLink.text(this.getShareUrl());
            if ($.browser.mobile) {
                this.$shareInput.hide();
                this.$shareLink.show();
            }
            else {
                this.$shareInput.show();
                this.$shareLink.hide();
            }
        };
        ShareDialogue.prototype.updateInstructions = function () {
            if (Utils.Bools.getBool(this.options.instructionsEnabled, false)) {
                this.$shareHeader.show();
                this.$embedHeader.show();
                this.$shareHeader.text(this.content.shareInstructions);
                this.$embedHeader.text(this.content.embedInstructions);
            }
            else {
                this.$shareHeader.hide();
                this.$embedHeader.hide();
            }
        };
        // updateThumbnail(): void {
        //     var canvas: Manifesto.ICanvas = this.extension.helper.getCurrentCanvas();
        //     if (!canvas) return;
        //     var thumbnail = canvas.getProperty('thumbnail');
        //     if (!thumbnail || !_.isString(thumbnail)){
        //         thumbnail = canvas.getCanonicalImageUri(this.extension.config.options.bookmarkThumbWidth);
        //     }
        //     this.$link.attr('href', thumbnail);
        //     this.$image.attr('src', thumbnail);
        // }
        ShareDialogue.prototype.getSelectedSize = function () {
            return this.$customSizeDropDown.find(':selected');
        };
        ShareDialogue.prototype.updateWidthRatio = function () {
            this.currentHeight = Number(this.$heightInput.val());
            if (this.currentHeight < this.minHeight) {
                this.currentHeight = this.minHeight;
                this.$heightInput.val(String(this.currentHeight));
            }
            else if (this.currentHeight > this.maxHeight) {
                this.currentHeight = this.maxHeight;
                this.$heightInput.val(String(this.currentHeight));
            }
            this.currentWidth = Math.floor(this.currentHeight / this.aspectRatio);
            this.$widthInput.val(String(this.currentWidth));
        };
        ShareDialogue.prototype.updateHeightRatio = function () {
            this.currentWidth = Number(this.$widthInput.val());
            if (this.currentWidth < this.minWidth) {
                this.currentWidth = this.minWidth;
                this.$widthInput.val(String(this.currentWidth));
            }
            else if (this.currentWidth > this.maxWidth) {
                this.currentWidth = this.maxWidth;
                this.$widthInput.val(String(this.currentWidth));
            }
            this.currentHeight = Math.floor(this.currentWidth * this.aspectRatio);
            this.$heightInput.val(String(this.currentHeight));
        };
        ShareDialogue.prototype.updateShareFrame = function () {
            var shareUrl = this.extension.helper.getShareServiceUrl();
            if (Utils.Bools.getBool(this.config.options.shareFrameEnabled, true) && shareUrl) {
                this.$shareFrame.prop('src', shareUrl);
                this.$shareFrame.show();
            }
            else {
                this.$shareFrame.hide();
            }
        };
        ShareDialogue.prototype.updateTermsOfUseButton = function () {
            var attribution = this.extension.helper.getAttribution(); // todo: this should eventually use a suitable IIIF 'terms' field.
            if (Utils.Bools.getBool(this.extension.config.options.termsOfUseEnabled, false) && attribution) {
                this.$termsOfUseButton.show();
            }
            else {
                this.$termsOfUseButton.hide();
            }
        };
        ShareDialogue.prototype.openShareView = function () {
            this.isShareViewVisible = true;
            this.isEmbedViewVisible = false;
            this.$embedView.hide();
            this.$shareView.show();
            this.$shareButton.addClass('on default');
            this.$embedButton.removeClass('on default');
            this.resize();
        };
        ShareDialogue.prototype.openEmbedView = function () {
            this.isShareViewVisible = false;
            this.isEmbedViewVisible = true;
            this.$embedView.show();
            this.$shareView.hide();
            this.$shareButton.removeClass('on default');
            this.$embedButton.addClass('on default');
            this.resize();
        };
        ShareDialogue.prototype.close = function () {
            _super.prototype.close.call(this);
        };
        ShareDialogue.prototype.getViews = function () {
            return this.$tabsContent.find('.view');
        };
        ShareDialogue.prototype.equaliseViewHeights = function () {
            this.getViews().equaliseHeight(true);
        };
        ShareDialogue.prototype.resize = function () {
            this.equaliseViewHeights();
            this.setDockedPosition();
        };
        return ShareDialogue;
    }(Dialogue_1.Dialogue));
    exports.ShareDialogue = ShareDialogue;
});
//# sourceMappingURL=ShareDialogue.js.map;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define('extensions/uv-seadragon-extension/ShareDialogue',["require", "exports", "../../modules/uv-dialogues-module/ShareDialogue", "./Commands"], function (require, exports, ShareDialogue_1, Commands_1) {
    "use strict";
    var ShareDialogue = (function (_super) {
        __extends(ShareDialogue, _super);
        function ShareDialogue($element) {
            var _this = _super.call(this, $element) || this;
            $.subscribe(Commands_1.Commands.SEADRAGON_OPEN, function () {
                _this.update();
            });
            $.subscribe(Commands_1.Commands.SEADRAGON_ANIMATION_FINISH, function () {
                _this.update();
            });
            return _this;
        }
        ShareDialogue.prototype.create = function () {
            this.setConfig('shareDialogue');
            _super.prototype.create.call(this);
        };
        ShareDialogue.prototype.update = function () {
            _super.prototype.update.call(this);
            var xywh = this.extension.getViewportBounds();
            var rotation = this.extension.getViewerRotation();
            this.code = this.extension.getEmbedScript(this.options.embedTemplate, this.currentWidth, this.currentHeight, xywh, rotation);
            this.$code.val(this.code);
        };
        ShareDialogue.prototype.resize = function () {
            _super.prototype.resize.call(this);
        };
        return ShareDialogue;
    }(ShareDialogue_1.ShareDialogue));
    exports.ShareDialogue = ShareDialogue;
});
//# sourceMappingURL=ShareDialogue.js.map;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define('extensions/uv-seadragon-extension/Extension',["require", "exports", "../../modules/uv-shared-module/BaseCommands", "../../modules/uv-shared-module/BaseExtension", "../../modules/uv-shared-module/Bookmark", "./Commands", "../../modules/uv-contentleftpanel-module/ContentLeftPanel", "./CroppedImageDimensions", "./DownloadDialogue", "../../modules/uv-dialogues-module/ExternalContentDialogue", "../../modules/uv-osdmobilefooterpanel-module/MobileFooter", "../../modules/uv-searchfooterpanel-module/FooterPanel", "../../modules/uv-dialogues-module/HelpDialogue", "../../modules/uv-shared-module/Metrics", "./Mode", "../../modules/uv-dialogues-module/MoreInfoDialogue", "../../modules/uv-moreinforightpanel-module/MoreInfoRightPanel", "../../modules/uv-multiselectdialogue-module/MultiSelectDialogue", "./MultiSelectionArgs", "../../modules/uv-pagingheaderpanel-module/PagingHeaderPanel", "../../Params", "../../modules/uv-shared-module/Point", "../../modules/uv-seadragoncenterpanel-module/SeadragonCenterPanel", "./SettingsDialogue", "./ShareDialogue", "../../modules/uv-shared-module/Shell"], function (require, exports, BaseCommands_1, BaseExtension_1, Bookmark_1, Commands_1, ContentLeftPanel_1, CroppedImageDimensions_1, DownloadDialogue_1, ExternalContentDialogue_1, MobileFooter_1, FooterPanel_1, HelpDialogue_1, Metrics_1, Mode_1, MoreInfoDialogue_1, MoreInfoRightPanel_1, MultiSelectDialogue_1, MultiSelectionArgs_1, PagingHeaderPanel_1, Params_1, Point_1, SeadragonCenterPanel_1, SettingsDialogue_1, ShareDialogue_1, Shell_1) {
    "use strict";
    var SearchResult = Manifold.SearchResult;
    var Size = Utils.Measurements.Size;
    var Extension = (function (_super) {
        __extends(Extension, _super);
        function Extension(bootstrapper) {
            var _this = _super.call(this, bootstrapper) || this;
            _this.currentRotation = 0;
            _this.isSearching = false;
            _this.searchResults = [];
            return _this;
        }
        Extension.prototype.create = function () {
            var _this = this;
            _super.prototype.create.call(this);
            var that = this;
            $.subscribe(BaseCommands_1.BaseCommands.METRIC_CHANGED, function () {
                if (_this.metric === Metrics_1.Metrics.MOBILE_LANDSCAPE) {
                    var settings = {};
                    settings.pagingEnabled = false;
                    _this.updateSettings(settings);
                    $.publish(BaseCommands_1.BaseCommands.UPDATE_SETTINGS);
                    Shell_1.Shell.$rightPanel.hide();
                }
                else {
                    Shell_1.Shell.$rightPanel.show();
                }
            });
            $.subscribe(Commands_1.Commands.CLEAR_SEARCH, function (e) {
                _this.searchResults = null;
                $.publish(Commands_1.Commands.SEARCH_RESULTS_CLEARED);
                _this.triggerSocket(Commands_1.Commands.CLEAR_SEARCH);
            });
            $.subscribe(BaseCommands_1.BaseCommands.DOWN_ARROW, function (e) {
                if (!_this.useArrowKeysToNavigate()) {
                    _this.centerPanel.setFocus();
                }
            });
            $.subscribe(BaseCommands_1.BaseCommands.END, function (e) {
                _this.viewPage(_this.helper.getLastPageIndex());
            });
            $.subscribe(Commands_1.Commands.FIRST, function (e) {
                _this.triggerSocket(Commands_1.Commands.FIRST);
                _this.viewPage(_this.helper.getFirstPageIndex());
            });
            $.subscribe(Commands_1.Commands.GALLERY_DECREASE_SIZE, function (e) {
                _this.triggerSocket(Commands_1.Commands.GALLERY_DECREASE_SIZE);
            });
            $.subscribe(Commands_1.Commands.GALLERY_INCREASE_SIZE, function (e) {
                _this.triggerSocket(Commands_1.Commands.GALLERY_INCREASE_SIZE);
            });
            $.subscribe(Commands_1.Commands.GALLERY_THUMB_SELECTED, function (e) {
                _this.triggerSocket(Commands_1.Commands.GALLERY_THUMB_SELECTED);
            });
            $.subscribe(BaseCommands_1.BaseCommands.HOME, function (e) {
                _this.viewPage(_this.helper.getFirstPageIndex());
            });
            $.subscribe(Commands_1.Commands.IMAGE_SEARCH, function (e, index) {
                _this.triggerSocket(Commands_1.Commands.IMAGE_SEARCH, index);
                _this.viewPage(index);
            });
            $.subscribe(Commands_1.Commands.LAST, function (e) {
                _this.triggerSocket(Commands_1.Commands.LAST);
                _this.viewPage(_this.helper.getLastPageIndex());
            });
            $.subscribe(BaseCommands_1.BaseCommands.LEFT_ARROW, function (e) {
                if (_this.useArrowKeysToNavigate()) {
                    _this.viewPage(_this.getPrevPageIndex());
                }
                else {
                    _this.centerPanel.setFocus();
                }
            });
            $.subscribe(BaseCommands_1.BaseCommands.LEFTPANEL_COLLAPSE_FULL_START, function (e) {
                if (_this.metric !== Metrics_1.Metrics.MOBILE_LANDSCAPE) {
                    Shell_1.Shell.$rightPanel.show();
                }
            });
            $.subscribe(BaseCommands_1.BaseCommands.LEFTPANEL_COLLAPSE_FULL_FINISH, function (e) {
                Shell_1.Shell.$centerPanel.show();
                _this.resize();
            });
            $.subscribe(BaseCommands_1.BaseCommands.LEFTPANEL_EXPAND_FULL_START, function (e) {
                Shell_1.Shell.$centerPanel.hide();
                Shell_1.Shell.$rightPanel.hide();
            });
            $.subscribe(BaseCommands_1.BaseCommands.MINUS, function (e) {
                _this.centerPanel.setFocus();
            });
            $.subscribe(Commands_1.Commands.MODE_CHANGED, function (e, mode) {
                _this.triggerSocket(Commands_1.Commands.MODE_CHANGED, mode);
                _this.mode = new Mode_1.Mode(mode);
                var settings = _this.getSettings();
                $.publish(BaseCommands_1.BaseCommands.SETTINGS_CHANGED, [settings]);
            });
            $.subscribe(Commands_1.Commands.MULTISELECTION_MADE, function (e, ids) {
                var args = new MultiSelectionArgs_1.MultiSelectionArgs();
                args.manifestUri = _this.helper.iiifResourceUri;
                args.allCanvases = ids.length === _this.helper.getCanvases().length;
                args.canvases = ids;
                args.format = _this.config.options.multiSelectionMimeType;
                args.sequence = _this.helper.getCurrentSequence().id;
                _this.triggerSocket(Commands_1.Commands.MULTISELECTION_MADE, args);
            });
            $.subscribe(Commands_1.Commands.NEXT, function (e) {
                _this.triggerSocket(Commands_1.Commands.NEXT);
                _this.viewPage(_this.getNextPageIndex());
            });
            $.subscribe(Commands_1.Commands.NEXT_SEARCH_RESULT, function () {
                _this.triggerSocket(Commands_1.Commands.NEXT_SEARCH_RESULT);
            });
            $.subscribe(Commands_1.Commands.NEXT_IMAGES_SEARCH_RESULT_UNAVAILABLE, function () {
                _this.triggerSocket(Commands_1.Commands.NEXT_IMAGES_SEARCH_RESULT_UNAVAILABLE);
                _this.nextSearchResult();
            });
            $.subscribe(Commands_1.Commands.PREV_IMAGES_SEARCH_RESULT_UNAVAILABLE, function () {
                _this.triggerSocket(Commands_1.Commands.PREV_IMAGES_SEARCH_RESULT_UNAVAILABLE);
                _this.prevSearchResult();
            });
            $.subscribe(Commands_1.Commands.OPEN_THUMBS_VIEW, function (e) {
                _this.triggerSocket(Commands_1.Commands.OPEN_THUMBS_VIEW);
            });
            $.subscribe(Commands_1.Commands.OPEN_TREE_VIEW, function (e) {
                _this.triggerSocket(Commands_1.Commands.OPEN_TREE_VIEW);
            });
            $.subscribe(BaseCommands_1.BaseCommands.PAGE_DOWN, function (e) {
                _this.viewPage(_this.getNextPageIndex());
            });
            $.subscribe(Commands_1.Commands.PAGE_SEARCH, function (e, value) {
                _this.triggerSocket(Commands_1.Commands.PAGE_SEARCH, value);
                _this.viewLabel(value);
            });
            $.subscribe(BaseCommands_1.BaseCommands.PAGE_UP, function (e) {
                _this.viewPage(_this.getPrevPageIndex());
            });
            $.subscribe(Commands_1.Commands.PAGING_TOGGLED, function (e, obj) {
                _this.triggerSocket(Commands_1.Commands.PAGING_TOGGLED, obj);
            });
            $.subscribe(BaseCommands_1.BaseCommands.PLUS, function (e) {
                _this.centerPanel.setFocus();
            });
            $.subscribe(Commands_1.Commands.PREV, function (e) {
                _this.triggerSocket(Commands_1.Commands.PREV);
                _this.viewPage(_this.getPrevPageIndex());
            });
            $.subscribe(Commands_1.Commands.PREV_SEARCH_RESULT, function () {
                _this.triggerSocket(Commands_1.Commands.PREV_SEARCH_RESULT);
            });
            $.subscribe(Commands_1.Commands.PRINT, function () {
                _this.print();
            });
            $.subscribe(BaseCommands_1.BaseCommands.RIGHT_ARROW, function (e) {
                if (_this.useArrowKeysToNavigate()) {
                    _this.viewPage(_this.getNextPageIndex());
                }
                else {
                    _this.centerPanel.setFocus();
                }
            });
            $.subscribe(Commands_1.Commands.SEADRAGON_ANIMATION, function () {
                _this.triggerSocket(Commands_1.Commands.SEADRAGON_ANIMATION);
            });
            $.subscribe(Commands_1.Commands.SEADRAGON_ANIMATION_FINISH, function (e, viewer) {
                if (_this.centerPanel && _this.centerPanel.currentBounds) {
                    _this.setParam(Params_1.Params.xywh, _this.centerPanel.getViewportBounds().toString());
                }
                var canvas = _this.helper.getCurrentCanvas();
                _this.triggerSocket(Commands_1.Commands.CURRENT_VIEW_URI, {
                    cropUri: _this.getCroppedImageUri(canvas, _this.getViewer()),
                    fullUri: _this.getConfinedImageUri(canvas, canvas.getWidth())
                });
            });
            $.subscribe(Commands_1.Commands.SEADRAGON_ANIMATION_START, function () {
                _this.triggerSocket(Commands_1.Commands.SEADRAGON_ANIMATION_START);
            });
            $.subscribe(Commands_1.Commands.SEADRAGON_OPEN, function () {
                if (!_this.useArrowKeysToNavigate()) {
                    _this.centerPanel.setFocus();
                }
            });
            $.subscribe(Commands_1.Commands.SEADRAGON_RESIZE, function () {
                _this.triggerSocket(Commands_1.Commands.SEADRAGON_RESIZE);
            });
            $.subscribe(Commands_1.Commands.SEADRAGON_ROTATION, function (e, rotation) {
                _this.triggerSocket(Commands_1.Commands.SEADRAGON_ROTATION);
                _this.currentRotation = rotation;
                _this.setParam(Params_1.Params.rotation, rotation);
            });
            $.subscribe(Commands_1.Commands.SEARCH, function (e, terms) {
                _this.triggerSocket(Commands_1.Commands.SEARCH, terms);
                _this.searchWithin(terms);
            });
            $.subscribe(Commands_1.Commands.SEARCH_PREVIEW_FINISH, function (e) {
                _this.triggerSocket(Commands_1.Commands.SEARCH_PREVIEW_FINISH);
            });
            $.subscribe(Commands_1.Commands.SEARCH_PREVIEW_START, function (e) {
                _this.triggerSocket(Commands_1.Commands.SEARCH_PREVIEW_START);
            });
            $.subscribe(Commands_1.Commands.SEARCH_RESULTS, function (e, obj) {
                _this.triggerSocket(Commands_1.Commands.SEARCH_RESULTS, obj);
            });
            $.subscribe(Commands_1.Commands.SEARCH_RESULT_CANVAS_CHANGED, function (e, rect) {
                _this.viewPage(rect.canvasIndex);
            });
            $.subscribe(Commands_1.Commands.SEARCH_RESULTS_EMPTY, function (e) {
                _this.triggerSocket(Commands_1.Commands.SEARCH_RESULTS_EMPTY);
            });
            $.subscribe(BaseCommands_1.BaseCommands.THUMB_SELECTED, function (e, thumb) {
                _this.viewPage(thumb.index);
            });
            $.subscribe(Commands_1.Commands.TREE_NODE_SELECTED, function (e, node) {
                _this.triggerSocket(Commands_1.Commands.TREE_NODE_SELECTED, node.data.path);
                _this.treeNodeSelected(node);
            });
            $.subscribe(BaseCommands_1.BaseCommands.UP_ARROW, function (e) {
                if (!_this.useArrowKeysToNavigate()) {
                    _this.centerPanel.setFocus();
                }
            });
            $.subscribe(BaseCommands_1.BaseCommands.UPDATE_SETTINGS, function (e) {
                _this.viewPage(_this.helper.canvasIndex, true);
                var settings = _this.getSettings();
                $.publish(BaseCommands_1.BaseCommands.SETTINGS_CHANGED, [settings]);
            });
            $.subscribe(Commands_1.Commands.VIEW_PAGE, function (e, index) {
                _this.triggerSocket(Commands_1.Commands.VIEW_PAGE, index);
                _this.viewPage(index);
            });
            Utils.Async.waitFor(function () {
                return _this.centerPanel && _this.centerPanel.isCreated;
            }, function () {
                _this.checkForSearchParam();
                _this.checkForRotationParam();
            });
        };
        Extension.prototype.createModules = function () {
            _super.prototype.createModules.call(this);
            if (this.isHeaderPanelEnabled()) {
                this.headerPanel = new PagingHeaderPanel_1.PagingHeaderPanel(Shell_1.Shell.$headerPanel);
            }
            else {
                Shell_1.Shell.$headerPanel.hide();
            }
            if (this.isLeftPanelEnabled()) {
                this.leftPanel = new ContentLeftPanel_1.ContentLeftPanel(Shell_1.Shell.$leftPanel);
            }
            else {
                Shell_1.Shell.$leftPanel.hide();
            }
            this.centerPanel = new SeadragonCenterPanel_1.SeadragonCenterPanel(Shell_1.Shell.$centerPanel);
            if (this.isRightPanelEnabled()) {
                this.rightPanel = new MoreInfoRightPanel_1.MoreInfoRightPanel(Shell_1.Shell.$rightPanel);
            }
            else {
                Shell_1.Shell.$rightPanel.hide();
            }
            if (this.isFooterPanelEnabled()) {
                this.footerPanel = new FooterPanel_1.FooterPanel(Shell_1.Shell.$footerPanel);
                this.mobileFooterPanel = new MobileFooter_1.FooterPanel(Shell_1.Shell.$mobileFooterPanel);
            }
            else {
                Shell_1.Shell.$footerPanel.hide();
            }
            this.$helpDialogue = $('<div class="overlay help"></div>');
            Shell_1.Shell.$overlays.append(this.$helpDialogue);
            this.helpDialogue = new HelpDialogue_1.HelpDialogue(this.$helpDialogue);
            this.$moreInfoDialogue = $('<div class="overlay moreInfo"></div>');
            Shell_1.Shell.$overlays.append(this.$moreInfoDialogue);
            this.moreInfoDialogue = new MoreInfoDialogue_1.MoreInfoDialogue(this.$moreInfoDialogue);
            this.$multiSelectDialogue = $('<div class="overlay multiSelect"></div>');
            Shell_1.Shell.$overlays.append(this.$multiSelectDialogue);
            this.multiSelectDialogue = new MultiSelectDialogue_1.MultiSelectDialogue(this.$multiSelectDialogue);
            this.$shareDialogue = $('<div class="overlay share"></div>');
            Shell_1.Shell.$overlays.append(this.$shareDialogue);
            this.shareDialogue = new ShareDialogue_1.ShareDialogue(this.$shareDialogue);
            this.$downloadDialogue = $('<div class="overlay download"></div>');
            Shell_1.Shell.$overlays.append(this.$downloadDialogue);
            this.downloadDialogue = new DownloadDialogue_1.DownloadDialogue(this.$downloadDialogue);
            this.$settingsDialogue = $('<div class="overlay settings"></div>');
            Shell_1.Shell.$overlays.append(this.$settingsDialogue);
            this.settingsDialogue = new SettingsDialogue_1.SettingsDialogue(this.$settingsDialogue);
            this.$externalContentDialogue = $('<div class="overlay externalContent"></div>');
            Shell_1.Shell.$overlays.append(this.$externalContentDialogue);
            this.externalContentDialogue = new ExternalContentDialogue_1.ExternalContentDialogue(this.$externalContentDialogue);
            if (this.isHeaderPanelEnabled()) {
                this.headerPanel.init();
            }
            if (this.isLeftPanelEnabled()) {
                this.leftPanel.init();
            }
            if (this.isRightPanelEnabled()) {
                this.rightPanel.init();
            }
            if (this.isFooterPanelEnabled()) {
                this.footerPanel.init();
            }
        };
        Extension.prototype.checkForSearchParam = function () {
            // if a h value is in the hash params, do a search.
            if (this.isDeepLinkingEnabled()) {
                // if a highlight param is set, use it to search.
                var highlight = this.getParam(Params_1.Params.highlight);
                if (highlight) {
                    highlight.replace(/\+/g, " ").replace(/"/g, "");
                    $.publish(Commands_1.Commands.SEARCH, [highlight]);
                }
            }
        };
        Extension.prototype.checkForRotationParam = function () {
            // if a rotation value is in the hash params, set currentRotation
            if (this.isDeepLinkingEnabled()) {
                var rotation = Number(this.getParam(Params_1.Params.rotation));
                if (rotation) {
                    $.publish(Commands_1.Commands.SEADRAGON_ROTATION, [rotation]);
                }
            }
        };
        Extension.prototype.viewPage = function (canvasIndex, isReload) {
            // if it's a valid canvas index.
            if (canvasIndex === -1)
                return;
            if (this.helper.isCanvasIndexOutOfRange(canvasIndex)) {
                this.showMessage(this.config.content.canvasIndexOutOfRange);
                canvasIndex = 0;
            }
            if (this.isPagingSettingEnabled() && !isReload) {
                var indices = this.getPagedIndices(canvasIndex);
                // if the page is already displayed, only advance canvasIndex.
                if (indices.contains(this.helper.canvasIndex)) {
                    this.viewCanvas(canvasIndex);
                    return;
                }
            }
            this.viewCanvas(canvasIndex);
        };
        Extension.prototype.getViewer = function () {
            return this.centerPanel.viewer;
        };
        Extension.prototype.getMode = function () {
            if (this.mode)
                return this.mode;
            switch (this.helper.getManifestType().toString()) {
                case manifesto.ManifestType.monograph().toString():
                    return Mode_1.Mode.page;
                case manifesto.ManifestType.manuscript().toString():
                    return Mode_1.Mode.page;
                default:
                    return Mode_1.Mode.image;
            }
        };
        Extension.prototype.getViewportBounds = function () {
            if (!this.centerPanel)
                return null;
            var bounds = this.centerPanel.getViewportBounds();
            if (bounds) {
                return bounds.toString();
            }
            return null;
        };
        Extension.prototype.getViewerRotation = function () {
            if (!this.centerPanel)
                return null;
            return this.currentRotation;
        };
        Extension.prototype.viewRange = function (path) {
            //this.currentRangePath = path;
            var range = this.helper.getRangeByPath(path);
            if (!range)
                return;
            var canvasId = range.getCanvasIds()[0];
            var index = this.helper.getCanvasIndexById(canvasId);
            this.viewPage(index);
        };
        Extension.prototype.viewLabel = function (label) {
            if (!label) {
                this.showMessage(this.config.modules.genericDialogue.content.emptyValue);
                $.publish(BaseCommands_1.BaseCommands.CANVAS_INDEX_CHANGE_FAILED);
                return;
            }
            var index = this.helper.getCanvasIndexByLabel(label);
            if (index != -1) {
                this.viewPage(index);
            }
            else {
                this.showMessage(this.config.modules.genericDialogue.content.pageNotFound);
                $.publish(BaseCommands_1.BaseCommands.CANVAS_INDEX_CHANGE_FAILED);
            }
        };
        Extension.prototype.treeNodeSelected = function (node) {
            var data = node.data;
            if (!data.type)
                return;
            switch (data.type) {
                case manifesto.IIIFResourceType.manifest().toString():
                    this.viewManifest(data);
                    break;
                case manifesto.IIIFResourceType.collection().toString():
                    // note: this won't get called as the tree component now has branchNodesSelectable = false
                    // useful to keep around for reference
                    this.viewCollection(data);
                    break;
                default:
                    this.viewRange(data.path);
                    break;
            }
        };
        Extension.prototype.clearSearch = function () {
            this.searchResults = [];
            // reload current index as it may contain results.
            this.viewPage(this.helper.canvasIndex);
        };
        Extension.prototype.prevSearchResult = function () {
            var foundResult;
            // get the first result with a canvasIndex less than the current index.
            for (var i = this.searchResults.length - 1; i >= 0; i--) {
                var result = this.searchResults[i];
                if (result.canvasIndex <= this.getPrevPageIndex()) {
                    foundResult = result;
                    this.viewPage(foundResult.canvasIndex);
                    break;
                }
            }
        };
        Extension.prototype.nextSearchResult = function () {
            var foundResult;
            // get the first result with an index greater than the current index.
            for (var i = 0; i < this.searchResults.length; i++) {
                var result = this.searchResults[i];
                if (result.canvasIndex >= this.getNextPageIndex()) {
                    foundResult = result;
                    this.viewPage(result.canvasIndex);
                    break;
                }
            }
        };
        Extension.prototype.bookmark = function () {
            _super.prototype.bookmark.call(this);
            var canvas = this.helper.getCurrentCanvas();
            var bookmark = new Bookmark_1.Bookmark();
            bookmark.index = this.helper.canvasIndex;
            bookmark.label = Manifesto.TranslationCollection.getValue(canvas.getLabel());
            bookmark.path = this.getCroppedImageUri(canvas, this.getViewer());
            bookmark.thumb = canvas.getCanonicalImageUri(this.config.options.bookmarkThumbWidth);
            bookmark.title = this.helper.getLabel();
            bookmark.trackingLabel = window.trackingLabel;
            bookmark.type = manifesto.ElementType.image().toString();
            this.triggerSocket(BaseCommands_1.BaseCommands.BOOKMARK, bookmark);
        };
        Extension.prototype.print = function () {
            // var args: MultiSelectionArgs = new MultiSelectionArgs();
            // args.manifestUri = this.helper.iiifResourceUri;
            // args.allCanvases = true;
            // args.format = this.config.options.printMimeType;
            // args.sequence = this.helper.getCurrentSequence().id;
            window.print();
            this.triggerSocket(Commands_1.Commands.PRINT);
        };
        Extension.prototype.getCroppedImageDimensions = function (canvas, viewer) {
            if (!viewer)
                return null;
            if (!viewer.viewport)
                return null;
            if (!canvas.getHeight() || !canvas.getWidth()) {
                return null;
            }
            var bounds = viewer.viewport.getBounds(true);
            var dimensions = new CroppedImageDimensions_1.CroppedImageDimensions();
            var width = Math.floor(bounds.width);
            var height = Math.floor(bounds.height);
            var x = Math.floor(bounds.x);
            var y = Math.floor(bounds.y);
            // constrain to image bounds
            if (x + width > canvas.getWidth()) {
                width = canvas.getWidth() - x;
            }
            else if (x < 0) {
                width = width + x;
                x = 0;
            }
            if (y + height > canvas.getHeight()) {
                height = canvas.getHeight() - y;
            }
            else if (y < 0) {
                height = height + y;
                y = 0;
            }
            width = Math.min(width, canvas.getWidth());
            height = Math.min(height, canvas.getHeight());
            var regionWidth = width;
            var regionHeight = height;
            if (canvas.externalResource.data && canvas.externalResource.data.profile && canvas.externalResource.data.profile[1]) {
                var maxSize = new Size(canvas.externalResource.data.profile[1].maxWidth, canvas.externalResource.data.profile[1].maxHeight);
                if (!_.isUndefined(maxSize.width) && !_.isUndefined(maxSize.height)) {
                    if (width > maxSize.width) {
                        var newWidth = maxSize.width;
                        height = Math.round(newWidth * (height / width));
                        width = newWidth;
                    }
                    if (height > maxSize.height) {
                        var newHeight = maxSize.height;
                        width = Math.round((width / height) * newHeight);
                        height = newHeight;
                    }
                }
            }
            dimensions.region = new Size(regionWidth, regionHeight);
            dimensions.regionPos = new Point_1.Point(x, y);
            dimensions.size = new Size(width, height);
            return dimensions;
        };
        // keep this around for reference
        // getOnScreenCroppedImageDimensions(canvas: Manifesto.ICanvas, viewer: any): CroppedImageDimensions {
        //     if (!viewer) return null;
        //     if (!viewer.viewport) return null;
        //     if (!canvas.getHeight() || !canvas.getWidth()){
        //         return null;
        //     }
        //     var bounds = viewer.viewport.getBounds(true);
        //     var containerSize = viewer.viewport.getContainerSize();
        //     var zoom = viewer.viewport.getZoom(true);
        //     var top = Math.max(0, bounds.y);
        //     var left = Math.max(0, bounds.x);
        //     // change top to be normalised value proportional to height of image, not width (as per OSD).
        //     top = 1 / (canvas.getHeight() / parseInt(String(canvas.getWidth() * top)));
        //     // get on-screen pixel sizes.
        //     var viewportWidthPx = containerSize.x;
        //     var viewportHeightPx = containerSize.y;
        //     var imageWidthPx = parseInt(String(viewportWidthPx * zoom));
        //     var ratio = canvas.getWidth() / imageWidthPx;
        //     var imageHeightPx = parseInt(String(canvas.getHeight() / ratio));
        //     var viewportLeftPx = parseInt(String(left * imageWidthPx));
        //     var viewportTopPx = parseInt(String(top * imageHeightPx));
        //     var rect1Left = 0;
        //     var rect1Right = imageWidthPx;
        //     var rect1Top = 0;
        //     var rect1Bottom = imageHeightPx;
        //     var rect2Left = viewportLeftPx;
        //     var rect2Right = viewportLeftPx + viewportWidthPx;
        //     var rect2Top = viewportTopPx;
        //     var rect2Bottom = viewportTopPx + viewportHeightPx;
        //     var sizeWidth = Math.max(0, Math.min(rect1Right, rect2Right) - Math.max(rect1Left, rect2Left));
        //     var sizeHeight = Math.max(0, Math.min(rect1Bottom, rect2Bottom) - Math.max(rect1Top, rect2Top));
        //     // get original image pixel sizes.
        //     var ratio2 = canvas.getWidth() / imageWidthPx;
        //     var regionWidth = parseInt(String(sizeWidth * ratio2));
        //     var regionHeight = parseInt(String(sizeHeight * ratio2));
        //     var regionTop = parseInt(String(canvas.getHeight() * top));
        //     var regionLeft = parseInt(String(canvas.getWidth() * left));
        //     if (regionTop < 0) regionTop = 0;
        //     if (regionLeft < 0) regionLeft = 0;
        //     var dimensions: CroppedImageDimensions = new CroppedImageDimensions();
        //     dimensions.region = new Size(regionWidth, regionHeight);
        //     dimensions.regionPos = new Point(regionLeft, regionTop);
        //     dimensions.size = new Size(sizeWidth, sizeHeight);
        //     return dimensions;
        // }
        Extension.prototype.getCroppedImageUri = function (canvas, viewer) {
            if (!viewer)
                return null;
            if (!viewer.viewport)
                return null;
            var dimensions = this.getCroppedImageDimensions(canvas, viewer);
            // construct uri
            // {baseuri}/{id}/{region}/{size}/{rotation}/{quality}.jpg
            var baseUri = this.getImageBaseUri(canvas);
            var id = this.getImageId(canvas);
            var region = dimensions.regionPos.x + "," + dimensions.regionPos.y + "," + dimensions.region.width + "," + dimensions.region.height;
            var size = dimensions.size.width + ',' + dimensions.size.height;
            var rotation = this.getViewerRotation();
            var quality = 'default';
            return baseUri + "/" + id + "/" + region + "/" + size + "/" + rotation + "/" + quality + ".jpg";
        };
        Extension.prototype.getConfinedImageDimensions = function (canvas, width) {
            var dimensions = new Size(0, 0);
            dimensions.width = width;
            var normWidth = Math.normalise(width, 0, canvas.getWidth());
            dimensions.height = Math.floor(canvas.getHeight() * normWidth);
            return dimensions;
        };
        Extension.prototype.getConfinedImageUri = function (canvas, width) {
            var baseUri = this.getImageBaseUri(canvas);
            // {baseuri}/{id}/{region}/{size}/{rotation}/{quality}.jpg
            var id = this.getImageId(canvas);
            var region = 'full';
            var dimensions = this.getConfinedImageDimensions(canvas, width);
            var size = dimensions.width + ',' + dimensions.height;
            var rotation = this.getViewerRotation();
            var quality = 'default';
            return baseUri + "/" + id + "/" + region + "/" + size + "/" + rotation + "/" + quality + ".jpg";
        };
        Extension.prototype.getImageId = function (canvas) {
            var id = this.getInfoUri(canvas);
            // First trim off info.json, then extract ID:
            id = id.substr(0, id.lastIndexOf("/"));
            return id.substr(id.lastIndexOf("/") + 1);
        };
        Extension.prototype.getImageBaseUri = function (canvas) {
            var uri = this.getInfoUri(canvas);
            // First trim off info.json, then trim off ID....
            uri = uri.substr(0, uri.lastIndexOf("/"));
            return uri.substr(0, uri.lastIndexOf("/"));
        };
        Extension.prototype.getInfoUri = function (canvas) {
            var infoUri;
            var images = canvas.getImages();
            if (images && images.length) {
                var firstImage = images[0];
                var resource = firstImage.getResource();
                var services = resource.getServices();
                for (var i = 0; i < services.length; i++) {
                    var service = services[i];
                    var id = service.id;
                    if (!_.endsWith(id, '/')) {
                        id += '/';
                    }
                    if (manifesto.Utils.isImageProfile(service.getProfile())) {
                        infoUri = id + 'info.json';
                    }
                }
            }
            if (!infoUri) {
                // todo: use compiler flag (when available)
                infoUri = 'lib/imageunavailable.json';
            }
            return infoUri;
        };
        Extension.prototype.getEmbedScript = function (template, width, height, zoom, rotation) {
            var configUri = this.config.uri || '';
            var script = String.format(template, this.getSerializedLocales(), configUri, this.helper.iiifResourceUri, this.helper.collectionIndex, this.helper.manifestIndex, this.helper.sequenceIndex, this.helper.canvasIndex, zoom, rotation, width, height, this.embedScriptUri);
            return script;
        };
        Extension.prototype.getPrevPageIndex = function (canvasIndex) {
            if (_.isUndefined(canvasIndex))
                canvasIndex = this.helper.canvasIndex;
            var index;
            if (this.isPagingSettingEnabled()) {
                var indices = this.getPagedIndices(canvasIndex);
                if (this.helper.isRightToLeft()) {
                    index = indices.last() - 1;
                }
                else {
                    index = indices[0] - 1;
                }
            }
            else {
                index = canvasIndex - 1;
            }
            return index;
        };
        Extension.prototype.isSearchWithinEnabled = function () {
            if (!Utils.Bools.getBool(this.config.options.searchWithinEnabled, false)) {
                return false;
            }
            if (!this.helper.getSearchWithinService()) {
                return false;
            }
            return true;
        };
        Extension.prototype.isPagingSettingEnabled = function () {
            if (this.helper.isPagingAvailable()) {
                return this.getSettings().pagingEnabled;
            }
            return false;
        };
        Extension.prototype.getNextPageIndex = function (canvasIndex) {
            if (_.isUndefined(canvasIndex))
                canvasIndex = this.helper.canvasIndex;
            var index;
            if (this.isPagingSettingEnabled()) {
                var indices = this.getPagedIndices(canvasIndex);
                if (this.helper.isRightToLeft()) {
                    index = indices[0] + 1;
                }
                else {
                    index = indices.last() + 1;
                }
            }
            else {
                index = canvasIndex + 1;
            }
            if (index > this.helper.getTotalCanvases() - 1) {
                return -1;
            }
            return index;
        };
        Extension.prototype.getAutoCompleteService = function () {
            var service = this.helper.getSearchWithinService();
            if (!service)
                return null;
            return service.getService(manifesto.ServiceProfile.autoComplete());
        };
        Extension.prototype.getAutoCompleteUri = function () {
            var service = this.getAutoCompleteService();
            if (!service)
                return null;
            return service.id + '?q={0}';
        };
        Extension.prototype.getSearchWithinServiceUri = function () {
            var service = this.helper.getSearchWithinService();
            if (!service)
                return null;
            var uri = service.id;
            uri = uri + "?q={0}";
            return uri;
        };
        Extension.prototype.searchWithin = function (terms) {
            var _this = this;
            if (this.isSearching)
                return;
            this.isSearching = true;
            // clear search results
            this.searchResults = [];
            var that = this;
            var searchUri = this.getSearchWithinServiceUri();
            searchUri = String.format(searchUri, terms);
            this.getSearchResults(searchUri, terms, this.searchResults, function (results) {
                _this.isSearching = false;
                if (results.length) {
                    _this.searchResults = results.sort(function (a, b) {
                        return a.canvasIndex - b.canvasIndex;
                    });
                    $.publish(Commands_1.Commands.SEARCH_RESULTS, [{ terms: terms, results: results }]);
                    // reload current index as it may contain results.
                    that.viewPage(that.helper.canvasIndex, true);
                }
                else {
                    that.showMessage(that.config.modules.genericDialogue.content.noMatches, function () {
                        $.publish(Commands_1.Commands.SEARCH_RESULTS_EMPTY);
                    });
                }
            });
        };
        Extension.prototype.getSearchResults = function (searchUri, terms, searchResults, cb) {
            var _this = this;
            $.getJSON(searchUri, function (results) {
                if (results.resources && results.resources.length) {
                    searchResults = searchResults.concat(_this.parseSearchJson(results, searchResults));
                }
                if (results.next) {
                    _this.getSearchResults(results.next, terms, searchResults, cb);
                }
                else {
                    cb(searchResults);
                }
            });
        };
        Extension.prototype.parseSearchJson = function (resultsToParse, searchResults) {
            var parsedResults = [];
            for (var i = 0; i < resultsToParse.resources.length; i++) {
                var resource = resultsToParse.resources[i];
                var canvasIndex = this.helper.getCanvasIndexById(resource.on.match(/(.*)#/)[1]);
                var searchResult = new SearchResult(resource, canvasIndex);
                var match = parsedResults.en().where(function (x) { return x.canvasIndex === searchResult.canvasIndex; }).first();
                // if there's already a SearchResult for the canvas index, add a rect to it, otherwise create a new SearchResult
                if (match) {
                    match.addRect(resource);
                }
                else {
                    parsedResults.push(searchResult);
                }
            }
            // sort by canvasIndex
            parsedResults.sort(function (a, b) {
                return a.canvasIndex - b.canvasIndex;
            });
            return parsedResults;
        };
        Extension.prototype.getSearchResultRects = function () {
            return this.searchResults.en().selectMany(function (x) { return x.rects; }).toArray();
        };
        Extension.prototype.getCurrentSearchResultRectIndex = function () {
            var searchResultRects = this.getSearchResultRects();
            return searchResultRects.indexOf(this.currentSearchResultRect);
        };
        Extension.prototype.getTotalSearchResultRects = function () {
            var searchResultRects = this.getSearchResultRects();
            return searchResultRects.length;
        };
        Extension.prototype.isFirstSearchResultRect = function () {
            return this.getCurrentSearchResultRectIndex() === 0;
        };
        Extension.prototype.getLastSearchResultRectIndex = function () {
            return this.getTotalSearchResultRects() - 1;
        };
        Extension.prototype.getPagedIndices = function (canvasIndex) {
            if (_.isUndefined(canvasIndex))
                canvasIndex = this.helper.canvasIndex;
            var indices = [];
            // if it's a continuous manifest, get all resources.
            if (this.helper.isContinuous()) {
                indices = $.map(this.helper.getCanvases(), function (c, index) {
                    return index;
                });
            }
            else {
                if (!this.isPagingSettingEnabled()) {
                    indices.push(this.helper.canvasIndex);
                }
                else {
                    if (this.helper.isFirstCanvas(canvasIndex) || (this.helper.isLastCanvas(canvasIndex) && this.helper.isTotalCanvasesEven())) {
                        indices = [canvasIndex];
                    }
                    else if (canvasIndex % 2) {
                        indices = [canvasIndex, canvasIndex + 1];
                    }
                    else {
                        indices = [canvasIndex - 1, canvasIndex];
                    }
                    if (this.helper.isRightToLeft()) {
                        indices = indices.reverse();
                    }
                }
            }
            return indices;
        };
        return Extension;
    }(BaseExtension_1.BaseExtension));
    exports.Extension = Extension;
});
//# sourceMappingURL=Extension.js.map;
define('extensions/uv-mediaelement-extension/Commands',["require", "exports"], function (require, exports) {
    "use strict";
    var Commands = (function () {
        function Commands() {
        }
        return Commands;
    }());
    Commands.namespace = 'mediaelementExtension.';
    Commands.MEDIA_ENDED = Commands.namespace + 'onMediaEnded';
    Commands.MEDIA_PAUSED = Commands.namespace + 'onMediaPaused';
    Commands.MEDIA_PLAYED = Commands.namespace + 'onMediaPlayed';
    exports.Commands = Commands;
});
//# sourceMappingURL=Commands.js.map;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define('extensions/uv-mediaelement-extension/DownloadDialogue',["require", "exports", "../../modules/uv-dialogues-module/DownloadDialogue"], function (require, exports, DownloadDialogue_1) {
    "use strict";
    var DownloadDialogue = (function (_super) {
        __extends(DownloadDialogue, _super);
        function DownloadDialogue($element) {
            return _super.call(this, $element) || this;
        }
        DownloadDialogue.prototype.create = function () {
            this.setConfig('downloadDialogue');
            _super.prototype.create.call(this);
        };
        DownloadDialogue.prototype.open = function ($triggerButton) {
            _super.prototype.open.call(this, $triggerButton);
            this.addEntireFileDownloadOptions();
            this.updateNoneAvailable();
            this.resize();
        };
        DownloadDialogue.prototype.isDownloadOptionAvailable = function (option) {
            return _super.prototype.isDownloadOptionAvailable.call(this, option);
        };
        return DownloadDialogue;
    }(DownloadDialogue_1.DownloadDialogue));
    exports.DownloadDialogue = DownloadDialogue;
});
//# sourceMappingURL=DownloadDialogue.js.map;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define('extensions/uv-mediaelement-extension/ShareDialogue',["require", "exports", "../../modules/uv-dialogues-module/ShareDialogue"], function (require, exports, ShareDialogue_1) {
    "use strict";
    var ShareDialogue = (function (_super) {
        __extends(ShareDialogue, _super);
        function ShareDialogue($element) {
            return _super.call(this, $element) || this;
        }
        ShareDialogue.prototype.create = function () {
            this.setConfig('shareDialogue');
            _super.prototype.create.call(this);
        };
        ShareDialogue.prototype.update = function () {
            _super.prototype.update.call(this);
            this.code = this.extension.getEmbedScript(this.options.embedTemplate, this.currentWidth, this.currentHeight);
            this.$code.val(this.code);
        };
        ShareDialogue.prototype.resize = function () {
            _super.prototype.resize.call(this);
        };
        return ShareDialogue;
    }(ShareDialogue_1.ShareDialogue));
    exports.ShareDialogue = ShareDialogue;
});
//# sourceMappingURL=ShareDialogue.js.map;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define('modules/uv-mediaelementcenterpanel-module/MediaElementCenterPanel',["require", "exports", "../uv-shared-module/BaseCommands", "../../extensions/uv-mediaelement-extension/Commands", "../uv-shared-module/CenterPanel"], function (require, exports, BaseCommands_1, Commands_1, CenterPanel_1) {
    "use strict";
    var MediaElementCenterPanel = (function (_super) {
        __extends(MediaElementCenterPanel, _super);
        function MediaElementCenterPanel($element) {
            return _super.call(this, $element) || this;
        }
        MediaElementCenterPanel.prototype.create = function () {
            this.setConfig('mediaelementCenterPanel');
            _super.prototype.create.call(this);
            var that = this;
            // events.
            // only full screen video
            if (this.extension.isVideo()) {
                $.subscribe(BaseCommands_1.BaseCommands.TOGGLE_FULLSCREEN, function (e) {
                    if (that.bootstrapper.isFullScreen) {
                        that.$container.css('backgroundColor', '#000');
                        that.player.enterFullScreen(false);
                    }
                    else {
                        that.$container.css('backgroundColor', 'transparent');
                        that.player.exitFullScreen(false);
                    }
                });
            }
            $.subscribe(BaseCommands_1.BaseCommands.OPEN_EXTERNAL_RESOURCE, function (e, resources) {
                that.openMedia(resources);
            });
            this.$container = $('<div class="container"></div>');
            this.$content.append(this.$container);
            this.title = this.extension.helper.getLabel();
        };
        MediaElementCenterPanel.prototype.openMedia = function (resources) {
            var _this = this;
            var that = this;
            this.extension.getExternalResources(resources).then(function () {
                _this.$container.empty();
                var canvas = _this.extension.helper.getCurrentCanvas();
                _this.mediaHeight = _this.config.defaultHeight;
                _this.mediaWidth = _this.config.defaultWidth;
                _this.$container.height(_this.mediaHeight);
                _this.$container.width(_this.mediaWidth);
                var id = Utils.Dates.getTimeStamp();
                var poster = _this.extension.getPosterImageUri();
                var posterAttr = poster ? ' poster="' + poster + '"' : '';
                var sources = [];
                $.each(canvas.getRenderings(), function (index, rendering) {
                    sources.push({
                        type: rendering.getFormat().toString(),
                        src: rendering.id
                    });
                });
                if (_this.extension.isVideo()) {
                    _this.media = _this.$container.append('<video id="' + id + '" type="video/mp4" class="mejs-uv" controls="controls" preload="none"' + posterAttr + '></video>');
                    _this.player = new MediaElementPlayer("#" + id, {
                        type: ['video/mp4', 'video/webm', 'video/flv'],
                        plugins: ['flash'],
                        alwaysShowControls: false,
                        autosizeProgress: false,
                        success: function (media) {
                            media.addEventListener('canplay', function (e) {
                                that.resize();
                            });
                            media.addEventListener('play', function (e) {
                                $.publish(Commands_1.Commands.MEDIA_PLAYED, [Math.floor(that.player.media.currentTime)]);
                            });
                            media.addEventListener('pause', function (e) {
                                // mediaelement creates a pause event before the ended event. ignore this.
                                if (Math.floor(that.player.media.currentTime) != Math.floor(that.player.media.duration)) {
                                    $.publish(Commands_1.Commands.MEDIA_PAUSED, [Math.floor(that.player.media.currentTime)]);
                                }
                            });
                            media.addEventListener('ended', function (e) {
                                $.publish(Commands_1.Commands.MEDIA_ENDED, [Math.floor(that.player.media.duration)]);
                            });
                            media.setSrc(sources);
                            try {
                                media.load();
                            }
                            catch (e) {
                            }
                        }
                    });
                }
                else {
                    // Try to find an MP3, since this is most likely to work:
                    var preferredSource = 0;
                    for (var i in sources) {
                        if (sources[i].type === "audio/mp3") {
                            preferredSource = i;
                            break;
                        }
                    }
                    _this.media = _this.$container.append('<audio id="' + id + '" type="' + sources[preferredSource].type + '" src="' + sources[preferredSource].src + '" class="mejs-uv" controls="controls" preload="none"' + posterAttr + '></audio>');
                    _this.player = new MediaElementPlayer("#" + id, {
                        plugins: ['flash'],
                        alwaysShowControls: false,
                        autosizeProgress: false,
                        defaultVideoWidth: that.mediaWidth,
                        defaultVideoHeight: that.mediaHeight,
                        success: function (media) {
                            media.addEventListener('canplay', function (e) {
                                that.resize();
                            });
                            media.addEventListener('play', function (e) {
                                $.publish(Commands_1.Commands.MEDIA_PLAYED, [Math.floor(that.player.media.currentTime)]);
                            });
                            media.addEventListener('pause', function (e) {
                                // mediaelement creates a pause event before the ended event. ignore this.
                                if (Math.floor(that.player.media.currentTime) != Math.floor(that.player.media.duration)) {
                                    $.publish(Commands_1.Commands.MEDIA_PAUSED, [Math.floor(that.player.media.currentTime)]);
                                }
                            });
                            media.addEventListener('ended', function (e) {
                                $.publish(Commands_1.Commands.MEDIA_ENDED, [Math.floor(that.player.media.duration)]);
                            });
                            //media.setSrc(sources);
                            try {
                                media.load();
                            }
                            catch (e) {
                            }
                        }
                    });
                }
                _this.resize();
            });
        };
        MediaElementCenterPanel.prototype.resize = function () {
            _super.prototype.resize.call(this);
            // if in Firefox < v13 don't resize the media container.
            if (window.browserDetect.browser === 'Firefox' && window.browserDetect.version < 13) {
                this.$container.width(this.mediaWidth);
                this.$container.height(this.mediaHeight);
            }
            else {
                // fit media to available space.
                var size = Utils.Measurements.Dimensions.fitRect(this.mediaWidth, this.mediaHeight, this.$content.width(), this.$content.height());
                this.$container.height(size.height);
                this.$container.width(size.width);
            }
            if (this.player && !this.extension.isFullScreen()) {
                this.player.resize();
            }
            var left = Math.floor((this.$content.width() - this.$container.width()) / 2);
            var top = Math.floor((this.$content.height() - this.$container.height()) / 2);
            this.$container.css({
                'left': left,
                'top': top
            });
            this.$title.ellipsisFill(this.title);
        };
        return MediaElementCenterPanel;
    }(CenterPanel_1.CenterPanel));
    exports.MediaElementCenterPanel = MediaElementCenterPanel;
});
//# sourceMappingURL=MediaElementCenterPanel.js.map;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define('modules/uv-resourcesleftpanel-module/ThumbsView',["require", "exports", "../uv-shared-module/ThumbsView"], function (require, exports, ThumbsView_1) {
    "use strict";
    var ThumbsView = (function (_super) {
        __extends(ThumbsView, _super);
        function ThumbsView() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ThumbsView.prototype.create = function () {
            this.setConfig('resourcesLeftPanel');
            _super.prototype.create.call(this);
        };
        return ThumbsView;
    }(ThumbsView_1.ThumbsView));
    exports.ThumbsView = ThumbsView;
});
//# sourceMappingURL=ThumbsView.js.map;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define('modules/uv-resourcesleftpanel-module/ResourcesLeftPanel',["require", "exports", "../uv-shared-module/BaseCommands", "../uv-shared-module/LeftPanel", "./ThumbsView"], function (require, exports, BaseCommands_1, LeftPanel_1, ThumbsView_1) {
    "use strict";
    var ResourcesLeftPanel = (function (_super) {
        __extends(ResourcesLeftPanel, _super);
        function ResourcesLeftPanel($element) {
            return _super.call(this, $element) || this;
        }
        ResourcesLeftPanel.prototype.create = function () {
            this.setConfig('resourcesLeftPanel');
            _super.prototype.create.call(this);
            this.setTitle(this.content.title);
            /*
             TODO: make tabs work
            this.$tabs = $('<div class="tabs"></div>');
            this.$main.append(this.$tabs);
    
            this.$thumbsButton = $('<a class="thumbs tab">' + this.content.thumbnails + '</a>');
            this.$thumbsButton.prop('title', this.content.thumbnails);
            this.$tabs.append(this.$thumbsButton);
    
            this.$resourcesButton = $('<a class="resources tab">' + this.content.resources+ '</a>');
            this.$resourcesButton.prop('title', this.content.resources);
            this.$tabs.append(this.$resourcesButton);
             */
            this.$tabsContent = $('<div class="tabsContent"></div>');
            this.$main.append(this.$tabsContent);
            this.$views = $('<div class="views"></div>');
            this.$tabsContent.append(this.$views);
            this.$thumbsView = $('<div class="thumbsView"></div>');
            this.$views.append(this.$thumbsView);
            this.$resourcesView = $('<div class="resourcesView"></div>');
            this.$resources = $('<ul></ul>');
            this.$resourcesView.append(this.$resources);
            this.$views.append(this.$resourcesView);
            this.thumbsView = new ThumbsView_1.ThumbsView(this.$thumbsView);
            this.dataBind();
        };
        ResourcesLeftPanel.prototype.dataBind = function () {
            this.dataBindThumbsView();
            var annotations = this.extension.helper.getResources();
            if (annotations.length === 0) {
                this.$resourcesView.hide();
            }
            for (var i = 0; i < annotations.length; i++) {
                var annotation = annotations[i];
                var resource = annotation.getResource();
                var $listItem = $('<li><a href="' + resource.id + '" target="_blank">' + Manifesto.TranslationCollection.getValue(resource.getLabel()) + ' (' + Utils.Files.simplifyMimeType(resource.getFormat().toString()) + ')' + '</li>');
                this.$resources.append($listItem);
            }
        };
        ResourcesLeftPanel.prototype.dataBindThumbsView = function () {
            if (!this.thumbsView)
                return;
            var width, height;
            var viewingDirection = this.extension.helper.getViewingDirection().toString();
            if (viewingDirection === manifesto.ViewingDirection.topToBottom().toString() || viewingDirection === manifesto.ViewingDirection.bottomToTop().toString()) {
                width = this.config.options.oneColThumbWidth;
                height = this.config.options.oneColThumbHeight;
            }
            else {
                width = this.config.options.twoColThumbWidth;
                height = this.config.options.twoColThumbHeight;
            }
            if (typeof width === "undefined") {
                width = 100;
            }
            if (typeof height === "undefined") {
                height = 100;
            }
            this.thumbsView.thumbs = this.extension.helper.getThumbs(width, height);
            // hide thumb selector for single-part manifests
            if (this.thumbsView.thumbs.length < 2) {
                this.$thumbsView.hide();
            }
            this.thumbsView.databind();
        };
        ResourcesLeftPanel.prototype.expandFullStart = function () {
            _super.prototype.expandFullStart.call(this);
            $.publish(BaseCommands_1.BaseCommands.LEFTPANEL_EXPAND_FULL_START);
        };
        ResourcesLeftPanel.prototype.expandFullFinish = function () {
            _super.prototype.expandFullFinish.call(this);
            $.publish(BaseCommands_1.BaseCommands.LEFTPANEL_EXPAND_FULL_FINISH);
        };
        ResourcesLeftPanel.prototype.collapseFullStart = function () {
            _super.prototype.collapseFullStart.call(this);
            $.publish(BaseCommands_1.BaseCommands.LEFTPANEL_COLLAPSE_FULL_START);
        };
        ResourcesLeftPanel.prototype.collapseFullFinish = function () {
            _super.prototype.collapseFullFinish.call(this);
            $.publish(BaseCommands_1.BaseCommands.LEFTPANEL_COLLAPSE_FULL_FINISH);
        };
        ResourcesLeftPanel.prototype.resize = function () {
            _super.prototype.resize.call(this);
            this.$views.height(this.$main.height());
            this.$resources.height(this.$main.height());
        };
        return ResourcesLeftPanel;
    }(LeftPanel_1.LeftPanel));
    exports.ResourcesLeftPanel = ResourcesLeftPanel;
});
//# sourceMappingURL=ResourcesLeftPanel.js.map;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define('extensions/uv-mediaelement-extension/SettingsDialogue',["require", "exports", "../../modules/uv-dialogues-module/SettingsDialogue"], function (require, exports, SettingsDialogue_1) {
    "use strict";
    var SettingsDialogue = (function (_super) {
        __extends(SettingsDialogue, _super);
        function SettingsDialogue($element) {
            return _super.call(this, $element) || this;
        }
        SettingsDialogue.prototype.create = function () {
            this.setConfig('settingsDialogue');
            _super.prototype.create.call(this);
        };
        return SettingsDialogue;
    }(SettingsDialogue_1.SettingsDialogue));
    exports.SettingsDialogue = SettingsDialogue;
});
//# sourceMappingURL=SettingsDialogue.js.map;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define('extensions/uv-mediaelement-extension/Extension',["require", "exports", "../../modules/uv-shared-module/BaseCommands", "../../modules/uv-shared-module/BaseExtension", "../../modules/uv-shared-module/Bookmark", "./Commands", "./DownloadDialogue", "./ShareDialogue", "../../modules/uv-shared-module/FooterPanel", "../../modules/uv-shared-module/HeaderPanel", "../../modules/uv-dialogues-module/HelpDialogue", "../../modules/uv-mediaelementcenterpanel-module/MediaElementCenterPanel", "../../modules/uv-moreinforightpanel-module/MoreInfoRightPanel", "../../modules/uv-resourcesleftpanel-module/ResourcesLeftPanel", "./SettingsDialogue", "../../modules/uv-shared-module/Shell"], function (require, exports, BaseCommands_1, BaseExtension_1, Bookmark_1, Commands_1, DownloadDialogue_1, ShareDialogue_1, FooterPanel_1, HeaderPanel_1, HelpDialogue_1, MediaElementCenterPanel_1, MoreInfoRightPanel_1, ResourcesLeftPanel_1, SettingsDialogue_1, Shell_1) {
    "use strict";
    var Extension = (function (_super) {
        __extends(Extension, _super);
        function Extension(bootstrapper) {
            return _super.call(this, bootstrapper) || this;
        }
        Extension.prototype.create = function () {
            var _this = this;
            _super.prototype.create.call(this);
            // listen for mediaelement enter/exit fullscreen events.
            $(window).bind('enterfullscreen', function () {
                $.publish(BaseCommands_1.BaseCommands.TOGGLE_FULLSCREEN);
            });
            $(window).bind('exitfullscreen', function () {
                $.publish(BaseCommands_1.BaseCommands.TOGGLE_FULLSCREEN);
            });
            $.subscribe(BaseCommands_1.BaseCommands.THUMB_SELECTED, function (e, canvasIndex) {
                _this.viewCanvas(canvasIndex);
            });
            $.subscribe(BaseCommands_1.BaseCommands.LEFTPANEL_EXPAND_FULL_START, function (e) {
                Shell_1.Shell.$centerPanel.hide();
                Shell_1.Shell.$rightPanel.hide();
            });
            $.subscribe(BaseCommands_1.BaseCommands.LEFTPANEL_COLLAPSE_FULL_FINISH, function (e) {
                Shell_1.Shell.$centerPanel.show();
                Shell_1.Shell.$rightPanel.show();
                _this.resize();
            });
            $.subscribe(Commands_1.Commands.MEDIA_ENDED, function (e) {
                _this.triggerSocket(Commands_1.Commands.MEDIA_ENDED);
            });
            $.subscribe(Commands_1.Commands.MEDIA_PAUSED, function (e) {
                _this.triggerSocket(Commands_1.Commands.MEDIA_PAUSED);
            });
            $.subscribe(Commands_1.Commands.MEDIA_PLAYED, function (e) {
                _this.triggerSocket(Commands_1.Commands.MEDIA_PLAYED);
            });
        };
        Extension.prototype.createModules = function () {
            _super.prototype.createModules.call(this);
            if (this.isHeaderPanelEnabled()) {
                this.headerPanel = new HeaderPanel_1.HeaderPanel(Shell_1.Shell.$headerPanel);
            }
            else {
                Shell_1.Shell.$headerPanel.hide();
            }
            if (this.isLeftPanelEnabled()) {
                this.leftPanel = new ResourcesLeftPanel_1.ResourcesLeftPanel(Shell_1.Shell.$leftPanel);
            }
            this.centerPanel = new MediaElementCenterPanel_1.MediaElementCenterPanel(Shell_1.Shell.$centerPanel);
            if (this.isRightPanelEnabled()) {
                this.rightPanel = new MoreInfoRightPanel_1.MoreInfoRightPanel(Shell_1.Shell.$rightPanel);
            }
            if (this.isFooterPanelEnabled()) {
                this.footerPanel = new FooterPanel_1.FooterPanel(Shell_1.Shell.$footerPanel);
            }
            else {
                Shell_1.Shell.$footerPanel.hide();
            }
            this.$helpDialogue = $('<div class="overlay help"></div>');
            Shell_1.Shell.$overlays.append(this.$helpDialogue);
            this.helpDialogue = new HelpDialogue_1.HelpDialogue(this.$helpDialogue);
            this.$downloadDialogue = $('<div class="overlay download"></div>');
            Shell_1.Shell.$overlays.append(this.$downloadDialogue);
            this.downloadDialogue = new DownloadDialogue_1.DownloadDialogue(this.$downloadDialogue);
            this.$shareDialogue = $('<div class="overlay share"></div>');
            Shell_1.Shell.$overlays.append(this.$shareDialogue);
            this.shareDialogue = new ShareDialogue_1.ShareDialogue(this.$shareDialogue);
            this.$settingsDialogue = $('<div class="overlay settings"></div>');
            Shell_1.Shell.$overlays.append(this.$settingsDialogue);
            this.settingsDialogue = new SettingsDialogue_1.SettingsDialogue(this.$settingsDialogue);
            if (this.isLeftPanelEnabled()) {
                this.leftPanel.init();
            }
            if (this.isRightPanelEnabled()) {
                this.rightPanel.init();
            }
        };
        Extension.prototype.isLeftPanelEnabled = function () {
            return Utils.Bools.getBool(this.config.options.leftPanelEnabled, true)
                && ((this.helper.isMultiCanvas() || this.helper.isMultiSequence()) || this.helper.hasResources());
        };
        Extension.prototype.bookmark = function () {
            _super.prototype.bookmark.call(this);
            var canvas = this.extensions.helper.getCurrentCanvas();
            var bookmark = new Bookmark_1.Bookmark();
            bookmark.index = this.helper.canvasIndex;
            bookmark.label = Manifesto.TranslationCollection.getValue(canvas.getLabel());
            bookmark.path = this.getBookmarkUri();
            bookmark.thumb = canvas.getProperty('thumbnail');
            bookmark.title = this.helper.getLabel();
            bookmark.trackingLabel = window.trackingLabel;
            if (this.isVideo()) {
                bookmark.type = manifesto.ElementType.movingimage().toString();
            }
            else {
                bookmark.type = manifesto.ElementType.sound().toString();
            }
            this.triggerSocket(BaseCommands_1.BaseCommands.BOOKMARK, bookmark);
        };
        Extension.prototype.getEmbedScript = function (template, width, height) {
            var configUri = this.config.uri || '';
            var script = String.format(template, this.getSerializedLocales(), configUri, this.helper.iiifResourceUri, this.helper.collectionIndex, this.helper.manifestIndex, this.helper.sequenceIndex, this.helper.canvasIndex, width, height, this.embedScriptUri);
            return script;
        };
        // todo: use canvas.getThumbnail()
        Extension.prototype.getPosterImageUri = function () {
            return this.helper.getCurrentCanvas().getProperty('thumbnail');
        };
        Extension.prototype.isVideo = function () {
            var elementType = this.helper.getElementType();
            return elementType.toString() === manifesto.ElementType.movingimage().toString();
        };
        return Extension;
    }(BaseExtension_1.BaseExtension));
    exports.Extension = Extension;
});
//# sourceMappingURL=Extension.js.map;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define('extensions/uv-pdf-extension/DownloadDialogue',["require", "exports", "../../modules/uv-dialogues-module/DownloadDialogue"], function (require, exports, DownloadDialogue_1) {
    "use strict";
    var DownloadDialogue = (function (_super) {
        __extends(DownloadDialogue, _super);
        function DownloadDialogue($element) {
            return _super.call(this, $element) || this;
        }
        DownloadDialogue.prototype.create = function () {
            this.setConfig('downloadDialogue');
            _super.prototype.create.call(this);
        };
        DownloadDialogue.prototype.open = function ($triggerButton) {
            _super.prototype.open.call(this, $triggerButton);
            this.addEntireFileDownloadOptions();
            if (!this.$downloadOptions.find('li:visible').length) {
                this.$noneAvailable.show();
            }
            else {
                // select first option.
                this.$noneAvailable.hide();
            }
            this.resize();
        };
        DownloadDialogue.prototype.isDownloadOptionAvailable = function (option) {
            return _super.prototype.isDownloadOptionAvailable.call(this, option);
        };
        return DownloadDialogue;
    }(DownloadDialogue_1.DownloadDialogue));
    exports.DownloadDialogue = DownloadDialogue;
});
//# sourceMappingURL=DownloadDialogue.js.map;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define('extensions/uv-pdf-extension/ShareDialogue',["require", "exports", "../../modules/uv-dialogues-module/ShareDialogue"], function (require, exports, ShareDialogue_1) {
    "use strict";
    var ShareDialogue = (function (_super) {
        __extends(ShareDialogue, _super);
        function ShareDialogue($element) {
            return _super.call(this, $element) || this;
        }
        ShareDialogue.prototype.create = function () {
            this.setConfig('shareDialogue');
            _super.prototype.create.call(this);
        };
        ShareDialogue.prototype.update = function () {
            _super.prototype.update.call(this);
            this.code = this.extension.getEmbedScript(this.options.embedTemplate, this.currentWidth, this.currentHeight);
            this.$code.val(this.code);
        };
        ShareDialogue.prototype.resize = function () {
            _super.prototype.resize.call(this);
        };
        return ShareDialogue;
    }(ShareDialogue_1.ShareDialogue));
    exports.ShareDialogue = ShareDialogue;
});
//# sourceMappingURL=ShareDialogue.js.map;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define('modules/uv-pdfcenterpanel-module/PDFCenterPanel',["require", "exports", "../uv-shared-module/BaseCommands", "../uv-shared-module/CenterPanel", "../../Params"], function (require, exports, BaseCommands_1, CenterPanel_1, Params_1) {
    "use strict";
    var PDFCenterPanel = (function (_super) {
        __extends(PDFCenterPanel, _super);
        function PDFCenterPanel($element) {
            return _super.call(this, $element) || this;
        }
        PDFCenterPanel.prototype.create = function () {
            var _this = this;
            this.setConfig('pdfCenterPanel');
            _super.prototype.create.call(this);
            $.subscribe(BaseCommands_1.BaseCommands.OPEN_EXTERNAL_RESOURCE, function (e, resources) {
                _this.openMedia(resources);
            });
        };
        PDFCenterPanel.prototype.openMedia = function (resources) {
            var _this = this;
            var that = this;
            this.extension.getExternalResources(resources).then(function () {
                var canvas = _this.extension.helper.getCurrentCanvas();
                var pdfUri = canvas.id;
                var browser = window.browserDetect.browser;
                var version = window.browserDetect.version;
                if ((browser === 'Explorer' && version < 10) || !_this.config.options.usePdfJs) {
                    // create pdf object
                    new PDFObject({
                        url: pdfUri,
                        id: "PDF"
                    }).embed('content');
                }
                else {
                    var viewerPath = 'html/uv-pdfcenterpanel-module/viewer.html';
                    // load viewer.html
                    _this.$content.load(viewerPath, function () {
                        PDFJS.workerSrc = 'lib/pdf.worker.min.js';
                        PDFJS.DEFAULT_URL = pdfUri;
                        var anchorIndex = (1 + parseInt(that.extension.getParam(Params_1.Params.anchor))) || 0;
                        PDFView.initialBookmark = "page=" + anchorIndex;
                        window.webViewerLoad();
                        _this.resize();
                    });
                }
            });
        };
        PDFCenterPanel.prototype.resize = function () {
            _super.prototype.resize.call(this);
        };
        return PDFCenterPanel;
    }(CenterPanel_1.CenterPanel));
    exports.PDFCenterPanel = PDFCenterPanel;
});
//# sourceMappingURL=PDFCenterPanel.js.map;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define('extensions/uv-pdf-extension/SettingsDialogue',["require", "exports", "../../modules/uv-dialogues-module/SettingsDialogue"], function (require, exports, SettingsDialogue_1) {
    "use strict";
    var SettingsDialogue = (function (_super) {
        __extends(SettingsDialogue, _super);
        function SettingsDialogue($element) {
            return _super.call(this, $element) || this;
        }
        SettingsDialogue.prototype.create = function () {
            this.setConfig('settingsDialogue');
            _super.prototype.create.call(this);
        };
        return SettingsDialogue;
    }(SettingsDialogue_1.SettingsDialogue));
    exports.SettingsDialogue = SettingsDialogue;
});
//# sourceMappingURL=SettingsDialogue.js.map;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define('extensions/uv-pdf-extension/Extension',["require", "exports", "../../modules/uv-shared-module/BaseCommands", "../../modules/uv-shared-module/BaseExtension", "../../modules/uv-shared-module/Bookmark", "./DownloadDialogue", "./ShareDialogue", "../../modules/uv-shared-module/FooterPanel", "../../modules/uv-shared-module/HeaderPanel", "../../modules/uv-moreinforightpanel-module/MoreInfoRightPanel", "../../modules/uv-pdfcenterpanel-module/PDFCenterPanel", "../../modules/uv-resourcesleftpanel-module/ResourcesLeftPanel", "./SettingsDialogue", "../../modules/uv-shared-module/Shell"], function (require, exports, BaseCommands_1, BaseExtension_1, Bookmark_1, DownloadDialogue_1, ShareDialogue_1, FooterPanel_1, HeaderPanel_1, MoreInfoRightPanel_1, PDFCenterPanel_1, ResourcesLeftPanel_1, SettingsDialogue_1, Shell_1) {
    "use strict";
    var Extension = (function (_super) {
        __extends(Extension, _super);
        function Extension(bootstrapper) {
            return _super.call(this, bootstrapper) || this;
        }
        Extension.prototype.create = function () {
            var _this = this;
            _super.prototype.create.call(this);
            $.subscribe(BaseCommands_1.BaseCommands.THUMB_SELECTED, function (e, thumb) {
                _this.viewCanvas(thumb.index);
            });
            $.subscribe(BaseCommands_1.BaseCommands.LEFTPANEL_EXPAND_FULL_START, function (e) {
                Shell_1.Shell.$centerPanel.hide();
                Shell_1.Shell.$rightPanel.hide();
            });
            $.subscribe(BaseCommands_1.BaseCommands.LEFTPANEL_COLLAPSE_FULL_FINISH, function (e) {
                Shell_1.Shell.$centerPanel.show();
                Shell_1.Shell.$rightPanel.show();
                _this.resize();
            });
            $.subscribe(BaseCommands_1.BaseCommands.SHOW_OVERLAY, function (e, params) {
                if (_this.IsOldIE()) {
                    _this.centerPanel.$element.hide();
                }
            });
            $.subscribe(BaseCommands_1.BaseCommands.HIDE_OVERLAY, function (e, params) {
                if (_this.IsOldIE()) {
                    _this.centerPanel.$element.show();
                }
            });
        };
        Extension.prototype.IsOldIE = function () {
            var browser = window.browserDetect.browser;
            var version = window.browserDetect.version;
            if (browser === 'Explorer' && version <= 9)
                return true;
            return false;
        };
        Extension.prototype.createModules = function () {
            _super.prototype.createModules.call(this);
            if (this.isHeaderPanelEnabled()) {
                this.headerPanel = new HeaderPanel_1.HeaderPanel(Shell_1.Shell.$headerPanel);
            }
            else {
                Shell_1.Shell.$headerPanel.hide();
            }
            if (this.isLeftPanelEnabled()) {
                this.leftPanel = new ResourcesLeftPanel_1.ResourcesLeftPanel(Shell_1.Shell.$leftPanel);
            }
            this.centerPanel = new PDFCenterPanel_1.PDFCenterPanel(Shell_1.Shell.$centerPanel);
            if (this.isRightPanelEnabled()) {
                this.rightPanel = new MoreInfoRightPanel_1.MoreInfoRightPanel(Shell_1.Shell.$rightPanel);
            }
            if (this.isFooterPanelEnabled()) {
                this.footerPanel = new FooterPanel_1.FooterPanel(Shell_1.Shell.$footerPanel);
            }
            else {
                Shell_1.Shell.$footerPanel.hide();
            }
            this.$downloadDialogue = $('<div class="overlay download"></div>');
            Shell_1.Shell.$overlays.append(this.$downloadDialogue);
            this.downloadDialogue = new DownloadDialogue_1.DownloadDialogue(this.$downloadDialogue);
            this.$shareDialogue = $('<div class="overlay share"></div>');
            Shell_1.Shell.$overlays.append(this.$shareDialogue);
            this.shareDialogue = new ShareDialogue_1.ShareDialogue(this.$shareDialogue);
            this.$settingsDialogue = $('<div class="overlay settings"></div>');
            Shell_1.Shell.$overlays.append(this.$settingsDialogue);
            this.settingsDialogue = new SettingsDialogue_1.SettingsDialogue(this.$settingsDialogue);
            if (this.isLeftPanelEnabled()) {
                this.leftPanel.init();
            }
            if (this.isRightPanelEnabled()) {
                this.rightPanel.init();
            }
        };
        Extension.prototype.bookmark = function () {
            _super.prototype.bookmark.call(this);
            var canvas = this.helper.getCurrentCanvas();
            var bookmark = new Bookmark_1.Bookmark();
            bookmark.index = this.helper.canvasIndex;
            bookmark.label = Manifesto.TranslationCollection.getValue(canvas.getLabel());
            bookmark.path = this.getBookmarkUri();
            bookmark.thumb = canvas.getProperty('thumbnail');
            bookmark.title = this.helper.getLabel();
            bookmark.trackingLabel = window.trackingLabel;
            bookmark.type = manifesto.ElementType.document().toString();
            this.triggerSocket(BaseCommands_1.BaseCommands.BOOKMARK, bookmark);
        };
        Extension.prototype.getEmbedScript = function (template, width, height) {
            var configUri = this.config.uri || '';
            var script = String.format(template, this.getSerializedLocales(), configUri, this.helper.iiifResourceUri, this.helper.collectionIndex, this.helper.manifestIndex, this.helper.sequenceIndex, this.helper.canvasIndex, width, height, this.embedScriptUri);
            return script;
        };
        return Extension;
    }(BaseExtension_1.BaseExtension));
    exports.Extension = Extension;
});
//# sourceMappingURL=Extension.js.map;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define('extensions/uv-virtex-extension/DownloadDialogue',["require", "exports", "../../modules/uv-dialogues-module/DownloadDialogue"], function (require, exports, DownloadDialogue_1) {
    "use strict";
    var DownloadDialogue = (function (_super) {
        __extends(DownloadDialogue, _super);
        function DownloadDialogue($element) {
            return _super.call(this, $element) || this;
        }
        DownloadDialogue.prototype.create = function () {
            this.setConfig('downloadDialogue');
            _super.prototype.create.call(this);
        };
        DownloadDialogue.prototype.open = function ($triggerButton) {
            _super.prototype.open.call(this, $triggerButton);
            this.addEntireFileDownloadOptions();
            this.updateNoneAvailable();
            this.resize();
        };
        DownloadDialogue.prototype.isDownloadOptionAvailable = function (option) {
            return _super.prototype.isDownloadOptionAvailable.call(this, option);
        };
        return DownloadDialogue;
    }(DownloadDialogue_1.DownloadDialogue));
    exports.DownloadDialogue = DownloadDialogue;
});
//# sourceMappingURL=DownloadDialogue.js.map;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define('extensions/uv-virtex-extension/ShareDialogue',["require", "exports", "../../modules/uv-dialogues-module/ShareDialogue"], function (require, exports, ShareDialogue_1) {
    "use strict";
    var ShareDialogue = (function (_super) {
        __extends(ShareDialogue, _super);
        function ShareDialogue($element) {
            return _super.call(this, $element) || this;
        }
        ShareDialogue.prototype.create = function () {
            this.setConfig('shareDialogue');
            _super.prototype.create.call(this);
        };
        ShareDialogue.prototype.update = function () {
            _super.prototype.update.call(this);
            this.code = this.extension.getEmbedScript(this.options.embedTemplate, this.currentWidth, this.currentHeight);
            this.$code.val(this.code);
        };
        ShareDialogue.prototype.resize = function () {
            _super.prototype.resize.call(this);
        };
        return ShareDialogue;
    }(ShareDialogue_1.ShareDialogue));
    exports.ShareDialogue = ShareDialogue;
});
//# sourceMappingURL=ShareDialogue.js.map;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define('extensions/uv-virtex-extension/SettingsDialogue',["require", "exports", "../../modules/uv-dialogues-module/SettingsDialogue"], function (require, exports, SettingsDialogue_1) {
    "use strict";
    var SettingsDialogue = (function (_super) {
        __extends(SettingsDialogue, _super);
        function SettingsDialogue($element) {
            return _super.call(this, $element) || this;
        }
        SettingsDialogue.prototype.create = function () {
            this.setConfig('settingsDialogue');
            _super.prototype.create.call(this);
        };
        return SettingsDialogue;
    }(SettingsDialogue_1.SettingsDialogue));
    exports.SettingsDialogue = SettingsDialogue;
});
//# sourceMappingURL=SettingsDialogue.js.map;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define('modules/uv-virtexcenterpanel-module/VirtexCenterPanel',["require", "exports", "../uv-shared-module/BaseCommands", "../uv-shared-module/CenterPanel"], function (require, exports, BaseCommands_1, CenterPanel_1) {
    "use strict";
    var VirtexCenterPanel = (function (_super) {
        __extends(VirtexCenterPanel, _super);
        function VirtexCenterPanel($element) {
            return _super.call(this, $element) || this;
        }
        VirtexCenterPanel.prototype.create = function () {
            var _this = this;
            this.setConfig('virtexCenterPanel');
            _super.prototype.create.call(this);
            var that = this;
            $.subscribe(BaseCommands_1.BaseCommands.OPEN_EXTERNAL_RESOURCE, function (e, resources) {
                that.openMedia(resources);
            });
            this.$navigation = $('<div class="navigation"></div>');
            this.$content.prepend(this.$navigation);
            this.$zoomInButton = $('<a class="imageBtn zoomIn" title="' + this.content.zoomIn + '"></a>');
            this.$navigation.append(this.$zoomInButton);
            this.$zoomOutButton = $('<a class="imageBtn zoomOut" title="' + this.content.zoomOut + '"></a>');
            this.$navigation.append(this.$zoomOutButton);
            this.$viewport = $('<div class="virtex"></div>');
            this.$content.prepend(this.$viewport);
            this.title = this.extension.helper.getLabel();
            this.updateAttribution();
            this.$zoomInButton.on('click', function (e) {
                e.preventDefault();
                _this.viewport.zoomIn();
            });
            this.$zoomOutButton.on('click', function (e) {
                e.preventDefault();
                _this.viewport.zoomOut();
            });
        };
        VirtexCenterPanel.prototype.openMedia = function (resources) {
            var _this = this;
            this.extension.getExternalResources(resources).then(function () {
                _this.$viewport.empty();
                var canvas = _this.extension.helper.getCurrentCanvas();
                _this.viewport = virtex.create({
                    element: "#content .virtex",
                    object: canvas.id,
                    showStats: _this.options.showStats
                });
                _this.resize();
            });
        };
        VirtexCenterPanel.prototype.resize = function () {
            _super.prototype.resize.call(this);
            this.$title.ellipsisFill(this.title);
            this.$viewport.width(this.$content.width());
            this.$viewport.height(this.$content.height());
        };
        return VirtexCenterPanel;
    }(CenterPanel_1.CenterPanel));
    exports.VirtexCenterPanel = VirtexCenterPanel;
});
//# sourceMappingURL=VirtexCenterPanel.js.map;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define('extensions/uv-virtex-extension/Extension',["require", "exports", "../../modules/uv-shared-module/BaseCommands", "../../modules/uv-shared-module/BaseExtension", "../../modules/uv-shared-module/Bookmark", "../../modules/uv-contentleftpanel-module/ContentLeftPanel", "./DownloadDialogue", "./ShareDialogue", "../../modules/uv-shared-module/FooterPanel", "../../modules/uv-shared-module/HeaderPanel", "../../modules/uv-moreinforightpanel-module/MoreInfoRightPanel", "./SettingsDialogue", "../../modules/uv-shared-module/Shell", "../../modules/uv-virtexcenterpanel-module/VirtexCenterPanel"], function (require, exports, BaseCommands_1, BaseExtension_1, Bookmark_1, ContentLeftPanel_1, DownloadDialogue_1, ShareDialogue_1, FooterPanel_1, HeaderPanel_1, MoreInfoRightPanel_1, SettingsDialogue_1, Shell_1, VirtexCenterPanel_1) {
    "use strict";
    var Extension = (function (_super) {
        __extends(Extension, _super);
        function Extension(bootstrapper) {
            return _super.call(this, bootstrapper) || this;
        }
        Extension.prototype.create = function () {
            var _this = this;
            _super.prototype.create.call(this);
            $.subscribe(BaseCommands_1.BaseCommands.THUMB_SELECTED, function (e, canvasIndex) {
                _this.viewCanvas(canvasIndex);
            });
        };
        Extension.prototype.createModules = function () {
            _super.prototype.createModules.call(this);
            if (this.isHeaderPanelEnabled()) {
                this.headerPanel = new HeaderPanel_1.HeaderPanel(Shell_1.Shell.$headerPanel);
            }
            else {
                Shell_1.Shell.$headerPanel.hide();
            }
            if (this.isLeftPanelEnabled()) {
                this.leftPanel = new ContentLeftPanel_1.ContentLeftPanel(Shell_1.Shell.$leftPanel);
            }
            this.centerPanel = new VirtexCenterPanel_1.VirtexCenterPanel(Shell_1.Shell.$centerPanel);
            if (this.isRightPanelEnabled()) {
                this.rightPanel = new MoreInfoRightPanel_1.MoreInfoRightPanel(Shell_1.Shell.$rightPanel);
            }
            if (this.isFooterPanelEnabled()) {
                this.footerPanel = new FooterPanel_1.FooterPanel(Shell_1.Shell.$footerPanel);
            }
            else {
                Shell_1.Shell.$footerPanel.hide();
            }
            this.$downloadDialogue = $('<div class="overlay download"></div>');
            Shell_1.Shell.$overlays.append(this.$downloadDialogue);
            this.downloadDialogue = new DownloadDialogue_1.DownloadDialogue(this.$downloadDialogue);
            this.$shareDialogue = $('<div class="overlay share"></div>');
            Shell_1.Shell.$overlays.append(this.$shareDialogue);
            this.shareDialogue = new ShareDialogue_1.ShareDialogue(this.$shareDialogue);
            this.$settingsDialogue = $('<div class="overlay settings"></div>');
            Shell_1.Shell.$overlays.append(this.$settingsDialogue);
            this.settingsDialogue = new SettingsDialogue_1.SettingsDialogue(this.$settingsDialogue);
            if (this.isLeftPanelEnabled()) {
                this.leftPanel.init();
            }
            else {
                Shell_1.Shell.$leftPanel.hide();
            }
            if (this.isRightPanelEnabled()) {
                this.rightPanel.init();
            }
            else {
                Shell_1.Shell.$rightPanel.hide();
            }
        };
        Extension.prototype.isLeftPanelEnabled = function () {
            return Utils.Bools.getBool(this.config.options.leftPanelEnabled, true)
                && (this.helper.isMultiCanvas() || this.helper.isMultiSequence());
        };
        Extension.prototype.bookmark = function () {
            _super.prototype.bookmark.call(this);
            var canvas = this.helper.getCurrentCanvas();
            var bookmark = new Bookmark_1.Bookmark();
            bookmark.index = this.helper.canvasIndex;
            bookmark.label = Manifesto.TranslationCollection.getValue(canvas.getLabel());
            bookmark.path = this.getBookmarkUri();
            bookmark.thumb = canvas.getProperty('thumbnail');
            bookmark.title = this.helper.getLabel();
            bookmark.trackingLabel = window.trackingLabel;
            bookmark.type = manifesto.ElementType.physicalobject().toString();
            this.triggerSocket(BaseCommands_1.BaseCommands.BOOKMARK, bookmark);
        };
        Extension.prototype.getEmbedScript = function (template, width, height) {
            var configUri = this.config.uri || '';
            var script = String.format(template, this.getSerializedLocales(), configUri, this.helper.iiifResourceUri, this.helper.collectionIndex, this.helper.manifestIndex, this.helper.sequenceIndex, this.helper.canvasIndex, width, height, this.embedScriptUri);
            return script;
        };
        return Extension;
    }(BaseExtension_1.BaseExtension));
    exports.Extension = Extension;
});
//# sourceMappingURL=Extension.js.map;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define('UV',["require", "exports", "./Bootstrapper", "./extensions/uv-seadragon-extension/Extension", "./extensions/uv-mediaelement-extension/Extension", "./extensions/uv-pdf-extension/Extension", "./extensions/uv-virtex-extension/Extension"], function (require, exports, Bootstrapper_1, Extension_1, Extension_2, Extension_3, Extension_4) {
    "use strict";
    var UV = (function (_super) {
        __extends(UV, _super);
        function UV(options) {
            var _this = _super.call(this, options) || this;
            _this._init();
            _this._resize();
            return _this;
        }
        UV.prototype.message = function () {
            //this.fire(UV.Events.MESSAGE, this.options.data.message);
        };
        UV.prototype._init = function () {
            var success = _super.prototype._init.call(this);
            if (!success) {
                console.error("UV failed to initialise");
            }
            var extensions = {};
            extensions[manifesto.ElementType.canvas().toString()] = {
                type: Extension_1.Extension,
                name: 'uv-seadragon-extension'
            };
            extensions[manifesto.ElementType.movingimage().toString()] = {
                type: Extension_2.Extension,
                name: 'uv-mediaelement-extension'
            };
            extensions[manifesto.ElementType.physicalobject().toString()] = {
                type: Extension_4.Extension,
                name: 'uv-virtex-extension'
            };
            extensions[manifesto.ElementType.sound().toString()] = {
                type: Extension_2.Extension,
                name: 'uv-mediaelement-extension'
            };
            extensions[manifesto.RenderingFormat.pdf().toString()] = {
                type: Extension_3.Extension,
                name: 'uv-pdf-extension'
            };
            var bootstrapper = new Bootstrapper_1.Bootstrapper(extensions);
            bootstrapper.bootstrap();
            return success;
        };
        UV.prototype.data = function () {
            return {};
        };
        UV.prototype._resize = function () {
        };
        return UV;
    }(_Components.BaseComponent));
    exports.__esModule = true;
    exports["default"] = UV;
});
// namespace UV {
//     export class Events {
//         static MESSAGE: string = 'message';
//     }
// } 
//# sourceMappingURL=UV.js.map;
if (typeof jQuery === "function") {
    define('jquery', [], function () {
        return jQuery;
    });
}
var uvReady = new Event('uvReady');
require([
    'UV'
], function (UV) {
    if (!window.UV) {
        window.UV = UV["default"];
        window.dispatchEvent(uvReady);
    }
});
//# sourceMappingURL=app.js.map;
define("app", function(){});


//# sourceMappingURL=app.js.map