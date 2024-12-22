const mask = document.getElementById("mask");
const cart = document.getElementById("cart");
const cartAmount = document.getElementById("cart-amount");
const cartTotalCost = document.getElementById("cart-total-cost");

cartAmount.textContent = "0";
cartTotalCost.textContent = `$ ${"0".toLocaleString()}`;

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
