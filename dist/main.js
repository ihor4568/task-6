!(function(t) {
  var e = {};
  function s(i) {
    if (e[i]) return e[i].exports;
    var n = (e[i] = { i: i, l: !1, exports: {} });
    return t[i].call(n.exports, n, n.exports, s), (n.l = !0), n.exports;
  }
  (s.m = t),
    (s.c = e),
    (s.d = function(t, e, i) {
      s.o(t, e) || Object.defineProperty(t, e, { enumerable: !0, get: i });
    }),
    (s.r = function(t) {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(t, "__esModule", { value: !0 });
    }),
    (s.t = function(t, e) {
      if ((1 & e && (t = s(t)), 8 & e)) return t;
      if (4 & e && "object" == typeof t && t && t.__esModule) return t;
      var i = Object.create(null);
      if (
        (s.r(i),
        Object.defineProperty(i, "default", { enumerable: !0, value: t }),
        2 & e && "string" != typeof t)
      )
        for (var n in t)
          s.d(
            i,
            n,
            function(e) {
              return t[e];
            }.bind(null, n)
          );
      return i;
    }),
    (s.n = function(t) {
      var e =
        t && t.__esModule
          ? function() {
              return t.default;
            }
          : function() {
              return t;
            };
      return s.d(e, "a", e), e;
    }),
    (s.o = function(t, e) {
      return Object.prototype.hasOwnProperty.call(t, e);
    }),
    (s.p = "dist/"),
    s((s.s = 5));
})([
  function(t, e, s) {
    var i = s(2),
      n = s(3),
      a = null;
    function o(t) {
      return setTimeout(t, 0);
    }
    t.exports = function(t, e) {
      var s = document,
        r = "string" == typeof t ? s.querySelector(t) : t,
        l = n({ returnFocusOnDeactivate: !0, escapeDeactivates: !0 }, e),
        c = {
          firstTabbableNode: null,
          lastTabbableNode: null,
          nodeFocusedBeforeActivation: null,
          mostRecentlyFocusedNode: null,
          active: !1,
          paused: !1
        },
        d = {
          activate: function(t) {
            if (!c.active) {
              C(),
                (c.active = !0),
                (c.paused = !1),
                (c.nodeFocusedBeforeActivation = s.activeElement);
              var e = t && t.onActivate ? t.onActivate : l.onActivate;
              return e && e(), _(), d;
            }
          },
          deactivate: h,
          pause: function() {
            !c.paused && c.active && ((c.paused = !0), u());
          },
          unpause: function() {
            c.paused && c.active && ((c.paused = !1), _());
          }
        };
      return d;
      function h(t) {
        if (c.active) {
          u(), (c.active = !1), (c.paused = !1);
          var e =
            t && void 0 !== t.onDeactivate ? t.onDeactivate : l.onDeactivate;
          return (
            e && e(),
            (t && void 0 !== t.returnFocus
              ? t.returnFocus
              : l.returnFocusOnDeactivate) &&
              o(function() {
                S(c.nodeFocusedBeforeActivation);
              }),
            d
          );
        }
      }
      function _() {
        if (c.active)
          return (
            a && a.pause(),
            (a = d),
            C(),
            o(function() {
              S(m());
            }),
            s.addEventListener("focusin", f, !0),
            s.addEventListener("mousedown", E, !0),
            s.addEventListener("touchstart", E, !0),
            s.addEventListener("click", T, !0),
            s.addEventListener("keydown", g, !0),
            d
          );
      }
      function u() {
        if (c.active && a === d)
          return (
            s.removeEventListener("focusin", f, !0),
            s.removeEventListener("mousedown", E, !0),
            s.removeEventListener("touchstart", E, !0),
            s.removeEventListener("click", T, !0),
            s.removeEventListener("keydown", g, !0),
            (a = null),
            d
          );
      }
      function p(t) {
        var e = l[t],
          i = e;
        if (!e) return null;
        if ("string" == typeof e && !(i = s.querySelector(e)))
          throw new Error("`" + t + "` refers to no known node");
        if ("function" == typeof e && !(i = e()))
          throw new Error("`" + t + "` did not return a node");
        return i;
      }
      function m() {
        var t;
        if (
          !(t =
            null !== p("initialFocus")
              ? p("initialFocus")
              : r.contains(s.activeElement)
                ? s.activeElement
                : c.firstTabbableNode || p("fallbackFocus"))
        )
          throw new Error(
            "You can't have a focus-trap without at least one focusable element"
          );
        return t;
      }
      function E(t) {
        r.contains(t.target) ||
          (l.clickOutsideDeactivates
            ? h({ returnFocus: !i.isFocusable(t.target) })
            : t.preventDefault());
      }
      function f(t) {
        r.contains(t.target) ||
          t.target instanceof Document ||
          (t.stopImmediatePropagation(), S(c.mostRecentlyFocusedNode || m()));
      }
      function g(t) {
        if (
          !1 !== l.escapeDeactivates &&
          (function(t) {
            return "Escape" === t.key || "Esc" === t.key || 27 === t.keyCode;
          })(t)
        )
          return t.preventDefault(), void h();
        (function(t) {
          return "Tab" === t.key || 9 === t.keyCode;
        })(t) &&
          (function(t) {
            if ((C(), t.shiftKey && t.target === c.firstTabbableNode))
              return t.preventDefault(), void S(c.lastTabbableNode);
            t.shiftKey ||
              t.target !== c.lastTabbableNode ||
              (t.preventDefault(), S(c.firstTabbableNode));
          })(t);
      }
      function T(t) {
        l.clickOutsideDeactivates ||
          r.contains(t.target) ||
          (t.preventDefault(), t.stopImmediatePropagation());
      }
      function C() {
        var t = i(r);
        (c.firstTabbableNode = t[0] || m()),
          (c.lastTabbableNode = t[t.length - 1] || m());
      }
      function S(t) {
        t !== s.activeElement &&
          (t && t.focus
            ? (t.focus(),
              (c.mostRecentlyFocusedNode = t),
              (function(t) {
                return (
                  t.tagName &&
                  "input" === t.tagName.toLowerCase() &&
                  "function" == typeof t.select
                );
              })(t) && t.select())
            : S(m()));
      }
    };
  },
  function(t, e, s) {
    var i = s(4),
      n = null;
    function a(t) {
      t &&
        t.focus &&
        t !== document.activeElement &&
        (t.focus(), "input" === t.tagName.toLowerCase() && t.select());
    }
    t.exports = function(t, e) {
      var s = [],
        o = null,
        r = null,
        l = null,
        c = !1,
        d = !1,
        h = null,
        _ = "string" == typeof t ? document.querySelector(t) : t,
        u = e || {};
      (u.returnFocusOnDeactivate =
        !e ||
        void 0 === e.returnFocusOnDeactivate ||
        e.returnFocusOnDeactivate),
        (u.escapeDeactivates =
          !e || void 0 === e.escapeDeactivates || e.escapeDeactivates);
      var p = {
        activate: function(t) {
          if (!c) {
            var e = {
              onActivate:
                t && void 0 !== t.onActivate ? t.onActivate : u.onActivate
            };
            return (
              (c = !0),
              (d = !1),
              (l = document.activeElement),
              e.onActivate && e.onActivate(),
              E(),
              p
            );
          }
        },
        deactivate: m,
        pause: function() {
          !d && c && ((d = !0), f());
        },
        unpause: function() {
          d && c && ((d = !1), E());
        }
      };
      return p;
      function m(t) {
        if (c) {
          var e = {
            returnFocus:
              t && void 0 !== t.returnFocus
                ? t.returnFocus
                : u.returnFocusOnDeactivate,
            onDeactivate:
              t && void 0 !== t.onDeactivate ? t.onDeactivate : u.onDeactivate
          };
          return (
            f(),
            e.onDeactivate && e.onDeactivate(),
            e.returnFocus &&
              setTimeout(function() {
                a(l);
              }, 0),
            (c = !1),
            (d = !1),
            this
          );
        }
      }
      function E() {
        if (c)
          return (
            n && n.pause(),
            (n = p),
            A(),
            setTimeout(function() {
              a(
                (function() {
                  var t;
                  if (
                    !(t =
                      null !== g("initialFocus")
                        ? g("initialFocus")
                        : _.contains(document.activeElement)
                          ? document.activeElement
                          : s[0] || g("fallbackFocus"))
                  )
                    throw new Error(
                      "You can't have a focus-trap without at least one focusable element"
                    );
                  return t;
                })()
              );
            }, 0),
            document.addEventListener("focus", S, !0),
            document.addEventListener("click", C, !0),
            document.addEventListener("mousedown", T, !0),
            document.addEventListener("touchstart", T, !0),
            document.addEventListener("keydown", v, !0),
            p
          );
      }
      function f() {
        if (c && n === p)
          return (
            document.removeEventListener("focus", S, !0),
            document.removeEventListener("click", C, !0),
            document.removeEventListener("mousedown", T, !0),
            document.removeEventListener("touchstart", T, !0),
            document.removeEventListener("keydown", v, !0),
            (n = null),
            p
          );
      }
      function g(t) {
        var e = u[t],
          s = e;
        if (!e) return null;
        if ("string" == typeof e && !(s = document.querySelector(e)))
          throw new Error("`" + t + "` refers to no known node");
        if ("function" == typeof e && !(s = e()))
          throw new Error("`" + t + "` did not return a node");
        return s;
      }
      function T(t) {
        u.clickOutsideDeactivates &&
          !_.contains(t.target) &&
          m({ returnFocus: !1 });
      }
      function C(t) {
        u.clickOutsideDeactivates ||
          _.contains(t.target) ||
          (t.preventDefault(), t.stopImmediatePropagation());
      }
      function S(t) {
        _.contains(t.target) ||
          (t.preventDefault(),
          t.stopImmediatePropagation(),
          "function" == typeof t.target.blur && t.target.blur(),
          h &&
            (function(t) {
              if (t.shiftKey) return a(r);
              a(o);
            })(h));
      }
      function v(t) {
        ("Tab" !== t.key && 9 !== t.keyCode) ||
          (function(t) {
            if (
              (A(),
              t.target.hasAttribute("tabindex") &&
                Number(t.target.getAttribute("tabindex")) < 0)
            )
              return (h = t);
            t.preventDefault();
            var e = s.indexOf(t.target);
            t.shiftKey
              ? t.target === o || -1 === s.indexOf(t.target)
                ? a(r)
                : a(s[e - 1])
              : t.target === r
                ? a(o)
                : a(s[e + 1]);
          })(t),
          !1 !== u.escapeDeactivates &&
            (function(t) {
              return "Escape" === t.key || "Esc" === t.key || 27 === t.keyCode;
            })(t) &&
            m();
      }
      function A() {
        (s = i(_)), (o = s[0]), (r = s[s.length - 1]);
      }
    };
  },
  function(t, e) {
    var s = [
        "input",
        "select",
        "textarea",
        "a[href]",
        "button",
        "[tabindex]",
        "audio[controls]",
        "video[controls]",
        '[contenteditable]:not([contenteditable="false"])'
      ],
      i = s.join(","),
      n =
        "undefined" == typeof Element
          ? function() {}
          : Element.prototype.matches ||
            Element.prototype.msMatchesSelector ||
            Element.prototype.webkitMatchesSelector;
    function a(t, e) {
      e = e || {};
      var s,
        a,
        r,
        l = [],
        h = [],
        u = new _(t.ownerDocument || t),
        p = t.querySelectorAll(i);
      for (
        e.includeContainer &&
          n.call(t, i) &&
          (p = Array.prototype.slice.apply(p)).unshift(t),
          s = 0;
        s < p.length;
        s++
      )
        o((a = p[s]), u) &&
          (0 === (r = c(a))
            ? l.push(a)
            : h.push({ documentOrder: s, tabIndex: r, node: a }));
      return h
        .sort(d)
        .map(function(t) {
          return t.node;
        })
        .concat(l);
    }
    function o(t, e) {
      return !(
        !r(t, e) ||
        (function(t) {
          return (
            (function(t) {
              return h(t) && "radio" === t.type;
            })(t) &&
            !(function(t) {
              if (!t.name) return !0;
              var e = (function(t) {
                for (var e = 0; e < t.length; e++)
                  if (t[e].checked) return t[e];
              })(
                t.ownerDocument.querySelectorAll(
                  'input[type="radio"][name="' + t.name + '"]'
                )
              );
              return !e || e === t;
            })(t)
          );
        })(t) ||
        c(t) < 0
      );
    }
    function r(t, e) {
      return (
        (e = e || new _(t.ownerDocument || t)),
        !(
          t.disabled ||
          (function(t) {
            return h(t) && "hidden" === t.type;
          })(t) ||
          e.isUntouchable(t)
        )
      );
    }
    (a.isTabbable = function(t, e) {
      if (!t) throw new Error("No node provided");
      return !1 !== n.call(t, i) && o(t, e);
    }),
      (a.isFocusable = function(t, e) {
        if (!t) throw new Error("No node provided");
        return !1 !== n.call(t, l) && r(t, e);
      });
    var l = s.concat("iframe").join(",");
    function c(t) {
      var e = parseInt(t.getAttribute("tabindex"), 10);
      return isNaN(e)
        ? (function(t) {
            return "true" === t.contentEditable;
          })(t)
          ? 0
          : t.tabIndex
        : e;
    }
    function d(t, e) {
      return t.tabIndex === e.tabIndex
        ? t.documentOrder - e.documentOrder
        : t.tabIndex - e.tabIndex;
    }
    function h(t) {
      return "INPUT" === t.tagName;
    }
    function _(t) {
      (this.doc = t), (this.cache = []);
    }
    (_.prototype.hasDisplayNone = function(t, e) {
      if (t === this.doc.documentElement) return !1;
      var s = (function(t, e) {
        for (var s = 0, i = t.length; s < i; s++) if (e(t[s])) return t[s];
      })(this.cache, function(e) {
        return e === t;
      });
      if (s) return s[1];
      var i = !1;
      return (
        "none" === (e = e || this.doc.defaultView.getComputedStyle(t)).display
          ? (i = !0)
          : t.parentNode && (i = this.hasDisplayNone(t.parentNode)),
        this.cache.push([t, i]),
        i
      );
    }),
      (_.prototype.isUntouchable = function(t) {
        if (t === this.doc.documentElement) return !1;
        var e = this.doc.defaultView.getComputedStyle(t);
        return !!this.hasDisplayNone(t, e) || "hidden" === e.visibility;
      }),
      (t.exports = a);
  },
  function(t, e) {
    t.exports = function() {
      for (var t = {}, e = 0; e < arguments.length; e++) {
        var i = arguments[e];
        for (var n in i) s.call(i, n) && (t[n] = i[n]);
      }
      return t;
    };
    var s = Object.prototype.hasOwnProperty;
  },
  function(t, e) {
    t.exports = function(t, e) {
      e = e || {};
      var s,
        i,
        n,
        a = t.ownerDocument || t,
        o = [],
        r = [],
        l = (function(t) {
          var e = [];
          return function(s) {
            if (s === t.documentElement) return !1;
            var i = t.defaultView.getComputedStyle(s);
            return (
              !!(function s(i, n) {
                if (i === t.documentElement) return !1;
                for (var a = 0, o = e.length; a < o; a++)
                  if (e[a][0] === i) return e[a][1];
                n = n || t.defaultView.getComputedStyle(i);
                var r = !1;
                "none" === n.display
                  ? (r = !0)
                  : i.parentNode && (r = s(i.parentNode));
                e.push([i, r]);
                return r;
              })(s, i) || "hidden" === i.visibility
            );
          };
        })(a),
        c = ["input", "select", "a[href]", "textarea", "button", "[tabindex]"],
        d = t.querySelectorAll(c.join(","));
      if (e.includeContainer) {
        var h =
          Element.prototype.matches ||
          Element.prototype.msMatchesSelector ||
          Element.prototype.webkitMatchesSelector;
        c.some(function(e) {
          return h.call(t, e);
        }) && (d = Array.prototype.slice.apply(d)).unshift(t);
      }
      for (var _ = 0, u = d.length; _ < u; _++)
        (s = d[_]),
          (i = parseInt(s.getAttribute("tabindex"), 10)),
          (n = isNaN(i) ? s.tabIndex : i) < 0 ||
            ("INPUT" === s.tagName && "hidden" === s.type) ||
            s.disabled ||
            l(s, a) ||
            (0 === n ? o.push(s) : r.push({ index: _, tabIndex: n, node: s }));
      var p = r
        .sort(function(t, e) {
          return t.tabIndex === e.tabIndex
            ? t.index - e.index
            : t.tabIndex - e.tabIndex;
        })
        .map(function(t) {
          return t.node;
        });
      return Array.prototype.push.apply(p, o), p;
    };
  },
  function(t, e, s) {
    "use strict";
    s.r(e);
    s(6);
    /**
     * @license
     * Copyright 2016 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */ var i = class {
      static get cssClasses() {
        return {};
      }
      static get strings() {
        return {};
      }
      static get numbers() {
        return {};
      }
      static get defaultAdapter() {
        return {};
      }
      constructor(t = {}) {
        this.adapter_ = t;
      }
      init() {}
      destroy() {}
    };
    /**
     * @license
     * Copyright 2016 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */ class n {
      static attachTo(t) {
        return new n(t, new i());
      }
      constructor(t, e, ...s) {
        (this.root_ = t),
          this.initialize(...s),
          (this.foundation_ = void 0 === e ? this.getDefaultFoundation() : e),
          this.foundation_.init(),
          this.initialSyncWithDOM();
      }
      initialize() {}
      getDefaultFoundation() {
        throw new Error(
          "Subclasses must override getDefaultFoundation to return a properly configured foundation class"
        );
      }
      initialSyncWithDOM() {}
      destroy() {
        this.foundation_.destroy();
      }
      listen(t, e) {
        this.root_.addEventListener(t, e);
      }
      unlisten(t, e) {
        this.root_.removeEventListener(t, e);
      }
      emit(t, e, s = !1) {
        let i;
        "function" == typeof CustomEvent
          ? (i = new CustomEvent(t, { detail: e, bubbles: s }))
          : (i = document.createEvent("CustomEvent")).initCustomEvent(
              t,
              s,
              !1,
              e
            ),
          this.root_.dispatchEvent(i);
      }
    }
    var a = n;
    /**
     * @license
     * Copyright 2016 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    /**
     * @license
     * Copyright 2018 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    /**
     * @license
     * Copyright 2016 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    const o = {
        ROOT: "mdc-drawer",
        DISMISSIBLE: "mdc-drawer--dismissible",
        MODAL: "mdc-drawer--modal",
        OPEN: "mdc-drawer--open",
        ANIMATE: "mdc-drawer--animate",
        OPENING: "mdc-drawer--opening",
        CLOSING: "mdc-drawer--closing"
      },
      r = {
        APP_CONTENT_SELECTOR: ".mdc-drawer-app-content",
        SCRIM_SELECTOR: ".mdc-drawer-scrim",
        CLOSE_EVENT: "MDCDrawer:closed",
        OPEN_EVENT: "MDCDrawer:opened"
      };
    var l =
      /**
       * @license
       * Copyright 2018 Google Inc.
       *
       * Permission is hereby granted, free of charge, to any person obtaining a copy
       * of this software and associated documentation files (the "Software"), to deal
       * in the Software without restriction, including without limitation the rights
       * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
       * copies of the Software, and to permit persons to whom the Software is
       * furnished to do so, subject to the following conditions:
       *
       * The above copyright notice and this permission notice shall be included in
       * all copies or substantial portions of the Software.
       *
       * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
       * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
       * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
       * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
       * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
       * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
       * THE SOFTWARE.
       */
      class extends i {
        static get strings() {
          return r;
        }
        static get cssClasses() {
          return o;
        }
        static get defaultAdapter() {
          return {
            addClass: () => {},
            removeClass: () => {},
            hasClass: () => {},
            elementHasClass: () => {},
            computeBoundingRect: () => {},
            notifyClose: () => {},
            notifyOpen: () => {},
            saveFocus: () => {},
            restoreFocus: () => {},
            focusActiveNavigationItem: () => {},
            trapFocus: () => {},
            releaseFocus: () => {}
          };
        }
        open() {
          this.isOpen() ||
            this.isOpening() ||
            this.isClosing() ||
            (this.adapter_.addClass(o.OPEN),
            this.adapter_.addClass(o.ANIMATE),
            this.adapter_.computeBoundingRect(),
            this.adapter_.addClass(o.OPENING),
            this.adapter_.saveFocus());
        }
        close() {
          !this.isOpen() ||
            this.isOpening() ||
            this.isClosing() ||
            this.adapter_.addClass(o.CLOSING);
        }
        opened() {}
        closed() {}
        isOpen() {
          return this.adapter_.hasClass(o.OPEN);
        }
        isOpening() {
          return this.adapter_.hasClass(o.OPENING);
        }
        isClosing() {
          return this.adapter_.hasClass(o.CLOSING);
        }
        handleKeydown(t) {
          const { keyCode: e, key: s } = t;
          ("Escape" === s || 27 === e) && this.close();
        }
        handleTransitionEnd(t) {
          const { OPENING: e, CLOSING: s, OPEN: i, ANIMATE: n, ROOT: a } = o;
          t.target instanceof Element &&
            this.adapter_.elementHasClass(t.target, a) &&
            (this.isClosing()
              ? (this.adapter_.removeClass(i),
                this.adapter_.restoreFocus(),
                this.closed(),
                this.adapter_.notifyClose())
              : (this.adapter_.focusActiveNavigationItem(),
                this.opened(),
                this.adapter_.notifyOpen()),
            this.adapter_.removeClass(n),
            this.adapter_.removeClass(e),
            this.adapter_.removeClass(s));
        }
      };
    /**
     * @license
     * Copyright 2018 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */ var c = class extends l {
      opened() {
        this.adapter_.trapFocus();
      }
      closed() {
        this.adapter_.releaseFocus();
      }
      handleScrimClick() {
        this.close();
      }
    };
    /**
     * @license
     * Copyright 2018 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    /**
     * @license
     * Copyright 2018 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    const d = {
        ROOT: "mdc-list",
        LIST_ITEM_CLASS: "mdc-list-item",
        LIST_ITEM_SELECTED_CLASS: "mdc-list-item--selected",
        LIST_ITEM_ACTIVATED_CLASS: "mdc-list-item--activated"
      },
      h = {
        ARIA_ORIENTATION: "aria-orientation",
        ARIA_ORIENTATION_HORIZONTAL: "horizontal",
        ARIA_SELECTED: "aria-selected",
        CHECKBOX_RADIO_SELECTOR:
          'input[type="checkbox"]:not(:disabled), input[type="radio"]:not(:disabled)',
        CHILD_ELEMENTS_TO_TOGGLE_TABINDEX: `.${
          d.LIST_ITEM_CLASS
        } button:not(:disabled), \n  .${d.LIST_ITEM_CLASS} a`,
        FOCUSABLE_CHILD_ELEMENTS: `.${
          d.LIST_ITEM_CLASS
        } button:not(:disabled), .${d.LIST_ITEM_CLASS} a,\n  .${
          d.LIST_ITEM_CLASS
        } input[type="radio"]:not(:disabled),\n  .${
          d.LIST_ITEM_CLASS
        } input[type="checkbox"]:not(:disabled)`,
        ENABLED_ITEMS_SELECTOR: ".mdc-list-item:not(.mdc-list-item--disabled)"
      },
      _ = ["input", "button", "textarea", "select"];
    class u extends i {
      static get strings() {
        return h;
      }
      static get cssClasses() {
        return d;
      }
      static get defaultAdapter() {
        return {
          getListItemCount: () => {},
          getFocusedElementIndex: () => {},
          setAttributeForElementIndex: () => {},
          removeAttributeForElementIndex: () => {},
          addClassForElementIndex: () => {},
          removeClassForElementIndex: () => {},
          focusItemAtIndex: () => {},
          setTabIndexForListItemChildren: () => {},
          followHref: () => {},
          toggleCheckbox: () => {}
        };
      }
      constructor(t) {
        super(Object.assign(u.defaultAdapter, t)),
          (this.wrapFocus_ = !1),
          (this.isVertical_ = !0),
          (this.isSingleSelectionList_ = !1),
          (this.selectedIndex_ = -1),
          (this.useActivatedClass_ = !1);
      }
      setWrapFocus(t) {
        this.wrapFocus_ = t;
      }
      setVerticalOrientation(t) {
        this.isVertical_ = t;
      }
      setSingleSelection(t) {
        this.isSingleSelectionList_ = t;
      }
      setUseActivatedClass(t) {
        this.useActivatedClass_ = t;
      }
      setSelectedIndex(t) {
        if (t === this.selectedIndex_) return;
        const e = this.useActivatedClass_
          ? d.LIST_ITEM_ACTIVATED_CLASS
          : d.LIST_ITEM_SELECTED_CLASS;
        this.selectedIndex_ >= 0 &&
          (this.adapter_.removeAttributeForElementIndex(
            this.selectedIndex_,
            h.ARIA_SELECTED
          ),
          this.adapter_.removeClassForElementIndex(this.selectedIndex_, e),
          this.adapter_.setAttributeForElementIndex(
            this.selectedIndex_,
            "tabindex",
            -1
          )),
          t >= 0 &&
            this.adapter_.getListItemCount() > t &&
            ((this.selectedIndex_ = t),
            this.adapter_.setAttributeForElementIndex(
              this.selectedIndex_,
              h.ARIA_SELECTED,
              !0
            ),
            this.adapter_.addClassForElementIndex(this.selectedIndex_, e),
            this.adapter_.setAttributeForElementIndex(
              this.selectedIndex_,
              "tabindex",
              0
            ),
            0 !== this.selectedIndex_ &&
              this.adapter_.setAttributeForElementIndex(0, "tabindex", -1));
      }
      handleFocusIn(t, e) {
        e >= 0 && this.adapter_.setTabIndexForListItemChildren(e, 0);
      }
      handleFocusOut(t, e) {
        e >= 0 && this.adapter_.setTabIndexForListItemChildren(e, -1);
      }
      handleKeydown(t, e, s) {
        const i = "ArrowLeft" === t.key || 37 === t.keyCode,
          n = "ArrowUp" === t.key || 38 === t.keyCode,
          a = "ArrowRight" === t.key || 39 === t.keyCode,
          o = "ArrowDown" === t.key || 40 === t.keyCode,
          r = "Home" === t.key || 36 === t.keyCode,
          l = "End" === t.key || 35 === t.keyCode,
          c = "Enter" === t.key || 13 === t.keyCode,
          d = "Space" === t.key || 32 === t.keyCode;
        let h = this.adapter_.getFocusedElementIndex();
        if (!(-1 === h && (h = s) < 0))
          if ((this.isVertical_ && o) || (!this.isVertical_ && a))
            this.preventDefaultEvent_(t), this.focusNextElement(h);
          else if ((this.isVertical_ && n) || (!this.isVertical_ && i))
            this.preventDefaultEvent_(t), this.focusPrevElement(h);
          else if (r) this.preventDefaultEvent_(t), this.focusFirstElement();
          else if (l) this.preventDefaultEvent_(t), this.focusLastElement();
          else if (c || d) {
            e &&
              (this.isSingleSelectionList_ &&
                (this.setSelectedIndex(h), this.preventDefaultEvent_(t)),
              this.adapter_.followHref(h)),
              this.adapter_.toggleCheckbox(s) && this.preventDefaultEvent_(t);
          }
      }
      handleClick(t, e) {
        -1 !== t &&
          (e && this.adapter_.toggleCheckbox(t),
          this.isSingleSelectionList_ && this.setSelectedIndex(t));
      }
      preventDefaultEvent_(t) {
        const e = `${t.target.tagName}`.toLowerCase();
        -1 === _.indexOf(e) && t.preventDefault();
      }
      focusNextElement(t) {
        let e = t + 1;
        if (e >= this.adapter_.getListItemCount()) {
          if (!this.wrapFocus_) return;
          e = 0;
        }
        this.adapter_.focusItemAtIndex(e);
      }
      focusPrevElement(t) {
        let e = t - 1;
        if (e < 0) {
          if (!this.wrapFocus_) return;
          e = this.adapter_.getListItemCount() - 1;
        }
        this.adapter_.focusItemAtIndex(e);
      }
      focusFirstElement() {
        this.adapter_.getListItemCount() > 0 &&
          this.adapter_.focusItemAtIndex(0);
      }
      focusLastElement() {
        const t = this.adapter_.getListItemCount() - 1;
        t >= 0 && this.adapter_.focusItemAtIndex(t);
      }
    }
    var p = u;
    /**
     * @license
     * Copyright 2018 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */ function m(t, e) {
      return (t.matches || t.webkitMatchesSelector || t.msMatchesSelector).call(
        t,
        e
      );
    }
    /**
     * @license
     * Copyright 2018 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */ class E extends a {
      constructor(...t) {
        super(...t),
          this.handleKeydown_,
          this.handleClick_,
          this.focusInEventListener_,
          this.focusOutEventListener_;
      }
      static attachTo(t) {
        return new E(t);
      }
      destroy() {
        this.root_.removeEventListener("keydown", this.handleKeydown_),
          this.root_.removeEventListener("click", this.handleClick_),
          this.root_.removeEventListener("focusin", this.focusInEventListener_),
          this.root_.removeEventListener(
            "focusout",
            this.focusOutEventListener_
          );
      }
      initialSyncWithDOM() {
        (this.handleClick_ = this.handleClickEvent_.bind(this)),
          (this.handleKeydown_ = this.handleKeydownEvent_.bind(this)),
          (this.focusInEventListener_ = this.handleFocusInEvent_.bind(this)),
          (this.focusOutEventListener_ = this.handleFocusOutEvent_.bind(this)),
          this.root_.addEventListener("keydown", this.handleKeydown_),
          this.root_.addEventListener("focusin", this.focusInEventListener_),
          this.root_.addEventListener("focusout", this.focusOutEventListener_),
          this.root_.addEventListener("click", this.handleClick_),
          this.layout(),
          this.initializeListType();
      }
      layout() {
        const t = this.root_.getAttribute(h.ARIA_ORIENTATION);
        (this.vertical = t !== h.ARIA_ORIENTATION_HORIZONTAL),
          [].slice
            .call(this.root_.querySelectorAll(".mdc-list-item:not([tabindex])"))
            .forEach(t => {
              t.setAttribute("tabindex", -1);
            }),
          [].slice
            .call(this.root_.querySelectorAll(h.FOCUSABLE_CHILD_ELEMENTS))
            .forEach(t => t.setAttribute("tabindex", -1));
      }
      getListItemIndex_(t) {
        let e = t.target,
          s = -1;
        for (
          ;
          !e.classList.contains(d.LIST_ITEM_CLASS) &&
          !e.classList.contains(d.ROOT);

        )
          e = e.parentElement;
        return (
          e.classList.contains(d.LIST_ITEM_CLASS) &&
            (s = this.listElements.indexOf(e)),
          s
        );
      }
      handleFocusInEvent_(t) {
        const e = this.getListItemIndex_(t);
        this.foundation_.handleFocusIn(t, e);
      }
      handleFocusOutEvent_(t) {
        const e = this.getListItemIndex_(t);
        this.foundation_.handleFocusOut(t, e);
      }
      handleKeydownEvent_(t) {
        const e = this.getListItemIndex_(t);
        e >= 0 &&
          this.foundation_.handleKeydown(
            t,
            t.target.classList.contains(d.LIST_ITEM_CLASS),
            e
          );
      }
      handleClickEvent_(t) {
        const e = this.getListItemIndex_(t),
          s = !m(t.target, h.CHECKBOX_RADIO_SELECTOR);
        this.foundation_.handleClick(e, s);
      }
      initializeListType() {
        const t = this.root_.querySelector(
          `.${d.LIST_ITEM_ACTIVATED_CLASS}, .${d.LIST_ITEM_SELECTED_CLASS}`
        );
        t &&
          (t.classList.contains(d.LIST_ITEM_ACTIVATED_CLASS) &&
            this.foundation_.setUseActivatedClass(!0),
          (this.singleSelection = !0),
          (this.selectedIndex = this.listElements.indexOf(t)));
      }
      set vertical(t) {
        this.foundation_.setVerticalOrientation(t);
      }
      get listElements() {
        return [].slice.call(
          this.root_.querySelectorAll(h.ENABLED_ITEMS_SELECTOR)
        );
      }
      set wrapFocus(t) {
        this.foundation_.setWrapFocus(t);
      }
      set singleSelection(t) {
        this.foundation_.setSingleSelection(t);
      }
      set selectedIndex(t) {
        this.foundation_.setSelectedIndex(t);
      }
      getDefaultFoundation() {
        return new p(
          Object.assign({
            getListItemCount: () => this.listElements.length,
            getFocusedElementIndex: () =>
              this.listElements.indexOf(document.activeElement),
            setAttributeForElementIndex: (t, e, s) => {
              const i = this.listElements[t];
              i && i.setAttribute(e, s);
            },
            removeAttributeForElementIndex: (t, e) => {
              const s = this.listElements[t];
              s && s.removeAttribute(e);
            },
            addClassForElementIndex: (t, e) => {
              const s = this.listElements[t];
              s && s.classList.add(e);
            },
            removeClassForElementIndex: (t, e) => {
              const s = this.listElements[t];
              s && s.classList.remove(e);
            },
            focusItemAtIndex: t => {
              const e = this.listElements[t];
              e && e.focus();
            },
            setTabIndexForListItemChildren: (t, e) => {
              const s = this.listElements[t];
              [].slice
                .call(s.querySelectorAll(h.CHILD_ELEMENTS_TO_TOGGLE_TABINDEX))
                .forEach(t => t.setAttribute("tabindex", e));
            },
            followHref: t => {
              const e = this.listElements[t];
              e && e.href && e.click();
            },
            toggleCheckbox: t => {
              let e = !1;
              const s = this.listElements[t];
              return (
                [].slice
                  .call(s.querySelectorAll(h.CHECKBOX_RADIO_SELECTOR))
                  .forEach(t => {
                    const s = document.createEvent("Event");
                    s.initEvent("change", !0, !0),
                      (t.checked && "radio" === t.type) ||
                        ((t.checked = !t.checked), t.dispatchEvent(s)),
                      (e = !0);
                  }),
                e
              );
            }
          })
        );
      }
    }
    var f = s(0),
      g = s.n(f);
    /**
     * @license
     * Copyright 2016 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    class T extends a {
      constructor(...t) {
        super(...t),
          this.previousFocus_,
          this.handleKeydown_,
          this.handleTransitionEnd_,
          this.focusTrapFactory_,
          this.focusTrap_,
          this.scrim_,
          this.handleScrimClick_,
          this.list_;
      }
      static attachTo(t) {
        return new T(t);
      }
      get open() {
        return this.foundation_.isOpen();
      }
      set open(t) {
        t ? this.foundation_.open() : this.foundation_.close();
      }
      initialize(t = g.a, e = t => new E(t)) {
        const s = this.root_.querySelector(`.${p.cssClasses.ROOT}`);
        s && ((this.list_ = e(s)), (this.list_.wrapFocus = !0)),
          (this.focusTrapFactory_ = t);
      }
      initialSyncWithDOM() {
        const { MODAL: t } = l.cssClasses;
        if (this.root_.classList.contains(t)) {
          const { SCRIM_SELECTOR: t } = l.strings;
          (this.scrim_ = this.root_.parentElement.querySelector(t)),
            (this.handleScrimClick_ = () =>
              this.foundation_.handleScrimClick()),
            this.scrim_.addEventListener("click", this.handleScrimClick_),
            (this.focusTrap_ =
              /**
               * @license
               * Copyright 2016 Google Inc.
               *
               * Permission is hereby granted, free of charge, to any person obtaining a copy
               * of this software and associated documentation files (the "Software"), to deal
               * in the Software without restriction, including without limitation the rights
               * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
               * copies of the Software, and to permit persons to whom the Software is
               * furnished to do so, subject to the following conditions:
               *
               * The above copyright notice and this permission notice shall be included in
               * all copies or substantial portions of the Software.
               *
               * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
               * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
               * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
               * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
               * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
               * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
               * THE SOFTWARE.
               */
              (function(t, e = g.a) {
                return e(t, {
                  clickOutsideDeactivates: !0,
                  initialFocus: !1,
                  escapeDeactivates: !1,
                  returnFocusOnDeactivate: !1
                });
              })(this.root_, this.focusTrapFactory_));
        }
        (this.handleKeydown_ = t => this.foundation_.handleKeydown(t)),
          (this.handleTransitionEnd_ = t =>
            this.foundation_.handleTransitionEnd(t)),
          this.root_.addEventListener("keydown", this.handleKeydown_),
          this.root_.addEventListener(
            "transitionend",
            this.handleTransitionEnd_
          );
      }
      destroy() {
        this.root_.removeEventListener("keydown", this.handleKeydown_),
          this.root_.removeEventListener(
            "transitionend",
            this.handleTransitionEnd_
          ),
          this.list_ && this.list_.destroy();
        const { MODAL: t } = l.cssClasses;
        this.root_.classList.contains(t) &&
          (this.scrim_.removeEventListener("click", this.handleScrimClick_),
          (this.open = !1));
      }
      getDefaultFoundation() {
        const t = Object.assign({
            addClass: t => this.root_.classList.add(t),
            removeClass: t => this.root_.classList.remove(t),
            hasClass: t => this.root_.classList.contains(t),
            elementHasClass: (t, e) => t.classList.contains(e),
            computeBoundingRect: () => this.root_.getBoundingClientRect(),
            saveFocus: () => {
              this.previousFocus_ = document.activeElement;
            },
            restoreFocus: () => {
              const t = this.previousFocus_ && this.previousFocus_.focus;
              this.root_.contains(document.activeElement) &&
                t &&
                this.previousFocus_.focus();
            },
            focusActiveNavigationItem: () => {
              const t = this.root_.querySelector(
                `.${p.cssClasses.LIST_ITEM_ACTIVATED_CLASS}`
              );
              t && t.focus();
            },
            notifyClose: () => this.emit(r.CLOSE_EVENT, {}, !0),
            notifyOpen: () => this.emit(r.OPEN_EVENT, {}, !0),
            trapFocus: () => this.focusTrap_.activate(),
            releaseFocus: () => this.focusTrap_.deactivate()
          }),
          { DISMISSIBLE: e, MODAL: s } = l.cssClasses;
        if (this.root_.classList.contains(e)) return new l(t);
        if (this.root_.classList.contains(s)) return new c(t);
        throw new Error(
          `MDCDrawer: Failed to instantiate component. Supported variants are ${e} and ${s}.`
        );
      }
    }
    /**
     * @license
     * Copyright 2018 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    /**
     * @license
     * Copyright 2016 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    const C = {
        ROOT: "mdc-ripple-upgraded",
        UNBOUNDED: "mdc-ripple-upgraded--unbounded",
        BG_FOCUSED: "mdc-ripple-upgraded--background-focused",
        FG_ACTIVATION: "mdc-ripple-upgraded--foreground-activation",
        FG_DEACTIVATION: "mdc-ripple-upgraded--foreground-deactivation"
      },
      S = {
        VAR_LEFT: "--mdc-ripple-left",
        VAR_TOP: "--mdc-ripple-top",
        VAR_FG_SIZE: "--mdc-ripple-fg-size",
        VAR_FG_SCALE: "--mdc-ripple-fg-scale",
        VAR_FG_TRANSLATE_START: "--mdc-ripple-fg-translate-start",
        VAR_FG_TRANSLATE_END: "--mdc-ripple-fg-translate-end"
      },
      v = {
        PADDING: 10,
        INITIAL_ORIGIN_SCALE: 0.6,
        DEACTIVATION_TIMEOUT_MS: 225,
        FG_DEACTIVATION_MS: 150,
        TAP_DELAY_MS: 300
      };
    /**
     * @license
     * Copyright 2016 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    let A, I;
    function L(t = window, e = !1) {
      if (void 0 === I || e) {
        let e = !1;
        try {
          t.document.addEventListener("test", null, {
            get passive() {
              return (e = !0);
            }
          });
        } catch (t) {}
        I = e;
      }
      return !!I && { passive: !0 };
    }
    const O = ["touchstart", "pointerdown", "mousedown", "keydown"],
      y = ["touchend", "pointerup", "mouseup"];
    let b = [];
    class R extends i {
      static get cssClasses() {
        return C;
      }
      static get strings() {
        return S;
      }
      static get numbers() {
        return v;
      }
      static get defaultAdapter() {
        return {
          browserSupportsCssVars: () => {},
          isUnbounded: () => {},
          isSurfaceActive: () => {},
          isSurfaceDisabled: () => {},
          addClass: () => {},
          removeClass: () => {},
          containsEventTarget: () => {},
          registerInteractionHandler: () => {},
          deregisterInteractionHandler: () => {},
          registerDocumentInteractionHandler: () => {},
          deregisterDocumentInteractionHandler: () => {},
          registerResizeHandler: () => {},
          deregisterResizeHandler: () => {},
          updateCssVariable: () => {},
          computeBoundingRect: () => {},
          getWindowPageOffset: () => {}
        };
      }
      constructor(t) {
        super(Object.assign(R.defaultAdapter, t)),
          (this.layoutFrame_ = 0),
          (this.frame_ = { width: 0, height: 0 }),
          (this.activationState_ = this.defaultActivationState_()),
          (this.initialSize_ = 0),
          (this.maxRadius_ = 0),
          (this.activateHandler_ = t => this.activate_(t)),
          (this.deactivateHandler_ = () => this.deactivate_()),
          (this.focusHandler_ = () => this.handleFocus()),
          (this.blurHandler_ = () => this.handleBlur()),
          (this.resizeHandler_ = () => this.layout()),
          (this.unboundedCoords_ = { left: 0, top: 0 }),
          (this.fgScale_ = 0),
          (this.activationTimer_ = 0),
          (this.fgDeactivationRemovalTimer_ = 0),
          (this.activationAnimationHasEnded_ = !1),
          (this.activationTimerCallback_ = () => {
            (this.activationAnimationHasEnded_ = !0),
              this.runDeactivationUXLogicIfReady_();
          }),
          this.previousActivationEvent_;
      }
      supportsPressRipple_() {
        return this.adapter_.browserSupportsCssVars();
      }
      defaultActivationState_() {
        return {
          isActivated: !1,
          hasDeactivationUXRun: !1,
          wasActivatedByPointer: !1,
          wasElementMadeActive: !1,
          activationEvent: void 0,
          isProgrammatic: !1
        };
      }
      init() {
        const t = this.supportsPressRipple_();
        if ((this.registerRootHandlers_(t), t)) {
          const { ROOT: t, UNBOUNDED: e } = R.cssClasses;
          requestAnimationFrame(() => {
            this.adapter_.addClass(t),
              this.adapter_.isUnbounded() &&
                (this.adapter_.addClass(e), this.layoutInternal_());
          });
        }
      }
      destroy() {
        if (this.supportsPressRipple_()) {
          this.activationTimer_ &&
            (clearTimeout(this.activationTimer_),
            (this.activationTimer_ = 0),
            this.adapter_.removeClass(R.cssClasses.FG_ACTIVATION)),
            this.fgDeactivationRemovalTimer_ &&
              (clearTimeout(this.fgDeactivationRemovalTimer_),
              (this.fgDeactivationRemovalTimer_ = 0),
              this.adapter_.removeClass(R.cssClasses.FG_DEACTIVATION));
          const { ROOT: t, UNBOUNDED: e } = R.cssClasses;
          requestAnimationFrame(() => {
            this.adapter_.removeClass(t),
              this.adapter_.removeClass(e),
              this.removeCssVars_();
          });
        }
        this.deregisterRootHandlers_(), this.deregisterDeactivationHandlers_();
      }
      registerRootHandlers_(t) {
        t &&
          (O.forEach(t => {
            this.adapter_.registerInteractionHandler(t, this.activateHandler_);
          }),
          this.adapter_.isUnbounded() &&
            this.adapter_.registerResizeHandler(this.resizeHandler_)),
          this.adapter_.registerInteractionHandler("focus", this.focusHandler_),
          this.adapter_.registerInteractionHandler("blur", this.blurHandler_);
      }
      registerDeactivationHandlers_(t) {
        "keydown" === t.type
          ? this.adapter_.registerInteractionHandler(
              "keyup",
              this.deactivateHandler_
            )
          : y.forEach(t => {
              this.adapter_.registerDocumentInteractionHandler(
                t,
                this.deactivateHandler_
              );
            });
      }
      deregisterRootHandlers_() {
        O.forEach(t => {
          this.adapter_.deregisterInteractionHandler(t, this.activateHandler_);
        }),
          this.adapter_.deregisterInteractionHandler(
            "focus",
            this.focusHandler_
          ),
          this.adapter_.deregisterInteractionHandler("blur", this.blurHandler_),
          this.adapter_.isUnbounded() &&
            this.adapter_.deregisterResizeHandler(this.resizeHandler_);
      }
      deregisterDeactivationHandlers_() {
        this.adapter_.deregisterInteractionHandler(
          "keyup",
          this.deactivateHandler_
        ),
          y.forEach(t => {
            this.adapter_.deregisterDocumentInteractionHandler(
              t,
              this.deactivateHandler_
            );
          });
      }
      removeCssVars_() {
        const { strings: t } = R;
        Object.keys(t).forEach(e => {
          0 === e.indexOf("VAR_") &&
            this.adapter_.updateCssVariable(t[e], null);
        });
      }
      activate_(t) {
        if (this.adapter_.isSurfaceDisabled()) return;
        const e = this.activationState_;
        if (e.isActivated) return;
        const s = this.previousActivationEvent_;
        (s && void 0 !== t && s.type !== t.type) ||
          ((e.isActivated = !0),
          (e.isProgrammatic = void 0 === t),
          (e.activationEvent = t),
          (e.wasActivatedByPointer =
            !e.isProgrammatic &&
            (void 0 !== t &&
              ("mousedown" === t.type ||
                "touchstart" === t.type ||
                "pointerdown" === t.type))),
          void 0 !== t &&
          b.length > 0 &&
          b.some(t => this.adapter_.containsEventTarget(t))
            ? this.resetActivationState_()
            : (void 0 !== t &&
                (b.push(t.target), this.registerDeactivationHandlers_(t)),
              (e.wasElementMadeActive = this.checkElementMadeActive_(t)),
              e.wasElementMadeActive && this.animateActivation_(),
              requestAnimationFrame(() => {
                (b = []),
                  e.wasElementMadeActive ||
                    void 0 === t ||
                    (" " !== t.key && 32 !== t.keyCode) ||
                    ((e.wasElementMadeActive = this.checkElementMadeActive_(t)),
                    e.wasElementMadeActive && this.animateActivation_()),
                  e.wasElementMadeActive ||
                    (this.activationState_ = this.defaultActivationState_());
              })));
      }
      checkElementMadeActive_(t) {
        return (
          void 0 === t ||
          "keydown" !== t.type ||
          this.adapter_.isSurfaceActive()
        );
      }
      activate(t) {
        this.activate_(t);
      }
      animateActivation_() {
        const {
            VAR_FG_TRANSLATE_START: t,
            VAR_FG_TRANSLATE_END: e
          } = R.strings,
          { FG_DEACTIVATION: s, FG_ACTIVATION: i } = R.cssClasses,
          { DEACTIVATION_TIMEOUT_MS: n } = R.numbers;
        this.layoutInternal_();
        let a = "",
          o = "";
        if (!this.adapter_.isUnbounded()) {
          const {
            startPoint: t,
            endPoint: e
          } = this.getFgTranslationCoordinates_();
          (a = `${t.x}px, ${t.y}px`), (o = `${e.x}px, ${e.y}px`);
        }
        this.adapter_.updateCssVariable(t, a),
          this.adapter_.updateCssVariable(e, o),
          clearTimeout(this.activationTimer_),
          clearTimeout(this.fgDeactivationRemovalTimer_),
          this.rmBoundedActivationClasses_(),
          this.adapter_.removeClass(s),
          this.adapter_.computeBoundingRect(),
          this.adapter_.addClass(i),
          (this.activationTimer_ = setTimeout(
            () => this.activationTimerCallback_(),
            n
          ));
      }
      getFgTranslationCoordinates_() {
        const {
          activationEvent: t,
          wasActivatedByPointer: e
        } = this.activationState_;
        let s;
        return {
          startPoint: (s = {
            x:
              (s = e
                ? (function(t, e, s) {
                    const { x: i, y: n } = e,
                      a = i + s.left,
                      o = n + s.top;
                    let r, l;
                    return (
                      "touchstart" === t.type
                        ? ((r = (t = t).changedTouches[0].pageX - a),
                          (l = t.changedTouches[0].pageY - o))
                        : ((r = (t = t).pageX - a), (l = t.pageY - o)),
                      { x: r, y: l }
                    );
                  })(
                    /**
                     * @license
                     * Copyright 2016 Google Inc.
                     *
                     * Permission is hereby granted, free of charge, to any person obtaining a copy
                     * of this software and associated documentation files (the "Software"), to deal
                     * in the Software without restriction, including without limitation the rights
                     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
                     * copies of the Software, and to permit persons to whom the Software is
                     * furnished to do so, subject to the following conditions:
                     *
                     * The above copyright notice and this permission notice shall be included in
                     * all copies or substantial portions of the Software.
                     *
                     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
                     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
                     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
                     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
                     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
                     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
                     * THE SOFTWARE.
                     */ t,
                    this.adapter_.getWindowPageOffset(),
                    this.adapter_.computeBoundingRect()
                  )
                : { x: this.frame_.width / 2, y: this.frame_.height / 2 }).x -
              this.initialSize_ / 2,
            y: s.y - this.initialSize_ / 2
          }),
          endPoint: {
            x: this.frame_.width / 2 - this.initialSize_ / 2,
            y: this.frame_.height / 2 - this.initialSize_ / 2
          }
        };
      }
      runDeactivationUXLogicIfReady_() {
        const { FG_DEACTIVATION: t } = R.cssClasses,
          { hasDeactivationUXRun: e, isActivated: s } = this.activationState_;
        (e || !s) &&
          this.activationAnimationHasEnded_ &&
          (this.rmBoundedActivationClasses_(),
          this.adapter_.addClass(t),
          (this.fgDeactivationRemovalTimer_ = setTimeout(() => {
            this.adapter_.removeClass(t);
          }, v.FG_DEACTIVATION_MS)));
      }
      rmBoundedActivationClasses_() {
        const { FG_ACTIVATION: t } = R.cssClasses;
        this.adapter_.removeClass(t),
          (this.activationAnimationHasEnded_ = !1),
          this.adapter_.computeBoundingRect();
      }
      resetActivationState_() {
        (this.previousActivationEvent_ = this.activationState_.activationEvent),
          (this.activationState_ = this.defaultActivationState_()),
          setTimeout(
            () => (this.previousActivationEvent_ = void 0),
            R.numbers.TAP_DELAY_MS
          );
      }
      deactivate_() {
        const t = this.activationState_;
        if (!t.isActivated) return;
        const e = Object.assign({}, t);
        t.isProgrammatic
          ? (requestAnimationFrame(() => this.animateDeactivation_(e)),
            this.resetActivationState_())
          : (this.deregisterDeactivationHandlers_(),
            requestAnimationFrame(() => {
              (this.activationState_.hasDeactivationUXRun = !0),
                this.animateDeactivation_(e),
                this.resetActivationState_();
            }));
      }
      deactivate() {
        this.deactivate_();
      }
      animateDeactivation_({
        wasActivatedByPointer: t,
        wasElementMadeActive: e
      }) {
        (t || e) && this.runDeactivationUXLogicIfReady_();
      }
      layout() {
        this.layoutFrame_ && cancelAnimationFrame(this.layoutFrame_),
          (this.layoutFrame_ = requestAnimationFrame(() => {
            this.layoutInternal_(), (this.layoutFrame_ = 0);
          }));
      }
      layoutInternal_() {
        this.frame_ = this.adapter_.computeBoundingRect();
        const t = Math.max(this.frame_.height, this.frame_.width);
        (this.maxRadius_ = this.adapter_.isUnbounded()
          ? t
          : (() => {
              return (
                Math.sqrt(
                  Math.pow(this.frame_.width, 2) +
                    Math.pow(this.frame_.height, 2)
                ) + R.numbers.PADDING
              );
            })()),
          (this.initialSize_ = Math.floor(t * R.numbers.INITIAL_ORIGIN_SCALE)),
          (this.fgScale_ = this.maxRadius_ / this.initialSize_),
          this.updateLayoutCssVars_();
      }
      updateLayoutCssVars_() {
        const {
          VAR_FG_SIZE: t,
          VAR_LEFT: e,
          VAR_TOP: s,
          VAR_FG_SCALE: i
        } = R.strings;
        this.adapter_.updateCssVariable(t, `${this.initialSize_}px`),
          this.adapter_.updateCssVariable(i, this.fgScale_),
          this.adapter_.isUnbounded() &&
            ((this.unboundedCoords_ = {
              left: Math.round(this.frame_.width / 2 - this.initialSize_ / 2),
              top: Math.round(this.frame_.height / 2 - this.initialSize_ / 2)
            }),
            this.adapter_.updateCssVariable(
              e,
              `${this.unboundedCoords_.left}px`
            ),
            this.adapter_.updateCssVariable(
              s,
              `${this.unboundedCoords_.top}px`
            ));
      }
      setUnbounded(t) {
        const { UNBOUNDED: e } = R.cssClasses;
        t ? this.adapter_.addClass(e) : this.adapter_.removeClass(e);
      }
      handleFocus() {
        requestAnimationFrame(() =>
          this.adapter_.addClass(R.cssClasses.BG_FOCUSED)
        );
      }
      handleBlur() {
        requestAnimationFrame(() =>
          this.adapter_.removeClass(R.cssClasses.BG_FOCUSED)
        );
      }
    }
    var N = R;
    /**
     * @license
     * Copyright 2016 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */ class D extends a {
      constructor(...t) {
        super(...t), (this.disabled = !1), this.unbounded_;
      }
      static attachTo(t, { isUnbounded: e } = {}) {
        const s = new D(t);
        return void 0 !== e && (s.unbounded = e), s;
      }
      static createAdapter(t) {
        const e = (function(t) {
          const e = ["matches", "webkitMatchesSelector", "msMatchesSelector"];
          let s = "matches";
          for (let i = 0; i < e.length; i++) {
            const n = e[i];
            if (n in t) {
              s = n;
              break;
            }
          }
          return s;
        })(HTMLElement.prototype);
        return {
          browserSupportsCssVars: () =>
            (function(t, e = !1) {
              let s = A;
              if ("boolean" == typeof A && !e) return s;
              if (!t.CSS || "function" != typeof t.CSS.supports) return;
              const i = t.CSS.supports("--css-vars", "yes"),
                n =
                  t.CSS.supports("(--css-vars: yes)") &&
                  t.CSS.supports("color", "#00000000");
              return (
                (s = !(
                  (!i && !n) ||
                  (function(t) {
                    const e = t.document,
                      s = e.createElement("div");
                    (s.className = "mdc-ripple-surface--test-edge-var-bug"),
                      e.body.appendChild(s);
                    const i = t.getComputedStyle(s),
                      n = null !== i && "solid" === i.borderTopStyle;
                    return s.remove(), n;
                  })(t)
                )),
                e || (A = s),
                s
              );
            })(window),
          isUnbounded: () => t.unbounded,
          isSurfaceActive: () => t.root_[e](":active"),
          isSurfaceDisabled: () => t.disabled,
          addClass: e => t.root_.classList.add(e),
          removeClass: e => t.root_.classList.remove(e),
          containsEventTarget: e => t.root_.contains(e),
          registerInteractionHandler: (e, s) =>
            t.root_.addEventListener(e, s, L()),
          deregisterInteractionHandler: (e, s) =>
            t.root_.removeEventListener(e, s, L()),
          registerDocumentInteractionHandler: (t, e) =>
            document.documentElement.addEventListener(t, e, L()),
          deregisterDocumentInteractionHandler: (t, e) =>
            document.documentElement.removeEventListener(t, e, L()),
          registerResizeHandler: t => window.addEventListener("resize", t),
          deregisterResizeHandler: t => window.removeEventListener("resize", t),
          updateCssVariable: (e, s) => t.root_.style.setProperty(e, s),
          computeBoundingRect: () => t.root_.getBoundingClientRect(),
          getWindowPageOffset: () => ({
            x: window.pageXOffset,
            y: window.pageYOffset
          })
        };
      }
      get unbounded() {
        return this.unbounded_;
      }
      set unbounded(t) {
        (this.unbounded_ = Boolean(t)), this.setUnbounded_();
      }
      setUnbounded_() {
        this.foundation_.setUnbounded(this.unbounded_);
      }
      activate() {
        this.foundation_.activate();
      }
      deactivate() {
        this.foundation_.deactivate();
      }
      layout() {
        this.foundation_.layout();
      }
      getDefaultFoundation() {
        return new N(D.createAdapter(this));
      }
      initialSyncWithDOM() {
        this.unbounded = "mdcRippleIsUnbounded" in this.root_.dataset;
      }
    }
    class w {}
    w.prototype.root_, w.prototype.unbounded, w.prototype.disabled;
    /**
     * @license
     * Copyright 2018 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    const F = {
        FIXED_CLASS: "mdc-top-app-bar--fixed",
        FIXED_SCROLLED_CLASS: "mdc-top-app-bar--fixed-scrolled",
        SHORT_CLASS: "mdc-top-app-bar--short",
        SHORT_HAS_ACTION_ITEM_CLASS: "mdc-top-app-bar--short-has-action-item",
        SHORT_COLLAPSED_CLASS: "mdc-top-app-bar--short-collapsed"
      },
      x = {
        DEBOUNCE_THROTTLE_RESIZE_TIME_MS: 100,
        MAX_TOP_APP_BAR_HEIGHT: 128
      },
      M = {
        ACTION_ITEM_SELECTOR: ".mdc-top-app-bar__action-item",
        NAVIGATION_EVENT: "MDCTopAppBar:nav",
        NAVIGATION_ICON_SELECTOR: ".mdc-top-app-bar__navigation-icon",
        ROOT_SELECTOR: ".mdc-top-app-bar",
        TITLE_SELECTOR: ".mdc-top-app-bar__title"
      };
    /**
     * @license
     * Copyright 2018 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    class H extends i {
      static get strings() {
        return M;
      }
      static get cssClasses() {
        return F;
      }
      static get numbers() {
        return x;
      }
      static get defaultAdapter() {
        return {
          hasClass: () => {},
          addClass: () => {},
          removeClass: () => {},
          setStyle: () => {},
          getTopAppBarHeight: () => {},
          registerNavigationIconInteractionHandler: () => {},
          deregisterNavigationIconInteractionHandler: () => {},
          notifyNavigationIconClicked: () => {},
          registerScrollHandler: () => {},
          deregisterScrollHandler: () => {},
          registerResizeHandler: () => {},
          deregisterResizeHandler: () => {},
          getViewportScrollY: () => 0,
          getTotalActionItems: () => 0
        };
      }
      constructor(t) {
        super(Object.assign(H.defaultAdapter, t)),
          (this.navClickHandler_ = () =>
            this.adapter_.notifyNavigationIconClicked()),
          (this.scrollHandler_ = () => {});
      }
      init() {
        this.adapter_.registerNavigationIconInteractionHandler(
          "click",
          this.navClickHandler_
        );
      }
      destroy() {
        this.adapter_.deregisterNavigationIconInteractionHandler(
          "click",
          this.navClickHandler_
        );
      }
      initScrollHandler() {
        this.adapter_.registerScrollHandler(this.scrollHandler_);
      }
      destroyScrollHandler() {
        this.adapter_.deregisterScrollHandler(this.scrollHandler_);
      }
    }
    var k = H;
    /**
     * @license
     * Copyright 2018 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */ var P = class extends k {
      constructor(t) {
        super(t),
          (this.wasScrolled_ = !1),
          (this.scrollHandler_ = () => this.fixedScrollHandler_());
      }
      init() {
        super.init(), this.adapter_.registerScrollHandler(this.scrollHandler_);
      }
      destroy() {
        super.destroy(),
          this.adapter_.deregisterScrollHandler(this.scrollHandler_);
      }
      fixedScrollHandler_() {
        this.adapter_.getViewportScrollY() <= 0
          ? this.wasScrolled_ &&
            (this.adapter_.removeClass(F.FIXED_SCROLLED_CLASS),
            (this.wasScrolled_ = !1))
          : this.wasScrolled_ ||
            (this.adapter_.addClass(F.FIXED_SCROLLED_CLASS),
            (this.wasScrolled_ = !0));
      }
    };
    /**
     * @license
     * Copyright 2018 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */ var B = class extends k {
      constructor(t) {
        super(t),
          (this.isCollapsed = !1),
          (this.scrollHandler_ = () => this.shortAppBarScrollHandler_());
      }
      init() {
        super.init();
        const t = this.adapter_.hasClass(F.SHORT_COLLAPSED_CLASS);
        this.adapter_.getTotalActionItems() > 0 &&
          this.adapter_.addClass(F.SHORT_HAS_ACTION_ITEM_CLASS),
          t ||
            (this.adapter_.registerScrollHandler(this.scrollHandler_),
            this.shortAppBarScrollHandler_());
      }
      destroy() {
        super.destroy(),
          this.adapter_.deregisterScrollHandler(this.scrollHandler_);
      }
      shortAppBarScrollHandler_() {
        this.adapter_.getViewportScrollY() <= 0
          ? this.isCollapsed &&
            (this.adapter_.removeClass(F.SHORT_COLLAPSED_CLASS),
            (this.isCollapsed = !1))
          : this.isCollapsed ||
            (this.adapter_.addClass(F.SHORT_COLLAPSED_CLASS),
            (this.isCollapsed = !0));
      }
    };
    /**
     * @license
     * Copyright 2018 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */ const V = 0;
    var K = class extends k {
      constructor(t) {
        super(t),
          (this.lastScrollPosition_ = this.adapter_.getViewportScrollY()),
          (this.topAppBarHeight_ = this.adapter_.getTopAppBarHeight()),
          (this.wasDocked_ = !0),
          (this.isDockedShowing_ = !0),
          (this.currentAppBarOffsetTop_ = 0),
          (this.isCurrentlyBeingResized_ = !1),
          (this.resizeThrottleId_ = V),
          (this.resizeDebounceId_ = V),
          (this.scrollHandler_ = () => this.topAppBarScrollHandler_()),
          (this.resizeHandler_ = () => this.topAppBarResizeHandler_());
      }
      init() {
        super.init(),
          this.adapter_.registerScrollHandler(this.scrollHandler_),
          this.adapter_.registerResizeHandler(this.resizeHandler_);
      }
      destroy() {
        super.destroy(),
          this.adapter_.deregisterScrollHandler(this.scrollHandler_),
          this.adapter_.deregisterResizeHandler(this.resizeHandler_),
          this.adapter_.setStyle("top", "");
      }
      checkForUpdate_() {
        const t = -this.topAppBarHeight_,
          e = this.currentAppBarOffsetTop_ < 0,
          s = this.currentAppBarOffsetTop_ > t,
          i = e && s;
        if (i) this.wasDocked_ = !1;
        else {
          if (!this.wasDocked_) return (this.wasDocked_ = !0), !0;
          if (this.isDockedShowing_ !== s)
            return (this.isDockedShowing_ = s), !0;
        }
        return i;
      }
      moveTopAppBar_() {
        if (this.checkForUpdate_()) {
          let t = this.currentAppBarOffsetTop_;
          Math.abs(t) >= this.topAppBarHeight_ &&
            (t = -x.MAX_TOP_APP_BAR_HEIGHT),
            this.adapter_.setStyle("top", t + "px");
        }
      }
      topAppBarScrollHandler_() {
        const t = Math.max(this.adapter_.getViewportScrollY(), 0),
          e = t - this.lastScrollPosition_;
        (this.lastScrollPosition_ = t),
          this.isCurrentlyBeingResized_ ||
            ((this.currentAppBarOffsetTop_ -= e),
            this.currentAppBarOffsetTop_ > 0
              ? (this.currentAppBarOffsetTop_ = 0)
              : Math.abs(this.currentAppBarOffsetTop_) >
                  this.topAppBarHeight_ &&
                (this.currentAppBarOffsetTop_ = -this.topAppBarHeight_),
            this.moveTopAppBar_());
      }
      topAppBarResizeHandler_() {
        this.resizeThrottleId_ ||
          (this.resizeThrottleId_ = setTimeout(() => {
            (this.resizeThrottleId_ = V), this.throttledResizeHandler_();
          }, x.DEBOUNCE_THROTTLE_RESIZE_TIME_MS)),
          (this.isCurrentlyBeingResized_ = !0),
          this.resizeDebounceId_ && clearTimeout(this.resizeDebounceId_),
          (this.resizeDebounceId_ = setTimeout(() => {
            this.topAppBarScrollHandler_(),
              (this.isCurrentlyBeingResized_ = !1),
              (this.resizeDebounceId_ = V);
          }, x.DEBOUNCE_THROTTLE_RESIZE_TIME_MS));
      }
      throttledResizeHandler_() {
        const t = this.adapter_.getTopAppBarHeight();
        this.topAppBarHeight_ !== t &&
          ((this.wasDocked_ = !1),
          (this.currentAppBarOffsetTop_ -= this.topAppBarHeight_ - t),
          (this.topAppBarHeight_ = t)),
          this.topAppBarScrollHandler_();
      }
    };
    /**
     * @license
     * Copyright 2018 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */ class G extends a {
      constructor(...t) {
        super(...t), this.navIcon_, this.iconRipples_, this.scrollTarget_;
      }
      initialize(t = t => D.attachTo(t)) {
        this.navIcon_ = this.root_.querySelector(M.NAVIGATION_ICON_SELECTOR);
        const e = [].slice.call(
          this.root_.querySelectorAll(M.ACTION_ITEM_SELECTOR)
        );
        this.navIcon_ && e.push(this.navIcon_),
          (this.iconRipples_ = e.map(e => {
            const s = t(e);
            return (s.unbounded = !0), s;
          }));
      }
      destroy() {
        this.iconRipples_.forEach(t => t.destroy()), super.destroy();
      }
      setScrollTarget(t) {
        this.foundation_.destroyScrollHandler(),
          (this.scrollTarget_ = t),
          this.foundation_.initScrollHandler();
      }
      static attachTo(t) {
        return new G(t);
      }
      getDefaultFoundation() {
        const t = Object.assign({
          hasClass: t => this.root_.classList.contains(t),
          addClass: t => this.root_.classList.add(t),
          removeClass: t => this.root_.classList.remove(t),
          setStyle: (t, e) => this.root_.style.setProperty(t, e),
          getTopAppBarHeight: () => this.root_.clientHeight,
          registerNavigationIconInteractionHandler: (t, e) => {
            this.navIcon_ && this.navIcon_.addEventListener(t, e);
          },
          deregisterNavigationIconInteractionHandler: (t, e) => {
            this.navIcon_ && this.navIcon_.removeEventListener(t, e);
          },
          notifyNavigationIconClicked: () => {
            this.emit(M.NAVIGATION_EVENT, {});
          },
          registerScrollHandler: t =>
            this.scrollTarget_.addEventListener("scroll", t),
          deregisterScrollHandler: t =>
            this.scrollTarget_.removeEventListener("scroll", t),
          registerResizeHandler: t => window.addEventListener("resize", t),
          deregisterResizeHandler: t => window.removeEventListener("resize", t),
          getViewportScrollY: () =>
            this.scrollTarget_[
              this.scrollTarget_ === window ? "pageYOffset" : "scrollTop"
            ],
          getTotalActionItems: () =>
            this.root_.querySelectorAll(M.ACTION_ITEM_SELECTOR).length
        });
        let e;
        return (
          (this.scrollTarget_ = window),
          (e = this.root_.classList.contains(F.SHORT_CLASS)
            ? new B(t)
            : this.root_.classList.contains(F.FIXED_CLASS)
              ? new P(t)
              : new K(t))
        );
      }
    }
    /**
     * @license
     * Copyright 2017 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    /**
     * @license
     * Copyright 2016 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    const U = {
      LABEL_FLOAT_ABOVE: "mdc-floating-label--float-above",
      LABEL_SHAKE: "mdc-floating-label--shake"
    };
    /**
     * @license
     * Copyright 2016 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */ class W extends i {
      static get cssClasses() {
        return U;
      }
      static get defaultAdapter() {
        return {
          addClass: () => {},
          removeClass: () => {},
          getWidth: () => {},
          registerInteractionHandler: () => {},
          deregisterInteractionHandler: () => {}
        };
      }
      constructor(t) {
        super(Object.assign(W.defaultAdapter, t)),
          (this.shakeAnimationEndHandler_ = () =>
            this.handleShakeAnimationEnd_());
      }
      init() {
        this.adapter_.registerInteractionHandler(
          "animationend",
          this.shakeAnimationEndHandler_
        );
      }
      destroy() {
        this.adapter_.deregisterInteractionHandler(
          "animationend",
          this.shakeAnimationEndHandler_
        );
      }
      getWidth() {
        return this.adapter_.getWidth();
      }
      shake(t) {
        const { LABEL_SHAKE: e } = W.cssClasses;
        t ? this.adapter_.addClass(e) : this.adapter_.removeClass(e);
      }
      float(t) {
        const { LABEL_FLOAT_ABOVE: e, LABEL_SHAKE: s } = W.cssClasses;
        t
          ? this.adapter_.addClass(e)
          : (this.adapter_.removeClass(e), this.adapter_.removeClass(s));
      }
      handleShakeAnimationEnd_() {
        const { LABEL_SHAKE: t } = W.cssClasses;
        this.adapter_.removeClass(t);
      }
    }
    var q = W;
    /**
     * @license
     * Copyright 2016 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */ class z extends a {
      static attachTo(t) {
        return new z(t);
      }
      shake(t) {
        this.foundation_.shake(t);
      }
      float(t) {
        this.foundation_.float(t);
      }
      getWidth() {
        return this.foundation_.getWidth();
      }
      getDefaultFoundation() {
        return new q({
          addClass: t => this.root_.classList.add(t),
          removeClass: t => this.root_.classList.remove(t),
          getWidth: () => this.root_.offsetWidth,
          registerInteractionHandler: (t, e) =>
            this.root_.addEventListener(t, e),
          deregisterInteractionHandler: (t, e) =>
            this.root_.removeEventListener(t, e)
        });
      }
    }
    /**
     * @license
     * Copyright 2018 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    /**
     * @license
     * Copyright 2018 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    const Y = {
      LINE_RIPPLE_ACTIVE: "mdc-line-ripple--active",
      LINE_RIPPLE_DEACTIVATING: "mdc-line-ripple--deactivating"
    };
    /**
     * @license
     * Copyright 2018 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */ class X extends i {
      static get cssClasses() {
        return Y;
      }
      static get defaultAdapter() {
        return {
          addClass: () => {},
          removeClass: () => {},
          hasClass: () => {},
          setStyle: () => {},
          registerEventHandler: () => {},
          deregisterEventHandler: () => {}
        };
      }
      constructor(t) {
        super(Object.assign(X.defaultAdapter, t)),
          (this.transitionEndHandler_ = t => this.handleTransitionEnd(t));
      }
      init() {
        this.adapter_.registerEventHandler(
          "transitionend",
          this.transitionEndHandler_
        );
      }
      destroy() {
        this.adapter_.deregisterEventHandler(
          "transitionend",
          this.transitionEndHandler_
        );
      }
      activate() {
        this.adapter_.removeClass(Y.LINE_RIPPLE_DEACTIVATING),
          this.adapter_.addClass(Y.LINE_RIPPLE_ACTIVE);
      }
      setRippleCenter(t) {
        this.adapter_.setStyle("transform-origin", `${t}px center`);
      }
      deactivate() {
        this.adapter_.addClass(Y.LINE_RIPPLE_DEACTIVATING);
      }
      handleTransitionEnd(t) {
        const e = this.adapter_.hasClass(Y.LINE_RIPPLE_DEACTIVATING);
        "opacity" === t.propertyName &&
          e &&
          (this.adapter_.removeClass(Y.LINE_RIPPLE_ACTIVE),
          this.adapter_.removeClass(Y.LINE_RIPPLE_DEACTIVATING));
      }
    }
    var j = X;
    /**
     * @license
     * Copyright 2018 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */ class $ extends a {
      static attachTo(t) {
        return new $(t);
      }
      activate() {
        this.foundation_.activate();
      }
      deactivate() {
        this.foundation_.deactivate();
      }
      setRippleCenter(t) {
        this.foundation_.setRippleCenter(t);
      }
      getDefaultFoundation() {
        return new j(
          Object.assign({
            addClass: t => this.root_.classList.add(t),
            removeClass: t => this.root_.classList.remove(t),
            hasClass: t => this.root_.classList.contains(t),
            setStyle: (t, e) => (this.root_.style[t] = e),
            registerEventHandler: (t, e) => this.root_.addEventListener(t, e),
            deregisterEventHandler: (t, e) =>
              this.root_.removeEventListener(t, e)
          })
        );
      }
    }
    /**
     * @license
     * Copyright 2017 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    /**
     * @license
     * Copyright 2018 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    const Z = {
        PATH_SELECTOR: ".mdc-notched-outline__path",
        IDLE_OUTLINE_SELECTOR: ".mdc-notched-outline__idle"
      },
      Q = { OUTLINE_NOTCHED: "mdc-notched-outline--notched" };
    /**
     * @license
     * Copyright 2017 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    class J extends i {
      static get strings() {
        return Z;
      }
      static get cssClasses() {
        return Q;
      }
      static get defaultAdapter() {
        return {
          getWidth: () => {},
          getHeight: () => {},
          addClass: () => {},
          removeClass: () => {},
          setOutlinePathAttr: () => {},
          getIdleOutlineStyleValue: () => {}
        };
      }
      constructor(t) {
        super(Object.assign(J.defaultAdapter, t));
      }
      notch(t, e = !1) {
        const { OUTLINE_NOTCHED: s } = J.cssClasses;
        this.adapter_.addClass(s), this.updateSvgPath_(t, e);
      }
      closeNotch() {
        const { OUTLINE_NOTCHED: t } = J.cssClasses;
        this.adapter_.removeClass(t);
      }
      updateSvgPath_(t, e) {
        const s =
            this.adapter_.getIdleOutlineStyleValue("border-radius") ||
            this.adapter_.getIdleOutlineStyleValue("border-top-left-radius"),
          i = parseFloat(s),
          n = this.adapter_.getWidth(),
          a = this.adapter_.getHeight(),
          o = i + 1.2,
          r = Math.abs(12 - o);
        let l = 0;
        t > 0 && (l = t + 8);
        const c =
          "a" +
          i +
          "," +
          i +
          " 0 0 1 " +
          i +
          "," +
          i +
          "v" +
          (a - 2 * o) +
          "a" +
          i +
          "," +
          i +
          " 0 0 1 " +
          -i +
          "," +
          i +
          "h" +
          (2 * o - n) +
          "a" +
          i +
          "," +
          i +
          " 0 0 1 " +
          -i +
          "," +
          -i +
          "v" +
          (2 * o - a) +
          "a" +
          i +
          "," +
          i +
          " 0 0 1 " +
          i +
          "," +
          -i;
        let d;
        (d = e
          ? "M" + (n - o - r) + ",1h" + r + c + "h" + (n - 2 * o - l - r)
          : "M" + (o + r + l) + ",1h" + (n - 2 * o - l - r) + c + "h" + r),
          this.adapter_.setOutlinePathAttr(d);
      }
    }
    var tt = J;
    /**
     * @license
     * Copyright 2017 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */ class et extends a {
      static attachTo(t) {
        return new et(t);
      }
      notch(t, e) {
        this.foundation_.notch(t, e);
      }
      closeNotch() {
        this.foundation_.closeNotch();
      }
      getDefaultFoundation() {
        return new tt({
          getWidth: () => this.root_.offsetWidth,
          getHeight: () => this.root_.offsetHeight,
          addClass: t => this.root_.classList.add(t),
          removeClass: t => this.root_.classList.remove(t),
          setOutlinePathAttr: t => {
            this.root_.querySelector(Z.PATH_SELECTOR).setAttribute("d", t);
          },
          getIdleOutlineStyleValue: t => {
            const e = this.root_.parentNode.querySelector(
              Z.IDLE_OUTLINE_SELECTOR
            );
            return window.getComputedStyle(e).getPropertyValue(t);
          }
        });
      }
    }
    /**
     * @license
     * Copyright 2018 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    /**
     * @license
     * Copyright 2016 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    const st = {
        DISABLED: "mdc-select--disabled",
        ROOT: "mdc-select",
        OUTLINED: "mdc-select--outlined"
      },
      it = {
        CHANGE_EVENT: "MDCSelect:change",
        LINE_RIPPLE_SELECTOR: ".mdc-line-ripple",
        LABEL_SELECTOR: ".mdc-floating-label",
        NATIVE_CONTROL_SELECTOR: ".mdc-select__native-control",
        OUTLINE_SELECTOR: ".mdc-notched-outline"
      },
      nt = { LABEL_SCALE: 0.75 };
    /**
     * @license
     * Copyright 2016 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    class at extends i {
      static get cssClasses() {
        return st;
      }
      static get numbers() {
        return nt;
      }
      static get strings() {
        return it;
      }
      static get defaultAdapter() {
        return {
          addClass: () => {},
          removeClass: () => {},
          hasClass: () => !1,
          activateBottomLine: () => {},
          deactivateBottomLine: () => {},
          getValue: () => {},
          isRtl: () => !1,
          hasLabel: () => !1,
          floatLabel: () => {},
          getLabelWidth: () => {},
          hasOutline: () => !1,
          notchOutline: () => {},
          closeOutline: () => {}
        };
      }
      constructor(t) {
        super(Object.assign(at.defaultAdapter, t));
      }
      updateDisabledStyle(t) {
        const { DISABLED: e } = at.cssClasses;
        t ? this.adapter_.addClass(e) : this.adapter_.removeClass(e);
      }
      handleChange() {
        const t = this.adapter_.getValue().length > 0;
        this.adapter_.floatLabel(t), this.notchOutline(t);
      }
      handleFocus() {
        this.adapter_.floatLabel(!0),
          this.notchOutline(!0),
          this.adapter_.activateBottomLine();
      }
      handleBlur() {
        this.handleChange(), this.adapter_.deactivateBottomLine();
      }
      notchOutline(t) {
        if (this.adapter_.hasOutline())
          if (t) {
            const t = nt.LABEL_SCALE,
              e = this.adapter_.getLabelWidth() * t,
              s = this.adapter_.isRtl();
            this.adapter_.notchOutline(e, s);
          } else this.adapter_.closeOutline();
      }
    }
    var ot = at;
    /**
     * @license
     * Copyright 2016 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */ class rt extends a {
      constructor(...t) {
        super(...t),
          this.nativeControl_,
          this.ripple,
          this.lineRipple_,
          this.label_,
          this.outline_,
          this.handleChange_,
          this.handleFocus_,
          this.handleBlur_,
          this.handleClick_;
      }
      static attachTo(t) {
        return new rt(t);
      }
      get value() {
        return this.nativeControl_.value;
      }
      set value(t) {
        (this.nativeControl_.value = t), this.foundation_.handleChange();
      }
      get selectedIndex() {
        return this.nativeControl_.selectedIndex;
      }
      set selectedIndex(t) {
        (this.nativeControl_.selectedIndex = t),
          this.foundation_.handleChange();
      }
      get disabled() {
        return this.nativeControl_.disabled;
      }
      set disabled(t) {
        (this.nativeControl_.disabled = t),
          this.foundation_.updateDisabledStyle(t);
      }
      layout() {
        const t = this.nativeControl_.value.length > 0;
        this.foundation_.notchOutline(t);
      }
      initialize(t = t => new z(t), e = t => new $(t), s = t => new et(t)) {
        this.nativeControl_ = this.root_.querySelector(
          it.NATIVE_CONTROL_SELECTOR
        );
        const i = this.root_.querySelector(it.LABEL_SELECTOR);
        i && (this.label_ = t(i));
        const n = this.root_.querySelector(it.LINE_RIPPLE_SELECTOR);
        n && (this.lineRipple_ = e(n));
        const a = this.root_.querySelector(it.OUTLINE_SELECTOR);
        a && (this.outline_ = s(a)),
          this.root_.classList.contains(st.OUTLINED) ||
            (this.ripple = this.initRipple_());
      }
      initRipple_() {
        const t = Object.assign(D.createAdapter(this), {
            registerInteractionHandler: (t, e) =>
              this.nativeControl_.addEventListener(t, e),
            deregisterInteractionHandler: (t, e) =>
              this.nativeControl_.removeEventListener(t, e)
          }),
          e = new N(t);
        return new D(this.root_, e);
      }
      initialSyncWithDOM() {
        (this.handleChange_ = () => this.foundation_.handleChange()),
          (this.handleFocus_ = () => this.foundation_.handleFocus()),
          (this.handleBlur_ = () => this.foundation_.handleBlur()),
          (this.handleClick_ = t => this.setTransformOrigin_(t)),
          this.nativeControl_.addEventListener("change", this.handleChange_),
          this.nativeControl_.addEventListener("focus", this.handleFocus_),
          this.nativeControl_.addEventListener("blur", this.handleBlur_),
          this.lineRipple_ &&
            ["mousedown", "touchstart"].forEach(t => {
              this.nativeControl_.addEventListener(t, this.handleClick_);
            }),
          this.foundation_.handleChange(),
          this.nativeControl_.disabled && (this.disabled = !0);
      }
      destroy() {
        this.nativeControl_.removeEventListener("change", this.handleChange_),
          this.nativeControl_.removeEventListener("focus", this.handleFocus_),
          this.nativeControl_.removeEventListener("blur", this.handleBlur_),
          ["mousedown", "touchstart"].forEach(t => {
            this.nativeControl_.removeEventListener(t, this.handleClick_);
          }),
          this.ripple && this.ripple.destroy(),
          this.outline_ && this.outline_.destroy(),
          super.destroy();
      }
      getDefaultFoundation() {
        return new ot(
          Object.assign(
            {
              addClass: t => this.root_.classList.add(t),
              removeClass: t => this.root_.classList.remove(t),
              hasClass: t => this.root_.classList.contains(t),
              getValue: () => this.nativeControl_.value,
              isRtl: () =>
                "rtl" ===
                window
                  .getComputedStyle(this.root_)
                  .getPropertyValue("direction"),
              activateBottomLine: () => {
                this.lineRipple_ && this.lineRipple_.activate();
              },
              deactivateBottomLine: () => {
                this.lineRipple_ && this.lineRipple_.deactivate();
              }
            },
            this.getOutlineAdapterMethods_(),
            this.getLabelAdapterMethods_()
          )
        );
      }
      getOutlineAdapterMethods_() {
        return {
          hasOutline: () => !!this.outline_,
          notchOutline: (t, e) => {
            this.outline_ && this.outline_.notch(t, e);
          },
          closeOutline: () => {
            this.outline_ && this.outline_.closeNotch();
          }
        };
      }
      getLabelAdapterMethods_() {
        return {
          hasLabel: () => !!this.label_,
          floatLabel: t => {
            this.label_ && this.label_.float(t);
          },
          getLabelWidth: () => (this.label_ ? this.label_.getWidth() : 0)
        };
      }
      setTransformOrigin_(t) {
        const e = t.target.getBoundingClientRect(),
          s = t.clientX - e.left;
        this.lineRipple_.setRippleCenter(s);
      }
    }
    /**
     * @license
     * Copyright 2018 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    /**
     * @license
     * Copyright 2016 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    const lt = {
        OPEN: "mdc-dialog--open",
        OPENING: "mdc-dialog--opening",
        CLOSING: "mdc-dialog--closing",
        SCROLLABLE: "mdc-dialog--scrollable",
        STACKED: "mdc-dialog--stacked",
        SCROLL_LOCK: "mdc-dialog-scroll-lock"
      },
      ct = {
        SCRIM_SELECTOR: ".mdc-dialog__scrim",
        CONTAINER_SELECTOR: ".mdc-dialog__container",
        SURFACE_SELECTOR: ".mdc-dialog__surface",
        CONTENT_SELECTOR: ".mdc-dialog__content",
        BUTTON_SELECTOR: ".mdc-dialog__button",
        DEFAULT_BUTTON_SELECTOR: ".mdc-dialog__button--default",
        SUPPRESS_DEFAULT_PRESS_SELECTOR: [
          "textarea",
          ".mdc-menu .mdc-list-item"
        ].join(", "),
        OPENING_EVENT: "MDCDialog:opening",
        OPENED_EVENT: "MDCDialog:opened",
        CLOSING_EVENT: "MDCDialog:closing",
        CLOSED_EVENT: "MDCDialog:closed",
        ACTION_ATTRIBUTE: "data-mdc-dialog-action",
        CLOSE_ACTION: "close",
        DESTROY_ACTION: "destroy"
      },
      dt = {
        DIALOG_ANIMATION_OPEN_TIME_MS: 150,
        DIALOG_ANIMATION_CLOSE_TIME_MS: 75
      };
    /**
     * @license
     * Copyright 2017 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    class ht extends i {
      static get cssClasses() {
        return lt;
      }
      static get strings() {
        return ct;
      }
      static get numbers() {
        return dt;
      }
      static get defaultAdapter() {
        return {
          addClass: () => {},
          removeClass: () => {},
          hasClass: () => {},
          addBodyClass: () => {},
          removeBodyClass: () => {},
          eventTargetMatches: () => {},
          computeBoundingRect: () => {},
          trapFocus: () => {},
          releaseFocus: () => {},
          isContentScrollable: () => {},
          areButtonsStacked: () => {},
          getActionFromEvent: () => {},
          clickDefaultButton: () => {},
          reverseButtons: () => {},
          notifyOpening: () => {},
          notifyOpened: () => {},
          notifyClosing: () => {},
          notifyClosed: () => {}
        };
      }
      constructor(t) {
        super(Object.assign(ht.defaultAdapter, t)),
          (this.isOpen_ = !1),
          (this.animationTimer_ = 0),
          (this.layoutFrame_ = 0),
          (this.escapeKeyAction_ = ct.CLOSE_ACTION),
          (this.scrimClickAction_ = ct.CLOSE_ACTION),
          (this.autoStackButtons_ = !0),
          (this.areButtonsStacked_ = !1);
      }
      init() {
        this.adapter_.hasClass(lt.STACKED) && this.setAutoStackButtons(!1);
      }
      destroy() {
        this.isOpen_ && this.close(ct.DESTROY_ACTION),
          this.animationTimer_ &&
            (clearTimeout(this.animationTimer_),
            this.handleAnimationTimerEnd_()),
          this.layoutFrame_ &&
            (cancelAnimationFrame(this.layoutFrame_), (this.layoutFrame_ = 0));
      }
      open() {
        (this.isOpen_ = !0),
          this.adapter_.notifyOpening(),
          this.adapter_.addClass(lt.OPENING),
          this.adapter_.computeBoundingRect(),
          this.adapter_.addClass(lt.OPEN),
          this.adapter_.addBodyClass(lt.SCROLL_LOCK),
          this.layout(),
          clearTimeout(this.animationTimer_),
          (this.animationTimer_ = setTimeout(() => {
            this.handleAnimationTimerEnd_(),
              this.adapter_.trapFocus(),
              this.adapter_.notifyOpened();
          }, dt.DIALOG_ANIMATION_OPEN_TIME_MS));
      }
      close(t = "") {
        this.isOpen_ &&
          ((this.isOpen_ = !1),
          this.adapter_.notifyClosing(t),
          this.adapter_.releaseFocus(),
          this.adapter_.addClass(lt.CLOSING),
          this.adapter_.removeClass(lt.OPEN),
          this.adapter_.removeBodyClass(lt.SCROLL_LOCK),
          clearTimeout(this.animationTimer_),
          (this.animationTimer_ = setTimeout(() => {
            this.handleAnimationTimerEnd_(), this.adapter_.notifyClosed(t);
          }, dt.DIALOG_ANIMATION_CLOSE_TIME_MS)));
      }
      isOpen() {
        return this.isOpen_;
      }
      getEscapeKeyAction() {
        return this.escapeKeyAction_;
      }
      setEscapeKeyAction(t) {
        this.escapeKeyAction_ = t;
      }
      getScrimClickAction() {
        return this.scrimClickAction_;
      }
      setScrimClickAction(t) {
        this.scrimClickAction_ = t;
      }
      getAutoStackButtons() {
        return this.autoStackButtons_;
      }
      setAutoStackButtons(t) {
        this.autoStackButtons_ = t;
      }
      layout() {
        this.layoutFrame_ && cancelAnimationFrame(this.layoutFrame_),
          (this.layoutFrame_ = requestAnimationFrame(() => {
            this.layoutInternal_(), (this.layoutFrame_ = 0);
          }));
      }
      layoutInternal_() {
        this.autoStackButtons_ && this.detectStackedButtons_(),
          this.detectScrollableContent_();
      }
      detectStackedButtons_() {
        this.adapter_.removeClass(lt.STACKED);
        const t = this.adapter_.areButtonsStacked();
        t && this.adapter_.addClass(lt.STACKED),
          t !== this.areButtonsStacked_ &&
            (this.adapter_.reverseButtons(), (this.areButtonsStacked_ = t));
      }
      detectScrollableContent_() {
        this.adapter_.removeClass(lt.SCROLLABLE),
          this.adapter_.isContentScrollable() &&
            this.adapter_.addClass(lt.SCROLLABLE);
      }
      handleInteraction(t) {
        const e = "click" === t.type,
          s = "Enter" === t.key || 13 === t.keyCode;
        if (
          e &&
          this.adapter_.eventTargetMatches(t.target, ct.SCRIM_SELECTOR) &&
          "" !== this.scrimClickAction_
        )
          this.close(this.scrimClickAction_);
        else if (e || "Space" === t.key || 32 === t.keyCode || s) {
          const e = this.adapter_.getActionFromEvent(t);
          e
            ? this.close(e)
            : s &&
              !this.adapter_.eventTargetMatches(
                t.target,
                ct.SUPPRESS_DEFAULT_PRESS_SELECTOR
              ) &&
              this.adapter_.clickDefaultButton();
        }
      }
      handleDocumentKeydown(t) {
        ("Escape" !== t.key && 27 !== t.keyCode) ||
          "" === this.escapeKeyAction_ ||
          this.close(this.escapeKeyAction_);
      }
      handleAnimationTimerEnd_() {
        (this.animationTimer_ = 0),
          this.adapter_.removeClass(lt.OPENING),
          this.adapter_.removeClass(lt.CLOSING);
      }
    }
    var _t = ht,
      ut = s(1),
      pt = s.n(ut);
    /**
     * @license
     * Copyright 2017 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    const mt = _t.strings;
    class Et extends a {
      constructor(...t) {
        super(...t),
          this.buttonRipples_,
          this.buttons_,
          this.defaultButton_,
          this.container_,
          this.content_,
          this.initialFocusEl_,
          this.focusTrapFactory_,
          this.focusTrap_,
          this.handleInteraction_,
          this.handleDocumentKeydown_,
          this.handleOpening_,
          this.handleClosing_,
          this.layout_;
      }
      static attachTo(t) {
        return new Et(t);
      }
      get isOpen() {
        return this.foundation_.isOpen();
      }
      get escapeKeyAction() {
        return this.foundation_.getEscapeKeyAction();
      }
      set escapeKeyAction(t) {
        this.foundation_.setEscapeKeyAction(t);
      }
      get scrimClickAction() {
        return this.foundation_.getScrimClickAction();
      }
      set scrimClickAction(t) {
        this.foundation_.setScrimClickAction(t);
      }
      get autoStackButtons() {
        return this.foundation_.getAutoStackButtons();
      }
      set autoStackButtons(t) {
        this.foundation_.setAutoStackButtons(t);
      }
      initialize(t = pt.a, e = null) {
        (this.container_ = this.root_.querySelector(mt.CONTAINER_SELECTOR)),
          (this.content_ = this.root_.querySelector(mt.CONTENT_SELECTOR)),
          (this.buttons_ = [].slice.call(
            this.root_.querySelectorAll(mt.BUTTON_SELECTOR)
          )),
          (this.defaultButton_ = this.root_.querySelector(
            mt.DEFAULT_BUTTON_SELECTOR
          )),
          (this.buttonRipples_ = []),
          (this.focusTrapFactory_ = t),
          (this.initialFocusEl_ = e);
        for (let t, e = 0; (t = this.buttons_[e]); e++)
          this.buttonRipples_.push(new D(t));
      }
      initialSyncWithDOM() {
        (this.focusTrap_ =
          /**
           * @license
           * Copyright 2016 Google Inc.
           *
           * Permission is hereby granted, free of charge, to any person obtaining a copy
           * of this software and associated documentation files (the "Software"), to deal
           * in the Software without restriction, including without limitation the rights
           * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
           * copies of the Software, and to permit persons to whom the Software is
           * furnished to do so, subject to the following conditions:
           *
           * The above copyright notice and this permission notice shall be included in
           * all copies or substantial portions of the Software.
           *
           * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
           * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
           * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
           * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
           * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
           * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
           * THE SOFTWARE.
           */
          (function(t, e = pt.a, s = null) {
            return e(t, {
              initialFocus: s,
              escapeDeactivates: !1,
              clickOutsideDeactivates: !0
            });
          })(this.container_, this.focusTrapFactory_, this.initialFocusEl_)),
          (this.handleInteraction_ = this.foundation_.handleInteraction.bind(
            this.foundation_
          )),
          (this.handleDocumentKeydown_ = this.foundation_.handleDocumentKeydown.bind(
            this.foundation_
          )),
          (this.layout_ = this.layout.bind(this));
        const t = ["resize", "orientationchange"];
        (this.handleOpening_ = () => {
          t.forEach(t => window.addEventListener(t, this.layout_)),
            document.addEventListener("keydown", this.handleDocumentKeydown_);
        }),
          (this.handleClosing_ = () => {
            t.forEach(t => window.removeEventListener(t, this.layout_)),
              document.removeEventListener(
                "keydown",
                this.handleDocumentKeydown_
              );
          }),
          this.listen("click", this.handleInteraction_),
          this.listen("keydown", this.handleInteraction_),
          this.listen(mt.OPENING_EVENT, this.handleOpening_),
          this.listen(mt.CLOSING_EVENT, this.handleClosing_);
      }
      destroy() {
        this.unlisten("click", this.handleInteraction_),
          this.unlisten("keydown", this.handleInteraction_),
          this.unlisten(mt.OPENING_EVENT, this.handleOpening_),
          this.unlisten(mt.CLOSING_EVENT, this.handleClosing_),
          this.handleClosing_(),
          this.buttonRipples_.forEach(t => t.destroy()),
          super.destroy();
      }
      layout() {
        this.foundation_.layout();
      }
      open() {
        this.foundation_.open();
      }
      close(t = "") {
        this.foundation_.close(t);
      }
      getDefaultFoundation() {
        return new _t({
          addClass: t => this.root_.classList.add(t),
          removeClass: t => this.root_.classList.remove(t),
          hasClass: t => this.root_.classList.contains(t),
          addBodyClass: t => document.body.classList.add(t),
          removeBodyClass: t => document.body.classList.remove(t),
          eventTargetMatches: (t, e) => m(t, e),
          computeBoundingRect: () => this.root_.getBoundingClientRect(),
          trapFocus: () => this.focusTrap_.activate(),
          releaseFocus: () => this.focusTrap_.deactivate(),
          isContentScrollable: () =>
            !!this.content_ &&
            (function(t) {
              return t.scrollHeight > t.offsetHeight;
            })(this.content_),
          areButtonsStacked: () =>
            (function(t) {
              const e = new Set();
              return [].forEach.call(t, t => e.add(t.offsetTop)), e.size > 1;
            })(this.buttons_),
          getActionFromEvent: t => {
            const e = (function(t, e) {
              if (t.closest) return t.closest(e);
              let s = t;
              for (; s; ) {
                if (m(s, e)) return s;
                s = s.parentElement;
              }
              return null;
            })(t.target, `[${mt.ACTION_ATTRIBUTE}]`);
            return e && e.getAttribute(mt.ACTION_ATTRIBUTE);
          },
          clickDefaultButton: () => {
            this.defaultButton_ && this.defaultButton_.click();
          },
          reverseButtons: () => {
            this.buttons_.reverse(),
              this.buttons_.forEach(t => t.parentElement.appendChild(t));
          },
          notifyOpening: () => this.emit(mt.OPENING_EVENT, {}),
          notifyOpened: () => this.emit(mt.OPENED_EVENT, {}),
          notifyClosing: t =>
            this.emit(mt.CLOSING_EVENT, t ? { action: t } : {}),
          notifyClosed: t => this.emit(mt.CLOSED_EVENT, t ? { action: t } : {})
        });
      }
    }
    const ft = T.attachTo(document.querySelector(".mdc-drawer")),
      gt = G.attachTo(document.getElementById("app-bar"));
    gt.setScrollTarget(document.getElementById("main-content")),
      gt.listen("MDCTopAppBar:nav", () => {
        ft.open = !ft.open;
      });
    const Tt = new rt(document.querySelector(".mdc-select"));
    Tt.listen("change", () => {
      alert(
        `Selected option at index ${Tt.selectedIndex} with value "${Tt.value}"`
      );
    });
    const Ct = new Et(document.querySelector(".mdc-dialog"));
    document.querySelector(".dialog-item").addEventListener("click", () => {
      Ct.isOpen ? Ct.close() : Ct.open();
    });
    const St = new E(document.querySelector(".mdc-dialog .mdc-list"));
    Ct.listen("MDCDialog:opened", () => {
      St.layout();
    });
    new D(document.querySelector(".mdc-button"));
    D.attachTo(document.querySelector(".mdc-button"));
    /**
     * @license
     * Copyright 2018 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    const vt = {
        ROOT: "mdc-menu",
        MENU_SELECTED_LIST_ITEM: "mdc-menu-item--selected",
        MENU_SELECTION_GROUP: "mdc-menu__selection-group"
      },
      At = {
        SELECTED_EVENT: "MDCMenu:selected",
        ARIA_SELECTED_ATTR: "aria-selected",
        LIST_SELECTOR: ".mdc-list",
        CHECKBOX_SELECTOR: 'input[type="checkbox"]'
      };
    /**
     * @license
     * Copyright 2018 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    const It = {
        ANCHOR: "mdc-menu-surface--anchor",
        ANIMATING_CLOSED: "mdc-menu-surface--animating-closed",
        ANIMATING_OPEN: "mdc-menu-surface--animating-open",
        FIXED: "mdc-menu-surface--fixed",
        OPEN: "mdc-menu-surface--open",
        ROOT: "mdc-menu-surface"
      },
      Lt = {
        CLOSED_EVENT: "MDCMenuSurface:closed",
        OPENED_EVENT: "MDCMenuSurface:opened",
        FOCUSABLE_ELEMENTS:
          'button:not(:disabled), [href]:not([aria-disabled="true"]), input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex="-1"]):not([aria-disabled="true"])'
      },
      Ot = {
        TRANSITION_OPEN_DURATION: 120,
        TRANSITION_CLOSE_DURATION: 75,
        MARGIN_TO_EDGE: 32,
        ANCHOR_TO_MENU_SURFACE_WIDTH_RATIO: 0.67
      },
      yt = { BOTTOM: 1, CENTER: 2, RIGHT: 4, FLIP_RTL: 8 },
      bt = {
        TOP_LEFT: 0,
        TOP_RIGHT: yt.RIGHT,
        BOTTOM_LEFT: yt.BOTTOM,
        BOTTOM_RIGHT: yt.BOTTOM | yt.RIGHT,
        TOP_START: yt.FLIP_RTL,
        TOP_END: yt.FLIP_RTL | yt.RIGHT,
        BOTTOM_START: yt.BOTTOM | yt.FLIP_RTL,
        BOTTOM_END: yt.BOTTOM | yt.RIGHT | yt.FLIP_RTL
      };
    class Rt extends i {
      static get cssClasses() {
        return It;
      }
      static get strings() {
        return Lt;
      }
      static get numbers() {
        return Ot;
      }
      static get Corner() {
        return bt;
      }
      static get defaultAdapter() {
        return {
          addClass: () => {},
          removeClass: () => {},
          hasClass: () => !1,
          hasAnchor: () => !1,
          notifyClose: () => {},
          notifyOpen: () => {},
          isElementInContainer: () => !1,
          isRtl: () => !1,
          setTransformOrigin: () => {},
          isFocused: () => !1,
          saveFocus: () => {},
          restoreFocus: () => {},
          isFirstElementFocused: () => {},
          isLastElementFocused: () => {},
          focusFirstElement: () => {},
          focusLastElement: () => {},
          getInnerDimensions: () => ({}),
          getAnchorDimensions: () => ({}),
          getWindowDimensions: () => ({}),
          getBodyDimensions: () => ({}),
          getWindowScroll: () => ({}),
          setPosition: () => {},
          setMaxHeight: () => {}
        };
      }
      constructor(t) {
        super(Object.assign(Rt.defaultAdapter, t)),
          (this.isOpen_ = !1),
          (this.openAnimationEndTimerId_ = 0),
          (this.closeAnimationEndTimerId_ = 0),
          (this.animationRequestId_ = 0),
          this.dimensions_,
          (this.anchorCorner_ = bt.TOP_START),
          (this.anchorMargin_ = { top: 0, right: 0, bottom: 0, left: 0 }),
          (this.measures_ = null),
          (this.quickOpen_ = !1),
          (this.hoistedElement_ = !1),
          (this.isFixedPosition_ = !1),
          (this.position_ = { x: 0, y: 0 });
      }
      init() {
        const { ROOT: t, OPEN: e } = Rt.cssClasses;
        if (!this.adapter_.hasClass(t))
          throw new Error(`${t} class required in root element.`);
        this.adapter_.hasClass(e) && (this.isOpen_ = !0);
      }
      destroy() {
        clearTimeout(this.openAnimationEndTimerId_),
          clearTimeout(this.closeAnimationEndTimerId_),
          cancelAnimationFrame(this.animationRequestId_);
      }
      setAnchorCorner(t) {
        this.anchorCorner_ = t;
      }
      setAnchorMargin(t) {
        (this.anchorMargin_.top = "number" == typeof t.top ? t.top : 0),
          (this.anchorMargin_.right = "number" == typeof t.right ? t.right : 0),
          (this.anchorMargin_.bottom =
            "number" == typeof t.bottom ? t.bottom : 0),
          (this.anchorMargin_.left = "number" == typeof t.left ? t.left : 0);
      }
      setIsHoisted(t) {
        this.hoistedElement_ = t;
      }
      setFixedPosition(t) {
        this.isFixedPosition_ = t;
      }
      setAbsolutePosition(t, e) {
        (this.position_.x = this.typeCheckisFinite_(t) ? t : 0),
          (this.position_.y = this.typeCheckisFinite_(e) ? e : 0);
      }
      setQuickOpen(t) {
        this.quickOpen_ = t;
      }
      handleBodyClick(t) {
        const e = t.target;
        this.adapter_.isElementInContainer(e) || this.close();
      }
      handleKeydown(t) {
        const { keyCode: e, key: s, shiftKey: i } = t,
          n = "Tab" === s || 9 === e;
        "Escape" === s || 27 === e
          ? this.close()
          : n &&
            (this.adapter_.isLastElementFocused() && !i
              ? (this.adapter_.focusFirstElement(), t.preventDefault())
              : this.adapter_.isFirstElementFocused() &&
                i &&
                (this.adapter_.focusLastElement(), t.preventDefault()));
      }
      getAutoLayoutMeasurements_() {
        let t = this.adapter_.getAnchorDimensions();
        const e = this.adapter_.getWindowDimensions(),
          s = this.adapter_.getBodyDimensions(),
          i = this.adapter_.getWindowScroll();
        return (
          t ||
            (t = {
              x: this.position_.x,
              y: this.position_.y,
              top: this.position_.y,
              bottom: this.position_.y,
              left: this.position_.x,
              right: this.position_.x,
              height: 0,
              width: 0
            }),
          {
            viewport: e,
            bodyDimensions: s,
            windowScroll: i,
            viewportDistance: {
              top: t.top,
              right: e.width - t.right,
              left: t.left,
              bottom: e.height - t.bottom
            },
            anchorHeight: t.height,
            anchorWidth: t.width,
            surfaceHeight: this.dimensions_.height,
            surfaceWidth: this.dimensions_.width
          }
        );
      }
      getOriginCorner_() {
        let t = bt.TOP_LEFT;
        const {
            viewportDistance: e,
            anchorHeight: s,
            anchorWidth: i,
            surfaceHeight: n,
            surfaceWidth: a
          } = this.measures_,
          o = Boolean(this.anchorCorner_ & yt.BOTTOM),
          r = o
            ? e.top + s + this.anchorMargin_.bottom
            : e.top + this.anchorMargin_.top,
          l =
            n -
            (o
              ? e.bottom - this.anchorMargin_.bottom
              : e.bottom + s - this.anchorMargin_.top);
        l > 0 && n - r < l && (t |= yt.BOTTOM);
        const c = this.adapter_.isRtl(),
          d = Boolean(this.anchorCorner_ & yt.FLIP_RTL),
          h = Boolean(this.anchorCorner_ & yt.RIGHT),
          _ = (h && !c) || (!h && d && c),
          u =
            a -
            (_
              ? e.left + i + this.anchorMargin_.right
              : e.left + this.anchorMargin_.left),
          p =
            a -
            (_
              ? e.right - this.anchorMargin_.right
              : e.right + i - this.anchorMargin_.left);
        return (
          ((u < 0 && _ && c) || (h && !_ && u < 0) || (p > 0 && u < p)) &&
            (t |= yt.RIGHT),
          t
        );
      }
      getHorizontalOriginOffset_(t) {
        const { anchorWidth: e } = this.measures_,
          s = Boolean(t & yt.RIGHT),
          i = Boolean(this.anchorCorner_ & yt.RIGHT);
        if (s) {
          const t = i ? e - this.anchorMargin_.left : this.anchorMargin_.right;
          return this.hoistedElement_ || this.isFixedPosition_
            ? t -
                (this.measures_.viewport.width -
                  this.measures_.bodyDimensions.width)
            : t;
        }
        return i ? e - this.anchorMargin_.right : this.anchorMargin_.left;
      }
      getVerticalOriginOffset_(t) {
        const { anchorHeight: e } = this.measures_,
          s = Boolean(t & yt.BOTTOM),
          i = Boolean(this.anchorCorner_ & yt.BOTTOM);
        let n = 0;
        return (n = s
          ? i
            ? e - this.anchorMargin_.top
            : -this.anchorMargin_.bottom
          : i
            ? e + this.anchorMargin_.bottom
            : this.anchorMargin_.top);
      }
      getMenuSurfaceMaxHeight_(t) {
        let e = 0;
        const { viewportDistance: s } = this.measures_,
          i = Boolean(t & yt.BOTTOM),
          { MARGIN_TO_EDGE: n } = Rt.numbers;
        return (
          i
            ? ((e = s.top + this.anchorMargin_.top - n),
              this.anchorCorner_ & yt.BOTTOM ||
                (e += this.measures_.anchorHeight))
            : ((e =
                s.bottom -
                this.anchorMargin_.bottom +
                this.measures_.anchorHeight -
                n),
              this.anchorCorner_ & yt.BOTTOM &&
                (e -= this.measures_.anchorHeight)),
          e
        );
      }
      autoPosition_() {
        this.measures_ = this.getAutoLayoutMeasurements_();
        const t = this.getOriginCorner_(),
          e = this.getMenuSurfaceMaxHeight_(t),
          s = t & yt.BOTTOM ? "bottom" : "top";
        let i = t & yt.RIGHT ? "right" : "left";
        const n = this.getHorizontalOriginOffset_(t),
          a = this.getVerticalOriginOffset_(t);
        let o = { [i]: n || "0", [s]: a || "0" };
        const { anchorWidth: r, surfaceWidth: l } = this.measures_;
        r / l > Ot.ANCHOR_TO_MENU_SURFACE_WIDTH_RATIO && (i = "center"),
          (this.hoistedElement_ || this.isFixedPosition_) &&
            (o = this.adjustPositionForHoistedElement_(o));
        for (const t in o)
          o.hasOwnProperty(t) &&
            "0" !== o[t] &&
            (o[t] = `${parseInt(o[t], 10)}px`);
        this.adapter_.setTransformOrigin(`${i} ${s}`),
          this.adapter_.setPosition(o),
          this.adapter_.setMaxHeight(e ? e + "px" : ""),
          (this.measures_ = null);
      }
      adjustPositionForHoistedElement_(t) {
        const { windowScroll: e, viewportDistance: s } = this.measures_;
        for (const i in t)
          t.hasOwnProperty(i) &&
            (s.hasOwnProperty(i) && (t[i] = parseInt(t[i], 10) + s[i]),
            this.isFixedPosition_ ||
              ("top" === i
                ? (t[i] = parseInt(t[i], 10) + e.y)
                : "bottom" === i
                  ? (t[i] = parseInt(t[i], 10) - e.y)
                  : "left" === i
                    ? (t[i] = parseInt(t[i], 10) + e.x)
                    : "right" === i && (t[i] = parseInt(t[i], 10) - e.x)));
        return t;
      }
      open() {
        this.adapter_.saveFocus(),
          this.quickOpen_ ||
            this.adapter_.addClass(Rt.cssClasses.ANIMATING_OPEN),
          (this.animationRequestId_ = requestAnimationFrame(() => {
            this.adapter_.addClass(Rt.cssClasses.OPEN),
              (this.dimensions_ = this.adapter_.getInnerDimensions()),
              this.autoPosition_(),
              this.quickOpen_
                ? this.adapter_.notifyOpen()
                : (this.openAnimationEndTimerId_ = setTimeout(() => {
                    (this.openAnimationEndTimerId_ = 0),
                      this.adapter_.removeClass(Rt.cssClasses.ANIMATING_OPEN),
                      this.adapter_.notifyOpen();
                  }, Ot.TRANSITION_OPEN_DURATION));
          })),
          (this.isOpen_ = !0);
      }
      close() {
        this.quickOpen_ ||
          this.adapter_.addClass(Rt.cssClasses.ANIMATING_CLOSED),
          requestAnimationFrame(() => {
            this.adapter_.removeClass(Rt.cssClasses.OPEN),
              this.quickOpen_
                ? this.adapter_.notifyClose()
                : (this.closeAnimationEndTimerId_ = setTimeout(() => {
                    (this.closeAnimationEndTimerId_ = 0),
                      this.adapter_.removeClass(Rt.cssClasses.ANIMATING_CLOSED),
                      this.adapter_.notifyClose();
                  }, Ot.TRANSITION_CLOSE_DURATION));
          }),
          (this.isOpen_ = !1),
          this.maybeRestoreFocus_();
      }
      maybeRestoreFocus_() {
        (this.adapter_.isFocused() ||
          this.adapter_.isElementInContainer(document.activeElement)) &&
          this.adapter_.restoreFocus();
      }
      isOpen() {
        return this.isOpen_;
      }
      typeCheckisFinite_(t) {
        return "number" == typeof t && isFinite(t);
      }
    }
    /**
     * @license
     * Copyright 2018 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */ const Nt = ["input", "button", "textarea", "select"];
    class Dt extends i {
      static get cssClasses() {
        return vt;
      }
      static get strings() {
        return At;
      }
      static get defaultAdapter() {
        return {
          addClassToElementAtIndex: () => {},
          removeClassFromElementAtIndex: () => {},
          addAttributeToElementAtIndex: () => {},
          removeAttributeFromElementAtIndex: () => {},
          elementContainsClass: () => {},
          closeSurface: () => {},
          getElementIndex: () => {},
          getParentElement: () => {},
          getSelectedElementIndex: () => {},
          notifySelected: () => {}
        };
      }
      constructor(t) {
        super(Object.assign(Dt.defaultAdapter, t)),
          (this.closeAnimationEndTimerId_ = 0);
      }
      destroy() {
        this.closeAnimationEndTimerId_ &&
          clearTimeout(this.closeAnimationEndTimerId_),
          this.adapter_.closeSurface();
      }
      handleKeydown(t) {
        const { key: e, keyCode: s } = t,
          i = "Tab" === e || 9 === s;
        "Space" === e || 32 === s || ("Enter" === e || 13 === s)
          ? this.handleAction_(t)
          : i && this.adapter_.closeSurface();
      }
      handleClick(t) {
        this.handleAction_(t);
      }
      handleAction_(t) {
        const e = this.getListItem_(t.target);
        e && (this.handleSelection_(e), this.preventDefaultEvent_(t));
      }
      handleSelection_(t) {
        const e = this.adapter_.getElementIndex(t);
        e < 0 ||
          (this.adapter_.notifySelected({ index: e }),
          this.adapter_.closeSurface(),
          (this.closeAnimationEndTimerId_ = setTimeout(() => {
            const s = this.getSelectionGroup_(t);
            null !== s && this.handleSelectionGroup_(s, e);
          }, Rt.numbers.TRANSITION_CLOSE_DURATION)));
      }
      handleSelectionGroup_(t, e) {
        const s = this.adapter_.getSelectedElementIndex(t);
        s >= 0 &&
          (this.adapter_.removeAttributeFromElementAtIndex(
            s,
            At.ARIA_SELECTED_ATTR
          ),
          this.adapter_.removeClassFromElementAtIndex(
            s,
            vt.MENU_SELECTED_LIST_ITEM
          )),
          this.adapter_.addClassToElementAtIndex(e, vt.MENU_SELECTED_LIST_ITEM),
          this.adapter_.addAttributeToElementAtIndex(
            e,
            At.ARIA_SELECTED_ATTR,
            "true"
          );
      }
      getSelectionGroup_(t) {
        let e = this.adapter_.getParentElement(t),
          s = this.adapter_.elementContainsClass(e, vt.MENU_SELECTION_GROUP);
        for (
          ;
          !s && !this.adapter_.elementContainsClass(e, p.cssClasses.ROOT);

        )
          (e = this.adapter_.getParentElement(e)),
            (s = this.adapter_.elementContainsClass(
              e,
              vt.MENU_SELECTION_GROUP
            ));
        return s ? e : null;
      }
      getListItem_(t) {
        let e = this.adapter_.elementContainsClass(
          t,
          p.cssClasses.LIST_ITEM_CLASS
        );
        for (; !e; ) {
          if (!(t = this.adapter_.getParentElement(t))) return null;
          e = this.adapter_.elementContainsClass(
            t,
            p.cssClasses.LIST_ITEM_CLASS
          );
        }
        return t;
      }
      preventDefaultEvent_(t) {
        const e = `${t.target.tagName}`.toLowerCase();
        -1 === Nt.indexOf(e) && t.preventDefault();
      }
    }
    /**
     * @license
     * Copyright 2018 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */ let wt;
    /**
     * @license
     * Copyright 2018 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    class Ft extends a {
      constructor(...t) {
        super(...t),
          this.previousFocus_,
          this.anchorElement,
          this.firstFocusableElement_,
          this.lastFocusableElement_,
          this.handleKeydown_,
          this.handleBodyClick_,
          this.registerBodyClickListener_,
          this.deregisterBodyClickListener_;
      }
      static attachTo(t) {
        return new Ft(t);
      }
      initialSyncWithDOM() {
        this.root_.parentElement &&
          this.root_.parentElement.classList.contains(It.ANCHOR) &&
          (this.anchorElement = this.root_.parentElement),
          this.root_.classList.contains(It.FIXED) && this.setFixedPosition(!0),
          (this.handleKeydown_ = t => this.foundation_.handleKeydown(t)),
          (this.handleBodyClick_ = t => this.foundation_.handleBodyClick(t)),
          (this.registerBodyClickListener_ = () =>
            document.body.addEventListener("click", this.handleBodyClick_)),
          (this.deregisterBodyClickListener_ = () =>
            document.body.removeEventListener("click", this.handleBodyClick_)),
          this.root_.addEventListener("keydown", this.handleKeydown_),
          this.root_.addEventListener(
            Lt.OPENED_EVENT,
            this.registerBodyClickListener_
          ),
          this.root_.addEventListener(
            Lt.CLOSED_EVENT,
            this.deregisterBodyClickListener_
          );
      }
      destroy() {
        this.root_.removeEventListener("keydown", this.handleKeydown_),
          this.root_.removeEventListener(
            Lt.OPENED_EVENT,
            this.registerBodyClickListener_
          ),
          this.root_.removeEventListener(
            Lt.CLOSED_EVENT,
            this.deregisterBodyClickListener_
          ),
          super.destroy();
      }
      get open() {
        return this.foundation_.isOpen();
      }
      set open(t) {
        if (t) {
          const t = this.root_.querySelectorAll(Lt.FOCUSABLE_ELEMENTS);
          (this.firstFocusableElement_ = t.length > 0 ? t[0] : null),
            (this.lastFocusableElement_ =
              t.length > 0 ? t[t.length - 1] : null),
            this.foundation_.open();
        } else this.foundation_.close();
      }
      hoistMenuToBody() {
        document.body.appendChild(
          this.root_.parentElement.removeChild(this.root_)
        ),
          this.setIsHoisted(!0);
      }
      setIsHoisted(t) {
        this.foundation_.setIsHoisted(t);
      }
      setMenuSurfaceAnchorElement(t) {
        this.anchorElement = t;
      }
      setFixedPosition(t) {
        t
          ? this.root_.classList.add(It.FIXED)
          : this.root_.classList.remove(It.FIXED),
          this.foundation_.setFixedPosition(t);
      }
      setAbsolutePosition(t, e) {
        this.foundation_.setAbsolutePosition(t, e), this.setIsHoisted(!0);
      }
      setAnchorCorner(t) {
        this.foundation_.setAnchorCorner(t);
      }
      setAnchorMargin(t) {
        this.foundation_.setAnchorMargin(t);
      }
      set quickOpen(t) {
        this.foundation_.setQuickOpen(t);
      }
      getDefaultFoundation() {
        return new Rt(
          Object.assign(
            {
              addClass: t => this.root_.classList.add(t),
              removeClass: t => this.root_.classList.remove(t),
              hasClass: t => this.root_.classList.contains(t),
              hasAnchor: () => !!this.anchorElement,
              notifyClose: () => this.emit(Rt.strings.CLOSED_EVENT, {}),
              notifyOpen: () => this.emit(Rt.strings.OPENED_EVENT, {}),
              isElementInContainer: t =>
                this.root_ === t || this.root_.contains(t),
              isRtl: () =>
                "rtl" ===
                getComputedStyle(this.root_).getPropertyValue("direction"),
              setTransformOrigin: t => {
                this.root_.style[
                  `${(function(t, e = !1) {
                    if (void 0 === wt || e) {
                      const e =
                        "transform" in t.document.createElement("div").style
                          ? "transform"
                          : "webkitTransform";
                      wt = e;
                    }
                    return wt;
                  })(window)}-origin`
                ] = t;
              }
            },
            this.getFocusAdapterMethods_(),
            this.getDimensionAdapterMethods_()
          )
        );
      }
      getFocusAdapterMethods_() {
        return {
          isFocused: () => document.activeElement === this.root_,
          saveFocus: () => {
            this.previousFocus_ = document.activeElement;
          },
          restoreFocus: () => {
            this.root_.contains(document.activeElement) &&
              this.previousFocus_ &&
              this.previousFocus_.focus &&
              this.previousFocus_.focus();
          },
          isFirstElementFocused: () =>
            this.firstFocusableElement_ &&
            this.firstFocusableElement_ === document.activeElement,
          isLastElementFocused: () =>
            this.lastFocusableElement_ &&
            this.lastFocusableElement_ === document.activeElement,
          focusFirstElement: () =>
            this.firstFocusableElement_ &&
            this.firstFocusableElement_.focus &&
            this.firstFocusableElement_.focus(),
          focusLastElement: () =>
            this.lastFocusableElement_ &&
            this.lastFocusableElement_.focus &&
            this.lastFocusableElement_.focus()
        };
      }
      getDimensionAdapterMethods_() {
        return {
          getInnerDimensions: () => ({
            width: this.root_.offsetWidth,
            height: this.root_.offsetHeight
          }),
          getAnchorDimensions: () =>
            this.anchorElement && this.anchorElement.getBoundingClientRect(),
          getWindowDimensions: () => ({
            width: window.innerWidth,
            height: window.innerHeight
          }),
          getBodyDimensions: () => ({
            width: document.body.clientWidth,
            height: document.body.clientHeight
          }),
          getWindowScroll: () => ({
            x: window.pageXOffset,
            y: window.pageYOffset
          }),
          setPosition: t => {
            (this.root_.style.left = "left" in t ? t.left : null),
              (this.root_.style.right = "right" in t ? t.right : null),
              (this.root_.style.top = "top" in t ? t.top : null),
              (this.root_.style.bottom = "bottom" in t ? t.bottom : null);
          },
          setMaxHeight: t => {
            this.root_.style.maxHeight = t;
          }
        };
      }
    }
    /**
     * @license
     * Copyright 2018 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */ class xt extends a {
      constructor(...t) {
        super(...t),
          this.menuSurface_,
          this.list_,
          this.handleKeydown_,
          this.handleClick_,
          this.afterOpenedCallback_;
      }
      static attachTo(t) {
        return new xt(t);
      }
      initialize(t = t => new Ft(t), e = t => new E(t)) {
        this.menuSurface_ = t(this.root_);
        const s = this.root_.querySelector(At.LIST_SELECTOR);
        s && ((this.list_ = e(s)), (this.list_.wrapFocus = !0));
      }
      initialSyncWithDOM() {
        (this.afterOpenedCallback_ = () => this.handleAfterOpened_()),
          (this.handleKeydown_ = t => this.foundation_.handleKeydown(t)),
          (this.handleClick_ = t => this.foundation_.handleClick(t)),
          this.menuSurface_.listen(
            Rt.strings.OPENED_EVENT,
            this.afterOpenedCallback_
          ),
          this.listen("keydown", this.handleKeydown_),
          this.listen("click", this.handleClick_);
      }
      destroy() {
        this.list_ && this.list_.destroy(),
          this.menuSurface_.destroy(),
          this.menuSurface_.unlisten(
            Rt.strings.OPENED_EVENT,
            this.afterOpenedCallback_
          ),
          this.unlisten("keydown", this.handleKeydown_),
          this.unlisten("click", this.handleClick_),
          super.destroy();
      }
      get open() {
        return this.menuSurface_.open;
      }
      set open(t) {
        this.menuSurface_.open = t;
      }
      setAnchorCorner(t) {
        this.menuSurface_.setAnchorCorner(t);
      }
      setAnchorMargin(t) {
        this.menuSurface_.setAnchorMargin(t);
      }
      get items() {
        return this.list_.listElements;
      }
      getOptionByIndex(t) {
        return t < this.items.length ? this.items[t] : null;
      }
      set quickOpen(t) {
        this.menuSurface_.quickOpen = t;
      }
      setFixedPosition(t) {
        this.menuSurface_.setFixedPosition(t);
      }
      hoistMenuToBody() {
        this.menuSurface_.hoistMenuToBody();
      }
      setIsHoisted(t) {
        this.menuSurface_.setIsHoisted(t);
      }
      setAbsolutePosition(t, e) {
        this.menuSurface_.setAbsolutePosition(t, e);
      }
      setAnchorElement(t) {
        this.menuSurface_.anchorElement = t;
      }
      handleAfterOpened_() {
        const t = this.items;
        t.length > 0 && t[0].focus();
      }
      getDefaultFoundation() {
        return new Dt({
          addClassToElementAtIndex: (t, e) => {
            this.items[t].classList.add(e);
          },
          removeClassFromElementAtIndex: (t, e) => {
            this.items[t].classList.remove(e);
          },
          addAttributeToElementAtIndex: (t, e, s) => {
            this.items[t].setAttribute(e, s);
          },
          removeAttributeFromElementAtIndex: (t, e) => {
            this.items[t].removeAttribute(e);
          },
          elementContainsClass: (t, e) => t.classList.contains(e),
          closeSurface: () => (this.open = !1),
          getElementIndex: t => this.items.indexOf(t),
          getParentElement: t => t.parentElement,
          getSelectedElementIndex: t =>
            this.items.indexOf(
              t.querySelector(`.${vt.MENU_SELECTED_LIST_ITEM}`)
            ),
          notifySelected: t =>
            this.emit(At.SELECTED_EVENT, {
              index: t.index,
              item: this.items[t.index]
            })
        });
      }
    }
    const Mt = new xt(document.querySelector(".mdc-menu"));
    document.querySelector(".menu-button").addEventListener("click", () => {
      Mt.open ? (Mt.open = !1) : (Mt.open = !0);
    });
    /**
     * @license
     * Copyright 2018 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    const Ht = {
        ACTIVE: "mdc-tab-indicator--active",
        FADE: "mdc-tab-indicator--fade",
        NO_TRANSITION: "mdc-tab-indicator--no-transition"
      },
      kt = { CONTENT_SELECTOR: ".mdc-tab-indicator__content" };
    /**
     * @license
     * Copyright 2018 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    class Pt extends i {
      static get cssClasses() {
        return Ht;
      }
      static get strings() {
        return kt;
      }
      static get defaultAdapter() {
        return {
          addClass: () => {},
          removeClass: () => {},
          computeContentClientRect: () => {},
          setContentStyleProperty: () => {}
        };
      }
      constructor(t) {
        super(Object.assign(Pt.defaultAdapter, t));
      }
      computeContentClientRect() {
        return this.adapter_.computeContentClientRect();
      }
      activate(t) {}
      deactivate() {}
    }
    var Bt = Pt;
    /**
     * @license
     * Copyright 2018 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */ var Vt = class extends Bt {
      activate(t) {
        if (!t) return void this.adapter_.addClass(Bt.cssClasses.ACTIVE);
        const e = this.computeContentClientRect(),
          s = t.width / e.width,
          i = t.left - e.left;
        this.adapter_.addClass(Bt.cssClasses.NO_TRANSITION),
          this.adapter_.setContentStyleProperty(
            "transform",
            `translateX(${i}px) scaleX(${s})`
          ),
          this.computeContentClientRect(),
          this.adapter_.removeClass(Bt.cssClasses.NO_TRANSITION),
          this.adapter_.addClass(Bt.cssClasses.ACTIVE),
          this.adapter_.setContentStyleProperty("transform", "");
      }
      deactivate() {
        this.adapter_.removeClass(Bt.cssClasses.ACTIVE);
      }
    };
    /**
     * @license
     * Copyright 2018 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */ var Kt = class extends Bt {
      activate() {
        this.adapter_.addClass(Bt.cssClasses.ACTIVE);
      }
      deactivate() {
        this.adapter_.removeClass(Bt.cssClasses.ACTIVE);
      }
    };
    /**
     * @license
     * Copyright 2018 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */ class Gt extends a {
      static attachTo(t) {
        return new Gt(t);
      }
      constructor(...t) {
        super(...t), this.content_;
      }
      initialize() {
        this.content_ = this.root_.querySelector(Bt.strings.CONTENT_SELECTOR);
      }
      computeContentClientRect() {
        return this.foundation_.computeContentClientRect();
      }
      getDefaultFoundation() {
        const t = Object.assign({
          addClass: t => this.root_.classList.add(t),
          removeClass: t => this.root_.classList.remove(t),
          computeContentClientRect: () => this.content_.getBoundingClientRect(),
          setContentStyleProperty: (t, e) =>
            this.content_.style.setProperty(t, e)
        });
        return this.root_.classList.contains(Bt.cssClasses.FADE)
          ? new Kt(t)
          : new Vt(t);
      }
      activate(t) {
        this.foundation_.activate(t);
      }
      deactivate() {
        this.foundation_.deactivate();
      }
    }
    /**
     * @license
     * Copyright 2018 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    /**
     * @license
     * Copyright 2018 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    const Ut = { ACTIVE: "mdc-tab--active" },
      Wt = {
        ARIA_SELECTED: "aria-selected",
        RIPPLE_SELECTOR: ".mdc-tab__ripple",
        CONTENT_SELECTOR: ".mdc-tab__content",
        TAB_INDICATOR_SELECTOR: ".mdc-tab-indicator",
        TABINDEX: "tabIndex",
        INTERACTED_EVENT: "MDCTab:interacted"
      };
    /**
     * @license
     * Copyright 2018 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    class qt extends i {
      static get cssClasses() {
        return Ut;
      }
      static get strings() {
        return Wt;
      }
      static get defaultAdapter() {
        return {
          addClass: () => {},
          removeClass: () => {},
          hasClass: () => {},
          setAttr: () => {},
          activateIndicator: () => {},
          deactivateIndicator: () => {},
          notifyInteracted: () => {},
          getOffsetLeft: () => {},
          getOffsetWidth: () => {},
          getContentOffsetLeft: () => {},
          getContentOffsetWidth: () => {},
          focus: () => {}
        };
      }
      constructor(t) {
        super(Object.assign(qt.defaultAdapter, t)),
          (this.handleClick_ = () => this.handleClick());
      }
      handleClick() {
        this.adapter_.notifyInteracted();
      }
      isActive() {
        return this.adapter_.hasClass(Ut.ACTIVE);
      }
      activate(t) {
        this.adapter_.addClass(Ut.ACTIVE),
          this.adapter_.setAttr(Wt.ARIA_SELECTED, "true"),
          this.adapter_.setAttr(Wt.TABINDEX, "0"),
          this.adapter_.activateIndicator(t),
          this.adapter_.focus();
      }
      deactivate() {
        this.isActive() &&
          (this.adapter_.removeClass(Ut.ACTIVE),
          this.adapter_.setAttr(Wt.ARIA_SELECTED, "false"),
          this.adapter_.setAttr(Wt.TABINDEX, "-1"),
          this.adapter_.deactivateIndicator());
      }
      computeDimensions() {
        const t = this.adapter_.getOffsetWidth(),
          e = this.adapter_.getOffsetLeft(),
          s = this.adapter_.getContentOffsetWidth(),
          i = this.adapter_.getContentOffsetLeft();
        return {
          rootLeft: e,
          rootRight: e + t,
          contentLeft: e + i,
          contentRight: e + i + s
        };
      }
    }
    var zt = qt;
    /**
     * @license
     * Copyright 2018 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */ class Yt extends a {
      constructor(...t) {
        super(...t),
          this.ripple_,
          this.tabIndicator_,
          this.content_,
          this.handleClick_;
      }
      static attachTo(t) {
        return new Yt(t);
      }
      initialize(t = (t, e) => new D(t, e), e = t => new Gt(t)) {
        const s = this.root_.querySelector(zt.strings.RIPPLE_SELECTOR),
          i = Object.assign(D.createAdapter(this), {
            addClass: t => s.classList.add(t),
            removeClass: t => s.classList.remove(t),
            updateCssVariable: (t, e) => s.style.setProperty(t, e)
          }),
          n = new N(i);
        this.ripple_ = t(this.root_, n);
        const a = this.root_.querySelector(zt.strings.TAB_INDICATOR_SELECTOR);
        (this.tabIndicator_ = e(a)),
          (this.content_ = this.root_.querySelector(
            zt.strings.CONTENT_SELECTOR
          ));
      }
      initialSyncWithDOM() {
        (this.handleClick_ = this.foundation_.handleClick.bind(
          this.foundation_
        )),
          this.listen("click", this.handleClick_);
      }
      destroy() {
        this.unlisten("click", this.handleClick_),
          this.ripple_.destroy(),
          super.destroy();
      }
      getDefaultFoundation() {
        return new zt({
          setAttr: (t, e) => this.root_.setAttribute(t, e),
          addClass: t => this.root_.classList.add(t),
          removeClass: t => this.root_.classList.remove(t),
          hasClass: t => this.root_.classList.contains(t),
          activateIndicator: t => this.tabIndicator_.activate(t),
          deactivateIndicator: () => this.tabIndicator_.deactivate(),
          notifyInteracted: () =>
            this.emit(zt.strings.INTERACTED_EVENT, { tab: this }, !0),
          getOffsetLeft: () => this.root_.offsetLeft,
          getOffsetWidth: () => this.root_.offsetWidth,
          getContentOffsetLeft: () => this.content_.offsetLeft,
          getContentOffsetWidth: () => this.content_.offsetWidth,
          focus: () => this.root_.focus()
        });
      }
      get active() {
        return this.foundation_.isActive();
      }
      activate(t) {
        this.foundation_.activate(t);
      }
      deactivate() {
        this.foundation_.deactivate();
      }
      computeIndicatorClientRect() {
        return this.tabIndicator_.computeContentClientRect();
      }
      computeDimensions() {
        return this.foundation_.computeDimensions();
      }
      focus() {
        this.root_.focus();
      }
    }
    /**
     * @license
     * Copyright 2018 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    /**
     * @license
     * Copyright 2018 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    const Xt = {
        ANIMATING: "mdc-tab-scroller--animating",
        SCROLL_TEST: "mdc-tab-scroller__test",
        SCROLL_AREA_SCROLL: "mdc-tab-scroller__scroll-area--scroll"
      },
      jt = {
        AREA_SELECTOR: ".mdc-tab-scroller__scroll-area",
        CONTENT_SELECTOR: ".mdc-tab-scroller__scroll-content"
      };
    var $t =
      /**
       * @license
       * Copyright 2018 Google Inc.
       *
       * Permission is hereby granted, free of charge, to any person obtaining a copy
       * of this software and associated documentation files (the "Software"), to deal
       * in the Software without restriction, including without limitation the rights
       * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
       * copies of the Software, and to permit persons to whom the Software is
       * furnished to do so, subject to the following conditions:
       *
       * The above copyright notice and this permission notice shall be included in
       * all copies or substantial portions of the Software.
       *
       * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
       * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
       * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
       * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
       * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
       * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
       * THE SOFTWARE.
       */
      class {
        constructor(t) {
          this.adapter_ = t;
        }
        getScrollPositionRTL(t) {}
        scrollToRTL(t) {}
        incrementScrollRTL(t) {}
        getAnimatingScrollPosition(t, e) {}
      };
    /**
     * @license
     * Copyright 2018 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */ var Zt = class extends $t {
      getScrollPositionRTL() {
        const t = this.adapter_.getScrollAreaScrollLeft(),
          { right: e } = this.calculateScrollEdges_();
        return Math.round(e - t);
      }
      scrollToRTL(t) {
        const e = this.calculateScrollEdges_(),
          s = this.adapter_.getScrollAreaScrollLeft(),
          i = this.clampScrollValue_(e.right - t);
        return { finalScrollPosition: i, scrollDelta: i - s };
      }
      incrementScrollRTL(t) {
        const e = this.adapter_.getScrollAreaScrollLeft(),
          s = this.clampScrollValue_(e - t);
        return { finalScrollPosition: s, scrollDelta: s - e };
      }
      getAnimatingScrollPosition(t) {
        return t;
      }
      calculateScrollEdges_() {
        return {
          left: 0,
          right:
            this.adapter_.getScrollContentOffsetWidth() -
            this.adapter_.getScrollAreaOffsetWidth()
        };
      }
      clampScrollValue_(t) {
        const e = this.calculateScrollEdges_();
        return Math.min(Math.max(e.left, t), e.right);
      }
    };
    /**
     * @license
     * Copyright 2018 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */ var Qt = class extends $t {
      getScrollPositionRTL(t) {
        const e = this.adapter_.getScrollAreaScrollLeft();
        return Math.round(t - e);
      }
      scrollToRTL(t) {
        const e = this.adapter_.getScrollAreaScrollLeft(),
          s = this.clampScrollValue_(-t);
        return { finalScrollPosition: s, scrollDelta: s - e };
      }
      incrementScrollRTL(t) {
        const e = this.adapter_.getScrollAreaScrollLeft(),
          s = this.clampScrollValue_(e - t);
        return { finalScrollPosition: s, scrollDelta: s - e };
      }
      getAnimatingScrollPosition(t, e) {
        return t - e;
      }
      calculateScrollEdges_() {
        const t = this.adapter_.getScrollContentOffsetWidth();
        return { left: this.adapter_.getScrollAreaOffsetWidth() - t, right: 0 };
      }
      clampScrollValue_(t) {
        const e = this.calculateScrollEdges_();
        return Math.max(Math.min(e.right, t), e.left);
      }
    };
    /**
     * @license
     * Copyright 2018 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */ var Jt = class extends $t {
      getScrollPositionRTL(t) {
        const e = this.adapter_.getScrollAreaScrollLeft();
        return Math.round(e - t);
      }
      scrollToRTL(t) {
        const e = this.adapter_.getScrollAreaScrollLeft(),
          s = this.clampScrollValue_(t);
        return { finalScrollPosition: s, scrollDelta: e - s };
      }
      incrementScrollRTL(t) {
        const e = this.adapter_.getScrollAreaScrollLeft(),
          s = this.clampScrollValue_(e + t);
        return { finalScrollPosition: s, scrollDelta: e - s };
      }
      getAnimatingScrollPosition(t, e) {
        return t + e;
      }
      calculateScrollEdges_() {
        return {
          left:
            this.adapter_.getScrollContentOffsetWidth() -
            this.adapter_.getScrollAreaOffsetWidth(),
          right: 0
        };
      }
      clampScrollValue_(t) {
        const e = this.calculateScrollEdges_();
        return Math.min(Math.max(e.right, t), e.left);
      }
    };
    /**
     * @license
     * Copyright 2018 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */ class te extends i {
      static get cssClasses() {
        return Xt;
      }
      static get strings() {
        return jt;
      }
      static get defaultAdapter() {
        return {
          eventTargetMatchesSelector: () => {},
          addClass: () => {},
          removeClass: () => {},
          addScrollAreaClass: () => {},
          setScrollAreaStyleProperty: () => {},
          setScrollContentStyleProperty: () => {},
          getScrollContentStyleValue: () => {},
          setScrollAreaScrollLeft: () => {},
          getScrollAreaScrollLeft: () => {},
          getScrollContentOffsetWidth: () => {},
          getScrollAreaOffsetWidth: () => {},
          computeScrollAreaClientRect: () => {},
          computeScrollContentClientRect: () => {},
          computeHorizontalScrollbarHeight: () => {}
        };
      }
      constructor(t) {
        super(Object.assign(te.defaultAdapter, t)),
          (this.isAnimating_ = !1),
          this.rtlScrollerInstance_;
      }
      init() {
        const t = this.adapter_.computeHorizontalScrollbarHeight();
        this.adapter_.setScrollAreaStyleProperty("margin-bottom", -t + "px"),
          this.adapter_.addScrollAreaClass(te.cssClasses.SCROLL_AREA_SCROLL);
      }
      getScrollPosition() {
        if (this.isRTL_()) return this.computeCurrentScrollPositionRTL_();
        const t = this.calculateCurrentTranslateX_();
        return this.adapter_.getScrollAreaScrollLeft() - t;
      }
      handleInteraction() {
        this.isAnimating_ && this.stopScrollAnimation_();
      }
      handleTransitionEnd(t) {
        this.isAnimating_ &&
          this.adapter_.eventTargetMatchesSelector(
            t.target,
            te.strings.CONTENT_SELECTOR
          ) &&
          ((this.isAnimating_ = !1),
          this.adapter_.removeClass(te.cssClasses.ANIMATING));
      }
      incrementScroll(t) {
        if (0 !== t)
          return this.isRTL_()
            ? this.incrementScrollRTL_(t)
            : void this.incrementScroll_(t);
      }
      scrollTo(t) {
        if (this.isRTL_()) return this.scrollToRTL_(t);
        this.scrollTo_(t);
      }
      getRTLScroller() {
        return (
          this.rtlScrollerInstance_ ||
            (this.rtlScrollerInstance_ = this.rtlScrollerFactory_()),
          this.rtlScrollerInstance_
        );
      }
      calculateCurrentTranslateX_() {
        const t = this.adapter_.getScrollContentStyleValue("transform");
        if ("none" === t) return 0;
        const e = /\((.+)\)/.exec(t)[1].split(",");
        return parseFloat(e[4]);
      }
      clampScrollValue_(t) {
        const e = this.calculateScrollEdges_();
        return Math.min(Math.max(e.left, t), e.right);
      }
      computeCurrentScrollPositionRTL_() {
        const t = this.calculateCurrentTranslateX_();
        return this.getRTLScroller().getScrollPositionRTL(t);
      }
      calculateScrollEdges_() {
        return {
          left: 0,
          right:
            this.adapter_.getScrollContentOffsetWidth() -
            this.adapter_.getScrollAreaOffsetWidth()
        };
      }
      scrollTo_(t) {
        const e = this.getScrollPosition(),
          s = this.clampScrollValue_(t),
          i = s - e;
        this.animate_({ finalScrollPosition: s, scrollDelta: i });
      }
      scrollToRTL_(t) {
        const e = this.getRTLScroller().scrollToRTL(t);
        this.animate_(e);
      }
      incrementScroll_(t) {
        const e = this.getScrollPosition(),
          s = t + e,
          i = this.clampScrollValue_(s),
          n = i - e;
        this.animate_({ finalScrollPosition: i, scrollDelta: n });
      }
      incrementScrollRTL_(t) {
        const e = this.getRTLScroller().incrementScrollRTL(t);
        this.animate_(e);
      }
      animate_(t) {
        0 !== t.scrollDelta &&
          (this.stopScrollAnimation_(),
          this.adapter_.setScrollAreaScrollLeft(t.finalScrollPosition),
          this.adapter_.setScrollContentStyleProperty(
            "transform",
            `translateX(${t.scrollDelta}px)`
          ),
          this.adapter_.computeScrollAreaClientRect(),
          requestAnimationFrame(() => {
            this.adapter_.addClass(te.cssClasses.ANIMATING),
              this.adapter_.setScrollContentStyleProperty("transform", "none");
          }),
          (this.isAnimating_ = !0));
      }
      stopScrollAnimation_() {
        this.isAnimating_ = !1;
        const t = this.getAnimatingScrollPosition_();
        this.adapter_.removeClass(te.cssClasses.ANIMATING),
          this.adapter_.setScrollContentStyleProperty(
            "transform",
            "translateX(0px)"
          ),
          this.adapter_.setScrollAreaScrollLeft(t);
      }
      getAnimatingScrollPosition_() {
        const t = this.calculateCurrentTranslateX_(),
          e = this.adapter_.getScrollAreaScrollLeft();
        return this.isRTL_()
          ? this.getRTLScroller().getAnimatingScrollPosition(e, t)
          : e - t;
      }
      rtlScrollerFactory_() {
        const t = this.adapter_.getScrollAreaScrollLeft();
        this.adapter_.setScrollAreaScrollLeft(t - 1);
        const e = this.adapter_.getScrollAreaScrollLeft();
        if (e < 0)
          return (
            this.adapter_.setScrollAreaScrollLeft(t), new Qt(this.adapter_)
          );
        const s = this.adapter_.computeScrollAreaClientRect(),
          i = this.adapter_.computeScrollContentClientRect(),
          n = Math.round(i.right - s.right);
        return (
          this.adapter_.setScrollAreaScrollLeft(t),
          n === e ? new Jt(this.adapter_) : new Zt(this.adapter_)
        );
      }
      isRTL_() {
        return "rtl" === this.adapter_.getScrollContentStyleValue("direction");
      }
    }
    var ee = te;
    /**
     * @license
     * Copyright 2018 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */ let se;
    /**
     * @license
     * Copyright 2018 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    class ie extends a {
      static attachTo(t) {
        return new ie(t);
      }
      constructor(...t) {
        super(...t),
          this.content_,
          this.area_,
          this.handleInteraction_,
          this.handleTransitionEnd_;
      }
      initialize() {
        (this.area_ = this.root_.querySelector(ee.strings.AREA_SELECTOR)),
          (this.content_ = this.root_.querySelector(
            ee.strings.CONTENT_SELECTOR
          ));
      }
      initialSyncWithDOM() {
        (this.handleInteraction_ = () => this.foundation_.handleInteraction()),
          (this.handleTransitionEnd_ = t =>
            this.foundation_.handleTransitionEnd(t)),
          this.area_.addEventListener("wheel", this.handleInteraction_),
          this.area_.addEventListener("touchstart", this.handleInteraction_),
          this.area_.addEventListener("pointerdown", this.handleInteraction_),
          this.area_.addEventListener("mousedown", this.handleInteraction_),
          this.area_.addEventListener("keydown", this.handleInteraction_),
          this.content_.addEventListener(
            "transitionend",
            this.handleTransitionEnd_
          );
      }
      destroy() {
        super.destroy(),
          this.area_.removeEventListener("wheel", this.handleInteraction_),
          this.area_.removeEventListener("touchstart", this.handleInteraction_),
          this.area_.removeEventListener(
            "pointerdown",
            this.handleInteraction_
          ),
          this.area_.removeEventListener("mousedown", this.handleInteraction_),
          this.area_.removeEventListener("keydown", this.handleInteraction_),
          this.content_.removeEventListener(
            "transitionend",
            this.handleTransitionEnd_
          );
      }
      getDefaultFoundation() {
        return new ee({
          eventTargetMatchesSelector: (t, e) => {
            return t[
              (function(t) {
                return ["msMatchesSelector", "matches"]
                  .filter(e => e in t)
                  .pop();
              })(HTMLElement.prototype)
            ](e);
          },
          addClass: t => this.root_.classList.add(t),
          removeClass: t => this.root_.classList.remove(t),
          addScrollAreaClass: t => this.area_.classList.add(t),
          setScrollAreaStyleProperty: (t, e) =>
            this.area_.style.setProperty(t, e),
          setScrollContentStyleProperty: (t, e) =>
            this.content_.style.setProperty(t, e),
          getScrollContentStyleValue: t =>
            window.getComputedStyle(this.content_).getPropertyValue(t),
          setScrollAreaScrollLeft: t => (this.area_.scrollLeft = t),
          getScrollAreaScrollLeft: () => this.area_.scrollLeft,
          getScrollContentOffsetWidth: () => this.content_.offsetWidth,
          getScrollAreaOffsetWidth: () => this.area_.offsetWidth,
          computeScrollAreaClientRect: () => this.area_.getBoundingClientRect(),
          computeScrollContentClientRect: () =>
            this.content_.getBoundingClientRect(),
          computeHorizontalScrollbarHeight: () =>
            (function(t, e = !0) {
              if (e && void 0 !== se) return se;
              const s = t.createElement("div");
              s.classList.add(Xt.SCROLL_TEST), t.body.appendChild(s);
              const i = s.offsetHeight - s.clientHeight;
              return t.body.removeChild(s), e && (se = i), i;
            })(document)
        });
      }
      getScrollPosition() {
        return this.foundation_.getScrollPosition();
      }
      getScrollContentWidth() {
        return this.content_.offsetWidth;
      }
      incrementScroll(t) {
        this.foundation_.incrementScroll(t);
      }
      scrollTo(t) {
        this.foundation_.scrollTo(t);
      }
    }
    /**
     * @license
     * Copyright 2018 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    /**
     * @license
     * Copyright 2018 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    const ne = {
        TAB_ACTIVATED_EVENT: "MDCTabBar:activated",
        TAB_SCROLLER_SELECTOR: ".mdc-tab-scroller",
        TAB_SELECTOR: ".mdc-tab",
        ARROW_LEFT_KEY: "ArrowLeft",
        ARROW_RIGHT_KEY: "ArrowRight",
        END_KEY: "End",
        HOME_KEY: "Home",
        ENTER_KEY: "Enter",
        SPACE_KEY: "Space"
      },
      ae = {
        EXTRA_SCROLL_AMOUNT: 20,
        ARROW_LEFT_KEYCODE: 37,
        ARROW_RIGHT_KEYCODE: 39,
        END_KEYCODE: 35,
        HOME_KEYCODE: 36,
        ENTER_KEYCODE: 13,
        SPACE_KEYCODE: 32
      },
      oe = new Set();
    oe.add(ne.ARROW_LEFT_KEY),
      oe.add(ne.ARROW_RIGHT_KEY),
      oe.add(ne.END_KEY),
      oe.add(ne.HOME_KEY),
      oe.add(ne.ENTER_KEY),
      oe.add(ne.SPACE_KEY);
    const re = new Map();
    re.set(ae.ARROW_LEFT_KEYCODE, ne.ARROW_LEFT_KEY),
      re.set(ae.ARROW_RIGHT_KEYCODE, ne.ARROW_RIGHT_KEY),
      re.set(ae.END_KEYCODE, ne.END_KEY),
      re.set(ae.HOME_KEYCODE, ne.HOME_KEY),
      re.set(ae.ENTER_KEYCODE, ne.ENTER_KEY),
      re.set(ae.SPACE_KEYCODE, ne.SPACE_KEY);
    class le extends i {
      static get strings() {
        return ne;
      }
      static get numbers() {
        return ae;
      }
      static get defaultAdapter() {
        return {
          scrollTo: () => {},
          incrementScroll: () => {},
          getScrollPosition: () => {},
          getScrollContentWidth: () => {},
          getOffsetWidth: () => {},
          isRTL: () => {},
          setActiveTab: () => {},
          activateTabAtIndex: () => {},
          deactivateTabAtIndex: () => {},
          focusTabAtIndex: () => {},
          getTabIndicatorClientRectAtIndex: () => {},
          getTabDimensionsAtIndex: () => {},
          getPreviousActiveTabIndex: () => {},
          getFocusedTabIndex: () => {},
          getIndexOfTab: () => {},
          getTabListLength: () => {},
          notifyTabActivated: () => {}
        };
      }
      constructor(t) {
        super(Object.assign(le.defaultAdapter, t)),
          (this.useAutomaticActivation_ = !1);
      }
      setUseAutomaticActivation(t) {
        this.useAutomaticActivation_ = t;
      }
      activateTab(t) {
        const e = this.adapter_.getPreviousActiveTabIndex();
        this.indexIsInRange_(t) &&
          t !== e &&
          (this.adapter_.deactivateTabAtIndex(e),
          this.adapter_.activateTabAtIndex(
            t,
            this.adapter_.getTabIndicatorClientRectAtIndex(e)
          ),
          this.scrollIntoView(t),
          this.adapter_.notifyTabActivated(t));
      }
      handleKeyDown(t) {
        const e = this.getKeyFromEvent_(t);
        if (void 0 !== e)
          if (
            (this.isActivationKey_(e) || t.preventDefault(),
            this.useAutomaticActivation_)
          ) {
            if (this.isActivationKey_(e)) return;
            const t = this.determineTargetFromKey_(
              this.adapter_.getPreviousActiveTabIndex(),
              e
            );
            this.adapter_.setActiveTab(t), this.scrollIntoView(t);
          } else {
            const t = this.adapter_.getFocusedTabIndex();
            if (this.isActivationKey_(e)) this.adapter_.setActiveTab(t);
            else {
              const s = this.determineTargetFromKey_(t, e);
              this.adapter_.focusTabAtIndex(s), this.scrollIntoView(s);
            }
          }
      }
      handleTabInteraction(t) {
        this.adapter_.setActiveTab(this.adapter_.getIndexOfTab(t.detail.tab));
      }
      scrollIntoView(t) {
        if (this.indexIsInRange_(t))
          return 0 === t
            ? this.adapter_.scrollTo(0)
            : t === this.adapter_.getTabListLength() - 1
              ? this.adapter_.scrollTo(this.adapter_.getScrollContentWidth())
              : this.isRTL_()
                ? this.scrollIntoViewRTL_(t)
                : void this.scrollIntoView_(t);
      }
      determineTargetFromKey_(t, e) {
        const s = this.isRTL_(),
          i = this.adapter_.getTabListLength() - 1,
          n = e === ne.END_KEY,
          a =
            (e === ne.ARROW_LEFT_KEY && !s) || (e === ne.ARROW_RIGHT_KEY && s),
          o =
            (e === ne.ARROW_RIGHT_KEY && !s) || (e === ne.ARROW_LEFT_KEY && s);
        let r = t;
        return (
          n ? (r = i) : a ? (r -= 1) : o ? (r += 1) : (r = 0),
          r < 0 ? (r = i) : r > i && (r = 0),
          r
        );
      }
      calculateScrollIncrement_(t, e, s, i) {
        const n = this.adapter_.getTabDimensionsAtIndex(e),
          a = n.contentLeft - s - i,
          o = n.contentRight - s - ae.EXTRA_SCROLL_AMOUNT,
          r = a + ae.EXTRA_SCROLL_AMOUNT;
        return e < t ? Math.min(o, 0) : Math.max(r, 0);
      }
      calculateScrollIncrementRTL_(t, e, s, i, n) {
        const a = this.adapter_.getTabDimensionsAtIndex(e),
          o = n - a.contentLeft - s,
          r = n - a.contentRight - s - i + ae.EXTRA_SCROLL_AMOUNT,
          l = o - ae.EXTRA_SCROLL_AMOUNT;
        return e > t ? Math.max(r, 0) : Math.min(l, 0);
      }
      findAdjacentTabIndexClosestToEdge_(t, e, s, i) {
        const n = e.rootLeft - s,
          a = e.rootRight - s - i,
          o = n + a;
        return n < 0 || o < 0 ? t - 1 : a > 0 || o > 0 ? t + 1 : -1;
      }
      findAdjacentTabIndexClosestToEdgeRTL_(t, e, s, i, n) {
        const a = n - e.rootLeft - i - s,
          o = n - e.rootRight - s,
          r = a + o;
        return a > 0 || r > 0 ? t + 1 : o < 0 || r < 0 ? t - 1 : -1;
      }
      getKeyFromEvent_(t) {
        return oe.has(t.key) ? t.key : re.get(t.keyCode);
      }
      isActivationKey_(t) {
        return t === ne.SPACE_KEY || t === ne.ENTER_KEY;
      }
      indexIsInRange_(t) {
        return t >= 0 && t < this.adapter_.getTabListLength();
      }
      isRTL_() {
        return this.adapter_.isRTL();
      }
      scrollIntoView_(t) {
        const e = this.adapter_.getScrollPosition(),
          s = this.adapter_.getOffsetWidth(),
          i = this.adapter_.getTabDimensionsAtIndex(t),
          n = this.findAdjacentTabIndexClosestToEdge_(t, i, e, s);
        if (!this.indexIsInRange_(n)) return;
        const a = this.calculateScrollIncrement_(t, n, e, s);
        this.adapter_.incrementScroll(a);
      }
      scrollIntoViewRTL_(t) {
        const e = this.adapter_.getScrollPosition(),
          s = this.adapter_.getOffsetWidth(),
          i = this.adapter_.getTabDimensionsAtIndex(t),
          n = this.adapter_.getScrollContentWidth(),
          a = this.findAdjacentTabIndexClosestToEdgeRTL_(t, i, e, s, n);
        if (!this.indexIsInRange_(a)) return;
        const o = this.calculateScrollIncrementRTL_(t, a, e, s, n);
        this.adapter_.incrementScroll(o);
      }
    }
    var ce = le;
    /**
     * @license
     * Copyright 2018 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */ class de extends a {
      constructor(...t) {
        super(...t),
          this.tabList_,
          this.tabFactory_,
          this.tabScroller_,
          this.tabScrollerFactory_,
          this.handleTabInteraction_,
          this.handleKeyDown_;
      }
      static attachTo(t) {
        return new de(t);
      }
      set useAutomaticActivation(t) {
        this.foundation_.setUseAutomaticActivation(t);
      }
      initialize(t = t => new Yt(t), e = t => new ie(t)) {
        (this.tabFactory_ = t),
          (this.tabScrollerFactory_ = e),
          (this.tabList_ = this.getTabElements_().map(t =>
            this.tabFactory_(t)
          ));
        const s = this.root_.querySelector(ce.strings.TAB_SCROLLER_SELECTOR);
        s && (this.tabScroller_ = this.tabScrollerFactory_(s));
      }
      initialSyncWithDOM() {
        (this.handleTabInteraction_ = t =>
          this.foundation_.handleTabInteraction(t)),
          (this.handleKeyDown_ = t => this.foundation_.handleKeyDown(t)),
          this.root_.addEventListener(
            zt.strings.INTERACTED_EVENT,
            this.handleTabInteraction_
          ),
          this.root_.addEventListener("keydown", this.handleKeyDown_);
        for (let t = 0; t < this.tabList_.length; t++)
          if (this.tabList_[t].active) {
            this.scrollIntoView(t);
            break;
          }
      }
      destroy() {
        super.destroy(),
          this.root_.removeEventListener(
            zt.strings.INTERACTED_EVENT,
            this.handleTabInteraction_
          ),
          this.root_.removeEventListener("keydown", this.handleKeyDown_),
          this.tabList_.forEach(t => t.destroy()),
          this.tabScroller_.destroy();
      }
      getDefaultFoundation() {
        return new ce({
          scrollTo: t => this.tabScroller_.scrollTo(t),
          incrementScroll: t => this.tabScroller_.incrementScroll(t),
          getScrollPosition: () => this.tabScroller_.getScrollPosition(),
          getScrollContentWidth: () =>
            this.tabScroller_.getScrollContentWidth(),
          getOffsetWidth: () => this.root_.offsetWidth,
          isRTL: () =>
            "rtl" ===
            window.getComputedStyle(this.root_).getPropertyValue("direction"),
          setActiveTab: t => this.foundation_.activateTab(t),
          activateTabAtIndex: (t, e) => this.tabList_[t].activate(e),
          deactivateTabAtIndex: t => this.tabList_[t].deactivate(),
          focusTabAtIndex: t => this.tabList_[t].focus(),
          getTabIndicatorClientRectAtIndex: t =>
            this.tabList_[t].computeIndicatorClientRect(),
          getTabDimensionsAtIndex: t => this.tabList_[t].computeDimensions(),
          getPreviousActiveTabIndex: () => {
            for (let t = 0; t < this.tabList_.length; t++)
              if (this.tabList_[t].active) return t;
            return -1;
          },
          getFocusedTabIndex: () => {
            const t = this.getTabElements_(),
              e = document.activeElement;
            return t.indexOf(e);
          },
          getIndexOfTab: t => this.tabList_.indexOf(t),
          getTabListLength: () => this.tabList_.length,
          notifyTabActivated: t =>
            this.emit(ce.strings.TAB_ACTIVATED_EVENT, { index: t }, !0)
        });
      }
      activateTab(t) {
        this.foundation_.activateTab(t);
      }
      scrollIntoView(t) {
        this.foundation_.scrollIntoView(t);
      }
      getTabElements_() {
        return [].slice.call(
          this.root_.querySelectorAll(ce.strings.TAB_SELECTOR)
        );
      }
    }
    new de(document.querySelector(".mdc-tab-bar")),
      new ie(document.querySelector(".mdc-tab-scroller")),
      new Yt(document.querySelector(".mdc-tab")),
      new Gt(document.querySelector(".mdc-tab-indicator"));
  },
  function(t, e) {}
]);
//# sourceMappingURL=main.js.map
