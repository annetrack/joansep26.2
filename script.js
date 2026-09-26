/*
=========================================================
VOICEWORK — JAVASCRIPT GUIDE
=========================================================
01. CTA URL / global settings
02. Video carousel / modal
03. Booking modal
04. FAQ / interactions
05. Navigation active state
06. Cursor flashlight / atmosphere

Client editing tip:
- Update the Calendly URL only in Voicework_CTA_URL below.
- Keep feature scripts grouped by function.
=========================================================
*/

/* ---------- 01. GLOBAL SETTINGS ---------- */
const Voicework_CTA_URL = "https://calendly.com/voicework-audioeditingservice/30min";



const vids=[['BhdUNiINAOA','Repurposed Content Sample'],['dN7tqAdqzBM','Video Podcast Sample'],['Bt91ASkNs5s','Short-Form Video Sample'],['ZYPE3QcqPdg','Podcast Episode Sample'],['UA7_jENtQ_g','Podcast Episode Sample']];
const sets=document.querySelectorAll('.set');
const cards=vids.map(([id,title])=>`<a class="video" href="https://www.youtube.com/watch?v=${id}" target="_blank" rel="noopener" aria-label="Watch ${title} on YouTube"><img src="https://i.ytimg.com/vi/${id}/hqdefault.jpg" alt="${title}" loading="lazy"><span class="video-overlay"></span><span class="video-label">${title}</span><span class="vw-commentary ">Watch sample ↗</span></a>`).join('');
sets.forEach(s=>s.innerHTML=cards);
document.addEventListener('pointermove',e=>{document.documentElement.style.setProperty('--mx',e.clientX+'px');document.documentElement.style.setProperty('--my',e.clientY+'px')});
function stage(el,t){document.querySelectorAll('.stage').forEach(x=>x.classList.remove('active'));el.classList.add('active');document.getElementById('detail').textContent=t}
const ep=document.getElementById('ep'),ln=document.getElementById('ln');
function calc(){let e=+ep.value,l=+ln.value,d=Math.round(e*l/60*8),c=e;document.getElementById('eo').textContent=e;document.getElementById('lo').textContent=l+' min';document.getElementById('diy').textContent=d+' hrs / mo';document.getElementById('cl').textContent=c+' hrs / mo';document.getElementById('sv').textContent=Math.max(0,d-c)+' hrs / mo'}
ep.oninput=ln.oninput=calc;calc();function booking(){document.getElementById('bm').classList.add('on');document.body.style.overflow='hidden'}function closeBooking(){document.getElementById('bm').classList.remove('on');document.body.style.overflow=''}function faq(b){let x=b.parentElement;document.querySelectorAll('.faqitem').forEach(i=>{if(i!==x)i.classList.remove('open')});x.classList.toggle('open');b.querySelector('span').textContent=x.classList.contains('open')?'⌃':'⌄'}document.addEventListener('pointermove',e=>{document.documentElement.style.setProperty('--mx',e.clientX+'px');document.documentElement.style.setProperty('--my',e.clientY+'px')});document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeVideo();closeBooking()}});

/* Primary CTA controller — the single editable URL is Voicework_CTA_URL at the top of <body>. */
document.addEventListener("DOMContentLoaded",function(){
  document.querySelectorAll("a.primary-cta").forEach(function(link){
    link.href=Voicework_CTA_URL;
    link.target="_blank";
    link.rel="noopener";
  });
});

(function(){
  const links = Array.from(document.querySelectorAll('.links a[href^="#"]'));
  if(!links.length) return;

  const sections = links
    .map(link => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  function setActive(id){
    links.forEach(link => {
      const isActive = link.getAttribute('href') === '#' + id;
      link.classList.toggle('active', isActive);
      if(isActive) link.setAttribute('aria-current','page');
      else link.removeAttribute('aria-current');
    });
  }

  // Clear active state when the user is at the top/hero.
  function updateActive(){
    const scrollY = window.scrollY + 140;
    let current = null;

    sections.forEach(section => {
      if(section.offsetTop <= scrollY) current = section;
    });

    if(current) setActive(current.id);
    else links.forEach(link => {
      link.classList.remove('active');
      link.removeAttribute('aria-current');
    });
  }

  let ticking = false;
  window.addEventListener('scroll', function(){
    if(!ticking){
      window.requestAnimationFrame(function(){
        updateActive();
        ticking = false;
      });
      ticking = true;
    }
  }, {passive:true});

  updateActive();
})();

(function(){
  const light = document.createElement('div');
  light.id = 'voicework-cursor-light';
  document.body.appendChild(light);

  let raf = null, x = innerWidth/2, y = innerHeight/2;

  function render(){
    light.style.left = x + 'px';
    light.style.top = y + 'px';
    document.documentElement.style.setProperty('--cursor-x', x + 'px');
    document.documentElement.style.setProperty('--cursor-y', y + 'px');
    raf = null;
  }

  addEventListener('mousemove', e => {
    x = e.clientX; y = e.clientY;
    light.classList.add('is-visible');
    if(!raf) raf = requestAnimationFrame(render);
  }, {passive:true});

  document.addEventListener('mouseleave', () => light.classList.remove('is-visible'));
})();
