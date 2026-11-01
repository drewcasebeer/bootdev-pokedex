import { State } from "./state.js";

export async function commandInspect(state: State, pokemon: string) {
  const pokemonObj = state.pokedex[pokemon];

  if (pokemonObj === undefined) {
    console.log("you have not caught that pokemon");
  }

  console.log(`Name: ${pokemonObj.name}`);
  console.log(`Height: ${pokemonObj.height}`);
  console.log(`Weight: ${pokemonObj.weight}`);
  console.log("Stats:");

  for (const stat of pokemonObj.stats) {
    console.log(` -${stat.stat.name}: ${stat.base_stat}`);
  }

  console.log("Types:");

  for (const type of pokemonObj.types) {
    console.log(` - ${type.type.name}`);
  }
}
