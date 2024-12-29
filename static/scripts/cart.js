import data from "./fetchedData.js";
import { productShortNames, formattedCost } from "./const.js";
import { inputButton } from "./elements.js";
import { fillSummary } from "./checkout.js";

const mask = document.getElementById("mask");
const cart = document.getElementById("cart");
const cartAmount = document.getElementById("cart-amount");
const cartTotalCost = document.getElementById("cart-total-cost");
const cartProductClear = document.getElementById("cart-product-clear");
const cartProductContainer = document.getElementById("cart-product-container");
const getCartItems = () => JSON.parse(localStorage.getItem("cart")) || [];
cartAmount.textContent = Object.keys(getCartItems()).length.toString();
cartTotalCost.textContent = `$ ${"0".toLocaleString()}`;

function updateCartDisplay() {
  cartProductContainer.innerHTML = "";
  let totalCost = 0;

  for (const item in getCartItems()) {
    for (const objItem in productShortNames) {
      if (productShortNames[objItem] === item) {
        for (const dataItem of data) {
          if (dataItem.name === objItem) {
            const cartProductContainerItem = document.createElement("li");
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
            const cartProductContainerItemInputButton = inputButton("type2", 0);
            cartProductContainerItemInputButton.input.value =
              getCartItems()[item];

            cartProductContainerItem.classList.add(
              "cart-product-container-item"
            );
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

            totalCost += dataItem.price * getCartItems()[item];

            cartProductContainerItemInputButton.input.addEventListener(
              "input",
              (event) => {
                const newQuantity = Number.parseInt(event.target.value, 10);
                if (Number.isNaN(newQuantity) || newQuantity < 0) {
                  event.target.value = getCartItems()[item];
                  return;
                }
                const cartItems = getCartItems();
                cartItems[item] = newQuantity;
                if (cartItems[item] === 0) {
                  delete cartItems[item];
                }
                localStorage.setItem("cart", JSON.stringify(cartItems));
                updateCartDisplay();
                fillSummary();
              }
            );
          }
        }
      }
    }
  }
  cartAmount.textContent = Object.keys(getCartItems()).length.toString();
  cartTotalCost.textContent = formattedCost(totalCost);
}

updateCartDisplay();

let cartIsOpen = false;
cart.addEventListener("click", () => {
  cartIsOpen = !cartIsOpen;
  manageCartPresence();
});

function manageCartPresence() {
  const mask = document.getElementById("mask");
  const bodyElements = document.querySelectorAll(
    "body *:not(#mask):not(#mask *)"
  ); // Select all body elements, excluding #mask and its children
  console.log(bodyElements);

  if (cartIsOpen) {
    window.scrollTo({ top: 0, behavior: "instant" });
    document.body.style.overflowY = "clip"; // Prevent scrolling
    mask.style.display = "block";

    for (const element of bodyElements) {
      if (element !== mask) {
        element.setAttribute("tabindex", "-1");
      }
    }
  } else {
    document.body.style.overflowY = "";
    mask.style.display = "none";

    for (const element of bodyElements) {
      element.removeAttribute("tabindex");
    }
  }
}

cartProductClear.addEventListener("click", () => {
  localStorage.removeItem("cart");
  cartAmount.textContent = "0";
  cartTotalCost.textContent = `$ ${"0".toLocaleString()}`;
  updateCartDisplay();
  fillSummary();
});

export { updateCartDisplay };
