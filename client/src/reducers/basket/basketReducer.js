import { createSlice } from "@reduxjs/toolkit";

const basketSlice = createSlice({
  name: "basket",
  initialState: [],

  reducers: {
    addItem: (state, action) => {
      const { id, name, image, description, price } = action.payload;
      const existingProductId = state.findIndex((product) => product.id === id);

      if (existingProductId !== -1) {
        state[existingProductId].quantity += 1;
      } else {
        state.push({ id, name, image, description, price, quantity: 1 });
      }
    },

    removeItem: (state, action) => {
      return state.filter((product) => product.id !== action.payload.id);
    },

    removeAll: (state) => {
      return [];
    },

    increaseQuantity: (state, action) => {
      const product = state.find((item) => item.id === action.payload);
      if (product) {
        product.quantity += 1;
      } else {
        console.warn("Product not found in basket withd ID:", action.payload);
      }
    },

    decreaseQuantity: (state, action) => {
      const product = state.find((item) => item.id === action.payload);
      if (product && product.quantity > 1) {
        product.quantity -= 1;
      } else {
        console.warn("Product not found in basket withd ID:", action.payload);
      }
    },

    setSpecificQuantity: (state, action) => {
      const product = state.find((item) => item.id === action.payload.id);
      if (product) {
        product.quantity = action.payload.quantity;
      } else if (product.quantity === 0) {
        product.quantity = 1;
      } else {
        console.warn("Product not found in basket withd ID:", action.payload);
      }
    },
  },
});

export const {
  addItem,
  removeItem,
  removeAll,
  increaseQuantity,
  decreaseQuantity,
  setSpecificQuantity,
} = basketSlice.actions;

export default basketSlice.reducer;
