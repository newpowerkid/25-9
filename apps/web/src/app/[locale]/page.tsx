import { Footer } from "~/components/footer";
import { Navbar } from "~/components/navbar";
import { TodoListCard } from "~/components/todo/todo-list-card";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { use } from "react";

export default function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  setRequestLocale(locale);
  const t = useTranslations("Home");
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex flex-1 flex-col items-center justify-center gap-8 px-4 py-12 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center space-y-4 max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl lg:text-6xl">
            {t("headline")}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 sm:text-xl max-w-2xl mx-auto">
            {t("subheadline")}
          </p>
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 sm:text-3xl">
            {t("cta")}
          </div>
        </div>

        {/* Todo Card Section */}
        <div className="w-full max-w-2xl">
          <TodoListCard />
        </div>

        {/* Additional Info */}
        <div className="text-center space-y-2">
          <p className="text-sm text-gray-500 dark:text-gray-500">{t("btl")}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            <span>{t("tsb1")}</span>
            <span className="text-blue-600 dark:text-blue-400 font-bold">
              {t("tsb2")}
            </span>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
