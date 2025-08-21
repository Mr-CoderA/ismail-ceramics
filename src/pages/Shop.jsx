import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { Icon } from "@iconify/react";
import Text from "../components/Text";
import ProductCard from "../components/ProductCard";
import Brick from "../assets/brick.png";

/**
 * Custom hook to apply scroll animation using Intersection Observer.
 * @param {number} threshold - Visibility threshold for triggering animation
 * @returns {React.MutableRefObject} Reference to the animated element
 */
const useScrollAnimation = (threshold = 0.2) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("blur-animate");
          observer.unobserve(el); // Run animation only once
        }
      },
      { threshold }
    );

    if (el) {
      observer.observe(el);
    }

    return () => {
      if (el) {
        observer.unobserve(el);
      }
    };
  }, [threshold]);

  return ref;
};

/**
 * OverlayContent component to display animated text and cart button.
 * @param {Object} props - Component props
 * @param {string} props.title - Title text for the animated heading
 * @param {string} props.description - Description text
 * @param {number} props.cartCount - Number of items in the cart
 * @param {Function} props.onCartClick - Cart button click handler
 * @param {string} props.className - Additional CSS classes for the container
 * @param {number} props.minHeight - Minimum height for the container (px)
 * @param {number} props.titleWidth - Width of the title container (px)
 * @param {number} props.descriptionWidth - Width of the description container (px)
 * @param {string} props.bgColor - Background color class (Tailwind)
 * @param {number} props.threshold - Intersection Observer threshold
 * @returns {JSX.Element} The rendered overlay content
 */
