import {createSlice} from '@reduxjs/toolkit'
import {fetchSports} from "@/redux/subgraph/callFunctions";
import {IInitialState} from "@/redux/features/azuroInterface";

const initialState: IInitialState = {
  sports: []
}

export const azuroSlice = createSlice({
  name: 'azuro',
  initialState,
  reducers: {
    // setSome: (state, action) => {
    //   state.sports = action.payload
    // }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSports.fulfilled, (state, action) => {
      state.sports = action.payload
    })
  }
})

export const {
  // setSome
} = azuroSlice.actions

export default azuroSlice.reducer