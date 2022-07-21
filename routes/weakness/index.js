const express = require('express');
const router = express.Router();

const axios = require('axios');

const url = "https://raw.githubusercontent.com/UpperSoft/desafio-backend-nodejs/main/src/pokedex.json";

const {getPokemonByName, getPokemonTypes, getPokemonAdvantagesByType} = require('../../src/utils/pokemonFunctions');

// Mensagem na página inicial da rota
router.route("/").get( async (req, res) => {
    res.send("Weakness page");
});

// Retorna a lista dos pokémons que são fortes contra o pokémon informado
router.route("/:name").post(async (req, res) => {
    try {
        const pokemonName = req.params.name;
        
        await axios.get(url)
        .then(r => {
          if (r.status == 200) {
              const pokemon = getPokemonByName(r.data.pokemon, pokemonName);
              
              if (!pokemon) {
                res.send({status: 404, message: "Pokémon not found."});
                return;
              }
              
              const types = getPokemonTypes(pokemon);
  
              const dominatingPokemons = getPokemonAdvantagesByType(r.data.pokemon, types);
  
              if (dominatingPokemons) {
                  res.status(200).json({status: 200, data: dominatingPokemons});
              }
              else {
                  res.status(404).json({status: 404, message: "Pokémon not found."});
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

module.exports = router;