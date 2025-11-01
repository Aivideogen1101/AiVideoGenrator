document.getElementById("generate-btn").addEventListener("click", function () {
  alert("A funkcio hamarosan erkezik! 😊");
});

document.getElementById("kapcsolat").addEventListener("click", function () {
  console.log("Kapcsolat menu megnyomva");
});

document.getElementById("hogyan").addEventListener("click", function () {
  console.log("Hogyan mukodik? menu megnyomva");
});

const registrationButton = document.getElementById("reg");
const modal = document.getElementById("registration-modal");
const closeModalButton = document.getElementById("close-modal");
const registrationForm = document.getElementById("registration-form");
const feedback = document.getElementById("registration-feedback");

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

registrationButton.addEventListener("click", function (event) {
  event.preventDefault();
  toggleModal(true);
});

closeModalButton.addEventListener("click", function () {
  toggleModal(false);
});

modal.addEventListener("click", function (event) {
  if (event.target === modal) {
    toggleModal(false);
  }
});

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape" && modal.classList.contains("modal--visible")) {
    toggleModal(false);
  }
});

registrationForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const fullName = registrationForm["full-name"].value.trim();
  const email = registrationForm.email.value.trim();
  const password = registrationForm.password.value.trim();

  if (!fullName || !email || !password) {
    feedback.textContent = "Kerlek toltson ki minden mezot.";
    feedback.classList.add("modal__feedback--error");
    return;
  }

  if (password.length < 8) {
    feedback.textContent = "A jelszonak legalabb 8 karakter hosszunak kell lennie.";
    feedback.classList.add("modal__feedback--error");
    return;
  }

  feedback.classList.remove("modal__feedback--error");
  feedback.textContent = `Koszonjuk, ${fullName}! A regisztracio sikeresen elindult.`;

  setTimeout(function () {
    toggleModal(false);
  }, 2000);
});

document.getElementById("belepes").addEventListener("click", function () {
  console.log("Belepes megnyomva");
});
