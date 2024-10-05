"use client";

import { useEffect, useRef } from "react";

export default function TitleAutoscrolling() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (scrollElement) {
      const scroll = () => {
        if (scrollElement.scrollLeft >= scrollElement.scrollWidth / 2) {
          scrollElement.scrollLeft = 0;
        } else {
          scrollElement.scrollLeft += 1;
        }
      };
      const intervalId = setInterval(scroll, 30);
      return () => clearInterval(intervalId);
    }
  }, []);

  return (
    <div
      ref={scrollRef}
      className="overflow-hidden whitespace-nowrap border border-t-0 border-r-0 border-l-0 text-white py-2"
    >
      <div className="inline-block animate-marquee">
        {Array(14)
          .fill("LOGOHERE")
          .map((logo, index) => (
            <span key={index} className="mx-4">
              {logo}
            </span>
          ))}
      </div>
      <div className="inline-block animate-marquee">
        {Array(14)
          .fill("LOGOHERE")
          .map((logo, index) => (
            <span key={index} className="mx-4">
              {logo}
            </span>
          ))}
      </div>
    </div>
  );
}
