import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { Icon } from "@iconify/react";
import BlogImage from "../assets/blog.png";
import BackgroundImage from "../assets/bg-2.jpg";
import AuthorImage from "../assets/person.png";

// Static data for blog posts
const POSTS = [
  {
    id: 1,
    description: "The Beginner’s Guide to Using Mockups for Your Brand",
    topic: "Guides",
    image: BackgroundImage,
  },
  {
    id: 2,
    description: "How to Choose the Perfect Color Palette for Your Project",
    topic: "Tips",
    image: BackgroundImage,
  },
  {
    id: 3,
    description: "Design Systems: Making Reusable UI the Right Way",
    topic: "Design",
    image: BackgroundImage,
  },
];

/**
 * Custom hook to apply scroll-based animation using IntersectionObserver.
 * Adds 'blur-animate' class when the element enters the viewport.
 * @returns {React.MutableRefObject} Reference to the observed element
 */
function useScrollAnimation() {
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add("blur-animate");
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return elementRef;
}

/**
 * MainCard component displaying a featured blog post with hover effects.
 * @returns {JSX.Element} The main blog card component
 */
const MainCard = () => {
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useScrollAnimation();

  return (
    <div
      ref={containerRef}
      className="relative flex max-md:flex-col group translate-y-[50px] opacity-100 transform"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="w-1/2 max-md:w-full h-[500px] max-md:rounded-t-2xl max-md:rounded-b-[0px] overflow-hidden rounded-l-2xl">
        <img
          src={BlogImage}
          alt="Featured blog post"
          className={`w-full h-full object-cover ${
            isHovered ? "expand-on-hover" : ""
          }`}
        />
      </div>

      {/* Top-left label */}
      <div className="absolute bg-white left-0 top-0 !p-2 rounded-br-2xl z-10">
        <div
          id="blogCorner"
          className="!p-2 blogCorner !px-3 text-sm font-bold rounded-full bg-purple-200"
        >
          Must Read
        </div>
      </div>

      {/* Content Section */}
      <div className="w-1/2 flex max-md:w-full flex-col justify-between h-[500px] bg-purple-100 max-md:rounded-b-2xl max-md:rounded-r-[0px] rounded-r-2xl !p-10">
        <div>
          <h1 className="text-black text-4xl font-semibold !mb-5">
            10 Creative Ways to Use Digital Backgrounds in Your Projects
          </h1>
          <p className="text-gray-500 font-medium text-lg">
            Discover unique and inspiring ways to incorporate digital
            backgrounds into your designs, from websites to social media.
          </p>
        </div>

        {/* Arrow Button */}
        <div className="absolute bg-white right-0 bottom-0 !p-2 rounded-tl-2xl">
          <div
            id="buttonCard"
            className="buttonCard !p-4 text-xl rounded-full bg-purple-200/80"
          >
            <Icon
              className={`arrow-icon font-semibold ${
                isHovered ? "rotate" : ""
              }`}
              icon="akar-icons:arrow-up"
            />
          </div>
        </div>

        {/* Author Info */}
        <div className="flex gap-3 items-center">
          <img
            className="w-10 h-10 rounded-full"
            src={AuthorImage}
            alt="Author"
          />
          <div>
            <p className="font-semibold text-md text-black">
              Written by Sarah Miller
            </p>
            <p className="text-md font-medium text-gray-500">
              Graphic Designer
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * SecondaryCard component for displaying individual blog posts.
 * @param {Object} props - Component props
 * @param {Object} props.item - Blog post data
 * @param {number} props.item.id - Unique identifier for the post
 * @param {string} props.item.description - Blog post description
 * @param {string} props.item.topic - Blog post topic
 * @param {string} props.item.image - Blog post image URL
 * @returns {JSX.Element} The secondary blog card component
 */
const SecondaryCard = ({ item }) => {
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useScrollAnimation();

  return (
    <div
      ref={containerRef}
      className="relative rounded-2xl translate-y-[50px] opacity-100 transform max-md:w-full h-[350px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="w-full h-[75%] rounded-2xl overflow-hidden">
        <img
          src={item.image}
          alt={item.description}
          className={`w-full h-full object-cover ${
            isHovered ? "expand-on-hover" : ""
          }`}
        />
      </div>

      {/* Label */}
      <div className="absolute bg-white left-0 top-0 !p-2 rounded-br-2xl z-10">
        <div
          id="blogCorner"
          className="!p-2 blogCorner !px-3 text-sm font-bold rounded-full bg-purple-200"
        >
          {item.topic}
        </div>
      </div>

      {/* Title */}
      <p className="text-black font-semibold !mt-2 text-lg">
        {item.description}
      </p>
    </div>
  );
};

SecondaryCard.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    topic: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
};

/**
 * BlogSection component to display a featured blog post and a list of secondary posts.
 * @returns {JSX.Element} The blog section component
 */
const BlogSection = () => {
  return (
    <div className="flex !mt-10 flex-col rounded-2xl">
      <MainCard />
      <div className="!mt-12 flex max-md:flex-col flex-wrap gap-10">
        {POSTS.map((post) => (
          <SecondaryCard key={post.id} item={post} />
        ))}
      </div>
    </div>
  );
};

export default BlogSection;
