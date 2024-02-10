import { createSlice } from "@reduxjs/toolkit";
import { Products } from "../../../types";
import { toast } from "react-hot-toast";

const initialState: Products[] = [];

const ProductSlice = createSlice({
  name: "cartProducts",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existing = state.find((item) => item._id === action.payload._id);
      if (existing) {
        toast.success("Already added to cart");
        return state;
      }
      state.unshift(action.payload);
      toast.success("Added to cart");
      return state;
    },
    removeFromCart: (state, action) => {
      const index = state.findIndex((item) => item._id === action.payload);
      if (index !== -1) {
        state.splice(index, 1);
        toast.success("Removed from cart");
      }
    },
    removeAll: () => initialState,
  },
});

interface Checkout{
  productid: string;
  price: number;
  productname:string;
}

const initstate:Checkout [] =[]
const CheckOutSlice = createSlice({
  name: "CheckOut",
  initialState:initstate,
  reducers: {
    addToCheckOut: (state, action) => {
      const existing = state.find((item) => item.productid === action.payload.productid);
      if (existing) {
        return state;
      }
      state.unshift(action.payload);
    },
    removeFromCheckOut: (state, action) => {
      const index = state.findIndex((item) => item.productid === action.payload);
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
  },
});

export const { addToCart, removeFromCart, removeAll } = ProductSlice.actions;
export const { addToCheckOut, removeFromCheckOut } = CheckOutSlice.actions;

export const productReducer = ProductSlice.reducer;
export const checkOutReducer = CheckOutSlice.reducer;
