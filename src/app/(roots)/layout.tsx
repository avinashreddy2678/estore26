"use client";
import React from "react";
import { Provider } from "react-redux";
import Store from "../Store/Store";

import { NextUIProvider } from "@nextui-org/react";
import Navbar from "./components/Navbar";
const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full">
      <Provider store={Store}>
        <NextUIProvider>
          <div className="sticky top-0 mt-4 z-10">
            <Navbar />
          </div>
          {children}
        </NextUIProvider>
      </Provider>
    </div>
  );
};

export default RootLayout;
