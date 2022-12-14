(() => {
    function D(e = new Date(), t = "long", r = void 0) {
        return e.toLocaleString(r, {
            month: t
        });
    }

    function L(e = new Date(), t = "numeric", r = void 0) {
        let n;
        return t === "numeric" || t === "numeric" ? (n = e.toLocaleString(r, {
            day: t
        })) : (n = e.toLocaleString(r, {
            weekday: t
        })), n;
    }

    function N(e = new Date(), t = void 0) {
        return e.toLocaleString(t, {
            timeStyle: "short",
            hour12: !0
        });
    }

    function T(e) {
        e();
        let t = new Date(),
            r = 60 - t.getSeconds(),
            n = r < 0 ? 0 : r * 1e3;
        setTimeout(() => {
            T(e);a
        }, n);
    }

    function w(e) {
        return new Promise((t) => setTimeout(t, e));
    }

    function b(e, t = 5) {
        let r = [];
        for (let n = 0, a = e.length; n < a; n += t) r.push(e.slice(n, n + t));
        return r;
    }

    function E(e) {
        let t = 0;
        if (e && e.length > 0)
            for (let r = 0, n = e.length; r < n; ++r) {
                let a = e.charCodeAt(r);
                (t = (t << 5) - t + a), (t |= 0), (t = t < 0 ? -1 * t : t);
            }
        return t;
    }
    var A = "\u2022";
    var f = "\xA0";

    function v(e, t) {
        let r = [];
        typeof t == "string" ? (r = t.split(" ")) : Array.isArray(t) && (r = t);
        for (let n = 0, a = r.length; n < a; ++n) {
            let u = r[n];
            u && u.length > 0 && e.classList.add(u);
        }
    }

    function c(e, t, r) {
        let n = S("div", e, t);
        return r && p(n, r), n;
    }

    function S(e, t, r) {
        let n = document.createElement(e);
        return v(n, r), t && t.appendChild(n), n;
    }

    function x(e, t, r) {
        let n = S("img", e, t);
        return (n.src = r), n;
    }

    function C(e, t) {
        let r = document.createTextNode(t);
        return e.appendChild(r), r;
    }

    function O(e) {
        e.parentNode && e.parentNode.removeChild(e), (e = null);
    }

    function p(e, t, r = !1) {
        if (r) C(e, t);
        else {
            let n = G(e);
            n ? (n.nodeValue = t) : C(e, t);
        }
    }
    async function R(e, t = 1) {
        let n = e.complete && e.naturalHeight !== 0,
            a = Math.round((t * 1e3) / 100),
            u = 0;
        for (; !e.complete && u < a;) u++, await w(100);
        return e.naturalHeight > 0;
    }

    function G(e) {
        for (let t in e.childNodes)
            if (e.childNodes[t].nodeType === Node.TEXT_NODE) return e.childNodes[t];
        return null;
    }
    var _ = Math.PI,
        X = 180 / _,
        q = _ / 180;

    function M(e) {
        return !isNaN(e) && !isNaN(parseFloat(e));
    }

    function I(e, t) {
        return (e = Math.ceil(e)), (t = Math.floor(t) + 1), Math.floor(Math.random() * (t - e) + e);
    }
    async function P(e, t = "en") {
        let r = [],
            n = Array.isArray(e) ? e : [e],
            a = b(n, 5);
        for (let u = 0, o = a.length; u < o; ++u) {
            let i = await wtf.fetch(a[u], t);
            if (!i) break;
            r.push(...i);
        }
        return r.length === 1 ? r[0] : r;
    }
    async function F() {
        let e = D() + "_" + L(),
            t = await P(e);
        return t ? {
            id: t.pageID(),
            itemList: await H(t),
            title: t.title()
        } : null;
    }
    async function H(e) {
        let t = [],
            r = e.sections(),
            n = null;
        for (let a = 0, u = r.length; a < u; ++a) {
            let o = r[a];
            if (o.depth() === 0) n = {
                type: o.title().toLowerCase()
            };
            else if (n.type === "events") {
                let i = await U(o);
                t.push(...i);
            } else n.type === "holidays and observances" && console.log("would process holidays");
        }
        return t;
    }
    async function U(e) {
        let t = [],
            r = e.lists();
        for (let n = 0, a = r.length; n < a; ++n) {
            let u = r[n].data;
            for (let o = 0, i = u.length; o < i; ++o) {
                let {
                    year: l,
                    text: s
                } = Y(u[o].text()),
                    d = {
                        pageList: j(u[o].links(), !0),
                        text: s,
                        year: l
                    };
                t.push(d);
            }
        }
        return t;
    }

    function j(e, t = !1) {
        let r = [];
        for (let n = 0, a = e.length; n < a; ++n) {
            let u = e[n].page();
            (!t || !M(u)) && r.push(u);
        }
        return r;
    }

    function Y(e) {
        let t = "",
            r = "",
            n = e.indexOf("&ndash;");
        return n > 0 && ((t = e.substring(0, n - 1)), (r = e.substring(n + 8))), {
            year: t,
            text: r
        };
    }
    async function W(e, t = -1) {
        let r = [];
        if (!e) return r;
        let n = await P(e);
        if (!n) return r;
        n = Array.isArray(n) ? n : [n];
        for (let a = 0, u = n.length; a < u; ++a) {
            let i = n[a].images(),
                l = i.length,
                s = t < 1 ? l : Math.min(l, t),
                d = 0;
            for (let g = 0; g < l && d < s; ++g) {
                let m = i[g].json().url,
                    y = m.lastIndexOf("."),
                    h = m.substring(y).toLowerCase();
                (h === ".gif" || h === ".jpg" || h === ".jpeg" || h === ".png") && (d++, r.push(m));
            }
        }
        return r;
    }
    window.addEventListener("load", k);
    async function k() {
        return e();
        async function e() {
            let o = await t();
            r(document.body, o);
        }
        async function t() {
            let o = await F();
            if (!o || !o.itemList || o.itemList.length < 1) return null;
            let i = o.itemList,
                l = I(0, i.length - 1),
                s = i[l],
                d = {
                    monthDay: o.title,
                    id: o.id + "." + E(s.text),
                    year: s.year,
                    text: s.text,
                    relatedPageList: s.pageList
                };
            return (d.relatedImageList = await W(d.relatedPageList, 1)), d;
        }
        async function r(o, i) {
            let l = [
                "linear-gradient(140deg, #dddddd 0%, #aaaaaa 100%)",
                "linear-gradient(140deg, #dddddd 0%, #e88b8b 100%)",
                "linear-gradient(140deg, #dddddd 0%, #caaff3 100%)",
                "linear-gradient(140deg, #dddddd 0%, #8babe8 100%)",
                "linear-gradient(140deg, #dddddd 0%, #8bcee8 100%)",
                "linear-gradient(140deg, #dddddd 0%, #8bdfe8 100%)",
                "linear-gradient(140deg, #dddddd 0%, #8be8bd 100%)",
                "linear-gradient(140deg, #dddddd 0%, #dae88b 100%)",
                "linear-gradient(140deg, #dddddd 0%, #e8b68b 100%)",
            ];
            (document.body.style.background = l[I(0, l.length - 1)]),
            c(o, "mainTitle"),
                T(n),
                await a(o, i),
                c(o, "sloganContainer", "collect" + f + f + A + f + f + "create" + f + f + A + f + f + "share"),
                (document.body.style.animation = "fadeInAnim 0.25s ease-in-out 0s forwards");
        }

        function n() {
            let o = new Date(),
                i = L(o, "long"),
                l = L(o, "numeric"),
                s = D(o, "long"),
                d = document.getElementsByClassName("mainTitle")[0];
            p(d, i + ", " + s + " " + l + ", " + N(o));
        }
        async function a(o, i) {
            let l = c(o, "heroCardContainer"),
                s = c(l, "cardNumberContainer"),
                d = c(l, "cardTitle");
            if (i) {
                x(s, "cardNumberLogo", "../assets/images/logo/logo256.png"), c(s, "cardNumber", "#" + i.id), p(d, "On This Day in " + i.year);
                let m = c(l, "cardDescription");
                p(m, htmlEntity.decode(i.text));
                let y = c(l, "cardMainImageContainer"),
                    h = i.relatedPageList.length;
                await u(y, i, 0);
            } else {
                x(s, "cardNumberLogo", null), c(s, "cardNumber"), p(d, "No Events Found"), c(l, "cardDescription");
                let g = c(l, "cardMainImageContainer");
                x(g, "cardMainImage", null);
            }
            return l;
        }
        async function u(o, i, l) {
            let s = c(o, "mainHeroCard");
            if (i.relatedImageList[l]) {
                let d = i.relatedImageList[l],
                    g = x(s, "cardMainImage", d);
                (await R(g, 2)) || (console.log("status = bad image", d), O(g));
                let y = i.relatedPageList[l];
            }
            return s;
        }
    }
})();
