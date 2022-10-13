const axios = require("axios");
const { validateIdPokemon, validateIdType } = require("../validate/pokemons-list-validate");

// LISTA POKEMONS DE ACORDO COM OFFSET E LIMIT INFORMADO (OPCIONAL)
function listPokemons(results) {
  if (results.length !== 0) {
    return {
      statusCode: 200,
      message: "Lista encontrada",
      data: results,
    };
  } else {
    throw {
      statusCode: 400,
      message: "Lista não encontrada (Offset maior que o limite).",
      data: [],
    };
  }
}

// PEGA INFORMAÇÕES ESPECIFICAS DE UM POKEMON (ID É NUMBER OU STRING LOWER CASE)
async function getInfoPokemon(id) {
  try {
    const responseData = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    return { statusCode, message, data } = validateIdPokemon(responseData);
  } catch (e) {
    throw {
      statusCode: 404,
      message: "Pokemon não encontrado.",
      data: [],
    };
  }
}

// PEGA LISTA DE TODOS OS POKEMONS DE DETERMINADO TIPO (ID É NUMBER OU STRING LOWER CASE)
async function getListTypePokemon(id){
    try{
        const { data: {name, pokemon } } = await axios.get(`https://pokeapi.co/api/v2/type/${id}`);
        const { statusCode, message } = validateIdType(name, pokemon)
        
        const dataAllPokemons = await listAllPokemonType(pokemon)
        
        return { statusCode, message, data: dataAllPokemons }
    }catch(e){
        throw {
            statusCode: 404,
            message: "Tipo de pokemons não encontrado.",
            data: [],
          }
    }
}

// MONTA ARRAY COM INFORMAÇÕES ESPECIFICAS DE CADA POKEMON DO TIPO ESPECIFICADO
async function listAllPokemonType(pokemon){
    let data = new Array;
    let dataEachPokemon = new Object;
        for (let eachPokemon of pokemon){
            dataEachPokemon = await getInfoPokemon(eachPokemon.pokemon.name);
            data.push(dataEachPokemon.data);
        }
        return data;
}

module.exports = {
  listPokemons,
  getInfoPokemon,
  getListTypePokemon
};
