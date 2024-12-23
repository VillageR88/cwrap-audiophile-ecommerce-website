import data from "./fetchedData.js";
import { productShortNames } from "./const.js";

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
          console.log(dataItem.slug);
          console.log(dataItem);
          const cartProductContainerItem = document.createElement("div");
          const cartProductContainerItemProductDiv =
            document.createElement("div");
          const cartProductContainerItemProductDivPicture =
            document.createElement("img");
          cartProductContainerItemProductDivPicture.src = `../static/images/cart/image-${dataItem.slug}.jpg`;
          cartProductContainerItemProductDiv.appendChild(
            cartProductContainerItemProductDivPicture
          );
          cartProductContainerItem.appendChild(
            cartProductContainerItemProductDiv
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
