import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import NavbarLogo from "../assets/logo.png";

/**
 * Static data for navigation links.
 * @type {Array<Object>}
 */
const NAV_LINKS = [
  { name: "Shop", path: "/shop" },
  { name: "Collections", path: "/collections" },
  { name: "Blog", path: "/blog" },
  { name: "Support", path: "/support" },
];

/**
 * Navbar component with responsive design, scroll-based styling, and mobile menu.
 * @param {Object} [props] - Component props
 * @param {string} [props.className=''] - Additional CSS classes for the navbar
 * @param {Array<Object>} [props.navLinks=NAV_LINKS] - Array of navigation links
 * @param {string} [props.logoSrc=NavbarLogo] - Source for the logo image
 * @param {string} [props.logoAlt='Company Logo'] - Alt text for the logo
 * @param {number} [props.cartCount=3] - Number of items in the cart
 * @returns {JSX.Element} The rendered navbar component
 */
const Navbar = ({
  className = "",
  navLinks = NAV_LINKS,
  logoSrc = NavbarLogo,
  logoAlt = "Company Logo",
  cartCount = 3,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [delayedScrolled, setDelayedScrolled] = useState(false);
  const [offset, setOffset] = useState({ top: 0, left: 0 });
  const [showNavbarClass, setShowNavbarClass] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const navbarRef = useRef(null);

  /**
   * Handle scroll to update navbar styling.
   */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY >= 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /**
   * Update navbar position on resize.
   */
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

  /**
   * Delay navbar style switch after scrolling.
   */
  useEffect(() => {
    const timer = setTimeout(
      () => setDelayedScrolled(scrolled),
      scrolled ? 300 : 0
    );
    return () => clearTimeout(timer);
  }, [scrolled]);

  /**
   * Delay navbar class when not scrolled.
   */
  useEffect(() => {
    const timer = setTimeout(
      () => setShowNavbarClass(!scrolled),
      scrolled ? 0 : 200
    );
    return () => clearTimeout(timer);
  }, [scrolled]);

  /**
   * Close mobile menu when not scrolled.
   */
  useEffect(() => {
    if (!scrolled) {
      setOpen(false);
    }
    console.log(window.scrollY);
  }, [scrolled]);

  return (
    <nav
      ref={navbarRef}
      id="navbar"
      className={`z-10 bg-white rounded-[15px] !py-3 !px-5 w-fit h-[62px] flex justify-between gap-6 rounded-br-[15px] transition-all ease-in-out ${
        !delayedScrolled
          ? `absolute !top-[20px] ${showNavbarClass ? "navbar" : ""}`
          : `fixed max-md:w-full max-md:left-0 max-md:rounded-[0px] max-md:!top-0 z-50 shadow-md`
      } ${className}`}
      style={{
        transitionProperty:
          "top, left, opacity, box-shadow, background-color, backdrop-filter",
        transitionDuration: delayedScrolled ? "300ms" : "200ms",
        top: delayedScrolled ? `20px` : scrolled ? "-100px" : "0px",
        opacity: delayedScrolled ? 0.98 : scrolled ? 0 : 1,
      }}
      role="navigation"
      aria-label="Main Navigation"
    >
      {/* Logo */}
      <div
        className="flex items-center cursor-pointer"
        onClick={() => navigate("/")}
        role="button"
        aria-label="Navigate to homepage"
      >
        <img
          className={`w-[106px] ${
            scrolled ? "max-md:w-[110px]" : "max-md:w-[120px]"
          }`}
          src={logoSrc}
          alt={logoAlt}
          width="106"
          height="auto"
        />
      </div>

      {/* Desktop Navigation */}
      <div className="flex gap-1 items-center text-sm max-md:hidden">
        {navLinks.map((link) => (
          <Button
            key={link.name}
            onClick={() => navigate(link.path)}
            aria-label={`Navigate to ${link.name}`}
          >
            {link.name}
          </Button>
        ))}
      </div>

      {/* Action Buttons */}
      <div
        className={`flex items-center gap-1 ${scrolled ? "" : "max-md:hidden"}`}
      >
        <button
          className="!p-[6px] text-[22px] rounded-full cursor-pointer hover:bg-purple-100 transition-colors duration-300"
          aria-label="Search"
        >
          <Icon icon="basil:search-outline" width="22" height="22" />
        </button>
        <button
          className="relative p-[6px] text-[22px] cursor-pointer !mr-2"
          aria-label={`Shopping cart with ${cartCount} items`}
        >
          <Icon icon="fluent:cart-24-filled" width="22" height="22" />
          {cartCount > 0 && (
            <span className="absolute text-[10px] bg-purple-200 w-3 h-3 flex items-center justify-center rounded-full top-[-5px] right-[-5px]">
              {cartCount}
            </span>
          )}
        </button>
        <button
          onClick={() => setOpen(!open)}
          className={`relative p-[6px] text-[22px] cursor-pointer md:hidden ${
            scrolled ? "" : "max-md:hidden"
          }`}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          <Icon
            icon={open ? "basil:cross-outline" : "mynaui:menu-solid"}
            width="26"
            height="26"
          />
        </button>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`w-full !p-6 bg-white absolute h-fit top-[61px] left-0 rounded-b-[15px] gap-2 font-medium flex flex-col shadow-md transition-all duration-300 ease-in-out ${
          open && scrolled
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
        role="menu"
        aria-hidden={!open}
      >
        {navLinks.map((link) => (
          <button
            key={link.name}
            onClick={() => {
              navigate(link.path);
              setOpen(false);
            }}
            className="w-full text-left hover:text-gray-600 transition-colors duration-200"
            role="menuitem"
            aria-label={`Navigate to ${link.name}`}
          >
            {link.name}
          </button>
        ))}
      </div>
    </nav>
  );
};

/**
 * PropTypes for type checking and validation.
 */
Navbar.propTypes = {
  className: PropTypes.string,
  navLinks: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
    })
  ),
  logoSrc: PropTypes.string,
  logoAlt: PropTypes.string,
  cartCount: PropTypes.number,
};

export default Navbar;
