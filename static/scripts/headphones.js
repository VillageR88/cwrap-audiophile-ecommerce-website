const categoryContainer = document.getElementById("category-container");
const categoryContainerWrapper = document.createElement("div");
const categoryContainerPicture = document.createElement("img");
const categoryContainerDiv = document.createElement("div");
const categoryContainerDivNew = document.createElement("span");
const categoryContainerDivSection = document.createElement("section");
const categoryContainerDivSectionTitle = document.createElement("h2");
const categoryContainerDivSectionDescription = document.createElement("p");
const categoryContainerDivSectionButton = document.createElement("a");

categoryContainerWrapper.classList.add("category-container-wrapper");
categoryContainerPicture.classList.add("category-container-picture");
categoryContainerDiv.classList.add("category-container-div");
categoryContainerDivNew.classList.add("category-container-div-new");
categoryContainerDivSection.classList.add("category-container-div-section");
categoryContainerDivSectionTitle.classList.add(
  "category-container-div-section-title"
);
categoryContainerDivSectionDescription.classList.add(
  "category-container-div-section-description"
);
categoryContainerDivSectionButton.classList.add(
  "button1", "category-container-div-section-button"
);

categoryContainerPicture.src =
  "static/images/product-xx99-mark-two-headphones/desktop/image-category-page-preview.jpg";
categoryContainerDivNew.textContent = "NEW PRODUCT";
categoryContainerDivSectionTitle.textContent = "XX99 MARK II HEADPHONES";
categoryContainerDivSectionDescription.textContent =
  "The new XX99 Mark II headphones is the pinnacle of pristine audio. It redefines your premium headphone experience by reproducing the balanced depth and precision of studio-quality sound.";
categoryContainerDivSectionButton.textContent = "SEE PRODUCT";

categoryContainerWrapper.appendChild(categoryContainerPicture);
categoryContainerDiv.appendChild(categoryContainerDivNew);
categoryContainerDiv.appendChild(categoryContainerDivSection);
categoryContainerDivSection.appendChild(categoryContainerDivSectionTitle);
categoryContainerDivSection.appendChild(categoryContainerDivSectionDescription);
categoryContainerDiv.appendChild(categoryContainerDivSectionButton);
categoryContainerWrapper.appendChild(categoryContainerDiv);

categoryContainer.appendChild(categoryContainerWrapper);
