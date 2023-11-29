import {gql} from "@apollo/client";

export const getSportsGames = (limit: number) => gql`
query Navigation($gameFilter: Game_filter, $sportFilter: Sport_filter) {
  sports(subgraphError: allow, where: $sportFilter) {
    id
    sportId
    name
    slug
    games(where: $gameFilter, first: ${limit}, orderBy: turnover, orderDirection: desc) {
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

export const getSearch = (by: string, direction: string) => gql`
query Navigation($gameFilter: Game_filter) {
  games(subgraphError: allow, where: $gameFilter, first: 50, orderBy: ${by}, orderDirection: ${direction}) {
    title
    id
    league {
      slug
      name
    }
    sport {
      slug
    }
    conditions(first: 1) {
      outcomes(first: 1) {
        outcomeId
      }
    }
  }
}
`

export const getMyBets = gql`
query Bets($where: Bet_filter!, $orderBy: Bet_orderBy, $orderDirection: OrderDirection) {
  bets(
    first: 500
    where: $where
    orderBy: $orderBy
    orderDirection: $orderDirection
    subgraphError: allow
  ) {
    id
    betId
    type
    amount
    status
    payout
    potentialPayout
    result
    isRedeemable
    isRedeemed
    odds
    settledOdds
    createdAt: createdBlockTimestamp
    txHash: createdTxHash
    core {
      address
    }
    selections {
      id
      odds
      result
      outcome {
        outcomeId
        condition {
          conditionId
          game {
            sport {
              slug
            }
            league {
              name
              country {
                name
              }
            }
            participants {
              name
              image
            }
            startsAt
          }
        }
      }
    }
  }
}
`