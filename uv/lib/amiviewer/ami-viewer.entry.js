const h = window.amiviewer.h;

import { a as Mode } from './chunk-a9df86e6.js';

var TypeKeys;
(function (TypeKeys) {
    // Won't match anything
    TypeKeys["NULL"] = "NULL";
    TypeKeys["ERROR"] = "ERROR";
    TypeKeys["APP_SET_SRC"] = "APP_SET_SRC";
    TypeKeys["APP_SET_DISPLAY"] = "APP_SET_DISPLAY";
    TypeKeys["APP_SET_SRC_LOADED"] = "APP_SET_SRC_LOADED";
    TypeKeys["APP_SET_ORIENTATION"] = "APP_SET_ORIENTATION";
    TypeKeys["APP_SET_TOOLS_VISIBLE"] = "APP_SET_TOOLS_VISIBLE";
    TypeKeys["APP_SET_TOOLS_ENABLED"] = "APP_SET_TOOLS_ENABLED";
    TypeKeys["APP_SET_TOOL_TYPE"] = "APP_SET_TOOL_TYPE";
    TypeKeys["APP_SET_OPTIONS_VISIBLE"] = "APP_SET_OPTIONS_VISIBLE";
    TypeKeys["APP_SET_OPTIONS_ENABLED"] = "APP_SET_OPTIONS_ENABLED";
})(TypeKeys || (TypeKeys = {}));

const appSetSrc = (src) => async (dispatch, _getState) => {
    return dispatch({
        type: TypeKeys.APP_SET_SRC,
        src: src
    });
};
const appSetDisplay = (display) => async (dispatch, _getState) => {
    return dispatch({
        type: TypeKeys.APP_SET_DISPLAY,
        display: display
    });
};
const appSetSrcLoaded = (srcLoaded) => async (dispatch, _getState) => {
    return dispatch({
        type: TypeKeys.APP_SET_SRC_LOADED,
        srcLoaded: srcLoaded
    });
};
const appSetOrientation = (orientation) => async (dispatch, _getState) => {
    return dispatch({
        type: TypeKeys.APP_SET_ORIENTATION,
        orientation: orientation
    });
};
const appSetToolsVisible = (toolsVisible) => async (dispatch, _getState) => {
    return dispatch({
        type: TypeKeys.APP_SET_TOOLS_VISIBLE,
        toolsVisible: toolsVisible
    });
};
const appSetToolsEnabled = (toolsEnabled) => async (dispatch, _getState) => {
    return dispatch({
        type: TypeKeys.APP_SET_TOOLS_ENABLED,
        toolsEnabled: toolsEnabled
    });
};
const appSetToolType = (toolType) => async (dispatch, _getState) => {
    return dispatch({
        type: TypeKeys.APP_SET_TOOL_TYPE,
        toolType: toolType
    });
};
const appSetOptionsVisible = (optionsVisible) => async (dispatch, _getState) => {
    return dispatch({
        type: TypeKeys.APP_SET_OPTIONS_VISIBLE,
        optionsVisible: optionsVisible
    });
};
const appSetOptionsEnabled = (optionsEnabled) => async (dispatch, _getState) => {
    return dispatch({
        type: TypeKeys.APP_SET_OPTIONS_ENABLED,
        optionsEnabled: optionsEnabled
    });
};

function symbolObservablePonyfill(root) {
	var result;
	var Symbol = root.Symbol;

	if (typeof Symbol === 'function') {
		if (Symbol.observable) {
			result = Symbol.observable;
		} else {
			result = Symbol('observable');
			Symbol.observable = result;
		}
	} else {
		result = '@@observable';
	}

	return result;
}

/* global window */

var root;

if (typeof self !== 'undefined') {
  root = self;
} else if (typeof window !== 'undefined') {
  root = window;
} else if (typeof global !== 'undefined') {
  root = global;
} else if (typeof module !== 'undefined') {
  root = module;
} else {
  root = Function('return this')();
}

var result = symbolObservablePonyfill(root);

/**
 * These are private action types reserved by Redux.
 * For any unknown actions, you must return the current state.
 * If the current state is undefined, you must return the initial state.
 * Do not reference these action types directly in your code.
 */
var randomString = function randomString() {
  return Math.random().toString(36).substring(7).split('').join('.');
};

var ActionTypes = {
  INIT: "@@redux/INIT" + randomString(),
  REPLACE: "@@redux/REPLACE" + randomString(),
  PROBE_UNKNOWN_ACTION: function PROBE_UNKNOWN_ACTION() {
    return "@@redux/PROBE_UNKNOWN_ACTION" + randomString();
  }
};

/**
 * @param {any} obj The object to inspect.
 * @returns {boolean} True if the argument appears to be a plain object.
 */
function isPlainObject(obj) {
  if (typeof obj !== 'object' || obj === null) return false;
  var proto = obj;

  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }

  return Object.getPrototypeOf(obj) === proto;
}

/**
 * Creates a Redux store that holds the state tree.
 * The only way to change the data in the store is to call `dispatch()` on it.
 *
 * There should only be a single store in your app. To specify how different
 * parts of the state tree respond to actions, you may combine several reducers
 * into a single reducer function by using `combineReducers`.
 *
 * @param {Function} reducer A function that returns the next state tree, given
 * the current state tree and the action to handle.
 *
 * @param {any} [preloadedState] The initial state. You may optionally specify it
 * to hydrate the state from the server in universal apps, or to restore a
 * previously serialized user session.
 * If you use `combineReducers` to produce the root reducer function, this must be
 * an object with the same shape as `combineReducers` keys.
 *
 * @param {Function} [enhancer] The store enhancer. You may optionally specify it
 * to enhance the store with third-party capabilities such as middleware,
 * time travel, persistence, etc. The only store enhancer that ships with Redux
 * is `applyMiddleware()`.
 *
 * @returns {Store} A Redux store that lets you read the state, dispatch actions
 * and subscribe to changes.
 */

function createStore(reducer, preloadedState, enhancer) {
  var _ref2;

  if (typeof preloadedState === 'function' && typeof enhancer === 'function' || typeof enhancer === 'function' && typeof arguments[3] === 'function') {
    throw new Error('It looks like you are passing several store enhancers to ' + 'createStore(). This is not supported. Instead, compose them ' + 'together to a single function');
  }

  if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
    enhancer = preloadedState;
    preloadedState = undefined;
  }

  if (typeof enhancer !== 'undefined') {
    if (typeof enhancer !== 'function') {
      throw new Error('Expected the enhancer to be a function.');
    }

    return enhancer(createStore)(reducer, preloadedState);
  }

  if (typeof reducer !== 'function') {
    throw new Error('Expected the reducer to be a function.');
  }

  var currentReducer = reducer;
  var currentState = preloadedState;
  var currentListeners = [];
  var nextListeners = currentListeners;
  var isDispatching = false;

  function ensureCanMutateNextListeners() {
    if (nextListeners === currentListeners) {
      nextListeners = currentListeners.slice();
    }
  }
  /**
   * Reads the state tree managed by the store.
   *
   * @returns {any} The current state tree of your application.
   */


  function getState() {
    if (isDispatching) {
      throw new Error('You may not call store.getState() while the reducer is executing. ' + 'The reducer has already received the state as an argument. ' + 'Pass it down from the top reducer instead of reading it from the store.');
    }

    return currentState;
  }
  /**
   * Adds a change listener. It will be called any time an action is dispatched,
   * and some part of the state tree may potentially have changed. You may then
   * call `getState()` to read the current state tree inside the callback.
   *
   * You may call `dispatch()` from a change listener, with the following
   * caveats:
   *
   * 1. The subscriptions are snapshotted just before every `dispatch()` call.
   * If you subscribe or unsubscribe while the listeners are being invoked, this
   * will not have any effect on the `dispatch()` that is currently in progress.
   * However, the next `dispatch()` call, whether nested or not, will use a more
   * recent snapshot of the subscription list.
   *
   * 2. The listener should not expect to see all state changes, as the state
   * might have been updated multiple times during a nested `dispatch()` before
   * the listener is called. It is, however, guaranteed that all subscribers
   * registered before the `dispatch()` started will be called with the latest
   * state by the time it exits.
   *
   * @param {Function} listener A callback to be invoked on every dispatch.
   * @returns {Function} A function to remove this change listener.
   */


  function subscribe(listener) {
    if (typeof listener !== 'function') {
      throw new Error('Expected the listener to be a function.');
    }

    if (isDispatching) {
      throw new Error('You may not call store.subscribe() while the reducer is executing. ' + 'If you would like to be notified after the store has been updated, subscribe from a ' + 'component and invoke store.getState() in the callback to access the latest state. ' + 'See https://redux.js.org/api-reference/store#subscribe(listener) for more details.');
    }

    var isSubscribed = true;
    ensureCanMutateNextListeners();
    nextListeners.push(listener);
    return function unsubscribe() {
      if (!isSubscribed) {
        return;
      }

      if (isDispatching) {
        throw new Error('You may not unsubscribe from a store listener while the reducer is executing. ' + 'See https://redux.js.org/api-reference/store#subscribe(listener) for more details.');
      }

      isSubscribed = false;
      ensureCanMutateNextListeners();
      var index = nextListeners.indexOf(listener);
      nextListeners.splice(index, 1);
    };
  }
  /**
   * Dispatches an action. It is the only way to trigger a state change.
   *
   * The `reducer` function, used to create the store, will be called with the
   * current state tree and the given `action`. Its return value will
   * be considered the **next** state of the tree, and the change listeners
   * will be notified.
   *
   * The base implementation only supports plain object actions. If you want to
   * dispatch a Promise, an Observable, a thunk, or something else, you need to
   * wrap your store creating function into the corresponding middleware. For
   * example, see the documentation for the `redux-thunk` package. Even the
   * middleware will eventually dispatch plain object actions using this method.
   *
   * @param {Object} action A plain object representing “what changed”. It is
   * a good idea to keep actions serializable so you can record and replay user
   * sessions, or use the time travelling `redux-devtools`. An action must have
   * a `type` property which may not be `undefined`. It is a good idea to use
   * string constants for action types.
   *
   * @returns {Object} For convenience, the same action object you dispatched.
   *
   * Note that, if you use a custom middleware, it may wrap `dispatch()` to
   * return something else (for example, a Promise you can await).
   */


  function dispatch(action) {
    if (!isPlainObject(action)) {
      throw new Error('Actions must be plain objects. ' + 'Use custom middleware for async actions.');
    }

    if (typeof action.type === 'undefined') {
      throw new Error('Actions may not have an undefined "type" property. ' + 'Have you misspelled a constant?');
    }

    if (isDispatching) {
      throw new Error('Reducers may not dispatch actions.');
    }

    try {
      isDispatching = true;
      currentState = currentReducer(currentState, action);
    } finally {
      isDispatching = false;
    }

    var listeners = currentListeners = nextListeners;

    for (var i = 0; i < listeners.length; i++) {
      var listener = listeners[i];
      listener();
    }

    return action;
  }
  /**
   * Replaces the reducer currently used by the store to calculate the state.
   *
   * You might need this if your app implements code splitting and you want to
   * load some of the reducers dynamically. You might also need this if you
   * implement a hot reloading mechanism for Redux.
   *
   * @param {Function} nextReducer The reducer for the store to use instead.
   * @returns {void}
   */


  function replaceReducer(nextReducer) {
    if (typeof nextReducer !== 'function') {
      throw new Error('Expected the nextReducer to be a function.');
    }

    currentReducer = nextReducer;
    dispatch({
      type: ActionTypes.REPLACE
    });
  }
  /**
   * Interoperability point for observable/reactive libraries.
   * @returns {observable} A minimal observable of state changes.
   * For more information, see the observable proposal:
   * https://github.com/tc39/proposal-observable
   */


  function observable() {
    var _ref;

    var outerSubscribe = subscribe;
    return _ref = {
      /**
       * The minimal observable subscription method.
       * @param {Object} observer Any object that can be used as an observer.
       * The observer object should have a `next` method.
       * @returns {subscription} An object with an `unsubscribe` method that can
       * be used to unsubscribe the observable from the store, and prevent further
       * emission of values from the observable.
       */
      subscribe: function subscribe(observer) {
        if (typeof observer !== 'object' || observer === null) {
          throw new TypeError('Expected the observer to be an object.');
        }

        function observeState() {
          if (observer.next) {
            observer.next(getState());
          }
        }

        observeState();
        var unsubscribe = outerSubscribe(observeState);
        return {
          unsubscribe: unsubscribe
        };
      }
    }, _ref[result] = function () {
      return this;
    }, _ref;
  } // When a store is created, an "INIT" action is dispatched so that every
  // reducer returns their initial state. This effectively populates
  // the initial state tree.


  dispatch({
    type: ActionTypes.INIT
  });
  return _ref2 = {
    dispatch: dispatch,
    subscribe: subscribe,
    getState: getState,
    replaceReducer: replaceReducer
  }, _ref2[result] = observable, _ref2;
}

/**
 * Prints a warning in the console if it exists.
 *
 * @param {String} message The warning message.
 * @returns {void}
 */
function warning(message) {
  /* eslint-disable no-console */
  if (typeof console !== 'undefined' && typeof console.error === 'function') {
    console.error(message);
  }
  /* eslint-enable no-console */


  try {
    // This error was thrown as a convenience so that if you enable
    // "break on all exceptions" in your console,
    // it would pause the execution at this line.
    throw new Error(message);
  } catch (e) {} // eslint-disable-line no-empty

}

function getUndefinedStateErrorMessage(key, action) {
  var actionType = action && action.type;
  var actionDescription = actionType && "action \"" + String(actionType) + "\"" || 'an action';
  return "Given " + actionDescription + ", reducer \"" + key + "\" returned undefined. " + "To ignore an action, you must explicitly return the previous state. " + "If you want this reducer to hold no value, you can return null instead of undefined.";
}

function getUnexpectedStateShapeWarningMessage(inputState, reducers, action, unexpectedKeyCache) {
  var reducerKeys = Object.keys(reducers);
  var argumentName = action && action.type === ActionTypes.INIT ? 'preloadedState argument passed to createStore' : 'previous state received by the reducer';

  if (reducerKeys.length === 0) {
    return 'Store does not have a valid reducer. Make sure the argument passed ' + 'to combineReducers is an object whose values are reducers.';
  }

  if (!isPlainObject(inputState)) {
    return "The " + argumentName + " has unexpected type of \"" + {}.toString.call(inputState).match(/\s([a-z|A-Z]+)/)[1] + "\". Expected argument to be an object with the following " + ("keys: \"" + reducerKeys.join('", "') + "\"");
  }

  var unexpectedKeys = Object.keys(inputState).filter(function (key) {
    return !reducers.hasOwnProperty(key) && !unexpectedKeyCache[key];
  });
  unexpectedKeys.forEach(function (key) {
    unexpectedKeyCache[key] = true;
  });
  if (action && action.type === ActionTypes.REPLACE) return;

  if (unexpectedKeys.length > 0) {
    return "Unexpected " + (unexpectedKeys.length > 1 ? 'keys' : 'key') + " " + ("\"" + unexpectedKeys.join('", "') + "\" found in " + argumentName + ". ") + "Expected to find one of the known reducer keys instead: " + ("\"" + reducerKeys.join('", "') + "\". Unexpected keys will be ignored.");
  }
}

