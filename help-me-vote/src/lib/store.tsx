import { configureStore } from '@reduxjs/toolkit'
import topicsReducer from './features/topics/topicsSlice'
import chatReducer from './features/chat/chatSlice'
import kbReducer from './features/knowledgeBases/kbSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
        topics: topicsReducer,
        chat: chatReducer,
        knowledgeBases: kbReducer
    }
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']