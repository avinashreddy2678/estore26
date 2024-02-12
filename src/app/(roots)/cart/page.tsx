"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { Products } from "../../../../types";
import CartProductCard from "../components/CartProductCard";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { IndianRupee } from "lucide-react";
import Footer from "@/app/Components/Footer";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import axios from "axios";
import helper from "@/helpers/helper";

interface ItemProps {
  productid: string;
  price: number;
}
declare global {
  interface Window {
    Razorpay: any;
  }
}

const Cart = () => {
  
  const [name, setname] = useState("");
  const [phonenumber, setphonenumber] = useState("");
  const [fulladdress, setfulladdress] = useState("");
  const [pincode, setpincode] = useState("");

  const initializeRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";

      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };

  const selector = useSelector((state: any) => state.cartProducts);
  const checkoutselector = useSelector((state: any) => state.CheckOut);
  const router = useRouter();

  const Total = checkoutselector.reduce((total: number, item: ItemProps) => {
    return total + Number(item.price);
  }, 0);

  const handlePlaceOrder = async () => {

    if(Total===0){
      return toast.error("Please add or click on the checkout Box to purchase")
    }
    const razorpayres = await initializeRazorpay();

    if (!razorpayres) {
      alert("Razorpay SDK Failed to load");
      return;
    }

    if (
      name === "" ||
      phonenumber === "" ||
      fulladdress === "" ||
      pincode === ""
    ) {
      return toast.error("Please fill all details before placing order");
    }
    const { data: key } = await axios.get(
      `${helper}/Orders/getKey`
    );

    const res = await axios.post(
      `${helper}/Orders/payment/checkout`,
      {
        name: name,
        phonenumber: phonenumber,
        fulladdress: fulladdress,
        pincode: pincode,
        amount: Total,
        products: checkoutselector,
      }
    );
    localStorage.removeItem("ProductInOrder");

    const options = {
      key: key.key_secret,
      amount: Total,
      currency: "INR",
      name: "Acme Corp",
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: res?.data?.orders.id,
      callback_url: `${helper}/Orders/paymentverifcation`,
      prefill: {
        name: "Avinash",
        email: "avinash@avinash.com",
        contact: "9880090000",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const paymentObject = window.Razorpay(options);
    paymentObject.open();
    
  };

  return (
    <div className="h-[100%]">
      <div className="h-[80vh]">
        <h1 className="ml-5 mt-2 text-xl">Shopping Cart</h1>
        <div className="block lg:flex">
          <Card className="w-full lg:w-[50%] max-h-[70vh] overflow-y-auto scrollbar-hide mt-4 lg:ml-4">
            {selector.length > 0 ? (
              selector.map((item: Products) => (
                <React.Fragment key={item._id}>
                  <CartProductCard item={item} />
                </React.Fragment>
              ))
            ) : (
              <>
                <h1 className="m-4">No items in the cart</h1>
                <Button
                  color="primary"
                  className="btn btn-primary my-4 ml-5"
                  onClick={() => {
                    router.push("/");
                  }}
                >
                  Go HomePage
                </Button>
              </>
            )}
          </Card>

         
            <Card className=" w-[330px] min-h-[300px] mt-16 mx-auto">
              <CardHeader className="font-bold">Order Summary </CardHeader>
              <Separator className="w-[100%] mx-auto" />
              <CardContent className="mt-2">
                Total Items : {checkoutselector.length}
              </CardContent>
              <CardContent className="flex justify-between">
                <span>Order Total : </span>
                <div className="flex">
                  {Total}
                  <IndianRupee />
                </div>
              </CardContent>
              <Separator />
              {/* personel details */}
              <CardFooter className="felx flex-col items-start">
                <h1 className="font-semibold mt-2">Deliveray Details</h1>
                <div className="mt-2 w-full">
                  <Input
                    placeholder="Enter name"
                    onChange={(e) => {
                      setname(e.target.value);
                    }}
                  />
                  <Input
                    placeholder="phone Number"
                    className="mt-2"
                    onChange={(e) => {
                      setphonenumber(e.target.value);
                    }}
                  />
                  <Input
                    placeholder="Enter Full Address"
                    className="mt-2"
                    onChange={(e) => {
                      setfulladdress(e.target.value);
                    }}
                  />
                  <Input
                    placeholder="Pin Code"
                    className="mt-2"
                    onChange={(e) => {
                      setpincode(e.target.value);
                    }}
                  />
                </div>
              </CardFooter>

              <Separator className="w-full mx-auto" />
              <div className="w-[80%] mx-auto">
                <Button
                  variant="outline"
                  className="w-full bg-gray-200 my-2 mx-auto"
                  onClick={handlePlaceOrder}
                  id="rzp-button1"
                >
                  Place Order
                </Button>
              </div>
            </Card>
        </div>
        <div className="mt-12">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Cart;
