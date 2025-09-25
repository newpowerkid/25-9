import { redirect } from "next/navigation";
import { Providers } from "~/components/utils/providers";
import { getSession } from "~/lib/actions/get-session";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

export default async function Admin({ children }: ProtectedLayoutProps) {
  const session = await getSession();

  // ถ้าไม่ login → เด้งไป login
  if (!session) {
    redirect("/auth/login");
  }

  // ถ้า login แล้วแต่ role ไม่ใช่ Admin → เด้งไปหน้าอื่น (เช่น home)
  if (session.user.role !== "Admin") {
    redirect("/");
  }

  return (
    <div className="relative flex min-h-screen w-full">
      <div className="flex flex-1 flex-col">
        <header className="sticky top-0 z-50 flex h-14 bg-background px-4 lg:h-[60px] xl:px-8">
          The Little gym
        </header>

        <Providers>{children}</Providers>
      </div>
    </div>
  );
}
