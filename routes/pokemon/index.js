const express = require('express');
const router = express.Router();

const axios = require('axios');

const url = "https://raw.githubusercontent.com/UpperSoft/desafio-backend-nodejs/main/src/pokedex.json";

router.route("/").get( async (req, res) => {
    await axios.get(url)
    .then( r => {
        if (r.status == 200) {
            const pokemon = getPokemonNames(r.data.pokemon);
            res.status(200).json({status: 200, data: pokemon});
        }
        else {
            res.status(404).json({status: 400, message:"Error on listing pokemon names."});
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
                res.status(200).json({status: 200, data: pokemon});
            }
            else {
                res.status(404).send({status: 404, message: "Pokemon not found."});
            }
        }
        else {
            res.status(400).json({status: 400, message: r});
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