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

!function(){function t(t){this.message=t}var r="undefined"!=typeof exports?exports:self,e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";t.prototype=new Error,t.prototype.name="InvalidCharacterError",r.btoa||(r.btoa=function(r){for(var o,n,a=String(r),i=0,c=e,d="";a.charAt(0|i)||(c="=",i%1);d+=c.charAt(63&o>>8-i%1*8)){if(n=a.charCodeAt(i+=.75),n>255)throw new t("'btoa' failed: The string to be encoded contains characters outside of the Latin1 range.");o=o<<8|n}return d}),r.atob||(r.atob=function(r){var o=String(r).replace(/=+$/,"");if(o.length%4==1)throw new t("'atob' failed: The string to be decoded is not correctly encoded.");for(var n,a,i=0,c=0,d="";a=o.charAt(c++);~a&&(n=i%4?64*n+a:a,i++%4)?d+=String.fromCharCode(255&n>>(-2*i&6)):0)a=e.indexOf(a);return d})}();
define("lib/base64.min.js", function(){});

window.browserDetect = {
    init: function () {
        this.browser = this.searchString(this.dataBrowser) || "Other";
        this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || "Unknown";
        // detect IE 11
        if (this.browser == 'Explorer' && this.version == '7' && navigator.userAgent.match(/Trident/i)) {
            this.version = this.searchVersionIE();
        }
    },

    searchString: function (data) {
        for (var i = 0 ; i < data.length ; i++) {
            var dataString = data[i].string;
            this.versionSearchString = data[i].subString;

            if (dataString.indexOf(data[i].subString) != -1) {
                return data[i].identity;
            }
        }
    },

    searchVersion: function (dataString) {
        var index = dataString.indexOf(this.versionSearchString);
        if (index == -1) return;
        return parseFloat(dataString.substring(index + this.versionSearchString.length + 1));
    },

    searchVersionIE: function() {
        var ua = navigator.userAgent.toString().toLowerCase(),
            match = /(trident)(?:.*rv:([\w.]+))?/.exec(ua) || /(msie) ([\w.]+)/.exec(ua) || ['', null, -1],
            ver;
        try {
            ver = (match[2]).split('.')[0]; // version
        }
        catch (err) {
            ver = 'unknown'; //
        }
        return ver;
    },

    dataBrowser:
        [
            { string: navigator.userAgent, subString: "Chrome", identity: "Chrome" },
            { string: navigator.userAgent, subString: "MSIE", identity: "Explorer" },
            { string: navigator.userAgent, subString: "Trident", identity: "Explorer" },
            { string: navigator.userAgent, subString: "Firefox", identity: "Firefox" },
            { string: navigator.userAgent, subString: "Safari", identity: "Safari" },
            { string: navigator.userAgent, subString: "Opera", identity: "Opera" }
        ]

};

window.browserDetect.init();
define("lib/browserdetect.js", function(){});

(function(a){(jQuery.browser=jQuery.browser||{}).mobile=/(android|bb\d+|meego).+mobile|avantgo|bada\/|android|ipad|playbook|silk|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))})(navigator.userAgent||navigator.vendor||window.opera);
define("lib/detectmobilebrowser.js", function(){});

/*!
 * jQuery-ajaxTransport-XDomainRequest - v1.0.4 - 2015-03-05
 * https://github.com/MoonScript/jQuery-ajaxTransport-XDomainRequest
 * Copyright (c) 2015 Jason Moon (@JSONMOON)
 * Licensed MIT (/blob/master/LICENSE.txt)
 */
(function(factory) {
    //if (typeof define === 'function' && define.amd) {
    //    // AMD. Register as anonymous module.
    //    define(['jquery'], factory);
    //} else if (typeof exports === 'object') {
    //    // CommonJS
    //    module.exports = factory(require('jquery'));
    //} else {
        // Browser globals.
        factory(jQuery);
    //}
}(function($) {

// Only continue if we're on IE8/IE9 with jQuery 1.5+ (contains the ajaxTransport function)
    if ($.support.cors || !$.ajaxTransport || !window.XDomainRequest) {
        return $;
    }

    var httpRegEx = /^(https?:)?\/\//i;
    var getOrPostRegEx = /^get|post$/i;
    var sameSchemeRegEx = new RegExp('^(\/\/|' + location.protocol + ')', 'i');

// ajaxTransport exists in jQuery 1.5+
    $.ajaxTransport('* text html xml json', function(options, userOptions, jqXHR) {

        // Only continue if the request is: asynchronous, uses GET or POST method, has HTTP or HTTPS protocol, and has the same scheme as the calling page
        if (!options.crossDomain || !options.async || !getOrPostRegEx.test(options.type) || !httpRegEx.test(options.url) || !sameSchemeRegEx.test(options.url)) {
            return;
        }

        var xdr = null;

        return {
            send: function(headers, complete) {
                var postData = '';
                var userType = (userOptions.dataType || '').toLowerCase();

                xdr = new XDomainRequest();
                if (/^\d+$/.test(userOptions.timeout)) {
                    xdr.timeout = userOptions.timeout;
                }

                xdr.ontimeout = function() {
                    complete(500, 'timeout');
                };

                xdr.onload = function() {
                    var allResponseHeaders = 'Content-Length: ' + xdr.responseText.length + '\r\nContent-Type: ' + xdr.contentType;
                    var status = {
                        code: 200,
                        message: 'success'
                    };
                    var responses = {
                        text: xdr.responseText
                    };
                    try {
                        if (userType === 'html' || /text\/html/i.test(xdr.contentType)) {
                            responses.html = xdr.responseText;
                        } else if (userType === 'json' || (userType !== 'text' && /\/json/i.test(xdr.contentType))) {
                            try {
                                responses.json = $.parseJSON(xdr.responseText);
                            } catch(e) {
                                status.code = 500;
                                status.message = 'parseerror';
                                //throw 'Invalid JSON: ' + xdr.responseText;
                            }
                        } else if (userType === 'xml' || (userType !== 'text' && /\/xml/i.test(xdr.contentType))) {
                            var doc = new ActiveXObject('Microsoft.XMLDOM');
                            doc.async = false;
                            try {
                                doc.loadXML(xdr.responseText);
                            } catch(e) {
                                doc = undefined;
                            }
                            if (!doc || !doc.documentElement || doc.getElementsByTagName('parsererror').length) {
                                status.code = 500;
                                status.message = 'parseerror';
                                throw 'Invalid XML: ' + xdr.responseText;
                            }
                            responses.xml = doc;
                        }
                    } catch(parseMessage) {
                        throw parseMessage;
                    } finally {
                        complete(status.code, status.message, responses, allResponseHeaders);
                    }
                };

                // set an empty handler for 'onprogress' so requests don't get aborted
                xdr.onprogress = function(){};
                xdr.onerror = function() {
                    complete(401, 'error', {
                        text: xdr.responseText
                    });
                };

                if (userOptions.data) {
                    postData = ($.type(userOptions.data) === 'string') ? userOptions.data : $.param(userOptions.data);
                }
                xdr.open(options.type, options.url);
                xdr.send(postData);
            },
            abort: function() {
                if (xdr) {
                    xdr.abort();
                }
            }
        };
    });

    return $;

}));

define("lib/jquery.xdomainrequest.js", function(){});

/* Modernizr 2.8.3 (Custom Build) | MIT & BSD
 * Build: http://modernizr.com/download/#-input-inputtypes-cssclasses-load
 */
/* Modernizr 2.8.3 (Custom Build) | MIT & BSD
 * Build: http://modernizr.com/download/#-input-inputtypes-cssclasses-cors-load
 * (add Non-core detects: cors)
 */
;window.Modernizr=function(a,b,c){function v(a){j.cssText=a}function w(a,b){return v(prefixes.join(a+";")+(b||""))}function x(a,b){return typeof a===b}function y(a,b){return!!~(""+a).indexOf(b)}function z(a,b,d){for(var e in a){var f=b[a[e]];if(f!==c)return d===!1?a[e]:x(f,"function")?f.bind(d||b):f}return!1}function A(){e.input=function(c){for(var d=0,e=c.length;d<e;d++)p[c[d]]=c[d]in k;return p.list&&(p.list=!!b.createElement("datalist")&&!!a.HTMLDataListElement),p}("autocomplete autofocus list placeholder max min multiple pattern required step".split(" ")),e.inputtypes=function(a){for(var d=0,e,f,h,i=a.length;d<i;d++)k.setAttribute("type",f=a[d]),e=k.type!=="text",e&&(k.value=l,k.style.cssText="position:absolute;visibility:hidden;",/^range$/.test(f)&&k.style.WebkitAppearance!==c?(g.appendChild(k),h=b.defaultView,e=h.getComputedStyle&&h.getComputedStyle(k,null).WebkitAppearance!=="textfield"&&k.offsetHeight!==0,g.removeChild(k)):/^(search|tel)$/.test(f)||(/^(url|email)$/.test(f)?e=k.checkValidity&&k.checkValidity()===!1:e=k.value!=l)),o[a[d]]=!!e;return o}("search tel url email datetime date month week time datetime-local number range color".split(" "))}var d="2.8.3",e={},f=!0,g=b.documentElement,h="modernizr",i=b.createElement(h),j=i.style,k=b.createElement("input"),l=":)",m={}.toString,n={},o={},p={},q=[],r=q.slice,s,t={}.hasOwnProperty,u;!x(t,"undefined")&&!x(t.call,"undefined")?u=function(a,b){return t.call(a,b)}:u=function(a,b){return b in a&&x(a.constructor.prototype[b],"undefined")},Function.prototype.bind||(Function.prototype.bind=function(b){var c=this;if(typeof c!="function")throw new TypeError;var d=r.call(arguments,1),e=function(){if(this instanceof e){var a=function(){};a.prototype=c.prototype;var f=new a,g=c.apply(f,d.concat(r.call(arguments)));return Object(g)===g?g:f}return c.apply(b,d.concat(r.call(arguments)))};return e});for(var B in n)u(n,B)&&(s=B.toLowerCase(),e[s]=n[B](),q.push((e[s]?"":"no-")+s));return e.input||A(),e.addTest=function(a,b){if(typeof a=="object")for(var d in a)u(a,d)&&e.addTest(d,a[d]);else{a=a.toLowerCase();if(e[a]!==c)return e;b=typeof b=="function"?b():b,typeof f!="undefined"&&f&&(g.className+=" "+(b?"":"no-")+a),e[a]=b}return e},v(""),i=k=null,e._version=d,g.className=g.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+(f?" js "+q.join(" "):""),e}(this,this.document),function(a,b,c){function d(a){return"[object Function]"==o.call(a)}function e(a){return"string"==typeof a}function f(){}function g(a){return!a||"loaded"==a||"complete"==a||"uninitialized"==a}function h(){var a=p.shift();q=1,a?a.t?m(function(){("c"==a.t?B.injectCss:B.injectJs)(a.s,0,a.a,a.x,a.e,1)},0):(a(),h()):q=0}function i(a,c,d,e,f,i,j){function k(b){if(!o&&g(l.readyState)&&(u.r=o=1,!q&&h(),l.onload=l.onreadystatechange=null,b)){"img"!=a&&m(function(){t.removeChild(l)},50);for(var d in y[c])y[c].hasOwnProperty(d)&&y[c][d].onload()}}var j=j||B.errorTimeout,l=b.createElement(a),o=0,r=0,u={t:d,s:c,e:f,a:i,x:j};1===y[c]&&(r=1,y[c]=[]),"object"==a?l.data=c:(l.src=c,l.type=a),l.width=l.height="0",l.onerror=l.onload=l.onreadystatechange=function(){k.call(this,r)},p.splice(e,0,u),"img"!=a&&(r||2===y[c]?(t.insertBefore(l,s?null:n),m(k,j)):y[c].push(l))}function j(a,b,c,d,f){return q=0,b=b||"j",e(a)?i("c"==b?v:u,a,b,this.i++,c,d,f):(p.splice(this.i++,0,a),1==p.length&&h()),this}function k(){var a=B;return a.loader={load:j,i:0},a}var l=b.documentElement,m=a.setTimeout,n=b.getElementsByTagName("script")[0],o={}.toString,p=[],q=0,r="MozAppearance"in l.style,s=r&&!!b.createRange().compareNode,t=s?l:n.parentNode,l=a.opera&&"[object Opera]"==o.call(a.opera),l=!!b.attachEvent&&!l,u=r?"object":l?"script":"img",v=l?"script":u,w=Array.isArray||function(a){return"[object Array]"==o.call(a)},x=[],y={},z={timeout:function(a,b){return b.length&&(a.timeout=b[0]),a}},A,B;B=function(a){function b(a){var a=a.split("!"),b=x.length,c=a.pop(),d=a.length,c={url:c,origUrl:c,prefixes:a},e,f,g;for(f=0;f<d;f++)g=a[f].split("="),(e=z[g.shift()])&&(c=e(c,g));for(f=0;f<b;f++)c=x[f](c);return c}function g(a,e,f,g,h){var i=b(a),j=i.autoCallback;i.url.split(".").pop().split("?").shift(),i.bypass||(e&&(e=d(e)?e:e[a]||e[g]||e[a.split("/").pop().split("?")[0]]),i.instead?i.instead(a,e,f,g,h):(y[i.url]?i.noexec=!0:y[i.url]=1,f.load(i.url,i.forceCSS||!i.forceJS&&"css"==i.url.split(".").pop().split("?").shift()?"c":c,i.noexec,i.attrs,i.timeout),(d(e)||d(j))&&f.load(function(){k(),e&&e(i.origUrl,h,g),j&&j(i.origUrl,h,g),y[i.url]=2})))}function h(a,b){function c(a,c){if(a){if(e(a))c||(j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}),g(a,j,b,0,h);else if(Object(a)===a)for(n in m=function(){var b=0,c;for(c in a)a.hasOwnProperty(c)&&b++;return b}(),a)a.hasOwnProperty(n)&&(!c&&!--m&&(d(j)?j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}:j[n]=function(a){return function(){var b=[].slice.call(arguments);a&&a.apply(this,b),l()}}(k[n])),g(a[n],j,b,n,h))}else!c&&l()}var h=!!a.test,i=a.load||a.both,j=a.callback||f,k=j,l=a.complete||f,m,n;c(h?a.yep:a.nope,!!i),i&&c(i)}var i,j,l=this.yepnope.loader;if(e(a))g(a,0,l,0);else if(w(a))for(i=0;i<a.length;i++)j=a[i],e(j)?g(j,0,l,0):w(j)?B(j):Object(j)===j&&h(j,l);else Object(a)===a&&h(a,l)},B.addPrefix=function(a,b){z[a]=b},B.addFilter=function(a){x.push(a)},B.errorTimeout=1e4,null==b.readyState&&b.addEventListener&&(b.readyState="loading",b.addEventListener("DOMContentLoaded",A=function(){b.removeEventListener("DOMContentLoaded",A,0),b.readyState="complete"},0)),a.yepnope=k(),a.yepnope.executeStack=h,a.yepnope.injectJs=function(a,c,d,e,i,j){var k=b.createElement("script"),l,o,e=e||B.errorTimeout;k.src=a;for(o in d)k.setAttribute(o,d[o]);c=j?h:c||f,k.onreadystatechange=k.onload=function(){!l&&g(k.readyState)&&(l=1,c(),k.onload=k.onreadystatechange=null)},m(function(){l||(l=1,c(1))},e),i?k.onload():n.parentNode.insertBefore(k,n)},a.yepnope.injectCss=function(a,c,d,e,g,i){var e=b.createElement("link"),j,c=i?h:c||f;e.href=a,e.rel="stylesheet",e.type="text/css";for(j in d)e.setAttribute(j,d[j]);g||(n.parentNode.insertBefore(e,n),m(c,0))}}(this,document),Modernizr.load=function(){yepnope.apply(window,[].slice.call(arguments,0))},Modernizr.addTest("cors",!!(window.XMLHttpRequest&&"withCredentials"in new XMLHttpRequest));
define("lib/modernizr.js", function(){});

/**
 * Copyright (c) 2010 by Gabriel Birke
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the 'Software'), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

function Sanitize(){
    var i, e, options;
    options = arguments[0] || {};
    this.config = {};
    this.config.elements = options.elements ? options.elements : [];
    this.config.attributes = options.attributes ? options.attributes : {};
    this.config.attributes[Sanitize.ALL] = this.config.attributes[Sanitize.ALL] ? this.config.attributes[Sanitize.ALL] : [];
    this.config.allow_comments = options.allow_comments ? options.allow_comments : false;
    this.allowed_elements = {};
    this.config.protocols = options.protocols ? options.protocols : {};
    this.config.add_attributes = options.add_attributes ? options.add_attributes  : {};
    this.dom = options.dom ? options.dom : document;
    for(i=0;i<this.config.elements.length;i++) {
        this.allowed_elements[this.config.elements[i]] = true;
    }
    this.config.remove_element_contents = {};
    this.config.remove_all_contents = false;
    if(options.remove_contents) {

        if(options.remove_contents instanceof Array) {
            for(i=0;i<options.remove_contents.length;i++) {
                this.config.remove_element_contents[options.remove_contents[i]] = true;
            }
        }
        else {
            this.config.remove_all_contents = true;
        }
    }
    this.transformers = options.transformers ? options.transformers : [];
}

Sanitize.REGEX_PROTOCOL = /^([A-Za-z0-9\+\-\.\&\;\*\s]*?)(?:\:|&*0*58|&*x0*3a)/i;

// emulate Ruby symbol with string constant
Sanitize.RELATIVE = '__RELATIVE__';
Sanitize.ALL = '__ALL__';

Sanitize.prototype.clean_node = function(container) {
    var fragment = this.dom.createDocumentFragment();
    this.current_element = fragment;
    this.whitelist_nodes = [];



    /**
     * Utility function to check if an element exists in an array
     */
    function _array_index(needle, haystack) {
        var i;
        for(i=0; i < haystack.length; i++) {
            if(haystack[i] == needle)
                return i;
        }
        return -1;
    }

    function _merge_arrays_uniq() {
        var result = [];
        var uniq_hash = {};
        var i,j;
        for(i=0;i<arguments.length;i++) {
            if(!arguments[i] || !arguments[i].length)
                continue;
            for(j=0;j<arguments[i].length;j++) {
                if(uniq_hash[arguments[i][j]])
                    continue;
                uniq_hash[arguments[i][j]] = true;
                result.push(arguments[i][j]);
            }
        }
        return result;
    }

    /**
     * Clean function that checks the different node types and cleans them up accordingly
     * @param elem DOM Node to clean
     */
    function _clean(elem) {
        var clone;
        switch(elem.nodeType) {
            // Element
            case 1:
                _clean_element.call(this, elem);
                break;
            // Text
            case 3:
                clone = elem.cloneNode(false);
                this.current_element.appendChild(clone);
                break;
            // Entity-Reference (normally not used)
            case 5:
                clone = elem.cloneNode(false);
                this.current_element.appendChild(clone);
                break;
            // Comment
            case 8:
                if(this.config.allow_comments) {
                    clone = elem.cloneNode(false);
                    this.current_element.appendChild(clone);
                }
                break;
            default:
                if (console && console.log) console.log("unknown node type", elem.nodeType);
                break;
        }

    }

    function _clean_element(elem) {
        var i, j, clone, parent_element, name, allowed_attributes, attr, attr_name, attr_node, protocols, del, attr_ok;
        var transform = _transform_element.call(this, elem);

        elem = transform.node;
        name = elem.nodeName.toLowerCase();

        // check if element itself is allowed
        parent_element = this.current_element;
        if(this.allowed_elements[name] || transform.whitelist) {
            this.current_element = this.dom.createElement(elem.nodeName);
            parent_element.appendChild(this.current_element);

            // clean attributes
            var attrs = this.config.attributes;
            allowed_attributes = _merge_arrays_uniq(attrs[name], attrs[Sanitize.ALL], transform.attr_whitelist);
            for(i=0;i<allowed_attributes.length;i++) {
                attr_name = allowed_attributes[i];
                attr = elem.attributes[attr_name];
                if(attr) {
                    attr_ok = true;
                    // Check protocol attributes for valid protocol
                    if(this.config.protocols[name] && this.config.protocols[name][attr_name]) {
                        protocols = this.config.protocols[name][attr_name];
                        del = attr.value.toLowerCase().match(Sanitize.REGEX_PROTOCOL);
                        if(del) {
                            attr_ok = (_array_index(del[1], protocols) != -1);
                        }
                        else {
                            attr_ok = (_array_index(Sanitize.RELATIVE, protocols) != -1);
                        }
                    }
                    if(attr_ok) {
                        attr_node = document.createAttribute(attr_name);
                        attr_node.value = attr.value;
                        this.current_element.setAttributeNode(attr_node);
                    }
                }
            }

            // Add attributes
            if(this.config.add_attributes[name]) {
                for(attr_name in this.config.add_attributes[name]) {
                    attr_node = document.createAttribute(attr_name);
                    attr_node.value = this.config.add_attributes[name][attr_name];
                    this.current_element.setAttributeNode(attr_node);
                }
            }
        } // End checking if element is allowed
        // If this node is in the dynamic whitelist array (built at runtime by
        // transformers), let it live with all of its attributes intact.
        else if(_array_index(elem, this.whitelist_nodes) != -1) {
            this.current_element = elem.cloneNode(true);
            // Remove child nodes, they will be sanitiazied and added by other code
            while(this.current_element.childNodes.length > 0) {
                this.current_element.removeChild(this.current_element.firstChild);
            }
            parent_element.appendChild(this.current_element);
        }

        // iterate over child nodes
        if(!this.config.remove_all_contents && !this.config.remove_element_contents[name]) {
            for(i=0;i<elem.childNodes.length;i++) {
                _clean.call(this, elem.childNodes[i]);
            }
        }

        // some versions of IE don't support normalize.
        if(this.current_element.normalize) {
            this.current_element.normalize();
        }
        this.current_element = parent_element;
    } // END clean_element function

    function _transform_element(node) {
        var output = {
            attr_whitelist:[],
            node: node,
            whitelist: false
        };
        var i, j, transform;
        for(i=0;i<this.transformers.length;i++) {
            transform = this.transformers[i]({
                allowed_elements: this.allowed_elements,
                config: this.config,
                node: node,
                node_name: node.nodeName.toLowerCase(),
                whitelist_nodes: this.whitelist_nodes,
                dom: this.dom
            });
            if (transform == null)
                continue;
            else if(typeof transform == 'object') {
                if(transform.whitelist_nodes && transform.whitelist_nodes instanceof Array) {
                    for(j=0;j<transform.whitelist_nodes.length;j++) {
                        if(_array_index(transform.whitelist_nodes[j], this.whitelist_nodes) == -1) {
                            this.whitelist_nodes.push(transform.whitelist_nodes[j]);
                        }
                    }
                }
                output.whitelist = transform.whitelist ? true : false;
                if(transform.attr_whitelist) {
                    output.attr_whitelist = _merge_arrays_uniq(output.attr_whitelist, transform.attr_whitelist);
                }
                output.node = transform.node ? transform.node : output.node;
            }
            else {
                throw new Error("transformer output must be an object or null");
            }
        }
        return output;
    }



    for(i=0;i<container.childNodes.length;i++) {
        _clean.call(this, container.childNodes[i]);
    }

    if(fragment.normalize) {
        fragment.normalize();
    }

    return fragment;

};

if ( typeof define === "function" ) {
    define( "sanitize", [], function () { return Sanitize; } );
}
define("lib/sanitize.js", function(){});

var __extends=this&&this.__extends||function(){var r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(r,e){r.__proto__=e}||function(r,e){for(var t in e)e.hasOwnProperty(t)&&(r[t]=e[t])};return function(e,t){function n(){this.constructor=e}r(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)}}(),exjs;!function(r){r.version="0.5.0"}(exjs||(exjs={}));var exjs;!function(r){Array.isArray||(Array.isArray=function(r){return"[object Array]"===Object.prototype.toString.call(r)})}(exjs||(exjs={}));var exjs;!function(r){var e=function(){function r(){}return r.prototype.getEnumerator=function(){return{moveNext:function(){return!1},current:void 0}},r.prototype.aggregate=function(r,e){for(var t=r,n=this.getEnumerator();n.moveNext();)t=e(t,n.current);return t},r.prototype.all=function(r){if(r)for(var e=this.getEnumerator(),t=0;e.moveNext();){if(!r(e.current,t))return!1;t++}return!0},r.prototype.any=function(r){for(var e=this.getEnumerator(),t=0;e.moveNext();){if(!r)return!0;if(r(e.current,t))return!0;t++}return!1},r.prototype.append=function(){for(var r=[],e=0;e<arguments.length;e++)r[e]=arguments[e];throw new Error("Not implemented")},r.prototype.apply=function(r){throw new Error("Not implemented")},r.prototype.at=function(r){for(var e=this.getEnumerator(),t=0;e.moveNext();){if(t===r)return e.current;t++}},r.prototype.average=function(r){var e=0,t=0;r=r||function(r){if("number"!=typeof r)throw new Error("Object is not a number.");return r};for(var n=this.getEnumerator();n.moveNext();)t+=r(n.current),e++;return 0===e?0:t/e},r.prototype.concat=function(r){throw new Error("Not implemented")},r.prototype.count=function(r){for(var e=0,t=this.getEnumerator();t.moveNext();)r&&!r(t.current)||e++;return e},r.prototype.difference=function(r,e){return e=e||function(r,e){return r===e},r instanceof Array&&(r=r.en()),{intersection:this.intersect(r,e).toArray().en(),aNotB:this.except(r,e).toArray().en(),bNotA:r.except(this,e).toArray().en()}},r.prototype.distinct=function(r){throw new Error("Not implemented")},r.prototype.except=function(r,e){throw new Error("Not implemented")},r.prototype.first=function(r){for(var e=this.getEnumerator();e.moveNext();)if(!r||r(e.current))return e.current},r.prototype.firstIndex=function(r){for(var e=this.getEnumerator(),t=0;e.moveNext();t++)if(!r||r(e.current))return t;return-1},r.prototype.forEach=function(r){for(var e=this.getEnumerator();e.moveNext();)r(e.current)},r.prototype.groupBy=function(r,e){throw new Error("Not implemented")},r.prototype.intersect=function(r,e){throw new Error("Not implemented")},r.prototype.join=function(r,e,t,n,o){throw new Error("Not implemented")},r.prototype.last=function(r){for(var e,t=this.getEnumerator();t.moveNext();)r&&!r(t.current)||(e=t.current);return e},r.prototype.lastIndex=function(r){for(var e=-1,t=this.getEnumerator(),n=0;t.moveNext();n++)r&&!r(t.current)||(e=n);return e},r.prototype.max=function(r){var e=this.getEnumerator();if(!e.moveNext())return 0;r=r||function(r){if("number"!=typeof r)throw new Error("Object is not a number.");return r};for(var t=r(e.current);e.moveNext();)t=Math.max(t,r(e.current));return t},r.prototype.min=function(r){var e=this.getEnumerator();if(!e.moveNext())return 0;r=r||function(r){if("number"!=typeof r)throw new Error("Object is not a number.");return r};for(var t=r(e.current);e.moveNext();)t=Math.min(t,r(e.current));return t},r.prototype.orderBy=function(r,e){throw new Error("Not implemented")},r.prototype.orderByDescending=function(r,e){throw new Error("Not implemented")},r.prototype.prepend=function(){for(var r=[],e=0;e<arguments.length;e++)r[e]=arguments[e];throw new Error("Not implemented")},r.prototype.reverse=function(){throw new Error("Not implemented")},r.prototype.select=function(r){throw new Error("Not implemented")},r.prototype.selectMany=function(r){throw new Error("Not implemented")},r.prototype.skip=function(r){throw new Error("Not implemented")},r.prototype.skipWhile=function(r){throw new Error("Not implemented")},r.prototype.standardDeviation=function(r){var e=this.average(r),t=0,n=0;r=r||function(r){if("number"!=typeof r)throw new Error("Object is not a number.");return r};for(var o=this.getEnumerator();o.moveNext();){var u=r(o.current)-e;t+=u*u,n++}return Math.sqrt(t/n)},r.prototype.sum=function(r){var e=0;r=r||function(r){if("number"!=typeof r)throw new Error("Object is not a number.");return r};for(var t=this.getEnumerator();t.moveNext();)e+=r(t.current);return e},r.prototype.take=function(r){throw new Error("Not implemented")},r.prototype.takeWhile=function(r){throw new Error("Not implemented")},r.prototype.traverse=function(r){throw new Error("Not implemented")},r.prototype.traverseUnique=function(r,e){throw new Error("Not implemented")},r.prototype.toArray=function(){for(var r=[],e=this.getEnumerator();e.moveNext();)r.push(e.current);return r},r.prototype.toMap=function(r,e){throw new Error("Not implemented")},r.prototype.toList=function(){throw new Error("Not implemented")},r.prototype.union=function(r,e){throw new Error("Not implemented")},r.prototype.where=function(r){throw new Error("Not implemented")},r.prototype.zip=function(r,e){throw new Error("Not implemented")},r}();r.Enumerable=e}(exjs||(exjs={}));var exjs;!function(r){var e=function(){function e(r){this.size=0,this._keys=[],this._values=[];var e;if(r instanceof Array?e=r.en():r&&r.getEnumerator instanceof Function&&(e=r),e)for(var t=e.getEnumerator();t&&t.moveNext();)this.set(t.current[0],t.current[1])}return e.prototype.clear=function(){this._keys.length=0,this._values.length=0,this.size=0},e.prototype.delete=function(r){var e=this._keys.indexOf(r);return e>-1&&(this._keys.splice(e,1),this._values.splice(e,1),this.size--,!0)},e.prototype.entries=function(){var e=this;return r.range(0,this.size).select(function(r){return[e._keys[r],e._values[r]]})},e.prototype.forEach=function(r,e){null==e&&(e=this);for(var t=0,n=this._keys,o=this._values,u=n.length;t<u;t++)r.call(e,o[t],n[t],this)},e.prototype.get=function(r){var e=this._keys.indexOf(r);return this._values[e]},e.prototype.has=function(r){return this._keys.indexOf(r)>-1},e.prototype.keys=function(){return this._keys.en()},e.prototype.set=function(r,e){var t=this._keys.indexOf(r);t>-1?this._values[t]=e:(this._keys.push(r),this._values.push(e),this.size++)},e.prototype.values=function(){return this._values.en()},e}();r.Map3=e,r.Enumerable.prototype.toMap=function(r,t){for(var n=new e,o=this.getEnumerator();o.moveNext();)n.set(r(o.current),t(o.current));return n},r.List&&(r.List.prototype.toMap=r.Enumerable.prototype.toMap)}(exjs||(exjs={})),function(r){r.Map||(r.Map=exjs.Map3)}("undefined"==typeof window?global:window);var exjs;!function(r){function e(e){var t=new r.Enumerable;return t.getEnumerator=function(){var r={current:void 0,moveNext:function(){return e(r)}};return r},t}r.anonymous=e}(exjs||(exjs={}));var exjs;!function(r){function e(r,e){var t,n,o=1,u={current:void 0,moveNext:function(){if(o<2){if(t=t||r.getEnumerator(),t.moveNext())return u.current=t.current,!0;o++}return n=n||e.en().getEnumerator(),n.moveNext()?(u.current=n.current,!0):(u.current=void 0,!1)}};return u}r.Enumerable.prototype.append=function(){for(var t=this,n=[],o=0;o<arguments.length;o++)n[o]=arguments[o];var u=new r.Enumerable;return u.getEnumerator=function(){return e(t,n)},u},r.List&&(r.List.prototype.append=r.Enumerable.prototype.append)}(exjs||(exjs={}));var exjs;!function(r){function e(r,e){var t,n=0,o={current:void 0,moveNext:function(){return t||(t=r.getEnumerator()),!!t.moveNext()&&(e(o.current=t.current,n),n++,!0)}};return o}r.Enumerable.prototype.apply=function(t){var n=this,o=new r.Enumerable;return o.getEnumerator=function(){return e(n,t)},o},r.List&&(r.List.prototype.apply=r.Enumerable.prototype.apply)}(exjs||(exjs={}));var exjs;!function(r){function e(r){var e=r.length,t={moveNext:void 0,current:void 0},n=-1;return t.moveNext=function(){return n++,n>=e?(t.current=void 0,!1):(t.current=r[n],!0)},t}function t(){return this&&Array.isArray(this)?new n(this):new r.Enumerable}var n=function(r){function t(t){var n=r.call(this)||this;return n.getEnumerator=function(){return e(t)},n.toArray=function(){return t.slice(0)},n}return __extends(t,r),t}(r.Enumerable);try{Object.defineProperty(Array.prototype,"en",{value:t,enumerable:!1,writable:!1,configurable:!1})}catch(r){Array.prototype.en=t}}(exjs||(exjs={}));var exjs;!function(r){function e(r,e){var t,n=!1,o={current:void 0,moveNext:function(){return t||(t=r.getEnumerator()),o.current=void 0,t.moveNext()?(o.current=t.current,!0):!n&&(n=!0,t=e.getEnumerator(),!!t.moveNext()&&(o.current=t.current,!0))}};return o}r.Enumerable.prototype.concat=function(t){var n=this,o=t instanceof Array?t.en():t,u=new r.Enumerable;return u.getEnumerator=function(){return e(n,o)},u},r.List&&(r.List.prototype.concat=r.Enumerable.prototype.concat)}(exjs||(exjs={}));var exjs;!function(r){function e(r,e){var t,n=[],o={current:void 0,moveNext:function(){if(t||(t=r.getEnumerator()),o.current=void 0,!e){for(;t.moveNext();)if(n.indexOf(t.current)<0)return n.push(o.current=t.current),!0;return!1}for(;t.moveNext();){for(var u=0,i=n.length,c=!1;u<i&&!c;u++)c=!!e(n[u],t.current);if(!c)return n.push(o.current=t.current),!0}return!1}};return o}r.Enumerable.prototype.distinct=function(t){var n=this,o=new r.Enumerable;return o.getEnumerator=function(){return e(n,t)},o},r.List&&(r.List.prototype.distinct=r.Enumerable.prototype.distinct)}(exjs||(exjs={}));var exjs;!function(r){function e(r,e,t){t=t||function(r,e){return r===e};var n,o={current:void 0,moveNext:function(){for(n||(n=r.getEnumerator()),o.current=void 0;n.moveNext();){for(var u=!1,i=e.getEnumerator();i.moveNext()&&!u;)u=t(n.current,i.current);if(!u)return o.current=n.current,!0}return!1}};return o}r.Enumerable.prototype.except=function(t,n){var o=this,u=t instanceof Array?t.en():t,i=new r.Enumerable;return i.getEnumerator=function(){return e(o,u,n)},i},r.List&&(r.List.prototype.except=r.Enumerable.prototype.except)}(exjs||(exjs={})),Function.prototype.fromJson=function(r,e){function t(r,e){if(null==r)return r;if(e instanceof Function)return e(r);if(e instanceof Array){if(e=e[0],!(e instanceof Function&&r instanceof Array))return;for(var t=[],n=0;n<r.length;n++)t.push(e(r[n]));return t}}var n=new this;if(null==r)return n;var o=[];for(var u in e){var i=t(r[u],e[u]);void 0!==i&&(n[u]=i,o.push(u))}for(var u in this.$jsonMappings)if(!(o.indexOf(u)>-1)){var i=t(r[u],this.$jsonMappings[u]);void 0!==i&&(n[u]=i,o.push(u))}for(var u in r)o.indexOf(u)>-1||(n[u]=r[u]);return n};var exjs;!function(r){function e(r,e,n){var o,u=0,i={current:void 0,moveNext:function(){return o||(o=t(r,e,n)),i.current=void 0,!(u>=o.length)&&(i.current=o[u],u++,!0)}};return i}function t(r,e,t){t=t||function(r,e){return r===e};for(var o,u=[],i=[],c=r.getEnumerator();c.moveNext();){o=e(c.current);for(var a=-1,p=0,f=i.length;p<f;p++)if(t(o,i[p])){a=p;break}var s;a<0?(i.push(o),u.push(s=new n(o))):s=u[a],s._add(c.current)}return u}var n=function(r){function e(e){var t=r.call(this)||this;return t.key=e,t._arr=[],t.getEnumerator=function(){return t._arr.en().getEnumerator()},t}return __extends(e,r),e.prototype._add=function(r){this._arr.push(r)},e}(r.Enumerable);r.Enumerable.prototype.groupBy=function(t,n){var o=this,u=new r.Enumerable;return u.getEnumerator=function(){return e(o,t,n)},u},r.List&&(r.List.prototype.groupBy=r.Enumerable.prototype.groupBy)}(exjs||(exjs={}));var exjs;!function(r){function e(e,t,n){n=n||function(r,e){return r===e};var o,u={current:void 0,moveNext:function(){for(o||(o=r.en(e).distinct().getEnumerator()),u.current=void 0;o.moveNext();){for(var i=!1,c=t.getEnumerator();c.moveNext()&&!i;)i=n(o.current,c.current);if(i)return u.current=o.current,!0}return!1}};return u}r.Enumerable.prototype.intersect=function(t,n){var o=this,u=t instanceof Array?t.en():t,i=new r.Enumerable;return i.getEnumerator=function(){return e(o,u,n)},i},r.List&&(r.List.prototype.intersect=r.Enumerable.prototype.intersect)}(exjs||(exjs={}));var exjs;!function(r){function e(e,t,n,o,u,i){i=i||function(r,e){return r===e};var c,a,p=0,f={current:void 0,moveNext:function(){if(f.current=void 0,!c){if(c=e.getEnumerator(),!c.moveNext())return!1;a=r.en(t).toArray()}var s;do{for(;p<a.length;p++)if(s=a[p],i(n(c.current),o(s)))return p++,f.current=u(c.current,s),!0;p=0}while(c.moveNext());return!1}};return f}r.Enumerable.prototype.join=function(t,n,o,u,i){var c=this,a=t instanceof Array?t.en():t,p=new r.Enumerable;return p.getEnumerator=function(){return e(c,a,n,o,u,i)},p},r.List&&(r.List.prototype.join=r.Enumerable.prototype.join)}(exjs||(exjs={}));var exjs;!function(r){function e(){this.constructor=t}r.Enumerable.prototype.toList=function(){for(var r=new t,e=this.getEnumerator();e.moveNext();)r.push(e.current);return r};var t=function(r){function e(){return null!==r&&r.apply(this,arguments)||this}return __extends(e,r),e.prototype.toString=function(){throw new Error("Not implemented")},e.prototype.toLocaleString=function(){throw new Error("Not implemented")},e.prototype.pop=function(){throw new Error("Not implemented")},e.prototype.push=function(){for(var r=[],e=0;e<arguments.length;e++)r[e]=arguments[e];throw new Error("Not implemented")},e.prototype.shift=function(){throw new Error("Not implemented")},e.prototype.slice=function(r,e){throw new Error("Not implemented")},e.prototype.sort=function(r){throw new Error("Not implemented")},e.prototype.splice=function(){throw new Error("Not implemented")},e.prototype.unshift=function(){for(var r=[],e=0;e<arguments.length;e++)r[e]=arguments[e];throw new Error("Not implemented")},e.prototype.indexOf=function(r,e){throw new Error("Not implemented")},e.prototype.lastIndexOf=function(r,e){throw new Error("Not implemented")},e.prototype.every=function(r,e){throw new Error("Not implemented")},e.prototype.some=function(r,e){throw new Error("Not implemented")},e.prototype.forEach=function(r,e){throw new Error("Not implemented")},e.prototype.map=function(r,e){throw new Error("Not implemented")},e.prototype.filter=function(r,e){throw new Error("Not implemented")},e.prototype.reduce=function(r,e){throw new Error("Not implemented")},e.prototype.reduceRight=function(r,e){throw new Error("Not implemented")},e.prototype.remove=function(r){throw new Error("Not implemented")},e.prototype.removeWhere=function(r){throw new Error("Not implemented")},e}(r.Enumerable);r.List=t;for(var n in Array)Array.hasOwnProperty(n)&&(t[n]=Array[n]);e.prototype=Array.prototype,t.prototype=new e;for(var o in r.Enumerable.prototype)"getEnumerator"!==o&&(t.prototype[o]=r.Enumerable.prototype[o]);t.prototype.getEnumerator=function(){var r=this,e=r.length,t={moveNext:void 0,current:void 0},n=-1;return t.moveNext=function(){return n++,n>=e?(t.current=void 0,!1):(t.current=r[n],!0)},t},t.prototype.remove=function(r){return this.removeWhere(function(e){return e===r}).any()},t.prototype.removeWhere=function(r){for(var e,t=[],n=this.length-1;n>=0;n--)e=this[n],r(e,n)===!0&&(this.splice(n,1),t.push(e));return t.en().reverse()}}(exjs||(exjs={}));var exjs;!function(r){function e(r,e,n,o){return new t(r,e,n,o)}var t=function(e){function t(r,t,n,o){var u=e.call(this)||this;u.Source=r,o=o||function(r,e){return r>e?1:r<e?-1:0};var i=n===!0?-1:1;return u.Sorter=function(r,e){return i*o(t(r),t(e))},u}return __extends(t,e),t.prototype.getEnumerator=function(){var e,t=this.Source,n=this.Sorter,o=0,u={current:void 0,moveNext:function(){return e||(e=r.en(t).toArray(),e.sort(n)),u.current=void 0,!(o>=e.length)&&(u.current=e[o],o++,!0)}};return u},t.prototype.thenBy=function(r,e){return new n(this,r,!1,e)},t.prototype.thenByDescending=function(r,e){return new n(this,r,!0,e)},t}(r.Enumerable),n=function(r){function e(e,t,n,o){var u=r.call(this,e,t,n,o)||this,i=e.Sorter,c=u.Sorter;return u.Sorter=function(r,e){return i(r,e)||c(r,e)},u}return __extends(e,r),e}(t),o=r.Enumerable.prototype;o.orderBy=function(r,t){return e(this,r,!1,t)},o.orderByDescending=function(r,t){return e(this,r,!0,t)},r.List&&(r.List.prototype.orderBy=r.Enumerable.prototype.orderBy,r.List.prototype.orderByDescending=r.Enumerable.prototype.orderByDescending)}(exjs||(exjs={}));var exjs;!function(r){function e(r,e){var t,n,o=1,u={current:void 0,moveNext:function(){if(o<2){if(t=t||e.en().getEnumerator(),t.moveNext())return u.current=t.current,!0;o++}return n=n||r.getEnumerator(),n.moveNext()?(u.current=n.current,!0):(u.current=void 0,!1)}};return u}r.Enumerable.prototype.prepend=function(){for(var t=this,n=[],o=0;o<arguments.length;o++)n[o]=arguments[o];var u=new r.Enumerable;return u.getEnumerator=function(){return e(t,n)},u},r.List&&(r.List.prototype.prepend=r.Enumerable.prototype.prepend)}(exjs||(exjs={}));var exjs;!function(r){function e(r,e,t){var n=r-t,o={current:void 0,moveNext:function(){return n+=t,!(n>=e)&&(o.current=n,!0)}};return o}function t(t,n,o){if(t=t||0,n=n||0,t>n)throw new Error("Start cannot be greater than end.");null==o&&(o=1);var u=new r.Enumerable;return u.getEnumerator=function(){return e(t,n,o)},u}r.range=t}(exjs||(exjs={}));var exjs;!function(r){function e(e){var t,n=0,o={current:void 0,moveNext:function(){return t||(t=r.en(e).toArray(),n=t.length),n--,o.current=t[n],n>=0}};return o}r.Enumerable.prototype.reverse=function(){var t=this,n=new r.Enumerable;return n.getEnumerator=function(){return e(t)},n},r.List&&(r.List.prototype.reverse=r.Enumerable.prototype.reverse)}(exjs||(exjs={}));var exjs;!function(r){function e(r,e){if(e=e||0,0===e)return Math.round(r);var t=Math.pow(10,e);return Math.round(r*t)/t}r.round=e}(exjs||(exjs={}));var exjs;!function(r){function e(r,e){var t,n=0,o={current:void 0,moveNext:function(){return t||(t=r.getEnumerator()),!!t.moveNext()&&(o.current=e(t.current,n),n++,!0)}};return o}function t(e,t){var n,o,u={current:void 0,moveNext:function(){for(u.current=void 0,n||(n=e.getEnumerator());!o||!o.moveNext();){if(!n.moveNext())return!1;o=r.selectorEnumerator(t(n.current))}return u.current=o.current,!0}};return u}r.Enumerable.prototype.select=function(t){var n=this,o=new r.Enumerable;return o.getEnumerator=function(){return e(n,t)},o},r.Enumerable.prototype.selectMany=function(e){var n=this,o=new r.Enumerable;return o.getEnumerator=function(){return t(n,e)},o},r.List&&(r.List.prototype.select=r.Enumerable.prototype.select,r.List.prototype.selectMany=r.Enumerable.prototype.selectMany)}(exjs||(exjs={}));var exjs;!function(r){function e(r){return Array.isArray(r)?r.en().getEnumerator():null!=r&&"function"==typeof r.getEnumerator?r.getEnumerator():null}r.selectorEnumerator=e}(exjs||(exjs={}));var exjs;!function(r){function e(r,e){var t,n={current:void 0,moveNext:function(){if(!t){t=r.getEnumerator();for(var o=0;o<e;o++)if(!t.moveNext())return!1}return t.moveNext()?(n.current=t.current,!0):(n.current=void 0,!1)}};return n}function t(r,e){var t,n={current:void 0,moveNext:function(){if(!t){t=r.getEnumerator();for(var o=0;t.moveNext();o++)if(!e(n.current=t.current,o))return!0;return n.current=void 0,!1}return t.moveNext()?(n.current=t.current,!0):(n.current=void 0,!1)}};return n}r.Enumerable.prototype.skip=function(t){var n=this,o=new r.Enumerable;return o.getEnumerator=function(){return e(n,t)},o},r.Enumerable.prototype.skipWhile=function(e){var n=this,o=new r.Enumerable;return o.getEnumerator=function(){return t(n,e)},o},r.List&&(r.List.prototype.skip=r.Enumerable.prototype.skip,r.List.prototype.skipWhile=r.Enumerable.prototype.skipWhile)}(exjs||(exjs={}));var exjs;!function(r){function e(r,e){var t,n=0,o={current:void 0,moveNext:function(){return t||(t=r.getEnumerator()),n++,!(n>e)&&(o.current=void 0,!!t.moveNext()&&(o.current=t.current,!0))}};return o}function t(r,e){var t,n=0,o={current:void 0,moveNext:function(){return t||(t=r.getEnumerator()),t.moveNext()&&e(t.current,n)?(n++,o.current=t.current,!0):(o.current=void 0,!1)}};return o}r.Enumerable.prototype.take=function(t){var n=this,o=new r.Enumerable;return o.getEnumerator=function(){return e(n,t)},o},r.Enumerable.prototype.takeWhile=function(e){var n=this,o=new r.Enumerable;return o.getEnumerator=function(){return t(n,e)},o},r.List&&(r.List.prototype.take=r.Enumerable.prototype.take,r.List.prototype.takeWhile=r.Enumerable.prototype.takeWhile)}(exjs||(exjs={}));var exjs;!function(r){function e(e,t){var n,o=!1,u=[],i={current:void 0,moveNext:function(){if(o){if(null==n)return!1;u.push(n),n=r.selectorEnumerator(t(i.current))}else n=e.getEnumerator(),o=!0;for(;!(n&&n.moveNext()||u.length<1);)n=u.pop();return i.current=null==n?void 0:n.current,void 0!==i.current}};return i}function t(e,t,n){var o,u=!1,i=[],c={current:void 0,moveNext:function(){if(u){if(null==o)return!1;i.push(o),o=r.selectorEnumerator(t(c.current))}else o=e.getEnumerator(),u=!0;do{for(;!(o&&o.moveNext()||i.length<1);)o=i.pop();c.current=null==o?void 0:o.current}while(n(c.current));return void 0!==c.current}};return c}r.Enumerable.prototype.traverse=function(t){var n=this,o=new r.Enumerable;return o.getEnumerator=function(){return e(n,t)},o},r.Enumerable.prototype.traverseUnique=function(e,n){var o=this,u=[],i=new r.Enumerable;return n?i.getEnumerator=function(){return t(o,e,function(r){return!!u.some(function(e){return n(r,e)})||(u.push(r),!1)})}:i.getEnumerator=function(){return t(o,e,function(r){return u.indexOf(r)>-1||(u.push(r),!1)})},i},r.List&&(r.List.prototype.traverse=r.Enumerable.prototype.traverse,r.List.prototype.traverseUnique=r.Enumerable.prototype.traverseUnique)}(exjs||(exjs={}));var exjs;!function(r){function e(e,t,n){n=n||function(r,e){return r===e};var o,u,i=[],c={current:void 0,moveNext:function(){if(o||(o=r.en(e).distinct().getEnumerator()),c.current=void 0,!u&&o.moveNext())return i.push(c.current=o.current),!0;for(u=u||r.en(t).distinct().getEnumerator();u.moveNext();){for(var a=0,p=!1,f=i.length;a<f&&!p;a++)p=n(i[a],u.current);if(!p)return c.current=u.current,!0}return!1}};return c}r.Enumerable.prototype.union=function(t,n){var o=this,u=t instanceof Array?t.en():t,i=new r.Enumerable;return i.getEnumerator=function(){return e(o,u,n)},i},r.List&&(r.List.prototype.union=r.Enumerable.prototype.union)}(exjs||(exjs={}));var exjs;!function(r){function e(r,e){var t,n={current:void 0,moveNext:function(){t||(t=r.getEnumerator());for(var o;t.moveNext();)if(e(o=t.current))return n.current=o,!0;return!1}};return n}r.Enumerable.prototype.where=function(t){var n=this,o=new r.Enumerable;return o.getEnumerator=function(){return e(n,t)},o},r.List&&(r.List.prototype.where=r.Enumerable.prototype.where)}(exjs||(exjs={}));var exjs;!function(r){function e(e){var n=new r.Enumerable;return n.getEnumerator=function(){return t(e)},n}function t(r){var e=r.getEnumerator(),t={current:void 0,moveNext:void 0};return t.moveNext=function(){return e.moveNext()?(t.current=e.current,!0):(t.current=void 0,!1)},t}r.en=e}(exjs||(exjs={}));var ex=exjs.en,exjs;!function(r){function e(r,e,t){var n,o,u={current:void 0,moveNext:function(){return n||(n=r.getEnumerator()),o||(o=e.getEnumerator()),u.current=void 0,!(!n.moveNext()||!o.moveNext())&&(u.current=t(n.current,o.current),!0)}};return u}r.Enumerable.prototype.zip=function(t,n){var o=this,u=t instanceof Array?t.en():t,i=new r.Enumerable;return i.getEnumerator=function(){return e(o,u,n)},i},r.List&&(r.List.prototype.zip=r.Enumerable.prototype.zip)}(exjs||(exjs={}));
//# sourceMappingURL=ex.es3.min.js.map

define("lib/ex.es3.min.js", function(){});

// base-component v1.0.9 https://github.com/viewdir/base-component#readme
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define('lib/base-component.js',[],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.baseComponent = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
///<reference path="../node_modules/typescript/lib/lib.es6.d.ts"/> 

var _Components;
(function (_Components) {
    var BaseComponent = (function () {
        function BaseComponent(options) {
            this.options = options;
            this.options.data = $.extend(this.data(), options.data);
        }
        BaseComponent.prototype._init = function () {
            this._$element = $(this.options.target);
            if (!this._$element.length) {
                console.warn('element not found');
                return false;
            }
            this._$element.empty();
            return true;
        };
        BaseComponent.prototype.data = function () {
            return {};
        };
        BaseComponent.prototype.on = function (name, callback, ctx) {
            var e = this._e || (this._e = {});
            (e[name] || (e[name] = [])).push({
                fn: callback,
                ctx: ctx
            });
        };
        BaseComponent.prototype.fire = function (name) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var data = [].slice.call(arguments, 1);
            var evtArr = ((this._e || (this._e = {}))[name] || []).slice();
            var i = 0;
            var len = evtArr.length;
            for (i; i < len; i++) {
                evtArr[i].fn.apply(evtArr[i].ctx, data);
            }
        };
        BaseComponent.prototype._resize = function () {
        };
        BaseComponent.prototype.set = function (data) {
        };
        return BaseComponent;
    }());
    _Components.BaseComponent = BaseComponent;
})(_Components || (_Components = {}));
(function (g) {
    if (!g._Components) {
        g._Components = _Components;
    }
})(global);



}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[1])(1)
});
// key-codes v0.0.5 https://github.com/edsilv/key-codes
!function(f){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=f();else if("function"==typeof define&&define.amd)define('lib/key-codes.min.js',[],f);else{var g;g="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,g.keyCodes=f()}}(function(){return function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a="function"==typeof require&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}for(var i="function"==typeof require&&require,o=0;o<r.length;o++)s(r[o]);return s}({1:[function(require,module,exports){(function(global){var KeyCodes;!function(KeyCodes){var KeyDown;!function(KeyDown){KeyDown.Backspace=8,KeyDown.Tab=9,KeyDown.Enter=13,KeyDown.Shift=16,KeyDown.Ctrl=17,KeyDown.Alt=18,KeyDown.PauseBreak=19,KeyDown.CapsLock=20,KeyDown.Escape=27,KeyDown.Spacebar=32,KeyDown.PageUp=33,KeyDown.PageDown=34,KeyDown.End=35,KeyDown.Home=36,KeyDown.LeftArrow=37,KeyDown.UpArrow=38,KeyDown.RightArrow=39,KeyDown.DownArrow=40,KeyDown.PrintScrn=44,KeyDown.Insert=45,KeyDown.Delete=46,KeyDown.Zero=48,KeyDown.One=49,KeyDown.Two=50,KeyDown.Three=51,KeyDown.Four=52,KeyDown.Five=53,KeyDown.Six=54,KeyDown.Seven=55,KeyDown.Eight=56,KeyDown.Nine=57,KeyDown.a=65,KeyDown.b=66,KeyDown.c=67,KeyDown.d=68,KeyDown.e=69,KeyDown.f=70,KeyDown.g=71,KeyDown.h=72,KeyDown.i=73,KeyDown.j=74,KeyDown.k=75,KeyDown.l=76,KeyDown.m=77,KeyDown.n=78,KeyDown.o=79,KeyDown.p=80,KeyDown.q=81,KeyDown.r=82,KeyDown.s=83,KeyDown.t=84,KeyDown.u=85,KeyDown.v=86,KeyDown.w=87,KeyDown.x=88,KeyDown.y=89,KeyDown.z=90,KeyDown.LeftWindowKey=91,KeyDown.RightWindowKey=92,KeyDown.SelectKey=93,KeyDown.Numpad0=96,KeyDown.Numpad1=97,KeyDown.Numpad2=98,KeyDown.Numpad3=99,KeyDown.Numpad4=100,KeyDown.Numpad5=101,KeyDown.Numpad6=102,KeyDown.Numpad7=103,KeyDown.Numpad8=104,KeyDown.Numpad9=105,KeyDown.Multiply=106,KeyDown.NumpadPlus=107,KeyDown.NumpadMinus=109,KeyDown.DecimalPoint=110,KeyDown.Divide=111,KeyDown.F1=112,KeyDown.F2=113,KeyDown.F3=114,KeyDown.F4=115,KeyDown.F5=116,KeyDown.F6=117,KeyDown.F7=118,KeyDown.F8=119,KeyDown.F9=120,KeyDown.F10=121,KeyDown.F11=122,KeyDown.F12=123,KeyDown.NumLock=144,KeyDown.ScrollLock=145,KeyDown.Semicolon=186,KeyDown.Equals=187,KeyDown.Comma=188,KeyDown.LessThan=188,KeyDown.Dash=189,KeyDown.Period=190,KeyDown.GreaterThan=190,KeyDown.ForwardSlash=191,KeyDown.QuestionMark=191,KeyDown.GraveAccent=192,KeyDown.Tilde=192,KeyDown.OpenCurlyBracket=219,KeyDown.OpenSquareBracket=219,KeyDown.BackSlash=220,KeyDown.VerticalPipe=220,KeyDown.CloseCurlyBracket=221,KeyDown.CloseSquareBracket=221,KeyDown.Quote=222,KeyDown.CommandFF=224}(KeyDown=KeyCodes.KeyDown||(KeyCodes.KeyDown={}))}(KeyCodes||(KeyCodes={})),function(KeyCodes){var KeyPress;!function(KeyPress){KeyPress.Backspace=8,KeyPress.Enter=13,KeyPress.Spacebar=32,KeyPress.Hash=35,KeyPress.GraveAccent=39,KeyPress.DoubleQuote=34,KeyPress.Asterisk=42,KeyPress.Plus=43,KeyPress.Comma=44,KeyPress.Minus=45,KeyPress.Period=46,KeyPress.ForwardSlash=47,KeyPress.Zero=48,KeyPress.One=49,KeyPress.Two=50,KeyPress.Three=51,KeyPress.Four=52,KeyPress.Five=53,KeyPress.Six=54,KeyPress.Seven=55,KeyPress.Eight=56,KeyPress.Nine=57,KeyPress.Colon=58,KeyPress.Semicolon=59,KeyPress.LessThan=60,KeyPress.Equals=61,KeyPress.GreaterThan=62,KeyPress.QuestionMark=63,KeyPress.At=64,KeyPress.OpenSquareBracket=91,KeyPress.BackSlash=92,KeyPress.CloseSquareBracket=93,KeyPress.a=97,KeyPress.b=98,KeyPress.c=99,KeyPress.d=100,KeyPress.e=101,KeyPress.f=102,KeyPress.g=103,KeyPress.h=104,KeyPress.i=105,KeyPress.j=106,KeyPress.k=107,KeyPress.l=108,KeyPress.m=109,KeyPress.n=110,KeyPress.o=111,KeyPress.p=112,KeyPress.q=113,KeyPress.r=114,KeyPress.s=115,KeyPress.t=116,KeyPress.u=117,KeyPress.v=118,KeyPress.w=119,KeyPress.x=120,KeyPress.y=121,KeyPress.z=122,KeyPress.OpenCurlyBracket=123,KeyPress.VerticalPipe=124,KeyPress.CloseCurlyBracket=125,KeyPress.Tilde=126}(KeyPress=KeyCodes.KeyPress||(KeyCodes.KeyPress={}))}(KeyCodes||(KeyCodes={})),function(g){g.KeyCodes||(g.KeyCodes=KeyCodes)}(global)}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}]},{},[1])(1)});
// extensions v0.1.11 https://github.com/edsilv/extensions
!function(f){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=f();else if("function"==typeof define&&define.amd)define('lib/extensions.min.js',[],f);else{var g;g="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,g.extensions=f()}}(function(){return function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a="function"==typeof require&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}for(var i="function"==typeof require&&require,o=0;o<r.length;o++)s(r[o]);return s}({1:[function(require,module,exports){Array.prototype.clone=function(){return this.slice(0)},Array.prototype.includes||(Array.prototype.includes=function(val){return this.indexOf(val)!==-1}),Array.prototype.insert=function(item,index){this.splice(index,0,item)},Array.prototype.move=function(fromIndex,toIndex){this.splice(toIndex,0,this.splice(fromIndex,1)[0])},Array.prototype.remove=function(item){var index=this.indexOf(item);index>-1&&this.splice(index,1)},Array.prototype.removeAt=function(index){this.splice(index,1)},Math.clamp||(Math.clamp=function(value,min,max){return Math.min(Math.max(value,min),max)}),Math.radians||(Math.radians=function(degrees){return Math.TAU*(degrees/360)}),Math.distanceBetween=function(x1,y1,x2,y2){return Math.sqrt(2*(x2-x1)+2*(y2-y1))},Math.lerp=function(start,stop,amount){return start+(stop-start)*amount},Math.mag=function(a,b,c){return Math.sqrt(a*a+b*b+c*c)},Math.map=function(value,start1,stop1,start2,stop2){return start2+(stop2-start2)*((value-start1)/(stop1-start1))},Math.median=function(values){values.sort(function(a,b){return a-b});var half=Math.floor(values.length/2);return values.length%2?values[half]:(values[half-1]+values[half])/2},Math.normalise=function(num,min,max){return(num-min)/(max-min)},Math.degrees||(Math.degrees=function(radians){return 360*radians/Math.TAU}),Math.randomBetween=function(low,high){return high||(high=low,low=0),low>=high?low:low+(high-low)*Math.random()},Math.roundToDecimalPlace=function(num,dec){return Math.round(num*Math.pow(10,dec))/Math.pow(10,dec)},Math.TAU=2*Math.PI,String.prototype.b64_to_utf8=function(){return decodeURIComponent(escape(window.atob(this)))},String.format=function(){for(var s=arguments[0],i=0;i<arguments.length-1;i++){var reg=new RegExp("\\{"+i+"\\}","gm");s=s.replace(reg,arguments[i+1])}return s},String.prototype.includes||(String.prototype.includes=function(str){return this.indexOf(str)!==-1}),String.prototype.isAlphanumeric=function(){return/^[a-zA-Z0-9]*$/.test(this)},String.prototype.ltrim=function(){return this.replace(/^\s+/,"")},String.prototype.rtrim=function(){return this.replace(/\s+$/,"")},String.prototype.toCssClass=function(){return this.replace(/[^a-z0-9]/g,function(s){var c=s.charCodeAt(0);return 32==c?"-":c>=65&&c<=90?"_"+s.toLowerCase():"__"+("000"+c.toString(16)).slice(-4)})},String.prototype.toFileName=function(){return this.replace(/[^a-z0-9]/gi,"_").toLowerCase()},String.prototype.utf8_to_b64=function(){return window.btoa(unescape(encodeURIComponent(this)))}},{}]},{},[1])(1)});
// http-status-codes v0.0.5 https://github.com/edsilv/http-status-codes
!function(f){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=f();else if("function"==typeof define&&define.amd)define('lib/http-status-codes.min.js',[],f);else{var g;g="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,g.httpStatusCodes=f()}}(function(){return function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a="function"==typeof require&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}for(var i="function"==typeof require&&require,o=0;o<r.length;o++)s(r[o]);return s}({1:[function(require,module,exports){(function(global){var HTTPStatusCode;!function(HTTPStatusCode){HTTPStatusCode.CONTINUE=100,HTTPStatusCode.SWITCHING_PROTOCOLS=101,HTTPStatusCode.PROCESSING=102,HTTPStatusCode.OK=200,HTTPStatusCode.CREATED=201,HTTPStatusCode.ACCEPTED=202,HTTPStatusCode.NON_AUTHORITATIVE_INFORMATION=203,HTTPStatusCode.NO_CONTENT=204,HTTPStatusCode.RESET_CONTENT=205,HTTPStatusCode.PARTIAL_CONTENT=206,HTTPStatusCode.MULTI_STATUS=207,HTTPStatusCode.MULTIPLE_CHOICES=300,HTTPStatusCode.MOVED_PERMANENTLY=301,HTTPStatusCode.MOVED_TEMPORARILY=302,HTTPStatusCode.SEE_OTHER=303,HTTPStatusCode.NOT_MODIFIED=304,HTTPStatusCode.USE_PROXY=305,HTTPStatusCode.TEMPORARY_REDIRECT=307,HTTPStatusCode.BAD_REQUEST=400,HTTPStatusCode.UNAUTHORIZED=401,HTTPStatusCode.PAYMENT_REQUIRED=402,HTTPStatusCode.FORBIDDEN=403,HTTPStatusCode.NOT_FOUND=404,HTTPStatusCode.METHOD_NOT_ALLOWED=405,HTTPStatusCode.NOT_ACCEPTABLE=406,HTTPStatusCode.PROXY_AUTHENTICATION_REQUIRED=407,HTTPStatusCode.REQUEST_TIME_OUT=408,HTTPStatusCode.CONFLICT=409,HTTPStatusCode.GONE=410,HTTPStatusCode.LENGTH_REQUIRED=411,HTTPStatusCode.PRECONDITION_FAILED=412,HTTPStatusCode.REQUEST_ENTITY_TOO_LARGE=413,HTTPStatusCode.REQUEST_URI_TOO_LARGE=414,HTTPStatusCode.UNSUPPORTED_MEDIA_TYPE=415,HTTPStatusCode.REQUESTED_RANGE_NOT_SATISFIABLE=416,HTTPStatusCode.EXPECTATION_FAILED=417,HTTPStatusCode.IM_A_TEAPOT=418,HTTPStatusCode.UNPROCESSABLE_ENTITY=422,HTTPStatusCode.LOCKED=423,HTTPStatusCode.FAILED_DEPENDENCY=424,HTTPStatusCode.UNORDERED_COLLECTION=425,HTTPStatusCode.UPGRADE_REQUIRED=426,HTTPStatusCode.PRECONDITION_REQUIRED=428,HTTPStatusCode.TOO_MANY_REQUESTS=429,HTTPStatusCode.REQUEST_HEADER_FIELDS_TOO_LARGE=431,HTTPStatusCode.INTERNAL_SERVER_ERROR=500,HTTPStatusCode.NOT_IMPLEMENTED=501,HTTPStatusCode.BAD_GATEWAY=502,HTTPStatusCode.SERVICE_UNAVAILABLE=503,HTTPStatusCode.GATEWAY_TIME_OUT=504,HTTPStatusCode.HTTP_VERSION_NOT_SUPPORTED=505,HTTPStatusCode.VARIANT_ALSO_NEGOTIATES=506,HTTPStatusCode.INSUFFICIENT_STORAGE=507,HTTPStatusCode.BANDWIDTH_LIMIT_EXCEEDED=509,HTTPStatusCode.NOT_EXTENDED=510,HTTPStatusCode.NETWORK_AUTHENTICATION_REQUIRED=511}(HTTPStatusCode||(HTTPStatusCode={})),function(g){g.HTTPStatusCode||(g.HTTPStatusCode=HTTPStatusCode)}(global)}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}]},{},[1])(1)});
// jquery-plugins v0.0.25 https://github.com/edsilv/jquery-plugins
!function(f){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=f();else if("function"==typeof define&&define.amd)define('lib/jquery-plugins.min.js',[],f);else{var g;g="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,g.jqueryPlugins=f()}}(function(){return function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a="function"==typeof require&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}for(var i="function"==typeof require&&require,o=0;o<r.length;o++)s(r[o]);return s}({1:[function(require,module,exports){!function($){function documentHandler(){var $current=this===document?$(this):$(this).contents();$current.mousemove(function(e){jQuery.mlp={x:e.pageX,y:e.pageY}}),$current.find("iframe").load(documentHandler)}$.fn.checkboxButton=function(onClick){return this.each(function(){var $this=$(this);$this.on("click",function(e){var tagName=e.target.tagName,$checkbox=$(this).find(":checkbox");"INPUT"!==tagName&&(e.preventDefault(),$checkbox.prop("checked",!$checkbox.prop("checked")));var checked=$checkbox.is(":checked");onClick.call(this,checked)})})},$.fn.disable=function(){return this.each(function(){var $this=$(this);$this.addClass("disabled"),$this.data("tabindex",$this.attr("tabindex")),$this.removeAttr("tabindex")})},$.fn.ellipsis=function(chars){return this.each(function(){var $self=$(this),text=$self.text();if(text.length>chars){var trimmedText=text.substr(0,chars);trimmedText=trimmedText.substr(0,Math.min(trimmedText.length,trimmedText.lastIndexOf(" "))),$self.empty().html(trimmedText+"&hellip;")}})},$.fn.ellipsisFill=function(text){var textPassed=!0;return text||(textPassed=!1),this.each(function(){var $self=$(this);textPassed||(text=$self.text()),$self.empty();var $spanElem=$('<span title="'+text+'"></span>');if($self.append($spanElem),$self.css("overflow","hidden"),$spanElem.css("white-space","nowrap"),$spanElem.html(text),$spanElem.width()>$self.width())for(var lastText=null;$spanElem.width()>$self.width();){var t=$spanElem.html();if(t=t.substring(0,t.lastIndexOf(" "))+"&hellip;",t===lastText)break;$spanElem.html(t),lastText=t}})},$.fn.ellipsisHtmlFixed=function(chars,cb){return this.each(function(){var $self=$(this),expandedText=$self.html(),$trunc=$("<span></span>");if($trunc.html($self.html().replace(/\s[\s]*/g," ").trim()),!($trunc.text().trim().length<=chars)){for(;$trunc.text().trim().length>chars;)$trunc.removeLastWord(chars);var collapsedText=$trunc.html(),expanded=!1;$self.toggle=function(){$self.empty();var $toggleButton=$('<a href="#" class="toggle"></a>');expanded?($self.html(expandedText+" "),$toggleButton.text("less"),$toggleButton.toggleClass("less","more")):($self.html(collapsedText+"&hellip; "),$toggleButton.text("more"),$toggleButton.toggleClass("more","less")),$toggleButton.one("click",function(e){e.preventDefault(),$self.toggle()}),expanded=!expanded,$self.append($toggleButton),cb&&cb()},$self.toggle()}})},$.fn.enable=function(){return this.each(function(){var $self=$(this);$self.removeClass("disabled"),$self.attr("tabindex",$self.data("tabindex"))})},$.fn.equaliseHeight=function(reset,average){var maxHeight=-1,minHeight=Number.MAX_VALUE,heights=[];reset&&this.each(function(){$(this).height("auto")}),this.each(function(){var currentHeight=$(this).height();heights.push(currentHeight),maxHeight=maxHeight>currentHeight?maxHeight:currentHeight,minHeight=minHeight<currentHeight?minHeight:currentHeight});var finalHeight=maxHeight;return average&&(finalHeight=Math.median(heights)),this.each(function(){$(this).height(finalHeight)}),this},$.fn.getVisibleElementWithGreatestTabIndex=function(){var $self=$(this),maxTabIndex=0,$elementWithGreatestTabIndex=null;return $self.find("*:visible[tabindex]").each(function(index,el){var $el=$(el),tabIndex=parseInt($el.attr("tabindex"));tabIndex>maxTabIndex&&(maxTabIndex=tabIndex,$elementWithGreatestTabIndex=$el)}),$elementWithGreatestTabIndex},$.fn.horizontalMargins=function(){var $self=$(this);return parseInt($self.css("marginLeft"))+parseInt($self.css("marginRight"))},$.fn.leftMargin=function(){var $self=$(this);return parseInt($self.css("marginLeft"))},$.fn.rightMargin=function(){var $self=$(this);return parseInt($self.css("marginRight"))},$.fn.horizontalPadding=function(){var $self=$(this);return parseInt($self.css("paddingLeft"))+parseInt($self.css("paddingRight"))},$.fn.leftPadding=function(){var $self=$(this);return parseInt($self.css("paddingLeft"))},$.fn.rightPadding=function(){var $self=$(this);return parseInt($self.css("paddingRight"))},$.mlp={x:0,y:0},$(documentHandler),$.fn.ismouseover=function(){var result=!1;return this.eq(0).each(function(){var $current=$(this).is("iframe")?$(this).contents().find("body"):$(this),offset=$current.offset();result=offset.left<=$.mlp.x&&offset.left+$current.outerWidth()>$.mlp.x&&offset.top<=$.mlp.y&&offset.top+$current.outerHeight()>$.mlp.y}),result};var timer,on=$.fn.on;$.fn.on=function(){var args=Array.apply(null,arguments),last=args[args.length-1];if(isNaN(last)||1===last&&args.pop())return on.apply(this,args);var delay=args.pop(),fn=args.pop();return args.push(function(){var self=this,params=arguments;clearTimeout(timer),timer=setTimeout(function(){fn.apply(self,params)},delay)}),on.apply(this,args)},$.fn.onEnter=function(cb){return this.each(function(){var $this=$(this);$this.on("keyup",function(e){13===e.keyCode&&(e.preventDefault(),cb())})})},$.fn.onPressed=function(cb){return this.each(function(){var $this=$(this);$this.on("touchstart click",function(e){e.preventDefault(),cb(e)}),$this.on("keyup",function(e){13===e.keyCode&&(e.preventDefault(),cb(e))})})},$.fn.removeLastWord=function(chars,depth){return void 0===chars&&(chars=8),void 0===depth&&(depth=0),this.each(function(){var $self=$(this);if($self.contents().length>0){var $lastElement=$self.contents().last();if(3===$lastElement[0].nodeType){var words=$lastElement.text().trim().split(" ");if(words.length>1)return words.splice(words.length-1,1),void($lastElement[0].data=words.join(" "));if("undefined"!=typeof chars&&1===words.length&&words[0].length>chars)return void($lastElement[0].data=words.join(" ").substring(0,chars))}$lastElement.removeLastWord(chars,depth+1)}else depth>0&&$self.remove()})},$.fn.swapClass=function(removeClass,addClass){return this.each(function(){$(this).removeClass(removeClass).addClass(addClass)})},$.fn.targetBlank=function(){return this.each(function(){$(this).find("a").prop("target","_blank")})},$.fn.toggleClass=function(class1,class2){return this.each(function(){var $this=$(this);$this.hasClass(class1)?$(this).removeClass(class1).addClass(class2):$(this).removeClass(class2).addClass(class1)})},$.fn.toggleExpandText=function(chars,lessText,moreText,cb){return this.each(function(){var $self=$(this),expandedText=$self.html();if(!(chars>expandedText.length)){var expanded=!1,collapsedText=expandedText.substr(0,chars);collapsedText=collapsedText.substr(0,Math.min(collapsedText.length,collapsedText.lastIndexOf(" "))),$self.toggle=function(){$self.empty();var $toggleButton=$('<a href="#" class="toggle"></a>');expanded?($self.html(expandedText+"&nbsp;"),$toggleButton.text(lessText),$toggleButton.toggleClass("less","more")):($self.html(collapsedText+"&nbsp;"),$toggleButton.text(moreText),$toggleButton.toggleClass("more","less")),$toggleButton.one("click",function(e){e.preventDefault(),$self.toggle()}),expanded=!expanded,$self.append($toggleButton),cb&&cb()},$self.toggle()}})},$.fn.toggleExpandTextByLines=function(lines,lessText,moreText,cb){return this.each(function(){for(var $self=$(this),expandedText=$self.html(),$buttonPad=$('<span>&hellip; <a href="#" class="toggle more">morepad</a></span>'),stringsByLine=[expandedText],lastHeight=$self.height();$self.text().length>0;){$self.removeLastWord();var html=$self.html();$self.append($buttonPad),lastHeight>$self.height()&&(stringsByLine.unshift(html),lastHeight=$self.height()),$buttonPad.remove()}if(stringsByLine.length<=lines)return void $self.html(expandedText);var collapsedText=stringsByLine[lines-1],expanded=!1;$self.toggle=function(){$self.empty();var $toggleButton=$('<a href="#" class="toggle"></a>');expanded?($self.html(expandedText+" "),$toggleButton.text(lessText),$toggleButton.toggleClass("less","more")):($self.html(collapsedText+"&hellip; "),$toggleButton.text(moreText),$toggleButton.toggleClass("more","less")),$toggleButton.one("click",function(e){e.preventDefault(),$self.toggle()}),expanded=!expanded,$self.append($toggleButton),cb&&cb()},$self.toggle()})},$.fn.toggleText=function(text1,text2){return this.each(function(){var $self=$(this);$self.text()===text1?$(this).text(text2):$(this).text(text1)})},$.fn.updateAttr=function(attrName,oldVal,newVal){return this.each(function(){var $self=$(this),attr=$self.attr(attrName);attr&&0===attr.indexOf(oldVal)&&(attr=attr.replace(oldVal,newVal),$self.attr(attrName,attr))})},$.fn.verticalMargins=function(){var $self=$(this);return parseInt($self.css("marginTop"))+parseInt($self.css("marginBottom"))},$.fn.verticalPadding=function(){var $self=$(this);return parseInt($self.css("paddingTop"))+parseInt($self.css("paddingBottom"))}}(jQuery)},{}]},{},[1])(1)});
/*! Tiny Pub/Sub - v0.7.0 - 2015-04-21
* https://github.com/cowboy/jquery-tiny-pubsub
* Copyright (c) 2015 "Cowboy" Ben Alman; Licensed MIT */
!function(a){var b=null;a.initPubSub=function(){b=a({})},a.subscribe=function(){b||a.initPubSub(),b.on.apply(b,arguments)},a.unsubscribe=function(){b||a.initPubSub(),b.off.apply(b,arguments)},a.disposePubSub=function(){b=null},a.publish=function(){b||a.initPubSub(),b.trigger.apply(b,arguments)}}(jQuery);
define("lib/ba-tiny-pubsub.min.js", function(){});

// manifesto v2.0.7 https://github.com/viewdir/manifesto
!function(f){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=f();else if("function"==typeof define&&define.amd)define('lib/manifesto.min.js',[],f);else{var g;g="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,g.manifesto=f()}}(function(){var define;return function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a="function"==typeof require&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}for(var i="function"==typeof require&&require,o=0;o<r.length;o++)s(r[o]);return s}({1:[function(require,module,exports){(function(global){var Manifesto;!function(Manifesto){var StringValue=function(){function StringValue(value){this.value="",value&&(this.value=value.toLowerCase())}return StringValue.prototype.toString=function(){return this.value},StringValue}();Manifesto.StringValue=StringValue}(Manifesto||(Manifesto={}));var Manifesto,__extends=this&&this.__extends||function(){var extendStatics=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(d,b){d.__proto__=b}||function(d,b){for(var p in b)b.hasOwnProperty(p)&&(d[p]=b[p])};return function(d,b){function __(){this.constructor=d}extendStatics(d,b),d.prototype=null===b?Object.create(b):(__.prototype=b.prototype,new __)}}();!function(Manifesto){var AnnotationMotivation=function(_super){function AnnotationMotivation(){return null!==_super&&_super.apply(this,arguments)||this}return __extends(AnnotationMotivation,_super),AnnotationMotivation.prototype.bookmarking=function(){return new AnnotationMotivation(AnnotationMotivation.BOOKMARKING.toString())},AnnotationMotivation.prototype.classifying=function(){return new AnnotationMotivation(AnnotationMotivation.CLASSIFYING.toString())},AnnotationMotivation.prototype.commenting=function(){return new AnnotationMotivation(AnnotationMotivation.COMMENTING.toString())},AnnotationMotivation.prototype.describing=function(){return new AnnotationMotivation(AnnotationMotivation.DESCRIBING.toString())},AnnotationMotivation.prototype.editing=function(){return new AnnotationMotivation(AnnotationMotivation.EDITING.toString())},AnnotationMotivation.prototype.highlighting=function(){return new AnnotationMotivation(AnnotationMotivation.HIGHLIGHTING.toString())},AnnotationMotivation.prototype.identifying=function(){return new AnnotationMotivation(AnnotationMotivation.IDENTIFYING.toString())},AnnotationMotivation.prototype.linking=function(){return new AnnotationMotivation(AnnotationMotivation.LINKING.toString())},AnnotationMotivation.prototype.moderating=function(){return new AnnotationMotivation(AnnotationMotivation.MODERATING.toString())},AnnotationMotivation.prototype.painting=function(){return new AnnotationMotivation(AnnotationMotivation.PAINTING.toString())},AnnotationMotivation.prototype.questioning=function(){return new AnnotationMotivation(AnnotationMotivation.QUESTIONING.toString())},AnnotationMotivation.prototype.replying=function(){return new AnnotationMotivation(AnnotationMotivation.REPLYING.toString())},AnnotationMotivation.prototype.tagging=function(){return new AnnotationMotivation(AnnotationMotivation.TAGGING.toString())},AnnotationMotivation.prototype.transcribing=function(){return new AnnotationMotivation(AnnotationMotivation.TRANSCRIBING.toString())},AnnotationMotivation}(Manifesto.StringValue);AnnotationMotivation.BOOKMARKING=new AnnotationMotivation("oa:bookmarking"),AnnotationMotivation.CLASSIFYING=new AnnotationMotivation("oa:classifying"),AnnotationMotivation.COMMENTING=new AnnotationMotivation("oa:commenting"),AnnotationMotivation.DESCRIBING=new AnnotationMotivation("oa:describing"),AnnotationMotivation.EDITING=new AnnotationMotivation("oa:editing"),AnnotationMotivation.HIGHLIGHTING=new AnnotationMotivation("oa:highlighting"),AnnotationMotivation.IDENTIFYING=new AnnotationMotivation("oa:identifying"),AnnotationMotivation.LINKING=new AnnotationMotivation("oa:linking"),AnnotationMotivation.MODERATING=new AnnotationMotivation("oa:moderating"),AnnotationMotivation.PAINTING=new AnnotationMotivation("sc:painting"),AnnotationMotivation.QUESTIONING=new AnnotationMotivation("oa:questioning"),AnnotationMotivation.REPLYING=new AnnotationMotivation("oa:replying"),AnnotationMotivation.TAGGING=new AnnotationMotivation("oa:tagging"),AnnotationMotivation.TRANSCRIBING=new AnnotationMotivation("oad:transcribing"),Manifesto.AnnotationMotivation=AnnotationMotivation}(Manifesto||(Manifesto={}));var Manifesto,__extends=this&&this.__extends||function(){var extendStatics=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(d,b){d.__proto__=b}||function(d,b){for(var p in b)b.hasOwnProperty(p)&&(d[p]=b[p])};return function(d,b){function __(){this.constructor=d}extendStatics(d,b),d.prototype=null===b?Object.create(b):(__.prototype=b.prototype,new __)}}();!function(Manifesto){var ElementType=function(_super){function ElementType(){return null!==_super&&_super.apply(this,arguments)||this}return __extends(ElementType,_super),ElementType.prototype.canvas=function(){return new ElementType(ElementType.CANVAS.toString())},ElementType.prototype.document=function(){return new ElementType(ElementType.DOCUMENT.toString())},ElementType.prototype.image=function(){return new ElementType(ElementType.IMAGE.toString())},ElementType.prototype.movingimage=function(){return new ElementType(ElementType.MOVINGIMAGE.toString())},ElementType.prototype.physicalobject=function(){return new ElementType(ElementType.PHYSICALOBJECT.toString())},ElementType.prototype.sound=function(){return new ElementType(ElementType.SOUND.toString())},ElementType}(Manifesto.StringValue);ElementType.CANVAS=new ElementType("sc:canvas"),ElementType.DOCUMENT=new ElementType("foaf:document"),ElementType.IMAGE=new ElementType("dcTypes:image"),ElementType.MOVINGIMAGE=new ElementType("dctypes:movingimage"),ElementType.PHYSICALOBJECT=new ElementType("dctypes:physicalobject"),ElementType.SOUND=new ElementType("dctypes:sound"),Manifesto.ElementType=ElementType}(Manifesto||(Manifesto={}));var Manifesto,__extends=this&&this.__extends||function(){var extendStatics=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(d,b){d.__proto__=b}||function(d,b){for(var p in b)b.hasOwnProperty(p)&&(d[p]=b[p])};return function(d,b){function __(){this.constructor=d}extendStatics(d,b),d.prototype=null===b?Object.create(b):(__.prototype=b.prototype,new __)}}();!function(Manifesto){var IIIFResourceType=function(_super){function IIIFResourceType(){return null!==_super&&_super.apply(this,arguments)||this}return __extends(IIIFResourceType,_super),IIIFResourceType.prototype.annotation=function(){return new IIIFResourceType(IIIFResourceType.ANNOTATION.toString())},IIIFResourceType.prototype.canvas=function(){return new IIIFResourceType(IIIFResourceType.CANVAS.toString())},IIIFResourceType.prototype.collection=function(){return new IIIFResourceType(IIIFResourceType.COLLECTION.toString())},IIIFResourceType.prototype.manifest=function(){return new IIIFResourceType(IIIFResourceType.MANIFEST.toString())},IIIFResourceType.prototype.range=function(){return new IIIFResourceType(IIIFResourceType.RANGE.toString())},IIIFResourceType.prototype.sequence=function(){return new IIIFResourceType(IIIFResourceType.SEQUENCE.toString())},IIIFResourceType}(Manifesto.StringValue);IIIFResourceType.ANNOTATION=new IIIFResourceType("oa:annotation"),IIIFResourceType.CANVAS=new IIIFResourceType("sc:canvas"),IIIFResourceType.COLLECTION=new IIIFResourceType("sc:collection"),IIIFResourceType.MANIFEST=new IIIFResourceType("sc:manifest"),IIIFResourceType.RANGE=new IIIFResourceType("sc:range"),IIIFResourceType.SEQUENCE=new IIIFResourceType("sc:sequence"),Manifesto.IIIFResourceType=IIIFResourceType}(Manifesto||(Manifesto={}));var Manifesto,__extends=this&&this.__extends||function(){var extendStatics=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(d,b){d.__proto__=b}||function(d,b){for(var p in b)b.hasOwnProperty(p)&&(d[p]=b[p])};return function(d,b){function __(){this.constructor=d}extendStatics(d,b),d.prototype=null===b?Object.create(b):(__.prototype=b.prototype,new __)}}();!function(Manifesto){var ManifestType=function(_super){function ManifestType(){return null!==_super&&_super.apply(this,arguments)||this}return __extends(ManifestType,_super),ManifestType.prototype.empty=function(){return new ManifestType(ManifestType.EMPTY.toString())},ManifestType.prototype.manuscript=function(){return new ManifestType(ManifestType.MANUSCRIPT.toString())},ManifestType.prototype.monograph=function(){return new ManifestType(ManifestType.MONOGRAPH.toString())},ManifestType}(Manifesto.StringValue);ManifestType.EMPTY=new ManifestType(""),ManifestType.MANUSCRIPT=new ManifestType("manuscript"),ManifestType.MONOGRAPH=new ManifestType("monograph"),Manifesto.ManifestType=ManifestType}(Manifesto||(Manifesto={}));var Manifesto,__extends=this&&this.__extends||function(){var extendStatics=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(d,b){d.__proto__=b}||function(d,b){for(var p in b)b.hasOwnProperty(p)&&(d[p]=b[p])};return function(d,b){function __(){this.constructor=d}extendStatics(d,b),d.prototype=null===b?Object.create(b):(__.prototype=b.prototype,new __)}}();!function(Manifesto){var RenderingFormat=function(_super){function RenderingFormat(){return null!==_super&&_super.apply(this,arguments)||this}return __extends(RenderingFormat,_super),RenderingFormat.prototype.pdf=function(){return new RenderingFormat(RenderingFormat.PDF.toString())},RenderingFormat.prototype.doc=function(){return new RenderingFormat(RenderingFormat.DOC.toString())},RenderingFormat.prototype.docx=function(){return new RenderingFormat(RenderingFormat.DOCX.toString())},RenderingFormat}(Manifesto.StringValue);RenderingFormat.PDF=new RenderingFormat("application/pdf"),RenderingFormat.DOC=new RenderingFormat("application/msword"),RenderingFormat.DOCX=new RenderingFormat("application/vnd.openxmlformats-officedocument.wordprocessingml.document"),Manifesto.RenderingFormat=RenderingFormat}(Manifesto||(Manifesto={}));var Manifesto,__extends=this&&this.__extends||function(){var extendStatics=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(d,b){d.__proto__=b}||function(d,b){for(var p in b)b.hasOwnProperty(p)&&(d[p]=b[p])};return function(d,b){function __(){this.constructor=d}extendStatics(d,b),d.prototype=null===b?Object.create(b):(__.prototype=b.prototype,new __)}}();!function(Manifesto){var ResourceFormat=function(_super){function ResourceFormat(){return null!==_super&&_super.apply(this,arguments)||this}return __extends(ResourceFormat,_super),ResourceFormat.prototype.jpgimage=function(){return new ResourceFormat(ResourceFormat.JPGIMAGE.toString())},ResourceFormat.prototype.pdf=function(){return new ResourceFormat(ResourceFormat.PDF.toString())},ResourceFormat}(Manifesto.StringValue);ResourceFormat.JPGIMAGE=new ResourceFormat("image/jpeg"),ResourceFormat.PDF=new ResourceFormat("application/pdf"),Manifesto.ResourceFormat=ResourceFormat}(Manifesto||(Manifesto={}));var Manifesto,__extends=this&&this.__extends||function(){var extendStatics=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(d,b){d.__proto__=b}||function(d,b){for(var p in b)b.hasOwnProperty(p)&&(d[p]=b[p])};return function(d,b){function __(){this.constructor=d}extendStatics(d,b),d.prototype=null===b?Object.create(b):(__.prototype=b.prototype,new __)}}();!function(Manifesto){var ResourceType=function(_super){function ResourceType(){return null!==_super&&_super.apply(this,arguments)||this}return __extends(ResourceType,_super),ResourceType.prototype.image=function(){return new ResourceType(ResourceType.IMAGE.toString())},ResourceType}(Manifesto.StringValue);ResourceType.IMAGE=new ResourceType("dctypes:image"),Manifesto.ResourceType=ResourceType}(Manifesto||(Manifesto={}));var Manifesto,__extends=this&&this.__extends||function(){var extendStatics=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(d,b){d.__proto__=b}||function(d,b){for(var p in b)b.hasOwnProperty(p)&&(d[p]=b[p])};return function(d,b){function __(){this.constructor=d}extendStatics(d,b),d.prototype=null===b?Object.create(b):(__.prototype=b.prototype,new __)}}();!function(Manifesto){var ServiceProfile=function(_super){function ServiceProfile(){return null!==_super&&_super.apply(this,arguments)||this}return __extends(ServiceProfile,_super),ServiceProfile.prototype.autoComplete=function(){return new ServiceProfile(ServiceProfile.AUTOCOMPLETE.toString())},ServiceProfile.prototype.iiif1ImageLevel1=function(){return new ServiceProfile(ServiceProfile.IIIF1IMAGELEVEL1.toString())},ServiceProfile.prototype.iiif1ImageLevel2=function(){return new ServiceProfile(ServiceProfile.IIIF1IMAGELEVEL2.toString())},ServiceProfile.prototype.iiif2ImageLevel1=function(){return new ServiceProfile(ServiceProfile.IIIF2IMAGELEVEL1.toString())},ServiceProfile.prototype.iiif2ImageLevel2=function(){return new ServiceProfile(ServiceProfile.IIIF2IMAGELEVEL2.toString())},ServiceProfile.prototype.ixif=function(){return new ServiceProfile(ServiceProfile.IXIF.toString())},ServiceProfile.prototype.login=function(){return new ServiceProfile(ServiceProfile.LOGIN.toString())},ServiceProfile.prototype.clickThrough=function(){return new ServiceProfile(ServiceProfile.CLICKTHROUGH.toString())},ServiceProfile.prototype.restricted=function(){return new ServiceProfile(ServiceProfile.RESTRICTED.toString())},ServiceProfile.prototype.logout=function(){return new ServiceProfile(ServiceProfile.LOGOUT.toString())},ServiceProfile.prototype.otherManifestations=function(){return new ServiceProfile(ServiceProfile.OTHERMANIFESTATIONS.toString())},ServiceProfile.prototype.searchWithin=function(){return new ServiceProfile(ServiceProfile.SEARCHWITHIN.toString())},ServiceProfile.prototype.stanfordIIIFImageCompliance1=function(){return new ServiceProfile(ServiceProfile.STANFORDIIIFIMAGECOMPLIANCE1.toString())},ServiceProfile.prototype.stanfordIIIFImageCompliance2=function(){return new ServiceProfile(ServiceProfile.STANFORDIIIFIMAGECOMPLIANCE2.toString())},ServiceProfile.prototype.stanfordIIIFImageConformance1=function(){return new ServiceProfile(ServiceProfile.STANFORDIIIFIMAGECONFORMANCE1.toString())},ServiceProfile.prototype.stanfordIIIFImageConformance2=function(){return new ServiceProfile(ServiceProfile.STANFORDIIIFIMAGECONFORMANCE2.toString())},ServiceProfile.prototype.stanfordIIIF1ImageCompliance1=function(){return new ServiceProfile(ServiceProfile.STANFORDIIIF1IMAGECOMPLIANCE1.toString())},ServiceProfile.prototype.stanfordIIIF1ImageCompliance2=function(){return new ServiceProfile(ServiceProfile.STANFORDIIIF1IMAGECOMPLIANCE2.toString())},ServiceProfile.prototype.stanfordIIIF1ImageConformance1=function(){return new ServiceProfile(ServiceProfile.STANFORDIIIF1IMAGECONFORMANCE1.toString())},ServiceProfile.prototype.stanfordIIIF1ImageConformance2=function(){return new ServiceProfile(ServiceProfile.STANFORDIIIF1IMAGECONFORMANCE2.toString())},ServiceProfile.prototype.token=function(){return new ServiceProfile(ServiceProfile.TOKEN.toString())},ServiceProfile.prototype.trackingExtensions=function(){return new ServiceProfile(ServiceProfile.TRACKINGEXTENSIONS.toString())},ServiceProfile.prototype.uiExtensions=function(){return new ServiceProfile(ServiceProfile.UIEXTENSIONS.toString())},ServiceProfile.prototype.printExtensions=function(){return new ServiceProfile(ServiceProfile.PRINTEXTENSIONS.toString())},ServiceProfile.prototype.shareExtensions=function(){return new ServiceProfile(ServiceProfile.SHAREEXTENSIONS.toString())},ServiceProfile}(Manifesto.StringValue);ServiceProfile.AUTOCOMPLETE=new ServiceProfile("http://iiif.io/api/search/0/autocomplete"),ServiceProfile.STANFORDIIIFIMAGECOMPLIANCE0=new ServiceProfile("http://library.stanford.edu/iiif/image-api/compliance.html#level0"),ServiceProfile.STANFORDIIIFIMAGECOMPLIANCE1=new ServiceProfile("http://library.stanford.edu/iiif/image-api/compliance.html#level1"),ServiceProfile.STANFORDIIIFIMAGECOMPLIANCE2=new ServiceProfile("http://library.stanford.edu/iiif/image-api/compliance.html#level2"),ServiceProfile.STANFORDIIIFIMAGECONFORMANCE0=new ServiceProfile("http://library.stanford.edu/iiif/image-api/conformance.html#level0"),ServiceProfile.STANFORDIIIFIMAGECONFORMANCE1=new ServiceProfile("http://library.stanford.edu/iiif/image-api/conformance.html#level1"),ServiceProfile.STANFORDIIIFIMAGECONFORMANCE2=new ServiceProfile("http://library.stanford.edu/iiif/image-api/conformance.html#level2"),ServiceProfile.STANFORDIIIF1IMAGECOMPLIANCE0=new ServiceProfile("http://library.stanford.edu/iiif/image-api/1.1/compliance.html#level0"),ServiceProfile.STANFORDIIIF1IMAGECOMPLIANCE1=new ServiceProfile("http://library.stanford.edu/iiif/image-api/1.1/compliance.html#level1"),ServiceProfile.STANFORDIIIF1IMAGECOMPLIANCE2=new ServiceProfile("http://library.stanford.edu/iiif/image-api/1.1/compliance.html#level2"),ServiceProfile.STANFORDIIIF1IMAGECONFORMANCE0=new ServiceProfile("http://library.stanford.edu/iiif/image-api/1.1/conformance.html#level0"),ServiceProfile.STANFORDIIIF1IMAGECONFORMANCE1=new ServiceProfile("http://library.stanford.edu/iiif/image-api/1.1/conformance.html#level1"),ServiceProfile.STANFORDIIIF1IMAGECONFORMANCE2=new ServiceProfile("http://library.stanford.edu/iiif/image-api/1.1/conformance.html#level2"),ServiceProfile.IIIF1IMAGELEVEL0=new ServiceProfile("http://iiif.io/api/image/1/level0.json"),ServiceProfile.IIIF1IMAGELEVEL0PROFILE=new ServiceProfile("http://iiif.io/api/image/1/profiles/level0.json"),ServiceProfile.IIIF1IMAGELEVEL1=new ServiceProfile("http://iiif.io/api/image/1/level1.json"),ServiceProfile.IIIF1IMAGELEVEL1PROFILE=new ServiceProfile("http://iiif.io/api/image/1/profiles/level1.json"),ServiceProfile.IIIF1IMAGELEVEL2=new ServiceProfile("http://iiif.io/api/image/1/level2.json"),ServiceProfile.IIIF1IMAGELEVEL2PROFILE=new ServiceProfile("http://iiif.io/api/image/1/profiles/level2.json"),ServiceProfile.IIIF2IMAGELEVEL0=new ServiceProfile("http://iiif.io/api/image/2/level0.json"),ServiceProfile.IIIF2IMAGELEVEL0PROFILE=new ServiceProfile("http://iiif.io/api/image/2/profiles/level0.json"),ServiceProfile.IIIF2IMAGELEVEL1=new ServiceProfile("http://iiif.io/api/image/2/level1.json"),ServiceProfile.IIIF2IMAGELEVEL1PROFILE=new ServiceProfile("http://iiif.io/api/image/2/profiles/level1.json"),ServiceProfile.IIIF2IMAGELEVEL2=new ServiceProfile("http://iiif.io/api/image/2/level2.json"),ServiceProfile.IIIF2IMAGELEVEL2PROFILE=new ServiceProfile("http://iiif.io/api/image/2/profiles/level2.json"),ServiceProfile.IXIF=new ServiceProfile("http://wellcomelibrary.org/ld/ixif/0/alpha.json"),ServiceProfile.LOGIN=new ServiceProfile("http://iiif.io/api/auth/0/login"),ServiceProfile.CLICKTHROUGH=new ServiceProfile("http://iiif.io/api/auth/0/login/clickthrough"),ServiceProfile.RESTRICTED=new ServiceProfile("http://iiif.io/api/auth/0/login/restricted"),ServiceProfile.LOGOUT=new ServiceProfile("http://iiif.io/api/auth/0/logout"),ServiceProfile.OTHERMANIFESTATIONS=new ServiceProfile("http://iiif.io/api/otherManifestations.json"),ServiceProfile.SEARCHWITHIN=new ServiceProfile("http://iiif.io/api/search/0/search"),ServiceProfile.TOKEN=new ServiceProfile("http://iiif.io/api/auth/0/token"),ServiceProfile.TRACKINGEXTENSIONS=new ServiceProfile("http://universalviewer.io/tracking-extensions-profile"),ServiceProfile.UIEXTENSIONS=new ServiceProfile("http://universalviewer.io/ui-extensions-profile"),ServiceProfile.PRINTEXTENSIONS=new ServiceProfile("http://universalviewer.io/print-extensions-profile"),ServiceProfile.SHAREEXTENSIONS=new ServiceProfile("http://universalviewer.io/share-extensions-profile"),Manifesto.ServiceProfile=ServiceProfile}(Manifesto||(Manifesto={}));var Manifesto,__extends=this&&this.__extends||function(){var extendStatics=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(d,b){d.__proto__=b}||function(d,b){for(var p in b)b.hasOwnProperty(p)&&(d[p]=b[p])};return function(d,b){function __(){this.constructor=d}extendStatics(d,b),d.prototype=null===b?Object.create(b):(__.prototype=b.prototype,new __)}}();!function(Manifesto){var ViewingDirection=function(_super){function ViewingDirection(){return null!==_super&&_super.apply(this,arguments)||this}return __extends(ViewingDirection,_super),ViewingDirection.prototype.leftToRight=function(){return new ViewingDirection(ViewingDirection.LEFTTORIGHT.toString())},ViewingDirection.prototype.rightToLeft=function(){return new ViewingDirection(ViewingDirection.RIGHTTOLEFT.toString())},ViewingDirection.prototype.topToBottom=function(){return new ViewingDirection(ViewingDirection.TOPTOBOTTOM.toString())},ViewingDirection.prototype.bottomToTop=function(){return new ViewingDirection(ViewingDirection.BOTTOMTOTOP.toString())},ViewingDirection}(Manifesto.StringValue);ViewingDirection.LEFTTORIGHT=new ViewingDirection("left-to-right"),ViewingDirection.RIGHTTOLEFT=new ViewingDirection("right-to-left"),ViewingDirection.TOPTOBOTTOM=new ViewingDirection("top-to-bottom"),ViewingDirection.BOTTOMTOTOP=new ViewingDirection("bottom-to-top"),Manifesto.ViewingDirection=ViewingDirection}(Manifesto||(Manifesto={}));var Manifesto,__extends=this&&this.__extends||function(){var extendStatics=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(d,b){d.__proto__=b}||function(d,b){for(var p in b)b.hasOwnProperty(p)&&(d[p]=b[p])};return function(d,b){function __(){this.constructor=d}extendStatics(d,b),d.prototype=null===b?Object.create(b):(__.prototype=b.prototype,new __)}}();!function(Manifesto){var ViewingHint=function(_super){function ViewingHint(){return null!==_super&&_super.apply(this,arguments)||this}return __extends(ViewingHint,_super),ViewingHint.prototype.continuous=function(){return new ViewingHint(ViewingHint.CONTINUOUS.toString())},ViewingHint.prototype.empty=function(){return new ViewingHint(ViewingHint.EMPTY.toString())},ViewingHint.prototype.individuals=function(){return new ViewingHint(ViewingHint.INDIVIDUALS.toString())},ViewingHint.prototype.nonPaged=function(){return new ViewingHint(ViewingHint.NONPAGED.toString())},ViewingHint.prototype.paged=function(){return new ViewingHint(ViewingHint.PAGED.toString())},ViewingHint.prototype.top=function(){return new ViewingHint(ViewingHint.TOP.toString())},ViewingHint}(Manifesto.StringValue);ViewingHint.CONTINUOUS=new ViewingHint("continuous"),ViewingHint.EMPTY=new ViewingHint(""),ViewingHint.INDIVIDUALS=new ViewingHint("individuals"),ViewingHint.NONPAGED=new ViewingHint("non-paged"),ViewingHint.PAGED=new ViewingHint("paged"),ViewingHint.TOP=new ViewingHint("top"),Manifesto.ViewingHint=ViewingHint}(Manifesto||(Manifesto={}));var Manifesto;!function(Manifesto){var JSONLDResource=function(){function JSONLDResource(jsonld){this.__jsonld=jsonld,this.context=this.getProperty("@context"),this.id=this.getProperty("@id")}return JSONLDResource.prototype.getProperty=function(name){return this.__jsonld?this.__jsonld[name]:null},JSONLDResource}();Manifesto.JSONLDResource=JSONLDResource}(Manifesto||(Manifesto={}));var Manifesto,__extends=this&&this.__extends||function(){var extendStatics=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(d,b){d.__proto__=b}||function(d,b){for(var p in b)b.hasOwnProperty(p)&&(d[p]=b[p])};return function(d,b){function __(){this.constructor=d}extendStatics(d,b),d.prototype=null===b?Object.create(b):(__.prototype=b.prototype,new __)}}();!function(Manifesto){var ManifestResource=function(_super){function ManifestResource(jsonld,options){var _this=_super.call(this,jsonld)||this;return _this.options=options,_this}return __extends(ManifestResource,_super),ManifestResource.prototype.getIIIFResourceType=function(){return new Manifesto.IIIFResourceType(this.getProperty("@type"))},ManifestResource.prototype.getLabel=function(){return Manifesto.TranslationCollection.parse(this.getProperty("label"),this.options.locale)},ManifestResource.prototype.getMetadata=function(){var _metadata=this.getProperty("metadata"),metadata=[];if(!_metadata)return metadata;for(var i=0;i<_metadata.length;i++){var item=_metadata[i],metadataItem=new Manifesto.MetadataItem(this.options.locale);metadataItem.parse(item),metadata.push(metadataItem)}return metadata},ManifestResource.prototype.getRendering=function(format){var renderings=this.getRenderings();"string"!=typeof format&&(format=format.toString());for(var i=0;i<renderings.length;i++){var rendering=renderings[i];if(rendering.getFormat().toString()===format)return rendering}return null},ManifestResource.prototype.getRenderings=function(){var rendering;rendering=this.__jsonld?this.__jsonld.rendering:this.rendering;var renderings=[];if(!rendering)return renderings;Array.isArray(rendering)||(rendering=[rendering]);for(var i=0;i<rendering.length;i++){var r=rendering[i];renderings.push(new Manifesto.Rendering(r,this.options))}return renderings},ManifestResource.prototype.getService=function(profile){return Manifesto.Utils.getService(this,profile)},ManifestResource.prototype.getServices=function(){return Manifesto.Utils.getServices(this)},ManifestResource.prototype.isAnnotation=function(){return this.getIIIFResourceType().toString()===Manifesto.IIIFResourceType.ANNOTATION.toString()},ManifestResource.prototype.isCanvas=function(){return this.getIIIFResourceType().toString()===Manifesto.IIIFResourceType.CANVAS.toString()},ManifestResource.prototype.isCollection=function(){return this.getIIIFResourceType().toString()===Manifesto.IIIFResourceType.COLLECTION.toString()},ManifestResource.prototype.isManifest=function(){return this.getIIIFResourceType().toString()===Manifesto.IIIFResourceType.MANIFEST.toString()},ManifestResource.prototype.isRange=function(){return this.getIIIFResourceType().toString()===Manifesto.IIIFResourceType.RANGE.toString()},ManifestResource.prototype.isSequence=function(){return this.getIIIFResourceType().toString()===Manifesto.IIIFResourceType.SEQUENCE.toString()},ManifestResource}(Manifesto.JSONLDResource);Manifesto.ManifestResource=ManifestResource}(Manifesto||(Manifesto={}));var Manifesto,__extends=this&&this.__extends||function(){var extendStatics=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(d,b){d.__proto__=b}||function(d,b){for(var p in b)b.hasOwnProperty(p)&&(d[p]=b[p])};return function(d,b){function __(){this.constructor=d}extendStatics(d,b),d.prototype=null===b?Object.create(b):(__.prototype=b.prototype,new __)}}();!function(Manifesto){var Element=function(_super){function Element(jsonld,options){return _super.call(this,jsonld,options)||this}return __extends(Element,_super),Element.prototype.getResources=function(){var resources=[];if(!this.__jsonld.resources)return resources;for(var i=0;i<this.__jsonld.resources.length;i++){var a=this.__jsonld.resources[i],annotation=new Manifesto.Annotation(a,this.options);resources.push(annotation)}return resources},Element.prototype.getType=function(){return new Manifesto.ElementType(this.getProperty("@type"))},Element}(Manifesto.ManifestResource);Manifesto.Element=Element}(Manifesto||(Manifesto={}));var Manifesto,__extends=this&&this.__extends||function(){var extendStatics=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(d,b){d.__proto__=b}||function(d,b){for(var p in b)b.hasOwnProperty(p)&&(d[p]=b[p])};return function(d,b){function __(){this.constructor=d}extendStatics(d,b),d.prototype=null===b?Object.create(b):(__.prototype=b.prototype,new __)}}();!function(Manifesto){var Canvas=function(_super){function Canvas(jsonld,options){return _super.call(this,jsonld,options)||this}return __extends(Canvas,_super),Canvas.prototype.getCanonicalImageUri=function(w){var size,id=null,region="full",rotation=0,quality="default",width=w;if(this.externalResource&&this.externalResource.data&&this.externalResource.data["@id"])id=this.externalResource.data["@id"],width||(width=this.externalResource.data.width),this.externalResource.data["@context"]&&(this.externalResource.data["@context"].indexOf("/1.0/context.json")>-1||this.externalResource.data["@context"].indexOf("/1.1/context.json")>-1||this.externalResource.data["@context"].indexOf("/1/context.json")>-1)&&(quality="native");else{var images=this.getImages();if(images&&images.length){var firstImage=images[0],resource=firstImage.getResource(),services=resource.getServices();if(width||(width=resource.getWidth()),services.length){var service=services[0];id=service.id,quality=Manifesto.Utils.getImageQuality(service.getProfile())}}if(!id)return"undefined"==typeof this.__jsonld.thumbnail?null:this.__jsonld.thumbnail}size=width+",";var uri=[id,region,size,rotation,quality+".jpg"].join("/");return uri},Canvas.prototype.getImages=function(){var images=[];if(!this.__jsonld.images)return images;for(var i=0;i<this.__jsonld.images.length;i++){var a=this.__jsonld.images[i],annotation=new Manifesto.Annotation(a,this.options);images.push(annotation)}return images},Canvas.prototype.getIndex=function(){return this.getProperty("index")},Canvas.prototype.getWidth=function(){return this.getProperty("width")},Canvas.prototype.getHeight=function(){return this.getProperty("height")},Canvas}(Manifesto.Element);Manifesto.Canvas=Canvas}(Manifesto||(Manifesto={}));var Manifesto,__extends=this&&this.__extends||function(){var extendStatics=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(d,b){d.__proto__=b}||function(d,b){for(var p in b)b.hasOwnProperty(p)&&(d[p]=b[p])};return function(d,b){function __(){this.constructor=d}extendStatics(d,b),d.prototype=null===b?Object.create(b):(__.prototype=b.prototype,new __)}}();!function(Manifesto){var IIIFResource=function(_super){function IIIFResource(jsonld,options){var _this=_super.call(this,jsonld,options)||this;_this.index=-1,_this.isLoaded=!1;var defaultOptions={defaultLabel:"-",locale:"en-GB",resource:_this,pessimisticAccessControl:!1};return _this.options=Object.assign(defaultOptions,options),_this}return __extends(IIIFResource,_super),IIIFResource.prototype.getAttribution=function(){var attribution=this.getProperty("attribution");return attribution?Manifesto.TranslationCollection.parse(attribution,this.options.locale):[]},IIIFResource.prototype.getDescription=function(){var description=this.getProperty("description");return description?Manifesto.TranslationCollection.parse(description,this.options.locale):[]},IIIFResource.prototype.getIIIFResourceType=function(){return new Manifesto.IIIFResourceType(this.getProperty("@type"))},IIIFResource.prototype.getLogo=function(){var logo=this.getProperty("logo");return logo?"string"==typeof logo?logo:logo["@id"]:null},IIIFResource.prototype.getLicense=function(){return Manifesto.Utils.getLocalisedValue(this.getProperty("license"),this.options.locale)},IIIFResource.prototype.getNavDate=function(){return new Date(this.getProperty("navDate"))},IIIFResource.prototype.getRelated=function(){return this.getProperty("related")},IIIFResource.prototype.getSeeAlso=function(){return this.getProperty("seeAlso")},IIIFResource.prototype.getLabel=function(){var label=this.getProperty("label");return label?Manifesto.TranslationCollection.parse(label,this.options.locale):[]},IIIFResource.prototype.getDefaultTree=function(){return this.defaultTree=new Manifesto.TreeNode("root"),this.defaultTree.data=this,this.defaultTree},IIIFResource.prototype.isCollection=function(){return this.getIIIFResourceType().toString()===Manifesto.IIIFResourceType.COLLECTION.toString()},IIIFResource.prototype.isManifest=function(){return this.getIIIFResourceType().toString()===Manifesto.IIIFResourceType.MANIFEST.toString()},IIIFResource.prototype.load=function(){var that=this;return new Promise(function(resolve,reject){if(that.isLoaded)resolve(that);else{var options=that.options;options.navDate=that.getNavDate(),Manifesto.Utils.loadResource(that.__jsonld["@id"]).then(function(data){that.parentLabel=Manifesto.TranslationCollection.getValue(that.getLabel(),options.locale);
var parsed=Manifesto.Deserialiser.parse(data,options);that=Object.assign(that,parsed),that.index=options.index,resolve(that)})}})},IIIFResource}(Manifesto.ManifestResource);Manifesto.IIIFResource=IIIFResource}(Manifesto||(Manifesto={}));var Manifesto,__extends=this&&this.__extends||function(){var extendStatics=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(d,b){d.__proto__=b}||function(d,b){for(var p in b)b.hasOwnProperty(p)&&(d[p]=b[p])};return function(d,b){function __(){this.constructor=d}extendStatics(d,b),d.prototype=null===b?Object.create(b):(__.prototype=b.prototype,new __)}}();!function(Manifesto){var Manifest=function(_super){function Manifest(jsonld,options){var _this=_super.call(this,jsonld,options)||this;if(_this.index=0,_this._allRanges=null,_this._sequences=null,_this._topRanges=[],_this.__jsonld.structures&&_this.__jsonld.structures.length)for(var topRanges=_this._getTopRanges(),i=0;i<topRanges.length;i++){var range=topRanges[i];_this._parseRanges(range,String(i))}return _this}return __extends(Manifest,_super),Manifest.prototype.getDefaultTree=function(){if(_super.prototype.getDefaultTree.call(this),this.defaultTree.data.type=Manifesto.TreeNodeType.MANIFEST.toString(),!this.isLoaded)return this.defaultTree;var topRanges=this.getTopRanges();return topRanges.length&&topRanges[0].getTree(this.defaultTree),Manifesto.Utils.generateTreeNodeIds(this.defaultTree),this.defaultTree},Manifest.prototype._getTopRanges=function(){var topRanges=[];if(this.__jsonld.structures&&this.__jsonld.structures.length){for(var i=0;i<this.__jsonld.structures.length;i++){var json=this.__jsonld.structures[i];json.viewingHint===Manifesto.ViewingHint.TOP.toString()&&topRanges.push(json)}if(!topRanges.length){var range={};range.ranges=this.__jsonld.structures,topRanges.push(range)}}return topRanges},Manifest.prototype.getTopRanges=function(){return this._topRanges},Manifest.prototype._getRangeById=function(id){if(this.__jsonld.structures&&this.__jsonld.structures.length)for(var i=0;i<this.__jsonld.structures.length;i++){var r=this.__jsonld.structures[i];if(r["@id"]===id)return r}return null},Manifest.prototype._parseRanges=function(r,path,parentRange){var range,id=null;if("string"==typeof r&&(id=r,r=this._getRangeById(id)),!r)return void console.warn("Range:",id,"does not exist");if(range=new Manifesto.Range(r,this.options),range.parentRange=parentRange,range.path=path,parentRange?parentRange.members.push(range):this._topRanges.push(range),r.ranges)for(var i=0;i<r.ranges.length;i++)this._parseRanges(r.ranges[i],path+"/"+i,range);if(r.members)for(var _loop_1=function(i){var child=r.members[i];return r.members.en().where(function(m){return m.id===child.id}).first()?"continue":void("sc:range"===child["@type"].toLowerCase()&&this_1._parseRanges(child,path+"/"+i,range))},this_1=this,i=0;i<r.members.length;i++)_loop_1(i)},Manifest.prototype.getAllRanges=function(){if(null!=this._allRanges)return this._allRanges;this._allRanges=[];for(var topRanges=this.getTopRanges(),i=0;i<topRanges.length;i++){var topRange=topRanges[i];topRange.id&&this._allRanges.push(topRange);var subRanges=topRange.getRanges();this._allRanges=this._allRanges.concat(subRanges.en().traverseUnique(function(range){return range.getRanges()}).toArray())}return this._allRanges},Manifest.prototype.getRangeById=function(id){for(var ranges=this.getAllRanges(),i=0;i<ranges.length;i++){var range=ranges[i];if(range.id===id)return range}return null},Manifest.prototype.getRangeByPath=function(path){for(var ranges=this.getAllRanges(),i=0;i<ranges.length;i++){var range=ranges[i];if(range.path===path)return range}return null},Manifest.prototype.getSequences=function(){if(null!==this._sequences)return this._sequences;this._sequences=[];var children=this.__jsonld.mediaSequences||this.__jsonld.sequences;if(children)for(var i=0;i<children.length;i++){var s=children[i],sequence=new Manifesto.Sequence(s,this.options);this._sequences.push(sequence)}return this._sequences},Manifest.prototype.getSequenceByIndex=function(sequenceIndex){return this.getSequences()[sequenceIndex]},Manifest.prototype.getTotalSequences=function(){return this.getSequences().length},Manifest.prototype.getManifestType=function(){var service=this.getService(Manifesto.ServiceProfile.UIEXTENSIONS);return service?new Manifesto.ManifestType(service.getProperty("manifestType")):new Manifesto.ManifestType("")},Manifest.prototype.getTrackingLabel=function(){var service=this.getService(Manifesto.ServiceProfile.TRACKINGEXTENSIONS);return service?service.getProperty("trackingLabel"):""},Manifest.prototype.isMultiSequence=function(){return this.getTotalSequences()>1},Manifest.prototype.isPagingEnabled=function(){return this.getViewingHint().toString()===Manifesto.ViewingHint.PAGED.toString()},Manifest.prototype.getViewingDirection=function(){return this.getProperty("viewingDirection")?new Manifesto.ViewingDirection(this.getProperty("viewingDirection")):Manifesto.ViewingDirection.LEFTTORIGHT},Manifest.prototype.getViewingHint=function(){return this.getProperty("viewingHint")?new Manifesto.ViewingHint(this.getProperty("viewingHint")):Manifesto.ViewingHint.EMPTY},Manifest}(Manifesto.IIIFResource);Manifesto.Manifest=Manifest}(Manifesto||(Manifesto={}));var Manifesto,__extends=this&&this.__extends||function(){var extendStatics=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(d,b){d.__proto__=b}||function(d,b){for(var p in b)b.hasOwnProperty(p)&&(d[p]=b[p])};return function(d,b){function __(){this.constructor=d}extendStatics(d,b),d.prototype=null===b?Object.create(b):(__.prototype=b.prototype,new __)}}();!function(Manifesto){var Collection=function(_super){function Collection(jsonld,options){var _this=_super.call(this,jsonld,options)||this;return _this.members=[],_this._collections=null,_this._manifests=null,jsonld.__collection=_this,_this}return __extends(Collection,_super),Collection.prototype.getCollections=function(){return this._collections?this._collections:this._collections=this.members.en().where(function(m){return m.isCollection()}).toArray()},Collection.prototype.getManifests=function(){return this._manifests?this._manifests:this._manifests=this.members.en().where(function(m){return m.isManifest()}).toArray()},Collection.prototype.getCollectionByIndex=function(collectionIndex){var collection=this.getCollections()[collectionIndex];return collection.options.index=collectionIndex,collection.load()},Collection.prototype.getManifestByIndex=function(manifestIndex){var manifest=this.getManifests()[manifestIndex];return manifest.options.index=manifestIndex,manifest.load()},Collection.prototype.getTotalCollections=function(){return this.getCollections().length},Collection.prototype.getTotalManifests=function(){return this.getManifests().length},Collection.prototype.getTotalMembers=function(){return this.members.length},Collection.prototype.getDefaultTree=function(){return _super.prototype.getDefaultTree.call(this),this.defaultTree.data.type=Manifesto.TreeNodeType.COLLECTION.toString(),this._parseManifests(this),this._parseCollections(this),Manifesto.Utils.generateTreeNodeIds(this.defaultTree),this.defaultTree},Collection.prototype._parseManifests=function(parentCollection){if(parentCollection.getManifests()&&parentCollection.getManifests().length)for(var i=0;i<parentCollection.getManifests().length;i++){var manifest=parentCollection.getManifests()[i],tree=manifest.getDefaultTree();tree.label=manifest.parentLabel||Manifesto.TranslationCollection.getValue(manifest.getLabel(),this.options.locale)||"manifest "+(i+1),tree.navDate=manifest.getNavDate(),tree.data.id=manifest.id,tree.data.type=Manifesto.TreeNodeType.MANIFEST.toString(),parentCollection.defaultTree.addNode(tree)}},Collection.prototype._parseCollections=function(parentCollection){if(parentCollection.getCollections()&&parentCollection.getCollections().length)for(var i=0;i<parentCollection.getCollections().length;i++){var collection=parentCollection.getCollections()[i],tree=collection.getDefaultTree();tree.label=collection.parentLabel||Manifesto.TranslationCollection.getValue(collection.getLabel(),this.options.locale)||"collection "+(i+1),tree.navDate=collection.getNavDate(),tree.data.id=collection.id,tree.data.type=Manifesto.TreeNodeType.COLLECTION.toString(),parentCollection.defaultTree.addNode(tree),this._parseCollections(collection)}},Collection}(Manifesto.IIIFResource);Manifesto.Collection=Collection}(Manifesto||(Manifesto={}));var Manifesto,__extends=this&&this.__extends||function(){var extendStatics=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(d,b){d.__proto__=b}||function(d,b){for(var p in b)b.hasOwnProperty(p)&&(d[p]=b[p])};return function(d,b){function __(){this.constructor=d}extendStatics(d,b),d.prototype=null===b?Object.create(b):(__.prototype=b.prototype,new __)}}();!function(Manifesto){var Range=function(_super){function Range(jsonld,options){var _this=_super.call(this,jsonld,options)||this;return _this._canvases=null,_this._ranges=null,_this.members=[],_this}return __extends(Range,_super),Range.prototype.getCanvasIds=function(){return this.__jsonld.canvases?this.__jsonld.canvases:[]},Range.prototype.getCanvases=function(){return this._canvases?this._canvases:this._canvases=this.members.en().where(function(m){return m.isCanvas()}).toArray()},Range.prototype.getRanges=function(){return this._ranges?this._ranges:this._ranges=this.members.en().where(function(m){return m.isRange()}).toArray()},Range.prototype.getViewingDirection=function(){return this.getProperty("viewingDirection")?new Manifesto.ViewingDirection(this.getProperty("viewingDirection")):null},Range.prototype.getViewingHint=function(){return this.getProperty("viewingHint")?new Manifesto.ViewingHint(this.getProperty("viewingHint")):null},Range.prototype.getTree=function(treeRoot){treeRoot.data=this,this.treeNode=treeRoot;var ranges=this.getRanges();if(ranges&&ranges.length)for(var i=0;i<ranges.length;i++){var range=ranges[i],node=new Manifesto.TreeNode;treeRoot.addNode(node),this._parseTreeNode(node,range)}return Manifesto.Utils.generateTreeNodeIds(treeRoot),treeRoot},Range.prototype._parseTreeNode=function(node,range){node.label=Manifesto.TranslationCollection.getValue(range.getLabel(),this.options.locale),node.data=range,node.data.type=Manifesto.TreeNodeType.RANGE.toString(),range.treeNode=node;var ranges=range.getRanges();if(ranges&&ranges.length)for(var i=0;i<ranges.length;i++){var childRange=ranges[i],childNode=new Manifesto.TreeNode;node.addNode(childNode),this._parseTreeNode(childNode,childRange)}},Range}(Manifesto.ManifestResource);Manifesto.Range=Range}(Manifesto||(Manifesto={}));var Manifesto,__extends=this&&this.__extends||function(){var extendStatics=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(d,b){d.__proto__=b}||function(d,b){for(var p in b)b.hasOwnProperty(p)&&(d[p]=b[p])};return function(d,b){function __(){this.constructor=d}extendStatics(d,b),d.prototype=null===b?Object.create(b):(__.prototype=b.prototype,new __)}}();!function(Manifesto){var Rendering=function(_super){function Rendering(jsonld,options){return _super.call(this,jsonld,options)||this}return __extends(Rendering,_super),Rendering.prototype.getFormat=function(){return new Manifesto.RenderingFormat(this.getProperty("format"))},Rendering}(Manifesto.ManifestResource);Manifesto.Rendering=Rendering}(Manifesto||(Manifesto={}));var Manifesto,__extends=this&&this.__extends||function(){var extendStatics=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(d,b){d.__proto__=b}||function(d,b){for(var p in b)b.hasOwnProperty(p)&&(d[p]=b[p])};return function(d,b){function __(){this.constructor=d}extendStatics(d,b),d.prototype=null===b?Object.create(b):(__.prototype=b.prototype,new __)}}();!function(Manifesto){var Sequence=function(_super){function Sequence(jsonld,options){var _this=_super.call(this,jsonld,options)||this;return _this.canvases=null,_this}return __extends(Sequence,_super),Sequence.prototype.getCanvases=function(){if(null!=this.canvases)return this.canvases;this.canvases=[];var children=this.__jsonld.elements||this.__jsonld.canvases;if(children)for(var i=0;i<children.length;i++){var c=children[i],canvas=new Manifesto.Canvas(c,this.options);canvas.index=i,this.canvases.push(canvas)}return this.canvases},Sequence.prototype.getCanvasById=function(id){for(var i=0;i<this.getTotalCanvases();i++){var canvas=this.getCanvasByIndex(i);if(canvas.id===id)return canvas}return null},Sequence.prototype.getCanvasByIndex=function(canvasIndex){return this.getCanvases()[canvasIndex]},Sequence.prototype.getCanvasIndexById=function(id){for(var i=0;i<this.getTotalCanvases();i++){var canvas=this.getCanvasByIndex(i);if(canvas.id===id)return i}return null},Sequence.prototype.getCanvasIndexByLabel=function(label,foliated){label=label.trim(),isNaN(label)||(label=parseInt(label,10).toString(),foliated&&(label+="r"));for(var match,regExp,regStr,labelPart1,labelPart2,doublePageRegExp=/(\d*)\D+(\d*)/,i=0;i<this.getTotalCanvases();i++){var canvas=this.getCanvasByIndex(i);if(Manifesto.TranslationCollection.getValue(canvas.getLabel(),this.options.locale)===label)return i;if(match=doublePageRegExp.exec(label),match&&(labelPart1=match[1],labelPart2=match[2],labelPart2&&(regStr="^"+labelPart1+"\\D+"+labelPart2+"$",regExp=new RegExp(regStr),regExp.test(canvas.getLabel().toString()))))return i}return-1},Sequence.prototype.getLastCanvasLabel=function(alphanumeric){for(var i=this.getTotalCanvases()-1;i>=0;i--){var canvas=this.getCanvasByIndex(i),label=Manifesto.TranslationCollection.getValue(canvas.getLabel(),this.options.locale);if(alphanumeric){var regExp=/^[a-zA-Z0-9]*$/;if(regExp.test(label))return label}else if(label)return label}return this.options.defaultLabel},Sequence.prototype.getLastPageIndex=function(){return this.getTotalCanvases()-1},Sequence.prototype.getNextPageIndex=function(canvasIndex,pagingEnabled){var index;if(pagingEnabled){var indices=this.getPagedIndices(canvasIndex);index=this.getViewingDirection().toString()===Manifesto.ViewingDirection.RIGHTTOLEFT.toString()?indices[0]+1:indices[indices.length-1]+1}else index=canvasIndex+1;return index>this.getLastPageIndex()?-1:index},Sequence.prototype.getPagedIndices=function(canvasIndex,pagingEnabled){var indices=[];return pagingEnabled?(indices=this.isFirstCanvas(canvasIndex)||this.isLastCanvas(canvasIndex)?[canvasIndex]:canvasIndex%2?[canvasIndex,canvasIndex+1]:[canvasIndex-1,canvasIndex],this.getViewingDirection().toString()===Manifesto.ViewingDirection.RIGHTTOLEFT.toString()&&(indices=indices.reverse())):indices.push(canvasIndex),indices},Sequence.prototype.getPrevPageIndex=function(canvasIndex,pagingEnabled){var index;if(pagingEnabled){var indices=this.getPagedIndices(canvasIndex);index=this.getViewingDirection().toString()===Manifesto.ViewingDirection.RIGHTTOLEFT.toString()?indices[indices.length-1]-1:indices[0]-1}else index=canvasIndex-1;return index},Sequence.prototype.getStartCanvasIndex=function(){var startCanvas=this.getStartCanvas();if(startCanvas)for(var i=0;i<this.getTotalCanvases();i++){var canvas=this.getCanvasByIndex(i);if(canvas.id===startCanvas)return i}return 0},Sequence.prototype.getThumbs=function(width,height){for(var thumbs=[],totalCanvases=this.getTotalCanvases(),i=0;i<totalCanvases;i++){var canvas=this.getCanvasByIndex(i);thumbs.push(new Manifesto.Thumb(width,canvas))}return thumbs},Sequence.prototype.getStartCanvas=function(){return this.getProperty("startCanvas")},Sequence.prototype.getTotalCanvases=function(){return this.getCanvases().length},Sequence.prototype.getViewingDirection=function(){return this.getProperty("viewingDirection")?new Manifesto.ViewingDirection(this.getProperty("viewingDirection")):this.options.resource.getViewingDirection?this.options.resource.getViewingDirection():Manifesto.ViewingDirection.LEFTTORIGHT},Sequence.prototype.getViewingHint=function(){return this.getProperty("viewingHint")?new Manifesto.ViewingHint(this.getProperty("viewingHint")):Manifesto.ViewingHint.EMPTY},Sequence.prototype.isCanvasIndexOutOfRange=function(canvasIndex){return canvasIndex>this.getTotalCanvases()-1},Sequence.prototype.isFirstCanvas=function(canvasIndex){return 0===canvasIndex},Sequence.prototype.isLastCanvas=function(canvasIndex){return canvasIndex===this.getTotalCanvases()-1},Sequence.prototype.isMultiCanvas=function(){return this.getTotalCanvases()>1},Sequence.prototype.isPagingEnabled=function(){return this.getViewingHint().toString()===Manifesto.ViewingHint.PAGED.toString()},Sequence.prototype.isTotalCanvasesEven=function(){return this.getTotalCanvases()%2===0},Sequence}(Manifesto.ManifestResource);Manifesto.Sequence=Sequence}(Manifesto||(Manifesto={}));var Manifesto;!function(Manifesto){var Deserialiser=function(){function Deserialiser(){}return Deserialiser.parse=function(manifest,options){return this.parseJson(JSON.parse(manifest),options)},Deserialiser.parseJson=function(json,options){var resource;switch(options&&options.navDate&&!isNaN(options.navDate.getTime())&&(json.navDate=options.navDate.toString()),json["@type"]){case"sc:Collection":resource=this.parseCollection(json,options);break;case"sc:Manifest":resource=this.parseManifest(json,options);break;default:return null}return resource.isLoaded=!0,resource},Deserialiser.parseCollection=function(json,options){var collection=new Manifesto.Collection(json,options);return options?collection.index=options.index||0:collection.index=0,this.parseCollections(collection,options),this.parseManifests(collection,options),this.parseMembers(collection,options),collection},Deserialiser.parseCollections=function(collection,options){var children=collection.__jsonld.collections;if(children)for(var i=0;i<children.length;i++){options&&(options.index=i);var child=this.parseCollection(children[i],options);child.index=i,child.parentCollection=collection,collection.members.push(child)}},Deserialiser.parseManifest=function(json,options){var manifest=new Manifesto.Manifest(json,options);return manifest},Deserialiser.parseManifests=function(collection,options){var children=collection.__jsonld.manifests;if(children)for(var i=0;i<children.length;i++){var child=this.parseManifest(children[i],options);child.index=i,child.parentCollection=collection,collection.members.push(child)}},Deserialiser.parseMember=function(json,options){return"sc:manifest"===json["@type"].toLowerCase()?this.parseManifest(json,options):"sc:collection"===json["@type"].toLowerCase()?this.parseCollection(json,options):null},Deserialiser.parseMembers=function(collection,options){var children=collection.__jsonld.members;if(children)for(var i=0;i<children.length;i++){options&&(options.index=i);var child=this.parseMember(children[i],options);if(!child)return;collection.members.en().where(function(m){return m.id===child.id}).first()||(child.index=i,child.parentCollection=collection,collection.members.push(child))}},Deserialiser}();Manifesto.Deserialiser=Deserialiser;var Serialiser=function(){function Serialiser(){}return Serialiser.serialise=function(manifest){return""},Serialiser}();Manifesto.Serialiser=Serialiser}(Manifesto||(Manifesto={}));var Manifesto,__extends=this&&this.__extends||function(){var extendStatics=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(d,b){d.__proto__=b}||function(d,b){for(var p in b)b.hasOwnProperty(p)&&(d[p]=b[p])};return function(d,b){function __(){this.constructor=d}extendStatics(d,b),d.prototype=null===b?Object.create(b):(__.prototype=b.prototype,new __)}}();!function(Manifesto){var Service=function(_super){function Service(jsonld,options){return _super.call(this,jsonld,options)||this}return __extends(Service,_super),Service.prototype.getProfile=function(){var profile=this.getProperty("profile");return profile||(profile=this.getProperty("dcterms:conformsTo")),Array.isArray(profile)?new Manifesto.ServiceProfile(profile[0]):new Manifesto.ServiceProfile(profile)},Service.prototype.getDescription=function(){return Manifesto.Utils.getLocalisedValue(this.getProperty("description"),this.options.locale)},Service.prototype.getInfoUri=function(){var infoUri=this.id;return infoUri.endsWith("/")||(infoUri+="/"),infoUri+="info.json"},Service}(Manifesto.ManifestResource);Manifesto.Service=Service}(Manifesto||(Manifesto={}));var Manifesto;!function(Manifesto){var Thumb=function(){function Thumb(width,canvas){this.data=canvas,this.index=canvas.index,this.width=width;var heightRatio=canvas.getHeight()/canvas.getWidth();heightRatio?this.height=Math.floor(this.width*heightRatio):this.height=width,this.uri=canvas.getCanonicalImageUri(width),this.label=Manifesto.TranslationCollection.getValue(canvas.getLabel())}return Thumb}();Manifesto.Thumb=Thumb}(Manifesto||(Manifesto={}));var Manifesto;!function(Manifesto){var TreeNode=function(){function TreeNode(label,data){this.label=label,this.data=data||{},this.nodes=[]}return TreeNode.prototype.addNode=function(node){this.nodes.push(node),node.parentNode=this},TreeNode.prototype.isCollection=function(){return this.data.type===Manifesto.TreeNodeType.COLLECTION.toString()},TreeNode.prototype.isManifest=function(){return this.data.type===Manifesto.TreeNodeType.MANIFEST.toString()},TreeNode.prototype.isRange=function(){return this.data.type===Manifesto.TreeNodeType.RANGE.toString()},TreeNode}();Manifesto.TreeNode=TreeNode}(Manifesto||(Manifesto={}));var Manifesto,__extends=this&&this.__extends||function(){var extendStatics=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(d,b){d.__proto__=b}||function(d,b){for(var p in b)b.hasOwnProperty(p)&&(d[p]=b[p])};return function(d,b){function __(){this.constructor=d}extendStatics(d,b),d.prototype=null===b?Object.create(b):(__.prototype=b.prototype,new __)}}();!function(Manifesto){var TreeNodeType=function(_super){function TreeNodeType(){return null!==_super&&_super.apply(this,arguments)||this}return __extends(TreeNodeType,_super),TreeNodeType.prototype.collection=function(){return new TreeNodeType(TreeNodeType.COLLECTION.toString())},TreeNodeType.prototype.manifest=function(){return new TreeNodeType(TreeNodeType.MANIFEST.toString())},TreeNodeType.prototype.range=function(){return new TreeNodeType(TreeNodeType.RANGE.toString())},TreeNodeType}(Manifesto.StringValue);TreeNodeType.COLLECTION=new TreeNodeType("sc:collection"),TreeNodeType.MANIFEST=new TreeNodeType("sc:manifest"),TreeNodeType.RANGE=new TreeNodeType("sc:range"),Manifesto.TreeNodeType=TreeNodeType}(Manifesto||(Manifesto={}));var Manifesto,http=require("http"),https=require("https"),url=require("url");!function(Manifesto){var Utils=function(){function Utils(){}return Utils.getImageQuality=function(profile){var p=profile.toString();return p===Manifesto.ServiceProfile.STANFORDIIIFIMAGECOMPLIANCE1.toString()||p===Manifesto.ServiceProfile.STANFORDIIIFIMAGECOMPLIANCE2.toString()||p===Manifesto.ServiceProfile.STANFORDIIIF1IMAGECOMPLIANCE1.toString()||p===Manifesto.ServiceProfile.STANFORDIIIF1IMAGECOMPLIANCE2.toString()||p===Manifesto.ServiceProfile.STANFORDIIIFIMAGECONFORMANCE1.toString()||p===Manifesto.ServiceProfile.STANFORDIIIFIMAGECONFORMANCE2.toString()||p===Manifesto.ServiceProfile.STANFORDIIIF1IMAGECONFORMANCE1.toString()||p===Manifesto.ServiceProfile.STANFORDIIIF1IMAGECONFORMANCE2.toString()||p===Manifesto.ServiceProfile.IIIF1IMAGELEVEL1.toString()||p===Manifesto.ServiceProfile.IIIF1IMAGELEVEL1PROFILE.toString()||p===Manifesto.ServiceProfile.IIIF1IMAGELEVEL2.toString()||p===Manifesto.ServiceProfile.IIIF1IMAGELEVEL2PROFILE.toString()?"native":"default"},Utils.getInexactLocale=function(locale){return locale.indexOf("-")!==-1?locale.substr(0,locale.indexOf("-")):locale},Utils.getLocalisedValue=function(resource,locale){if(!Array.isArray(resource))return resource;for(var i=0;i<resource.length;i++){var value_1=resource[i],language_1=value_1["@language"];if(locale===language_1)return value_1["@value"]}for(var match=locale.substr(0,locale.indexOf("-")),i=0;i<resource.length;i++){var value=resource[i],language=value["@language"];if(language===match)return value["@value"]}return null},Utils.generateTreeNodeIds=function(treeNode,index){void 0===index&&(index=0);var id;id=treeNode.parentNode?treeNode.parentNode.id+"-"+index:"0",treeNode.id=id;for(var i=0;i<treeNode.nodes.length;i++){var n=treeNode.nodes[i];Utils.generateTreeNodeIds(n,i)}},Utils.isImageProfile=function(profile){return profile.toString()===Manifesto.ServiceProfile.STANFORDIIIFIMAGECOMPLIANCE0.toString()||profile.toString()===Manifesto.ServiceProfile.STANFORDIIIFIMAGECOMPLIANCE1.toString()||profile.toString()===Manifesto.ServiceProfile.STANFORDIIIFIMAGECOMPLIANCE2.toString()||profile.toString()===Manifesto.ServiceProfile.STANFORDIIIF1IMAGECOMPLIANCE0.toString()||profile.toString()===Manifesto.ServiceProfile.STANFORDIIIF1IMAGECOMPLIANCE1.toString()||profile.toString()===Manifesto.ServiceProfile.STANFORDIIIF1IMAGECOMPLIANCE2.toString()||profile.toString()===Manifesto.ServiceProfile.STANFORDIIIFIMAGECONFORMANCE0.toString()||profile.toString()===Manifesto.ServiceProfile.STANFORDIIIFIMAGECONFORMANCE1.toString()||profile.toString()===Manifesto.ServiceProfile.STANFORDIIIFIMAGECONFORMANCE2.toString()||profile.toString()===Manifesto.ServiceProfile.STANFORDIIIF1IMAGECONFORMANCE0.toString()||profile.toString()===Manifesto.ServiceProfile.STANFORDIIIF1IMAGECONFORMANCE1.toString()||profile.toString()===Manifesto.ServiceProfile.STANFORDIIIF1IMAGECONFORMANCE2.toString()||profile.toString()===Manifesto.ServiceProfile.IIIF1IMAGELEVEL0.toString()||profile.toString()===Manifesto.ServiceProfile.IIIF1IMAGELEVEL0PROFILE.toString()||profile.toString()===Manifesto.ServiceProfile.IIIF1IMAGELEVEL1.toString()||profile.toString()===Manifesto.ServiceProfile.IIIF1IMAGELEVEL1PROFILE.toString()||profile.toString()===Manifesto.ServiceProfile.IIIF1IMAGELEVEL2.toString()||profile.toString()===Manifesto.ServiceProfile.IIIF1IMAGELEVEL2PROFILE.toString()||profile.toString()===Manifesto.ServiceProfile.IIIF2IMAGELEVEL0.toString()||profile.toString()===Manifesto.ServiceProfile.IIIF2IMAGELEVEL0PROFILE.toString()||profile.toString()===Manifesto.ServiceProfile.IIIF2IMAGELEVEL1.toString()||profile.toString()===Manifesto.ServiceProfile.IIIF2IMAGELEVEL1PROFILE.toString()||profile.toString()===Manifesto.ServiceProfile.IIIF2IMAGELEVEL2.toString()||profile.toString()===Manifesto.ServiceProfile.IIIF2IMAGELEVEL2PROFILE.toString()},Utils.isLevel0ImageProfile=function(profile){return profile.toString()===Manifesto.ServiceProfile.STANFORDIIIFIMAGECOMPLIANCE0.toString()||profile.toString()===Manifesto.ServiceProfile.STANFORDIIIF1IMAGECOMPLIANCE0.toString()||profile.toString()===Manifesto.ServiceProfile.STANFORDIIIFIMAGECONFORMANCE0.toString()||profile.toString()===Manifesto.ServiceProfile.STANFORDIIIF1IMAGECONFORMANCE0.toString()||profile.toString()===Manifesto.ServiceProfile.IIIF1IMAGELEVEL0.toString()||profile.toString()===Manifesto.ServiceProfile.IIIF1IMAGELEVEL0PROFILE.toString()||profile.toString()===Manifesto.ServiceProfile.IIIF2IMAGELEVEL0.toString()||profile.toString()===Manifesto.ServiceProfile.IIIF2IMAGELEVEL0PROFILE.toString()},Utils.isLevel1ImageProfile=function(profile){return profile.toString()===Manifesto.ServiceProfile.STANFORDIIIFIMAGECOMPLIANCE1.toString()||profile.toString()===Manifesto.ServiceProfile.STANFORDIIIF1IMAGECOMPLIANCE1.toString()||profile.toString()===Manifesto.ServiceProfile.STANFORDIIIFIMAGECONFORMANCE1.toString()||profile.toString()===Manifesto.ServiceProfile.STANFORDIIIF1IMAGECONFORMANCE1.toString()||profile.toString()===Manifesto.ServiceProfile.IIIF1IMAGELEVEL1.toString()||profile.toString()===Manifesto.ServiceProfile.IIIF1IMAGELEVEL1PROFILE.toString()||profile.toString()===Manifesto.ServiceProfile.IIIF2IMAGELEVEL1.toString()||profile.toString()===Manifesto.ServiceProfile.IIIF2IMAGELEVEL1PROFILE.toString()},Utils.isLevel2ImageProfile=function(profile){return profile.toString()===Manifesto.ServiceProfile.STANFORDIIIFIMAGECOMPLIANCE2.toString()||profile.toString()===Manifesto.ServiceProfile.STANFORDIIIF1IMAGECOMPLIANCE2.toString()||profile.toString()===Manifesto.ServiceProfile.STANFORDIIIFIMAGECONFORMANCE2.toString()||profile.toString()===Manifesto.ServiceProfile.STANFORDIIIF1IMAGECONFORMANCE2.toString()||profile.toString()===Manifesto.ServiceProfile.IIIF1IMAGELEVEL2.toString()||profile.toString()===Manifesto.ServiceProfile.IIIF1IMAGELEVEL2PROFILE.toString()||profile.toString()===Manifesto.ServiceProfile.IIIF2IMAGELEVEL2.toString()||profile.toString()===Manifesto.ServiceProfile.IIIF2IMAGELEVEL2PROFILE.toString()},Utils.loadResource=function(uri){return new Promise(function(resolve,reject){var request,u=url.parse(uri),opts={host:u.hostname,port:u.port,path:u.path,method:"GET",withCredentials:!1};request="https:"===u.protocol?https.request(opts,function(response){var result="";response.on("data",function(chunk){result+=chunk}),response.on("end",function(){resolve(result)})}):http.request(opts,function(response){var result="";response.on("data",function(chunk){result+=chunk}),response.on("end",function(){resolve(result)})}),request.on("error",function(error){reject(error)}),request.end()})},Utils.loadExternalResource=function(resource,tokenStorageStrategy,clickThrough,restricted,login,getAccessToken,storeAccessToken,getStoredAccessToken,handleResourceResponse,options){return new Promise(function(resolve,reject){options&&options.pessimisticAccessControl?resource.getData().then(function(){resource.isAccessControlled()?resource.clickThroughService?resolve(clickThrough(resource)):resource.restrictedService?resolve(restricted(resource)):login(resource).then(function(){getAccessToken(resource,!0).then(function(token){resource.getData(token).then(function(){resolve(handleResourceResponse(resource))})["catch"](function(message){reject(Utils.createInternalServerError(message))})})["catch"](function(message){reject(Utils.createInternalServerError(message))})})["catch"](function(message){reject(Utils.createInternalServerError(message))}):resolve(resource)})["catch"](function(message){reject(Utils.createInternalServerError(message))}):getStoredAccessToken(resource,tokenStorageStrategy).then(function(storedAccessToken){storedAccessToken?resource.getData(storedAccessToken).then(function(){resource.status===HTTPStatusCode.OK?resolve(handleResourceResponse(resource)):Utils.authorize(resource,tokenStorageStrategy,clickThrough,restricted,login,getAccessToken,storeAccessToken,getStoredAccessToken).then(function(){resolve(handleResourceResponse(resource))})["catch"](function(error){reject(resource.restrictedService?Utils.createRestrictedError():Utils.createAuthorizationFailedError())})})["catch"](function(error){reject(Utils.createAuthorizationFailedError())}):Utils.authorize(resource,tokenStorageStrategy,clickThrough,restricted,login,getAccessToken,storeAccessToken,getStoredAccessToken).then(function(){resolve(handleResourceResponse(resource))})["catch"](function(error){reject(Utils.createAuthorizationFailedError())})})["catch"](function(error){reject(Utils.createAuthorizationFailedError())})})},Utils.createError=function(name,message){var error=new Error;return error.message=message,error.name=name,error},Utils.createAuthorizationFailedError=function(){return Utils.createError(manifesto.StatusCodes.AUTHORIZATION_FAILED.toString(),"Authorization failed")},Utils.createRestrictedError=function(){return Utils.createError(manifesto.StatusCodes.RESTRICTED.toString(),"Restricted")},Utils.createInternalServerError=function(message){return Utils.createError(manifesto.StatusCodes.INTERNAL_SERVER_ERROR.toString(),message)},Utils.loadExternalResources=function(resources,tokenStorageStrategy,clickThrough,restricted,login,getAccessToken,storeAccessToken,getStoredAccessToken,handleResourceResponse,options){return new Promise(function(resolve,reject){var promises=resources.map(function(resource){return Utils.loadExternalResource(resource,tokenStorageStrategy,clickThrough,restricted,login,getAccessToken,storeAccessToken,getStoredAccessToken,handleResourceResponse,options)});Promise.all(promises).then(function(){
resolve(resources)})["catch"](function(error){reject(error)})})},Utils.authorize=function(resource,tokenStorageStrategy,clickThrough,restricted,login,getAccessToken,storeAccessToken,getStoredAccessToken){return new Promise(function(resolve,reject){resource.getData().then(function(){resource.isAccessControlled()?getStoredAccessToken(resource,tokenStorageStrategy).then(function(storedAccessToken){storedAccessToken?resource.getData(storedAccessToken).then(function(){resource.status===HTTPStatusCode.OK?resolve(resource):Utils.showAuthInteraction(resource,tokenStorageStrategy,clickThrough,restricted,login,getAccessToken,storeAccessToken,resolve,reject)})["catch"](function(message){reject(Utils.createInternalServerError(message))}):getAccessToken(resource,!1).then(function(accessToken){accessToken?storeAccessToken(resource,accessToken,tokenStorageStrategy).then(function(){resource.getData(accessToken).then(function(){resource.status===HTTPStatusCode.OK?resolve(resource):Utils.showAuthInteraction(resource,tokenStorageStrategy,clickThrough,restricted,login,getAccessToken,storeAccessToken,resolve,reject)})["catch"](function(message){reject(Utils.createInternalServerError(message))})})["catch"](function(message){reject(Utils.createInternalServerError(message))}):Utils.showAuthInteraction(resource,tokenStorageStrategy,clickThrough,restricted,login,getAccessToken,storeAccessToken,resolve,reject)})})["catch"](function(message){reject(Utils.createInternalServerError(message))}):resolve(resource)})})},Utils.showAuthInteraction=function(resource,tokenStorageStrategy,clickThrough,restricted,login,getAccessToken,storeAccessToken,resolve,reject){resource.status!==HTTPStatusCode.MOVED_TEMPORARILY||resource.isResponseHandled?resource.restrictedService?resolve(restricted(resource)):resource.clickThroughService&&!resource.isResponseHandled?clickThrough(resource).then(function(){getAccessToken(resource,!0).then(function(accessToken){storeAccessToken(resource,accessToken,tokenStorageStrategy).then(function(){resource.getData(accessToken).then(function(){resolve(resource)})["catch"](function(message){reject(Utils.createInternalServerError(message))})})["catch"](function(message){reject(Utils.createInternalServerError(message))})})["catch"](function(message){reject(Utils.createInternalServerError(message))})}):login(resource).then(function(){getAccessToken(resource,!0).then(function(accessToken){storeAccessToken(resource,accessToken,tokenStorageStrategy).then(function(){resource.getData(accessToken).then(function(){resolve(resource)})["catch"](function(message){reject(Utils.createInternalServerError(message))})})["catch"](function(message){reject(Utils.createInternalServerError(message))})})["catch"](function(message){reject(Utils.createInternalServerError(message))})}):resolve(resource)},Utils.getService=function(resource,profile){var services=this.getServices(resource);"string"!=typeof profile&&(profile=profile.toString());for(var i=0;i<services.length;i++){var service=services[i];if(service.getProfile().toString()===profile)return service}return null},Utils.getResourceById=function(parentResource,id){return[parentResource.__jsonld].en().traverseUnique(function(x){return Utils.getAllArrays(x)}).first(function(r){return r["@id"]===id})},Utils.getAllArrays=function(obj){var all=[].en();if(!obj)return all;for(var key in obj){var val=obj[key];Array.isArray(val)&&(all=all.concat(val))}return all},Utils.getServices=function(resource){var service;service=resource.__jsonld?resource.__jsonld.service:resource.service;var services=[];if(!service)return services;Array.isArray(service)||(service=[service]);for(var i=0;i<service.length;i++){var s=service[i];if("string"==typeof s){var r=this.getResourceById(resource.options.resource,s);r&&services.push(new Manifesto.Service(r.__jsonld||r,resource.options))}else services.push(new Manifesto.Service(s,resource.options))}return services},Utils}();Manifesto.Utils=Utils}(Manifesto||(Manifesto={}));var Manifesto;!function(Manifesto){var MetadataItem=function(){function MetadataItem(defaultLocale){this.defaultLocale=defaultLocale}return MetadataItem.prototype.parse=function(resource){this.resource=resource,this.label=Manifesto.TranslationCollection.parse(this.resource.label,this.defaultLocale),this.value=Manifesto.TranslationCollection.parse(this.resource.value,this.defaultLocale)},MetadataItem.prototype.getLabel=function(){return this.label?Manifesto.TranslationCollection.getValue(this.label,this.defaultLocale):null},MetadataItem.prototype.setLabel=function(value){var _this=this;if(this.label&&this.label.length){var t=this.label.en().where(function(x){return x.locale===_this.defaultLocale||x.locale===Manifesto.Utils.getInexactLocale(_this.defaultLocale)}).first();t&&(t.value=value)}},MetadataItem.prototype.getValue=function(){if(this.value){var locale=this.defaultLocale;return this.label.length&&this.label[0].locale&&(locale=this.label[0].locale),Manifesto.TranslationCollection.getValue(this.value,locale)}return null},MetadataItem.prototype.setValue=function(value){var _this=this;if(this.value&&this.value.length){var t=this.value.en().where(function(x){return x.locale===_this.defaultLocale||x.locale===Manifesto.Utils.getInexactLocale(_this.defaultLocale)}).first();t&&(t.value=value)}},MetadataItem}();Manifesto.MetadataItem=MetadataItem}(Manifesto||(Manifesto={}));var Manifesto;!function(Manifesto){var Translation=function(){function Translation(value,locale){this.value=value,this.locale=locale}return Translation}();Manifesto.Translation=Translation}(Manifesto||(Manifesto={}));var Manifesto,__extends=this&&this.__extends||function(){var extendStatics=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(d,b){d.__proto__=b}||function(d,b){for(var p in b)b.hasOwnProperty(p)&&(d[p]=b[p])};return function(d,b){function __(){this.constructor=d}extendStatics(d,b),d.prototype=null===b?Object.create(b):(__.prototype=b.prototype,new __)}}();!function(Manifesto){var TranslationCollection=function(_super){function TranslationCollection(){return null!==_super&&_super.apply(this,arguments)||this}return __extends(TranslationCollection,_super),TranslationCollection.parse=function(translation,defaultLocale){var t,tc=[];if(!translation)return tc;if(!Array.isArray(translation))return"string"==typeof translation?(t=new Manifesto.Translation(translation,defaultLocale),tc.push(t),tc):(t=new Manifesto.Translation(translation["@value"],translation["@language"]||defaultLocale),tc.push(t),tc);for(var i=0;i<translation.length;i++){var value=translation[i];t="string"==typeof value?new Manifesto.Translation(value,defaultLocale):new Manifesto.Translation(value["@value"],value["@language"]||defaultLocale),tc.push(t)}return tc},TranslationCollection.getValue=function(translationCollection,locale){if(translationCollection.length){if(locale){var translation=translationCollection.en().where(function(t){return t.locale===locale||Manifesto.Utils.getInexactLocale(t.locale)===Manifesto.Utils.getInexactLocale(locale)}).first();if(translation)return translation.value}return translationCollection[0].value}return null},TranslationCollection}(Array);Manifesto.TranslationCollection=TranslationCollection}(Manifesto||(Manifesto={})),global.manifesto=global.Manifesto=module.exports={AnnotationMotivation:new Manifesto.AnnotationMotivation,ElementType:new Manifesto.ElementType,IIIFResourceType:new Manifesto.IIIFResourceType,ManifestType:new Manifesto.ManifestType,MetadataItem:Manifesto.MetadataItem,RenderingFormat:new Manifesto.RenderingFormat,ResourceFormat:new Manifesto.ResourceFormat,ResourceType:new Manifesto.ResourceType,ServiceProfile:new Manifesto.ServiceProfile,Translation:Manifesto.Translation,TranslationCollection:Manifesto.TranslationCollection,TreeNode:Manifesto.TreeNode,TreeNodeType:new Manifesto.TreeNodeType,Utils:Manifesto.Utils,ViewingDirection:new Manifesto.ViewingDirection,ViewingHint:new Manifesto.ViewingHint,StatusCodes:{AUTHORIZATION_FAILED:1,FORBIDDEN:2,INTERNAL_SERVER_ERROR:3,RESTRICTED:4},create:function(manifest,options){return Manifesto.Deserialiser.parse(manifest,options)},loadManifest:function(uri){return Manifesto.Utils.loadResource(uri)}};var Manifesto,__extends=this&&this.__extends||function(){var extendStatics=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(d,b){d.__proto__=b}||function(d,b){for(var p in b)b.hasOwnProperty(p)&&(d[p]=b[p])};return function(d,b){function __(){this.constructor=d}extendStatics(d,b),d.prototype=null===b?Object.create(b):(__.prototype=b.prototype,new __)}}();!function(Manifesto){var Annotation=function(_super){function Annotation(jsonld,options){return _super.call(this,jsonld,options)||this}return __extends(Annotation,_super),Annotation.prototype.getMotivation=function(){var motivation=this.getProperty("motivation");return motivation?new Manifesto.AnnotationMotivation(motivation.toLowerCase()):null},Annotation.prototype.getOn=function(){return this.getProperty("on")},Annotation.prototype.getResource=function(){return new Manifesto.Resource(this.getProperty("resource"),this.options)},Annotation}(Manifesto.ManifestResource);Manifesto.Annotation=Annotation}(Manifesto||(Manifesto={}));var Manifesto,__extends=this&&this.__extends||function(){var extendStatics=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(d,b){d.__proto__=b}||function(d,b){for(var p in b)b.hasOwnProperty(p)&&(d[p]=b[p])};return function(d,b){function __(){this.constructor=d}extendStatics(d,b),d.prototype=null===b?Object.create(b):(__.prototype=b.prototype,new __)}}();!function(Manifesto){var Resource=function(_super){function Resource(jsonld,options){return _super.call(this,jsonld,options)||this}return __extends(Resource,_super),Resource.prototype.getFormat=function(){var format=this.getProperty("format");return format?new Manifesto.ResourceFormat(format.toLowerCase()):null},Resource.prototype.getType=function(){var type=this.getProperty("@type");return type?new Manifesto.ResourceType(type.toLowerCase()):null},Resource.prototype.getWidth=function(){return this.getProperty("width")},Resource.prototype.getHeight=function(){return this.getProperty("height")},Resource.prototype.getMaxWidth=function(){return this.getProperty("maxWidth")},Resource.prototype.getMaxHeight=function(){var maxHeight=this.getProperty("maxHeight");return maxHeight?null:this.getMaxWidth()},Resource}(Manifesto.ManifestResource);Manifesto.Resource=Resource}(Manifesto||(Manifesto={}))}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{http:27,https:9,url:33}],2:[function(require,module,exports){"use strict";function placeHoldersCount(b64){var len=b64.length;if(len%4>0)throw new Error("Invalid string. Length must be a multiple of 4");return"="===b64[len-2]?2:"="===b64[len-1]?1:0}function byteLength(b64){return 3*b64.length/4-placeHoldersCount(b64)}function toByteArray(b64){var i,j,l,tmp,placeHolders,arr,len=b64.length;placeHolders=placeHoldersCount(b64),arr=new Arr(3*len/4-placeHolders),l=placeHolders>0?len-4:len;var L=0;for(i=0,j=0;i<l;i+=4,j+=3)tmp=revLookup[b64.charCodeAt(i)]<<18|revLookup[b64.charCodeAt(i+1)]<<12|revLookup[b64.charCodeAt(i+2)]<<6|revLookup[b64.charCodeAt(i+3)],arr[L++]=tmp>>16&255,arr[L++]=tmp>>8&255,arr[L++]=255&tmp;return 2===placeHolders?(tmp=revLookup[b64.charCodeAt(i)]<<2|revLookup[b64.charCodeAt(i+1)]>>4,arr[L++]=255&tmp):1===placeHolders&&(tmp=revLookup[b64.charCodeAt(i)]<<10|revLookup[b64.charCodeAt(i+1)]<<4|revLookup[b64.charCodeAt(i+2)]>>2,arr[L++]=tmp>>8&255,arr[L++]=255&tmp),arr}function tripletToBase64(num){return lookup[num>>18&63]+lookup[num>>12&63]+lookup[num>>6&63]+lookup[63&num]}function encodeChunk(uint8,start,end){for(var tmp,output=[],i=start;i<end;i+=3)tmp=(uint8[i]<<16)+(uint8[i+1]<<8)+uint8[i+2],output.push(tripletToBase64(tmp));return output.join("")}function fromByteArray(uint8){for(var tmp,len=uint8.length,extraBytes=len%3,output="",parts=[],maxChunkLength=16383,i=0,len2=len-extraBytes;i<len2;i+=maxChunkLength)parts.push(encodeChunk(uint8,i,i+maxChunkLength>len2?len2:i+maxChunkLength));return 1===extraBytes?(tmp=uint8[len-1],output+=lookup[tmp>>2],output+=lookup[tmp<<4&63],output+="=="):2===extraBytes&&(tmp=(uint8[len-2]<<8)+uint8[len-1],output+=lookup[tmp>>10],output+=lookup[tmp>>4&63],output+=lookup[tmp<<2&63],output+="="),parts.push(output),parts.join("")}exports.byteLength=byteLength,exports.toByteArray=toByteArray,exports.fromByteArray=fromByteArray;for(var lookup=[],revLookup=[],Arr="undefined"!=typeof Uint8Array?Uint8Array:Array,code="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",i=0,len=code.length;i<len;++i)lookup[i]=code[i],revLookup[code.charCodeAt(i)]=i;revLookup["-".charCodeAt(0)]=62,revLookup["_".charCodeAt(0)]=63},{}],3:[function(require,module,exports){},{}],4:[function(require,module,exports){(function(global){"use strict";var buffer=require("buffer"),Buffer=buffer.Buffer,SlowBuffer=buffer.SlowBuffer,MAX_LEN=buffer.kMaxLength||2147483647;exports.alloc=function(size,fill,encoding){if("function"==typeof Buffer.alloc)return Buffer.alloc(size,fill,encoding);if("number"==typeof encoding)throw new TypeError("encoding must not be number");if("number"!=typeof size)throw new TypeError("size must be a number");if(size>MAX_LEN)throw new RangeError("size is too large");var enc=encoding,_fill=fill;void 0===_fill&&(enc=void 0,_fill=0);var buf=new Buffer(size);if("string"==typeof _fill)for(var fillBuf=new Buffer(_fill,enc),flen=fillBuf.length,i=-1;++i<size;)buf[i]=fillBuf[i%flen];else buf.fill(_fill);return buf},exports.allocUnsafe=function(size){if("function"==typeof Buffer.allocUnsafe)return Buffer.allocUnsafe(size);if("number"!=typeof size)throw new TypeError("size must be a number");if(size>MAX_LEN)throw new RangeError("size is too large");return new Buffer(size)},exports.from=function(value,encodingOrOffset,length){if("function"==typeof Buffer.from&&(!global.Uint8Array||Uint8Array.from!==Buffer.from))return Buffer.from(value,encodingOrOffset,length);if("number"==typeof value)throw new TypeError('"value" argument must not be a number');if("string"==typeof value)return new Buffer(value,encodingOrOffset);if("undefined"!=typeof ArrayBuffer&&value instanceof ArrayBuffer){var offset=encodingOrOffset;if(1===arguments.length)return new Buffer(value);"undefined"==typeof offset&&(offset=0);var len=length;if("undefined"==typeof len&&(len=value.byteLength-offset),offset>=value.byteLength)throw new RangeError("'offset' is out of bounds");if(len>value.byteLength-offset)throw new RangeError("'length' is out of bounds");return new Buffer(value.slice(offset,offset+len))}if(Buffer.isBuffer(value)){var out=new Buffer(value.length);return value.copy(out,0,0,value.length),out}if(value){if(Array.isArray(value)||"undefined"!=typeof ArrayBuffer&&value.buffer instanceof ArrayBuffer||"length"in value)return new Buffer(value);if("Buffer"===value.type&&Array.isArray(value.data))return new Buffer(value.data)}throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.")},exports.allocUnsafeSlow=function(size){if("function"==typeof Buffer.allocUnsafeSlow)return Buffer.allocUnsafeSlow(size);if("number"!=typeof size)throw new TypeError("size must be a number");if(size>=MAX_LEN)throw new RangeError("size is too large");return new SlowBuffer(size)}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{buffer:5}],5:[function(require,module,exports){(function(global){"use strict";function typedArraySupport(){try{var arr=new Uint8Array(1);return arr.__proto__={__proto__:Uint8Array.prototype,foo:function(){return 42}},42===arr.foo()&&"function"==typeof arr.subarray&&0===arr.subarray(1,1).byteLength}catch(e){return!1}}function kMaxLength(){return Buffer.TYPED_ARRAY_SUPPORT?2147483647:1073741823}function createBuffer(that,length){if(kMaxLength()<length)throw new RangeError("Invalid typed array length");return Buffer.TYPED_ARRAY_SUPPORT?(that=new Uint8Array(length),that.__proto__=Buffer.prototype):(null===that&&(that=new Buffer(length)),that.length=length),that}function Buffer(arg,encodingOrOffset,length){if(!(Buffer.TYPED_ARRAY_SUPPORT||this instanceof Buffer))return new Buffer(arg,encodingOrOffset,length);if("number"==typeof arg){if("string"==typeof encodingOrOffset)throw new Error("If encoding is specified then the first argument must be a string");return allocUnsafe(this,arg)}return from(this,arg,encodingOrOffset,length)}function from(that,value,encodingOrOffset,length){if("number"==typeof value)throw new TypeError('"value" argument must not be a number');return"undefined"!=typeof ArrayBuffer&&value instanceof ArrayBuffer?fromArrayBuffer(that,value,encodingOrOffset,length):"string"==typeof value?fromString(that,value,encodingOrOffset):fromObject(that,value)}function assertSize(size){if("number"!=typeof size)throw new TypeError('"size" argument must be a number');if(size<0)throw new RangeError('"size" argument must not be negative')}function alloc(that,size,fill,encoding){return assertSize(size),size<=0?createBuffer(that,size):void 0!==fill?"string"==typeof encoding?createBuffer(that,size).fill(fill,encoding):createBuffer(that,size).fill(fill):createBuffer(that,size)}function allocUnsafe(that,size){if(assertSize(size),that=createBuffer(that,size<0?0:0|checked(size)),!Buffer.TYPED_ARRAY_SUPPORT)for(var i=0;i<size;++i)that[i]=0;return that}function fromString(that,string,encoding){if("string"==typeof encoding&&""!==encoding||(encoding="utf8"),!Buffer.isEncoding(encoding))throw new TypeError('"encoding" must be a valid string encoding');var length=0|byteLength(string,encoding);that=createBuffer(that,length);var actual=that.write(string,encoding);return actual!==length&&(that=that.slice(0,actual)),that}function fromArrayLike(that,array){var length=array.length<0?0:0|checked(array.length);that=createBuffer(that,length);for(var i=0;i<length;i+=1)that[i]=255&array[i];return that}function fromArrayBuffer(that,array,byteOffset,length){if(array.byteLength,byteOffset<0||array.byteLength<byteOffset)throw new RangeError("'offset' is out of bounds");if(array.byteLength<byteOffset+(length||0))throw new RangeError("'length' is out of bounds");return array=void 0===byteOffset&&void 0===length?new Uint8Array(array):void 0===length?new Uint8Array(array,byteOffset):new Uint8Array(array,byteOffset,length),Buffer.TYPED_ARRAY_SUPPORT?(that=array,that.__proto__=Buffer.prototype):that=fromArrayLike(that,array),that}function fromObject(that,obj){if(Buffer.isBuffer(obj)){var len=0|checked(obj.length);return that=createBuffer(that,len),0===that.length?that:(obj.copy(that,0,0,len),that)}if(obj){if("undefined"!=typeof ArrayBuffer&&obj.buffer instanceof ArrayBuffer||"length"in obj)return"number"!=typeof obj.length||isnan(obj.length)?createBuffer(that,0):fromArrayLike(that,obj);if("Buffer"===obj.type&&isArray(obj.data))return fromArrayLike(that,obj.data)}throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.")}function checked(length){if(length>=kMaxLength())throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x"+kMaxLength().toString(16)+" bytes");return 0|length}function SlowBuffer(length){return+length!=length&&(length=0),Buffer.alloc(+length)}function byteLength(string,encoding){if(Buffer.isBuffer(string))return string.length;if("undefined"!=typeof ArrayBuffer&&"function"==typeof ArrayBuffer.isView&&(ArrayBuffer.isView(string)||string instanceof ArrayBuffer))return string.byteLength;"string"!=typeof string&&(string=""+string);var len=string.length;if(0===len)return 0;for(var loweredCase=!1;;)switch(encoding){case"ascii":case"latin1":case"binary":return len;case"utf8":case"utf-8":case void 0:return utf8ToBytes(string).length;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return 2*len;case"hex":return len>>>1;case"base64":return base64ToBytes(string).length;default:if(loweredCase)return utf8ToBytes(string).length;encoding=(""+encoding).toLowerCase(),loweredCase=!0}}function slowToString(encoding,start,end){var loweredCase=!1;if((void 0===start||start<0)&&(start=0),start>this.length)return"";if((void 0===end||end>this.length)&&(end=this.length),end<=0)return"";if(end>>>=0,start>>>=0,end<=start)return"";for(encoding||(encoding="utf8");;)switch(encoding){case"hex":return hexSlice(this,start,end);case"utf8":case"utf-8":return utf8Slice(this,start,end);case"ascii":return asciiSlice(this,start,end);case"latin1":case"binary":return latin1Slice(this,start,end);case"base64":return base64Slice(this,start,end);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return utf16leSlice(this,start,end);default:if(loweredCase)throw new TypeError("Unknown encoding: "+encoding);encoding=(encoding+"").toLowerCase(),loweredCase=!0}}function swap(b,n,m){var i=b[n];b[n]=b[m],b[m]=i}function bidirectionalIndexOf(buffer,val,byteOffset,encoding,dir){if(0===buffer.length)return-1;if("string"==typeof byteOffset?(encoding=byteOffset,byteOffset=0):byteOffset>2147483647?byteOffset=2147483647:byteOffset<-2147483648&&(byteOffset=-2147483648),byteOffset=+byteOffset,isNaN(byteOffset)&&(byteOffset=dir?0:buffer.length-1),byteOffset<0&&(byteOffset=buffer.length+byteOffset),byteOffset>=buffer.length){if(dir)return-1;byteOffset=buffer.length-1}else if(byteOffset<0){if(!dir)return-1;byteOffset=0}if("string"==typeof val&&(val=Buffer.from(val,encoding)),Buffer.isBuffer(val))return 0===val.length?-1:arrayIndexOf(buffer,val,byteOffset,encoding,dir);if("number"==typeof val)return val=255&val,Buffer.TYPED_ARRAY_SUPPORT&&"function"==typeof Uint8Array.prototype.indexOf?dir?Uint8Array.prototype.indexOf.call(buffer,val,byteOffset):Uint8Array.prototype.lastIndexOf.call(buffer,val,byteOffset):arrayIndexOf(buffer,[val],byteOffset,encoding,dir);throw new TypeError("val must be string, number or Buffer")}function arrayIndexOf(arr,val,byteOffset,encoding,dir){function read(buf,i){return 1===indexSize?buf[i]:buf.readUInt16BE(i*indexSize)}var indexSize=1,arrLength=arr.length,valLength=val.length;if(void 0!==encoding&&(encoding=String(encoding).toLowerCase(),"ucs2"===encoding||"ucs-2"===encoding||"utf16le"===encoding||"utf-16le"===encoding)){if(arr.length<2||val.length<2)return-1;indexSize=2,arrLength/=2,valLength/=2,byteOffset/=2}var i;if(dir){var foundIndex=-1;for(i=byteOffset;i<arrLength;i++)if(read(arr,i)===read(val,foundIndex===-1?0:i-foundIndex)){if(foundIndex===-1&&(foundIndex=i),i-foundIndex+1===valLength)return foundIndex*indexSize}else foundIndex!==-1&&(i-=i-foundIndex),foundIndex=-1}else for(byteOffset+valLength>arrLength&&(byteOffset=arrLength-valLength),i=byteOffset;i>=0;i--){for(var found=!0,j=0;j<valLength;j++)if(read(arr,i+j)!==read(val,j)){found=!1;break}if(found)return i}return-1}function hexWrite(buf,string,offset,length){offset=Number(offset)||0;var remaining=buf.length-offset;length?(length=Number(length),length>remaining&&(length=remaining)):length=remaining;var strLen=string.length;if(strLen%2!==0)throw new TypeError("Invalid hex string");length>strLen/2&&(length=strLen/2);for(var i=0;i<length;++i){var parsed=parseInt(string.substr(2*i,2),16);if(isNaN(parsed))return i;buf[offset+i]=parsed}return i}function utf8Write(buf,string,offset,length){return blitBuffer(utf8ToBytes(string,buf.length-offset),buf,offset,length)}function asciiWrite(buf,string,offset,length){return blitBuffer(asciiToBytes(string),buf,offset,length)}function latin1Write(buf,string,offset,length){return asciiWrite(buf,string,offset,length)}function base64Write(buf,string,offset,length){return blitBuffer(base64ToBytes(string),buf,offset,length)}function ucs2Write(buf,string,offset,length){return blitBuffer(utf16leToBytes(string,buf.length-offset),buf,offset,length)}function base64Slice(buf,start,end){return 0===start&&end===buf.length?base64.fromByteArray(buf):base64.fromByteArray(buf.slice(start,end))}function utf8Slice(buf,start,end){end=Math.min(buf.length,end);for(var res=[],i=start;i<end;){var firstByte=buf[i],codePoint=null,bytesPerSequence=firstByte>239?4:firstByte>223?3:firstByte>191?2:1;if(i+bytesPerSequence<=end){var secondByte,thirdByte,fourthByte,tempCodePoint;switch(bytesPerSequence){case 1:firstByte<128&&(codePoint=firstByte);break;case 2:secondByte=buf[i+1],128===(192&secondByte)&&(tempCodePoint=(31&firstByte)<<6|63&secondByte,tempCodePoint>127&&(codePoint=tempCodePoint));break;case 3:secondByte=buf[i+1],thirdByte=buf[i+2],128===(192&secondByte)&&128===(192&thirdByte)&&(tempCodePoint=(15&firstByte)<<12|(63&secondByte)<<6|63&thirdByte,tempCodePoint>2047&&(tempCodePoint<55296||tempCodePoint>57343)&&(codePoint=tempCodePoint));break;case 4:secondByte=buf[i+1],thirdByte=buf[i+2],fourthByte=buf[i+3],128===(192&secondByte)&&128===(192&thirdByte)&&128===(192&fourthByte)&&(tempCodePoint=(15&firstByte)<<18|(63&secondByte)<<12|(63&thirdByte)<<6|63&fourthByte,tempCodePoint>65535&&tempCodePoint<1114112&&(codePoint=tempCodePoint))}}null===codePoint?(codePoint=65533,bytesPerSequence=1):codePoint>65535&&(codePoint-=65536,res.push(codePoint>>>10&1023|55296),codePoint=56320|1023&codePoint),res.push(codePoint),i+=bytesPerSequence}return decodeCodePointsArray(res)}function decodeCodePointsArray(codePoints){var len=codePoints.length;if(len<=MAX_ARGUMENTS_LENGTH)return String.fromCharCode.apply(String,codePoints);for(var res="",i=0;i<len;)res+=String.fromCharCode.apply(String,codePoints.slice(i,i+=MAX_ARGUMENTS_LENGTH));return res}function asciiSlice(buf,start,end){var ret="";end=Math.min(buf.length,end);for(var i=start;i<end;++i)ret+=String.fromCharCode(127&buf[i]);return ret}function latin1Slice(buf,start,end){var ret="";end=Math.min(buf.length,end);for(var i=start;i<end;++i)ret+=String.fromCharCode(buf[i]);return ret}function hexSlice(buf,start,end){var len=buf.length;(!start||start<0)&&(start=0),(!end||end<0||end>len)&&(end=len);for(var out="",i=start;i<end;++i)out+=toHex(buf[i]);return out}function utf16leSlice(buf,start,end){for(var bytes=buf.slice(start,end),res="",i=0;i<bytes.length;i+=2)res+=String.fromCharCode(bytes[i]+256*bytes[i+1]);return res}function checkOffset(offset,ext,length){if(offset%1!==0||offset<0)throw new RangeError("offset is not uint");if(offset+ext>length)throw new RangeError("Trying to access beyond buffer length")}function checkInt(buf,value,offset,ext,max,min){if(!Buffer.isBuffer(buf))throw new TypeError('"buffer" argument must be a Buffer instance');if(value>max||value<min)throw new RangeError('"value" argument is out of bounds');if(offset+ext>buf.length)throw new RangeError("Index out of range")}function objectWriteUInt16(buf,value,offset,littleEndian){value<0&&(value=65535+value+1);for(var i=0,j=Math.min(buf.length-offset,2);i<j;++i)buf[offset+i]=(value&255<<8*(littleEndian?i:1-i))>>>8*(littleEndian?i:1-i)}function objectWriteUInt32(buf,value,offset,littleEndian){value<0&&(value=4294967295+value+1);for(var i=0,j=Math.min(buf.length-offset,4);i<j;++i)buf[offset+i]=value>>>8*(littleEndian?i:3-i)&255}function checkIEEE754(buf,value,offset,ext,max,min){if(offset+ext>buf.length)throw new RangeError("Index out of range");if(offset<0)throw new RangeError("Index out of range")}function writeFloat(buf,value,offset,littleEndian,noAssert){return noAssert||checkIEEE754(buf,value,offset,4,3.4028234663852886e38,-3.4028234663852886e38),ieee754.write(buf,value,offset,littleEndian,23,4),offset+4}function writeDouble(buf,value,offset,littleEndian,noAssert){return noAssert||checkIEEE754(buf,value,offset,8,1.7976931348623157e308,-1.7976931348623157e308),ieee754.write(buf,value,offset,littleEndian,52,8),offset+8}function base64clean(str){if(str=stringtrim(str).replace(INVALID_BASE64_RE,""),str.length<2)return"";for(;str.length%4!==0;)str+="=";return str}function stringtrim(str){return str.trim?str.trim():str.replace(/^\s+|\s+$/g,"")}function toHex(n){return n<16?"0"+n.toString(16):n.toString(16)}function utf8ToBytes(string,units){units=units||1/0;for(var codePoint,length=string.length,leadSurrogate=null,bytes=[],i=0;i<length;++i){if(codePoint=string.charCodeAt(i),codePoint>55295&&codePoint<57344){if(!leadSurrogate){if(codePoint>56319){(units-=3)>-1&&bytes.push(239,191,189);continue}if(i+1===length){(units-=3)>-1&&bytes.push(239,191,189);continue}leadSurrogate=codePoint;continue}if(codePoint<56320){(units-=3)>-1&&bytes.push(239,191,189),leadSurrogate=codePoint;continue}codePoint=(leadSurrogate-55296<<10|codePoint-56320)+65536}else leadSurrogate&&(units-=3)>-1&&bytes.push(239,191,189);if(leadSurrogate=null,codePoint<128){if((units-=1)<0)break;bytes.push(codePoint)}else if(codePoint<2048){if((units-=2)<0)break;bytes.push(codePoint>>6|192,63&codePoint|128)}else if(codePoint<65536){if((units-=3)<0)break;bytes.push(codePoint>>12|224,codePoint>>6&63|128,63&codePoint|128)}else{if(!(codePoint<1114112))throw new Error("Invalid code point");if((units-=4)<0)break;bytes.push(codePoint>>18|240,codePoint>>12&63|128,codePoint>>6&63|128,63&codePoint|128)}}return bytes}function asciiToBytes(str){for(var byteArray=[],i=0;i<str.length;++i)byteArray.push(255&str.charCodeAt(i));return byteArray}function utf16leToBytes(str,units){for(var c,hi,lo,byteArray=[],i=0;i<str.length&&!((units-=2)<0);++i)c=str.charCodeAt(i),hi=c>>8,lo=c%256,byteArray.push(lo),byteArray.push(hi);return byteArray}function base64ToBytes(str){return base64.toByteArray(base64clean(str))}function blitBuffer(src,dst,offset,length){for(var i=0;i<length&&!(i+offset>=dst.length||i>=src.length);++i)dst[i+offset]=src[i];return i}function isnan(val){return val!==val}var base64=require("base64-js"),ieee754=require("ieee754"),isArray=require("isarray");exports.Buffer=Buffer,exports.SlowBuffer=SlowBuffer,exports.INSPECT_MAX_BYTES=50,Buffer.TYPED_ARRAY_SUPPORT=void 0!==global.TYPED_ARRAY_SUPPORT?global.TYPED_ARRAY_SUPPORT:typedArraySupport(),exports.kMaxLength=kMaxLength(),Buffer.poolSize=8192,Buffer._augment=function(arr){return arr.__proto__=Buffer.prototype,arr},Buffer.from=function(value,encodingOrOffset,length){return from(null,value,encodingOrOffset,length)},Buffer.TYPED_ARRAY_SUPPORT&&(Buffer.prototype.__proto__=Uint8Array.prototype,Buffer.__proto__=Uint8Array,"undefined"!=typeof Symbol&&Symbol.species&&Buffer[Symbol.species]===Buffer&&Object.defineProperty(Buffer,Symbol.species,{value:null,configurable:!0})),Buffer.alloc=function(size,fill,encoding){return alloc(null,size,fill,encoding)},Buffer.allocUnsafe=function(size){return allocUnsafe(null,size)},Buffer.allocUnsafeSlow=function(size){return allocUnsafe(null,size)},Buffer.isBuffer=function(b){return!(null==b||!b._isBuffer)},Buffer.compare=function(a,b){if(!Buffer.isBuffer(a)||!Buffer.isBuffer(b))throw new TypeError("Arguments must be Buffers");if(a===b)return 0;for(var x=a.length,y=b.length,i=0,len=Math.min(x,y);i<len;++i)if(a[i]!==b[i]){x=a[i],y=b[i];break}return x<y?-1:y<x?1:0},Buffer.isEncoding=function(encoding){switch(String(encoding).toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"latin1":case"binary":case"base64":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return!0;default:return!1}},Buffer.concat=function(list,length){if(!isArray(list))throw new TypeError('"list" argument must be an Array of Buffers');if(0===list.length)return Buffer.alloc(0);var i;if(void 0===length)for(length=0,i=0;i<list.length;++i)length+=list[i].length;var buffer=Buffer.allocUnsafe(length),pos=0;for(i=0;i<list.length;++i){var buf=list[i];if(!Buffer.isBuffer(buf))throw new TypeError('"list" argument must be an Array of Buffers');buf.copy(buffer,pos),pos+=buf.length}return buffer},Buffer.byteLength=byteLength,Buffer.prototype._isBuffer=!0,Buffer.prototype.swap16=function(){var len=this.length;if(len%2!==0)throw new RangeError("Buffer size must be a multiple of 16-bits");for(var i=0;i<len;i+=2)swap(this,i,i+1);return this},Buffer.prototype.swap32=function(){var len=this.length;if(len%4!==0)throw new RangeError("Buffer size must be a multiple of 32-bits");for(var i=0;i<len;i+=4)swap(this,i,i+3),swap(this,i+1,i+2);return this;
},Buffer.prototype.swap64=function(){var len=this.length;if(len%8!==0)throw new RangeError("Buffer size must be a multiple of 64-bits");for(var i=0;i<len;i+=8)swap(this,i,i+7),swap(this,i+1,i+6),swap(this,i+2,i+5),swap(this,i+3,i+4);return this},Buffer.prototype.toString=function(){var length=0|this.length;return 0===length?"":0===arguments.length?utf8Slice(this,0,length):slowToString.apply(this,arguments)},Buffer.prototype.equals=function(b){if(!Buffer.isBuffer(b))throw new TypeError("Argument must be a Buffer");return this===b||0===Buffer.compare(this,b)},Buffer.prototype.inspect=function(){var str="",max=exports.INSPECT_MAX_BYTES;return this.length>0&&(str=this.toString("hex",0,max).match(/.{2}/g).join(" "),this.length>max&&(str+=" ... ")),"<Buffer "+str+">"},Buffer.prototype.compare=function(target,start,end,thisStart,thisEnd){if(!Buffer.isBuffer(target))throw new TypeError("Argument must be a Buffer");if(void 0===start&&(start=0),void 0===end&&(end=target?target.length:0),void 0===thisStart&&(thisStart=0),void 0===thisEnd&&(thisEnd=this.length),start<0||end>target.length||thisStart<0||thisEnd>this.length)throw new RangeError("out of range index");if(thisStart>=thisEnd&&start>=end)return 0;if(thisStart>=thisEnd)return-1;if(start>=end)return 1;if(start>>>=0,end>>>=0,thisStart>>>=0,thisEnd>>>=0,this===target)return 0;for(var x=thisEnd-thisStart,y=end-start,len=Math.min(x,y),thisCopy=this.slice(thisStart,thisEnd),targetCopy=target.slice(start,end),i=0;i<len;++i)if(thisCopy[i]!==targetCopy[i]){x=thisCopy[i],y=targetCopy[i];break}return x<y?-1:y<x?1:0},Buffer.prototype.includes=function(val,byteOffset,encoding){return this.indexOf(val,byteOffset,encoding)!==-1},Buffer.prototype.indexOf=function(val,byteOffset,encoding){return bidirectionalIndexOf(this,val,byteOffset,encoding,!0)},Buffer.prototype.lastIndexOf=function(val,byteOffset,encoding){return bidirectionalIndexOf(this,val,byteOffset,encoding,!1)},Buffer.prototype.write=function(string,offset,length,encoding){if(void 0===offset)encoding="utf8",length=this.length,offset=0;else if(void 0===length&&"string"==typeof offset)encoding=offset,length=this.length,offset=0;else{if(!isFinite(offset))throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");offset=0|offset,isFinite(length)?(length=0|length,void 0===encoding&&(encoding="utf8")):(encoding=length,length=void 0)}var remaining=this.length-offset;if((void 0===length||length>remaining)&&(length=remaining),string.length>0&&(length<0||offset<0)||offset>this.length)throw new RangeError("Attempt to write outside buffer bounds");encoding||(encoding="utf8");for(var loweredCase=!1;;)switch(encoding){case"hex":return hexWrite(this,string,offset,length);case"utf8":case"utf-8":return utf8Write(this,string,offset,length);case"ascii":return asciiWrite(this,string,offset,length);case"latin1":case"binary":return latin1Write(this,string,offset,length);case"base64":return base64Write(this,string,offset,length);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return ucs2Write(this,string,offset,length);default:if(loweredCase)throw new TypeError("Unknown encoding: "+encoding);encoding=(""+encoding).toLowerCase(),loweredCase=!0}},Buffer.prototype.toJSON=function(){return{type:"Buffer",data:Array.prototype.slice.call(this._arr||this,0)}};var MAX_ARGUMENTS_LENGTH=4096;Buffer.prototype.slice=function(start,end){var len=this.length;start=~~start,end=void 0===end?len:~~end,start<0?(start+=len,start<0&&(start=0)):start>len&&(start=len),end<0?(end+=len,end<0&&(end=0)):end>len&&(end=len),end<start&&(end=start);var newBuf;if(Buffer.TYPED_ARRAY_SUPPORT)newBuf=this.subarray(start,end),newBuf.__proto__=Buffer.prototype;else{var sliceLen=end-start;newBuf=new Buffer(sliceLen,(void 0));for(var i=0;i<sliceLen;++i)newBuf[i]=this[i+start]}return newBuf},Buffer.prototype.readUIntLE=function(offset,byteLength,noAssert){offset=0|offset,byteLength=0|byteLength,noAssert||checkOffset(offset,byteLength,this.length);for(var val=this[offset],mul=1,i=0;++i<byteLength&&(mul*=256);)val+=this[offset+i]*mul;return val},Buffer.prototype.readUIntBE=function(offset,byteLength,noAssert){offset=0|offset,byteLength=0|byteLength,noAssert||checkOffset(offset,byteLength,this.length);for(var val=this[offset+--byteLength],mul=1;byteLength>0&&(mul*=256);)val+=this[offset+--byteLength]*mul;return val},Buffer.prototype.readUInt8=function(offset,noAssert){return noAssert||checkOffset(offset,1,this.length),this[offset]},Buffer.prototype.readUInt16LE=function(offset,noAssert){return noAssert||checkOffset(offset,2,this.length),this[offset]|this[offset+1]<<8},Buffer.prototype.readUInt16BE=function(offset,noAssert){return noAssert||checkOffset(offset,2,this.length),this[offset]<<8|this[offset+1]},Buffer.prototype.readUInt32LE=function(offset,noAssert){return noAssert||checkOffset(offset,4,this.length),(this[offset]|this[offset+1]<<8|this[offset+2]<<16)+16777216*this[offset+3]},Buffer.prototype.readUInt32BE=function(offset,noAssert){return noAssert||checkOffset(offset,4,this.length),16777216*this[offset]+(this[offset+1]<<16|this[offset+2]<<8|this[offset+3])},Buffer.prototype.readIntLE=function(offset,byteLength,noAssert){offset=0|offset,byteLength=0|byteLength,noAssert||checkOffset(offset,byteLength,this.length);for(var val=this[offset],mul=1,i=0;++i<byteLength&&(mul*=256);)val+=this[offset+i]*mul;return mul*=128,val>=mul&&(val-=Math.pow(2,8*byteLength)),val},Buffer.prototype.readIntBE=function(offset,byteLength,noAssert){offset=0|offset,byteLength=0|byteLength,noAssert||checkOffset(offset,byteLength,this.length);for(var i=byteLength,mul=1,val=this[offset+--i];i>0&&(mul*=256);)val+=this[offset+--i]*mul;return mul*=128,val>=mul&&(val-=Math.pow(2,8*byteLength)),val},Buffer.prototype.readInt8=function(offset,noAssert){return noAssert||checkOffset(offset,1,this.length),128&this[offset]?(255-this[offset]+1)*-1:this[offset]},Buffer.prototype.readInt16LE=function(offset,noAssert){noAssert||checkOffset(offset,2,this.length);var val=this[offset]|this[offset+1]<<8;return 32768&val?4294901760|val:val},Buffer.prototype.readInt16BE=function(offset,noAssert){noAssert||checkOffset(offset,2,this.length);var val=this[offset+1]|this[offset]<<8;return 32768&val?4294901760|val:val},Buffer.prototype.readInt32LE=function(offset,noAssert){return noAssert||checkOffset(offset,4,this.length),this[offset]|this[offset+1]<<8|this[offset+2]<<16|this[offset+3]<<24},Buffer.prototype.readInt32BE=function(offset,noAssert){return noAssert||checkOffset(offset,4,this.length),this[offset]<<24|this[offset+1]<<16|this[offset+2]<<8|this[offset+3]},Buffer.prototype.readFloatLE=function(offset,noAssert){return noAssert||checkOffset(offset,4,this.length),ieee754.read(this,offset,!0,23,4)},Buffer.prototype.readFloatBE=function(offset,noAssert){return noAssert||checkOffset(offset,4,this.length),ieee754.read(this,offset,!1,23,4)},Buffer.prototype.readDoubleLE=function(offset,noAssert){return noAssert||checkOffset(offset,8,this.length),ieee754.read(this,offset,!0,52,8)},Buffer.prototype.readDoubleBE=function(offset,noAssert){return noAssert||checkOffset(offset,8,this.length),ieee754.read(this,offset,!1,52,8)},Buffer.prototype.writeUIntLE=function(value,offset,byteLength,noAssert){if(value=+value,offset=0|offset,byteLength=0|byteLength,!noAssert){var maxBytes=Math.pow(2,8*byteLength)-1;checkInt(this,value,offset,byteLength,maxBytes,0)}var mul=1,i=0;for(this[offset]=255&value;++i<byteLength&&(mul*=256);)this[offset+i]=value/mul&255;return offset+byteLength},Buffer.prototype.writeUIntBE=function(value,offset,byteLength,noAssert){if(value=+value,offset=0|offset,byteLength=0|byteLength,!noAssert){var maxBytes=Math.pow(2,8*byteLength)-1;checkInt(this,value,offset,byteLength,maxBytes,0)}var i=byteLength-1,mul=1;for(this[offset+i]=255&value;--i>=0&&(mul*=256);)this[offset+i]=value/mul&255;return offset+byteLength},Buffer.prototype.writeUInt8=function(value,offset,noAssert){return value=+value,offset=0|offset,noAssert||checkInt(this,value,offset,1,255,0),Buffer.TYPED_ARRAY_SUPPORT||(value=Math.floor(value)),this[offset]=255&value,offset+1},Buffer.prototype.writeUInt16LE=function(value,offset,noAssert){return value=+value,offset=0|offset,noAssert||checkInt(this,value,offset,2,65535,0),Buffer.TYPED_ARRAY_SUPPORT?(this[offset]=255&value,this[offset+1]=value>>>8):objectWriteUInt16(this,value,offset,!0),offset+2},Buffer.prototype.writeUInt16BE=function(value,offset,noAssert){return value=+value,offset=0|offset,noAssert||checkInt(this,value,offset,2,65535,0),Buffer.TYPED_ARRAY_SUPPORT?(this[offset]=value>>>8,this[offset+1]=255&value):objectWriteUInt16(this,value,offset,!1),offset+2},Buffer.prototype.writeUInt32LE=function(value,offset,noAssert){return value=+value,offset=0|offset,noAssert||checkInt(this,value,offset,4,4294967295,0),Buffer.TYPED_ARRAY_SUPPORT?(this[offset+3]=value>>>24,this[offset+2]=value>>>16,this[offset+1]=value>>>8,this[offset]=255&value):objectWriteUInt32(this,value,offset,!0),offset+4},Buffer.prototype.writeUInt32BE=function(value,offset,noAssert){return value=+value,offset=0|offset,noAssert||checkInt(this,value,offset,4,4294967295,0),Buffer.TYPED_ARRAY_SUPPORT?(this[offset]=value>>>24,this[offset+1]=value>>>16,this[offset+2]=value>>>8,this[offset+3]=255&value):objectWriteUInt32(this,value,offset,!1),offset+4},Buffer.prototype.writeIntLE=function(value,offset,byteLength,noAssert){if(value=+value,offset=0|offset,!noAssert){var limit=Math.pow(2,8*byteLength-1);checkInt(this,value,offset,byteLength,limit-1,-limit)}var i=0,mul=1,sub=0;for(this[offset]=255&value;++i<byteLength&&(mul*=256);)value<0&&0===sub&&0!==this[offset+i-1]&&(sub=1),this[offset+i]=(value/mul>>0)-sub&255;return offset+byteLength},Buffer.prototype.writeIntBE=function(value,offset,byteLength,noAssert){if(value=+value,offset=0|offset,!noAssert){var limit=Math.pow(2,8*byteLength-1);checkInt(this,value,offset,byteLength,limit-1,-limit)}var i=byteLength-1,mul=1,sub=0;for(this[offset+i]=255&value;--i>=0&&(mul*=256);)value<0&&0===sub&&0!==this[offset+i+1]&&(sub=1),this[offset+i]=(value/mul>>0)-sub&255;return offset+byteLength},Buffer.prototype.writeInt8=function(value,offset,noAssert){return value=+value,offset=0|offset,noAssert||checkInt(this,value,offset,1,127,-128),Buffer.TYPED_ARRAY_SUPPORT||(value=Math.floor(value)),value<0&&(value=255+value+1),this[offset]=255&value,offset+1},Buffer.prototype.writeInt16LE=function(value,offset,noAssert){return value=+value,offset=0|offset,noAssert||checkInt(this,value,offset,2,32767,-32768),Buffer.TYPED_ARRAY_SUPPORT?(this[offset]=255&value,this[offset+1]=value>>>8):objectWriteUInt16(this,value,offset,!0),offset+2},Buffer.prototype.writeInt16BE=function(value,offset,noAssert){return value=+value,offset=0|offset,noAssert||checkInt(this,value,offset,2,32767,-32768),Buffer.TYPED_ARRAY_SUPPORT?(this[offset]=value>>>8,this[offset+1]=255&value):objectWriteUInt16(this,value,offset,!1),offset+2},Buffer.prototype.writeInt32LE=function(value,offset,noAssert){return value=+value,offset=0|offset,noAssert||checkInt(this,value,offset,4,2147483647,-2147483648),Buffer.TYPED_ARRAY_SUPPORT?(this[offset]=255&value,this[offset+1]=value>>>8,this[offset+2]=value>>>16,this[offset+3]=value>>>24):objectWriteUInt32(this,value,offset,!0),offset+4},Buffer.prototype.writeInt32BE=function(value,offset,noAssert){return value=+value,offset=0|offset,noAssert||checkInt(this,value,offset,4,2147483647,-2147483648),value<0&&(value=4294967295+value+1),Buffer.TYPED_ARRAY_SUPPORT?(this[offset]=value>>>24,this[offset+1]=value>>>16,this[offset+2]=value>>>8,this[offset+3]=255&value):objectWriteUInt32(this,value,offset,!1),offset+4},Buffer.prototype.writeFloatLE=function(value,offset,noAssert){return writeFloat(this,value,offset,!0,noAssert)},Buffer.prototype.writeFloatBE=function(value,offset,noAssert){return writeFloat(this,value,offset,!1,noAssert)},Buffer.prototype.writeDoubleLE=function(value,offset,noAssert){return writeDouble(this,value,offset,!0,noAssert)},Buffer.prototype.writeDoubleBE=function(value,offset,noAssert){return writeDouble(this,value,offset,!1,noAssert)},Buffer.prototype.copy=function(target,targetStart,start,end){if(start||(start=0),end||0===end||(end=this.length),targetStart>=target.length&&(targetStart=target.length),targetStart||(targetStart=0),end>0&&end<start&&(end=start),end===start)return 0;if(0===target.length||0===this.length)return 0;if(targetStart<0)throw new RangeError("targetStart out of bounds");if(start<0||start>=this.length)throw new RangeError("sourceStart out of bounds");if(end<0)throw new RangeError("sourceEnd out of bounds");end>this.length&&(end=this.length),target.length-targetStart<end-start&&(end=target.length-targetStart+start);var i,len=end-start;if(this===target&&start<targetStart&&targetStart<end)for(i=len-1;i>=0;--i)target[i+targetStart]=this[i+start];else if(len<1e3||!Buffer.TYPED_ARRAY_SUPPORT)for(i=0;i<len;++i)target[i+targetStart]=this[i+start];else Uint8Array.prototype.set.call(target,this.subarray(start,start+len),targetStart);return len},Buffer.prototype.fill=function(val,start,end,encoding){if("string"==typeof val){if("string"==typeof start?(encoding=start,start=0,end=this.length):"string"==typeof end&&(encoding=end,end=this.length),1===val.length){var code=val.charCodeAt(0);code<256&&(val=code)}if(void 0!==encoding&&"string"!=typeof encoding)throw new TypeError("encoding must be a string");if("string"==typeof encoding&&!Buffer.isEncoding(encoding))throw new TypeError("Unknown encoding: "+encoding)}else"number"==typeof val&&(val=255&val);if(start<0||this.length<start||this.length<end)throw new RangeError("Out of range index");if(end<=start)return this;start>>>=0,end=void 0===end?this.length:end>>>0,val||(val=0);var i;if("number"==typeof val)for(i=start;i<end;++i)this[i]=val;else{var bytes=Buffer.isBuffer(val)?val:utf8ToBytes(new Buffer(val,encoding).toString()),len=bytes.length;for(i=0;i<end-start;++i)this[i+start]=bytes[i%len]}return this};var INVALID_BASE64_RE=/[^+\/0-9A-Za-z-_]/g}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"base64-js":2,ieee754:10,isarray:13}],6:[function(require,module,exports){module.exports={100:"Continue",101:"Switching Protocols",102:"Processing",200:"OK",201:"Created",202:"Accepted",203:"Non-Authoritative Information",204:"No Content",205:"Reset Content",206:"Partial Content",207:"Multi-Status",208:"Already Reported",226:"IM Used",300:"Multiple Choices",301:"Moved Permanently",302:"Found",303:"See Other",304:"Not Modified",305:"Use Proxy",307:"Temporary Redirect",308:"Permanent Redirect",400:"Bad Request",401:"Unauthorized",402:"Payment Required",403:"Forbidden",404:"Not Found",405:"Method Not Allowed",406:"Not Acceptable",407:"Proxy Authentication Required",408:"Request Timeout",409:"Conflict",410:"Gone",411:"Length Required",412:"Precondition Failed",413:"Payload Too Large",414:"URI Too Long",415:"Unsupported Media Type",416:"Range Not Satisfiable",417:"Expectation Failed",418:"I'm a teapot",421:"Misdirected Request",422:"Unprocessable Entity",423:"Locked",424:"Failed Dependency",425:"Unordered Collection",426:"Upgrade Required",428:"Precondition Required",429:"Too Many Requests",431:"Request Header Fields Too Large",451:"Unavailable For Legal Reasons",500:"Internal Server Error",501:"Not Implemented",502:"Bad Gateway",503:"Service Unavailable",504:"Gateway Timeout",505:"HTTP Version Not Supported",506:"Variant Also Negotiates",507:"Insufficient Storage",508:"Loop Detected",509:"Bandwidth Limit Exceeded",510:"Not Extended",511:"Network Authentication Required"}},{}],7:[function(require,module,exports){(function(Buffer){function isArray(arg){return Array.isArray?Array.isArray(arg):"[object Array]"===objectToString(arg)}function isBoolean(arg){return"boolean"==typeof arg}function isNull(arg){return null===arg}function isNullOrUndefined(arg){return null==arg}function isNumber(arg){return"number"==typeof arg}function isString(arg){return"string"==typeof arg}function isSymbol(arg){return"symbol"==typeof arg}function isUndefined(arg){return void 0===arg}function isRegExp(re){return"[object RegExp]"===objectToString(re)}function isObject(arg){return"object"==typeof arg&&null!==arg}function isDate(d){return"[object Date]"===objectToString(d)}function isError(e){return"[object Error]"===objectToString(e)||e instanceof Error}function isFunction(arg){return"function"==typeof arg}function isPrimitive(arg){return null===arg||"boolean"==typeof arg||"number"==typeof arg||"string"==typeof arg||"symbol"==typeof arg||"undefined"==typeof arg}function objectToString(o){return Object.prototype.toString.call(o)}exports.isArray=isArray,exports.isBoolean=isBoolean,exports.isNull=isNull,exports.isNullOrUndefined=isNullOrUndefined,exports.isNumber=isNumber,exports.isString=isString,exports.isSymbol=isSymbol,exports.isUndefined=isUndefined,exports.isRegExp=isRegExp,exports.isObject=isObject,exports.isDate=isDate,exports.isError=isError,exports.isFunction=isFunction,exports.isPrimitive=isPrimitive,exports.isBuffer=Buffer.isBuffer}).call(this,{isBuffer:require("../../is-buffer/index.js")})},{"../../is-buffer/index.js":12}],8:[function(require,module,exports){function EventEmitter(){this._events=this._events||{},this._maxListeners=this._maxListeners||void 0}function isFunction(arg){return"function"==typeof arg}function isNumber(arg){return"number"==typeof arg}function isObject(arg){return"object"==typeof arg&&null!==arg}function isUndefined(arg){return void 0===arg}module.exports=EventEmitter,EventEmitter.EventEmitter=EventEmitter,EventEmitter.prototype._events=void 0,EventEmitter.prototype._maxListeners=void 0,EventEmitter.defaultMaxListeners=10,EventEmitter.prototype.setMaxListeners=function(n){if(!isNumber(n)||n<0||isNaN(n))throw TypeError("n must be a positive number");return this._maxListeners=n,this},EventEmitter.prototype.emit=function(type){var er,handler,len,args,i,listeners;if(this._events||(this._events={}),"error"===type&&(!this._events.error||isObject(this._events.error)&&!this._events.error.length)){if(er=arguments[1],er instanceof Error)throw er;var err=new Error('Uncaught, unspecified "error" event. ('+er+")");throw err.context=er,err}if(handler=this._events[type],isUndefined(handler))return!1;if(isFunction(handler))switch(arguments.length){case 1:handler.call(this);break;case 2:handler.call(this,arguments[1]);break;case 3:handler.call(this,arguments[1],arguments[2]);break;default:args=Array.prototype.slice.call(arguments,1),handler.apply(this,args)}else if(isObject(handler))for(args=Array.prototype.slice.call(arguments,1),listeners=handler.slice(),len=listeners.length,i=0;i<len;i++)listeners[i].apply(this,args);return!0},EventEmitter.prototype.addListener=function(type,listener){var m;if(!isFunction(listener))throw TypeError("listener must be a function");return this._events||(this._events={}),this._events.newListener&&this.emit("newListener",type,isFunction(listener.listener)?listener.listener:listener),this._events[type]?isObject(this._events[type])?this._events[type].push(listener):this._events[type]=[this._events[type],listener]:this._events[type]=listener,isObject(this._events[type])&&!this._events[type].warned&&(m=isUndefined(this._maxListeners)?EventEmitter.defaultMaxListeners:this._maxListeners,m&&m>0&&this._events[type].length>m&&(this._events[type].warned=!0,console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.",this._events[type].length),"function"==typeof console.trace&&console.trace())),this},EventEmitter.prototype.on=EventEmitter.prototype.addListener,EventEmitter.prototype.once=function(type,listener){function g(){this.removeListener(type,g),fired||(fired=!0,listener.apply(this,arguments))}if(!isFunction(listener))throw TypeError("listener must be a function");var fired=!1;return g.listener=listener,this.on(type,g),this},EventEmitter.prototype.removeListener=function(type,listener){var list,position,length,i;if(!isFunction(listener))throw TypeError("listener must be a function");if(!this._events||!this._events[type])return this;if(list=this._events[type],length=list.length,position=-1,list===listener||isFunction(list.listener)&&list.listener===listener)delete this._events[type],this._events.removeListener&&this.emit("removeListener",type,listener);else if(isObject(list)){for(i=length;i-- >0;)if(list[i]===listener||list[i].listener&&list[i].listener===listener){position=i;break}if(position<0)return this;1===list.length?(list.length=0,delete this._events[type]):list.splice(position,1),this._events.removeListener&&this.emit("removeListener",type,listener)}return this},EventEmitter.prototype.removeAllListeners=function(type){var key,listeners;if(!this._events)return this;if(!this._events.removeListener)return 0===arguments.length?this._events={}:this._events[type]&&delete this._events[type],this;if(0===arguments.length){for(key in this._events)"removeListener"!==key&&this.removeAllListeners(key);return this.removeAllListeners("removeListener"),this._events={},this}if(listeners=this._events[type],isFunction(listeners))this.removeListener(type,listeners);else if(listeners)for(;listeners.length;)this.removeListener(type,listeners[listeners.length-1]);return delete this._events[type],this},EventEmitter.prototype.listeners=function(type){var ret;return ret=this._events&&this._events[type]?isFunction(this._events[type])?[this._events[type]]:this._events[type].slice():[]},EventEmitter.prototype.listenerCount=function(type){if(this._events){var evlistener=this._events[type];if(isFunction(evlistener))return 1;if(evlistener)return evlistener.length}return 0},EventEmitter.listenerCount=function(emitter,type){return emitter.listenerCount(type)}},{}],9:[function(require,module,exports){var http=require("http"),https=module.exports;for(var key in http)http.hasOwnProperty(key)&&(https[key]=http[key]);https.request=function(params,cb){return params||(params={}),params.scheme="https",params.protocol="https:",http.request.call(this,params,cb)}},{http:27}],10:[function(require,module,exports){exports.read=function(buffer,offset,isLE,mLen,nBytes){var e,m,eLen=8*nBytes-mLen-1,eMax=(1<<eLen)-1,eBias=eMax>>1,nBits=-7,i=isLE?nBytes-1:0,d=isLE?-1:1,s=buffer[offset+i];for(i+=d,e=s&(1<<-nBits)-1,s>>=-nBits,nBits+=eLen;nBits>0;e=256*e+buffer[offset+i],i+=d,nBits-=8);for(m=e&(1<<-nBits)-1,e>>=-nBits,nBits+=mLen;nBits>0;m=256*m+buffer[offset+i],i+=d,nBits-=8);if(0===e)e=1-eBias;else{if(e===eMax)return m?NaN:(s?-1:1)*(1/0);m+=Math.pow(2,mLen),e-=eBias}return(s?-1:1)*m*Math.pow(2,e-mLen)},exports.write=function(buffer,value,offset,isLE,mLen,nBytes){var e,m,c,eLen=8*nBytes-mLen-1,eMax=(1<<eLen)-1,eBias=eMax>>1,rt=23===mLen?Math.pow(2,-24)-Math.pow(2,-77):0,i=isLE?0:nBytes-1,d=isLE?1:-1,s=value<0||0===value&&1/value<0?1:0;for(value=Math.abs(value),isNaN(value)||value===1/0?(m=isNaN(value)?1:0,e=eMax):(e=Math.floor(Math.log(value)/Math.LN2),value*(c=Math.pow(2,-e))<1&&(e--,c*=2),value+=e+eBias>=1?rt/c:rt*Math.pow(2,1-eBias),value*c>=2&&(e++,c/=2),e+eBias>=eMax?(m=0,e=eMax):e+eBias>=1?(m=(value*c-1)*Math.pow(2,mLen),e+=eBias):(m=value*Math.pow(2,eBias-1)*Math.pow(2,mLen),e=0));mLen>=8;buffer[offset+i]=255&m,i+=d,m/=256,mLen-=8);for(e=e<<mLen|m,eLen+=mLen;eLen>0;buffer[offset+i]=255&e,i+=d,e/=256,eLen-=8);buffer[offset+i-d]|=128*s}},{}],11:[function(require,module,exports){"function"==typeof Object.create?module.exports=function(ctor,superCtor){ctor.super_=superCtor,ctor.prototype=Object.create(superCtor.prototype,{constructor:{value:ctor,enumerable:!1,writable:!0,configurable:!0}})}:module.exports=function(ctor,superCtor){ctor.super_=superCtor;var TempCtor=function(){};TempCtor.prototype=superCtor.prototype,ctor.prototype=new TempCtor,ctor.prototype.constructor=ctor}},{}],12:[function(require,module,exports){function isBuffer(obj){return!!obj.constructor&&"function"==typeof obj.constructor.isBuffer&&obj.constructor.isBuffer(obj)}function isSlowBuffer(obj){return"function"==typeof obj.readFloatLE&&"function"==typeof obj.slice&&isBuffer(obj.slice(0,0))}module.exports=function(obj){return null!=obj&&(isBuffer(obj)||isSlowBuffer(obj)||!!obj._isBuffer)}},{}],13:[function(require,module,exports){var toString={}.toString;module.exports=Array.isArray||function(arr){return"[object Array]"==toString.call(arr)}},{}],14:[function(require,module,exports){(function(process){"use strict";function nextTick(fn,arg1,arg2,arg3){if("function"!=typeof fn)throw new TypeError('"callback" argument must be a function');var args,i,len=arguments.length;switch(len){case 0:case 1:return process.nextTick(fn);case 2:return process.nextTick(function(){fn.call(null,arg1)});case 3:return process.nextTick(function(){fn.call(null,arg1,arg2)});case 4:return process.nextTick(function(){fn.call(null,arg1,arg2,arg3)});default:for(args=new Array(len-1),i=0;i<args.length;)args[i++]=arguments[i];return process.nextTick(function(){fn.apply(null,args)})}}!process.version||0===process.version.indexOf("v0.")||0===process.version.indexOf("v1.")&&0!==process.version.indexOf("v1.8.")?module.exports=nextTick:module.exports=process.nextTick}).call(this,require("_process"))},{_process:15}],15:[function(require,module,exports){function defaultSetTimout(){throw new Error("setTimeout has not been defined")}function defaultClearTimeout(){throw new Error("clearTimeout has not been defined")}function runTimeout(fun){if(cachedSetTimeout===setTimeout)return setTimeout(fun,0);if((cachedSetTimeout===defaultSetTimout||!cachedSetTimeout)&&setTimeout)return cachedSetTimeout=setTimeout,setTimeout(fun,0);try{return cachedSetTimeout(fun,0)}catch(e){try{return cachedSetTimeout.call(null,fun,0)}catch(e){return cachedSetTimeout.call(this,fun,0)}}}function runClearTimeout(marker){if(cachedClearTimeout===clearTimeout)return clearTimeout(marker);if((cachedClearTimeout===defaultClearTimeout||!cachedClearTimeout)&&clearTimeout)return cachedClearTimeout=clearTimeout,clearTimeout(marker);try{return cachedClearTimeout(marker)}catch(e){try{return cachedClearTimeout.call(null,marker)}catch(e){return cachedClearTimeout.call(this,marker)}}}function cleanUpNextTick(){draining&&currentQueue&&(draining=!1,currentQueue.length?queue=currentQueue.concat(queue):queueIndex=-1,queue.length&&drainQueue())}function drainQueue(){if(!draining){var timeout=runTimeout(cleanUpNextTick);draining=!0;for(var len=queue.length;len;){for(currentQueue=queue,queue=[];++queueIndex<len;)currentQueue&&currentQueue[queueIndex].run();queueIndex=-1,len=queue.length}currentQueue=null,draining=!1,runClearTimeout(timeout)}}function Item(fun,array){this.fun=fun,this.array=array}function noop(){}var cachedSetTimeout,cachedClearTimeout,process=module.exports={};!function(){try{cachedSetTimeout="function"==typeof setTimeout?setTimeout:defaultSetTimout}catch(e){cachedSetTimeout=defaultSetTimout}try{cachedClearTimeout="function"==typeof clearTimeout?clearTimeout:defaultClearTimeout}catch(e){cachedClearTimeout=defaultClearTimeout}}();var currentQueue,queue=[],draining=!1,queueIndex=-1;process.nextTick=function(fun){var args=new Array(arguments.length-1);if(arguments.length>1)for(var i=1;i<arguments.length;i++)args[i-1]=arguments[i];queue.push(new Item(fun,args)),1!==queue.length||draining||runTimeout(drainQueue)},Item.prototype.run=function(){this.fun.apply(null,this.array)},process.title="browser",process.browser=!0,process.env={},process.argv=[],process.version="",process.versions={},process.on=noop,process.addListener=noop,process.once=noop,process.off=noop,process.removeListener=noop,process.removeAllListeners=noop,process.emit=noop,process.binding=function(name){throw new Error("process.binding is not supported")},process.cwd=function(){return"/"},process.chdir=function(dir){throw new Error("process.chdir is not supported")},process.umask=function(){return 0}},{}],16:[function(require,module,exports){(function(global){!function(root){function error(type){throw new RangeError(errors[type])}function map(array,fn){for(var length=array.length,result=[];length--;)result[length]=fn(array[length]);return result}function mapDomain(string,fn){var parts=string.split("@"),result="";parts.length>1&&(result=parts[0]+"@",string=parts[1]),string=string.replace(regexSeparators,".");var labels=string.split("."),encoded=map(labels,fn).join(".");return result+encoded}function ucs2decode(string){for(var value,extra,output=[],counter=0,length=string.length;counter<length;)value=string.charCodeAt(counter++),value>=55296&&value<=56319&&counter<length?(extra=string.charCodeAt(counter++),56320==(64512&extra)?output.push(((1023&value)<<10)+(1023&extra)+65536):(output.push(value),counter--)):output.push(value);return output}function ucs2encode(array){return map(array,function(value){var output="";return value>65535&&(value-=65536,output+=stringFromCharCode(value>>>10&1023|55296),value=56320|1023&value),output+=stringFromCharCode(value)}).join("")}function basicToDigit(codePoint){return codePoint-48<10?codePoint-22:codePoint-65<26?codePoint-65:codePoint-97<26?codePoint-97:base}function digitToBasic(digit,flag){return digit+22+75*(digit<26)-((0!=flag)<<5)}function adapt(delta,numPoints,firstTime){var k=0;for(delta=firstTime?floor(delta/damp):delta>>1,delta+=floor(delta/numPoints);delta>baseMinusTMin*tMax>>1;k+=base)delta=floor(delta/baseMinusTMin);return floor(k+(baseMinusTMin+1)*delta/(delta+skew))}function decode(input){var out,basic,j,index,oldi,w,k,digit,t,baseMinusT,output=[],inputLength=input.length,i=0,n=initialN,bias=initialBias;for(basic=input.lastIndexOf(delimiter),basic<0&&(basic=0),j=0;j<basic;++j)input.charCodeAt(j)>=128&&error("not-basic"),output.push(input.charCodeAt(j));for(index=basic>0?basic+1:0;index<inputLength;){for(oldi=i,w=1,k=base;index>=inputLength&&error("invalid-input"),digit=basicToDigit(input.charCodeAt(index++)),(digit>=base||digit>floor((maxInt-i)/w))&&error("overflow"),i+=digit*w,t=k<=bias?tMin:k>=bias+tMax?tMax:k-bias,!(digit<t);k+=base)baseMinusT=base-t,w>floor(maxInt/baseMinusT)&&error("overflow"),w*=baseMinusT;out=output.length+1,bias=adapt(i-oldi,out,0==oldi),floor(i/out)>maxInt-n&&error("overflow"),n+=floor(i/out),i%=out,output.splice(i++,0,n)}return ucs2encode(output)}function encode(input){var n,delta,handledCPCount,basicLength,bias,j,m,q,k,t,currentValue,inputLength,handledCPCountPlusOne,baseMinusT,qMinusT,output=[];for(input=ucs2decode(input),inputLength=input.length,n=initialN,delta=0,bias=initialBias,j=0;j<inputLength;++j)currentValue=input[j],currentValue<128&&output.push(stringFromCharCode(currentValue));for(handledCPCount=basicLength=output.length,basicLength&&output.push(delimiter);handledCPCount<inputLength;){for(m=maxInt,j=0;j<inputLength;++j)currentValue=input[j],currentValue>=n&&currentValue<m&&(m=currentValue);for(handledCPCountPlusOne=handledCPCount+1,m-n>floor((maxInt-delta)/handledCPCountPlusOne)&&error("overflow"),delta+=(m-n)*handledCPCountPlusOne,n=m,j=0;j<inputLength;++j)if(currentValue=input[j],currentValue<n&&++delta>maxInt&&error("overflow"),currentValue==n){for(q=delta,k=base;t=k<=bias?tMin:k>=bias+tMax?tMax:k-bias,!(q<t);k+=base)qMinusT=q-t,baseMinusT=base-t,output.push(stringFromCharCode(digitToBasic(t+qMinusT%baseMinusT,0))),q=floor(qMinusT/baseMinusT);output.push(stringFromCharCode(digitToBasic(q,0))),bias=adapt(delta,handledCPCountPlusOne,handledCPCount==basicLength),delta=0,++handledCPCount}++delta,++n}return output.join("")}function toUnicode(input){return mapDomain(input,function(string){return regexPunycode.test(string)?decode(string.slice(4).toLowerCase()):string})}function toASCII(input){return mapDomain(input,function(string){return regexNonASCII.test(string)?"xn--"+encode(string):string})}var freeExports="object"==typeof exports&&exports&&!exports.nodeType&&exports,freeModule="object"==typeof module&&module&&!module.nodeType&&module,freeGlobal="object"==typeof global&&global;freeGlobal.global!==freeGlobal&&freeGlobal.window!==freeGlobal&&freeGlobal.self!==freeGlobal||(root=freeGlobal);
var punycode,key,maxInt=2147483647,base=36,tMin=1,tMax=26,skew=38,damp=700,initialBias=72,initialN=128,delimiter="-",regexPunycode=/^xn--/,regexNonASCII=/[^\x20-\x7E]/,regexSeparators=/[\x2E\u3002\uFF0E\uFF61]/g,errors={overflow:"Overflow: input needs wider integers to process","not-basic":"Illegal input >= 0x80 (not a basic code point)","invalid-input":"Invalid input"},baseMinusTMin=base-tMin,floor=Math.floor,stringFromCharCode=String.fromCharCode;if(punycode={version:"1.4.1",ucs2:{decode:ucs2decode,encode:ucs2encode},decode:decode,encode:encode,toASCII:toASCII,toUnicode:toUnicode},"function"==typeof define&&"object"==typeof define.amd&&define.amd)define("punycode",function(){return punycode});else if(freeExports&&freeModule)if(module.exports==freeExports)freeModule.exports=punycode;else for(key in punycode)punycode.hasOwnProperty(key)&&(freeExports[key]=punycode[key]);else root.punycode=punycode}(this)}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],17:[function(require,module,exports){"use strict";function hasOwnProperty(obj,prop){return Object.prototype.hasOwnProperty.call(obj,prop)}module.exports=function(qs,sep,eq,options){sep=sep||"&",eq=eq||"=";var obj={};if("string"!=typeof qs||0===qs.length)return obj;var regexp=/\+/g;qs=qs.split(sep);var maxKeys=1e3;options&&"number"==typeof options.maxKeys&&(maxKeys=options.maxKeys);var len=qs.length;maxKeys>0&&len>maxKeys&&(len=maxKeys);for(var i=0;i<len;++i){var kstr,vstr,k,v,x=qs[i].replace(regexp,"%20"),idx=x.indexOf(eq);idx>=0?(kstr=x.substr(0,idx),vstr=x.substr(idx+1)):(kstr=x,vstr=""),k=decodeURIComponent(kstr),v=decodeURIComponent(vstr),hasOwnProperty(obj,k)?isArray(obj[k])?obj[k].push(v):obj[k]=[obj[k],v]:obj[k]=v}return obj};var isArray=Array.isArray||function(xs){return"[object Array]"===Object.prototype.toString.call(xs)}},{}],18:[function(require,module,exports){"use strict";function map(xs,f){if(xs.map)return xs.map(f);for(var res=[],i=0;i<xs.length;i++)res.push(f(xs[i],i));return res}var stringifyPrimitive=function(v){switch(typeof v){case"string":return v;case"boolean":return v?"true":"false";case"number":return isFinite(v)?v:"";default:return""}};module.exports=function(obj,sep,eq,name){return sep=sep||"&",eq=eq||"=",null===obj&&(obj=void 0),"object"==typeof obj?map(objectKeys(obj),function(k){var ks=encodeURIComponent(stringifyPrimitive(k))+eq;return isArray(obj[k])?map(obj[k],function(v){return ks+encodeURIComponent(stringifyPrimitive(v))}).join(sep):ks+encodeURIComponent(stringifyPrimitive(obj[k]))}).join(sep):name?encodeURIComponent(stringifyPrimitive(name))+eq+encodeURIComponent(stringifyPrimitive(obj)):""};var isArray=Array.isArray||function(xs){return"[object Array]"===Object.prototype.toString.call(xs)},objectKeys=Object.keys||function(obj){var res=[];for(var key in obj)Object.prototype.hasOwnProperty.call(obj,key)&&res.push(key);return res}},{}],19:[function(require,module,exports){"use strict";exports.decode=exports.parse=require("./decode"),exports.encode=exports.stringify=require("./encode")},{"./decode":17,"./encode":18}],20:[function(require,module,exports){"use strict";function Duplex(options){return this instanceof Duplex?(Readable.call(this,options),Writable.call(this,options),options&&options.readable===!1&&(this.readable=!1),options&&options.writable===!1&&(this.writable=!1),this.allowHalfOpen=!0,options&&options.allowHalfOpen===!1&&(this.allowHalfOpen=!1),void this.once("end",onend)):new Duplex(options)}function onend(){this.allowHalfOpen||this._writableState.ended||processNextTick(onEndNT,this)}function onEndNT(self){self.end()}var objectKeys=Object.keys||function(obj){var keys=[];for(var key in obj)keys.push(key);return keys};module.exports=Duplex;var processNextTick=require("process-nextick-args"),util=require("core-util-is");util.inherits=require("inherits");var Readable=require("./_stream_readable"),Writable=require("./_stream_writable");util.inherits(Duplex,Readable);for(var keys=objectKeys(Writable.prototype),v=0;v<keys.length;v++){var method=keys[v];Duplex.prototype[method]||(Duplex.prototype[method]=Writable.prototype[method])}},{"./_stream_readable":22,"./_stream_writable":24,"core-util-is":7,inherits:11,"process-nextick-args":14}],21:[function(require,module,exports){"use strict";function PassThrough(options){return this instanceof PassThrough?void Transform.call(this,options):new PassThrough(options)}module.exports=PassThrough;var Transform=require("./_stream_transform"),util=require("core-util-is");util.inherits=require("inherits"),util.inherits(PassThrough,Transform),PassThrough.prototype._transform=function(chunk,encoding,cb){cb(null,chunk)}},{"./_stream_transform":23,"core-util-is":7,inherits:11}],22:[function(require,module,exports){(function(process){"use strict";function prependListener(emitter,event,fn){return"function"==typeof emitter.prependListener?emitter.prependListener(event,fn):void(emitter._events&&emitter._events[event]?isArray(emitter._events[event])?emitter._events[event].unshift(fn):emitter._events[event]=[fn,emitter._events[event]]:emitter.on(event,fn))}function ReadableState(options,stream){Duplex=Duplex||require("./_stream_duplex"),options=options||{},this.objectMode=!!options.objectMode,stream instanceof Duplex&&(this.objectMode=this.objectMode||!!options.readableObjectMode);var hwm=options.highWaterMark,defaultHwm=this.objectMode?16:16384;this.highWaterMark=hwm||0===hwm?hwm:defaultHwm,this.highWaterMark=~~this.highWaterMark,this.buffer=new BufferList,this.length=0,this.pipes=null,this.pipesCount=0,this.flowing=null,this.ended=!1,this.endEmitted=!1,this.reading=!1,this.sync=!0,this.needReadable=!1,this.emittedReadable=!1,this.readableListening=!1,this.resumeScheduled=!1,this.defaultEncoding=options.defaultEncoding||"utf8",this.ranOut=!1,this.awaitDrain=0,this.readingMore=!1,this.decoder=null,this.encoding=null,options.encoding&&(StringDecoder||(StringDecoder=require("string_decoder/").StringDecoder),this.decoder=new StringDecoder(options.encoding),this.encoding=options.encoding)}function Readable(options){return Duplex=Duplex||require("./_stream_duplex"),this instanceof Readable?(this._readableState=new ReadableState(options,this),this.readable=!0,options&&"function"==typeof options.read&&(this._read=options.read),void Stream.call(this)):new Readable(options)}function readableAddChunk(stream,state,chunk,encoding,addToFront){var er=chunkInvalid(state,chunk);if(er)stream.emit("error",er);else if(null===chunk)state.reading=!1,onEofChunk(stream,state);else if(state.objectMode||chunk&&chunk.length>0)if(state.ended&&!addToFront){var e=new Error("stream.push() after EOF");stream.emit("error",e)}else if(state.endEmitted&&addToFront){var _e=new Error("stream.unshift() after end event");stream.emit("error",_e)}else{var skipAdd;!state.decoder||addToFront||encoding||(chunk=state.decoder.write(chunk),skipAdd=!state.objectMode&&0===chunk.length),addToFront||(state.reading=!1),skipAdd||(state.flowing&&0===state.length&&!state.sync?(stream.emit("data",chunk),stream.read(0)):(state.length+=state.objectMode?1:chunk.length,addToFront?state.buffer.unshift(chunk):state.buffer.push(chunk),state.needReadable&&emitReadable(stream))),maybeReadMore(stream,state)}else addToFront||(state.reading=!1);return needMoreData(state)}function needMoreData(state){return!state.ended&&(state.needReadable||state.length<state.highWaterMark||0===state.length)}function computeNewHighWaterMark(n){return n>=MAX_HWM?n=MAX_HWM:(n--,n|=n>>>1,n|=n>>>2,n|=n>>>4,n|=n>>>8,n|=n>>>16,n++),n}function howMuchToRead(n,state){return n<=0||0===state.length&&state.ended?0:state.objectMode?1:n!==n?state.flowing&&state.length?state.buffer.head.data.length:state.length:(n>state.highWaterMark&&(state.highWaterMark=computeNewHighWaterMark(n)),n<=state.length?n:state.ended?state.length:(state.needReadable=!0,0))}function chunkInvalid(state,chunk){var er=null;return Buffer.isBuffer(chunk)||"string"==typeof chunk||null===chunk||void 0===chunk||state.objectMode||(er=new TypeError("Invalid non-string/buffer chunk")),er}function onEofChunk(stream,state){if(!state.ended){if(state.decoder){var chunk=state.decoder.end();chunk&&chunk.length&&(state.buffer.push(chunk),state.length+=state.objectMode?1:chunk.length)}state.ended=!0,emitReadable(stream)}}function emitReadable(stream){var state=stream._readableState;state.needReadable=!1,state.emittedReadable||(debug("emitReadable",state.flowing),state.emittedReadable=!0,state.sync?processNextTick(emitReadable_,stream):emitReadable_(stream))}function emitReadable_(stream){debug("emit readable"),stream.emit("readable"),flow(stream)}function maybeReadMore(stream,state){state.readingMore||(state.readingMore=!0,processNextTick(maybeReadMore_,stream,state))}function maybeReadMore_(stream,state){for(var len=state.length;!state.reading&&!state.flowing&&!state.ended&&state.length<state.highWaterMark&&(debug("maybeReadMore read 0"),stream.read(0),len!==state.length);)len=state.length;state.readingMore=!1}function pipeOnDrain(src){return function(){var state=src._readableState;debug("pipeOnDrain",state.awaitDrain),state.awaitDrain&&state.awaitDrain--,0===state.awaitDrain&&EElistenerCount(src,"data")&&(state.flowing=!0,flow(src))}}function nReadingNextTick(self){debug("readable nexttick read 0"),self.read(0)}function resume(stream,state){state.resumeScheduled||(state.resumeScheduled=!0,processNextTick(resume_,stream,state))}function resume_(stream,state){state.reading||(debug("resume read 0"),stream.read(0)),state.resumeScheduled=!1,state.awaitDrain=0,stream.emit("resume"),flow(stream),state.flowing&&!state.reading&&stream.read(0)}function flow(stream){var state=stream._readableState;for(debug("flow",state.flowing);state.flowing&&null!==stream.read(););}function fromList(n,state){if(0===state.length)return null;var ret;return state.objectMode?ret=state.buffer.shift():!n||n>=state.length?(ret=state.decoder?state.buffer.join(""):1===state.buffer.length?state.buffer.head.data:state.buffer.concat(state.length),state.buffer.clear()):ret=fromListPartial(n,state.buffer,state.decoder),ret}function fromListPartial(n,list,hasStrings){var ret;return n<list.head.data.length?(ret=list.head.data.slice(0,n),list.head.data=list.head.data.slice(n)):ret=n===list.head.data.length?list.shift():hasStrings?copyFromBufferString(n,list):copyFromBuffer(n,list),ret}function copyFromBufferString(n,list){var p=list.head,c=1,ret=p.data;for(n-=ret.length;p=p.next;){var str=p.data,nb=n>str.length?str.length:n;if(ret+=nb===str.length?str:str.slice(0,n),n-=nb,0===n){nb===str.length?(++c,p.next?list.head=p.next:list.head=list.tail=null):(list.head=p,p.data=str.slice(nb));break}++c}return list.length-=c,ret}function copyFromBuffer(n,list){var ret=bufferShim.allocUnsafe(n),p=list.head,c=1;for(p.data.copy(ret),n-=p.data.length;p=p.next;){var buf=p.data,nb=n>buf.length?buf.length:n;if(buf.copy(ret,ret.length-n,0,nb),n-=nb,0===n){nb===buf.length?(++c,p.next?list.head=p.next:list.head=list.tail=null):(list.head=p,p.data=buf.slice(nb));break}++c}return list.length-=c,ret}function endReadable(stream){var state=stream._readableState;if(state.length>0)throw new Error('"endReadable()" called on non-empty stream');state.endEmitted||(state.ended=!0,processNextTick(endReadableNT,state,stream))}function endReadableNT(state,stream){state.endEmitted||0!==state.length||(state.endEmitted=!0,stream.readable=!1,stream.emit("end"))}function forEach(xs,f){for(var i=0,l=xs.length;i<l;i++)f(xs[i],i)}function indexOf(xs,x){for(var i=0,l=xs.length;i<l;i++)if(xs[i]===x)return i;return-1}module.exports=Readable;var Duplex,processNextTick=require("process-nextick-args"),isArray=require("isarray");Readable.ReadableState=ReadableState;var Stream,EElistenerCount=(require("events").EventEmitter,function(emitter,type){return emitter.listeners(type).length});!function(){try{Stream=require("stream")}catch(_){}finally{Stream||(Stream=require("events").EventEmitter)}}();var Buffer=require("buffer").Buffer,bufferShim=require("buffer-shims"),util=require("core-util-is");util.inherits=require("inherits");var debugUtil=require("util"),debug=void 0;debug=debugUtil&&debugUtil.debuglog?debugUtil.debuglog("stream"):function(){};var StringDecoder,BufferList=require("./internal/streams/BufferList");util.inherits(Readable,Stream),Readable.prototype.push=function(chunk,encoding){var state=this._readableState;return state.objectMode||"string"!=typeof chunk||(encoding=encoding||state.defaultEncoding,encoding!==state.encoding&&(chunk=bufferShim.from(chunk,encoding),encoding="")),readableAddChunk(this,state,chunk,encoding,!1)},Readable.prototype.unshift=function(chunk){var state=this._readableState;return readableAddChunk(this,state,chunk,"",!0)},Readable.prototype.isPaused=function(){return this._readableState.flowing===!1},Readable.prototype.setEncoding=function(enc){return StringDecoder||(StringDecoder=require("string_decoder/").StringDecoder),this._readableState.decoder=new StringDecoder(enc),this._readableState.encoding=enc,this};var MAX_HWM=8388608;Readable.prototype.read=function(n){debug("read",n),n=parseInt(n,10);var state=this._readableState,nOrig=n;if(0!==n&&(state.emittedReadable=!1),0===n&&state.needReadable&&(state.length>=state.highWaterMark||state.ended))return debug("read: emitReadable",state.length,state.ended),0===state.length&&state.ended?endReadable(this):emitReadable(this),null;if(n=howMuchToRead(n,state),0===n&&state.ended)return 0===state.length&&endReadable(this),null;var doRead=state.needReadable;debug("need readable",doRead),(0===state.length||state.length-n<state.highWaterMark)&&(doRead=!0,debug("length less than watermark",doRead)),state.ended||state.reading?(doRead=!1,debug("reading or ended",doRead)):doRead&&(debug("do read"),state.reading=!0,state.sync=!0,0===state.length&&(state.needReadable=!0),this._read(state.highWaterMark),state.sync=!1,state.reading||(n=howMuchToRead(nOrig,state)));var ret;return ret=n>0?fromList(n,state):null,null===ret?(state.needReadable=!0,n=0):state.length-=n,0===state.length&&(state.ended||(state.needReadable=!0),nOrig!==n&&state.ended&&endReadable(this)),null!==ret&&this.emit("data",ret),ret},Readable.prototype._read=function(n){this.emit("error",new Error("_read() is not implemented"))},Readable.prototype.pipe=function(dest,pipeOpts){function onunpipe(readable){debug("onunpipe"),readable===src&&cleanup()}function onend(){debug("onend"),dest.end()}function cleanup(){debug("cleanup"),dest.removeListener("close",onclose),dest.removeListener("finish",onfinish),dest.removeListener("drain",ondrain),dest.removeListener("error",onerror),dest.removeListener("unpipe",onunpipe),src.removeListener("end",onend),src.removeListener("end",cleanup),src.removeListener("data",ondata),cleanedUp=!0,!state.awaitDrain||dest._writableState&&!dest._writableState.needDrain||ondrain()}function ondata(chunk){debug("ondata"),increasedAwaitDrain=!1;var ret=dest.write(chunk);!1!==ret||increasedAwaitDrain||((1===state.pipesCount&&state.pipes===dest||state.pipesCount>1&&indexOf(state.pipes,dest)!==-1)&&!cleanedUp&&(debug("false write response, pause",src._readableState.awaitDrain),src._readableState.awaitDrain++,increasedAwaitDrain=!0),src.pause())}function onerror(er){debug("onerror",er),unpipe(),dest.removeListener("error",onerror),0===EElistenerCount(dest,"error")&&dest.emit("error",er)}function onclose(){dest.removeListener("finish",onfinish),unpipe()}function onfinish(){debug("onfinish"),dest.removeListener("close",onclose),unpipe()}function unpipe(){debug("unpipe"),src.unpipe(dest)}var src=this,state=this._readableState;switch(state.pipesCount){case 0:state.pipes=dest;break;case 1:state.pipes=[state.pipes,dest];break;default:state.pipes.push(dest)}state.pipesCount+=1,debug("pipe count=%d opts=%j",state.pipesCount,pipeOpts);var doEnd=(!pipeOpts||pipeOpts.end!==!1)&&dest!==process.stdout&&dest!==process.stderr,endFn=doEnd?onend:cleanup;state.endEmitted?processNextTick(endFn):src.once("end",endFn),dest.on("unpipe",onunpipe);var ondrain=pipeOnDrain(src);dest.on("drain",ondrain);var cleanedUp=!1,increasedAwaitDrain=!1;return src.on("data",ondata),prependListener(dest,"error",onerror),dest.once("close",onclose),dest.once("finish",onfinish),dest.emit("pipe",src),state.flowing||(debug("pipe resume"),src.resume()),dest},Readable.prototype.unpipe=function(dest){var state=this._readableState;if(0===state.pipesCount)return this;if(1===state.pipesCount)return dest&&dest!==state.pipes?this:(dest||(dest=state.pipes),state.pipes=null,state.pipesCount=0,state.flowing=!1,dest&&dest.emit("unpipe",this),this);if(!dest){var dests=state.pipes,len=state.pipesCount;state.pipes=null,state.pipesCount=0,state.flowing=!1;for(var i=0;i<len;i++)dests[i].emit("unpipe",this);return this}var index=indexOf(state.pipes,dest);return index===-1?this:(state.pipes.splice(index,1),state.pipesCount-=1,1===state.pipesCount&&(state.pipes=state.pipes[0]),dest.emit("unpipe",this),this)},Readable.prototype.on=function(ev,fn){var res=Stream.prototype.on.call(this,ev,fn);if("data"===ev)this._readableState.flowing!==!1&&this.resume();else if("readable"===ev){var state=this._readableState;state.endEmitted||state.readableListening||(state.readableListening=state.needReadable=!0,state.emittedReadable=!1,state.reading?state.length&&emitReadable(this,state):processNextTick(nReadingNextTick,this))}return res},Readable.prototype.addListener=Readable.prototype.on,Readable.prototype.resume=function(){var state=this._readableState;return state.flowing||(debug("resume"),state.flowing=!0,resume(this,state)),this},Readable.prototype.pause=function(){return debug("call pause flowing=%j",this._readableState.flowing),!1!==this._readableState.flowing&&(debug("pause"),this._readableState.flowing=!1,this.emit("pause")),this},Readable.prototype.wrap=function(stream){var state=this._readableState,paused=!1,self=this;stream.on("end",function(){if(debug("wrapped end"),state.decoder&&!state.ended){var chunk=state.decoder.end();chunk&&chunk.length&&self.push(chunk)}self.push(null)}),stream.on("data",function(chunk){if(debug("wrapped data"),state.decoder&&(chunk=state.decoder.write(chunk)),(!state.objectMode||null!==chunk&&void 0!==chunk)&&(state.objectMode||chunk&&chunk.length)){var ret=self.push(chunk);ret||(paused=!0,stream.pause())}});for(var i in stream)void 0===this[i]&&"function"==typeof stream[i]&&(this[i]=function(method){return function(){return stream[method].apply(stream,arguments)}}(i));var events=["error","close","destroy","pause","resume"];return forEach(events,function(ev){stream.on(ev,self.emit.bind(self,ev))}),self._read=function(n){debug("wrapped _read",n),paused&&(paused=!1,stream.resume())},self},Readable._fromList=fromList}).call(this,require("_process"))},{"./_stream_duplex":20,"./internal/streams/BufferList":25,_process:15,buffer:5,"buffer-shims":4,"core-util-is":7,events:8,inherits:11,isarray:13,"process-nextick-args":14,"string_decoder/":31,util:3}],23:[function(require,module,exports){"use strict";function TransformState(stream){this.afterTransform=function(er,data){return afterTransform(stream,er,data)},this.needTransform=!1,this.transforming=!1,this.writecb=null,this.writechunk=null,this.writeencoding=null}function afterTransform(stream,er,data){var ts=stream._transformState;ts.transforming=!1;var cb=ts.writecb;if(!cb)return stream.emit("error",new Error("no writecb in Transform class"));ts.writechunk=null,ts.writecb=null,null!==data&&void 0!==data&&stream.push(data),cb(er);var rs=stream._readableState;rs.reading=!1,(rs.needReadable||rs.length<rs.highWaterMark)&&stream._read(rs.highWaterMark)}function Transform(options){if(!(this instanceof Transform))return new Transform(options);Duplex.call(this,options),this._transformState=new TransformState(this);var stream=this;this._readableState.needReadable=!0,this._readableState.sync=!1,options&&("function"==typeof options.transform&&(this._transform=options.transform),"function"==typeof options.flush&&(this._flush=options.flush)),this.once("prefinish",function(){"function"==typeof this._flush?this._flush(function(er,data){done(stream,er,data)}):done(stream)})}function done(stream,er,data){if(er)return stream.emit("error",er);null!==data&&void 0!==data&&stream.push(data);var ws=stream._writableState,ts=stream._transformState;if(ws.length)throw new Error("Calling transform done when ws.length != 0");if(ts.transforming)throw new Error("Calling transform done when still transforming");return stream.push(null)}module.exports=Transform;var Duplex=require("./_stream_duplex"),util=require("core-util-is");util.inherits=require("inherits"),util.inherits(Transform,Duplex),Transform.prototype.push=function(chunk,encoding){return this._transformState.needTransform=!1,Duplex.prototype.push.call(this,chunk,encoding)},Transform.prototype._transform=function(chunk,encoding,cb){throw new Error("_transform() is not implemented")},Transform.prototype._write=function(chunk,encoding,cb){var ts=this._transformState;if(ts.writecb=cb,ts.writechunk=chunk,ts.writeencoding=encoding,!ts.transforming){var rs=this._readableState;(ts.needTransform||rs.needReadable||rs.length<rs.highWaterMark)&&this._read(rs.highWaterMark)}},Transform.prototype._read=function(n){var ts=this._transformState;null!==ts.writechunk&&ts.writecb&&!ts.transforming?(ts.transforming=!0,this._transform(ts.writechunk,ts.writeencoding,ts.afterTransform)):ts.needTransform=!0}},{"./_stream_duplex":20,"core-util-is":7,inherits:11}],24:[function(require,module,exports){(function(process){"use strict";function nop(){}function WriteReq(chunk,encoding,cb){this.chunk=chunk,this.encoding=encoding,this.callback=cb,this.next=null}function WritableState(options,stream){Duplex=Duplex||require("./_stream_duplex"),options=options||{},this.objectMode=!!options.objectMode,stream instanceof Duplex&&(this.objectMode=this.objectMode||!!options.writableObjectMode);var hwm=options.highWaterMark,defaultHwm=this.objectMode?16:16384;this.highWaterMark=hwm||0===hwm?hwm:defaultHwm,this.highWaterMark=~~this.highWaterMark,this.needDrain=!1,this.ending=!1,this.ended=!1,this.finished=!1;var noDecode=options.decodeStrings===!1;this.decodeStrings=!noDecode,this.defaultEncoding=options.defaultEncoding||"utf8",this.length=0,this.writing=!1,this.corked=0,this.sync=!0,this.bufferProcessing=!1,this.onwrite=function(er){onwrite(stream,er)},this.writecb=null,this.writelen=0,this.bufferedRequest=null,this.lastBufferedRequest=null,this.pendingcb=0,this.prefinished=!1,this.errorEmitted=!1,this.bufferedRequestCount=0,this.corkedRequestsFree=new CorkedRequest(this)}function Writable(options){return Duplex=Duplex||require("./_stream_duplex"),realHasInstance.call(Writable,this)||this instanceof Duplex?(this._writableState=new WritableState(options,this),this.writable=!0,options&&("function"==typeof options.write&&(this._write=options.write),"function"==typeof options.writev&&(this._writev=options.writev)),void Stream.call(this)):new Writable(options)}function writeAfterEnd(stream,cb){var er=new Error("write after end");stream.emit("error",er),processNextTick(cb,er)}function validChunk(stream,state,chunk,cb){var valid=!0,er=!1;return null===chunk?er=new TypeError("May not write null values to stream"):Buffer.isBuffer(chunk)||"string"==typeof chunk||void 0===chunk||state.objectMode||(er=new TypeError("Invalid non-string/buffer chunk")),er&&(stream.emit("error",er),processNextTick(cb,er),valid=!1),valid}function decodeChunk(state,chunk,encoding){return state.objectMode||state.decodeStrings===!1||"string"!=typeof chunk||(chunk=bufferShim.from(chunk,encoding)),chunk}function writeOrBuffer(stream,state,chunk,encoding,cb){chunk=decodeChunk(state,chunk,encoding),Buffer.isBuffer(chunk)&&(encoding="buffer");var len=state.objectMode?1:chunk.length;state.length+=len;var ret=state.length<state.highWaterMark;if(ret||(state.needDrain=!0),state.writing||state.corked){var last=state.lastBufferedRequest;state.lastBufferedRequest=new WriteReq(chunk,encoding,cb),last?last.next=state.lastBufferedRequest:state.bufferedRequest=state.lastBufferedRequest,state.bufferedRequestCount+=1}else doWrite(stream,state,!1,len,chunk,encoding,cb);return ret}function doWrite(stream,state,writev,len,chunk,encoding,cb){state.writelen=len,state.writecb=cb,state.writing=!0,state.sync=!0,writev?stream._writev(chunk,state.onwrite):stream._write(chunk,encoding,state.onwrite),state.sync=!1}function onwriteError(stream,state,sync,er,cb){--state.pendingcb,sync?processNextTick(cb,er):cb(er),stream._writableState.errorEmitted=!0,stream.emit("error",er)}function onwriteStateUpdate(state){state.writing=!1,state.writecb=null,state.length-=state.writelen,state.writelen=0}function onwrite(stream,er){var state=stream._writableState,sync=state.sync,cb=state.writecb;if(onwriteStateUpdate(state),er)onwriteError(stream,state,sync,er,cb);else{var finished=needFinish(state);finished||state.corked||state.bufferProcessing||!state.bufferedRequest||clearBuffer(stream,state),sync?asyncWrite(afterWrite,stream,state,finished,cb):afterWrite(stream,state,finished,cb)}}function afterWrite(stream,state,finished,cb){finished||onwriteDrain(stream,state),state.pendingcb--,cb(),finishMaybe(stream,state)}function onwriteDrain(stream,state){0===state.length&&state.needDrain&&(state.needDrain=!1,stream.emit("drain"))}function clearBuffer(stream,state){state.bufferProcessing=!0;var entry=state.bufferedRequest;if(stream._writev&&entry&&entry.next){var l=state.bufferedRequestCount,buffer=new Array(l),holder=state.corkedRequestsFree;holder.entry=entry;for(var count=0;entry;)buffer[count]=entry,entry=entry.next,count+=1;doWrite(stream,state,!0,state.length,buffer,"",holder.finish),state.pendingcb++,state.lastBufferedRequest=null,holder.next?(state.corkedRequestsFree=holder.next,holder.next=null):state.corkedRequestsFree=new CorkedRequest(state)}else{for(;entry;){var chunk=entry.chunk,encoding=entry.encoding,cb=entry.callback,len=state.objectMode?1:chunk.length;if(doWrite(stream,state,!1,len,chunk,encoding,cb),entry=entry.next,state.writing)break}null===entry&&(state.lastBufferedRequest=null)}state.bufferedRequestCount=0,state.bufferedRequest=entry,state.bufferProcessing=!1}function needFinish(state){return state.ending&&0===state.length&&null===state.bufferedRequest&&!state.finished&&!state.writing}function prefinish(stream,state){state.prefinished||(state.prefinished=!0,stream.emit("prefinish"))}function finishMaybe(stream,state){var need=needFinish(state);return need&&(0===state.pendingcb?(prefinish(stream,state),state.finished=!0,stream.emit("finish")):prefinish(stream,state)),need}function endWritable(stream,state,cb){state.ending=!0,finishMaybe(stream,state),cb&&(state.finished?processNextTick(cb):stream.once("finish",cb)),state.ended=!0,stream.writable=!1}function CorkedRequest(state){var _this=this;this.next=null,this.entry=null,this.finish=function(err){var entry=_this.entry;for(_this.entry=null;entry;){var cb=entry.callback;state.pendingcb--,cb(err),entry=entry.next}state.corkedRequestsFree?state.corkedRequestsFree.next=_this:state.corkedRequestsFree=_this}}module.exports=Writable;var Duplex,processNextTick=require("process-nextick-args"),asyncWrite=!process.browser&&["v0.10","v0.9."].indexOf(process.version.slice(0,5))>-1?setImmediate:processNextTick;Writable.WritableState=WritableState;var util=require("core-util-is");util.inherits=require("inherits");var Stream,internalUtil={deprecate:require("util-deprecate")};!function(){try{Stream=require("stream")}catch(_){}finally{Stream||(Stream=require("events").EventEmitter)}}();var Buffer=require("buffer").Buffer,bufferShim=require("buffer-shims");util.inherits(Writable,Stream),WritableState.prototype.getBuffer=function(){for(var current=this.bufferedRequest,out=[];current;)out.push(current),current=current.next;return out},function(){try{Object.defineProperty(WritableState.prototype,"buffer",{get:internalUtil.deprecate(function(){return this.getBuffer()},"_writableState.buffer is deprecated. Use _writableState.getBuffer instead.")})}catch(_){}}();var realHasInstance;"function"==typeof Symbol&&Symbol.hasInstance&&"function"==typeof Function.prototype[Symbol.hasInstance]?(realHasInstance=Function.prototype[Symbol.hasInstance],Object.defineProperty(Writable,Symbol.hasInstance,{value:function(object){return!!realHasInstance.call(this,object)||object&&object._writableState instanceof WritableState}})):realHasInstance=function(object){return object instanceof this},Writable.prototype.pipe=function(){this.emit("error",new Error("Cannot pipe, not readable"))},Writable.prototype.write=function(chunk,encoding,cb){var state=this._writableState,ret=!1;return"function"==typeof encoding&&(cb=encoding,encoding=null),Buffer.isBuffer(chunk)?encoding="buffer":encoding||(encoding=state.defaultEncoding),"function"!=typeof cb&&(cb=nop),state.ended?writeAfterEnd(this,cb):validChunk(this,state,chunk,cb)&&(state.pendingcb++,ret=writeOrBuffer(this,state,chunk,encoding,cb)),ret},Writable.prototype.cork=function(){var state=this._writableState;state.corked++},Writable.prototype.uncork=function(){var state=this._writableState;state.corked&&(state.corked--,state.writing||state.corked||state.finished||state.bufferProcessing||!state.bufferedRequest||clearBuffer(this,state))},Writable.prototype.setDefaultEncoding=function(encoding){if("string"==typeof encoding&&(encoding=encoding.toLowerCase()),!(["hex","utf8","utf-8","ascii","binary","base64","ucs2","ucs-2","utf16le","utf-16le","raw"].indexOf((encoding+"").toLowerCase())>-1))throw new TypeError("Unknown encoding: "+encoding);return this._writableState.defaultEncoding=encoding,this},Writable.prototype._write=function(chunk,encoding,cb){cb(new Error("_write() is not implemented"))},Writable.prototype._writev=null,Writable.prototype.end=function(chunk,encoding,cb){var state=this._writableState;"function"==typeof chunk?(cb=chunk,chunk=null,encoding=null):"function"==typeof encoding&&(cb=encoding,encoding=null),null!==chunk&&void 0!==chunk&&this.write(chunk,encoding),state.corked&&(state.corked=1,this.uncork()),state.ending||state.finished||endWritable(this,state,cb)}}).call(this,require("_process"))},{"./_stream_duplex":20,_process:15,buffer:5,"buffer-shims":4,"core-util-is":7,events:8,inherits:11,"process-nextick-args":14,"util-deprecate":35}],25:[function(require,module,exports){"use strict";function BufferList(){this.head=null,this.tail=null,this.length=0}var bufferShim=(require("buffer").Buffer,require("buffer-shims"));module.exports=BufferList,BufferList.prototype.push=function(v){var entry={data:v,next:null};this.length>0?this.tail.next=entry:this.head=entry,this.tail=entry,++this.length},BufferList.prototype.unshift=function(v){var entry={data:v,next:this.head};0===this.length&&(this.tail=entry),this.head=entry,++this.length},BufferList.prototype.shift=function(){if(0!==this.length){var ret=this.head.data;return 1===this.length?this.head=this.tail=null:this.head=this.head.next,--this.length,ret}},BufferList.prototype.clear=function(){this.head=this.tail=null,this.length=0},BufferList.prototype.join=function(s){if(0===this.length)return"";for(var p=this.head,ret=""+p.data;p=p.next;)ret+=s+p.data;return ret},BufferList.prototype.concat=function(n){if(0===this.length)return bufferShim.alloc(0);if(1===this.length)return this.head.data;for(var ret=bufferShim.allocUnsafe(n>>>0),p=this.head,i=0;p;)p.data.copy(ret,i),i+=p.data.length,p=p.next;return ret}},{buffer:5,"buffer-shims":4}],26:[function(require,module,exports){(function(process){var Stream=function(){try{return require("stream")}catch(_){}}();exports=module.exports=require("./lib/_stream_readable.js"),exports.Stream=Stream||exports,exports.Readable=exports,exports.Writable=require("./lib/_stream_writable.js"),exports.Duplex=require("./lib/_stream_duplex.js"),exports.Transform=require("./lib/_stream_transform.js"),exports.PassThrough=require("./lib/_stream_passthrough.js"),!process.browser&&"disable"===process.env.READABLE_STREAM&&Stream&&(module.exports=Stream);
}).call(this,require("_process"))},{"./lib/_stream_duplex.js":20,"./lib/_stream_passthrough.js":21,"./lib/_stream_readable.js":22,"./lib/_stream_transform.js":23,"./lib/_stream_writable.js":24,_process:15}],27:[function(require,module,exports){(function(global){var ClientRequest=require("./lib/request"),extend=require("xtend"),statusCodes=require("builtin-status-codes"),url=require("url"),http=exports;http.request=function(opts,cb){opts="string"==typeof opts?url.parse(opts):extend(opts);var defaultProtocol=global.location.protocol.search(/^https?:$/)===-1?"http:":"",protocol=opts.protocol||defaultProtocol,host=opts.hostname||opts.host,port=opts.port,path=opts.path||"/";host&&host.indexOf(":")!==-1&&(host="["+host+"]"),opts.url=(host?protocol+"//"+host:"")+(port?":"+port:"")+path,opts.method=(opts.method||"GET").toUpperCase(),opts.headers=opts.headers||{};var req=new ClientRequest(opts);return cb&&req.on("response",cb),req},http.get=function(opts,cb){var req=http.request(opts,cb);return req.end(),req},http.Agent=function(){},http.Agent.defaultMaxSockets=4,http.STATUS_CODES=statusCodes,http.METHODS=["CHECKOUT","CONNECT","COPY","DELETE","GET","HEAD","LOCK","M-SEARCH","MERGE","MKACTIVITY","MKCOL","MOVE","NOTIFY","OPTIONS","PATCH","POST","PROPFIND","PROPPATCH","PURGE","PUT","REPORT","SEARCH","SUBSCRIBE","TRACE","UNLOCK","UNSUBSCRIBE"]}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./lib/request":29,"builtin-status-codes":6,url:33,xtend:36}],28:[function(require,module,exports){(function(global){function getXHR(){if(void 0!==xhr)return xhr;if(global.XMLHttpRequest){xhr=new global.XMLHttpRequest;try{xhr.open("GET",global.XDomainRequest?"/":"https://example.com")}catch(e){xhr=null}}else xhr=null;return xhr}function checkTypeSupport(type){var xhr=getXHR();if(!xhr)return!1;try{return xhr.responseType=type,xhr.responseType===type}catch(e){}return!1}function isFunction(value){return"function"==typeof value}exports.fetch=isFunction(global.fetch)&&isFunction(global.ReadableStream),exports.blobConstructor=!1;try{new Blob([new ArrayBuffer(1)]),exports.blobConstructor=!0}catch(e){}var xhr,haveArrayBuffer="undefined"!=typeof global.ArrayBuffer,haveSlice=haveArrayBuffer&&isFunction(global.ArrayBuffer.prototype.slice);exports.arraybuffer=exports.fetch||haveArrayBuffer&&checkTypeSupport("arraybuffer"),exports.msstream=!exports.fetch&&haveSlice&&checkTypeSupport("ms-stream"),exports.mozchunkedarraybuffer=!exports.fetch&&haveArrayBuffer&&checkTypeSupport("moz-chunked-arraybuffer"),exports.overrideMimeType=exports.fetch||!!getXHR()&&isFunction(getXHR().overrideMimeType),exports.vbArray=isFunction(global.VBArray),xhr=null}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],29:[function(require,module,exports){(function(process,global,Buffer){function decideMode(preferBinary,useFetch){return capability.fetch&&useFetch?"fetch":capability.mozchunkedarraybuffer?"moz-chunked-arraybuffer":capability.msstream?"ms-stream":capability.arraybuffer&&preferBinary?"arraybuffer":capability.vbArray&&preferBinary?"text:vbarray":"text"}function statusValid(xhr){try{var status=xhr.status;return null!==status&&0!==status}catch(e){return!1}}var capability=require("./capability"),inherits=require("inherits"),response=require("./response"),stream=require("readable-stream"),toArrayBuffer=require("to-arraybuffer"),IncomingMessage=response.IncomingMessage,rStates=response.readyStates,ClientRequest=module.exports=function(opts){var self=this;stream.Writable.call(self),self._opts=opts,self._body=[],self._headers={},opts.auth&&self.setHeader("Authorization","Basic "+new Buffer(opts.auth).toString("base64")),Object.keys(opts.headers).forEach(function(name){self.setHeader(name,opts.headers[name])});var preferBinary,useFetch=!0;if("disable-fetch"===opts.mode||"timeout"in opts)useFetch=!1,preferBinary=!0;else if("prefer-streaming"===opts.mode)preferBinary=!1;else if("allow-wrong-content-type"===opts.mode)preferBinary=!capability.overrideMimeType;else{if(opts.mode&&"default"!==opts.mode&&"prefer-fast"!==opts.mode)throw new Error("Invalid value for opts.mode");preferBinary=!0}self._mode=decideMode(preferBinary,useFetch),self.on("finish",function(){self._onFinish()})};inherits(ClientRequest,stream.Writable),ClientRequest.prototype.setHeader=function(name,value){var self=this,lowerName=name.toLowerCase();unsafeHeaders.indexOf(lowerName)===-1&&(self._headers[lowerName]={name:name,value:value})},ClientRequest.prototype.getHeader=function(name){var self=this;return self._headers[name.toLowerCase()].value},ClientRequest.prototype.removeHeader=function(name){var self=this;delete self._headers[name.toLowerCase()]},ClientRequest.prototype._onFinish=function(){var self=this;if(!self._destroyed){var opts=self._opts,headersObj=self._headers,body=null;if("POST"!==opts.method&&"PUT"!==opts.method&&"PATCH"!==opts.method&&"MERGE"!==opts.method||(body=capability.blobConstructor?new global.Blob(self._body.map(function(buffer){return toArrayBuffer(buffer)}),{type:(headersObj["content-type"]||{}).value||""}):Buffer.concat(self._body).toString()),"fetch"===self._mode){var headers=Object.keys(headersObj).map(function(name){return[headersObj[name].name,headersObj[name].value]});global.fetch(self._opts.url,{method:self._opts.method,headers:headers,body:body||void 0,mode:"cors",credentials:opts.withCredentials?"include":"same-origin"}).then(function(response){self._fetchResponse=response,self._connect()},function(reason){self.emit("error",reason)})}else{var xhr=self._xhr=new global.XMLHttpRequest;try{xhr.open(self._opts.method,self._opts.url,!0)}catch(err){return void process.nextTick(function(){self.emit("error",err)})}"responseType"in xhr&&(xhr.responseType=self._mode.split(":")[0]),"withCredentials"in xhr&&(xhr.withCredentials=!!opts.withCredentials),"text"===self._mode&&"overrideMimeType"in xhr&&xhr.overrideMimeType("text/plain; charset=x-user-defined"),"timeout"in opts&&(xhr.timeout=opts.timeout,xhr.ontimeout=function(){self.emit("timeout")}),Object.keys(headersObj).forEach(function(name){xhr.setRequestHeader(headersObj[name].name,headersObj[name].value)}),self._response=null,xhr.onreadystatechange=function(){switch(xhr.readyState){case rStates.LOADING:case rStates.DONE:self._onXHRProgress()}},"moz-chunked-arraybuffer"===self._mode&&(xhr.onprogress=function(){self._onXHRProgress()}),xhr.onerror=function(){self._destroyed||self.emit("error",new Error("XHR error"))};try{xhr.send(body)}catch(err){return void process.nextTick(function(){self.emit("error",err)})}}}},ClientRequest.prototype._onXHRProgress=function(){var self=this;statusValid(self._xhr)&&!self._destroyed&&(self._response||self._connect(),self._response._onXHRProgress())},ClientRequest.prototype._connect=function(){var self=this;self._destroyed||(self._response=new IncomingMessage(self._xhr,self._fetchResponse,self._mode),self._response.on("error",function(err){self.emit("error",err)}),self.emit("response",self._response))},ClientRequest.prototype._write=function(chunk,encoding,cb){var self=this;self._body.push(chunk),cb()},ClientRequest.prototype.abort=ClientRequest.prototype.destroy=function(){var self=this;self._destroyed=!0,self._response&&(self._response._destroyed=!0),self._xhr&&self._xhr.abort()},ClientRequest.prototype.end=function(data,encoding,cb){var self=this;"function"==typeof data&&(cb=data,data=void 0),stream.Writable.prototype.end.call(self,data,encoding,cb)},ClientRequest.prototype.flushHeaders=function(){},ClientRequest.prototype.setTimeout=function(){},ClientRequest.prototype.setNoDelay=function(){},ClientRequest.prototype.setSocketKeepAlive=function(){};var unsafeHeaders=["accept-charset","accept-encoding","access-control-request-headers","access-control-request-method","connection","content-length","cookie","cookie2","date","dnt","expect","host","keep-alive","origin","referer","te","trailer","transfer-encoding","upgrade","user-agent","via"]}).call(this,require("_process"),"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},require("buffer").Buffer)},{"./capability":28,"./response":30,_process:15,buffer:5,inherits:11,"readable-stream":26,"to-arraybuffer":32}],30:[function(require,module,exports){(function(process,global,Buffer){var capability=require("./capability"),inherits=require("inherits"),stream=require("readable-stream"),rStates=exports.readyStates={UNSENT:0,OPENED:1,HEADERS_RECEIVED:2,LOADING:3,DONE:4},IncomingMessage=exports.IncomingMessage=function(xhr,response,mode){function read(){reader.read().then(function(result){if(!self._destroyed){if(result.done)return void self.push(null);self.push(new Buffer(result.value)),read()}})["catch"](function(err){self.emit("error",err)})}var self=this;if(stream.Readable.call(self),self._mode=mode,self.headers={},self.rawHeaders=[],self.trailers={},self.rawTrailers=[],self.on("end",function(){process.nextTick(function(){self.emit("close")})}),"fetch"===mode){self._fetchResponse=response,self.url=response.url,self.statusCode=response.status,self.statusMessage=response.statusText,response.headers.forEach(function(header,key){self.headers[key.toLowerCase()]=header,self.rawHeaders.push(key,header)});var reader=response.body.getReader();read()}else{self._xhr=xhr,self._pos=0,self.url=xhr.responseURL,self.statusCode=xhr.status,self.statusMessage=xhr.statusText;var headers=xhr.getAllResponseHeaders().split(/\r?\n/);if(headers.forEach(function(header){var matches=header.match(/^([^:]+):\s*(.*)/);if(matches){var key=matches[1].toLowerCase();"set-cookie"===key?(void 0===self.headers[key]&&(self.headers[key]=[]),self.headers[key].push(matches[2])):void 0!==self.headers[key]?self.headers[key]+=", "+matches[2]:self.headers[key]=matches[2],self.rawHeaders.push(matches[1],matches[2])}}),self._charset="x-user-defined",!capability.overrideMimeType){var mimeType=self.rawHeaders["mime-type"];if(mimeType){var charsetMatch=mimeType.match(/;\s*charset=([^;])(;|$)/);charsetMatch&&(self._charset=charsetMatch[1].toLowerCase())}self._charset||(self._charset="utf-8")}}};inherits(IncomingMessage,stream.Readable),IncomingMessage.prototype._read=function(){},IncomingMessage.prototype._onXHRProgress=function(){var self=this,xhr=self._xhr,response=null;switch(self._mode){case"text:vbarray":if(xhr.readyState!==rStates.DONE)break;try{response=new global.VBArray(xhr.responseBody).toArray()}catch(e){}if(null!==response){self.push(new Buffer(response));break}case"text":try{response=xhr.responseText}catch(e){self._mode="text:vbarray";break}if(response.length>self._pos){var newData=response.substr(self._pos);if("x-user-defined"===self._charset){for(var buffer=new Buffer(newData.length),i=0;i<newData.length;i++)buffer[i]=255&newData.charCodeAt(i);self.push(buffer)}else self.push(newData,self._charset);self._pos=response.length}break;case"arraybuffer":if(xhr.readyState!==rStates.DONE||!xhr.response)break;response=xhr.response,self.push(new Buffer(new Uint8Array(response)));break;case"moz-chunked-arraybuffer":if(response=xhr.response,xhr.readyState!==rStates.LOADING||!response)break;self.push(new Buffer(new Uint8Array(response)));break;case"ms-stream":if(response=xhr.response,xhr.readyState!==rStates.LOADING)break;var reader=new global.MSStreamReader;reader.onprogress=function(){reader.result.byteLength>self._pos&&(self.push(new Buffer(new Uint8Array(reader.result.slice(self._pos)))),self._pos=reader.result.byteLength)},reader.onload=function(){self.push(null)},reader.readAsArrayBuffer(response)}self._xhr.readyState===rStates.DONE&&"ms-stream"!==self._mode&&self.push(null)}}).call(this,require("_process"),"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},require("buffer").Buffer)},{"./capability":28,_process:15,buffer:5,inherits:11,"readable-stream":26}],31:[function(require,module,exports){function assertEncoding(encoding){if(encoding&&!isBufferEncoding(encoding))throw new Error("Unknown encoding: "+encoding)}function passThroughWrite(buffer){return buffer.toString(this.encoding)}function utf16DetectIncompleteChar(buffer){this.charReceived=buffer.length%2,this.charLength=this.charReceived?2:0}function base64DetectIncompleteChar(buffer){this.charReceived=buffer.length%3,this.charLength=this.charReceived?3:0}var Buffer=require("buffer").Buffer,isBufferEncoding=Buffer.isEncoding||function(encoding){switch(encoding&&encoding.toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"binary":case"base64":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":case"raw":return!0;default:return!1}},StringDecoder=exports.StringDecoder=function(encoding){switch(this.encoding=(encoding||"utf8").toLowerCase().replace(/[-_]/,""),assertEncoding(encoding),this.encoding){case"utf8":this.surrogateSize=3;break;case"ucs2":case"utf16le":this.surrogateSize=2,this.detectIncompleteChar=utf16DetectIncompleteChar;break;case"base64":this.surrogateSize=3,this.detectIncompleteChar=base64DetectIncompleteChar;break;default:return void(this.write=passThroughWrite)}this.charBuffer=new Buffer(6),this.charReceived=0,this.charLength=0};StringDecoder.prototype.write=function(buffer){for(var charStr="";this.charLength;){var available=buffer.length>=this.charLength-this.charReceived?this.charLength-this.charReceived:buffer.length;if(buffer.copy(this.charBuffer,this.charReceived,0,available),this.charReceived+=available,this.charReceived<this.charLength)return"";buffer=buffer.slice(available,buffer.length),charStr=this.charBuffer.slice(0,this.charLength).toString(this.encoding);var charCode=charStr.charCodeAt(charStr.length-1);if(!(charCode>=55296&&charCode<=56319)){if(this.charReceived=this.charLength=0,0===buffer.length)return charStr;break}this.charLength+=this.surrogateSize,charStr=""}this.detectIncompleteChar(buffer);var end=buffer.length;this.charLength&&(buffer.copy(this.charBuffer,0,buffer.length-this.charReceived,end),end-=this.charReceived),charStr+=buffer.toString(this.encoding,0,end);var end=charStr.length-1,charCode=charStr.charCodeAt(end);if(charCode>=55296&&charCode<=56319){var size=this.surrogateSize;return this.charLength+=size,this.charReceived+=size,this.charBuffer.copy(this.charBuffer,size,0,size),buffer.copy(this.charBuffer,0,0,size),charStr.substring(0,end)}return charStr},StringDecoder.prototype.detectIncompleteChar=function(buffer){for(var i=buffer.length>=3?3:buffer.length;i>0;i--){var c=buffer[buffer.length-i];if(1==i&&c>>5==6){this.charLength=2;break}if(i<=2&&c>>4==14){this.charLength=3;break}if(i<=3&&c>>3==30){this.charLength=4;break}}this.charReceived=i},StringDecoder.prototype.end=function(buffer){var res="";if(buffer&&buffer.length&&(res=this.write(buffer)),this.charReceived){var cr=this.charReceived,buf=this.charBuffer,enc=this.encoding;res+=buf.slice(0,cr).toString(enc)}return res}},{buffer:5}],32:[function(require,module,exports){var Buffer=require("buffer").Buffer;module.exports=function(buf){if(buf instanceof Uint8Array){if(0===buf.byteOffset&&buf.byteLength===buf.buffer.byteLength)return buf.buffer;if("function"==typeof buf.buffer.slice)return buf.buffer.slice(buf.byteOffset,buf.byteOffset+buf.byteLength)}if(Buffer.isBuffer(buf)){for(var arrayCopy=new Uint8Array(buf.length),len=buf.length,i=0;i<len;i++)arrayCopy[i]=buf[i];return arrayCopy.buffer}throw new Error("Argument must be a Buffer")}},{buffer:5}],33:[function(require,module,exports){"use strict";function Url(){this.protocol=null,this.slashes=null,this.auth=null,this.host=null,this.port=null,this.hostname=null,this.hash=null,this.search=null,this.query=null,this.pathname=null,this.path=null,this.href=null}function urlParse(url,parseQueryString,slashesDenoteHost){if(url&&util.isObject(url)&&url instanceof Url)return url;var u=new Url;return u.parse(url,parseQueryString,slashesDenoteHost),u}function urlFormat(obj){return util.isString(obj)&&(obj=urlParse(obj)),obj instanceof Url?obj.format():Url.prototype.format.call(obj)}function urlResolve(source,relative){return urlParse(source,!1,!0).resolve(relative)}function urlResolveObject(source,relative){return source?urlParse(source,!1,!0).resolveObject(relative):relative}var punycode=require("punycode"),util=require("./util");exports.parse=urlParse,exports.resolve=urlResolve,exports.resolveObject=urlResolveObject,exports.format=urlFormat,exports.Url=Url;var protocolPattern=/^([a-z0-9.+-]+:)/i,portPattern=/:[0-9]*$/,simplePathPattern=/^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,delims=["<",">",'"',"`"," ","\r","\n","\t"],unwise=["{","}","|","\\","^","`"].concat(delims),autoEscape=["'"].concat(unwise),nonHostChars=["%","/","?",";","#"].concat(autoEscape),hostEndingChars=["/","?","#"],hostnameMaxLen=255,hostnamePartPattern=/^[+a-z0-9A-Z_-]{0,63}$/,hostnamePartStart=/^([+a-z0-9A-Z_-]{0,63})(.*)$/,unsafeProtocol={javascript:!0,"javascript:":!0},hostlessProtocol={javascript:!0,"javascript:":!0},slashedProtocol={http:!0,https:!0,ftp:!0,gopher:!0,file:!0,"http:":!0,"https:":!0,"ftp:":!0,"gopher:":!0,"file:":!0},querystring=require("querystring");Url.prototype.parse=function(url,parseQueryString,slashesDenoteHost){if(!util.isString(url))throw new TypeError("Parameter 'url' must be a string, not "+typeof url);var queryIndex=url.indexOf("?"),splitter=queryIndex!==-1&&queryIndex<url.indexOf("#")?"?":"#",uSplit=url.split(splitter),slashRegex=/\\/g;uSplit[0]=uSplit[0].replace(slashRegex,"/"),url=uSplit.join(splitter);var rest=url;if(rest=rest.trim(),!slashesDenoteHost&&1===url.split("#").length){var simplePath=simplePathPattern.exec(rest);if(simplePath)return this.path=rest,this.href=rest,this.pathname=simplePath[1],simplePath[2]?(this.search=simplePath[2],parseQueryString?this.query=querystring.parse(this.search.substr(1)):this.query=this.search.substr(1)):parseQueryString&&(this.search="",this.query={}),this}var proto=protocolPattern.exec(rest);if(proto){proto=proto[0];var lowerProto=proto.toLowerCase();this.protocol=lowerProto,rest=rest.substr(proto.length)}if(slashesDenoteHost||proto||rest.match(/^\/\/[^@\/]+@[^@\/]+/)){var slashes="//"===rest.substr(0,2);!slashes||proto&&hostlessProtocol[proto]||(rest=rest.substr(2),this.slashes=!0)}if(!hostlessProtocol[proto]&&(slashes||proto&&!slashedProtocol[proto])){for(var hostEnd=-1,i=0;i<hostEndingChars.length;i++){var hec=rest.indexOf(hostEndingChars[i]);hec!==-1&&(hostEnd===-1||hec<hostEnd)&&(hostEnd=hec)}var auth,atSign;atSign=hostEnd===-1?rest.lastIndexOf("@"):rest.lastIndexOf("@",hostEnd),atSign!==-1&&(auth=rest.slice(0,atSign),rest=rest.slice(atSign+1),this.auth=decodeURIComponent(auth)),hostEnd=-1;for(var i=0;i<nonHostChars.length;i++){var hec=rest.indexOf(nonHostChars[i]);hec!==-1&&(hostEnd===-1||hec<hostEnd)&&(hostEnd=hec)}hostEnd===-1&&(hostEnd=rest.length),this.host=rest.slice(0,hostEnd),rest=rest.slice(hostEnd),this.parseHost(),this.hostname=this.hostname||"";var ipv6Hostname="["===this.hostname[0]&&"]"===this.hostname[this.hostname.length-1];if(!ipv6Hostname)for(var hostparts=this.hostname.split(/\./),i=0,l=hostparts.length;i<l;i++){var part=hostparts[i];if(part&&!part.match(hostnamePartPattern)){for(var newpart="",j=0,k=part.length;j<k;j++)newpart+=part.charCodeAt(j)>127?"x":part[j];if(!newpart.match(hostnamePartPattern)){var validParts=hostparts.slice(0,i),notHost=hostparts.slice(i+1),bit=part.match(hostnamePartStart);bit&&(validParts.push(bit[1]),notHost.unshift(bit[2])),notHost.length&&(rest="/"+notHost.join(".")+rest),this.hostname=validParts.join(".");break}}}this.hostname.length>hostnameMaxLen?this.hostname="":this.hostname=this.hostname.toLowerCase(),ipv6Hostname||(this.hostname=punycode.toASCII(this.hostname));var p=this.port?":"+this.port:"",h=this.hostname||"";this.host=h+p,this.href+=this.host,ipv6Hostname&&(this.hostname=this.hostname.substr(1,this.hostname.length-2),"/"!==rest[0]&&(rest="/"+rest))}if(!unsafeProtocol[lowerProto])for(var i=0,l=autoEscape.length;i<l;i++){var ae=autoEscape[i];if(rest.indexOf(ae)!==-1){var esc=encodeURIComponent(ae);esc===ae&&(esc=escape(ae)),rest=rest.split(ae).join(esc)}}var hash=rest.indexOf("#");hash!==-1&&(this.hash=rest.substr(hash),rest=rest.slice(0,hash));var qm=rest.indexOf("?");if(qm!==-1?(this.search=rest.substr(qm),this.query=rest.substr(qm+1),parseQueryString&&(this.query=querystring.parse(this.query)),rest=rest.slice(0,qm)):parseQueryString&&(this.search="",this.query={}),rest&&(this.pathname=rest),slashedProtocol[lowerProto]&&this.hostname&&!this.pathname&&(this.pathname="/"),this.pathname||this.search){var p=this.pathname||"",s=this.search||"";this.path=p+s}return this.href=this.format(),this},Url.prototype.format=function(){var auth=this.auth||"";auth&&(auth=encodeURIComponent(auth),auth=auth.replace(/%3A/i,":"),auth+="@");var protocol=this.protocol||"",pathname=this.pathname||"",hash=this.hash||"",host=!1,query="";this.host?host=auth+this.host:this.hostname&&(host=auth+(this.hostname.indexOf(":")===-1?this.hostname:"["+this.hostname+"]"),this.port&&(host+=":"+this.port)),this.query&&util.isObject(this.query)&&Object.keys(this.query).length&&(query=querystring.stringify(this.query));var search=this.search||query&&"?"+query||"";return protocol&&":"!==protocol.substr(-1)&&(protocol+=":"),this.slashes||(!protocol||slashedProtocol[protocol])&&host!==!1?(host="//"+(host||""),pathname&&"/"!==pathname.charAt(0)&&(pathname="/"+pathname)):host||(host=""),hash&&"#"!==hash.charAt(0)&&(hash="#"+hash),search&&"?"!==search.charAt(0)&&(search="?"+search),pathname=pathname.replace(/[?#]/g,function(match){return encodeURIComponent(match)}),search=search.replace("#","%23"),protocol+host+pathname+search+hash},Url.prototype.resolve=function(relative){return this.resolveObject(urlParse(relative,!1,!0)).format()},Url.prototype.resolveObject=function(relative){if(util.isString(relative)){var rel=new Url;rel.parse(relative,!1,!0),relative=rel}for(var result=new Url,tkeys=Object.keys(this),tk=0;tk<tkeys.length;tk++){var tkey=tkeys[tk];result[tkey]=this[tkey]}if(result.hash=relative.hash,""===relative.href)return result.href=result.format(),result;if(relative.slashes&&!relative.protocol){for(var rkeys=Object.keys(relative),rk=0;rk<rkeys.length;rk++){var rkey=rkeys[rk];"protocol"!==rkey&&(result[rkey]=relative[rkey])}return slashedProtocol[result.protocol]&&result.hostname&&!result.pathname&&(result.path=result.pathname="/"),result.href=result.format(),result}if(relative.protocol&&relative.protocol!==result.protocol){if(!slashedProtocol[relative.protocol]){for(var keys=Object.keys(relative),v=0;v<keys.length;v++){var k=keys[v];result[k]=relative[k]}return result.href=result.format(),result}if(result.protocol=relative.protocol,relative.host||hostlessProtocol[relative.protocol])result.pathname=relative.pathname;else{for(var relPath=(relative.pathname||"").split("/");relPath.length&&!(relative.host=relPath.shift()););relative.host||(relative.host=""),relative.hostname||(relative.hostname=""),""!==relPath[0]&&relPath.unshift(""),relPath.length<2&&relPath.unshift(""),result.pathname=relPath.join("/")}if(result.search=relative.search,result.query=relative.query,result.host=relative.host||"",result.auth=relative.auth,result.hostname=relative.hostname||relative.host,result.port=relative.port,result.pathname||result.search){var p=result.pathname||"",s=result.search||"";result.path=p+s}return result.slashes=result.slashes||relative.slashes,result.href=result.format(),result}var isSourceAbs=result.pathname&&"/"===result.pathname.charAt(0),isRelAbs=relative.host||relative.pathname&&"/"===relative.pathname.charAt(0),mustEndAbs=isRelAbs||isSourceAbs||result.host&&relative.pathname,removeAllDots=mustEndAbs,srcPath=result.pathname&&result.pathname.split("/")||[],relPath=relative.pathname&&relative.pathname.split("/")||[],psychotic=result.protocol&&!slashedProtocol[result.protocol];if(psychotic&&(result.hostname="",result.port=null,result.host&&(""===srcPath[0]?srcPath[0]=result.host:srcPath.unshift(result.host)),result.host="",relative.protocol&&(relative.hostname=null,relative.port=null,relative.host&&(""===relPath[0]?relPath[0]=relative.host:relPath.unshift(relative.host)),relative.host=null),mustEndAbs=mustEndAbs&&(""===relPath[0]||""===srcPath[0])),isRelAbs)result.host=relative.host||""===relative.host?relative.host:result.host,result.hostname=relative.hostname||""===relative.hostname?relative.hostname:result.hostname,result.search=relative.search,result.query=relative.query,srcPath=relPath;else if(relPath.length)srcPath||(srcPath=[]),srcPath.pop(),srcPath=srcPath.concat(relPath),result.search=relative.search,result.query=relative.query;else if(!util.isNullOrUndefined(relative.search)){if(psychotic){result.hostname=result.host=srcPath.shift();var authInHost=!!(result.host&&result.host.indexOf("@")>0)&&result.host.split("@");authInHost&&(result.auth=authInHost.shift(),result.host=result.hostname=authInHost.shift())}return result.search=relative.search,result.query=relative.query,util.isNull(result.pathname)&&util.isNull(result.search)||(result.path=(result.pathname?result.pathname:"")+(result.search?result.search:"")),result.href=result.format(),result}if(!srcPath.length)return result.pathname=null,result.search?result.path="/"+result.search:result.path=null,result.href=result.format(),result;for(var last=srcPath.slice(-1)[0],hasTrailingSlash=(result.host||relative.host||srcPath.length>1)&&("."===last||".."===last)||""===last,up=0,i=srcPath.length;i>=0;i--)last=srcPath[i],"."===last?srcPath.splice(i,1):".."===last?(srcPath.splice(i,1),up++):up&&(srcPath.splice(i,1),up--);if(!mustEndAbs&&!removeAllDots)for(;up--;up)srcPath.unshift("..");!mustEndAbs||""===srcPath[0]||srcPath[0]&&"/"===srcPath[0].charAt(0)||srcPath.unshift(""),hasTrailingSlash&&"/"!==srcPath.join("/").substr(-1)&&srcPath.push("");var isAbsolute=""===srcPath[0]||srcPath[0]&&"/"===srcPath[0].charAt(0);if(psychotic){result.hostname=result.host=isAbsolute?"":srcPath.length?srcPath.shift():"";var authInHost=!!(result.host&&result.host.indexOf("@")>0)&&result.host.split("@");authInHost&&(result.auth=authInHost.shift(),result.host=result.hostname=authInHost.shift())}return mustEndAbs=mustEndAbs||result.host&&srcPath.length,mustEndAbs&&!isAbsolute&&srcPath.unshift(""),srcPath.length?result.pathname=srcPath.join("/"):(result.pathname=null,result.path=null),util.isNull(result.pathname)&&util.isNull(result.search)||(result.path=(result.pathname?result.pathname:"")+(result.search?result.search:"")),result.auth=relative.auth||result.auth,result.slashes=result.slashes||relative.slashes,result.href=result.format(),result},Url.prototype.parseHost=function(){var host=this.host,port=portPattern.exec(host);port&&(port=port[0],":"!==port&&(this.port=port.substr(1)),host=host.substr(0,host.length-port.length)),host&&(this.hostname=host)}},{"./util":34,punycode:16,querystring:19}],34:[function(require,module,exports){"use strict";module.exports={isString:function(arg){return"string"==typeof arg},isObject:function(arg){return"object"==typeof arg&&null!==arg},isNull:function(arg){return null===arg},isNullOrUndefined:function(arg){return null==arg}}},{}],35:[function(require,module,exports){(function(global){function deprecate(fn,msg){function deprecated(){if(!warned){if(config("throwDeprecation"))throw new Error(msg);config("traceDeprecation")?console.trace(msg):console.warn(msg),warned=!0}return fn.apply(this,arguments)}if(config("noDeprecation"))return fn;var warned=!1;return deprecated}function config(name){try{if(!global.localStorage)return!1}catch(_){return!1}var val=global.localStorage[name];return null!=val&&"true"===String(val).toLowerCase()}module.exports=deprecate}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],36:[function(require,module,exports){function extend(){for(var target={},i=0;i<arguments.length;i++){var source=arguments[i];for(var key in source)hasOwnProperty.call(source,key)&&(target[key]=source[key])}return target}module.exports=extend;var hasOwnProperty=Object.prototype.hasOwnProperty},{}]},{},[1])(1)});
// manifold v1.1.11 https://github.com/viewdir/manifold#readme
!function(f){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=f();else if("function"==typeof define&&define.amd)define('lib/manifold.min.js',[],f);else{var g;g="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,g.manifold=f()}}(function(){return function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a="function"==typeof require&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}for(var i="function"==typeof require&&require,o=0;o<r.length;o++)s(r[o]);return s}({1:[function(require,module,exports){(function(global){var Manifold;!function(Manifold){var StringValue=function(){function StringValue(value){this.value="",value&&(this.value=value.toLowerCase())}return StringValue.prototype.toString=function(){return this.value},StringValue}();Manifold.StringValue=StringValue}(Manifold||(Manifold={}));var Manifold,__extends=this&&this.__extends||function(){var extendStatics=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(d,b){d.__proto__=b}||function(d,b){for(var p in b)b.hasOwnProperty(p)&&(d[p]=b[p])};return function(d,b){function __(){this.constructor=d}extendStatics(d,b),d.prototype=null===b?Object.create(b):(__.prototype=b.prototype,new __)}}();!function(Manifold){var TreeSortType=function(_super){function TreeSortType(){return null!==_super&&_super.apply(this,arguments)||this}return __extends(TreeSortType,_super),TreeSortType.prototype.date=function(){return new TreeSortType(TreeSortType.DATE.toString())},TreeSortType.prototype.none=function(){return new TreeSortType(TreeSortType.NONE.toString())},TreeSortType}(Manifold.StringValue);TreeSortType.DATE=new TreeSortType("date"),TreeSortType.NONE=new TreeSortType("none"),Manifold.TreeSortType=TreeSortType}(Manifold||(Manifold={}));var Manifold;!function(Manifold){var Bootstrapper=function(){function Bootstrapper(options){this._options=options,this._options.locale=this._options.locale||"en-GB"}return Bootstrapper.prototype.bootstrap=function(){var that=this;return new Promise(function(resolve,reject){var msie=that._msieversion();if(msie>0&&msie<11)if(9===msie){var settings={url:that._options.iiifResourceUri,type:"GET",dataType:"jsonp",jsonp:"callback",jsonpCallback:"manifestCallback"};$.ajax(settings),global.manifestCallback=function(json){that._loaded(that,JSON.stringify(json),resolve,reject)}}else 10===msie&&$.getJSON(that._options.iiifResourceUri,function(json){that._loaded(that,JSON.stringify(json),resolve,reject)});else manifesto.loadManifest(that._options.iiifResourceUri).then(function(json){that._loaded(that,json,resolve,reject)})})},Bootstrapper.prototype._loaded=function(bootstrapper,json,resolve,reject){var iiifResource=manifesto.create(json,{locale:bootstrapper._options.locale});if(bootstrapper._options.iiifResource||(bootstrapper._options.iiifResource=iiifResource),iiifResource.getIIIFResourceType().toString()===manifesto.IIIFResourceType.collection().toString()){var collections=iiifResource.getCollections();collections&&collections.length?iiifResource.getCollectionByIndex(bootstrapper._options.collectionIndex).then(function(collection){collection||reject("Collection index not found"),0===collection.getTotalManifests()&&0===bootstrapper._options.manifestIndex&&collection.getTotalCollections()>0&&(bootstrapper._options.collectionIndex=0,bootstrapper._options.iiifResourceUri=collection.id,bootstrapper.bootstrap()),collection.getManifestByIndex(bootstrapper._options.manifestIndex).then(function(manifest){bootstrapper._options.manifest=manifest;var helper=new Manifold.Helper(bootstrapper._options);resolve(helper)})}):iiifResource.getManifestByIndex(bootstrapper._options.manifestIndex).then(function(manifest){bootstrapper._options.manifest=manifest;var helper=new Manifold.Helper(bootstrapper._options);resolve(helper)})}else{bootstrapper._options.manifest=iiifResource;var helper=new Manifold.Helper(bootstrapper._options);resolve(helper)}},Bootstrapper.prototype._msieversion=function(){var ua=global.navigator.userAgent,msie=ua.indexOf("MSIE ");return msie>0?parseInt(ua.substring(msie+5,ua.indexOf(".",msie))):0},Bootstrapper}();Manifold.Bootstrapper=Bootstrapper}(Manifold||(Manifold={}));var Manifold;!function(Manifold){var ExternalResource=function(){function ExternalResource(resource,dataUriFunc){this.isResponseHandled=!1,resource.externalResource=this,this.dataUri=dataUriFunc(resource),this._parseAuthServices(resource)}return ExternalResource.prototype._parseAuthServices=function(resource){this.clickThroughService=manifesto.Utils.getService(resource,manifesto.ServiceProfile.clickThrough().toString()),this.loginService=manifesto.Utils.getService(resource,manifesto.ServiceProfile.login().toString()),this.restrictedService=manifesto.Utils.getService(resource,manifesto.ServiceProfile.restricted().toString()),this.clickThroughService?(this.logoutService=this.clickThroughService.getService(manifesto.ServiceProfile.logout().toString()),this.tokenService=this.clickThroughService.getService(manifesto.ServiceProfile.token().toString())):this.loginService?(this.logoutService=this.loginService.getService(manifesto.ServiceProfile.logout().toString()),this.tokenService=this.loginService.getService(manifesto.ServiceProfile.token().toString())):this.restrictedService&&(this.logoutService=this.restrictedService.getService(manifesto.ServiceProfile.logout().toString()),this.tokenService=this.restrictedService.getService(manifesto.ServiceProfile.token().toString()))},ExternalResource.prototype.isAccessControlled=function(){return!!(this.clickThroughService||this.loginService||this.restrictedService)},ExternalResource.prototype.hasServiceDescriptor=function(){return this.dataUri.endsWith("info.json")},ExternalResource.prototype.getData=function(accessToken){var that=this;return that.data={},new Promise(function(resolve,reject){var type="GET";if(!that.hasServiceDescriptor()){if(!that.isAccessControlled())return that.status=HTTPStatusCode.OK,void resolve(that);type="HEAD"}$.ajax({url:that.dataUri,type:type,dataType:"json",beforeSend:function(xhr){accessToken&&xhr.setRequestHeader("Authorization","Bearer "+accessToken.accessToken)}}).done(function(data){if(data){var uri=unescape(data["@id"]);that.data=data,that._parseAuthServices(that.data),uri.endsWith("/info.json")&&(uri=uri.substr(0,uri.lastIndexOf("/")));var dataUri=that.dataUri;dataUri.endsWith("/info.json")&&(dataUri=dataUri.substr(0,dataUri.lastIndexOf("/"))),uri!==dataUri&&that.loginService?that.status=HTTPStatusCode.MOVED_TEMPORARILY:that.status=HTTPStatusCode.OK,resolve(that)}else that.status=HTTPStatusCode.OK,resolve(that)}).fail(function(error){that.status=error.status,that.error=error,error.responseJSON&&that._parseAuthServices(error.responseJSON),resolve(that)})})},ExternalResource}();Manifold.ExternalResource=ExternalResource}(Manifold||(Manifold={}));var Manifold;!function(Manifold){var Helper=function(){function Helper(options){this.options=options,this.iiifResource=this.options.iiifResource,this.iiifResourceUri=this.options.iiifResourceUri,this.manifest=this.options.manifest,this.collectionIndex=this.options.collectionIndex||0,this.manifestIndex=this.options.manifestIndex||0,this.sequenceIndex=this.options.sequenceIndex||0,this.canvasIndex=this.options.canvasIndex||0}return Helper.prototype.getAutoCompleteService=function(){var service=this.getSearchWithinService();return service?service.getService(manifesto.ServiceProfile.autoComplete()):null},Helper.prototype.getAttribution=function(){return Manifesto.TranslationCollection.getValue(this.manifest.getAttribution())},Helper.prototype.getCanvases=function(){return this.getCurrentSequence().getCanvases()},Helper.prototype.getCanvasById=function(id){return this.getCurrentSequence().getCanvasById(id)},Helper.prototype.getCanvasesById=function(ids){for(var canvases=[],i=0;i<ids.length;i++){var id=ids[i];canvases.push(this.getCanvasById(id))}return canvases},Helper.prototype.getCanvasByIndex=function(index){return this.getCurrentSequence().getCanvasByIndex(index)},Helper.prototype.getCanvasIndexById=function(id){return this.getCurrentSequence().getCanvasIndexById(id)},Helper.prototype.getCanvasIndexByLabel=function(label){var foliated=this.getManifestType().toString()===manifesto.ManifestType.manuscript().toString();return this.getCurrentSequence().getCanvasIndexByLabel(label,foliated)},Helper.prototype.getCanvasRange=function(canvas,path){var ranges=this.getCanvasRanges(canvas);if(path){for(var i=0;i<ranges.length;i++){var range=ranges[i];if(range.path===path)return range}return null}return ranges[0]},Helper.prototype.getCanvasRanges=function(canvas){return canvas.ranges?canvas.ranges:(canvas.ranges=this.manifest.getAllRanges().en().where(function(range){return range.getCanvasIds().en().any(function(c){return c===canvas.id})}).toArray(),canvas.ranges)},Helper.prototype.getCollectionIndex=function(iiifResource){var index=null;return iiifResource.parentCollection&&(index=iiifResource.parentCollection.index),index},Helper.prototype.getCurrentCanvas=function(){return this.getCurrentSequence().getCanvasByIndex(this.canvasIndex)},Helper.prototype.getCurrentElement=function(){return this.getCanvasByIndex(this.canvasIndex)},Helper.prototype.getCurrentSequence=function(){return this.getSequenceByIndex(this.sequenceIndex)},Helper.prototype.getElementType=function(element){return element||(element=this.getCurrentCanvas()),element.getType()},Helper.prototype.getFirstPageIndex=function(){return 0},Helper.prototype.getInfoUri=function(canvas){var images=canvas.getImages();if(images&&images.length){for(var infoUri=null,firstImage=images[0],resource=firstImage.getResource(),services=resource.getServices(),i=0;i<services.length;i++){var service=services[i],id=service.id;id.endsWith("/")||(id+="/"),manifesto.Utils.isImageProfile(service.getProfile())&&(infoUri=id+"info.json")}return infoUri}var service=canvas.getService(manifesto.ServiceProfile.ixif());return service?service.getInfoUri():canvas.id},Helper.prototype.getLabel=function(){return Manifesto.TranslationCollection.getValue(this.manifest.getLabel())},Helper.prototype.getLastCanvasLabel=function(alphanumeric){return this.getCurrentSequence().getLastCanvasLabel(alphanumeric)},Helper.prototype.getLastPageIndex=function(){return this.getTotalCanvases()-1},Helper.prototype.getLicense=function(){return this.manifest.getLicense()},Helper.prototype.getLogo=function(){return this.manifest.getLogo()},Helper.prototype.getManifestType=function(){var manifestType=this.manifest.getManifestType();return""===manifestType.toString()&&(manifestType=manifesto.ManifestType.monograph()),manifestType},Helper.prototype.getMetadata=function(options){var metadataGroups=[],manifestMetadata=this.manifest.getMetadata(),manifestGroup=new Manifold.MetadataGroup(this.manifest);if(manifestMetadata&&manifestMetadata.length&&manifestGroup.addMetadata(manifestMetadata,!0),this.manifest.getDescription().length){var metadataItem=new Manifesto.MetadataItem(this.options.locale);metadataItem.label=[new Manifesto.Translation("description",this.options.locale)],metadataItem.value=this.manifest.getDescription(),metadataItem.isRootLevel=!0,manifestGroup.addItem(metadataItem)}if(this.manifest.getAttribution().length){var metadataItem=new Manifesto.MetadataItem(this.options.locale);metadataItem.label=[new Manifesto.Translation("attribution",this.options.locale)],metadataItem.value=this.manifest.getAttribution(),metadataItem.isRootLevel=!0,manifestGroup.addItem(metadataItem)}if(this.manifest.getLicense()){var item={label:"license",value:options&&options.licenseFormatter?options.licenseFormatter.format(this.manifest.getLicense()):this.manifest.getLicense()},metadataItem=new Manifesto.MetadataItem(this.options.locale);metadataItem.parse(item),metadataItem.isRootLevel=!0,manifestGroup.addItem(metadataItem)}if(this.manifest.getLogo()){var item={label:"logo",value:'<img src="'+this.manifest.getLogo()+'"/>'},metadataItem=new Manifesto.MetadataItem(this.options.locale);metadataItem.parse(item),metadataItem.isRootLevel=!0,manifestGroup.addItem(metadataItem)}return metadataGroups.push(manifestGroup),options?this._parseMetadataOptions(options,metadataGroups):metadataGroups},Helper.prototype._parseMetadataOptions=function(options,metadataGroups){var sequence=this.getCurrentSequence(),sequenceMetadata=sequence.getMetadata();if(sequenceMetadata&&sequenceMetadata.length){var sequenceGroup=new Manifold.MetadataGroup(sequence);sequenceGroup.addMetadata(sequenceMetadata),metadataGroups.push(sequenceGroup)}if(options.range){var rangeGroups=this._getRangeMetadata([],options.range);rangeGroups=rangeGroups.reverse(),metadataGroups=metadataGroups.concat(rangeGroups)}if(options.canvases&&options.canvases.length)for(var i=0;i<options.canvases.length;i++){var canvas=options.canvases[i],canvasMetadata=canvas.getMetadata();if(canvasMetadata&&canvasMetadata.length){var canvasGroup=new Manifold.MetadataGroup(canvas);canvasGroup.addMetadata(canvas.getMetadata()),metadataGroups.push(canvasGroup)}for(var images=canvas.getImages(),j=0;j<images.length;j++){var image=images[j],imageMetadata=image.getMetadata();if(imageMetadata&&imageMetadata.length){var imageGroup=new Manifold.MetadataGroup(image);imageGroup.addMetadata(imageMetadata),metadataGroups.push(imageGroup)}}}return metadataGroups},Helper.prototype._getRangeMetadata=function(metadataGroups,range){var rangeMetadata=range.getMetadata();if(rangeMetadata&&rangeMetadata.length){var rangeGroup=new Manifold.MetadataGroup(range);rangeGroup.addMetadata(rangeMetadata),metadataGroups.push(rangeGroup)}return range.parentRange?this._getRangeMetadata(metadataGroups,range.parentRange):metadataGroups},Helper.prototype.getMultiSelectState=function(){return this._multiSelectState||(this._multiSelectState=new Manifold.MultiSelectState,this._multiSelectState.ranges=this.getRanges().slice(0),this._multiSelectState.canvases=this.getCurrentSequence().getCanvases().slice(0)),this._multiSelectState},Helper.prototype.getRanges=function(){return this.manifest.getAllRanges()},Helper.prototype.getRangeByPath=function(path){return this.manifest.getRangeByPath(path)},Helper.prototype.getRangeCanvases=function(range){var ids=range.getCanvasIds();return this.getCanvasesById(ids)},Helper.prototype.getRelated=function(){return this.manifest.getRelated()},Helper.prototype.getResources=function(){var element=this.getCurrentElement();return element.getResources()},Helper.prototype.getSearchWithinService=function(){return this.manifest.getService(manifesto.ServiceProfile.searchWithin())},Helper.prototype.getSeeAlso=function(){return this.manifest.getSeeAlso()},Helper.prototype.getSequenceByIndex=function(index){return this.manifest.getSequenceByIndex(index)},Helper.prototype.getShareServiceUrl=function(){var url=null,shareService=this.manifest.getService(manifesto.ServiceProfile.shareExtensions());return shareService&&(shareService.length&&(shareService=shareService[0]),url=shareService.__jsonld.shareUrl),url},Helper.prototype.getSortedTreeNodesByDate=function(sortedTree,tree){var all=tree.nodes.en().traverseUnique(function(node){return node.nodes}).where(function(n){return n.data.type===manifesto.TreeNodeType.collection().toString()||n.data.type===manifesto.TreeNodeType.manifest().toString()}).toArray(),manifests=tree.nodes.en().traverseUnique(function(n){return n.nodes}).where(function(n){return n.data.type===manifesto.TreeNodeType.manifest().toString()}).toArray();this.createDecadeNodes(sortedTree,all),this.sortDecadeNodes(sortedTree),this.createYearNodes(sortedTree,all),this.sortYearNodes(sortedTree),this.createMonthNodes(sortedTree,manifests),this.sortMonthNodes(sortedTree),this.createDateNodes(sortedTree,manifests),this.pruneDecadeNodes(sortedTree)},Helper.prototype.getStartCanvasIndex=function(){return this.getCurrentSequence().getStartCanvasIndex()},Helper.prototype.getThumbs=function(width,height){return this.getCurrentSequence().getThumbs(width,height)},Helper.prototype.getTopRanges=function(){return this.manifest.getTopRanges()},Helper.prototype.getTotalCanvases=function(){return this.getCurrentSequence().getTotalCanvases()},Helper.prototype.getTrackingLabel=function(){return this.manifest.getTrackingLabel()},Helper.prototype.getTree=function(topRangeIndex,sortType){if(void 0===topRangeIndex&&(topRangeIndex=0),void 0===sortType&&(sortType=Manifold.TreeSortType.NONE),!this.iiifResource)return null;var tree;if(this.iiifResource.isCollection())tree=this.iiifResource.getDefaultTree();else{var topRanges=this.iiifResource.getTopRanges(),root=new manifesto.TreeNode;if(root.label="root",root.data=this.iiifResource,!topRanges.length)return root;var range=topRanges[topRangeIndex];tree=range.getTree(root)}var sortedTree=new manifesto.TreeNode;switch(sortType.toString()){case Manifold.TreeSortType.DATE.toString():if(this.treeHasNavDates(tree)){this.getSortedTreeNodesByDate(sortedTree,tree);break}default:sortedTree=tree}return sortedTree},Helper.prototype.treeHasNavDates=function(tree){var node=tree.nodes.en().traverseUnique(function(node){return node.nodes}).where(function(n){return!isNaN(n.navDate)}).first();return!!node},Helper.prototype.getViewingDirection=function(){var viewingDirection=this.getCurrentSequence().getViewingDirection();return viewingDirection.toString()||(viewingDirection=this.manifest.getViewingDirection()),viewingDirection},Helper.prototype.getViewingHint=function(){var viewingHint=this.getCurrentSequence().getViewingHint();return viewingHint.toString()||(viewingHint=this.manifest.getViewingHint()),viewingHint},Helper.prototype.hasParentCollection=function(){return!!this.manifest.parentCollection},Helper.prototype.hasRelatedPage=function(){var related=this.getRelated();return!!related&&(related.length&&(related=related[0]),"text/html"===related.format)},Helper.prototype.hasResources=function(){return this.getResources().length>0},Helper.prototype.isBottomToTop=function(){return this.getViewingDirection().toString()===manifesto.ViewingDirection.bottomToTop().toString()},Helper.prototype.isCanvasIndexOutOfRange=function(index){return this.getCurrentSequence().isCanvasIndexOutOfRange(index)},Helper.prototype.isContinuous=function(){return this.getViewingHint().toString()===manifesto.ViewingHint.continuous().toString()},Helper.prototype.isFirstCanvas=function(index){return"undefined"!=typeof index?this.getCurrentSequence().isFirstCanvas(index):this.getCurrentSequence().isFirstCanvas(this.canvasIndex)},Helper.prototype.isHorizontallyAligned=function(){return this.isLeftToRight()||this.isRightToLeft()},Helper.prototype.isLastCanvas=function(index){return"undefined"!=typeof index?this.getCurrentSequence().isLastCanvas(index):this.getCurrentSequence().isLastCanvas(this.canvasIndex)},Helper.prototype.isLeftToRight=function(){return this.getViewingDirection().toString()===manifesto.ViewingDirection.leftToRight().toString()},Helper.prototype.isMultiCanvas=function(){return this.getCurrentSequence().isMultiCanvas()},Helper.prototype.isMultiSequence=function(){return this.manifest.isMultiSequence()},Helper.prototype.isPaged=function(){return this.getViewingHint().toString()===manifesto.ViewingHint.paged().toString()},Helper.prototype.isPagingAvailable=function(){return this.isPagingEnabled()&&this.getTotalCanvases()>2},Helper.prototype.isPagingEnabled=function(){return this.manifest.isPagingEnabled()||this.getCurrentSequence().isPagingEnabled()},Helper.prototype.isRightToLeft=function(){return this.getViewingDirection().toString()===manifesto.ViewingDirection.rightToLeft().toString()},Helper.prototype.isTopToBottom=function(){return this.getViewingDirection().toString()===manifesto.ViewingDirection.topToBottom().toString()},Helper.prototype.isTotalCanvasesEven=function(){return this.getCurrentSequence().isTotalCanvasesEven()},Helper.prototype.isUIEnabled=function(name){var uiExtensions=this.manifest.getService(manifesto.ServiceProfile.uiExtensions());if(uiExtensions){var disableUI=uiExtensions.getProperty("disableUI");if(disableUI&&(disableUI.indexOf(name)!==-1||disableUI.indexOf(name.toLowerCase())!==-1))return!1}return!0},Helper.prototype.isVerticallyAligned=function(){return this.isTopToBottom()||this.isBottomToTop()},Helper.prototype.createDateNodes=function(rootNode,nodes){for(var i=0;i<nodes.length;i++){var node=nodes[i],year=this.getNodeYear(node),month=this.getNodeMonth(node),dateNode=new manifesto.TreeNode;dateNode.id=node.id,dateNode.label=this.getNodeDisplayDate(node),dateNode.data=node.data,dateNode.data.type=manifesto.TreeNodeType.manifest().toString(),dateNode.data.year=year,dateNode.data.month=month;var decadeNode=this.getDecadeNode(rootNode,year);if(decadeNode){var yearNode=this.getYearNode(decadeNode,year);if(yearNode){var monthNode=this.getMonthNode(yearNode,month);monthNode&&monthNode.addNode(dateNode)}}}},Helper.prototype.createDecadeNodes=function(rootNode,nodes){for(var i=0;i<nodes.length;i++){var node=nodes[i],year=this.getNodeYear(node),endYear=Number(year.toString().substr(0,3)+"9");if(!this.getDecadeNode(rootNode,year)){var decadeNode=new manifesto.TreeNode;decadeNode.label=year+" - "+endYear,decadeNode.navDate=node.navDate,decadeNode.data.startYear=year,decadeNode.data.endYear=endYear,rootNode.addNode(decadeNode)}}},Helper.prototype.createMonthNodes=function(rootNode,nodes){for(var i=0;i<nodes.length;i++){var node=nodes[i],year=this.getNodeYear(node),month=this.getNodeMonth(node),decadeNode=this.getDecadeNode(rootNode,year),yearNode=null;if(decadeNode&&(yearNode=this.getYearNode(decadeNode,year)),decadeNode&&yearNode&&!this.getMonthNode(yearNode,month)){var monthNode=new manifesto.TreeNode;monthNode.label=this.getNodeDisplayMonth(node),monthNode.navDate=node.navDate,monthNode.data.year=year,monthNode.data.month=month,yearNode.addNode(monthNode)}}},Helper.prototype.createYearNodes=function(rootNode,nodes){for(var i=0;i<nodes.length;i++){var node=nodes[i],year=this.getNodeYear(node),decadeNode=this.getDecadeNode(rootNode,year);if(decadeNode&&!this.getYearNode(decadeNode,year)){var yearNode=new manifesto.TreeNode;yearNode.label=year.toString(),yearNode.navDate=node.navDate,yearNode.data.year=year,decadeNode.addNode(yearNode)}}},Helper.prototype.getDecadeNode=function(rootNode,year){for(var i=0;i<rootNode.nodes.length;i++){var n=rootNode.nodes[i];if(year>=n.data.startYear&&year<=n.data.endYear)return n}return null},Helper.prototype.getMonthNode=function(yearNode,month){for(var i=0;i<yearNode.nodes.length;i++){var n=yearNode.nodes[i];if(month===this.getNodeMonth(n))return n}return null},Helper.prototype.getNodeDisplayDate=function(node){return node.navDate.toDateString()},Helper.prototype.getNodeDisplayMonth=function(node){var months=["January","February","March","April","May","June","July","August","September","October","November","December"];return months[node.navDate.getMonth()]},Helper.prototype.getNodeMonth=function(node){return node.navDate.getMonth()},Helper.prototype.getNodeYear=function(node){return node.navDate.getFullYear()},Helper.prototype.getYearNode=function(decadeNode,year){for(var i=0;i<decadeNode.nodes.length;i++){var n=decadeNode.nodes[i];if(year===this.getNodeYear(n))return n}return null},Helper.prototype.pruneDecadeNodes=function(rootNode){for(var pruned=[],i=0;i<rootNode.nodes.length;i++){var n=rootNode.nodes[i];n.nodes.length||pruned.push(n)}for(var j=0;j<pruned.length;j++){var p=pruned[j],index=rootNode.nodes.indexOf(p);index>-1&&rootNode.nodes.splice(index,1)}},Helper.prototype.sortDecadeNodes=function(rootNode){rootNode.nodes=rootNode.nodes.sort(function(a,b){return a.data.startYear-b.data.startYear})},Helper.prototype.sortMonthNodes=function(rootNode){for(var _this=this,i=0;i<rootNode.nodes.length;i++)for(var decadeNode=rootNode.nodes[i],j=0;j<decadeNode.nodes.length;j++){var monthNode=decadeNode.nodes[j];monthNode.nodes=monthNode.nodes.sort(function(a,b){return _this.getNodeMonth(a)-_this.getNodeMonth(b)})}},Helper.prototype.sortYearNodes=function(rootNode){for(var _this=this,i=0;i<rootNode.nodes.length;i++){var decadeNode=rootNode.nodes[i];decadeNode.nodes=decadeNode.nodes.sort(function(a,b){return _this.getNodeYear(a)-_this.getNodeYear(b)})}},Helper}();Manifold.Helper=Helper}(Manifold||(Manifold={}));var Manifold;!function(Manifold){function loadManifest(options){var bootstrapper=new Manifold.Bootstrapper(options);return bootstrapper.bootstrap()}Manifold.loadManifest=loadManifest}(Manifold||(Manifold={})),function(g){g.Manifold||(g.Manifold=Manifold)}(global);var Manifold;!function(Manifold){var MetadataGroup=function(){function MetadataGroup(resource,label){this.items=[],this.resource=resource,this.label=label}return MetadataGroup.prototype.addItem=function(item){this.items.push(item)},MetadataGroup.prototype.addMetadata=function(metadata,isRootLevel){void 0===isRootLevel&&(isRootLevel=!1);for(var i=0;i<metadata.length;i++){var item=metadata[i];item.isRootLevel=isRootLevel,this.addItem(item)}},MetadataGroup}();Manifold.MetadataGroup=MetadataGroup}(Manifold||(Manifold={}));var Manifold;!function(Manifold){var MetadataOptions=function(){function MetadataOptions(){}return MetadataOptions}();Manifold.MetadataOptions=MetadataOptions}(Manifold||(Manifold={}));var Manifold;!function(Manifold){var MultiSelectState=function(){function MultiSelectState(){this.isEnabled=!1,this.ranges=[],this.canvases=[]}return MultiSelectState.prototype.allCanvasesSelected=function(){return this.canvases.length>0&&this.getAllSelectedCanvases().length===this.canvases.length},MultiSelectState.prototype.allRangesSelected=function(){return this.ranges.length>0&&this.getAllSelectedRanges().length===this.ranges.length},MultiSelectState.prototype.allSelected=function(){return this.allRangesSelected()&&this.allCanvasesSelected()},MultiSelectState.prototype.getAll=function(){return this.canvases.concat(this.ranges)},MultiSelectState.prototype.getAllSelectedCanvases=function(){return this.canvases.en().where(function(c){return c.multiSelected}).toArray()},MultiSelectState.prototype.getAllSelectedRanges=function(){return this.ranges.en().where(function(r){return r.multiSelected}).toArray()},MultiSelectState.prototype.getCanvasById=function(id){return this.canvases.en().where(function(c){return c.id===id}).first()},MultiSelectState.prototype.getCanvasesByIds=function(ids){for(var canvases=[],i=0;i<ids.length;i++){var id=ids[i];canvases.push(this.getCanvasById(id))}return canvases},MultiSelectState.prototype.getRangeCanvases=function(range){var ids=range.getCanvasIds();return this.getCanvasesByIds(ids)},MultiSelectState.prototype.selectAll=function(selected){this.selectRanges(this.ranges,selected),this.selectCanvases(this.canvases,selected)},MultiSelectState.prototype.selectCanvas=function(canvas,selected){var c=this.canvases.en().where(function(c){return c.id===canvas.id}).first();c.multiSelected=selected},MultiSelectState.prototype.selectAllCanvases=function(selected){this.selectCanvases(this.canvases,selected)},MultiSelectState.prototype.selectCanvases=function(canvases,selected){for(var j=0;j<canvases.length;j++){var canvas=canvases[j];canvas.multiSelected=selected}},MultiSelectState.prototype.selectRange=function(range,selected){var r=this.ranges.en().where(function(r){return r.id===range.id}).first();r.multiSelected=selected;var canvases=this.getRangeCanvases(r);this.selectCanvases(canvases,selected)},MultiSelectState.prototype.selectAllRanges=function(selected){this.selectRanges(this.ranges,selected)},MultiSelectState.prototype.selectRanges=function(ranges,selected){for(var i=0;i<ranges.length;i++){var range=ranges[i];range.multiSelected=selected;var canvases=this.getCanvasesByIds(range.getCanvasIds());this.selectCanvases(canvases,selected)}},MultiSelectState.prototype.setEnabled=function(enabled){this.isEnabled=enabled;for(var items=this.getAll(),i=0;i<items.length;i++){var item=items[i];item.multiSelectEnabled=this.isEnabled,enabled||(item.multiSelected=!1)}},MultiSelectState}();Manifold.MultiSelectState=MultiSelectState}(Manifold||(Manifold={}));var Manifold;!function(Manifold){var SearchResult=function(){function SearchResult(resource,canvasIndex){this.rects=[],this.canvasIndex=canvasIndex,this.addRect(resource)}return SearchResult.prototype.addRect=function(resource){var rect=new Manifold.SearchResultRect(resource);rect.canvasIndex=this.canvasIndex,rect.index=this.rects.length,this.rects.push(rect),this.rects.sort(function(a,b){return a.index-b.index})},SearchResult}();Manifold.SearchResult=SearchResult}(Manifold||(Manifold={}));var Manifold;!function(Manifold){var SearchResultRect=function(){function SearchResultRect(result){this.isVisible=!0;var xywh=result.on.match(/.*xywh=(\d*),(\d*),(\d*),(\d*)/);this.x=Number(xywh[1]),this.y=Number(xywh[2]),this.width=Number(xywh[3]),this.height=Number(xywh[4]),this.chars=result.resource.chars}return SearchResultRect}();Manifold.SearchResultRect=SearchResultRect}(Manifold||(Manifold={}));var Manifold;!function(Manifold){var Translation=function(){function Translation(value,locale){this.value=value,this.locale=locale}return Translation}();Manifold.Translation=Translation}(Manifold||(Manifold={}));var Manifold;!function(Manifold){var UriLabeller=function(){function UriLabeller(labels){this.labels=labels}return UriLabeller.prototype.format=function(url){if(url.indexOf("<a")!=-1)return url;var label=this.labels[url]?this.labels[url]:url;return'<a href="'+url+'">'+label+"</a>"},UriLabeller}();Manifold.UriLabeller=UriLabeller}(Manifold||(Manifold={}))}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}]},{},[1])(1)});
// utils v0.0.38 https://github.com/edsilv/utils
!function(f){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=f();else if("function"==typeof define&&define.amd)define('lib/utils.min.js',[],f);else{var g;g="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,g.utils=f()}}(function(){return function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a="function"==typeof require&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}for(var i="function"==typeof require&&require,o=0;o<r.length;o++)s(r[o]);return s}({1:[function(require,module,exports){(function(global){var Utils;!function(Utils){var Async=function(){function Async(){}return Async.waitFor=function(test,successCallback,failureCallback,interval,maxTries,numTries){interval||(interval=200),maxTries||(maxTries=100),numTries||(numTries=0),numTries+=1,numTries>maxTries?failureCallback&&failureCallback():test()?successCallback():setTimeout(function(){Async.waitFor(test,successCallback,failureCallback,interval,maxTries,numTries)},interval)},Async}();Utils.Async=Async}(Utils||(Utils={}));var Utils;!function(Utils){var Bools=function(){function Bools(){}return Bools.getBool=function(val,defaultVal){return null===val||"undefined"==typeof val?defaultVal:val},Bools}();Utils.Bools=Bools}(Utils||(Utils={}));var Utils;!function(Utils){var Clipboard=function(){function Clipboard(){}return Clipboard.copy=function(text){var $tempDiv=$("<div style='position:absolute;left:-9999px'>"),brRegex=/<br\s*[\/]?>/gi;text=text.replace(brRegex,"\n"),$("body").append($tempDiv),$tempDiv.append(text);var $tempInput=$("<textarea>");$tempDiv.append($tempInput),$tempInput.val($tempDiv.text()).select(),document.execCommand("copy"),$tempDiv.remove()},Clipboard.supportsCopy=function(){return document.queryCommandSupported&&document.queryCommandSupported("copy")},Clipboard}();Utils.Clipboard=Clipboard}(Utils||(Utils={}));var Utils;!function(Utils){var Colors=function(){function Colors(){}return Colors.float32ColorToARGB=function(float32Color){var a=(4278190080&float32Color)>>>24,r=(16711680&float32Color)>>>16,g=(65280&float32Color)>>>8,b=255&float32Color,result=[a,r,g,b];return result},Colors._componentToHex=function(c){var hex=c.toString(16);return 1==hex.length?"0"+hex:hex},Colors.rgbToHexString=function(rgb){return Colors.coalesce(rgb),"#"+Colors._componentToHex(rgb[0])+Colors._componentToHex(rgb[1])+Colors._componentToHex(rgb[2])},Colors.argbToHexString=function(argb){return"#"+Colors._componentToHex(argb[0])+Colors._componentToHex(argb[1])+Colors._componentToHex(argb[2])+Colors._componentToHex(argb[3])},Colors.coalesce=function(arr){for(var i=1;i<arr.length;i++)"undefined"==typeof arr[i]&&(arr[i]=arr[i-1])},Colors}();Utils.Colors=Colors}(Utils||(Utils={}));var Utils;!function(Utils){var Dates=function(){function Dates(){}return Dates.getTimeStamp=function(){return(new Date).getTime()},Dates}();Utils.Dates=Dates}(Utils||(Utils={}));var Utils;!function(Utils){var Device=function(){function Device(){}return Device.getPixelRatio=function(ctx){var dpr=window.devicePixelRatio||1,bsr=ctx.webkitBackingStorePixelRatio||ctx.mozBackingStorePixelRatio||ctx.msBackingStorePixelRatio||ctx.oBackingStorePixelRatio||ctx.backingStorePixelRatio||1;return dpr/bsr},Device.isTouch=function(){return!!("ontouchstart"in window)||window.navigator.msMaxTouchPoints>0},Device}();Utils.Device=Device}(Utils||(Utils={}));var Utils;!function(Utils){var Documents=function(){function Documents(){}return Documents.isInIFrame=function(){try{return window.self!==window.top}catch(e){return!0}},Documents.supportsFullscreen=function(){var doc=document.documentElement,support=doc.requestFullscreen||doc.mozRequestFullScreen||doc.webkitRequestFullScreen||doc.msRequestFullscreen;return void 0!==support},Documents.isHidden=function(){var prop=Documents.getHiddenProp();return!!prop},Documents.getHiddenProp=function(){var prefixes=["webkit","moz","ms","o"];if("hidden"in document)return"hidden";for(var i=0;i<prefixes.length;i++)if(prefixes[i]+"Hidden"in document)return prefixes[i]+"Hidden";return null},Documents}();Utils.Documents=Documents}(Utils||(Utils={}));var Utils;!function(Utils){var Events=function(){function Events(){}return Events.debounce=function(fn,debounceDuration){return debounceDuration=debounceDuration||100,function(){if(!fn.debouncing){var args=Array.prototype.slice.apply(arguments);fn.lastReturnVal=fn.apply(window,args),fn.debouncing=!0}return clearTimeout(fn.debounceTimeout),fn.debounceTimeout=setTimeout(function(){fn.debouncing=!1},debounceDuration),fn.lastReturnVal}},Events}();Utils.Events=Events}(Utils||(Utils={}));var Utils;!function(Utils){var Files=function(){function Files(){}return Files.simplifyMimeType=function(mime){switch(mime){case"text/plain":return"txt";case"image/jpeg":return"jpg";case"application/msword":return"doc";case"application/vnd.openxmlformats-officedocument.wordprocessingml.document":return"docx";default:var parts=mime.split("/");return parts[parts.length-1]}},Files}();Utils.Files=Files}(Utils||(Utils={}));var Utils;!function(Utils){var Keyboard=function(){function Keyboard(){}return Keyboard.getCharCode=function(e){var charCode="number"==typeof e.which?e.which:e.keyCode;return charCode},Keyboard}();Utils.Keyboard=Keyboard}(Utils||(Utils={}));var Utils;!function(Utils){var Maths;!function(Maths){var Vector=function(){function Vector(x,y){this.X=x,this.Y=y}return Vector.prototype.get=function(){return new Vector(this.X,this.Y)},Vector.prototype.set=function(x,y){this.X=x,this.Y=y},Vector.prototype.add=function(v){this.X+=v.X,this.Y+=v.Y},Vector.add=function(v1,v2){return new Vector(v1.X+v2.X,v1.Y+v2.Y)},Vector.prototype.sub=function(v){this.X-=v.X,this.Y-=v.Y},Vector.sub=function(v1,v2){return new Vector(v1.X-v2.X,v1.Y-v2.Y)},Vector.prototype.mult=function(n){this.X=this.X*n,this.Y=this.Y*n},Vector.mult=function(v1,v2){return new Vector(v1.X*v2.X,v1.Y*v2.Y)},Vector.multN=function(v1,n){return new Vector(v1.X*n,v1.Y*n)},Vector.prototype.Div=function(n){this.X=this.X/n,this.Y=this.Y/n},Vector.div=function(v1,v2){return new Vector(v1.X/v2.X,v1.Y/v2.Y)},Vector.divN=function(v1,n){return new Vector(v1.X/n,v1.Y/n)},Vector.prototype.mag=function(){return Math.sqrt(this.X*this.X+this.Y*this.Y)},Vector.prototype.magSq=function(){return this.X*this.X+this.Y*this.Y},Vector.prototype.normalise=function(){var m=this.mag();0!=m&&1!=m&&this.Div(m)},Vector.prototype.limit=function(max){this.magSq()>max*max&&(this.normalise(),this.mult(max))},Vector.prototype.equals=function(v){return this.X==v.X&&this.Y==v.Y},Vector.prototype.heading=function(){var angle=Math.atan2(-this.Y,this.X);return-1*angle},Vector.random2D=function(){return Vector.fromAngle(Math.random()*Math.TAU)},Vector.fromAngle=function(angle){return new Vector(Math.cos(angle),Math.sin(angle))},Vector}();Maths.Vector=Vector}(Maths=Utils.Maths||(Utils.Maths={}))}(Utils||(Utils={}));var Utils;!function(Utils){var Measurements;!function(Measurements){var Size=function(){function Size(width,height){this.width=width,this.height=height}return Size}();Measurements.Size=Size;var Dimensions=function(){function Dimensions(){}return Dimensions.fitRect=function(width1,height1,width2,height2){var scale,ratio1=height1/width1,ratio2=height2/width2,width=0,height=0;return ratio1<ratio2&&(scale=width2/width1,width=width1*scale,height=height1*scale),ratio2<ratio1&&(scale=height2/height1,width=width1*scale,height=height1*scale),new Size(Math.floor(width),Math.floor(height))},Dimensions.hitRect=function(x,y,w,h,mx,my){return mx>x&&mx<x+w&&my>y&&my<y+h},Dimensions}();Measurements.Dimensions=Dimensions}(Measurements=Utils.Measurements||(Utils.Measurements={}))}(Utils||(Utils={}));var Utils;!function(Utils){var Numbers=function(){function Numbers(){}return Numbers.numericalInput=function(event){return 46==event.keyCode||8==event.keyCode||9==event.keyCode||27==event.keyCode||65==event.keyCode&&event.ctrlKey===!0||event.keyCode>=35&&event.keyCode<=39||(!(event.shiftKey||(event.keyCode<48||event.keyCode>57)&&(event.keyCode<96||event.keyCode>105))||(event.preventDefault(),!1))},Numbers}();Utils.Numbers=Numbers}(Utils||(Utils={}));var Utils;!function(Utils){var Objects=function(){function Objects(){}return Objects.toPlainObject=function(value){value=Object(value);var result={};for(var key in value)result[key]=value[key];return result},Objects}();Utils.Objects=Objects}(Utils||(Utils={}));var Utils;!function(Utils){var Storage=function(){function Storage(){}return Storage.clear=function(storageType){switch(void 0===storageType&&(storageType=Utils.StorageType.memory),storageType.value){case Utils.StorageType.memory.value:this._memoryStorage={};break;case Utils.StorageType.session.value:sessionStorage.clear();break;case Utils.StorageType.local.value:localStorage.clear()}},Storage.clearExpired=function(storageType){void 0===storageType&&(storageType=Utils.StorageType.memory);for(var items=this.getItems(storageType),i=0;i<items.length;i++){var item=items[i];this._isExpired(item)&&this.remove(item.key)}},Storage.get=function(key,storageType){void 0===storageType&&(storageType=Utils.StorageType.memory);var data=null;switch(storageType.value){case Utils.StorageType.memory.value:data=this._memoryStorage[key];break;case Utils.StorageType.session.value:data=sessionStorage.getItem(key);break;case Utils.StorageType.local.value:data=localStorage.getItem(key)}if(!data)return null;var item=JSON.parse(data);return this._isExpired(item)?null:(item.key=key,item)},Storage._isExpired=function(item){return!((new Date).getTime()<item.expiresAt)},Storage.getItems=function(storageType){void 0===storageType&&(storageType=Utils.StorageType.memory);var items=[];switch(storageType.value){case Utils.StorageType.memory.value:for(var keys=Object.keys(this._memoryStorage),i=0;i<keys.length;i++){var item=this.get(keys[i],Utils.StorageType.memory);item&&items.push(item)}break;case Utils.StorageType.session.value:for(var i=0;i<sessionStorage.length;i++){var key=sessionStorage.key(i);if(key){var item=this.get(key,Utils.StorageType.session);item&&items.push(item)}}break;case Utils.StorageType.local.value:for(var i=0;i<localStorage.length;i++){var key=localStorage.key(i);if(key){var item=this.get(key,Utils.StorageType.local);item&&items.push(item)}}}return items},Storage.remove=function(key,storageType){switch(void 0===storageType&&(storageType=Utils.StorageType.memory),storageType.value){case Utils.StorageType.memory.value:delete this._memoryStorage[key];break;case Utils.StorageType.session.value:sessionStorage.removeItem(key);break;case Utils.StorageType.local.value:localStorage.removeItem(key)}},Storage.set=function(key,value,expirationSecs,storageType){void 0===storageType&&(storageType=Utils.StorageType.memory);var expirationMS=1e3*expirationSecs,record=new Utils.StorageItem;switch(record.value=value,record.expiresAt=(new Date).getTime()+expirationMS,storageType.value){case Utils.StorageType.memory.value:this._memoryStorage[key]=JSON.stringify(record);break;case Utils.StorageType.session.value:sessionStorage.setItem(key,JSON.stringify(record));break;case Utils.StorageType.local.value:localStorage.setItem(key,JSON.stringify(record))}return record},Storage}();Storage._memoryStorage={},Utils.Storage=Storage}(Utils||(Utils={}));var Utils;!function(Utils){var StorageItem=function(){function StorageItem(){}return StorageItem}();Utils.StorageItem=StorageItem}(Utils||(Utils={}));var Utils;!function(Utils){var StorageType=function(){function StorageType(value){this.value=value}return StorageType.prototype.toString=function(){return this.value},StorageType}();StorageType.memory=new StorageType("memory"),StorageType.session=new StorageType("session"),StorageType.local=new StorageType("local"),Utils.StorageType=StorageType}(Utils||(Utils={}));var Utils;!function(Utils){var Strings=function(){function Strings(){}return Strings.ellipsis=function(text,chars){if(text.length<=chars)return text;var trimmedText=text.substr(0,chars),lastSpaceIndex=trimmedText.lastIndexOf(" ");return lastSpaceIndex!=-1&&(trimmedText=trimmedText.substr(0,Math.min(trimmedText.length,lastSpaceIndex))),trimmedText+"&hellip;"},Strings.htmlDecode=function(encoded){var div=document.createElement("div");return div.innerHTML=encoded,div.firstChild.nodeValue},Strings}();Utils.Strings=Strings}(Utils||(Utils={}));var Utils;!function(Utils){var Urls=function(){function Urls(){}return Urls.getHashParameter=function(key,doc){doc||(doc=window.document);var regex=new RegExp("#.*[?&]"+key+"=([^&]+)(&|$)"),match=regex.exec(doc.location.hash);return match?decodeURIComponent(match[1].replace(/\+/g," ")):null},Urls.setHashParameter=function(key,value,doc){doc||(doc=window.document);var kvp=this.updateURIKeyValuePair(doc.location.hash.replace("#?",""),key,value),newHash="#?"+kvp,url=doc.URL,index=url.indexOf("#");index!=-1&&(url=url.substr(0,url.indexOf("#"))),doc.location.replace(url+newHash)},Urls.getQuerystringParameter=function(key,w){return w||(w=window),this.getQuerystringParameterFromString(key,w.location.search)},Urls.getQuerystringParameterFromString=function(key,querystring){key=key.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]");var regex=new RegExp("[\\?&]"+key+"=([^&#]*)"),match=regex.exec(querystring);return match?decodeURIComponent(match[1].replace(/\+/g," ")):null},Urls.setQuerystringParameter=function(key,value,doc){doc||(doc=window.document);var kvp=this.updateURIKeyValuePair(doc.location.hash.replace("#?",""),key,value);window.location.search=kvp},Urls.updateURIKeyValuePair=function(uriSegment,key,value){key=encodeURIComponent(key),value=encodeURIComponent(value);var kvp=uriSegment.split("&");""==kvp[0]&&kvp.shift();for(var x,i=kvp.length;i--;)if(x=kvp[i].split("="),x[0]==key){x[1]=value,kvp[i]=x.join("=");break}return i<0&&(kvp[kvp.length]=[key,value].join("=")),kvp.join("&")},Urls.getUrlParts=function(url){var a=document.createElement("a");return a.href=url,a},Urls.convertToRelativeUrl=function(url){var parts=this.getUrlParts(url),relUri=parts.pathname+parts.searchWithin;return relUri.startsWith("/")||(relUri="/"+relUri),relUri},Urls}();Utils.Urls=Urls}(Utils||(Utils={})),global.Utils=module.exports=Utils}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}]},{},[1])(1)});
define('UVDataProvider',["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var UVDataProvider = (function () {
        function UVDataProvider() {
        }
        UVDataProvider.prototype.get = function (key, defaultValue) {
            return new Object();
        };
        UVDataProvider.prototype.set = function (key, value) {
        };
        return UVDataProvider;
    }());
    exports.UVDataProvider = UVDataProvider;
});
//# sourceMappingURL=UVDataProvider.js.map
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
define('URLDataProvider',["require", "exports", "./UVDataProvider"], function (require, exports, UVDataProvider_1) {
    "use strict";
    exports.__esModule = true;
    var URLDataProvider = (function (_super) {
        __extends(URLDataProvider, _super);
        function URLDataProvider() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        URLDataProvider.prototype.get = function (key, defaultValue) {
            return Utils.Urls.getHashParameter(key, document) || defaultValue;
        };
        URLDataProvider.prototype.set = function (key, value) {
            Utils.Urls.setHashParameter(key, value.toString(), document);
        };
        return URLDataProvider;
    }(UVDataProvider_1.UVDataProvider));
    exports["default"] = URLDataProvider;
});
//# sourceMappingURL=URLDataProvider.js.map
define('modules/uv-shared-module/BaseEvents',["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var BaseEvents = (function () {
        function BaseEvents() {
        }
        return BaseEvents;
    }());
    BaseEvents.ACCEPT_TERMS = 'acceptTerms';
    BaseEvents.BOOKMARK = 'bookmark';
    BaseEvents.CANVAS_INDEX_CHANGE_FAILED = 'canvasIndexChangeFailed';
    BaseEvents.CANVAS_INDEX_CHANGED = 'canvasIndexChanged';
    BaseEvents.CLICKTHROUGH = 'clickthrough';
    BaseEvents.CLOSE_ACTIVE_DIALOGUE = 'closeActiveDialogue';
    BaseEvents.CLOSE_LEFT_PANEL = 'closeLeftPanel';
    BaseEvents.CLOSE_RIGHT_PANEL = 'closeRightPanel';
    BaseEvents.COLLECTION_INDEX_CHANGED = 'collectionIndexChanged';
    BaseEvents.CREATE = 'create';
    BaseEvents.CREATED = 'created';
    BaseEvents.DOWN_ARROW = 'downArrow';
    BaseEvents.DOWNLOAD = 'download';
    BaseEvents.DROP = 'drop';
    BaseEvents.END = 'end';
    BaseEvents.ERROR = 'error';
    BaseEvents.ESCAPE = 'escape';
    BaseEvents.EXIT_FULLSCREEN = 'exitFullScreen';
    BaseEvents.EXTERNAL_LINK_CLICKED = 'externalLinkClicked';
    BaseEvents.FEEDBACK = 'feedback';
    BaseEvents.FORBIDDEN = 'forbidden';
    BaseEvents.HIDE_CLICKTHROUGH_DIALOGUE = 'hideClickthroughDialogue';
    BaseEvents.HIDE_DOWNLOAD_DIALOGUE = 'hideDownloadDialogue';
    BaseEvents.HIDE_EMBED_DIALOGUE = 'hideEmbedDialogue';
    BaseEvents.HIDE_EXTERNALCONTENT_DIALOGUE = 'hideExternalContentDialogue';
    BaseEvents.HIDE_GENERIC_DIALOGUE = 'hideGenericDialogue';
    BaseEvents.HIDE_HELP_DIALOGUE = 'hideHelpDialogue';
    BaseEvents.HIDE_INFORMATION = 'hideInformation';
    BaseEvents.HIDE_LOGIN_DIALOGUE = 'hideLoginDialogue';
    BaseEvents.HIDE_MOREINFO_DIALOGUE = 'hideMoreInfoDialogue';
    BaseEvents.HIDE_OVERLAY = 'hideOverlay';
    BaseEvents.HIDE_RESTRICTED_DIALOGUE = 'hideRestrictedDialogue';
    BaseEvents.HIDE_SETTINGS_DIALOGUE = 'hideSettingsDialogue';
    BaseEvents.HIDE_SHARE_DIALOGUE = 'hideShareDialogue';
    BaseEvents.HOME = 'home';
    BaseEvents.LEFT_ARROW = 'leftArrow';
    BaseEvents.LEFTPANEL_COLLAPSE_FULL_FINISH = 'leftPanelCollapseFullFinish';
    BaseEvents.LEFTPANEL_COLLAPSE_FULL_START = 'leftPanelCollapseFullStart';
    BaseEvents.LEFTPANEL_EXPAND_FULL_FINISH = 'leftPanelExpandFullFinish';
    BaseEvents.LEFTPANEL_EXPAND_FULL_START = 'leftPanelExpandFullStart';
    BaseEvents.LOAD_FAILED = 'loadFailed';
    BaseEvents.LOGIN_FAILED = 'loginFailed';
    BaseEvents.LOGIN = 'login';
    BaseEvents.LOGOUT = 'logout';
    BaseEvents.MANIFEST_INDEX_CHANGED = 'manifestIndexChanged';
    BaseEvents.METRIC_CHANGED = 'metricChanged';
    BaseEvents.MINUS = 'minus';
    BaseEvents.NOT_FOUND = 'notFound';
    BaseEvents.OPEN_EXTERNAL_RESOURCE = 'openExternalResource';
    BaseEvents.OPEN_LEFT_PANEL = 'openLeftPanel';
    BaseEvents.OPEN_RIGHT_PANEL = 'openRightPanel';
    BaseEvents.OPEN = 'open';
    BaseEvents.PAGE_DOWN = 'pageDown';
    BaseEvents.PAGE_UP = 'pageUp';
    BaseEvents.PLUS = 'plus';
    BaseEvents.REDIRECT = 'redirect';
    BaseEvents.REFRESH = 'refresh';
    BaseEvents.RELOAD = 'reload';
    BaseEvents.RESIZE = 'resize';
    BaseEvents.RESOURCE_DEGRADED = 'resourceDegraded';
    BaseEvents.RETRY = 'retry';
    BaseEvents.RETURN = 'return';
    BaseEvents.RIGHT_ARROW = 'rightArrow';
    BaseEvents.RIGHTPANEL_COLLAPSE_FULL_FINISH = 'rightPanelCollapseFullFinish';
    BaseEvents.RIGHTPANEL_COLLAPSE_FULL_START = 'rightPanelCollapseFullStart';
    BaseEvents.RIGHTPANEL_EXPAND_FULL_FINISH = 'rightPanelExpandFullFinish';
    BaseEvents.RIGHTPANEL_EXPAND_FULL_START = 'rightPanelExpandFullStart';
    BaseEvents.SEQUENCE_INDEX_CHANGED = 'sequenceIndexChanged';
    BaseEvents.SETTINGS_CHANGED = 'settingsChanged';
    BaseEvents.SHOW_CLICKTHROUGH_DIALOGUE = 'showClickThroughDialogue';
    BaseEvents.SHOW_DOWNLOAD_DIALOGUE = 'showDownloadDialogue';
    BaseEvents.SHOW_EMBED_DIALOGUE = 'showEmbedDialogue';
    BaseEvents.SHOW_EXTERNALCONTENT_DIALOGUE = 'showExternalContentDialogue';
    BaseEvents.SHOW_GENERIC_DIALOGUE = 'showGenericDialogue';
    BaseEvents.SHOW_HELP_DIALOGUE = 'showHelpDialogue';
    BaseEvents.SHOW_INFORMATION = 'showInformation';
    BaseEvents.SHOW_LOGIN_DIALOGUE = 'showLoginDialogue';
    BaseEvents.SHOW_MOREINFO_DIALOGUE = 'showMoreInfoDialogue';
    BaseEvents.SHOW_OVERLAY = 'showOverlay';
    BaseEvents.SHOW_RESTRICTED_DIALOGUE = 'showRestrictedDialogue';
    BaseEvents.SHOW_SETTINGS_DIALOGUE = 'showSettingsDialogue';
    BaseEvents.SHOW_SHARE_DIALOGUE = 'showShareDialogue';
    BaseEvents.SHOW_TERMS_OF_USE = 'showTermsOfUse';
    BaseEvents.THUMB_SELECTED = 'thumbSelected';
    BaseEvents.TOGGLE_EXPAND_LEFT_PANEL = 'toggleExpandLeftPanel';
    BaseEvents.TOGGLE_EXPAND_RIGHT_PANEL = 'toggleExpandRightPanel';
    BaseEvents.TOGGLE_FULLSCREEN = 'toggleFullScreen';
    BaseEvents.UP_ARROW = 'upArrow';
    BaseEvents.UPDATE_SETTINGS = 'updateSettings';
    BaseEvents.VIEW_FULL_TERMS = 'viewFullTerms';
    BaseEvents.WINDOW_UNLOAD = 'windowUnload';
    exports.BaseEvents = BaseEvents;
});
//# sourceMappingURL=BaseEvents.js.map
define('modules/uv-shared-module/Panel',["require", "exports", "./BaseEvents"], function (require, exports, BaseEvents_1) {
    "use strict";
    exports.__esModule = true;
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
            $.subscribe(BaseEvents_1.BaseEvents.RESIZE, function () {
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
//# sourceMappingURL=Panel.js.map
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
    exports.__esModule = true;
    var BaseView = (function (_super) {
        __extends(BaseView, _super);
        function BaseView($element, fitToParentWidth, fitToParentHeight) {
            return _super.call(this, $element, fitToParentWidth, fitToParentHeight) || this;
        }
        BaseView.prototype.create = function () {
            this.component = this.$element.closest('.uv').data("component");
            _super.prototype.create.call(this);
            this.extension = this.component.extension;
            this.config = {};
            this.config.content = {};
            this.config.options = {};
            var that = this;
            // build config inheritance chain
            if (that.modules && that.modules.length) {
                that.modules = that.modules.reverse();
                $.each(that.modules, function (index, moduleName) {
                    that.config = $.extend(true, that.config, that.extension.data.config.modules[moduleName]);
                });
            }
            this.content = this.config.content;
            this.options = this.config.options;
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
//# sourceMappingURL=BaseView.js.map
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
define('modules/uv-shared-module/Dialogue',["require", "exports", "./BaseView", "./BaseEvents"], function (require, exports, BaseView_1, BaseEvents_1) {
    "use strict";
    exports.__esModule = true;
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
            $.subscribe(BaseEvents_1.BaseEvents.CLOSE_ACTIVE_DIALOGUE, function () {
                if (_this.isActive) {
                    if (_this.allowClose) {
                        _this.close();
                    }
                }
            });
            $.subscribe(BaseEvents_1.BaseEvents.ESCAPE, function () {
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
                var buttonPos = Math.normalise(this.$triggerButton.position().left, 0, this.extension.width());
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
            $.publish(BaseEvents_1.BaseEvents.SHOW_OVERLAY);
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
            $.publish(BaseEvents_1.BaseEvents.HIDE_OVERLAY);
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
//# sourceMappingURL=Dialogue.js.map
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
define('modules/uv-dialogues-module/ClickThroughDialogue',["require", "exports", "../uv-shared-module/BaseEvents", "../uv-shared-module/Dialogue"], function (require, exports, BaseEvents_1, Dialogue_1) {
    "use strict";
    exports.__esModule = true;
    var ClickThroughDialogue = (function (_super) {
        __extends(ClickThroughDialogue, _super);
        function ClickThroughDialogue($element) {
            return _super.call(this, $element) || this;
        }
        ClickThroughDialogue.prototype.create = function () {
            var _this = this;
            this.setConfig('clickThroughDialogue');
            _super.prototype.create.call(this);
            this.openCommand = BaseEvents_1.BaseEvents.SHOW_CLICKTHROUGH_DIALOGUE;
            this.closeCommand = BaseEvents_1.BaseEvents.HIDE_CLICKTHROUGH_DIALOGUE;
            $.subscribe(this.openCommand, function (e, params) {
                _this.acceptCallback = params.acceptCallback;
                _this.resource = params.resource;
                _this.open();
            });
            $.subscribe(this.closeCommand, function () {
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
                $.publish(BaseEvents_1.BaseEvents.ACCEPT_TERMS);
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
                $.publish(BaseEvents_1.BaseEvents.EXTERNAL_LINK_CLICKED, [url]);
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
//# sourceMappingURL=ClickThroughDialogue.js.map
define('modules/uv-shared-module/InformationArgs',["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var InformationArgs = (function () {
        function InformationArgs(informationType, param) {
            this.informationType = informationType;
            this.param = param;
        }
        return InformationArgs;
    }());
    exports.InformationArgs = InformationArgs;
});
//# sourceMappingURL=InformationArgs.js.map
define('modules/uv-shared-module/InformationType',["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var InformationType;
    (function (InformationType) {
        InformationType[InformationType["AUTH_CORS_ERROR"] = 0] = "AUTH_CORS_ERROR";
        InformationType[InformationType["DEGRADED_RESOURCE"] = 1] = "DEGRADED_RESOURCE";
    })(InformationType = exports.InformationType || (exports.InformationType = {}));
});
//# sourceMappingURL=InformationType.js.map
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
define('modules/uv-dialogues-module/LoginDialogue',["require", "exports", "../uv-shared-module/BaseEvents", "../uv-shared-module/Dialogue"], function (require, exports, BaseEvents_1, Dialogue_1) {
    "use strict";
    exports.__esModule = true;
    var LoginDialogue = (function (_super) {
        __extends(LoginDialogue, _super);
        function LoginDialogue($element) {
            return _super.call(this, $element) || this;
        }
        LoginDialogue.prototype.create = function () {
            var _this = this;
            this.setConfig('loginDialogue');
            _super.prototype.create.call(this);
            this.openCommand = BaseEvents_1.BaseEvents.SHOW_LOGIN_DIALOGUE;
            this.closeCommand = BaseEvents_1.BaseEvents.HIDE_LOGIN_DIALOGUE;
            $.subscribe(this.openCommand, function (s, e) {
                _this.loginCallback = e.loginCallback;
                _this.logoutCallback = e.logoutCallback;
                _this.options = e.options;
                _this.resource = e.resource;
                _this.open();
            });
            $.subscribe(this.closeCommand, function () {
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
                message = '<span class="warning">' + this.extension.data.config.content[this.options.warningMessage] + '</span><span class="description">' + message + '</span>';
            }
            this.updateLogoutButton();
            this.$message.html(message);
            this.$message.targetBlank();
            this.$message.find('a').on('click', function () {
                var url = $(this).attr('href');
                $.publish(BaseEvents_1.BaseEvents.EXTERNAL_LINK_CLICKED, [url]);
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
//# sourceMappingURL=LoginDialogue.js.map
define('modules/uv-shared-module/LoginWarningMessages',["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var LoginWarningMessages = (function () {
        function LoginWarningMessages() {
        }
        return LoginWarningMessages;
    }());
    LoginWarningMessages.FORBIDDEN = "forbiddenResourceMessage";
    exports.LoginWarningMessages = LoginWarningMessages;
});
//# sourceMappingURL=LoginWarningMessages.js.map
define('modules/uv-shared-module/StringValue',["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var StringValue = (function () {
        function StringValue(value) {
            this.value = "";
            if (value) {
                this.value = value.toLowerCase();
            }
        }
        StringValue.prototype.toString = function () {
            return this.value;
        };
        return StringValue;
    }());
    exports.StringValue = StringValue;
});
//# sourceMappingURL=StringValue.js.map
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
define('modules/uv-shared-module/MetricType',["require", "exports", "./StringValue"], function (require, exports, StringValue_1) {
    "use strict";
    exports.__esModule = true;
    var MetricType = (function (_super) {
        __extends(MetricType, _super);
        function MetricType() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return MetricType;
    }(StringValue_1.StringValue));
    MetricType.MOBILELANDSCAPE = new MetricType("mobilelandscape");
    MetricType.LAPTOP = new MetricType("laptop");
    exports.MetricType = MetricType;
});
//# sourceMappingURL=MetricType.js.map
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
define('modules/uv-dialogues-module/RestrictedDialogue',["require", "exports", "../uv-shared-module/BaseEvents", "../uv-shared-module/Dialogue"], function (require, exports, BaseEvents_1, Dialogue_1) {
    "use strict";
    exports.__esModule = true;
    var RestrictedDialogue = (function (_super) {
        __extends(RestrictedDialogue, _super);
        function RestrictedDialogue($element) {
            return _super.call(this, $element) || this;
        }
        RestrictedDialogue.prototype.create = function () {
            var _this = this;
            this.setConfig('restrictedDialogue');
            _super.prototype.create.call(this);
            this.openCommand = BaseEvents_1.BaseEvents.SHOW_RESTRICTED_DIALOGUE;
            this.closeCommand = BaseEvents_1.BaseEvents.HIDE_RESTRICTED_DIALOGUE;
            $.subscribe(this.openCommand, function (s, e) {
                _this.acceptCallback = e.acceptCallback;
                _this.options = e.options;
                _this.resource = e.resource;
                _this.open();
            });
            $.subscribe(this.closeCommand, function () {
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
                $.publish(BaseEvents_1.BaseEvents.EXTERNAL_LINK_CLICKED, [url]);
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
//# sourceMappingURL=RestrictedDialogue.js.map
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
define('modules/uv-shared-module/GenericDialogue',["require", "exports", "./BaseEvents", "./Dialogue"], function (require, exports, BaseEvents_1, Dialogue_1) {
    "use strict";
    exports.__esModule = true;
    var GenericDialogue = (function (_super) {
        __extends(GenericDialogue, _super);
        function GenericDialogue($element) {
            return _super.call(this, $element) || this;
        }
        GenericDialogue.prototype.create = function () {
            var _this = this;
            this.setConfig('genericDialogue');
            _super.prototype.create.call(this);
            this.openCommand = BaseEvents_1.BaseEvents.SHOW_GENERIC_DIALOGUE;
            this.closeCommand = BaseEvents_1.BaseEvents.HIDE_GENERIC_DIALOGUE;
            $.subscribe(this.openCommand, function (e, params) {
                _this.acceptCallback = params.acceptCallback;
                _this.showMessage(params);
            });
            $.subscribe(this.closeCommand, function () {
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
            $.publish(BaseEvents_1.BaseEvents.CLOSE_ACTIVE_DIALOGUE);
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
//# sourceMappingURL=GenericDialogue.js.map
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
define('modules/uv-shared-module/Shell',["require", "exports", "./BaseEvents", "./BaseView", "./GenericDialogue"], function (require, exports, BaseEvents_1, BaseView_1, GenericDialogue_1) {
    "use strict";
    exports.__esModule = true;
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
            $.subscribe(BaseEvents_1.BaseEvents.SHOW_OVERLAY, function () {
                Shell.$overlays.show();
            });
            $.subscribe(BaseEvents_1.BaseEvents.HIDE_OVERLAY, function () {
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
                    $.publish(BaseEvents_1.BaseEvents.CLOSE_ACTIVE_DIALOGUE);
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
//# sourceMappingURL=Shell.js.map
define('SynchronousRequire',["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var SynchronousRequire = (function () {
        function SynchronousRequire() {
        }
        SynchronousRequire.load = function (deps, cb) {
            var loaders = [];
            for (var i = 0; i < deps.length; i++) {
                var depLoader = new DependencyLoader(i, deps[i], cb);
                loaders.push(depLoader);
            }
            var sequence = Promise.resolve();
            loaders.forEach(function (loader) {
                sequence = sequence.then(function () {
                    return loader.load();
                });
            });
            return sequence;
        };
        return SynchronousRequire;
    }());
    exports.SynchronousRequire = SynchronousRequire;
    var DependencyLoader = (function () {
        function DependencyLoader(index, dep, cb) {
            this._dep = dep;
            this._cb = cb;
            this._index = index;
        }
        DependencyLoader.prototype.load = function () {
            var that = this;
            return new Promise(function (resolve) {
                requirejs([that._dep], function (dep) {
                    that._cb(that._index, dep);
                    resolve();
                });
            });
        };
        return DependencyLoader;
    }());
});
//# sourceMappingURL=SynchronousRequire.js.map
define('modules/uv-shared-module/BaseExtension',["require", "exports", "./BaseEvents", "../../modules/uv-dialogues-module/ClickThroughDialogue", "./InformationArgs", "./InformationType", "../../modules/uv-dialogues-module/LoginDialogue", "./LoginWarningMessages", "../../modules/uv-shared-module/MetricType", "../../modules/uv-dialogues-module/RestrictedDialogue", "./Shell", "../../SynchronousRequire"], function (require, exports, BaseEvents_1, ClickThroughDialogue_1, InformationArgs_1, InformationType_1, LoginDialogue_1, LoginWarningMessages_1, MetricType_1, RestrictedDialogue_1, Shell_1, SynchronousRequire_1) {
    "use strict";
    exports.__esModule = true;
    var BaseExtension = (function () {
        function BaseExtension() {
            this.isCreated = false;
            this.isLoggedIn = false;
            this.metric = MetricType_1.MetricType.LAPTOP;
            this.metrics = [];
            this.shifted = false;
            this.tabbing = false;
        }
        BaseExtension.prototype.create = function () {
            var _this = this;
            var that = this;
            this.$element = $(this.component.options.target);
            this.$element.data("component", this.component);
            this.fire(BaseEvents_1.BaseEvents.CREATE, {
                data: this.data,
                settings: this.getSettings(),
                preview: this.getSharePreview()
            });
            this._parseMetrics();
            this._initLocales();
            // add/remove classes.
            this.$element.empty();
            this.$element.removeClass();
            this.$element.addClass('uv');
            this.$element.addClass(this.data.locales[0].name.toLowerCase());
            this.$element.addClass(this.name);
            this.$element.addClass('browser-' + window.browserDetect.browser);
            this.$element.addClass('browser-version-' + window.browserDetect.version);
            this.$element.prop('tabindex', 0);
            if (!this.data.isHomeDomain)
                this.$element.addClass('embedded');
            if (this.data.isLightbox)
                this.$element.addClass('lightbox');
            this.$element.on('mousemove', function (e) {
                _this.mouseX = e.pageX;
                _this.mouseY = e.pageY;
            });
            // events
            if (!this.data.isReload) {
                var visibilityProp = Utils.Documents.getHiddenProp();
                if (visibilityProp) {
                    var event_1 = visibilityProp.replace(/[H|h]idden/, '') + 'visibilitychange';
                    document.addEventListener(event_1, function () {
                        // resize after a tab has been shown (fixes safari layout issue)
                        if (!Utils.Documents.isHidden()) {
                            _this.resize();
                        }
                    });
                }
                if (Utils.Bools.getBool(this.data.config.options.dropEnabled, true)) {
                    this.$element.on('drop', (function (e) {
                        e.preventDefault();
                        var dropUrl = e.originalEvent.dataTransfer.getData('URL');
                        var a = Utils.Urls.getUrlParts(dropUrl);
                        var iiifResourceUri = Utils.Urls.getQuerystringParameterFromString('manifest', a.search);
                        //var canvasUri = Utils.Urls.getQuerystringParameterFromString('canvas', url.search);
                        if (iiifResourceUri) {
                            _this.fire(BaseEvents_1.BaseEvents.DROP, iiifResourceUri);
                            var data = {};
                            data.iiifResourceUri = iiifResourceUri;
                            _this.reload(data);
                        }
                    }));
                }
                this.$element.on('dragover', (function (e) {
                    // allow drop
                    e.preventDefault();
                }));
                // keyboard events.
                this.$element.on('keyup keydown', function (e) {
                    _this.shifted = e.shiftKey;
                    _this.tabbing = e.keyCode === KeyCodes.KeyDown.Tab;
                });
                this.$element.on('keydown', function (e) {
                    var event = null;
                    var preventDefault = true;
                    if (!e.ctrlKey && !e.altKey && !e.shiftKey) {
                        if (e.keyCode === KeyCodes.KeyDown.Enter) {
                            event = BaseEvents_1.BaseEvents.RETURN;
                            preventDefault = false;
                        }
                        if (e.keyCode === KeyCodes.KeyDown.Escape)
                            event = BaseEvents_1.BaseEvents.ESCAPE;
                        if (e.keyCode === KeyCodes.KeyDown.PageUp)
                            event = BaseEvents_1.BaseEvents.PAGE_UP;
                        if (e.keyCode === KeyCodes.KeyDown.PageDown)
                            event = BaseEvents_1.BaseEvents.PAGE_DOWN;
                        if (e.keyCode === KeyCodes.KeyDown.End)
                            event = BaseEvents_1.BaseEvents.END;
                        if (e.keyCode === KeyCodes.KeyDown.Home)
                            event = BaseEvents_1.BaseEvents.HOME;
                        if (e.keyCode === KeyCodes.KeyDown.NumpadPlus || e.keyCode === 171 || e.keyCode === KeyCodes.KeyDown.Equals) {
                            event = BaseEvents_1.BaseEvents.PLUS;
                            preventDefault = false;
                        }
                        if (e.keyCode === KeyCodes.KeyDown.NumpadMinus || e.keyCode === 173 || e.keyCode === KeyCodes.KeyDown.Dash) {
                            event = BaseEvents_1.BaseEvents.MINUS;
                            preventDefault = false;
                        }
                        if (that.useArrowKeysToNavigate()) {
                            if (e.keyCode === KeyCodes.KeyDown.LeftArrow)
                                event = BaseEvents_1.BaseEvents.LEFT_ARROW;
                            if (e.keyCode === KeyCodes.KeyDown.UpArrow)
                                event = BaseEvents_1.BaseEvents.UP_ARROW;
                            if (e.keyCode === KeyCodes.KeyDown.RightArrow)
                                event = BaseEvents_1.BaseEvents.RIGHT_ARROW;
                            if (e.keyCode === KeyCodes.KeyDown.DownArrow)
                                event = BaseEvents_1.BaseEvents.DOWN_ARROW;
                        }
                    }
                    if (event) {
                        if (preventDefault) {
                            e.preventDefault();
                        }
                        $.publish(event);
                    }
                });
                if (this.data.isHomeDomain) {
                    $.subscribe(BaseEvents_1.BaseEvents.EXIT_FULLSCREEN, function () {
                        if (_this.isOverlayActive()) {
                            $.publish(BaseEvents_1.BaseEvents.ESCAPE);
                        }
                        $.publish(BaseEvents_1.BaseEvents.ESCAPE);
                        $.publish(BaseEvents_1.BaseEvents.RESIZE);
                    });
                }
            }
            this.$element.append('<a href="/" id="top"></a>');
            this.$element.append('<iframe id="commsFrame" style="display:none"></iframe>');
            $.subscribe(BaseEvents_1.BaseEvents.ACCEPT_TERMS, function () {
                _this.fire(BaseEvents_1.BaseEvents.ACCEPT_TERMS);
            });
            $.subscribe(BaseEvents_1.BaseEvents.LOGIN_FAILED, function () {
                _this.fire(BaseEvents_1.BaseEvents.LOGIN_FAILED);
                _this.showMessage(_this.data.config.content.authorisationFailedMessage);
            });
            $.subscribe(BaseEvents_1.BaseEvents.LOGIN, function () {
                _this.isLoggedIn = true;
                _this.fire(BaseEvents_1.BaseEvents.LOGIN);
            });
            $.subscribe(BaseEvents_1.BaseEvents.LOGOUT, function () {
                _this.isLoggedIn = false;
                _this.fire(BaseEvents_1.BaseEvents.LOGOUT);
            });
            $.subscribe(BaseEvents_1.BaseEvents.BOOKMARK, function () {
                _this.bookmark();
                _this.fire(BaseEvents_1.BaseEvents.BOOKMARK);
            });
            $.subscribe(BaseEvents_1.BaseEvents.CANVAS_INDEX_CHANGE_FAILED, function () {
                _this.fire(BaseEvents_1.BaseEvents.CANVAS_INDEX_CHANGE_FAILED);
            });
            $.subscribe(BaseEvents_1.BaseEvents.CANVAS_INDEX_CHANGED, function (e, canvasIndex) {
                _this.fire(BaseEvents_1.BaseEvents.CANVAS_INDEX_CHANGED, canvasIndex);
            });
            $.subscribe(BaseEvents_1.BaseEvents.CLICKTHROUGH, function () {
                _this.fire(BaseEvents_1.BaseEvents.CLICKTHROUGH);
            });
            $.subscribe(BaseEvents_1.BaseEvents.CLOSE_ACTIVE_DIALOGUE, function () {
                _this.fire(BaseEvents_1.BaseEvents.CLOSE_ACTIVE_DIALOGUE);
            });
            $.subscribe(BaseEvents_1.BaseEvents.CLOSE_LEFT_PANEL, function () {
                _this.fire(BaseEvents_1.BaseEvents.CLOSE_LEFT_PANEL);
                _this.resize();
            });
            $.subscribe(BaseEvents_1.BaseEvents.CLOSE_RIGHT_PANEL, function () {
                _this.fire(BaseEvents_1.BaseEvents.CLOSE_RIGHT_PANEL);
                _this.resize();
            });
            $.subscribe(BaseEvents_1.BaseEvents.COLLECTION_INDEX_CHANGED, function (e, collectionIndex) {
                _this.fire(BaseEvents_1.BaseEvents.COLLECTION_INDEX_CHANGED, collectionIndex);
            });
            $.subscribe(BaseEvents_1.BaseEvents.CREATED, function () {
                _this.isCreated = true;
                _this.fire(BaseEvents_1.BaseEvents.CREATED);
            });
            $.subscribe(BaseEvents_1.BaseEvents.DOWN_ARROW, function () {
                _this.fire(BaseEvents_1.BaseEvents.DOWN_ARROW);
            });
            $.subscribe(BaseEvents_1.BaseEvents.DOWNLOAD, function (e, obj) {
                _this.fire(BaseEvents_1.BaseEvents.DOWNLOAD, obj);
            });
            $.subscribe(BaseEvents_1.BaseEvents.END, function () {
                _this.fire(BaseEvents_1.BaseEvents.END);
            });
            $.subscribe(BaseEvents_1.BaseEvents.ESCAPE, function () {
                _this.fire(BaseEvents_1.BaseEvents.ESCAPE);
                if (_this.isFullScreen() && !_this.isOverlayActive()) {
                    $.publish(BaseEvents_1.BaseEvents.TOGGLE_FULLSCREEN);
                }
            });
            $.subscribe(BaseEvents_1.BaseEvents.EXTERNAL_LINK_CLICKED, function (e, url) {
                _this.fire(BaseEvents_1.BaseEvents.EXTERNAL_LINK_CLICKED, url);
            });
            $.subscribe(BaseEvents_1.BaseEvents.FEEDBACK, function () {
                _this.feedback();
            });
            $.subscribe(BaseEvents_1.BaseEvents.FORBIDDEN, function () {
                _this.fire(BaseEvents_1.BaseEvents.FORBIDDEN);
                $.publish(BaseEvents_1.BaseEvents.OPEN_EXTERNAL_RESOURCE);
            });
            $.subscribe(BaseEvents_1.BaseEvents.HIDE_DOWNLOAD_DIALOGUE, function () {
                _this.fire(BaseEvents_1.BaseEvents.HIDE_DOWNLOAD_DIALOGUE);
            });
            $.subscribe(BaseEvents_1.BaseEvents.HIDE_EMBED_DIALOGUE, function () {
                _this.fire(BaseEvents_1.BaseEvents.HIDE_EMBED_DIALOGUE);
            });
            $.subscribe(BaseEvents_1.BaseEvents.HIDE_EXTERNALCONTENT_DIALOGUE, function () {
                _this.fire(BaseEvents_1.BaseEvents.HIDE_EXTERNALCONTENT_DIALOGUE);
            });
            $.subscribe(BaseEvents_1.BaseEvents.HIDE_GENERIC_DIALOGUE, function () {
                _this.fire(BaseEvents_1.BaseEvents.HIDE_GENERIC_DIALOGUE);
            });
            $.subscribe(BaseEvents_1.BaseEvents.HIDE_HELP_DIALOGUE, function () {
                _this.fire(BaseEvents_1.BaseEvents.HIDE_HELP_DIALOGUE);
            });
            $.subscribe(BaseEvents_1.BaseEvents.HIDE_INFORMATION, function () {
                _this.fire(BaseEvents_1.BaseEvents.HIDE_INFORMATION);
            });
            $.subscribe(BaseEvents_1.BaseEvents.HIDE_LOGIN_DIALOGUE, function () {
                _this.fire(BaseEvents_1.BaseEvents.HIDE_LOGIN_DIALOGUE);
            });
            $.subscribe(BaseEvents_1.BaseEvents.HIDE_OVERLAY, function () {
                _this.fire(BaseEvents_1.BaseEvents.HIDE_OVERLAY);
            });
            $.subscribe(BaseEvents_1.BaseEvents.HIDE_RESTRICTED_DIALOGUE, function () {
                _this.fire(BaseEvents_1.BaseEvents.HIDE_RESTRICTED_DIALOGUE);
            });
            $.subscribe(BaseEvents_1.BaseEvents.HIDE_SETTINGS_DIALOGUE, function () {
                _this.fire(BaseEvents_1.BaseEvents.HIDE_SETTINGS_DIALOGUE);
            });
            $.subscribe(BaseEvents_1.BaseEvents.HOME, function () {
                _this.fire(BaseEvents_1.BaseEvents.HOME);
            });
            $.subscribe(BaseEvents_1.BaseEvents.LEFT_ARROW, function () {
                _this.fire(BaseEvents_1.BaseEvents.LEFT_ARROW);
            });
            $.subscribe(BaseEvents_1.BaseEvents.LEFTPANEL_COLLAPSE_FULL_FINISH, function () {
                _this.fire(BaseEvents_1.BaseEvents.LEFTPANEL_COLLAPSE_FULL_FINISH);
            });
            $.subscribe(BaseEvents_1.BaseEvents.LEFTPANEL_COLLAPSE_FULL_START, function () {
                _this.fire(BaseEvents_1.BaseEvents.LEFTPANEL_COLLAPSE_FULL_START);
            });
            $.subscribe(BaseEvents_1.BaseEvents.LEFTPANEL_EXPAND_FULL_FINISH, function () {
                _this.fire(BaseEvents_1.BaseEvents.LEFTPANEL_EXPAND_FULL_FINISH);
            });
            $.subscribe(BaseEvents_1.BaseEvents.LEFTPANEL_EXPAND_FULL_START, function () {
                _this.fire(BaseEvents_1.BaseEvents.LEFTPANEL_EXPAND_FULL_START);
            });
            $.subscribe(BaseEvents_1.BaseEvents.LOAD_FAILED, function () {
                _this.fire(BaseEvents_1.BaseEvents.LOAD_FAILED);
                if (!that.lastCanvasIndex == null && that.lastCanvasIndex !== that.helper.canvasIndex) {
                    $.publish(BaseEvents_1.BaseEvents.CANVAS_INDEX_CHANGED, [that.lastCanvasIndex]);
                }
            });
            $.subscribe(BaseEvents_1.BaseEvents.MANIFEST_INDEX_CHANGED, function (e, manifestIndex) {
                _this.fire(BaseEvents_1.BaseEvents.MANIFEST_INDEX_CHANGED, manifestIndex);
            });
            $.subscribe(BaseEvents_1.BaseEvents.NOT_FOUND, function () {
                _this.fire(BaseEvents_1.BaseEvents.NOT_FOUND);
            });
            $.subscribe(BaseEvents_1.BaseEvents.OPEN, function () {
                _this.fire(BaseEvents_1.BaseEvents.OPEN);
                var openUri = String.format(_this.data.config.options.openTemplate, _this.helper.iiifResourceUri);
                window.open(openUri);
            });
            $.subscribe(BaseEvents_1.BaseEvents.OPEN_LEFT_PANEL, function () {
                _this.fire(BaseEvents_1.BaseEvents.OPEN_LEFT_PANEL);
                _this.resize();
            });
            $.subscribe(BaseEvents_1.BaseEvents.OPEN_EXTERNAL_RESOURCE, function () {
                _this.fire(BaseEvents_1.BaseEvents.OPEN_EXTERNAL_RESOURCE);
            });
            $.subscribe(BaseEvents_1.BaseEvents.OPEN_RIGHT_PANEL, function () {
                _this.fire(BaseEvents_1.BaseEvents.OPEN_RIGHT_PANEL);
                _this.resize();
            });
            $.subscribe(BaseEvents_1.BaseEvents.PAGE_DOWN, function () {
                _this.fire(BaseEvents_1.BaseEvents.PAGE_DOWN);
            });
            $.subscribe(BaseEvents_1.BaseEvents.PAGE_UP, function () {
                _this.fire(BaseEvents_1.BaseEvents.PAGE_UP);
            });
            $.subscribe(BaseEvents_1.BaseEvents.RESOURCE_DEGRADED, function (e, resource) {
                _this.fire(BaseEvents_1.BaseEvents.RESOURCE_DEGRADED);
                _this.handleDegraded(resource);
            });
            $.subscribe(BaseEvents_1.BaseEvents.RETURN, function () {
                _this.fire(BaseEvents_1.BaseEvents.RETURN);
            });
            $.subscribe(BaseEvents_1.BaseEvents.RIGHT_ARROW, function () {
                _this.fire(BaseEvents_1.BaseEvents.RIGHT_ARROW);
            });
            $.subscribe(BaseEvents_1.BaseEvents.RIGHTPANEL_COLLAPSE_FULL_FINISH, function () {
                _this.fire(BaseEvents_1.BaseEvents.RIGHTPANEL_COLLAPSE_FULL_FINISH);
            });
            $.subscribe(BaseEvents_1.BaseEvents.RIGHTPANEL_COLLAPSE_FULL_START, function () {
                _this.fire(BaseEvents_1.BaseEvents.RIGHTPANEL_COLLAPSE_FULL_START);
            });
            $.subscribe(BaseEvents_1.BaseEvents.RIGHTPANEL_EXPAND_FULL_FINISH, function () {
                _this.fire(BaseEvents_1.BaseEvents.RIGHTPANEL_EXPAND_FULL_FINISH);
            });
            $.subscribe(BaseEvents_1.BaseEvents.RIGHTPANEL_EXPAND_FULL_START, function () {
                _this.fire(BaseEvents_1.BaseEvents.RIGHTPANEL_EXPAND_FULL_START);
            });
            $.subscribe(BaseEvents_1.BaseEvents.SEQUENCE_INDEX_CHANGED, function (e, sequenceIndex) {
                _this.fire(BaseEvents_1.BaseEvents.SEQUENCE_INDEX_CHANGED, sequenceIndex);
            });
            $.subscribe(BaseEvents_1.BaseEvents.SETTINGS_CHANGED, function (e, args) {
                _this.fire(BaseEvents_1.BaseEvents.SETTINGS_CHANGED, args);
            });
            $.subscribe(BaseEvents_1.BaseEvents.SHOW_DOWNLOAD_DIALOGUE, function () {
                _this.fire(BaseEvents_1.BaseEvents.SHOW_DOWNLOAD_DIALOGUE);
            });
            $.subscribe(BaseEvents_1.BaseEvents.SHOW_EMBED_DIALOGUE, function () {
                _this.fire(BaseEvents_1.BaseEvents.SHOW_EMBED_DIALOGUE);
            });
            $.subscribe(BaseEvents_1.BaseEvents.SHOW_EXTERNALCONTENT_DIALOGUE, function () {
                _this.fire(BaseEvents_1.BaseEvents.SHOW_EXTERNALCONTENT_DIALOGUE);
            });
            $.subscribe(BaseEvents_1.BaseEvents.SHOW_GENERIC_DIALOGUE, function () {
                _this.fire(BaseEvents_1.BaseEvents.SHOW_GENERIC_DIALOGUE);
            });
            $.subscribe(BaseEvents_1.BaseEvents.SHOW_HELP_DIALOGUE, function () {
                _this.fire(BaseEvents_1.BaseEvents.SHOW_HELP_DIALOGUE);
            });
            $.subscribe(BaseEvents_1.BaseEvents.SHOW_INFORMATION, function () {
                _this.fire(BaseEvents_1.BaseEvents.SHOW_INFORMATION);
            });
            $.subscribe(BaseEvents_1.BaseEvents.SHOW_LOGIN_DIALOGUE, function () {
                _this.fire(BaseEvents_1.BaseEvents.SHOW_LOGIN_DIALOGUE);
            });
            $.subscribe(BaseEvents_1.BaseEvents.SHOW_CLICKTHROUGH_DIALOGUE, function () {
                _this.fire(BaseEvents_1.BaseEvents.SHOW_CLICKTHROUGH_DIALOGUE);
            });
            $.subscribe(BaseEvents_1.BaseEvents.SHOW_RESTRICTED_DIALOGUE, function () {
                _this.fire(BaseEvents_1.BaseEvents.SHOW_RESTRICTED_DIALOGUE);
            });
            $.subscribe(BaseEvents_1.BaseEvents.SHOW_OVERLAY, function () {
                _this.fire(BaseEvents_1.BaseEvents.SHOW_OVERLAY);
            });
            $.subscribe(BaseEvents_1.BaseEvents.SHOW_SETTINGS_DIALOGUE, function () {
                _this.fire(BaseEvents_1.BaseEvents.SHOW_SETTINGS_DIALOGUE);
            });
            $.subscribe(BaseEvents_1.BaseEvents.SHOW_TERMS_OF_USE, function () {
                _this.fire(BaseEvents_1.BaseEvents.SHOW_TERMS_OF_USE);
                // todo: Eventually this should be replaced with a suitable IIIF Presentation API field - until then, use attribution
                var terms = _this.helper.getAttribution();
                _this.showMessage(terms);
            });
            $.subscribe(BaseEvents_1.BaseEvents.THUMB_SELECTED, function (e, thumb) {
                _this.fire(BaseEvents_1.BaseEvents.THUMB_SELECTED, thumb.index);
            });
            $.subscribe(BaseEvents_1.BaseEvents.TOGGLE_FULLSCREEN, function () {
                $('#top').focus();
                _this.component.isFullScreen = !_this.component.isFullScreen;
                _this.fire(BaseEvents_1.BaseEvents.TOGGLE_FULLSCREEN, {
                    isFullScreen: _this.component.isFullScreen,
                    overrideFullScreen: _this.data.config.options.overrideFullScreen
                });
            });
            $.subscribe(BaseEvents_1.BaseEvents.UP_ARROW, function () {
                _this.fire(BaseEvents_1.BaseEvents.UP_ARROW);
            });
            $.subscribe(BaseEvents_1.BaseEvents.UPDATE_SETTINGS, function () {
                _this.fire(BaseEvents_1.BaseEvents.UPDATE_SETTINGS);
            });
            $.subscribe(BaseEvents_1.BaseEvents.VIEW_FULL_TERMS, function () {
                _this.fire(BaseEvents_1.BaseEvents.VIEW_FULL_TERMS);
            });
            $.subscribe(BaseEvents_1.BaseEvents.WINDOW_UNLOAD, function () {
                _this.fire(BaseEvents_1.BaseEvents.WINDOW_UNLOAD);
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
            var depsUri = this.data.root + '/lib/' + this.name + '-dependencies';
            // check if the deps are already loaded
            var scripts = $('script[data-requiremodule]')
                .filter(function () {
                var attr = $(this).attr('data-requiremodule');
                return (attr.indexOf(that.name) !== -1 && attr.indexOf('dependencies') !== -1);
            });
            if (!scripts.length) {
                requirejs([depsUri], function (deps) {
                    var baseUri = that.data.root + '/lib/';
                    // for each dependency, prepend baseUri.
                    if (deps.sync) {
                        for (var i = 0; i < deps.sync.length; i++) {
                            deps.sync[i] = baseUri + deps.sync[i];
                        }
                    }
                    if (deps.async) {
                        for (var i = 0; i < deps.async.length; i++) {
                            deps.async[i] = baseUri + deps.async[i];
                        }
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
            if (!deps) {
                that.dependenciesLoaded();
            }
            else if (deps.sync) {
                // load each sync script.
                // necessary for cases like this: https://github.com/mrdoob/three.js/issues/9602
                // then load the async scripts
                SynchronousRequire_1.SynchronousRequire.load(deps.sync, that.dependencyLoaded).then(function () {
                    if (deps.async) {
                        requirejs(deps.async, function () {
                            that.dependenciesLoaded(arguments);
                        });
                    }
                    else {
                        that.dependenciesLoaded();
                    }
                });
            }
            else if (deps.async) {
                requirejs(deps.async, function () {
                    that.dependenciesLoaded(arguments);
                });
            }
            else {
                that.dependenciesLoaded();
            }
        };
        BaseExtension.prototype.dependencyLoaded = function (index, dep) {
        };
        BaseExtension.prototype.dependenciesLoaded = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            this.createModules();
            this.modulesCreated();
            $.publish(BaseEvents_1.BaseEvents.RESIZE); // initial sizing
            $.publish(BaseEvents_1.BaseEvents.CREATED);
            this.update();
            this._setDefaultFocus();
        };
        BaseExtension.prototype.update = function () {
            var _this = this;
            // allow 1ms for subclasses to subscribe to events.
            setTimeout(function () {
                $.publish(BaseEvents_1.BaseEvents.COLLECTION_INDEX_CHANGED, [_this.data.collectionIndex]);
                $.publish(BaseEvents_1.BaseEvents.MANIFEST_INDEX_CHANGED, [_this.data.manifestIndex]);
                $.publish(BaseEvents_1.BaseEvents.SEQUENCE_INDEX_CHANGED, [_this.data.sequenceIndex]);
                $.publish(BaseEvents_1.BaseEvents.CANVAS_INDEX_CHANGED, [_this.data.canvasIndex]);
            }, 1);
        };
        BaseExtension.prototype._setDefaultFocus = function () {
            var _this = this;
            setTimeout(function () {
                if (_this.data.config.options.allowStealFocus) {
                    $('[tabindex=0]').focus();
                }
            }, 1);
        };
        BaseExtension.prototype.width = function () {
            return this.$element.width();
        };
        BaseExtension.prototype.height = function () {
            return this.$element.height();
        };
        BaseExtension.prototype.exitFullScreen = function () {
            $.publish(BaseEvents_1.BaseEvents.EXIT_FULLSCREEN);
        };
        BaseExtension.prototype.fire = function (name) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            this.component.fire(name, arguments[1]);
        };
        BaseExtension.prototype.redirect = function (uri) {
            this.fire(BaseEvents_1.BaseEvents.REDIRECT, uri);
        };
        BaseExtension.prototype.refresh = function () {
            this.fire(BaseEvents_1.BaseEvents.REFRESH, null);
        };
        BaseExtension.prototype._initLocales = function () {
            var availableLocales = this.data.config.localisation.locales.slice(0);
            var configuredLocales = this.data.locales;
            var finalLocales = [];
            // loop through configuredLocales array (those passed in when initialising the UV component)
            // if availableLocales (those available in each extension's l10n directory) contains a configured locale, add it to finalLocales.
            // if the configured locale has a label, substitute it
            // mark locale as added.
            // if limitLocales is disabled,
            // loop through remaining availableLocales and add to finalLocales.
            $.each(configuredLocales, function (index, configuredLocale) {
                var match = availableLocales.filter(function (item) { return item.name === configuredLocale.name; });
                if (match.length) {
                    var m = match[0];
                    if (configuredLocale.label)
                        m.label = configuredLocale.label;
                    m.added = true;
                    finalLocales.push(m);
                }
            });
            var limitLocales = Utils.Bools.getBool(this.data.config.options.limitLocales, false);
            if (!limitLocales) {
                $.each(availableLocales, function (index, availableLocale) {
                    if (!availableLocale.added) {
                        finalLocales.push(availableLocale);
                    }
                    delete availableLocale.added;
                });
            }
            this.data.locales = finalLocales;
        };
        BaseExtension.prototype._parseMetrics = function () {
            var metrics = this.data.config.options.metrics;
            if (metrics) {
                for (var i = 0; i < metrics.length; i++) {
                    var m = metrics[i];
                    m.type = new MetricType_1.MetricType(m.type);
                    this.metrics.push(m);
                }
            }
        };
        BaseExtension.prototype._updateMetric = function () {
            for (var i = 0; i < this.metrics.length; i++) {
                var metric = this.metrics[i];
                if (this.width() > metric.minWidth && this.width() <= metric.maxWidth) {
                    if (this.metric !== metric.type) {
                        this.metric = metric.type;
                        $.publish(BaseEvents_1.BaseEvents.METRIC_CHANGED);
                    }
                }
            }
        };
        BaseExtension.prototype.resize = function () {
            this._updateMetric();
            $.publish(BaseEvents_1.BaseEvents.RESIZE);
        };
        // re-bootstraps the application with new querystring params
        BaseExtension.prototype.reload = function (data) {
            $.publish(BaseEvents_1.BaseEvents.RELOAD, [data]);
        };
        BaseExtension.prototype.isSeeAlsoEnabled = function () {
            return this.data.config.options.seeAlsoEnabled !== false;
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
            return (this.data.isHomeDomain && this.data.isOnlyInstance);
        };
        BaseExtension.prototype.isOnHomeDomain = function () {
            return this.isDeepLinkingEnabled();
        };
        BaseExtension.prototype.getDomain = function () {
            var parts = Utils.Urls.getUrlParts(this.helper.iiifResourceUri);
            return parts.host;
        };
        BaseExtension.prototype.getEmbedDomain = function () {
            return this.data.embedDomain;
        };
        BaseExtension.prototype.getSettings = function () {
            if (Utils.Bools.getBool(this.data.config.options.saveUserSettings, false)) {
                var settings = Utils.Storage.get("uv.settings", Utils.StorageType.local);
                if (settings) {
                    return $.extend(this.data.config.options, settings.value);
                }
            }
            return this.data.config.options;
        };
        BaseExtension.prototype.updateSettings = function (settings) {
            if (Utils.Bools.getBool(this.data.config.options.saveUserSettings, false)) {
                var storedSettings = Utils.Storage.get("uv.settings", Utils.StorageType.local);
                if (storedSettings) {
                    settings = $.extend(storedSettings.value, settings);
                }
                // store for ten years
                Utils.Storage.set("uv.settings", settings, 315360000, Utils.StorageType.local);
            }
            this.data.config.options = $.extend(this.data.config.options, settings);
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
        BaseExtension.prototype.getSharePreview = function () {
            var title = this.helper.getLabel();
            // todo: use getThumb (when implemented)
            var canvas = this.helper.getCurrentCanvas();
            var thumbnail = canvas.getProperty('thumbnail');
            if (!thumbnail || !(typeof (thumbnail) === 'string')) {
                thumbnail = canvas.getCanonicalImageUri(this.data.config.options.bookmarkThumbWidth);
            }
            return {
                title: title,
                image: thumbnail
            };
        };
        BaseExtension.prototype.getPagedIndices = function (canvasIndex) {
            if (canvasIndex === void 0) { canvasIndex = this.helper.canvasIndex; }
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
        // todo: move to manifold
        BaseExtension.prototype.getExternalResources = function (resources) {
            var _this = this;
            var indices = this.getPagedIndices();
            var resourcesToLoad = [];
            $.each(indices, function (i, index) {
                var canvas = _this.helper.getCanvasByIndex(index);
                var r = new Manifold.ExternalResource(canvas, _this.helper.getInfoUri);
                r.index = index;
                // used to reload resources with isResponseHandled = true.
                if (resources) {
                    var found = resources.find(function (f) {
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
            var storageStrategy = this.data.config.options.tokenStorage;
            return new Promise(function (resolve) {
                manifesto.Utils.loadExternalResources(resourcesToLoad, storageStrategy, _this.clickThrough, _this.restricted, _this.login, _this.getAccessToken, _this.storeAccessToken, _this.getStoredAccessToken, _this.handleExternalResourceResponse).then(function (r) {
                    _this.resources = r.map(function (resource) {
                        resource.data.index = resource.index;
                        return Utils.Objects.toPlainObject(resource.data);
                    });
                    resolve(_this.resources);
                })['catch'](function (error) {
                    switch (error.name) {
                        case manifesto.StatusCodes.AUTHORIZATION_FAILED.toString():
                            $.publish(BaseEvents_1.BaseEvents.LOGIN_FAILED);
                            break;
                        case manifesto.StatusCodes.FORBIDDEN.toString():
                            $.publish(BaseEvents_1.BaseEvents.FORBIDDEN);
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
        BaseExtension.prototype.viewCanvas = function (canvasIndex) {
            if (this.helper.isCanvasIndexOutOfRange(canvasIndex)) {
                this.showMessage(this.data.config.content.canvasIndexOutOfRange);
                canvasIndex = 0;
            }
            this.lastCanvasIndex = this.helper.canvasIndex;
            this.helper.canvasIndex = canvasIndex;
            $.publish(BaseEvents_1.BaseEvents.OPEN_EXTERNAL_RESOURCE);
        };
        BaseExtension.prototype.showMessage = function (message, acceptCallback, buttonText, allowClose) {
            this.closeActiveDialogue();
            $.publish(BaseEvents_1.BaseEvents.SHOW_GENERIC_DIALOGUE, [
                {
                    message: message,
                    acceptCallback: acceptCallback,
                    buttonText: buttonText,
                    allowClose: allowClose
                }
            ]);
        };
        BaseExtension.prototype.closeActiveDialogue = function () {
            $.publish(BaseEvents_1.BaseEvents.CLOSE_ACTIVE_DIALOGUE);
        };
        BaseExtension.prototype.isOverlayActive = function () {
            return Shell_1.Shell.$overlays.is(':visible');
        };
        BaseExtension.prototype.viewManifest = function (manifest) {
            var data = {};
            data.iiifResourceUri = this.helper.iiifResourceUri;
            data.collectionIndex = this.helper.getCollectionIndex(manifest);
            data.manifestIndex = manifest.index;
            data.sequenceIndex = 0;
            data.canvasIndex = 0;
            this.reload(data);
        };
        BaseExtension.prototype.viewCollection = function (collection) {
            var data = {};
            data.iiifResourceUri = this.helper.iiifResourceUri;
            data.collectionIndex = collection.index;
            data.manifestIndex = 0;
            data.sequenceIndex = 0;
            data.canvasIndex = 0;
            this.reload(data);
        };
        BaseExtension.prototype.isFullScreen = function () {
            return this.component.isFullScreen;
        };
        BaseExtension.prototype.isHeaderPanelEnabled = function () {
            return Utils.Bools.getBool(this.data.config.options.headerPanelEnabled, true);
        };
        BaseExtension.prototype.isLeftPanelEnabled = function () {
            if (Utils.Bools.getBool(this.data.config.options.leftPanelEnabled, true)) {
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
            return Utils.Bools.getBool(this.data.config.options.rightPanelEnabled, true);
        };
        BaseExtension.prototype.isFooterPanelEnabled = function () {
            return Utils.Bools.getBool(this.data.config.options.footerPanelEnabled, true);
        };
        BaseExtension.prototype.useArrowKeysToNavigate = function () {
            return Utils.Bools.getBool(this.data.config.options.useArrowKeysToNavigate, true);
        };
        BaseExtension.prototype.bookmark = function () {
            // override for each extension
        };
        BaseExtension.prototype.feedback = function () {
            this.fire(BaseEvents_1.BaseEvents.FEEDBACK, this.data);
        };
        BaseExtension.prototype.getAlternateLocale = function () {
            var alternateLocale = null;
            if (this.data.locales.length > 1) {
                alternateLocale = this.data.locales[1];
            }
            return alternateLocale;
        };
        BaseExtension.prototype.getSerializedLocales = function () {
            return this.serializeLocales(this.data.locales);
        };
        BaseExtension.prototype.serializeLocales = function (locales) {
            var serializedLocales = '';
            for (var i = 0; i < locales.length; i++) {
                var l = locales[i];
                if (i > 0)
                    serializedLocales += ',';
                serializedLocales += l.name;
                if (l.label) {
                    serializedLocales += ':' + l.label;
                }
            }
            return serializedLocales;
        };
        BaseExtension.prototype.changeLocale = function (locale) {
            // re-order locales so the passed locale is first
            var data = {};
            data.locales = this.data.locales.clone();
            var index = data.locales.findIndex(function (l) {
                return l.name === locale;
            });
            data.locales.move(index, 0);
            this.reload(data);
        };
        // auth
        BaseExtension.prototype.clickThrough = function (resource) {
            return new Promise(function (resolve) {
                $.publish(BaseEvents_1.BaseEvents.SHOW_CLICKTHROUGH_DIALOGUE, [{
                        resource: resource,
                        acceptCallback: function () {
                            var win = window.open(resource.clickThroughService.id);
                            var pollTimer = window.setInterval(function () {
                                if (win.closed) {
                                    window.clearInterval(pollTimer);
                                    $.publish(BaseEvents_1.BaseEvents.CLICKTHROUGH);
                                    resolve();
                                }
                            }, 500);
                        }
                    }]);
            });
        };
        BaseExtension.prototype.restricted = function (resource) {
            return new Promise(function (resolve, reject) {
                $.publish(BaseEvents_1.BaseEvents.SHOW_RESTRICTED_DIALOGUE, [{
                        resource: resource,
                        acceptCallback: function () {
                            $.publish(BaseEvents_1.BaseEvents.LOAD_FAILED);
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
                $.publish(BaseEvents_1.BaseEvents.SHOW_LOGIN_DIALOGUE, [{
                        resource: resource,
                        loginCallback: function () {
                            var win = window.open(resource.loginService.id + "?t=" + new Date().getTime());
                            var pollTimer = window.setInterval(function () {
                                if (win.closed) {
                                    window.clearInterval(pollTimer);
                                    $.publish(BaseEvents_1.BaseEvents.LOGIN);
                                    resolve();
                                }
                            }, 500);
                        },
                        logoutCallback: function () {
                            var win = window.open(resource.logoutService.id + "?t=" + new Date().getTime());
                            var pollTimer = window.setInterval(function () {
                                if (win.closed) {
                                    window.clearInterval(pollTimer);
                                    $.publish(BaseEvents_1.BaseEvents.LOGOUT);
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
                            resolve(undefined);
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
                var item = null;
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
                        if (item.key.includes(domain)) {
                            foundItems.push(item);
                        }
                    }
                }
                // sort by expiresAt, earliest to most recent.
                foundItems = foundItems.sort(function (a, b) {
                    return a.expiresAt - b.expiresAt;
                });
                var foundToken;
                if (foundItems.length) {
                    foundToken = foundItems[foundItems.length - 1].value;
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
                    $.publish(BaseEvents_1.BaseEvents.RESOURCE_DEGRADED, [resource]);
                }
                else {
                    if (resource.error.status === HTTPStatusCode.UNAUTHORIZED ||
                        resource.error.status === HTTPStatusCode.INTERNAL_SERVER_ERROR) {
                        // if the browser doesn't support CORS
                        if (!Modernizr.cors) {
                            var informationArgs = new InformationArgs_1.InformationArgs(InformationType_1.InformationType.AUTH_CORS_ERROR, null);
                            $.publish(BaseEvents_1.BaseEvents.SHOW_INFORMATION, [informationArgs]);
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
            $.publish(BaseEvents_1.BaseEvents.SHOW_INFORMATION, [informationArgs]);
        };
        return BaseExtension;
    }());
    exports.BaseExtension = BaseExtension;
});
//# sourceMappingURL=BaseExtension.js.map
define('modules/uv-shared-module/Bookmark',["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var Bookmark = (function () {
        function Bookmark() {
        }
        return Bookmark;
    }());
    exports.Bookmark = Bookmark;
});
//# sourceMappingURL=Bookmark.js.map
define('modules/uv-shared-module/DownloadOption',["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
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
//# sourceMappingURL=DownloadOption.js.map
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
define('modules/uv-dialogues-module/DownloadDialogue',["require", "exports", "../uv-shared-module/BaseEvents", "../uv-shared-module/Dialogue", "../uv-shared-module/DownloadOption"], function (require, exports, BaseEvents_1, Dialogue_1, DownloadOption_1) {
    "use strict";
    exports.__esModule = true;
    var DownloadDialogue = (function (_super) {
        __extends(DownloadDialogue, _super);
        function DownloadDialogue($element) {
            return _super.call(this, $element) || this;
        }
        DownloadDialogue.prototype.create = function () {
            var _this = this;
            this.setConfig('downloadDialogue');
            _super.prototype.create.call(this);
            this.openCommand = BaseEvents_1.BaseEvents.SHOW_DOWNLOAD_DIALOGUE;
            this.closeCommand = BaseEvents_1.BaseEvents.HIDE_DOWNLOAD_DIALOGUE;
            $.subscribe(this.openCommand, function (e, $triggerButton) {
                _this.open($triggerButton);
            });
            $.subscribe(this.closeCommand, function () {
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
            this.$termsOfUseButton = $('<a href="#">' + this.extension.data.config.content.termsOfUse + '</a>');
            this.$footer.append(this.$termsOfUseButton);
            this.$termsOfUseButton.onPressed(function () {
                $.publish(BaseEvents_1.BaseEvents.SHOW_TERMS_OF_USE);
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
                var renderingFound_1 = false;
                $.each(canvas.getRenderings(), function (index, rendering) {
                    var renderingFormat = rendering.getFormat();
                    var format = '';
                    if (renderingFormat) {
                        format = renderingFormat.toString();
                    }
                    _this.addEntireFileDownloadOption(rendering.id, Manifesto.TranslationCollection.getValue(rendering.getLabel()), format);
                    renderingFound_1 = true;
                });
                if (!renderingFound_1) {
                    this.addEntireFileDownloadOption(canvas.id, '', '');
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
            if (Utils.Bools.getBool(this.extension.data.config.options.termsOfUseEnabled, false) && attribution) {
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
                    if (uiExtensions && !this.extension.helper.isUIEnabled('mediaDownload')) {
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
//# sourceMappingURL=DownloadDialogue.js.map
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
    exports.__esModule = true;
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
//# sourceMappingURL=DownloadDialogue.js.map
define('extensions/uv-mediaelement-extension/Events',["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var Events = (function () {
        function Events() {
        }
        return Events;
    }());
    Events.namespace = 'mediaelementExtension.';
    Events.MEDIA_ENDED = Events.namespace + 'mediaEnded';
    Events.MEDIA_PAUSED = Events.namespace + 'mediaPaused';
    Events.MEDIA_PLAYED = Events.namespace + 'mediaPlayed';
    exports.Events = Events;
});
//# sourceMappingURL=Events.js.map
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
define('modules/uv-shared-module/FooterPanel',["require", "exports", "./BaseEvents", "./BaseView", "./MetricType"], function (require, exports, BaseEvents_1, BaseView_1, MetricType_1) {
    "use strict";
    exports.__esModule = true;
    var FooterPanel = (function (_super) {
        __extends(FooterPanel, _super);
        function FooterPanel($element) {
            return _super.call(this, $element) || this;
        }
        FooterPanel.prototype.create = function () {
            var _this = this;
            this.setConfig('footerPanel');
            _super.prototype.create.call(this);
            $.subscribe(BaseEvents_1.BaseEvents.TOGGLE_FULLSCREEN, function () {
                _this.updateFullScreenButton();
            });
            $.subscribe(BaseEvents_1.BaseEvents.METRIC_CHANGED, function () {
                _this.updateMinimisedButtons();
                _this.updateMoreInfoButton();
            });
            $.subscribe(BaseEvents_1.BaseEvents.SETTINGS_CHANGED, function () {
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
                $.publish(BaseEvents_1.BaseEvents.OPEN);
            });
            this.$feedbackButton.onPressed(function () {
                $.publish(BaseEvents_1.BaseEvents.FEEDBACK);
            });
            this.$bookmarkButton.onPressed(function () {
                $.publish(BaseEvents_1.BaseEvents.BOOKMARK);
            });
            this.$shareButton.onPressed(function () {
                $.publish(BaseEvents_1.BaseEvents.SHOW_SHARE_DIALOGUE, [_this.$shareButton]);
            });
            this.$embedButton.onPressed(function () {
                $.publish(BaseEvents_1.BaseEvents.SHOW_EMBED_DIALOGUE, [_this.$embedButton]);
            });
            this.$downloadButton.onPressed(function () {
                $.publish(BaseEvents_1.BaseEvents.SHOW_DOWNLOAD_DIALOGUE, [_this.$downloadButton]);
            });
            this.$moreInfoButton.onPressed(function () {
                $.publish(BaseEvents_1.BaseEvents.SHOW_MOREINFO_DIALOGUE, [_this.$moreInfoButton]);
            });
            this.$fullScreenBtn.on('click', function (e) {
                e.preventDefault();
                $.publish(BaseEvents_1.BaseEvents.TOGGLE_FULLSCREEN);
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
            if (this.extension.metric.toString() === MetricType_1.MetricType.MOBILELANDSCAPE.toString()) {
                this.$options.addClass('minimiseButtons');
            }
            else {
                this.$options.removeClass('minimiseButtons');
            }
        };
        FooterPanel.prototype.updateMoreInfoButton = function () {
            var configEnabled = Utils.Bools.getBool(this.options.moreInfoEnabled, false);
            if (configEnabled && this.extension.metric.toString() === MetricType_1.MetricType.MOBILELANDSCAPE.toString()) {
                this.$moreInfoButton.show();
            }
            else {
                this.$moreInfoButton.hide();
            }
        };
        FooterPanel.prototype.updateOpenButton = function () {
            var configEnabled = Utils.Bools.getBool(this.options.openEnabled, false);
            if (configEnabled && !this.extension.data.isHomeDomain) {
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
            if (this.extension.data.isLightbox) {
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
//# sourceMappingURL=FooterPanel.js.map
define('modules/uv-shared-module/Information',["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var Information = (function () {
        function Information(message, actions) {
            this.message = message;
            this.actions = actions;
        }
        return Information;
    }());
    exports.Information = Information;
});
//# sourceMappingURL=Information.js.map
define('modules/uv-shared-module/InformationAction',["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var InformationAction = (function () {
        function InformationAction() {
        }
        return InformationAction;
    }());
    exports.InformationAction = InformationAction;
});
//# sourceMappingURL=InformationAction.js.map
define('modules/uv-shared-module/InformationFactory',["require", "exports", "./BaseEvents", "./Information", "./InformationAction", "./InformationType"], function (require, exports, BaseEvents_1, Information_1, InformationAction_1, InformationType_1) {
    "use strict";
    exports.__esModule = true;
    var InformationFactory = (function () {
        function InformationFactory(extension) {
            this.extension = extension;
        }
        InformationFactory.prototype.Get = function (args) {
            switch (args.informationType) {
                case (InformationType_1.InformationType.AUTH_CORS_ERROR):
                    return new Information_1.Information(this.extension.data.config.content.authCORSError, []);
                case (InformationType_1.InformationType.DEGRADED_RESOURCE):
                    var actions = [];
                    var loginAction = new InformationAction_1.InformationAction();
                    loginAction.label = this.extension.data.config.content.degradedResourceLogin;
                    loginAction.action = function () {
                        $.publish(BaseEvents_1.BaseEvents.HIDE_INFORMATION);
                        $.publish(BaseEvents_1.BaseEvents.OPEN_EXTERNAL_RESOURCE, [[args.param]]);
                    };
                    actions.push(loginAction);
                    return new Information_1.Information(this.extension.data.config.content.degradedResourceMessage, actions);
            }
        };
        return InformationFactory;
    }());
    exports.InformationFactory = InformationFactory;
});
//# sourceMappingURL=InformationFactory.js.map
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
define('modules/uv-shared-module/HeaderPanel',["require", "exports", "./BaseEvents", "./BaseView", "../uv-shared-module/InformationFactory"], function (require, exports, BaseEvents_1, BaseView_1, InformationFactory_1) {
    "use strict";
    exports.__esModule = true;
    var HeaderPanel = (function (_super) {
        __extends(HeaderPanel, _super);
        function HeaderPanel($element) {
            return _super.call(this, $element, false, false) || this;
        }
        HeaderPanel.prototype.create = function () {
            var _this = this;
            this.setConfig('headerPanel');
            _super.prototype.create.call(this);
            $.subscribe(BaseEvents_1.BaseEvents.SHOW_INFORMATION, function (e, args) {
                _this.showInformation(args);
            });
            $.subscribe(BaseEvents_1.BaseEvents.HIDE_INFORMATION, function () {
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
                $.publish(BaseEvents_1.BaseEvents.HIDE_INFORMATION);
            });
            this.$localeToggleButton.on('click', function () {
                _this.extension.changeLocale(String(_this.$localeToggleButton.data('locale')));
            });
            this.$settingsButton.onPressed(function () {
                $.publish(BaseEvents_1.BaseEvents.SHOW_SETTINGS_DIALOGUE);
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
            var locales = this.extension.data.locales;
            if (locales) {
                return locales.length > 1 && Utils.Bools.getBool(this.options.localeToggleEnabled, false);
            }
            return false;
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
            $.publish(BaseEvents_1.BaseEvents.UPDATE_SETTINGS, [settings]);
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
            if (this.extension.width() < this.extension.data.config.options.minWidthBreakPoint) {
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
//# sourceMappingURL=HeaderPanel.js.map
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
define('modules/uv-dialogues-module/HelpDialogue',["require", "exports", "../uv-shared-module/BaseEvents", "../uv-shared-module/Dialogue"], function (require, exports, BaseEvents_1, Dialogue_1) {
    "use strict";
    exports.__esModule = true;
    var HelpDialogue = (function (_super) {
        __extends(HelpDialogue, _super);
        function HelpDialogue($element) {
            return _super.call(this, $element) || this;
        }
        HelpDialogue.prototype.create = function () {
            var _this = this;
            this.setConfig('helpDialogue');
            _super.prototype.create.call(this);
            this.openCommand = BaseEvents_1.BaseEvents.SHOW_HELP_DIALOGUE;
            this.closeCommand = BaseEvents_1.BaseEvents.HIDE_HELP_DIALOGUE;
            $.subscribe(this.openCommand, function () {
                _this.open();
            });
            $.subscribe(this.closeCommand, function () {
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
//# sourceMappingURL=HelpDialogue.js.map
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
    exports.__esModule = true;
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
//# sourceMappingURL=CenterPanel.js.map
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
define('modules/uv-mediaelementcenterpanel-module/MediaElementCenterPanel',["require", "exports", "../uv-shared-module/BaseEvents", "../../extensions/uv-mediaelement-extension/Events", "../uv-shared-module/CenterPanel"], function (require, exports, BaseEvents_1, Events_1, CenterPanel_1) {
    "use strict";
    exports.__esModule = true;
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
            if (this.isVideo()) {
                $.subscribe(BaseEvents_1.BaseEvents.TOGGLE_FULLSCREEN, function () {
                    if (that.component.isFullScreen) {
                        that.player.enterFullScreen(false);
                    }
                    else {
                        that.player.exitFullScreen(false);
                    }
                });
            }
            $.subscribe(BaseEvents_1.BaseEvents.OPEN_EXTERNAL_RESOURCE, function (e, resources) {
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
                var poster = _this.extension.getPosterImageUri();
                var sources = [];
                $.each(canvas.getRenderings(), function (index, rendering) {
                    sources.push({
                        type: rendering.getFormat().toString(),
                        src: rendering.id
                    });
                });
                if (_this.isVideo()) {
                    _this.$media = $('<video controls="controls" preload="none"></video>');
                    _this.$container.append(_this.$media);
                    _this.player = new MediaElementPlayer($('video')[0], {
                        //pluginPath: this.extension.data.root + 'lib/mediaelement/',
                        poster: poster,
                        features: ['playpause', 'current', 'progress', 'volume'],
                        success: function (mediaElement, originalNode) {
                            mediaElement.addEventListener('canplay', function () {
                                that.resize();
                            });
                            mediaElement.addEventListener('play', function () {
                                $.publish(Events_1.Events.MEDIA_PLAYED, [Math.floor(mediaElement.currentTime)]);
                            });
                            mediaElement.addEventListener('pause', function () {
                                // mediaelement creates a pause event before the ended event. ignore this.
                                if (Math.floor(mediaElement.currentTime) != Math.floor(mediaElement.duration)) {
                                    $.publish(Events_1.Events.MEDIA_PAUSED, [Math.floor(mediaElement.currentTime)]);
                                }
                            });
                            mediaElement.addEventListener('ended', function () {
                                $.publish(Events_1.Events.MEDIA_ENDED, [Math.floor(mediaElement.duration)]);
                            });
                            mediaElement.setSrc(sources);
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
                    _this.$media = $('<audio controls="controls" preload="none"></audio>');
                    _this.$container.append(_this.$media);
                    _this.player = new MediaElementPlayer($('audio')[0], {
                        poster: poster,
                        defaultAudioWidth: that.mediaWidth,
                        defaultAudioHeight: that.mediaHeight,
                        showPosterWhenPaused: true,
                        showPosterWhenEnded: true,
                        success: function (mediaElement, originalNode) {
                            mediaElement.addEventListener('canplay', function () {
                                that.resize();
                            });
                            mediaElement.addEventListener('play', function () {
                                $.publish(Events_1.Events.MEDIA_PLAYED, [Math.floor(mediaElement.currentTime)]);
                            });
                            mediaElement.addEventListener('pause', function () {
                                // mediaelement creates a pause event before the ended event. ignore this.
                                if (Math.floor(mediaElement.currentTime) != Math.floor(mediaElement.duration)) {
                                    $.publish(Events_1.Events.MEDIA_PAUSED, [Math.floor(mediaElement.currentTime)]);
                                }
                            });
                            mediaElement.addEventListener('ended', function () {
                                $.publish(Events_1.Events.MEDIA_ENDED, [Math.floor(mediaElement.duration)]);
                            });
                            mediaElement.setSrc(sources);
                        }
                    });
                }
                _this.resize();
            });
        };
        MediaElementCenterPanel.prototype.isVideo = function () {
            return this.extension.isVideo();
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
                if (this.player && !this.extension.isFullScreen()) {
                    this.$media.width(size.width);
                    this.$media.height(size.height);
                }
            }
            var left = Math.floor((this.$content.width() - this.$container.width()) / 2);
            var top = Math.floor((this.$content.height() - this.$container.height()) / 2);
            this.$container.css({
                'left': left,
                'top': top
            });
            this.$title.ellipsisFill(this.title);
            if (this.player) {
                if (!this.isVideo() || (this.isVideo() && !this.component.isFullScreen)) {
                    this.player.setPlayerSize();
                    this.player.setControlsSize();
                    var $mejs = $('.mejs__container');
                    $mejs.css({
                        'margin-top': (this.$container.height() - $mejs.height()) / 2
                    });
                }
            }
        };
        return MediaElementCenterPanel;
    }(CenterPanel_1.CenterPanel));
    exports.MediaElementCenterPanel = MediaElementCenterPanel;
});
//# sourceMappingURL=MediaElementCenterPanel.js.map
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
    exports.__esModule = true;
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
//# sourceMappingURL=BaseExpandPanel.js.map
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
define('modules/uv-shared-module/RightPanel',["require", "exports", "./BaseEvents", "./BaseExpandPanel"], function (require, exports, BaseEvents_1, BaseExpandPanel_1) {
    "use strict";
    exports.__esModule = true;
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
            $.subscribe(BaseEvents_1.BaseEvents.TOGGLE_EXPAND_RIGHT_PANEL, function () {
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
                $.publish(BaseEvents_1.BaseEvents.OPEN_RIGHT_PANEL);
            }
            else {
                $.publish(BaseEvents_1.BaseEvents.CLOSE_RIGHT_PANEL);
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
//# sourceMappingURL=RightPanel.js.map
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
define('modules/uv-moreinforightpanel-module/MoreInfoRightPanel',["require", "exports", "../uv-shared-module/BaseEvents", "../uv-shared-module/RightPanel"], function (require, exports, BaseEvents_1, RightPanel_1) {
    "use strict";
    exports.__esModule = true;
    var MoreInfoRightPanel = (function (_super) {
        __extends(MoreInfoRightPanel, _super);
        function MoreInfoRightPanel($element) {
            return _super.call(this, $element) || this;
        }
        MoreInfoRightPanel.prototype.create = function () {
            var _this = this;
            this.setConfig('moreInfoRightPanel');
            _super.prototype.create.call(this);
            $.subscribe(BaseEvents_1.BaseEvents.CANVAS_INDEX_CHANGED, function () {
                _this.databind();
            });
            this.setTitle(this.config.content.title);
            this.$metadata = $('<div class="iiif-metadata-component"></div>');
            this.$main.append(this.$metadata);
            this.metadataComponent = new IIIFComponents.MetadataComponent({
                target: this.$metadata[0],
                data: this._getData()
            });
        };
        MoreInfoRightPanel.prototype.toggleFinish = function () {
            _super.prototype.toggleFinish.call(this);
            this.databind();
        };
        MoreInfoRightPanel.prototype.databind = function () {
            this.metadataComponent.options.data = this._getData();
            this.metadataComponent.set(new Object()); // todo: should be passing data
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
//# sourceMappingURL=MoreInfoRightPanel.js.map
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
define('modules/uv-shared-module/LeftPanel',["require", "exports", "./BaseEvents", "./BaseExpandPanel"], function (require, exports, BaseEvents_1, BaseExpandPanel_1) {
    "use strict";
    exports.__esModule = true;
    var LeftPanel = (function (_super) {
        __extends(LeftPanel, _super);
        function LeftPanel($element) {
            return _super.call(this, $element) || this;
        }
        LeftPanel.prototype.create = function () {
            var _this = this;
            _super.prototype.create.call(this);
            this.$element.width(this.options.panelCollapsedWidth);
            $.subscribe(BaseEvents_1.BaseEvents.TOGGLE_EXPAND_LEFT_PANEL, function () {
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
                $.publish(BaseEvents_1.BaseEvents.OPEN_LEFT_PANEL);
            }
            else {
                $.publish(BaseEvents_1.BaseEvents.CLOSE_LEFT_PANEL);
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
//# sourceMappingURL=LeftPanel.js.map
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
define('modules/uv-shared-module/ThumbsView',["require", "exports", "./BaseEvents", "./BaseView"], function (require, exports, BaseEvents_1, BaseView_1) {
    "use strict";
    exports.__esModule = true;
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
            $.subscribe(BaseEvents_1.BaseEvents.CANVAS_INDEX_CHANGED, function (e, index) {
                _this.selectIndex(parseInt(index));
            });
            $.subscribe(BaseEvents_1.BaseEvents.LOGIN, function () {
                _this.loadThumbs();
            });
            $.subscribe(BaseEvents_1.BaseEvents.CLICKTHROUGH, function () {
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
                    return '';
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
            this._$thumbsCache = null; // delete cache
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
                $.publish(BaseEvents_1.BaseEvents.THUMB_SELECTED, [data]);
            });
            this.setLabel();
            this.isCreated = true;
        };
        ThumbsView.prototype.scrollStop = function () {
            var scrollPos = 1 / ((this.$thumbs.height() - this.$element.height()) / this.$element.scrollTop());
            if (scrollPos > 1)
                scrollPos = 1;
            var thumbRangeMid = Math.floor((this.thumbs.length - 1) * scrollPos);
            this.loadThumbs(thumbRangeMid);
        };
        ThumbsView.prototype.loadThumbs = function (index) {
            if (index === void 0) { index = this.extension.helper.canvasIndex; }
            if (!this.thumbs || !this.thumbs.length)
                return;
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
                        var $img = $('<img src="' + src + '" />');
                        // fade in on load.
                        $img.hide().load(function () {
                            $(this).fadeIn(fadeDuration, function () {
                                $(this).parent().swapClass('loading', 'loaded');
                            });
                        }).error(function () {
                            $(this).parent().swapClass('loading', 'loadingFailed');
                        });
                        $wrap.append($img);
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
            return (this.extension.helper.getElementType().toString().includes("pdf"));
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
            if (!this._$thumbsCache) {
                this._$thumbsCache = this.$thumbs.find('.thumb');
            }
            return this._$thumbsCache;
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
//# sourceMappingURL=ThumbsView.js.map
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
    exports.__esModule = true;
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
//# sourceMappingURL=ThumbsView.js.map
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
define('modules/uv-resourcesleftpanel-module/ResourcesLeftPanel',["require", "exports", "../uv-shared-module/BaseEvents", "../uv-shared-module/LeftPanel", "./ThumbsView"], function (require, exports, BaseEvents_1, LeftPanel_1, ThumbsView_1) {
    "use strict";
    exports.__esModule = true;
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
                if (resource) {
                    var label = Manifesto.TranslationCollection.getValue(resource.getLabel());
                    if (label) {
                        var mime = Utils.Files.simplifyMimeType(resource.getFormat().toString());
                        var $listItem = $('<li><a href="' + resource.id + '" target="_blank">' + label + ' (' + mime + ')' + '</li>');
                        this.$resources.append($listItem);
                    }
                }
            }
        };
        ResourcesLeftPanel.prototype.dataBindThumbsView = function () {
            if (!this.thumbsView)
                return;
            var width;
            var height;
            var viewingDirection = this.extension.helper.getViewingDirection().toString();
            if (viewingDirection === manifesto.ViewingDirection.topToBottom().toString() || viewingDirection === manifesto.ViewingDirection.bottomToTop().toString()) {
                width = this.config.options.oneColThumbWidth;
                height = this.config.options.oneColThumbHeight;
            }
            else {
                width = this.config.options.twoColThumbWidth;
                height = this.config.options.twoColThumbHeight;
            }
            if (typeof (width) === "undefined") {
                width = 100;
            }
            if (typeof (height) === "undefined") {
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
            $.publish(BaseEvents_1.BaseEvents.LEFTPANEL_EXPAND_FULL_START);
        };
        ResourcesLeftPanel.prototype.expandFullFinish = function () {
            _super.prototype.expandFullFinish.call(this);
            $.publish(BaseEvents_1.BaseEvents.LEFTPANEL_EXPAND_FULL_FINISH);
        };
        ResourcesLeftPanel.prototype.collapseFullStart = function () {
            _super.prototype.collapseFullStart.call(this);
            $.publish(BaseEvents_1.BaseEvents.LEFTPANEL_COLLAPSE_FULL_START);
        };
        ResourcesLeftPanel.prototype.collapseFullFinish = function () {
            _super.prototype.collapseFullFinish.call(this);
            $.publish(BaseEvents_1.BaseEvents.LEFTPANEL_COLLAPSE_FULL_FINISH);
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
//# sourceMappingURL=ResourcesLeftPanel.js.map
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
define('modules/uv-dialogues-module/SettingsDialogue',["require", "exports", "../uv-shared-module/BaseEvents", "../uv-shared-module/Dialogue"], function (require, exports, BaseEvents_1, Dialogue_1) {
    "use strict";
    exports.__esModule = true;
    var SettingsDialogue = (function (_super) {
        __extends(SettingsDialogue, _super);
        function SettingsDialogue($element) {
            return _super.call(this, $element) || this;
        }
        SettingsDialogue.prototype.create = function () {
            var _this = this;
            this.setConfig('settingsDialogue');
            _super.prototype.create.call(this);
            this.openCommand = BaseEvents_1.BaseEvents.SHOW_SETTINGS_DIALOGUE;
            this.closeCommand = BaseEvents_1.BaseEvents.HIDE_SETTINGS_DIALOGUE;
            $.subscribe(this.openCommand, function () {
                _this.open();
            });
            $.subscribe(this.closeCommand, function () {
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
            this._createLocalesMenu();
            this.$element.hide();
        };
        SettingsDialogue.prototype.getSettings = function () {
            return this.extension.getSettings();
        };
        SettingsDialogue.prototype.updateSettings = function (settings) {
            this.extension.updateSettings(settings);
            $.publish(BaseEvents_1.BaseEvents.UPDATE_SETTINGS, [settings]);
        };
        SettingsDialogue.prototype.open = function () {
            var _this = this;
            _super.prototype.open.call(this);
            $.getJSON(this.extension.data.root + "/package.json", function (pjson) {
                _this.$version.text("v" + pjson.version);
            });
        };
        SettingsDialogue.prototype._createLocalesMenu = function () {
            var _this = this;
            var locales = this.extension.data.locales;
            if (locales && locales.length > 1) {
                for (var i = 0; i < locales.length; i++) {
                    var locale = locales[i];
                    this.$localeDropDown.append('<option value="' + locale.name + '">' + locale.label + '</option>');
                }
                this.$localeDropDown.val(locales[0].name);
            }
            else {
                this.$locale.hide();
            }
            this.$localeDropDown.change(function () {
                _this.extension.changeLocale(_this.$localeDropDown.val());
            });
        };
        SettingsDialogue.prototype.resize = function () {
            _super.prototype.resize.call(this);
        };
        return SettingsDialogue;
    }(Dialogue_1.Dialogue));
    exports.SettingsDialogue = SettingsDialogue;
});
//# sourceMappingURL=SettingsDialogue.js.map
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
    exports.__esModule = true;
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
//# sourceMappingURL=SettingsDialogue.js.map
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
define('modules/uv-dialogues-module/ShareDialogue',["require", "exports", "../uv-shared-module/BaseEvents", "../uv-shared-module/Dialogue"], function (require, exports, BaseEvents_1, Dialogue_1) {
    "use strict";
    exports.__esModule = true;
    var ShareDialogue = (function (_super) {
        __extends(ShareDialogue, _super);
        function ShareDialogue($element) {
            var _this = _super.call(this, $element) || this;
            _this.aspectRatio = .75;
            _this.isEmbedViewVisible = false;
            _this.isShareViewVisible = false;
            _this.maxWidth = 8000;
            _this.maxHeight = _this.maxWidth * _this.aspectRatio;
            _this.minWidth = 200;
            _this.minHeight = _this.minWidth * _this.aspectRatio;
            return _this;
        }
        ShareDialogue.prototype.create = function () {
            var _this = this;
            this.setConfig('shareDialogue');
            _super.prototype.create.call(this);
            this.openCommand = BaseEvents_1.BaseEvents.SHOW_SHARE_DIALOGUE;
            this.closeCommand = BaseEvents_1.BaseEvents.HIDE_SHARE_DIALOGUE;
            $.subscribe(this.openCommand, function (e, $triggerButton) {
                _this.open($triggerButton);
                if (_this.isShareAvailable()) {
                    _this.openShareView();
                }
                else {
                    _this.openEmbedView();
                }
            });
            $.subscribe(this.closeCommand, function () {
                _this.close();
            });
            $.subscribe(BaseEvents_1.BaseEvents.SHOW_EMBED_DIALOGUE, function (e, $triggerButton) {
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
            this.$termsOfUseButton = $('<a href="#">' + this.extension.data.config.content.termsOfUse + '</a>');
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
                $.publish(BaseEvents_1.BaseEvents.SHOW_TERMS_OF_USE);
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
            var shareUrl = this.getShareUrl();
            if (shareUrl) {
                this.$shareInput.val(shareUrl);
                this.$shareLink.prop('href', shareUrl);
                this.$shareLink.text(shareUrl);
            }
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
        //         thumbnail = canvas.getCanonicalImageUri(this.extension.data.config.options.bookmarkThumbWidth);
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
            if (!shareUrl) {
                return;
            }
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
            if (Utils.Bools.getBool(this.extension.data.config.options.termsOfUseEnabled, false) && attribution) {
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
//# sourceMappingURL=ShareDialogue.js.map
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
    exports.__esModule = true;
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
//# sourceMappingURL=ShareDialogue.js.map
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
define('extensions/uv-mediaelement-extension/Extension',["require", "exports", "../../modules/uv-shared-module/BaseEvents", "../../modules/uv-shared-module/BaseExtension", "../../modules/uv-shared-module/Bookmark", "./DownloadDialogue", "./Events", "../../modules/uv-shared-module/FooterPanel", "../../modules/uv-shared-module/HeaderPanel", "../../modules/uv-dialogues-module/HelpDialogue", "../../modules/uv-mediaelementcenterpanel-module/MediaElementCenterPanel", "../../modules/uv-moreinforightpanel-module/MoreInfoRightPanel", "../../modules/uv-resourcesleftpanel-module/ResourcesLeftPanel", "./SettingsDialogue", "./ShareDialogue", "../../modules/uv-shared-module/Shell"], function (require, exports, BaseEvents_1, BaseExtension_1, Bookmark_1, DownloadDialogue_1, Events_1, FooterPanel_1, HeaderPanel_1, HelpDialogue_1, MediaElementCenterPanel_1, MoreInfoRightPanel_1, ResourcesLeftPanel_1, SettingsDialogue_1, ShareDialogue_1, Shell_1) {
    "use strict";
    exports.__esModule = true;
    var Extension = (function (_super) {
        __extends(Extension, _super);
        function Extension() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Extension.prototype.create = function () {
            var _this = this;
            _super.prototype.create.call(this);
            // listen for mediaelement enter/exit fullscreen events.
            $(window).bind('enterfullscreen', function () {
                $.publish(BaseEvents_1.BaseEvents.TOGGLE_FULLSCREEN);
            });
            $(window).bind('exitfullscreen', function () {
                $.publish(BaseEvents_1.BaseEvents.TOGGLE_FULLSCREEN);
            });
            $.subscribe(BaseEvents_1.BaseEvents.CANVAS_INDEX_CHANGED, function (e, canvasIndex) {
                _this.viewCanvas(canvasIndex);
            });
            $.subscribe(BaseEvents_1.BaseEvents.THUMB_SELECTED, function (e, canvasIndex) {
                $.publish(BaseEvents_1.BaseEvents.CANVAS_INDEX_CHANGED, [canvasIndex]);
            });
            $.subscribe(BaseEvents_1.BaseEvents.LEFTPANEL_EXPAND_FULL_START, function () {
                Shell_1.Shell.$centerPanel.hide();
                Shell_1.Shell.$rightPanel.hide();
            });
            $.subscribe(BaseEvents_1.BaseEvents.LEFTPANEL_COLLAPSE_FULL_FINISH, function () {
                Shell_1.Shell.$centerPanel.show();
                Shell_1.Shell.$rightPanel.show();
                _this.resize();
            });
            $.subscribe(Events_1.Events.MEDIA_ENDED, function () {
                _this.fire(Events_1.Events.MEDIA_ENDED);
            });
            $.subscribe(Events_1.Events.MEDIA_PAUSED, function () {
                _this.fire(Events_1.Events.MEDIA_PAUSED);
            });
            $.subscribe(Events_1.Events.MEDIA_PLAYED, function () {
                _this.fire(Events_1.Events.MEDIA_PLAYED);
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
        Extension.prototype.update = function () {
            _super.prototype.update.call(this);
        };
        Extension.prototype.isLeftPanelEnabled = function () {
            return Utils.Bools.getBool(this.data.config.options.leftPanelEnabled, true)
                && ((this.helper.isMultiCanvas() || this.helper.isMultiSequence()) || this.helper.hasResources());
        };
        Extension.prototype.bookmark = function () {
            _super.prototype.bookmark.call(this);
            var canvas = this.extensions.helper.getCurrentCanvas();
            var bookmark = new Bookmark_1.Bookmark();
            bookmark.index = this.helper.canvasIndex;
            bookmark.label = Manifesto.TranslationCollection.getValue(canvas.getLabel());
            bookmark.thumb = canvas.getProperty('thumbnail');
            bookmark.title = this.helper.getLabel();
            bookmark.trackingLabel = window.trackingLabel;
            if (this.isVideo()) {
                bookmark.type = manifesto.ElementType.movingimage().toString();
            }
            else {
                bookmark.type = manifesto.ElementType.sound().toString();
            }
            this.fire(BaseEvents_1.BaseEvents.BOOKMARK, bookmark);
        };
        Extension.prototype.getEmbedScript = function (template, width, height) {
            var configUri = this.data.config.uri || '';
            var script = String.format(template, this.getSerializedLocales(), configUri, this.helper.iiifResourceUri, this.helper.collectionIndex, this.helper.manifestIndex, this.helper.sequenceIndex, this.helper.canvasIndex, width, height, this.data.embedScriptUri);
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
//# sourceMappingURL=Extension.js.map
define('extensions/uv-seadragon-extension/Events',["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var Events = (function () {
        function Events() {
        }
        return Events;
    }());
    Events.namespace = 'openseadragonExtension.';
    Events.CLEAR_SEARCH = Events.namespace + 'clearSearch';
    Events.CURRENT_VIEW_URI = Events.namespace + 'currentViewUri';
    Events.FIRST = Events.namespace + 'first';
    Events.GALLERY_DECREASE_SIZE = Events.namespace + 'galleryDecreaseSize';
    Events.GALLERY_INCREASE_SIZE = Events.namespace + 'galleryIncreaseSize';
    Events.GALLERY_THUMB_SELECTED = Events.namespace + 'galleryThumbSelected';
    Events.HIDE_MULTISELECT_DIALOGUE = Events.namespace + 'hideMultiSelectDialogue';
    Events.IMAGE_SEARCH = Events.namespace + 'imageSearch';
    Events.LAST = Events.namespace + 'last';
    Events.MODE_CHANGED = Events.namespace + 'modeChanged';
    Events.MULTISELECT_CHANGE = Events.namespace + 'multiSelectChange';
    Events.MULTISELECTION_MADE = Events.namespace + 'multiSelectionMade';
    Events.NEXT_SEARCH_RESULT = Events.namespace + 'nextSearchResult';
    Events.NEXT = Events.namespace + 'next';
    Events.NEXT_IMAGES_SEARCH_RESULT_UNAVAILABLE = Events.namespace + 'nextImagesSearchResultUnavailable';
    Events.PREV_IMAGES_SEARCH_RESULT_UNAVAILABLE = Events.namespace + 'prevImagesSearchResultUnavailable';
    Events.OPEN_THUMBS_VIEW = Events.namespace + 'openThumbsView';
    Events.OPEN_TREE_VIEW = Events.namespace + 'openTreeView';
    Events.PAGE_SEARCH = Events.namespace + 'pageSearch';
    Events.PAGING_TOGGLED = Events.namespace + 'pagingToggled';
    Events.PREV_SEARCH_RESULT = Events.namespace + 'prevSearchResult';
    Events.PREV = Events.namespace + 'prev';
    Events.PRINT = Events.namespace + 'print';
    Events.ROTATE = Events.namespace + 'rotate';
    Events.SEADRAGON_ANIMATION_FINISH = Events.namespace + 'animationFinish';
    Events.SEADRAGON_ANIMATION_START = Events.namespace + 'animationStart';
    Events.SEADRAGON_ANIMATION = Events.namespace + 'animation';
    Events.SEADRAGON_OPEN = Events.namespace + 'open';
    Events.SEADRAGON_RESIZE = Events.namespace + 'resize';
    Events.SEADRAGON_ROTATION = Events.namespace + 'rotationChanged';
    Events.SEARCH_PREVIEW_FINISH = Events.namespace + 'searchPreviewFinish';
    Events.SEARCH_PREVIEW_START = Events.namespace + 'searchPreviewStart';
    Events.SEARCH_RESULT_CANVAS_CHANGED = Events.namespace + 'searchResultCanvasChanged';
    Events.SEARCH_RESULT_RECT_CHANGED = Events.namespace + 'searchResultRectChanged';
    Events.SEARCH_RESULTS_EMPTY = Events.namespace + 'searchResultsEmpty';
    Events.SEARCH_RESULTS = Events.namespace + 'searchResults';
    Events.SEARCH_RESULTS_CLEARED = Events.namespace + 'searchResultsCleared';
    Events.SEARCH = Events.namespace + 'search';
    Events.SHOW_MULTISELECT_DIALOGUE = Events.namespace + 'showMultiSelectDialogue';
    Events.THUMB_MULTISELECTED = Events.namespace + 'thumbMultiSelected';
    Events.TREE_NODE_MULTISELECTED = Events.namespace + 'treeNodeMultiSelected';
    Events.TREE_NODE_SELECTED = Events.namespace + 'treeNodeSelected';
    Events.VIEW_PAGE = Events.namespace + 'viewPage';
    Events.XYWH_CHANGED = Events.namespace + 'xywhChanged';
    Events.ZOOM_IN = Events.namespace + 'zoomIn';
    Events.ZOOM_OUT = Events.namespace + 'zoomOut';
    exports.Events = Events;
});
//# sourceMappingURL=Events.js.map
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
define('modules/uv-contentleftpanel-module/GalleryView',["require", "exports", "../uv-shared-module/BaseEvents", "../uv-shared-module/BaseView", "../../extensions/uv-seadragon-extension/Events"], function (require, exports, BaseEvents_1, BaseView_1, Events_1) {
    "use strict";
    exports.__esModule = true;
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
            // $.subscribe(Events.SEARCH_PREVIEW_START, (e, canvasIndex) => {
            //     this.galleryComponent.searchPreviewStart(canvasIndex);
            // });
            // $.subscribe(Events.SEARCH_PREVIEW_FINISH, () => {
            //     this.galleryComponent.searchPreviewFinish();
            // });
            this.$gallery = $('<div class="iiif-gallery-component"></div>');
            this.$element.append(this.$gallery);
        };
        GalleryView.prototype.setup = function () {
            this.galleryComponent = new IIIFComponents.GalleryComponent({
                target: this.$gallery[0],
                data: this.galleryData
            });
            this.galleryComponent.on('thumbSelected', function (thumb) {
                $.publish(Events_1.Events.GALLERY_THUMB_SELECTED, [thumb]);
                $.publish(BaseEvents_1.BaseEvents.THUMB_SELECTED, [thumb]);
            });
            this.galleryComponent.on('decreaseSize', function () {
                $.publish(Events_1.Events.GALLERY_DECREASE_SIZE);
            });
            this.galleryComponent.on('increaseSize', function () {
                $.publish(Events_1.Events.GALLERY_INCREASE_SIZE);
            });
        };
        GalleryView.prototype.databind = function () {
            this.galleryComponent.options.data = this.galleryData;
            this.galleryComponent.set(new Object()); // todo: should be passing options.data
            this.resize();
        };
        GalleryView.prototype.show = function () {
            var _this = this;
            this.isOpen = true;
            this.$element.show();
            // todo: would be better to have no imperative methods on components and use a reactive pattern
            setTimeout(function () {
                _this.galleryComponent.selectIndex(_this.extension.helper.canvasIndex);
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
//# sourceMappingURL=GalleryView.js.map
define('extensions/uv-seadragon-extension/Mode',["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
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
//# sourceMappingURL=Mode.js.map
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
define('modules/uv-contentleftpanel-module/ThumbsView',["require", "exports", "../uv-shared-module/ThumbsView", "../../extensions/uv-seadragon-extension/Events", "../../extensions/uv-seadragon-extension/Mode"], function (require, exports, ThumbsView_1, Events_1, Mode_1) {
    "use strict";
    exports.__esModule = true;
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
            $.subscribe(Events_1.Events.MODE_CHANGED, function () {
                _this.setLabel();
            });
            $.subscribe(Events_1.Events.SEARCH_PREVIEW_START, function (e, canvasIndex) {
                _this.searchPreviewStart(canvasIndex);
            });
            $.subscribe(Events_1.Events.SEARCH_PREVIEW_FINISH, function () {
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
//# sourceMappingURL=ThumbsView.js.map
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
define('modules/uv-contentleftpanel-module/TreeView',["require", "exports", "../uv-shared-module/BaseView", "../../extensions/uv-seadragon-extension/Events"], function (require, exports, BaseView_1, Events_1) {
    "use strict";
    exports.__esModule = true;
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
            this.treeComponent = new IIIFComponents.TreeComponent({
                target: this.$tree[0],
                data: this.treeData
            });
            // todo: casting as <any> is necessary because IBaseComponent doesn't implement ITinyEmitter
            // it is mixed-in a runtime. figure out how to add .on etc to IBaseComponent without needing
            // to implement it in BaseComponent.
            this.treeComponent.on('treeNodeSelected', function (node) {
                $.publish(Events_1.Events.TREE_NODE_SELECTED, [node]);
            });
            this.treeComponent.on('treeNodeMultiSelected', function (node) {
                $.publish(Events_1.Events.TREE_NODE_MULTISELECTED, [node]);
            });
        };
        TreeView.prototype.databind = function () {
            this.treeComponent.options.data = this.treeData;
            this.treeComponent.set(new Object()); // todo: should be passing options.data
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
            this.treeComponent.selectNode(node);
        };
        TreeView.prototype.deselectCurrentNode = function () {
            this.treeComponent.deselectCurrentNode();
        };
        TreeView.prototype.getNodeById = function (id) {
            return this.treeComponent.getNodeById(id);
        };
        TreeView.prototype.resize = function () {
            _super.prototype.resize.call(this);
        };
        return TreeView;
    }(BaseView_1.BaseView));
    exports.TreeView = TreeView;
});
//# sourceMappingURL=TreeView.js.map
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
define('modules/uv-contentleftpanel-module/ContentLeftPanel',["require", "exports", "../uv-shared-module/BaseEvents", "../../extensions/uv-seadragon-extension/Events", "./GalleryView", "../uv-shared-module/LeftPanel", "../uv-shared-module/MetricType", "../../extensions/uv-seadragon-extension/Mode", "./ThumbsView", "./TreeView"], function (require, exports, BaseEvents_1, Events_1, GalleryView_1, LeftPanel_1, MetricType_1, Mode_1, ThumbsView_1, TreeView_1) {
    "use strict";
    exports.__esModule = true;
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
            $.subscribe(BaseEvents_1.BaseEvents.SETTINGS_CHANGED, function () {
                _this.databind();
            });
            $.subscribe(Events_1.Events.GALLERY_THUMB_SELECTED, function () {
                _this.collapseFull();
            });
            $.subscribe(BaseEvents_1.BaseEvents.METRIC_CHANGED, function () {
                if (_this.extension.metric.toString() === MetricType_1.MetricType.MOBILELANDSCAPE.toString()) {
                    if (_this.isFullyExpanded) {
                        _this.collapseFull();
                    }
                }
            });
            $.subscribe(Events_1.Events.SEARCH_RESULTS, function () {
                _this.databindThumbsView();
                _this.databindGalleryView();
            });
            $.subscribe(Events_1.Events.SEARCH_RESULTS_CLEARED, function () {
                _this.databindThumbsView();
                _this.databindGalleryView();
            });
            $.subscribe(Events_1.Events.SEARCH_RESULTS_EMPTY, function () {
                _this.databindThumbsView();
                _this.databindGalleryView();
            });
            $.subscribe(BaseEvents_1.BaseEvents.CANVAS_INDEX_CHANGED, function () {
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
                $.publish(Events_1.Events.OPEN_TREE_VIEW);
            });
            this.$thumbsButton.onPressed(function () {
                _this.openThumbsView();
                $.publish(Events_1.Events.OPEN_THUMBS_VIEW);
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
            if (!treeData) {
                return;
            }
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
            if (treeData) {
                return treeData.data.type === manifesto.TreeNodeType.collection().toString();
            }
            throw new Error("Tree not available");
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
            var title = null;
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
            var width;
            var height;
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
                var _loop_1 = function (i) {
                    var searchResult = searchResults[i];
                    // find the thumb with the same canvasIndex and add the searchResult
                    var thumb = thumbs.en().where(function (t) { return t.index === searchResult.canvasIndex; }).first();
                    // clone the data so searchResults isn't persisted on the canvas.
                    var data = $.extend(true, {}, thumb.data);
                    data.searchResults = searchResult.rects.length;
                    thumb.data = data;
                };
                for (var i = 0; i < searchResults.length; i++) {
                    _loop_1(i);
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
                if (treeData && treeData.nodes.length > defaultToTreeIfGreaterThan) {
                    return false;
                }
            }
            return true;
        };
        ContentLeftPanel.prototype.expandFullStart = function () {
            _super.prototype.expandFullStart.call(this);
            $.publish(BaseEvents_1.BaseEvents.LEFTPANEL_EXPAND_FULL_START);
        };
        ContentLeftPanel.prototype.expandFullFinish = function () {
            _super.prototype.expandFullFinish.call(this);
            if (this.$treeButton.hasClass('on')) {
                this.openTreeView();
            }
            else if (this.$thumbsButton.hasClass('on')) {
                this.openThumbsView();
            }
            $.publish(BaseEvents_1.BaseEvents.LEFTPANEL_EXPAND_FULL_FINISH);
        };
        ContentLeftPanel.prototype.collapseFullStart = function () {
            _super.prototype.collapseFullStart.call(this);
            $.publish(BaseEvents_1.BaseEvents.LEFTPANEL_COLLAPSE_FULL_START);
        };
        ContentLeftPanel.prototype.collapseFullFinish = function () {
            _super.prototype.collapseFullFinish.call(this);
            // todo: write a more generic tabs system with base tab class.
            // thumbsView may not necessarily have been created yet.
            // replace thumbsView with galleryView.
            if (this.$thumbsButton.hasClass('on')) {
                this.openThumbsView();
            }
            $.publish(BaseEvents_1.BaseEvents.LEFTPANEL_COLLAPSE_FULL_FINISH);
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
                var node = null;
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
//# sourceMappingURL=ContentLeftPanel.js.map
define('modules/uv-shared-module/Point',["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var Point = (function () {
        function Point(x, y) {
            this.x = x;
            this.y = y;
        }
        return Point;
    }());
    exports.Point = Point;
});
//# sourceMappingURL=Point.js.map
define('extensions/uv-seadragon-extension/CroppedImageDimensions',["require", "exports", "../../modules/uv-shared-module/Point"], function (require, exports, Point_1) {
    "use strict";
    exports.__esModule = true;
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
//# sourceMappingURL=CroppedImageDimensions.js.map
define('extensions/uv-seadragon-extension/DownloadType',["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
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
//# sourceMappingURL=DownloadType.js.map
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
define('extensions/uv-seadragon-extension/DownloadDialogue',["require", "exports", "../../modules/uv-shared-module/BaseEvents", "./Events", "../../modules/uv-dialogues-module/DownloadDialogue", "../../modules/uv-shared-module/DownloadOption", "./DownloadType"], function (require, exports, BaseEvents_1, Events_1, DownloadDialogue_1, DownloadOption_1, DownloadType_1) {
    "use strict";
    exports.__esModule = true;
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
                        //     $.publish(Events.PRINT);
                        // } else {
                        window.open(_this.renderingUrls[id]);
                        //}
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
                                $.publish(Events_1.Events.SHOW_MULTISELECT_DIALOGUE);
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
                $.publish(BaseEvents_1.BaseEvents.DOWNLOAD, [{
                        "type": type,
                        "label": label
                    }]);
                _this.close();
            });
            // this.$settingsButton.onPressed(() => {
            //     $.publish(BaseEvents.HIDE_DOWNLOAD_DIALOGUE);
            //     $.publish(BaseEvents.SHOW_SETTINGS_DIALOGUE);
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
            if (resource) {
                var format = resource.getFormat();
                if (format) {
                    return format.toString();
                }
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
            if (!(typeof (maxSize.width) === 'undefined') && maxSize.width < size.width) {
                finalWidth = maxSize.width;
                if (!(typeof (maxSize.height) === 'undefined')) {
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
                            if (typeof (maxSize.width) === 'undefined') {
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
//# sourceMappingURL=DownloadDialogue.js.map
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
define('modules/uv-dialogues-module/ExternalContentDialogue',["require", "exports", "../uv-shared-module/BaseEvents", "../uv-shared-module/Dialogue"], function (require, exports, BaseEvents_1, Dialogue_1) {
    "use strict";
    exports.__esModule = true;
    var ExternalContentDialogue = (function (_super) {
        __extends(ExternalContentDialogue, _super);
        function ExternalContentDialogue($element) {
            return _super.call(this, $element) || this;
        }
        ExternalContentDialogue.prototype.create = function () {
            var _this = this;
            this.setConfig('externalContentDialogue');
            _super.prototype.create.call(this);
            this.openCommand = BaseEvents_1.BaseEvents.SHOW_EXTERNALCONTENT_DIALOGUE;
            this.closeCommand = BaseEvents_1.BaseEvents.HIDE_EXTERNALCONTENT_DIALOGUE;
            $.subscribe(this.openCommand, function (e, params) {
                _this.open();
                _this.$iframe.prop('src', params.uri);
            });
            $.subscribe(this.closeCommand, function () {
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
//# sourceMappingURL=ExternalContentDialogue.js.map
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
define('modules/uv-osdmobilefooterpanel-module/MobileFooter',["require", "exports", "../uv-shared-module/FooterPanel", "../../extensions/uv-seadragon-extension/Events"], function (require, exports, FooterPanel_1, Events_1) {
    "use strict";
    exports.__esModule = true;
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
                $.publish(Events_1.Events.ZOOM_IN);
            });
            this.$zoomOutButton.onPressed(function () {
                $.publish(Events_1.Events.ZOOM_OUT);
            });
            this.$rotateButton.onPressed(function () {
                $.publish(Events_1.Events.ROTATE);
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
//# sourceMappingURL=MobileFooter.js.map
define('modules/uv-shared-module/AutoComplete',["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
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
                return function (cb, ms) {
                    clearTimeout(timer);
                    timer = setTimeout(cb, ms);
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
                        if (val && val.length > that._minChars && !val.includes(' ')) {
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
            var isValid = this._validKeyDownCodes.includes(Utils.Keyboard.getCharCode(e));
            return isValid;
        };
        AutoComplete.prototype._isValidKeyPress = function (e) {
            var charCode = Utils.Keyboard.getCharCode(e);
            var key = String.fromCharCode(charCode);
            var isValid = key.isAlphanumeric() || this._validKeyPressCodes.includes(charCode);
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
//# sourceMappingURL=AutoComplete.js.map
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
define('modules/uv-searchfooterpanel-module/FooterPanel',["require", "exports", "../uv-shared-module/AutoComplete", "../uv-shared-module/BaseEvents", "../../extensions/uv-seadragon-extension/Events", "../uv-shared-module/FooterPanel", "../../extensions/uv-seadragon-extension/Mode"], function (require, exports, AutoComplete_1, BaseEvents_1, Events_1, FooterPanel_1, Mode_1) {
    "use strict";
    exports.__esModule = true;
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
            $.subscribe(BaseEvents_1.BaseEvents.CANVAS_INDEX_CHANGED, function () {
                _this.canvasIndexChanged();
                _this.setCurrentSearchResultPlacemarker();
                _this.updatePrevButton();
                _this.updateNextButton();
            });
            // todo: this should be a setting
            $.subscribe(Events_1.Events.MODE_CHANGED, function () {
                _this.settingsChanged();
            });
            $.subscribe(Events_1.Events.SEARCH, function (e, terms) {
                _this.terms = terms;
            });
            $.subscribe(Events_1.Events.SEARCH_RESULTS, function (e, obj) {
                _this.displaySearchResults(obj.terms, obj.results);
                _this.setCurrentSearchResultPlacemarker();
            });
            $.subscribe(Events_1.Events.SEARCH_RESULTS_EMPTY, function () {
                _this.hideSearchSpinner();
            });
            $.subscribe(Events_1.Events.SEARCH_RESULT_RECT_CHANGED, function () {
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
                $.publish(Events_1.Events.SEARCH_PREVIEW_START, [_this.currentPlacemarkerIndex]);
            });
            this.$placemarkerDetails.on('mouseleave', function () {
                $(this).hide();
                $.publish(Events_1.Events.SEARCH_PREVIEW_FINISH);
                // reset all placemarkers.
                var placemarkers = that.getSearchResultPlacemarkers();
                placemarkers.removeClass('hover');
            });
            this.$placemarkerDetails.on('click', function () {
                $.publish(Events_1.Events.VIEW_PAGE, [_this.currentPlacemarkerIndex]);
            });
            this.$previousResultButton.on('click', function (e) {
                e.preventDefault();
                $.publish(Events_1.Events.PREV_SEARCH_RESULT);
            });
            this.$nextResultButton.on('click', function (e) {
                e.preventDefault();
                $.publish(Events_1.Events.NEXT_SEARCH_RESULT);
            });
            this.$clearSearchResultsButton.on('click', function (e) {
                e.preventDefault();
                $.publish(Events_1.Events.CLEAR_SEARCH);
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
                $.publish(Events_1.Events.PRINT);
            });
            this.updatePrintButton();
            var positionMarkerEnabled = Utils.Bools.getBool(this.config.options.positionMarkerEnabled, true);
            if (!positionMarkerEnabled) {
                this.$pagePositionMarker.hide();
                this.$pagePositionLabel.hide();
            }
        };
        FooterPanel.prototype.isZoomToSearchResultEnabled = function () {
            return Utils.Bools.getBool(this.extension.data.config.options.zoomToSearchResultEnabled, true);
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
            if (!searchResults)
                return -1;
            var firstSearchResultCanvasIndex = searchResults[0].canvasIndex;
            return firstSearchResultCanvasIndex;
        };
        FooterPanel.prototype.getLastSearchResultCanvasIndex = function () {
            var searchResults = this.getSearchResults();
            if (!searchResults)
                return -1;
            var lastSearchResultCanvasIndex = searchResults[searchResults.length - 1].canvasIndex;
            return lastSearchResultCanvasIndex;
        };
        FooterPanel.prototype.getLastSearchResultRectIndex = function () {
            return this.extension.getLastSearchResultRectIndex();
        };
        FooterPanel.prototype.updateNextButton = function () {
            var searchResults = this.getSearchResults();
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
            var searchResults = this.getSearchResults();
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
            $.publish(Events_1.Events.SEARCH, [this.terms]);
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
            var searchResults = this.getSearchResults();
            if (!searchResults || !searchResults.length)
                return;
            // clear all existing placemarkers
            var placemarkers = this.getSearchResultPlacemarkers();
            placemarkers.remove();
            var pageWidth = this.getPageLineRatio();
            var lineTop = this.$line.position().top;
            var lineLeft = this.$line.position().left;
            var that = this;
            // for each page with a result, place a marker along the line.
            for (var i = 0; i < searchResults.length; i++) {
                var result = searchResults[i];
                var distance = result.canvasIndex * pageWidth;
                var $placemarker = $('<div class="searchResultPlacemarker" data-index="' + result.canvasIndex + '"></div>');
                $placemarker[0].ontouchstart = function (e) { that.onPlacemarkerTouchStart.call(this, that); };
                $placemarker.click(function (e) { that.onPlacemarkerClick.call(this, that); });
                $placemarker.mouseenter(function (e) { that.onPlacemarkerMouseEnter.call(this, that); });
                $placemarker.mouseleave(function (e) { that.onPlacemarkerMouseLeave.call(this, e, that); });
                this.$searchResultsContainer.append($placemarker);
                var top_1 = lineTop - $placemarker.height();
                var left = lineLeft + distance - ($placemarker.width() / 2);
                $placemarker.css({
                    top: top_1,
                    left: left
                });
            }
        };
        FooterPanel.prototype.onPlacemarkerTouchStart = function (that) {
            that.placemarkerTouched = true;
            var $placemarker = $(this);
            var index = parseInt($placemarker.attr('data-index'));
            $.publish(Events_1.Events.VIEW_PAGE, [index]);
        };
        FooterPanel.prototype.onPlacemarkerClick = function (that) {
            if (that.placemarkerTouched)
                return;
            that.placemarkerTouched = false;
            var $placemarker = $(this);
            var index = parseInt($placemarker.attr('data-index'));
            $.publish(Events_1.Events.VIEW_PAGE, [index]);
        };
        FooterPanel.prototype.onPlacemarkerMouseEnter = function (that) {
            if (that.placemarkerTouched)
                return;
            var $placemarker = $(this);
            $placemarker.addClass('hover');
            var canvasIndex = parseInt($placemarker.attr('data-index'));
            $.publish(Events_1.Events.SEARCH_PREVIEW_START, [canvasIndex]);
            var $placemarkers = that.getSearchResultPlacemarkers();
            var elemIndex = $placemarkers.index($placemarker[0]);
            that.currentPlacemarkerIndex = canvasIndex;
            that.$placemarkerDetails.show();
            var title = "{0} {1}";
            var mode = that.extension.getMode();
            if (mode.toString() === Mode_1.Mode.page.toString()) {
                var canvas = that.extension.helper.getCanvasByIndex(canvasIndex);
                var label = Manifesto.TranslationCollection.getValue(canvas.getLabel());
                if (!label) {
                    label = this.extension.helper.manifest.options.defaultLabel;
                }
                title = String.format(title, that.content.pageCaps, label);
            }
            else {
                title = String.format(title, that.content.imageCaps, canvasIndex + 1);
            }
            that.$placemarkerDetailsTop.html(title);
            var searchResults = that.getSearchResults();
            if (searchResults) {
                var result = searchResults[elemIndex];
                var terms = Utils.Strings.ellipsis(that.terms, that.options.elideDetailsTermsCount);
                var instanceFoundText = that.content.instanceFound;
                var instancesFoundText = that.content.instancesFound;
                var text = '';
                if (result.rects.length === 1) {
                    text = String.format(instanceFoundText, terms);
                    that.$placemarkerDetailsBottom.html(text);
                }
                else {
                    text = String.format(instancesFoundText, result.rects.length, terms);
                    that.$placemarkerDetailsBottom.html(text);
                }
            }
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
            $.publish(Events_1.Events.SEARCH_PREVIEW_FINISH);
            var $placemarker = $(this);
            var newElement = e.toElement || e.relatedTarget;
            var isChild = $(newElement).closest(that.$placemarkerDetails).length;
            if (newElement != that.$placemarkerDetails.get(0) && isChild === 0) {
                that.$placemarkerDetails.hide();
                $placemarker.removeClass('hover');
            }
        };
        FooterPanel.prototype.setPageMarkerPosition = function () {
            if (this.extension.helper.canvasIndex === null)
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
            var $placemarkers = this.getSearchResultPlacemarkers();
            $placemarkers.remove();
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
                if (!label) {
                    label = this.content.defaultLabel;
                }
                var lastCanvasOrderLabel = this.extension.helper.getLastCanvasLabel(true);
                if (lastCanvasOrderLabel) {
                    this.$pagePositionLabel.html(String.format(displaying, this.content.page, this.extension.sanitize(label), this.extension.sanitize(lastCanvasOrderLabel)));
                }
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
            var $foundFor = this.$searchResultsInfo.find('.foundFor');
            if (results.length === 1) {
                $foundFor.html(this.content.resultFoundFor);
            }
            else {
                $foundFor.html(this.content.resultsFoundFor);
            }
            var $terms = this.$searchPagerContainer.find('.terms');
            $terms.html(Utils.Strings.ellipsis(terms, this.options.elideResultsTermsCount));
            $terms.prop('title', terms);
            this.$searchPagerContainer.show();
            this.resize();
        };
        FooterPanel.prototype.resize = function () {
            _super.prototype.resize.call(this);
            var searchResults = this.getSearchResults();
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
//# sourceMappingURL=FooterPanel.js.map
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
define('modules/uv-dialogues-module/MoreInfoDialogue',["require", "exports", "../uv-shared-module/BaseEvents", "../uv-shared-module/Dialogue"], function (require, exports, BaseEvents_1, Dialogue_1) {
    "use strict";
    exports.__esModule = true;
    var MoreInfoDialogue = (function (_super) {
        __extends(MoreInfoDialogue, _super);
        function MoreInfoDialogue($element) {
            return _super.call(this, $element) || this;
        }
        MoreInfoDialogue.prototype.create = function () {
            var _this = this;
            this.setConfig('moreInfoDialogue');
            _super.prototype.create.call(this);
            this.openCommand = BaseEvents_1.BaseEvents.SHOW_MOREINFO_DIALOGUE;
            this.closeCommand = BaseEvents_1.BaseEvents.HIDE_MOREINFO_DIALOGUE;
            $.subscribe(this.openCommand, function (e, $triggerButton) {
                _this.open($triggerButton);
            });
            $.subscribe(this.closeCommand, function () {
                _this.close();
            });
            this.config.content = this.extension.data.config.modules.moreInfoRightPanel.content;
            this.config.options = this.extension.data.config.modules.moreInfoRightPanel.options;
            // create ui
            this.$title = $('<h1>' + this.config.content.title + '</h1>');
            this.$content.append(this.$title);
            this.$metadata = $('<div class="iiif-metadata-component"></div>');
            this.$content.append(this.$metadata);
            this.metadataComponent = new IIIFComponents.MetadataComponent({
                target: this.$metadata[0],
                data: this._getData()
            });
            // hide
            this.$element.hide();
        };
        MoreInfoDialogue.prototype.open = function ($triggerButton) {
            _super.prototype.open.call(this, $triggerButton);
            this.metadataComponent.set(new Object()); // todo: should be passing data
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
//# sourceMappingURL=MoreInfoDialogue.js.map
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
define('modules/uv-multiselectdialogue-module/MultiSelectDialogue',["require", "exports", "../../extensions/uv-seadragon-extension/Events", "../../modules/uv-shared-module/Dialogue", "../../extensions/uv-seadragon-extension/Mode"], function (require, exports, Events_1, Dialogue_1, Mode_1) {
    "use strict";
    exports.__esModule = true;
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
            this.openCommand = Events_1.Events.SHOW_MULTISELECT_DIALOGUE;
            this.closeCommand = Events_1.Events.HIDE_MULTISELECT_DIALOGUE;
            $.subscribe(this.openCommand, function () {
                _this.open();
                var multiSelectState = _this.extension.helper.getMultiSelectState();
                multiSelectState.setEnabled(true);
                _this.galleryComponent.set(new Object()); // todo: should be passing data
            });
            $.subscribe(this.closeCommand, function () {
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
            this.galleryComponent = new IIIFComponents.GalleryComponent({
                target: this.$gallery[0],
                data: this.data
            });
            var $selectButton = this.$gallery.find('a.select');
            $selectButton.addClass('btn btn-primary');
            this.galleryComponent.on('multiSelectionMade', function (ids) {
                $.publish(Events_1.Events.MULTISELECTION_MADE, [ids]);
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
//# sourceMappingURL=MultiSelectDialogue.js.map
define('extensions/uv-seadragon-extension/MultiSelectionArgs',["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var MultiSelectionArgs = (function () {
        function MultiSelectionArgs() {
        }
        return MultiSelectionArgs;
    }());
    exports.MultiSelectionArgs = MultiSelectionArgs;
});
//# sourceMappingURL=MultiSelectionArgs.js.map
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
define('modules/uv-pagingheaderpanel-module/PagingHeaderPanel',["require", "exports", "../uv-shared-module/AutoComplete", "../uv-shared-module/BaseEvents", "../../extensions/uv-seadragon-extension/Events", "../uv-shared-module/HeaderPanel", "../../extensions/uv-seadragon-extension/Mode"], function (require, exports, AutoComplete_1, BaseEvents_1, Events_1, HeaderPanel_1, Mode_1) {
    "use strict";
    exports.__esModule = true;
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
            $.subscribe(BaseEvents_1.BaseEvents.CANVAS_INDEX_CHANGED, function (e, canvasIndex) {
                _this.canvasIndexChanged(canvasIndex);
            });
            $.subscribe(BaseEvents_1.BaseEvents.SETTINGS_CHANGED, function () {
                _this.modeChanged();
                _this.updatePagingToggle();
            });
            $.subscribe(BaseEvents_1.BaseEvents.CANVAS_INDEX_CHANGE_FAILED, function () {
                _this.setSearchFieldValue(_this.extension.helper.canvasIndex);
            });
            $.subscribe(BaseEvents_1.BaseEvents.LEFTPANEL_EXPAND_FULL_START, function () {
                _this.openGallery();
            });
            $.subscribe(BaseEvents_1.BaseEvents.LEFTPANEL_COLLAPSE_FULL_START, function () {
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
                            if (label && label.startsWith(term)) {
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
                    $.publish(Events_1.Events.IMAGE_SEARCH, [imageIndex]);
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
                $.publish(Events_1.Events.PAGING_TOGGLED, [enabled]);
            });
            this.$twoUpButton.onPressed(function () {
                var enabled = true;
                _this.updateSettings({ pagingEnabled: enabled });
                $.publish(Events_1.Events.PAGING_TOGGLED, [enabled]);
            });
            this.$galleryButton.onPressed(function () {
                $.publish(BaseEvents_1.BaseEvents.TOGGLE_EXPAND_LEFT_PANEL);
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
                        $.publish(Events_1.Events.FIRST);
                        break;
                    case manifesto.ViewingDirection.rightToLeft().toString():
                        $.publish(Events_1.Events.LAST);
                        break;
                }
            });
            this.$prevButton.onPressed(function () {
                switch (viewingDirection.toString()) {
                    case manifesto.ViewingDirection.leftToRight().toString():
                    case manifesto.ViewingDirection.bottomToTop().toString():
                    case manifesto.ViewingDirection.topToBottom().toString():
                        $.publish(Events_1.Events.PREV);
                        break;
                    case manifesto.ViewingDirection.rightToLeft().toString():
                        $.publish(Events_1.Events.NEXT);
                        break;
                }
            });
            this.$nextButton.onPressed(function () {
                switch (viewingDirection.toString()) {
                    case manifesto.ViewingDirection.leftToRight().toString():
                    case manifesto.ViewingDirection.bottomToTop().toString():
                    case manifesto.ViewingDirection.topToBottom().toString():
                        $.publish(Events_1.Events.NEXT);
                        break;
                    case manifesto.ViewingDirection.rightToLeft().toString():
                        $.publish(Events_1.Events.PREV);
                        break;
                }
            });
            this.$lastButton.onPressed(function () {
                switch (viewingDirection.toString()) {
                    case manifesto.ViewingDirection.leftToRight().toString():
                    case manifesto.ViewingDirection.topToBottom().toString():
                    case manifesto.ViewingDirection.bottomToTop().toString():
                        $.publish(Events_1.Events.LAST);
                        break;
                    case manifesto.ViewingDirection.rightToLeft().toString():
                        $.publish(Events_1.Events.FIRST);
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
                    $.publish(Events_1.Events.MODE_CHANGED, [Mode_1.Mode.image.toString()]);
                });
                this.$pageModeOption.on('click', function (e) {
                    $.publish(Events_1.Events.MODE_CHANGED, [Mode_1.Mode.page.toString()]);
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
            var value = null;
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
                value = index.toString();
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
                $.publish(BaseEvents_1.BaseEvents.CANVAS_INDEX_CHANGE_FAILED);
                return;
            }
            if (this.isPageModeEnabled()) {
                $.publish(Events_1.Events.PAGE_SEARCH, [value]);
            }
            else {
                var index = void 0;
                if (this.options.autoCompleteBoxEnabled) {
                    index = parseInt(this.$autoCompleteBox.val(), 10);
                }
                else {
                    index = parseInt(this.$searchText.val(), 10);
                }
                index -= 1;
                if (isNaN(index)) {
                    this.extension.showMessage(this.extension.data.config.modules.genericDialogue.content.invalidNumber);
                    $.publish(BaseEvents_1.BaseEvents.CANVAS_INDEX_CHANGE_FAILED);
                    return;
                }
                var asset = this.extension.helper.getCanvasByIndex(index);
                if (!asset) {
                    this.extension.showMessage(this.extension.data.config.modules.genericDialogue.content.pageNotFound);
                    $.publish(BaseEvents_1.BaseEvents.CANVAS_INDEX_CHANGE_FAILED);
                    return;
                }
                $.publish(Events_1.Events.IMAGE_SEARCH, [index]);
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
            if (this.extension.width() < this.extension.data.config.options.minWidthBreakPoint) {
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
//# sourceMappingURL=PagingHeaderPanel.js.map
define('extensions/uv-seadragon-extension/Bounds',["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
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
//# sourceMappingURL=Bounds.js.map
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
define('modules/uv-seadragoncenterpanel-module/SeadragonCenterPanel',["require", "exports", "../uv-shared-module/BaseEvents", "../../extensions/uv-seadragon-extension/Bounds", "../uv-shared-module/CenterPanel", "../../extensions/uv-seadragon-extension/Events", "../uv-shared-module/MetricType"], function (require, exports, BaseEvents_1, Bounds_1, CenterPanel_1, Events_1, MetricType_1) {
    "use strict";
    exports.__esModule = true;
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
            $.subscribe(BaseEvents_1.BaseEvents.SETTINGS_CHANGED, function (e, args) {
                _this.viewer.gestureSettingsMouse.clickToZoom = args.clickToZoomEnabled;
            });
            $.subscribe(BaseEvents_1.BaseEvents.OPEN_EXTERNAL_RESOURCE, function (e, resources) {
                _this.whenResized(function () {
                    if (!_this.isCreated)
                        _this.createUI();
                    _this.openMedia(resources);
                });
            });
            $.subscribe(Events_1.Events.CLEAR_SEARCH, function () {
                _this.whenCreated(function () {
                    _this.extension.currentSearchResultRect = null;
                    _this.clearSearchResults();
                });
            });
            $.subscribe(Events_1.Events.VIEW_PAGE, function () {
                _this.extension.previousSearchResultRect = null;
                _this.extension.currentSearchResultRect = null;
            });
            $.subscribe(Events_1.Events.NEXT_SEARCH_RESULT, function () {
                _this.whenCreated(function () {
                    _this.nextSearchResult();
                });
            });
            $.subscribe(Events_1.Events.PREV_SEARCH_RESULT, function () {
                _this.whenCreated(function () {
                    _this.prevSearchResult();
                });
            });
            $.subscribe(Events_1.Events.ZOOM_IN, function () {
                _this.whenCreated(function () {
                    _this.zoomIn();
                });
            });
            $.subscribe(Events_1.Events.ZOOM_OUT, function () {
                _this.whenCreated(function () {
                    _this.zoomOut();
                });
            });
            $.subscribe(Events_1.Events.ROTATE, function () {
                _this.whenCreated(function () {
                    _this.rotateRight();
                });
            });
            $.subscribe(BaseEvents_1.BaseEvents.METRIC_CHANGED, function () {
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
            if (this.extension.metric.toString() === MetricType_1.MetricType.MOBILELANDSCAPE.toString()) {
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
            this.$spinner = $('<div class="spinner"></div>');
            this.$content.append(this.$spinner);
            this.updateAttribution();
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
                prefixUrl: this.extension.data.root + '/img/',
                gestureSettingsMouse: {
                    clickToZoom: Utils.Bools.getBool(this.extension.data.config.options.clickToZoomEnabled, true)
                },
                navImages: {
                    zoomIn: {
                        REST: 'pixel.gif',
                        GROUP: 'pixel.gif',
                        HOVER: 'pixel.gif',
                        DOWN: 'pixel.gif'
                    },
                    zoomOut: {
                        REST: 'pixel.gif',
                        GROUP: 'pixel.gif',
                        HOVER: 'pixel.gif',
                        DOWN: 'pixel.gif'
                    },
                    home: {
                        REST: 'pixel.gif',
                        GROUP: 'pixel.gif',
                        HOVER: 'pixel.gif',
                        DOWN: 'pixel.gif'
                    },
                    rotateright: {
                        REST: 'pixel.gif',
                        GROUP: 'pixel.gif',
                        HOVER: 'pixel.gif',
                        DOWN: 'pixel.gif'
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
            this.$canvas.on('contextmenu', function () { return false; });
            this.$navigator = this.$viewer.find(".navigator");
            this.setNavigatorVisible();
            // events
            this.$element.on('mousemove', function () {
                if (_this.controlsVisible)
                    return;
                _this.controlsVisible = true;
                _this.viewer.setControlsEnabled(true);
            });
            this.$element.on('mouseleave', function () {
                if (!_this.controlsVisible)
                    return;
                _this.controlsVisible = false;
                _this.viewer.setControlsEnabled(false);
            });
            // when mouse move stopped
            this.$element.on('mousemove', function () {
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
                $.publish(Events_1.Events.SEADRAGON_RESIZE, [viewer]);
                _this.viewerResize(viewer);
            });
            this.viewer.addHandler('animation-start', function (viewer) {
                $.publish(Events_1.Events.SEADRAGON_ANIMATION_START, [viewer]);
            });
            this.viewer.addHandler('animation', function (viewer) {
                $.publish(Events_1.Events.SEADRAGON_ANIMATION, [viewer]);
            });
            this.viewer.addHandler('animation-finish', function (viewer) {
                _this.currentBounds = _this.getViewportBounds();
                _this.updateVisibleSearchResultRects();
                $.publish(Events_1.Events.SEADRAGON_ANIMATION_FINISH, [viewer]);
            });
            this.viewer.addHandler('rotate', function (args) {
                $.publish(Events_1.Events.SEADRAGON_ROTATION, [args.degrees]);
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
                        $.publish(Events_1.Events.PREV);
                        break;
                    case manifesto.ViewingDirection.rightToLeft().toString():
                        $.publish(Events_1.Events.NEXT);
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
                        $.publish(Events_1.Events.NEXT);
                        break;
                    case manifesto.ViewingDirection.rightToLeft().toString():
                        $.publish(Events_1.Events.PREV);
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
            $.publish(Events_1.Events.SEADRAGON_OPEN);
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
                this.initialRotation = this.extension.data.rotation;
                if (this.initialRotation) {
                    this.viewer.viewport.setRotation(parseInt(this.initialRotation));
                }
                this.initialBounds = this.extension.data.xywh;
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
            if (dimensions) {
                var bounds = new Bounds_1.Bounds(dimensions.regionPos.x, dimensions.regionPos.y, dimensions.region.width, dimensions.region.height);
                return bounds.toString();
            }
            return null;
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
            if (!searchResults || !searchResults.length)
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
            return Utils.Bools.getBool(this.extension.data.config.options.zoomToSearchResultEnabled, true);
        };
        SeadragonCenterPanel.prototype.nextSearchResult = function () {
            var searchResultRects = this.getSearchResultRectsForCurrentImages();
            var searchResultRect = this.extension.currentSearchResultRect;
            if (!searchResultRect)
                return;
            var currentSearchResultRectIndex = this.getSearchResultRectIndex(searchResultRect);
            var foundRect = null;
            for (var i = currentSearchResultRectIndex + 1; i < searchResultRects.length; i++) {
                var rect = searchResultRects[i];
                // this was removed as users found it confusing.
                // find the next visible or non-visible rect.
                //if (rect.isVisible) {
                //    continue;
                //} else {
                foundRect = rect;
                break;
                //}
            }
            if (foundRect && this.isZoomToSearchResultEnabled()) {
                // if the rect's canvasIndex is greater than the current canvasIndex
                if (foundRect.canvasIndex > this.extension.helper.canvasIndex) {
                    this.extension.currentSearchResultRect = foundRect;
                    $.publish(Events_1.Events.SEARCH_RESULT_CANVAS_CHANGED, [foundRect]);
                }
                else {
                    this.zoomToSearchResult(foundRect);
                }
            }
            else {
                $.publish(Events_1.Events.NEXT_IMAGES_SEARCH_RESULT_UNAVAILABLE);
            }
        };
        SeadragonCenterPanel.prototype.prevSearchResult = function () {
            var searchResultRects = this.getSearchResultRectsForCurrentImages();
            var currentSearchResultRect = this.extension.currentSearchResultRect;
            if (!currentSearchResultRect)
                return;
            var currentSearchResultRectIndex = this.getSearchResultRectIndex(currentSearchResultRect);
            var foundRect = null;
            for (var i = currentSearchResultRectIndex - 1; i >= 0; i--) {
                var rect = searchResultRects[i];
                // this was removed as users found it confusing.
                // find the prev visible or non-visible rect.
                //if (rect.isVisible) {
                //    continue;
                //} else {
                foundRect = rect;
                break;
                //}
            }
            if (foundRect && this.isZoomToSearchResultEnabled()) {
                // if the rect's canvasIndex is less than the current canvasIndex
                if (foundRect.canvasIndex < this.extension.helper.canvasIndex) {
                    this.extension.currentSearchResultRect = foundRect;
                    $.publish(Events_1.Events.SEARCH_RESULT_CANVAS_CHANGED, [foundRect]);
                }
                else {
                    this.zoomToSearchResult(foundRect);
                }
            }
            else {
                $.publish(Events_1.Events.PREV_IMAGES_SEARCH_RESULT_UNAVAILABLE);
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
            var previousSearchResultRect = this.extension.previousSearchResultRect;
            if (previousSearchResultRect && previousSearchResultRect.canvasIndex > this.extension.helper.canvasIndex) {
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
            $.publish(Events_1.Events.SEARCH_RESULT_RECT_CHANGED);
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
                if (this.extension.data.config.options.allowStealFocus) {
                    this.$canvas.focus();
                }
            }
        };
        SeadragonCenterPanel.prototype.setNavigatorVisible = function () {
            var navigatorEnabled = Utils.Bools.getBool(this.extension.getSettings().navigatorEnabled, true) && this.extension.metric.toString() !== MetricType_1.MetricType.MOBILELANDSCAPE.toString();
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
//# sourceMappingURL=SeadragonCenterPanel.js.map
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
    exports.__esModule = true;
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
//# sourceMappingURL=SettingsDialogue.js.map
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
define('extensions/uv-seadragon-extension/ShareDialogue',["require", "exports", "./Events", "../../modules/uv-dialogues-module/ShareDialogue"], function (require, exports, Events_1, ShareDialogue_1) {
    "use strict";
    exports.__esModule = true;
    var ShareDialogue = (function (_super) {
        __extends(ShareDialogue, _super);
        function ShareDialogue($element) {
            var _this = _super.call(this, $element) || this;
            $.subscribe(Events_1.Events.SEADRAGON_OPEN, function () {
                _this.update();
            });
            $.subscribe(Events_1.Events.SEADRAGON_ANIMATION_FINISH, function () {
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
//# sourceMappingURL=ShareDialogue.js.map
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
define('extensions/uv-seadragon-extension/Extension',["require", "exports", "../../modules/uv-shared-module/BaseEvents", "../../modules/uv-shared-module/BaseExtension", "../../modules/uv-shared-module/Bookmark", "../../modules/uv-contentleftpanel-module/ContentLeftPanel", "./CroppedImageDimensions", "./DownloadDialogue", "./Events", "../../modules/uv-dialogues-module/ExternalContentDialogue", "../../modules/uv-osdmobilefooterpanel-module/MobileFooter", "../../modules/uv-searchfooterpanel-module/FooterPanel", "../../modules/uv-dialogues-module/HelpDialogue", "../../modules/uv-shared-module/MetricType", "./Mode", "../../modules/uv-dialogues-module/MoreInfoDialogue", "../../modules/uv-moreinforightpanel-module/MoreInfoRightPanel", "../../modules/uv-multiselectdialogue-module/MultiSelectDialogue", "./MultiSelectionArgs", "../../modules/uv-pagingheaderpanel-module/PagingHeaderPanel", "../../modules/uv-shared-module/Point", "../../modules/uv-seadragoncenterpanel-module/SeadragonCenterPanel", "./SettingsDialogue", "./ShareDialogue", "../../modules/uv-shared-module/Shell"], function (require, exports, BaseEvents_1, BaseExtension_1, Bookmark_1, ContentLeftPanel_1, CroppedImageDimensions_1, DownloadDialogue_1, Events_1, ExternalContentDialogue_1, MobileFooter_1, FooterPanel_1, HelpDialogue_1, MetricType_1, Mode_1, MoreInfoDialogue_1, MoreInfoRightPanel_1, MultiSelectDialogue_1, MultiSelectionArgs_1, PagingHeaderPanel_1, Point_1, SeadragonCenterPanel_1, SettingsDialogue_1, ShareDialogue_1, Shell_1) {
    "use strict";
    exports.__esModule = true;
    var SearchResult = Manifold.SearchResult;
    var Size = Utils.Measurements.Size;
    var Extension = (function (_super) {
        __extends(Extension, _super);
        function Extension() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.currentRotation = 0;
            _this.isSearching = false;
            _this.searchResults = [];
            return _this;
        }
        Extension.prototype.create = function () {
            var _this = this;
            _super.prototype.create.call(this);
            $.subscribe(BaseEvents_1.BaseEvents.METRIC_CHANGED, function () {
                if (_this.metric.toString() === MetricType_1.MetricType.MOBILELANDSCAPE.toString()) {
                    var settings = {};
                    settings.pagingEnabled = false;
                    _this.updateSettings(settings);
                    $.publish(BaseEvents_1.BaseEvents.UPDATE_SETTINGS);
                    Shell_1.Shell.$rightPanel.hide();
                }
                else {
                    Shell_1.Shell.$rightPanel.show();
                }
            });
            $.subscribe(BaseEvents_1.BaseEvents.CANVAS_INDEX_CHANGED, function (e, canvasIndex) {
                _this.viewPage(canvasIndex);
            });
            $.subscribe(Events_1.Events.CLEAR_SEARCH, function () {
                _this.searchResults = null;
                $.publish(Events_1.Events.SEARCH_RESULTS_CLEARED);
                _this.fire(Events_1.Events.CLEAR_SEARCH);
            });
            $.subscribe(BaseEvents_1.BaseEvents.DOWN_ARROW, function () {
                if (!_this.useArrowKeysToNavigate()) {
                    _this.centerPanel.setFocus();
                }
            });
            $.subscribe(BaseEvents_1.BaseEvents.END, function () {
                $.publish(BaseEvents_1.BaseEvents.CANVAS_INDEX_CHANGED, [_this.helper.getLastPageIndex()]);
            });
            $.subscribe(Events_1.Events.FIRST, function () {
                _this.fire(Events_1.Events.FIRST);
                $.publish(BaseEvents_1.BaseEvents.CANVAS_INDEX_CHANGED, [_this.helper.getFirstPageIndex()]);
            });
            $.subscribe(Events_1.Events.GALLERY_DECREASE_SIZE, function () {
                _this.fire(Events_1.Events.GALLERY_DECREASE_SIZE);
            });
            $.subscribe(Events_1.Events.GALLERY_INCREASE_SIZE, function () {
                _this.fire(Events_1.Events.GALLERY_INCREASE_SIZE);
            });
            $.subscribe(Events_1.Events.GALLERY_THUMB_SELECTED, function () {
                _this.fire(Events_1.Events.GALLERY_THUMB_SELECTED);
            });
            $.subscribe(BaseEvents_1.BaseEvents.HOME, function () {
                $.publish(BaseEvents_1.BaseEvents.CANVAS_INDEX_CHANGED, [_this.helper.getFirstPageIndex()]);
            });
            $.subscribe(Events_1.Events.IMAGE_SEARCH, function (e, index) {
                _this.fire(Events_1.Events.IMAGE_SEARCH, index);
                $.publish(BaseEvents_1.BaseEvents.CANVAS_INDEX_CHANGED, [index]);
            });
            $.subscribe(Events_1.Events.LAST, function () {
                _this.fire(Events_1.Events.LAST);
                $.publish(BaseEvents_1.BaseEvents.CANVAS_INDEX_CHANGED, [_this.helper.getLastPageIndex()]);
            });
            $.subscribe(BaseEvents_1.BaseEvents.LEFT_ARROW, function () {
                if (_this.useArrowKeysToNavigate()) {
                    $.publish(BaseEvents_1.BaseEvents.CANVAS_INDEX_CHANGED, [_this.getPrevPageIndex()]);
                }
                else {
                    _this.centerPanel.setFocus();
                }
            });
            $.subscribe(BaseEvents_1.BaseEvents.LEFTPANEL_COLLAPSE_FULL_START, function () {
                if (_this.metric.toString() !== MetricType_1.MetricType.MOBILELANDSCAPE.toString()) {
                    Shell_1.Shell.$rightPanel.show();
                }
            });
            $.subscribe(BaseEvents_1.BaseEvents.LEFTPANEL_COLLAPSE_FULL_FINISH, function () {
                Shell_1.Shell.$centerPanel.show();
                _this.resize();
            });
            $.subscribe(BaseEvents_1.BaseEvents.LEFTPANEL_EXPAND_FULL_START, function () {
                Shell_1.Shell.$centerPanel.hide();
                Shell_1.Shell.$rightPanel.hide();
            });
            $.subscribe(BaseEvents_1.BaseEvents.MINUS, function () {
                _this.centerPanel.setFocus();
            });
            $.subscribe(Events_1.Events.MODE_CHANGED, function (e, mode) {
                _this.fire(Events_1.Events.MODE_CHANGED, mode);
                _this.mode = new Mode_1.Mode(mode);
                var settings = _this.getSettings();
                $.publish(BaseEvents_1.BaseEvents.SETTINGS_CHANGED, [settings]);
            });
            $.subscribe(Events_1.Events.MULTISELECTION_MADE, function (e, ids) {
                var args = new MultiSelectionArgs_1.MultiSelectionArgs();
                args.manifestUri = _this.helper.iiifResourceUri;
                args.allCanvases = ids.length === _this.helper.getCanvases().length;
                args.canvases = ids;
                args.format = _this.data.config.options.multiSelectionMimeType;
                args.sequence = _this.helper.getCurrentSequence().id;
                _this.fire(Events_1.Events.MULTISELECTION_MADE, args);
            });
            $.subscribe(Events_1.Events.NEXT, function () {
                _this.fire(Events_1.Events.NEXT);
                $.publish(BaseEvents_1.BaseEvents.CANVAS_INDEX_CHANGED, [_this.getNextPageIndex()]);
            });
            $.subscribe(Events_1.Events.NEXT_SEARCH_RESULT, function () {
                _this.fire(Events_1.Events.NEXT_SEARCH_RESULT);
            });
            $.subscribe(Events_1.Events.NEXT_IMAGES_SEARCH_RESULT_UNAVAILABLE, function () {
                _this.fire(Events_1.Events.NEXT_IMAGES_SEARCH_RESULT_UNAVAILABLE);
                _this.nextSearchResult();
            });
            $.subscribe(Events_1.Events.PREV_IMAGES_SEARCH_RESULT_UNAVAILABLE, function () {
                _this.fire(Events_1.Events.PREV_IMAGES_SEARCH_RESULT_UNAVAILABLE);
                _this.prevSearchResult();
            });
            $.subscribe(Events_1.Events.OPEN_THUMBS_VIEW, function () {
                _this.fire(Events_1.Events.OPEN_THUMBS_VIEW);
            });
            $.subscribe(Events_1.Events.OPEN_TREE_VIEW, function () {
                _this.fire(Events_1.Events.OPEN_TREE_VIEW);
            });
            $.subscribe(BaseEvents_1.BaseEvents.PAGE_DOWN, function () {
                $.publish(BaseEvents_1.BaseEvents.CANVAS_INDEX_CHANGED, [_this.getNextPageIndex()]);
            });
            $.subscribe(Events_1.Events.PAGE_SEARCH, function (e, value) {
                _this.fire(Events_1.Events.PAGE_SEARCH, value);
                _this.viewLabel(value);
            });
            $.subscribe(BaseEvents_1.BaseEvents.PAGE_UP, function () {
                $.publish(BaseEvents_1.BaseEvents.CANVAS_INDEX_CHANGED, [_this.getPrevPageIndex()]);
            });
            $.subscribe(Events_1.Events.PAGING_TOGGLED, function (e, obj) {
                _this.fire(Events_1.Events.PAGING_TOGGLED, obj);
            });
            $.subscribe(BaseEvents_1.BaseEvents.PLUS, function () {
                _this.centerPanel.setFocus();
            });
            $.subscribe(Events_1.Events.PREV, function () {
                _this.fire(Events_1.Events.PREV);
                $.publish(BaseEvents_1.BaseEvents.CANVAS_INDEX_CHANGED, [_this.getPrevPageIndex()]);
            });
            $.subscribe(Events_1.Events.PREV_SEARCH_RESULT, function () {
                _this.fire(Events_1.Events.PREV_SEARCH_RESULT);
            });
            $.subscribe(Events_1.Events.PRINT, function () {
                _this.print();
            });
            $.subscribe(BaseEvents_1.BaseEvents.RIGHT_ARROW, function () {
                if (_this.useArrowKeysToNavigate()) {
                    $.publish(BaseEvents_1.BaseEvents.CANVAS_INDEX_CHANGED, [_this.getNextPageIndex()]);
                }
                else {
                    _this.centerPanel.setFocus();
                }
            });
            $.subscribe(Events_1.Events.SEADRAGON_ANIMATION, function () {
                _this.fire(Events_1.Events.SEADRAGON_ANIMATION);
            });
            $.subscribe(Events_1.Events.SEADRAGON_ANIMATION_FINISH, function (e, viewer) {
                var bounds = _this.centerPanel.getViewportBounds();
                if (_this.centerPanel && bounds) {
                    $.publish(Events_1.Events.XYWH_CHANGED, [bounds.toString()]);
                    _this.fire(Events_1.Events.XYWH_CHANGED, bounds.toString());
                }
                var canvas = _this.helper.getCurrentCanvas();
                _this.fire(Events_1.Events.CURRENT_VIEW_URI, {
                    cropUri: _this.getCroppedImageUri(canvas, _this.getViewer()),
                    fullUri: _this.getConfinedImageUri(canvas, canvas.getWidth())
                });
            });
            $.subscribe(Events_1.Events.SEADRAGON_ANIMATION_START, function () {
                _this.fire(Events_1.Events.SEADRAGON_ANIMATION_START);
            });
            $.subscribe(Events_1.Events.SEADRAGON_OPEN, function () {
                if (!_this.useArrowKeysToNavigate()) {
                    _this.centerPanel.setFocus();
                }
            });
            $.subscribe(Events_1.Events.SEADRAGON_RESIZE, function () {
                _this.fire(Events_1.Events.SEADRAGON_RESIZE);
            });
            $.subscribe(Events_1.Events.SEADRAGON_ROTATION, function (e, rotation) {
                _this.fire(Events_1.Events.SEADRAGON_ROTATION, rotation);
                _this.currentRotation = rotation;
            });
            $.subscribe(Events_1.Events.SEARCH, function (e, terms) {
                _this.fire(Events_1.Events.SEARCH, terms);
                _this.searchWithin(terms);
            });
            $.subscribe(Events_1.Events.SEARCH_PREVIEW_FINISH, function () {
                _this.fire(Events_1.Events.SEARCH_PREVIEW_FINISH);
            });
            $.subscribe(Events_1.Events.SEARCH_PREVIEW_START, function () {
                _this.fire(Events_1.Events.SEARCH_PREVIEW_START);
            });
            $.subscribe(Events_1.Events.SEARCH_RESULTS, function (e, obj) {
                _this.fire(Events_1.Events.SEARCH_RESULTS, obj);
            });
            $.subscribe(Events_1.Events.SEARCH_RESULT_CANVAS_CHANGED, function (e, rect) {
                $.publish(BaseEvents_1.BaseEvents.CANVAS_INDEX_CHANGED, [rect.canvasIndex]);
            });
            $.subscribe(Events_1.Events.SEARCH_RESULTS_EMPTY, function () {
                _this.fire(Events_1.Events.SEARCH_RESULTS_EMPTY);
            });
            $.subscribe(BaseEvents_1.BaseEvents.THUMB_SELECTED, function (e, thumb) {
                $.publish(BaseEvents_1.BaseEvents.CANVAS_INDEX_CHANGED, [thumb.index]);
            });
            $.subscribe(Events_1.Events.TREE_NODE_SELECTED, function (e, node) {
                _this.fire(Events_1.Events.TREE_NODE_SELECTED, node.data.path);
                _this.treeNodeSelected(node);
            });
            $.subscribe(BaseEvents_1.BaseEvents.UP_ARROW, function () {
                if (!_this.useArrowKeysToNavigate()) {
                    _this.centerPanel.setFocus();
                }
            });
            $.subscribe(BaseEvents_1.BaseEvents.UPDATE_SETTINGS, function () {
                $.publish(BaseEvents_1.BaseEvents.CANVAS_INDEX_CHANGED, [_this.helper.canvasIndex]);
                var settings = _this.getSettings();
                $.publish(BaseEvents_1.BaseEvents.SETTINGS_CHANGED, [settings]);
            });
            $.subscribe(Events_1.Events.VIEW_PAGE, function (e, index) {
                _this.fire(Events_1.Events.VIEW_PAGE, index);
                $.publish(BaseEvents_1.BaseEvents.CANVAS_INDEX_CHANGED, [index]);
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
        Extension.prototype.update = function () {
            var _this = this;
            _super.prototype.update.call(this);
            Utils.Async.waitFor(function () {
                return _this.centerPanel && _this.centerPanel.isCreated;
            }, function () {
                _this.checkForSearchParam();
                _this.checkForRotationParam();
            });
        };
        Extension.prototype.checkForSearchParam = function () {
            // if a h value is in the hash params, do a search.
            if (this.isDeepLinkingEnabled()) {
                // if a highlight param is set, use it to search.
                var highlight = this.data.highlight;
                if (highlight) {
                    highlight.replace(/\+/g, " ").replace(/"/g, "");
                    $.publish(Events_1.Events.SEARCH, [highlight]);
                }
            }
        };
        Extension.prototype.checkForRotationParam = function () {
            // if a rotation value is in the hash params, set currentRotation
            if (this.isDeepLinkingEnabled()) {
                var rotation = this.data.rotation;
                if (rotation) {
                    $.publish(Events_1.Events.SEADRAGON_ROTATION, [rotation]);
                }
            }
        };
        Extension.prototype.viewPage = function (canvasIndex) {
            // if it's an invalid canvas index.
            if (canvasIndex === -1)
                return;
            var isReload = false;
            if (canvasIndex === this.helper.canvasIndex) {
                isReload = true;
            }
            if (this.helper.isCanvasIndexOutOfRange(canvasIndex)) {
                this.showMessage(this.data.config.content.canvasIndexOutOfRange);
                canvasIndex = 0;
            }
            if (this.isPagingSettingEnabled() && !isReload) {
                var indices = this.getPagedIndices(canvasIndex);
                // if the page is already displayed, do nothing.
                if (indices.includes(this.helper.canvasIndex)) {
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
            $.publish(BaseEvents_1.BaseEvents.CANVAS_INDEX_CHANGED, [index]);
        };
        Extension.prototype.viewLabel = function (label) {
            if (!label) {
                this.showMessage(this.data.config.modules.genericDialogue.content.emptyValue);
                $.publish(BaseEvents_1.BaseEvents.CANVAS_INDEX_CHANGE_FAILED);
                return;
            }
            var index = this.helper.getCanvasIndexByLabel(label);
            if (index != -1) {
                $.publish(BaseEvents_1.BaseEvents.CANVAS_INDEX_CHANGED, [index]);
            }
            else {
                this.showMessage(this.data.config.modules.genericDialogue.content.pageNotFound);
                $.publish(BaseEvents_1.BaseEvents.CANVAS_INDEX_CHANGE_FAILED);
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
            $.publish(BaseEvents_1.BaseEvents.CANVAS_INDEX_CHANGED, [this.helper.canvasIndex]);
        };
        Extension.prototype.prevSearchResult = function () {
            var foundResult;
            if (!this.searchResults)
                return;
            // get the first result with a canvasIndex less than the current index.
            for (var i = this.searchResults.length - 1; i >= 0; i--) {
                var result = this.searchResults[i];
                if (result.canvasIndex <= this.getPrevPageIndex()) {
                    foundResult = result;
                    $.publish(BaseEvents_1.BaseEvents.CANVAS_INDEX_CHANGED, [foundResult.canvasIndex]);
                    break;
                }
            }
        };
        Extension.prototype.nextSearchResult = function () {
            var foundResult;
            if (!this.searchResults)
                return;
            // get the first result with an index greater than the current index.
            for (var i = 0; i < this.searchResults.length; i++) {
                var result = this.searchResults[i];
                if (result && result.canvasIndex >= this.getNextPageIndex()) {
                    foundResult = result;
                    $.publish(BaseEvents_1.BaseEvents.CANVAS_INDEX_CHANGED, [result.canvasIndex]);
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
            bookmark.thumb = canvas.getCanonicalImageUri(this.data.config.options.bookmarkThumbWidth);
            bookmark.title = this.helper.getLabel();
            bookmark.trackingLabel = window.trackingLabel;
            bookmark.type = manifesto.ElementType.image().toString();
            this.fire(BaseEvents_1.BaseEvents.BOOKMARK, bookmark);
        };
        Extension.prototype.print = function () {
            // var args: MultiSelectionArgs = new MultiSelectionArgs();
            // args.manifestUri = this.helper.iiifResourceUri;
            // args.allCanvases = true;
            // args.format = this.data.config.options.printMimeType;
            // args.sequence = this.helper.getCurrentSequence().id;
            window.print();
            this.fire(Events_1.Events.PRINT);
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
                if (!(typeof (maxSize.width) === 'undefined') && !(typeof (maxSize.height) === 'undefined')) {
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
            if (!dimensions)
                return null;
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
            var infoUri = null;
            var images = canvas.getImages();
            if (images && images.length) {
                var firstImage = images[0];
                var resource = firstImage.getResource();
                var services = resource.getServices();
                for (var i = 0; i < services.length; i++) {
                    var service = services[i];
                    var id = service.id;
                    if (!id.endsWith('/')) {
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
            var configUri = this.data.config.uri || '';
            var script = String.format(template, this.getSerializedLocales(), configUri, this.helper.iiifResourceUri, this.helper.collectionIndex, this.helper.manifestIndex, this.helper.sequenceIndex, this.helper.canvasIndex, zoom, rotation, width, height, this.data.embedScriptUri);
            return script;
        };
        Extension.prototype.getPrevPageIndex = function (canvasIndex) {
            if (canvasIndex === void 0) { canvasIndex = this.helper.canvasIndex; }
            var index;
            if (this.isPagingSettingEnabled()) {
                var indices = this.getPagedIndices(canvasIndex);
                if (this.helper.isRightToLeft()) {
                    index = indices[indices.length - 1] - 1;
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
            if (!Utils.Bools.getBool(this.data.config.options.searchWithinEnabled, false)) {
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
            if (canvasIndex === void 0) { canvasIndex = this.helper.canvasIndex; }
            var index;
            if (this.isPagingSettingEnabled()) {
                var indices = this.getPagedIndices(canvasIndex);
                if (this.helper.isRightToLeft()) {
                    index = indices[0] + 1;
                }
                else {
                    index = indices[indices.length - 1] + 1;
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
            if (!searchUri)
                return;
            searchUri = String.format(searchUri, terms);
            this.getSearchResults(searchUri, terms, this.searchResults, function (results) {
                _this.isSearching = false;
                if (results.length) {
                    _this.searchResults = results.sort(function (a, b) {
                        return a.canvasIndex - b.canvasIndex;
                    });
                    $.publish(Events_1.Events.SEARCH_RESULTS, [{ terms: terms, results: results }]);
                    // reload current index as it may contain results.
                    $.publish(BaseEvents_1.BaseEvents.CANVAS_INDEX_CHANGED, [that.helper.canvasIndex]);
                }
                else {
                    that.showMessage(that.data.config.modules.genericDialogue.content.noMatches, function () {
                        $.publish(Events_1.Events.SEARCH_RESULTS_EMPTY);
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
            var _loop_1 = function (i) {
                var resource = resultsToParse.resources[i];
                var canvasIndex = this_1.helper.getCanvasIndexById(resource.on.match(/(.*)#/)[1]);
                var searchResult = new SearchResult(resource, canvasIndex);
                var match = parsedResults.en().where(function (x) { return x.canvasIndex === searchResult.canvasIndex; }).first();
                // if there's already a SearchResult for the canvas index, add a rect to it, otherwise create a new SearchResult
                if (match) {
                    match.addRect(resource);
                }
                else {
                    parsedResults.push(searchResult);
                }
            };
            var this_1 = this;
            for (var i = 0; i < resultsToParse.resources.length; i++) {
                _loop_1(i);
            }
            // sort by canvasIndex
            parsedResults.sort(function (a, b) {
                return a.canvasIndex - b.canvasIndex;
            });
            return parsedResults;
        };
        Extension.prototype.getSearchResultRects = function () {
            if (this.searchResults) {
                return this.searchResults.en().selectMany(function (x) { return x.rects; }).toArray();
            }
            return [];
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
            if (canvasIndex === void 0) { canvasIndex = this.helper.canvasIndex; }
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
//# sourceMappingURL=Extension.js.map
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
    exports.__esModule = true;
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
//# sourceMappingURL=DownloadDialogue.js.map
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
define('modules/uv-pdfcenterpanel-module/PDFCenterPanel',["require", "exports", "../uv-shared-module/BaseEvents", "../uv-shared-module/CenterPanel"], function (require, exports, BaseEvents_1, CenterPanel_1) {
    "use strict";
    exports.__esModule = true;
    var PDFCenterPanel = (function (_super) {
        __extends(PDFCenterPanel, _super);
        function PDFCenterPanel($element) {
            return _super.call(this, $element) || this;
        }
        PDFCenterPanel.prototype.create = function () {
            var _this = this;
            this.setConfig('pdfCenterPanel');
            _super.prototype.create.call(this);
            $.subscribe(BaseEvents_1.BaseEvents.OPEN_EXTERNAL_RESOURCE, function (e, resources) {
                _this.openMedia(resources);
            });
        };
        PDFCenterPanel.prototype.openMedia = function (resources) {
            var _this = this;
            this.extension.getExternalResources(resources).then(function () {
                var canvas = _this.extension.helper.getCurrentCanvas();
                var pdfUri = canvas.id;
                window.PDFObject.embed(pdfUri, '#content', { id: "PDF" });
            });
        };
        PDFCenterPanel.prototype.resize = function () {
            _super.prototype.resize.call(this);
        };
        return PDFCenterPanel;
    }(CenterPanel_1.CenterPanel));
    exports.PDFCenterPanel = PDFCenterPanel;
});
//# sourceMappingURL=PDFCenterPanel.js.map
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
    exports.__esModule = true;
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
//# sourceMappingURL=SettingsDialogue.js.map
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
    exports.__esModule = true;
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
//# sourceMappingURL=ShareDialogue.js.map
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
define('extensions/uv-pdf-extension/Extension',["require", "exports", "../../modules/uv-shared-module/BaseEvents", "../../modules/uv-shared-module/BaseExtension", "../../modules/uv-shared-module/Bookmark", "./DownloadDialogue", "../../modules/uv-shared-module/FooterPanel", "../../modules/uv-shared-module/HeaderPanel", "../../modules/uv-moreinforightpanel-module/MoreInfoRightPanel", "../../modules/uv-pdfcenterpanel-module/PDFCenterPanel", "../../modules/uv-resourcesleftpanel-module/ResourcesLeftPanel", "./SettingsDialogue", "./ShareDialogue", "../../modules/uv-shared-module/Shell"], function (require, exports, BaseEvents_1, BaseExtension_1, Bookmark_1, DownloadDialogue_1, FooterPanel_1, HeaderPanel_1, MoreInfoRightPanel_1, PDFCenterPanel_1, ResourcesLeftPanel_1, SettingsDialogue_1, ShareDialogue_1, Shell_1) {
    "use strict";
    exports.__esModule = true;
    var Extension = (function (_super) {
        __extends(Extension, _super);
        function Extension() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Extension.prototype.create = function () {
            var _this = this;
            _super.prototype.create.call(this);
            $.subscribe(BaseEvents_1.BaseEvents.CANVAS_INDEX_CHANGED, function (e, canvasIndex) {
                _this.viewCanvas(canvasIndex);
            });
            $.subscribe(BaseEvents_1.BaseEvents.THUMB_SELECTED, function (e, thumb) {
                $.publish(BaseEvents_1.BaseEvents.CANVAS_INDEX_CHANGED, [thumb.index]);
            });
            $.subscribe(BaseEvents_1.BaseEvents.LEFTPANEL_EXPAND_FULL_START, function () {
                Shell_1.Shell.$centerPanel.hide();
                Shell_1.Shell.$rightPanel.hide();
            });
            $.subscribe(BaseEvents_1.BaseEvents.LEFTPANEL_COLLAPSE_FULL_FINISH, function () {
                Shell_1.Shell.$centerPanel.show();
                Shell_1.Shell.$rightPanel.show();
                _this.resize();
            });
            $.subscribe(BaseEvents_1.BaseEvents.SHOW_OVERLAY, function () {
                if (_this.IsOldIE()) {
                    _this.centerPanel.$element.hide();
                }
            });
            $.subscribe(BaseEvents_1.BaseEvents.HIDE_OVERLAY, function () {
                if (_this.IsOldIE()) {
                    _this.centerPanel.$element.show();
                }
            });
        };
        Extension.prototype.update = function () {
            _super.prototype.update.call(this);
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
            bookmark.thumb = canvas.getProperty('thumbnail');
            bookmark.title = this.helper.getLabel();
            bookmark.trackingLabel = window.trackingLabel;
            bookmark.type = manifesto.ElementType.document().toString();
            this.fire(BaseEvents_1.BaseEvents.BOOKMARK, bookmark);
        };
        Extension.prototype.dependencyLoaded = function (index, dep) {
            if (index === 0) {
                window.PDFObject = dep;
            }
        };
        Extension.prototype.getEmbedScript = function (template, width, height) {
            var configUri = this.data.config.uri || '';
            var script = String.format(template, this.getSerializedLocales(), configUri, this.helper.iiifResourceUri, this.helper.collectionIndex, this.helper.manifestIndex, this.helper.sequenceIndex, this.helper.canvasIndex, width, height, this.data.embedScriptUri);
            return script;
        };
        return Extension;
    }(BaseExtension_1.BaseExtension));
    exports.Extension = Extension;
});
//# sourceMappingURL=Extension.js.map
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
    exports.__esModule = true;
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
//# sourceMappingURL=DownloadDialogue.js.map
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
    exports.__esModule = true;
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
//# sourceMappingURL=SettingsDialogue.js.map
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
    exports.__esModule = true;
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
//# sourceMappingURL=ShareDialogue.js.map
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
define('modules/uv-virtexcenterpanel-module/VirtexCenterPanel',["require", "exports", "../uv-shared-module/BaseEvents", "../uv-shared-module/CenterPanel"], function (require, exports, BaseEvents_1, CenterPanel_1) {
    "use strict";
    exports.__esModule = true;
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
            $.subscribe(BaseEvents_1.BaseEvents.OPEN_EXTERNAL_RESOURCE, function (e, resources) {
                that.openMedia(resources);
            });
            this.$navigation = $('<div class="navigation"></div>');
            this.$content.prepend(this.$navigation);
            this.$zoomInButton = $('<a class="imageBtn zoomIn" title="' + this.content.zoomIn + '"></a>');
            this.$navigation.append(this.$zoomInButton);
            this.$zoomOutButton = $('<a class="imageBtn zoomOut" title="' + this.content.zoomOut + '"></a>');
            this.$navigation.append(this.$zoomOutButton);
            this.$vrButton = $('<a class="imageBtn vr" title="' + this.content.vr + '"></a>');
            this.$navigation.append(this.$vrButton);
            this.$viewport = $('<div class="virtex"></div>');
            this.$content.prepend(this.$viewport);
            this.title = this.extension.helper.getLabel();
            this.updateAttribution();
            this.$zoomInButton.on('click', function (e) {
                e.preventDefault();
                if (_this.viewport) {
                    _this.viewport.zoomIn();
                }
            });
            this.$zoomOutButton.on('click', function (e) {
                e.preventDefault();
                if (_this.viewport) {
                    _this.viewport.zoomOut();
                }
            });
            this.$vrButton.on('click', function (e) {
                e.preventDefault();
                if (_this.viewport) {
                    _this.viewport.toggleVR();
                }
            });
            if (!WEBVR.isAvailable()) {
                this.$vrButton.hide();
            }
        };
        VirtexCenterPanel.prototype.openMedia = function (resources) {
            var _this = this;
            this.extension.getExternalResources(resources).then(function () {
                _this.$viewport.empty();
                var canvas = _this.extension.helper.getCurrentCanvas();
                _this.viewport = new Virtex.Viewport({
                    target: _this.$viewport[0],
                    data: {
                        file: canvas.id,
                        fullscreenEnabled: false,
                        type: new Virtex.FileType("application/vnd.threejs+json"),
                        showStats: _this.options.showStats
                    }
                });
                _this.resize();
            });
        };
        VirtexCenterPanel.prototype.resize = function () {
            _super.prototype.resize.call(this);
            this.$title.ellipsisFill(this.title);
            this.$viewport.width(this.$content.width());
            this.$viewport.height(this.$content.height());
            if (this.viewport) {
                this.viewport.resize();
            }
        };
        return VirtexCenterPanel;
    }(CenterPanel_1.CenterPanel));
    exports.VirtexCenterPanel = VirtexCenterPanel;
});
//# sourceMappingURL=VirtexCenterPanel.js.map
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
define('extensions/uv-virtex-extension/Extension',["require", "exports", "../../modules/uv-shared-module/BaseEvents", "../../modules/uv-shared-module/BaseExtension", "../../modules/uv-shared-module/Bookmark", "../../modules/uv-contentleftpanel-module/ContentLeftPanel", "./DownloadDialogue", "../../modules/uv-shared-module/FooterPanel", "../../modules/uv-shared-module/HeaderPanel", "../../modules/uv-moreinforightpanel-module/MoreInfoRightPanel", "./SettingsDialogue", "./ShareDialogue", "../../modules/uv-shared-module/Shell", "../../modules/uv-virtexcenterpanel-module/VirtexCenterPanel"], function (require, exports, BaseEvents_1, BaseExtension_1, Bookmark_1, ContentLeftPanel_1, DownloadDialogue_1, FooterPanel_1, HeaderPanel_1, MoreInfoRightPanel_1, SettingsDialogue_1, ShareDialogue_1, Shell_1, VirtexCenterPanel_1) {
    "use strict";
    exports.__esModule = true;
    var Extension = (function (_super) {
        __extends(Extension, _super);
        function Extension() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Extension.prototype.create = function () {
            var _this = this;
            _super.prototype.create.call(this);
            $.subscribe(BaseEvents_1.BaseEvents.CANVAS_INDEX_CHANGED, function (e, canvasIndex) {
                _this.viewCanvas(canvasIndex);
            });
            $.subscribe(BaseEvents_1.BaseEvents.THUMB_SELECTED, function (e, canvasIndex) {
                $.publish(BaseEvents_1.BaseEvents.CANVAS_INDEX_CHANGED, [canvasIndex]);
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
        Extension.prototype.update = function () {
            _super.prototype.update.call(this);
        };
        Extension.prototype.dependencyLoaded = function (index, dep) {
            if (index === 0) {
                window.THREE = dep; //https://github.com/mrdoob/three.js/issues/9602
            }
        };
        Extension.prototype.isLeftPanelEnabled = function () {
            return Utils.Bools.getBool(this.data.config.options.leftPanelEnabled, true)
                && (this.helper.isMultiCanvas() || this.helper.isMultiSequence());
        };
        Extension.prototype.bookmark = function () {
            _super.prototype.bookmark.call(this);
            var canvas = this.helper.getCurrentCanvas();
            var bookmark = new Bookmark_1.Bookmark();
            bookmark.index = this.helper.canvasIndex;
            bookmark.label = Manifesto.TranslationCollection.getValue(canvas.getLabel());
            bookmark.thumb = canvas.getProperty('thumbnail');
            bookmark.title = this.helper.getLabel();
            bookmark.trackingLabel = window.trackingLabel;
            bookmark.type = manifesto.ElementType.physicalobject().toString();
            this.fire(BaseEvents_1.BaseEvents.BOOKMARK, bookmark);
        };
        Extension.prototype.getEmbedScript = function (template, width, height) {
            var configUri = this.data.config.uri || '';
            var script = String.format(template, this.getSerializedLocales(), configUri, this.helper.iiifResourceUri, this.helper.collectionIndex, this.helper.manifestIndex, this.helper.sequenceIndex, this.helper.canvasIndex, width, height, this.data.embedScriptUri);
            return script;
        };
        return Extension;
    }(BaseExtension_1.BaseExtension));
    exports.Extension = Extension;
});
//# sourceMappingURL=Extension.js.map
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
define('UVComponent',["require", "exports", "./modules/uv-shared-module/BaseEvents", "./extensions/uv-mediaelement-extension/Extension", "./extensions/uv-seadragon-extension/Extension", "./extensions/uv-pdf-extension/Extension", "./extensions/uv-virtex-extension/Extension"], function (require, exports, BaseEvents_1, Extension_1, Extension_2, Extension_3, Extension_4) {
    "use strict";
    exports.__esModule = true;
    var UVComponent = (function (_super) {
        __extends(UVComponent, _super);
        function UVComponent(options) {
            var _this = _super.call(this, options) || this;
            _this.isFullScreen = false;
            _this._init();
            _this._resize();
            return _this;
        }
        UVComponent.prototype._init = function () {
            var success = _super.prototype._init.call(this);
            if (!success) {
                console.error("UV failed to initialise");
            }
            this._extensions = {};
            this._extensions[manifesto.ElementType.canvas().toString()] = {
                type: Extension_2.Extension,
                name: 'uv-seadragon-extension'
            };
            this._extensions[manifesto.ElementType.movingimage().toString()] = {
                type: Extension_1.Extension,
                name: 'uv-mediaelement-extension'
            };
            this._extensions[manifesto.ElementType.physicalobject().toString()] = {
                type: Extension_4.Extension,
                name: 'uv-virtex-extension'
            };
            this._extensions[manifesto.ElementType.sound().toString()] = {
                type: Extension_1.Extension,
                name: 'uv-mediaelement-extension'
            };
            this._extensions[manifesto.RenderingFormat.pdf().toString()] = {
                type: Extension_3.Extension,
                name: 'uv-pdf-extension'
            };
            this.set(this.options.data);
            return success;
        };
        UVComponent.prototype.data = function () {
            return {
                root: "./uv",
                canvasIndex: 0,
                collectionIndex: 0,
                config: null,
                configUri: null,
                domain: null,
                embedDomain: null,
                embedScriptUri: null,
                iiifResourceUri: '',
                isHomeDomain: true,
                isLightbox: false,
                isOnlyInstance: true,
                isReload: false,
                limitLocales: false,
                locales: [
                    {
                        name: 'en-GB'
                    }
                ],
                manifestIndex: 0,
                rotation: 0,
                sequenceIndex: 0,
                xywh: ''
            };
        };
        UVComponent.prototype.set = function (data) {
            // if this is the first set
            if (!this.extension) {
                if (!data.iiifResourceUri) {
                    this._error("iiifResourceUri is required.");
                    return;
                }
                // remove '/' from root
                if (data.root && data.root.endsWith('/')) {
                    data.root = data.root.substring(0, data.root.length - 1);
                }
                this._reload(data);
            }
            else {
                // changing any of these data properties forces the UV to reload.
                if (this._propertiesChanged(data, ['collectionIndex', 'manifestIndex', 'config', 'configUri', 'domain', 'embedDomain', 'embedScriptUri', 'iiifResourceUri', 'isHomeDomain', 'isLightbox', 'isOnlyInstance', 'isReload', 'locales', 'root'])) {
                    $.extend(this.extension.data, data);
                    this._reload(this.extension.data);
                }
                else {
                    // no need to reload, just update.
                    $.extend(this.extension.data, data);
                    this.extension.update();
                }
            }
        };
        UVComponent.prototype._propertiesChanged = function (data, properties) {
            var propChanged = false;
            for (var i = 0; i < properties.length; i++) {
                propChanged = this._propertyChanged(data, properties[i]);
                if (propChanged) {
                    break;
                }
            }
            return propChanged;
        };
        UVComponent.prototype._propertyChanged = function (data, propertyName) {
            return !!data[propertyName] && this.extension.data[propertyName] !== data[propertyName];
        };
        UVComponent.prototype.get = function (key) {
            return this.extension.data[key];
        };
        UVComponent.prototype._reload = function (data) {
            var _this = this;
            $.disposePubSub(); // remove any existing event listeners
            $.subscribe(BaseEvents_1.BaseEvents.RELOAD, function (e, data) {
                _this.fire(BaseEvents_1.BaseEvents.RELOAD, data);
            });
            var $elem = $(this.options.target);
            // empty the containing element
            $elem.empty();
            // add loading class
            $elem.addClass('loading');
            jQuery.support.cors = true;
            var that = this;
            Manifold.loadManifest({
                iiifResourceUri: data.iiifResourceUri,
                collectionIndex: data.collectionIndex,
                manifestIndex: data.manifestIndex,
                sequenceIndex: data.sequenceIndex,
                canvasIndex: data.canvasIndex,
                locale: data.locales[0].name
            }).then(function (helper) {
                var trackingLabel = helper.getTrackingLabel();
                trackingLabel += ', URI: ' + data.embedDomain;
                window.trackingLabel = trackingLabel;
                var sequence = helper.getSequenceByIndex(data.sequenceIndex);
                if (!sequence) {
                    that._error("Sequence " + data.sequenceIndex + " not found.");
                    return;
                }
                var canvas = helper.getCanvasByIndex(data.canvasIndex);
                if (!canvas) {
                    that._error("Canvas " + data.canvasIndex + " not found.");
                    return;
                }
                var canvasType = canvas.getType();
                // try using canvasType
                var extension = that._extensions[canvasType.toString()];
                // if there isn't an extension for the canvasType, try the format
                if (!extension) {
                    var format = canvas.getProperty('format');
                    extension = that._extensions[format];
                }
                // if there still isn't a matching extension, show an error.
                if (!extension) {
                    _this._error('No matching UV extension found.');
                    return;
                }
                that._configure(data, extension, function (config) {
                    data.config = config;
                    that._injectCss(data, extension, function () {
                        that._createExtension(extension, data, helper);
                    });
                });
            })["catch"](function () {
                that._error('Failed to load manifest.');
            });
        };
        UVComponent.prototype._isCORSEnabled = function () {
            return Modernizr.cors;
        };
        UVComponent.prototype._error = function (message) {
            this.fire(BaseEvents_1.BaseEvents.ERROR, message);
        };
        UVComponent.prototype._configure = function (data, extension, cb) {
            var _this = this;
            this._getConfigExtension(data, extension, function (configExtension) {
                var configPath = data.root + '/lib/' + extension.name + '.' + data.locales[0].name + '.config.json';
                $.getJSON(configPath, function (config) {
                    _this._extendConfig(data, extension, config, configExtension, cb);
                });
            });
        };
        UVComponent.prototype._extendConfig = function (data, extension, config, configExtension, cb) {
            config.name = extension.name;
            // if data-config has been set, extend the existing config object.
            if (configExtension) {
                // save a reference to the config extension uri.
                config.uri = data.configUri;
                $.extend(true, config, configExtension);
            }
            cb(config);
        };
        UVComponent.prototype._getConfigExtension = function (data, extension, cb) {
            var sessionConfig = sessionStorage.getItem(extension.name + '.' + data.locales[0].name);
            var configUri = data.configUri;
            if (sessionConfig) {
                cb(JSON.parse(sessionConfig));
            }
            else if (configUri) {
                if (this._isCORSEnabled()) {
                    $.getJSON(configUri, function (configExtension) {
                        cb(configExtension);
                    });
                }
                else {
                    // use jsonp
                    var settings = {
                        url: configUri,
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
        UVComponent.prototype._injectCss = function (data, extension, cb) {
            var cssPath = data.root + '/themes/' + data.config.options.theme + '/css/' + extension.name + '/theme.css';
            var locale = data.locales[0].name;
            var themeName = extension.name.toLowerCase() + '-theme-' + locale.toLowerCase();
            var $existingCSS = $('#' + themeName.toLowerCase());
            if (!$existingCSS.length) {
                $('head').append('<link rel="stylesheet" id="' + themeName + '" href="' + cssPath.toLowerCase() + '" />');
                cb();
            }
            else {
                cb();
            }
        };
        UVComponent.prototype._createExtension = function (extension, data, helper) {
            this.extension = new extension.type();
            this.extension.component = this;
            this.extension.data = data;
            this.extension.helper = helper;
            this.extension.name = extension.name;
            this.extension.create();
        };
        UVComponent.prototype.exitFullScreen = function () {
            this.extension.exitFullScreen();
        };
        UVComponent.prototype.resize = function () {
            this.extension.resize();
        };
        return UVComponent;
    }(_Components.BaseComponent));
    exports["default"] = UVComponent;
});
//# sourceMappingURL=UVComponent.js.map
if (typeof jQuery === "function") {
    define('jquery', [], function () {
        return jQuery;
    });
}
// IE CustomEvent Polyfill
// https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent
(function () {
    if (typeof window.CustomEvent === "function")
        return false;
    function CustomEvent(event, params) {
        params = params || { bubbles: false, cancelable: false, detail: undefined };
        var evt = document.createEvent('CustomEvent');
        evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
        return evt;
    }
    CustomEvent.prototype = window.Event.prototype;
    window.CustomEvent = CustomEvent;
    return;
})();
requirejs([
    './lib/base64.min.js',
    './lib/browserdetect.js',
    './lib/detectmobilebrowser.js',
    './lib/jquery.xdomainrequest.js',
    './lib/modernizr.js',
    './lib/sanitize.js',
    './lib/ex.es3.min.js',
    './lib/base-component.js',
    './lib/key-codes.min.js',
    './lib/extensions.min.js',
    './lib/http-status-codes.min.js',
    './lib/jquery-plugins.min.js',
    './lib/ba-tiny-pubsub.min.js',
    './lib/manifesto.min.js',
    './lib/manifold.min.js',
    './lib/utils.min.js',
    'URLDataProvider',
    'UVComponent'
], function (base64, browserdetect, detectmobilebrowser, xdomainrequest, modernizr, sanitize, exjs, basecomponent, keycodes, extensions, httpstatuscodes, jqueryplugins, pubsub, manifesto, manifold, utils, URLDataProvider, UVComponent) {
    window.UV = UVComponent["default"];
    window.UV.URLDataProvider = URLDataProvider["default"];
    window.dispatchEvent(new CustomEvent('uvLoaded'));
});
//# sourceMappingURL=app.js.map
define("app", function(){});


//# sourceMappingURL=build.js.map