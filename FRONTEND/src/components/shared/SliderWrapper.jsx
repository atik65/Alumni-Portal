"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useEffect, useRef } from "react";
import { register } from "swiper/element/bundle";

register();

const SliderWrapper = ({
  // slide,
  slideFor,
  noOfSlide,
  showAllBtn = false,
  data = [],
  isLoading = false,
  children,
}) => {
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
      effect: slideFor === "home_ebypSquare" ? "coverflow" : "slide",
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
  }, [data, noOfSlide, slideFor]);

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
        <RootContainerForSlider data={data}>{children}</RootContainerForSlider>
      </swiper-container>

      {/* next and prev button */}
      {showAllBtn && (
        <div className="flex justify-between items-center h-10 mt-8">
          {swiperInstance && (
            <div className={`w-20 md:w-28 lg:w-40  border-[#D1D5DB] border-b `}>
              <button
                // disabled={isBeginning}
                className="disabled:opacity-50 opacity-100"
                onClick={handlePrev}
              >
                PREV
              </button>
            </div>
          )}

          {swiperInstance && showAllBtn && (
            <Link className="text-[#EFD95A] text-sm" href="/properties">
              Show all
            </Link>
          )}

          {swiperInstance && (
            <div
              className={`w-20 md:w-28 lg:w-40  border-b border-[#D1D5DB] flex justify-end `}
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

export default SliderWrapper;

export const RootContainerForSlider = ({ data, children }) => {
  return (
    <>
      {data?.map((item) => {
        return <swiper-slide key={item}>{children(item)}</swiper-slide>;
      })}
    </>
  );
};

// <SliderWrapper data={[1, 2, 3, 4, 5]} noOfSlide={4}>
//   {/* this is render props approach to get data from where the children is called */}
//   {(data) => <RoundSlideCard data={data} />}
// </SliderWrapper>;
