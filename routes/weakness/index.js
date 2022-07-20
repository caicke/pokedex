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
      
      
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
});



module.exports = router;