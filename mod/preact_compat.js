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
function C1(e) {
    this.props = e;
}
function X1(e, t) {
    function n(o) {
        var u = this.props.ref, a = u == o.ref;
        return !a && u && (u.call ? u(null) : u.current = null), t ? !t(this.props, o) || !a : b2(this.props, o);
    }
    function r(o) {
        return this.shouldComponentUpdate = n, le(e, o);
    }
    return r.displayName = "Memo(" + (e.displayName || e.name) + ")", r.prototype.isReactComponent = !0, r.__f = !0, r;
}
(C1.prototype = new T).isPureReactComponent = !0, C1.prototype.shouldComponentUpdate = function(e, t) {
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
var R1 = function(e, t) {
    return e == null ? null : ie(ie(e).map(t));
}, ne1 = {
    map: R1,
    forEach: R1,
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
function A2(e, t, n) {
    return e && (e.__v = null, e.__k = e.__k && e.__k.map(function(r) {
        return A2(r, t, n);
    }), e.__c && e.__c.__P === t && (e.__e && n.insertBefore(e.__e, e.__d), e.__c.__e = !0, e.__c.__P = n)), e;
}
function d2() {
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
}, (d2.prototype = new T).__c = function(e, t) {
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
                r.__v.__k[0] = A2(m, m.__c.__P, m.__c.__O);
            }
            var g;
            for(r.setState({
                __a: r.__b = null
            }); g = r.t.pop();)g.forceUpdate();
        }
    }, _ = t.__h === !0;
    (r.__u++) || _ || r.setState({
        __a: r.__b = r.__v.__k[0]
    }), e.then(a, a);
}, d2.prototype.componentWillUnmount = function() {
    this.t = [];
}, d2.prototype.render = function(e, t) {
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
var O1 = d.event;
function he1() {}
function ve() {
    return this.cancelBubble;
}
function me() {
    return this.defaultPrevented;
}
d.event = function(e) {
    return O1 && (e = O1(e)), e.persist = he1, e.isPropagationStopped = ve, e.isDefaultPrevented = me, e.nativeEvent = e;
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
var U1 = d.__r;
d.__r = function(e) {
    U1 && U1(e), S2 = e.__c;
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
function W1(e) {
    return !!e && e.$$typeof === M2;
}
function Ee(e) {
    return W1(e) ? de.apply(null, arguments) : e;
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
    isValidElement: W1,
    findDOMNode: ge,
    Component: T,
    PureComponent: C1,
    memo: X1,
    forwardRef: te1,
    flushSync: Re,
    unstable_batchedUpdates: Ne,
    StrictMode: ke,
    Suspense: d2,
    SuspenseList: p1,
    lazy: oe,
    __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: be
};
export { ne1 as Children, T as Component, A as Fragment, C1 as PureComponent, ke as StrictMode, d2 as Suspense, p1 as SuspenseList, be as __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, Ee as cloneElement, he as createContext, le as createElement, Ce as createFactory, ie1 as createPortal, ae as createRef, ge as findDOMNode, Re as flushSync, te1 as forwardRef, de1 as hydrate, W1 as isValidElement, oe as lazy, X1 as memo, pe1 as render, F1 as startTransition, Se as unmountComponentAtNode, Ne as unstable_batchedUpdates, xe as useDeferredValue, Pe as useInsertionEffect, Ue as useSyncExternalStore, Oe as useTransition, Ie as version };
export { Le as default };
