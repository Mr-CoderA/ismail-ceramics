import React, { useEffect, useRef, useState } from "react";
import Blog from "../assets/blog.png";
import BG2 from "../assets/bg-2.jpg";
import Person from "../assets/person.png";
import { Icon } from "@iconify/react/dist/iconify.js";

const DUMMY = [
  {
    id: 1,
    description: "The Beginner’s Guide to Using Mockups for Your Brand",
    topic: "Guides",
    img: BG2,
  },
  {
    id: 2,
    description: "How to Choose the Perfect Color Palette for Your Project",
    topic: "Tips",
    img: BG2,
  },
  {
    id: 3,
    description: "Design Systems: Making Reusable UI the Right Way",
    topic: "Design",
    img: BG2,
  },
];

function useScrollAnimation() {
  const ref = useRef();

  useEffect(() => {
    const el = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("blur-animate");
        }
      },
      { threshold: 0.2 }
    );
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}

const MainCard = () => {
  const [hovered, setHovered] = useState(false);
  const containerRef = useScrollAnimation();

  return (
    <div
      ref={containerRef}
      className="relative flex max-md:flex-col group translate-y-[50px] opacity-100 transform"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image Container */}
      <div className="w-1/2 max-md:w-full h-[500px] max-md:rounded-t-2xl max-md:rounded-b-[0px] overflow-hidden rounded-l-2xl">
        <img
          src={Blog}
          alt=""
          className={`w-full h-full object-cover ${
            hovered ? "expand-on-hover" : ""
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
              className={`arrow-icon font-semibold ${hovered ? "rotate" : ""}`}
              icon="akar-icons:arrow-up"
            />
          </div>
        </div>

        {/* Author Info */}
        <div className="flex gap-3 items-center">
          <img className="w-10 h-10 rounded-full" src={Person} alt="" />
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

const SecondaryCard = ({ item }) => {
  const [hovered, setHovered] = useState(false);
  const containerRef = useScrollAnimation();

  return (
    <div
      ref={containerRef}
      className="relative rounded-2xl translate-y-[50px] opacity-100 transform max-md:w-full h-[350px]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="w-full h-[75%] rounded-2xl overflow-hidden">
        <img
          src={item.img}
          alt=""
          className={`w-full h-full object-cover ${
            hovered ? "expand-on-hover" : ""
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

const BlogSection = () => {
  return (
    <div className="flex !mt-10 flex-col rounded-2xl">
      <MainCard />

      <div className="!mt-12 flex max-md:flex-col flex-wrap gap-10">
        {DUMMY.map((e) => (
          <SecondaryCard key={e.id} item={e} />
        ))}
      </div>
    </div>
  );
};

export default BlogSection;
