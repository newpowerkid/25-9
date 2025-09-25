import React from "react";
import { cn } from "../../../lib/utils";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: "default" | "clear" | "tinted";
  tint?: "blue" | "purple" | "pink" | "orange" | "green";
  className?: string;
  title?: string;
  subtitle?: string;
  hover?: boolean;
  floating?: boolean;
  glow?: boolean;
}

const GlassCard: React.FC<GlassCardProps> = ({
  children,
  variant = "default",
  tint,
  className,
  title,
  subtitle,
  hover = true,
  floating = false,
  glow = false,
  ...props
}) => {
  const cardClasses = cn(
    "glass-card",
    {
      "glass-clear": variant === "clear",
      [`glass-tinted-${tint}`]: tint,
      "glass-morph": hover,
      "glass-float": floating,
      "glass-glow": glow,
    },
    className
  );

  return (
    <div className={cardClasses} {...props}>
      {(title || subtitle) && (
        <div className="glass-card-header">
          {title && <h3 className="glass-card-title">{title}</h3>}
          {subtitle && <p className="glass-card-subtitle">{subtitle}</p>}
        </div>
      )}
      {children}
    </div>
  );
};

export default GlassCard;
