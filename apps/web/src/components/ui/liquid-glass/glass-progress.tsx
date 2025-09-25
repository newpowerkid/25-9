import React from "react";
import { cn } from "../../../lib/utils";

interface GlassProgressProps {
  value?: number;
  max?: number;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "blue" | "purple" | "green" | "pink" | "orange" | "red";
  className?: string;
  label?: string;
  showPercentage?: boolean;
  animated?: boolean;
  striped?: boolean;
  rounded?: boolean;
}

const GlassProgress: React.FC<GlassProgressProps> = ({
  value = 0,
  max = 100,
  size = "md",
  variant = "default",
  className,
  label,
  showPercentage = true,
  animated = false,
  striped = false,
  rounded = true,
}) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  const sizeClasses = {
    sm: "h-2",
    md: "h-3",
    lg: "h-4",
  };

  const variantClasses = {
    default: "bg-gradient-to-r from-blue-500 to-blue-600",
    blue: "bg-gradient-to-r from-blue-500 to-blue-600",
    purple: "bg-gradient-to-r from-purple-500 to-purple-600",
    green: "bg-gradient-to-r from-green-500 to-green-600",
    pink: "bg-gradient-to-r from-pink-500 to-pink-600",
    orange: "bg-gradient-to-r from-orange-500 to-orange-600",
    red: "bg-gradient-to-r from-red-500 to-red-600",
  };

  const textSizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };

  return (
    <div className={cn("glass-progress-wrapper", className)}>
      {(label || showPercentage) && (
        <div className="glass-progress-header flex justify-between items-center mb-2">
          {label && (
            <span
              className={cn(
                "glass-progress-label font-medium text-gray-700 dark:text-gray-300",
                textSizeClasses[size]
              )}
            >
              {label}
            </span>
          )}
          {showPercentage && (
            <span
              className={cn(
                "glass-progress-percentage font-medium text-gray-700 dark:text-gray-300",
                textSizeClasses[size]
              )}
            >
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      )}

      <div className="glass-progress-container relative">
        {/* Track */}
        <div
          className={cn(
            "glass-progress-track w-full overflow-hidden",
            sizeClasses[size],
            rounded ? "rounded-full" : "rounded",
            "bg-gradient-to-r from-gray-200/30 to-gray-300/30",
            "backdrop-blur-sm border border-white/20",
            "shadow-inner"
          )}
        >
          {/* Progress fill */}
          <div
            className={cn(
              "glass-progress-fill h-full transition-all duration-500 ease-out relative",
              variantClasses[variant],
              rounded ? "rounded-full" : "rounded",
              striped && "glass-progress-striped",
              animated && "glass-progress-animated"
            )}
            style={{ width: `${percentage}%` }}
          >
            {/* Shine effect */}
            <div
              className={cn(
                "absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent",
                "glass-progress-shine",
                animated && "glass-progress-shine-animated"
              )}
            />

            {/* Inner glow */}
            <div
              className={cn(
                "absolute inset-0 bg-gradient-to-b from-white/20 to-transparent",
                rounded ? "rounded-full" : "rounded"
              )}
            />
          </div>
        </div>

        {/* Glow effect */}
        <div
          className={cn(
            "glass-progress-glow absolute inset-0 opacity-0 transition-opacity duration-300",
            "bg-gradient-to-r from-white/10 to-transparent blur-sm",
            rounded ? "rounded-full" : "rounded",
            percentage > 0 && "opacity-100"
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default GlassProgress;
