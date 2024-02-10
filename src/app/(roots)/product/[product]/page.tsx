"use client";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Productdisplay from "../../components/Productdisplay";
import { Products } from "../../../../../types";
import getAllProducts from "@/app/hooks/getAllProducts";
import RelatedPosts from "../../components/RelatedPosts";

const ProductPreview = () => {
  const [product, setProduct] = useState<Products>();
  const query = useSearchParams();
  const store = query.get("store");
  useEffect(() => {
    if (store) {
      try {
        const parsedStore = JSON.parse(store);
        setProduct(parsedStore);
      } catch (error) {
        console.error("Error parsing store:", error);
      }
    }
  }, [store]);

  const [productData, setproductData] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      const { products }: any = await getAllProducts();
      setproductData(products);
    };
    fetch();
  }, []);

  return (
    <div className="w-full lg:flex">
      <div className="lg:w-[50%] w-[100%]">
        <div className="flex justify-center">
          {product && (
            <div>
              <Productdisplay product={product} />
            </div>
          )}
        </div>
      </div>

      <div className="lg:w-[50%] w-[100%]">
        <h1 className="text-2xl text-center mt-4">Related Items</h1>

        <div className="flex flex-wrap mt-8 justify-center max-h-[90vh] ">
          {productData.map(
            (item: any, index) =>
              item.Type === product?.Type &&
              item._id !== product?._id && (
                <div key={index} className="m-3 flex flex-wrap mx-auto">
                  <RelatedPosts product={item} />
                </div>
              )
          )}
          {!productData.some(
            (item: any) =>
              item.Type === product?.Type && item._id !== product?._id
          ) && (
            <p className="m-3 text-lg text-center">
              No related Items found. <br /> You selection is Unique and Awesome
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductPreview;
