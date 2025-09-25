"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "~/i18n/navigation";

const languages = [
  { code: "en", flag: "🇺🇸" },
  { code: "th", flag: "🇹🇭" },
];

export const LanguageSwitcher = () => {
  const [isOpen, setIsOpen] = useState(false);
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const currentLanguage = languages.find((lang) => lang.code === locale);

  const handleLanguageChange = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100/80 backdrop-blur-sm transition-all duration-200 hover:bg-gray-200/80 hover:scale-105 active:scale-95 dark:bg-gray-800/80 dark:hover:bg-gray-700/80 sm:h-9 sm:w-9"
      >
        <span className="text-base sm:text-lg">{currentLanguage?.flag}</span>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-full z-20 mt-2 space-y-1 rounded-2xl bg-white/90 backdrop-blur-xl p-1.5 shadow-xl border border-gray-200/20 dark:bg-gray-900/90 dark:border-gray-700/20">
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => handleLanguageChange(language.code)}
                className={`flex h-9 w-9 items-center justify-center rounded-xl text-lg transition-all duration-200 hover:scale-105 active:scale-95 ${
                  locale === language.code
                    ? "bg-blue-500 text-white shadow-lg"
                    : "hover:bg-gray-100/80 dark:hover:bg-gray-800/80"
                }`}
              >
                {language.flag}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
