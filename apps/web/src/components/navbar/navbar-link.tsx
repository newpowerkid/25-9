"use client";

import { ArrowRight, ChevronRight } from "lucide-react";
import type { Route } from "next";
import { usePathname } from "~/i18n/navigation";
import { Link } from "~/i18n/navigation";
import { cn } from "~/lib/utils";

interface NavbarLinkProps {
  children: React.ReactNode;
  href: Route;
  variant?: "default" | "mobile";
}

export const NavbarLink = ({
  children,
  href,
  variant = "default",
}: NavbarLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  if (isActive) {
    return null;
  }

  if (variant === "mobile") {
    return (
      <Link
        href={href}
        className="group flex w-full items-center justify-between rounded-xl bg-white/40 px-4 py-3 text-sm font-medium text-gray-700 transition-all duration-200 hover:bg-white/60 hover:shadow-md dark:bg-gray-800/40 dark:text-gray-300 dark:hover:bg-gray-800/60"
      >
        <span>{children}</span>
        <ChevronRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className="group relative flex items-center gap-1.5 rounded-xl bg-white/40 px-4 py-2 text-sm font-medium text-gray-700 transition-all duration-200 hover:bg-white/60 hover:shadow-lg hover:shadow-black/5 dark:bg-gray-800/40 dark:text-gray-300 dark:hover:bg-gray-800/60 dark:hover:shadow-black/20"
    >
      <span className="relative z-10">{children}</span>
      <ArrowRight className="h-3.5 w-3.5 transition-all duration-200 group-hover:translate-x-0.5 group-hover:scale-110" />

      {/* Subtle glow effect */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
    </Link>
  );
};
