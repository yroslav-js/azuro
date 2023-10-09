import {configureStore} from '@reduxjs/toolkit'
import azuroReducer from '@/redux/features/azuroSlice'

export const store = configureStore({
  reducer: {
    azuroSlice: azuroReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false})
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch