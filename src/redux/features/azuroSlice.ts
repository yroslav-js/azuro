import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {fetchMyBets, fetchSearch, fetchSports, fetchSportsGames} from "@/redux/subgraph/callFunctions";
import {IFilter, IInitialState, IOddsFormat, ISearch, ISortItem, ISports} from "@/redux/features/azuroInterface";
import {IMyBets} from "@/redux/features/mybetsInterface";

const initialState: IInitialState = {
  sports: [],
  sportFilter: [],
  basket: [],
  search: [],
  isFilterOpen: false,
  sortItem: 'All',
  oddsFormat: 'EU',
  myBets: []
}

const sortedSports = {
  'football': 1,
  'basketball': 2,
  'tennis': 3,
  'cricket': 4,
  'mma': 5,
  'boxing': 6,
  'ice-hockey': 7,
  'american-football': 8,
  'baseball': 9,
  'rugby-union': 91,
  'rugby-league': 92
}

export const azuroSlice = createSlice({
  name: 'azuro',
  initialState,
  reducers: {
    setBasketEvents: (state, action) => {
      state.basket = action.payload
    },
    clearSearch: state => {
      state.search = []
    },
    clearMyBets: state => {
      state.myBets = []
    },
    setIsFilterOpen: (state, action: PayloadAction<boolean>) => {
      state.isFilterOpen = action.payload
    },
    setSortItem: (state, action: PayloadAction<ISortItem>) => {
      state.sortItem = action.payload
    },
    setOddsFormat: (state, action: PayloadAction<IOddsFormat>) => {
      state.oddsFormat = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSportsGames.fulfilled, (state, action: PayloadAction<ISports[]>) => {
      const sorted = [...action.payload]
      // @ts-ignore
      sorted.sort((a, b) => (sortedSports[a.slug] || 99) - (sortedSports[b.slug] || 99))
      state.sports = sorted
    }).addCase(fetchSportsGames.pending, state => {
      state.sports = []
    }).addCase(fetchSports.fulfilled, (state, action: PayloadAction<IFilter[]>) => {
      const sorted = [...action.payload]
      // @ts-ignore
      sorted.sort((a, b) => (sortedSports[a.slug] || 99) - (sortedSports[b.slug] || 99))
      state.sportFilter = sorted
    }).addCase(fetchSearch.fulfilled, (state, action: PayloadAction<ISearch[]>) => {
      state.search = action.payload
    }).addCase(fetchMyBets.fulfilled, (state, action: PayloadAction<IMyBets[]>) => {
      state.myBets = action.payload
    })
  }
})

export const {
  setBasketEvents,
  clearSearch,
  setIsFilterOpen,
  setSortItem,
  setOddsFormat,
  clearMyBets
} = azuroSlice.actions

export default azuroSlice.reducer