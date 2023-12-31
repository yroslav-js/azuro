export interface IMyBets {
  id: string
  betId: string
  type: string
  amount: string
  status: string
  payout: string | null
  potentialPayout: string
  result: string | null
  isRedeemable: boolean
  isRedeemed: boolean
  odds: string
  settledOdds: string | null
  createdAt: string
  txHash: string
  core: {
    address: string
  }
  selections: {
    id: string
    odds: string
    result: string | null
    outcome: {
      outcomeId: string
      condition: {
        conditionId: string
        game: {
          sport: {
            slug: string
          }
          league: {
            name: string
            country: {
              name: string
            }
          }
          participants: {
            name: string
            image: string
          }[]
          startsAt: string
        }
      }
    }
  }[]
}