import {createAsyncThunk} from "@reduxjs/toolkit";
import {apolloClient} from "@/redux/subgraph/apollo";
import {getSports} from "@/redux/subgraph/graphql";

interface IGameFilter {
  startsAt_gt: number
  startsAt_lt?: number
  hasActiveConditions: boolean
}

export enum sortTime {
  '1h' = 3600,
  '3h' = 3600 * 3,
  '6h' = 3600 * 6,
  'today' = 3600 * 24,
  'tomorrow' = 'tomorrow',
  'all' = 0
}

export const fetchSports = createAsyncThunk(
  'get sports',
  async (sortTime: sortTime) => {
    try {
      const gameFilter: IGameFilter = {
        "startsAt_gt": Math.floor(Date.now() / 1000),
        "hasActiveConditions": true,
      }

      if (sortTime === 'tomorrow') gameFilter.startsAt_gt = Math.floor(Date.now() / 1000 + 3600 * 24)
      else if (sortTime) gameFilter.startsAt_lt = Math.floor(Date.now() / 1000) + sortTime

      const res = await apolloClient.query({
        query: getSports,
        variables: {
          gameFilter
        }
      })
      return res?.data?.sports || []
    } catch (e) {
    }
  }
)