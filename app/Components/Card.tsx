"use client"
import React from "react";
import Image from "next/image";
import { useCart } from "../contexts/CartContext";
import { uniqueId } from "lodash";
import { v4 as uuidv4 } from 'uuid'; 
interface HotelCardProps {
    uniqueid:string;
  image: string;
  title: string;
  description: string;
  location: string;
  bedrooms: number;
  price: number;
  size: number; // Add the missing size value
}

export const Card: React.FC<HotelCardProps> = ({
  uniqueid,
  image,
  title,
  description,
  location,
  bedrooms,
  size, 
  price,
}) => {
    const { addToCart } = useCart();

    const handleAddToCart = () => {
        const uniqueid = uuidv4(); // Generate a unique ID for each new item
        addToCart({ uniqueid, title, price });
      };
  return (
    <article className="flex gap-4 w-[340px] h-[189px] bg-white rounded-xl shadow-[0px_24px_96px_rgba(67,67,67,0.15)] cursor-grabbing">
        <Image
            loading="lazy"
            src={image}
            alt={`${title} hotel`}
            className="object-cover shrink-0 rounded-xl w-[108px]"
            width={108}
            height={200}
        />
        <div className="flex flex-col my-auto w-full">
            <div className="flex flex-col w-full">
                <h2 className="text-gray-800 text-xl font-semibold capitalize truncate">{title}</h2>
                <p className="mt-1 text-sm font-light leading-4 text-gray-600 normal-case truncate-">
                    {description}
                </p>
                <p className="mt-1 text-sm tracking-normal text-zinc-500">
                    {location}
                </p>
            </div>

            <div className="flex gap-3 items-start self-start mt-3 text-sm tracking-normal text-zinc-500">
                <div className="flex gap-1.5 items-center">
                    <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/3063ac33b05e8b698af0520221e30fc0f86496e0ca2df15b9c0a75f66ec0d047?placeholderIfAbsent=true&apiKey=6615898f90b747659a80e84ab038aace"
                        alt="bedrooms icon"
                        className="object-contain shrink-0 self-stretch my-auto w-3.5 aspect-square"
                    />
                    <div className="self-stretch my-auto">{bedrooms} room</div>
                </div>
                <div className="flex gap-1.5 items-center">
                    <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/aaa01b663394b818f164b890e246ce3cae5aee3eb43252926eaf48756f39566b?placeholderIfAbsent=true&apiKey=6615898f90b747659a80e84ab038aace"
                        alt="size icon"
                        className="object-contain shrink-0 self-stretch my-auto w-3.5 aspect-square"
                    />
                    <div className="self-stretch my-auto">{size} m²</div>
                </div>
            </div>

            <div className="mt-3 text-xs tracking-normal text-black">
                <span className="font-medium text-lg">₹{price}</span>
                <span className="text-zinc-500"> / Year</span>

                <span className="relative left-5">
                    <button onClick={handleAddToCart} className="btn btn-sm text-xs btn-primary">Add to cart</button>
                </span>
            </div>
        </div>
    </article>
  );
};
