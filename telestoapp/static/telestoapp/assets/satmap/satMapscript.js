var ne = Object.defineProperty;
var oe = (e, t, r) =>
  t in e
    ? ne(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r })
    : (e[t] = r);
var B = (e, t, r) => (oe(e, typeof t != "symbol" ? t + "" : t, r), r);
(function () {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const o of document.querySelectorAll('link[rel="modulepreload"]')) i(o);
  new MutationObserver((o) => {
    for (const s of o)
      if (s.type === "childList")
        for (const d of s.addedNodes)
          d.tagName === "LINK" && d.rel === "modulepreload" && i(d);
  }).observe(document, { childList: !0, subtree: !0 });
  function r(o) {
    const s = {};
    return (
      o.integrity && (s.integrity = o.integrity),
      o.referrerPolicy && (s.referrerPolicy = o.referrerPolicy),
      o.crossOrigin === "use-credentials"
        ? (s.credentials = "include")
        : o.crossOrigin === "anonymous"
        ? (s.credentials = "omit")
        : (s.credentials = "same-origin"),
      s
    );
  }
  function i(o) {
    if (o.ep) return;
    o.ep = !0;
    const s = r(o);
    fetch(o.href, s);
  }
})();
const le = "modulepreload",
  ie = function (e) {
    return "/" + e;
  },
  z = {},
  se = function (t, r, i) {
    if (!r || r.length === 0) return t();
    const o = document.getElementsByTagName("link");
    return Promise.all(
      r.map((s) => {
        if (((s = ie(s)), s in z)) return;
        z[s] = !0;
        const d = s.endsWith(".css"),
          W = d ? '[rel="stylesheet"]' : "";
        if (!!i)
          for (let b = o.length - 1; b >= 0; b--) {
            const n = o[b];
            if (n.href === s && (!d || n.rel === "stylesheet")) return;
          }
        else if (document.querySelector(`link[href="${s}"]${W}`)) return;
        const h = document.createElement("link");
        if (
          ((h.rel = d ? "stylesheet" : le),
          d || ((h.as = "script"), (h.crossOrigin = "")),
          (h.href = s),
          document.head.appendChild(h),
          d)
        )
          return new Promise((b, n) => {
            h.addEventListener("load", b),
              h.addEventListener("error", () =>
                n(new Error(`Unable to preload CSS for ${s}`))
              );
          });
      })
    )
      .then(() => t())
      .catch((s) => {
        const d = new Event("vite:preloadError", { cancelable: !0 });
        if (((d.payload = s), window.dispatchEvent(d), !d.defaultPrevented))
          throw s;
      });
  };
function U() {}
function J(e) {
  return e();
}
function D() {
  return Object.create(null);
}
function N(e) {
  e.forEach(J);
}
function K(e) {
  return typeof e == "function";
}
function ae(e, t) {
  return e != e
    ? t == t
    : e !== t || (e && typeof e == "object") || typeof e == "function";
}
function ce(e) {
  return Object.keys(e).length === 0;
}
function ue(e, t, r) {
  e.insertBefore(t, r || null);
}
function Q(e) {
  e.parentNode && e.parentNode.removeChild(e);
}
function fe(e) {
  return document.createElement(e);
}
function de(e, t, r) {
  r == null
    ? e.removeAttribute(t)
    : e.getAttribute(t) !== r && e.setAttribute(t, r);
}
function he(e) {
  return Array.from(e.childNodes);
}
let O;
function P(e) {
  O = e;
}
function pe() {
  if (!O) throw new Error("Function called outside component initialization");
  return O;
}
function me(e) {
  pe().$$.on_mount.push(e);
}
const I = [],
  H = [];
let A = [];
const X = [],
  ge = Promise.resolve();
