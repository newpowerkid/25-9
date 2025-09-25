import React from "react";
import { cn } from "../../../lib/utils";

interface GlassRadioProps {
  name: string;
  value: string;
  checked?: boolean;
  onChange?: (value: string) => void;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "blue" | "purple" | "green" | "pink";
  className?: string;
  label?: string;
}

const GlassRadio: React.FC<GlassRadioProps> = ({
  name,
  value,
  checked = false,
  onChange,
  disabled = false,
  size = "md",
  variant = "default",
  className,
  label,
}) => {
  const handleChange = () => {
    if (disabled) return;
    onChange?.(value);
  };

  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  const dotSizeClasses = {
    sm: "w-1.5 h-1.5",
    md: "w-2 h-2",
    lg: "w-2.5 h-2.5",
  };

  const variantClasses = {
    default: checked ? "border-blue-500" : "border-gray-400",
    blue: checked ? "border-blue-500" : "border-gray-400",
    purple: checked ? "border-purple-500" : "border-gray-400",
    green: checked ? "border-green-500" : "border-gray-400",
    pink: checked ? "border-pink-500" : "border-gray-400",
  };

  const dotVariantClasses = {
    default: "bg-blue-500",
    blue: "bg-blue-500",
    purple: "bg-purple-500",
    green: "bg-green-500",
    pink: "bg-pink-500",
  };

  return (
    <div className={cn("glass-radio-wrapper", className)}>
      <div className="glass-radio-container flex items-center gap-3">
        <div
          className={cn(
            "glass-radio relative inline-flex cursor-pointer items-center justify-center rounded-full transition-all duration-300 ease-in-out",
            sizeClasses[size],
            "border-2",
            variantClasses[variant],
            "bg-white/10 backdrop-blur-md",
            "shadow-inner",
            disabled && "opacity-50 cursor-not-allowed"
          )}
          onClick={handleChange}
        >
          {/* Background with glass effect */}
          <div
            className={cn(
              "glass-radio-bg absolute inset-0 rounded-full backdrop-blur-md",
              "bg-gradient-to-br from-white/10 to-white/5"
            )}
          />

          {/* Dot when checked */}
          {checked && (
            <div
              className={cn(
                "glass-radio-dot relative z-10 rounded-full transition-all duration-300 ease-in-out",
                dotSizeClasses[size],
                dotVariantClasses[variant],
                "shadow-lg"
              )}
            >
              {/* Inner glow */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/50 to-transparent" />
            </div>
          )}

          {/* Ripple effect */}
          <div
            className={cn(
              "glass-radio-ripple absolute inset-0 rounded-full pointer-events-none",
              "bg-white/20 scale-0 opacity-0 transition-all duration-300",
              checked && "scale-100 opacity-100"
            )}
          />
        </div>

        {label && (
          <label
            className="glass-radio-label text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer"
            onClick={handleChange}
          >
            {label}
          </label>
        )}
      </div>
    </div>
  );
};

export default GlassRadio;
