import {createAsyncThunk} from "@reduxjs/toolkit";
import {apolloClient} from "@/redux/subgraph/apollo";
import {getSports} from "@/redux/subgraph/graphql";

interface IGameFilter {
  startsAt_gt: number
  startsAt_lt?: number
  hasActiveConditions: boolean
}

interface ISportFilter {
    name?: "Football",
    sporthub_in: ["sports"]
}

const getToday = () => {
  const now = new Date()
  return ((24 - now.getHours()) * 60 - now.getMinutes() - 1) * 60
}

export enum sortTime {
  '1h' = 3600,
  '3h' = 3600 * 3,
  '6h' = 3600 * 6,
  'Today' = getToday(),
  'Tomorrow' = 'Tomorrow',
  'All' = 0
}

export const fetchSports = createAsyncThunk(
  'get sports',
  async (sortTime: sortTime) => {
    try {
      const gameFilter: IGameFilter = {
        startsAt_gt: Math.floor(Date.now() / 1000),
        hasActiveConditions: true,
      }
      const sportFilter: ISportFilter = {
        sporthub_in: ["sports"]
      }

      if (sortTime === 'Tomorrow') {
        gameFilter.startsAt_gt = Math.floor(getToday() + 60 + Date.now() / 1000)
        gameFilter.startsAt_lt = Math.floor(getToday() + 60 + 24 * 3600 + Date.now() / 1000)
      } else if (sortTime) gameFilter.startsAt_lt = Math.floor(Date.now() / 1000) + sortTime

      const res = await apolloClient.query({
        query: getSports,
        variables: {
          gameFilter,
          sportFilter
        }
      })
      return res?.data?.sports || []
    } catch (e) {
    }
  }
)