let M = !1;
function ye() {
  M || ((M = !0), ge.then(G));
}
function Y(e) {
  A.push(e);
}
const V = new Set();
let k = 0;
function G() {
  if (k !== 0) return;
  const e = O;
  do {
    try {
      for (; k < I.length; ) {
        const t = I[k];
        k++, P(t), be(t.$$);
      }
    } catch (t) {
      throw ((I.length = 0), (k = 0), t);
    }
    for (P(null), I.length = 0, k = 0; H.length; ) H.pop()();
    for (let t = 0; t < A.length; t += 1) {
      const r = A[t];
      V.has(r) || (V.add(r), r());
    }
    A.length = 0;
  } while (I.length);
  for (; X.length; ) X.pop()();
  (M = !1), V.clear(), P(e);
}
function be(e) {
  if (e.fragment !== null) {
    e.update(), N(e.before_update);
    const t = e.dirty;
    (e.dirty = [-1]),
      e.fragment && e.fragment.p(e.ctx, t),
      e.after_update.forEach(Y);
  }
}
function _e(e) {
  const t = [],
    r = [];
  A.forEach((i) => (e.indexOf(i) === -1 ? t.push(i) : r.push(i))),
    r.forEach((i) => i()),
    (A = t);
}
const ve = new Set();
function we(e, t) {
  e && e.i && (ve.delete(e), e.i(t));
}
function We(e, t, r) {
  const { fragment: i, after_update: o } = e.$$;
  i && i.m(t, r),
    Y(() => {
      const s = e.$$.on_mount.map(J).filter(K);
      e.$$.on_destroy ? e.$$.on_destroy.push(...s) : N(s), (e.$$.on_mount = []);
    }),
    o.forEach(Y);
}
function xe(e, t) {
  const r = e.$$;
  r.fragment !== null &&
    (_e(r.after_update),
    N(r.on_destroy),
    r.fragment && r.fragment.d(t),
    (r.on_destroy = r.fragment = null),
    (r.ctx = []));
}
function Ee(e, t) {
  e.$$.dirty[0] === -1 && (I.push(e), ye(), e.$$.dirty.fill(0)),
    (e.$$.dirty[(t / 31) | 0] |= 1 << t % 31);
}
function $e(e, t, r, i, o, s, d = null, W = [-1]) {
  const w = O;
  P(e);
  const h = (e.$$ = {
    fragment: null,
    ctx: [],
    props: s,
    update: U,
    not_equal: o,
    bound: D(),
    on_mount: [],
    on_destroy: [],
    on_disconnect: [],
    before_update: [],
    after_update: [],
    context: new Map(t.context || (w ? w.$$.context : [])),
    callbacks: D(),
    dirty: W,
    skip_bound: !1,
    root: t.target || w.$$.root,
  });
  d && d(h.root);
  let b = !1;
  if (
    ((h.ctx = r
      ? r(e, t.props || {}, (n, f, ...m) => {
          const a = m.length ? m[0] : f;
          return (
            h.ctx &&
              o(h.ctx[n], (h.ctx[n] = a)) &&
              (!h.skip_bound && h.bound[n] && h.bound[n](a), b && Ee(e, n)),
            f
          );
        })
      : []),
    h.update(),
    (b = !0),
    N(h.before_update),
    (h.fragment = i ? i(h.ctx) : !1),
    t.target)
  ) {
    if (t.hydrate) {
      const n = he(t.target);
      h.fragment && h.fragment.l(n), n.forEach(Q);
    } else h.fragment && h.fragment.c();
    t.intro && we(e.$$.fragment), We(e, t.target, t.anchor), G();
  }
  P(w);
}
class Se {
  constructor() {
    B(this, "$$");
    B(this, "$$set");
  }
  $destroy() {
    xe(this, 1), (this.$destroy = U);
  }
  $on(t, r) {
    if (!K(r)) return U;
    const i = this.$$.callbacks[t] || (this.$$.callbacks[t] = []);
    return (
      i.push(r),
      () => {
        const o = i.indexOf(r);
        o !== -1 && i.splice(o, 1);
      }
    );
  }
  $set(t) {
    this.$$set &&
      !ce(t) &&
      ((this.$$.skip_bound = !0), this.$$set(t), (this.$$.skip_bound = !1));
  }
}
const ke = "4";
typeof window < "u" &&
  (window.__svelte || (window.__svelte = { v: new Set() })).v.add(ke);
var Z = {},
  j = {},
  R = 34,
  T = 10,
  F = 13;
