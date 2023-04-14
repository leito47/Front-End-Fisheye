async function getPhotographers() {
  const url = "./../data/photographers.json";
  const res = await fetch(url);
  const data = await res.json();
  console.log(data);
  return data;
}
async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");

  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

// Retrieves data from photographers
async function init() {
  const { photographers } = await getPhotographers();
  displayData(photographers);
}

init();
