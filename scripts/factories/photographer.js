function photographerFactory(data) {
  const { name, portrait, city, country, tagline, price } = data;

  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
    // creation des elements dans le DOM
    const article = document.createElement("article");
    const link = document.createElement('a');
    const img = document.createElement("img");
    const h2 = document.createElement("h2");
    const div =document.createElement("div");
    const locationCity = document.createElement("p");
    const tagLine = document.createElement("p");
    const pricePerDay = document.createElement("p");
    // attribus des elements
    img.setAttribute("src", picture);
    link.href="././photographer.html";
    h2.textContent = name;
    locationCity.textContent = city + ", " + country;
    tagLine.textContent = tagline;
    pricePerDay.textContent = price + "€/jour";
    // ajout d'elements au parent article
    article.appendChild(link);
    article.appendChild(h2);
    article.appendChild(div)
     // ajout d'elements au parent link
    link.appendChild(img); 
     // ajout d'elements au parent div
    div.appendChild(locationCity);
    div.appendChild(tagLine);
    div.appendChild(pricePerDay);
    // on return les elements
    return article;
  }
  return { getUserCardDOM };
}
