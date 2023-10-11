"use client"

import {getMarketDescription, getMarketName, getSelectionName} from "@azuro-org/dictionaries";
import Main from "@/components/screens/Main/Main";

export default function Home() {
  // const client = new ApolloClient({
  //   uri: 'https://thegraph.azuro.org/subgraphs/name/azuro-protocol/azuro-api-polygon-v3',
  //   cache: new InMemoryCache(),
  // });
  //
  // const QUERY = gql`query Games($where: Game_filter!) {
  //     games(
  //         first: 10
  //         where: $where
  //         subgraphError: allow
  //     ) {
  //         gameId
  //         slug
  //         startsAt
  //         league {
  //             name
  //             slug
  //             country {
  //                 name
  //                 slug
  //             }
  //         }
  //         sport {
  //             name
  //             slug
  //         }
  //         participants {
  //             image
  //             name
  //         }
  //         conditions {
  //             conditionId
  //             isExpressForbidden
  //             status
  //             outcomes {
  //                 currentOdds
  //                 outcomeId
  //             }
  //         }
  //     }
  // }`
  //
  // // const QUERY = gql`
  // //     query ConditionOdds($where: Condition_filter, subgraphError: allow) {
  // //         conditions(where: $where) {
  // //             outcomes {
  // //                 currentOdds
  // //             }
  // //         }
  // //     }
  // // `
  //
  // const getodds = gql`query GameOdds($id: String) {
  //     game(id: $id) {
  //         conditions {
  //             outcomes {
  //                 currentOdds
  //             }
  //         }
  //     }
  // }
  // `
  //
  //
  // console.log(getMarketName({
  //   outcomeId: 6978
  // }))
  //
  //
  const marketName = getMarketName({outcomeId: 29})
  // const marketDescription = getMarketDescription({outcomeId: 29})
  const selectionName = getSelectionName({outcomeId: 29})

  console.log(marketName, selectionName)

  console.log(getSelectionName({
    outcomeId: 7039,
    withPoint: true
  }))
  //
  //
  // const func = async () => {
  //   const res = await client.query({
  //     query: QUERY,
  //     variables: {
  //       where: {
  //         startsAt_gt: Math.floor(Date.now() / 1000),
  //         hasActiveConditions: true,
  //       },
  //     },
  //   })
  //   // console.log(res)
  // }
  //
  // const funcGetOdds = async () => {
  //   const res = await client.query({
  //       query: getodds,
  //       variables: {
  //         id: '1577604976',
  //       },
  //     }
  //   )
  //   // console.log(res)
  // }
  //
  // useEffect(() => {
  //   func()
  //   funcGetOdds()
  // }, [])
  //
  //
  // console.log(new Date(1696712400 * 1000))

  return (
    <Main/>
  )
}
