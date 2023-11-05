import {gql} from "@apollo/client";

export const getSportsGames = gql`
query Navigation($gameFilter: Game_filter, $sportFilter: Sport_filter) {
  sports(subgraphError: allow, where: $sportFilter) {
    id
    sportId
    name
    slug
    games(where: $gameFilter, first: 10) {
      id
      title
      startsAt
      conditions {
        outcomes {
          currentOdds
          outcomeId
        }
        conditionId
      }
      participants {
        image
      }
      league {
        slug
        name
        id
      }
    }
  }
}
`

export const getSports = gql`
query Navigation($gameFilter: Game_filter, $sportFilter: Sport_filter) {
  sports(subgraphError: allow, where: $sportFilter) {
    id
    sportId
    name
    slug
    games(where: $gameFilter, first: 500){
      id
    }
    countries {
      leagues {
        id
        name
        slug
      }
    }
  }
}
`