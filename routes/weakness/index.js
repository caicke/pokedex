const express = require('express');
const router = express.Router();

const axios = require('axios');

const url = "https://raw.githubusercontent.com/UpperSoft/desafio-backend-nodejs/main/src/pokedex.json";

router.route("/").get( async (req, res) => {
    res.send("Weakness page");
});

router.route("/:name").get(async (req, res) => {
    try {
        const pokemonName = req.params.name;
        
        await axios.get(url)
        .then(r => {
          if (r.status == 200) {
              const pokemon = getPokemonByName(r.data.pokemon, pokemonName);
              
              if (!pokemon) {
                res.status(404).send("Pokémon not found.");
              }
              
              const types = getPokemonTypes(pokemon);
  
              const dominatingPokemons = getPokemonAdvantagesByType(r.data.pokemon, types);
  
              if (dominatingPokemons) {
                  res.status(200).send(dominatingPokemons);
              }
              else {
                  res.status(404).send("Pokémon not found.");
              }
          }
          else {
              res.status(400).send(r);
          }
        });
  
      } catch (err) {
        res.status(400).json({ error: err.message });
      }
});

const getPokemonByName = (pokemonList, name) => {
    return pokemonList.find(element => element.name.toUpperCase() === name.toUpperCase())
}

const getPokemonAdvantagesByType = (pokemonList, typeList) => {
    const pokemons = []

    pokemonList.map(ele => {
        if (!typeList.some(r => ele.weaknesses.indexOf(r) >= 0)) {
            pokemons.push(ele);
        }
    });

    return pokemons;
}

const getPokemonTypes = (pokemon) => {
    return pokemon.type;
}

module.exports = router;