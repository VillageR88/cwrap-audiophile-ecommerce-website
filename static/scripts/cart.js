import data from "./fetchedData.js";
import { productShortNames } from "./const.js";
import { inputButton } from "./elements.js";

const mask = document.getElementById("mask");
const cart = document.getElementById("cart");
const cartAmount = document.getElementById("cart-amount");
const cartTotalCost = document.getElementById("cart-total-cost");
const cartProductClear = document.getElementById("cart-product-clear");
const cartProductContainer = document.getElementById("cart-product-container");

const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
cartAmount.textContent = Object.keys(cartItems).length.toString();
cartTotalCost.textContent = `$ ${"0".toLocaleString()}`;

for (const item in cartItems) {
  for (const objItem in productShortNames) {
    if (productShortNames[objItem] === item) {
      for (const dataItem of data) {
        if (dataItem.name === objItem) {
          const cartProductContainerItem = document.createElement("div");
          const cartProductContainerItemProductDiv =
            document.createElement("div");
          const cartProductContainerItemProductDivPicture =
            document.createElement("img");
          const cartProductContainerItemProductDivSection =
            document.createElement("section");
          const cartProductContainerItemProductDivSectionTitle =
            document.createElement("h3");
          const cartProductContainerItemProductDivSectionDescription =
            document.createElement("p");
          const cartProductContainerItemInputButton = inputButton("type2");

          cartProductContainerItem.classList.add("cart-product-container-item");
          cartProductContainerItemProductDiv.classList.add(
            "cart-product-container-item-product-div"
          );
          cartProductContainerItemProductDivPicture.classList.add(
            "cart-product-container-item-product-div-picture"
          );
          cartProductContainerItemProductDivSection.classList.add(
            "cart-product-container-item-product-div-section"
          );
          cartProductContainerItemProductDivSectionTitle.classList.add(
            "cart-product-container-item-product-div-section-title"
          );
          cartProductContainerItemProductDivSectionDescription.classList.add(
            "cart-product-container-item-product-div-section-description"
          );

          cartProductContainerItemProductDivPicture.src = `../static/images/cart/image-${dataItem.slug}.jpg`;
          cartProductContainerItemProductDivSectionTitle.textContent =
            productShortNames[objItem];
          console.log(dataItem);
          cartProductContainerItemProductDivSectionDescription.textContent = `$ ${dataItem.price.toLocaleString()}`;

          cartProductContainerItemProductDiv.appendChild(
            cartProductContainerItemProductDivPicture
          );
          cartProductContainerItemProductDivSection.appendChild(
            cartProductContainerItemProductDivSectionTitle
          );
          cartProductContainerItemProductDivSection.appendChild(
            cartProductContainerItemProductDivSectionDescription
          );
          cartProductContainerItemProductDiv.appendChild(
            cartProductContainerItemProductDivSection
          );
          cartProductContainerItem.appendChild(
            cartProductContainerItemProductDiv
          );
          cartProductContainerItem.appendChild(
            cartProductContainerItemInputButton.container
          );
          cartProductContainer.appendChild(cartProductContainerItem);
        }
      }
    }
  }
}

let cartIsOpen = false;
cart.addEventListener("click", () => {
  if (cartIsOpen === false) cartIsOpen = true;
  else cartIsOpen = false;
  manageCartPresence();
});

function manageCartPresence() {
  if (cartIsOpen) {
    window.scrollTo({ top: 0, behavior: "instant" });
    document.body.style.overflowY = "clip";
    mask.style.display = "block";
  } else {
    document.body.style.overflowY = "";
    mask.style.display = "none";
  }
}

cartProductClear.addEventListener("click", () => {
  localStorage.removeItem("cart");
  cartAmount.textContent = "0";
  cartTotalCost.textContent = `$ ${"0".toLocaleString()}`;
});