function ee(e) {
  return new Function(
    "d",
    "return {" +
      e
        .map(function (t, r) {
          return JSON.stringify(t) + ": d[" + r + '] || ""';
        })
        .join(",") +
      "}"
  );
}
function Ie(e, t) {
  var r = ee(e);
  return function (i, o) {
    return t(r(i), o, e);
  };
}
function q(e) {
  var t = Object.create(null),
    r = [];
  return (
    e.forEach(function (i) {
      for (var o in i) o in t || r.push((t[o] = o));
    }),
    r
  );
}
function _(e, t) {
  var r = e + "",
    i = r.length;
  return i < t ? new Array(t - i + 1).join(0) + r : r;
}
function Ue(e) {
  return e < 0 ? "-" + _(-e, 6) : e > 9999 ? "+" + _(e, 6) : _(e, 4);
}
function Ae(e) {
  var t = e.getUTCHours(),
    r = e.getUTCMinutes(),
    i = e.getUTCSeconds(),
    o = e.getUTCMilliseconds();
  return isNaN(e)
    ? "Invalid Date"
    : Ue(e.getUTCFullYear()) +
        "-" +
        _(e.getUTCMonth() + 1, 2) +
        "-" +
        _(e.getUTCDate(), 2) +
        (o
          ? "T" + _(t, 2) + ":" + _(r, 2) + ":" + _(i, 2) + "." + _(o, 3) + "Z"
          : i
          ? "T" + _(t, 2) + ":" + _(r, 2) + ":" + _(i, 2) + "Z"
          : r || t
          ? "T" + _(t, 2) + ":" + _(r, 2) + "Z"
          : "");
}
function Le(e) {
  var t = new RegExp(
      '["' +
        e +
        `
\r]`
    ),
    r = e.charCodeAt(0);
  function i(n, f) {
    var m,
      a,
      p = o(n, function (c, y) {
        if (m) return m(c, y - 1);
        (a = c), (m = f ? Ie(c, f) : ee(c));
      });
    return (p.columns = a || []), p;
  }
  function o(n, f) {
    var m = [],
      a = n.length,
      p = 0,
      c = 0,
      y,
      v = a <= 0,
      x = !1;
    n.charCodeAt(a - 1) === T && --a, n.charCodeAt(a - 1) === F && --a;
    function $() {
      if (v) return j;
      if (x) return (x = !1), Z;
      var E,
        l = p,
        u;
      if (n.charCodeAt(l) === R) {
        for (; (p++ < a && n.charCodeAt(p) !== R) || n.charCodeAt(++p) === R; );
        return (
          (E = p) >= a
            ? (v = !0)
            : (u = n.charCodeAt(p++)) === T
            ? (x = !0)
            : u === F && ((x = !0), n.charCodeAt(p) === T && ++p),
          n.slice(l + 1, E - 1).replace(/""/g, '"')
        );
      }
      for (; p < a; ) {
        if ((u = n.charCodeAt((E = p++))) === T) x = !0;
        else if (u === F) (x = !0), n.charCodeAt(p) === T && ++p;
        else if (u !== r) continue;
        return n.slice(l, E);
      }
      return (v = !0), n.slice(l, a);
    }
    for (; (y = $()) !== j; ) {
      for (var S = []; y !== Z && y !== j; ) S.push(y), (y = $());
      (f && (S = f(S, c++)) == null) || m.push(S);
    }
    return m;
  }
  function s(n, f) {
    return n.map(function (m) {
      return f
        .map(function (a) {
          return b(m[a]);
        })
        .join(e);
    });
  }
  function d(n, f) {
    return (
      f == null && (f = q(n)),
      [f.map(b).join(e)].concat(s(n, f)).join(`
`)
    );
  }
  function W(n, f) {
    return (
      f == null && (f = q(n)),
      s(n, f).join(`
`)
    );
  }
  function w(n) {
    return n.map(h).join(`
`);
  }
  function h(n) {
    return n.map(b).join(e);
  }
  function b(n) {
    return n == null
      ? ""
      : n instanceof Date
      ? Ae(n)
      : t.test((n += ""))
      ? '"' + n.replace(/"/g, '""') + '"'
      : n;
  }
  return {
    parse: i,
    parseRows: o,
    format: d,
    formatBody: W,
    formatRows: w,
    formatRow: h,
    formatValue: b,
  };
}
var Te = Le(","),
  Ce = Te.parse;
function Pe(e) {
  if (!e.ok) throw new Error(e.status + " " + e.statusText);
  return e.text();
}
function Oe(e, t) {
  return fetch(e, t).then(Pe);
}
function Ne(e) {
  return function (t, r, i) {
    return (
      arguments.length === 2 &&
        typeof r == "function" &&
        ((i = r), (r = void 0)),
      Oe(t, r).then(function (o) {
        return e(o, i);
      })
    );
  };
}
var C = Ne(Ce);
function Be(e) {
  let t;
  return {
    c() {
      (t = fe("div")), de(t, "id", "plotly-div");
    },
    m(r, i) {
      ue(r, t, i);
    },
    p: U,
    i: U,
    o: U,
    d(r) {
      r && Q(t);
    },
  };
}
function Ve(e, t, r, i, o) {
  return t + ((e - i) * (r - t)) / (o - i);
}
function je(e) {
  let t = [],
    r = [],
    i = [],
    o,
    s,
    d = {},
    W = 0,
    w = 1;
  const h = Array.from({ length: 11 }, (f, m) => 1993 + m);
  function b(f, m) {
    return h.map((a) => {
      let p = n(a).filter((c) => c.SUWI2 >= f && c.SUWI2 <= m);
      return {
        x: p.map((c) => +c.X),
        y: p.map((c) => +c.Y),
        text: p.map(
          (c) =>
            `X: ${c.X}<br>Y: ${c.Y}<br>SUWI2: ${parseFloat(c.SUWI2).toFixed(5)}`
        ),
        mode: "markers",
        marker: {
          colorbar: {
            title: "SUWI2 Value",
            thickness: 10,
            len: 0.5,
            x: 1.65,
            y: 0.5,
            titleside: "right",
          },
          color: p.map((c) => +c.SUWI2),
          colorscale: [
            [0, "#fde725"],
            [0.2, "#5ec962"],
            [0.4, "#21918c"],
            [0.7, "#008B8B"],
            [0.9, "#3b528b"],
            [1, "#440154"],
          ],
          size: 8,
          opacity: 0.8,
        },
        visible: a === 1993,
        type: "scattergl",
        name: "SUWI2 VALUE",
      };
    });
  }
  function n(f) {
    if (d[f]) return d[f];
    let m, a;
    f < 1998 ? ((m = 1993), (a = 1998)) : ((m = 1998), (a = 2003));
    const p = d[m].map((c, y) => {
      const v = +d[m][y].SUWI2,
        x = +d[a][y].SUWI2,
        $ = Ve(f, v, x, m, a);
      return { X: c.X, Y: c.Y, SUWI2: $ };
    });
    return (d[f] = p), p;
  }
  return (
    me(async () => {
      (s = (await se(() => import("plotly.js-dist/plotly.js"), [])).default),
        (d[1993] = await C("/df_1993_WITH_MEAN.csv")),
        (d[1998] = await C("/df_1998_WITH_MEAN.csv")),
        (d[2003] = await C("/df_2003_WITH_MEAN.csv")),
        (r = await C("/Study_area_polygon.csv")),
        (i = await C("/WellStatic_df.csv"));
      const f = Array.from({ length: 11 }, (l, u) => 1993 + u),
        m = {
          x: r.map((l) => +l.X),
          y: r.map((l) => +l.Y),
          mode: "lines",
          line: { color: "black", width: 2 },
          type: "scattergl",
          name: "Study Area Boundary",
        },
        a = i.filter((l) => l.WELL.trim() !== "");
      a.map((l) => +l.x_b4_b5), a.map((l) => +l.y_b4_b5), a.map((l) => l.WELL);
      const p = a.map((l) => ({
        x: [+l.x_b4_b5],
        y: [+l.y_b4_b5],
        text: l.WELL,
        mode: "markers+text",
        type: "scattergl",
        marker: { color: "black", size: 8 },
        textposition: "top right",
        name: l.WELL,
        visible: !0,
      }));
      let c = !0,
        y = Array(a.length).fill(!0),
        v = [
          { label: "Hide/Show All", visible: c },
          ...a.map((l) => ({ label: l.WELL, visible: !0 })),
        ];
      console.log(v);
      function x() {
        (c = !c), (v[0].visible = c);
        for (let u = 1; u < v.length; u++) v[u].visible = c;
        c ? y.fill(!0) : y.fill(!1);
        const l = p.map((u, g) => ({
          ...u,
          visible: y[g] ? !0 : "legendonly",
        }));
        console.log(l),
          (t = [...b(W, w), m, ...l]),
          s.react("plotly-div", t, {
            ...o,
            updatemenus: [
              {
                x: 1.1,
                y: 1.05,
                showactive: !1,
                buttons: [
                  {
                    label: c ? "Hide Wells" : "Show Wells",
                    method: "relayout",
                    args: [{ toggleWells: null }],
                  },
                  ...a.map((u, g) => ({
                    label: (y[g] ? "* " : "") + u.WELL,
                    method: "relayout",
                    args: [{ toggleWellVisibility: g }],
                  })),
                ],
              },
            ],
          });
      }
      function $(l) {
        (v[l + 1].visible = !v[l + 1].visible),
          (y[l] = !y[l]),
          t.forEach((u, g) => {
            g >= t.length - p.length &&
              (u.visible = y[g - (t.length - p.length)] ? !0 : "legendonly");
          }),
          s.react("plotly-div", t, {
            ...o,
            updatemenus: [
              {
                x: 1.1,
                y: 1.05,
                showactive: !1,
                buttons: [
                  {
                    label: c ? "Hide Wells" : "Show Wells",
                    method: "relayout",
                    args: [{ toggleWells: null }],
                  },
                  ...a.map((u, g) => ({
                    label: (y[g] ? "✔ " : "") + u.WELL,
                    method: "relayout",
                    args: ["toggleWellVisibility", g],
                  })),
                ],
              },
            ],
          });
      }
      (t = [...b(W, w), m, ...p]),
        (o = {
          b: 150,
          r: 450,
          autosize: !1,
          width: 1500,
          height: 900,
          minSUWI2: 0,
          maxSUWI2: 1,
          title: "Dynamic Saturation Map",
          hovermode: "closest",
          updatemenus: [
            {
              x: 1.1,
              y: 1.05,
              showactive: !1,
              buttons: [
                {
                  label: c ? "Hide Wells" : "Show Wells",
                  method: "relayout",
                  args: [{ toggleWells: null }],
                },
                ...a.map((l, u) => ({
                  label: (v[u + 1].visible ? "✔ " : "") + l.WELL,
                  method: "relayout",
                  args: [{ toggleWellVisibility: u }],
                })),
              ],
            },
          ],
          xaxis: {
            title: "Easting",
            showspikes: !0,
            spikemode: "across",
            spikesnap: "cursor",
            spikecolor: "#333",
            spikethickness: 1,
            dtick: 1e3,
            range: [3273e3, 3286e3],
          },
          yaxis: { title: "Northing", dtick: 1e3 },
          sliders: [
            {
              x: 0.05,
              y: -0.08,
              active: 0,
              yanchor: "top",
              xanchor: "left",
              len: 1,
              currentvalue: {
                font: { size: 20 },
                prefix: "Year:",
                visible: !0,
                xanchor: "center",
              },
              steps: f.map((l, u) => {
                const g = d[l];
                return {
                  label: l.toString(),
                  method: "update",
                  args: [
                    {
                      marker: {
                        color: g.map((L) => +L.SUWI2),
                        colorscale: [
                          [0, "#fde725"],
                          [0.2, "#5ec962"],
                          [0.4, "#21918c"],
                          [0.7, "#008B8B"],
                          [0.9, "#3b528b"],
                          [1, "#440154"],
                        ],
                        size: 8,
                        opacity: 0.8,
                      },
                    },
                    { traces: [...Array(11).keys()] },
                  ],
                  execute: !0,
                };
              }),
            },
            {
              x: 1.3,
              y: 0.6,
              pad: { t: 80 },
              len: 0.25,
              currentvalue: {
                font: { size: 16 },
                prefix: "Min SUWI2:",
                visible: !0,
                xanchor: "center",
              },
              steps: Array.from({ length: 11 }, (l, u) => {
                const g = u * 0.1;
                return {
                  label: g.toFixed(2),
                  method: "relayout",
                  args: ["suwi2Threshold", g],
                };
              }),
            },
            {
              x: 1.3,
              y: 0.9,
              active: 10,
              pad: { t: 60 },
              len: 0.25,
              currentvalue: {
                font: { size: 16 },
                prefix: "Max SUWI2: ",
                visible: !0,
                xanchor: "center",
              },
              steps: Array.from({ length: 11 }, (l, u) => {
                const g = u * 0.1;
                return {
                  label: g.toFixed(2),
                  method: "relayout",
                  args: ["maxSUWI2Threshold", g],
                };
              }),
            },
          ],
        });
      const S = { displaylogo: !1 };
      if ((s.newPlot("plotly-div", t, o, S), s.relayout === void 0)) return;
      let E = document.getElementById("plotly-div");
      E &&
        E.on("plotly_relayout", function (l) {
          console.log(l), console.log("event tirggered");
          let u = !1;
          if (
            (l.hasOwnProperty("suwi2Threshold") &&
              ((W = l.suwi2Threshold), (u = !0)),
            l.hasOwnProperty("maxSUWI2Threshold") &&
              ((w = l.maxSUWI2Threshold), (u = !0)),
            u)
          ) {
            const g = b(W, w),
              L = p.map((te, re) => ({
                ...te,
                visible: y[re] ? !0 : "legendonly",
              }));
            (t = [...g, m, ...L]), s.react("plotly-div", t, o);
          }
          if (
            (l.hasOwnProperty("toggleWells") &&
              (console.log("toggleWells"), x()),
            l.hasOwnProperty("toggleWellVisibility"))
          ) {
            console.log("toggleWellVisibility");
            const g = l.toggleWellVisibility;
            $(g);
          }
        });
    }),
    []
  );
}
class Re extends Se {
  constructor(t) {
    super(), $e(this, t, je, Be, ae, {});
  }
}
new Re({ target: document.getElementById("app") });
