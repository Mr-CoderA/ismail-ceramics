import React from "react";
import { MostPopular } from "../components/MostPopular";
import { CustomerTrust } from "../components/CustomerTrust";
import { TitleBar } from "../components/TittleBar";
import { CollectionsTray } from "../components/CollectionsTray";
import { VideoBanner } from "../components/VideoBanner";
import { Highlights } from "../components/Highlights";
import BlogSection from "../components/BlogSection";
import BG from "../assets/bg.mp4";
import Button from "../components/Button";
import { Icon } from "@iconify/react/dist/iconify.js";
import Text from "../components/Text";

const OverlayContent = () => (
  <div className="absolute inset-0 flex flex-col justify-center px-[55px]">
    {/* Top right buttons */}
    <div className="absolute left-0 w-full top-0 !m-0 flex justify-end !p-4">
      <Button variant="secondary" className="max-[830px]:hidden">
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

export const Home = () => {
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
        <OverlayContent />
      </div>
      <div className="flex flex-col">
        <TitleBar />
        <MostPopular />
        <CustomerTrust />
        <TitleBar
          title="Our Collections"
          description="Showcase all your products here with descriptions."
          className="!mt-20"
        />
        <CollectionsTray />
        <VideoBanner />
        <Highlights />
        <TitleBar
          title="Explore the blog"
          description="Share insights, boost SEO and build trust with your audience."
          className="!mt-20 !mb-10"
          buttonText="View Posts"
        />
        <BlogSection />
      </div>
    </>
  );
};
