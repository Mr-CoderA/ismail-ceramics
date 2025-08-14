import React, { useState } from "react";
import Button from "../Button";

// Dummy Q&A array
const QA_DATA = [
  {
    question: "How do I access my digital downloads after purchase?",
    answer:
      "Once your purchase is complete, you’ll receive an email with a download link. You can also access your downloads directly from your account page.",
  },
  {
    question: "Can I get a refund for a digital product?",
    answer:
      "Refunds for digital products are only available if the product has not been downloaded or accessed.",
  },
  {
    question: "Do digital products expire after download?",
    answer:
      "No, once downloaded, your digital products are yours to keep forever.",
  },
];

export const QADrop = () => {
  // Track which Q&A is open (null means none open)
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="flex flex-col gap-5 !mb-10">
      {QA_DATA.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <div
            key={index}
            onClick={
              () => setOpenIndex(isOpen ? null : index) // toggle open/close
            }
            className="relative w-full rounded-2xl bg-purple-100 transition-all duration-300 overflow-hidden !p-4 !px-8 cursor-pointer"
          >
            {/* Top-right Navigation */}
            <div
              id="corner-top"
              className="absolute corner-top top-0 right-0 bg-white flex gap-3 rounded-bl-2xl !p-3 transition-transform duration-300"
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

            <div className="flex flex-col justify-center gap-5 h-fit">
              <h1 className="relative top-[10px] font-semibold text-xl">
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
          </div>
        );
      })}
    </div>
  );
};
