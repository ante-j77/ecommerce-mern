import { combineReducers } from "@reduxjs/toolkit";

import productReducer from "./product/productReducer";
import basketReducer from "./basket/basketReducer";
import authReducer from "./auth/authReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  products: productReducer,
  basket: basketReducer,
});

export default rootReducer;
