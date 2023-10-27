export interface IConditions {
  outcomes: {
    currentOdds: string,
    outcomeId: string
  }[]
}

export interface IGames {
  id: string,
  title: string,
  startsAt: string,
  conditions: IConditions[]
  participants: { image: string }[]
}

export interface ISports {
  id: string,
  sportId: string,
  name: string,
  slug: string,
  games: IGames[]

}

export interface IFilter {
  filterTitle: string
  items: {
    item: string,
    slug: string
  }[]
}

export interface IInitialState {
  sports: ISports[] | []
  sportFilter: IFilter
  basket: {
    id: string
    outcomeId: string
    title: string
    conditions: IConditions[]
  }[]
}
