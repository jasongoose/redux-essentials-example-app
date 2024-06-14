import { createSlice, nanoid } from '@reduxjs/toolkit'
import { sub } from 'date-fns'

const initialReactions = () => ({
  thumbsUp: 0,
  hooray: 0,
  heart: 0,
  rocket: 0,
  eyes: 0,
})

const initialState = [
  {
    id: '1',
    title: 'First Post!',
    content: 'Hello!',
    user: '100',
    date: sub(new Date(), {
      minutes: 10,
    }).toISOString(),
    reactions: initialReactions(),
  },
  {
    id: '2',
    title: 'Second Post',
    content: 'More text',
    user: '101',
    date: sub(new Date(), {
      minutes: 5,
    }).toISOString(),
    reactions: initialReactions(),
  },
]

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPost: {
      reducer(state, { payload }) {
        state.push(payload)
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
      const target = state.find((item) => item.id === id)
      if (!target) {
        return
      }
      target.title = title
      target.content = content
    },
    addReaction(state, { payload }) {
      const { postId, reaction } = payload
      const targetPost = state.find((post) => post.id === postId)
      if (!targetPost) {
        return
      }
      targetPost.reactions[reaction]++
    },
  },
})

export const { addPost, updatePost, addReaction } = postsSlice.actions

export default postsSlice.reducer

// slice의 목적: store의 일부 state를 관리하고 업데이트하는 reducer와 action creator들을 제공

// slice 당 하나의 reducer가 정의되어 store에 등록됨
// createSlice 내부의 reducers는 action별 처리방식을 구분함

// prepare 콜백을 사용하여 dispatch하면서 실제 action payload의 모양새를 강제할 필요가 없어지고 중복을 줄일 수 있음

export const selectAllPosts = (state) => state.posts

export const selectPostById = (id) => (state) =>
  state.posts.find((post) => post.id === id)
