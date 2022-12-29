import { configureStore } from "@reduxjs/toolkit";
// import allProuctsReducer from "../Store/Reducer";
import cartReducer from "../Store/cartReducer";
import LoginReducer from "../Store/LoginReducer";
import modelReducer from "../Store/Model";

const Store = configureStore({
  reducer: {
    // allproducts: allProuctsReducer,
    cartData: cartReducer,
    LoginData: LoginReducer,
    modelData: modelReducer,
  },
});

export default Store;
