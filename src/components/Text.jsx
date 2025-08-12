import React, { useEffect, useRef, useState } from "react";
import "../assets/Text.css";

function Text({ text, groupSize = 3, color }) {
  const words = text.split(" ");
  const groups = [];
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  for (let i = 0; i < words.length; i += groupSize) {
    groups.push(words.slice(i, i + groupSize).join(" "));
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Run only once
        }
      },
      { threshold: 0.3 } // 30% of text is visible
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <span
      ref={containerRef}
      className={`text-container ${isVisible ? "animate" : ""}`}
    >
      {groups.map((group, idx) => (
        <span
          key={idx}
          className={`${isVisible ? "word" : ""}`}
          style={{
            animationDelay: `${idx * 0.15}s`,
            color: color || "inherit",
            whiteSpace: "pre",
          }}
        >
          {group + (idx !== groups.length - 1 ? " " : "")}
        </span>
      ))}
    </span>
  );
}

export default Text;
