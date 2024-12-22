import data from "./fetchedData.js";

const mask = document.getElementById("mask");
const cart = document.getElementById("cart");
const cartAmount = document.getElementById("cart-amount");
const cartTotalCost = document.getElementById("cart-total-cost");
const cartProductClear = document.getElementById("cart-product-clear");
const cartProductContainer = document.getElementById("cart-product-container");
const cartProductContainerItem = document.getElementById(
  "cart-product-container-item"
);
const cartProductContainerItemProductDiv = document.getElementById(
  "cart-product-container-item-product-div"
);
const cartProductContainerItemProductDivPicture = document.getElementById(
  "cart-product-container-item-product-div-picture"
);

const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
cartAmount.textContent = Object.keys(cartItems).length.toString();
cartTotalCost.textContent = `$ ${"0".toLocaleString()}`;

for (const item in cartItems) {
  const key = item;
  const value = cartItems[item];
  console.log(data);
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
