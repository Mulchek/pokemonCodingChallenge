'use strict';
const fs = require('fs')
const pokemonGym = require('./pokemonGym')

const pointsForBattleWin = 10
const pointForCommonBattleWin = 2

if (process.argv.length !== 4){
  console.log('Please provide two pokemon ids')
  return
}

const firstPokemonId = parseInt(process.argv[2])
const secondPokemonId = parseInt(process.argv[3])

const battleReport = pokemonGym.getBattleReport(firstPokemonId, secondPokemonId)

fs.writeFile('./BattleReport.json', JSON.stringify(battleReport), err => {
  if (err) {
    console.error(err)
    return
  }
  console.log('Report Generated at BattleReport.json')
})

let firstPokemonScore = 0
let secondPokemonScore = 0

battleReport.battles.forEach(battle => {
  if (firstPokemonId === battle.Winner) {
    firstPokemonScore += pointsForBattleWin
  }
  if (secondPokemonId === battle.Winner) {
    secondPokemonScore += pointsForBattleWin
  }
})

battleReport.commonBattles.forEach(commonBattle => {
  if (commonBattle.firstPokemonMatches[0].win && !commonBattle.secondPokemonMatches[0].win) {
    firstPokemonScore += pointForCommonBattleWin
  }
  else if (!commonBattle.firstPokemonMatches[0].win && commonBattle.secondPokemonMatches[0].win) {
    secondPokemonScore += pointForCommonBattleWin
  }
})

const totalScore = firstPokemonScore + secondPokemonScore

console.log(`Likelihood of ${battleReport.firstPokemon.Name}(${firstPokemonId}) to win: `, firstPokemonScore / totalScore)
console.log(`Likelihood of ${battleReport.secondPokemon.Name}(${secondPokemonId}) to win: `, secondPokemonScore / totalScore)

