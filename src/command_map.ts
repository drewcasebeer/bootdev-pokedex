import { State } from "./state.js";

export async function commandMap(state: State) {
  const { pokeapi, nextLocationsURL } = state;

  const shallowLocations = await pokeapi.fetchLocations(nextLocationsURL);

  state.nextLocationsURL = shallowLocations.next;
  state.prevLocationsURL = shallowLocations.previous;

  for (const location of shallowLocations.results) {
    console.log(location.name);
  }
}

export async function commandMapb(state: State) {
  const { pokeapi, prevLocationsURL } = state;

  if (prevLocationsURL === undefined) {
    throw new Error("you're on the first page");
  }

  const shallowLocations = await pokeapi.fetchLocations(prevLocationsURL);

  state.nextLocationsURL = shallowLocations.next;
  state.prevLocationsURL = shallowLocations.previous;

  for (const location of shallowLocations.results) {
    console.log(location.name);
  }
}
