import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import FooterLogo from "../assets/logo.png";

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
 * Static data for footer navigation links.
 * @type {Array<Object>}
 */
const PAGES = [
  { name: "Home", link: "/" },
  { name: "Shop", link: "/shop" },
  { name: "About", link: "/about" },
  { name: "Contact", link: "/contact" },
];

/**
 * Static data for footer information links.
 * @type {Array<Object>}
 */
const INFORMATION = [
  { name: "Terms & Conditions", link: "/terms" },
  { name: "Privacy Policy", link: "/privacy" },
  { name: "FAQ", link: "/faq" },
  { name: "Support", link: "/support" },
];

/**
 * Footer component displaying a logo, newsletter signup, and navigation links.
 * @param {Object} [props] - Component props
 * @param {string} [props.className=''] - Additional CSS classes for the container
 * @param {Function} [props.onNewsletterSubmit] - Callback for newsletter form submission
 * @param {string} [props.copyrightText='Created by Asad Ali © 2025'] - Copyright text
 * @returns {JSX.Element} The rendered footer component
 */
const Footer = ({
  className = "",
  onNewsletterSubmit = (email) => console.log(`Subscribed: ${email}`),
  copyrightText = "Created by Asad Ali © 2025",
}) => {
  const containerRef = useScrollAnimation();
  const [email, setEmail] = useState("");

  /**
   * Handle newsletter form submission.
   * @param {React.FormEvent} event - Form submission event
   */
  const handleSubmit = (event) => {
    event.preventDefault();
    if (email) {
      onNewsletterSubmit(email);
      setEmail("");
    }
  };

  return (
    <footer
      ref={containerRef}
      className={`relative !mt-10 max-md:flex-col !mb-2 rounded-2xl flex justify-between bg-purple-200/70 h-fit !pt-20 !pb-8 !p-15 max-md:!p-10 max-md:!pt-20 translate-y-[50px] opacity-100 transform ${className}`}
      role="contentinfo"
      aria-label="Footer"
    >
      {/* Logo */}
      <div
        id="blogCorner"
        className="absolute top-0 left-0 flex items-center blogCorner bg-white !p-4 rounded-br-2xl"
      >
        <img
          className="w-[120px] max-md:w-[110px]"
          src={FooterLogo}
          alt="Company Logo"
          width="120"
          height="auto"
        />
      </div>

      {/* Newsletter */}
      <div className="w-1/3 max-md:w-full gap-10 flex flex-col justify-between">
        <div>
          <p className="text-2xl font-semibold max-w-[400px]">
            Join our newsletter and get 20% off your first purchase with us.
          </p>
          <form
            onSubmit={handleSubmit}
            className="!p-1 !mt-5 rounded-2xl bg-white flex justify-between gap-2"
            aria-label="Newsletter Signup"
          >
            <input
              type="email"
              className="!pl-5 w-full outline-0"
              placeholder="Your Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-label="Email address"
            />
            <button
              type="submit"
              className="bg-purple-700 font-semibold text-white !p-3 !px-10 rounded-2xl"
              aria-label="Join newsletter"
            >
              Join
            </button>
          </form>
        </div>
        <p className="font-semibold text-gray-500 text-sm">
          {copyrightText.split("Asad Ali").map((part, index) =>
            index === 1 ? (
              <span key="author" className="text-black">
                Asad Ali
              </span>
            ) : (
              part
            )
          )}
        </p>
      </div>

      {/* Links */}
      <div className="w-1/4 max-md:w-full max-md:!mt-8 flex">
        {/* Pages */}
        <nav className="w-1/2 h-fit" aria-label="Main Navigation">
          <p className="font-semibold !mb-2">Pages</p>
          <div className="flex flex-col gap-3">
            {PAGES.map((page) => (
              <a
                key={page.name}
                href={page.link}
                className="text-sm text-gray-800 hover:text-purple-700 transition"
                aria-label={`Navigate to ${page.name}`}
              >
                {page.name}
              </a>
            ))}
          </div>
        </nav>

        {/* Information */}
        <nav className="w-1/2 h-fit" aria-label="Information Links">
          <p className="font-semibold !mb-2">Information</p>
          <div className="flex flex-col gap-3">
            {INFORMATION.map((info) => (
              <a
                key={info.name}
                href={info.link}
                className="text-sm text-gray-800 hover:text-purple-700 transition"
                aria-label={`Navigate to ${info.name}`}
              >
                {info.name}
              </a>
            ))}
          </div>
        </nav>
      </div>
    </footer>
  );
};

/**
 * PropTypes for type checking and validation.
 */
Footer.propTypes = {
  className: PropTypes.string,
  onNewsletterSubmit: PropTypes.func,
  copyrightText: PropTypes.string,
};

export default Footer;
