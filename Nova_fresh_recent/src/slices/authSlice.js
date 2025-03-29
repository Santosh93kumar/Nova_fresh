import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token") || null
}

// console.log(token);

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setToken(state, action) {
      state.token = action.payload
    }
  }
})

export const { setToken } = authSlice.actions;
export default authSlice.reducer;