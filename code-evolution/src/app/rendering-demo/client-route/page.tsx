"use client";

import Slider from "react-slick";
import { useTheme } from "@/components/theme-provider";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { clientSideFunction } from "@/utils/client-utils";

export default function ClientRoutePage() {
  const theme = useTheme();
  const settings = {
    dots: true,
  };
  const result = clientSideFunction();

  return (
    <div className="image-slider-container">
      <h1 style={{ color: theme.colors.primary }}>Client Router Page</h1>
      <p>{result}</p>

      <Slider {...settings}>
        <div>
          <img src="https://picsum.photos/400/200" />
        </div>
        <div>
          <img src="https://picsum.photos/400/200" />
        </div>
        <div>
          <img src="https://picsum.photos/400/200" />
        </div>
        <div>
          <img src="https://picsum.photos/400/200" />
        </div>
      </Slider>
    </div>
  );
}
