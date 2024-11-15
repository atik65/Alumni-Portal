"use client";
import Link from "next/link";
import { useState } from "react";
import { useEffect, useRef } from "react";
import { register } from "swiper/element/bundle";

import { homeBannerData } from "../home/assets/data";
import { ReviewCard } from "../home/assets/Reviews";

import { HomeBannerSlide } from "../home/assets/HomeBannerSlide";
import FleetCard from "@/components/shared/FleetCard";
import BlogCard from "./BlogCard";

register();

const SliderContainer = ({
  slide,
  noOfSlide,
  showAllBtn = false,
  data = [],
  isLoading = false,
}) => {
  const SlideComponent = slide;
  const swiperRef = useRef(null);
  // let swiperInstance = null;
  const [swiperInstance, setSwiperInstance] = useState(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  useEffect(() => {
    const swiperContainer = swiperRef.current;
    const params = {
      // navigation: true,
      // pagination: true,
      // slidesPerView: 1,
      loop: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      effect: slide === "homeBanner" ? "fade" : "slide",
      spaceBetween: 30,
      breakpoints: {
        100: {
          slidesPerView: 1,
        },
        640: {
          // slidesPerView: noOfSlide > 2 ? noOfSlide - 2 : noOfSlide,
          slidesPerView: noOfSlide == 1 ? noOfSlide : 1,
        },
        768: {
          // slidesPerView: noOfSlide > 2 ? noOfSlide - 2 : noOfSlide,
          slidesPerView: noOfSlide == 1 ? noOfSlide : 2,
        },
        1024: {
          // slidesPerView: noOfSlide > 3 ? noOfSlide - 2 : noOfSlide,
          slidesPerView: noOfSlide == 1 ? noOfSlide : 2,
        },
        1280: {
          slidesPerView: noOfSlide > 3 ? noOfSlide - 1 : noOfSlide,
        },

        1440: {
          slidesPerView: noOfSlide,
          //   slidesPerView: 4,
        },
      },
    };

    Object.assign(swiperContainer, params);
    swiperContainer.initialize();
    // swiperEl = document.querySelector("swiper-container");
    // swiperInstance = swiperContainer.swiper;
    setSwiperInstance(swiperContainer.swiper);
    // console.log(swiperContainer.swiper);
  }, [data, noOfSlide, slide]);

  const handleNext = () => {
    swiperInstance?.slideNext();

    const swiperContainer = swiperRef.current;
    setIsBeginning(swiperContainer.swiper.isBeginning);
    setIsEnd(swiperContainer.swiper.isEnd);
  };

  const handlePrev = () => {
    swiperInstance?.slidePrev();

    const swiperContainer = swiperRef.current;
    setIsBeginning(swiperContainer.swiper.isBeginning);
    setIsEnd(swiperContainer.swiper.isEnd);
  };

  return (
    <div className="w-full">
      <swiper-container ref={swiperRef} init="false">
        {/* for homepage banner section */}
        {slide === "homeBanner" &&
          homeBannerData.map((banner) => {
            return (
              <swiper-slide className="blue-slide w-[100vw]" key={banner.id}>
                {slide === "homeBanner" && <HomeBannerSlide banner={banner} />}
              </swiper-slide>
            );
          })}

        {/* for homepage fleet section */}
        {slide === "homeFleet" &&
          !isLoading &&
          data?.map((fleet, i) => {
            return (
              <swiper-slide className="blue-slide" key={fleet?.id}>
                {slide === "homeFleet" && (
                  <FleetCard
                    fromIndex={true}
                    showLink={true}
                    index={i}
                    fleet={fleet}
                  />
                )}
              </swiper-slide>
            );
          })}

        {/* for homepage reviews section */}
        {slide === "homeReview" &&
          !isLoading &&
          data?.map((review, i) => {
            return (
              <swiper-slide className="blue-slide h-full" key={review?.id}>
                {slide === "homeReview" && <ReviewCard review={review} />}
              </swiper-slide>
            );
          })}

        {/* for homepage blogs section */}
        {slide === "homeBlogs" &&
          !isLoading &&
          data?.map((blog, i) => {
            return (
              <swiper-slide className=" h-full" key={blog?.id}>
                {slide === "homeBlogs" && <BlogCard blog={blog} />}
              </swiper-slide>
            );
          })}
      </swiper-container>

      {/* next and prev button */}
      {showAllBtn && (
        <div className="flex justify-between items-center h-10 mt-8">
          {swiperInstance && (
            <div
              // className={`w-20 md:w-28 lg:w-40  border-[#D1D5DB] border-b ${
              //   isBeginning && " opacity-40"
              // }`}
              className={`w-20 md:w-28 lg:w-40  border-[#D1D5DB] border-b `}
            >
              <button
                // disabled={isBeginning}
                className="disabled:opacity-50 opacity-100"
                onClick={handlePrev}
              >
                PREV
              </button>
            </div>
          )}
          {swiperInstance && slide !== "reviews" && showAllBtn && (
            <Link className="text-[#EFD95A] text-sm" href="/properties">
              Show all
            </Link>
          )}

          {swiperInstance && (
            <div
              className={`w-20 md:w-28 lg:w-40  border-b border-[#D1D5DB] flex justify-end `}
              // className={`w-20 md:w-28 lg:w-40  border-b border-[#D1D5DB] flex justify-end ${
              //   isEnd && "opacity-40"
              // }`}
            >
              <button
                // disabled={isEnd}
                className="disabled:opacity-50"
                onClick={handleNext}
              >
                NEXT
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SliderContainer;
