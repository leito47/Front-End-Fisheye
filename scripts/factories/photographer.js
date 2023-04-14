function photographerFactory(data) {
  const { id, name, portrait, city, country, tagline, price } = data;

  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
    // creating elements in the DOM
    const article = document.createElement("article");
    const link = document.createElement("a");
    const img = document.createElement("img");

    const h2 = document.createElement("h2");
    const div = document.createElement("div");
    const locationCity = document.createElement("p");
    const tagLine = document.createElement("p");
    const pricePerDay = document.createElement("p");
    // element attributes
    img.setAttribute("src", picture);
    img.setAttribute("alt", "photo de profil de " + name);
    link.href = "././photographer.html?id=" + id;
    link.ariaLabel = name;
    h2.textContent = name;
    locationCity.textContent = city + ", " + country;
    tagLine.textContent = tagline;
    pricePerDay.textContent = price + "€/jour";
    // adding elements to the parent article

    article.appendChild(link);
    article.appendChild(h2);
    article.appendChild(div);
    // adding elements to the parent link
    link.appendChild(img);
    // adding elements to the parent div
    div.appendChild(locationCity);
    div.appendChild(tagLine);
    div.appendChild(pricePerDay);
    // return the elements
    return article;
  }
  return { getUserCardDOM };
}
