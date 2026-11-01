import { Cache } from "./pokecache.js";

export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  private static cache: Cache;

  constructor() {
    PokeAPI.cache = new Cache(10000);
  }

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    const url = pageURL || `${PokeAPI.baseURL}/location-area`;

    try {
      const cacheResult = PokeAPI.cache.get<ShallowLocations>(url);

      if (cacheResult !== undefined) {
        return cacheResult;
      }

      const resp = await fetch(url);

      if (!resp.ok) {
        throw new Error(`${resp.status} ${resp.statusText}`);
      }

      const locations: ShallowLocations = await resp.json();

      PokeAPI.cache.add(url, locations);

      return locations;
    } catch (e) {
      throw new Error(`Error fetching locations: ${(e as Error).message}`);
    }
  }

  async fetchLocation(locationName: string): Promise<Location> {
    const url = `${PokeAPI.baseURL}/location-area/${locationName}`;

    try {
      const cacheResult = PokeAPI.cache.get<Location>(url);

      if (cacheResult !== undefined) {
        return cacheResult;
      }

      const resp = await fetch(url);

      if (!resp.ok) {
        throw new Error(`${resp.status} ${resp.statusText}`);
      }

      const location: Location = await resp.json();

      PokeAPI.cache.add(url, location);

      return location;
    } catch (e) {
      throw new Error(`Error fetching location '${locationName}': ${(e as Error).message}`);
    }
  }

  async fetchPokemon(pokemon: string): Promise<Pokemon> {
    const url = `${PokeAPI.baseURL}/pokemon/${pokemon}`;

    try {
      const cacheResult = PokeAPI.cache.get<Pokemon>(url);

      if (cacheResult !== undefined) {
        return cacheResult;
      }

      const resp = await fetch(url);

      if (!resp.ok) {
        throw new Error(`${resp.status} ${resp.statusText}`);
      }

      const pokemonObj: Pokemon = await resp.json();

      PokeAPI.cache.add(url, pokemonObj);

      return pokemonObj;
    } catch (e) {
      throw new Error(`Error fetching pokemon '${pokemon}': ${(e as Error).message}`);
    }
  }
}

export type ShallowLocations = {
  count: number;
  next: string;
  previous: string;
  results: {
    name: string;
    url: string;
  }[];
};

export type Location = {
  encounter_method_rates: {
    encounter_method: {
      name: string;
      url: string;
    };
    version_details: {
      rate: number;
      version: {
        name: string;
        url: string;
      };
    }[];
  }[];
  game_index: number;
  id: number;
  location: {
    name: string;
    url: string;
  };
  name: string;
  names: {
    language: {
      name: string;
      url: string;
    };
    name: string;
  }[];
  pokemon_encounters: {
    pokemon: {
      name: string;
      url: string;
    };
    version_details: {
      encounter_details: {
        chance: number;
        condition_values: any[];
        max_level: number;
        method: {
          name: string;
          url: string;
        };
        min_level: number;
      }[];
      max_chance: number;
      version: {
        name: string;
        url: string;
      };
    }[];
  }[];
};

export type Pokemon = {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  weight: number;
  stats: Stat[];
  types: Type[];
};

export interface Stat {
  base_stat: number;
  effort: number;
  stat: Stat2;
}

export interface Stat2 {
  name: string;
  url: string;
}

export interface Type {
  slot: number;
  type: Type2;
}

export interface Type2 {
  name: string;
  url: string;
}
