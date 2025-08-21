import { useEffect } from "react";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";

/**
 * ScrollToTop component to scroll the window to the top on route changes.
 * @param {Object} [props] - Component props
 * @param {string} [props.behavior='instant'] - Scroll behavior ('instant' or 'smooth')
 * @returns {null} Returns null as the component does not render content
 */
const ScrollToTop = ({ behavior = "instant" }) => {
  const { pathname } = useLocation();

  /**
   * Scroll to top on route change.
   */
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior,
    });
  }, [pathname, behavior]);

  return null;
};

/**
 * PropTypes for type checking and validation.
 */
ScrollToTop.propTypes = {
  behavior: PropTypes.oneOf(["instant", "smooth"]),
};

export default ScrollToTop;
