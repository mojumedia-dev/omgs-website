/* Renders data files into pages. Board members: you should not need to edit this file. */
(function(){
function $(s,r){return (r||document).querySelector(s)}
function esc(t){return String(t==null?"":t).replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
function tbd(t){return esc(t).replace(/\s*\[(TBD[^\]]*|TBA)\]/g,' <span class="soon">Coming soon</span>')}
var MON=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],DOW=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
function pd(s){var p=s.split("-");return new Date(+p[0],p[1]-1,+p[2])}
function fmt(e){if(!e.date)return tbd(e.label||"[TBD]");var d=pd(e.date),s=DOW[d.getDay()]+", "+MON[d.getMonth()]+" "+d.getDate();
 if(e.end){var x=pd(e.end);s+=" to "+MON[x.getMonth()]+" "+x.getDate()}return s+", "+d.getFullYear()}
function ics(e){var D=function(s){return s.replace(/-/g,"")},L=["BEGIN:VCALENDAR","VERSION:2.0","PRODID:-//OMGS//Site//EN","BEGIN:VEVENT","UID:"+D(e.date)+"-"+e.title.replace(/\W+/g,"").slice(0,30)+"@omgsoftball.org"];
 if(e.time){var t=e.time.split("-");L.push("DTSTART:"+D(e.date)+"T"+t[0].replace(":","")+"00","DTEND:"+D(e.date)+"T"+t[1].replace(":","")+"00")}
 else{var x=pd(e.end||e.date);x.setDate(x.getDate()+1);var n=x.getFullYear()+String(x.getMonth()+1).padStart(2,"0")+String(x.getDate()).padStart(2,"0");L.push("DTSTART;VALUE=DATE:"+D(e.date),"DTEND;VALUE=DATE:"+n)}
 L.push("SUMMARY:OMGS: "+e.title);if(e.details)L.push("DESCRIPTION:"+e.details.replace(/[,;]/g,"\\$&"));if(e.where)L.push("LOCATION:"+e.where.replace(/[,;]/g,"\\$&"));
 L.push("END:VEVENT","END:VCALENDAR");return "data:text/calendar;charset=utf-8,"+encodeURIComponent(L.join("\r\n"))}
function evRows(list,limit){return list.slice(0,limit||999).map(function(e){return '<li class="ev"><div class="ev-date">'+fmt(e)+'</div><div class="ev-body"><strong>'+tbd(e.title)+'</strong>'+
 (e.details?'<div>'+tbd(e.details)+'</div>':'')+(e.where?'<div class="muted">'+esc(e.where)+'</div>':'')+
 (e.date?'<a class="ics" download="omgs-event.ics" href="'+ics(e)+'">+ Add to calendar</a>':'')+'</div></li>'}).join("")}
document.addEventListener("DOMContentLoaded",function(){
 // Announcement
 var A=window.OMGS_ANNOUNCEMENT,box=$("#announce");if(box)setTimeout(function(){box.classList.remove("pending")},0);
 if(box&&typeof OMGS_ANNOUNCEMENT!=="undefined"&&OMGS_ANNOUNCEMENT.enabled){A=OMGS_ANNOUNCEMENT;var k="omgs-dismiss-"+A.id;
  try{if(localStorage.getItem(k))A=null}catch(e){}
  if(A&&!box.querySelector(".announce")){box.innerHTML='<div class="announce"><div class="wrap"><span>'+esc(A.text)+(A.linkUrl?' <a href="'+esc(A.linkUrl)+'">'+esc(A.linkText||"More")+'</a>':'')+'</span><button aria-label="Dismiss announcement">&times;</button></div></div>';
  }if(A&&box.querySelector("button")){box.querySelector("button").onclick=function(){box.innerHTML="";box.classList.remove("pending");try{localStorage.setItem(k,1)}catch(e){}}}}
 // Field status
 document.querySelectorAll("[data-field-status]").forEach(function(el){if(typeof OMGS_FIELD_STATUS==="undefined")return;var F=OMGS_FIELD_STATUS;
  el.innerHTML='<p class="updated">Updated: '+(F.updated?'<strong>'+esc(F.updated)+'</strong>':'<span class="soon">Coming soon for the 2027 season</span>')+'</p>'+(F.note?'<p class="note">'+esc(F.note)+'</p>':'')+
  '<ul class="fs">'+F.fields.map(function(f){var s=/^(open|closed)$/i.test(f.status)?f.status.toLowerCase():"pending";return '<li><span>'+esc(f.name)+'</span><span class="pill '+s+'">'+(s=="pending"?"Pending":esc(f.status))+'</span></li>'}).join("")+'</ul>'});
 // Dates
 if(typeof OMGS_DATES!=="undefined"){var U=OMGS_DATES.upcoming,R=OMGS_DATES.reference;
  document.querySelectorAll("[data-dates]").forEach(function(el){var lim=+el.getAttribute("data-limit")||0;
   var hT=el.closest('.panel,.ops-card')?'h3':'h2';el.innerHTML='<'+hT+'>'+esc(U.name)+'</'+hT+'>'+(U.note?'<p>'+tbd(U.note)+'</p>':'')+'<ul class="evs">'+evRows(U.events)+'</ul><'+hT+'>'+esc(R.name)+'</'+hT+'><ul class="evs">'+evRows(R.events,lim)+'</ul>'+(lim?'<p><a href="dates.html">See all dates &rarr;</a></p>':'')})}
 // News
 document.querySelectorAll("[data-news]").forEach(function(el){if(typeof OMGS_NEWS==="undefined"||!OMGS_NEWS.length){el.closest("section").style.display="none";return}
  el.innerHTML=OMGS_NEWS.map(function(n){return '<div class="card"><div class="muted">'+esc(n.date)+'</div><h3>'+esc(n.title)+'</h3><p>'+esc(n.text)+'</p></div>'}).join("")});
 // Sponsors
 document.querySelectorAll("[data-sponsors]").forEach(function(el){if(typeof OMGS_SPONSORS==="undefined")return;
  el.innerHTML=OMGS_SPONSORS.map(function(s){var inner=s.logo?'<img src="'+esc(s.logo)+'" alt="'+esc(s.name)+(s.url?' (opens in a new tab)':'')+'" width="161" height="85" loading="lazy">':'<span class="sp-name">'+esc(s.name)+'</span>';
   return s.url?'<a class="sponsor" href="'+esc(s.url)+'" target="_blank" rel="noopener" title="'+esc(s.name)+'">'+inner+'</a>':'<div class="sponsor">'+inner+'</div>'}).join("")+'<div class="sponsor empty">Your logo here</div>'});
 // Division finder (Fall 2026 / Spring 2027 age chart: Sep-Dec of year Y-1 and Jan-Aug of Y share an age)
 var f=$("#divfinder");if(f){f.addEventListener("submit",function(ev){ev.preventDefault();var y=+f.year.value,m=+f.month.value,o=$("#divresult");
  if(!y||!m){o.innerHTML="Pick a birth month and year.";return}var age=2026-(m>=9?y+1:y),d;
  if(age>=3&&age<=5)d="T-Ball/6U";else if(age>=6&&age<=8)d="8U";else if(age<=10&&age>8)d="10U";else if(age<=12&&age>10)d="12U";else if(age<=14&&age>12)d="14U";else if(age<=18&&age>14)d="18U";
  o.innerHTML=d?'Chart age <strong>'+age+'</strong>: <strong class="big">'+d+'</strong>':(age<3?'OMGS starts at age 3. Check back when she is a little older.':'Older than the age chart covers (18U is the top division).')})}

 // Stats
 document.querySelectorAll("[data-stats]").forEach(function(el){if(typeof OMGS_STATS==="undefined")return;
  el.innerHTML=OMGS_STATS.map(function(s){return '<div class="stat"><div class="num">'+(/TBD/.test(s.num)?'<span class="tbd-num">TBD</span>':esc(s.num))+'</div><div class="lbl">'+esc(s.label)+'</div></div>'}).join("")});
 // Home calendar tiles
 document.querySelectorAll("[data-date-tiles]").forEach(function(el){if(typeof OMGS_DATES==="undefined")return;var lim=+el.getAttribute("data-limit")||4,U=OMGS_DATES.upcoming,R=OMGS_DATES.reference;
  var row=function(e,tag){var t=e.date?(function(d){return '<div class="d">'+d.getDate()+'</div><div class="m">'+MON[d.getMonth()]+'</div>'})(pd(e.date)):'<div class="d">&#9733;</div><div class="m">Soon</div>';
   return '<div class="date-row"><div class="date-tile">'+t+'</div><div><div class="ev-title">'+tbd(e.title)+'</div><div class="ev-sub">'+(e.date?fmt(e):tbd(e.label||""))+(e.date?' &middot; <a class="ics" download="omgs-event.ics" href="'+ics(e)+'">Add to calendar</a>':'')+'</div></div><div class="ev-tag">'+tag+'</div></div>'};
  el.innerHTML='<div class="sub-eyebrow">'+esc(U.name)+'</div>'+U.events.map(function(e){return row(e,"2027")}).join("")+'<div class="sub-eyebrow">'+esc(R.name)+'</div>'+R.events.filter(function(e){return e.date}).slice(0,lim).map(function(e){return row(e,"2026")}).join("")});
 // Search
 var q=$("#q");if(q&&typeof OMGS_SEARCH!=="undefined"){var out=$("#results"),go=function(){var v=q.value.trim().toLowerCase();if(v.length<2){out.innerHTML="";return}
  var w=v.split(/\s+/),hits=OMGS_SEARCH.filter(function(r){var t=r.text.toLowerCase();return w.every(function(x){return t.indexOf(x)>-1})});
  out.innerHTML=hits.length?hits.slice(0,30).map(function(r){var t=r.text,i=t.toLowerCase().indexOf(w[0]);return '<li><a href="'+r.url+'">'+esc(r.page)+(r.head?': '+esc(r.head):'')+'</a><div class="muted">'+esc(t.slice(Math.max(0,i-60),i+120))+'&hellip;</div></li>'}).join(""):'<li>No matches. Try fewer words.</li>'};
  q.addEventListener("input",go);var p=new URLSearchParams(location.search).get("q");if(p){q.value=p;go()}}
 // FAQ filter + expand all
 var ff=$("#faqfilter");if(ff){ff.addEventListener("input",function(){var v=ff.value.toLowerCase();document.querySelectorAll(".faq details").forEach(function(d){var m=d.textContent.toLowerCase().indexOf(v)>-1;d.style.display=m?"":"none";if(v&&m)d.open=true})})}
 var ex=$("#expandall");if(ex)ex.onclick=function(){var ds=document.querySelectorAll(".faq details"),o=![].some.call(ds,function(d){return d.open});ds.forEach(function(d){d.open=o});ex.textContent=o?"Collapse all":"Expand all"};
});})();
/* open a division-rules accordion when linked by #anchor */
(function(){function o(){var h=location.hash.slice(1);if(!h)return;var d=document.getElementById(h);if(d&&d.tagName==="DETAILS"){d.open=true;d.scrollIntoView()}}window.addEventListener("hashchange",o);document.addEventListener("DOMContentLoaded",o)})();
