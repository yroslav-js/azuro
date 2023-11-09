import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {fetchSearch, fetchSports, fetchSportsGames} from "@/redux/subgraph/callFunctions";
import {IFilter, IInitialState, ISearch, ISports} from "@/redux/features/azuroInterface";

const initialState: IInitialState = {
  sports: [],
  sportFilter: [],
  basket: [],
  search: []
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
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSportsGames.fulfilled, (state, action: PayloadAction<ISports[]>) => {
      state.sports = action.payload
    }).addCase(fetchSportsGames.pending, state => {
      state.sports = []
    }).addCase(fetchSports.fulfilled, (state, action: PayloadAction<IFilter[]>) => {
      state.sportFilter = action.payload
    }).addCase(fetchSearch.fulfilled, (state, action: PayloadAction<ISearch[]>) => {
      state.search = action.payload
    })
  }
})

export const {
  setBasketEvents,
  clearSearch
} = azuroSlice.actions

export default azuroSlice.reducer