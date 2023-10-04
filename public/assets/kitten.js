export async function kitten() {
  let url = await fetchKitten();
  url = url[0].url;

  const kittenContainer = document.createElement("div");
  const header = document.createElement("h1");
  const img = document.createElement("img");
  const windowContainer = document.getElementById("window-container");

  kittenContainer.className = "kitten-container";
  header.className = "header";
  header.innerText = `Kitten Picture!!!`;
  img.className = "kitten-img";
  img.setAttribute("src", url);

  kittenContainer.append(header, img);

  windowContainer.append(kittenContainer);
}

export async function fetchKitten() {
  return fetch("https://api.thecatapi.com/v1/images/search")
    .then((res) => res.json())
    .then((data) => data);
}
