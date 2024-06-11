import { configureStore } from '@reduxjs/toolkit'
import postsReducer from '../features/posts/postsSlice'

export const store = configureStore({
  reducer: {
    posts: postsReducer,
  },
})

// configureStore에서의 reducer는 state의 일부가 어떤 slice reducer에 의해서 관리되는지를 명시함
