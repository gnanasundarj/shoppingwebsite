import { createSlice } from "@reduxjs/toolkit";
let initialStatus = {
  value: "",
};

let Modelstatus = createSlice({
  name: "Model",
  initialState: initialStatus,
  reducers: {
    setModel: (state, actions) => {
      state.value = actions.payload;
    },
    closeModel: (state, actions) => {
      state.value = "";
    },
  },
});

export const { setModel, closeModel } = Modelstatus.actions;
export default Modelstatus.reducer;
