const dataAccess = require('./dataAccess/dataAccess')

const getBattleReport = (firstPokemonId, secondPokemonId) => {
  const firstPokemon = dataAccess.getPokemon(firstPokemonId)
  const secondPokemon = dataAccess.getPokemon(secondPokemonId)

  const battles = dataAccess.getBattles(firstPokemonId, secondPokemonId)

  const commonBattles = getCommonBattles(firstPokemonId, secondPokemonId)

  return { firstPokemon, secondPokemon, battles, commonBattles}
}

const getCommonBattles = (firstPokemonId, secondPokemonId) => {
  const firstPokemonCombats = dataAccess.getCombats(firstPokemonId)
  const secondPokemonCombats = dataAccess.getCombats(secondPokemonId)

  const firstChallengers = firstPokemonCombats.map((combat) => combat.challenger)
  const secondChallengers = secondPokemonCombats.map((combat) => combat.challenger)
  const matches = firstChallengers.filter((item) => {
    return secondChallengers.includes(item)
  })

  const commonBattles = matches.map((challenger) => {
    const firstPokemonMatches = getMatches(firstPokemonCombats, challenger)
    const secondPokemonMatches = getMatches(secondPokemonCombats, challenger)
    return { challenger, firstPokemonMatches, secondPokemonMatches}
  })

  return commonBattles
}

const getMatches = (combats, challenger) => {
  return combats.filter((combat) => combat.challenger === challenger).map((res) => { return { win: res.win}})
}

module.exports = {getBattleReport};
