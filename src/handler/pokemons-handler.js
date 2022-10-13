const axios = require('axios');
const { listPokemons, getInfoPokemon, getListTypePokemon } = require('../services/pokemons-services')

// LISTAR DETERMINADA QUANTIDADE DE POKEMONS POR PAGINAS (OFFSET E LIMIT SÃO QUERYS OPCIONAIS)
async function getListPokemons(req,res){
    const { offset, limit } = req.query;
    
    try{
        const { data : { results } } = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`)
        const { statusCode, message, data } = listPokemons(results)
        return res.status(statusCode).json({ status: statusCode, message: message, data: data });
    }catch(e){
        return res.status(e.statusCode).json({ status: e.statusCode, message: e.message, data: e.data });
    }
}

// LISTAR INFORMAÇÕES DE UM POKEMON
async function getIdPokemon(req, res){
    const { id } = req.params;
    try{
        await getInfoPokemon(id)
        return res.status(statusCode).json({ status: statusCode, message: message, data: data });
    }catch(e){
        return res.status(e.statusCode).json({ status: e.statusCode, message: e.message, data: e.data });
          
    }
}

// LISTAR INFORMAÇÕES DE POKEMONS DE UM TIPO ESPECIFICO
async function getIdTypesPokemons(req, res){
    const { id } = req.params;
    try{
        const { statusCode, message, data } = await getListTypePokemon(id)
        return res.status(statusCode).json({ status: statusCode, message: message, data: data });
    }catch(e){
        return res.status(e.statusCode).json({ status: e.statusCode, message: e.message, data: e.data });
    }
}

module.exports = {
    getListPokemons,
    getIdPokemon,
    getIdTypesPokemons
}