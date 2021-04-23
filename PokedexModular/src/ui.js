import { getPokemonData } from "./consultas.js";

export async function createHomePage(response) {
  let pokemon = await response;
  createNextPage(pokemon.next);
  createPokemonMosaic(pokemon.results);
}

function createNextPage(link) {
  console.log(link);
}

function createPokemonMosaic(pokemonMosaicList) {
  const $divInicio = document.querySelector("#pokemonMosaicDiv");

  for (const key in pokemonMosaicList) {
    if (pokemonMosaicList.hasOwnProperty(key)) {
      const pokemon = pokemonMosaicList[key];

      let divPokemon = document.createElement("div");
      divPokemon.classList.add(pokemon.name, "divPokemon");
      $divInicio.appendChild(divPokemon);

      createPokemonSpecs(getPokemonData(pokemon.url));
    }
  }
}

async function createPokemonSpecs(obj) {
  let pokemonSpecs = await obj;
  let divPokemonMain = document.querySelector("." + pokemonSpecs.name);
  let $divPokemonImg = document.createElement("div");
  let $divPokemonSpecs = document.createElement("div");
  let $br = document.createElement("br");
  let $pokemonNameLabel = document.createElement("label");
  let $pokemonImage = document.createElement("img");
  let $pokemonHeightLabel = document.createElement("label");
  let $pokemonWeightLabel = document.createElement("label");
  $divPokemonSpecs.classList.add(pokemonSpecs.types[0].type.name);
  $divPokemonSpecs.classList.add("divPokemonSpecs");
  $pokemonNameLabel.append(pokemonSpecs.name);
  $pokemonWeightLabel.append("Peso: " + pokemonSpecs.weight + "0 grs");
  $pokemonHeightLabel.append("Altura: " + pokemonSpecs.height + "0 cm");
  $pokemonNameLabel.classList.add("pokemonName");
  $divPokemonImg.classList.add("divPokemonImg");
  $pokemonImage.src = pokemonSpecs.sprites.back_default;
  $pokemonHeightLabel.classList.add("pokemonHeight");
  divPokemonMain.append($divPokemonImg, $divPokemonSpecs);
  $divPokemonImg.appendChild($pokemonImage);
  $divPokemonSpecs.append(
    $pokemonNameLabel,
    $pokemonHeightLabel,
    $pokemonWeightLabel
  );
  console.log(pokemonSpecs.types[0].type.name);
  console.log(pokemonSpecs.types[1].type.name);
  console.log("--------------------------");
}
