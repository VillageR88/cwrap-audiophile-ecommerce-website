/**
 * @typedef {'type1' | 'type2'} buttonType
 * @param {buttonType} type
 * @param {number} initialValue
 * @param {string} id
 */
export const inputButton = (type = "type1", initialValue = 1, id) => {
  const heroCartDivCountDiv = document.createElement("div");
  const heroCartDivCountMinus = document.createElement("button");
  const heroCartDivCountPlus = document.createElement("button");
  const heroCartDivCountInput = document.createElement("input");

  if (type === "type1") {
    heroCartDivCountMinus.classList.add("hero-cart-div-count-buttons");
    heroCartDivCountPlus.classList.add("hero-cart-div-count-buttons");
    heroCartDivCountDiv.classList.add("hero-cart-div-count-div");
  } else {
    heroCartDivCountMinus.classList.add("hero-cart-div-count-buttons2");
    heroCartDivCountPlus.classList.add("hero-cart-div-count-buttons2");
    heroCartDivCountDiv.classList.add("hero-cart-div-count-div2");
  }

  heroCartDivCountInput.classList.add("hero-cart-div-count-input");
  heroCartDivCountInput.id = id;

  heroCartDivCountPlus.textContent = "+";
  heroCartDivCountMinus.textContent = "-";
  heroCartDivCountInput.name = "amount of this product";
  heroCartDivCountInput.type = "number";
  heroCartDivCountInput.value = initialValue;
  heroCartDivCountInput.min = 1;
  heroCartDivCountInput.max = 300;

  heroCartDivCountDiv.appendChild(heroCartDivCountMinus);
  heroCartDivCountDiv.appendChild(heroCartDivCountInput);
  heroCartDivCountDiv.appendChild(heroCartDivCountPlus);

  heroCartDivCountMinus.addEventListener("click", () => {
    if (heroCartDivCountInput.value > 1) {
      heroCartDivCountInput.value--;
      heroCartDivCountInput.dispatchEvent(new Event('input'));
    }
  });

  heroCartDivCountPlus.addEventListener("click", () => {
    if (heroCartDivCountInput.value < 300) {
      heroCartDivCountInput.value++;
      heroCartDivCountInput.dispatchEvent(new Event('input'));
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

  return { container: heroCartDivCountDiv, input: heroCartDivCountInput };
};