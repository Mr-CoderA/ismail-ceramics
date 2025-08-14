import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const PageWrapper = ({ children }) => {
  const location = useLocation();
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    setAnimating(true);
    const timeout = setTimeout(() => {
      setAnimating(false);
    }, 350); // matches transition duration
    return () => clearTimeout(timeout);
  }, [location.pathname]);

  return (
    <div
      className={`transition-all duration-300 ease-out transform
        ${
          animating
            ? "opacity-0 translate-y-2 scale-[0.98]"
            : "opacity-100 translate-y-0 scale-100"
        }`}
    >
      {children}
    </div>
  );
};
