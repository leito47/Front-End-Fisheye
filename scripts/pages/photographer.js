let idSelectedPhotographer;
let medias;
//Recovery of the URL request chain
const urlID = document.location.search;

//Method for extraction of ID
const urlSearchParams = new URLSearchParams(urlID);
const photographerid = urlSearchParams.get("id");
let photographerId = parseInt(photographerid);

//Recovery photographer information
async function profilPhotographer() {
  try {
    const url = "./data/photographers.json";
    const res = await fetch(url);
    const data = await res.json();

    //Display of the photographer profile that was selected by the ID
    idSelectedPhotographer = data.photographers.find(
      (photographers) => photographers.id === photographerId
    );

    //Display medias of photograph by the ID
    medias = data.media.filter(
      (media) => media.photographerId === photographerId
    );

    //call function fillHeader
    fillHeader(idSelectedPhotographer);
    displayMedia(idSelectedPhotographer, medias);

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
  locationCity.textContent = `${city}, ${country}`;
  tagLine.textContent = tagline;
  header.appendChild(img);
}

function displayMedia(idSelectedPhotographer, medias) {
  const photographersMedia = document.getElementById("photographers-media");
  //Creation element DOM

  medias.forEach((media) => {
    const article = document.createElement("article");
    const link = document.createElement("a");
    link.href = "#";
    const mediaPictureElement = document.createElement("img");
    mediaPictureElement.alt = media.title;
    mediaPictureElement.className = "carroussel-picture";
    mediaPictureElement.src = `assets/images/${idSelectedPhotographer.name}/${
      media.image ?? media.video
    }`;

    const divInfos = document.createElement("div");
    divInfos.className = "infoPicture";
    const spanTagline = document.createElement("span");
    spanTagline.style.fontSize = "1.2rem";
    spanTagline.textContent = media.title;
    const spanLike = document.createElement("span");
    spanLike.style.fontSize = "1.2rem";

    spanLike.textContent = media.likes;
    const heart = document.createElement("img");

    heart.className = "heart";
    heart.src = "assets/images/heart-solid.svg";

    photographersMedia.appendChild(article);
    article.appendChild(link);
    article.appendChild(mediaPictureElement);
    article.appendChild(divInfos);
    divInfos.appendChild(spanTagline);
    divInfos.appendChild(spanLike);
    spanLike.appendChild(heart);
  });
}
