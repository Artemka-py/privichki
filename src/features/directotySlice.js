import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetchData } from './directotyAPI'

const initialState = {
  content: {},
  loading: false,
}

export const selectDirectorys = (state) => state.directorys

export const fetchDataAsync = createAsyncThunk(
  'directory/fetchData',
  async (dirId, { dispatch, getState }) => {
    const res = await fetchData(dirId)
    const curValue = selectDirectorys(getState())
    console.log('async', curValue)
    return res
  }
)

// export const postFetch = (dirId, res) => (dispatch, getState) => {
//   const curValue = selectDirectorys(getState())
//   console.log('prevfetch', curValue, res)

//   return res
// }

export const directotySlice = createSlice({
  name: 'directoty',
  initialState,
  // reducers: {
  //   postFetch: (state, action) => {
  //     console.log('reducer', action.payload)
  //     state.content = action.payload
  //   },
  // },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDataAsync.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchDataAsync.fulfilled, (state, action) => {
        state.loading = false
        state.content = action.payload
      })
  },
})

export default directotySlice.reducer
