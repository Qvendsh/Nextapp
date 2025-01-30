// export const useGetPokemon = () => {};

import axios from "axios";

export const getPokemons = async (currentPage: number, limit: number) => {
  const offset = (currentPage - 1) * limit;
  const response = await axios.get(
    `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`,
  );
  return response.data.results;
};

export const getImage = async (pokemonId: number) => {
  const response = await axios.get(
    `https://pokeapi.co/api/v2/pokemon/${pokemonId}`,
  );
  return response.data.sprites.front_default;
};
