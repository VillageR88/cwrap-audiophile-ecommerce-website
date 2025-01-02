async function fetchJson() {
  const response = await fetch("https://villager88.github.io/cwrap-audiophile-ecommerce-website/static/scripts/data.json");
  const data = await response.json();
  return data;
}

const data = await fetchJson();

export default data;
