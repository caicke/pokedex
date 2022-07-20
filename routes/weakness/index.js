const express = require('express');
const router = express.Router();

const axios = require('axios');

const url = "https://raw.githubusercontent.com/UpperSoft/desafio-backend-nodejs/main/src/pokedex.json";

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

// procura se tem algum pokemon com o nome passado no parâmetro
const getPokemonByName = (pokemonList, name) => {
    return pokemonList.find(element => element.name.toUpperCase() === name.toUpperCase())
}

// procura na lista de pokemons, aqueles que contém um dos tipos da lista em sua relação de fraquezas
const getPokemonAdvantagesByType = (pokemonList, typeList) => {
    const pokemons = []

    pokemonList.map(ele => {
        if (!typeList.some(r => ele.weaknesses.indexOf(r) >= 0)) {
            pokemons.push(ele);
        }
    });

    return pokemons;
}

// retorna a lista de tipos do pokemon
const getPokemonTypes = (pokemon) => {
    return pokemon.type;
}

module.exports = router;