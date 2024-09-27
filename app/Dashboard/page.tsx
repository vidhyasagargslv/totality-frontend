// app/Dashboard/page.tsx
"use client";

import React, { useState, useRef } from "react";
import { UserButton, useUser } from "@clerk/nextjs";
import PropertiesData from "@/Properties.json";
import ClientSideFilter from "../Components/ClientSideFilter";
import { CartComponent } from "../Components/CartComponent";
import useOutsideClick from "../hooks/useOutsideClick";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";

interface Property {
  uniqueid: string;
  image: string;
  title: string;
  description: string;
  price: number;
  location: string;
  bedrooms: number;
  size: number;
}

export default function Dashboard() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cartRef = useRef<HTMLDivElement>(null);

  useOutsideClick(cartRef, () => {
    if (isCartOpen) setIsCartOpen(false);
  });

  // const { isLoaded, isSignedIn, user } = useUser();

  // if (!isLoaded || !isSignedIn) {
  //   return null;
  // }

  // // Function to get the display name
  // const getDisplayName = () => {
  //   if (user.username) {
  //     return user.username;
  //   } else if (user.primaryEmailAddress?.emailAddress) {
  //     const email = user.primaryEmailAddress.emailAddress;
  //     if (email.endsWith("@gmail.com")) {
  //       return email.split("@")[0];
  //     }
  //     return email;
  //   }
  //   return "User";
  // };

  // const displayName: string = getDisplayName();

  return (
    <div className="w-full min-h-screen relative pt-3">
      <header className="container mx-auto -mb-5 flex justify-between items-center w-[30%] h-14 bg-slate-200 rounded-full max-md:w-full">
        <div className="avatar ml-2">
          <div className="w-10 rounded-full">
            <img src="/logo.jpg" />
          </div>
        </div>

        <div className="username">
            <p className="font-serif text-black text-sm italic bg-gradient-to-r from-purple-600  to-blue-600 bg-clip-text text-transparent">
              ! Hey User
            </p>
        </div>
        <div className="flex items-center justify-center gap-5 pr-8 ">
          <button onClick={() => setIsCartOpen(!isCartOpen)}>
            <ShoppingCart size={28} color="#000000" strokeWidth={2.75} />
          </button>
          
        </div>
      </header>
      <main className="container mx-auto pt-8">
        <ClientSideFilter properties={PropertiesData as Property[]} />
      </main>
      {isCartOpen && (
  <div
    ref={cartRef}
    className={`cart-container ${isCartOpen ? 'open' : ''}`}
  >
    <CartComponent />
  </div>
)}
    </div>
  );
}
