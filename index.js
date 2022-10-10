const express = require("express");
const axios = require("axios");
const app = express();
app.use(express.json());
const port = 8000;

app.get("/pokemon", (req, res) => {
  const { offset, limit } = req.query;

  axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`)
    .then((response) => {
      console.log(response.data.count);
      console.log(response.data.results);
      return res.status(200).json({ data: `${response.data.results}` });
    });
});

app.get("/pokemon/:id", (req, res) => {
  const { id } = req.params;

  async function getParamsPokemon() {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${id}`
      );
      const descriptionsPokemon = {
        id: response.data.id,
        name: response.data.name,
        height: response.data.height,
        weight: response.data.weight,
        base_experience: response.data.base_experience,
        forms: response.data.forms,
        abilities: response.data.abilities,
        species: response.data.species,
      };
      console.log(descriptionsPokemon);
      return res.status(200).json({
        message: `Pokemon ${descriptionsPokemon.name} localizado.`,
        data: descriptionsPokemon,
      });
    } catch (e) {
      if (e.message === "Request failed with status code 404") {
        console.log("Pokemon não encontrado.");
        return res.status(404).json({
          message: `Pokemon não localizado.`,
          data: {},
        });
      } else {
        console.log(e.message);
      }
    }
  }

  getParamsPokemon();
});

app.listen(port, () => console.log("Server is online"));
