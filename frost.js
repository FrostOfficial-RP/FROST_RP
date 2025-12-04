// FROST RP – JS ULTRA

// ===== Scroll progress bar =====
const progressBar =
  document.getElementById("scroll-progress") ||
  (() => {
    const el = document.createElement("div");
    el.id = "scroll-progress";
    document.body.appendChild(el);
    return el;
  })();

window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  progressBar.style.width = progress + "%";
});

// ===== Cursor glow & parallax background =====
const cursorGlow =
  document.getElementById("cursor-glow") ||
  (() => {
    const el = document.createElement("div");
    el.id = "cursor-glow";
    document.body.appendChild(el);
    return el;
  })();

const bgLayer = document.querySelector(".bg-animated");
const snowLayer = document.querySelector(".snow");
const snowFrontLayer = document.querySelector(".snow-front");

window.addEventListener("mousemove", (e) => {
  cursorGlow.style.left = e.clientX + "px";
  cursorGlow.style.top = e.clientY + "px";

  const x = (e.clientX / window.innerWidth - 0.5) * 10;
  const y = (e.clientY / window.innerHeight - 0.5) * 10;

  if (bgLayer) {
    bgLayer.style.transform = `translate3d(${x * -1}px, ${y * -1}px, 0) scale(1.05)`;
  }
  if (snowLayer) {
    snowLayer.style.transform = `translate3d(${x * 0.4}px, ${y * 0.6}px, 0)`;
  }
  if (snowFrontLayer) {
    snowFrontLayer.style.transform = `translate3d(${x * -0.4}px, ${y * -0.8}px, 0)`;
  }
});

// ===== MENU MOBILE =====
const headerEl = document.querySelector("header");
const navToggle = document.querySelector(".nav-toggle");
const navMobile = document.querySelector(".nav-mobile");

if (navToggle && headerEl && navMobile) {
  navToggle.addEventListener("click", () => {
    headerEl.classList.toggle("open");
  });

  navMobile.querySelectorAll("a, button").forEach((el) => {
    el.addEventListener("click", () => {
      headerEl.classList.remove("open");
    });
  });
}

// ===== SCROLL REVEAL =====
const reveals = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.18 }
);
revealObserver && reveals.forEach((el) => revealObserver.observe(el));

// ===== NAV SCROLLSPY =====
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a");

const spyObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        navLinks.forEach((link) => {
          link.classList.toggle(
            "active",
            link.getAttribute("href") === `#${id}`
          );
        });
      }
    });
  },
  { threshold: 0.45 }
);

sections.forEach((sec) => spyObserver.observe(sec));

// ===== TILT 3D (per le card, NON per l'iPhone) =====
function attachTilt(selector) {
  document.querySelectorAll(selector).forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const rotateX = (y / rect.height) * -8;
      const rotateY = (x / rect.width) * 8;
      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "rotateX(0deg) rotateY(0deg)";
    });
  });
}

attachTilt(".tilt");

// ===== INTRO CINEMATOGRAFICA =====
document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.getElementById("intro-overlay");
  const startBtn = document.getElementById("intro-start");
  const skipBtn = document.getElementById("intro-skip");
  const audio = document.getElementById("intro-audio");

  if (!overlay || !startBtn || !audio) return;

  // blocco scroll finché l'intro è attiva
  document.body.classList.add("no-scroll");

  const finishIntro = () => {
    overlay.classList.add("hide");
    document.body.classList.remove("no-scroll");
    setTimeout(() => {
      overlay.style.display = "none";
    }, 900);
  };

  startBtn.addEventListener("click", async () => {
    overlay.classList.add("playing");
    try {
      await audio.play();
    } catch (err) {
      console.warn("Audio bloccato dal browser, chiudo comunque l'intro.", err);
      finishIntro();
      return;
    }
  });

  if (skipBtn) {
    skipBtn.addEventListener("click", () => {
      audio.pause();
      finishIntro();
    });
  }

  audio.addEventListener("ended", finishIntro);
  audio.addEventListener("error", finishIntro);

  // Fallback se qualcosa va storto
  setTimeout(() => {
    if (!overlay.classList.contains("hide")) {
      finishIntro();
    }
  }, 18000);
});

// ===== MODAL iPHONE DONAZIONI =====
window.addEventListener("DOMContentLoaded", () => {
  const iphoneTrigger = document.getElementById("iphone-trigger");
  const iphoneModal = document.getElementById("iphone-modal");
  const closeBtn = iphoneModal ? iphoneModal.querySelector(".iphone-modal-close") : null;

  if (!iphoneTrigger || !iphoneModal || !closeBtn) return;

  const openModal = () => {
    iphoneModal.classList.add("open");
  };
  const closeModal = () => {
    iphoneModal.classList.remove("open");
  };

  iphoneTrigger.addEventListener("click", openModal);
  closeBtn.addEventListener("click", closeModal);

  iphoneModal.addEventListener("click", (e) => {
    if (
      e.target === iphoneModal ||
      e.target.classList.contains("iphone-modal-backdrop")
    ) {
      closeModal();
    }
  });
});
