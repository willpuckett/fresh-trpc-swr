// deno-fmt-ignore-file
// deno-lint-ignore-file
// This code was bundled using `deno bundle` and it's not recommended to edit it manually

var i = "__twind", d = (t)=>{
    let e = self[i];
    return e || (e = document.head.appendChild(document.createElement("style")), e.id = i, t && (e.nonce = t), e.appendChild(document.createTextNode(""))), e;
}, a = ({ nonce: t , target: e = d(t)  } = {})=>{
    let n = e.childNodes.length;
    return {
        target: e,
        insert: (r, o)=>e.insertBefore(document.createTextNode(r), e.childNodes[n + o])
    };
}, l = ()=>{
    let t = [], e = [], n = (r, o)=>e[o] = r(e[o]);
    return {
        init: (r)=>n(r, t.push(r) - 1),
        reset: (r = [])=>([r, e] = [
                e,
                r
            ], t.forEach(n), r)
    };
}, g = ()=>{
    let t = l(), e;
    return t.init((n = [])=>e = n), Object.defineProperties({
        get target () {
            return [
                ...e
            ];
        },
        insert: (n, r)=>e.splice(r, 0, n)
    }, Object.getOwnPropertyDescriptors(t));
}, s = (t)=>({
        id: i,
        textContent: (Array.isArray(t) ? t : t.target).join("")
    }), u = (t, e)=>{
    let { id: n , textContent: r  } = s(t);
    return e = {
        ...e,
        id: n
    }, `<style${Object.keys(e).reduce((o, c)=>`${o} ${c}=${JSON.stringify(e[c])}`, "")}>${r}</style>`;
};
export { a as domSheet, u as getStyleTag, s as getStyleTagProperties, g as virtualSheet };
