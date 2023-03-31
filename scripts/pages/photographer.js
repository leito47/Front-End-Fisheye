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
    orderMedias(idSelectedPhotographer, medias);
    modalLightBox();
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
  totalHeart.setAttribute("alt", "image heart like total");
  totalHeart.src = "assets/images/heart-solid black.svg";
  const totalPricePerDay = document.createElement("span");

  const totalLikesSum = medias.reduce((total, media) => total + media.likes, 0);
  totalSpanLike.textContent = totalLikesSum.toString();

  totalPricePerDay.textContent = `${price} €/jour`;

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
    const link = document.createElement("a");
    const article = document.createElement("article");
    article.setAttribute("data-id", media.id);

    const divInfos = document.createElement("div");
    const spanTagline = document.createElement("span");
    const divCounterHeart = document.createElement("div");
    divCounterHeart.setAttribute("class", "div-counter-heart");
    const spanLike = document.createElement("span");
    spanLike.setAttribute("class", "counter-like");
    const heart = document.createElement("img");
    heart.setAttribute("class", "heart");
    heart.setAttribute("alt", " image heart like");
    divInfos.className = "infoPicture";
    spanTagline.style.fontSize = "1.2rem";
    spanTagline.textContent = media.title;
    spanLike.style.fontSize = "1.2rem";
    spanLike.textContent = media.likes;

    heart.src = "assets/images/heart-solid rouge.svg";

    link.href = "#";

    mediaPictureElement = media.video
      ? document.createElement("video")
      : document.createElement("img");
    mediaPictureElement.src = `./assets/images/${idSelectedPhotographer.name}/${
      media.video ?? media.image
    }`;

    mediaPictureElement.setAttribute("class", "carroussel-picture ");
    mediaPictureElement.setAttribute("alt", media.title);

    heart.addEventListener("click", function (e) {
      let counterlike = e.target.parentNode.querySelector(".counter-like");
      let totallike = parseInt(counterlike.textContent);
      totallike++;
      counterlike.textContent = totallike;
      updateTotalLike();
    });

    photographersMedia.appendChild(link);
    link.appendChild(article);
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

/**
 * Show the lightbox
 * @param {Array} media
 */
