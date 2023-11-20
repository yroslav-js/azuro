import {createAsyncThunk} from "@reduxjs/toolkit";
import {apolloClient} from "@/redux/subgraph/apollo";
import {getSearch, getSports, getSportsGames} from "@/redux/subgraph/graphql";

interface IGameFilter {
  startsAt_gt: number
  startsAt_lt?: number
  hasActiveConditions: boolean
  league_?: {
    slug_in: string[]
  }
  title_starts_with_nocase?: string
  id?: string
}

interface ISportFilter {
  slug?: string
  sporthub_in: ["sports"]
}

const getToday = () => {
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth()
  const date = now.getDate() + 1
  const tomorrow = new Date(year, month, date)
  return (Number(tomorrow) - 1000 * 60 * 2) / 1000
}

export enum sortTime {
  '1h' = 3600,
  '3h' = 3600 * 3,
  '6h' = 3600 * 6,
  'Today' = 'Today',
  'Tomorrow' = 'Tomorrow',
  'All' = 0
}

export const fetchSportsGames = createAsyncThunk(
  'get sports games',
  async ({sortTime, filter, league, id}: { sortTime: sortTime, filter?: string, league?: string[], id?: string }) => {
    try {
      const gameFilter: IGameFilter = {
        startsAt_gt: Math.floor(Date.now() / 1000),
        hasActiveConditions: true,
      }
      const sportFilter: ISportFilter = {
        sporthub_in: ["sports"]
      }

      if (filter) sportFilter.slug = filter
      if (id) gameFilter.id = id
      if (league) gameFilter.league_ = {slug_in: league}

      if (sortTime === 'Tomorrow') {
        gameFilter.startsAt_gt = Math.floor(getToday() + 60 * 2)
        gameFilter.startsAt_lt = Math.floor(getToday() + (24 * 3600))
      } else if (sortTime === 'Today') {
        gameFilter.startsAt_lt = getToday()
      } else if (sortTime) {
        gameFilter.startsAt_lt = Math.floor(Date.now() / 1000) + +sortTime.toFixed(0)
      }

      const res = await apolloClient.query({
        query: filter ? getSportsGames(500) : getSportsGames(4),
        variables: {
          gameFilter,
          sportFilter
        }
      })
      return res?.data?.sports || []
    } catch (e) {
      return []
    }
  }
)

export const fetchSports = createAsyncThunk(
  'get sports',
  async () => {
    try {
      const gameFilter: IGameFilter = {
        startsAt_gt: Math.floor(Date.now() / 1000),
        hasActiveConditions: true,
      }
      const sportFilter: ISportFilter = {
        sporthub_in: ["sports"]
      }
      const res = await apolloClient.query({
        query: getSports,
        variables: {
          gameFilter,
          sportFilter
        }
      })
      return res?.data?.sports || []
    } catch (e) {
      return []
    }
  }
)

export const fetchSearch = createAsyncThunk(
  'search',
  async ({str, by, direction}: { str: string, by: string, direction: 'asc' | 'desc' }) => {
    try {
      const gameFilter: IGameFilter = {
        startsAt_gt: Math.floor(Date.now() / 1000),
        hasActiveConditions: true
      }
      const sportFilter: ISportFilter = {
        sporthub_in: ["sports"]
      }
      gameFilter.title_starts_with_nocase = str
      const res = await apolloClient.query({
        query: getSearch(by, direction),
        variables: {
          gameFilter,
          sportFilter
        }
      })
      return res?.data?.games || []
    } catch (e) {
      return []
    }
  }
)