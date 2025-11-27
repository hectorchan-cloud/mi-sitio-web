// JavaScript educativo: interacción mínima y comentada para estudiantes

document.addEventListener('DOMContentLoaded', function(){
  const themeBtn = document.getElementById('themeBtn');
  const body = document.body;
  const navToggle = document.getElementById('navToggle');
  const navList = document.querySelector('.nav-list');
  const showHintBtn = document.getElementById('showHint');

   
  const storedTheme = localStorage.getItem('animelab-theme');
  
  let isLightInit = false;
  if (storedTheme) {
    isLightInit = storedTheme === 'light';
  } else if (window.matchMedia) {
    isLightInit = window.matchMedia('(prefers-color-scheme: light)').matches;
  }
  if (isLightInit) body.classList.add('light');

  themeBtn.textContent = isLightInit ? '☀️' : '🌙';
  themeBtn.setAttribute('aria-pressed', isLightInit ? 'true' : 'false');
  themeBtn.setAttribute('aria-label', isLightInit ? 'Cambiar a modo oscuro' : 'Cambiar a modo claro');

  themeBtn.addEventListener('click', function(){
    
    document.body.classList.add('theme-transition');
   
    body.classList.toggle('light');
    const isLight = body.classList.contains('light');
    localStorage.setItem('animelab-theme', isLight ? 'light' : 'dark');
    themeBtn.textContent = isLight ? '☀️' : '🌙';
    themeBtn.setAttribute('aria-pressed', isLight ? 'true' : 'false');
    themeBtn.setAttribute('aria-label', isLight ? 'Cambiar a modo oscuro' : 'Cambiar a modo claro');
    
    setTimeout(()=> document.body.classList.remove('theme-transition'), 420);
  });

  
  navToggle.addEventListener('click', function(){
    const expanded = navToggle.getAttribute('aria-expanded') === 'true' || false;
    navToggle.setAttribute('aria-expanded', !expanded);
    navList.classList.toggle('show');
    
    navToggle.classList.toggle('open');
  });

  
  document.querySelectorAll('.nav-list .nav-link').forEach(function(link){
    link.addEventListener('click', function(){
      
      if (navList.classList.contains('show')){
        navList.classList.remove('show');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });

  
  window.openLightbox = function(src){
    const lightbox = document.getElementById('lightbox');
    const img = document.getElementById('lightboxImg');
    img.src = src;
    lightbox.style.display = 'flex';
  };
  window.closeLightbox = function(e){
    if (e.target.id === 'lightbox' || e.target.id === 'lightboxImg') {
      document.getElementById('lightbox').style.display = 'none';
      document.getElementById('lightboxImg').src = '';
    } else if (e.target.id === 'lightbox') {
      document.getElementById('lightbox').style.display = 'none';
    }
  };

  
  window.openNewsModal = function(btn){
    if (!btn) return;
    const title = btn.dataset.title || '';
    const date = btn.dataset.date || '';
    const src = btn.dataset.img || '';
    const full = btn.dataset.full || '';
    const modal = document.getElementById('newsModal');
    document.getElementById('newsModalTitle').textContent = title;
    document.getElementById('newsModalDate').textContent = date;
    const img = document.getElementById('newsModalImg');
    if (img) { img.src = src; img.alt = title; }
    const fullEl = document.getElementById('newsModalFull');
    if (fullEl) fullEl.textContent = full;
    modal.classList.add('show');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };
  window.closeNewsModal = function(e){
    const modal = document.getElementById('newsModal');
    if (!modal) return;
    
    if (e.target === modal) {
      modal.classList.remove('show');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      const img = document.getElementById('newsModalImg'); if (img) img.src = '';
    }
  };

  
  const newsModalClose = document.getElementById('newsModalClose');
  if (newsModalClose) newsModalClose.addEventListener('click', function(){
    const modal = document.getElementById('newsModal');
    if (modal){ modal.classList.remove('show'); modal.setAttribute('aria-hidden','true'); document.body.style.overflow = ''; const img = document.getElementById('newsModalImg'); if (img) img.src = ''; }
  });
  const newsModalEl = document.getElementById('newsModal');
  if (newsModalEl) newsModalEl.addEventListener('click', closeNewsModal);

  
  document.addEventListener('keydown', function(e){
    if (e.key === 'Escape'){
      const nm = document.getElementById('newsModal');
      if (nm && nm.classList.contains('show')){
        nm.classList.remove('show'); nm.setAttribute('aria-hidden','true'); document.body.style.overflow = ''; const img = document.getElementById('newsModalImg'); if (img) img.src = ''; }
    }
  });

  
  const yearEl = document.getElementById('footerYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  
  const siteAudio = document.getElementById('siteAudio');
  const playPause = document.getElementById('playPause');
  const audioToggle = document.getElementById('audioToggle');
  const volume = document.getElementById('volume');
  const muteBtn = document.getElementById('muteBtn');
  const audioStatus = document.getElementById('audioStatus');

  if (siteAudio){
    
    siteAudio.volume = parseFloat(volume.value || 0.6);
    let wasPlayingBeforeMute = false;

    function updatePlayUI(){
      if (siteAudio.paused){ playPause.textContent = '▶️'; audioStatus.textContent = 'Pausado'; }
      else { playPause.textContent = '⏸️'; audioStatus.textContent = 'Reproduciendo'; }
    }

    playPause.addEventListener('click', function(){
      if (siteAudio.paused){
        siteAudio.play();
      } else { siteAudio.pause(); }
      updatePlayUI();
    });

    
    audioToggle.addEventListener('click', function(){
      const on = audioToggle.getAttribute('aria-pressed') === 'true';
      if (!on){
        audioToggle.setAttribute('aria-pressed','true');
        audioToggle.textContent = '🔊';
        
      } else {
        audioToggle.setAttribute('aria-pressed','false');
        audioToggle.textContent = '🔈';
        siteAudio.pause();
      }
      updatePlayUI();
    });

  
    volume.addEventListener('input', function(){
      const v = parseFloat(this.value);
      siteAudio.volume = v;
      if (v === 0){ muteBtn.setAttribute('aria-pressed','true'); }
      else { muteBtn.setAttribute('aria-pressed','false'); }
    });

    
    muteBtn.addEventListener('click', function(){
      const muted = siteAudio.muted;
      siteAudio.muted = !muted;
      muteBtn.setAttribute('aria-pressed', siteAudio.muted ? 'true' : 'false');
      muteBtn.textContent = siteAudio.muted ? '🔇' : '🔈';
    });

    
    siteAudio.addEventListener('play', updatePlayUI);
    siteAudio.addEventListener('pause', updatePlayUI);
    siteAudio.addEventListener('ended', function(){ siteAudio.currentTime = 0; siteAudio.pause(); updatePlayUI(); });
  }


  const aboutBtn = document.getElementById('aboutBtn');
  const aboutModal = document.getElementById('aboutModal');
  const aboutClose = document.getElementById('aboutClose');
  if (aboutBtn && aboutModal){
    aboutBtn.addEventListener('click', function(){
      aboutModal.classList.add('show');
      aboutModal.setAttribute('aria-hidden','false');
      document.body.style.overflow = 'hidden';
    });
    function closeAbout(){
      aboutModal.classList.remove('show');
      aboutModal.setAttribute('aria-hidden','true');
      document.body.style.overflow = '';
    }
    if (aboutClose) aboutClose.addEventListener('click', closeAbout);
    aboutModal.addEventListener('click', function(e){ if (e.target === aboutModal) closeAbout(); });
    document.addEventListener('keydown', function(e){ if (e.key === 'Escape' && aboutModal.classList.contains('show')) closeAbout(); });
  }

  
  window.showProfile = function(name){
    
    const bio = {
      'Sakura': 'Sakura — ninja aprendiz. Habilidad: poda elemental.',
      'Ryu': 'Ryu — piloto de mecha. Habilidad: tácticas defensivas.',
      'Luna': 'Luna — astrónoma hechicera. Habilidad: manipulación gravitatoria.'
    };
    const message = bio[name] || 'Perfil no encontrado';
    alert(message); 
  };

  
  const form = document.getElementById('contactForm');
  const nameEl = document.getElementById('name');
  const emailEl = document.getElementById('email');
  const messageEl = document.getElementById('message');

  function validateEmail(email){
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function showError(input, msg){
    input.classList.remove('input-success');
    input.classList.add('input-error');
    input.setAttribute('aria-invalid','true');
    let err = input.parentElement.querySelector('.error-msg');
    if (!err){ err = document.createElement('div'); err.className = 'error-msg'; input.parentElement.appendChild(err); }
    err.textContent = msg;
  }

  function showSuccess(input){
    input.classList.remove('input-error');
    input.classList.add('input-success');
    input.setAttribute('aria-invalid','false');
    const err = input.parentElement.querySelector('.error-msg');
    if (err) err.textContent = '';
  }

  
  [nameEl, emailEl, messageEl].forEach(function(el){
    el.addEventListener('input', function(){
      if (el.classList.contains('input-error')){
        if (el === emailEl){
          if (validateEmail(el.value.trim())) showSuccess(el);
        } else {
          if (el.value.trim()) showSuccess(el);
        }
      }
    });
  });

  form.addEventListener('submit', function(ev){
    ev.preventDefault();
    let valid = true;
    const name = nameEl.value.trim();
    const email = emailEl.value.trim();
    const message = messageEl.value.trim();

    if (!name){ showError(nameEl, 'Por favor ingresa tu nombre.'); valid = false; } else showSuccess(nameEl);
    if (!email || !validateEmail(email)){ showError(emailEl, 'Introduce un correo válido.'); valid = false; } else showSuccess(emailEl);
    if (!message || message.length < 10){ showError(messageEl, 'Escribe un mensaje (mínimo 10 caracteres).'); valid = false; } else showSuccess(messageEl);

    
    let status = document.getElementById('formMessage');
    if (!status){ status = document.createElement('div'); status.id = 'formMessage'; status.className = 'form-message'; form.prepend(status); }

    if (valid){
     
      const submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn){ submitBtn.classList.add('loading'); submitBtn.setAttribute('disabled',''); }

      status.textContent = 'Enviando...';
      status.classList.remove('error');
      status.classList.add('success');

      function fakeSend(data){
        return new Promise((resolve) => setTimeout(()=> resolve({ ok: true }), 1100));
      }

      fakeSend({name, email, message}).then(resp => {
        if (submitBtn){ submitBtn.classList.remove('loading'); submitBtn.removeAttribute('disabled'); }
        if (resp && resp.ok){
          status.textContent = '¡Gracias! Tu mensaje ha sido enviado (simulado).';
          // limpiar campos
          form.reset();
          [nameEl, emailEl, messageEl].forEach(i => i.classList.remove('input-success'));
          setTimeout(()=>{ status.textContent = ''; status.className = 'form-message'; }, 4200);
        } else {
          status.textContent = 'Error al enviar. Intenta de nuevo más tarde.';
          status.classList.remove('success');
          status.classList.add('error');
        }
      });
    } else {
      status.textContent = 'Hay errores en el formulario. Revisa los campos marcados.';
      status.classList.remove('success');
      status.classList.add('error');
    }
  });

  const maxChars = 500;
  const counter = document.createElement('div'); counter.className = 'char-counter';
  messageEl.parentElement.appendChild(counter);
  function updateCounter(){
    const len = messageEl.value.length;
    counter.textContent = `${len} / ${maxChars}`;
    counter.classList.remove('warn','exceed');
    if (len > maxChars) counter.classList.add('exceed');
    else if (len > maxChars * 0.8) counter.classList.add('warn');
  }
  messageEl.addEventListener('input', updateCounter);
  updateCounter();

  showHintBtn.addEventListener('click', function(){
    const hint = document.createElement('div');
    hint.className = 'hint';
    hint.textContent = 'Pista: Revisa css/style.css para encontrar variables y layout. Revisa js/main.js para ver eventos.';
    document.querySelector('.hero').appendChild(hint);
    setTimeout(()=> hint.remove(), 6000);
  });

  
  const profiles = {
    'Mejiro': {
      name: 'Mejiro Maquen',
      title: 'Uma Musume distinguida',
      desc: 'Mejiro Maquen es una corredora de estilo refinado, conocida por su consistencia y táctica inteligente en las carreras. Mantiene la calma bajo presión y ejecuta adelantamientos con precisión.',
      image: 'assets/images/mejiro-mcqueen-real.jpg',
      imageAnime: 'assets/images/mejiro-mcqueen-anime.png',
      attribution: 'Foto: Mejiro McQueen — Autor: Wikimedia Commons | Ilustración: DG-RA, m1981 (OpenClipart)',
      details: [
        {k: 'Origen', v: 'Academia Noble'},
        {k: 'Habilidades', v: 'Técnica, consistencia en largas distancias'},
        {k: 'Frase célebre', v: '"La elegancia marca el paso."'}
      ]
    }
  };

  profiles['Teio'] = {
    name: 'Tokai Teio',
    title: 'Uma Musume aspirante',
    desc: 'Teio es una corredora vibrante y competitiva, famosa por su potente aceleración en la recta final. Le encanta entrenar con intensidad y motivar a sus compañeras.',
    image: 'assets/images/tokai-teio-real.jpg',
    imageAnime: 'assets/images/tokai-teio-anime.png',
    attribution: 'Foto: Tokai Teio — Autor: Wikimedia Commons | Ilustración: DG-RA (OpenClipart)',
    details: [
      {k: 'Origen', v: 'Academia Diamond'},
      {k: 'Habilidades', v: 'Sprint final, alta cadencia'},
      {k: 'Frase célebre', v: '"¡Acelera hasta el final!"'}
    ]
  };

  profiles['Kitasan'] = {
    name: 'Kitasan Black',
    title: 'Uma Musume veterana',
    desc: 'Kitasan Black destaca por su fuerza y resistencia; es una figura respetada en la pista y transmite calma estratégica antes de cada carrera.',
    image: 'assets/images/kitasan-black-real.jpg',
    imageAnime: 'assets/images/kitasan-black-anime.png',
    attribution: 'Foto: Kitasan Black — Autor: Wikimedia Commons | Ilustración: DG-RA (OpenClipart)',
    details: [
      {k: 'Origen', v: 'Establo Kitasan'},
      {k: 'Habilidades', v: 'Resistencia, tranco largo'},
      {k: 'Frase célebre', v: '"La fuerza forja campeones."'}
    ]
  };
  profiles['Satono'] = {
    name: 'Satono Diamond',
    title: 'Uma Musume estratégica',
    desc: 'Satono Diamond es una corredora metódica y táctica, conocida por planear sus carreras cuidadosamente y ejecutar adelantamientos en el momento preciso.',
    image: 'assets/images/satono-diamond-real.jpg',
    imageAnime: 'assets/images/satono-diamond-anime.png',
    attribution: 'Foto: Satono Diamond — Autor: Wikimedia Commons | Ilustración: DG-RA (OpenClipart)',
    details: [
      {k: 'Origen', v: 'Establo Satono'},
      {k: 'Habilidades', v: 'Táctica, paso constante'},
      {k: 'Frase célebre', v: '"La estrategia gana tiempo."'}
    ]
  };

  const profileModal = document.getElementById('profileModal');
  const modalCloseBtn = document.getElementById('modalClose');

  window.openProfileModal = function(key){
    const p = profiles[key];
    if (!p) return;
    document.getElementById('modalName').textContent = p.name;
    document.getElementById('modalTitle').textContent = p.title;
    document.getElementById('modalDesc').textContent = p.desc;

    const modalImg = document.getElementById('modalImg');
    if (modalImg) {
      modalImg.src = p.image || '';
      modalImg.alt = p.name || 'Imagen del personaje';
    }
    
    const attributionEl = document.getElementById('modalAttribution');
    if (attributionEl && p.attribution) {
      attributionEl.textContent = p.attribution;
      attributionEl.style.display = 'block';
    }
    const detailsEl = document.getElementById('modalDetails');
    detailsEl.innerHTML = '';
    p.details.forEach(d => {
      const li = document.createElement('li');
      li.innerHTML = `<strong>${d.k}:</strong> ${d.v}`;
      detailsEl.appendChild(li);
    });
    
    profileModal.classList.add('show');
    profileModal.setAttribute('aria-hidden', 'false');
    
    document.body.style.overflow = 'hidden';
  };

  function closeProfileModal(){
    profileModal.classList.remove('show');
    profileModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  
  modalCloseBtn.addEventListener('click', closeProfileModal);
  profileModal.addEventListener('click', function(e){
    if (e.target === profileModal) closeProfileModal();
  });

  
  document.addEventListener('keydown', function(e){
    if (e.key === 'Escape' && profileModal.classList.contains('show')) closeProfileModal();
  });
});
