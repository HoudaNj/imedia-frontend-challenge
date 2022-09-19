import React, { Component } from "react";

import PokemonCard from "./PokemonCard";
import Loading from "../layout/Loading";
import axios from "axios";

export default class PokemonList extends Component {
  state = {
    url: null,
    pokemon: null,
  };

  async componentDidMount() {
    let limit = 32;
    const loadMorePokemons = async () => {
      this.state.url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=0`;
      const res = await axios.get(this.state.url);
      this.setState({ pokemon: res.data["results"] });
      limit += 32;
    };

    loadMorePokemons();

    function handleScroll(e) {
      if (
        window.innerHeight + e.target.documentElement.scrollTop + 1 >=
        e.target.documentElement.scrollHeight
      ) {
        if (limit <= 99968) {
          loadMorePokemons();
        }
      }
    }

    window.addEventListener("scroll", handleScroll);
  }

  render() {
    return (
      <div>
        {this.state.pokemon ? (
          <div className="row">
            {this.state.pokemon.map((pokemon) => (
              <PokemonCard
                key={pokemon.name}
                name={pokemon.name}
                url={pokemon.url}
              />
            ))}
          </div>
        ) : (
          <Loading />
        )}
      </div>
    );
  }
}
