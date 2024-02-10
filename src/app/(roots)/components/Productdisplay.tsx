import { addToCart, removeFromCart } from "@/app/Store/ProductSlice";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DollarSign } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
interface Image {
  productImage: Array<string>;
}
const Productdisplay = ({ product }: any) => {
  const [index, setindex] = useState(0);
  const dispatch = useDispatch();
  const selector = useSelector((state: any) => state.cartProducts);
  const check = selector?.some((item: any) => item._id === product._id);
  return (
    <>
      <Card className="mt-5 ">
        <div className="">
          <div className="mx-auto mt-4">
            <Image
              alt="Card background"
              className=" aspect-square object-cover z-100 rounded-md"
              src={product?.productImage[index]}
              width={270}
              height={120}
            />

            <div className="flex mt-4 mx-auto pl-5">
              {product?.productImage?.map((product: string, index: number) => (
                <div key={index}>
                  <Image
                    onClick={() => {
                      setindex(index);
                    }}
                    alt="card image with"
                    className="ml-2 aspect-square  rounded-full m-5 cursor-pointer"
                    src={product}
                    width={40}
                    height={40}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>
      <Card className="mt-4 mx-auto">
        <div className="text-center mt-3">{product?.name}</div>
        <div className="text-semibold mt-3 flex pl-8">
          <DollarSign />
          {product?.price}
        </div>
        <div className="w-[80%] my-4 mx-auto">
          {check ? (
            <Button
              onClick={() => {
                dispatch(removeFromCart(product._id));
              }}
              className="btn p-1 btn-primary mx-auto w-full"
            >
              Remove From Cart
            </Button>
          ) : (
            <Button
              onClick={() => {
                dispatch(addToCart(product));
              }}
              className="btn p-1 btn-primary mx-auto w-full"
            >
              Add to Card
            </Button>
          )}
        </div>
      </Card>
    </>
  );
};

export default Productdisplay;
