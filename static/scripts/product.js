import data from "./fetchedData.js";
import { productShortNames } from "./const.js";
import { inputButton } from "./elements.js";

const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
const cartAmount = document.getElementById("cart-amount");

const productContainer = document.getElementById("product-container");
const cartProductContainer = document.getElementById("cart-product-container");
const productSlug = productContainer.getAttribute("data-product-slug");
const hero = document.createElement("div");
const heroImage = document.createElement("img");
const heroDiv = document.createElement("div");
const heroNew = document.createElement("span");
const heroSection = document.createElement("section");
const heroTitle = document.createElement("h1");
const heroDescription = document.createElement("p");
const heroPrice = document.createElement("span");
const heroCartDiv = document.createElement("div");
const singleInputButton = inputButton();
const heroCartDivCartButton = document.createElement("button");
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

let productData;
for (const product of data) {
  if (product.slug === productSlug) {
    productData = product;
  }
}

hero.classList.add("hero-container");
heroImage.classList.add("hero-image");
heroImage.src = productData.image.desktop.replace(
  "./assets",
  "../static/images"
);
heroDiv.classList.add("hero-div");
heroNew.classList.add("hero-new");
heroNew.textContent = "NEW PRODUCT";
heroSection.classList.add("hero-section");
heroTitle.classList.add("hero-title");
heroTitle.textContent = productData.name.toUpperCase();
heroDescription.classList.add("hero-description");
heroDescription.textContent = productData.description;
heroPrice.classList.add("hero-price");
heroPrice.textContent = `$ ${productData.price.toLocaleString()}`;
heroCartDiv.classList.add("hero-cart-div");

heroCartDivCartButton.classList.add("hero-cart-div-cart-button");
heroCartDivCartButton.textContent = "ADD TO CART";
additional.classList.add("additional-container");
additionalFeatures.classList.add("additional-features");
additionalFeaturesTitle.classList.add("h2-title");
additionalFeaturesTitle.textContent = "FEATURES";
additionalFeaturesDescription.classList.add("p-description");
additionalFeaturesDescription.textContent = productData.features;
additionalBox.classList.add("additional-box");
additionalBoxTitle.classList.add("h2-title");
additionalBoxTitle.textContent = "IN THE BOX";
gallery.classList.add("gallery-container");
like.classList.add("like-container");
likeTitle.classList.add("h2-title");
likeTitle.textContent = "YOU MAY ALSO LIKE";
hero.appendChild(heroImage);
if (productData.new) heroDiv.appendChild(heroNew);
heroSection.appendChild(heroTitle);
heroSection.appendChild(heroDescription);
heroDiv.appendChild(heroSection);
heroDiv.appendChild(heroPrice);
heroCartDiv.appendChild(singleInputButton.container);
heroCartDiv.appendChild(heroCartDivCartButton);
heroDiv.appendChild(heroCartDiv);
hero.appendChild(heroDiv);
productContainer.appendChild(hero);
additionalFeatures.appendChild(additionalFeaturesTitle);
additionalFeatures.appendChild(additionalFeaturesDescription);
additional.appendChild(additionalFeatures);
additionalBox.appendChild(additionalBoxTitle);
for (const item of productData.includes) {
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
for (const item in productData.gallery) {
  const galleryImage = document.createElement("img");
  galleryImage.src = productData.gallery[item].desktop.replace(
    "./assets",
    "../static/images"
  );
  gallery.appendChild(galleryImage);
}
productContainer.appendChild(gallery);
like.appendChild(likeTitle);
for (const item of productData.others) {
  const itemWrapper = document.createElement("div");
  const itemImage = document.createElement("img");
  const itemSection = document.createElement("section");
  const itemSectionDescription = document.createElement("h3");
  const itemSectionButton = document.createElement("a");

  itemImage.src = item.image.desktop.replace("./assets", "../static/images");
  itemSectionDescription.textContent = item.name.toUpperCase();
  itemSectionButton.classList.add("button1", "hero-cart-div-cart-button");
  itemSectionButton.textContent = "SEE PRODUCT";
  itemSectionButton.href = `/${item.category}/${item.slug}`;

  itemWrapper.appendChild(itemImage);
  itemSection.appendChild(itemSectionDescription);
  itemSection.appendChild(itemSectionButton);
  itemWrapper.appendChild(itemSection);
  likeContentWrapper.appendChild(itemWrapper);
}
like.appendChild(likeContentWrapper);
productContainer.appendChild(like);

function updateLocalStorage(product, quantity) {
  const cart = JSON.parse(localStorage.getItem("cart")) || {};
  if (cart[product]) {
    cart[product] += quantity;
  } else {
    cart[product] = quantity;
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  cartAmount.textContent = Object.keys(cart).length.toString();
  cartItems.length = 0;
  Object.assign(cartItems, cart);
}

heroCartDivCartButton.addEventListener("click", () => {
  const productShortName = productShortNames[productData.name];
  const quantity = Number.parseInt(singleInputButton.input.value, 10);
  updateLocalStorage(productShortName, quantity);
  singleInputButton.input.value = 1;
});
