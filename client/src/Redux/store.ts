import { configureStore } from '@reduxjs/toolkit'
import currentReducer from './currentSlice'

const store = configureStore({
  reducer: {
    current:currentReducer
  },
})

export default store

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch