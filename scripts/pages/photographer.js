let idSelectedPhotographer;
let medias;

/**
 * Recovery of the URL request chain
 */

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

    //call function
    fillHeader(idSelectedPhotographer);
    displayMedia(idSelectedPhotographer, medias);
    modalLightBox(medias);
    likesTotal();

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

  // add picture of photographer
  const picture = `assets/photographers/${portrait}`;
  const header = document.querySelector(".photograph-header");
  const headerInfos = document.querySelector(".photograph-infos");
  const nameProfil = document.querySelector(".name-profil");
  const locationCity = document.querySelector(".location-city");
  const tagLine = document.querySelector(".tagline");
  const img = document.createElement("img");
  img.src = picture;
  img.alt = name;
  nameProfil.textContent = name;
  locationCity.textContent = `${city}, ${country}`;
  tagLine.textContent = tagline;
  header.appendChild(img);

  //add total likes and price per day
  const totalLikes = document.createElement("div");
  totalLikes.setAttribute("class", "total-likes-price");
  const div = document.createElement("div");
  div.setAttribute("class", "like-heart");
  const totalSpanLike = document.createElement("span");
  const totalHeart = document.createElement("img");
  totalHeart.setAttribute("class", "hearts");
  totalHeart.src = "assets/images/heart-solid black.svg";
  const totalPricePerDay = document.createElement("span");

  const totalLikesSum = medias.reduce((total, media) => total + media.likes, 0);
  totalSpanLike.textContent = totalLikesSum.toString();

  totalPricePerDay.textContent = `${idSelectedPhotographer.price} €/jour`;

  main.appendChild(totalLikes);
  totalLikes.appendChild(div);
  div.appendChild(totalSpanLike);
  div.appendChild(totalHeart);
  totalLikes.appendChild(totalPricePerDay);
}

function displayMedia(idSelectedPhotographer, medias) {
  const photographersMedia = document.getElementById("photographers-media");
  //Creation element DOM

  medias.forEach((media) => {
    let mediaPictureElement;

    const article = document.createElement("article");
    article.setAttribute("data-id", media.id);

    const link = document.createElement("a");
    const divInfos = document.createElement("div");
    const spanTagline = document.createElement("span");
    const divCounterHeart = document.createElement("div");
    divCounterHeart.setAttribute("class", "div-counter-heart");
    const spanLike = document.createElement("span");
    spanLike.setAttribute("class", "counter-like");
    const heart = document.createElement("img");
    heart.setAttribute("class", "heart");
    divInfos.className = "infoPicture";
    spanTagline.style.fontSize = "1.2rem";
    spanTagline.textContent = media.title;
    spanLike.style.fontSize = "1.2rem";
    spanLike.textContent = media.likes;

    heart.src = "assets/images/heart-solid rouge.svg";

    link.href = "#";

    if (media.image) {
      mediaPictureElement = document.createElement("img");
      mediaPictureElement.setAttribute("class", "carroussel-picture ");
      mediaPictureElement.setAttribute("alt", media.title);
    } else {
      mediaPictureElement = document.createElement("video");
      mediaPictureElement.setAttribute("class", "carroussel-video");
      mediaPictureElement.setAttribute("alt", media.title);
      mediaPictureElement.controls = false;
      mediaPictureElement.autoplay = false;
    }
    mediaPictureElement.setAttribute(
      "src",
      `assets/images/${idSelectedPhotographer.name}/${
        media.image ?? media.video
      }`
    );

    mediaPictureElement.addEventListener("click", function (e) {
      e.preventDefault();
      lightbox.classList.add("show");
      mediaPictureElement = `assets/images/${idSelectedPhotographer.name}/${
        media.image ?? media.video
      }`;
      const lightboxImage = (document.querySelector(".lightbox-image").src =
        mediaPictureElement);
      // const lightboxAlt= (document.querySelector(".lightbox-image").alt =
      // mediaPictureElement.alt);
      //  lightboxImage.controls=true;
      //  lightboxImage.setAttribute("alt",media.title);

      console.log(lightboxImage);
    });

    heart.addEventListener("click", function (e) {
      let counterlike = e.target.parentNode.querySelector(".counter-like");
      let totallike = parseInt(counterlike.textContent);
      totallike++;
      counterlike.textContent = totallike;
      updateTotalLike();
    });

    photographersMedia.appendChild(article);
    article.appendChild(link);
    article.appendChild(mediaPictureElement);
    article.appendChild(divInfos);
    divInfos.appendChild(spanTagline);
    divInfos.appendChild(divCounterHeart);
    divCounterHeart.appendChild(spanLike);
    divCounterHeart.appendChild(heart);
  });
}

