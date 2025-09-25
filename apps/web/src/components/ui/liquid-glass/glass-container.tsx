import React from "react";
import { cn } from "../../../lib/utils";

interface GlassContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: "default" | "clear" | "tinted";
  tint?: "blue" | "purple" | "pink" | "orange" | "green";
  size?: "sm" | "md" | "lg";
  className?: string;
  padding?: boolean;
  margin?: boolean;
  rounded?: "sm" | "md" | "lg" | "xl";
  hover?: boolean;
  floating?: boolean;
  glow?: boolean;
  morph?: boolean;
}

const GlassContainer: React.FC<GlassContainerProps> = ({
  children,
  variant = "default",
  tint,
  size = "md",
  className,
  padding = true,
  margin = false,
  rounded = "md",
  hover = false,
  floating = false,
  glow = false,
  morph = false,
  ...props
}) => {
  const containerClasses = cn(
    "glass",
    {
      "glass-clear": variant === "clear",
      [`glass-tinted-${tint}`]: tint,
      "glass-morph": morph || hover,
      "glass-float": floating,
      "glass-glow": glow,
    },
    className
  );

  const paddingClasses = {
    sm: padding ? "glass-p-1" : "",
    md: padding ? "glass-p-2" : "",
    lg: padding ? "glass-p-3" : "",
  };

  const marginClasses = margin ? "glass-m-2" : "";

  const roundedClasses = {
    sm: "glass-rounded-sm",
    md: "glass-rounded-md",
    lg: "glass-rounded-lg",
    xl: "glass-rounded-xl",
  };

  return (
    <div
      className={cn(
        containerClasses,
        paddingClasses[size],
        marginClasses,
        roundedClasses[rounded]
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default GlassContainer;
