"use client";
import React from "react";
import Image from "next/image";
import { DollarSign, ShoppingCart, Expand } from "lucide-react";
import { Button } from "@nextui-org/react";
import { Card, CardFooter, CardContent } from "@/components/ui/card";
import Container from "@/app/Components/Container";
import { Products } from "../../../../types";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { addToCart } from "@/app/Store/ProductSlice";

interface ProductProps {
  product: Products;
}
const ProductCard: React.FC<ProductProps> = ({ product }) => {
  const dispatch = useDispatch();

  return (
    <Container>
      <Card className="border-none relative cursor-pointer rounded-md mt-3 m-auto h-[350px] w-[260px]">
        <CardContent className="overflow-visible py-2 group">
          <Image
            alt="Card background"
            className=" aspect-square object-cover z-100 rounded-md"
            src={product?.productImage[0]}
            width={270}
            height={120}
          />

          <div className="absolute flex justify-between bottom-36 px-4 opacity-0 z-30 group-hover:opacity-100 transition">
            <Button className="btn bg-gray-600 mx-4 p-2 rounded-lg opacity-60">
              <ShoppingCart
                size={20}
                className="text-gray-200 rounded-lg"
                onClick={() => {
                  dispatch(addToCart(product));
                }}
              />
            </Button>
            {/* <Button isIconOnly className="btn bg-gray-200 mx-4 opacity-50"> */}
            <Link
              href={{
                pathname: `/product/${product._id}`,
                query: { store: JSON.stringify(product) },
              }}
              className="btn bg-gray-200 mx-4 opacity-50"
            >
              <div className="btn bg-gray-600 p-2 rounded-lg opacity-100">
              <Expand size={20} className="text-gray-200 bg-gray-600 rounded-xl" />
              </div>
            </Link>
            {/* </Button> */}
          </div>
        </CardContent>
        <CardFooter className="pb-3 pt-2 px-4 flex-col items-start">
          <p className="text-tiny uppercase font-bold">{product?.name}</p>
          <small className="text-default-500">{product?.Type}</small>
          <h4 className="font-bold flex items-center justify-center text-md">
            <DollarSign size={18} />
            {product?.price}
          </h4>
        </CardFooter>
      </Card>
    </Container>
  );
};

export default ProductCard;
