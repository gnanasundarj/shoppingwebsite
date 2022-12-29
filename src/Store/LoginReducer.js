import { createSlice } from "@reduxjs/toolkit";
let initialStatus = {
  loginStatus: false,
  userInfo: {
    username: "user",
  },
};

let LoginReducer = createSlice({
  name: "loginData",
  initialState: initialStatus,
  reducers: {
    setUserData: (state, actions) => {
      console.log(actions.payload);
      state.userInfo.username = actions.payload.username;
      state.loginStatus = true;
    },
    logout: (state) => {
      return initialStatus;
    },
  },
});

export const { setUserData, logout } = LoginReducer.actions;
export default LoginReducer.reducer;
