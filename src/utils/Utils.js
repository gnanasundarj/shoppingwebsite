function roundoff(value) {
  return parseFloat(value.toFixed(2));
}
export function totalAmt(state, action, type = "none") {
  // if (type === "replace") {
  //   state.checkout.subtotal = roundoff(
  //     state.checkout.subtotal - (state.checkout.initialprice * action.count)
  //   );
  //   state.checkout.totaldiscount = state.checkout.totaldiscount + 5;
  //   state.checkout.totalshipping = state.checkout.totalshipping + 10;
  //   let total =
  //     state.checkout.subtotal -
  //     state.checkout.totaldiscount -
  //     state.checkout.totalshipping;
  //   state.checkout.total = Math.round(total * 100) / 100;
  // }
  if (type === "none") {
    state.checkout.subtotal = roundoff(
      state.checkout.subtotal + action.payload.price
    );
    state.checkout.totaldiscount = state.checkout.totaldiscount + 5;
    state.checkout.totalshipping = state.checkout.totalshipping + 10;

    let total =
      state.checkout.subtotal -
      state.checkout.totaldiscount -
      state.checkout.totalshipping;
    state.checkout.total = Math.round(total * 100) / 100;
  }
  if (type === "dec") {

    state.checkout.subtotal = roundoff(
      state.checkout.subtotal - action.payload.initialprice
    );
    state.checkout.totaldiscount = state.checkout.totaldiscount - 5;
    state.checkout.totalshipping = state.checkout.totalshipping - 10;

    let total =
      state.checkout.subtotal -
      state.checkout.totaldiscount -
      state.checkout.totalshipping;
    state.checkout.total = Math.round(total * 100) / 100;
  }
  if (type === "inc") {
    state.checkout.subtotal = roundoff(
      state.checkout.subtotal + action.payload.initialprice
    );
    state.checkout.totaldiscount = state.checkout.totaldiscount + 5;
    state.checkout.totalshipping = state.checkout.totalshipping + 10;

    let total =
      state.checkout.subtotal -
      state.checkout.totaldiscount -
      state.checkout.totalshipping;
    state.checkout.total = Math.round(total * 100) / 100;
  }
  if (type === "remove") {

    state.checkout.subtotal = roundoff(
      state.checkout.subtotal -
        action.payload.initialprice * action.payload.count
    );
    state.checkout.totaldiscount =
      state.checkout.totaldiscount - 5 * action.payload.count;
    state.checkout.totalshipping =
      state.checkout.totalshipping - 10 * action.payload.count;

    let total =
      state.checkout.subtotal -
      state.checkout.totaldiscount -
      state.checkout.totalshipping;
    state.checkout.total = Math.round(total * 100) / 100;
  }
}
