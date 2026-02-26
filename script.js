/* ================== MENU + SCROLL ================== */
let lastScrollPos = window.scrollY;
let lastSubmit = 0;

const menuWrapper = document.getElementById('menuWrapper');
const menuOverlay = document.getElementById('overlay'); // overlay menu
const burger = document.getElementById('burger');
const menuText = document.getElementById('menuText');
const closeIcon = document.getElementById('closeIcon');

let isOverlayOpen = false;

function updateBoxState() {
  if (isOverlayOpen) return;
  const currentScroll = window.scrollY;

  if (!menuWrapper || !burger || !menuText) return;

  if (currentScroll > lastScrollPos) {
    menuWrapper.classList.add('shrink');
    burger.style.opacity = 1;
    menuText.style.opacity = 0;
  } else if (currentScroll < lastScrollPos) {
    menuWrapper.classList.remove('shrink');
    burger.style.opacity = 0;
    menuText.style.opacity = 1;
  }

  lastScrollPos = currentScroll;
}

function openMenuOverlay() {
  if (!menuOverlay) return;

  menuOverlay.classList.add('active');
  isOverlayOpen = true;

  // 🔒 Uzamkne scroll stránky
  document.body.style.overflow = 'hidden';

  if(menuText) menuText.style.opacity = 0;
  if(burger) burger.style.opacity = 0;
  if(menuWrapper) menuWrapper.classList.add('shrink');
}

function closeMenuOverlay() {
  if (!menuOverlay) return;

  menuOverlay.classList.remove('active');
  isOverlayOpen = false;

  // 🔓 Vrátí scroll
  document.body.style.overflow = '';

  const currentScroll = window.scrollY;

  if(menuWrapper && burger && menuText){
    if (currentScroll > 0) {
      menuWrapper.classList.add('shrink');
      burger.style.opacity = 1;
      menuText.style.opacity = 0;
    } else {
      menuWrapper.classList.remove('shrink');
      burger.style.opacity = 0;
      menuText.style.opacity = 1;
    }
  }
}


if(menuWrapper) menuWrapper.addEventListener('click', () => { if (!isOverlayOpen) openMenuOverlay(); });
if(closeIcon) closeIcon.addEventListener('click', closeMenuOverlay);

if(menuOverlay){
  document.querySelectorAll('.menu-overlay a').forEach(link => link.addEventListener('click', closeMenuOverlay));
}


window.addEventListener('scroll', updateBoxState);

/* ================== INTRO OVERLAY ================== */
window.addEventListener('load', () => {
  const introOverlay = document.getElementById('introOverlay');
  if(!introOverlay) return;

  // Po 3s začne fade-out
  setTimeout(() => {
    introOverlay.style.transition = 'opacity 1s ease';
    introOverlay.style.opacity = '0';

    // Po 1s skryj overlay
    setTimeout(() => {
      introOverlay.style.display = 'none';

      // 🔥 Teď spustíme animace scrollu
      startScrollAnimations();

    }, 1000);
  }, 3000);
});


/* ================== TYPEWRITER EFFECT ================== */
function typeTextWithCursor(elementId, speed = 50, callback) {
  const el = document.getElementById(elementId);
  if(!el) return;
  const text = el.dataset.text;
  el.textContent = "";
  let i = 0;

  const cursor = document.createElement('span');
  cursor.classList.add('cursor');
  el.appendChild(cursor);

  function type() {
    if (i < text.length) {
      const charSpan = document.createElement('span');
      charSpan.textContent = text.charAt(i);
      el.insertBefore(charSpan, cursor);
      i++;
      setTimeout(type, speed);
    } else {
      cursor.remove();
      if (callback) callback();
    }
  }
  type();
}

let typed = false;
window.addEventListener('scroll', () => {
  const aboutSection = document.getElementById('about');
  if(!aboutSection || typed) return;
  const rect = aboutSection.getBoundingClientRect();
  if(rect.top < window.innerHeight - 100){
    typed = true;
    const aboutTextEl = document.getElementById('aboutText');
    const aboutText2El = document.getElementById('aboutText2');
    if(aboutTextEl) typeTextWithCursor('aboutText', 30, () => {
      if(aboutText2El) typeTextWithCursor('aboutText2', 30);
    });
  }
});

/* ================== CONTACT SIDEBAR ================== */
const contactBtn = document.querySelector('.footer-btn');
const contactSidebar = document.getElementById('contactSidebar');
const closeSidebar = document.getElementById('closeSidebar');
const sidebarOverlay = document.getElementById('sidebarOverlay');

function openSidebar() {
  if(contactSidebar && sidebarOverlay){
    contactSidebar.classList.add('active');
    sidebarOverlay.classList.add('active');
  }
}

