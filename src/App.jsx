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

import { Footer } from "./components/Footer";
import { Shop } from "./pages/Shop";
import { PageWrapper } from "./components/PageWrapper";
import { Collections } from "./pages/Collections";
import { Blog } from "./pages/Blog";
import { Support } from "./pages/Support";
import ScrollToTop from "./components/ScrollToTop";
const ContentWrapper = () => {
  const location = useLocation();

  return (
    <>
      <Navbar />

      {/* Wrap only the changing pages */}
      <PageWrapper key={location.pathname}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/support" element={<Support />} />
          {/* add other routes here if needed */}
        </Routes>
      </PageWrapper>

      <Footer />
    </>
  );
};

const App = () => {
  return (
    <div
      className="w-full flex justify-center max-md:!p-[10px] max-md:!pt-[20px]"
      style={{ padding: "20px", paddingTop: "20px" }}
    >
      <div className="w-full max-w-[90rem] flex flex-col">
        <Router>
          <ScrollToTop />
          <ContentWrapper />
        </Router>
      </div>
    </div>
  );
};

export default App;
