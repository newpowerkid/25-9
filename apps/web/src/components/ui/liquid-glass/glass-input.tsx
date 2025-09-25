"use client";

import React, { forwardRef, useId } from "react";
import { cn } from "../../../lib/utils";

interface GlassInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  error?: string;
  helperText?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  variant?: "default" | "clear";
  size?: "sm" | "md" | "lg";
  className?: string;
}

const GlassInput = forwardRef<HTMLInputElement, GlassInputProps>(
  (
    {
      label,
      error,
      helperText,
      icon,
      iconPosition = "left",
      variant = "default",
      size = "md",
      className,
      id,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = id || `glass-input-${generatedId}`;

    const inputClasses = cn(
      "glass-input",
      {
        "glass-clear": variant === "clear",
        "glass-input-sm": size === "sm",
        "glass-input-lg": size === "lg",
        "glass-input-error": error,
        "glass-input-with-icon-left": icon && iconPosition === "left",
        "glass-input-with-icon-right": icon && iconPosition === "right",
      },
      className
    );

    const sizeClasses = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2 text-base",
      lg: "px-6 py-3 text-lg",
    };

    return (
      <div className="glass-input-wrapper">
        {label && (
          <label htmlFor={inputId} className="glass-input-label">
            {label}
          </label>
        )}

        <div className="glass-input-container">
          {icon && iconPosition === "left" && (
            <span className="glass-input-icon glass-input-icon-left">
              {icon}
            </span>
          )}

          <input
            ref={ref}
            id={inputId}
            className={cn(inputClasses, sizeClasses[size])}
            {...props}
          />

          {icon && iconPosition === "right" && (
            <span className="glass-input-icon glass-input-icon-right">
              {icon}
            </span>
          )}
        </div>

        {error && <span className="glass-input-error-text">{error}</span>}

        {helperText && !error && (
          <span className="glass-input-helper-text">{helperText}</span>
        )}
      </div>
    );
  }
);

GlassInput.displayName = "GlassInput";

export default GlassInput;
