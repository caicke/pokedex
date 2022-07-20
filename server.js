const express = require("express");
const cors = require("cors");
const axios = require("axios");
const bodyParser = require("body-parser");

// Rotas
const pokemonRouter = require("./routes/pokemon");
const advantageRouter = require("./routes/advantage");
const weaknessRouter = require("./routes/weakness");

const app = express();

const port = 5000;

// middlewares
app.use(bodyParser.json());
app.use(cors());

// routes
app.use("/api/v1/pokemon", pokemonRouter);
app.use("/api/v1/advantage", advantageRouter);
app.use("/api/v1/weakness", weaknessRouter);


// app listening
app.listen(port, () => {
  console.log(`pokedex ativa na porta ${port}`);
});
