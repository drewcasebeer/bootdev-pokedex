import { State } from "./state.js";

export async function commandHelp(state: State) {
  const commandDetails = Object.values(state.commands)
    .map((command) => `${command.name}: ${command.description}`)
    .join("\n");

  console.log(`Welcome to the Pokedex!
Usage:

${commandDetails}`);
}
