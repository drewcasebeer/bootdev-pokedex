import { State } from "./state.js";

export async function commandExplore(state: State, area: string) {
  console.log(`Exploring ${area}...`);

  const location = await state.pokeapi.fetchLocation(area);

  if (location.pokemon_encounters.length > 0) {
    console.log("Found Pokemon:");
  }

  for (const pokemon of location.pokemon_encounters) {
    console.log(`- ${pokemon.pokemon.name}`);
  }
}
