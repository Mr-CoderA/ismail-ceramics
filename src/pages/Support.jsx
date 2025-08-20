import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useEffect, useRef } from "react";
import Text from "../components/Text";
import { CollectionsTray } from "../components/CollectionsTray";
import BlogSection from "../components/BlogSection";
import { QADrop } from "../components/Support/QADrop";

function useScrollAnimation() {
  const ref = useRef();

  useEffect(() => {
    const el = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("blur-animate");
        }
      },
      { threshold: 0.2 }
    );
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}
const OverlayContent = () => {
  const containerRef = useScrollAnimation();
  return (
    <div
      ref={containerRef}
      className="w-full translate-y-[50px]  opacity-100 transform max-md:min-h-[500px] min-h-[450px] flex  bg-purple-100 rounded-2xl items-center justify-center"
    >
      <div className="flex flex-col items-center">
        <p className="!px-3 w-fit !py-1 !mb-8 bg-white rounded-2xl text-sm font-semibold">
          Support
        </p>
        <h1 className="text-6xl max-md:text-4xl max-md:w-[400px] font-semibold text-center w-[700px]">
          <Text text={"Help your customers."} />
        </h1>
        <p className="!mt-8 text-lg font-medium max-md:w-[300px] text-gray-600 w-[450px] text-center">
          Use this page to display your full product collection, making it easy
          for customers to browse and shop.
        </p>
      </div>
      <div className="absolute left-0 w-full top-0 !m-0 flex justify-end !p-4">
        <button
          className="relative p-[8px] !mt-1 text-[25px] cursor-pointer !mr-2 md: text-black md:hidden"
          aria-label="Shopping cart"
        >
          <Icon icon="fluent:cart-24-filled" />
          <span className="absolute text-[11px] text-black  w-3.5 h-3.5 flex items-center justify-center rounded-full top-[-8px] right-[-8px]">
            3
          </span>
        </button>
      </div>
    </div>
  );
};
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

export const Support = () => {
  const containerRef = useScrollAnimation();
  return (
    <div>
      <OverlayContent />
      <div className="w-full h-fit max-md:!p-0 max-md:!pt-20 !p-20 flex justify-center">
        <div className="w-[60rem] max-md:w-full !mb-15">
          <div className="flex flex-col justify-center">
            <div className="flex flex-col gap-5 !mb-10">
              <h1 className="text-center text-4xl font-semibold">
                Frequently asked questions
              </h1>
              <p className="font-medium text-gray-500 text-lg text-center">
                <Text
                  text={
                    " Give your visitors quick answers to common questions about your store like these."
                  }
                />
              </p>
            </div>
            <div>
              <QADrop array={QA_DATA} />
            </div>
          </div>
          <div
            ref={containerRef}
            className="translate-y-[50px]  opacity-100 transform"
          >
            <div className="flex flex-col gap-5 !mt-10">
              <h1 className="text-center text-4xl font-semibold">
                Still got questions?
              </h1>
              <p className="font-medium text-gray-500 text-lg text-center">
                <Text
                  text={
                    "Give your visitors quick answers to common questions about your store like these."
                  }
                />
              </p>
            </div>
            <div className="relative flex justify-center items-center w-full">
              <div className="w-[40rem] flex flex-col gap-8 !mt-10">
                <div className="flex flex-col gap-2">
                  <span className=" font-semibold">Name</span>
                  <input
                    type="text"
                    className="bg-purple-100/60 !p-2 !px-3 rounded-xl outline-0"
                    name=""
                    placeholder="Asad Ali"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <span className=" font-semibold">Email</span>
                  <input
                    type="email"
                    className="bg-purple-100/60 !p-2 !px-3 rounded-xl outline-0"
                    name=""
                    placeholder="abc@gmail.com"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <span className=" font-semibold">Message</span>
                  <textarea
                    type="text"
                    className="bg-purple-100/60 !p-2 !px-3 rounded-xl outline-0"
                    name=""
                    placeholder="Hey, i need help with..."
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