function assertReducerShape(reducers) {
  Object.keys(reducers).forEach(function (key) {
    var reducer = reducers[key];
    var initialState = reducer(undefined, {
      type: ActionTypes.INIT
    });

    if (typeof initialState === 'undefined') {
      throw new Error("Reducer \"" + key + "\" returned undefined during initialization. " + "If the state passed to the reducer is undefined, you must " + "explicitly return the initial state. The initial state may " + "not be undefined. If you don't want to set a value for this reducer, " + "you can use null instead of undefined.");
    }

    if (typeof reducer(undefined, {
      type: ActionTypes.PROBE_UNKNOWN_ACTION()
    }) === 'undefined') {
      throw new Error("Reducer \"" + key + "\" returned undefined when probed with a random type. " + ("Don't try to handle " + ActionTypes.INIT + " or other actions in \"redux/*\" ") + "namespace. They are considered private. Instead, you must return the " + "current state for any unknown actions, unless it is undefined, " + "in which case you must return the initial state, regardless of the " + "action type. The initial state may not be undefined, but can be null.");
    }
  });
}
/**
 * Turns an object whose values are different reducer functions, into a single
 * reducer function. It will call every child reducer, and gather their results
 * into a single state object, whose keys correspond to the keys of the passed
 * reducer functions.
 *
 * @param {Object} reducers An object whose values correspond to different
 * reducer functions that need to be combined into one. One handy way to obtain
 * it is to use ES6 `import * as reducers` syntax. The reducers may never return
 * undefined for any action. Instead, they should return their initial state
 * if the state passed to them was undefined, and the current state for any
 * unrecognized action.
 *
 * @returns {Function} A reducer function that invokes every reducer inside the
 * passed object, and builds a state object with the same shape.
 */


function combineReducers(reducers) {
  var reducerKeys = Object.keys(reducers);
  var finalReducers = {};

  for (var i = 0; i < reducerKeys.length; i++) {
    var key = reducerKeys[i];

    if ("development" !== 'production') {
      if (typeof reducers[key] === 'undefined') {
        warning("No reducer provided for key \"" + key + "\"");
      }
    }

    if (typeof reducers[key] === 'function') {
      finalReducers[key] = reducers[key];
    }
  }

  var finalReducerKeys = Object.keys(finalReducers);
  var unexpectedKeyCache;

  if ("development" !== 'production') {
    unexpectedKeyCache = {};
  }

  var shapeAssertionError;

  try {
    assertReducerShape(finalReducers);
  } catch (e) {
    shapeAssertionError = e;
  }

  return function combination(state, action) {
    if (state === void 0) {
      state = {};
    }

    if (shapeAssertionError) {
      throw shapeAssertionError;
    }

    if ("development" !== 'production') {
      var warningMessage = getUnexpectedStateShapeWarningMessage(state, finalReducers, action, unexpectedKeyCache);

      if (warningMessage) {
        warning(warningMessage);
      }
    }

    var hasChanged = false;
    var nextState = {};

    for (var _i = 0; _i < finalReducerKeys.length; _i++) {
      var _key = finalReducerKeys[_i];
      var reducer = finalReducers[_key];
      var previousStateForKey = state[_key];
      var nextStateForKey = reducer(previousStateForKey, action);

      if (typeof nextStateForKey === 'undefined') {
        var errorMessage = getUndefinedStateErrorMessage(_key, action);
        throw new Error(errorMessage);
      }

      nextState[_key] = nextStateForKey;
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
    }

    return hasChanged ? nextState : state;
  };
}

function bindActionCreator(actionCreator, dispatch) {
  return function () {
    return dispatch(actionCreator.apply(this, arguments));
  };
}
/**
 * Turns an object whose values are action creators, into an object with the
 * same keys, but with every function wrapped into a `dispatch` call so they
 * may be invoked directly. This is just a convenience method, as you can call
 * `store.dispatch(MyActionCreators.doSomething())` yourself just fine.
 *
 * For convenience, you can also pass a single function as the first argument,
 * and get a function in return.
 *
 * @param {Function|Object} actionCreators An object whose values are action
 * creator functions. One handy way to obtain it is to use ES6 `import * as`
 * syntax. You may also pass a single function.
 *
 * @param {Function} dispatch The `dispatch` function available on your Redux
 * store.
 *
 * @returns {Function|Object} The object mimicking the original object, but with
 * every action creator wrapped into the `dispatch` call. If you passed a
 * function as `actionCreators`, the return value will also be a single
 * function.
 */


function bindActionCreators(actionCreators, dispatch) {
  if (typeof actionCreators === 'function') {
    return bindActionCreator(actionCreators, dispatch);
  }

  if (typeof actionCreators !== 'object' || actionCreators === null) {
    throw new Error("bindActionCreators expected an object or a function, instead received " + (actionCreators === null ? 'null' : typeof actionCreators) + ". " + "Did you write \"import ActionCreators from\" instead of \"import * as ActionCreators from\"?");
  }

  var keys = Object.keys(actionCreators);
  var boundActionCreators = {};

  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    var actionCreator = actionCreators[key];

    if (typeof actionCreator === 'function') {
      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
    }
  }

  return boundActionCreators;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty(target, key, source[key]);
    });
  }

  return target;
}

/**
 * Composes single-argument functions from right to left. The rightmost
 * function can take multiple arguments as it provides the signature for
 * the resulting composite function.
 *
 * @param {...Function} funcs The functions to compose.
 * @returns {Function} A function obtained by composing the argument functions
 * from right to left. For example, compose(f, g, h) is identical to doing
 * (...args) => f(g(h(...args))).
 */
