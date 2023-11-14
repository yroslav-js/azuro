import {gql} from "@apollo/client";

export const getSportsGames = gql`
query Navigation($gameFilter: Game_filter, $sportFilter: Sport_filter) {
  sports(subgraphError: allow, where: $sportFilter) {
    id
    sportId
    name
    slug
    games(where: $gameFilter, first: 4, orderBy: turnover, orderDirection: desc) {
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

export const getFilteredSportsGames = gql`
query Navigation($gameFilter: Game_filter, $sportFilter: Sport_filter) {
  sports(subgraphError: allow, where: $sportFilter) {
    id
    sportId
    name
    slug
    games(where: $gameFilter, first: 500, orderBy: turnover, orderDirection: desc) {
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
    countries {
      leagues {
         games(where: $gameFilter, first: 500){
           id
         }
        id
        name
        slug
      }
    }
  }
}
`

export const search = gql`
query Navigation($gameFilter: Game_filter) {
  games(subgraphError: allow, where: $gameFilter) {
    title
    id
    league {
      slug
      name
    }
    sport {
      slug
    }
  }
}
`