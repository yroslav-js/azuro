import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {fetchSearch, fetchSports, fetchSportsGames} from "@/redux/subgraph/callFunctions";
import {IFilter, IInitialState, ISearch, ISortItem, ISports} from "@/redux/features/azuroInterface";

const initialState: IInitialState = {
  sports: [],
  sportFilter: [],
  basket: [],
  search: [],
  isFilterOpen: false,
  sortItem: 'All'
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
    setIsFilterOpen: (state, action: PayloadAction<boolean>) => {
      state.isFilterOpen = action.payload
    },
    setSortItem: (state, action: PayloadAction<ISortItem>) => {
      state.sortItem = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSportsGames.fulfilled, (state, action: PayloadAction<ISports[]>) => {
      state.sports = action.payload
    }).addCase(fetchSportsGames.pending, state => {
      state.sports = []
    }).addCase(fetchSports.fulfilled, (state, action: PayloadAction<IFilter[]>) => {
      // @ts-ignore
      state.sportFilter = action.payload.toSorted((a, b) => (sortedSports[a.slug] || 10) - (sortedSports[b.slug] || 10))
    }).addCase(fetchSearch.fulfilled, (state, action: PayloadAction<ISearch[]>) => {
      state.search = action.payload
    })
  }
})

export const {
  setBasketEvents,
  clearSearch,
  setIsFilterOpen,
  setSortItem
} = azuroSlice.actions

export default azuroSlice.reducer