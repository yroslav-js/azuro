import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {fetchSports, fetchSportsGames} from "@/redux/subgraph/callFunctions";
import {IFilter, IInitialState, ISports} from "@/redux/features/azuroInterface";

const initialState: IInitialState = {
  sports: [],
  sportFilter: [],
  basket: []
}

export const azuroSlice = createSlice({
  name: 'azuro',
  initialState,
  reducers: {
    setBasketEvents: (state, action) => {
      state.basket = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSportsGames.fulfilled, (state, action: PayloadAction<ISports[] | []>) => {
      state.sports = action.payload
    }).addCase(fetchSportsGames.pending, state => {
      state.sports = []
    }).addCase(fetchSports.fulfilled, (state, action: PayloadAction<IFilter[] | []>) => {
      state.sportFilter = action.payload
    })
  }
})

export const {
  setBasketEvents
} = azuroSlice.actions

export default azuroSlice.reducer