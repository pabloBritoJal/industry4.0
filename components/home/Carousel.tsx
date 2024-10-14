"use client";

import { data } from "@data/mockData.js";
import Image from "next/image";
import ChevronLeft from "@assets/icons/chevronLeft.svg";
import ChevronRight from "@assets/icons/chevronRight.svg";
import { useRef } from "react";
import ArticleCard from "./ArticleCard";

const Carousel = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const slideRight = () => {
    console.log(sliderRef.current?.scrollLeft);
    if (sliderRef.current) {
      sliderRef.current.scrollLeft = sliderRef.current.scrollLeft + 500;
    }
  };
  const slideLeft = () => {
    console.log(sliderRef.current?.scrollLeft);
    if (sliderRef.current) {
      sliderRef.current.scrollLeft = sliderRef.current.scrollLeft - 500;
    }
  };
  return (
    <div className="w-full h-auto flex py-14">
      <button
        className="hidden md:block opacity-20 hover:opacity-100 bg-gray-100"
        onClick={slideLeft}
      >
        <ChevronLeft className="w-[40px] h-[40px]" />
      </button>
      <div
        ref={sliderRef}
        className="w-full h-48 gap-6 flex overflow-x-auto overflow-y-hidden scroll-smooth scrollbar-hide"
      >
        {data.map((item) => (
          <ArticleCard
            title={item.title}
            excerpt={item.excerpt}
            author={item.author}
            date={item.date}
            imageUrl={item.imageUrl}
            key={item.id}
          />
        ))}
      </div>
      <button
        className="hidden md:block opacity-20 hover:opacity-100 bg-gray-100"
        onClick={slideRight}
      >
        <ChevronRight className="w-[40px] h-[40px]" />
      </button>
    </div>
  );
};

export default Carousel;
