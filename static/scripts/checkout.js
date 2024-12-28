import data from "./fetchedData.js";
import { productShortNames } from "./const.js";

const getCartItems = () => JSON.parse(localStorage.getItem("cart")) || [];
const checkoutSummaryContainer = document.getElementById(
  "checkout-summary-container"
);
const cartItems = getCartItems();
const checkoutSummaryTotal = document.getElementById("checkout-summary-total");

function longNameFromShort(shortName) {
  for (const longName in productShortNames) {
    if (productShortNames[longName] === shortName) return longName;
  }
}
let totalCost = 0;
for (const itemName in cartItems) {
  const longName = longNameFromShort(itemName);
  const productData = data.find((product) => product.name === longName);
  console.log(productData);
  const checkoutSummaryContainerListItem = document.createElement("li");
  const checkoutSummaryContainerListItemDiv = document.createElement("div");
  const checkoutSummaryContainerListItemDivPicture =
    document.createElement("img");
  const checkoutSummaryContainerListItemDivSection =
    document.createElement("section");
  const checkoutSummaryContainerListItemDivSectionTitle =
    document.createElement("h3");
  const checkoutSummaryContainerListItemDivSectionDescription =
    document.createElement("p");
  const checkoutSummaryContainerListItemCount = document.createElement("span");

  checkoutSummaryContainerListItem.classList.add("cart-product-container-item");
  checkoutSummaryContainerListItemDiv.classList.add(
    "cart-product-container-item-product-div"
  );
  checkoutSummaryContainerListItemDivPicture.classList.add(
    "cart-product-container-item-product-div-picture"
  );
  checkoutSummaryContainerListItemDivSection.classList.add(
    "cart-product-container-item-product-div-section"
  );
  checkoutSummaryContainerListItemDivSectionTitle.classList.add(
    "cart-product-container-item-product-div-section-title"
  );
  checkoutSummaryContainerListItemDivSectionDescription.classList.add(
    "cart-product-container-item-product-div-section-description"
  );
  checkoutSummaryContainerListItemCount.classList.add(
    "checkout-summary-container-list-item-count"
  );

  checkoutSummaryContainerListItemDivPicture.src = `../static/images/cart/image-${productData.slug}.jpg`;
  checkoutSummaryContainerListItemDivSectionTitle.textContent = itemName;
  checkoutSummaryContainerListItemDivSectionDescription.textContent = `$ ${productData.price.toLocaleString()}`;
  checkoutSummaryContainerListItemCount.textContent = `x${cartItems[itemName]}`;

  checkoutSummaryContainerListItemDiv.appendChild(
    checkoutSummaryContainerListItemDivPicture
  );
  checkoutSummaryContainerListItemDivSection.appendChild(
    checkoutSummaryContainerListItemDivSectionTitle
  );
  checkoutSummaryContainerListItemDivSection.appendChild(
    checkoutSummaryContainerListItemDivSectionDescription
  );
  checkoutSummaryContainerListItemDiv.appendChild(
    checkoutSummaryContainerListItemDivSection
  );
  checkoutSummaryContainerListItem.appendChild(
    checkoutSummaryContainerListItemDiv
  );
  checkoutSummaryContainerListItem.appendChild(
    checkoutSummaryContainerListItemCount
  );
  checkoutSummaryContainer.appendChild(checkoutSummaryContainerListItem);
  totalCost += productData.price * cartItems[itemName];
}
console.log(totalCost);

checkoutSummaryTotal.textContent = totalCost.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).replace('$', '$ ');
