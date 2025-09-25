// app/admin/page.tsx
import { redirect } from "next/navigation";
import { getSession } from "~/lib/actions/get-session";

export default async function AdminPage() {
  // ดึง session
  const session = await getSession();

  // ถ้าไม่ได้ login → ไปหน้า login
  if (!session) redirect("/auth/login");

  // ถ้า login แต่ไม่ใช่ Admin → ไปหน้า home
  if (session.user.role !== "Admin") redirect("/");

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        <p className="text-gray-600">ยินดีต้อนรับ {session.user.name}</p>
      </header>

      <main className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* ตัวอย่าง Card */}
        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="text-xl font-semibold">Users</h2>
          <p className="text-gray-500 mt-2">จัดการข้อมูลผู้ใช้งาน</p>
        </div>

        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="text-xl font-semibold">Bookings</h2>
          <p className="text-gray-500 mt-2">ตรวจสอบการจองทั้งหมด</p>
        </div>

        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="text-xl font-semibold">Reports</h2>
          <p className="text-gray-500 mt-2">ดูรายงานและสถิติ</p>
        </div>
      </main>
    </div>
  );
}
