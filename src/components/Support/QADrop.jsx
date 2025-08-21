import React, { useState } from "react";
import PropTypes from "prop-types";
import Button from "../Button";

/**
 * QADrop component to display a list of collapsible Q&A items with toggle functionality.
 * @param {Object} props - Component props
 * @param {Array<Object>} props.array - Array of Q&A objects with question and answer properties
 * @param {number} [props.type=0] - Styling variant (0 for purple background, 1 for bordered style)
 * @param {string} [props.className=''] - Additional CSS classes for the container
 * @param {number} [props.animationDuration=300] - Duration of the toggle animation in milliseconds
 * @returns {JSX.Element} The rendered Q&A accordion component
 */
const QADrop = ({
  array = [],
  type = 0,
  className = "",
  animationDuration = 300,
}) => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div
      className={`flex flex-col gap-5 !mb-10 ${className}`}
      role="region"
      aria-label="FAQ accordion"
    >
      {array.length > 0 ? (
        array.map((item, index) => {
          const isOpen = openIndex === index;

          return (
            <div
              key={index}
              onClick={() => setOpenIndex(isOpen ? null : index)}
              onKeyDown={(e) =>
                e.key === "Enter" && setOpenIndex(isOpen ? null : index)
              }
              className={`relative flex justify-between w-full rounded-2xl ${
                type === 1
                  ? "bg-white flex !p-2 !px-4 border-b-1 border-gray-300 rounded-[0px]"
                  : "bg-purple-100 !p-4 !px-8"
              } transition-all duration-300 overflow-hidden cursor-pointer`}
              role="button"
              aria-expanded={isOpen}
              aria-controls={`qa-panel-${index}`}
              tabIndex={0}
            >
              <div
                className={`flex flex-col justify-center ${
                  type === 1 ? "" : "gap-5"
                } h-fit`}
              >
                <h1
                  className={`${
                    type === 1
                      ? "text-lg text-black !mb-1"
                      : "text-xl font-semibold top-[10px]"
                  } relative`}
                >
                  {item.question || "No question provided"}
                </h1>

                <p
                  id={`qa-panel-${index}`}
                  className={`font-medium text-gray-500 transition-all duration-${animationDuration} ${
                    isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  {item.answer || "No answer provided"}
                </p>
              </div>

              {/* Top-right Navigation */}
              <div
                id="corner-top"
                className={`${
                  type === 1 ? "relative" : "absolute"
                } corner-top top-0 right-0 bg-white flex gap-3 rounded-bl-2xl !p-3 transition-transform duration-300`}
              >
                <Button
                  fontSize={300}
                  className="z-11 font-bold"
                  variant="icon"
                  icon="eva:arrow-up-fill"
                  initialRotate={isOpen ? 180 : 0}
                  size={20}
                  hover={false}
                  hoverBg={true}
                  aria-label={
                    isOpen
                      ? `Collapse ${item.question || "FAQ item"}`
                      : `Expand ${item.question || "FAQ item"}`
                  }
                />
              </div>
            </div>
          );
        })
      ) : (
        <p className="text-gray-500">No Q&A items provided</p>
      )}
    </div>
  );
};

/**
 * PropTypes for type checking and validation.
 */
QADrop.propTypes = {
  array: PropTypes.arrayOf(
    PropTypes.shape({
      question: PropTypes.string.isRequired,
      answer: PropTypes.string.isRequired,
    })
  ).isRequired,
  type: PropTypes.oneOf([0, 1]),
  className: PropTypes.string,
  animationDuration: PropTypes.number,
};

export default QADrop;
