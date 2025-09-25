import React from "react";
import { cn } from "../../../lib/utils";

interface GlassLiquidEffectProps {
  children: React.ReactNode;
  className?: string;
  variant?: "menu" | "dock" | "button";
  href?: string;
  onClick?: () => void;
}

const GlassLiquidEffect: React.FC<GlassLiquidEffectProps> = ({
  children,
  className,
  variant = "button",
  href,
  onClick,
}) => {
  const content = (
    <>
      {/* SVG Filter for glass distortion */}
      <svg style={{ display: "none" }}>
        <filter
          id="glass-distortion"
          x="0%"
          y="0%"
          width="100%"
          height="100%"
          filterUnits="objectBoundingBox"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.01 0.01"
            numOctaves="1"
            seed="5"
            result="turbulence"
          />
          <feComponentTransfer in="turbulence" result="mapped">
            <feFuncR type="gamma" amplitude="1" exponent="10" offset="0.5" />
            <feFuncG type="gamma" amplitude="0" exponent="1" offset="0" />
            <feFuncB type="gamma" amplitude="0" exponent="1" offset="0.5" />
          </feComponentTransfer>
          <feGaussianBlur in="turbulence" stdDeviation="3" result="softMap" />
          <feSpecularLighting
            in="softMap"
            surfaceScale="5"
            specularConstant="1"
            specularExponent="100"
            lightingColor="white"
            result="specLight"
          >
            <fePointLight x="-200" y="-200" z="300" />
          </feSpecularLighting>
          <feComposite
            in="specLight"
            operator="arithmetic"
            k1="0"
            k2="1"
            k3="1"
            k4="0"
            result="litImage"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="softMap"
            scale="150"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>

      <div
        className={cn("liquidGlass-wrapper", variant, className)}
        onClick={onClick}
      >
        {/* Glass Effect Layer */}
        <div className="liquidGlass-effect" />

        {/* Tint Layer */}
        <div className="liquidGlass-tint" />

        {/* Shine Layer */}
        <div className="liquidGlass-shine" />

        {/* Content Layer */}
        <div className="liquidGlass-text">{children}</div>
      </div>
    </>
  );

  if (href) {
    return (
      <a href={href} className="no-underline">
        {content}
      </a>
    );
  }

  return content;
};

export default GlassLiquidEffect;
