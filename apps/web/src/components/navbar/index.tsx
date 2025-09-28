"use client";

import { ClientLoggedIn, ClientLoggedOut } from "~/components/auth";
import { LanguageSwitcher, ToggleThemeButton } from "~/components/ui";
import { Link } from "~/i18n/navigation";
import { NavbarLink } from "./navbar-link";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Menu, X, Sparkles } from "lucide-react";
import { Icons } from "~/components/shared";

export const Navbar = () => {
  const t = useTranslations("Home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Liquid Glass Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/60 to-white/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/40 dark:from-gray-900/80 dark:via-gray-900/60 dark:to-gray-900/80 dark:supports-[backdrop-filter]:bg-gray-900/40" />

      {/* Subtle border with gradient */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gray-200/50 to-transparent dark:via-gray-700/50" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav className="flex h-16 items-center justify-between">
          {/* Logo with iOS-style design */}
          <div className="flex items-center">
            <Link
              className="group flex items-center gap-2 text-xl font-semibold text-gray-900 ios-transition ios-bounce hover:text-gray-700 dark:text-gray-100 dark:hover:text-gray-300 sm:text-2xl"
              href="/"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-[#69c8c6] to-[#c1d72e] shadow-lg shadow-blue-500/25 ios-transition group-hover:shadow-xl group-hover:shadow-blue-500/40 float-animation glow-effect">
                <Icons.logo className="h-4 w-4 text-white" />
              </div>
              <span className="gradient-text from-[#69c8c6] to-[#c1d72e] font-barrio">
                {t("name")}
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-1 md:flex">
            <div className="flex items-center gap-1 rounded-2xl bg-white/50 px-2 py-1 backdrop-blur-sm dark:bg-gray-800/50">
              <LanguageSwitcher />
              <div className="h-4 w-px bg-gray-200 dark:bg-gray-700" />
              <ToggleThemeButton />
            </div>

            <div className="ml-4 flex items-center gap-1">
              <ClientLoggedOut>
                <div className="flex items-center gap-1">
                  <NavbarLink href="/auth/login">Login</NavbarLink>
                  <NavbarLink href="/auth/register">Register</NavbarLink>
                </div>
              </ClientLoggedOut>
              <ClientLoggedIn>
                <NavbarLink href="/account">Account</NavbarLink>
              </ClientLoggedIn>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="flex items-center gap-2 md:hidden">
            <div className="flex items-center gap-1 rounded-2xl bg-white/50 px-2 py-1 backdrop-blur-sm dark:bg-gray-800/50">
              <LanguageSwitcher />
              <div className="h-4 w-px bg-gray-200 dark:bg-gray-700" />
              <ToggleThemeButton />
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex h-9 w-9 items-center justify-center rounded-xl liquid-glass ios-transition ios-bounce hover:scale-105 dark:liquid-glass-dark"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5 text-gray-700 dark:text-gray-300" />
              ) : (
                <Menu className="h-5 w-5 text-gray-700 dark:text-gray-300" />
              )}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="absolute left-0 right-0 top-full mt-2 mx-4 rounded-2xl liquid-glass shadow-2xl shadow-black/10 dark:liquid-glass-dark dark:shadow-black/20 ios-transition">
            <div className="p-4">
              <ClientLoggedOut>
                <div className="flex flex-col gap-2">
                  <NavbarLink href="/auth/login" variant="mobile">
                    Login
                  </NavbarLink>
                  <NavbarLink href="/auth/register" variant="mobile">
                    Register
                  </NavbarLink>
                </div>
              </ClientLoggedOut>
              <ClientLoggedIn>
                <NavbarLink href="/account" variant="mobile">
                  Account
                </NavbarLink>
                <NavbarLink href="/" variant="mobile">
                  Home
                </NavbarLink>
              </ClientLoggedIn>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
