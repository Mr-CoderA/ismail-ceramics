import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import { Icon } from "@iconify/react";
import Text from "../components/Text";
import Button from "../components/Button";
import TitleBar from "../components/TitleBar";
import MostPopular from "../components/MostPopular";
import CustomerTrust from "../components/CustomerTrust";
import CollectionsTray from "../components/CollectionsTray";
import VideoBanner from "../components/VideoBanner";
import Highlights from "../components/Highlights";
import BlogSection from "../components/BlogSection";
import BG from "../assets/bg.mp4";

/**
 * OverlayContent component to display animated text and buttons over a video.
 * @param {Object} props - Component props
 * @param {string} props.title - Main title text
 * @param {string} props.titleHighlight - Highlighted title text
 * @param {string} props.titleHighlightColor - Color for highlighted title text
 * @param {string} props.titleEnd - Ending title text
 * @param {string} props.description - Description text
 * @param {number} props.cartCount - Number of items in the cart
 * @param {Function} props.onCartClick - Cart button click handler
 * @param {string} props.buyButtonText - Text for the Buy Template button
 * @param {Function} props.onBuyButtonClick - Buy Template button click handler
 * @param {string} props.className - Additional CSS classes for the container
 * @param {number} props.titleMaxWidth - Max width for the title (px)
 * @param {number} props.descriptionMaxWidth - Max width for the description (px)
 * @returns {JSX.Element} The rendered overlay content
 */
const OverlayContent = ({
  title = "The ",
  titleHighlight = "beautiful ",
  titleHighlightColor = "#E3930B",
  titleEnd = "way to sell anything with Framer.",
  description = "Designed with Framer, this template makes it easy to turn your website into a powerful ecommerce store.",
  cartCount = 3,
  onCartClick = () => {},
  buyButtonText = "Buy Template",
  onBuyButtonClick = () => {},
  className = "",
  titleMaxWidth = 800,
  descriptionMaxWidth = 480,
}) => {
  return (
    <div
      className={`absolute inset-0 flex flex-col justify-center px-[55px] max-md:px-6 ${className}`}
      role="banner"
      aria-label="Hero section overlay"
    >
      {/* Top right buttons */}
      <div className="absolute left-0 w-full top-0 !m-0 flex justify-end !p-4">
        <Button
          variant="secondary"
          className="max-[830px]:hidden"
          onClick={onBuyButtonClick}
          onKeyDown={(e) => e.key === "Enter" && onBuyButtonClick()}
          aria-label={buyButtonText}
        >
          {buyButtonText}
        </Button>
        <button
          className="relative p-[8px] !mt-1 text-[25px] cursor-pointer !mr-2 md:text-white md:hidden"
          onClick={onCartClick}
          onKeyDown={(e) => e.key === "Enter" && onCartClick()}
          aria-label={`Shopping cart with ${cartCount} items`}
          tabIndex={0}
        >
          <Icon icon="fluent:cart-24-filled" width="25" height="25" />
          {cartCount > 0 && (
            <span className="absolute text-[11px] text-black bg-purple-200 w-3.5 h-3.5 flex items-center justify-center rounded-full top-[-8px] right-[-8px]">
              {cartCount}
            </span>
          )}
        </button>
      </div>

      {/* Centered text & button */}
      <div className="!p-15 max-md:!p-6 !mt-15">
        <h1
          className="text-white max-md:text-5xl max-sm:text-4xl text-6xl !mb-4 font-medium"
          style={{ maxWidth: `${titleMaxWidth}px` }}
        >
          <span>
            <Text text={title} />
            <Text text={titleHighlight} color={titleHighlightColor} />
            <Text text="way to sell " />
          </span>
          <Text text={titleEnd} />
        </h1>
        <p
          className="text-white text-[17px]"
          style={{ maxWidth: `${descriptionMaxWidth}px` }}
        >
          <Text text={description} />
        </p>
        <Button className="!mt-8" variant="secondary">
          Shop Products
        </Button>
      </div>
    </div>
  );
};

