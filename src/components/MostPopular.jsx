import React from "react";
import PropTypes from "prop-types";
import ProductCard from "./ProductCard";
import BrickImage from "../assets/brick.png";

/**
 * Static data for popular products.
 * @type {Array<Object>}
 */
const PRODUCTS = [
  {
    id: 1,
    name: "Standard Brick",
    category: "Engineer Products",
    price: "USD $5.00",
    image: BrickImage,
  },
  {
    id: 2,
    name: "Premium Brick",
    category: "Luxury Products",
    price: "USD $8.00",
    image: BrickImage,
  },
  {
    id: 3,
    name: "Eco Brick",
    category: "Sustainable Products",
    price: "USD $6.50",
    image: BrickImage,
  },
];

/**
 * MostPopular component to display a collection of popular products in a responsive grid.
 * @param {Object} [props] - Component props
 * @param {string} [props.className=''] - Additional CSS classes for the container
 * @param {Array<Object>} [props.products=PRODUCTS] - Array of product objects
 * @param {boolean} [props.showDetails=true] - Whether to show product details
 * @returns {JSX.Element} The rendered most popular products component
 */
const MostPopular = ({
  className = "",
  products = PRODUCTS,
  showDetails = true,
}) => {
  return (
    <section
      className={`!mb-8 ${className}`}
      role="region"
      aria-label="Most Popular Products"
    >
      <div className="!mt-7 max-md:flex-col w-full max-md:gap-0 flex justify-between gap-4">
        {products.map((product) => (
          <ProductCard
            className="!w-full"
            key={product.id}
            product={product}
            showDetails={showDetails}
          />
        ))}
      </div>
    </section>
  );
};

/**
 * PropTypes for type checking and validation.
 */
MostPopular.propTypes = {
  className: PropTypes.string,
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
    })
  ),
  showDetails: PropTypes.bool,
};

export default MostPopular;
