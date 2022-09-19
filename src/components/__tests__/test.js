import React from "react";
import ReactDOM from "react-dom";
import Axios from "axios";
import App from "../../App";
import Pokemon from "../pokemon/Pokemon";
import { cleanup } from "@testing-library/react";

afterEach(cleanup);

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("testing axios calls", async () => {
  const pokemon = {
    pokemonIndex: 1,
    name: "bulbasaur",
    types: ["grass", "poison"],
    stats: {
      hp: 65,
      attack: 49,
      defense: 49,
      speed: 45,
    },
    themeColor: "",
    height: 7,
    weight: 6.9,
    abilities: ["Overgrow", "Chlorophyll"],
    evs: 1,
  };

  const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/1/`;
  const pokemonRes = await Axios.get(pokemonUrl);
  const name = pokemonRes.data.name;
  const height = pokemonRes.data.height;

  expect(name).toMatch(pokemon.name);
  expect(height).toBe(pokemon.height);
});
