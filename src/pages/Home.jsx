import React from "react";
import { MostPopular } from "../components/MostPopular";
import { CustomerTrust } from "../components/CustomerTrust";
import { TitleBar } from "../components/TittleBar";
import { Collections } from "../components/Collections";
import { VideoBanner } from "../components/VideoBanner";
import { Highlights } from "../components/Highlights";
import BlogSection from "../components/BlogSection";

export const Home = () => {
  return (
    <div className="flex flex-col">
      <TitleBar />
      <MostPopular />
      <CustomerTrust />
      <TitleBar
        title="Our Collections"
        description="Showcase all your products here with descriptions."
        className="!mt-20"
      />
      <Collections />
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
  );
};
