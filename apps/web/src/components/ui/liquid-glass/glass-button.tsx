import React from "react";
import { cn } from "../../../lib/utils";

interface GlassButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "default" | "primary" | "secondary" | "success" | "danger";
  size?: "sm" | "md" | "lg";
  className?: string;
  loading?: boolean;
  ripple?: boolean;
  glow?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

const GlassButton: React.FC<GlassButtonProps> = ({
  children,
  variant = "default",
  size = "md",
  className,
  loading = false,
  ripple = true,
  glow = false,
  icon,
  iconPosition = "left",
  disabled,
  ...props
}) => {
  const buttonClasses = cn(
    "glass-button",
    {
      [`glass-button-${variant}`]: variant !== "default",
      "glass-button-sm": size === "sm",
      "glass-button-lg": size === "lg",
      "glass-ripple": ripple,
      "glass-glow": glow,
    },
    className
  );

  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      className={cn(buttonClasses, sizeClasses[size])}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}

      {!loading && icon && iconPosition === "left" && (
        <span className="mr-2">{icon}</span>
      )}

      {children}

      {!loading && icon && iconPosition === "right" && (
        <span className="ml-2">{icon}</span>
      )}
    </button>
  );
};

export default GlassButton;
