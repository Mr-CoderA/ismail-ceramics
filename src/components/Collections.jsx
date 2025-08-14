import { ProductCard } from "./ProductCard";
import React, { useEffect, useRef } from "react";
import Brick from "../assets/brick1.png";
import Brick1 from "../assets/brick2.png";
import Brick2 from "../assets/brick3.png";

function useScrollAnimation() {
  const ref = useRef();

  useEffect(() => {
    const el = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("reload-animate-deep");
        }
      },
      { threshold: 0.2 }
    );
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}

export const Collections = () => {
  const containerRef = useScrollAnimation();
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
      image: Brick1,
    },
    {
      name: "Eco Brick",
      category: "Sustainable Products",
      price: "USD $6.50",
      image: Brick2,
    },
  ];

  return (
    <div className="!mb-8 translate-y-[50px] transform" ref={containerRef}>
      <div className="!mt-7 max-md:flex-col w-full max-md:gap-0 flex justify-between !gap-5">
        {products.map((product, i) => (
          <ProductCard
            className="!w-full"
            key={i}
            product={product}
            showDetails={false}
          />
        ))}
      </div>
    </div>
  );
};
