import { configureStore } from '@reduxjs/toolkit'
import topicsReducer from './features/topics/topicsSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
        topics: topicsReducer
    }
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']