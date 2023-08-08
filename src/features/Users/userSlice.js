import { createAsyncThunk,createSlice } from "@reduxjs/toolkit"
import userService from "./userService"

const user = JSON.parse(localStorage.getItem("User"))

const initialState = {
  user: user ? user : null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: ""
}

export const register = createAsyncThunk("user/register",async (formData,thunkAPI) => {
  try {
    return await userService.register(formData)
  } catch (error) {
    const message =
      (error.response &&
        error.response.data &&
        error.response.data.message) ||
      error.message ||
      error.toString()

    return thunkAPI.rejectWithValue(message)
  }
})

export const login = createAsyncThunk("user/login",async (formData,thunkAPI) => {
  try {
    return await userService.login(formData)
  } catch (error) {
    const message =
      (error.response &&
        error.response.data &&
        error.response.data.message) ||
      error.message || error.toString()

    return thunkAPI.rejectWithValue(message)
  }
})

export const logout = createAsyncThunk("user/logout",async () => {
  await userService.logout()
})


export const imageUpload = createAsyncThunk("user/upload",async (formData,thunkAPI) => {
  try {
    const token = await thunkAPI.getState.user.user.token()
    return await userService.imageUpload(formData,token)
  } catch (error) {
    const message =
      (error.response &&
        error.response.data &&
        error.response.data.message) ||
      error.message || error.toString()

    return thunkAPI.rejectWithValue(message)
  }
})


const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isError = false
      state.isSuccess = false
      state.message = ""
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending,(state) => {
        state.isLoading = true
      })
      .addCase(register.fulfilled,(state,action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(register.rejected,(state,action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
      })
      .addCase(login.pending,(state) => {
        state.isLoading = true
      })
      .addCase(login.fulfilled,(state,action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(login.rejected,(state,action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
      })
      .addCase(logout.fulfilled,(state) => {
        state.user = null
      })
      .addCase(imageUpload.pending,(state) => {
        state.isLoading = true
      })
      .addCase(imageUpload.fulfilled,(state,action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(imageUpload.rejected,(state,action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })

  }
})


export const { reset } = userSlice.actions
export default userSlice.reducer