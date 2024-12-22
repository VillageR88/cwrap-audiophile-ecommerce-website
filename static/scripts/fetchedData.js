async function fetchJson() {
  const response = await fetch("../static/scripts/data.json");
  const data = await response.json();
  return data;
}

const data = await fetchJson();

export default data;
