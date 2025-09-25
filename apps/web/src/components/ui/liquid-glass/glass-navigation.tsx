import React from "react";
import { cn } from "../../../lib/utils";

interface NavigationItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  active?: boolean;
}

interface GlassNavigationProps {
  items: NavigationItem[];
  onItemClick: (item: NavigationItem) => void;
  className?: string;
  variant?: "horizontal" | "vertical";
  size?: "sm" | "md" | "lg";
}

const GlassNavigation: React.FC<GlassNavigationProps> = ({
  items,
  onItemClick,
  className,
  variant = "horizontal",
  size = "md",
}) => {
  const navClasses = cn(
    "glass-nav",
    {
      "glass-nav-vertical": variant === "vertical",
      "glass-nav-sm": size === "sm",
      "glass-nav-lg": size === "lg",
    },
    className
  );

  return (
    <nav className={navClasses}>
      {items.map((item) => (
        <button
          key={item.id}
          className={cn("glass-nav-item", {
            active: item.active,
          })}
          onClick={() => onItemClick(item)}
        >
          {item.icon && <span className="mr-2">{item.icon}</span>}
          {item.label}
        </button>
      ))}
    </nav>
  );
};

export default GlassNavigation;
