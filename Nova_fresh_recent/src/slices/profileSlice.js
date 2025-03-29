import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // token: localStorage.getItem("token") || null
}

// console.log(token);

const authSlice = createSlice({
  name: 'profiles',
  initialState: initialState,
  reducers: {
    setUser(state, action) {
      state.token = action.payload
    }
  }
})

export const { setUser } = authSlice.actions;
export default authSlice.reducer;