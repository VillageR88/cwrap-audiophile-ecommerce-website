const data = await fetchJson();
const routeTitle = document
  .getElementById("route-title")
  .textContent.toLowerCase();

for (const item of data.reverse()) {
  if (item.category === routeTitle) {
    console.log(item);

    addCategoryProduct(
      item.categoryImage.desktop.replace("./assets", "../static/images"),
      item.new,
      item.name,
      item.description,
      item.slug
    );
    // console.log(item.categoryImage.desktop.replace("./assets", "../static/images"));
    // console.log(item.new);
    // console.log(item.name);
    // console.log(item.description);
  }
}

async function fetchJson() {
  const response = await fetch("static/scripts/data.json");
  const data = await response.json();
  return data;
}

function addCategoryProduct(imageSrc, newProduct, title, description, slug) {
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
    "button1",
    "category-container-div-section-button"
  );

  categoryContainerPicture.src = imageSrc;
  categoryContainerDivNew.textContent = "NEW PRODUCT";
  categoryContainerDivSectionTitle.textContent = title?.toUpperCase();
  categoryContainerDivSectionDescription.textContent = description;
  categoryContainerDivSectionButton.textContent = "SEE PRODUCT";
  categoryContainerDivSectionButton.href = `../${routeTitle}/${slug}`;

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
