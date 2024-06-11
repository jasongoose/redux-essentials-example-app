import { createSlice } from '@reduxjs/toolkit'

const initialState = [
  { id: '1', title: 'First Post!', content: 'Hello!' },
  { id: '2', title: 'Second Post', content: 'More text' },
]

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    //
  },
})

export default postsSlice.reducer

// slice의 목적: store의 일부 state를 관리하고 업데이트하는 reducer와 action creator들을 제공

// slice 당 하나의 reducer가 정의되어 store에 등록됨
// createSlice 내부의 reducers는 action별 처리방식을 구분함
