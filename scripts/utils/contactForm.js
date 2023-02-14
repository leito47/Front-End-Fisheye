function displayModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "block";
  const nameContact = document.querySelector("h2");
  nameContact.innerHTML = "Contactez-moi \n " + idSelectedPhotographer.name;
}

function closeModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";
}

function Send(event) {
  event.preventDefault();

  const firstNameInput = document.querySelector("#First name").value;
  const lastNameInput = document.querySelector("#Last name").value;
  const emailInput = document.querySelector("#Email").value;
  const messageInput = document.querySelector("#Message").value;

  console.log("Prénom :", firstNameInput);
  console.log("Nom:", lastNameInput);
  console.log("Email:", emailInput);
  console.log("Votre message:", messageInput);

}

