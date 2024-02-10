"use client";
import { useEffect, useState } from "react";
import getAllProducts from "../hooks/getAllProducts";
import ProductCard from "./components/ProductCard";
import { Products } from "../../../types";
import { BillBoard } from "../../../types";
import BillBoardCard from "./components/BillBoardCard";
import Footer from "../Components/Footer";

interface MySchema {
  products: Products[];
  billBoard: BillBoard[];
}
const HomePage = () => {
  const [productData, setProductData] = useState<Products[]>([]);
  const [billBoard, setBillBoard] = useState<BillBoard[]>([]);
  useEffect(() => {
    const fetch = async () => {
      const { products, billBoard }: MySchema = await getAllProducts();
      setProductData(products);
      setBillBoard(billBoard);
    };
    fetch();
  }, []);
  return (
    <div className="mx-auto max-w-7xl">
      <div>{billBoard && <BillBoardCard billBoard={billBoard[0]} />}</div>
      <div className=" mb-12 grid mx-auto lg:grid-cols-4 mt-4 md:grid-cols-2 grid-cols-1 gap-3">
        {productData &&
          productData.map((product: Products) => (
            <div key={product._id}>
              <ProductCard product={product} />
            </div>
          ))}
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
