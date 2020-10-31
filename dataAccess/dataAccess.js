const combats = require('./data/combats')
const pokemons = require('./data/pokemons')

const getBattles = (firstPokemonId, secondPokemonId) => {
  return combats.combats
    .filter((combat) => 
      (combat.First_pokemon === firstPokemonId && combat.Second_pokemon === secondPokemonId) || 
      (combat.First_pokemon === secondPokemonId && combat.Second_pokemon === firstPokemonId)
    )
}

const getCombats = (id) => {
  return combats.combats
    .filter((combat) => combat.First_pokemon === id || combat.Second_pokemon === id)
    .map((combat) => {return { 
      challenger: combat.First_pokemon === id ? combat.Second_pokemon : combat.First_pokemon, 
      win: combat.Winner === id
    }})
}

const getPokemon = (id) => {
  return pokemons.pokemons.find((pokemon) => pokemon.id === id)
}

module.exports = {getPokemon, getBattles, getCombats};