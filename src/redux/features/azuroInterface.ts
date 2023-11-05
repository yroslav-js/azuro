export interface IConditions {
  conditionId: string
  outcomes: {
    currentOdds: string
    outcomeId: string
  }[]
}

export interface IGames {
  id: string
  title: string
  startsAt: string
  conditions: IConditions[]
  participants: { image: string }[]
  league: ILeagues
}

export interface IBasket {
  id: string
  outcomeId: string
  title: string
  conditionId: string
  conditions: IConditions[]
}

export interface ILeagues {
  id: string
  slug: string
  name: string
}

export interface ISports {
  id: string
  sportId: string
  name: string
  slug: string
  games: IGames[]
  league: { slug: string }
}

export interface IFilter {
  id: string
  sportId: string
  name: string
  slug: string
  games: { id: string }[]
  countries: { leagues: ILeagues[] }[]
}

export interface IInitialState {
  sports: ISports[] | []
  sportFilter: IFilter[]
  basket: {
    id: string
    outcomeId: string
    title: string
    conditions: IConditions[]
  }[]
}
