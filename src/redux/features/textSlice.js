import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
const url = 'https://baconipsum.com/api/?type=meat-and-filler'

export const getText = createAsyncThunk('text/getText', async ({ n, h }) => {
  try {
    const response = await axios(`${url}&paras=${n}&format=${h}/`)
    return response.data
  } catch (error) {
    return console.log(error)
  }
})

const textSlice = createSlice({
  name: 'text',
  initialState: {
    text: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: {
    [getText.fulfilled]: (state, action) => {
      state.text = action.payload
      state.status = 'idle'
    },
  },
})

export const {} = textSlice.actions
export default textSlice.reducer
