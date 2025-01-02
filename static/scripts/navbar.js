const mobileNavigation = document.getElementById("mobile-navigation");
const hamburgerButton = document.getElementById("hamburger-button");
const mask = document.getElementById("mask");
const cartContainer = document.getElementById("cart-container");

hamburgerButton.addEventListener("click", () => {
  const isMaskDisplayed = mask.style.display === "block";
  const isCartContainerDisplayed = cartContainer.style.display === "flex";

  if (isMaskDisplayed && !isCartContainerDisplayed) {
    mask.style.display = "none";
    mobileNavigation.style.display = "none";
    document.body.style.overflowY = "";
    document.documentElement.style.overflowY = "";
  } else {
    mask.style.display = "block";
    mobileNavigation.style.display = "block";
    cartContainer.style.display = "none";
    document.body.style.overflowY = "clip";
    document.documentElement.style.overflowY = "clip";
  }
});