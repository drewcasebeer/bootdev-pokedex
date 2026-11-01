import { createInterface, Interface } from "node:readline";
import { getCommands } from "./command.js";
import { PokeAPI, Pokemon } from "./pokeapi.js";

export type State = {
  rl: Interface;
  commands: Record<string, CLICommand>;
  pokeapi: PokeAPI;
  nextLocationsURL: string | undefined;
  prevLocationsURL: string | undefined;
  pokedex: Record<string, Pokemon>;
};

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State, ...args: string[]) => Promise<void>;
};

export function initState(): State {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Pokedex > ",
  });

  const pokeapi = new PokeAPI();

  return {
    rl,
    commands: getCommands(),
    pokeapi,
    nextLocationsURL: undefined,
    prevLocationsURL: undefined,
    pokedex: {},
  };
}
