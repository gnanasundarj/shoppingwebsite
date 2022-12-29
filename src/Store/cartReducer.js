import { createSlice } from "@reduxjs/toolkit";
import { totalAmt } from "../utils/Utils";

let initialCart = {
  item: [],
  checkout: {
    subtotal: 0,
    totalshipping: 0,
    totaldiscount: 0,
    total: 0,
  },
  Allproducts: [],
  fetchData: true,
  wishCount: 0,
};

const cartDetails = createSlice({
  name: "cart",
  initialState: initialCart,
  reducers: {
    add: (state, action) => {
      let info = state.item.find((data) => data.id === action.payload.id);

      if (!info) {
        state.item.push(action.payload);
        totalAmt(state, action);
      }
      state.Allproducts.forEach((data) => {
        if (data.id === action.payload.id) {
          data.cartStatus = true;

          return;
        }
      });
    },
    changeCount: (state, action) => {
      let index = state.item.findIndex((data) => data.id === action.payload.id);

      state.item[index].price = action.payload.price;
      state.item[index].count = action.payload.count;
      totalAmt(state, action, action.payload.type);
    },
    remove: (state, action) => {
      let index = state.item.findIndex((data) => data.id === action.payload.id);
      state.item.splice(index, 1);
      totalAmt(state, action, "remove");
      state.Allproducts.forEach((data) => {
        if (data.id === action.payload.id) {
          data.cartStatus = false;
          return;
        }
      });
    },
    setAllproducts: (state, action) => {
      action.payload.items.forEach((data) => {
        if (
          data.category === "men's clothing" ||
          data.category === "women's clothing"
        ) {
          data.size = "S";
        }
        data.cartStatus = false;
        data.wishStatus = false;

        state.Allproducts.push(data);
      });
    },
    changeFetchState: (state, actions) => {
      state.fetchData = false;
    },
    setWishlist: (state, actions) => {

      state.Allproducts.forEach((data) => {
        if (data.id === actions.payload.id) {
          if (!data.wishStatus) {
            data.wishStatus = true;
            state.wishCount = state.wishCount + 1;
            return;
          } else {
            data.wishStatus = false;
            state.wishCount = state.wishCount - 1;
          }
        }
      });
    },
  },
});

export const {
  add,
  changeCount,
  remove,
  setAllproducts,
  changeFetchState,
  setWishlist,
} = cartDetails.actions;
export default cartDetails.reducer;
