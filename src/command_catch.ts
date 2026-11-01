import { State } from "./state.js";

export async function commandCatch(state: State, pokemon: string) {
  console.log(`Throwing a Pokeball at ${pokemon}...`);

  const pokemonObj = await state.pokeapi.fetchPokemon(pokemon);
  const baseExperience = pokemonObj.base_experience;

  const chance = Math.random() * 1000;

  if (chance > baseExperience) {
    console.log(`${pokemon} was caught!`);
  } else {
    console.log(`${pokemon} escaped!`);
  }

  state.pokedex[pokemon] = pokemonObj;
}
