import { createSlice } from '@reduxjs/toolkit'

const initialState = [
  { id: '0', name: 'Tianna Jenkins' },
  { id: '1', name: 'Kevin Grant' },
  { id: '2', name: 'Madison Price' },
  { id: '100', name: 'jason' },
  { id: '101', name: 'goose' },
]

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    //
  },
})

export const {} = usersSlice.actions

export default usersSlice.reducer
