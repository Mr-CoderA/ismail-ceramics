import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState } from "react";
import { ProductCard } from "./ProductCard";
import Brick from "../assets/brick.png";

export const MostPopular = () => {
  const products = [
    {
      name: "Standard Brick",
      category: "Engineer Products",
      price: "USD $5.00",
      image: Brick,
    },
    {
      name: "Premium Brick",
      category: "Luxury Products",
      price: "USD $8.00",
      image: Brick,
    },
    {
      name: "Eco Brick",
      category: "Sustainable Products",
      price: "USD $6.50",
      image: Brick,
    },
  ];

  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className="!mb-8">
      <div className="!mt-7 max-md:flex-col w-full max-md:gap-0 flex justify-between gap-4">
        {/* With Details */}
        {products.map((p, i) => (
          <ProductCard
            className="!w-full"
            key={i}
            product={p}
            showDetails={true}
          />
        ))}

        {/* Without Details Example */}
      </div>
    </div>
  );
};
