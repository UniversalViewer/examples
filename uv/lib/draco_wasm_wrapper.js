var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.defineProperty =
  $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties
    ? Object.defineProperty
    : function(c, f, n) {
        c != Array.prototype && c != Object.prototype && (c[f] = n.value);
      };
$jscomp.getGlobal = function(c) {
  return "undefined" != typeof window && window === c
    ? c
    : "undefined" != typeof global && null != global
    ? global
    : c;
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.polyfill = function(c, f, n, D) {
  if (f) {
    n = $jscomp.global;
    c = c.split(".");
    for (D = 0; D < c.length - 1; D++) {
      var g = c[D];
      g in n || (n[g] = {});
      n = n[g];
    }
    c = c[c.length - 1];
    D = n[c];
    f = f(D);
    f != D &&
      null != f &&
      $jscomp.defineProperty(n, c, {
        configurable: !0,
        writable: !0,
        value: f
      });
  }
};
$jscomp.polyfill(
  "Math.imul",
  function(c) {
    return c
      ? c
      : function(f, c) {
          f = Number(f);
          c = Number(c);
          var n = f & 65535,
            g = c & 65535;
          return (
            (n * g +
              (((((f >>> 16) & 65535) * g + n * ((c >>> 16) & 65535)) << 16) >>>
                0)) |
            0
          );
        };
  },
  "es6",
  "es3"
);
$jscomp.polyfill(
  "Math.clz32",
  function(c) {
    return c
      ? c
      : function(f) {
          f = Number(f) >>> 0;
          if (0 === f) return 32;
          var c = 0;
          0 === (f & 4294901760) && ((f <<= 16), (c += 16));
          0 === (f & 4278190080) && ((f <<= 8), (c += 8));
          0 === (f & 4026531840) && ((f <<= 4), (c += 4));
          0 === (f & 3221225472) && ((f <<= 2), (c += 2));
          0 === (f & 2147483648) && c++;
          return c;
        };
  },
  "es6",
  "es3"
);
$jscomp.polyfill(
  "Math.trunc",
  function(c) {
    return c
      ? c
      : function(c) {
          c = Number(c);
          if (isNaN(c) || Infinity === c || -Infinity === c || 0 === c)
            return c;
          var f = Math.floor(Math.abs(c));
          return 0 > c ? -f : f;
        };
  },
  "es6",
  "es3"
);
$jscomp.SYMBOL_PREFIX = "jscomp_symbol_";
$jscomp.initSymbol = function() {
  $jscomp.initSymbol = function() {};
  $jscomp.global.Symbol || ($jscomp.global.Symbol = $jscomp.Symbol);
};
$jscomp.symbolCounter_ = 0;
$jscomp.Symbol = function(c) {
  return $jscomp.SYMBOL_PREFIX + (c || "") + $jscomp.symbolCounter_++;
};
$jscomp.initSymbolIterator = function() {
  $jscomp.initSymbol();
  var c = $jscomp.global.Symbol.iterator;
  c || (c = $jscomp.global.Symbol.iterator = $jscomp.global.Symbol("iterator"));
  "function" != typeof Array.prototype[c] &&
    $jscomp.defineProperty(Array.prototype, c, {
      configurable: !0,
      writable: !0,
      value: function() {
        return $jscomp.arrayIterator(this);
      }
    });
  $jscomp.initSymbolIterator = function() {};
};
$jscomp.arrayIterator = function(c) {
  var f = 0;
  return $jscomp.iteratorPrototype(function() {
    return f < c.length ? { done: !1, value: c[f++] } : { done: !0 };
  });
};
$jscomp.iteratorPrototype = function(c) {
  $jscomp.initSymbolIterator();
  c = { next: c };
  c[$jscomp.global.Symbol.iterator] = function() {
    return this;
  };
  return c;
};
$jscomp.makeIterator = function(c) {
  $jscomp.initSymbolIterator();
  var f = c[Symbol.iterator];
  return f ? f.call(c) : $jscomp.arrayIterator(c);
};
$jscomp.FORCE_POLYFILL_PROMISE = !1;
$jscomp.polyfill(
  "Promise",
  function(c) {
    function f() {
      this.batch_ = null;
    }
    function n(c) {
      return c instanceof g
        ? c
        : new g(function(f, R) {
            f(c);
          });
    }
    if (c && !$jscomp.FORCE_POLYFILL_PROMISE) return c;
    f.prototype.asyncExecute = function(c) {
      null == this.batch_ && ((this.batch_ = []), this.asyncExecuteBatch_());
      this.batch_.push(c);
      return this;
    };
    f.prototype.asyncExecuteBatch_ = function() {
      var c = this;
      this.asyncExecuteFunction(function() {
        c.executeBatch_();
      });
    };
    var D = $jscomp.global.setTimeout;
    f.prototype.asyncExecuteFunction = function(c) {
      D(c, 0);
    };
    f.prototype.executeBatch_ = function() {
      for (; this.batch_ && this.batch_.length; ) {
        var c = this.batch_;
        this.batch_ = [];
        for (var f = 0; f < c.length; ++f) {
          var g = c[f];
          delete c[f];
          try {
            g();
          } catch (v) {
            this.asyncThrow_(v);
          }
        }
      }
      this.batch_ = null;
    };
    f.prototype.asyncThrow_ = function(c) {
      this.asyncExecuteFunction(function() {
        throw c;
      });
    };
    var g = function(c) {
      this.state_ = 0;
      this.result_ = void 0;
      this.onSettledCallbacks_ = [];
      var f = this.createResolveAndReject_();
      try {
        c(f.resolve, f.reject);
      } catch (u) {
        f.reject(u);
      }
    };
    g.prototype.createResolveAndReject_ = function() {
      function c(c) {
        return function(R) {
          g || ((g = !0), c.call(f, R));
        };
      }
      var f = this,
        g = !1;
      return { resolve: c(this.resolveTo_), reject: c(this.reject_) };
    };
    g.prototype.resolveTo_ = function(c) {
      if (c === this)
        this.reject_(new TypeError("A Promise cannot resolve to itself"));
      else if (c instanceof g) this.settleSameAsPromise_(c);
      else {
        a: switch (typeof c) {
          case "object":
            var f = null != c;
            break a;
          case "function":
            f = !0;
            break a;
          default:
            f = !1;
        }
        f ? this.resolveToNonPromiseObj_(c) : this.fulfill_(c);
      }
    };
    g.prototype.resolveToNonPromiseObj_ = function(c) {
      var f = void 0;
      try {
        f = c.then;
      } catch (u) {
        this.reject_(u);
        return;
      }
      "function" == typeof f
        ? this.settleSameAsThenable_(f, c)
        : this.fulfill_(c);
    };
    g.prototype.reject_ = function(c) {
      this.settle_(2, c);
    };
    g.prototype.fulfill_ = function(c) {
      this.settle_(1, c);
    };
    g.prototype.settle_ = function(c, f) {
      if (0 != this.state_)
        throw Error(
          ("Cannot settle(" + c + ", " + f) |
            ("): Promise already settled in state" + this.state_)
        );
      this.state_ = c;
      this.result_ = f;
      this.executeOnSettledCallbacks_();
    };
    g.prototype.executeOnSettledCallbacks_ = function() {
      if (null != this.onSettledCallbacks_) {
        for (var c = this.onSettledCallbacks_, f = 0; f < c.length; ++f)
          c[f].call(), (c[f] = null);
        this.onSettledCallbacks_ = null;
      }
    };
    var ha = new f();
    g.prototype.settleSameAsPromise_ = function(c) {
      var f = this.createResolveAndReject_();
      c.callWhenSettled_(f.resolve, f.reject);
    };
    g.prototype.settleSameAsThenable_ = function(c, f) {
      var g = this.createResolveAndReject_();
      try {
        c.call(f, g.resolve, g.reject);
      } catch (v) {
        g.reject(v);
      }
    };
    g.prototype.then = function(c, f) {
      function n(c, f) {
        return "function" == typeof c
          ? function(f) {
              try {
                v(c(f));
              } catch (aa) {
                R(aa);
              }
            }
          : f;
      }
      var v,
        R,
        D = new g(function(c, f) {
          v = c;
          R = f;
        });
      this.callWhenSettled_(n(c, v), n(f, R));
      return D;
    };
    g.prototype.catch = function(c) {
      return this.then(void 0, c);
    };
    g.prototype.callWhenSettled_ = function(c, f) {
      function g() {
        switch (n.state_) {
          case 1:
            c(n.result_);
            break;
          case 2:
            f(n.result_);
            break;
          default:
            throw Error("Unexpected state: " + n.state_);
        }
      }
      var n = this;
      null == this.onSettledCallbacks_
        ? ha.asyncExecute(g)
        : this.onSettledCallbacks_.push(function() {
            ha.asyncExecute(g);
          });
    };
    g.resolve = n;
    g.reject = function(c) {
      return new g(function(f, g) {
        g(c);
      });
    };
    g.race = function(c) {
      return new g(function(f, g) {
        for (
          var v = $jscomp.makeIterator(c), u = v.next();
          !u.done;
          u = v.next()
        )
          n(u.value).callWhenSettled_(f, g);
      });
    };
    g.all = function(c) {
      var f = $jscomp.makeIterator(c),
        u = f.next();
      return u.done
        ? n([])
        : new g(function(c, g) {
            function D(f) {
              return function(g) {
                v[f] = g;
                L--;
                0 == L && c(v);
              };
            }
            var v = [],
              L = 0;
            do
              v.push(void 0),
                L++,
                n(u.value).callWhenSettled_(D(v.length - 1), g),
                (u = f.next());
            while (!u.done);
          });
    };
    return g;
  },
  "es6",
  "es3"
);
var DracoDecoderModule = function(c) {
  function f(a, b) {
    a || S("Assertion failed: " + b);
  }
  function n(e, b) {
    if (0 === b || !e) return "";
    for (var d = 0, l, c = 0; ; ) {
      l = O[(e + c) >> 0];
      d |= l;
      if (0 == l && !b) break;
      c++;
      if (b && c == b) break;
    }
    b || (b = c);
    l = "";
    if (128 > d) {
      for (; 0 < b; )
        (d = String.fromCharCode.apply(
          String,
          O.subarray(e, e + Math.min(b, 1024))
        )),
          (l = l ? l + d : d),
          (e += 1024),
          (b -= 1024);
      return l;
    }
    return a.UTF8ToString(e);
  }
  function D(a) {
    return a.replace(/__Z[\w\d_]+/g, function(a) {
      return a === a ? a : a + " [" + a + "]";
    });
  }
  function g() {
    a: {
      var e = Error();
      if (!e.stack) {
        try {
          throw Error(0);
        } catch (b) {
          e = b;
        }
        if (!e.stack) {
          e = "(no stack trace available)";
          break a;
        }
      }
      e = e.stack.toString();
    }
    a.extraStackTrace && (e += "\n" + a.extraStackTrace());
    return D(e);
  }
  function ha(a, b) {
    0 < a % b && (a += b - (a % b));
    return a;
  }
  function R() {
    a.HEAP8 = ba = new Int8Array(E);
    a.HEAP16 = ua = new Int16Array(E);
    a.HEAP32 = w = new Int32Array(E);
    a.HEAPU8 = O = new Uint8Array(E);
    a.HEAPU16 = Ja = new Uint16Array(E);
    a.HEAPU32 = Ka = new Uint32Array(E);
    a.HEAPF32 = La = new Float32Array(E);
    a.HEAPF64 = Ma = new Float64Array(E);
  }
  function Ha() {
    var e = a.usingWasm ? va : Na,
      b = 2147483648 - e;
    if (w[X >> 2] > b) return !1;
    var d = x;
    for (x = Math.max(x, db); x < w[X >> 2]; )
      x =
        536870912 >= x
          ? ha(2 * x, e)
          : Math.min(ha((3 * x + 2147483648) / 4, e), b);
    e = a.reallocBuffer(x);
    if (!e || e.byteLength != x) return (x = d), !1;
    a.buffer = E = e;
    R();
    return !0;
  }
  function u(e) {
    for (; 0 < e.length; ) {
      var b = e.shift();
      if ("function" == typeof b) b();
      else {
        var d = b.func;
        "number" === typeof d
          ? void 0 === b.arg
            ? a.dynCall_v(d)
            : a.dynCall_vi(d, b.arg)
          : d(void 0 === b.arg ? null : b.arg);
      }
    }
  }
  function v(e) {
    ca++;
    a.monitorRunDependencies && a.monitorRunDependencies(ca);
  }
  function Ia(e) {
    ca--;
    a.monitorRunDependencies && a.monitorRunDependencies(ca);
    0 == ca &&
      (null !== wa && (clearInterval(wa), (wa = null)),
      oa && ((e = oa), (oa = null), e()));
  }
  function ia() {
    return !!ia.uncaught_exception;
  }
  function ma() {
    var e = z.last;
    if (!e) return (m.setTempRet0(0), 0) | 0;
    var b = z.infos[e],
      d = b.type;
    if (!d) return (m.setTempRet0(0), e) | 0;
    var l = Array.prototype.slice.call(arguments);
    a.___cxa_is_pointer_type(d);
    ma.buffer || (ma.buffer = Oa(4));
    w[ma.buffer >> 2] = e;
    e = ma.buffer;
    for (var c = 0; c < l.length; c++)
      if (l[c] && a.___cxa_can_catch(l[c], d, e))
        return (e = w[e >> 2]), (b.adjusted = e), (m.setTempRet0(l[c]), e) | 0;
    e = w[e >> 2];
    return (m.setTempRet0(d), e) | 0;
  }
  function L(e, b) {
    t.varargs = b;
    try {
      var d = t.get(),
        l = t.get(),
        c = t.get();
      e = 0;
      L.buffer ||
        ((L.buffers = [null, [], []]),
        (L.printChar = function(b, e) {
          var d = L.buffers[b];
          f(d);
          if (0 === e || 10 === e) {
            b = 1 === b ? a.print : a.printErr;
            a: {
              for (var l = (e = 0); d[l]; ) ++l;
              if (16 < l - e && d.subarray && Pa)
                e = Pa.decode(d.subarray(e, l));
              else
                for (l = ""; ; ) {
                  var c = d[e++];
                  if (!c) {
                    e = l;
                    break a;
                  }
                  if (c & 128) {
                    var g = d[e++] & 63;
                    if (192 == (c & 224))
                      l += String.fromCharCode(((c & 31) << 6) | g);
                    else {
                      var h = d[e++] & 63;
                      if (224 == (c & 240)) c = ((c & 15) << 12) | (g << 6) | h;
                      else {
                        var F = d[e++] & 63;
                        if (240 == (c & 248))
                          c = ((c & 7) << 18) | (g << 12) | (h << 6) | F;
                        else {
                          var k = d[e++] & 63;
                          if (248 == (c & 252))
                            c =
                              ((c & 3) << 24) |
                              (g << 18) |
                              (h << 12) |
                              (F << 6) |
                              k;
                          else {
                            var pa = d[e++] & 63;
                            c =
                              ((c & 1) << 30) |
                              (g << 24) |
                              (h << 18) |
                              (F << 12) |
                              (k << 6) |
                              pa;
                          }
                        }
                      }
                      65536 > c
                        ? (l += String.fromCharCode(c))
                        : ((c -= 65536),
                          (l += String.fromCharCode(
                            55296 | (c >> 10),
                            56320 | (c & 1023)
                          )));
                    }
                  } else l += String.fromCharCode(c);
                }
            }
            b(e);
            d.length = 0;
          } else d.push(e);
        }));
      for (b = 0; b < c; b++) {
        for (
          var g = w[(l + 8 * b) >> 2], h = w[(l + (8 * b + 4)) >> 2], k = 0;
          k < h;
          k++
        )
          L.printChar(d, O[g + k]);
        e += h;
      }
      return e;
    } catch (xa) {
      return (
        ("undefined" !== typeof FS && xa instanceof FS.ErrnoError) || S(xa),
        -xa.errno
      );
    }
  }
  function na(e, b) {
    na.seen || (na.seen = {});
    e in na.seen || (a.dynCall_v(b), (na.seen[e] = 1));
  }
  function aa(a) {
    this.name = "ExitStatus";
    this.message = "Program terminated with exit(" + a + ")";
    this.status = a;
  }
  function ya(e) {
    function b() {
      if (!a.calledRun && ((a.calledRun = !0), !ja)) {
        Qa || ((Qa = !0), u(Ra));
        u(Sa);
        if (a.onRuntimeInitialized) a.onRuntimeInitialized();
        if (a.postRun)
          for (
            "function" == typeof a.postRun && (a.postRun = [a.postRun]);
            a.postRun.length;

          )
            Ta.unshift(a.postRun.shift());
        u(Ta);
      }
    }
    null === Ua && (Ua = Date.now());
    if (!(0 < ca)) {
      if (a.preRun)
        for (
          "function" == typeof a.preRun && (a.preRun = [a.preRun]);
          a.preRun.length;

        )
          Va.unshift(a.preRun.shift());
      u(Va);
      0 < ca ||
        a.calledRun ||
        (a.setStatus
          ? (a.setStatus("Running..."),
            setTimeout(function() {
              setTimeout(function() {
                a.setStatus("");
              }, 1);
              b();
            }, 1))
          : b());
    }
  }
  function S(e) {
    if (a.onAbort) a.onAbort(e);
    void 0 !== e
      ? (a.print(e), a.printErr(e), (e = JSON.stringify(e)))
      : (e = "");
    ja = !0;
    var b =
      "abort(" +
      e +
      ") at " +
      g() +
      "\nIf this abort() is unexpected, build with -s ASSERTIONS=1 which can give more information.";
    Wa &&
      Wa.forEach(function(a) {
        b = a(b, e);
      });
    throw b;
  }
  function r() {}
  function B(a) {
    return (a || r).__cache__;
  }
  function T(a, b) {
    var e = B(b),
      c = e[a];
    if (c) return c;
    c = Object.create((b || r).prototype);
    c.ptr = a;
    return (e[a] = c);
  }
  function U(a) {
    if ("string" === typeof a) {
      for (var b = 0, e = 0; e < a.length; ++e) {
        var c = a.charCodeAt(e);
        55296 <= c &&
          57343 >= c &&
          (c = (65536 + ((c & 1023) << 10)) | (a.charCodeAt(++e) & 1023));
        127 >= c
          ? ++b
          : (b =
              2047 >= c
                ? b + 2
                : 65535 >= c
                ? b + 3
                : 2097151 >= c
                ? b + 4
                : 67108863 >= c
                ? b + 5
                : b + 6);
      }
      b = Array(b + 1);
      e = 0;
      c = b.length;
      if (0 < c) {
        c = e + c - 1;
        for (var f = 0; f < a.length; ++f) {
          var g = a.charCodeAt(f);
          55296 <= g &&
            57343 >= g &&
            (g = (65536 + ((g & 1023) << 10)) | (a.charCodeAt(++f) & 1023));
          if (127 >= g) {
            if (e >= c) break;
            b[e++] = g;
          } else {
            if (2047 >= g) {
              if (e + 1 >= c) break;
              b[e++] = 192 | (g >> 6);
            } else {
              if (65535 >= g) {
                if (e + 2 >= c) break;
                b[e++] = 224 | (g >> 12);
              } else {
                if (2097151 >= g) {
                  if (e + 3 >= c) break;
                  b[e++] = 240 | (g >> 18);
                } else {
                  if (67108863 >= g) {
                    if (e + 4 >= c) break;
                    b[e++] = 248 | (g >> 24);
                  } else {
                    if (e + 5 >= c) break;
                    b[e++] = 252 | (g >> 30);
                    b[e++] = 128 | ((g >> 24) & 63);
                  }
                  b[e++] = 128 | ((g >> 18) & 63);
                }
                b[e++] = 128 | ((g >> 12) & 63);
              }
              b[e++] = 128 | ((g >> 6) & 63);
            }
            b[e++] = 128 | (g & 63);
          }
        }
        b[e] = 0;
      }
      a = k.alloc(b, ba);
      k.copy(b, ba, a);
    }
    return a;
  }
  function A() {
    throw "cannot construct a Status, no constructor in IDL";
  }
  function G() {
    this.ptr = gb();
    B(G)[this.ptr] = this;
  }
  function H() {
    this.ptr = hb();
    B(H)[this.ptr] = this;
  }
  function p() {
    this.ptr = ib();
    B(p)[this.ptr] = this;
  }
  function K() {
    this.ptr = jb();
    B(K)[this.ptr] = this;
  }
  function y() {
    this.ptr = kb();
    B(y)[this.ptr] = this;
  }
  function q() {
    this.ptr = lb();
    B(q)[this.ptr] = this;
  }
  function I() {
    this.ptr = mb();
    B(I)[this.ptr] = this;
  }
  function V() {
    this.ptr = nb();
    B(V)[this.ptr] = this;
  }
  function M() {
    this.ptr = ob();
    B(M)[this.ptr] = this;
  }
  function h() {
    this.ptr = pb();
    B(h)[this.ptr] = this;
  }
  function C() {
    this.ptr = qb();
    B(C)[this.ptr] = this;
  }
  function Y() {
    throw "cannot construct a VoidPtr, no constructor in IDL";
  }
  function J() {
    this.ptr = rb();
    B(J)[this.ptr] = this;
  }
  function N() {
    this.ptr = sb();
    B(N)[this.ptr] = this;
  }
  var a = (c = c || {}),
    Xa = !1,
    Ya = !1;
  a.onRuntimeInitialized = function() {
    Xa = !0;
    if (Ya && "function" === typeof a.onModuleLoaded) a.onModuleLoaded(a);
  };
  a.onModuleParsed = function() {
    Ya = !0;
    if (Xa && "function" === typeof a.onModuleLoaded) a.onModuleLoaded(a);
  };
  a.isVersionSupported = function(a) {
    if ("string" !== typeof a) return !1;
    a = a.split(".");
    return 2 > a.length || 3 < a.length
      ? !1
      : 1 == a[0] && 0 <= a[1] && 2 >= a[1]
      ? !0
      : 0 != a[0] || 10 < a[1]
      ? !1
      : !0;
  };
  a || (a = ("undefined" !== typeof c ? c : null) || {});
  var qa = {},
    Z;
  for (Z in a) a.hasOwnProperty(Z) && (qa[Z] = a[Z]);
  var ka = !1,
    fa = !1,
    la = !1,
    ra = !1;
  if (a.ENVIRONMENT)
    if ("WEB" === a.ENVIRONMENT) ka = !0;
    else if ("WORKER" === a.ENVIRONMENT) fa = !0;
    else if ("NODE" === a.ENVIRONMENT) la = !0;
    else if ("SHELL" === a.ENVIRONMENT) ra = !0;
    else
      throw Error(
        "The provided Module['ENVIRONMENT'] value is not valid. It must be one of: WEB|WORKER|NODE|SHELL."
      );
  else
    (ka = "object" === typeof window),
      (fa = "function" === typeof importScripts),
      (la =
        "object" === typeof process &&
        "function" === typeof require &&
        !ka &&
        !fa),
      (ra = !ka && !la && !fa);
  if (la) {
    a.print || (a.print = console.log);
    a.printErr || (a.printErr = console.warn);
    var za, Aa;
    a.read = function(a, b) {
      za || (za = require("fs"));
      Aa || (Aa = require("path"));
      a = Aa.normalize(a);
      a = za.readFileSync(a);
      return b ? a : a.toString();
    };
    a.readBinary = function(e) {
      e = a.read(e, !0);
      e.buffer || (e = new Uint8Array(e));
      f(e.buffer);
      return e;
    };
    a.thisProgram ||
      (a.thisProgram =
        1 < process.argv.length
          ? process.argv[1].replace(/\\/g, "/")
          : "unknown-program");
    a.arguments = process.argv.slice(2);
    process.on("uncaughtException", function(a) {
      if (!(a instanceof aa)) throw a;
    });
    a.inspect = function() {
      return "[Emscripten Module object]";
    };
  } else if (ra)
    a.print || (a.print = print),
      "undefined" != typeof printErr && (a.printErr = printErr),
      (a.read =
        "undefined" != typeof read
          ? function(a) {
              return read(a);
            }
          : function() {
              throw "no read() available";
            }),
      (a.readBinary = function(a) {
        if ("function" === typeof readbuffer)
          return new Uint8Array(readbuffer(a));
        a = read(a, "binary");
        f("object" === typeof a);
        return a;
      }),
      "undefined" != typeof scriptArgs
        ? (a.arguments = scriptArgs)
        : "undefined" != typeof arguments && (a.arguments = arguments),
      "function" === typeof quit &&
        (a.quit = function(a, b) {
          quit(a);
        });
  else if (ka || fa)
    (a.read = function(a) {
      var b = new XMLHttpRequest();
      b.open("GET", a, !1);
      b.send(null);
      return b.responseText;
    }),
      fa &&
        (a.readBinary = function(a) {
          var b = new XMLHttpRequest();
          b.open("GET", a, !1);
          b.responseType = "arraybuffer";
          b.send(null);
          return new Uint8Array(b.response);
        }),
      (a.readAsync = function(a, b, d) {
        var e = new XMLHttpRequest();
        e.open("GET", a, !0);
        e.responseType = "arraybuffer";
        e.onload = function() {
          200 == e.status || (0 == e.status && e.response)
            ? b(e.response)
            : d();
        };
        e.onerror = d;
        e.send(null);
      }),
      "undefined" != typeof arguments && (a.arguments = arguments),
      "undefined" !== typeof console
        ? (a.print ||
            (a.print = function(a) {
              console.log(a);
            }),
          a.printErr ||
            (a.printErr = function(a) {
              console.warn(a);
            }))
        : a.print || (a.print = function(a) {}),
      "undefined" === typeof a.setWindowTitle &&
        (a.setWindowTitle = function(a) {
          document.title = a;
        });
  else throw Error("Unknown runtime environment. Where are we?");
  a.print || (a.print = function() {});
  a.printErr || (a.printErr = a.print);
  a.arguments || (a.arguments = []);
  a.thisProgram || (a.thisProgram = "./this.program");
  a.quit ||
    (a.quit = function(a, b) {
      throw b;
    });
  a.print = a.print;
  a.printErr = a.printErr;
  a.preRun = [];
  a.postRun = [];
  for (Z in qa) qa.hasOwnProperty(Z) && (a[Z] = qa[Z]);
  qa = void 0;
  var m = {
      setTempRet0: function(a) {
        return (tempRet0 = a);
      },
      getTempRet0: function() {
        return tempRet0;
      },
      stackSave: function() {
        return P;
      },
      stackRestore: function(a) {
        P = a;
      },
      getNativeTypeSize: function(a) {
        switch (a) {
          case "i1":
          case "i8":
            return 1;
          case "i16":
            return 2;
          case "i32":
            return 4;
          case "i64":
            return 8;
          case "float":
            return 4;
          case "double":
            return 8;
          default:
            return "*" === a[a.length - 1]
              ? m.QUANTUM_SIZE
              : "i" === a[0]
              ? ((a = parseInt(a.substr(1))), f(0 === a % 8), a / 8)
              : 0;
        }
      },
      getNativeFieldSize: function(a) {
        return Math.max(m.getNativeTypeSize(a), m.QUANTUM_SIZE);
      },
      STACK_ALIGN: 16,
      prepVararg: function(a, b) {
        "double" === b || "i64" === b
          ? a & 7 && (f(4 === (a & 7)), (a += 4))
          : f(0 === (a & 3));
        return a;
      },
      getAlignSize: function(a, b, d) {
        return d || ("i64" != a && "double" != a)
          ? a
            ? Math.min(b || (a ? m.getNativeFieldSize(a) : 0), m.QUANTUM_SIZE)
            : Math.min(b, 8)
          : 8;
      },
      dynCall: function(e, b, d) {
        return d && d.length
          ? a["dynCall_" + e].apply(null, [b].concat(d))
          : a["dynCall_" + e].call(null, b);
      },
      functionPointers: [],
      addFunction: function(a) {
        for (var b = 0; b < m.functionPointers.length; b++)
          if (!m.functionPointers[b])
            return (m.functionPointers[b] = a), 2 * (1 + b);
        throw "Finished up all reserved function pointers. Use a higher value for RESERVED_FUNCTION_POINTERS.";
      },
      removeFunction: function(a) {
        m.functionPointers[(a - 2) / 2] = null;
      },
      warnOnce: function(e) {
        m.warnOnce.shown || (m.warnOnce.shown = {});
        m.warnOnce.shown[e] || ((m.warnOnce.shown[e] = 1), a.printErr(e));
      },
      funcWrappers: {},
      getFuncWrapper: function(a, b) {
        if (a) {
          f(b);
          m.funcWrappers[b] || (m.funcWrappers[b] = {});
          var d = m.funcWrappers[b];
          d[a] ||
            (d[a] =
              1 === b.length
                ? function() {
                    return m.dynCall(b, a);
                  }
                : 2 === b.length
                ? function(d) {
                    return m.dynCall(b, a, [d]);
                  }
                : function() {
                    return m.dynCall(
                      b,
                      a,
                      Array.prototype.slice.call(arguments)
                    );
                  });
          return d[a];
        }
      },
      getCompilerSetting: function(a) {
        throw "You must build with -s RETAIN_COMPILER_SETTINGS=1 for Runtime.getCompilerSetting or emscripten_get_compiler_setting to work";
      },
      stackAlloc: function(a) {
        var b = P;
        P = (P + a) | 0;
        P = (P + 15) & -16;
        return b;
      },
      staticAlloc: function(a) {
        var b = W;
        W = (W + a) | 0;
        W = (W + 15) & -16;
        return b;
      },
      dynamicAlloc: function(a) {
        var b = w[X >> 2];
        a = ((b + a + 15) | 0) & -16;
        w[X >> 2] = a;
        return a >= x && !Ha() ? ((w[X >> 2] = b), 0) : b;
      },
      alignMemory: function(a, b) {
        return Math.ceil(a / (b ? b : 16)) * (b ? b : 16);
      },
      makeBigInt: function(a, b, d) {
        return d
          ? +(a >>> 0) + 4294967296 * +(b >>> 0)
          : +(a >>> 0) + 4294967296 * +(b | 0);
      },
      GLOBAL_BASE: 1024,
      QUANTUM_SIZE: 4,
      __dummy__: 0
    },
    ja = 0,
    Pa = "undefined" !== typeof TextDecoder ? new TextDecoder("utf8") : void 0;
  "undefined" !== typeof TextDecoder && new TextDecoder("utf-16le");
  var va = 65536,
    Na = 16777216,
    db = 16777216,
    ba,
    O,
    ua,
    Ja,
    w,
    Ka,
    La,
    Ma,
    W,
    Ba,
    P,
    sa,
    Ca,
    X;
  var Da = (W = Ba = P = sa = Ca = X = 0);
  a.reallocBuffer ||
    (a.reallocBuffer = function(a) {
      try {
        if (ArrayBuffer.transfer) var b = ArrayBuffer.transfer(E, a);
        else {
          var d = ba;
          b = new ArrayBuffer(a);
          new Int8Array(b).set(d);
        }
      } catch (l) {
        return !1;
      }
      return tb(b) ? b : !1;
    });
  try {
    var Ea = Function.prototype.call.bind(
      Object.getOwnPropertyDescriptor(ArrayBuffer.prototype, "byteLength").get
    );
    Ea(new ArrayBuffer(4));
  } catch (e) {
    Ea = function(a) {
      return a.byteLength;
    };
  }
  var Fa = a.TOTAL_STACK || 5242880,
    x = a.TOTAL_MEMORY || 16777216;
  x < Fa &&
    a.printErr(
      "TOTAL_MEMORY should be larger than TOTAL_STACK, was " +
        x +
        "! (TOTAL_STACK=" +
        Fa +
        ")"
    );
  if (a.buffer) var E = a.buffer;
  else
    "object" === typeof WebAssembly && "function" === typeof WebAssembly.Memory
      ? ((a.wasmMemory = new WebAssembly.Memory({ initial: x / va })),
        (E = a.wasmMemory.buffer))
      : (E = new ArrayBuffer(x));
  R();
  w[0] = 1668509029;
  ua[1] = 25459;
  if (115 !== O[2] || 99 !== O[3])
    throw "Runtime error: expected the system to be little-endian!";
  a.HEAP = void 0;
  a.buffer = E;
  a.HEAP8 = ba;
  a.HEAP16 = ua;
  a.HEAP32 = w;
  a.HEAPU8 = O;
  a.HEAPU16 = Ja;
  a.HEAPU32 = Ka;
  a.HEAPF32 = La;
  a.HEAPF64 = Ma;
  var Va = [],
    Ra = [],
    Sa = [],
    Za = [],
    Ta = [],
    Qa = !1;
  f(
    Math.imul && Math.fround && Math.clz32 && Math.trunc,
    "this is a legacy browser, build with LEGACY_VM_SUPPORT"
  );
  var ca = 0,
    wa = null,
    oa = null;
  a.preloadedImages = {};
  a.preloadedAudios = {};
  var Q = null;
  (function() {
    function e() {
      try {
        if (a.wasmBinary) return new Uint8Array(a.wasmBinary);
        if (a.readBinary) return a.readBinary(c);
        throw "on the web, we need the wasm binary to be preloaded and set on Module['wasmBinary']. emcc.py will do that for you when generating HTML (but not JS)";
      } catch (eb) {
        S(eb);
      }
    }
    function b() {
      return a.wasmBinary || (!ka && !fa) || "function" !== typeof fetch
        ? new Promise(function(a, b) {
            a(e());
          })
        : fetch(c, { credentials: "same-origin" })
            .then(function(a) {
              if (!a.ok) throw "failed to load wasm binary file at '" + c + "'";
              return a.arrayBuffer();
            })
            .catch(function() {
              return e();
            });
    }
    function d(d, e, l) {
      function f(b, d) {
        h = b.exports;
        if (h.memory) {
          b = h.memory;
          d = a.buffer;
          b.byteLength < d.byteLength &&
            a.printErr(
              "the new buffer in mergeMemory is smaller than the previous one. in native wasm, we should grow memory here"
            );
          d = new Int8Array(d);
          var e = new Int8Array(b);
          Q ||
            d.set(
              e.subarray(a.STATIC_BASE, a.STATIC_BASE + a.STATIC_BUMP),
              a.STATIC_BASE
            );
          e.set(d);
          a.buffer = E = b;
          R();
        }
        a.asm = h;
        a.usingWasm = !0;
        Ia("wasm-instantiate");
      }
      function k(a) {
        f(a.instance, a.module);
      }
      function F(d) {
        b()
          .then(function(a) {
            return WebAssembly.instantiate(a, g);
          })
          .then(d)
          .catch(function(b) {
            a.printErr("failed to asynchronously prepare wasm: " + b);
            S(b);
          });
      }
      if ("object" !== typeof WebAssembly)
        return a.printErr("no native wasm support detected"), !1;
      if (!(a.wasmMemory instanceof WebAssembly.Memory))
        return a.printErr("no native wasm Memory in use"), !1;
      e.memory = a.wasmMemory;
      g.global = { NaN: NaN, Infinity: Infinity };
      g["global.Math"] = d.Math;
      g.env = e;
      v("wasm-instantiate");
      if (a.instantiateWasm)
        try {
          return a.instantiateWasm(g, f);
        } catch (fb) {
          return (
            a.printErr(
              "Module.instantiateWasm callback failed with error: " + fb
            ),
            !1
          );
        }
      a.wasmBinary ||
      "function" !== typeof WebAssembly.instantiateStreaming ||
      0 === c.indexOf("data:") ||
      "function" !== typeof fetch
        ? F(k)
        : WebAssembly.instantiateStreaming(
            fetch(c, { credentials: "same-origin" }),
            g
          )
            .then(k)
            .catch(function(b) {
              a.printErr("wasm streaming compile failed: " + b);
              a.printErr("falling back to ArrayBuffer instantiation");
              F(k);
            });
      return {};
    }
    var c = "draco_decoder.wasm",
      f = "draco_decoder.temp.asm.js";
    "function" === typeof a.locateFile &&
      (a.locateFile("draco_decoder.wast"),
      (c = a.locateFile(c)),
      (f = a.locateFile(f)));
    var g = {
        global: null,
        env: null,
        asm2wasm: {
          "f64-rem": function(a, b) {
            return a % b;
          },
          debugger: function() {
            debugger;
          }
        },
        parent: a
      },
      h = null;
    a.asmPreload = a.asm;
    var k = a.reallocBuffer;
    a.reallocBuffer = function(b) {
      if ("asmjs" === m) var d = k(b);
      else
        a: {
          b = ha(b, a.usingWasm ? va : Na);
          var e = a.buffer.byteLength;
          if (a.usingWasm)
            try {
              d =
                -1 !== a.wasmMemory.grow((b - e) / 65536)
                  ? (a.buffer = a.wasmMemory.buffer)
                  : null;
              break a;
            } catch (fd) {
              d = null;
              break a;
            }
          d = void 0;
        }
      return d;
    };
    var m = "";
    a.asm = function(b, e, c) {
      if (!e.table) {
        var l = a.wasmTableSize;
        void 0 === l && (l = 1024);
        var f = a.wasmMaxTableSize;
        e.table =
          "object" === typeof WebAssembly &&
          "function" === typeof WebAssembly.Table
            ? void 0 !== f
              ? new WebAssembly.Table({
                  initial: l,
                  maximum: f,
                  element: "anyfunc"
                })
              : new WebAssembly.Table({ initial: l, element: "anyfunc" })
            : Array(l);
        a.wasmTable = e.table;
      }
      e.memoryBase || (e.memoryBase = a.STATIC_BASE);
      e.tableBase || (e.tableBase = 0);
      (b = d(b, e, c)) ||
        S(
          "no binaryen method succeeded. consider enabling more options, like interpreting, if you want that: https://github.com/kripken/emscripten/wiki/WebAssembly#binaryen-methods"
        );
      return b;
    };
  })();
  Da = m.GLOBAL_BASE;
  W = Da + 17952;
  Ra.push();
  Q = null;
  a.STATIC_BASE = Da;
  a.STATIC_BUMP = 17952;
  var ub = W;
  W += 16;
  var z = {
      last: 0,
      caught: [],
      infos: {},
      deAdjust: function(a) {
        if (!a || z.infos[a]) return a;
        for (var b in z.infos) if (z.infos[b].adjusted === a) return b;
        return a;
      },
      addRef: function(a) {
        a && z.infos[a].refcount++;
      },
      decRef: function(e) {
        if (e) {
          var b = z.infos[e];
          f(0 < b.refcount);
          b.refcount--;
          0 !== b.refcount ||
            b.rethrown ||
            (b.destructor && a.dynCall_vi(b.destructor, e),
            delete z.infos[e],
            ___cxa_free_exception(e));
        }
      },
      clearRef: function(a) {
        a && (z.infos[a].refcount = 0);
      }
    },
    t = {
      varargs: 0,
      get: function(a) {
        t.varargs += 4;
        return w[(t.varargs - 4) >> 2];
      },
      getStr: function() {
        return n(t.get());
      },
      get64: function() {
        var a = t.get(),
          b = t.get();
        0 <= a ? f(0 === b) : f(-1 === b);
        return a;
      },
      getZero: function() {
        f(0 === t.get());
      }
    },
    ta = {},
    Ga = 1;
  Za.push(function() {
    var e = a._fflush;
    e && e(0);
    if ((e = L.printChar)) {
      var b = L.buffers;
      b[1].length && e(1, 10);
      b[2].length && e(2, 10);
    }
  });
  X = m.staticAlloc(4);
  Ba = P = m.alignMemory(W);
  sa = Ba + Fa;
  Ca = m.alignMemory(sa);
  w[X >> 2] = Ca;
  a.wasmTableSize = 468;
  a.wasmMaxTableSize = 468;
  a.asmGlobalArg = {
    Math: Math,
    Int8Array: Int8Array,
    Int16Array: Int16Array,
    Int32Array: Int32Array,
    Uint8Array: Uint8Array,
    Uint16Array: Uint16Array,
    Uint32Array: Uint32Array,
    Float32Array: Float32Array,
    Float64Array: Float64Array,
    NaN: NaN,
    Infinity: Infinity,
    byteLength: Ea
  };
  a.asmLibraryArg = {
    abort: S,
    assert: f,
    enlargeMemory: Ha,
    getTotalMemory: function() {
      return x;
    },
    abortOnCannotGrowMemory: function() {
      S(
        "Cannot enlarge memory arrays. Either (1) compile with  -s TOTAL_MEMORY=X  with X higher than the current value " +
          x +
          ", (2) compile with  -s ALLOW_MEMORY_GROWTH=1  which allows increasing the size at runtime, or (3) if you want malloc to return NULL (0) instead of this abort, compile with  -s ABORTING_MALLOC=0 "
      );
    },
    invoke_ii: function(e, b) {
      try {
        return a.dynCall_ii(e, b);
      } catch (d) {
        if ("number" !== typeof d && "longjmp" !== d) throw d;
        a.setThrew(1, 0);
      }
    },
    invoke_iii: function(e, b, d) {
      try {
        return a.dynCall_iii(e, b, d);
      } catch (l) {
        if ("number" !== typeof l && "longjmp" !== l) throw l;
        a.setThrew(1, 0);
      }
    },
    invoke_iiii: function(e, b, d, c) {
      try {
        return a.dynCall_iiii(e, b, d, c);
      } catch (F) {
        if ("number" !== typeof F && "longjmp" !== F) throw F;
        a.setThrew(1, 0);
      }
    },
    invoke_iiiiiii: function(e, b, d, c, f, g, h) {
      try {
        return a.dynCall_iiiiiii(e, b, d, c, f, g, h);
      } catch (ea) {
        if ("number" !== typeof ea && "longjmp" !== ea) throw ea;
        a.setThrew(1, 0);
      }
    },
    invoke_v: function(e) {
      try {
        a.dynCall_v(e);
      } catch (b) {
        if ("number" !== typeof b && "longjmp" !== b) throw b;
        a.setThrew(1, 0);
      }
    },
    invoke_vi: function(e, b) {
      try {
        a.dynCall_vi(e, b);
      } catch (d) {
        if ("number" !== typeof d && "longjmp" !== d) throw d;
        a.setThrew(1, 0);
      }
    },
    invoke_vii: function(e, b, d) {
      try {
        a.dynCall_vii(e, b, d);
      } catch (l) {
        if ("number" !== typeof l && "longjmp" !== l) throw l;
        a.setThrew(1, 0);
      }
    },
    invoke_viii: function(e, b, d, c) {
      try {
        a.dynCall_viii(e, b, d, c);
      } catch (F) {
        if ("number" !== typeof F && "longjmp" !== F) throw F;
        a.setThrew(1, 0);
      }
    },
    invoke_viiii: function(e, b, d, c, f) {
      try {
        a.dynCall_viiii(e, b, d, c, f);
      } catch (pa) {
        if ("number" !== typeof pa && "longjmp" !== pa) throw pa;
        a.setThrew(1, 0);
      }
    },
    invoke_viiiii: function(e, b, d, c, f, g) {
      try {
        a.dynCall_viiiii(e, b, d, c, f, g);
      } catch (da) {
        if ("number" !== typeof da && "longjmp" !== da) throw da;
        a.setThrew(1, 0);
      }
    },
    invoke_viiiiii: function(e, b, d, c, f, g, h) {
      try {
        a.dynCall_viiiiii(e, b, d, c, f, g, h);
      } catch (ea) {
        if ("number" !== typeof ea && "longjmp" !== ea) throw ea;
        a.setThrew(1, 0);
      }
    },
    __ZSt18uncaught_exceptionv: ia,
    ___assert_fail: function(a, b, d, c) {
      ja = !0;
      throw "Assertion failed: " +
        n(a) +
        ", at: " +
        [b ? n(b) : "unknown filename", d, c ? n(c) : "unknown function"] +
        " at " +
        g();
    },
    ___cxa_allocate_exception: function(a) {
      return Oa(a);
    },
    ___cxa_begin_catch: function(a) {
      var b = z.infos[a];
      b && !b.caught && ((b.caught = !0), ia.uncaught_exception--);
      b && (b.rethrown = !1);
      z.caught.push(a);
      z.addRef(z.deAdjust(a));
      return a;
    },
    ___cxa_find_matching_catch: ma,
    ___cxa_pure_virtual: function() {
      ja = !0;
      throw "Pure virtual function called!";
    },
    ___cxa_throw: function(a, b, d) {
      z.infos[a] = {
        ptr: a,
        adjusted: a,
        type: b,
        destructor: d,
        refcount: 0,
        caught: !1,
        rethrown: !1
      };
      z.last = a;
      "uncaught_exception" in ia
        ? ia.uncaught_exception++
        : (ia.uncaught_exception = 1);
      throw a +
        " - Exception catching is disabled, this exception cannot be caught. Compile with -s DISABLE_EXCEPTION_CATCHING=0 or DISABLE_EXCEPTION_CATCHING=2 to catch.";
    },
    ___gxx_personality_v0: function() {},
    ___resumeException: function(a) {
      z.last || (z.last = a);
      throw a +
        " - Exception catching is disabled, this exception cannot be caught. Compile with -s DISABLE_EXCEPTION_CATCHING=0 or DISABLE_EXCEPTION_CATCHING=2 to catch.";
    },
    ___setErrNo: function(c) {
      a.___errno_location && (w[a.___errno_location() >> 2] = c);
      return c;
    },
    ___syscall140: function(a, b) {
      t.varargs = b;
      try {
        var d = t.getStreamFromFD();
        t.get();
        var c = t.get(),
          e = t.get(),
          f = t.get();
        FS.llseek(d, c, f);
        w[e >> 2] = d.position;
        d.getdents && 0 === c && 0 === f && (d.getdents = null);
        return 0;
      } catch (da) {
        return (
          ("undefined" !== typeof FS && da instanceof FS.ErrnoError) || S(da),
          -da.errno
        );
      }
    },
    ___syscall146: L,
    ___syscall6: function(a, b) {
      t.varargs = b;
      try {
        var d = t.getStreamFromFD();
        FS.close(d);
        return 0;
      } catch (l) {
        return (
          ("undefined" !== typeof FS && l instanceof FS.ErrnoError) || S(l),
          -l.errno
        );
      }
    },
    _abort: function() {
      a.abort();
    },
    _emscripten_memcpy_big: function(a, b, d) {
      O.set(O.subarray(b, b + d), a);
      return a;
    },
    _pthread_getspecific: function(a) {
      return ta[a] || 0;
    },
    _pthread_key_create: function(a, b) {
      if (0 == a) return 22;
      w[a >> 2] = Ga;
      ta[Ga] = 0;
      Ga++;
      return 0;
    },
    _pthread_once: na,
    _pthread_setspecific: function(a, b) {
      if (!(a in ta)) return 22;
      ta[a] = b;
      return 0;
    },
    DYNAMICTOP_PTR: X,
    tempDoublePtr: ub,
    ABORT: ja,
    STACKTOP: P,
    STACK_MAX: sa
  };
  var $a = a.asm(a.asmGlobalArg, a.asmLibraryArg, E);
  a.asm = $a;
  a.___cxa_can_catch = function() {
    return a.asm.___cxa_can_catch.apply(null, arguments);
  };
  a.___cxa_is_pointer_type = function() {
    return a.asm.___cxa_is_pointer_type.apply(null, arguments);
  };
  var hb = (a._emscripten_bind_AttributeOctahedronTransform_AttributeOctahedronTransform_0 = function() {
      return a.asm._emscripten_bind_AttributeOctahedronTransform_AttributeOctahedronTransform_0.apply(
        null,
        arguments
      );
    }),
    vb = (a._emscripten_bind_AttributeOctahedronTransform_InitFromAttribute_1 = function() {
      return a.asm._emscripten_bind_AttributeOctahedronTransform_InitFromAttribute_1.apply(
        null,
        arguments
      );
    }),
    wb = (a._emscripten_bind_AttributeOctahedronTransform___destroy___0 = function() {
      return a.asm._emscripten_bind_AttributeOctahedronTransform___destroy___0.apply(
        null,
        arguments
      );
    }),
    xb = (a._emscripten_bind_AttributeOctahedronTransform_quantization_bits_0 = function() {
      return a.asm._emscripten_bind_AttributeOctahedronTransform_quantization_bits_0.apply(
        null,
        arguments
      );
    }),
    kb = (a._emscripten_bind_AttributeQuantizationTransform_AttributeQuantizationTransform_0 = function() {
      return a.asm._emscripten_bind_AttributeQuantizationTransform_AttributeQuantizationTransform_0.apply(
        null,
        arguments
      );
    }),
    yb = (a._emscripten_bind_AttributeQuantizationTransform_InitFromAttribute_1 = function() {
      return a.asm._emscripten_bind_AttributeQuantizationTransform_InitFromAttribute_1.apply(
        null,
        arguments
      );
    }),
    zb = (a._emscripten_bind_AttributeQuantizationTransform___destroy___0 = function() {
      return a.asm._emscripten_bind_AttributeQuantizationTransform___destroy___0.apply(
        null,
        arguments
      );
    }),
    Ab = (a._emscripten_bind_AttributeQuantizationTransform_min_value_1 = function() {
      return a.asm._emscripten_bind_AttributeQuantizationTransform_min_value_1.apply(
        null,
        arguments
      );
    }),
    Bb = (a._emscripten_bind_AttributeQuantizationTransform_quantization_bits_0 = function() {
      return a.asm._emscripten_bind_AttributeQuantizationTransform_quantization_bits_0.apply(
        null,
        arguments
      );
    }),
    Cb = (a._emscripten_bind_AttributeQuantizationTransform_range_0 = function() {
      return a.asm._emscripten_bind_AttributeQuantizationTransform_range_0.apply(
        null,
        arguments
      );
    }),
    jb = (a._emscripten_bind_AttributeTransformData_AttributeTransformData_0 = function() {
      return a.asm._emscripten_bind_AttributeTransformData_AttributeTransformData_0.apply(
        null,
        arguments
      );
    }),
    Db = (a._emscripten_bind_AttributeTransformData___destroy___0 = function() {
      return a.asm._emscripten_bind_AttributeTransformData___destroy___0.apply(
        null,
        arguments
      );
    }),
    Eb = (a._emscripten_bind_AttributeTransformData_transform_type_0 = function() {
      return a.asm._emscripten_bind_AttributeTransformData_transform_type_0.apply(
        null,
        arguments
      );
    }),
    ob = (a._emscripten_bind_DecoderBuffer_DecoderBuffer_0 = function() {
      return a.asm._emscripten_bind_DecoderBuffer_DecoderBuffer_0.apply(
        null,
        arguments
      );
    }),
    Fb = (a._emscripten_bind_DecoderBuffer_Init_2 = function() {
      return a.asm._emscripten_bind_DecoderBuffer_Init_2.apply(null, arguments);
    }),
    Gb = (a._emscripten_bind_DecoderBuffer___destroy___0 = function() {
      return a.asm._emscripten_bind_DecoderBuffer___destroy___0.apply(
        null,
        arguments
      );
    }),
    Hb = (a._emscripten_bind_Decoder_DecodeBufferToMesh_2 = function() {
      return a.asm._emscripten_bind_Decoder_DecodeBufferToMesh_2.apply(
        null,
        arguments
      );
    }),
    Ib = (a._emscripten_bind_Decoder_DecodeBufferToPointCloud_2 = function() {
      return a.asm._emscripten_bind_Decoder_DecodeBufferToPointCloud_2.apply(
        null,
        arguments
      );
    }),
    pb = (a._emscripten_bind_Decoder_Decoder_0 = function() {
      return a.asm._emscripten_bind_Decoder_Decoder_0.apply(null, arguments);
    }),
    Jb = (a._emscripten_bind_Decoder_GetAttributeByUniqueId_2 = function() {
      return a.asm._emscripten_bind_Decoder_GetAttributeByUniqueId_2.apply(
        null,
        arguments
      );
    }),
    Kb = (a._emscripten_bind_Decoder_GetAttributeFloatForAllPoints_3 = function() {
      return a.asm._emscripten_bind_Decoder_GetAttributeFloatForAllPoints_3.apply(
        null,
        arguments
      );
    }),
    Lb = (a._emscripten_bind_Decoder_GetAttributeFloat_3 = function() {
      return a.asm._emscripten_bind_Decoder_GetAttributeFloat_3.apply(
        null,
        arguments
      );
    }),
    Mb = (a._emscripten_bind_Decoder_GetAttributeIdByMetadataEntry_3 = function() {
      return a.asm._emscripten_bind_Decoder_GetAttributeIdByMetadataEntry_3.apply(
        null,
        arguments
      );
    }),
    Nb = (a._emscripten_bind_Decoder_GetAttributeIdByName_2 = function() {
      return a.asm._emscripten_bind_Decoder_GetAttributeIdByName_2.apply(
        null,
        arguments
      );
    }),
    Ob = (a._emscripten_bind_Decoder_GetAttributeId_2 = function() {
      return a.asm._emscripten_bind_Decoder_GetAttributeId_2.apply(
        null,
        arguments
      );
    }),
    Pb = (a._emscripten_bind_Decoder_GetAttributeInt32ForAllPoints_3 = function() {
      return a.asm._emscripten_bind_Decoder_GetAttributeInt32ForAllPoints_3.apply(
        null,
        arguments
      );
    }),
    Qb = (a._emscripten_bind_Decoder_GetAttributeIntForAllPoints_3 = function() {
      return a.asm._emscripten_bind_Decoder_GetAttributeIntForAllPoints_3.apply(
        null,
        arguments
      );
    }),
    Rb = (a._emscripten_bind_Decoder_GetAttributeMetadata_2 = function() {
      return a.asm._emscripten_bind_Decoder_GetAttributeMetadata_2.apply(
        null,
        arguments
      );
    }),
    Sb = (a._emscripten_bind_Decoder_GetAttribute_2 = function() {
      return a.asm._emscripten_bind_Decoder_GetAttribute_2.apply(
        null,
        arguments
      );
    }),
    Tb = (a._emscripten_bind_Decoder_GetEncodedGeometryType_1 = function() {
      return a.asm._emscripten_bind_Decoder_GetEncodedGeometryType_1.apply(
        null,
        arguments
      );
    }),
    Ub = (a._emscripten_bind_Decoder_GetFaceFromMesh_3 = function() {
      return a.asm._emscripten_bind_Decoder_GetFaceFromMesh_3.apply(
        null,
        arguments
      );
    }),
    Vb = (a._emscripten_bind_Decoder_GetMetadata_1 = function() {
      return a.asm._emscripten_bind_Decoder_GetMetadata_1.apply(
        null,
        arguments
      );
    }),
    Wb = (a._emscripten_bind_Decoder_GetTriangleStripsFromMesh_2 = function() {
      return a.asm._emscripten_bind_Decoder_GetTriangleStripsFromMesh_2.apply(
        null,
        arguments
      );
    }),
    Xb = (a._emscripten_bind_Decoder_SkipAttributeTransform_1 = function() {
      return a.asm._emscripten_bind_Decoder_SkipAttributeTransform_1.apply(
        null,
        arguments
      );
    }),
    Yb = (a._emscripten_bind_Decoder___destroy___0 = function() {
      return a.asm._emscripten_bind_Decoder___destroy___0.apply(
        null,
        arguments
      );
    }),
    mb = (a._emscripten_bind_DracoFloat32Array_DracoFloat32Array_0 = function() {
      return a.asm._emscripten_bind_DracoFloat32Array_DracoFloat32Array_0.apply(
        null,
        arguments
      );
    }),
    Zb = (a._emscripten_bind_DracoFloat32Array_GetValue_1 = function() {
      return a.asm._emscripten_bind_DracoFloat32Array_GetValue_1.apply(
        null,
        arguments
      );
    }),
    $b = (a._emscripten_bind_DracoFloat32Array___destroy___0 = function() {
      return a.asm._emscripten_bind_DracoFloat32Array___destroy___0.apply(
        null,
        arguments
      );
    }),
    ac = (a._emscripten_bind_DracoFloat32Array_size_0 = function() {
      return a.asm._emscripten_bind_DracoFloat32Array_size_0.apply(
        null,
        arguments
      );
    }),
    rb = (a._emscripten_bind_DracoInt32Array_DracoInt32Array_0 = function() {
      return a.asm._emscripten_bind_DracoInt32Array_DracoInt32Array_0.apply(
        null,
        arguments
      );
    }),
    bc = (a._emscripten_bind_DracoInt32Array_GetValue_1 = function() {
      return a.asm._emscripten_bind_DracoInt32Array_GetValue_1.apply(
        null,
        arguments
      );
    }),
    cc = (a._emscripten_bind_DracoInt32Array___destroy___0 = function() {
      return a.asm._emscripten_bind_DracoInt32Array___destroy___0.apply(
        null,
        arguments
      );
    }),
    dc = (a._emscripten_bind_DracoInt32Array_size_0 = function() {
      return a.asm._emscripten_bind_DracoInt32Array_size_0.apply(
        null,
        arguments
      );
    }),
    nb = (a._emscripten_bind_GeometryAttribute_GeometryAttribute_0 = function() {
      return a.asm._emscripten_bind_GeometryAttribute_GeometryAttribute_0.apply(
        null,
        arguments
      );
    }),
    ec = (a._emscripten_bind_GeometryAttribute___destroy___0 = function() {
      return a.asm._emscripten_bind_GeometryAttribute___destroy___0.apply(
        null,
        arguments
      );
    }),
    qb = (a._emscripten_bind_Mesh_Mesh_0 = function() {
      return a.asm._emscripten_bind_Mesh_Mesh_0.apply(null, arguments);
    }),
    fc = (a._emscripten_bind_Mesh___destroy___0 = function() {
      return a.asm._emscripten_bind_Mesh___destroy___0.apply(null, arguments);
    }),
    gc = (a._emscripten_bind_Mesh_num_attributes_0 = function() {
      return a.asm._emscripten_bind_Mesh_num_attributes_0.apply(
        null,
        arguments
      );
    }),
    hc = (a._emscripten_bind_Mesh_num_faces_0 = function() {
      return a.asm._emscripten_bind_Mesh_num_faces_0.apply(null, arguments);
    }),
    ic = (a._emscripten_bind_Mesh_num_points_0 = function() {
      return a.asm._emscripten_bind_Mesh_num_points_0.apply(null, arguments);
    }),
    jc = (a._emscripten_bind_MetadataQuerier_GetDoubleEntry_2 = function() {
      return a.asm._emscripten_bind_MetadataQuerier_GetDoubleEntry_2.apply(
        null,
        arguments
      );
    }),
    kc = (a._emscripten_bind_MetadataQuerier_GetEntryName_2 = function() {
      return a.asm._emscripten_bind_MetadataQuerier_GetEntryName_2.apply(
        null,
        arguments
      );
    }),
    lc = (a._emscripten_bind_MetadataQuerier_GetIntEntry_2 = function() {
      return a.asm._emscripten_bind_MetadataQuerier_GetIntEntry_2.apply(
        null,
        arguments
      );
    }),
    mc = (a._emscripten_bind_MetadataQuerier_GetStringEntry_2 = function() {
      return a.asm._emscripten_bind_MetadataQuerier_GetStringEntry_2.apply(
        null,
        arguments
      );
    }),
    nc = (a._emscripten_bind_MetadataQuerier_HasDoubleEntry_2 = function() {
      return a.asm._emscripten_bind_MetadataQuerier_HasDoubleEntry_2.apply(
        null,
        arguments
      );
    }),
    oc = (a._emscripten_bind_MetadataQuerier_HasEntry_2 = function() {
      return a.asm._emscripten_bind_MetadataQuerier_HasEntry_2.apply(
        null,
        arguments
      );
    }),
    pc = (a._emscripten_bind_MetadataQuerier_HasIntEntry_2 = function() {
      return a.asm._emscripten_bind_MetadataQuerier_HasIntEntry_2.apply(
        null,
        arguments
      );
    }),
    qc = (a._emscripten_bind_MetadataQuerier_HasStringEntry_2 = function() {
      return a.asm._emscripten_bind_MetadataQuerier_HasStringEntry_2.apply(
        null,
        arguments
      );
    }),
    lb = (a._emscripten_bind_MetadataQuerier_MetadataQuerier_0 = function() {
      return a.asm._emscripten_bind_MetadataQuerier_MetadataQuerier_0.apply(
        null,
        arguments
      );
    }),
    rc = (a._emscripten_bind_MetadataQuerier_NumEntries_1 = function() {
      return a.asm._emscripten_bind_MetadataQuerier_NumEntries_1.apply(
        null,
        arguments
      );
    }),
    sc = (a._emscripten_bind_MetadataQuerier___destroy___0 = function() {
      return a.asm._emscripten_bind_MetadataQuerier___destroy___0.apply(
        null,
        arguments
      );
    }),
    sb = (a._emscripten_bind_Metadata_Metadata_0 = function() {
      return a.asm._emscripten_bind_Metadata_Metadata_0.apply(null, arguments);
    }),
    tc = (a._emscripten_bind_Metadata___destroy___0 = function() {
      return a.asm._emscripten_bind_Metadata___destroy___0.apply(
        null,
        arguments
      );
    }),
    uc = (a._emscripten_bind_PointAttribute_GetAttributeTransformData_0 = function() {
      return a.asm._emscripten_bind_PointAttribute_GetAttributeTransformData_0.apply(
        null,
        arguments
      );
    }),
    ib = (a._emscripten_bind_PointAttribute_PointAttribute_0 = function() {
      return a.asm._emscripten_bind_PointAttribute_PointAttribute_0.apply(
        null,
        arguments
      );
    }),
    vc = (a._emscripten_bind_PointAttribute___destroy___0 = function() {
      return a.asm._emscripten_bind_PointAttribute___destroy___0.apply(
        null,
        arguments
      );
    }),
    wc = (a._emscripten_bind_PointAttribute_attribute_type_0 = function() {
      return a.asm._emscripten_bind_PointAttribute_attribute_type_0.apply(
        null,
        arguments
      );
    }),
    xc = (a._emscripten_bind_PointAttribute_byte_offset_0 = function() {
      return a.asm._emscripten_bind_PointAttribute_byte_offset_0.apply(
        null,
        arguments
      );
    }),
    yc = (a._emscripten_bind_PointAttribute_byte_stride_0 = function() {
      return a.asm._emscripten_bind_PointAttribute_byte_stride_0.apply(
        null,
        arguments
      );
    }),
    zc = (a._emscripten_bind_PointAttribute_data_type_0 = function() {
      return a.asm._emscripten_bind_PointAttribute_data_type_0.apply(
        null,
        arguments
      );
    }),
    Ac = (a._emscripten_bind_PointAttribute_normalized_0 = function() {
      return a.asm._emscripten_bind_PointAttribute_normalized_0.apply(
        null,
        arguments
      );
    }),
    Bc = (a._emscripten_bind_PointAttribute_num_components_0 = function() {
      return a.asm._emscripten_bind_PointAttribute_num_components_0.apply(
        null,
        arguments
      );
    }),
    Cc = (a._emscripten_bind_PointAttribute_size_0 = function() {
      return a.asm._emscripten_bind_PointAttribute_size_0.apply(
        null,
        arguments
      );
    }),
    Dc = (a._emscripten_bind_PointAttribute_unique_id_0 = function() {
      return a.asm._emscripten_bind_PointAttribute_unique_id_0.apply(
        null,
        arguments
      );
    }),
    gb = (a._emscripten_bind_PointCloud_PointCloud_0 = function() {
      return a.asm._emscripten_bind_PointCloud_PointCloud_0.apply(
        null,
        arguments
      );
    }),
    Ec = (a._emscripten_bind_PointCloud___destroy___0 = function() {
      return a.asm._emscripten_bind_PointCloud___destroy___0.apply(
        null,
        arguments
      );
    }),
    Fc = (a._emscripten_bind_PointCloud_num_attributes_0 = function() {
      return a.asm._emscripten_bind_PointCloud_num_attributes_0.apply(
        null,
        arguments
      );
    }),
    Gc = (a._emscripten_bind_PointCloud_num_points_0 = function() {
      return a.asm._emscripten_bind_PointCloud_num_points_0.apply(
        null,
        arguments
      );
    }),
    Hc = (a._emscripten_bind_Status___destroy___0 = function() {
      return a.asm._emscripten_bind_Status___destroy___0.apply(null, arguments);
    }),
    Ic = (a._emscripten_bind_Status_code_0 = function() {
      return a.asm._emscripten_bind_Status_code_0.apply(null, arguments);
    }),
    Jc = (a._emscripten_bind_Status_error_msg_0 = function() {
      return a.asm._emscripten_bind_Status_error_msg_0.apply(null, arguments);
    }),
    Kc = (a._emscripten_bind_Status_ok_0 = function() {
      return a.asm._emscripten_bind_Status_ok_0.apply(null, arguments);
    }),
    Lc = (a._emscripten_bind_VoidPtr___destroy___0 = function() {
      return a.asm._emscripten_bind_VoidPtr___destroy___0.apply(
        null,
        arguments
      );
    }),
    Mc = (a._emscripten_enum_draco_AttributeTransformType_ATTRIBUTE_INVALID_TRANSFORM = function() {
      return a.asm._emscripten_enum_draco_AttributeTransformType_ATTRIBUTE_INVALID_TRANSFORM.apply(
        null,
        arguments
      );
    }),
    Nc = (a._emscripten_enum_draco_AttributeTransformType_ATTRIBUTE_NO_TRANSFORM = function() {
      return a.asm._emscripten_enum_draco_AttributeTransformType_ATTRIBUTE_NO_TRANSFORM.apply(
        null,
        arguments
      );
    }),
    Oc = (a._emscripten_enum_draco_AttributeTransformType_ATTRIBUTE_OCTAHEDRON_TRANSFORM = function() {
      return a.asm._emscripten_enum_draco_AttributeTransformType_ATTRIBUTE_OCTAHEDRON_TRANSFORM.apply(
        null,
        arguments
      );
    }),
    Pc = (a._emscripten_enum_draco_AttributeTransformType_ATTRIBUTE_QUANTIZATION_TRANSFORM = function() {
      return a.asm._emscripten_enum_draco_AttributeTransformType_ATTRIBUTE_QUANTIZATION_TRANSFORM.apply(
        null,
        arguments
      );
    }),
    Qc = (a._emscripten_enum_draco_EncodedGeometryType_INVALID_GEOMETRY_TYPE = function() {
      return a.asm._emscripten_enum_draco_EncodedGeometryType_INVALID_GEOMETRY_TYPE.apply(
        null,
        arguments
      );
    }),
    Rc = (a._emscripten_enum_draco_EncodedGeometryType_POINT_CLOUD = function() {
      return a.asm._emscripten_enum_draco_EncodedGeometryType_POINT_CLOUD.apply(
        null,
        arguments
      );
    }),
    Sc = (a._emscripten_enum_draco_EncodedGeometryType_TRIANGULAR_MESH = function() {
      return a.asm._emscripten_enum_draco_EncodedGeometryType_TRIANGULAR_MESH.apply(
        null,
        arguments
      );
    }),
    Tc = (a._emscripten_enum_draco_GeometryAttribute_Type_COLOR = function() {
      return a.asm._emscripten_enum_draco_GeometryAttribute_Type_COLOR.apply(
        null,
        arguments
      );
    }),
    Uc = (a._emscripten_enum_draco_GeometryAttribute_Type_GENERIC = function() {
      return a.asm._emscripten_enum_draco_GeometryAttribute_Type_GENERIC.apply(
        null,
        arguments
      );
    }),
    Vc = (a._emscripten_enum_draco_GeometryAttribute_Type_INVALID = function() {
      return a.asm._emscripten_enum_draco_GeometryAttribute_Type_INVALID.apply(
        null,
        arguments
      );
    }),
    Wc = (a._emscripten_enum_draco_GeometryAttribute_Type_NORMAL = function() {
      return a.asm._emscripten_enum_draco_GeometryAttribute_Type_NORMAL.apply(
        null,
        arguments
      );
    }),
    Xc = (a._emscripten_enum_draco_GeometryAttribute_Type_POSITION = function() {
      return a.asm._emscripten_enum_draco_GeometryAttribute_Type_POSITION.apply(
        null,
        arguments
      );
    }),
    Yc = (a._emscripten_enum_draco_GeometryAttribute_Type_TEX_COORD = function() {
      return a.asm._emscripten_enum_draco_GeometryAttribute_Type_TEX_COORD.apply(
        null,
        arguments
      );
    }),
    Zc = (a._emscripten_enum_draco_StatusCode_ERROR = function() {
      return a.asm._emscripten_enum_draco_StatusCode_ERROR.apply(
        null,
        arguments
      );
    }),
    $c = (a._emscripten_enum_draco_StatusCode_INVALID_PARAMETER = function() {
      return a.asm._emscripten_enum_draco_StatusCode_INVALID_PARAMETER.apply(
        null,
        arguments
      );
    }),
    ad = (a._emscripten_enum_draco_StatusCode_IO_ERROR = function() {
      return a.asm._emscripten_enum_draco_StatusCode_IO_ERROR.apply(
        null,
        arguments
      );
    }),
    bd = (a._emscripten_enum_draco_StatusCode_OK = function() {
      return a.asm._emscripten_enum_draco_StatusCode_OK.apply(null, arguments);
    }),
    cd = (a._emscripten_enum_draco_StatusCode_UNKNOWN_VERSION = function() {
      return a.asm._emscripten_enum_draco_StatusCode_UNKNOWN_VERSION.apply(
        null,
        arguments
      );
    }),
    dd = (a._emscripten_enum_draco_StatusCode_UNSUPPORTED_VERSION = function() {
      return a.asm._emscripten_enum_draco_StatusCode_UNSUPPORTED_VERSION.apply(
        null,
        arguments
      );
    });
  a._emscripten_get_global_libc = function() {
    return a.asm._emscripten_get_global_libc.apply(null, arguments);
  };
  var tb = (a._emscripten_replace_memory = function() {
    return a.asm._emscripten_replace_memory.apply(null, arguments);
  });
  a._free = function() {
    return a.asm._free.apply(null, arguments);
  };
  a._llvm_bswap_i32 = function() {
    return a.asm._llvm_bswap_i32.apply(null, arguments);
  };
  var Oa = (a._malloc = function() {
    return a.asm._malloc.apply(null, arguments);
  });
  a._memcpy = function() {
    return a.asm._memcpy.apply(null, arguments);
  };
  a._memmove = function() {
    return a.asm._memmove.apply(null, arguments);
  };
  a._memset = function() {
    return a.asm._memset.apply(null, arguments);
  };
  a._sbrk = function() {
    return a.asm._sbrk.apply(null, arguments);
  };
  a.establishStackSpace = function() {
    return a.asm.establishStackSpace.apply(null, arguments);
  };
  a.getTempRet0 = function() {
    return a.asm.getTempRet0.apply(null, arguments);
  };
  a.runPostSets = function() {
    return a.asm.runPostSets.apply(null, arguments);
  };
  a.setTempRet0 = function() {
    return a.asm.setTempRet0.apply(null, arguments);
  };
  a.setThrew = function() {
    return a.asm.setThrew.apply(null, arguments);
  };
  a.stackAlloc = function() {
    return a.asm.stackAlloc.apply(null, arguments);
  };
  a.stackRestore = function() {
    return a.asm.stackRestore.apply(null, arguments);
  };
  a.stackSave = function() {
    return a.asm.stackSave.apply(null, arguments);
  };
  a.dynCall_ii = function() {
    return a.asm.dynCall_ii.apply(null, arguments);
  };
  a.dynCall_iii = function() {
    return a.asm.dynCall_iii.apply(null, arguments);
  };
  a.dynCall_iiii = function() {
    return a.asm.dynCall_iiii.apply(null, arguments);
  };
  a.dynCall_iiiiiii = function() {
    return a.asm.dynCall_iiiiiii.apply(null, arguments);
  };
  a.dynCall_v = function() {
    return a.asm.dynCall_v.apply(null, arguments);
  };
  a.dynCall_vi = function() {
    return a.asm.dynCall_vi.apply(null, arguments);
  };
  a.dynCall_vii = function() {
    return a.asm.dynCall_vii.apply(null, arguments);
  };
  a.dynCall_viii = function() {
    return a.asm.dynCall_viii.apply(null, arguments);
  };
  a.dynCall_viiii = function() {
    return a.asm.dynCall_viiii.apply(null, arguments);
  };
  a.dynCall_viiiii = function() {
    return a.asm.dynCall_viiiii.apply(null, arguments);
  };
  a.dynCall_viiiiii = function() {
    return a.asm.dynCall_viiiiii.apply(null, arguments);
  };
  m.stackAlloc = a.stackAlloc;
  m.stackSave = a.stackSave;
  m.stackRestore = a.stackRestore;
  m.establishStackSpace = a.establishStackSpace;
  m.setTempRet0 = a.setTempRet0;
  m.getTempRet0 = a.getTempRet0;
  a.asm = $a;
  if (Q)
    if (
      ("function" === typeof a.locateFile
        ? (Q = a.locateFile(Q))
        : a.memoryInitializerPrefixURL &&
          (Q = a.memoryInitializerPrefixURL + Q),
      la || ra)
    ) {
      var ed = a.readBinary(Q);
      O.set(ed, m.GLOBAL_BASE);
    } else {
      var bb = function() {
        a.readAsync(Q, ab, function() {
          throw "could not load memory initializer " + Q;
        });
      };
      v("memory initializer");
      var ab = function(c) {
        c.byteLength && (c = new Uint8Array(c));
        O.set(c, m.GLOBAL_BASE);
        a.memoryInitializerRequest &&
          delete a.memoryInitializerRequest.response;
        Ia("memory initializer");
      };
      if (a.memoryInitializerRequest) {
        var cb = function() {
          var c = a.memoryInitializerRequest,
            b = c.response;
          200 !== c.status && 0 !== c.status
            ? (console.warn(
                "a problem seems to have happened with Module.memoryInitializerRequest, status: " +
                  c.status +
                  ", retrying " +
                  Q
              ),
              bb())
            : ab(b);
        };
        a.memoryInitializerRequest.response
          ? setTimeout(cb, 0)
          : a.memoryInitializerRequest.addEventListener("load", cb);
      } else bb();
    }
  a.then = function(c) {
    if (a.calledRun) c(a);
    else {
      var b = a.onRuntimeInitialized;
      a.onRuntimeInitialized = function() {
        b && b();
        c(a);
      };
    }
    return a;
  };
  aa.prototype = Error();
  aa.prototype.constructor = aa;
  var Ua = null;
  oa = function b() {
    a.calledRun || ya();
    a.calledRun || (oa = b);
  };
  a.run = ya;
  a.exit = function(b, d) {
    if (!d || !a.noExitRuntime) {
      if (!a.noExitRuntime && ((ja = !0), (P = void 0), u(Za), a.onExit))
        a.onExit(b);
      la && process.exit(b);
      a.quit(b, new aa(b));
    }
  };
  var Wa = [];
  a.abort = S;
  if (a.preInit)
    for (
      "function" == typeof a.preInit && (a.preInit = [a.preInit]);
      0 < a.preInit.length;

    )
      a.preInit.pop()();
  ya();
  r.prototype = Object.create(r.prototype);
  r.prototype.constructor = r;
  r.prototype.__class__ = r;
  r.__cache__ = {};
  a.WrapperObject = r;
  a.getCache = B;
  a.wrapPointer = T;
  a.castObject = function(a, d) {
    return T(a.ptr, d);
  };
  a.NULL = T(0);
  a.destroy = function(a) {
    if (!a.__destroy__)
      throw "Error: Cannot destroy object. (Did you create it yourself?)";
    a.__destroy__();
    delete B(a.__class__)[a.ptr];
  };
  a.compare = function(a, d) {
    return a.ptr === d.ptr;
  };
  a.getPointer = function(a) {
    return a.ptr;
  };
  a.getClass = function(a) {
    return a.__class__;
  };
  var k = {
    buffer: 0,
    size: 0,
    pos: 0,
    temps: [],
    needed: 0,
    prepare: function() {
      if (k.needed) {
        for (var b = 0; b < k.temps.length; b++) a._free(k.temps[b]);
        k.temps.length = 0;
        a._free(k.buffer);
        k.buffer = 0;
        k.size += k.needed;
        k.needed = 0;
      }
      k.buffer ||
        ((k.size += 128), (k.buffer = a._malloc(k.size)), f(k.buffer));
      k.pos = 0;
    },
    alloc: function(b, d) {
      f(k.buffer);
      b = b.length * d.BYTES_PER_ELEMENT;
      b = (b + 7) & -8;
      k.pos + b >= k.size
        ? (f(0 < b), (k.needed += b), (d = a._malloc(b)), k.temps.push(d))
        : ((d = k.buffer + k.pos), (k.pos += b));
      return d;
    },
    copy: function(a, d, c) {
      switch (d.BYTES_PER_ELEMENT) {
        case 2:
          c >>= 1;
          break;
        case 4:
          c >>= 2;
          break;
        case 8:
          c >>= 3;
      }
      for (var b = 0; b < a.length; b++) d[c + b] = a[b];
    }
  };
  A.prototype = Object.create(r.prototype);
  A.prototype.constructor = A;
  A.prototype.__class__ = A;
  A.__cache__ = {};
  a.Status = A;
  A.prototype.code = A.prototype.code = function() {
    return Ic(this.ptr);
  };
  A.prototype.ok = A.prototype.ok = function() {
    return !!Kc(this.ptr);
  };
  A.prototype.error_msg = A.prototype.error_msg = function() {
    return n(Jc(this.ptr));
  };
  A.prototype.__destroy__ = A.prototype.__destroy__ = function() {
    Hc(this.ptr);
  };
  G.prototype = Object.create(r.prototype);
  G.prototype.constructor = G;
  G.prototype.__class__ = G;
  G.__cache__ = {};
  a.PointCloud = G;
  G.prototype.num_attributes = G.prototype.num_attributes = function() {
    return Fc(this.ptr);
  };
  G.prototype.num_points = G.prototype.num_points = function() {
    return Gc(this.ptr);
  };
  G.prototype.__destroy__ = G.prototype.__destroy__ = function() {
    Ec(this.ptr);
  };
  H.prototype = Object.create(r.prototype);
  H.prototype.constructor = H;
  H.prototype.__class__ = H;
  H.__cache__ = {};
  a.AttributeOctahedronTransform = H;
  H.prototype.InitFromAttribute = H.prototype.InitFromAttribute = function(a) {
    var b = this.ptr;
    a && "object" === typeof a && (a = a.ptr);
    return !!vb(b, a);
  };
  H.prototype.quantization_bits = H.prototype.quantization_bits = function() {
    return xb(this.ptr);
  };
  H.prototype.__destroy__ = H.prototype.__destroy__ = function() {
    wb(this.ptr);
  };
  p.prototype = Object.create(r.prototype);
  p.prototype.constructor = p;
  p.prototype.__class__ = p;
  p.__cache__ = {};
  a.PointAttribute = p;
  p.prototype.size = p.prototype.size = function() {
    return Cc(this.ptr);
  };
  p.prototype.GetAttributeTransformData = p.prototype.GetAttributeTransformData = function() {
    return T(uc(this.ptr), K);
  };
  p.prototype.attribute_type = p.prototype.attribute_type = function() {
    return wc(this.ptr);
  };
  p.prototype.data_type = p.prototype.data_type = function() {
    return zc(this.ptr);
  };
  p.prototype.num_components = p.prototype.num_components = function() {
    return Bc(this.ptr);
  };
  p.prototype.normalized = p.prototype.normalized = function() {
    return !!Ac(this.ptr);
  };
  p.prototype.byte_stride = p.prototype.byte_stride = function() {
    return yc(this.ptr);
  };
  p.prototype.byte_offset = p.prototype.byte_offset = function() {
    return xc(this.ptr);
  };
  p.prototype.unique_id = p.prototype.unique_id = function() {
    return Dc(this.ptr);
  };
  p.prototype.__destroy__ = p.prototype.__destroy__ = function() {
    vc(this.ptr);
  };
  K.prototype = Object.create(r.prototype);
  K.prototype.constructor = K;
  K.prototype.__class__ = K;
  K.__cache__ = {};
  a.AttributeTransformData = K;
  K.prototype.transform_type = K.prototype.transform_type = function() {
    return Eb(this.ptr);
  };
  K.prototype.__destroy__ = K.prototype.__destroy__ = function() {
    Db(this.ptr);
  };
  y.prototype = Object.create(r.prototype);
  y.prototype.constructor = y;
  y.prototype.__class__ = y;
  y.__cache__ = {};
  a.AttributeQuantizationTransform = y;
  y.prototype.InitFromAttribute = y.prototype.InitFromAttribute = function(a) {
    var b = this.ptr;
    a && "object" === typeof a && (a = a.ptr);
    return !!yb(b, a);
  };
  y.prototype.quantization_bits = y.prototype.quantization_bits = function() {
    return Bb(this.ptr);
  };
  y.prototype.min_value = y.prototype.min_value = function(a) {
    var b = this.ptr;
    a && "object" === typeof a && (a = a.ptr);
    return Ab(b, a);
  };
  y.prototype.range = y.prototype.range = function() {
    return Cb(this.ptr);
  };
  y.prototype.__destroy__ = y.prototype.__destroy__ = function() {
    zb(this.ptr);
  };
  q.prototype = Object.create(r.prototype);
  q.prototype.constructor = q;
  q.prototype.__class__ = q;
  q.__cache__ = {};
  a.MetadataQuerier = q;
  q.prototype.HasEntry = q.prototype.HasEntry = function(a, d) {
    var b = this.ptr;
    k.prepare();
    a && "object" === typeof a && (a = a.ptr);
    d = d && "object" === typeof d ? d.ptr : U(d);
    return !!oc(b, a, d);
  };
  q.prototype.HasIntEntry = q.prototype.HasIntEntry = function(a, d) {
    var b = this.ptr;
    k.prepare();
    a && "object" === typeof a && (a = a.ptr);
    d = d && "object" === typeof d ? d.ptr : U(d);
    return !!pc(b, a, d);
  };
  q.prototype.GetIntEntry = q.prototype.GetIntEntry = function(a, d) {
    var b = this.ptr;
    k.prepare();
    a && "object" === typeof a && (a = a.ptr);
    d = d && "object" === typeof d ? d.ptr : U(d);
    return lc(b, a, d);
  };
  q.prototype.HasDoubleEntry = q.prototype.HasDoubleEntry = function(a, d) {
    var b = this.ptr;
    k.prepare();
    a && "object" === typeof a && (a = a.ptr);
    d = d && "object" === typeof d ? d.ptr : U(d);
    return !!nc(b, a, d);
  };
  q.prototype.GetDoubleEntry = q.prototype.GetDoubleEntry = function(a, d) {
    var b = this.ptr;
    k.prepare();
    a && "object" === typeof a && (a = a.ptr);
    d = d && "object" === typeof d ? d.ptr : U(d);
    return jc(b, a, d);
  };
  q.prototype.HasStringEntry = q.prototype.HasStringEntry = function(a, d) {
    var b = this.ptr;
    k.prepare();
    a && "object" === typeof a && (a = a.ptr);
    d = d && "object" === typeof d ? d.ptr : U(d);
    return !!qc(b, a, d);
  };
  q.prototype.GetStringEntry = q.prototype.GetStringEntry = function(a, d) {
    var b = this.ptr;
    k.prepare();
    a && "object" === typeof a && (a = a.ptr);
    d = d && "object" === typeof d ? d.ptr : U(d);
    return n(mc(b, a, d));
  };
  q.prototype.NumEntries = q.prototype.NumEntries = function(a) {
    var b = this.ptr;
    a && "object" === typeof a && (a = a.ptr);
    return rc(b, a);
  };
  q.prototype.GetEntryName = q.prototype.GetEntryName = function(a, d) {
    var b = this.ptr;
    a && "object" === typeof a && (a = a.ptr);
    d && "object" === typeof d && (d = d.ptr);
    return n(kc(b, a, d));
  };
  q.prototype.__destroy__ = q.prototype.__destroy__ = function() {
    sc(this.ptr);
  };
  I.prototype = Object.create(r.prototype);
  I.prototype.constructor = I;
  I.prototype.__class__ = I;
  I.__cache__ = {};
  a.DracoFloat32Array = I;
  I.prototype.GetValue = I.prototype.GetValue = function(a) {
    var b = this.ptr;
    a && "object" === typeof a && (a = a.ptr);
    return Zb(b, a);
  };
  I.prototype.size = I.prototype.size = function() {
    return ac(this.ptr);
  };
  I.prototype.__destroy__ = I.prototype.__destroy__ = function() {
    $b(this.ptr);
  };
  V.prototype = Object.create(r.prototype);
  V.prototype.constructor = V;
  V.prototype.__class__ = V;
  V.__cache__ = {};
  a.GeometryAttribute = V;
  V.prototype.__destroy__ = V.prototype.__destroy__ = function() {
    ec(this.ptr);
  };
  M.prototype = Object.create(r.prototype);
  M.prototype.constructor = M;
  M.prototype.__class__ = M;
  M.__cache__ = {};
  a.DecoderBuffer = M;
  M.prototype.Init = M.prototype.Init = function(a, d) {
    var b = this.ptr;
    k.prepare();
    if ("object" == typeof a && "object" === typeof a) {
      var c = k.alloc(a, ba);
      k.copy(a, ba, c);
      a = c;
    }
    d && "object" === typeof d && (d = d.ptr);
    Fb(b, a, d);
  };
  M.prototype.__destroy__ = M.prototype.__destroy__ = function() {
    Gb(this.ptr);
  };
  h.prototype = Object.create(r.prototype);
  h.prototype.constructor = h;
  h.prototype.__class__ = h;
  h.__cache__ = {};
  a.Decoder = h;
  h.prototype.GetEncodedGeometryType = h.prototype.GetEncodedGeometryType = function(
    a
  ) {
    var b = this.ptr;
    a && "object" === typeof a && (a = a.ptr);
    return Tb(b, a);
  };
  h.prototype.DecodeBufferToPointCloud = h.prototype.DecodeBufferToPointCloud = function(
    a,
    d
  ) {
    var b = this.ptr;
    a && "object" === typeof a && (a = a.ptr);
    d && "object" === typeof d && (d = d.ptr);
    return T(Ib(b, a, d), A);
  };
  h.prototype.DecodeBufferToMesh = h.prototype.DecodeBufferToMesh = function(
    a,
    d
  ) {
    var b = this.ptr;
    a && "object" === typeof a && (a = a.ptr);
    d && "object" === typeof d && (d = d.ptr);
    return T(Hb(b, a, d), A);
  };
  h.prototype.GetAttributeId = h.prototype.GetAttributeId = function(a, d) {
    var b = this.ptr;
    a && "object" === typeof a && (a = a.ptr);
    d && "object" === typeof d && (d = d.ptr);
    return Ob(b, a, d);
  };
  h.prototype.GetAttributeIdByName = h.prototype.GetAttributeIdByName = function(
    a,
    d
  ) {
    var b = this.ptr;
    k.prepare();
    a && "object" === typeof a && (a = a.ptr);
    d = d && "object" === typeof d ? d.ptr : U(d);
    return Nb(b, a, d);
  };
  h.prototype.GetAttributeIdByMetadataEntry = h.prototype.GetAttributeIdByMetadataEntry = function(
    a,
    d,
    c
  ) {
    var b = this.ptr;
    k.prepare();
    a && "object" === typeof a && (a = a.ptr);
    d = d && "object" === typeof d ? d.ptr : U(d);
    c = c && "object" === typeof c ? c.ptr : U(c);
    return Mb(b, a, d, c);
  };
  h.prototype.GetAttribute = h.prototype.GetAttribute = function(a, d) {
    var b = this.ptr;
    a && "object" === typeof a && (a = a.ptr);
    d && "object" === typeof d && (d = d.ptr);
    return T(Sb(b, a, d), p);
  };
  h.prototype.GetAttributeByUniqueId = h.prototype.GetAttributeByUniqueId = function(
    a,
    d
  ) {
    var b = this.ptr;
    a && "object" === typeof a && (a = a.ptr);
    d && "object" === typeof d && (d = d.ptr);
    return T(Jb(b, a, d), p);
  };
  h.prototype.GetMetadata = h.prototype.GetMetadata = function(a) {
    var b = this.ptr;
    a && "object" === typeof a && (a = a.ptr);
    return T(Vb(b, a), N);
  };
  h.prototype.GetAttributeMetadata = h.prototype.GetAttributeMetadata = function(
    a,
    d
  ) {
    var b = this.ptr;
    a && "object" === typeof a && (a = a.ptr);
    d && "object" === typeof d && (d = d.ptr);
    return T(Rb(b, a, d), N);
  };
  h.prototype.GetFaceFromMesh = h.prototype.GetFaceFromMesh = function(
    a,
    d,
    c
  ) {
    var b = this.ptr;
    a && "object" === typeof a && (a = a.ptr);
    d && "object" === typeof d && (d = d.ptr);
    c && "object" === typeof c && (c = c.ptr);
    return !!Ub(b, a, d, c);
  };
  h.prototype.GetTriangleStripsFromMesh = h.prototype.GetTriangleStripsFromMesh = function(
    a,
    d
  ) {
    var b = this.ptr;
    a && "object" === typeof a && (a = a.ptr);
    d && "object" === typeof d && (d = d.ptr);
    return Wb(b, a, d);
  };
  h.prototype.GetAttributeFloat = h.prototype.GetAttributeFloat = function(
    a,
    d,
    c
  ) {
    var b = this.ptr;
    a && "object" === typeof a && (a = a.ptr);
    d && "object" === typeof d && (d = d.ptr);
    c && "object" === typeof c && (c = c.ptr);
    return !!Lb(b, a, d, c);
  };
  h.prototype.GetAttributeFloatForAllPoints = h.prototype.GetAttributeFloatForAllPoints = function(
    a,
    c,
    f
  ) {
    var b = this.ptr;
    a && "object" === typeof a && (a = a.ptr);
    c && "object" === typeof c && (c = c.ptr);
    f && "object" === typeof f && (f = f.ptr);
    return !!Kb(b, a, c, f);
  };
  h.prototype.GetAttributeIntForAllPoints = h.prototype.GetAttributeIntForAllPoints = function(
    a,
    c,
    f
  ) {
    var b = this.ptr;
    a && "object" === typeof a && (a = a.ptr);
    c && "object" === typeof c && (c = c.ptr);
    f && "object" === typeof f && (f = f.ptr);
    return !!Qb(b, a, c, f);
  };
  h.prototype.GetAttributeInt32ForAllPoints = h.prototype.GetAttributeInt32ForAllPoints = function(
    a,
    c,
    f
  ) {
    var b = this.ptr;
    a && "object" === typeof a && (a = a.ptr);
    c && "object" === typeof c && (c = c.ptr);
    f && "object" === typeof f && (f = f.ptr);
    return !!Pb(b, a, c, f);
  };
  h.prototype.SkipAttributeTransform = h.prototype.SkipAttributeTransform = function(
    a
  ) {
    var b = this.ptr;
    a && "object" === typeof a && (a = a.ptr);
    Xb(b, a);
  };
  h.prototype.__destroy__ = h.prototype.__destroy__ = function() {
    Yb(this.ptr);
  };
  C.prototype = Object.create(r.prototype);
  C.prototype.constructor = C;
  C.prototype.__class__ = C;
  C.__cache__ = {};
  a.Mesh = C;
  C.prototype.num_faces = C.prototype.num_faces = function() {
    return hc(this.ptr);
  };
  C.prototype.num_attributes = C.prototype.num_attributes = function() {
    return gc(this.ptr);
  };
  C.prototype.num_points = C.prototype.num_points = function() {
    return ic(this.ptr);
  };
  C.prototype.__destroy__ = C.prototype.__destroy__ = function() {
    fc(this.ptr);
  };
  Y.prototype = Object.create(r.prototype);
  Y.prototype.constructor = Y;
  Y.prototype.__class__ = Y;
  Y.__cache__ = {};
  a.VoidPtr = Y;
  Y.prototype.__destroy__ = Y.prototype.__destroy__ = function() {
    Lc(this.ptr);
  };
  J.prototype = Object.create(r.prototype);
  J.prototype.constructor = J;
  J.prototype.__class__ = J;
  J.__cache__ = {};
  a.DracoInt32Array = J;
  J.prototype.GetValue = J.prototype.GetValue = function(a) {
    var b = this.ptr;
    a && "object" === typeof a && (a = a.ptr);
    return bc(b, a);
  };
  J.prototype.size = J.prototype.size = function() {
    return dc(this.ptr);
  };
  J.prototype.__destroy__ = J.prototype.__destroy__ = function() {
    cc(this.ptr);
  };
  N.prototype = Object.create(r.prototype);
  N.prototype.constructor = N;
  N.prototype.__class__ = N;
  N.__cache__ = {};
  a.Metadata = N;
  N.prototype.__destroy__ = N.prototype.__destroy__ = function() {
    tc(this.ptr);
  };
  (function() {
    function b() {
      a.OK = bd();
      a.ERROR = Zc();
      a.IO_ERROR = ad();
      a.INVALID_PARAMETER = $c();
      a.UNSUPPORTED_VERSION = dd();
      a.UNKNOWN_VERSION = cd();
      a.INVALID_GEOMETRY_TYPE = Qc();
      a.POINT_CLOUD = Rc();
      a.TRIANGULAR_MESH = Sc();
      a.ATTRIBUTE_INVALID_TRANSFORM = Mc();
      a.ATTRIBUTE_NO_TRANSFORM = Nc();
      a.ATTRIBUTE_QUANTIZATION_TRANSFORM = Pc();
      a.ATTRIBUTE_OCTAHEDRON_TRANSFORM = Oc();
      a.INVALID = Vc();
      a.POSITION = Xc();
      a.NORMAL = Wc();
      a.COLOR = Tc();
      a.TEX_COORD = Yc();
      a.GENERIC = Uc();
    }
    a.calledRun ? b() : Sa.unshift(b);
  })();
  if ("function" === typeof a.onModuleParsed) a.onModuleParsed();
  return c;
};
"object" === typeof module &&
  module.exports &&
  (module.exports = DracoDecoderModule);
