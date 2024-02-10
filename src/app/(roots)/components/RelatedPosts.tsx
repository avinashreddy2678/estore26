import Container from "@/app/Components/Container";
import { addToCart } from "@/app/Store/ProductSlice";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Expand, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useDispatch } from "react-redux";

const RelatedPosts = ({ product }: any) => {
  const dispatch = useDispatch();
  return (
    <Container>
      <Card className="border-none relative cursor-pointer rounded-md mt-3 m-auto h-[190px] w-[260x]">
        <CardContent className="overflow-visible py-2 group">
          <Image
            alt="Card background"
            className=" aspect-[1/0.6] object-cover z-100 rounded-md"
            src={product?.productImage[0]}
            width={255}
            height={180}
          />

          <div className="absolute flex justify-between bottom-8 px-4 opacity-0 z-30 group-hover:opacity-100 transition">
            <Button className="btn bg-gray-600 rounded-lg opacity-0 lg:opacity-100">
              <ShoppingCart
                size={20}
                className="rounded-lg"
                onClick={() => {
                  dispatch(addToCart(product));
                }}
              />
            </Button>
            <Link
              href={{
                pathname: `/product/${product._id}`,
                query: { store: JSON.stringify(product) },
              }}
              className="btn  mx-4 opacity-50"
            >
              <Button className="btn bg-gray-600 rounded-lg opacity-0 lg:opacity-100">
                <Expand size={20} className="rounded-lg" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </Container>
  );
};

export default RelatedPosts;