const OverlayContent = ({
  title = "Showcase all your products in one place.",
  description = "Use this page to display your full product collection, making it easy for customers to browse and shop.",
  cartCount = 3,
  onCartClick = () => {},
  className = "",
  minHeight = 450,
  titleWidth = 700,
  descriptionWidth = 450,
  bgColor = "bg-purple-100",
  threshold = 0.2,
}) => {
  const containerRef = useScrollAnimation(threshold);

  return (
    <div
      ref={containerRef}
      className={`w-full translate-y-[50px] opacity-100 transform max-md:min-h-[500px] min-h-[${minHeight}px] flex ${bgColor} rounded-2xl items-center justify-center ${className}`}
      role="banner"
      aria-label="Shop hero section"
    >
      <div className="flex flex-col items-center">
        <p className="!px-3 w-fit !py-1 !mb-8 bg-white rounded-2xl text-sm font-semibold">
          Shop
        </p>
        <h1
          className="text-6xl max-md:text-4xl font-semibold text-center"
          style={{ maxWidth: `${titleWidth}px` }}
        >
          <Text text={title} />
        </h1>
        <p
          className="!mt-8 text-lg font-medium max-md:w-[300px] text-gray-600 text-center"
          style={{ maxWidth: `${descriptionWidth}px` }}
        >
          {description}
        </p>
      </div>
      <div className="absolute left-0 w-full top-0 !m-0 flex justify-end !p-4">
        <button
          className="relative p-[8px] !mt-1 text-[25px] cursor-pointer !mr-2 md:text-black md:hidden"
          onClick={onCartClick}
          onKeyDown={(e) => e.key === "Enter" && onCartClick()}
          aria-label={`Shopping cart with ${cartCount} items`}
          tabIndex={0}
        >
          <Icon icon="fluent:cart-24-filled" width="25" height="25" />
          {cartCount > 0 && (
            <span className="absolute text-[11px] text-black w-3.5 h-3.5 flex items-center justify-center rounded-full top-[-8px] right-[-8px]">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

/**
 * Cards component to display a grid of filtered products.
 * @param {Object} props - Component props
 * @param {Array<Object>} props.filteredProducts - Array of filtered product objects
 * @param {string} [props.className=''] - Additional CSS classes for the container
 * @param {number} [props.threshold=0.2] - Intersection Observer threshold
 * @returns {JSX.Element} The rendered product cards
 */
const Cards = ({ filteredProducts = [], className = "", threshold = 0.2 }) => {
  const containerRef = useScrollAnimation(threshold);
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={`!mb-8 ${className}`}>
      <div
        ref={containerRef}
        className="reload-animate-noblur translate-y-[50px] w-full opacity-100 transform !mt-7 max-md:!mt-25 max-md:flex-col flex flex-wrap justify-start gap-5 max-[1230px]:gap-0 max-md:gap-10"
      >
        {filteredProducts.length > 0 ? (
          filteredProducts.map((p, i) => (
            <ProductCard
              key={i}
              product={p}
              showDetails={true}
              width={size.width <= 1440 ? 335 : 351}
              className="!min-h-150 max-md:!w-full max-[1230px]:!w-full max-[1230px]:!h-[800px] max-md:!h-[450px]"
              imageBGClass={`max-[1230px]:!h-[80%] max-md:!h-[75%] ${
                size.width <= 1440 ? "!h-[60%]" : "!h-[75%]"
              }`}
              imageClass="max-[1230px]:w-80 max-md:w-60 w-60"
            />
          ))
        ) : (
          <p className="text-gray-500 text-center w-full">
            No products found for this category.
          </p>
        )}
      </div>
    </div>
  );
};

/**
 * Shop component to display a product catalog with category filtering.
 * @param {Object} props - Component props
 * @param {Array<Object>} [props.products=[]] - Array of product objects with name, category, price, image
 * @param {Array<string>} [props.categories=[]] - Array of product categories
 * @param {string} [props.title='Showcase all your products in one place.'] - Hero title text
 * @param {string} [props.description='Use this page to display your full product collection...'] - Hero description text
 * @param {number} [props.cartCount=3] - Number of items in the cart
 * @param {Function} [props.onCartClick=() => {}] - Cart button click handler
 * @param {string} [props.className=''] - Additional CSS classes for the container
 * @param {number} [props.minHeight=450] - Minimum height for the hero section (px)
 * @param {number} [props.titleWidth=700] - Width of the hero title container (px)
 * @param {number} [props.descriptionWidth=450] - Width of the hero description container (px)
 * @param {string} [props.bgColor='bg-purple-100'] - Hero background color class
 * @param {number} [props.threshold=0.2] - Intersection Observer threshold
 * @returns {JSX.Element} The rendered shop page
 */
const Shop = ({
  products = [
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
  ],
  categories = ["All", ...new Set(products.map((p) => p.category))],
  title = "Showcase all your products in one place.",
  description = "Use this page to display your full product collection, making it easy for customers to browse and shop.",
  cartCount = 3,
  onCartClick = () => {},
  className = "",
  minHeight = 450,
  titleWidth = 700,
  descriptionWidth = 450,
  bgColor = "bg-purple-100",
  threshold = 0.2,
}) => {
  const containerRef = useScrollAnimation(threshold);
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <div className={className} role="main" aria-label="Shop page">
      <OverlayContent
        title={title}
        description={description}
        cartCount={cartCount}
        onCartClick={onCartClick}
        minHeight={minHeight}
        titleWidth={titleWidth}
        descriptionWidth={descriptionWidth}
        bgColor={bgColor}
        threshold={threshold}
      />
      <div className="w-full flex justify-between items-start max-md:flex-col">
        <div
          ref={containerRef}
          className="md:sticky md:!mb-10 max-md:!relative top-[90px] w-[450px] max-md:w-full !py-8 h-fit bg-white translate-y-[50px] opacity-100 transform"
        >
          <h1 className="!mb-3 text-2xl font-medium">Shop</h1>
          <p className="text-gray-500">
            <Text text="Split your product into categories so they can navigate easily." />
          </p>
          <div className="flex flex-col">
            {categories.map((category, i) => (
              <button
                key={i}
                onClick={() => setActiveCategory(category)}
                onKeyDown={(e) =>
                  e.key === "Enter" && setActiveCategory(category)
                }
                className={`group w-[90%] text-left !py-5 flex items-center gap-3 border-b-1 border-gray-200 ${
                  activeCategory === category ? "font-bold" : ""
                }`}
                aria-label={`Filter by ${category} category`}
                tabIndex={0}
              >
                <div
                  className={`w-4 h-4 rounded-full transition-colors duration-200 ${
                    activeCategory === category
                      ? "bg-black"
                      : "bg-gray-200 group-hover:bg-black"
                  }`}
                ></div>
                <span>{category}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="w-full h-fit">
          <Cards filteredProducts={filteredProducts} threshold={threshold} />
        </div>
      </div>
    </div>
  );
};

/**
 * PropTypes for type checking and validation.
 */
Shop.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired,
      image: PropTypes.string,
    })
  ),
  categories: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string,
  description: PropTypes.string,
  cartCount: PropTypes.number,
  onCartClick: PropTypes.func,
  className: PropTypes.string,
  minHeight: PropTypes.number,
  titleWidth: PropTypes.number,
  descriptionWidth: PropTypes.number,
  bgColor: PropTypes.string,
  threshold: PropTypes.number,
};

OverlayContent.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  cartCount: PropTypes.number,
  onCartClick: PropTypes.func,
  className: PropTypes.string,
  minHeight: PropTypes.number,
  titleWidth: PropTypes.number,
  descriptionWidth: PropTypes.number,
  bgColor: PropTypes.string,
  threshold: PropTypes.number,
};

Cards.propTypes = {
  filteredProducts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired,
      image: PropTypes.string,
    })
  ),
  className: PropTypes.string,
  threshold: PropTypes.number,
};

export default Shop;
