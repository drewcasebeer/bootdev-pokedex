import { State } from "./state.js";

export async function commandPokedex(state: State) {
  const pokedex = state.pokedex;

  if (Object.keys(pokedex).length === 0) {
    console.log("You have not caught any pokemon yet");
  }

  console.log("Your Pokedex:");

  for (const key of Object.keys(pokedex)) {
    console.log(` - ${key}`);
  }
}
