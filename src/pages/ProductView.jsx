import React from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import QADrop from "../components/Support/QADrop";
import ProductCard from "../components/ProductCard";
import CustomerTrust from "../components/CustomerTrust";
import TitleBar from "../components/TitleBar";
import MostPopular from "../components/MostPopular";
import Brick from "../assets/brick.png";
import "./assets/ProductView.css";

/**
 * ProductView component to display a detailed view of a single product.
 * @param {Object} props - Component props
 * @param {Array<Object>} [props.products=[]] - Array of product objects with id, name, category, price, image
 * @param {Array<Object>} [props.qaItems=[]] - Array of Q&A objects for QADrop
 * @param {number} [props.qaType=1] - QADrop styling variant (0 or 1)
 * @param {Array<Object>} [props.highlights=[]] - Array of highlight objects for ProductCard
 * @param {Object} [props.browseTitleBar={}] - Props for the Browse More TitleBar
 * @param {string} [props.className=''] - Additional CSS classes for the container
 * @param {string} [props.breadcrumbCategory='Technology'] - Category for breadcrumb
 * @param {Array<string>} [props.colors=['Red', 'Green', 'Blue']] - Available product colors
 * @returns {JSX.Element} The rendered product view page
 */
const ProductView = ({
  products = [
    {
      id: 1,
      name: "Standard Brick",
      category: "Engineer Products",
      price: "USD $5.00",
      image: Brick,
    },
    {
      id: 2,
      name: "Premium Brick",
      category: "Luxury Products",
      price: "USD $8.00",
      image: Brick,
    },
    {
      id: 3,
      name: "Eco Brick",
      category: "Sustainable Products",
      price: "USD $6.50",
      image: Brick,
    },
  ],
  qaItems = [
    {
      question: "Warranty",
      answer:
        "Once your purchase is complete, you’ll receive an email with a download link. You can also access your downloads directly from your account page.",
    },
    {
      question: "Shipping Information",
      answer:
        "Refunds for digital products are only available if the product has not been downloaded or accessed.",
    },
    {
      question: "Support",
      answer:
        "No, once downloaded, your digital products are yours to keep forever.",
    },
  ],
  qaType = 1,
  highlights = [
    {
      title: "Fast Worldwide Shipping",
      description: "We deliver your order in 3-5 business days.",
      icon: "mage:electricity-fill",
      bgColor: "bg-purple-100",
      iconBg: "bg-purple-100",
    },
    {
      title: "Premium Quality",
      description: "Crafted with the highest standards for durability.",
      icon: "fluent:diamond-16-filled",
      bgColor: "bg-purple-100",
      iconBg: "bg-purple-100",
    },
    {
      title: "Easy Returns",
      description: "Hassle-free returns within 30 days.",
      icon: "heroicons:forward-solid",
      bgColor: "bg-purple-100",
      iconBg: "bg-purple-100",
    },
  ],
  browseTitleBar = {
    title: "Browse More",
    description: "Showcase all your products here with descriptions.",
    className: "!mt-20",
  },
  className = "",
  breadcrumbCategory = "Technology",
  colors = ["Red", "Green", "Blue"],
}) => {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id)) || {
    name: "Product Not Found",
    category: "",
    price: "",
    image: Brick,
    description: "The requested product could not be found.",
  };

  return (
    <div
      className={`relative !pt-30 !pb-10 max-md:!pt-20 ${className}`}
      role="main"
      aria-label="Product view page"
    >
      <div className="flex gap-10 max-md:flex-col">
        <div className="flex gap-5 max-md:flex-col-reverse">
          <div className="flex md:flex-col gap-4">
            {products.slice(0, 3).map((thumb, index) => (
              <div
                key={index}
                className="w-20 h-20 rounded-2xl bg-purple-50 p-5 flex items-center justify-center"
                role="button"
                aria-label={`View thumbnail ${index + 1}`}
                tabIndex={0}
                onKeyDown={(e) =>
                  e.key === "Enter" && /* Handle thumbnail click */ {}
                }
              >
                <img
                  src={thumb.image || Brick}
                  alt={`Thumbnail ${index + 1} of ${product.name}`}
                  className="w-16 h-16 object-contain"
                />
              </div>
            ))}
          </div>
          <div
            id="imageZoom"
            className="bg-purple-50 max-md:w-full max-md:h-110 w-190 h-190 rounded-2xl flex items-center justify-center"
          >
            <img
              src={product.image || Brick}
              alt={`Main image of ${product.name}`}
              className="w-3/4 h-3/4 object-contain max-w-full max-h-full"
            />
          </div>
        </div>
        <div className="flex flex-col text-sm text-gray-500">
          <p className="flex items-center gap-2 h-fit !mb-4">
            <span>Shop</span>
            <div className="w-1 h-1 rounded-full bg-gray-500"></div>
            <span>{product.category || breadcrumbCategory}</span>
          </p>
          <h1 className="text-black font-semibold text-5xl">{product.name}</h1>
          <p className="text-xl text-black font-medium flex gap-4 !mt-4">
            {product.price || "N/A"}{" "}
            {product.originalPrice && (
              <span className="text-gray-400 line-through">
                {product.originalPrice}
              </span>
            )}
          </p>
          <p className="!mt-7 text-[16px]">
            {product.description || "No description available."}
          </p>
          <div className="!mt-5 flex flex-col gap-4">
            <h1 className="text-lg text-black font-semibold">Color</h1>
            <div className="flex gap-4">
              {colors.map((color) => (
                <button
                  key={color}
                  className="!px-6 !py-2 font-semibold rounded-xl text-black bg-gray-200 hover:bg-black hover:text-white transition duration-300 ease-in-out"
                  onClick={() => /* Handle color selection */ {}}
                  onKeyDown={(e) =>
                    e.key === "Enter" && /* Handle color selection */ {}
                  }
                  aria-label={`Select ${color} color`}
                  tabIndex={0}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-col !mt-10 gap-5 w-full h-fit">
            <button
              className="w-full rounded-3xl !py-3 text-lg bg-black text-white"
              onClick={() => /* Handle add to cart */ {}}
              onKeyDown={(e) =>
                e.key === "Enter" && /* Handle add to cart */ {}
              }
              aria-label={`Add ${product.name} to cart`}
              tabIndex={0}
            >
              Add to Cart
            </button>
            <button
              className="w-full rounded-3xl !py-3 text-lg bg-gray-200 text-black"
              onClick={() => /* Handle buy now */ {}}
              onKeyDown={(e) => e.key === "Enter" && /* Handle buy now */ {}}
              aria-label={`Buy ${product.name} now`}
              tabIndex={0}
            >
              Buy Now
            </button>
          </div>
          <div className="!mt-10">
            <QADrop type={qaType} array={qaItems} />
          </div>
        </div>
      </div>
      <div className="flex max-md:flex-col !mt-4 gap-5 justify-between">
        {highlights.map((highlight, index) => (
          <ProductCard
            key={index}
            variant="highlight"
            title={highlight.title}
            description={highlight.description}
            icon={highlight.icon}
            bgColor={highlight.bgColor}
            iconBg={highlight.iconBg}
          />
        ))}
      </div>
      <div className="!mt-10">
        <CustomerTrust />
      </div>
      <div>
        <TitleBar {...browseTitleBar} />
        <MostPopular />
      </div>
    </div>
  );
};

/**
 * PropTypes for type checking and validation.
 */
ProductView.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      category: PropTypes.string,
      price: PropTypes.string,
      image: PropTypes.string,
      description: PropTypes.string,
      originalPrice: PropTypes.string,
    })
  ),
  qaItems: PropTypes.arrayOf(
    PropTypes.shape({
      question: PropTypes.string.isRequired,
      answer: PropTypes.string.isRequired,
    })
  ),
  qaType: PropTypes.oneOf([0, 1]),
  highlights: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
      bgColor: PropTypes.string,
      iconBg: PropTypes.string,
    })
  ),
  browseTitleBar: PropTypes.object,
  className: PropTypes.string,
  breadcrumbCategory: PropTypes.string,
  colors: PropTypes.arrayOf(PropTypes.string),
};

export default ProductView;
