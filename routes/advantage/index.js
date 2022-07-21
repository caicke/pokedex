const express = require('express');
const router = express.Router();

const axios = require('axios');

const url = "https://raw.githubusercontent.com/UpperSoft/desafio-backend-nodejs/main/src/pokedex.json";

const { getPokemonByName, getPokemonTypeList, getPokemonWeaknessesByName } = require('../../src/utils/pokemonFunctions');

// Mensagem na página inicial da rota
router.route("/").get( async (req, res) => {
    res.send("Advantage page");
});

// retorna a lista dos pokémons que são fracos contra o pokémon informado
router.route("/:name").post(async (req, res) => {
    try {
      const pokemonName = req.params.name;
      
      await axios.get(url)
      .then(r => {
        if (r.status == 200) {
            const pokemon = getPokemonByName(r.data.pokemon, pokemonName);
              
            if (!pokemon) {
                res.send({ status: 404, message: "Pokémon not found." });
                return;
            }
            
            const types = getPokemonTypeList(r.data.pokemon, pokemonName);

            const dominatedPokemons = getPokemonWeaknessesByName(r.data.pokemon, types);

            if (dominatedPokemons) {
                res.status(200).json({ status: 200, data: dominatedPokemons });
            }
            else {
                res.status(404).json({ status: 404, message: "Pokemon not found." });
                return;
            }
        }
        else {
            res.status(400).json({ status: 400, message:r });
            return;
        }
      });

    } catch (err) {
      res.status(400).json({ error: err.message });
    }
});


module.exports = router;