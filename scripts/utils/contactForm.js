const contactButton = document.querySelector(".contact_button");
contactButton.addEventListener("click", displayModal);
const closeCross = document.querySelector(".close-cross");
closeCross.setAttribute("alt", "croix de fermeture");
closeCross.addEventListener("click", closeModal);
const send = document.querySelector(".send");
send.addEventListener("click", sendModal);
const firstNameInput = document.querySelector("#firstName");
const lastNameInput = document.querySelector("#lastName");
const emailInput = document.querySelector("#email");
const messageInput = document.querySelector("#message");

function displayModal() {
  firstNameInput.value = "";
  lastNameInput.value = "";
  emailInput.value = "";
  messageInput.value = "";
  const modal = document.getElementById("contact_modal");
  modal.style.display = "block";
  const nameContact = document.querySelector("h2");
  nameContact.innerHTML = "Contactez-moi \n " + idSelectedPhotographer.name;
}

function closeModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";
}

function sendModal(event) {
  event.preventDefault();

  console.log("Prénom :", firstNameInput.value);
  console.log("Nom:", lastNameInput.value);
  console.log("Email:", emailInput.value);
  console.log("Votre message:", messageInput.value);
  closeModal();
}
