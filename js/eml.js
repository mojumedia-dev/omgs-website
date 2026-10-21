/* Builds email and phone links at load time so addresses are not in the page source. */
(function(){function d(v){try{return atob(v).split("").reverse().join("")}catch(e){return""}}
function run(){document.querySelectorAll("a.eml[data-u]").forEach(function(a){var u=d(a.dataset.u),h=d(a.dataset.d);if(!u||!h)return;var m=u+"@"+h;a.href="mailto:"+m+(a.dataset.q?"?"+a.dataset.q:"");var t=a.querySelector(".eml-t");if(t)t.textContent=m});
document.querySelectorAll("a.tel[data-p]").forEach(function(a){var p=d(a.dataset.p);if(!p)return;a.href="tel:"+p;var t=a.querySelector(".tel-t");if(t)t.textContent=p})}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",run);else run()})();
