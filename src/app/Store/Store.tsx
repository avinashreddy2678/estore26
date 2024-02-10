"use client"
import { configureStore } from "@reduxjs/toolkit";
import { checkOutReducer, productReducer } from "./ProductSlice";

export const Store = configureStore({
  reducer: {
     cartProducts:productReducer,
     CheckOut:checkOutReducer
  },
});
export default Store;
