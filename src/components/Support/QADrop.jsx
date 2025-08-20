import React, { useState } from "react";
import Button from "../Button";

export const QADrop = ({ array, type }) => {
  // Track which Q&A is open (null means none open)
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="flex flex-col gap-5 !mb-10">
      {array.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <div
            key={index}
            onClick={
              () => setOpenIndex(isOpen ? null : index) // toggle open/close
            }
            className={`relative flex justify-between w-full rounded-2xl ${
              type === 1
                ? "bg-white flex !p-2 !px-4 border-b-1 border-gray-300 rounded-[0px]"
                : "bg-purple-100 !p-4 !px-8"
            } transition-all duration-300 overflow-hidden  cursor-pointer`}
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
                    : "text-xl font-semibold top-[10px"
                } relative ]  `}
              >
                {item.question}
              </h1>

              <p
                className={`font-medium text-gray-500 transition-all duration-300 ${
                  isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                {item.answer}
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
                icon={"eva:arrow-up-fill"}
                initialRotate={isOpen ? 180 : 0}
                size={20}
                hover={false} // disable hover rotate
                hoverBg={true}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};