function closeSidebarFunc() {
  if(contactSidebar && sidebarOverlay){
    contactSidebar.classList.remove('active');
    sidebarOverlay.classList.remove('active');
  }
}

if(contactBtn) contactBtn.addEventListener('click', openSidebar);
if(closeSidebar) closeSidebar.addEventListener('click', closeSidebarFunc);
if(sidebarOverlay) sidebarOverlay.addEventListener('click', closeSidebarFunc);

/* ================== PROCESS STEPS ================== */
const steps = document.querySelectorAll('.process-step');
function revealSteps() {
  const triggerBottom = window.innerHeight * 0.85;
  steps.forEach(step => {
    const top = step.getBoundingClientRect().top;
    if(top < triggerBottom){
      step.classList.add('visible');
    }
  });
}
window.addEventListener('scroll', revealSteps);
window.addEventListener('load', revealSteps);
// ================== CLOSE MENU AFTER CLICK ==================

const menuLinks = document.querySelectorAll('.menu-overlay a');

menuLinks.forEach(link => {
link.addEventListener('click', function(e) {
  e.preventDefault(); // zastaví defaultní skok

  closeMenuOverlay();

  setTimeout(() => {
    const targetId = this.getAttribute('href');
    const target = document.querySelector(targetId);

    if (target) {
      target.scrollIntoView({
        behavior: 'smooth'
      });
    }
  }, 300);
});
});

const menuContactLink = document.getElementById('menu-contact-link');
if (menuContactLink) {
  menuContactLink.addEventListener('click', function(e) {
    e.preventDefault();

    closeMenuOverlay();

    setTimeout(() => {
      openSidebar();   // 🔥 místo openContactSidebar()
    }, 300);
  });
}

const btnServices = document.getElementById('btnServices');
const pricingSection = document.getElementById('pricing');

btnServices.addEventListener('click', (e) => {
  e.preventDefault();

  // přidej třídu pro animaci (můžeš i změnit transform pro swipe)
  pricingSection.classList.add('swipe');

  // scroll na sekci
  pricingSection.scrollIntoView({ behavior: 'smooth' });

  // pokud chceš, můžeš třídu odstranit po animaci a připravit pro další klik
  setTimeout(() => {
    pricingSection.classList.remove('swipe');
  }, 600); // délka animace
});

// ===== EMAILJS FORM =====

const contactForm = document.getElementById('contactForm');
const messageBox = document.getElementById("formMessage");
const submitBtn = contactForm ? contactForm.querySelector('button[type="submit"]') : null;

if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    messageBox.className = "form-message";
    messageBox.textContent = "";

    // 🛡 Honeypot
    if (contactForm.website.value !== "") {
      console.warn("Bot detected");
      return;
    }

    // ⏱ Rate limiting
    if (Date.now() - lastSubmit < 15000) {
      messageBox.textContent = "Počkejte 15 sekund před dalším odesláním.";
      messageBox.className = "form-message error show";
      return;
    }

    const name = contactForm.name.value.trim();
    const email = contactForm.email.value.trim();
    const message = contactForm.message.value.trim();

    // ✅ Validace
    const validationError = validateInput(name, email, message);
    if (validationError) {
      messageBox.textContent = validationError;
      messageBox.className = "form-message error show";
      return;
    }

    lastSubmit = Date.now();

    // 🔄 Loading state
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = "Odesílám...";
    }

    const templateParams = {
      name: name,
      email: email,
      message: message,
      time: new Date().toLocaleString("cs-CZ")
    };

    emailjs.send('service_6rwtcsv', 'template_uiy5c0n', templateParams)
      .then(() => {
        messageBox.textContent = "Děkuji za zprávu. Ozvu se vám co nejdříve.";
        messageBox.className = "form-message success show";

        contactForm.reset();
      })
      .catch(err => {
        console.error("EmailJS ERROR:", err);

        messageBox.textContent = "Došlo k chybě. Zkuste to prosím znovu.";
        messageBox.className = "form-message error show";
      })
      .finally(() => {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = "Odeslat";
        }
      });
  });
}

function validateInput(name, email, message) {
  const nameRegex = /^[a-zA-ZÀ-ž\s]{2,40}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!nameRegex.test(name)) return "Neplatné jméno.";
  if (!emailRegex.test(email)) return "Neplatný email.";
  if (message.length < 10 || message.length > 1000)
    return "Zpráva musí mít 10–1000 znaků.";

  return null;
}

// ========== SCROLL ANIMACE ==========
const fadeElements = document.querySelectorAll('.fade-slide');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
      // observer.unobserve(entry.target); // pokud animaci chceš jen jednou
    }
  });
}, { threshold: 0.5 }); // animace začne, když je vidět jen 5 % prvku

fadeElements.forEach(el => observer.observe(el));




