import { commandCatch } from "./command_catch.js";
import { commandExit } from "./command_exit.js";
import { commandExplore } from "./command_explore.js";
import { commandHelp } from "./command_help.js";
import { commandInspect } from "./command_inspect.js";
import { commandMap, commandMapb } from "./command_map.js";
import { commandPokedex } from "./command_pokedex.js";
import { CLICommand } from "./state.js";

export function getCommands(): Record<string, CLICommand> {
  return {
    help: {
      name: "help",
      description: "Displays a help message",
      callback: commandHelp,
    },
    map: {
      name: "map",
      description: "Displays the next batch of Location Areas",
      callback: commandMap,
    },
    mapb: {
      name: "mapb",
      description: "Displays the previous batch of Location Areas",
      callback: commandMapb,
    },
    explore: {
      name: "explore <area_name>",
      description: "Displays the pokemon found in an area",
      callback: commandExplore,
    },
    catch: {
      name: "catch <pokemon>",
      description: "Attempts to catch a pokemon and add it to the pokedex",
      callback: commandCatch,
    },
    inspect: {
      name: "inspect pokemon",
      description: "Displays information about a pokemon you have caught",
      callback: commandInspect,
    },
    pokedex: {
      name: "pokedex",
      description: "Displays all of the pokemon in your pokedex",
      callback: commandPokedex,
    },
    exit: {
      name: "exit",
      description: "Exit the Pokedex",
      callback: commandExit,
    },
  };
}
