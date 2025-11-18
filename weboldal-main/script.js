const modal = document.getElementById("registration-modal");
const registrationButton = document.getElementById("reg");
const ctaRegistrationButton = document.getElementById("cta-reg");
const closeModalButton = document.getElementById("close-modal");
const registrationForm = document.getElementById("registration-form");
const feedback = document.getElementById("registration-feedback");
const generatorStatus = document.getElementById("generator-status");
const progressBar = document.getElementById("progress-bar");

function toggleModal(shouldOpen) {
  if (shouldOpen) {
    modal.classList.add("modal--visible");
    modal.setAttribute("aria-hidden", "false");
    registrationForm.reset();
    feedback.textContent = "";
    feedback.classList.remove("modal__feedback--error");
    document.getElementById("full-name").focus();
  } else {
    modal.classList.remove("modal--visible");
    modal.setAttribute("aria-hidden", "true");
  }
}

registrationButton.addEventListener("click", (event) => {
  event.preventDefault();
  toggleModal(true);
});

ctaRegistrationButton.addEventListener("click", () => {
  toggleModal(true);
});

closeModalButton.addEventListener("click", () => {
  toggleModal(false);
});

modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    toggleModal(false);
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal.classList.contains("modal--visible")) {
    toggleModal(false);
  }
});

registrationForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const fullName = registrationForm["full-name"].value.trim();
  const email = registrationForm.email.value.trim();
  const password = registrationForm.password.value.trim();

  if (!fullName || !email || !password) {
    feedback.textContent = "Kérjük tölts ki minden mezőt.";
    feedback.classList.add("modal__feedback--error");
    return;
  }

  if (password.length < 8) {
    feedback.textContent = "A jelszónak legalább 8 karakter hosszúnak kell lennie.";
    feedback.classList.add("modal__feedback--error");
    return;
  }

  feedback.classList.remove("modal__feedback--error");
  feedback.textContent = `Köszönjük, ${fullName}! A regisztráció sikeresen elindult.`;

  setTimeout(() => {
    toggleModal(false);
  }, 2000);
});

// Smooth scroll for anchor buttons
const scrollButtons = document.querySelectorAll('[data-scroll]');
scrollButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const targetSelector = btn.getAttribute("data-scroll");
    const target = document.querySelector(targetSelector);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// Progress bar animation + status
const generateButton = document.getElementById("generate-btn");
let progress = 18;

generateButton.addEventListener("click", () => {
  generatorStatus.textContent = "Brief feldolgozása...";
  progress = 18;
  progressBar.style.width = `${progress}%`;

  const interval = setInterval(() => {
    progress = Math.min(progress + Math.random() * 18, 100);
    progressBar.style.width = `${progress}%`;

    if (progress > 30 && progress < 70) {
      generatorStatus.textContent = "AI jelenetek és narráció generálása...";
    } else if (progress >= 70 && progress < 100) {
      generatorStatus.textContent = "Renderelés és export...";
    }

    if (progress >= 100) {
      generatorStatus.textContent = "Kész! A videó letölthető és megosztható.";
      clearInterval(interval);
    }
  }, 500);
});

// Counter animation when hero preview is visible
const counters = document.querySelectorAll("[data-target]");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const value = Number(entry.target.dataset.target);
        let current = 0;
        const increment = Math.ceil(value / 80);
        const interval = setInterval(() => {
          current += increment;
          if (current >= value) {
            entry.target.textContent = value.toLocaleString("hu-HU");
            clearInterval(interval);
          } else {
            entry.target.textContent = current.toLocaleString("hu-HU");
          }
        }, 30);
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.4 }
);

counters.forEach((counter) => observer.observe(counter));

// Simple logging for nav buttons for now
const kapcsolatButton = document.getElementById("kapcsolat");
kapcsolatButton.addEventListener("click", () => {
  console.log("Kapcsolat megnyomva");
});

const belepesButton = document.getElementById("belepes");
belepesButton.addEventListener("click", () => {
  console.log("Belepes megnyomva");
});