/**
 * update the number of total likes of the photographer
 */
const updateTotalLike = () => {
  let totalLikeNumber = parseInt(
    document.querySelector(".total-likes-price").querySelector("span")
      .textContent
  );
  totalLikeNumber++;
  document
    .querySelector(".total-likes-price")
    .querySelector("span").textContent = totalLikeNumber;
};

/**
 * Show the number of like of media
 * @return {Number} return the number of like
 */
const likesTotal = () => {
  let sum = 0;
  medias.forEach((media) => {
    sum += media.likes;
    return sum;
  });
};

const clickOpenModalLightbox = (lightboxImage) => {
  console.log("Open the lightbox", lightboxImage);
};

/**
 * Show the lightbox
 * @param {Array} media
 */
const modalLightBox = (media) => {
  const div = document.createElement("div");
  div.setAttribute("id", "lightbox");
  div.setAttribute("class", "lightbox");

  const lightboxImage = document.createElement("img");
  lightboxImage.setAttribute("class", "lightbox-image");
  lightboxImage.alt = "";
  lightboxImage.src = "";

  const buttonGauche = document.createElement("img");
  buttonGauche.setAttribute("id", "left-arrow");
  buttonGauche.setAttribute("aria-label", "Previous image");
  buttonGauche.src = "assets/images/chevron-left-solid.svg";

  const buttonDroit = document.createElement("img");
  buttonDroit.setAttribute("id", "right-arrow");
  buttonDroit.setAttribute("aria-label", "Next image");
  buttonDroit.src = "assets/images/chevron-right-solid.svg";

  const buttonClose = document.createElement("img");
  buttonClose.setAttribute("id", "close-lightbox");
  buttonClose.setAttribute("aria-label", "close lightbox");
  buttonClose.src = "assets/images/xmark-solid.svg";

  main.appendChild(div);
  div.appendChild(lightboxImage);
  div.appendChild(buttonGauche);
  div.appendChild(buttonDroit);
  div.appendChild(buttonClose);

  const clickPreviousLightbox = (buttonGauche) => {
    buttonGauche.addEventListener("click", function (medias) {
      const lightboxImage = document.querySelector(".lightbox-image");
      const currentImageIndex = medias.find((index) => index === medias.id);

      console.log(currentImageIndex);
    });
  };

  const clickNextLightbox = (buttonDroit) => {
    buttonDroit.addEventListener("click", function () {
      console.log("clic next");
    });
  };

  const clickCloseLightbox = (buttonClose) => {
    buttonClose.addEventListener("click", function () {
      const closeLightbox = document.getElementById("lightbox");
      closeLightbox.classList.remove("show");
    });
  };

  /* Add Event listener function */
  clickOpenModalLightbox(lightboxImage);
  clickPreviousLightbox(buttonGauche);
  clickNextLightbox(buttonDroit);
  clickCloseLightbox(buttonClose);
};

// buttonGauche.addEventListener("click" =()=>{console.log('ok')});
// buttonDroit.addEventListener("click", function () {});
// buttonClose.addEventListener("click", function () {});

const selectSort = document.getElementById("sort-photo");
selectSort.addEventListener("change", function (a, b) {
  const selectedValue = selectSort.value;

  switch (selectedValue) {
    // sort by popularite
    case "popularite":
      medias.sort((a, b) => b.likes - a.likes);
      console.log(selectedValue, medias);
    
      break;

    // sort by date
    case "date":
      medias.sort((a, b) => new Date(b.date) - new Date(a.date));
      console.log(selectedValue, medias);
    
      break;

    // sort by title
    case "titre":
      medias.sort((a, b) => a.title.localeCompare(b.title));

      break;

    default:
      console.log("Choix invalide !");
  }

});
