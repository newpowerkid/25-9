"use client";

import React, { useState, useRef, useEffect } from "react";
import { cn } from "../../../lib/utils";

interface GlassSliderProps {
  value?: number;
  min?: number;
  max?: number;
  step?: number;
  onChange?: (value: number) => void;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "blue" | "purple" | "green" | "pink";
  className?: string;
  label?: string;
  showValue?: boolean;
  marks?: number[];
}

const GlassSlider: React.FC<GlassSliderProps> = ({
  value = 50,
  min = 0,
  max = 100,
  step = 1,
  onChange,
  disabled = false,
  size = "md",
  variant = "default",
  className,
  label,
  showValue = true,
  marks = [],
}) => {
  const [currentValue, setCurrentValue] = useState(value);
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCurrentValue(value);
  }, [value]);

  const sizeClasses = {
    sm: "h-2",
    md: "h-3",
    lg: "h-4",
  };

  const thumbSizeClasses = {
    sm: "w-11 h-7",
    md: "w-[65px] h-[42px]",
    lg: "w-[80px] h-[52px]",
  };

  const variantClasses = {
    default: "bg-blue-500",
    blue: "bg-blue-500",
    purple: "bg-purple-500",
    green: "bg-green-500",
    pink: "bg-pink-500",
  };

  const percentage = ((currentValue - min) / (max - min)) * 100;
  const [thumbPx, setThumbPx] = useState<number | null>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (disabled) return;
    setIsDragging(true);
    // update rect so it's accurate when starting drag
    handleValueChange(e.clientX);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    handleValueChange(e.clientX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleValueChange = (clientX: number) => {
    if (!sliderRef.current) return;

    const rect = sliderRef.current.getBoundingClientRect();
    const percent = Math.max(
      0,
      Math.min(100, ((clientX - rect.left) / rect.width) * 100)
    );
    const px = (percent / 100) * rect.width;
    const newValue = Math.round((percent / 100) * (max - min) + min);
    const steppedValue = Math.round(newValue / step) * step;

    const clampedValue = Math.max(min, Math.min(max, steppedValue));
    setCurrentValue(clampedValue);
    setThumbPx(px);
    onChange?.(clampedValue);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging]);

  useEffect(() => {
    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;
      const touch = e.touches && e.touches[0];
      if (!touch) return;
      handleValueChange(touch.clientX);
    };

    const handleTouchEnd = () => setIsDragging(false);

    if (isDragging) {
      document.addEventListener("touchmove", handleTouchMove);
      document.addEventListener("touchend", handleTouchEnd);
    }

    return () => {
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isDragging]);

  useEffect(() => {
    const onResize = () => {
      if (!sliderRef.current) return;
      // recompute thumb position in px for current percentage
      const rect = sliderRef.current.getBoundingClientRect();
      setThumbPx(((currentValue - min) / (max - min)) * rect.width || null);
    };

    window.addEventListener("resize", onResize);
    onResize();
    return () => window.removeEventListener("resize", onResize);
  }, [currentValue, min, max]);

  return (
    <div className={cn("glass-slider-wrapper", className)}>
      {(label || showValue) && (
        <div className="glass-slider-header flex justify-between items-center mb-2">
          {label && (
            <label className="glass-slider-label text-sm font-medium text-gray-700 dark:text-gray-300">
              {label}
            </label>
          )}
          {showValue && (
            <span className="glass-slider-value text-sm font-medium text-gray-700 dark:text-gray-300">
              {currentValue}
            </span>
          )}
        </div>
      )}

      <div className="glass-slider-container relative">
        {/* Track */}
        <div
          ref={sliderRef}
          className={cn(
            "glass-slider-track relative w-full rounded-full cursor-pointer",
            sizeClasses[size],
            "bg-gradient-to-r from-gray-200/50 to-gray-300/50",
            "backdrop-blur-sm border border-white/20",
            "shadow-inner",
            disabled && "opacity-50 cursor-not-allowed"
          )}
          onMouseDown={(e) => {
            // clicking the track jumps the thumb but does not start dragging
            if (disabled) return;
            handleValueChange((e as React.MouseEvent).clientX);
          }}
          onTouchStart={(e) => {
            if (disabled) return;
            const touchEvent = e as unknown as TouchEvent;
            const touch = touchEvent.touches && touchEvent.touches[0];
            if (touch) handleValueChange(touch.clientX);
          }}
        >
          {/* Progress fill */}
          <div
            className={cn(
              "glass-slider-fill absolute left-0 top-0 h-full rounded-full transition-all duration-200 ease-out",
              variantClasses[variant],
              "bg-gradient-to-r from-white/20 to-transparent"
            )}
            style={{ width: `${percentage}%` }}
          />

          {/* Marks */}
          {marks.map((mark) => (
            <div
              key={mark}
              className="absolute top-1/2 transform -translate-y-1/2 w-1 h-1 bg-white/40 rounded-full"
              style={{ left: `${((mark - min) / (max - min)) * 100}%` }}
            />
          ))}
        </div>

        {/* Thumb */}
        <div
          ref={thumbRef}
          onMouseDown={(e) => {
            if (disabled) return;
            e.stopPropagation();
            setIsDragging(true);
            handleValueChange((e as React.MouseEvent).clientX);
          }}
          onTouchStart={(e) => {
            if (disabled) return;
            e.stopPropagation();
            setIsDragging(true);
            const touchEvent = e as unknown as TouchEvent;
            const touch = touchEvent.touches && touchEvent.touches[0];
            if (touch) handleValueChange(touch.clientX);
          }}
          className={cn(
            "glass-slider-thumb absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2",
            "rounded-full cursor-pointer transition-all duration-200 ease-out",
            // make outer shell transparent to reveal inner glass thumb
            "bg-transparent backdrop-blur-none border-none",
            "shadow-lg shadow-black/20",
            thumbSizeClasses[size],
            isDragging && "scale-110 shadow-xl",
            disabled && "cursor-not-allowed"
          )}
          style={{ left: thumbPx !== null ? `${thumbPx}px` : `${percentage}%` }}
        >
          <div
            className={cn(
              "slider-thumb-glass relative w-full h-full rounded-full overflow-hidden",
              isDragging && "active"
            )}
          >
            <div className="slider-thumb-glass-filter absolute inset-0 bg-gradient-to-br from-white/60 to-transparent" />
            <div className="slider-thumb-glass-overlay absolute inset-0 mix-blend-overlay" />
            <div className="slider-thumb-glass-specular absolute top-0 left-0 w-1/2 h-1/2 bg-white/40 blur-sm opacity-80" />
          </div>
        </div>

        {/* Ripple effect */}
        {isDragging && (
          <div
            className={cn(
              "glass-slider-ripple absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2",
              "rounded-full bg-white/30 scale-0 animate-ping",
              size === "sm"
                ? "w-6 h-6"
                : size === "md"
                ? "w-8 h-8"
                : "w-10 h-10"
            )}
            style={{
              left: thumbPx !== null ? `${thumbPx}px` : `${percentage}%`,
            }}
          />
        )}
      </div>
    </div>
  );
};

export default GlassSlider;