function compose() {
  for (var _len = arguments.length, funcs = new Array(_len), _key = 0; _key < _len; _key++) {
    funcs[_key] = arguments[_key];
  }

  if (funcs.length === 0) {
    return function (arg) {
      return arg;
    };
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce(function (a, b) {
    return function () {
      return a(b.apply(void 0, arguments));
    };
  });
}

/**
 * Creates a store enhancer that applies middleware to the dispatch method
 * of the Redux store. This is handy for a variety of tasks, such as expressing
 * asynchronous actions in a concise manner, or logging every action payload.
 *
 * See `redux-thunk` package as an example of the Redux middleware.
 *
 * Because middleware is potentially asynchronous, this should be the first
 * store enhancer in the composition chain.
 *
 * Note that each middleware will be given the `dispatch` and `getState` functions
 * as named arguments.
 *
 * @param {...Function} middlewares The middleware chain to be applied.
 * @returns {Function} A store enhancer applying the middleware.
 */

function applyMiddleware() {
  for (var _len = arguments.length, middlewares = new Array(_len), _key = 0; _key < _len; _key++) {
    middlewares[_key] = arguments[_key];
  }

  return function (createStore) {
    return function () {
      var store = createStore.apply(void 0, arguments);

      var _dispatch = function dispatch() {
        throw new Error("Dispatching while constructing your middleware is not allowed. " + "Other middleware would not be applied to this dispatch.");
      };

      var middlewareAPI = {
        getState: store.getState,
        dispatch: function dispatch() {
          return _dispatch.apply(void 0, arguments);
        }
      };
      var chain = middlewares.map(function (middleware) {
        return middleware(middlewareAPI);
      });
      _dispatch = compose.apply(void 0, chain)(store.dispatch);
      return _objectSpread({}, store, {
        dispatch: _dispatch
      });
    };
  };
}

/*
 * This is a dummy function to check if the function name has been altered by minification.
 * If the function has been minified and NODE_ENV !== 'production', warn the user.
 */

function isCrushed() {}

if ("development" !== 'production' && typeof isCrushed.name === 'string' && isCrushed.name !== 'isCrushed') {
  warning('You are currently using minified code outside of NODE_ENV === "production". ' + 'This means that you are running a slower development build of Redux. ' + 'You can use loose-envify (https://github.com/zertosh/loose-envify) for browserify ' + 'or setting mode to production in webpack (https://webpack.js.org/concepts/mode/) ' + 'to ensure you have the correct code for your production build.');
}

function createThunkMiddleware(extraArgument) {
  return function (_ref) {
    var dispatch = _ref.dispatch,
        getState = _ref.getState;
    return function (next) {
      return function (action) {
        if (typeof action === 'function') {
          return action(dispatch, getState, extraArgument);
        }

        return next(action);
      };
    };
  };
}

var thunk = createThunkMiddleware();
thunk.withExtraArgument = createThunkMiddleware;

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function commonjsRequire () {
	throw new Error('Dynamic requires are not currently supported by rollup-plugin-commonjs');
}

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x.default : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

function getCjsExportFromNamespace (n) {
	return n && n.default || n;
}

var reduxLogger = createCommonjsModule(function (module, exports) {
!function(e,t){"object"=='object'&&"undefined"!='object'?t(exports):"function"==typeof undefined&&undefined.amd?undefined(["exports"],t):t(e.reduxLogger=e.reduxLogger||{});}(commonjsGlobal,function(e){"use strict";function t(e,t){e.super_=t,e.prototype=Object.create(t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}});}function r(e,t){Object.defineProperty(this,"kind",{value:e,enumerable:!0}),t&&t.length&&Object.defineProperty(this,"path",{value:t,enumerable:!0});}function n(e,t,r){n.super_.call(this,"E",e),Object.defineProperty(this,"lhs",{value:t,enumerable:!0}),Object.defineProperty(this,"rhs",{value:r,enumerable:!0});}function o(e,t){o.super_.call(this,"N",e),Object.defineProperty(this,"rhs",{value:t,enumerable:!0});}function i(e,t){i.super_.call(this,"D",e),Object.defineProperty(this,"lhs",{value:t,enumerable:!0});}function a(e,t,r){a.super_.call(this,"A",e),Object.defineProperty(this,"index",{value:t,enumerable:!0}),Object.defineProperty(this,"item",{value:r,enumerable:!0});}function f(e,t,r){var n=e.slice((r||t)+1||e.length);return e.length=t<0?e.length+t:t,e.push.apply(e,n),e}function u(e){var t="undefined"==typeof e?"undefined":N(e);return "object"!==t?t:e===Math?"math":null===e?"null":Array.isArray(e)?"array":"[object Date]"===Object.prototype.toString.call(e)?"date":"function"==typeof e.toString&&/^\/.*\//.test(e.toString())?"regexp":"object"}function l(e,t,r,c,s,d,p){s=s||[],p=p||[];var g=s.slice(0);if("undefined"!=typeof d){if(c){if("function"==typeof c&&c(g,d))return;if("object"===("undefined"==typeof c?"undefined":N(c))){if(c.prefilter&&c.prefilter(g,d))return;if(c.normalize){var h=c.normalize(g,d,e,t);h&&(e=h[0],t=h[1]);}}}g.push(d);}"regexp"===u(e)&&"regexp"===u(t)&&(e=e.toString(),t=t.toString());var y="undefined"==typeof e?"undefined":N(e),v="undefined"==typeof t?"undefined":N(t),b="undefined"!==y||p&&p[p.length-1].lhs&&p[p.length-1].lhs.hasOwnProperty(d),m="undefined"!==v||p&&p[p.length-1].rhs&&p[p.length-1].rhs.hasOwnProperty(d);if(!b&&m)r(new o(g,t));else if(!m&&b)r(new i(g,e));else if(u(e)!==u(t))r(new n(g,e,t));else if("date"===u(e)&&e-t!==0)r(new n(g,e,t));else if("object"===y&&null!==e&&null!==t)if(p.filter(function(t){return t.lhs===e}).length)e!==t&&r(new n(g,e,t));else{if(p.push({lhs:e,rhs:t}),Array.isArray(e)){var w;e.length;for(w=0;w<e.length;w++)w>=t.length?r(new a(g,w,new i(void 0,e[w]))):l(e[w],t[w],r,c,g,w,p);for(;w<t.length;)r(new a(g,w,new o(void 0,t[w++])));}else{var x=Object.keys(e),S=Object.keys(t);x.forEach(function(n,o){var i=S.indexOf(n);i>=0?(l(e[n],t[n],r,c,g,n,p),S=f(S,i)):l(e[n],void 0,r,c,g,n,p);}),S.forEach(function(e){l(void 0,t[e],r,c,g,e,p);});}p.length=p.length-1;}else e!==t&&("number"===y&&isNaN(e)&&isNaN(t)||r(new n(g,e,t)));}function c(e,t,r,n){return n=n||[],l(e,t,function(e){e&&n.push(e);},r),n.length?n:void 0}function s(e,t,r){if(r.path&&r.path.length){var n,o=e[t],i=r.path.length-1;for(n=0;n<i;n++)o=o[r.path[n]];switch(r.kind){case"A":s(o[r.path[n]],r.index,r.item);break;case"D":delete o[r.path[n]];break;case"E":case"N":o[r.path[n]]=r.rhs;}}else switch(r.kind){case"A":s(e[t],r.index,r.item);break;case"D":e=f(e,t);break;case"E":case"N":e[t]=r.rhs;}return e}function d(e,t,r){if(e&&t&&r&&r.kind){for(var n=e,o=-1,i=r.path?r.path.length-1:0;++o<i;)"undefined"==typeof n[r.path[o]]&&(n[r.path[o]]="number"==typeof r.path[o]?[]:{}),n=n[r.path[o]];switch(r.kind){case"A":s(r.path?n[r.path[o]]:n,r.index,r.item);break;case"D":delete n[r.path[o]];break;case"E":case"N":n[r.path[o]]=r.rhs;}}}function p(e,t,r){if(r.path&&r.path.length){var n,o=e[t],i=r.path.length-1;for(n=0;n<i;n++)o=o[r.path[n]];switch(r.kind){case"A":p(o[r.path[n]],r.index,r.item);break;case"D":o[r.path[n]]=r.lhs;break;case"E":o[r.path[n]]=r.lhs;break;case"N":delete o[r.path[n]];}}else switch(r.kind){case"A":p(e[t],r.index,r.item);break;case"D":e[t]=r.lhs;break;case"E":e[t]=r.lhs;break;case"N":e=f(e,t);}return e}function g(e,t,r){if(e&&t&&r&&r.kind){var n,o,i=e;for(o=r.path.length-1,n=0;n<o;n++)"undefined"==typeof i[r.path[n]]&&(i[r.path[n]]={}),i=i[r.path[n]];switch(r.kind){case"A":p(i[r.path[n]],r.index,r.item);break;case"D":i[r.path[n]]=r.lhs;break;case"E":i[r.path[n]]=r.lhs;break;case"N":delete i[r.path[n]];}}}function h(e,t,r){if(e&&t){var n=function(n){r&&!r(e,t,n)||d(e,t,n);};l(e,t,n);}}function y(e){return "color: "+F[e].color+"; font-weight: bold"}function v(e){var t=e.kind,r=e.path,n=e.lhs,o=e.rhs,i=e.index,a=e.item;switch(t){case"E":return [r.join("."),n,"→",o];case"N":return [r.join("."),o];case"D":return [r.join(".")];case"A":return [r.join(".")+"["+i+"]",a];default:return []}}function b(e,t,r,n){var o=c(e,t);try{n?r.groupCollapsed("diff"):r.group("diff");}catch(e){r.log("diff");}o?o.forEach(function(e){var t=e.kind,n=v(e);r.log.apply(r,["%c "+F[t].text,y(t)].concat(P(n)));}):r.log("—— no diff ——");try{r.groupEnd();}catch(e){r.log("—— diff end —— ");}}function m(e,t,r,n){switch("undefined"==typeof e?"undefined":N(e)){case"object":return "function"==typeof e[n]?e[n].apply(e,P(r)):e[n];case"function":return e(t);default:return e}}function w(e){var t=e.timestamp,r=e.duration;return function(e,n,o){var i=["action"];return i.push("%c"+String(e.type)),t&&i.push("%c@ "+n),r&&i.push("%c(in "+o.toFixed(2)+" ms)"),i.join(" ")}}function x(e,t){var r=t.logger,n=t.actionTransformer,o=t.titleFormatter,i=void 0===o?w(t):o,a=t.collapsed,f=t.colors,u=t.level,l=t.diff,c="undefined"==typeof t.titleFormatter;e.forEach(function(o,s){var d=o.started,p=o.startedTime,g=o.action,h=o.prevState,y=o.error,v=o.took,w=o.nextState,x=e[s+1];x&&(w=x.prevState,v=x.started-d);var S=n(g),k="function"==typeof a?a(function(){return w},g,o):a,j=D(p),E=f.title?"color: "+f.title(S)+";":"",A=["color: gray; font-weight: lighter;"];A.push(E),t.timestamp&&A.push("color: gray; font-weight: lighter;"),t.duration&&A.push("color: gray; font-weight: lighter;");var O=i(S,j,v);try{k?f.title&&c?r.groupCollapsed.apply(r,["%c "+O].concat(A)):r.groupCollapsed(O):f.title&&c?r.group.apply(r,["%c "+O].concat(A)):r.group(O);}catch(e){r.log(O);}var N=m(u,S,[h],"prevState"),P=m(u,S,[S],"action"),C=m(u,S,[y,h],"error"),F=m(u,S,[w],"nextState");if(N)if(f.prevState){var L="color: "+f.prevState(h)+"; font-weight: bold";r[N]("%c prev state",L,h);}else r[N]("prev state",h);if(P)if(f.action){var T="color: "+f.action(S)+"; font-weight: bold";r[P]("%c action    ",T,S);}else r[P]("action    ",S);if(y&&C)if(f.error){var M="color: "+f.error(y,h)+"; font-weight: bold;";r[C]("%c error     ",M,y);}else r[C]("error     ",y);if(F)if(f.nextState){var _="color: "+f.nextState(w)+"; font-weight: bold";r[F]("%c next state",_,w);}else r[F]("next state",w);l&&b(h,w,r,k);try{r.groupEnd();}catch(e){r.log("—— log end ——");}});}function S(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=Object.assign({},L,e),r=t.logger,n=t.stateTransformer,o=t.errorTransformer,i=t.predicate,a=t.logErrors,f=t.diffPredicate;if("undefined"==typeof r)return function(){return function(e){return function(t){return e(t)}}};if(e.getState&&e.dispatch)return console.error("[redux-logger] redux-logger not installed. Make sure to pass logger instance as middleware:\n// Logger with default options\nimport { logger } from 'redux-logger'\nconst store = createStore(\n  reducer,\n  applyMiddleware(logger)\n)\n// Or you can create your own logger with custom options http://bit.ly/redux-logger-options\nimport createLogger from 'redux-logger'\nconst logger = createLogger({\n  // ...options\n});\nconst store = createStore(\n  reducer,\n  applyMiddleware(logger)\n)\n"),function(){return function(e){return function(t){return e(t)}}};var u=[];return function(e){var r=e.getState;return function(e){return function(l){if("function"==typeof i&&!i(r,l))return e(l);var c={};u.push(c),c.started=O.now(),c.startedTime=new Date,c.prevState=n(r()),c.action=l;var s=void 0;if(a)try{s=e(l);}catch(e){c.error=o(e);}else s=e(l);c.took=O.now()-c.started,c.nextState=n(r());var d=t.diff&&"function"==typeof f?f(r,l):t.diff;if(x(u,Object.assign({},t,{diff:d})),u.length=0,c.error)throw c.error;return s}}}}var k,j,E=function(e,t){return new Array(t+1).join(e)},A=function(e,t){return E("0",t-e.toString().length)+e},D=function(e){return A(e.getHours(),2)+":"+A(e.getMinutes(),2)+":"+A(e.getSeconds(),2)+"."+A(e.getMilliseconds(),3)},O="undefined"!=typeof performance&&null!==performance&&"function"==typeof performance.now?performance:Date,N="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},P=function(e){if(Array.isArray(e)){for(var t=0,r=Array(e.length);t<e.length;t++)r[t]=e[t];return r}return Array.from(e)},C=[];k="object"===("undefined"==typeof commonjsGlobal?"undefined":N(commonjsGlobal))&&commonjsGlobal?commonjsGlobal:"undefined"!=typeof window?window:{},j=k.DeepDiff,j&&C.push(function(){"undefined"!=typeof j&&k.DeepDiff===c&&(k.DeepDiff=j,j=void 0);}),t(n,r),t(o,r),t(i,r),t(a,r),Object.defineProperties(c,{diff:{value:c,enumerable:!0},observableDiff:{value:l,enumerable:!0},applyDiff:{value:h,enumerable:!0},applyChange:{value:d,enumerable:!0},revertChange:{value:g,enumerable:!0},isConflict:{value:function(){return "undefined"!=typeof j},enumerable:!0},noConflict:{value:function(){return C&&(C.forEach(function(e){e();}),C=null),c},enumerable:!0}});var F={E:{color:"#2196F3",text:"CHANGED:"},N:{color:"#4CAF50",text:"ADDED:"},D:{color:"#F44336",text:"DELETED:"},A:{color:"#2196F3",text:"ARRAY:"}},L={level:"log",logger:console,logErrors:!0,collapsed:void 0,predicate:void 0,duration:!1,timestamp:!0,stateTransformer:function(e){return e},actionTransformer:function(e){return e},errorTransformer:function(e){return e},colors:{title:function(){return "inherit"},prevState:function(){return "#9E9E9E"},action:function(){return "#03A9F4"},nextState:function(){return "#4CAF50"},error:function(){return "#F20404"}},diff:!1,diffPredicate:void 0,transformer:void 0},T=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.dispatch,r=e.getState;return "function"==typeof t||"function"==typeof r?S()({dispatch:t,getState:r}):void console.error("\n[redux-logger v3] BREAKING CHANGE\n[redux-logger v3] Since 3.0.0 redux-logger exports by default logger with default settings.\n[redux-logger v3] Change\n[redux-logger v3] import createLogger from 'redux-logger'\n[redux-logger v3] to\n[redux-logger v3] import { createLogger } from 'redux-logger'\n")};e.defaults=L,e.createLogger=S,e.logger=T,e.default=T,Object.defineProperty(e,"__esModule",{value:!0});});
});

var logger = unwrapExports(reduxLogger);

var Orientation;
(function (Orientation) {
    Orientation[Orientation["CORONAL"] = 0] = "CORONAL";
    Orientation[Orientation["SAGGITAL"] = 1] = "SAGGITAL";
    Orientation[Orientation["AXIAL"] = 2] = "AXIAL";
})(Orientation || (Orientation = {}));

var ToolType;
(function (ToolType) {
    ToolType["RULER"] = "ruler";
    ToolType["ANGLE"] = "angle";
    ToolType["ANNOTATION"] = "annotation";
})(ToolType || (ToolType = {}));

const getInitialState = () => {
    return {
        src: null,
        display: Mode.MESH,
        srcLoaded: false,
        orientation: Orientation.CORONAL,
        toolsVisible: false,
        toolsEnabled: false,
        toolType: ToolType.ANNOTATION,
        optionsVisible: false,
        optionsEnabled: false
    };
};
const app = (state = getInitialState(), action) => {
    switch (action.type) {
        case TypeKeys.APP_SET_SRC: {
            return Object.assign({}, state, { src: action.src, srcLoaded: false });
        }
        case TypeKeys.APP_SET_DISPLAY: {
            return Object.assign({}, state, { display: action.display });
        }
        case TypeKeys.APP_SET_SRC_LOADED: {
            return Object.assign({}, state, { srcLoaded: action.srcLoaded });
        }
        case TypeKeys.APP_SET_ORIENTATION: {
            return Object.assign({}, state, { orientation: action.orientation });
        }
        case TypeKeys.APP_SET_TOOLS_VISIBLE: {
            return Object.assign({}, state, { toolsVisible: action.toolsVisible });
        }
        case TypeKeys.APP_SET_TOOLS_ENABLED: {
            return Object.assign({}, state, { toolsEnabled: action.toolsEnabled });
        }
        case TypeKeys.APP_SET_TOOL_TYPE: {
            return Object.assign({}, state, { toolType: action.toolType });
        }
        case TypeKeys.APP_SET_OPTIONS_VISIBLE: {
            return Object.assign({}, state, { optionsVisible: action.optionsVisible });
        }
        case TypeKeys.APP_SET_OPTIONS_ENABLED: {
            return Object.assign({}, state, { optionsEnabled: action.optionsEnabled });
        }
    }
    return state;
};

const rootReducer = combineReducers({
    app
});

const configureStore = (preloadedState) => createStore(rootReducer, preloadedState, applyMiddleware(logger, thunk));

class utils {
    static mapfiles(baseurl, files) {
        return files.map(filename => {
            if (!baseurl.endsWith('/')) {
                baseurl += '/';
            }
            return `${baseurl}${filename}`;
        });
    }
    static srcLoader(src) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', src, true);
            xhr.onload = () => {
                let data = JSON.parse(xhr.responseText);
                data = utils.mapfiles(data.baseurl, data.series);
                resolve(data);
            };
            xhr.onerror = () => {
                reject();
            };
            xhr.send();
        });
    }
    static scaleAndPositionObject(obj) {
        const geometry = utils.findGeometry(obj.children);
        if (geometry) {
            geometry.computeBoundingBox();
            const sizeX = geometry.boundingBox.max.x - geometry.boundingBox.min.x;
            const sizeY = geometry.boundingBox.max.y - geometry.boundingBox.min.y;
            const sizeZ = geometry.boundingBox.max.z - geometry.boundingBox.min.z;
            const diagonalSize = Math.sqrt(sizeX * sizeX + sizeY * sizeY + sizeZ * sizeZ);
            const scale = 1.0 / diagonalSize;
            const midX = (geometry.boundingBox.min.x + geometry.boundingBox.max.x) / 2;
            const midY = (geometry.boundingBox.min.y + geometry.boundingBox.max.y) / 2;
            const midZ = (geometry.boundingBox.min.z + geometry.boundingBox.max.z) / 2;
            obj.scale.multiplyScalar(scale);
            obj.position.x = -midX * scale;
            obj.position.y = -midY * scale;
            obj.position.z = -midZ * scale;
        }
    }
    static findGeometry(children) {
        const geometry = children[0].geometry;
        if (geometry) {
            return geometry;
        }
        else if (children[0].children) {
            return utils.findGeometry(children[0].children);
        }
        return null;
    }
    static getBoundingBox(obj) {
        return new THREE.Box3().setFromObject(obj);
    }
    static getBoundingMag(obj) {
        const size = new THREE.Vector3();
        utils.getBoundingBox(obj).getSize(size).length();
        return size.length();
    }
    /**
     * @param  {THREE.Object3D} obj
     * @param  {number} multiplier - Multiply the magnitude of the object bounding vector by this number
     * @returns number
     */
    static getCameraZ(obj, multiplier) {
        return utils.getBoundingMag(obj) * multiplier;
    }
    /**
     * @param  {THREE.Object3D} obj
     * @param  {number} multiplier - Multiply the magnitude of the object bounding vector by this number
     * @returns number
     */
    static getFov(obj, multiplier) {
        const dist = utils.getCameraZ(obj, multiplier);
        const mag = utils.getBoundingMag(obj);
        let fov = 2 * Math.atan(mag / (2 * dist)) * (180 / Math.PI);
        return fov;
    }
}
utils.colors = {
    red: 0xF50057,
    blue: 0x00B0ff,
    black: 0x000000,
    white: 0xFFFFFF,
    yellow: 0xFFEB3B,
    green: 0x76FF03,
    lightRed: 0xF77777
};

var MeshFileType;
(function (MeshFileType) {
    MeshFileType["GLTF"] = "gltf";
    MeshFileType["STL"] = "stl";
})(MeshFileType || (MeshFileType = {}));

class GLTFFileTypeHandler {
    static setup(parent, gltf, renderer) {
        // todo: add animation, gltf camera support e.g.
        // https://github.com/donmccurdy/three-gltf-viewer/blob/master/src/viewer.js#L183
        // allow specifying envmap? https://github.com/mrdoob/three.js/blob/dev/examples/webgl_loader_gltf.html#L92
        const obj = gltf.scene || gltf.scenes[0];
        // https://github.com/mrdoob/three.js/pull/12766
        renderer.gammaOutput = true;
        parent.add(obj);
    }
}

