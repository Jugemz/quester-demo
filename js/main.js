(function() {
    try {
        var g = typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
        g["__faroBundleId_Speechify Chrome Extension"] = "13.5.0"
    } catch (l) {}
}
)();
import {Af as F, Cb as h, Ee as N, H as A, If as k, Jf as w, K as b, Ke as L, Kf as B, Lf as g, Mf as T, Pf as V, Ya as S, ab as D, hc as P, mc as d, og as M, pg as a, qg as u, rg as x, sg as W, uf as C, zb as c} from "./chunk-45P363HL.js";
import {p as R} from "./chunk-PHKPF343.js";
import "./chunk-24ZZP5UQ.js";
import "./chunk-GQY3J744.js";
import {M as p} from "./chunk-SSUXX3HE.js";
import "./chunk-ASZMUWWE.js";
import "./chunk-4XRFE7WB.js";
import "./chunk-W2MHNT3D.js";
import {f as i, g as m, n as l} from "./chunk-CLPINNGF.js";
l();
m();
l();
m();
var Y = 2e3;
async function j() {
    let t = R();
    if (N()) {
        await c.forceManageInitPillPlayer(!t),
        t || await h(Y);
        return
    }
    t || (await c.toggleFeatureOnDomain("pill-player", !0),
    await h(Y))
}
i.runtime.onMessage.addListener(t => {
    t.type === "SHOW_MEETING_NOTES_TOAST" && t.url && import("./MeetingNotesReadyToast-UEQC5DEY.js").then( ({showMeetingNotesReadyToast: e}) => {
        e(t.url)
    }
    )
}
);
async function q() {
    Q(),
    J(),
    H();
    let[t,e] = await Promise.all([F(), k()])
      , o = C();
    $().catch( () => {}
    ),
    w.setCleanupFn( () => {
        t(),
        e(),
        o()
    }
    )
}
var O, z = [{
    domain: "wattpad.com",
    check: (t, e) => {
        let o = parseInt(t.match(/[0-9]+/)?.[0] ?? "")
          , n = parseInt(e.match(/[0-9]+/)?.[0] ?? "");
        return o === n
    }
}, {
    domain: "mail.google.com",
    check: (t, e) => {
        let o = new URL(t)
          , r = new URL(e).hash.split(/\/|\?/)[1] ?? ""
          , s = o.hash.split(/\/|\?/)[1] ?? "";
        return !!(s.endsWith("=new") || s === r)
    }
}, {
    domain: "x.com",
    check: (t, e) => e.includes("/compose/post") || t.includes("/compose/post")
}];
S(async (t, e) => {
    t === e || (H(),
    M()) || a(t, e, "chat.deepseek.com") || a(t, e, "www.perplexity.ai") || a(t, e, "www.perplexity.ai", "/search/new") || a(t, e, "chat.openai.com") || a(t, e, "chatgpt.com") || ((u(t, e, "chat.openai.com") || u(t, e, "chatgpt.com") || u(t, e, "chat.deepseek.com")) && w.setIsResetFromRoot(!0),
    x(t, e)) || z.some(n => window.location.href.includes(n.domain) && n.check(t ?? "", e ?? "")) || (O && (clearTimeout(O),
    cancelAnimationFrame(O)),
    B())
}
);
var _ = !1;
function J() {
    T("/browser-action", async () => {
        _ || (_ = !0,
        await L() || await j(),
        d("extension_browser_action_clicked", {}),
        g.getIsHidden() ? g.showExtension() : (await p("browser-action", {
            isFromExtensionIconClick: !0
        }),
        await c.toggleFeatureOnDomain("side-player", !0),
        (window.getSelection()?.toString() ?? "").length > 0 && P.play()),
        _ = !1)
    }
    ),
    T("/health-check", async (t, e) => {
        e.body.healthCheck = !0
    }
    )
}
async function Q() {
    await D();
    let t = document.createElement("div");
    t.style.fontFamily = "system-ui",
    t.style.visibility = "hidden",
    t.innerHTML = "asd",
    document.body.appendChild(t),
    setTimeout( () => t?.remove(), 0)
}
var y = "adobe_extension_detected"
  , f = "adobe_extension_last_check"
  , Z = 24 * 60 * 60 * 1e3;
async function $() {
    try {
        let[t,e] = await Promise.all([b(), V("ceAdobeExtensionProbe")]);
        if (!A(t) || !e)
            return;
        let o = await i.storage.local.get([f, y])
          , n = o[f];
        if (n && Date.now() - n < Z)
            return;
        let r = await new Promise(I => {
            let E = new Image;
            E.onload = () => I(!0),
            E.onerror = () => I(!1),
            E.src = e
        }
        )
          , s = o[y];
        if (s !== void 0 && s === r) {
            await i.storage.local.set({
                [f]: Date.now()
            });
            return
        }
        await i.storage.local.set({
            [f]: Date.now(),
            [y]: r
        }),
        d("extension_adobe_extension_detected", {
            detected: r
        }).catch( () => {}
        )
    } catch {}
}
function H() {
    if (W()) {
        let e = window.location.hostname.split(".")
          , o = e.length > 2 ? e.slice(0, -2).join(".") : "root";
        d("extension_adobe_domain_visited", {
            subdomain: o
        }).catch( () => {}
        )
    }
}
var v = () => {
    i.runtime.connect().onDisconnect.addListener(async () => {
        setTimeout( () => {
            !!i.runtime?.id || p("destroy")
        }
        , 1e3)
    }
    )
}
;
q();
v();
//# sourceMappingURL=main.js.map
