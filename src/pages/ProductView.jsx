import React from "react";
import { useParams } from "react-router-dom";
import "./assets/ProductView.css";
import Brick from "../assets/brick.png";
import { QADrop } from "../components/Support/QADrop";
import { ProductCard } from "../components/ProductCard";
import { CustomerTrust } from "../components/CustomerTrust";
import { TitleBar } from "../components/TittleBar";
import { MostPopular } from "../components/MostPopular";

const QA_DATA = [
  {
    question: "Waranty",
    answer:
      "Once your purchase is complete, you’ll receive an email with a download link. You can also access your downloads directly from your account page.",
  },
  {
    question: "Shipping Information",
    answer:
      "Refunds for digital products are only available if the product has not been downloaded or accessed.",
  },
  {
    question: "Support",
    answer:
      "No, once downloaded, your digital products are yours to keep forever.",
  },
];

export const ProductView = () => {
  const { id } = useParams(); // "123"
  const products = [
    {
      id: 1,
      name: "Standard Brick",
      category: "Engineer Products",
      price: "USD $5.00",
      image: Brick,
    },
    {
      id: 2,
      name: "Premium Brick",
      category: "Luxury Products",
      price: "USD $8.00",
      image: Brick,
    },
    {
      id: 3,
      name: "Eco Brick",
      category: "Sustainable Products",
      price: "USD $6.50",
      image: Brick,
    },
  ];
  return (
    <div className="relative !pt-30 !pb-10 max-md:!pt-20">
      <div className="flex gap-10 max-md:flex-col">
        <div className="flex gap-5 max-md:flex-col-reverse">
          <div className="flex  md:flex-col gap-4">
            {" "}
            {/* flex column + spacing */}
            <div className="w-20 h-20 rounded-2xl bg-purple-50 p-5 flex items-center justify-center">
              <img src={Brick} alt="" className="w-16 h-16 object-contain" />
            </div>
            <div className="w-20 h-20 rounded-2xl bg-purple-50 p-5 flex items-center justify-center">
              <img src={Brick} alt="" className="w-16 h-16 object-contain" />
            </div>
            <div className="w-20 h-20 rounded-2xl bg-purple-50 p-5 flex items-center justify-center">
              <img src={Brick} alt="" className="w-16 h-16 object-contain" />
            </div>
          </div>

          <div
            id="imageZoom"
            className="bg-purple-50 max-md:w-full max-md:h-110 w-190 h-190 rounded-2xl flex items-center justify-center"
          >
            <img
              src={Brick}
              alt=""
              className="w-3/4 h-3/4  object-contain max-w-full max-h-full"
            />
          </div>
        </div>
        <div className="flex flex-col text-sm text-gray-500">
          <p className="flex items-center gap-2 h-fit !mb-4">
            <span>Shop</span>{" "}
            <div className="w-1 h-1 rounded-full bg-gray-500"></div>
            <span>Technology</span>
          </p>
          <h1 className="text-black font-semibold text-5xl">
            Retro Handheld Phone
          </h1>
          <p className="text-xl text-black font-medium flex gap-4 !mt-4">
            USD $50{" "}
            <span className="text-gray-400 line-through">USD $39.99</span>
          </p>
          <p className="!mt-7 text-[16px]">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem
            impedit quibusdam repudiandae saepe aut, voluptas id, dolorum cum et
            inventore unde, ratione quisquam placeat ipsa perspiciatis corrupti
            animi. Iste, quam?
          </p>
          <div className="!mt-5 flex flex-col gap-4">
            <h1 className="text-lg text-black font-semibold">Color</h1>
            <div className="flex gap-4">
              <button className="!px-6 !py-2 font-semibold rounded-xl text-black bg-gray-200 hover:bg-black hover:text-white transition duration-300 ease-in-out">
                Red
              </button>
              <button className="!px-6 !py-2 font-semibold rounded-xl text-black bg-gray-200 hover:bg-black hover:text-white transition duration-300 ease-in-out">
                Green
              </button>
              <button className="!px-6 !py-2 font-semibold rounded-xl text-black bg-gray-200 hover:bg-black hover:text-white transition duration-300 ease-in-out">
                Blue
              </button>
            </div>
          </div>
          <div className="flex flex-col !mt-10 gap-5 w-full h-fit">
            <button className="w-full rounded-3xl !py-3 text-lg bg-black text-white">
              Add to Cart
            </button>
            <button className="w-full rounded-3xl !py-3 text-lg bg-gray-200 text-black">
              Buy Now
            </button>
          </div>
          <div className="!mt-10">
            <QADrop type={1} array={QA_DATA} />
          </div>
        </div>
      </div>
      <div className="flex max-md:flex-col !mt-4 gap-5 justify-between">
        <ProductCard
          variant="highlight"
          title="Fast Worldwide Shipping"
          description="We deliver your order in 3-5 business days."
          icon="mage:electricity-fill"
          bgColor="bg-purple-100"
          iconBg="bg-purple-100"
        />
        <ProductCard
          variant="highlight"
          title="Fast Worldwide Shipping"
          description="We deliver your order in 3-5 business days."
          icon="fluent:diamond-16-filled"
          bgColor="bg-purple-100"
          iconBg="bg-purple-100"
        />
        <ProductCard
          variant="highlight"
          title="Fast Worldwide Shipping"
          description="We deliver your order in 3-5 business days."
          icon="heroicons:forward-solid"
          bgColor="bg-purple-100"
          iconBg="bg-purple-100"
        />
      </div>
      <div className="!mt-10">
        <CustomerTrust />
      </div>
      <div>
        <TitleBar
          title="Browse More"
          description="Showcase all your products here with descriptions."
          className="!mt-20"
        />
        <MostPopular />
      </div>
    </div>
  );
};
