let idSelectedPhotographer;
let medias;
//Recovery of the URL request chain
const urlID = document.location.search;

//Method for extraction of ID
const urlSearchParams = new URLSearchParams(urlID);
const photographerId = urlSearchParams.get("id");
let id = parseInt(photographerId);

//Recovery photographer information
async function profilPhotographer() {
  try {
    const url = "./data/photographers.json";
    const res = await fetch(url);
    const data = await res.json();

    //Display of the photographer profile that was selected by the ID
    idSelectedPhotographer = data.photographers.find((element) => {
      return element.id === id;
    });
     //Display of media  that was selected by the ID
    media = data.media.find((element) => {
      return element.id === id;
    });

    //call function fillHeader
    fillHeader(idSelectedPhotographer);

    //Error management
  } catch (error) {
    console.error(error);
  }
}
profilPhotographer();

function fillHeader(idSelectedPhotographer) {
  //elements of DOM
  const { name, city, country, tagline, price, portrait } =
    idSelectedPhotographer;
  const picture = `assets/photographers/${portrait}`;
  const header = document.querySelector(".photograph-header");
  const headerInfos = document.querySelector(".photograph-infos");
  const nameProfil = document.querySelector(".name-profil");
  const locationCity = document.querySelector(".location-city");
  const tagLine = document.querySelector(".tagline");
  
  // add picture of photographer
  const img = document.createElement("img");
  img.src = picture;
  img.alt = name;

  nameProfil.textContent = name;
  locationCity.textContent = city + ", " + country;
  tagLine.textContent = tagline;

  header.appendChild(img);
}

