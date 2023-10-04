export async function kitten(count) {
  let thisCount = count;
  let url = await fetchKitten();
  console.log(url);
  url = url[0].url;

  const pageContainer = document.createElement("section");
  const kittenContainer = document.createElement("div");
  const header = document.createElement("h1");
  const img = document.createElement("img");
  const windowContainer = document.getElementById("window-container");

  pageContainer.className = "page-container";
  kittenContainer.id = "kitten-container";
  header.className = "header";
  header.innerText = `Kitten Picture ${thisCount}!!!`;
  img.className = "kitten-img";
  img.setAttribute("src", url);

  kittenContainer.append(header, img);
  pageContainer.append(kittenContainer);

  windowContainer.append(kittenContainer);
}

export async function fetchKitten() {
  return fetch("https://api.thecatapi.com/v1/images/search")
    .then((res) => res.json())
    .then((data) => data);
}
