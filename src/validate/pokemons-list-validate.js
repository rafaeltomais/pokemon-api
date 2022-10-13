// VALIDA SE EXISTE POKEMON COM ID INFORMADO
function validateIdPokemon(responseData) {
  const { data: { id,name,height,weight,base_experience,forms,abilities,species } } = responseData;
  const descriptionsPokemon = {
    id: id,
    name: name,
    height: height,
    weight: weight,
    base_experience: base_experience,
    forms: forms,
    abilities: abilities,
    species: species,
  };
  if (descriptionsPokemon) {
    return {
      statusCode: 200,
      message: `Informações do pokemon ${descriptionsPokemon.name.toUpperCase()} encontrada.`,
      data: descriptionsPokemon,
    };
  }
}

// VALIDA SE EXISTE TIPO DE POKEMON COM ID INFORMADO
function validateIdType(name, pokemon) {
  if (pokemon) {
    return {
      statusCode: 200,
      message: `Type ${name.toUpperCase()} encontrada.`,
      // data: pokemon,
    };
  }
}

module.exports = {
  validateIdPokemon,
  validateIdType,
};
