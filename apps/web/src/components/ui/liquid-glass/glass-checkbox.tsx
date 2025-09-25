"use client";

import React, { useState } from "react";
import { cn } from "../../../lib/utils";

interface GlassCheckboxProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "blue" | "purple" | "green" | "pink";
  className?: string;
  label?: string;
  indeterminate?: boolean;
}

const GlassCheckbox: React.FC<GlassCheckboxProps> = ({
  checked = false,
  onChange,
  disabled = false,
  size = "md",
  variant = "default",
  className,
  label,
  indeterminate = false,
}) => {
  const [isChecked, setIsChecked] = useState(checked);

  const handleToggle = () => {
    if (disabled) return;
    const newChecked = !isChecked;
    setIsChecked(newChecked);
    onChange?.(newChecked);
  };

  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  const iconSizeClasses = {
    sm: "w-2.5 h-2.5",
    md: "w-3 h-3",
    lg: "w-4 h-4",
  };

  const variantClasses = {
    default: isChecked ? "bg-blue-500" : "bg-gray-400",
    blue: isChecked ? "bg-blue-500" : "bg-gray-400",
    purple: isChecked ? "bg-purple-500" : "bg-gray-400",
    green: isChecked ? "bg-green-500" : "bg-gray-400",
    pink: isChecked ? "bg-pink-500" : "bg-gray-400",
  };

  const displayChecked = indeterminate || isChecked;

  return (
    <div className={cn("glass-checkbox-wrapper", className)}>
      <div className="glass-checkbox-container flex items-center gap-3">
        <div
          className={cn(
            "glass-checkbox relative inline-flex cursor-pointer items-center justify-center rounded transition-all duration-300 ease-in-out",
            sizeClasses[size],
            variantClasses[variant],
            disabled && "opacity-50 cursor-not-allowed"
          )}
          onClick={handleToggle}
        >
          {/* Background with glass effect */}
          <div
            className={cn(
              "glass-checkbox-bg absolute inset-0 rounded backdrop-blur-md border border-white/20",
              "bg-gradient-to-br from-white/10 to-white/5",
              "shadow-inner"
            )}
          />

          {/* Check icon */}
          {displayChecked && (
            <div className="glass-checkbox-icon relative z-10 flex items-center justify-center">
              {indeterminate ? (
                <svg
                  className={cn(
                    "text-white drop-shadow-sm",
                    iconSizeClasses[size]
                  )}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  className={cn(
                    "text-white drop-shadow-sm",
                    iconSizeClasses[size]
                  )}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </div>
          )}

          {/* Inner glow when checked */}
          {displayChecked && (
            <div className="absolute inset-0 rounded bg-gradient-to-br from-white/30 to-transparent" />
          )}

          {/* Ripple effect */}
          <div
            className={cn(
              "glass-checkbox-ripple absolute inset-0 rounded pointer-events-none",
              "bg-white/20 scale-0 opacity-0 transition-all duration-300",
              displayChecked && "scale-100 opacity-100"
            )}
          />
        </div>

        {label && (
          <label
            className="glass-checkbox-label text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer"
            onClick={handleToggle}
          >
            {label}
          </label>
        )}
      </div>
    </div>
  );
};

export default GlassCheckbox;
