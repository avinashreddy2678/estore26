import axios from "axios";
import {Products} from "../../../types";
import { BillBoard } from "../../../types"
import helper from "@/helpers/helper";
interface MySchema{
    products:Products[];
    billBoard:BillBoard[];
}
const getAllProducts = async (): Promise<MySchema> => {
  const url = `${helper}/Product/AllProducts`;
  try {
    const res = await axios.get(url);
    return {products : res.data.Products,billBoard:res.data.BillBoard} // Return only the data from the response
  } catch (error) {
    console.error("Error fetching products:", error);
    return {products: [], billBoard: [] }; // Return an empty array if there's an error
  }
};

export default getAllProducts;
