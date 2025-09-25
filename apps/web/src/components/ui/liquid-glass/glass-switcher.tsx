"use client";

import React, { useState, useRef, useEffect } from "react";
import { cn } from "../../../lib/utils";

interface GlassSwitcherProps {
  value?: "light" | "dark" | "dim";
  onChange?: (value: "light" | "dark" | "dim") => void;
  disabled?: boolean;
  className?: string;
  label?: string;
}

const GlassSwitcher: React.FC<GlassSwitcherProps> = ({
  value = "light",
  onChange,
  disabled = false,
  className,
  label,
}) => {
  const [currentValue, setCurrentValue] = useState<"light" | "dark" | "dim">(
    value
  );
  const [previousValue, setPreviousValue] = useState<"light" | "dark" | "dim">(
    value
  );
  const switcherRef = useRef<HTMLFieldSetElement>(null);

  const handleValueChange = (newValue: "light" | "dark" | "dim") => {
    if (disabled) return;
    setPreviousValue(currentValue);
    setCurrentValue(newValue);
    onChange?.(newValue);
  };

  useEffect(() => {
    setCurrentValue(value);
  }, [value]);

  useEffect(() => {
    if (switcherRef.current) {
      switcherRef.current.setAttribute("c-previous", previousValue);
    }
  }, [previousValue]);

  const getOptionNumber = (val: "light" | "dark" | "dim") => {
    switch (val) {
      case "light":
        return "1";
      case "dark":
        return "2";
      case "dim":
        return "3";
      default:
        return "1";
    }
  };

  return (
    <div className={cn("glass-switcher-wrapper", className)}>
      {label && (
        <legend className="glass-switcher-legend text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
          {label}
        </legend>
      )}

      <fieldset
        ref={switcherRef}
        className={cn(
          "switcher relative flex items-center gap-2 w-[244px] h-[70px] p-2 border-none rounded-full",
          "bg-glass backdrop-blur-lg",
          disabled && "opacity-50 cursor-not-allowed"
        )}
        style={{
          background: "color-mix(in srgb, var(--c-glass) 12%, transparent)",
          backdropFilter:
            "blur(8px) url(#switcher) saturate(var(--saturation))",
          WebkitBackdropFilter: "blur(8px) saturate(var(--saturation))",
        }}
      >
        {/* Light Theme Option */}
        <label className="switcher__option flex justify-center items-center p-0 w-[68px] h-full rounded-full cursor-pointer">
          <input
            type="radio"
            name="theme"
            value="light"
            c-option="1"
            checked={currentValue === "light"}
            onChange={() => handleValueChange("light")}
            className="switcher__input"
          />
          <svg
            className="switcher__icon w-full transition-transform duration-200"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 36 36"
            style={{ color: "var(--c)" }}
          >
            <path
              fill="currentColor"
              fillRule="evenodd"
              d="M18 12a6 6 0 1 1 0 12 6 6 0 0 1 0-12Zm0 2a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z"
              clipRule="evenodd"
            />
            <path
              fill="currentColor"
              d="M17 6.038a1 1 0 1 1 2 0v3a1 1 0 0 1-2 0v-3ZM24.244 7.742a1 1 0 1 1 1.618 1.176L24.1 11.345a1 1 0 1 1-1.618-1.176l1.763-2.427ZM29.104 13.379a1 1 0 0 1 .618 1.902l-2.854.927a1 1 0 1 1-.618-1.902l2.854-.927ZM29.722 20.795a1 1 0 0 1-.619 1.902l-2.853-.927a1 1 0 1 1 .618-1.902l2.854.927ZM25.862 27.159a1 1 0 0 1-1.618 1.175l-1.763-2.427a1 1 0 1 1 1.618-1.175l1.763 2.427ZM19 30.038a1 1 0 0 1-2 0v-3a1 1 0 1 1 2 0v3ZM11.755 28.334a1 1 0 0 1-1.618-1.175l1.764-2.427a1 1 0 1 1 1.618 1.175l-1.764 2.427ZM6.896 22.697a1 1 0 1 1-.618-1.902l2.853-.927a1 1 0 1 1 .618 1.902l-2.853.927ZM6.278 15.28a1 1 0 1 1 .618-1.901l2.853.927a1 1 0 1 1-.618 1.902l-2.853-.927ZM10.137 8.918a1 1 0 0 1 1.618-1.176l1.764 2.427a1 1 0 0 1-1.618 1.176l-1.764-2.427Z"
            />
          </svg>
        </label>

        {/* Dark Theme Option */}
        <label className="switcher__option flex justify-center items-center p-0 w-[68px] h-full rounded-full cursor-pointer">
          <input
            type="radio"
            name="theme"
            value="dark"
            c-option="2"
            checked={currentValue === "dark"}
            onChange={() => handleValueChange("dark")}
            className="switcher__input"
          />
          <svg
            className="switcher__icon w-full transition-transform duration-200"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 36 36"
            style={{ color: "var(--c)" }}
          >
            <path
              fill="currentColor"
              d="M12.5 8.473a10.968 10.968 0 0 1 8.785-.97 7.435 7.435 0 0 0-3.737 4.672l-.09.373A7.454 7.454 0 0 0 28.732 20.4a10.97 10.97 0 0 1-5.232 7.125l-.497.27c-5.014 2.566-11.175.916-14.234-3.813l-.295-.483C5.53 18.403 7.13 11.93 12.017 8.77l.483-.297Zm4.234.616a8.946 8.946 0 0 0-2.805.883l-.429.234A9 9 0 0 0 10.206 22.5l.241.395A9 9 0 0 0 22.5 25.794l.416-.255a8.94 8.94 0 0 0 2.167-1.99 9.433 9.433 0 0 1-2.782-.313c-5.043-1.352-8.036-6.535-6.686-11.578l.147-.491c.242-.745.573-1.44.972-2.078Z"
            />
          </svg>
        </label>

        {/* Dim Theme Option */}
        <label className="switcher__option flex justify-center items-center p-0 w-[68px] h-full rounded-full cursor-pointer">
          <input
            type="radio"
            name="theme"
            value="dim"
            c-option="3"
            checked={currentValue === "dim"}
            onChange={() => handleValueChange("dim")}
            className="switcher__input"
          />
          <svg
            className="switcher__icon w-full transition-transform duration-200"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 36 36"
            style={{ color: "var(--c)" }}
          >
            <path
              fill="currentColor"
              d="M5 21a1 1 0 0 1 1-1h24a1 1 0 1 1 0 2H6a1 1 0 0 1-1-1ZM12 25a1 1 0 0 1 1-1h10a1 1 0 1 1 0 2H13a1 1 0 0 1-1-1ZM15 29a1 1 0 0 1 1-1h4a1 1 0 1 1 0 2h-4a1 1 0 0 1-1-1ZM18 13a6 6 0 0 1 5.915 7h-2.041A4.005 4.005 0 0 0 18 15a4 4 0 0 0-3.874 5h-2.041A6 6 0 0 1 18 13ZM17 7.038a1 1 0 1 1 2 0v3a1 1 0 0 1-2 0v-3ZM24.244 8.742a1 1 0 1 1 1.618 1.176L24.1 12.345a1 1 0 1 1-1.618-1.176l1.763-2.427ZM29.104 14.379a1 1 0 0 1 .618 1.902l-2.854.927a1 1 0 1 1-.618-1.902l2.854-.927ZM6.278 16.28a1 1 0 1 1 .618-1.901l2.853.927a1 1 0 1 1-.618 1.902l-2.853-.927ZM10.137 9.918a1 1 0 0 1 1.618-1.176l1.764 2.427a1 1 0 0 1-1.618 1.176l-1.764-2.427Z"
            />
          </svg>
        </label>

        {/* Toggle Background */}
        <div
          className="switcher__toggle absolute left-1 top-1 w-[84px] h-[calc(100%-10px)] rounded-full z-[-1]"
          style={{
            background: "color-mix(in srgb, var(--c-glass) 36%, transparent)",
            transform:
              currentValue === "light"
                ? "translateX(0)"
                : currentValue === "dark"
                ? "translateX(76px)"
                : "translateX(152px)",
            transition: "transform 400ms cubic-bezier(1, 0, 0.4, 1)",
          }}
        />
      </fieldset>
    </div>
  );
};

export default GlassSwitcher;
