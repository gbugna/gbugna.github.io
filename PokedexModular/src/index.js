import { getPokemonData, linkAPI, nextLink } from "./consultas.js";

import { createHomePage } from "./ui.js";

createHomePage(getPokemonData(linkAPI));
