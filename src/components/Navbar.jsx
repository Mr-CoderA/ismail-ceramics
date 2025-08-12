import React, { useEffect, useState, useRef } from "react";
import { Icon } from "@iconify/react";
import Logo from "../assets/logo.png";
import Button from "./Button";

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [delayedScrolled, setDelayedScrolled] = useState(false);
  const [offset, setOffset] = useState({ top: 0, left: 0 });
  const [showNavbarClass, setShowNavbarClass] = useState(false);
  const [open, setOpen] = useState(false);

  const navbarRef = useRef(null);

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY >= 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Position update
  useEffect(() => {
    const updatePosition = () => {
      if (navbarRef.current) {
        const rect = navbarRef.current.getBoundingClientRect();
        setOffset({ top: rect.top + window.scrollY, left: rect.left });
      }
    };
    updatePosition();
    window.addEventListener("resize", updatePosition);
    return () => window.removeEventListener("resize", updatePosition);
  }, []);
  // Delay navbar style switch after scrolling
  useEffect(() => {
    let timer;
    if (scrolled) {
      timer = setTimeout(() => setDelayedScrolled(true), 300); // delay in ms
    } else {
      setDelayedScrolled(false);
    }
    return () => clearTimeout(timer);
  }, [scrolled]);

  // Delay navbar class when not scrolled
  useEffect(() => {
    let timer;
    if (!scrolled) {
      timer = setTimeout(() => setShowNavbarClass(true), 200);
    } else {
      setShowNavbarClass(false);
    }
    return () => clearTimeout(timer);
  }, [scrolled]);

  useEffect(() => {
    if (!scrolled) {
      setOpen(false);
    }
    console.log(window.scrollY);
  }, [scrolled]);

  return (
    <div
      ref={navbarRef}
      id="navbar"
      className={`
    bg-white rounded-[15px] !py-3 !px-5 w-fit h-[62px] flex justify-between gap-6 rounded-br-[15px]
    transition-all ease-in-out
    ${
      !delayedScrolled
        ? `absolute top-[0px] left-[0px] ${showNavbarClass ? "navbar" : ""}`
        : `fixed max-md:w-full max-md:left-0 max-md:rounded-[0px] max-md:!top-0 z-50 shadow-md `
    }
  `}
      style={{
        transitionProperty:
          "top, left, opacity, box-shadow, background-color, backdrop-filter",

        transitionDuration: delayedScrolled ? "300ms" : "200ms", // slow down on scroll down, speed up on scroll up
        top: delayedScrolled ? `20px` : scrolled ? "-100px" : "0px",
        // left: delayedScrolled ? `${offset.left}px` : "0px", // Move dynamic positioning to inline styles
        opacity: delayedScrolled ? 0.98 : scrolled ? 0 : 1,
      }}
    >
      <div className="flex items-center">
        <img
          className={`w-[106px] ${
            scrolled ? "max-md:w-[110px]" : "max-md:w-[120px]"
          } `}
          src={Logo}
          alt="Logo"
        />
      </div>
      <div className="flex gap-1 items-center text-sm max-md:hidden">
        <Button>Shop</Button>
        <Button>Collections</Button>
        <Button>Blog</Button>
        <Button>Support</Button>
      </div>
      <div
        className={`flex items-center gap-1  ${
          scrolled ? "" : "max-md:hidden"
        }`}
      >
        <button
          className="!p-[6px] text-[22px] rounded-full cursor-pointer hover:bg-purple-100 transition-colors duration-300"
          aria-label="Search"
        >
          <Icon icon="basil:search-outline" />
        </button>
        <button
          className="relative p-[6px] text-[22px] cursor-pointer !mr-2"
          aria-label="Shopping cart"
        >
          <Icon icon="fluent:cart-24-filled" />
          <span className="absolute text-[10px] bg-purple-200 w-3 h-3 flex items-center justify-center rounded-full top-[-5px] right-[-5px]">
            3
          </span>
        </button>
        <button
          onClick={() => setOpen(!open)}
          className={`relative p-[6px] text-[22px] cursor-pointer md:hidden ${
            scrolled ? "" : "max-md:hidden"
          }`}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? (
            <Icon icon="basil:cross-outline" width="26" height="26" />
          ) : (
            <Icon icon="mynaui:menu-solid" width="26" height="26" />
          )}
        </button>
      </div>
      <div
        className={`w-full !p-6 bg-white absolute h-fit top-[61px] left-0 rounded-b-[15px] gap-2 font-medium flex flex-col shadow-md transition-all duration-300 ease-in-out ${
          open && scrolled
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <button className="w-full text-left hover:text-gray-600 transition-colors duration-200">
          Shop
        </button>
        <button className="w-full text-left hover:text-gray-600 transition-colors duration-200">
          Collection
        </button>
        <button className="w-full text-left hover:text-gray-600 transition-colors duration-200">
          Blog
        </button>
        <button className="w-full text-left hover:text-gray-600 transition-colors duration-200">
          Support
        </button>
      </div>
    </div>
  );
};
