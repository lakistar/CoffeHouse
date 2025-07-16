document.addEventListener('DOMContentLoaded', () => {
  // Scroll reveal
  const animated = document.querySelectorAll('.animate-on-scroll');
  const observer = new IntersectionObserver((ents, obs) => {
    ents.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  animated.forEach(el => observer.observe(el));
  // Menu filter
  const filterBtns = document.querySelectorAll('.filter-btn');
  const menuItems  = document.querySelectorAll('.menu-item');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.toggle('active', b===btn));
      filterBtns.forEach(b => b.setAttribute('aria-pressed', b===btn));
      const f = btn.dataset.filter;
      menuItems.forEach(item => {
        const show = f==='all' || item.dataset.category===f;
        item.style.display = show ? 'block' : 'none';
        if (show) {
          item.classList.add('fade-in');
          setTimeout(()=>item.classList.remove('fade-in'),600);
        }
      });
    });
  });
  // Hero typing
  const heroP = document.querySelector('.hero-content p');
  if (heroP) {
    const text = heroP.textContent; heroP.textContent='';
    let i=0;
    (function type(){ if(i<text.length){ heroP.textContent+=text[i++]; setTimeout(type,100); } })();
  }
  // Lightbox
  document.querySelectorAll('.gallery-item').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const src = link.href, alt = link.querySelector('img').alt;
      const overlay = document.createElement('div');
      overlay.id='lightbox-overlay';
      overlay.innerHTML=`
        <div class="lightbox-content">
          <img src="${src}" alt="${alt}" loading="lazy">
          <button id="lightbox-close" role="button" aria-label="Закрити">&times;</button>
        </div>`;
      document.body.appendChild(overlay);
      overlay.addEventListener('click', ev => {
        if (ev.target.id==='lightbox-overlay' || ev.target.id==='lightbox-close') overlay.remove();
      });
    });
  });
  // Testimonials
  const testimonials = document.querySelectorAll('.testimonial-item');
    const prevBtn = document.getElementById('prev');
    const nextBtn = document.getElementById('next');
    let current = 0;
    function showTestimonial(index) {
      testimonials.forEach((item, i) => {
        item.classList.toggle('active', i === index);
      });
    }
    prevBtn.addEventListener('click', () => {
      current = (current - 1 + testimonials.length) % testimonials.length;
      showTestimonial(current);
    });
    nextBtn.addEventListener('click', () => {
      current = (current + 1) % testimonials.length;
      showTestimonial(current);
    });
    // Ініціалізація
    showTestimonial(current);
  // Form validation
  const form = document.getElementById('contact-form');
  form.addEventListener('submit', e => {
    e.preventDefault();
    form.querySelectorAll('.error').forEach(el=>el.remove());
    let ok=true;
    [['name','ім’я'],['email','email'],['message','повідомлення']].forEach(([id,label])=>{
      const fld = form[id], val=fld.value.trim();
      if (!val || (id==='message' && val.length<10) || (id==='email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val))) {
        const msg = id==='message'?
          'Повідомлення мінімум 10 символів':
          id==='email'?
            'Введіть коректний email':
            'Введіть коректне ім’я';
        const err = document.createElement('div');
        err.className='error shake'; err.textContent=msg;
        fld.parentNode.appendChild(err);
        ok=false;
        setTimeout(()=>err.classList.remove('shake'),500);
      }
    });
    if(ok){
      form.classList.add('success');
      setTimeout(()=>form.classList.remove('success'),2000);
      alert('Дякуємо! Ваше повідомлення надіслано.');
      form.reset();
    }
  });
});
