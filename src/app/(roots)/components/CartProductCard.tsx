import { Button } from "@/components/ui/button";
import {
  Card,
  CardFooter,
  CardHeader,
  CardContent,
} from "@/components/ui/card";
import { Check, DollarSign, X } from "lucide-react";
import { useDispatch } from "react-redux";
import {
  removeFromCart,
  addToCheckOut,
  removeFromCheckOut,
} from "@/app/Store/ProductSlice";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Checkbox } from "@/components/ui/checkbox";

const CartProductCard = ({ item }: any) => {
  const dispatch = useDispatch();

  const [color, setcolor] = useState(false);
  const storedItem = localStorage.getItem("ProductInOrder") ?? "[]";
  const getItem = storedItem ? JSON.parse(storedItem) : [];
  // console.log(getItem)
  // Check if any object in the array has the same _id property as the current item
  const CheckAlreadyInCart =
    Array.isArray(getItem) &&
    getItem.find((obj: any) => obj.productid === item._id);
  const [singleItems, setSingleItems] = useState({
    productid: item._id,
    selectedSize: "",
  });

  const checkInOrder = async (id: string) => {
    const storedItem = localStorage.getItem("ProductInOrder") ?? "[]";
    const getItem = storedItem ? JSON.parse(storedItem) : [];
    if (getItem?.length > 0) {
      const size = getItem.find((item: any) => item.productid === id);
      const res = await axios.get(
        `http://localhost:4001/Orders/CheckInOrder/${id}/${size.size}`
      );
      if (res.data.message === "Remove") {
        setcolor(false);
        const updatedItems = getItem?.filter(
          (item: any) => item.productid !== id
        );
        localStorage.setItem("ProductInOrder", JSON.stringify(updatedItems));
      }
    }
  };
  const checkAvailbilty = async (id: string) => {
    if (singleItems.selectedSize === "") {
      return toast.error("Please select Size");
    }
    const res = await axios.get(
      `http://localhost:4001/Orders/CheckAvailbility/${id}/${singleItems.selectedSize}`
    );
    if (res.data.message === "Available") {
      toast.success(res.data.message);
      setcolor(true);

      getItem.push({
        productid: singleItems.productid,
        size: singleItems.selectedSize,
      });

      const updatedStoredItem = JSON.stringify(getItem);

      localStorage.setItem("ProductInOrder", updatedStoredItem);
      setTimeout(() => {
        checkInOrder(id);
      }, 15 * 60 * 1000);
    } else {
      toast.error("Not available");
    }
  };

  const handleRemoveFromCart = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const hanldeClicktoCeckOut = (e: any) => {
    if (e) {
      const addItem = {
        productid: item._id,
        price: item.price,
        productname: item.name,
      };
      dispatch(addToCheckOut(addItem));
    } else {
      dispatch(removeFromCheckOut(item._id));
    }
  };
  return (
    <div className=" w-[90%] cursor-pointer my-4 m-auto">
      <Card className="flex">
        <CardHeader className=" hidden lg:block md:block">
          <Image
            src={item.productImage[0]}
            className="h-100 w-100"
            width={150}
            height={150}
            alt="Product Image"
          />
        </CardHeader>

        <CardContent className="flex mt-4 flex-col justify-center">
          <div className="text-start">
            <p className="text-sm my-3">{item.name}</p>
          </div>
          <div className="text-start my-2 text-sm flex items-center">
            <DollarSign size={16} />
            {item.price}
          </div>
          {!!getItem.find((items: any) => items.productid === item._id)}
          <Select
            value={CheckAlreadyInCart?.size}
            onValueChange={(e) => {
              setSingleItems((prev) => ({ ...prev, selectedSize: e }));
            }}
            disabled={
              !!getItem.find((item: any) => item.productid === item._id)
            }
          >
            <SelectTrigger className="lg:w-[140px] h-[30px] my-2 w-[80px]">
              <SelectValue placeholder="Select Size" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Size</SelectLabel>
                {item.size.map((sizeItem: any) => (
                  <SelectItem value={sizeItem.size} key={sizeItem.size}>
                    {sizeItem.size}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </CardContent>
        <CardFooter className="flex flex-col justify-center">
          {CheckAlreadyInCart || color ? (
            <Button
              disabled
              variant={"secondary"}
              className="bg-green-600 text-black"
            >
              <span className="hidden lg:block md:block">
                Availabe and Proceed
              </span>
              <span className="lg:hidden md:hidden">
                <Check size={8} className="bg-transparent" />
              </span>
            </Button>
          ) : (
            <Button
              onClick={() => {
                checkAvailbilty(item._id);
              }}
            >
              <span className="hidden lg:block md:block">Check Availbitiy</span>
              <span className="lg:hidden md:hidden">
                <Check size={8} />
              </span>
            </Button>
          )}

          <Button
            onClick={() => {
              handleRemoveFromCart(item._id);
            }}
            variant={"outline"}
            className="mt-5"
          >
            <span className="hidden lg:block md:block">Remove From Cart</span>
            <span className="lg:hidden md:hidden">
              <X size={8} />
            </span>
          </Button>
        </CardFooter>
        <CardFooter>
          <Checkbox
            disabled={!CheckAlreadyInCart}
            onCheckedChange={(e) => {
              hanldeClicktoCeckOut(e);
            }}
          />
        </CardFooter>
      </Card>
    </div>
  );
};

export default CartProductCard;
