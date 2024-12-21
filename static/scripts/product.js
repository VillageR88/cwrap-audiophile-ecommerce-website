const data = await fetchJson();

async function fetchJson() {
  const response = await fetch("../static/scripts/data.json");
  const data = await response.json();
  return data;
}

const productContainer = document.getElementById("product-container");
const hero = document.createElement("div");
const heroImage = document.createElement("img");
const heroDiv = document.createElement("div");
const heroNew = document.createElement("span");
const heroSection = document.createElement("section");
const heroTitle = document.createElement("h1");
const heroDescription = document.createElement("p");
const heroPrice = document.createElement("span");
const heroCartDiv = document.createElement("div");
const heroCartDivCountDiv = document.createElement("div");
const heroCartDivCountMinus = document.createElement("button");
const heroCartDivCountPlus = document.createElement("button");
const heroCartDivCartButton = document.createElement("button");
const heroCartDivCountInput = document.createElement("input");
const additional = document.createElement("div");
const additionalFeatures = document.createElement("section");
const additionalFeaturesTitle = document.createElement("h2");
const additionalFeaturesDescription = document.createElement("p");
const additionalBox = document.createElement("section");
const additionalBoxTitle = document.createElement("h2");
const gallery = document.createElement("div");
const like = document.createElement("div");
const likeTitle = document.createElement("h2");
const likeContentWrapper = document.createElement("div");

hero.classList.add("hero-container");
heroImage.classList.add("hero-image");
heroImage.src = data[3].image.desktop.replace("./assets", "../static/images");
heroDiv.classList.add("hero-div");
heroNew.classList.add("hero-new");
heroNew.textContent = "NEW PRODUCT";
heroSection.classList.add("hero-section");
heroTitle.classList.add("hero-title");
heroTitle.textContent = data[3].name.toUpperCase();
heroDescription.classList.add("hero-description");
heroDescription.textContent = data[3].description;
heroPrice.classList.add("hero-price");
heroPrice.textContent = `$ ${data[3].price.toLocaleString()}`;
heroCartDiv.classList.add("hero-cart-div");
heroCartDivCountMinus.classList.add("hero-cart-div-count-buttons");
heroCartDivCountMinus.textContent = "-";
heroCartDivCountInput.id = "countInput";
heroCartDivCountInput.classList.add("hero-cart-div-count-input");
heroCartDivCountInput.type = "number";
heroCartDivCountInput.value = 1;
heroCartDivCountInput.min = 1;
heroCartDivCountInput.max = 300;
heroCartDivCountPlus.classList.add("hero-cart-div-count-buttons");
heroCartDivCountPlus.textContent = "+";
heroCartDivCountDiv.classList.add("hero-cart-div-count-div");
heroCartDivCartButton.classList.add("hero-cart-div-cart-button");
heroCartDivCartButton.textContent = "ADD TO CART";
additional.classList.add("additional-container");
additionalFeatures.classList.add("additional-features");
additionalFeaturesTitle.classList.add("h2-title");
additionalFeaturesTitle.textContent = "FEATURES";
additionalFeaturesDescription.classList.add("p-description");
additionalFeaturesDescription.textContent = data[3].features;
additionalBox.classList.add("additional-box");
additionalBoxTitle.classList.add("h2-title");
additionalBoxTitle.textContent = "IN THE BOX";
gallery.classList.add("gallery-container");
like.classList.add("like-container");
likeTitle.classList.add("h2-title");
likeTitle.textContent = "YOU MAY ALSO LIKE";
hero.appendChild(heroImage);
heroDiv.appendChild(heroNew);
heroSection.appendChild(heroTitle);
heroSection.appendChild(heroDescription);
heroDiv.appendChild(heroSection);
heroDiv.appendChild(heroPrice);
heroCartDivCountDiv.appendChild(heroCartDivCountMinus);
heroCartDivCountDiv.appendChild(heroCartDivCountInput);
heroCartDivCountDiv.appendChild(heroCartDivCountPlus);
heroCartDiv.appendChild(heroCartDivCountDiv);
heroCartDiv.appendChild(heroCartDivCartButton);
heroDiv.appendChild(heroCartDiv);
hero.appendChild(heroDiv);
productContainer.appendChild(hero);
additionalFeatures.appendChild(additionalFeaturesTitle);
additionalFeatures.appendChild(additionalFeaturesDescription);
additional.appendChild(additionalFeatures);
additionalBox.appendChild(additionalBoxTitle);
for (const item of data[3].includes) {
  const additionalBoxDescription = document.createElement("p");
  const spanQuantity = document.createElement("span");
  const spanItem = document.createElement("span");
  additionalBoxDescription.classList.add("additional-box-p");
  spanQuantity.classList.add("additional-box-span-quantity");
  spanQuantity.textContent = `${item.quantity}x`;
  spanItem.classList.add("additional-box-span-item");
  spanItem.textContent = item.item;
  additionalBoxDescription.appendChild(spanQuantity);
  additionalBoxDescription.appendChild(spanItem);
  additionalBox.appendChild(additionalBoxDescription);
}
additional.appendChild(additionalBox);
productContainer.appendChild(additional);
for (const item in data[3].gallery) {
  const galleryImage = document.createElement("img");
  galleryImage.src = data[3].gallery[item].desktop.replace(
    "./assets",
    "../static/images"
  );
  gallery.appendChild(galleryImage);
}
productContainer.appendChild(gallery);
like.appendChild(likeTitle);
for (const item of data[3].others) {
  const itemWrapper = document.createElement("div");
  const itemImage = document.createElement("img");
  const itemSection = document.createElement("section");
  const itemSectionDescription = document.createElement("h3");
  const itemSectionButton = document.createElement("a");

  itemImage.src = item.image.desktop.replace("./assets", "../static/images");
  itemSectionDescription.textContent = item.name.toUpperCase();
  itemSectionButton.classList.add("hero-cart-div-cart-button");
  itemSectionButton.textContent = "SEE PRODUCT"

  itemWrapper.appendChild(itemImage);
  itemSection.appendChild(itemSectionDescription);
  itemSection.appendChild(itemSectionButton);
  itemWrapper.appendChild(itemSection);
  likeContentWrapper.appendChild(itemWrapper);
}
like.appendChild(likeContentWrapper);
productContainer.appendChild(like);

heroCartDivCountMinus.addEventListener("click", () => {
  if (heroCartDivCountInput.value > 1) {
    heroCartDivCountInput.value--;
  }
});

heroCartDivCountPlus.addEventListener("click", () => {
  if (heroCartDivCountInput.value < 300) {
    heroCartDivCountInput.value++;
  }
});

heroCartDivCountInput.addEventListener("input", () => {
  const value = Number.parseInt(heroCartDivCountInput.value, 10);
  if (Number.isNaN(value) || value < 1) {
    heroCartDivCountInput.value = 1;
  } else if (value > 300) {
    heroCartDivCountInput.value = 300;
  } else {
    heroCartDivCountInput.value = value;
  }
});
