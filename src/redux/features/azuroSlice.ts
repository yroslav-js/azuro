import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {fetchSports} from "@/redux/subgraph/callFunctions";
import {IInitialState, ISports} from "@/redux/features/azuroInterface";

const initialState: IInitialState = {
  sports: [],
  sportFilter: {
    filterTitle: 'SPORTS',
    items: [{
      item: 'Top events',
      slug: ''
    }]
  }
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
    builder.addCase(fetchSports.fulfilled, (state, action: PayloadAction<ISports[] | []>) => {
      state.sports = action.payload
      state.sportFilter.items = [{
        item: 'Top events',
        slug: ''
      }, ...action.payload.map(sport => {
        return {
          item: sport.name,
          slug: sport.slug
        }
      })]
    })
  }
})

export const {
  // setSome
} = azuroSlice.actions

export default azuroSlice.reducer