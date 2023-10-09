import {gql} from "@apollo/client";

export const getSports = gql`
query Navigation($gameFilter: Game_filter) {
  sports(subgraphError: allow, where: {sporthub_in: ["sports"]}) {
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