/**
 * Home component to display the main e-commerce page with multiple sections.
 * @param {Object} props - Component props
 * @param {string} [props.videoSrc=BG] - Source URL for the hero video
 * @param {number} [props.videoHeight=660] - Video height in pixels
 * @param {string} [props.title='The '] - Main title text
 * @param {string} [props.titleHighlight='beautiful '] - Highlighted title text
 * @param {string} [props.titleHighlightColor='#E3930B'] - Color for highlighted title text
 * @param {string} [props.titleEnd='way to sell anything with Framer.'] - Ending title text
 * @param {string} [props.description='Designed with Framer...'] - Description text
 * @param {number} [props.cartCount=3] - Number of items in the cart
 * @param {Function} [props.onCartClick=() => {}] - Cart button click handler
 * @param {string} [props.buyButtonText='Buy Template'] - Buy Template button text
 * @param {Function} [props.onBuyButtonClick=() => {}] - Buy Template button click handler
 * @param {Object} [props.popularTitleBar={}] - Props for the MostPopular TitleBar
 * @param {Object} [props.collectionsTitleBar={}] - Props for the Collections TitleBar
 * @param {Object} [props.blogTitleBar={}] - Props for the Blog TitleBar
 * @param {string} [props.className=''] - Additional CSS classes for the container
 * @returns {JSX.Element} The rendered home page
 */
const Home = ({
  videoSrc = BG,
  videoHeight = 660,
  title = "The ",
  titleHighlight = "beautiful ",
  titleHighlightColor = "#E3930B",
  titleEnd = "way to sell anything with Framer.",
  description = "Designed with Framer, this template makes it easy to turn your website into a powerful ecommerce store.",
  cartCount = 3,
  onCartClick = () => {},
  buyButtonText = "Buy Template",
  onBuyButtonClick = () => {},
  popularTitleBar = {},
  collectionsTitleBar = {
    title: "Our Collections",
    description: "Showcase all your products here with descriptions.",
    className: "!mt-20",
  },
  blogTitleBar = {
    title: "Explore the blog",
    description:
      "Share insights, boost SEO and build trust with your audience.",
    className: "!mt-20 !mb-10",
    buttonText: "View Posts",
  },
  className = "",
}) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const togglePlayPause = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className={className} role="main" aria-label="Home page">
      <div className="relative !mb-8 overflow-hidden rounded-[15px]">
        <video
          ref={videoRef}
          src={videoSrc}
          autoPlay
          loop
          muted
          className={`w-full h-[${videoHeight}px] max-sm:h-[600px] object-cover`}
          aria-label="Hero background video"
        />
        <OverlayContent
          title={title}
          titleHighlight={titleHighlight}
          titleHighlightColor={titleHighlightColor}
          titleEnd={titleEnd}
          description={description}
          cartCount={cartCount}
          onCartClick={onCartClick}
          buyButtonText={buyButtonText}
          onBuyButtonClick={onBuyButtonClick}
        />
      </div>
      <div className="flex flex-col">
        <TitleBar {...popularTitleBar} />
        <MostPopular />
        <CustomerTrust />
        <TitleBar {...collectionsTitleBar} />
        <CollectionsTray />
        <VideoBanner />
        <Highlights />
        <TitleBar {...blogTitleBar} />
        <BlogSection />
      </div>
    </div>
  );
};

/**
 * PropTypes for type checking and validation.
 */
Home.propTypes = {
  videoSrc: PropTypes.string,
  videoHeight: PropTypes.number,
  title: PropTypes.string,
  titleHighlight: PropTypes.string,
  titleHighlightColor: PropTypes.string,
  titleEnd: PropTypes.string,
  description: PropTypes.string,
  cartCount: PropTypes.number,
  onCartClick: PropTypes.func,
  buyButtonText: PropTypes.string,
  onBuyButtonClick: PropTypes.func,
  popularTitleBar: PropTypes.object,
  collectionsTitleBar: PropTypes.object,
  blogTitleBar: PropTypes.object,
  className: PropTypes.string,
};

OverlayContent.propTypes = {
  title: PropTypes.string,
  titleHighlight: PropTypes.string,
  titleHighlightColor: PropTypes.string,
  titleEnd: PropTypes.string,
  description: PropTypes.string,
  cartCount: PropTypes.number,
  onCartClick: PropTypes.func,
  buyButtonText: PropTypes.string,
  onBuyButtonClick: PropTypes.func,
  className: PropTypes.string,
  titleMaxWidth: PropTypes.number,
  descriptionMaxWidth: PropTypes.number,
};

export default Home;
