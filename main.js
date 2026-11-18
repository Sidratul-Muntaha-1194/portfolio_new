document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.getElementById('navbar');
  const scrollLine = document.getElementById('scrollLine');
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-menu a');
  const sections = document.querySelectorAll('section[id]');

  const onScroll = () => {
    const scrollY = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    if (scrollLine && maxScroll > 0) {
      scrollLine.style.width = `${(scrollY / maxScroll) * 100}%`;
    }

    if (scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    let current = '';
    sections.forEach(sec => {
      if (scrollY >= sec.offsetTop - 160) {
        current = sec.getAttribute('id');
      }
    });

    navLinks.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const open = navMenu.classList.toggle('open');
      mobileToggle.textContent = open ? 'CLOSE' : 'MENU';
      mobileToggle.setAttribute('aria-expanded', String(open));
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        mobileToggle.textContent = 'MENU';
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  const copyBtn = document.getElementById('copyBtn');
  if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
      const email = 'sidratulmuntaha1194@gmail.com';
      try {
        await navigator.clipboard.writeText(email);
        copyBtn.textContent = 'Copied!';
        setTimeout(() => (copyBtn.textContent = 'Copy'), 2000);
      } catch {
        window.location.href = `mailto:${email}`;
      }
    });
  }

  const contactForm = document.getElementById('contactForm');
  const statusMsg = document.getElementById('statusMsg');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();

      if (statusMsg) {
        statusMsg.style.display = 'block';
        statusMsg.textContent = 'Opening your email client...';
      }

      const subject = encodeURIComponent(`Portfolio Inquiry from ${name}`);
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
      window.location.href = `mailto:sidratulmuntaha1194@gmail.com?subject=${subject}&body=${body}`;
    });
  }
});
