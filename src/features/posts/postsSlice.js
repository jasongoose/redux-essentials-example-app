import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit'

import { client } from '../../api/client'

export const fetchPostsThunk = createAsyncThunk(
  'posts/fetchPosts',
  async () => {
    const response = await client.get('/fakeApi/posts')
    return response.data
  },
)

// createAsyncThunk에서 반환된 함수는 thunk (function)이 아닌 thunk (action) creator
// thunk를 dispatch하면 비동기 로직 이후 thunk의 type을 prefix로 가지는 action이 dispatch됨

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    addPost: {
      reducer(state, { payload }) {
        state.posts.push(payload)
        //
      },
      prepare({ title, content, userId }) {
        // action 객체를 생성함
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            user: userId,
            date: new Date().toISOString(),
            reactions: initialReactions(),
          },
          // meta
          // error
        }
      },
    },
    updatePost(state, { payload }) {
      const { id, title, content } = payload
      const targetPost = state.posts.find((item) => item.id === id)
      if (!target) {
        return
      }
      targetPost.title = title
      targetPost.content = content
    },
    addReaction(state, { payload }) {
      const { postId, reaction } = payload
      const targetPost = state.posts.find((post) => post.id === postId)
      if (!targetPost) {
        return
      }
      targetPost.reactions[reaction]++
    },
  },
  // 현재 slice에서 다루지 않는 action들을 처리하는 reducer들을 별도로 정의
  // 보통 thunk에서 dispatch된 비동기 작업 상태 action도 다룸
  extraReducers(builder) {
    builder
      .addCase(fetchPostsThunk.pending, (state, action) => {
        state.status = 'pending'
      })
      .addCase(fetchPostsThunk.fulfilled, (state, { payload }) => {
        state.status = 'fulfilled'
        state.posts = state.posts.concat(payload)
      })
      .addCase(fetchPostsThunk.rejected, (state, { error }) => {
        state.status = 'rejected'
        state.error = error.message
      })
  },
})

export const { addPost, updatePost, addReaction } = postsSlice.actions

export default postsSlice.reducer

// slice의 목적: store의 일부 state를 관리하고 업데이트하는 reducer와 action creator들을 제공

// slice 당 하나의 reducer가 정의되어 store에 등록됨
// createSlice 내부의 reducers는 action별 처리방식을 구분함

// prepare 콜백을 사용하여 dispatch하면서 실제 action payload의 모양새를 강제할 필요가 없어지고 중복을 줄일 수 있음

export const selectAllPosts = (state) => state.posts.posts

export const selectPostById = (id) => (state) =>
  state.posts.posts.find((post) => post.id === id)
