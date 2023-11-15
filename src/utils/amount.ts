import {IFilter, IFilterLeagues} from "@/redux/features/azuroInterface";

export const topEventAmount = (sports: IFilter[]) => {
  let amount = 0
  sports.map(sport => sport.countries.map(game => game.leagues.map(league => {
    amount += league.games.length
  })))
  return amount
}

export const filterAmount = (sport: IFilter) => {
  let amount = 0
  sport.countries.map(game => game.leagues.map(league => {
    amount += league.games.length
  }))
  return amount
}

export const leagueAmount = (league: IFilterLeagues) => {
  let amount = 0
  amount += league.games.length
  return amount
}