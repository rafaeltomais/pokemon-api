const express = require('express');

const route = express('');

const { getListPokemons, getIdPokemon, getIdTypesPokemons } = require('./src/handler/pokemons-handler')

// HANDLER DE POKEMONS //
// LISTAR DETERMINADA QUANTIDADE DE POKEMONS POR PAGINAS (OFFSET E LIMIT SÃO QUERYS OPCIONAIS)
route.get('/pokemons', getListPokemons)
// LISTAR INFORMAÇÕES DE UM POKEMON
route.get('/pokemon/:id', getIdPokemon)
// LISTAR INFORMAÇÕES DE POKEMONS DE UM TIPO ESPECIFICO
route.get('/pokemon/type/:id', getIdTypesPokemons)


module.exports = route