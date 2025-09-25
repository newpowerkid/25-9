import { NextIntlClientProvider, hasLocale } from "next-intl";

import { Providers } from "~/components/utils/providers";
import routing from "~/i18n/routing";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{ children: React.ReactNode; params: { locale: string } }>) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <NextIntlClientProvider>
      <Providers>{children}</Providers>
    </NextIntlClientProvider>
  );
}
