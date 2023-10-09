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
}

export interface ISports {
  id: string,
  sportId: string,
  name: string,
  slug: string,
  games: IGames[]

}

export interface IInitialState {
  sports: ISports[] | []
}
