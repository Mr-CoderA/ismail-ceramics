import React, { useRef, useState, useEffect } from "react";
import Logo from "../assets/logo.png";
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
export const Footer = () => {
  const containerRef = useScrollAnimation();
  const pages = [
    { name: "Home", link: "/" },
    { name: "Shop", link: "/shop" },
    { name: "About", link: "/about" },
    { name: "Contact", link: "/contact" },
  ];

  const information = [
    { name: "Terms & Conditions", link: "/terms" },
    { name: "Privacy Policy", link: "/privacy" },
    { name: "FAQ", link: "/faq" },
    { name: "Support", link: "/support" },
  ];

  return (
    <div
      ref={containerRef}
      className="relative !mt-10 !mb-2 rounded-2xl flex justify-between bg-purple-200/70 h-fit !pt-20 !pb-8 !p-15 translate-y-[50px] opacity-100 transform"
    >
      {/* Logo */}
      <div
        id="blogCorner"
        className="absolute top-0 left-0 flex items-center blogCorner bg-white !p-4 rounded-br-2xl"
      >
        <img className="w-[120px] max-md:w-[110px]" src={Logo} alt="Logo" />
      </div>

      {/* Newsletter */}
      <div className="w-1/3 gap-10 flex flex-col justify-between">
        <div>
          <p className="text-2xl font-semibold max-w-[400px]">
            Join our newsletter and get 20% off your first purchase with us.
          </p>
          <div className="!p-1 !mt-5 rounded-2xl bg-white flex justify-between gap-2">
            <input
              type="text"
              className="!pl-5 w-full outline-0"
              placeholder="Your Email Address"
            />
            <button className="bg-purple-700 font-semibold text-white !p-3 !px-10 rounded-2xl">
              Join
            </button>
          </div>
        </div>
        <p className="font-semibold text-gray-500 text-sm">
          Created by <span className="text-black">Asad Ali</span> © 2025
        </p>
      </div>

      {/* Links */}
      <div className="w-1/4 flex">
        {/* Pages */}
        <div className="w-1/2 h-fit">
          <p className="font-semibold !mb-2">Pages</p>
          <div className="flex flex-col gap-3">
            {pages.map((page, index) => (
              <a
                key={index}
                href={page.link}
                className="text-sm text-gray-800 hover:text-purple-700 transition"
              >
                {page.name}
              </a>
            ))}
          </div>
        </div>

        {/* Information */}
        <div className="w-1/2 h-fit">
          <p className="font-semibold !mb-2">Information</p>
          <div className="flex flex-col gap-3">
            {information.map((info, index) => (
              <a
                key={index}
                href={info.link}
                className="text-sm text-gray-800 hover:text-purple-700 transition"
              >
                {info.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
