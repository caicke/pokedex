const express = require('express');
const router = express.Router();

const axios = require('axios');

const url = "https://raw.githubusercontent.com/UpperSoft/desafio-backend-nodejs/main/src/pokedex.json";

router.route("/").get( async (req, res) => {
    res.send("Advantage page");
});

router.route("/:name").get(async (req, res) => {
    try {
      const pokemonName = req.params.name;
      
      await axios.get(url)
      .then(r => {
        if (r.status == 200) {
            const types = getPokemonTypes(r.data.pokemon, pokemonName);

            const dominatedPokemons = getPokemonWeaknessesByName(r.data.pokemon, types);

            if (dominatedPokemons) {
                res.status(200).send(dominatedPokemons);
            }
            else {
                res.status(404).send("Pokemon not found.");
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

const getPokemonWeaknessesByName = (pokemonList, typeList) => {
    const pokemons = []

    pokemonList.map(ele => {
        if (typeList.some(r => ele.weaknesses.indexOf(r) >= 0)) {
            pokemons.push(ele);
        }
    });

    return pokemons;
}

const getPokemonTypes = (pokemonList, name) => {
    var types = [];
    const pokemon = pokemonList.find(element => element.name.toUpperCase() === name.toUpperCase());
    
    if (pokemon) {
        types = pokemon.type;
    }

    return types;
}

module.exports = router;