class STLFileTypeHandler {
    static setup(parent, geometry, materialSettings) {
        if (geometry.boundingSphere === null)
            geometry.computeBoundingSphere();
        const material = new THREE.MeshPhongMaterial(materialSettings);
        const mesh = new THREE.Mesh(geometry, material);
        // to LPS space
        const RASToLPS = new THREE.Matrix4();
        RASToLPS.set(-1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        mesh.applyMatrix(RASToLPS);
        parent.add(mesh);
    }
}

const traceAMIRay_impl = (stackHelper, px, py, pz, dx, dy, dz, max_d, hit_pos, hit_norm) => {
    // consider raycast vector to be parametrized by t
    //   vec = [px,py,pz] + t * [dx,dy,dz]
    // algo below is as described by this paper:
    // http://www.cse.chalmers.se/edu/year/2010/course/TDA361/grid.pdf
    var t = 0.0;
    var floor = Math.floor;
    var ix = floor(px) | 0;
    var iy = floor(py) | 0;
    var iz = floor(pz) | 0;
    var stepx = (dx > 0) ? 1 : -1;
    var stepy = (dy > 0) ? 1 : -1;
    var stepz = (dz > 0) ? 1 : -1;
    // dx,dy,dz are already normalized
    var txDelta = Math.abs(1 / dx);
    var tyDelta = Math.abs(1 / dy);
    var tzDelta = Math.abs(1 / dz);
    var xdist = (stepx > 0) ? (ix + 1 - px) : (px - ix);
    var ydist = (stepy > 0) ? (iy + 1 - py) : (py - iy);
    var zdist = (stepz > 0) ? (iz + 1 - pz) : (pz - iz);
    // location of nearest voxel boundary, in units of t
    var txMax = (txDelta < Infinity) ? txDelta * xdist : Infinity;
    var tyMax = (tyDelta < Infinity) ? tyDelta * ydist : Infinity;
    var tzMax = (tzDelta < Infinity) ? tzDelta * zdist : Infinity;
    // This is not a magic number; it represents a statistically significant vozxel value greater than 10%;
    // assuming dicom values are 0..255
    let initial_trim = 25;
    // FROM DATA SHADER
    // float windowMin = uWindowCenterWidth[0] - uWindowCenterWidth[1] * 0.5;
    // float normalizedIntensity = ( realIntensity - windowMin ) / uWindowCenterWidth[1];
    let windowMin = stackHelper.windowCenter - (stackHelper.windowWidth * 0.5);
    var data_trim = (initial_trim + windowMin);
    var steppedIndex = -1;
    // main loop along raycast vector
    while (t <= max_d) {
        // exit check in data space
        var b;
        var pixel_pos = new THREE.Vector3(ix, iy, iz);
        var data_pixel_pos = AMI.UtilsCore.worldToData(stackHelper.stack.lps2IJK, pixel_pos);
        var cur_pixel = AMI.UtilsCore.getPixelData(stackHelper.stack, data_pixel_pos);
        if ((cur_pixel !== null) && (cur_pixel > data_trim)) {
            console.log(cur_pixel);
            b = 1;
        }
        else {
            b = 0;
        }
        if (b) {
            if (hit_pos) {
                hit_pos.x = px + t * dx;
                hit_pos.y = py + t * dy;
                hit_pos.z = pz + t * dz;
            }
            if (hit_norm) {
                hit_norm.x = hit_norm.y = hit_norm.z = 0;
                if (steppedIndex === 0)
                    hit_norm.x = -stepx;
                if (steppedIndex === 1)
                    hit_norm.y = -stepy;
                if (steppedIndex === 2)
                    hit_norm.z = -stepz;
            }
            return b;
        }
        // advance t to next nearest voxel boundary
        if (txMax < tyMax) {
            if (txMax < tzMax) {
                ix += stepx;
                t = txMax;
                txMax += txDelta;
                steppedIndex = 0;
            }
            else {
                iz += stepz;
                t = tzMax;
                tzMax += tzDelta;
                steppedIndex = 2;
            }
        }
        else {
            if (tyMax < tzMax) {
                iy += stepy;
                t = tyMax;
                tyMax += tyDelta;
                steppedIndex = 1;
            }
            else {
                iz += stepz;
                t = tzMax;
                tzMax += tzDelta;
                steppedIndex = 2;
            }
        }
    }
    // no voxel hit found
    if (hit_pos) {
        hit_pos.x = px + t * dx;
        hit_pos.y = py + t * dy;
        hit_pos.z = pz + t * dz;
    }
    if (hit_norm) {
        hit_norm.x = hit_norm.y = hit_norm.z = 0;
    }
    return 0;
};
// Trace an AMI ray through dataSpace voxels
const AMIRay = (stack, origin, direction, max_d, hit_pos, hit_norm) => {
    var px = +origin.x;
    var py = +origin.y;
    var pz = +origin.z;
    var dx = +direction.x;
    var dy = +direction.y;
    var dz = +direction.z;
    var ds = Math.sqrt(dx * dx + dy * dy + dz * dz);
    if (ds === 0) {
        throw new Error("Can't raycast along a zero vector");
    }
    dx /= ds;
    dy /= ds;
    dz /= ds;
    if (typeof (max_d) === "undefined") {
        max_d = 64.0;
    }
    else {
        max_d = +max_d;
    }
    return traceAMIRay_impl(stack, px, py, pz, dx, dy, dz, max_d, hit_pos, hit_norm);
};

class WidgetBase extends THREE.Object3D {
    //#endregion
    constructor(controls, params, three = window.THREE) {
        super();
        this._widgetType = "Base";
        this._enabled = true;
        this._displayed = true;
        this._selected = false;
        this._active = true;
        this._dragged = false;
        this._hovered = true;
        this._material = null;
        this._geometry = null;
        this._mesh = null;
        this._domHovered = false;
        this._initialized = false;
        this._dom = null;
        this._handles = [];
        this._colors = {
            default: utils.colors.blue,
            active: utils.colors.yellow,
            hover: utils.colors.red,
            select: utils.colors.green,
            text: utils.colors.white,
            error: utils.colors.lightRed,
        };
        this._color = this._colors.default;
        this._controls = controls;
        this._camera = controls.object;
        this._container = controls.domElement;
        this._widgetParams = params;
        if (params.hideMesh === true) {
            this.visible = false;
        }
        // Style the widget by the global document style
        const elementStyle = document.getElementById('ami-widgets');
        if (elementStyle === null) {
            const styleEl = document.createElement('style');
            styleEl.id = 'ami-widgets';
            styleEl.innerHTML = AMI.WidgetsCss.code;
            document.head.appendChild(styleEl);
        }
        this._worldPosition = new three.Vector3(); // LPS position
        if (params.worldPosition) {
            this._worldPosition.copy(params.worldPosition);
        }
    }
    //#endregion
    //#region Getters / Setters
    get mesh() {
        return this._mesh;
    }
    set mesh(value) {
        this._mesh = value;
    }
    get widgetType() {
        return this._widgetType;
    }
    get worldPosition() {
        return this._worldPosition;
    }
    set worldPosition(worldPosition) {
        this._worldPosition.copy(worldPosition);
        this.update();
    }
    get enabled() {
        return this._enabled;
    }
    set enabled(enabled) {
        this._enabled = enabled;
        this.update();
    }
    get selected() {
        return this._selected;
    }
    set selected(selected) {
        this._selected = selected;
        this.update();
    }
    get displayed() {
        return this._displayed;
    }
    set displayed(displayed) {
        this._displayed = displayed;
        this.update();
    }
    get active() {
        return this._active;
    }
    set active(active) {
        this._active = active;
        this.update();
    }
    get dragged() {
        return this._dragged;
    }
    set dragged(dragged) {
        this._dragged = dragged;
        this.update();
    }
    get hovered() {
        return this._hovered;
    }
    set hovered(hovered) {
        this._hovered = hovered;
        this.update();
    }
    get color() {
        return this._color;
    }
    set color(color) {
        this._color = color;
        this.update();
    }
    //#region Public Methods
    updateMeshColor() {
        if (this._material) {
            this._material.color.set(this._color);
        }
    }
    create() {
        this.createMesh();
        this.createDOM();
    }
    hoverDom(evt) {
        this._domHovered = evt.type === 'mouseenter';
    }
    showDOM() {
        this._dom.style.display = '';
    }
    hideDOM() {
        this._dom.style.display = 'none';
    }
    hideMesh() {
        this.visible = false;
    }
    showMesh() {
        if (this._widgetParams.hideMesh === true) {
            return;
        }
        this.visible = true;
    }
    initScreenOffsets() {
        const box = this._container.getBoundingClientRect();
        const body = document.body;
        const docEl = document.documentElement;
        const scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
        const scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;
        const clientTop = docEl.clientTop || body.clientTop || 0;
        const clientLeft = docEl.clientLeft || body.clientLeft || 0;
        this._screenOffsets = {
            top: Math.round(box.top + scrollTop - clientTop),
            left: Math.round(box.left + scrollLeft - clientLeft),
        };
    }
    getMouseOffsets(event, container) {
        return {
            x: ((event.clientX - this._screenOffsets.left) / container.offsetWidth) * 2 - 1,
            y: -((event.clientY - this._screenOffsets.top) / container.offsetHeight) * 2 + 1,
            screenX: event.clientX - this._screenOffsets.left,
            screenY: event.clientY - this._screenOffsets.top,
        };
    }
    /**
     * Get area of polygon.
     *
     * @param {Array} points Ordered vertices' coordinates
     *
     * @returns {Number}
     */
    getArea(points) {
        let area = 0;
        let j = points.length - 1; // the last vertex is the 'previous' one to the first
        for (let i = 0; i < points.length; i++) {
            area += (points[j].x + points[i].x) * (points[j].y - points[i].y);
            j = i; // j is the previous vertex to i
        }
        return Math.abs(area / 2);
    }
    /**
     * Get distance between points
     *
     * @param {Vector3} pointA Begin world coordinates
     * @param {Vector3} pointB End world coordinates
     * @param {number}  cf     Calibration factor
     *
     * @returns {Object}
     */
    getDistanceData(pointA, pointB, calibrationFactor) {
        let distance = null;
        let units = null;
        if (calibrationFactor) {
            distance = pointA.distanceTo(pointB) * calibrationFactor;
        }
        else {
            distance = pointA.distanceTo(pointB);
        }
        return {
            distance,
            units,
        };
    }
    getLineData(pointA, pointB) {
        const line = pointB.clone().sub(pointA);
        const center = pointB
            .clone()
            .add(pointA)
            .multiplyScalar(0.5);
        const length = line.length();
        const angle = line.angleTo(new THREE.Vector3(1, 0, 0));
        return {
            line,
            length,
            transformX: center.x - length / 2,
            transformY: center.y - this._container.offsetHeight,
            transformAngle: pointA.y < pointB.y ? angle : -angle,
            center,
        };
    }
    getRectData(pointA, pointB) {
        const line = pointB.clone().sub(pointA);
        const vertical = line.clone().projectOnVector(new THREE.Vector3(0, 1, 0));
        const min = pointA.clone().min(pointB); // coordinates of the top left corner
        return {
            width: line
                .clone()
                .projectOnVector(new THREE.Vector3(1, 0, 0))
                .length(),
            height: vertical.length(),
            transformX: min.x,
            transformY: min.y - this._container.offsetHeight,
            paddingVector: vertical.clone().normalize(),
        };
    }
    /**
     * @param {HTMLElement} label
     * @param {Vector3}     point  label's center coordinates (default)
     * @param {Boolean}     corner if true, then point is the label's top left corner coordinates
     */
    adjustLabelTransform(label, point, corner) {
        let x = Math.round(point.x - (corner ? 0 : label.offsetWidth / 2));
        let y = Math.round(point.y - (corner ? 0 : label.offsetHeight / 2)) - this._container.offsetHeight;
        // keep the label on-screen
        if (x < 0) {
            x = x > -label.offsetWidth ? 0 : x + label.offsetWidth;
        }
        else if (x > this._container.offsetWidth - label.offsetWidth) {
            x =
                x < this._container.offsetWidth
                    ? this._container.offsetWidth - label.offsetWidth
                    : x - label.offsetWidth;
        }
        // keep the label on-screen
        if (y < -this._container.offsetHeight) {
            y =
                y > -this._container.offsetHeight - label.offsetHeight
                    ? -this._container.offsetHeight
                    : y + label.offsetHeight;
        }
        else if (y > -label.offsetHeight) {
            y = y < 0 ? -label.offsetHeight : y - label.offsetHeight;
        }
        return new THREE.Vector2(x, y);
    }
    worldToScreen(worldCoordinate) {
        const screenCoordinates = worldCoordinate.clone();
        screenCoordinates.project(this._camera);
        screenCoordinates.x = Math.round(((screenCoordinates.x + 1) * this._container.offsetWidth) / 2);
        screenCoordinates.y = Math.round(((-screenCoordinates.y + 1) * this._container.offsetHeight) / 2);
        screenCoordinates.z = 0;
        return screenCoordinates;
    }
    updateColor() {
        if (this._active) {
            this._color = this._colors.active;
        }
        else if (this._hovered) {
            this._color = this._colors.hover;
        }
        else if (this._selected) {
            this._color = this._colors.select;
        }
        else {
            this._color = this._colors.default;
        }
    }
    // tslint:disable-next-line
    setDefaultColor(color) {
        this._colors.default = color;
        if (this._handles) {
            this._handles.forEach(elem => (elem._colors.default = color));
        }
        this.update();
    }
    show() {
        this.showDOM();
        this.showMesh();
        this.update();
        this._displayed = true;
    }
    hide() {
        this.hideDOM();
        this.hideMesh();
        this._displayed = false;
    }
    free() {
        this._camera = null;
        this._container = null;
        this._controls = null;
        this._widgetParams = null;
    }
}

//declare var THREE: any; // todo: https://github.com/byWulf/threejs-dice/issues/2
class WidgetHandle extends WidgetBase {
    //#endregion
    constructor(controls, params, three = window.THREE) {
        super(controls, params, three);
        this._tracking = false;
        this._raycaster = new THREE.Raycaster();
        this._mouse = new THREE.Vector2();
        this._offset = new THREE.Vector3();
        this._plane = {
            position: new THREE.Vector3(),
            direction: new THREE.Vector3(),
        };
        this._meshHovered = false;
        this._widgetType = 'Handle';
        this._screenPosition = this.worldToScreen(this._worldPosition);
        this.create();
        this.initScreenOffsets();
        // event listeners
        this.onResize = this.onResize.bind(this);
        this.onMove = this.onMove.bind(this);
        this.onHover = this.onHover.bind(this);
        this.addEventListeners();
    }
    //#region Getters / Setters
    get screenPosition() {
        return this._screenPosition;
    }
    set screenPosition(screenPosition) {
        this._screenPosition = screenPosition;
    }
    get tracking() {
        return this._tracking;
    }
    set tracking(tracking) {
        this._tracking = tracking;
        this.update();
    }
    //#region Listeners
    addEventListeners() {
        window.addEventListener('resize', this.onResize);
        this._dom.addEventListener('mouseenter', this.onHover);
        this._dom.addEventListener('mouseleave', this.onHover);
        this._container.addEventListener('wheel', this.onMove);
    }
    removeEventListeners() {
        window.removeEventListener('resize', this.onResize);
        this._dom.removeEventListener('mouseenter', this.onHover);
        this._dom.removeEventListener('mouseleave', this.onHover);
        this._container.removeEventListener('wheel', this.onMove);
    }
    //#endregion
    //#region Unique Methods
    onResize() {
        this.initScreenOffsets();
    }
    hoverMesh() {
        // check raycast intersection, do we want to hover on mesh or just css?
        let intersectsHandle = this._raycaster.intersectObject(this.mesh);
        this._meshHovered = intersectsHandle.length > 0;
    }
    /**
     * @param {Object} evt - Browser event
     * @param {Boolean} forced - true to move inactive handles
     */
    //#endregion
    //#region Override Methods
    updateDOM() {
        this.updateDOMColor();
        if (this._dom) {
            this._dom.style.transform = `translate3D(${this._screenPosition.x}px,
      ${this._screenPosition.y - this._container.offsetHeight}px, 0)`;
        }
    }
    onHover(evt) {
        if (evt) {
            this.hoverDom(evt);
        }
        this.hoverMesh();
        this._hovered = this._meshHovered || this._domHovered;
        this._container.style.cursor = this._hovered ? 'pointer' : 'default';
    }
    onMove(evt, forced) {
        const offsets = this.getMouseOffsets(evt, this._container);
        this._mouse.set(offsets.x, offsets.y);
        // update raycaster
        // set ray.position to satisfy CoreIntersections::rayPlane API
        this._raycaster.setFromCamera(this._mouse, this._camera);
        this._raycaster.ray.position = this._raycaster.ray.origin;
        if (this._active || forced) {
            this._dragged = true;
            if (this._plane.direction.length() === 0) {
                var out = new THREE.Vector3();
                this._camera.getWorldDirection(out);
                this._plane.position.copy(this._worldPosition);
                this._plane.direction.copy(out);
            }
            let intersection = AMI.IntersectionsCore.rayPlane(this._raycaster.ray, this._plane);
            if (intersection !== null) {
                this._worldPosition.copy(intersection.sub(this._offset));
            }
        }
        else {
            this.onHover(null);
        }
        this.update();
    }
    onStart(evt) {
        const offsets = this.getMouseOffsets(evt, this._container);
        this._mouse.set(offsets.x, offsets.y);
        // update raycaster
        this._raycaster.setFromCamera(this._mouse, this._camera);
        this._raycaster.ray.position = this._raycaster.ray.origin;
        if (this._hovered) {
            this._active = true;
            this._controls.enabled = false;
            this._plane.position.copy(this._worldPosition);
            this._plane.direction.copy(this._camera.getWorldDirection(this._plane.direction));
            let intersection = AMI.IntersectionsCore.rayPlane(this._raycaster.ray, this._plane);
            if (intersection !== null) {
                this._offset.copy(intersection).sub(this._plane.position);
            }
            this.update();
        }
    }
    onEnd() {
        if (this._tracking === true) {
            // stay active and keep controls disabled
            return;
        }
        if (!this._dragged && this._active && this._initialized) {
            this._selected = !this._selected; // change state if there was no dragging
        }
        this._initialized = true;
        this._active = false;
        this._dragged = false;
        this._controls.enabled = true;
        this.update();
    }
    update() {
        // general update
        this.updateColor();
        // update screen position of handle
        this._screenPosition = this.worldToScreen(this._worldPosition);
        // mesh stuff
        this.updateMeshColor();
        this.updateMeshPosition();
        this.updateDOM();
    }
    createMesh() {
        // geometry
        this._geometry = new THREE.SphereGeometry(1, 16, 16);
        // material
        this._material = new THREE.MeshBasicMaterial({
            wireframe: true,
            wireframeLinewidth: 2,
        });
        this.updateMeshColor();
        // mesh
        this.mesh = new THREE.Mesh(this._geometry, this._material);
        this.mesh.position.copy(this._worldPosition);
        this.mesh.visible = true;
        this.add(this.mesh);
    }
    createDOM() {
        this._dom = document.createElement('div');
        this._dom.className = 'widgets-handle';
        this._dom.style.transform = `translate3D(
    ${this._screenPosition.x}px,
    ${this._screenPosition.y - this._container.offsetHeight}px, 0)`;
        this.updateDOMColor();
        this._container.appendChild(this._dom);
    }
    free() {
        // events
        this.removeEventListeners();
        // dom
        this._container.removeChild(this._dom);
        // mesh, geometry, material
        this.remove(this.mesh);
        this.mesh.geometry.dispose();
        this.mesh.geometry = null;
        this.mesh.material.dispose();
        this.mesh.material = null;
        this.mesh = null;
        this._geometry.dispose();
        this._geometry = null;
        this._material.vertexShader = null;
        this._material.fragmentShader = null;
        this._material.uniforms = null;
        this._material.dispose();
        this._material = null;
        super.free();
    }
    showMesh() {
        if (this._widgetParams.hideMesh === true || this._widgetParams.hideHandleMesh === true) {
            return;
        }
        this.visible = true;
    }
    updateMeshPosition() {
        if (this.mesh) {
            this.mesh.position.copy(this._worldPosition);
        }
    }
    updateDOMColor() {
        this._dom.style.borderColor = this._color;
    }
}

class WidgetToolBase extends WidgetBase {
    constructor() {
        super(...arguments);
        //#region Variables
        this._line = null;
        this._label = null;
        this._moving = false;
        //#endregion
    }
}

//declare var THREE: any; // todo: https://github.com/byWulf/threejs-dice/issues/2
class WidgetRuler extends WidgetToolBase {
    //#endregion
    constructor(controls, params, three = window.THREE) {
        super(controls, params);
        this._distance = null;
        this._widgetType = 'Ruler';
        this._calibrationFactor = params.calibrationFactor || null;
        this._units = !this._calibrationFactor && !params.pixelSpacing ? 'units' : 'mm';
        for (let i = 0; i < 2; i++) {
            let handle = new WidgetHandle(controls, params, three);
            handle.name = String(i);
            this.add(handle);
            this._handles.push(handle);
        }
        this._handles[1].active = true;
        this._handles[1].tracking = true;
        this._moveHandle = new WidgetHandle(controls, params, three);
        this._moveHandle.name = "moveHandle";
        this.add(this._moveHandle);
        this._handles.push(this._moveHandle);
        this._moveHandle.hide();
        this.create();
        this.onMove = this.onMove.bind(this);
        this.onHover = this.onHover.bind(this);
        this.addEventListeners();
    }
    //#endregion
    //#region Getters / Setters
    get calibrationFactor() {
        return this._calibrationFactor;
    }
    set calibrationFactor(calibrationFactor) {
        this._calibrationFactor = calibrationFactor;
        this._units = 'mm';
        this.update();
    }
    set worldPosition(worldPosition) {
        this._handles[0].worldPosition.copy(worldPosition);
        this._handles[1].worldPosition.copy(worldPosition);
        this._worldPosition.copy(worldPosition);
        this.update();
    }
    //#region Listeners
    addEventListeners() {
        this._container.addEventListener('wheel', this.onMove);
        this._line.addEventListener('mouseenter', this.onHover);
        this._line.addEventListener('mouseleave', this.onHover);
        this._label.addEventListener('mouseenter', this.onHover);
        this._label.addEventListener('mouseleave', this.onHover);
    }
    removeEventListeners() {
        this._container.removeEventListener('wheel', this.onMove);
        this._line.removeEventListener('mouseenter', this.onHover);
        this._line.removeEventListener('mouseleave', this.onHover);
        this._label.removeEventListener('mouseenter', this.onHover);
        this._label.removeEventListener('mouseleave', this.onHover);
    }
    //#endregion
    //#region Unique Methods
    hoverDom(evt) {
        this._domHovered = evt.type === 'mouseenter';
    }
    getMeasurements() {
        return {
            distance: this._distance,
            units: this._units,
        };
    }
    //#endregion
    //#region  Override Methods
    updateMeshPosition() {
        if (this._geometry) {
            this._geometry.verticesNeedUpdate = true;
        }
    }
    onHover(evt) {
        if (evt) {
            this.hoverDom(evt);
        }
        //this.hoverMesh();
        this._hovered = this._handles[0].hovered || this._handles[1].hovered || this._domHovered;
        this._container.style.cursor = this._hovered ? 'pointer' : 'default';
    }
    onStart(evt) {
        this._moveHandle.onMove(evt, true);
        this._handles[0].onStart(evt);
        this._handles[1].onStart(evt);
        this._active = this._handles[0].active || this._handles[1].active || this._domHovered;
        if (this._domHovered && !this._handles[1].tracking) {
            this._moving = true;
            this._controls.enabled = false;
        }
        this.update();
    }
    onMove(evt) {
        if (this._active) {
            const prevPosition = this._moveHandle.worldPosition.clone();
            this._dragged = true;
            this._moveHandle.onMove(evt, true);
            if (this._moving) {
                this._handles.slice(0, -1).forEach(handle => {
                    handle.worldPosition.add(this._moveHandle.worldPosition.clone().sub(prevPosition));
                });
            }
        }
        else {
            this.onHover(null);
        }
        this._handles[0].onMove(evt, false);
        this._handles[1].onMove(evt, false);
        this.update();
    }
    onEnd() {
        console.log('end');
        this._handles[0].onEnd(); // First Handle
        if (this._handles[1].tracking &&
            this._handles[0].screenPosition.distanceTo(this._handles[1].screenPosition) < 10) {
            return;
        }
        if (!this._dragged && this._active && !this._handles[1].tracking) {
            this._selected = !this._selected; // change state if there was no dragging
            this._handles[0].selected = this._selected;
        }
        // Second Handle
        if (this._dragged || !this._handles[1].tracking) {
            this._handles[1].tracking = false;
            this._handles[1].onEnd();
        }
        else {
            this._handles[1].tracking = false;
        }
        this._handles[1].selected = this._selected;
        this._active = this._handles[0].active || this._handles[1].active;
        this._dragged = false;
        this._moving = false;
        this.update();
    }
    updateDOM() {
        this.updateDOMColor();
        // update line
        const lineData = this.getLineData(this._handles[0].screenPosition, this._handles[1].screenPosition);
        this._line.style.transform = `translate3D(${lineData.transformX}px, ${lineData.transformY}px, 0)
    rotate(${lineData.transformAngle}rad)`;
        this._line.style.width = lineData.length + 'px';
        // update label
        if (this._units === 'units' && !this._label.hasAttribute('title')) {
            this._label.setAttribute('title', 'Calibration is required to display the distance in mm');
            this._label.style.color = this._colors.error;
        }
        else if (this._units !== 'units' && this._label.hasAttribute('title')) {
            this._label.removeAttribute('title');
            this._label.style.color = this._colors.text;
        }
        this._label.innerHTML = `${this._distance.toFixed(2)} ${this._units}`;
        let angle = Math.abs(lineData.transformAngle);
        if (angle > Math.PI / 2) {
            angle = Math.PI - angle;
        }
        const labelPadding = Math.tan(angle) < this._label.offsetHeight / this._label.offsetWidth
            ? this._label.offsetWidth / 2 / Math.cos(angle) + 15 // 5px for each handle + padding
            : this._label.offsetHeight / 2 / Math.cos(Math.PI / 2 - angle) + 15;
        const paddingVector = lineData.line.normalize().multiplyScalar(labelPadding);
        const paddingPoint = lineData.length > labelPadding * 2
            ? this._handles[1].screenPosition.clone().sub(paddingVector)
            : this._handles[1].screenPosition.clone().add(paddingVector);
        const transform = this.adjustLabelTransform(this._label, paddingPoint);
        this._label.style.transform = `translate3D(${transform.x}px, ${transform.y}px, 0)`;
    }
    createMesh() {
        // geometry
        this._geometry = new THREE.Geometry();
        this._geometry.vertices.push(this._handles[0].worldPosition);
        this._geometry.vertices.push(this._handles[1].worldPosition);
        // material
        this._material = new THREE.LineBasicMaterial();
        this.updateMeshColor();
        // mesh
        this.mesh = new THREE.Line(this._geometry, this._material);
        this.mesh.visible = true;
        this.add(this.mesh);
    }
    createDOM() {
        this._line = document.createElement('div');
        this._line.className = 'widgets-line';
        this._container.appendChild(this._line);
        this._label = document.createElement('div');
        this._label.className = 'widgets-label';
        this._container.appendChild(this._label);
        this.updateDOMColor();
    }
    hideDOM() {
        this._line.style.display = 'none';
        this._label.style.display = 'none';
        this._handles.forEach(elem => elem.hideDOM());
    }
    showDOM() {
        this._line.style.display = '';
        this._label.style.display = '';
        this._handles[0].showDOM();
        this._handles[1].showDOM();
    }
    update() {
        this.updateColor();
        this._handles[0].update();
        this._handles[1].update();
        // calculate values
        const distanceData = this.getDistanceData(this._handles[0].worldPosition, this._handles[1].worldPosition, this._calibrationFactor);
        this._distance = distanceData.distance;
        if (distanceData.units) {
            this._units = distanceData.units;
        }
        this.updateMeshColor();
        this.updateMeshPosition();
        this.updateDOM();
    }
    updateDOMColor() {
        this._line.style.backgroundColor = this._color;
        this._label.style.borderColor = this._color;
    }
    free() {
        this.removeEventListeners();
        this._handles.forEach(h => {
            this.remove(h);
            h.free();
        });
        this._handles = [];
        this._container.removeChild(this._line);
        this._container.removeChild(this._label);
        // mesh, geometry, material
        this.remove(this.mesh);
        this.mesh.geometry.dispose();
        this.mesh.geometry = null;
        this.mesh.material.dispose();
        this.mesh.material = null;
        this.mesh = null;
        this._geometry.dispose();
        this._geometry = null;
        this._material.vertexShader = null;
        this._material.fragmentShader = null;
        this._material.uniforms = null;
        this._material.dispose();
        this._material = null;
        super.free();
    }
}

class WidgetAnnotation extends WidgetToolBase {
    //#endregion
    constructor(controls, params, hit_normal, scale) {
        super(controls, params);
        //#region Variables
        this._labelMoved = false;
        this._labelHovered = false;
        this._cone = null;
        this._manuallabeldisplay = false; // Make true to force the label to be displayed
        this._dashLine = null;
        this._labelText = null;
        this._labelOffset = new THREE.Vector3(); // difference between label center and second handle
        this._mouseLabelOffset = new THREE.Vector3(); // difference between mouse coordinates and label center
        this._widgetType = 'Annotation';
        this._hitNormal = hit_normal;
        for (let i = 0; i < 2; i++) {
            let handle = new WidgetHandle(controls, params);
            this.add(handle);
            this._handles.push(handle);
        }
        this._handles[1].active = true;
        this.create();
        this.initScreenOffsets();
        this.onResize = this.onResize.bind(this);
        this.onMove = this.onMove.bind(this);
        this.onHover = this.onHover.bind(this);
        this.notonHover = this.notonHover.bind(this);
        this.changelabeltext = this.changelabeltext.bind(this);
        // Rescale all relevant geometry
        this._meshLine.geometry.scale(scale, scale, scale);
        this._cone.geometry.scale(scale, scale, scale);
        this._geometry.scale(scale, scale, scale);
        for (let index = 0; index < this._handles.length; index++) {
            const element = this._handles[index];
            element.mesh.geometry.scale(scale, scale, scale);
        }
        this.addEventListeners();
    }
    //#endregion
    //#region Getters / Setters
    set worldPosition(worldPosition) {
        this._handles[0].worldPosition.copy(worldPosition);
        this._handles[1].worldPosition.copy(worldPosition);
        this._worldPosition.copy(worldPosition);
        this.update();
    }
    //#region Listeners
    addEventListeners() {
        window.addEventListener('resize', this.onResize);
        this._label.addEventListener('mouseenter', this.onHover);
        this._label.addEventListener('mouseleave', this.notonHover);
        this._label.addEventListener('dblclick', this.changelabeltext);
        this._container.addEventListener('wheel', this.onMove);
    }
    removeEventListeners() {
        window.removeEventListener('resize', this.onResize);
        this._label.removeEventListener('mouseenter', this.onHover);
        this._label.removeEventListener('mouseleave', this.notonHover);
        this._label.removeEventListener('dblclick', this.changelabeltext);
        this._container.removeEventListener('wheel', this.onMove);
    }
    //#endregion
    //#region Unique Methods
    onResize() {
        this.initScreenOffsets();
    }
    notonHover() {
        // this function is called when mouse leaves the label with "mouseleave" event
        this._labelHovered = false;
        this._container.style.cursor = 'default';
    }
    setlabeltext() {
        // called when the user creates a new arrow
        while (!this._labelText) {
            this._labelText = prompt('Please enter the annotation text', '');
        }
        this.displaylabel();
    }
    changelabeltext() {
        // called when the user does double click in the label
        this._labelText = prompt('Please enter a new annotation text', this._label.innerHTML);
        this.displaylabel();
    }
    displaylabel() {
        this._label.innerHTML =
            typeof this._labelText === 'string' && this._labelText.length > 0 // avoid error
                ? this._labelText
                : ''; // empty string is passed or Cancel is pressed
        // show the label (in css an empty string is used to revert display=none)
        this._label.style.display = '';
        this._dashLine.style.display = '';
        this._label.style.transform = `translate3D(
      ${this._handles[1].screenPosition.x - this._labelOffset.x - this._label.offsetWidth / 2}px,
      ${this._handles[1].screenPosition.y -
            this._labelOffset.y -
            this._label.offsetHeight / 2 -
            this._container.offsetHeight}px, 0)`;
    }
    //#endregion
    //#region Override Methods
    createMesh() {
        // material
        this._material = new THREE.LineBasicMaterial();
        this.updateMeshColor();
        // line geometry
        this._geometry = new THREE.Geometry();
        this._geometry.vertices.push(this._handles[0].worldPosition);
        this._geometry.vertices.push(this._handles[1].worldPosition);
        // line mesh
        this._meshLine = new THREE.Line(this._geometry, this._material);
        this._meshLine.visible = true;
        this.add(this._meshLine);
        // cone geometry
        this._coneGeometry = new THREE.CylinderGeometry(0, 2, 10);
        var up = new THREE.Vector3(0, 1, 0);
        // we want the cone to point in the direction of the face normal
        // determine an axis to rotate around
        // cross will not work if vec == +up or -up, so there is a special case
        if (this._hitNormal.y == 1 || this._hitNormal.y == -1) {
            var axis = new THREE.Vector3(1, 0, 0);
        }
        else {
            var axis = new THREE.Vector3().crossVectors(up, this._hitNormal);
        }
        // determine the amount to rotate
        var radians = Math.acos(this._hitNormal.dot(up));
        // create a rotation matrix that implements that rotation
        var mat = new THREE.Matrix4().makeRotationAxis(axis, radians);
        this._coneGeometry.translate(0, -5, 0);
        this._coneGeometry.rotateX(-Math.PI / 2);
        // cone mesh
        this._cone = new THREE.Mesh(this._coneGeometry, this._material);
        this._cone.visible = true;
        // apply the rotation to the cone
        this._cone.rotation.setFromRotationMatrix(mat);
        this.add(this._cone);
    }
    createDOM() {
        this._line = document.createElement('div');
        this._line.className = 'widgets-line';
        this._container.appendChild(this._line);
        this._dashLine = document.createElement('div');
        this._dashLine.className = 'widgets-dashline';
        this._dashLine.style.display = 'none';
        this._container.appendChild(this._dashLine);
        this._label = document.createElement('div');
        this._label.className = 'widgets-label';
        this._label.style.display = 'none';
        this._container.appendChild(this._label);
        this.updateDOMColor();
    }
    updateDOM() {
        this.updateDOMColor();
        // update line
        const lineData = this.getLineData(this._handles[0].screenPosition, this._handles[1].screenPosition);
        this._line.style.transform = `translate3D(${lineData.transformX}px, ${lineData.transformY}px, 0)
      rotate(${lineData.transformAngle}rad)`;
        this._line.style.width = lineData.length + 'px';
        // update label
        const paddingVector = lineData.line.multiplyScalar(0.5);
        const paddingPoint = this._handles[1].screenPosition.clone().sub(this._labelMoved
            ? this._labelOffset // if the label is moved, then its position is defined by labelOffset
            : paddingVector); // otherwise it's placed in the center of the line
        const labelPosition = this.adjustLabelTransform(this._label, paddingPoint);
        this._label.style.transform = `translate3D(${labelPosition.x}px, ${labelPosition.y}px, 0)`;
        // create the label without the interaction of the user. Useful when we need to create the label manually
        if (this._manuallabeldisplay) {
            this.displaylabel();
        }
        // update dash line
        let minLine = this.getLineData(this._handles[0].screenPosition, paddingPoint);
        let lineCL = this.getLineData(lineData.center, paddingPoint);
        let line1L = this.getLineData(this._handles[1].screenPosition, paddingPoint);
        if (minLine.length > lineCL.length) {
            minLine = lineCL;
        }
        if (minLine.length > line1L.length) {
            minLine = line1L;
        }
        this._dashLine.style.transform = `translate3D(${minLine.transformX}px, ${minLine.transformY}px, 0)
      rotate(${minLine.transformAngle}rad)`;
        this._dashLine.style.width = minLine.length + 'px';
    }
    onHover() {
        // this function is called when mouse enters the label with "mouseenter" event
        this._labelHovered = true;
        this._container.style.cursor = 'pointer';
    }
    onStart(evt) {
        if (this._labelHovered) {
            // if label hovered then it should be moved
            // save mouse coordinates offset from label center
            const offsets = this.getMouseOffsets(evt, this._container);
            const paddingPoint = this._handles[1].screenPosition.clone().sub(this._labelOffset);
            this._mouseLabelOffset = new THREE.Vector3(offsets.screenX - paddingPoint.x, offsets.screenY - paddingPoint.y, 0);
            this._moving = true;
            this._labelMoved = true;
        }
        this._handles[0].onStart(evt);
        this._handles[1].onStart(evt);
        this._active = this._handles[0].active || this._handles[1].active || this._labelHovered;
        this.update();
    }
    onMove(evt) {
        if (this._moving) {
            const offsets = this.getMouseOffsets(evt, this._container);
            this._labelOffset = new THREE.Vector3(this._handles[1].screenPosition.x - offsets.screenX + this._mouseLabelOffset.x, this._handles[1].screenPosition.y - offsets.screenY + this._mouseLabelOffset.y, 0);
            this._controls.enabled = false;
        }
        if (this._active) {
            this._dragged = true;
        }
        this._handles[0].onMove(evt, false);
        this._handles[1].onMove(evt, false);
        this._hovered = this._handles[0].hovered || this._handles[1].hovered || this._labelHovered;
        this.update();
    }
    onEnd() {
        this._handles[0].onEnd(); // First Handle
        // Second Handle
        if (this._dragged || !this._handles[1].tracking) {
            this._handles[1].tracking = false;
            this._handles[1].onEnd();
        }
        else {
            this._handles[1].tracking = false;
        }
        if (!this._dragged && this._active && this._initialized) {
            this._selected = !this._selected; // change state if there was no dragging
            this._handles[0].selected = this._selected;
            this._handles[1].selected = this._selected;
        }
        if (!this._initialized) {
            this._labelOffset = this._handles[1].screenPosition
                .clone()
                .sub(this._handles[0].screenPosition)
                .multiplyScalar(0.5);
            this.setlabeltext();
            this._initialized = true;
        }
        this._active = this._handles[0].active || this._handles[1].active;
        this._dragged = false;
        this._moving = false;
        this.update();
    }
    updateMeshPosition() {
        if (this._geometry) {
            this._geometry.verticesNeedUpdate = true;
        }
        if (this._cone) {
            this._cone.position.copy(this._handles[1].worldPosition);
            this._cone.lookAt(this._handles[0].worldPosition);
        }
    }
    free() {
        this.removeEventListeners();
        this._handles.forEach(h => {
            this.remove(h);
            h.free();
        });
        this._handles = [];
        this._container.removeChild(this._line);
        this._container.removeChild(this._dashLine);
        this._container.removeChild(this._label);
        // mesh, geometry, material
        this.remove(this._meshLine);
        this._meshLine.geometry.dispose();
        this._meshLine.geometry = null;
        this._meshLine.material.dispose();
        this._meshLine.material = null;
        this._meshLine = null;
        this._geometry.dispose();
        this._geometry = null;
        this._material.vertexShader = null;
        this._material.fragmentShader = null;
        this._material.uniforms = null;
        this._material.dispose();
        this._material = null;
        this.remove(this._cone);
        this._cone.geometry.dispose();
        this._cone.geometry = null;
        //this._cone.material.dispose();
        this._cone.material = null;
        this._cone = null;
        this._coneGeometry.dispose();
        this._coneGeometry = null;
        super.free();
    }
    hideDOM() {
        this._line.style.display = 'none';
        this._dashLine.style.display = 'none';
        this._label.style.display = 'none';
        this._handles.forEach(elem => elem.hideDOM());
    }
    showDOM() {
        this._line.style.display = '';
        this._dashLine.style.display = '';
        this._label.style.display = '';
        this._handles.forEach(elem => elem.showDOM());
    }
    updateDOMColor() {
        this._line.style.backgroundColor = this._color;
        this._dashLine.style.borderTop = '1.5px dashed ' + this._color;
        this._label.style.borderColor = this._color;
    }
    update() {
        this.updateColor();
        this._handles[0].update();
        this._handles[1].update();
        this.updateMeshColor();
        this.updateMeshPosition();
        this.updateDOM();
    }
}

//declare var THREE: any; // todo: https://github.com/byWulf/threejs-dice/issues/2
class WidgetAngle extends WidgetToolBase {
    //#endregion
    constructor(controls, params) {
        super(controls, params);
        //#region Variables
        this._opangle = null;
        this._defaultAngle = true;
        this._line2 = null;
        this._widgetType = 'Angle';
        for (let i = 0; i < 3; i++) {
            let handle = new WidgetHandle(controls, params);
            this.add(handle);
            this._handles.push(handle);
        }
        this._handles[1].active = true;
        this._handles[1].tracking = true;
        this._handles[2].active = true;
        this._handles[2].tracking = true;
        this._moveHandle = new WidgetHandle(controls, params);
        this.add(this._moveHandle);
        this._handles.push(this._moveHandle);
        this._moveHandle.hide();
        this.create();
        this.onMove = this.onMove.bind(this);
        this.onHover = this.onHover.bind(this);
        this.addEventListeners();
    }
    //#endregion
    //#region Getters / Setters
    set worldPosition(worldPosition) {
        this._handles[0].worldPosition.copy(worldPosition);
        this._handles[1].worldPosition.copy(worldPosition);
        this._handles[2].worldPosition.copy(worldPosition);
        this._worldPosition.copy(worldPosition);
        this.update();
    }
    get angle() {
        return this._opangle;
    }
    //#region Listeners
    addEventListeners() {
        this._container.addEventListener('wheel', this.onMove);
        this._line.addEventListener('mouseenter', this.onHover);
        this._line.addEventListener('mouseleave', this.onHover);
        this._line2.addEventListener('mouseenter', this.onHover);
        this._line2.addEventListener('mouseleave', this.onHover);
        this._label.addEventListener('mouseenter', this.onHover);
        this._label.addEventListener('mouseleave', this.onHover);
    }
    removeEventListeners() {
        this._container.removeEventListener('wheel', this.onMove);
        this._line.removeEventListener('mouseenter', this.onHover);
        this._line.removeEventListener('mouseleave', this.onHover);
        this._line2.removeEventListener('mouseenter', this.onHover);
        this._line2.removeEventListener('mouseleave', this.onHover);
        this._label.removeEventListener('mouseenter', this.onHover);
        this._label.removeEventListener('mouseleave', this.onHover);
    }
    //#endregion
    //#region Unique Methods
    hoverMesh() {
        // check raycast intersection, do we want to hover on mesh or just css?
    }
    hoverDom(evt) {
        this._domHovered = evt.type === 'mouseenter';
    }
    toggleDefaultAngle() {
        this._defaultAngle = !this._defaultAngle;
    }
    //#endregion
    //#region Override Methods
    onHover(evt) {
        if (evt) {
            this.hoverDom(evt);
        }
        this.hoverMesh();
        this._hovered =
            this._handles[0].hovered ||
                this._handles[1].hovered ||
                this._handles[2].hovered ||
                this._domHovered;
        this._container.style.cursor = this._hovered ? 'pointer' : 'default';
    }
    onStart(evt) {
        this._moveHandle.onMove(evt, true);
        this._handles[0].onStart(evt);
        this._handles[1].onStart(evt);
        this._handles[2].onStart(evt);
        this._active =
            this._handles[0].active ||
                this._handles[1].active ||
                this._handles[2].active ||
                this._domHovered;
        if (this._domHovered && !this._handles[1].tracking && !this._handles[2].tracking) {
            this._moving = true;
            this._controls.enabled = false;
        }
        this.update();
    }
    onMove(evt) {
        if (this._active) {
            const prevPosition = this._moveHandle.worldPosition.clone();
            this._dragged = true;
            this._moveHandle.onMove(evt, true);
            if (this._moving) {
                this._handles.slice(0, -1).forEach(handle => {
                    handle.worldPosition.add(this._moveHandle.worldPosition.clone().sub(prevPosition));
                });
            }
        }
        else {
            this.onHover(null);
        }
        this._handles[0].onMove(evt, false);
        this._handles[1].onMove(evt, false);
        this._handles[2].onMove(evt, false);
        this.update();
    }
    onEnd() {
        this._handles[0].onEnd(); // First Handle
        if ((this._handles[1].tracking &&
            this._handles[0].screenPosition.distanceTo(this._handles[1].screenPosition) < 10) ||
            (!this._handles[1].tracking &&
                this._handles[2].tracking &&
                this._handles[1].screenPosition.distanceTo(this._handles[2].screenPosition) < 10)) {
            return;
        }
        if (!this._dragged && this._active && !this._handles[2].tracking) {
            this._selected = !this._selected; // change state if there was no dragging
            this._handles[0].selected = this._selected;
        }
        // Third Handle
        if (this._handles[1].active) {
            this._handles[2].onEnd();
        }
        else if (this._dragged || !this._handles[2].tracking) {
            this._handles[2].tracking = false;
            this._handles[2].onEnd();
        }
        else {
            this._handles[2].tracking = false;
        }
        this._handles[2].selected = this._selected;
        // Second Handle
        if (this._dragged || !this._handles[1].tracking) {
            this._handles[1].tracking = false;
            this._handles[1].onEnd();
        }
        else {
            this._handles[1].tracking = false;
        }
        this._handles[1].selected = this._selected;
        this._active = this._handles[0].active || this._handles[1].active || this._handles[2].active;
        this._dragged = this._handles[2].tracking;
        this._moving = false;
        this.update();
    }
    updateMeshPosition() {
        if (this._geometry) {
            this._geometry.verticesNeedUpdate = true;
        }
    }
    updateDOMColor() {
        this._line.style.backgroundColor = this._color;
        this._line2.style.backgroundColor = this._color;
        this._label.style.borderColor = this._color;
    }
    createMesh() {
        // geometry
        this._geometry = new THREE.Geometry();
        this._geometry.vertices = [
            this._handles[0].worldPosition,
            this._handles[1].worldPosition,
            this._handles[1].worldPosition,
            this._handles[2].worldPosition,
        ];
        // material
        this._material = new THREE.LineBasicMaterial();
        this.updateMeshColor();
        // mesh
        this.mesh = new THREE.LineSegments(this._geometry, this._material);
        this.mesh.visible = true;
        this.add(this.mesh);
    }
    createDOM() {
        this._line = document.createElement('div');
        this._line.className = 'widgets-line';
        this._container.appendChild(this._line);
        this._line2 = document.createElement('div');
        this._line2.className = 'widgets-line';
        this._container.appendChild(this._line2);
        this._label = document.createElement('div');
        this._label.className = 'widgets-label';
        this._container.appendChild(this._label);
        this.updateDOMColor();
    }
    hideDOM() {
        this._line.style.display = 'none';
        this._line2.style.display = 'none';
        this._label.style.display = 'none';
        this._handles.forEach(elem => elem.hideDOM());
    }
    showDOM() {
        this._line.style.display = '';
        this._line2.style.display = '';
        this._label.style.display = '';
        this._handles[0].showDOM();
        this._handles[1].showDOM();
        this._handles[2].showDOM();
    }
    update() {
        this.updateColor();
        this._handles[0].update();
        this._handles[1].update();
        this._handles[2].update();
        // calculate values
        this._opangle =
            (this._handles[1].worldPosition
                .clone()
                .sub(this._handles[0].worldPosition)
                .angleTo(this._handles[1].worldPosition.clone().sub(this._handles[2].worldPosition)) *
                180) /
                Math.PI || 0.0;
        this._opangle = this._defaultAngle ? this._opangle : 360 - this._opangle;
        this.updateMeshColor();
        this.updateMeshPosition();
        this.updateDOM();
    }
    free() {
        this.removeEventListeners();
        this._handles.forEach(h => {
            this.remove(h);
            h.free();
        });
        this._handles = [];
        this._container.removeChild(this._line);
        this._container.removeChild(this._line2);
        this._container.removeChild(this._label);
        // mesh, geometry, material
        this.remove(this.mesh);
        this.mesh.geometry.dispose();
        this.mesh.geometry = null;
        this.mesh.material.dispose();
        this.mesh.material = null;
        this.mesh = null;
        this._geometry.dispose();
        this._geometry = null;
        this._material.vertexShader = null;
        this._material.fragmentShader = null;
        this._material.uniforms = null;
        this._material.dispose();
        this._material = null;
        super.free();
    }
    updateDOM() {
        this.updateDOMColor();
        // update first line
        const lineData = this.getLineData(this._handles[1].screenPosition, this._handles[0].screenPosition);
        this._line.style.transform = `translate3D(${lineData.transformX}px, ${lineData.transformY}px, 0)
          rotate(${lineData.transformAngle}rad)`;
        this._line.style.width = lineData.length + 'px';
        // update second line
        const line2Data = this.getLineData(this._handles[1].screenPosition, this._handles[2].screenPosition);
        this._line2.style.transform = `translate3D(${line2Data.transformX}px, ${line2Data.transformY}px, 0)
          rotate(${line2Data.transformAngle}rad)`;
        this._line2.style.width = line2Data.length + 'px';
        // update angle and label
        this._label.innerHTML = `${this._opangle.toFixed(2)}&deg;`;
        let paddingNormVector = lineData.line
            .clone()
            .add(line2Data.line)
            .normalize()
            .negate();
        let normAngle = paddingNormVector.angleTo(new THREE.Vector3(1, 0, 0));
        if (normAngle > Math.PI / 2) {
            normAngle = Math.PI - normAngle;
        }
        const labelPadding = Math.tan(normAngle) < this._label.offsetHeight / this._label.offsetWidth
            ? this._label.offsetWidth / 2 / Math.cos(normAngle) + 15 // 15px padding
            : this._label.offsetHeight / 2 / Math.cos(Math.PI / 2 - normAngle) + 15;
        const paddingPoint = this._handles[1].screenPosition
            .clone()
            .add(paddingNormVector.multiplyScalar(labelPadding));
        const transform = this.adjustLabelTransform(this._label, paddingPoint);
        this._label.style.transform = `translate3D(${transform.x}px, ${transform.y}px, 0)`;
    }
}

class AMIViewer {
    constructor() {
        this._camera_near = 0.05;
        this._camera_far = 10000;
        this._ambientLightColor = 0xd0d0d0;
        this._ambientLightIntensity = 1;
        this._distanceMultiplier = 10;
        this._directionalLight1Color = 0xffffff;
        this._directionalLight1Intensity = 0.75;
        this._directionalLight2Color = 0x002958;
        this._directionalLight2Intensity = 0.5;
        this._stlColor = 0xf44336;
        this._stlSpecular = 0x111111;
        this._stlShininess = 200;
        this._3DSceneDirty = false; // If true, indicates that the _render3D method needs to render the three.js scene. Saves unnecessary re-renders
        this._displayChanged = true; // if the display mode changes (see @watch decorator) this is set to true and the 3D scene is rebuilt onComponentWillUpdate
        this._orientationChanged = true; // if the orientation changes (see @watch decorator) reset the stack index to middle
        this._widgets = []; // todo: make this part of the state
        this._offsets = {
            left: 0,
            top: 0
        };
        this.srcLoaded = false;
    }
    watchDisplay() {
        this._displayChanged = true;
    }
    watchOrientation() {
        this._orientationChanged = true;
    }
    async setToolsVisible(visible) {
        this.appSetToolsVisible(visible);
    }
    async setOptionsVisible(visible) {
        this.appSetOptionsVisible(visible);
    }
    async setDisplay(display) {
        this.appSetDisplay(display);
    }
    // component about to render for first time
    componentWillLoad() {
        console.log('componentWillLoad');
        this.store.setStore(configureStore({}));
        this.store.mapStateToProps(this, (state) => {
            const { app: { src, display, srcLoaded, orientation, toolsVisible, toolsEnabled, toolType, optionsVisible, optionsEnabled } } = state;
            return {
                src,
                display,
                srcLoaded,
                orientation,
                toolsVisible,
                toolsEnabled,
                toolType,
                optionsVisible,
                optionsEnabled
            };
        });
        this.store.mapDispatchToProps(this, {
            appSetSrc,
            appSetDisplay,
            appSetSrcLoaded,
            appSetOrientation,
            appSetToolsVisible,
            appSetToolsEnabled,
            appSetToolType,
            appSetOptionsVisible,
            appSetOptionsEnabled
        });
    }
    // component has rendered for first time
    componentDidLoad() {
        console.log('componentDidLoad');
        const onWindowResize = () => {
            this.resize();
        };
        window.addEventListener('resize', onWindowResize, false);
        if (this.src) {
            this._loadSrc();
        }
    }
    // before render
    componentWillUpdate() {
        console.log('componentWillUpdate');
        if (this.srcLoaded && this._displayChanged) {
            // Create the LUT Helper
            this._lut = new AMI.LutHelper(this._lutCanvases);
            this._lut.luts = AMI.LutHelper.presetLuts();
            this._lut.lutsO = AMI.LutHelper.presetLutsO();
            // set which stackhelper is used depending on the display mode
            switch (this.display) {
                case Mode.VOLUME: {
                    // if there isn't a stackhelper
                    // or there's already a stackhelper, but it isn't for volumes
                    if (!this._stackhelper || (this._stackhelper && !this._stackhelper.isVolume)) {
                        console.log('create volume stackhelper');
                        this._stackhelper = new AMI.VolumeRenderingHelper(this._stack);
                        this._stackhelper.uniforms.uTextureLUT.value = this._lut.texture;
                        this._stackhelper.uniforms.uLut.value = 1;
                        // Colour the bounding box
                        // this._stackhelper.bbox.color = utils.colors.red;
                        // this._stackhelper.border.color = utils.colors.blue;
                        this._stackhelper.isVolume = true;
                    }
                    break;
                }
                case Mode.SLICES: {
                    // if there isn't a stackhelper
                    // or there's already a stackhelper, but it isn't for slices
                    if (!this._stackhelper || (this._stackhelper && !this._stackhelper.isSlice)) {
                        console.log('create slice stackhelper');
                        this._stackhelper = new AMI.StackHelper(this._stack);
                        // Colour the bounding box
                        this._stackhelper.bbox.color = utils.colors.red;
                        this._stackhelper.border.color = utils.colors.blue;
                        this._stackhelper.isSlice = true;
                    }
                    break;
                }
            }
        }
    }
    renderContainer() {
        return (h("div", null,
            h("div", { id: "lut-container" },
                h("div", { id: "lut-min" }, "0.0"),
                h("div", { id: "lut-canvases", ref: (el) => this._lutCanvases = el }),
                h("div", { id: "lut-max" }, "1.0")),
            h("div", { id: "container", ref: (el) => this._canvasContainer = el })));
    }
    renderControlPanel() {
        if (this.srcLoaded) {
            if (this.display !== Mode.MESH) {
                const slicesIndexMin = 0;
                const slicesIndexMax = this._stackhelper.orientationMaxIndex || this._stack.dimensionsIJK.z - 1;
                const mid = Math.floor(slicesIndexMax / 2);
                const slicesIndex = mid;
                if (this._orientationChanged) {
                    this._orientationChanged = false;
                    this._stackhelper.index = mid;
                }
                const slicesWindowWidthMin = 1;
                const slicesWindowWidthMax = this._stack.minMax[1] - this._stack.minMax[0];
                const slicesWindowWidth = slicesWindowWidthMax / 2;
                const slicesWindowCenterMin = this._stack.minMax[0];
                const slicesWindowCenterMax = this._stack.minMax[1];
                const slicesWindowCenter = slicesWindowCenterMax / 2;
                const volumeStepsMin = 0;
                const volumeStepsMax = 64;
                const volumeSteps = 16;
                const volumeWindowWidthMin = 1;
                const volumeWindowWidthMax = this._stack.minMax[1] - this._stack.minMax[0];
                const volumeWindowWidth = volumeWindowWidthMax / 2;
                const volumeWindowCenterMin = this._stack.minMax[0];
                const volumeWindowCenterMax = this._stack.minMax[1];
                const volumeWindowCenter = volumeWindowCenterMax / 2;
                const volumeLuts = this._lut.lutsAvailable().join(',');
                return h("control-panel", { display: this.display, "tools-visible": this.toolsVisible, "tools-enabled": this.toolsEnabled, "options-visible": this.optionsVisible, "options-enabled": this.optionsEnabled, "slices-index-min": slicesIndexMin, "slices-index-max": slicesIndexMax, "slices-index": slicesIndex, "slices-orientation": this.orientation, "slices-window-width-min": slicesWindowWidthMin, "slices-window-width-max": slicesWindowWidthMax, "slices-window-width": slicesWindowWidth, "slices-window-center-min": slicesWindowCenterMin, "slices-window-center-max": slicesWindowCenterMax, "slices-window-center": slicesWindowCenter, "volume-steps-min": volumeStepsMin, "volume-steps-max": volumeStepsMax, "volume-steps": volumeSteps, "volume-window-width-min": volumeWindowWidthMin, "volume-window-width-max": volumeWindowWidthMax, "volume-window-width": volumeWindowWidth, "volume-window-center-min": volumeWindowCenterMin, "volume-window-center-max": volumeWindowCenterMax, "volume-window-center": volumeWindowCenter, "volume-luts": volumeLuts });
            }
            else {
                return h("control-panel", { display: this.display, "tools-visible": this.toolsVisible, "tools-enabled": this.toolsEnabled, "options-visible": this.optionsVisible, "options-enabled": this.optionsEnabled });
            }
        }
        return null;
    }
    render() {
        console.log('render');
        return (h("div", null,
            this.renderContainer(),
            this.renderControlPanel()));
    }
    // after render, create an entirely new three.js scene
    componentDidUpdate() {
        console.log('componentDidUpdate');
        if (!this.srcLoaded) {
            this._loadSrc();
        }
        else if (this._displayChanged) {
            console.log('rebuild 3d scene');
            this._displayChanged = false;
            cancelAnimationFrame(this._requestAnimationFrame); // Stop the animation (if there is one already)
            this._canvasContainer.innerHTML = "";
            this._createRenderer();
            this._scene = new THREE.Scene();
            this._objectParent = new THREE.Object3D();
            this._scene.add(this._objectParent);
            if (this._stackhelper) {
                this._scene.add(this._stackhelper);
            }
            if (this.display === Mode.MESH) {
                switch (this._ext) {
                    case MeshFileType.GLTF: {
                        GLTFFileTypeHandler.setup(this._objectParent, this._obj, this._renderer);
                        break;
                    }
                    case MeshFileType.STL: {
                        STLFileTypeHandler.setup(this._objectParent, this._obj, {
                            color: this._stlColor,
                            specular: this._stlSpecular,
                            shininess: this._stlShininess
                        });
                        break;
                    }
                    default: {
                        throw new Error("When setting 'src' to a mesh file you must set 'display' to 'mesh'");
                    }
                }
                // todo: can this be used for slices and volumetric bounding boxes?
                utils.scaleAndPositionObject(this._objectParent);
            }
            // get bounding box
            switch (this.display) {
                case (Mode.MESH): {
                    this._boundingBox = this._objectParent;
                    this._scene.add(new THREE.BoxHelper(this._boundingBox, new THREE.Color(utils.colors.red)));
                    break;
                }
                case (Mode.VOLUME): {
                    this._boundingBox = this._stackhelper._mesh;
                    this._scene.add(new THREE.BoxHelper(this._boundingBox, new THREE.Color(utils.colors.red)));
                    break;
                }
                case (Mode.SLICES): {
                    this._boundingBox = this._stackhelper._bBox;
                    break;
                }
            }
            this._createLights();
            this._createCamera();
            this._createControls();
            this._createWidgets();
            this._animate();
            this.resize();
            this.onLoaded.emit(this._stackhelper);
            this._3DSceneDirty = true;
        }
    }
    // load the src
    _loadSrc() {
        console.log('loadSrc');
        utils.srcLoader(this.src).then((parsedJSON) => {
            this._loadObject(parsedJSON).then((obj) => {
                // todo: is this a reducer?
                switch (this.display) {
                    case Mode.MESH: {
                        this._obj = obj;
                        this._stack = null;
                        break;
                    }
                    default: {
                        this._obj = null;
                        this._stack = obj;
                        break;
                    }
                }
                this.appSetSrcLoaded(true);
            });
        });
    }
    // Load an object based on file extension
    _loadObject(parsedJSON) {
        const objectPath = parsedJSON[0];
        this._ext = objectPath.substring(objectPath.lastIndexOf('.') + 1);
        // If the file is recognised as a supported MESH type, use mesh loading
        if (Object.values(MeshFileType).includes(this._ext)) {
            if (this.display !== Mode.MESH) {
                throw new Error("When setting 'src' to a mesh file you must set 'display' to 'mesh'");
            }
            else {
                return this._loadMesh(objectPath);
            }
        }
        else {
            // otherwise default to slices/volume
            return this._loadSeries(parsedJSON);
        }
    }
    // Load a given DICOM/Nifti from the file extension
    _loadSeries(seriesJSON) {
        return new Promise((resolve) => {
            const loader = new AMI.VolumeLoader(this._canvasContainer);
            loader
                .load(seriesJSON)
                .then(() => {
                const src = loader.data[0].mergeSeries(loader.data);
                const stack = src[0].stack[0];
                loader.free();
                resolve(stack); // loadSeries returns a stack, loadMesh returns a mesh
            })
                .catch(error => {
                console.log('DICOM load error');
                console.error(error);
            });
        });
    }
    // Load a given mesh (gltf, stl) from the file extension
    _loadMesh(objectPath) {
        return new Promise((resolve) => {
            let loader;
            switch (this._ext) {
                case MeshFileType.GLTF:
                    loader = new THREE.GLTFLoader();
                    THREE.DRACOLoader.setDecoderPath(this.dracoDecoderPath);
                    loader.setDRACOLoader(new THREE.DRACOLoader());
                    break;
                case MeshFileType.STL:
                    loader = new THREE.STLLoader();
                    break;
                default:
                    throw new Error('Unrecognised mesh format. You may need to set display to "slices" or "volume"');
            }
            if (loader.setCrossOrigin) {
                loader.setCrossOrigin('anonymous');
            }
            loader.load(objectPath, (obj) => {
                resolve(obj); // loadSeries returns a stack, loadMesh returns a mesh
            }, (e) => {
                if (e.lengthComputable) {
                    console.log('loading: ', e.loaded / e.total + '%');
                }
            }, (e) => {
                // error
                console.error(e);
            });
        });
    }
    // Create ambient scene lights
    _createLights() {
        this._lightGroup = new THREE.Object3D();
        const light1 = new THREE.DirectionalLight(this._directionalLight1Color, this._directionalLight1Intensity);
        light1.position.set(1, 1, 1);
        this._lightGroup.add(light1);
        const light2 = new THREE.DirectionalLight(this._directionalLight2Color, this._directionalLight2Intensity);
        light2.position.set(-1, -1, -1);
        this._lightGroup.add(light2);
        const ambientLight = new THREE.AmbientLight(this._ambientLightColor, this._ambientLightIntensity);
        this._lightGroup.add(ambientLight);
        this._scene.add(this._lightGroup);
    }
    // Create the THREEJS Renderer (same for mesh, slices, and volume)
    _createRenderer() {
        this._renderer = new THREE.WebGLRenderer({
            alpha: true,
        });
        this._renderer.setSize(this._canvasContainer.offsetWidth, this._canvasContainer.offsetHeight);
        this._renderer.setClearColor(utils.colors.black, 1);
        this._renderer.setPixelRatio(window.devicePixelRatio);
        this._canvasContainer.appendChild(this._renderer.domElement);
        this._renderer.domElement.addEventListener('wheel', this._onWheel.bind(this));
    }
    // Adjust the scene zoom based on wheel rotation
    _onWheel() {
        switch (this.display) {
            case Mode.MESH: {
                break;
            }
            default: {
                if (!this._wheel) {
                    this._renderer.setPixelRatio(0.1 * window.devicePixelRatio);
                    this._renderer.setSize(this._canvasContainer.offsetWidth, this._canvasContainer.offsetHeight);
                    this._wheel = Date.now();
                }
                if (Date.now() - this._wheel < 300) {
                    clearTimeout(this._wheelTO);
                    this._wheelTO = setTimeout(() => {
                        this._renderer.setPixelRatio(0.5 * window.devicePixelRatio);
                        this._renderer.setSize(this._canvasContainer.offsetWidth, this._canvasContainer.offsetHeight);
                        this._3DSceneDirty = true;
                        setTimeout(() => {
                            this._renderer.setPixelRatio(window.devicePixelRatio);
                            this._renderer.setSize(this._canvasContainer.offsetWidth, this._canvasContainer.offsetHeight);
                            this._wheel = null;
                            this._3DSceneDirty = true;
                        }, 100);
                    }, 300);
                }
                this._3DSceneDirty = true;
                break;
            }
        }
    }
    // Create the THREEJS Camera
    _createCamera() {
        const fov = utils.getFov(this._boundingBox, this._distanceMultiplier);
        this._camera = new THREE.PerspectiveCamera(fov, this._getAspectRatio(), this._camera_near, this._camera_far);
        const cameraZ = utils.getCameraZ(this._boundingBox, this._distanceMultiplier);
        this._camera.position.z = cameraZ;
    }
    // Get the aspect ratio of the container
    _getAspectRatio() {
        return this._canvasContainer.offsetWidth / this._canvasContainer.offsetHeight;
    }
    // Create the AMI Trackball controls
    _createControls() {
        this._controls = new AMI.TrackballControl(this._camera, this._canvasContainer);
        this._controls.addEventListener('change', this._onControlsChange.bind(this));
        this._controls.addEventListener('start', this._onControlsStart.bind(this));
        this._controls.addEventListener('end', this._onControlsEnd.bind(this));
        switch (this.display) {
            case Mode.MESH: {
                break;
            }
            default: {
                this._controls.rotateSpeed = 5.5;
                this._controls.zoomSpeed = 1.2;
                this._controls.panSpeed = 0.8;
                this._controls.staticMoving = true;
                this._controls.dynamicDampingFactor = 0.3;
                break;
            }
        }
    }
    // Fire when controls are changed
    _onControlsChange() {
        this._3DSceneDirty = true;
    }
    // Fire when controls start
    _onControlsStart() {
        switch (this.display) {
            case Mode.MESH: {
                break;
            }
            default: {
                if (this._stackhelper && this._stackhelper.uniforms && !this._wheel) {
                    this._renderer.setPixelRatio(0.1 * window.devicePixelRatio);
                    this._renderer.setSize(this._canvasContainer.offsetWidth, this._canvasContainer.offsetHeight);
                    this._3DSceneDirty = true;
                }
            }
        }
    }
    // Fire when controls end
    _onControlsEnd() {
        switch (this.display) {
            case Mode.MESH: {
                break;
            }
            default: {
                if (this._stackhelper && this._stackhelper.uniforms && !this._wheel) {
                    this._renderer.setPixelRatio(0.5 * window.devicePixelRatio);
                    this._renderer.setSize(this._canvasContainer.offsetWidth, this._canvasContainer.offsetHeight);
                    this._3DSceneDirty = true;
                    setTimeout(() => {
                        this._renderer.setPixelRatio(window.devicePixelRatio);
                        this._renderer.setSize(this._canvasContainer.offsetWidth, this._canvasContainer.offsetHeight);
                        this._3DSceneDirty = true;
                    }, 100);
                }
                break;
            }
        }
    }
    // Animate the scene (refresh)
    _animate() {
        this._controls.update();
        this._render3D();
        this._requestAnimationFrame = requestAnimationFrame(() => {
            this._animate();
        });
    }
    // Render 3D Components in the scene
    _render3D() {
        if (this.srcLoaded && this._3DSceneDirty) {
            this._updateWidgets();
            this._renderer.render(this._scene, this._camera);
            this._3DSceneDirty = false;
        }
    }
    // Resize the scene & widgets
    resize() {
        if (this.srcLoaded) {
            this._camera.aspect = this._canvasContainer.offsetWidth / this._canvasContainer.offsetHeight;
            this._camera.updateProjectionMatrix();
            this._renderer.setSize(this._canvasContainer.offsetWidth, this._canvasContainer.offsetHeight);
            this._resizeWidgets();
        }
    }
    // Create widget event listeners for mouse movement & clicks
    _createWidgets() {
        this._canvasContainer.addEventListener('mouseup', () => {
            if (this.toolsEnabled) {
                // if something hovered, exit
                for (let widget of this._widgets) {
                    if (widget.active) {
                        widget.onEnd();
                        return;
                    }
                }
                this._controls.enabled = true;
                this._3DSceneDirty = true;
            }
        });
        this._canvasContainer.addEventListener('mousemove', (evt) => {
            if (this.toolsEnabled) {
                // if something hovered, exit
                let cursor = 'default';
                for (let widget of this._widgets) {
                    widget.onMove(evt);
                    if (widget.hovered) {
                        cursor = 'pointer';
                    }
                }
                this._canvasContainer.style.cursor = cursor;
                this._3DSceneDirty = true;
            }
        });
        this._canvasContainer.addEventListener('mousedown', (evt) => {
            if (this.toolsEnabled) {
                // if something hovered, exit
                for (let widget of this._widgets) {
                    if (widget.hovered) {
                        widget.onStart(evt);
                        return;
                    }
                }
                if (this._castRay(evt) === 0) {
                    this._controls.enabled = false;
                    this._3DSceneDirty = true;
                }
                this._canvasContainer.style.cursor = 'default';
            }
        });
    }
    // Update widgets
    _updateWidgets() {
        for (let widget of this._widgets) {
            widget.update();
        }
    }
    // Resize all widgets in the scene
    _resizeWidgets() {
        this._setOffsets();
        this._updateWidgets();
        this._3DSceneDirty = true;
    }
    // Set the screenspace offsets
    _setOffsets() {
        const box = this._canvasContainer.getBoundingClientRect();
        const body = document.body;
        const docEl = document.documentElement;
        const scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
        const scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;
        const clientTop = docEl.clientTop || body.clientTop || 0;
        const clientLeft = docEl.clientLeft || body.clientLeft || 0;
        const top = box.top + scrollTop - clientTop;
        const left = box.left + scrollLeft - clientLeft;
        this._offsets = {
            top: Math.round(top),
            left: Math.round(left),
        };
    }
    // Cast a ray to check for screen-space collisions
    _castRay(evt) {
        // Ensure offsets are valid
        this._setOffsets();
        // Get mouse position from click
        let mouse = {
            x: ((evt.clientX - this._offsets.left) / this._canvasContainer.offsetWidth) * 2 - 1,
            y: -((evt.clientY - this._offsets.top) / this._canvasContainer.offsetHeight) * 2 + 1,
        };
        // Create THREEJS raycaster to handle worldSpace direction & origin vectors
        let raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(mouse, this._camera);
        // Empty return arrays for the fastVoxelRaycast library
        var hit_position = new THREE.Vector3(0, 0, 0); // Array of X, Y, Z
        var hit_normal = new THREE.Vector3(0, 0, 0); // Array of X, Y, Z
        switch (this.display) {
            case Mode.MESH: {
                let intersects = raycaster.intersectObjects(this._scene.children, true);
                if (intersects.length <= 0) {
                    console.log('no geometry was struck');
                    return 1;
                }
                break;
            }
            case Mode.SLICES: {
                let sliceHelper = this._stackhelper;
                let intersects = raycaster.intersectObject(sliceHelper.slice.mesh);
                if (intersects.length <= 0) {
                    console.log('no slice was struck');
                    return 1;
                }
                hit_position = intersects[0].point;
                break;
            }
            case Mode.VOLUME: {
                let volumeHelper = this._stackhelper;
                var ray_result = AMIRay(volumeHelper, raycaster.ray.origin, raycaster.ray.direction, this._camera.far, hit_position, hit_normal);
                if (ray_result === 0) {
                    console.log('no truthy voxel was struck');
                    return 1;
                }
                break;
            }
        }
        let widget = null;
        // TODO: REFACTOR ANGLE & ANNOTATION WIDGETS
        var geometry = new THREE.SphereGeometry(0.000001, 4, 4);
        var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        var targ_mesh = new THREE.Mesh(geometry, material);
        switch (this.toolType) {
            case ToolType.RULER:
                if (this.display === Mode.MESH) {
                    return 1;
                }
                widget = new WidgetRuler(this._controls, {
                    lps2IJK: this._stackhelper.stack.lps2IJK,
                    pixelSpacing: 1.0,
                    worldPosition: hit_position,
                });
                break;
            case ToolType.ANGLE:
                widget = new WidgetAngle(this._controls, {
                    worldPosition: hit_position,
                });
                break;
            case ToolType.ANNOTATION:
                widget = new WidgetAnnotation(this._controls, {
                    worldPosition: hit_position
                }, hit_normal, utils.getBoundingMag(this._boundingBox));
                break;
            default:
                if (this.display === Mode.MESH) {
                    return 1;
                }
                widget = new WidgetRuler(this._controls, {
                    lps2IJK: this._stackhelper.stack.lps2IJK,
                    pixelSpacing: 1.0,
                    worldPosition: hit_position,
                });
        }
        this._widgets.push(widget);
        this._scene.add(widget);
        return 0;
    }
    displayChanged(event) {
        const mode = event.detail;
        this.appSetDisplay(mode);
    }
    sliceIndexChanged(e) {
        this._stackhelper.index = e.detail;
        if (this._windowWidth !== undefined) {
            this._stackhelper.slice.windowWidth = this._windowWidth;
        }
        if (this._windowCenter !== undefined) {
            this._stackhelper.slice.windowCenter = this._windowCenter;
        }
        this._3DSceneDirty = true;
    }
    slicesOrientationChanged(e) {
        const orientation = Number(e.detail);
        this._stackhelper.orientation = orientation;
        this.appSetOrientation(orientation);
        this._3DSceneDirty = true;
    }
    slicesWindowWidthChanged(e) {
        this._windowWidth = e.detail; // should windowWidth be added to redux store?
        this._stackhelper.slice.windowWidth = this._windowWidth;
        this._3DSceneDirty = true;
    }
    slicesWindowCenterChanged(e) {
        this._windowCenter = e.detail; // should windowCenter be added to redux store?
        this._stackhelper.slice.windowCenter = this._windowCenter;
        this._3DSceneDirty = true;
    }
    volumeStepsChanged(e) {
        this._stackhelper.uniforms.uSteps.value = e.detail;
        this._3DSceneDirty = true;
    }
    volumeWindowWidthChanged(e) {
        this._stackhelper.windowWidth = e.detail;
        this._3DSceneDirty = true;
    }
    volumeWindowCenterChanged(e) {
        this._stackhelper.windowCenter = e.detail;
        this._3DSceneDirty = true;
    }
    volumeLutChanged(e) {
        this._stackhelper.uniforms.uTextureLUT.value.dispose();
        console.log(e);
        //this._stackhelper.uniforms.uTextureLUT.value = params.lut.texture;
        this._3DSceneDirty = true;
    }
    toolsEnabledChanged(e) {
        this.appSetToolsEnabled(e.detail);
        this._3DSceneDirty = true;
    }
    optionsEnabledChanged(e) {
        this.appSetOptionsEnabled(e.detail);
        this._3DSceneDirty = true;
    }
    toolTypeChanged(e) {
        this.appSetToolType(e.detail);
        this._3DSceneDirty = true;
    }
    static get is() { return "ami-viewer"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "display": {
            "type": String,
            "attr": "display",
            "mutable": true,
            "watchCallbacks": ["watchDisplay"]
        },
        "dracoDecoderPath": {
            "type": String,
            "attr": "draco-decoder-path"
        },
        "optionsEnabled": {
            "type": Boolean,
            "attr": "options-enabled",
            "mutable": true
        },
        "optionsVisible": {
            "type": Boolean,
            "attr": "options-visible",
            "mutable": true
        },
        "orientation": {
            "type": Number,
            "attr": "orientation",
            "mutable": true,
            "watchCallbacks": ["watchOrientation"]
        },
        "resize": {
            "method": true
        },
        "setDisplay": {
            "method": true
        },
        "setOptionsVisible": {
            "method": true
        },
        "setToolsVisible": {
            "method": true
        },
        "src": {
            "type": String,
            "attr": "src",
            "mutable": true
        },
        "srcLoaded": {
            "state": true
        },
        "store": {
            "context": "store"
        },
        "toolsEnabled": {
            "type": Boolean,
            "attr": "tools-enabled",
            "mutable": true
        },
        "toolsVisible": {
            "type": Boolean,
            "attr": "tools-visible",
            "mutable": true
        },
        "toolType": {
            "type": String,
            "attr": "tool-type",
            "mutable": true
        }
    }; }
    static get events() { return [{
            "name": "onLoaded",
            "method": "onLoaded",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get listeners() { return [{
            "name": "onDisplayChanged",
            "method": "displayChanged"
        }, {
            "name": "onSliceIndexChanged",
            "method": "sliceIndexChanged"
        }, {
            "name": "onSliceOrientationChanged",
            "method": "slicesOrientationChanged"
        }, {
            "name": "onSliceWindowWidthChanged",
            "method": "slicesWindowWidthChanged"
        }, {
            "name": "onSliceWindowCenterChanged",
            "method": "slicesWindowCenterChanged"
        }, {
            "name": "onVolumeStepsChanged",
            "method": "volumeStepsChanged"
        }, {
            "name": "onVolumeWindowWidthChanged",
            "method": "volumeWindowWidthChanged"
        }, {
            "name": "onVolumeWindowCenterChanged",
            "method": "volumeWindowCenterChanged"
        }, {
            "name": "onVolumeLutChanged",
            "method": "volumeLutChanged"
        }, {
            "name": "onToolsEnabledChanged",
            "method": "toolsEnabledChanged"
        }, {
            "name": "onOptionsEnabledChanged",
            "method": "optionsEnabledChanged"
        }, {
            "name": "onToolTypeChanged",
            "method": "toolTypeChanged"
        }]; }
    static get style() { return "ami-viewer {\n  background-color: #000;\n}\n\n#container {\n  left: 0;\n  right: 0;\n  top: 0;\n  bottom: 0;\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  overflow: hidden;\n}\n\n#debug {\n  position: fixed;\n  top: 0;\n  right: 0;\n}\n\n#lut-container {\n  display: none;\n}\n\n.widgets-handle {\n  position: absolute;\n  border: 1px solid;\n  border-radius: 50%;\n  width: 10px;\n  height: 10px;\n  margin: -6px; /* border + width / 2 */\n  z-index: 3;\n}\n.widgets-line {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  margin-top: -0.5px; /* height / 2 */\n}\n.widgets-dashline {\n  position: absolute;\n  border-top: 1px dashed;\n  margin-top: -0.5px; /* border / 2 */\n}\n.widgets-line:before,\n.widgets-dashline:before { /* for dragging */\n  content: \" \";\n  position: absolute;\n  height: 12px;\n  left: 0;\n  right: 0;\n  margin-top: -6px;\n}\n.widgets-rectangle {\n  position: absolute;\n  border: 1px solid;\n  margin: -1px; /* border */\n}\n.widgets-rectangle-helper {\n  position: absolute;\n  border: 1px dashed;\n  margin: -1px; /* border */\n}\n.widgets-ellipse {\n  position: absolute;\n  border: 1px solid;\n  border-radius: 50%;\n  margin: -1px; /* border */\n  z-index: 2;\n}\n.widgets-label {\n  position: absolute;\n  border: 1px solid;\n  background-color: rgba(0, 0, 0, 0.7);\n  color: rgb(255, 255, 255);\n  padding: 4px;\n  z-index: 3;\n}"; }
}

export { AMIViewer as AmiViewer };
