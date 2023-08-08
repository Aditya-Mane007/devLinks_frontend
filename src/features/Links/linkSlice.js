import { createSlice,createAsyncThunk } from "@reduxjs/toolkit"
import linkService from "./linkService"
const initialState = {
  links: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

export const getLink = createAsyncThunk("user/getLink",async (_,thunkAPI) => {
  try {
    const token = thunkAPI.getState().user.user.token
    return await linkService.getLink(token)
  } catch (error) {
    const message =
      (error.response &&
        error.response.data &&
        error.response.data.message) ||
      error.message || error.toString()

    return thunkAPI.rejectWithValue(message)
  }
})

export const addLink = createAsyncThunk("user/addLink",async (formData,thunkAPI) => {
  try {
    const token = thunkAPI.getState().user.user.token
    return await linkService.addLink(formData,token)
  } catch (error) {
    const message =
      (error.response &&
        error.response.data &&
        error.response.data.message) ||
      error.message || error.toString()

    return thunkAPI.rejectWithValue(message)
  }
})

export const updateLink = createAsyncThunk("user/updateLink",async (formData,thunkAPI) => {
  try {
    const token = thunkAPI.getState().user.user.token
    return await linkService.updateLink(formData,token)
  } catch (error) {
    const message =
      (error.response &&
        error.response.data &&
        error.response.data.message) ||
      error.message || error.toString()

    return thunkAPI.rejectWithValue(message)
  }

})

export const deleteLink = createAsyncThunk("user/deleteLink",async (id,thunkAPI) => {
  try {
    const token = thunkAPI.getState().user.user.token
    return await linkService.deleteLink(id,token)
  } catch (error) {
    const message =
      (error.response &&
        error.response.data &&
        error.response.data.message) ||
      error.message || error.toString()

    return thunkAPI.rejectWithValue(message)
  }

})


export const linkSlice = createSlice({
  name: 'link',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLink.pending,(state) => {
        state.isLoading = true
      })
      .addCase(getLink.fulfilled,(state,action) => {
        state.isLoading = false
        state.isSuccess = true
        state.links = action.payload
      })
      .addCase(getLink.rejected,(state,action) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
        state.message = action.payload
      })
      .addCase(addLink.pending,(state) => {
        state.isLoading = true
      })
      .addCase(addLink.fulfilled,(state,action) => {
        state.isLoading = false
        state.isSuccess = true
        state.links.push(action.payload)
      })
      .addCase(addLink.rejected,(state,action) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
        state.message = action.payload
      })
      .addCase(updateLink.pending,(state) => {
        state.isLoading = true
      })
      .addCase(updateLink.fulfilled,(state,action) => {
        state.isLoading = false
        state.isSuccess = true
        state.links = state.links.map((link) => (
          link._id === action.payload._id ? action.payload : link
        ))
      })
      .addCase(updateLink.rejected,(state,action) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
        state.message = action.payload
      })
      .addCase(deleteLink.pending,(state) => {
        state.isLoading = true
        state.isSuccess = false
        state.isError = false
      })
      .addCase(deleteLink.fulfilled,(state,action) => {
        state.isLoading = false
        state.isSuccess = true
        state.links = state.links.filter((link) => (link._id !== action.payload._id))
      })
      .addCase(deleteLink.rejected,(state,action) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
        state.message = action.payload
      })
  }

})

export const { reset } = linkSlice.actions
export default linkSlice.reducer