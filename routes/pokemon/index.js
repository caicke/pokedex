const express = require('express');
const router = express.Router();

const axios = require('axios');

const url = "https://raw.githubusercontent.com/UpperSoft/desafio-backend-nodejs/main/src/pokedex.json";

router.route("/").get( async (req, res) => {
    await axios.get(url)
    .then( r => {
        if (r.status == 200) {
            const pokemon = getPokemonNames(r.data.pokemon);
            res.status(200).send(pokemon);
        }
        else {
            res.status(404).send("Error on listing pokemon names.");
        }
    })
    .catch((err) => {
        res.status(400).json({ error: err.message })
    })
});

router.route("/:name").get(async (req, res) => {
    try {
      const pokemonName = req.params.name;
      
      await axios.get(url)
      .then(r => {
        if (r.status == 200) {
            const pokemon = getPokemonByName(r.data.pokemon, pokemonName);
            if (pokemon) {
                res.status(200).send(pokemon);
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

const getPokemonNames = (pokemonList) => {
    var pokemonNames = []

    pokemonList.map( element => {
        pokemonNames.push(element.name)
    })

    return pokemonNames;
}

const getPokemonByName = (pokemonList, name) => {
    const pokemon = pokemonList.find(element => element.name.toUpperCase() === name.toUpperCase());

    return pokemon;
}


module.exports = router;