const modalLightBox = () => {
  Array.from(document.querySelectorAll(".carroussel-picture")).forEach(
    (element) => {
      element.addEventListener("click", (event) => {
        /* Open the lightbox */
        document.querySelector("#lightbox").classList.add("active");

        /* Select the current media */
        let currentMedia = event.target.src;
        let mediaId = event.target.parentNode.dataset.id;

        let modaLightboxElement;
        const extensionCurrentMedia = currentMedia.split(".").pop();

        if (extensionCurrentMedia === "mp4") {
          modaLightboxElement = document.createElement("video");
          modaLightboxElement.setAttribute("controls", "");
        } else {
          modaLightboxElement = document.createElement("img");
        }

        modaLightboxElement.setAttribute("class", "lightbox-image");
        modaLightboxElement.setAttribute("data-id", mediaId);
        modaLightboxElement.src = currentMedia;
        modaLightboxElement.alt = idSelectedPhotographer.name;

        document.querySelector("#lightbox").appendChild(modaLightboxElement);
      });
    }
  );

  const div = document.createElement("div");
  div.setAttribute("id", "lightbox");
  div.setAttribute("class", "lightbox");

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
  div.appendChild(buttonGauche);
  div.appendChild(buttonDroit);
  div.appendChild(buttonClose);

  /**
   * Event listener click lightBoxElement
   */

  const clickPreviousLightbox = (buttonGauche) => {
    const previousLighboxFn = () => {
      let currentMedia = document.querySelector(".lightbox-image");
      let lightboxId = parseInt(currentMedia.dataset.id);
      let currentIndex = medias.findIndex(
        (element) => element.id === lightboxId
      );
      let previousMedia;
      if (currentIndex <= 0) {
        previousMedia = medias[medias.length - 1];
      } else {
        previousMedia = medias[currentIndex - 1];
      }

      console.log("id", previousMedia, currentIndex, lightboxId);

      const mediaPrevious = previousMedia.image ?? previousMedia.video;
      const extensionCurrentMedia = mediaPrevious.split(".").pop();
      let modaLightboxElement = "";

      if (extensionCurrentMedia === "mp4") {
        modaLightboxElement = document.createElement("video");
        modaLightboxElement.setAttribute("controls", "");
      } else {
        modaLightboxElement = document.createElement("img");
      }

      modaLightboxElement.setAttribute("class", "lightbox-image");
      modaLightboxElement.setAttribute("data-id", previousMedia.id);
      modaLightboxElement.src = `assets/images/${idSelectedPhotographer.name}/${mediaPrevious}`;
      modaLightboxElement.alt = previousMedia.title;

      document.querySelector(".lightbox-image").remove();
      document.querySelector("#lightbox").appendChild(modaLightboxElement);
    };
    buttonGauche.addEventListener("click", previousLighboxFn);
    document.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") {
        previousLighboxFn();
      }
    });
  };

  const clickNextLightbox = (buttonDroit) => {
    const nextLighboxFn = () => {
      let currentMedia = document.querySelector(".lightbox-image");
      let lightboxId = parseInt(currentMedia.dataset.id);
      let currentIndex = medias.findIndex(
        (element) => element.id === lightboxId
      );

      let nextMedia;
      if (currentIndex === medias.length - 1) {
        nextMedia = medias[0];
      } else {
        nextMedia = medias[currentIndex + 1];
      }
      const mediaNext = nextMedia.image ?? nextMedia.video;
      const extensionCurrentMedia = mediaNext.split(".").pop();
      let modaLightboxElement = "";

      if (extensionCurrentMedia === "mp4") {
        modaLightboxElement = document.createElement("video");
        modaLightboxElement.setAttribute("controls", "");
      } else {
        modaLightboxElement = document.createElement("img");
      }

      modaLightboxElement.setAttribute("class", "lightbox-image");
      modaLightboxElement.setAttribute("data-id", nextMedia.id);
      modaLightboxElement.src = `assets/images/${idSelectedPhotographer.name}/${mediaNext}`;
      modaLightboxElement.alt = nextMedia.title;

      document.querySelector(".lightbox-image").remove();
      document.querySelector("#lightbox").appendChild(modaLightboxElement);
    };
    buttonDroit.addEventListener("click", nextLighboxFn);
    document.addEventListener("keydown", (event) => {
      if (event.key === "ArrowRight") {
        nextLighboxFn();
      }
    });
  };

  const clickCloseLightbox = (buttonClose) => {
    const closeLightbox = document.getElementById("lightbox");

    const closeLightboxFn = () => {
      closeLightbox.classList.remove("active");
      document.querySelector(".lightbox-image").remove();
    };

    buttonClose.addEventListener("click", closeLightboxFn);

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeLightboxFn();
      }
    });
  };

  /* Add Event listener function */

  clickPreviousLightbox(buttonGauche);
  clickNextLightbox(buttonDroit);
  clickCloseLightbox(buttonClose);
};

/* sort function */

function orderMedias(idSelectedPhotographer, medias) {
  const selectSort = document.getElementById("sort-photo");
  selectSort.addEventListener("change", function () {
    const selectedValue = selectSort.value;

    switch (selectedValue) {
      // sort by popularite
      case "popularite":
        medias.sort((a, b) => b.likes - a.likes);
        break;

      // sort by date
      case "date":
        medias.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;

      // sort by title
      case "titre":
        medias.sort((a, b) => a.title.localeCompare(b.title));
        break;

      default:
        console.log("Choix invalide !");
    }
    const resetSort = (document.querySelector(
      "#photographers-media"
    ).innerHTML = "");
    displayMedia(idSelectedPhotographer, medias);
    modalLightBox();
  });
}
