"use client";

import React, { useState, useEffect, useRef } from "react";
import { cn } from "../../../lib/utils";

interface GlassExperimentsProps {
  className?: string;
  backgroundImage?: string;
  enableMouseTracking?: boolean;
  enableDriftAnimation?: boolean;
}

const GlassExperiments: React.FC<GlassExperimentsProps> = ({
  className,
  backgroundImage = "https://assets.codepen.io/443195/carl-raw-8Gdayy2Lhi0-unsplash.jpg",
  enableMouseTracking = true,
  enableDriftAnimation = true,
}) => {
  const [backgroundPosition, setBackgroundPosition] = useState("50% 50%");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enableMouseTracking || !containerRef.current) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 20; // adjust multiplier for intensity
      const y = (e.clientY / innerHeight - 0.5) * 20;

      setBackgroundPosition(`${75 + x}% ${15 + y}%`);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [enableMouseTracking]);

  return (
    <div className={cn("glass-experiments-wrapper", className)}>
      {/* SVG Filter for liquid glass effect */}
      <svg style={{ display: "none" }}>
        <filter
          id="filter"
          colorInterpolationFilters="linearRGB"
          filterUnits="objectBoundingBox"
          primitiveUnits="userSpaceOnUse"
        >
          <feDisplacementMap
            in="SourceGraphic"
            in2="SourceGraphic"
            scale="20"
            xChannelSelector="R"
            yChannelSelector="B"
            x="0%"
            y="0%"
            width="100%"
            height="100%"
            result="displacementMap"
          />
          <feGaussianBlur
            stdDeviation="3 3"
            x="0%"
            y="0%"
            width="100%"
            height="100%"
            in="displacementMap"
            edgeMode="none"
            result="blur"
          />
        </filter>
      </svg>

      <div
        ref={containerRef}
        className={cn(
          "glass-experiments-container absolute grid place-items-center top-0 left-0 right-0 bottom-0",
          enableDriftAnimation && "animate-drift"
        )}
        style={{
          backgroundImage: `url("${backgroundImage}")`,
          backgroundPosition: backgroundPosition,
          backgroundSize: "cover",
        }}
      >
        {/* Simple Blur Button */}
        <button className="lg-btn glass-experiments-btn">Simple blur</button>

        {/* SVG Backdrop Button */}
        <button className="lg-btn gl glass-experiments-btn">
          SVG backdrop
        </button>

        {/* Info Text */}
        <small className="glass-experiments-info">
          Ironically, backdrop-filters with SVGs (url(#filter)) seem not to be
          supported on iOS :)
        </small>
      </div>
    </div>
  );
};

export default GlassExperiments;
