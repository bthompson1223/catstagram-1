import { voting } from "./voting.js";
import { comments } from "./comments.js";

export async function kitten(count) {
  const thisCount = count;
  let url = localStorage.getItem(`kittenimg${thisCount}`);

  const kittenContainer = document.createElement("div");
  const header = document.createElement("h1");
  const img = document.createElement("img");
  const windowContainer = document.getElementById("window-container");

  kittenContainer.id = `kitten-container${thisCount}`;
  header.id = `header${thisCount}`;
  header.innerText = `Pokémon Team Member ${thisCount}!!!`;
  img.id = `kitten-img${thisCount}`;

  if (url) img.src = url;
  else {
    url = await fetchKitten();
    img.src = url;
  }

  kittenContainer.append(header, img);

  windowContainer.append(kittenContainer);
  await voting(thisCount);
  //   const points = document.getElementById(`score${thisCount}`);
  //   if (localStorage.getItem(`points${thisCount}`))
  //     points.innerText = `Popularity Points: ${localStorage.getItem`points${thisCount}()`}`;

  async function fetchKitten() {
    try {
      const kittenResponse = await fetch(
        "https://api.thecatapi.com/v1/images/search?size=small"
      );
      let id = Math.floor(Math.random() * 1021) + 1;
      const pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const data = await pokemon.json();
      console.log(data);
      const pokeURL = data.sprites["front_default"];
      console.log(pokeURL);

      const kittenData = await kittenResponse.json();
      console.log("kitten data ", kittenData);
      const kittenImgUrl = kittenData[0].url;

      localStorage.setItem(`kittenimg${thisCount}`, pokeURL);
      return pokeURL;
    } catch (e) {
      console.log("Failed to fetch image", e);
    }
  }
}

export async function fetchKitten() {
  try {
    const kittenResponse = await fetch(
      "https://api.thecatapi.com/v1/images/search?size=small"
    );
    let id = Math.floor(Math.random() * 1021) + 1;
    const pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await pokemon.json();
    console.log(data);
    const pokeURL = data.sprites["front_default"];
    console.log(pokeURL);

    const kittenData = await kittenResponse.json();
    console.log("kitten data ", kittenData);
    const kittenImgUrl = kittenData[0].url;

    localStorage.setItem(`kittenimg${thisCount}`, pokeURL);
    return pokeURL;
  } catch (e) {
    console.log("Failed to fetch image", e);
  }
}

/*
async getOnePokemon() {
      try {
        let id = Math.floor(Math.random() * 151) + 1;
        let response = await axios.get(`${apiLink}/pokemon/${id}`)
        if(response.data){
          let pokemon = {
            id: response.data.id,
            name: response.data.name,
            image: response.data.sprites.front_default
          }
          return pokemon
        }
      } catch (error) {
        console.log(error)
      }
    }
*/
