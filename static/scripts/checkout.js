import data from "./fetchedData.js";
import { productShortNames, formattedCost } from "./const.js";

export function fillSummary() {
  const checkoutSummaryContainer = document.getElementById(
    "checkout-summary-container"
  );
  if (!checkoutSummaryContainer) return;
  checkoutSummaryContainer.innerHTML = "";

  const getCartItems = () => JSON.parse(localStorage.getItem("cart")) || [];
  const cartItems = getCartItems();
  const checkoutSummaryTotal = document.getElementById(
    "checkout-summary-total"
  );
  const checkoutSummaryShipping = document.getElementById(
    "checkout-summary-shipping"
  );
  const checkoutSummaryVat = document.getElementById("checkout-summary-vat");
  const checkoutSummaryGrand = document.getElementById(
    "checkout-summary-grand"
  );
  const checkoutForm = document.getElementById("checkout-form");
  const inputEMoney = document.getElementById("e-money");
  const cashOnDelivery = document.getElementById("cash-on-delivery");
  const eMoneyPaymentType = document.getElementById("e-money-payment-type");
  const cashOnDeliveryInformation = document.getElementById(
    "cash-on-delivery-information"
  );
  const eMoneyNumber = document.getElementById("e-money-number");
  const eMoneyPin = document.getElementById("e-money-pin");
  const confirmationProductsContainer = document.getElementById(
    "confirmation-products-container"
  );
  const confirmationTotal = document.getElementById("confirmation-total");

  function longNameFromShort(shortName) {
    for (const longName in productShortNames) {
      if (productShortNames[longName] === shortName) return longName;
    }
  }
  let totalCost = 0;
  for (const itemName in cartItems) {
    const longName = longNameFromShort(itemName);
    const productData = data.find((product) => product.name === longName);
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
    const checkoutSummaryContainerListItemCount =
      document.createElement("span");

    checkoutSummaryContainerListItem.classList.add(
      "cart-product-container-item"
    );
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

  checkoutSummaryTotal.textContent = formattedCost(totalCost);
  checkoutSummaryShipping.textContent = formattedCost(totalCost > 0 ? 50 : 0);
  checkoutSummaryVat.textContent = formattedCost(totalCost * 0.2);
  checkoutSummaryGrand.textContent = formattedCost(
    totalCost + (totalCost > 0 ? 50 : 0)
  );
  confirmationTotal.textContent = formattedCost(
    totalCost + (totalCost > 0 ? 50 : 0)
  );
  const itemsInCart = Object.keys(cartItems).length - 1;
  const clonedSummaryContainer = checkoutSummaryContainer.cloneNode(true);
  const summaryButton = document.createElement("button");
  summaryButton.addEventListener("click", () => {
    if (clonedSummaryContainer.classList.contains("open")) {
      clonedSummaryContainer.classList.remove("open");
      summaryButton.textContent = `and ${itemsInCart} other item(s)`;
    } else {
      clonedSummaryContainer.classList.add("open");
      summaryButton.textContent = "View less";
    }
  });
  clonedSummaryContainer.id = "confirmation-summary-container";
  summaryButton.textContent = `and ${itemsInCart} other item(s)`;

  confirmationProductsContainer.innerHTML = "";
  confirmationProductsContainer.appendChild(clonedSummaryContainer);
  confirmationProductsContainer.appendChild(document.createElement("div"));
  confirmationProductsContainer.appendChild(summaryButton);

  function resolvePaymentMethodSubOptions() {
    if (inputEMoney.checked) {
      eMoneyPaymentType.style.display = "flex";
      cashOnDeliveryInformation.style.display = "none";
      eMoneyNumber.setAttribute("required", "");
      eMoneyPin.setAttribute("required", "");
    } else {
      eMoneyPaymentType.style.display = "none";
      cashOnDeliveryInformation.style.display = "flex";
    }
  }

  inputEMoney.addEventListener("change", () => {
    resolvePaymentMethodSubOptions();
  });

  cashOnDelivery.addEventListener("change", () => {
    resolvePaymentMethodSubOptions();
  });

  checkoutForm.addEventListener("submit", (event) => {
    event.preventDefault();
  });
}

fillSummary();
