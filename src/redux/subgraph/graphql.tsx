import {gql} from "@apollo/client";

export const getSports = gql`
query Navigation($gameFilter: Game_filter, $sportFilter: Sport_filter) {
  sports(subgraphError: allow, where: $sportFilter) {
    id
    sportId
    name
    slug
    games(where: $gameFilter) {
      id
      title
      startsAt
      conditions {
        outcomes {
          currentOdds
          outcomeId
        }
      }
    }
  }
}
`