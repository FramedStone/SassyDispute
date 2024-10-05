"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

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
      {/* Scrolling logos */}
      <div className="inline-block animate-marquee">
        {Array(14)
          .fill("/logo-no-background.png")
          .map((logo, index) => (
            <div key={index} className="inline-block mx-4 w-24 h-24 relative">
              <Image
                src={logo}
                alt="Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          ))}
      </div>
      <div className="inline-block animate-marquee">
        {Array(14)
          .fill("/logo-no-background.png")
          .map((logo, index) => (
            <div key={index} className="inline-block mx-4 w-24 h-24 relative">
              <Image
                src={logo}
                alt="Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          ))}
      </div>
    </div>
  );
}
