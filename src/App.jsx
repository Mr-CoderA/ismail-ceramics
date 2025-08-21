import React from "react";
import PropTypes from "prop-types";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Shop from "./pages/Shop";
import PageWrapper from "./components/PageWrapper";
import Collections from "./pages/Collections";
import Blog from "./pages/Blog";
import Support from "./pages/Support";
import ScrollToTop from "./components/ScrollToTop";
import ProductView from "./pages/ProductView";

/**
 * ContentWrapper component to render navigation, routes, and footer with page transitions.
 * @returns {JSX.Element} The rendered content wrapper with routes
 */
const ContentWrapper = () => {
  const location = useLocation();

  return (
    <>
      <Navbar />
      <PageWrapper key={location.pathname}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop minHeight={500} />} />
          <Route
            path="/collections"
            element={<Collections minHeight={500} />}
          />
          <Route path="/blog" element={<Blog minHeight={500} />} />
          <Route path="/support" element={<Support minHeight={500} />} />
          <Route
            path="/product/:id"
            element={<ProductView minHeight={500} />}
          />
        </Routes>
      </PageWrapper>
      <Footer />
    </>
  );
};

/**
 * App component, the main entry point for the React application.
 * @param {Object} props - Component props
 * @param {string} [props.className=''] - Additional CSS classes for the container
 * @param {number} [props.maxWidth=1440] - Maximum width of the content container (px)
 * @param {string} [props.padding='20px'] - Padding for the container
 * @returns {JSX.Element} The rendered application
 */
const App = ({ className = "", maxWidth = 1440, padding = "20px" }) => {
  return (
    <div
      className={`w-full flex justify-center max-md:!p-[10px] max-md:!pt-[20px] ${className}`}
      style={{ padding, paddingTop: padding }}
      role="application"
      aria-label="Main application container"
    >
      <div
        className="w-full flex flex-col"
        style={{ maxWidth: `${maxWidth}px` }}
      >
        <Router>
          <ScrollToTop />
          <ContentWrapper />
        </Router>
      </div>
    </div>
  );
};

/**
 * PropTypes for type checking and validation.
 */
App.propTypes = {
  className: PropTypes.string,
  maxWidth: PropTypes.number,
  padding: PropTypes.string,
};

export default App;
