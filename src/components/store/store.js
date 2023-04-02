import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  itemsQuantity: 0,
  totalAmount: 0,
};
const CartSlice = createSlice({
  name: "store",
  initialState,
  reducers: {
    addItem(state, action) {
      const duplicateItemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (duplicateItemIndex >= 0) {
        state.cartItems[duplicateItemIndex].itemQuantity += 1;
      } else {
        state.cartItems = [
          ...state.cartItems,
          { ...action.payload, itemQuantity: 1 },
        ];
      }
    },
    removeItem(state, action) {
      const targetProductIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload
      );
      if (state.cartItems[targetProductIndex].itemQuantity > 1) {
        state.cartItems[targetProductIndex].itemQuantity -= 1;
      } else {
        state.cartItems = state.cartItems.filter(
          (item) => item.id !== action.payload
        );
      }
    },
    calcTotals(state, action) {
      let totalQuantity = 0;
      let totalAmount = 0;
      state.cartItems.map((item) => {
        totalQuantity += item.itemQuantity;
        totalAmount += item.itemQuantity * item.price;
      });
      state.itemsQuantity = totalQuantity;
      state.totalAmount = totalAmount;
    },
  },
});

export const cartActions = CartSlice.actions;

export const store = configureStore({ reducer: CartSlice.reducer });
