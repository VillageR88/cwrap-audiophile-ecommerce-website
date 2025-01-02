import data from "./fetchedData.js";

const routeTitle = document
  .getElementById("route-title")
  .textContent.toLowerCase();

for (const item of data.reverse()) {
  if (item.category === routeTitle) {
    addCategoryProduct(
      item.categoryImage.desktop.replace("./assets", "../static/images"),
      item.categoryImage.tablet.replace("./assets", "../static/images"),
      item.categoryImage.mobile.replace("./assets", "../static/images"),
      item.new,
      item.name,
      item.description,
      item.slug
    );
  }
}

function addCategoryProduct(desktopSrc, tabletSrc, mobileSrc, newProduct, title, description, slug) {
  const categoryContainer = document.getElementById("category-container");
  const categoryContainerWrapper = document.createElement("div");
  const categoryContainerPicture = document.createElement("picture");
  const categoryContainerSourceTablet = document.createElement("source");
  const categoryContainerSourceMobile = document.createElement("source");
  const categoryContainerImg = document.createElement("img");
  const categoryContainerDiv = document.createElement("div");
  const categoryContainerDivNew = document.createElement("span");
  const categoryContainerDivSection = document.createElement("section");
  const categoryContainerDivSectionTitle = document.createElement("h2");
  const categoryContainerDivSectionDescription = document.createElement("p");
  const categoryContainerDivSectionButton = document.createElement("a");

  categoryContainerWrapper.classList.add("category-container-wrapper");
  categoryContainerPicture.classList.add("category-container-picture");
  categoryContainerImg.classList.add("category-container-image");
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
    "button1",
    "category-container-div-section-button"
  );

  categoryContainerSourceTablet.srcset = tabletSrc;
  categoryContainerSourceTablet.media = "(max-width: 960px)";
  categoryContainerSourceMobile.srcset = mobileSrc;
  categoryContainerSourceMobile.media = "(max-width: 640px)";
  categoryContainerImg.src = desktopSrc;
  categoryContainerImg.alt = title;

  categoryContainerDivNew.textContent = "NEW PRODUCT";
  categoryContainerDivSectionTitle.textContent = title?.toUpperCase();
  categoryContainerDivSectionDescription.textContent = description;
  categoryContainerDivSectionButton.textContent = "SEE PRODUCT";
  categoryContainerDivSectionButton.href = `../${routeTitle}/${slug}`;
  categoryContainerPicture.appendChild(categoryContainerSourceMobile);
  categoryContainerPicture.appendChild(categoryContainerSourceTablet);
  categoryContainerPicture.appendChild(categoryContainerImg);
  categoryContainerWrapper.appendChild(categoryContainerPicture);
  if (newProduct) categoryContainerDiv.appendChild(categoryContainerDivNew);
  categoryContainerDiv.appendChild(categoryContainerDivSection);
  categoryContainerDivSection.appendChild(categoryContainerDivSectionTitle);
  categoryContainerDivSection.appendChild(
    categoryContainerDivSectionDescription
  );
  categoryContainerDiv.appendChild(categoryContainerDivSectionButton);
  categoryContainerWrapper.appendChild(categoryContainerDiv);
  categoryContainer.appendChild(categoryContainerWrapper);
}