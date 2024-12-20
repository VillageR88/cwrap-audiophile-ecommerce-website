const data = await fetchJson();

async function fetchJson() {
  const response = await fetch("static/scripts/data.json");
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
