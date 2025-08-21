import React, { useState } from "react";
import PropTypes from "prop-types";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";

/**
 * ProductCard component to display a product or highlight card with hover effects and navigation.
 * @param {Object} props - Component props
 * @param {Object} [props.product={}] - Product data for default variant (id, name, category, price, image)
 * @param {boolean} [props.showDetails=true] - Whether to show product details (default variant)
 * @param {number} [props.width=450] - Card width in pixels (default variant)
 * @param {number} [props.height=580] - Card height in pixels with details (default variant)
 * @param {Object} [props.style={}] - Inline styles for the card
 * @param {string} [props.className=''] - Additional CSS classes for the card
 * @param {string} [props.imageClass='w-75'] - CSS classes for the product image
 * @param {string} [props.variant='default'] - Card variant ('default' or 'highlight')
 * @param {string} [props.title='Instant Digital Downloads'] - Title for highlight variant
 * @param {string} [props.description='Access your digital product purchase immediately after checkout.'] - Description for highlight variant
 * @param {string} [props.icon='akar-icons:arrow-up'] - Icon for highlight or default variant
 * @param {string} [props.bgColor='bg-purple-100'] - Background color class for highlight variant
 * @param {string} [props.iconBg='bg-purple-200/80'] - Icon background color class
 * @param {string} [props.imageBGClass=''] - Background class for image container (default variant)
 * @returns {JSX.Element} The rendered product card component
 */
const ProductCard = ({
  product = {},
  showDetails = true,
  width = 450,
  height = 580,
  style = {},
  className = "",
  imageClass = "w-75",
  variant = "default",
  title = "Instant Digital Downloads",
  description = "Access your digital product purchase immediately after checkout.",
  icon = "akar-icons:arrow-up",
  bgColor = "bg-purple-100",
  iconBg = "bg-purple-200/80",
  imageBGClass = "",
}) => {
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();

  /**
   * Navigate to product details page if applicable.
   */
  const handleClick = () => {
    if (showDetails && product.id && variant === "default") {
      navigate(`/product/${product.id}`);
    }
  };

  if (variant === "highlight") {
    return (
      <div
        className={`relative min-h-[200px] rounded-2xl !p-8 !pt-25 w-[450px] max-md:w-full ${bgColor} ${className}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onKeyDown={(e) => e.key === "Enter" && setHovered(!hovered)}
        role="region"
        aria-label={title}
        tabIndex={0}
      >
        <p className="text-lg !mb-1 font-semibold text-black">{title}</p>
        <p className="text-gray-500">{description}</p>

        {/* Top-left arrow */}
        <div className="absolute bg-white left-0 top-0 !p-2 rounded-br-2xl">
          <div
            id="highlightCard"
            className={`highlightCard !p-4 text-xl rounded-full ${iconBg}`}
          >
            <Icon
              className="arrow-icon rotate-315 font-semibold"
              icon={icon}
              width="20"
              height="20"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`max-md:w-full ${className} cursor-pointer`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleClick}
      onKeyDown={(e) => e.key === "Enter" && handleClick()}
      style={{
        width: `${width}px`,
        height: showDetails ? `${height}px` : "420px",
        ...style,
      }}
      role="button"
      aria-label={
        product.name ? `View ${product.name} details` : "Product card"
      }
      tabIndex={0}
    >
      {/* Image Section */}
      <div
        className={`relative ${
          showDetails ? "h-[75%]" : "h-full"
        } flex flex-col ${imageBGClass}`}
      >
        <div className="flex w-full h-full items-center justify-center bg-purple-50 rounded-2xl">
          <img
            src={product.image}
            className={`z-2 ${imageClass} ${
              hovered && showDetails ? "expand-on-hover" : ""
            }`}
            alt={product.name || "Product image"}
            width={width * 0.75}
            height={showDetails ? height * 0.75 : height}
            loading="lazy"
          />
        </div>

        {!showDetails && (
          <h1
            className={`heading-category absolute w-full text-center text-5xl max-md:text-4xl font-bold top-[12%] z-0 tracking-wide text-black mix-blend-multiply ${
              hovered ? "expand-on-hover" : ""
            }`}
          >
            {product.name || "Product"}
          </h1>
        )}

        {/* Bottom-right arrow */}
        <div className="absolute bg-white right-0 bottom-0 !p-2 rounded-tl-2xl">
          <div
            id="buttonCard"
            className="buttonCard !p-4 text-xl rounded-full bg-purple-200/80"
          >
            <Icon
              className={`arrow-icon font-semibold ${hovered ? "rotate" : ""}`}
              icon="akar-icons:arrow-up"
              width="20"
              height="20"
            />
          </div>
        </div>
      </div>

      {/* Details Section */}
      {showDetails && (
        <div className="!mt-4">
          <p className="font-bold text-xl !mb-1">
            {product.name || "Unnamed Product"}
          </p>
          <p className="text-medium font-semibold">
            {product.category || "Uncategorized"}
          </p>
          <p className="font-semibold text-gray-500">
            {product.price || "N/A"}
          </p>
        </div>
      )}
    </div>
  );
};

/**
 * PropTypes for type checking and validation.
 */
ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    name: PropTypes.string,
    category: PropTypes.string,
    price: PropTypes.string,
    image: PropTypes.string,
  }),
  showDetails: PropTypes.bool,
  width: PropTypes.number,
  height: PropTypes.number,
  style: PropTypes.object,
  className: PropTypes.string,
  imageClass: PropTypes.string,
  variant: PropTypes.oneOf(["default", "highlight"]),
  title: PropTypes.string,
  description: PropTypes.string,
  icon: PropTypes.string,
  bgColor: PropTypes.string,
  iconBg: PropTypes.string,
  imageBGClass: PropTypes.string,
};

export default ProductCard;
