// deno-fmt-ignore-file
// deno-lint-ignore-file
// This code was bundled using `deno bundle` and it's not recommended to edit it manually

var w, d, j, b, $, z, H, q, N = {}, J = [], re = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i, W = Array.isArray;
function k(e, t) {
    for(var _ in t)e[_] = t[_];
    return e;
}
function K(e) {
    var t = e.parentNode;
    t && t.removeChild(e);
}
function le(e, t, _) {
    var r, l, o, s = {};
    for(o in t)o == "key" ? r = t[o] : o == "ref" ? l = t[o] : s[o] = t[o];
    if (arguments.length > 2 && (s.children = arguments.length > 3 ? w.call(arguments, 2) : _), typeof e == "function" && e.defaultProps != null) for(o in e.defaultProps)s[o] === void 0 && (s[o] = e.defaultProps[o]);
    return S(e, s, r, l, null);
}
function S(e, t, _, r, l) {
    var o = {
        type: e,
        props: t,
        key: _,
        ref: r,
        __k: null,
        __: null,
        __b: 0,
        __e: null,
        __d: void 0,
        __c: null,
        __h: null,
        constructor: void 0,
        __v: l ?? ++j
    };
    return l == null && d.vnode != null && d.vnode(o), o;
}
function ae() {
    return {
        current: null
    };
}
function A(e) {
    return e.children;
}
function T(e, t) {
    this.props = e, this.context = t;
}
function P(e, t) {
    if (t == null) return e.__ ? P(e.__, e.__.__k.indexOf(e) + 1) : null;
    for(var _; t < e.__k.length; t++)if ((_ = e.__k[t]) != null && _.__e != null) return _.__e;
    return typeof e.type == "function" ? P(e) : null;
}
function Q(e) {
    var t, _;
    if ((e = e.__) != null && e.__c != null) {
        for(e.__e = e.__c.base = null, t = 0; t < e.__k.length; t++)if ((_ = e.__k[t]) != null && _.__e != null) {
            e.__e = e.__c.base = _.__e;
            break;
        }
        return Q(e);
    }
}
function I(e) {
    (!e.__d && (e.__d = !0) && b.push(e) && !L.__r++ || $ !== d.debounceRendering) && (($ = d.debounceRendering) || z)(L);
}
function L() {
    var e, t, _, r, l, o, s, u;
    for(b.sort(H); e = b.shift();)e.__d && (t = b.length, r = void 0, l = void 0, s = (o = (_ = e).__v).__e, (u = _.__P) && (r = [], (l = k({}, o)).__v = o.__v + 1, O(u, o, l, _.__n, u.ownerSVGElement !== void 0, o.__h != null ? [
        s
    ] : null, r, s ?? P(o), o.__h), te(r, o), o.__e != s && Q(o)), b.length > t && b.sort(H));
    L.__r = 0;
}
function X(e, t, _, r, l, o, s, u, p, a) {
    var n, h, c, i, f, x, v, y = r && r.__k || J, g = y.length;
    for(_.__k = [], n = 0; n < t.length; n++)if ((i = _.__k[n] = (i = t[n]) == null || typeof i == "boolean" || typeof i == "function" ? null : typeof i == "string" || typeof i == "number" || typeof i == "bigint" ? S(null, i, null, null, i) : W(i) ? S(A, {
        children: i
    }, null, null, null) : i.__b > 0 ? S(i.type, i.props, i.key, i.ref ? i.ref : null, i.__v) : i) != null) {
        if (i.__ = _, i.__b = _.__b + 1, (c = y[n]) === null || c && i.key == c.key && i.type === c.type) y[n] = void 0;
        else for(h = 0; h < g; h++){
            if ((c = y[h]) && i.key == c.key && i.type === c.type) {
                y[h] = void 0;
                break;
            }
            c = null;
        }
        O(e, i, c = c || N, l, o, s, u, p, a), f = i.__e, (h = i.ref) && c.ref != h && (v || (v = []), c.ref && v.push(c.ref, null, i), v.push(h, i.__c || f, i)), f != null ? (x == null && (x = f), typeof i.type == "function" && i.__k === c.__k ? i.__d = p = Y(i, p, e) : p = Z(e, i, c, y, f, p), typeof _.type == "function" && (_.__d = p)) : p && c.__e == p && p.parentNode != e && (p = P(c));
    }
    for(_.__e = x, n = g; n--;)y[n] != null && (typeof _.type == "function" && y[n].__e != null && y[n].__e == _.__d && (_.__d = ee(r).nextSibling), ne(y[n], y[n]));
    if (v) for(n = 0; n < v.length; n++)_e(v[n], v[++n], v[++n]);
}
function Y(e, t, _) {
    for(var r, l = e.__k, o = 0; l && o < l.length; o++)(r = l[o]) && (r.__ = e, t = typeof r.type == "function" ? Y(r, t, _) : Z(_, r, r, l, r.__e, t));
    return t;
}
function ie(e, t) {
    return t = t || [], e == null || typeof e == "boolean" || (W(e) ? e.some(function(_) {
        ie(_, t);
    }) : t.push(e)), t;
}
function Z(e, t, _, r, l, o) {
    var s, u, p;
    if (t.__d !== void 0) s = t.__d, t.__d = void 0;
    else if (_ == null || l != o || l.parentNode == null) e: if (o == null || o.parentNode !== e) e.appendChild(l), s = null;
    else {
        for(u = o, p = 0; (u = u.nextSibling) && p < r.length; p += 1)if (u == l) break e;
        e.insertBefore(l, o), s = o;
    }
    return s !== void 0 ? s : l.nextSibling;
}
function ee(e) {
    var t, _, r;
    if (e.type == null || typeof e.type == "string") return e.__e;
    if (e.__k) {
        for(t = e.__k.length - 1; t >= 0; t--)if ((_ = e.__k[t]) && (r = ee(_))) return r;
    }
    return null;
}
function se(e, t, _, r, l) {
    var o;
    for(o in _)o === "children" || o === "key" || o in t || M(e, o, null, _[o], r);
    for(o in t)l && typeof t[o] != "function" || o === "children" || o === "key" || o === "value" || o === "checked" || _[o] === t[o] || M(e, o, t[o], _[o], r);
}
function B(e, t, _) {
    t[0] === "-" ? e.setProperty(t, _ ?? "") : e[t] = _ == null ? "" : typeof _ != "number" || re.test(t) ? _ : _ + "px";
}
function M(e, t, _, r, l) {
    var o;
    e: if (t === "style") if (typeof _ == "string") e.style.cssText = _;
    else {
        if (typeof r == "string" && (e.style.cssText = r = ""), r) for(t in r)_ && t in _ || B(e.style, t, "");
        if (_) for(t in _)r && _[t] === r[t] || B(e.style, t, _[t]);
    }
    else if (t[0] === "o" && t[1] === "n") o = t !== (t = t.replace(/Capture$/, "")), t = t.toLowerCase() in e ? t.toLowerCase().slice(2) : t.slice(2), e.l || (e.l = {}), e.l[t + o] = _, _ ? r || e.addEventListener(t, o ? V : G, o) : e.removeEventListener(t, o ? V : G, o);
    else if (t !== "dangerouslySetInnerHTML") {
        if (l) t = t.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
        else if (t !== "width" && t !== "height" && t !== "href" && t !== "list" && t !== "form" && t !== "tabIndex" && t !== "download" && t !== "rowSpan" && t !== "colSpan" && t in e) try {
            e[t] = _ ?? "";
            break e;
        } catch  {}
        typeof _ == "function" || (_ == null || _ === !1 && t[4] !== "-" ? e.removeAttribute(t) : e.setAttribute(t, _));
    }
}
function G(e) {
    return this.l[e.type + !1](d.event ? d.event(e) : e);
}
function V(e) {
    return this.l[e.type + !0](d.event ? d.event(e) : e);
}
function O(e, t, _, r, l, o, s, u, p) {
    var a, n, h, c, i, f, x, v, y, g, E, C, R, U, F, m = t.type;
    if (t.constructor !== void 0) return null;
    _.__h != null && (p = _.__h, u = t.__e = _.__e, t.__h = null, o = [
        u
    ]), (a = d.__b) && a(t);
    try {
        e: if (typeof m == "function") {
            if (v = t.props, y = (a = m.contextType) && r[a.__c], g = a ? y ? y.props.value : a.__ : r, _.__c ? x = (n = t.__c = _.__c).__ = n.__E : ("prototype" in m && m.prototype.render ? t.__c = n = new m(v, g) : (t.__c = n = new T(v, g), n.constructor = m, n.render = ce), y && y.sub(n), n.props = v, n.state || (n.state = {}), n.context = g, n.__n = r, h = n.__d = !0, n.__h = [], n._sb = []), n.__s == null && (n.__s = n.state), m.getDerivedStateFromProps != null && (n.__s == n.state && (n.__s = k({}, n.__s)), k(n.__s, m.getDerivedStateFromProps(v, n.__s))), c = n.props, i = n.state, n.__v = t, h) m.getDerivedStateFromProps == null && n.componentWillMount != null && n.componentWillMount(), n.componentDidMount != null && n.__h.push(n.componentDidMount);
            else {
                if (m.getDerivedStateFromProps == null && v !== c && n.componentWillReceiveProps != null && n.componentWillReceiveProps(v, g), !n.__e && n.shouldComponentUpdate != null && n.shouldComponentUpdate(v, n.__s, g) === !1 || t.__v === _.__v) {
                    for(t.__v !== _.__v && (n.props = v, n.state = n.__s, n.__d = !1), n.__e = !1, t.__e = _.__e, t.__k = _.__k, t.__k.forEach(function(D) {
                        D && (D.__ = t);
                    }), E = 0; E < n._sb.length; E++)n.__h.push(n._sb[E]);
                    n._sb = [], n.__h.length && s.push(n);
                    break e;
                }
                n.componentWillUpdate != null && n.componentWillUpdate(v, n.__s, g), n.componentDidUpdate != null && n.__h.push(function() {
                    n.componentDidUpdate(c, i, f);
                });
            }
            if (n.context = g, n.props = v, n.__P = e, C = d.__r, R = 0, "prototype" in m && m.prototype.render) {
                for(n.state = n.__s, n.__d = !1, C && C(t), a = n.render(n.props, n.state, n.context), U = 0; U < n._sb.length; U++)n.__h.push(n._sb[U]);
                n._sb = [];
            } else do n.__d = !1, C && C(t), a = n.render(n.props, n.state, n.context), n.state = n.__s;
            while (n.__d && ++R < 25)
            n.state = n.__s, n.getChildContext != null && (r = k(k({}, r), n.getChildContext())), h || n.getSnapshotBeforeUpdate == null || (f = n.getSnapshotBeforeUpdate(c, i)), X(e, W(F = a != null && a.type === A && a.key == null ? a.props.children : a) ? F : [
                F
            ], t, _, r, l, o, s, u, p), n.base = t.__e, t.__h = null, n.__h.length && s.push(n), x && (n.__E = n.__ = null), n.__e = !1;
        } else o == null && t.__v === _.__v ? (t.__k = _.__k, t.__e = _.__e) : t.__e = ue(_.__e, t, _, r, l, o, s, p);
        (a = d.diffed) && a(t);
    } catch (D) {
        t.__v = null, (p || o != null) && (t.__e = u, t.__h = !!p, o[o.indexOf(u)] = null), d.__e(D, t, _);
    }
}
function te(e, t) {
    d.__c && d.__c(t, e), e.some(function(_) {
        try {
            e = _.__h, _.__h = [], e.some(function(r) {
                r.call(_);
            });
        } catch (r) {
            d.__e(r, _.__v);
        }
    });
}
function ue(e, t, _, r, l, o, s, u) {
    var p, a, n, h = _.props, c = t.props, i = t.type, f = 0;
    if (i === "svg" && (l = !0), o != null) {
        for(; f < o.length; f++)if ((p = o[f]) && "setAttribute" in p == !!i && (i ? p.localName === i : p.nodeType === 3)) {
            e = p, o[f] = null;
            break;
        }
    }
    if (e == null) {
        if (i === null) return document.createTextNode(c);
        e = l ? document.createElementNS("http://www.w3.org/2000/svg", i) : document.createElement(i, c.is && c), o = null, u = !1;
    }
    if (i === null) h === c || u && e.data === c || (e.data = c);
    else {
        if (o = o && w.call(e.childNodes), a = (h = _.props || N).dangerouslySetInnerHTML, n = c.dangerouslySetInnerHTML, !u) {
            if (o != null) for(h = {}, f = 0; f < e.attributes.length; f++)h[e.attributes[f].name] = e.attributes[f].value;
            (n || a) && (n && (a && n.__html == a.__html || n.__html === e.innerHTML) || (e.innerHTML = n && n.__html || ""));
        }
        if (se(e, c, h, l, u), n) t.__k = [];
        else if (X(e, W(f = t.props.children) ? f : [
            f
        ], t, _, r, l && i !== "foreignObject", o, s, o ? o[0] : _.__k && P(_, 0), u), o != null) for(f = o.length; f--;)o[f] != null && K(o[f]);
        u || ("value" in c && (f = c.value) !== void 0 && (f !== e.value || i === "progress" && !f || i === "option" && f !== h.value) && M(e, "value", f, h.value, !1), "checked" in c && (f = c.checked) !== void 0 && f !== e.checked && M(e, "checked", f, h.checked, !1));
    }
    return e;
}
function _e(e, t, _) {
    try {
        typeof e == "function" ? e(t) : e.current = t;
    } catch (r) {
        d.__e(r, _);
    }
}
function ne(e, t, _) {
    var r, l;
    if (d.unmount && d.unmount(e), (r = e.ref) && (r.current && r.current !== e.__e || _e(r, null, t)), (r = e.__c) != null) {
        if (r.componentWillUnmount) try {
            r.componentWillUnmount();
        } catch (o) {
            d.__e(o, t);
        }
        r.base = r.__P = null, e.__c = void 0;
    }
    if (r = e.__k) for(l = 0; l < r.length; l++)r[l] && ne(r[l], t, _ || typeof e.type != "function");
    _ || e.__e == null || K(e.__e), e.__ = e.__e = e.__d = void 0;
}
function ce(e, t, _) {
    return this.constructor(e, _);
}
function fe(e, t, _) {
    var r, l, o;
    d.__ && d.__(e, t), l = (r = typeof _ == "function") ? null : _ && _.__k || t.__k, o = [], O(t, e = (!r && _ || t).__k = le(A, null, [
        e
    ]), l || N, N, t.ownerSVGElement !== void 0, !r && _ ? [
        _
    ] : l ? null : t.firstChild ? w.call(t.childNodes) : null, o, !r && _ ? _ : l ? l.__e : t.firstChild, r), te(o, e);
}
function pe(e, t) {
    fe(e, t, pe);
}
function de(e, t, _) {
    var r, l, o, s, u = k({}, e.props);
    for(o in e.type && e.type.defaultProps && (s = e.type.defaultProps), t)o == "key" ? r = t[o] : o == "ref" ? l = t[o] : u[o] = t[o] === void 0 && s !== void 0 ? s[o] : t[o];
    return arguments.length > 2 && (u.children = arguments.length > 3 ? w.call(arguments, 2) : _), S(e.type, u, r || e.key, l || e.ref, null);
}
function he(e, t) {
    var _ = {
        __c: t = "__cC" + q++,
        __: e,
        Consumer: function(r, l) {
            return r.children(l);
        },
        Provider: function(r) {
            var l, o;
            return this.getChildContext || (l = [], (o = {})[t] = this, this.getChildContext = function() {
                return o;
            }, this.shouldComponentUpdate = function(s) {
                this.props.value !== s.value && l.some(function(u) {
                    u.__e = !0, I(u);
                });
            }, this.sub = function(s) {
                l.push(s);
                var u = s.componentWillUnmount;
                s.componentWillUnmount = function() {
                    l.splice(l.indexOf(s), 1), u && u.call(s);
                };
            }), r.children;
        }
    };
    return _.Provider.__ = _.Consumer.contextType = _;
}
w = J.slice, d = {
    __e: function(e, t, _, r) {
        for(var l, o, s; t = t.__;)if ((l = t.__c) && !l.__) try {
            if ((o = l.constructor) && o.getDerivedStateFromError != null && (l.setState(o.getDerivedStateFromError(e)), s = l.__d), l.componentDidCatch != null && (l.componentDidCatch(e, r || {}), s = l.__d), s) return l.__E = l;
        } catch (u) {
            e = u;
        }
        throw e;
    }
}, j = 0, T.prototype.setState = function(e, t) {
    var _;
    _ = this.__s != null && this.__s !== this.state ? this.__s : this.__s = k({}, this.state), typeof e == "function" && (e = e(k({}, _), this.props)), e && k(_, e), e != null && this.__v && (t && this._sb.push(t), I(this));
}, T.prototype.forceUpdate = function(e) {
    this.__v && (this.__e = !0, e && this.__h.push(e), I(this));
}, T.prototype.render = A, b = [], z = typeof Promise == "function" ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, H = function(e, t) {
    return e.__v.__b - t.__v.__b;
}, L.__r = 0, q = 0;
typeof window < "u" && window.__PREACT_DEVTOOLS__ && window.__PREACT_DEVTOOLS__.attachPreact("10.15.1", d, {
    Fragment: A,
    Component: T
});
var c, o, H1, b1, v = 0, x = [], p = [], g = d.__b, A1 = d.__r, C = d.diffed, F = d.__c, q1 = d.unmount;
function l(_, n) {
    d.__h && d.__h(o, _, v || n), v = 0;
    var u = o.__H || (o.__H = {
        __: [],
        __h: []
    });
    return _ >= u.__.length && u.__.push({
        __V: p
    }), u.__[_];
}
function k1(_) {
    return v = 1, B1(U, _);
}
function B1(_, n, u) {
    var t = l(c++, 2);
    if (t.t = _, !t.__c && (t.__ = [
        u ? u(n) : U(void 0, n),
        function(a) {
            var f = t.__N ? t.__N[0] : t.__[0], s = t.t(f, a);
            f !== s && (t.__N = [
                s,
                t.__[1]
            ], t.__c.setState({}));
        }
    ], t.__c = o, !o.u)) {
        var i = function(a, f, s) {
            if (!t.__c.__H) return !0;
            var m = t.__c.__H.__.filter(function(e) {
                return e.__c;
            });
            if (m.every(function(e) {
                return !e.__N;
            })) return !h || h.call(this, a, f, s);
            var V = !1;
            return m.forEach(function(e) {
                if (e.__N) {
                    var P = e.__[0];
                    e.__ = e.__N, e.__N = void 0, P !== e.__[0] && (V = !0);
                }
            }), !(!V && t.__c.props === a) && (!h || h.call(this, a, f, s));
        };
        o.u = !0;
        var h = o.shouldComponentUpdate, N = o.componentWillUpdate;
        o.componentWillUpdate = function(a, f, s) {
            if (this.__e) {
                var m = h;
                h = void 0, i(a, f, s), h = m;
            }
            N && N.call(this, a, f, s);
        }, o.shouldComponentUpdate = i;
    }
    return t.__N || t.__;
}
function j1(_, n) {
    var u = l(c++, 3);
    !d.__s && y(u.__H, n) && (u.__ = _, u.i = n, o.__H.__h.push(u));
}
function I1(_, n) {
    var u = l(c++, 4);
    !d.__s && y(u.__H, n) && (u.__ = _, u.i = n, o.__h.push(u));
}
function w1(_) {
    return v = 5, T1(function() {
        return {
            current: _
        };
    }, []);
}
function z1(_, n, u) {
    v = 6, I1(function() {
        return typeof _ == "function" ? (_(n()), function() {
            return _(null);
        }) : _ ? (_.current = n(), function() {
            return _.current = null;
        }) : void 0;
    }, u == null ? u : u.concat(_));
}
function T1(_, n) {
    var u = l(c++, 7);
    return y(u.__H, n) ? (u.__V = _(), u.i = n, u.__h = _, u.__V) : u.__;
}
function L1(_, n) {
    return v = 8, T1(function() {
        return _;
    }, n);
}
function M1(_) {
    var n = o.context[_.__c], u = l(c++, 9);
    return u.c = _, n ? (u.__ == null && (u.__ = !0, n.sub(o)), n.props.value) : _.__;
}
function G1(_, n) {
    d.useDebugValue && d.useDebugValue(n ? n(_) : _);
}
function J1(_) {
    var n = l(c++, 10), u = k1();
    return n.__ = _, o.componentDidCatch || (o.componentDidCatch = function(t, i) {
        n.__ && n.__(t, i), u[1](t);
    }), [
        u[0],
        function() {
            u[1](void 0);
        }
    ];
}
function K1() {
    var _ = l(c++, 11);
    if (!_.__) {
        for(var n = o.__v; n !== null && !n.__m && n.__ !== null;)n = n.__;
        var u = n.__m || (n.__m = [
            0,
            0
        ]);
        _.__ = "P" + u[0] + "-" + u[1]++;
    }
    return _.__;
}
function R() {
    for(var _; _ = x.shift();)if (_.__P && _.__H) try {
        _.__H.__h.forEach(d1), _.__H.__h.forEach(E), _.__H.__h = [];
    } catch (n) {
        _.__H.__h = [], d.__e(n, _.__v);
    }
}
d.__b = function(_) {
    o = null, g && g(_);
}, d.__r = function(_) {
    A1 && A1(_), c = 0;
    var n = (o = _.__c).__H;
    n && (H1 === o ? (n.__h = [], o.__h = [], n.__.forEach(function(u) {
        u.__N && (u.__ = u.__N), u.__V = p, u.__N = u.i = void 0;
    })) : (n.__h.forEach(d1), n.__h.forEach(E), n.__h = [], c = 0)), H1 = o;
}, d.diffed = function(_) {
    C && C(_);
    var n = _.__c;
    n && n.__H && (n.__H.__h.length && (x.push(n) !== 1 && b1 === d.requestAnimationFrame || ((b1 = d.requestAnimationFrame) || S1)(R)), n.__H.__.forEach(function(u) {
        u.i && (u.__H = u.i), u.__V !== p && (u.__ = u.__V), u.i = void 0, u.__V = p;
    })), H1 = o = null;
}, d.__c = function(_, n) {
    n.some(function(u) {
        try {
            u.__h.forEach(d1), u.__h = u.__h.filter(function(t) {
                return !t.__ || E(t);
            });
        } catch (t) {
            n.some(function(i) {
                i.__h && (i.__h = []);
            }), n = [], d.__e(t, u.__v);
        }
    }), F && F(_, n);
}, d.unmount = function(_) {
    q1 && q1(_);
    var n, u = _.__c;
    u && u.__H && (u.__H.__.forEach(function(t) {
        try {
            d1(t);
        } catch (i) {
            n = i;
        }
    }), u.__H = void 0, n && d.__e(n, u.__v));
};
var D = typeof requestAnimationFrame == "function";
function S1(_) {
    var n, u = function() {
        clearTimeout(t), D && cancelAnimationFrame(n), setTimeout(_);
    }, t = setTimeout(u, 100);
    D && (n = requestAnimationFrame(u));
}
function d1(_) {
    var n = o, u = _.__c;
    typeof u == "function" && (_.__c = void 0, u()), o = n;
}
function E(_) {
    var n = o;
    _.__c = _.__(), o = n;
}
function y(_, n) {
    return !_ || _.length !== n.length || n.some(function(u, t) {
        return u !== _[t];
    });
}
function U(_, n) {
    return typeof n == "function" ? n(_) : n;
}
export { L1 as useCallback, M1 as useContext, G1 as useDebugValue, j1 as useEffect, J1 as useErrorBoundary, K1 as useId, z1 as useImperativeHandle, I1 as useLayoutEffect, T1 as useMemo, B1 as useReducer, w1 as useRef, k1 as useState };
function U1(o, s) {
    (s == null || s > o.length) && (s = o.length);
    for(var p = 0, f = new Array(s); p < s; p++)f[p] = o[p];
    return f;
}
function R1(o, s) {
    var p = typeof Symbol < "u" && o[Symbol.iterator] || o["@@iterator"];
    if (p) return (p = p.call(o)).next.bind(p);
    if (Array.isArray(o) || (p = function(l, c) {
        if (l) {
            if (typeof l == "string") return U1(l, c);
            var y = Object.prototype.toString.call(l).slice(8, -1);
            return y === "Object" && l.constructor && (y = l.constructor.name), y === "Map" || y === "Set" ? Array.from(l) : y === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(y) ? U1(l, c) : void 0;
        }
    }(o)) || s && o && typeof o.length == "number") {
        p && (o = p);
        var f = 0;
        return function() {
            return f >= o.length ? {
                done: !0
            } : {
                done: !1,
                value: o[f++]
            };
        };
    }
    throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
var C1 = {};
function q2() {
    C1 = {};
}
function m(o) {
    return o.type === A ? "Fragment" : typeof o.type == "function" ? o.type.displayName || o.type.name : typeof o.type == "string" ? o.type : "#text";
}
var O1 = [], E1 = [];
function W1() {
    return O1.length > 0 ? O1[O1.length - 1] : null;
}
var H2 = !1;
function A2(o) {
    return typeof o.type == "function" && o.type != A;
}
function d2(o) {
    for(var s = [
        o
    ], p = o; p.__o != null;)s.push(p.__o), p = p.__o;
    return s.reduce(function(f, l) {
        f += "  in " + m(l);
        var c = l.__source;
        return c ? f += " (at " + c.fileName + ":" + c.lineNumber + ")" : H2 || (H2 = !0, console.warn("Add @babel/plugin-transform-react-jsx-source to get a more detailed component stack. Note that you should not add it to production builds of your App for bundle size reasons.")), f + `
`;
    }, "");
}
var D1 = typeof WeakMap == "function";
function z2(o) {
    return o ? typeof o.type == "function" ? z2(o.__) : o : {};
}
var J2 = T.prototype.setState;
T.prototype.setState = function(o, s) {
    return this.__v == null && this.state == null && console.warn(`Calling "this.setState" inside the constructor of a component is a no-op and might be a bug in your application. Instead, set "this.state = {}" directly.

` + d2(W1())), J2.call(this, o, s);
};
var X1 = T.prototype.forceUpdate;
function v1(o) {
    var s = o.props, p = m(o), f = "";
    for(var l in s)if (s.hasOwnProperty(l) && l !== "children") {
        var c = s[l];
        typeof c == "function" && (c = "function " + (c.displayName || c.name) + "() {}"), c = Object(c) !== c || c.toString ? c + "" : Object.prototype.toString.call(c), f += " " + l + "=" + JSON.stringify(c);
    }
    var y = s.children;
    return "<" + p + f + (y && y.length ? ">..</" + p + ">" : " />");
}
T.prototype.forceUpdate = function(o) {
    return this.__v == null ? console.warn(`Calling "this.forceUpdate" inside the constructor of a component is a no-op and might be a bug in your application.

` + d2(W1())) : this.__P == null && console.warn(`Can't call "this.forceUpdate" on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in the componentWillUnmount method.

` + d2(this.__v)), X1.call(this, o);
}, function() {
    (function() {
        var t = d.__b, e = d.diffed, n = d.__, a = d.vnode, u = d.__r;
        d.diffed = function(r) {
            A2(r) && E1.pop(), O1.pop(), e && e(r);
        }, d.__b = function(r) {
            A2(r) && O1.push(r), t && t(r);
        }, d.__ = function(r, _) {
            E1 = [], n && n(r, _);
        }, d.vnode = function(r) {
            r.__o = E1.length > 0 ? E1[E1.length - 1] : null, a && a(r);
        }, d.__r = function(r) {
            A2(r) && E1.push(r), u && u(r);
        };
    })();
    var o = !1, s = d.__b, p = d.diffed, f = d.vnode, l = d.__r, c = d.__e, y = d.__, M = d.__h, I = D1 ? {
        useEffect: new WeakMap,
        useLayoutEffect: new WeakMap,
        lazyPropTypes: new WeakMap
    } : null, k = [];
    d.__e = function(t, e, n, a) {
        if (e && e.__c && typeof t.then == "function") {
            var u = t;
            t = new Error("Missing Suspense. The throwing component was: " + m(e));
            for(var r = e; r; r = r.__)if (r.__c && r.__c.__c) {
                t = u;
                break;
            }
            if (t instanceof Error) throw t;
        }
        try {
            (a = a || {}).componentStack = d2(e), c(t, e, n, a), typeof t.then != "function" && setTimeout(function() {
                throw t;
            });
        } catch (_) {
            throw _;
        }
    }, d.__ = function(t, e) {
        if (!e) throw new Error(`Undefined parent passed to render(), this is the second argument.
Check if the element is available in the DOM/has the correct id.`);
        var n;
        switch(e.nodeType){
            case 1:
            case 11:
            case 9:
                n = !0;
                break;
            default:
                n = !1;
        }
        if (!n) {
            var a = m(t);
            throw new Error("Expected a valid HTML node as a second argument to render.	Received " + e + " instead: render(<" + a + " />, " + e + ");");
        }
        y && y(t, e);
    }, d.__b = function(t) {
        var e = t.type, n = z2(t.__);
        if (o = !0, e === void 0) throw new Error(`Undefined component passed to createElement()

You likely forgot to export your component or might have mixed up default and named imports` + v1(t) + `

` + d2(t));
        if (e != null && typeof e == "object") throw e.__k !== void 0 && e.__e !== void 0 ? new Error("Invalid type passed to createElement(): " + e + `

Did you accidentally pass a JSX literal as JSX twice?

  let My` + m(t) + " = " + v1(e) + `;
  let vnode = <My` + m(t) + ` />;

This usually happens when you export a JSX literal and not the component.

` + d2(t)) : new Error("Invalid type passed to createElement(): " + (Array.isArray(e) ? "array" : e));
        if (e !== "thead" && e !== "tfoot" && e !== "tbody" || n.type === "table" ? e === "tr" && n.type !== "thead" && n.type !== "tfoot" && n.type !== "tbody" && n.type !== "table" ? console.error("Improper nesting of table. Your <tr> should have a <thead/tbody/tfoot/table> parent." + v1(t) + `

` + d2(t)) : e === "td" && n.type !== "tr" ? console.error("Improper nesting of table. Your <td> should have a <tr> parent." + v1(t) + `

` + d2(t)) : e === "th" && n.type !== "tr" && console.error("Improper nesting of table. Your <th> should have a <tr>." + v1(t) + `

` + d2(t)) : console.error("Improper nesting of table. Your <thead/tbody/tfoot> should have a <table> parent." + v1(t) + `

` + d2(t)), t.ref !== void 0 && typeof t.ref != "function" && typeof t.ref != "object" && !("$$typeof" in t)) throw new Error(`Component's "ref" property should be a function, or an object created by createRef(), but got [` + typeof t.ref + `] instead
` + v1(t) + `

` + d2(t));
        if (typeof t.type == "string") {
            for(var a in t.props)if (a[0] === "o" && a[1] === "n" && typeof t.props[a] != "function" && t.props[a] != null) throw new Error(`Component's "` + a + '" property should be a function, but got [' + typeof t.props[a] + `] instead
` + v1(t) + `

` + d2(t));
        }
        if (typeof t.type == "function" && t.type.propTypes) {
            if (t.type.displayName === "Lazy" && I && !I.lazyPropTypes.has(t.type)) {
                var u = "PropTypes are not supported on lazy(). Use propTypes on the wrapped component itself. ";
                try {
                    var r = t.type();
                    I.lazyPropTypes.set(t.type, !0), console.warn(u + "Component wrapped in lazy() is " + m(r));
                } catch  {
                    console.warn(u + "We will log the wrapped component's name once it is loaded.");
                }
            }
            var _ = t.props;
            t.type.__f && delete (_ = function(h, w) {
                for(var S in w)h[S] = w[S];
                return h;
            }({}, _)).ref, function(h, w, S, x, T) {
                Object.keys(h).forEach(function(g) {
                    var b;
                    try {
                        b = h[g](w, g, x, "prop", null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
                    } catch (L) {
                        b = L;
                    }
                    b && !(b.message in C1) && (C1[b.message] = !0, console.error("Failed prop type: " + b.message + (T && `
` + T() || "")));
                });
            }(t.type.propTypes, _, 0, m(t), function() {
                return d2(t);
            });
        }
        s && s(t);
    }, d.__r = function(t) {
        l && l(t), o = !0;
    }, d.__h = function(t, e, n) {
        if (!t || !o) throw new Error("Hook can only be invoked from render methods.");
        M && M(t, e, n);
    };
    var N = function(t, e) {
        return {
            get: function() {
                var n = "get" + t + e;
                k && k.indexOf(n) < 0 && (k.push(n), console.warn("getting vnode." + t + " is deprecated, " + e));
            },
            set: function() {
                var n = "set" + t + e;
                k && k.indexOf(n) < 0 && (k.push(n), console.warn("setting vnode." + t + " is not allowed, " + e));
            }
        };
    }, Y = {
        nodeName: N("nodeName", "use vnode.type"),
        attributes: N("attributes", "use vnode.props"),
        children: N("children", "use vnode.props.children")
    }, F = Object.create({}, Y);
    d.vnode = function(t) {
        var e = t.props;
        if (t.type !== null && e != null && ("__source" in e || "__self" in e)) {
            var n = t.props = {};
            for(var a in e){
                var u = e[a];
                a === "__source" ? t.__source = u : a === "__self" ? t.__self = u : n[a] = u;
            }
        }
        t.__proto__ = F, f && f(t);
    }, d.diffed = function(t) {
        if (t.__k && t.__k.forEach(function(g) {
            if (typeof g == "object" && g && g.type === void 0) {
                var b = Object.keys(g).join(",");
                throw new Error("Objects are not valid as a child. Encountered an object with the keys {" + b + `}.

` + d2(t));
            }
        }), o = !1, p && p(t), t.__k != null) for(var e = [], n = 0; n < t.__k.length; n++){
            var a = t.__k[n];
            if (a && a.key != null) {
                var u = a.key;
                if (e.indexOf(u) !== -1) {
                    console.error('Following component has two or more children with the same key attribute: "' + u + `". This may cause glitches and misbehavior in rendering process. Component: 

` + v1(t) + `

` + d2(t));
                    break;
                }
                e.push(u);
            }
        }
        if (t.__c != null && t.__c.__H != null) {
            var r = t.__c.__H.__;
            if (r) for(var _ = 0; _ < r.length; _ += 1){
                var h = r[_];
                if (h.__H) {
                    for(var w, S = R1(h.__H); !(w = S()).done;)if ((T = w.value) != T) {
                        var x = m(t);
                        throw new Error("Invalid argument passed to hook. Hooks should not be called with NaN in the dependency array. Hook index " + _ + " in component " + x + " was called with NaN.");
                    }
                }
            }
        }
        var T;
    };
}();
export { q2 as resetPropWarnings };
var i = 0;
function v2(n, s, f, a, l, u) {
    var r, o, _ = {};
    for(o in s)o == "ref" ? r = s[o] : _[o] = s[o];
    var t = {
        type: n,
        props: _,
        key: f,
        ref: r,
        __k: null,
        __: null,
        __b: 0,
        __e: null,
        __d: void 0,
        __c: null,
        __h: null,
        constructor: void 0,
        __v: --i,
        __source: l,
        __self: u
    };
    if (typeof n == "function" && (r = n.defaultProps)) for(o in r)_[o] === void 0 && (_[o] = r[o]);
    return d.vnode && d.vnode(t), t;
}
export { A as Fragment, v2 as jsx, v2 as jsxDEV, v2 as jsxs };
function L2(e, t) {
    for(var n in t)e[n] = t[n];
    return e;
}
function b2(e, t) {
    for(var n in e)if (n !== "__source" && !(n in t)) return !0;
    for(var r in t)if (r !== "__source" && e[r] !== t[r]) return !0;
    return !1;
}
function y1(e, t) {
    return e === t && (e !== 0 || 1 / e == 1 / t) || e != e && t != t;
}
function C2(e) {
    this.props = e;
}
function X2(e, t) {
    function n(o) {
        var u = this.props.ref, a = u == o.ref;
        return !a && u && (u.call ? u(null) : u.current = null), t ? !t(this.props, o) || !a : b2(this.props, o);
    }
    function r(o) {
        return this.shouldComponentUpdate = n, le(e, o);
    }
    return r.displayName = "Memo(" + (e.displayName || e.name) + ")", r.prototype.isReactComponent = !0, r.__f = !0, r;
}
(C2.prototype = new T).isPureReactComponent = !0, C2.prototype.shouldComponentUpdate = function(e, t) {
    return b2(this.props, e) || b2(this.state, t);
};
var N1 = d.__b;
d.__b = function(e) {
    e.type && e.type.__f && e.ref && (e.props.ref = e.ref, e.ref = null), N1 && N1(e);
};
var ee1 = typeof Symbol < "u" && Symbol.for && Symbol.for("react.forward_ref") || 3911;
function te1(e) {
    function t(n) {
        var r = L2({}, n);
        return delete r.ref, e(r, n.ref || null);
    }
    return t.$$typeof = ee1, t.render = t, t.prototype.isReactComponent = t.__f = !0, t.displayName = "ForwardRef(" + (e.displayName || e.name) + ")", t;
}
var R2 = function(e, t) {
    return e == null ? null : ie(ie(e).map(t));
}, ne1 = {
    map: R2,
    forEach: R2,
    count: function(e) {
        return e ? ie(e).length : 0;
    },
    only: function(e) {
        var t = ie(e);
        if (t.length !== 1) throw "Children.only";
        return t[0];
    },
    toArray: ie
}, re1 = d.__e;
d.__e = function(e, t, n, r) {
    if (e.then) {
        for(var o, u = t; u = u.__;)if ((o = u.__c) && o.__c) return t.__e == null && (t.__e = n.__e, t.__k = n.__k), o.__c(e, t);
    }
    re1(e, t, n, r);
};
var k2 = d.unmount;
function T2(e, t, n) {
    return e && (e.__c && e.__c.__H && (e.__c.__H.__.forEach(function(r) {
        typeof r.__c == "function" && r.__c();
    }), e.__c.__H = null), (e = L2({}, e)).__c != null && (e.__c.__P === n && (e.__c.__P = t), e.__c = null), e.__k = e.__k && e.__k.map(function(r) {
        return T2(r, t, n);
    })), e;
}
function A3(e, t, n) {
    return e && (e.__v = null, e.__k = e.__k && e.__k.map(function(r) {
        return A3(r, t, n);
    }), e.__c && e.__c.__P === t && (e.__e && n.insertBefore(e.__e, e.__d), e.__c.__e = !0, e.__c.__P = n)), e;
}
function d3() {
    this.__u = 0, this.t = null, this.__b = null;
}
function V1(e) {
    var t = e.__.__c;
    return t && t.__a && t.__a(e);
}
function oe(e) {
    var t, n, r;
    function o(u) {
        if (t || (t = e()).then(function(a) {
            n = a.default || a;
        }, function(a) {
            r = a;
        }), r) throw r;
        if (!n) throw t;
        return le(n, u);
    }
    return o.displayName = "Lazy", o.__f = !0, o;
}
function p1() {
    this.u = null, this.o = null;
}
d.unmount = function(e) {
    var t = e.__c;
    t && t.__R && t.__R(), t && e.__h === !0 && (e.type = null), k2 && k2(e);
}, (d3.prototype = new T).__c = function(e, t) {
    var n = t.__c, r = this;
    r.t == null && (r.t = []), r.t.push(n);
    var o = V1(r.__v), u = !1, a = function() {
        u || (u = !0, n.__R = null, o ? o(l) : l());
    };
    n.__R = a;
    var l = function() {
        if (!--r.__u) {
            if (r.state.__a) {
                var m = r.state.__a;
                r.__v.__k[0] = A3(m, m.__c.__P, m.__c.__O);
            }
            var g;
            for(r.setState({
                __a: r.__b = null
            }); g = r.t.pop();)g.forceUpdate();
        }
    }, _ = t.__h === !0;
    r.__u++ || _ || r.setState({
        __a: r.__b = r.__v.__k[0]
    }), e.then(a, a);
}, d3.prototype.componentWillUnmount = function() {
    this.t = [];
}, d3.prototype.render = function(e, t) {
    if (this.__b) {
        if (this.__v.__k) {
            var n = document.createElement("div"), r = this.__v.__k[0].__c;
            this.__v.__k[0] = T2(this.__b, n, r.__O = r.__P);
        }
        this.__b = null;
    }
    var o = t.__a && le(A, null, e.fallback);
    return o && (o.__h = null), [
        le(A, null, t.__a ? null : e.children),
        o
    ];
};
var x1 = function(e, t, n) {
    if (++n[1] === n[0] && e.o.delete(t), e.props.revealOrder && (e.props.revealOrder[0] !== "t" || !e.o.size)) for(n = e.u; n;){
        for(; n.length > 3;)n.pop()();
        if (n[1] < n[0]) break;
        e.u = n = n[2];
    }
};
function ue1(e) {
    return this.getChildContext = function() {
        return e.context;
    }, e.children;
}
function ae1(e) {
    var t = this, n = e.i;
    t.componentWillUnmount = function() {
        fe(null, t.l), t.l = null, t.i = null;
    }, t.i && t.i !== n && t.componentWillUnmount(), e.__v ? (t.l || (t.i = n, t.l = {
        nodeType: 1,
        parentNode: n,
        childNodes: [],
        appendChild: function(r) {
            this.childNodes.push(r), t.i.appendChild(r);
        },
        insertBefore: function(r, o) {
            this.childNodes.push(r), t.i.appendChild(r);
        },
        removeChild: function(r) {
            this.childNodes.splice(this.childNodes.indexOf(r) >>> 1, 1), t.i.removeChild(r);
        }
    }), fe(le(ue1, {
        context: t.context
    }, e.__v), t.l)) : t.l && t.componentWillUnmount();
}
function ie1(e, t) {
    var n = le(ae1, {
        __v: e,
        i: t
    });
    return n.containerInfo = t, n;
}
(p1.prototype = new T).__a = function(e) {
    var t = this, n = V1(t.__v), r = t.o.get(e);
    return r[0]++, function(o) {
        var u = function() {
            t.props.revealOrder ? (r.push(o), x1(t, e, r)) : o();
        };
        n ? n(u) : u();
    };
}, p1.prototype.render = function(e) {
    this.u = null, this.o = new Map;
    var t = ie(e.children);
    e.revealOrder && e.revealOrder[0] === "b" && t.reverse();
    for(var n = t.length; n--;)this.o.set(t[n], this.u = [
        1,
        0,
        this.u
    ]);
    return e.children;
}, p1.prototype.componentDidUpdate = p1.prototype.componentDidMount = function() {
    var e = this;
    this.o.forEach(function(t, n) {
        x1(e, n, t);
    });
};
var M2 = typeof Symbol < "u" && Symbol.for && Symbol.for("react.element") || 60103, le1 = /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|image(!S)|letter|lighting|marker(?!H|W|U)|overline|paint|pointer|shape|stop|strikethrough|stroke|text(?!L)|transform|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/, _e1 = /^on(Ani|Tra|Tou|BeforeInp|Compo)/, se1 = /[A-Z0-9]/g, ce1 = typeof document < "u", fe1 = function(e) {
    return (typeof Symbol < "u" && typeof Symbol() == "symbol" ? /fil|che|rad/ : /fil|che|ra/).test(e);
};
function pe1(e, t, n) {
    return t.__k == null && (t.textContent = ""), fe(e, t), typeof n == "function" && n(), e ? e.__c : null;
}
function de1(e, t, n) {
    return pe(e, t), typeof n == "function" && n(), e ? e.__c : null;
}
T.prototype.isReactComponent = {}, [
    "componentWillMount",
    "componentWillReceiveProps",
    "componentWillUpdate"
].forEach(function(e) {
    Object.defineProperty(T.prototype, e, {
        configurable: !0,
        get: function() {
            return this["UNSAFE_" + e];
        },
        set: function(t) {
            Object.defineProperty(this, e, {
                configurable: !0,
                writable: !0,
                value: t
            });
        }
    });
});
var O2 = d.event;
function he1() {}
function ve() {
    return this.cancelBubble;
}
function me() {
    return this.defaultPrevented;
}
d.event = function(e) {
    return O2 && (e = O2(e)), e.persist = he1, e.isPropagationStopped = ve, e.isDefaultPrevented = me, e.nativeEvent = e;
};
var S2, ye = {
    enumerable: !1,
    configurable: !0,
    get: function() {
        return this.class;
    }
}, P1 = d.vnode;
d.vnode = function(e) {
    typeof e.type == "string" && function(t) {
        var n = t.props, r = t.type, o = {};
        for(var u in n){
            var a = n[u];
            if (!(u === "value" && "defaultValue" in n && a == null || ce1 && u === "children" && r === "noscript" || u === "class" || u === "className")) {
                var l = u.toLowerCase();
                u === "defaultValue" && "value" in n && n.value == null ? u = "value" : u === "download" && a === !0 ? a = "" : l === "ondoubleclick" ? u = "ondblclick" : l !== "onchange" || r !== "input" && r !== "textarea" || fe1(n.type) ? l === "onfocus" ? u = "onfocusin" : l === "onblur" ? u = "onfocusout" : _e1.test(u) ? u = l : r.indexOf("-") === -1 && le1.test(u) ? u = u.replace(se1, "-$&").toLowerCase() : a === null && (a = void 0) : l = u = "oninput", l === "oninput" && o[u = l] && (u = "oninputCapture"), o[u] = a;
            }
        }
        r == "select" && o.multiple && Array.isArray(o.value) && (o.value = ie(n.children).forEach(function(_) {
            _.props.selected = o.value.indexOf(_.props.value) != -1;
        })), r == "select" && o.defaultValue != null && (o.value = ie(n.children).forEach(function(_) {
            _.props.selected = o.multiple ? o.defaultValue.indexOf(_.props.value) != -1 : o.defaultValue == _.props.value;
        })), n.class && !n.className ? (o.class = n.class, Object.defineProperty(o, "className", ye)) : (n.className && !n.class || n.class && n.className) && (o.class = o.className = n.className), t.props = o;
    }(e), e.$$typeof = M2, P1 && P1(e);
};
var U2 = d.__r;
d.__r = function(e) {
    U2 && U2(e), S2 = e.__c;
};
var w2 = d.diffed;
d.diffed = function(e) {
    w2 && w2(e);
    var t = e.props, n = e.__e;
    n != null && e.type === "textarea" && "value" in t && t.value !== n.value && (n.value = t.value == null ? "" : t.value), S2 = null;
};
var be = {
    ReactCurrentDispatcher: {
        current: {
            readContext: function(e) {
                return S2.__n[e.__c].props.value;
            }
        }
    }
}, Ie = "17.0.2";
function Ce(e) {
    return le.bind(null, e);
}
function W2(e) {
    return !!e && e.$$typeof === M2;
}
function Ee(e) {
    return W2(e) ? de.apply(null, arguments) : e;
}
function Se(e) {
    return !!e.__k && (fe(null, e), !0);
}
function ge(e) {
    return e && (e.base || e.nodeType === 1 && e) || null;
}
var Ne = function(e, t) {
    return e(t);
}, Re = function(e, t) {
    return e(t);
}, ke = A;
function F1(e) {
    e();
}
function xe(e) {
    return e;
}
function Oe() {
    return [
        !1,
        F1
    ];
}
var Pe = I1;
function Ue(e, t) {
    var n = t(), r = k1({
        h: {
            __: n,
            v: t
        }
    }), o = r[0].h, u = r[1];
    return I1(function() {
        o.__ = n, o.v = t, y1(o.__, t()) || u({
            h: o
        });
    }, [
        e,
        n,
        t
    ]), j1(function() {
        return y1(o.__, o.v()) || u({
            h: o
        }), e(function() {
            y1(o.__, o.v()) || u({
                h: o
            });
        });
    }, [
        e
    ]), n;
}
var Le = {
    useState: k1,
    useId: K1,
    useReducer: B1,
    useEffect: j1,
    useLayoutEffect: I1,
    useInsertionEffect: Pe,
    useTransition: Oe,
    useDeferredValue: xe,
    useSyncExternalStore: Ue,
    startTransition: F1,
    useRef: w1,
    useImperativeHandle: z1,
    useMemo: T1,
    useCallback: L1,
    useContext: M1,
    useDebugValue: G1,
    version: "17.0.2",
    Children: ne1,
    render: pe1,
    hydrate: de1,
    unmountComponentAtNode: Se,
    createPortal: ie1,
    createElement: le,
    createContext: he,
    createFactory: Ce,
    cloneElement: Ee,
    createRef: ae,
    Fragment: A,
    isValidElement: W2,
    findDOMNode: ge,
    Component: T,
    PureComponent: C2,
    memo: X2,
    forwardRef: te1,
    flushSync: Re,
    unstable_batchedUpdates: Ne,
    StrictMode: ke,
    Suspense: d3,
    SuspenseList: p1,
    lazy: oe,
    __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: be
};
export { ne1 as Children, T as Component, A as Fragment, C2 as PureComponent, ke as StrictMode, d3 as Suspense, p1 as SuspenseList, be as __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, Ee as cloneElement, he as createContext, le as createElement, Ce as createFactory, ie1 as createPortal, ae as createRef, ge as findDOMNode, Re as flushSync, te1 as forwardRef, de1 as hydrate, W2 as isValidElement, oe as lazy, X2 as memo, pe1 as render, F1 as startTransition, Se as unmountComponentAtNode, Ne as unstable_batchedUpdates, xe as useDeferredValue, Pe as useInsertionEffect, Ue as useSyncExternalStore, Oe as useTransition, Ie as version };
var w3, d4, j2, b3, $1, z3, H3, N2 = {}, J3 = [], re2 = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i, W3 = Array.isArray;
function k3(e, t) {
    for(var _ in t)e[_] = t[_];
    return e;
}
function K2(e) {
    var t = e.parentNode;
    t && t.removeChild(e);
}
function S3(e, t, _, r, l) {
    var o = {
        type: e,
        props: t,
        key: _,
        ref: r,
        __k: null,
        __: null,
        __b: 0,
        __e: null,
        __d: void 0,
        __c: null,
        __h: null,
        constructor: void 0,
        __v: l ?? ++j2
    };
    return l == null && d4.vnode != null && d4.vnode(o), o;
}
function A4(e) {
    return e.children;
}
function T3(e, t) {
    this.props = e, this.context = t;
}
function P2(e, t) {
    if (t == null) return e.__ ? P2(e.__, e.__.__k.indexOf(e) + 1) : null;
    for(var _; t < e.__k.length; t++)if ((_ = e.__k[t]) != null && _.__e != null) return _.__e;
    return typeof e.type == "function" ? P2(e) : null;
}
function Q1(e) {
    var t, _;
    if ((e = e.__) != null && e.__c != null) {
        for(e.__e = e.__c.base = null, t = 0; t < e.__k.length; t++)if ((_ = e.__k[t]) != null && _.__e != null) {
            e.__e = e.__c.base = _.__e;
            break;
        }
        return Q1(e);
    }
}
function I2(e) {
    (!e.__d && (e.__d = !0) && b3.push(e) && !L3.__r++ || $1 !== d4.debounceRendering) && (($1 = d4.debounceRendering) || z3)(L3);
}
function L3() {
    var e, t, _, r, l, o, s, u;
    for(b3.sort(H3); e = b3.shift();)e.__d && (t = b3.length, r = void 0, l = void 0, s = (o = (_ = e).__v).__e, (u = _.__P) && (r = [], (l = k3({}, o)).__v = o.__v + 1, O3(u, o, l, _.__n, u.ownerSVGElement !== void 0, o.__h != null ? [
        s
    ] : null, r, s ?? P2(o), o.__h), te2(r, o), o.__e != s && Q1(o)), b3.length > t && b3.sort(H3));
    L3.__r = 0;
}
function X3(e, t, _, r, l, o, s, u, p, a) {
    var n, h, c, i, f, x, v, y = r && r.__k || J3, g = y.length;
    for(_.__k = [], n = 0; n < t.length; n++)if ((i = _.__k[n] = (i = t[n]) == null || typeof i == "boolean" || typeof i == "function" ? null : typeof i == "string" || typeof i == "number" || typeof i == "bigint" ? S3(null, i, null, null, i) : W3(i) ? S3(A4, {
        children: i
    }, null, null, null) : i.__b > 0 ? S3(i.type, i.props, i.key, i.ref ? i.ref : null, i.__v) : i) != null) {
        if (i.__ = _, i.__b = _.__b + 1, (c = y[n]) === null || c && i.key == c.key && i.type === c.type) y[n] = void 0;
        else for(h = 0; h < g; h++){
            if ((c = y[h]) && i.key == c.key && i.type === c.type) {
                y[h] = void 0;
                break;
            }
            c = null;
        }
        O3(e, i, c = c || N2, l, o, s, u, p, a), f = i.__e, (h = i.ref) && c.ref != h && (v || (v = []), c.ref && v.push(c.ref, null, i), v.push(h, i.__c || f, i)), f != null ? (x == null && (x = f), typeof i.type == "function" && i.__k === c.__k ? i.__d = p = Y1(i, p, e) : p = Z1(e, i, c, y, f, p), typeof _.type == "function" && (_.__d = p)) : p && c.__e == p && p.parentNode != e && (p = P2(c));
    }
    for(_.__e = x, n = g; n--;)y[n] != null && (typeof _.type == "function" && y[n].__e != null && y[n].__e == _.__d && (_.__d = ee2(r).nextSibling), ne2(y[n], y[n]));
    if (v) for(n = 0; n < v.length; n++)_e2(v[n], v[++n], v[++n]);
}
function Y1(e, t, _) {
    for(var r, l = e.__k, o = 0; l && o < l.length; o++)(r = l[o]) && (r.__ = e, t = typeof r.type == "function" ? Y1(r, t, _) : Z1(_, r, r, l, r.__e, t));
    return t;
}
function Z1(e, t, _, r, l, o) {
    var s, u, p;
    if (t.__d !== void 0) s = t.__d, t.__d = void 0;
    else if (_ == null || l != o || l.parentNode == null) e: if (o == null || o.parentNode !== e) e.appendChild(l), s = null;
    else {
        for(u = o, p = 0; (u = u.nextSibling) && p < r.length; p += 1)if (u == l) break e;
        e.insertBefore(l, o), s = o;
    }
    return s !== void 0 ? s : l.nextSibling;
}
function ee2(e) {
    var t, _, r;
    if (e.type == null || typeof e.type == "string") return e.__e;
    if (e.__k) {
        for(t = e.__k.length - 1; t >= 0; t--)if ((_ = e.__k[t]) && (r = ee2(_))) return r;
    }
    return null;
}
function se2(e, t, _, r, l) {
    var o;
    for(o in _)o === "children" || o === "key" || o in t || M3(e, o, null, _[o], r);
    for(o in t)l && typeof t[o] != "function" || o === "children" || o === "key" || o === "value" || o === "checked" || _[o] === t[o] || M3(e, o, t[o], _[o], r);
}
function B2(e, t, _) {
    t[0] === "-" ? e.setProperty(t, _ ?? "") : e[t] = _ == null ? "" : typeof _ != "number" || re2.test(t) ? _ : _ + "px";
}
function M3(e, t, _, r, l) {
    var o;
    e: if (t === "style") if (typeof _ == "string") e.style.cssText = _;
    else {
        if (typeof r == "string" && (e.style.cssText = r = ""), r) for(t in r)_ && t in _ || B2(e.style, t, "");
        if (_) for(t in _)r && _[t] === r[t] || B2(e.style, t, _[t]);
    }
    else if (t[0] === "o" && t[1] === "n") o = t !== (t = t.replace(/Capture$/, "")), t = t.toLowerCase() in e ? t.toLowerCase().slice(2) : t.slice(2), e.l || (e.l = {}), e.l[t + o] = _, _ ? r || e.addEventListener(t, o ? V2 : G2, o) : e.removeEventListener(t, o ? V2 : G2, o);
    else if (t !== "dangerouslySetInnerHTML") {
        if (l) t = t.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
        else if (t !== "width" && t !== "height" && t !== "href" && t !== "list" && t !== "form" && t !== "tabIndex" && t !== "download" && t !== "rowSpan" && t !== "colSpan" && t in e) try {
            e[t] = _ ?? "";
            break e;
        } catch  {}
        typeof _ == "function" || (_ == null || _ === !1 && t[4] !== "-" ? e.removeAttribute(t) : e.setAttribute(t, _));
    }
}
function G2(e) {
    return this.l[e.type + !1](d4.event ? d4.event(e) : e);
}
function V2(e) {
    return this.l[e.type + !0](d4.event ? d4.event(e) : e);
}
function O3(e, t, _, r, l, o, s, u, p) {
    var a, n, h, c, i, f, x, v, y, g, E, C, R, U, F, m = t.type;
    if (t.constructor !== void 0) return null;
    _.__h != null && (p = _.__h, u = t.__e = _.__e, t.__h = null, o = [
        u
    ]), (a = d4.__b) && a(t);
    try {
        e: if (typeof m == "function") {
            if (v = t.props, y = (a = m.contextType) && r[a.__c], g = a ? y ? y.props.value : a.__ : r, _.__c ? x = (n = t.__c = _.__c).__ = n.__E : ("prototype" in m && m.prototype.render ? t.__c = n = new m(v, g) : (t.__c = n = new T3(v, g), n.constructor = m, n.render = ce2), y && y.sub(n), n.props = v, n.state || (n.state = {}), n.context = g, n.__n = r, h = n.__d = !0, n.__h = [], n._sb = []), n.__s == null && (n.__s = n.state), m.getDerivedStateFromProps != null && (n.__s == n.state && (n.__s = k3({}, n.__s)), k3(n.__s, m.getDerivedStateFromProps(v, n.__s))), c = n.props, i = n.state, n.__v = t, h) m.getDerivedStateFromProps == null && n.componentWillMount != null && n.componentWillMount(), n.componentDidMount != null && n.__h.push(n.componentDidMount);
            else {
                if (m.getDerivedStateFromProps == null && v !== c && n.componentWillReceiveProps != null && n.componentWillReceiveProps(v, g), !n.__e && n.shouldComponentUpdate != null && n.shouldComponentUpdate(v, n.__s, g) === !1 || t.__v === _.__v) {
                    for(t.__v !== _.__v && (n.props = v, n.state = n.__s, n.__d = !1), n.__e = !1, t.__e = _.__e, t.__k = _.__k, t.__k.forEach(function(D) {
                        D && (D.__ = t);
                    }), E = 0; E < n._sb.length; E++)n.__h.push(n._sb[E]);
                    n._sb = [], n.__h.length && s.push(n);
                    break e;
                }
                n.componentWillUpdate != null && n.componentWillUpdate(v, n.__s, g), n.componentDidUpdate != null && n.__h.push(function() {
                    n.componentDidUpdate(c, i, f);
                });
            }
            if (n.context = g, n.props = v, n.__P = e, C = d4.__r, R = 0, "prototype" in m && m.prototype.render) {
                for(n.state = n.__s, n.__d = !1, C && C(t), a = n.render(n.props, n.state, n.context), U = 0; U < n._sb.length; U++)n.__h.push(n._sb[U]);
                n._sb = [];
            } else do n.__d = !1, C && C(t), a = n.render(n.props, n.state, n.context), n.state = n.__s;
            while (n.__d && ++R < 25)
            n.state = n.__s, n.getChildContext != null && (r = k3(k3({}, r), n.getChildContext())), h || n.getSnapshotBeforeUpdate == null || (f = n.getSnapshotBeforeUpdate(c, i)), X3(e, W3(F = a != null && a.type === A4 && a.key == null ? a.props.children : a) ? F : [
                F
            ], t, _, r, l, o, s, u, p), n.base = t.__e, t.__h = null, n.__h.length && s.push(n), x && (n.__E = n.__ = null), n.__e = !1;
        } else o == null && t.__v === _.__v ? (t.__k = _.__k, t.__e = _.__e) : t.__e = ue2(_.__e, t, _, r, l, o, s, p);
        (a = d4.diffed) && a(t);
    } catch (D) {
        t.__v = null, (p || o != null) && (t.__e = u, t.__h = !!p, o[o.indexOf(u)] = null), d4.__e(D, t, _);
    }
}
function te2(e, t) {
    d4.__c && d4.__c(t, e), e.some(function(_) {
        try {
            e = _.__h, _.__h = [], e.some(function(r) {
                r.call(_);
            });
        } catch (r) {
            d4.__e(r, _.__v);
        }
    });
}
function ue2(e, t, _, r, l, o, s, u) {
    var p, a, n, h = _.props, c = t.props, i = t.type, f = 0;
    if (i === "svg" && (l = !0), o != null) {
        for(; f < o.length; f++)if ((p = o[f]) && "setAttribute" in p == !!i && (i ? p.localName === i : p.nodeType === 3)) {
            e = p, o[f] = null;
            break;
        }
    }
    if (e == null) {
        if (i === null) return document.createTextNode(c);
        e = l ? document.createElementNS("http://www.w3.org/2000/svg", i) : document.createElement(i, c.is && c), o = null, u = !1;
    }
    if (i === null) h === c || u && e.data === c || (e.data = c);
    else {
        if (o = o && w3.call(e.childNodes), a = (h = _.props || N2).dangerouslySetInnerHTML, n = c.dangerouslySetInnerHTML, !u) {
            if (o != null) for(h = {}, f = 0; f < e.attributes.length; f++)h[e.attributes[f].name] = e.attributes[f].value;
            (n || a) && (n && (a && n.__html == a.__html || n.__html === e.innerHTML) || (e.innerHTML = n && n.__html || ""));
        }
        if (se2(e, c, h, l, u), n) t.__k = [];
        else if (X3(e, W3(f = t.props.children) ? f : [
            f
        ], t, _, r, l && i !== "foreignObject", o, s, o ? o[0] : _.__k && P2(_, 0), u), o != null) for(f = o.length; f--;)o[f] != null && K2(o[f]);
        u || ("value" in c && (f = c.value) !== void 0 && (f !== e.value || i === "progress" && !f || i === "option" && f !== h.value) && M3(e, "value", f, h.value, !1), "checked" in c && (f = c.checked) !== void 0 && f !== e.checked && M3(e, "checked", f, h.checked, !1));
    }
    return e;
}
function _e2(e, t, _) {
    try {
        typeof e == "function" ? e(t) : e.current = t;
    } catch (r) {
        d4.__e(r, _);
    }
}
function ne2(e, t, _) {
    var r, l;
    if (d4.unmount && d4.unmount(e), (r = e.ref) && (r.current && r.current !== e.__e || _e2(r, null, t)), (r = e.__c) != null) {
        if (r.componentWillUnmount) try {
            r.componentWillUnmount();
        } catch (o) {
            d4.__e(o, t);
        }
        r.base = r.__P = null, e.__c = void 0;
    }
    if (r = e.__k) for(l = 0; l < r.length; l++)r[l] && ne2(r[l], t, _ || typeof e.type != "function");
    _ || e.__e == null || K2(e.__e), e.__ = e.__e = e.__d = void 0;
}
function ce2(e, t, _) {
    return this.constructor(e, _);
}
w3 = J3.slice, d4 = {
    __e: function(e, t, _, r) {
        for(var l, o, s; t = t.__;)if ((l = t.__c) && !l.__) try {
            if ((o = l.constructor) && o.getDerivedStateFromError != null && (l.setState(o.getDerivedStateFromError(e)), s = l.__d), l.componentDidCatch != null && (l.componentDidCatch(e, r || {}), s = l.__d), s) return l.__E = l;
        } catch (u) {
            e = u;
        }
        throw e;
    }
}, j2 = 0, T3.prototype.setState = function(e, t) {
    var _;
    _ = this.__s != null && this.__s !== this.state ? this.__s : this.__s = k3({}, this.state), typeof e == "function" && (e = e(k3({}, _), this.props)), e && k3(_, e), e != null && this.__v && (t && this._sb.push(t), I2(this));
}, T3.prototype.forceUpdate = function(e) {
    this.__v && (this.__e = !0, e && this.__h.push(e), I2(this));
}, T3.prototype.render = A4, b3 = [], z3 = typeof Promise == "function" ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, H3 = function(e, t) {
    return e.__v.__b - t.__v.__b;
}, L3.__r = 0, 0;
var c1, o1, H4, b4, v3 = 0, x2 = [], p2 = [], g1 = d4.__b, A5 = d4.__r, C3 = d4.diffed, F2 = d4.__c, q3 = d4.unmount;
function l1(_, n) {
    d4.__h && d4.__h(o1, _, v3 || n), v3 = 0;
    var u = o1.__H || (o1.__H = {
        __: [],
        __h: []
    });
    return _ >= u.__.length && u.__.push({
        __V: p2
    }), u.__[_];
}
function j3(_, n) {
    var u = l1(c1++, 3);
    !d4.__s && y2(u.__H, n) && (u.__ = _, u.i = n, o1.__H.__h.push(u));
}
function w4(_) {
    return v3 = 5, T4(function() {
        return {
            current: _
        };
    }, []);
}
function T4(_, n) {
    var u = l1(c1++, 7);
    return y2(u.__H, n) ? (u.__V = _(), u.i = n, u.__h = _, u.__V) : u.__;
}
function R3() {
    for(var _; _ = x2.shift();)if (_.__P && _.__H) try {
        _.__H.__h.forEach(d5), _.__H.__h.forEach(E2), _.__H.__h = [];
    } catch (n) {
        _.__H.__h = [], d4.__e(n, _.__v);
    }
}
d4.__b = function(_) {
    o1 = null, g1 && g1(_);
}, d4.__r = function(_) {
    A5 && A5(_), c1 = 0;
    var n = (o1 = _.__c).__H;
    n && (H4 === o1 ? (n.__h = [], o1.__h = [], n.__.forEach(function(u) {
        u.__N && (u.__ = u.__N), u.__V = p2, u.__N = u.i = void 0;
    })) : (n.__h.forEach(d5), n.__h.forEach(E2), n.__h = [], c1 = 0)), H4 = o1;
}, d4.diffed = function(_) {
    C3 && C3(_);
    var n = _.__c;
    n && n.__H && (n.__H.__h.length && (x2.push(n) !== 1 && b4 === d4.requestAnimationFrame || ((b4 = d4.requestAnimationFrame) || S4)(R3)), n.__H.__.forEach(function(u) {
        u.i && (u.__H = u.i), u.__V !== p2 && (u.__ = u.__V), u.i = void 0, u.__V = p2;
    })), H4 = o1 = null;
}, d4.__c = function(_, n) {
    n.some(function(u) {
        try {
            u.__h.forEach(d5), u.__h = u.__h.filter(function(t) {
                return !t.__ || E2(t);
            });
        } catch (t) {
            n.some(function(i) {
                i.__h && (i.__h = []);
            }), n = [], d4.__e(t, u.__v);
        }
    }), F2 && F2(_, n);
}, d4.unmount = function(_) {
    q3 && q3(_);
    var n, u = _.__c;
    u && u.__H && (u.__H.__.forEach(function(t) {
        try {
            d5(t);
        } catch (i) {
            n = i;
        }
    }), u.__H = void 0, n && d4.__e(n, u.__v));
};
var D2 = typeof requestAnimationFrame == "function";
function S4(_) {
    var n, u = function() {
        clearTimeout(t), D2 && cancelAnimationFrame(n), setTimeout(_);
    }, t = setTimeout(u, 100);
    D2 && (n = requestAnimationFrame(u));
}
function d5(_) {
    var n = o1, u = _.__c;
    typeof u == "function" && (_.__c = void 0, u()), o1 = n;
}
function E2(_) {
    var n = o1;
    _.__c = _.__(), o1 = n;
}
function y2(_, n) {
    return !_ || _.length !== n.length || n.some(function(u, t) {
        return u !== _[t];
    });
}
function v4() {
    throw new Error("Cycle detected");
}
function d6() {
    if (h > 1) {
        h--;
        return;
    }
    let i, t = !1;
    for(; e !== void 0;){
        let o = e;
        for(e = void 0, p3++; o !== void 0;){
            let f = o.o;
            if (o.o = void 0, o.f &= -3, !(8 & o.f) && a(o)) try {
                o.c();
            } catch (b) {
                t || (i = b, t = !0);
            }
            o = f;
        }
    }
    if (p3 = 0, h--, t) throw i;
}
function N3(i) {
    if (h > 0) return i();
    h++;
    try {
        return i();
    } finally{
        d6();
    }
}
var s, e, h = 0, p3 = 0, u = 0;
function y3(i) {
    if (s === void 0) return;
    let t = i.n;
    if (t === void 0 || t.t !== s) return t = {
        i: 0,
        S: i,
        p: s.s,
        n: void 0,
        t: s,
        e: void 0,
        x: void 0,
        r: t
    }, s.s !== void 0 && (s.s.n = t), s.s = t, i.n = t, 32 & s.f && i.S(t), t;
    if (t.i === -1) return t.i = 0, t.n !== void 0 && (t.n.p = t.p, t.p !== void 0 && (t.p.n = t.n), t.p = s.s, t.n = void 0, s.s.n = t, s.s = t), t;
}
function n(i) {
    this.v = i, this.i = 0, this.n = void 0, this.t = void 0;
}
n.prototype.h = function() {
    return !0;
};
n.prototype.S = function(i) {
    this.t !== i && i.e === void 0 && (i.x = this.t, this.t !== void 0 && (this.t.e = i), this.t = i);
};
n.prototype.U = function(i) {
    if (this.t !== void 0) {
        let t = i.e, o = i.x;
        t !== void 0 && (t.x = o, i.e = void 0), o !== void 0 && (o.e = t, i.x = void 0), i === this.t && (this.t = o);
    }
};
n.prototype.subscribe = function(i) {
    let t = this;
    return U3(function() {
        let o = t.value, f = 32 & this.f;
        this.f &= -33;
        try {
            i(o);
        } finally{
            this.f |= f;
        }
    });
};
n.prototype.valueOf = function() {
    return this.value;
};
n.prototype.toString = function() {
    return this.value + "";
};
n.prototype.peek = function() {
    return this.v;
};
Object.defineProperty(n.prototype, "value", {
    get () {
        let i = y3(this);
        return i !== void 0 && (i.i = this.i), this.v;
    },
    set (i) {
        if (i !== this.v) {
            p3 > 100 && v4(), this.v = i, this.i++, u++, h++;
            try {
                for(let t = this.t; t !== void 0; t = t.x)t.t.N();
            } finally{
                d6();
            }
        }
    }
});
function O4(i) {
    return new n(i);
}
function a(i) {
    for(let t = i.s; t !== void 0; t = t.n)if (t.S.i !== t.i || !t.S.h() || t.S.i !== t.i) return !0;
    return !1;
}
function S5(i) {
    for(let t = i.s; t !== void 0; t = t.n){
        let o = t.S.n;
        if (o !== void 0 && (t.r = o), t.S.n = t, t.i = -1, t.n === void 0) {
            i.s = t;
            break;
        }
    }
}
function w5(i) {
    let t, o = i.s;
    for(; o !== void 0;){
        let f = o.p;
        o.i === -1 ? (o.S.U(o), f !== void 0 && (f.n = o.n), o.n !== void 0 && (o.n.p = f)) : t = o, o.S.n = o.r, o.r !== void 0 && (o.r = void 0), o = f;
    }
    i.s = t;
}
function r(i) {
    n.call(this, void 0), this.x = i, this.s = void 0, this.g = u - 1, this.f = 4;
}
(r.prototype = new n).h = function() {
    if (this.f &= -3, 1 & this.f) return !1;
    if ((36 & this.f) == 32 || (this.f &= -5, this.g === u)) return !0;
    if (this.g = u, this.f |= 1, this.i > 0 && !a(this)) return this.f &= -2, !0;
    let i = s;
    try {
        S5(this), s = this;
        let t = this.x();
        (16 & this.f || this.v !== t || this.i === 0) && (this.v = t, this.f &= -17, this.i++);
    } catch (t1) {
        this.v = t1, this.f |= 16, this.i++;
    }
    return s = i, w5(this), this.f &= -2, !0;
};
r.prototype.S = function(i) {
    if (this.t === void 0) {
        this.f |= 36;
        for(let t = this.s; t !== void 0; t = t.n)t.S.S(t);
    }
    n.prototype.S.call(this, i);
};
r.prototype.U = function(i) {
    if (this.t !== void 0 && (n.prototype.U.call(this, i), this.t === void 0)) {
        this.f &= -33;
        for(let t = this.s; t !== void 0; t = t.n)t.S.U(t);
    }
};
r.prototype.N = function() {
    if (!(2 & this.f)) {
        this.f |= 6;
        for(let i = this.t; i !== void 0; i = i.x)i.t.N();
    }
};
r.prototype.peek = function() {
    if (this.h() || v4(), 16 & this.f) throw this.v;
    return this.v;
};
Object.defineProperty(r.prototype, "value", {
    get () {
        1 & this.f && v4();
        let i = y3(this);
        if (this.h(), i !== void 0 && (i.i = this.i), 16 & this.f) throw this.v;
        return this.v;
    }
});
function k4(i) {
    return new r(i);
}
function x3(i) {
    let t = i.u;
    if (i.u = void 0, typeof t == "function") {
        h++;
        let o = s;
        s = void 0;
        try {
            t();
        } catch (f) {
            throw i.f &= -2, i.f |= 8, l2(i), f;
        } finally{
            s = o, d6();
        }
    }
}
function l2(i) {
    for(let t = i.s; t !== void 0; t = t.n)t.S.U(t);
    i.x = void 0, i.s = void 0, x3(i);
}
function g2(i) {
    if (s !== this) throw new Error("Out-of-order effect");
    w5(this), s = i, this.f &= -2, 8 & this.f && l2(this), d6();
}
function c2(i) {
    this.x = i, this.u = void 0, this.s = void 0, this.o = void 0, this.f = 32;
}
c2.prototype.c = function() {
    let i = this.S();
    try {
        !(8 & this.f) && this.x !== void 0 && (this.u = this.x());
    } finally{
        i();
    }
};
c2.prototype.S = function() {
    1 & this.f && v4(), this.f |= 1, this.f &= -9, x3(this), S5(this), h++;
    let i = s;
    return s = this, g2.bind(this, i);
};
c2.prototype.N = function() {
    2 & this.f || (this.f |= 2, this.o = e, e = this);
};
c2.prototype.d = function() {
    this.f |= 8, 1 & this.f || l2(this);
};
function U3(i) {
    let t = new c2(i);
    try {
        t.c();
    } catch (o) {
        throw t.d(), o;
    }
    return t.d.bind(t);
}
var s1, p4;
function a1(i, n) {
    options[i] = n.bind(null, options[i] || function() {});
}
function v5(i) {
    p4 && p4(), p4 = i && i.S();
}
function S6(i) {
    var n = this, t = i.data, r = E3(t);
    r.value = t;
    var f = T4(function() {
        for(var e = n.__v; e = e.__;)if (e.__c) {
            e.__c.__$f |= 4;
            break;
        }
        return n.__$u.c = function() {
            n.base.data = f.peek();
        }, k4(function() {
            var o = r.value.value;
            return o === 0 ? 0 : o === !0 ? "" : o || "";
        });
    }, []);
    return f.value;
}
S6.displayName = "_st";
Object.defineProperties(n.prototype, {
    constructor: {
        configurable: !0,
        value: void 0
    },
    type: {
        configurable: !0,
        value: S6
    },
    props: {
        configurable: !0,
        get: function() {
            return {
                data: this
            };
        }
    },
    __b: {
        configurable: !0,
        value: 1
    }
});
a1("__b", function(i, n1) {
    if (typeof n1.type == "string") {
        var t, r = n1.props;
        for(var f in r)if (f !== "children") {
            var e = r[f];
            e instanceof n && (t || (n1.__np = t = {}), t[f] = e, r[f] = e.peek());
        }
    }
    i(n1);
});
a1("__r", function(i, n) {
    v5();
    var t, r = n.__c;
    r && (r.__$f &= -2, (t = r.__$u) === void 0 && (r.__$u = t = function(f) {
        var e;
        return U3(function() {
            e = this;
        }), e.c = function() {
            r.__$f |= 1, r.setState({});
        }, e;
    }())), s1 = r, v5(t), i(n);
});
a1("__e", function(i, n, t, r) {
    v5(), s1 = void 0, i(n, t, r);
});
a1("diffed", function(i, n) {
    v5(), s1 = void 0;
    var t;
    if (typeof n.type == "string" && (t = n.__e)) {
        var r = n.__np, f = n.props;
        if (r) {
            var e = t.U;
            if (e) for(var o in e){
                var u = e[o];
                u !== void 0 && !(o in r) && (u.d(), e[o] = void 0);
            }
            else t.U = e = {};
            for(var _ in r){
                var c = e[_], m = r[_];
                c === void 0 ? (c = C4(t, _, m, f), e[_] = c) : c.o(m, f);
            }
        }
    }
    i(n);
});
function C4(i, n, t, r) {
    var f = n in i && i.ownerSVGElement === void 0, e = O4(t);
    return {
        o: function(o, u) {
            e.value = o, r = u;
        },
        d: U3(function() {
            var o = e.value.value;
            r[n] !== o && (r[n] = o, f ? i[n] = o : o ? i.setAttribute(n, o) : i.removeAttribute(n));
        })
    };
}
a1("unmount", function(i, n) {
    if (typeof n.type == "string") {
        var t = n.__e;
        if (t) {
            var r = t.U;
            if (r) {
                t.U = void 0;
                for(var f in r){
                    var e = r[f];
                    e && e.d();
                }
            }
        }
    } else {
        var o = n.__c;
        if (o) {
            var u = o.__$u;
            u && (o.__$u = void 0, u.d());
        }
    }
    i(n);
});
a1("__h", function(i, n, t, r) {
    r < 3 && (n.__$f |= 2), i(n, t, r);
});
Component.prototype.shouldComponentUpdate = function(i, n) {
    var t = this.__$u;
    if (!(t && t.s !== void 0 || 4 & this.__$f) || 3 & this.__$f) return !0;
    for(var r in n)return !0;
    for(var f in i)if (f !== "__source" && i[f] !== this.props[f]) return !0;
    for(var e in this.props)if (!(e in i)) return !0;
    return !1;
};
function E3(i) {
    return T4(function() {
        return O4(i);
    }, []);
}
function j4(i) {
    var n = w4(i);
    return n.current = i, s1.__$f |= 4, T4(function() {
        return k4(function() {
            return n.current();
        });
    }, []);
}
function G3(i) {
    var n = w4(i);
    n.current = i, j3(function() {
        return U3(function() {
            return n.current();
        });
    }, []);
}
export { n as Signal, N3 as batch, k4 as computed, U3 as effect, O4 as signal, j4 as useComputed, E3 as useSignal, G3 as useSignalEffect };
export { Le as default };
