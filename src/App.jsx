import React, { useRef, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import "./App.css";
import { Home } from "./pages/Home";
import { Navbar } from "./components/Navbar";
import BG from "./assets/bg.mp4";
import Button from "./components/Button";
import { Icon } from "@iconify/react/dist/iconify.js";
import locomotiveScroll from "locomotive-scroll";
import Text from "./components/Text";
import { Footer } from "./components/Footer";

const OverlayContent = () => (
  <div className="absolute inset-0 flex flex-col justify-center px-[55px]">
    {/* Top right buttons */}
    <div className="absolute left-0 w-full top-0 !m-0 flex justify-end !p-4">
      <Button variant="secondary" className="max-md:hidden">
        Buy Template
      </Button>
      <button
        className="relative p-[8px] !mt-1 text-[25px] cursor-pointer !mr-2 md: text-white md:hidden"
        aria-label="Shopping cart"
      >
        <Icon icon="fluent:cart-24-filled" />
        <span className="absolute text-[11px] text-black bg-purple-200 w-3.5 h-3.5 flex items-center justify-center rounded-full top-[-8px] right-[-8px]">
          3
        </span>
      </button>
    </div>

    {/* Centered text & button */}
    <div className="!p-15 max-md:!p-6 !mt-15">
      <h1 className="text-white max-w-[50rem] max-md:text-5xl max-sm:text-4xl text-6xl !mb-4 font-medium">
        <span>
          <Text text="The " />
          <Text text="beautiful " color="#E3930B" />
          <Text text="way to sell" />{" "}
        </span>
        <Text text="anything with Framer." />
      </h1>

      <p className="text-white text-[17px] max-w-[30rem]">
        <Text text="Designed with Framer, this template makes it easy to turn your website into a powerful ecommerce store." />
      </p>

      <Button className="!mt-8" variant="secondary">
        Shop Products
      </Button>
    </div>
  </div>
);

const ContentWrapper = () => {
  const location = useLocation();

  return (
    <>
      <div className="relative !mb-8 overflow-hidden rounded-[15px]">
        <video
          src={BG}
          autoPlay
          loop
          muted
          className="w-full h-[660px] max-sm:h-[600px] object-cover"
        ></video>

        {/* Show OverlayContent ONLY on "/" route */}
        {location.pathname === "/" && <OverlayContent />}

        <Navbar />
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        {/* add other routes here if needed */}
      </Routes>

      <Footer />
    </>
  );
};
const App = () => {
  return (
    <div
      className="w-full flex justify-center max-md:!p-[10px]"
      style={{ padding: "20px", paddingTop: "20px" }}
    >
      <div className="w-full max-w-[90rem] flex flex-col">
        <Router>
          <ContentWrapper />
        </Router>
      </div>
    </div>
  );
};

export default App;
