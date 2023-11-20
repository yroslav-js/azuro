import {sortTime} from "@/redux/subgraph/callFunctions";

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
  currentOdds: string
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

export interface IFilterLeagues extends ILeagues {
  games: { id: string }[]
}

export interface IFilter {
  id: string
  sportId: string
  name: string
  slug: string
  countries: { leagues: IFilterLeagues[] }[]
}

export interface ISearch {
  title: string
  id: string
  league: {
    slug: string
    name: string
  }
  sport: {
    slug: string
  },
  conditions: {
    outcomes: {
      outcomeId: string
    }[]
  }[]
}

export interface IRecentlyEvent {
  id: string
  title: string
  league: {
    slug: string
    name: string
  }
  condition: string
  sport: {
    slug: string
  }
}

export type ISortItem = 'All' | 'Today' | 'Tomorrow' | '1h' | '3h' | '6h'

export type IOddsFormat = 'EU' | 'UK' | 'US'

export interface IInitialState {
  sports: ISports[]
  sportFilter: IFilter[]
  basket: {
    id: string
    outcomeId: string
    title: string
    conditions: IConditions[]
  }[]
  search: ISearch[]
  isFilterOpen: boolean
  sortItem: ISortItem
  oddsFormat: IOddsFormat
}
