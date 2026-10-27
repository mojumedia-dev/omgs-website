/* ===== OMGS SITE CONFIG: edit here only =====
   REGISTRATION_URL: every "Register" button on the site points here.
   LOGIN_URL: every "Log In" link points here.
   Moving to PlayMetrics? Paste the new URLs below and you're done. */
const OMGS_CONFIG = {
  REGISTRATION_URL: "https://app.playmetrics.com/signup?clubToken=TG9naW4tQ2x1Yi52MS00MDM2LTE3OTgzMTY0NzF8SndCcS80SldRNVRwQzlHSU1Sc1NGUitYaUJCdEg1V09BZ1lPTVRtaGZDRT0=",
  LOGIN_URL: "https://app.playmetrics.com/signup?clubToken=TG9naW4tQ2x1Yi52MS00MDM2LTE3OTgzMTY0NzF8SndCcS80SldRNVRwQzlHSU1Sc1NGUitYaUJCdEg1V09BZ1lPTVRtaGZDRT0=",
  // PRACTICE_SIGNUP_URL: leave "" to hide the button. The sheet lists coach names, so only
  // set this to a page that is safe to share publicly.
  PRACTICE_SIGNUP_URL: "",
  // EQUIPMENT HIGHLIGHT (homepage callout linking to equipment.html during registration season).
  // "auto" = show only during the month window below; true = always show; false = never show.
  SHOW_EQUIPMENT_HIGHLIGHT: "auto",
  // Months are 1-12. Window can wrap the new year (Nov=11 through Feb=2 covers spring reg season).
  EQUIPMENT_HIGHLIGHT_START_MONTH: 11,
  EQUIPMENT_HIGHLIGHT_END_MONTH: 2
};
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll("a.js-register").forEach(function (a) {
    a.href = OMGS_CONFIG.REGISTRATION_URL; a.target = "_blank"; a.rel = "noopener";
  });
  document.querySelectorAll("a.js-login").forEach(function (a) {
    a.href = OMGS_CONFIG.LOGIN_URL; a.target = "_blank"; a.rel = "noopener";
  });
  if (OMGS_CONFIG.PRACTICE_SIGNUP_URL) document.querySelectorAll(".js-practice-signup").forEach(function (p) {
    var a = p.querySelector("a"); if (a) a.href = OMGS_CONFIG.PRACTICE_SIGNUP_URL; p.hidden = false;
  });
  (function () {
    var el = document.getElementById("equipHighlight"); if (!el) return;
    var f = OMGS_CONFIG.SHOW_EQUIPMENT_HIGHLIGHT, on = f === true;
    if (f === "auto") { var m = new Date().getMonth() + 1, s = OMGS_CONFIG.EQUIPMENT_HIGHLIGHT_START_MONTH, e = OMGS_CONFIG.EQUIPMENT_HIGHLIGHT_END_MONTH;
      on = s <= e ? (m >= s && m <= e) : (m >= s || m <= e); }
    el.hidden = !on;
  })();
  // Mobile menu: scroll lock, Close label, Escape, focus trap
  var t = document.querySelector(".nav-toggle"), n = document.querySelector(".site-nav"), H = document.querySelector(".site-header");
  function setMenu(o, focusToggle) {
    if (!t || !n) return;
    n.classList.toggle("open", o); t.setAttribute("aria-expanded", o ? "true" : "false");
    t.textContent = o ? "Close" : "Menu"; t.setAttribute("aria-label", o ? "Close menu" : "Open menu");
    document.documentElement.classList.toggle("menu-open", o);
    fitMenu();
    if (o) { var f = n.querySelector("a,button"); if (f) f.focus(); } else if (focusToggle) t.focus();
  }
  function fitMenu() { if (!n) return; if (!n.classList.contains("open")) { n.style.maxHeight = ""; return; } var top = Math.max(0, n.getBoundingClientRect().top); n.style.maxHeight = Math.max(160, window.innerHeight - top) + "px"; }
  function menuOpen() { return n && n.classList.contains("open") && getComputedStyle(t).display !== "none"; }
  if (t && n) {
    t.addEventListener("click", function () { setMenu(!n.classList.contains("open")); });
    if (location.hash === "#menu") setMenu(true);
    document.addEventListener("keydown", function (e) {
      if (!menuOpen()) return;
      if (e.key === "Escape") { setMenu(false, true); return; }
      if (e.key === "Tab") {
        var items = [t].concat([].slice.call(n.querySelectorAll("a,button"))).filter(function (x) { return x.offsetParent !== null; });
        var first = items[0], last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
    window.addEventListener("resize", function () { fitMenu(); if (n.classList.contains("open") && getComputedStyle(t).display === "none") setMenu(false); });
  }
  // Desktop dropdowns: click / keyboard (hover is CSS)
  var btns = [].slice.call(document.querySelectorAll(".sub-toggle"));
  function closeAll(except) { btns.forEach(function (b) { if (b !== except) b.setAttribute("aria-expanded", "false"); }); }
  btns.forEach(function (b) {
    var li = b.parentNode;
    b.addEventListener("click", function (e) {
      e.stopPropagation();
      var open = b.getAttribute("aria-expanded") === "true";
      li.classList.remove("esc-closed"); closeAll(b); b.setAttribute("aria-expanded", open ? "false" : "true");
    });
    b.addEventListener("keydown", function (e) {
      if (e.key === "ArrowDown") { e.preventDefault(); b.setAttribute("aria-expanded", "true"); var f = li.querySelector(".sub a"); if (f) f.focus(); }
    });
    li.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !menuOpen()) { b.setAttribute("aria-expanded", "false"); li.classList.add("esc-closed"); b.focus(); }
    });
    li.addEventListener("mouseleave", function () { li.classList.remove("esc-closed"); });
    li.addEventListener("focusout", function (e) { if (!li.contains(e.relatedTarget)) b.setAttribute("aria-expanded", "false"); });
  });
  document.addEventListener("click", function () { closeAll(null); });
});
