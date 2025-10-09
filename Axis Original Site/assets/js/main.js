
(() => {
  const els = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries,obs)=>{
    entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); obs.unobserve(e.target); }});
  },{threshold:.15});
  els.forEach(el=>io.observe(el));
  document.addEventListener('click', e=>{
    const a=e.target.closest('a[href^="#"]'); if(!a) return;
    const id=a.getAttribute('href').slice(1), t=document.getElementById(id);
    if(t){ e.preventDefault(); window.scrollTo({top:t.getBoundingClientRect().top+scrollY-70, behavior:'smooth'}); }
  });
  const y=document.getElementById('year'); if(y) y.textContent=new Date().getFullYear();
})();


// Mobile nav toggle (accessible, slide-in + backdrop)
(function(){
  document.documentElement.classList.add('nav-ready');
  var btn = document.querySelector('.nav-toggle');
  var nav = document.getElementById('primary-nav');
  var backdrop = document.querySelector('.nav-backdrop');
  if(!btn || !nav || !backdrop) return;

  function setOpen(open){
    var expanded = open ? 'true' : 'false';
    btn.setAttribute('aria-expanded', expanded);
    document.documentElement.classList.toggle('nav-open', open);
    backdrop.hidden = !open;
  }
  btn.addEventListener('click', function(){
    setOpen(!(btn.getAttribute('aria-expanded') === 'true'));
  });
  window.addEventListener('resize', function(){
    if(window.innerWidth > 980 && btn.getAttribute('aria-expanded') === 'true'){
      setOpen(false);
    }
  });
  setOpen(false);
  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape'){ setOpen(false); }
  });
  backdrop.addEventListener('click', function(){ setOpen(false); });
  nav.addEventListener('click', function(e){ if(e.target.closest('a')) setOpen(false); });
})();

// Ensure hero backgrounds hydrate even if CSS variables are dropped in production
(function(){
  var heroes = document.querySelectorAll('.axis-hero[data-hero-src]');
  if(!heroes.length) return;

  heroes.forEach(function(hero){
    var src = hero.getAttribute('data-hero-src');
    if(!src) return;
    var docUrl = "url('" + src + "')";
    var cssSrc = src.startsWith('assets/') ? '../' + src.slice('assets/'.length) : src;
    var cssUrl = "url('" + cssSrc + "')";
    hero.style.setProperty('--hero-image', cssUrl);
    var current = getComputedStyle(hero).getPropertyValue('background-image');
    if(!current || current === 'none' || current.indexOf('gradient') !== -1){
      hero.style.backgroundImage = docUrl;
    }
  });
})();
