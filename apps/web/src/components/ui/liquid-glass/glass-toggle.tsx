"use client";

import React, { useState, useEffect } from "react";
import { cn } from "../../../lib/utils";

interface GlassToggleProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "blue" | "purple" | "green" | "pink" | "orange" | "red";
  className?: string;
  label?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  showIcon?: boolean;
  morphing?: boolean;
  liquidEffect?: boolean;
}

const GlassToggle: React.FC<GlassToggleProps> = ({
  checked = false,
  onChange,
  disabled = false,
  size = "md",
  variant = "default",
  className,
  label,
  icon,
  iconPosition = "left",
  showIcon = true,
  morphing = true,
  liquidEffect = true,
}) => {
  const [isChecked, setIsChecked] = useState(checked);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  const handleToggle = () => {
    if (disabled || isAnimating) return;

    setIsAnimating(true);
    const newChecked = !isChecked;
    setIsChecked(newChecked);
    onChange?.(newChecked);

    // Reset animation state after transition
    setTimeout(() => setIsAnimating(false), 300);
  };

  const sizeClasses = {
    sm: "w-10 h-6",
    md: "w-12 h-7",
    lg: "w-14 h-8",
  };

  const thumbSizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  const iconSizeClasses = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  };

  const translateClasses = {
    sm: isChecked ? "translate-x-4" : "translate-x-0.5",
    md: isChecked ? "translate-x-5" : "translate-x-0.5",
    lg: isChecked ? "translate-x-6" : "translate-x-0.5",
  };

  const variantClasses = {
    default: isChecked
      ? "bg-gradient-to-r from-blue-500 to-blue-600"
      : "bg-gradient-to-r from-gray-400 to-gray-500",
    blue: isChecked
      ? "bg-gradient-to-r from-blue-500 to-blue-600"
      : "bg-gradient-to-r from-gray-400 to-gray-500",
    purple: isChecked
      ? "bg-gradient-to-r from-purple-500 to-purple-600"
      : "bg-gradient-to-r from-gray-400 to-gray-500",
    green: isChecked
      ? "bg-gradient-to-r from-green-500 to-green-600"
      : "bg-gradient-to-r from-gray-400 to-gray-500",
    pink: isChecked
      ? "bg-gradient-to-r from-pink-500 to-pink-600"
      : "bg-gradient-to-r from-gray-400 to-gray-500",
    orange: isChecked
      ? "bg-gradient-to-r from-orange-500 to-orange-600"
      : "bg-gradient-to-r from-gray-400 to-gray-500",
    red: isChecked
      ? "bg-gradient-to-r from-red-500 to-red-600"
      : "bg-gradient-to-r from-gray-400 to-gray-500",
  };

  return (
    <div className={cn("glass-toggle-wrapper", className)}>
      <div className="glass-toggle-container flex items-center gap-3">
        {icon && iconPosition === "left" && (
          <div className={cn("glass-toggle-icon", iconSizeClasses[size])}>
            {icon}
          </div>
        )}

        {label && (
          <label className="glass-toggle-label text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer select-none">
            {label}
          </label>
        )}

        <div
          className={cn(
            "glass-toggle relative inline-flex cursor-pointer items-center rounded-full transition-all duration-500 ease-out",
            sizeClasses[size],
            variantClasses[variant],
            disabled && "opacity-50 cursor-not-allowed",
            morphing && "hover:scale-105 active:scale-95",
            liquidEffect && "overflow-hidden"
          )}
          onClick={handleToggle}
          style={{
            background: isChecked
              ? `linear-gradient(135deg, ${
                  variant === "default"
                    ? "#3b82f6"
                    : variant === "blue"
                    ? "#3b82f6"
                    : variant === "purple"
                    ? "#8b5cf6"
                    : variant === "green"
                    ? "#10b981"
                    : variant === "pink"
                    ? "#ec4899"
                    : variant === "orange"
                    ? "#f97316"
                    : "#ef4444"
                }, ${
                  variant === "default"
                    ? "#1d4ed8"
                    : variant === "blue"
                    ? "#1d4ed8"
                    : variant === "purple"
                    ? "#7c3aed"
                    : variant === "green"
                    ? "#059669"
                    : variant === "pink"
                    ? "#db2777"
                    : variant === "orange"
                    ? "#ea580c"
                    : "#dc2626"
                })`
              : "linear-gradient(135deg, #9ca3af, #6b7280)",
          }}
        >
          {/* Liquid glass background with morphing */}
          <div
            className={cn(
              "glass-toggle-bg absolute inset-0 rounded-full",
              "backdrop-blur-xl border border-white/30",
              "bg-gradient-to-br from-white/20 via-white/10 to-white/5",
              "shadow-inner shadow-black/10",
              liquidEffect && "transition-all duration-500 ease-out"
            )}
            style={{
              background: isChecked
                ? "linear-gradient(135deg, rgba(255,255,255,0.3), rgba(255,255,255,0.1), rgba(255,255,255,0.05))"
                : "linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.1), rgba(255,255,255,0.05))",
            }}
          />

          {/* Liquid morphing effect */}
          {liquidEffect && (
            <div
              className={cn(
                "glass-toggle-liquid absolute inset-0 rounded-full",
                "bg-gradient-to-r from-transparent via-white/20 to-transparent",
                "transition-all duration-700 ease-out",
                isChecked
                  ? "translate-x-full opacity-0"
                  : "-translate-x-full opacity-100"
              )}
            />
          )}

          {/* Thumb with advanced glass effect */}
          <div
            className={cn(
              "glass-toggle-thumb relative z-20 rounded-full transition-all duration-500 ease-out",
              "bg-white/95 backdrop-blur-sm border border-white/40",
              "shadow-xl shadow-black/25 flex items-center justify-center",
              "hover:shadow-2xl hover:shadow-black/30",
              thumbSizeClasses[size],
              translateClasses[size],
              morphing && "hover:scale-110 active:scale-95"
            )}
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.95), rgba(255,255,255,0.85))",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
            }}
          >
            {/* Thumb inner liquid glow */}
            <div
              className="absolute inset-0 rounded-full bg-gradient-to-br from-white/60 via-white/20 to-transparent"
              style={{
                background:
                  "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8), transparent 70%)",
              }}
            />

            {/* Thumb outer glow ring */}
            <div
              className="absolute -inset-1 rounded-full opacity-0 transition-opacity duration-300"
              style={{
                background: isChecked
                  ? `conic-gradient(from 0deg, ${
                      variant === "default"
                        ? "#3b82f6"
                        : variant === "blue"
                        ? "#3b82f6"
                        : variant === "purple"
                        ? "#8b5cf6"
                        : variant === "green"
                        ? "#10b981"
                        : variant === "pink"
                        ? "#ec4899"
                        : variant === "orange"
                        ? "#f97316"
                        : "#ef4444"
                    }, transparent, ${
                      variant === "default"
                        ? "#3b82f6"
                        : variant === "blue"
                        ? "#3b82f6"
                        : variant === "purple"
                        ? "#8b5cf6"
                        : variant === "green"
                        ? "#10b981"
                        : variant === "pink"
                        ? "#ec4899"
                        : variant === "orange"
                        ? "#f97316"
                        : "#ef4444"
                    })`
                  : "conic-gradient(from 0deg, #9ca3af, transparent, #9ca3af)",
                opacity: isChecked ? 0.3 : 0,
              }}
            />

            {/* Check icon with liquid animation */}
            {isChecked && showIcon && (
              <svg
                className={cn(
                  "text-white drop-shadow-lg relative z-10 transition-all duration-300 ease-out",
                  iconSizeClasses[size],
                  "animate-pulse"
                )}
                fill="currentColor"
                viewBox="0 0 20 20"
                style={{
                  filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.3))",
                }}
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            )}

            {/* Liquid ripple effect */}
            {liquidEffect && (
              <div
                className={cn(
                  "glass-toggle-ripple absolute inset-0 rounded-full pointer-events-none",
                  "bg-white/30 scale-0 opacity-0 transition-all duration-500 ease-out",
                  isChecked && "scale-150 opacity-100"
                )}
                style={{
                  background:
                    "radial-gradient(circle, rgba(255,255,255,0.4), transparent 70%)",
                }}
              />
            )}
          </div>

          {/* Background liquid wave effect */}
          {liquidEffect && (
            <div
              className={cn(
                "glass-toggle-wave absolute inset-0 rounded-full pointer-events-none",
                "bg-gradient-to-r from-transparent via-white/10 to-transparent",
                "transition-all duration-1000 ease-out",
                isChecked
                  ? "translate-x-full opacity-0"
                  : "-translate-x-full opacity-100"
              )}
            />
          )}

          {/* Outer glow effect */}
          <div
            className={cn(
              "glass-toggle-glow absolute -inset-2 rounded-full pointer-events-none",
              "transition-all duration-500 ease-out",
              isChecked ? "opacity-100" : "opacity-0"
            )}
            style={{
              background: isChecked
                ? `radial-gradient(circle, ${
                    variant === "default"
                      ? "rgba(59, 130, 246, 0.3)"
                      : variant === "blue"
                      ? "rgba(59, 130, 246, 0.3)"
                      : variant === "purple"
                      ? "rgba(139, 92, 246, 0.3)"
                      : variant === "green"
                      ? "rgba(16, 185, 129, 0.3)"
                      : variant === "pink"
                      ? "rgba(236, 72, 153, 0.3)"
                      : variant === "orange"
                      ? "rgba(249, 115, 22, 0.3)"
                      : "rgba(239, 68, 68, 0.3)"
                  }, transparent 70%)`
                : "transparent",
            }}
          />
        </div>

        {icon && iconPosition === "right" && (
          <div className={cn("glass-toggle-icon", iconSizeClasses[size])}>
            {icon}
          </div>
        )}
      </div>
    </div>
  );
};

export default GlassToggle;
