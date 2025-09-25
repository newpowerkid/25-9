# Todo List แบบ Real-time ด้วย Server-Sent Events (SSE)

## ภาพรวม
โปรเจคนี้เป็น Todo List ที่มีฟีเจอร์ real-time โดยใช้ Server-Sent Events (SSE) เพื่อให้การอัปเดต todo แสดงผลทันทีในทุกหน้าจอที่เปิดอยู่

## ฟีเจอร์หลัก
- ✅ **การอัปเดตแบบ Real-time**: เมื่อมีการเพิ่ม แก้ไข หรือลบ todo ในหน้าจอหนึ่ง จะแสดงผลทันทีในหน้าจออื่นๆ ที่เปิดอยู่
- 📡 **แสดงสถานะการเชื่อมต่อ**: มีไอคอนแสดงสถานะการเชื่อมต่อ SSE (เขียว = เชื่อมต่อ, แดง = ไม่เชื่อมต่อ)
- 🔄 **การเชื่อมต่ออัตโนมัติ**: หากการเชื่อมต่อขาด จะพยายามเชื่อมต่อใหม่อัตโนมัติ
- 🔒 **เฉพาะผู้ใช้**: ผู้ใช้แต่ละคนจะเห็นเฉพาะ todo ของตัวเองเท่านั้น
- 🎨 **UI สวยงาม**: ใช้ Tailwind CSS และ shadcn/ui components

## เทคโนโลยีที่ใช้

### Backend
- **Elysia**: Web framework สำหรับ Node.js
- **Drizzle ORM**: Object-Relational Mapping
- **PostgreSQL**: ฐานข้อมูล
- **TypeScript**: ภาษาโปรแกรม

### Frontend
- **Next.js**: React framework
- **React Query**: State management และ caching
- **Tailwind CSS**: CSS framework
- **shadcn/ui**: UI components
- **TypeScript**: ภาษาโปรแกรม

## วิธีการติดตั้งและรัน

### 1. ติดตั้ง Dependencies
```bash
# ติดตั้ง dependencies ทั้งหมด
npm install

# หรือใช้ bun
bun install
```

### 2. ตั้งค่าฐานข้อมูล
```bash
# สร้าง migration
npm run db:push

# เปิด Drizzle Studio (optional)
npm run db:studio
```

### 3. เริ่ม Development Server
```bash
# เริ่ม server ทั้งหมด
npm run dev

# หรือเริ่มเฉพาะ web app
cd apps/web
npm run dev
```

### 4. เปิดเบราว์เซอร์
```
http://localhost:3000
```

## วิธีการใช้งาน

### 1. เข้าสู่ระบบ
- ใช้ Google OAuth หรือ LINE OAuth
- ระบบจะสร้างบัญชีผู้ใช้อัตโนมัติ

### 2. สร้าง Todo
- พิมพ์ข้อความในช่อง "Add a new todo..."
- กดปุ่ม "Add" หรือ Enter
- Todo จะแสดงในรายการทันที

### 3. แก้ไข Todo
- คลิกที่ checkbox เพื่อทำเครื่องหมายเสร็จ/ไม่เสร็จ
- การเปลี่ยนแปลงจะแสดงผลทันที

### 4. ลบ Todo
- คลิกปุ่ม "Delete" ข้าง todo
- Todo จะถูกลบทันที

### 5. ดูการอัปเดตแบบ Real-time
- เปิดแอปในหลายแท็บ/หน้าต่าง
- เข้าสู่ระบบด้วยบัญชีเดียวกัน
- ทำการเปลี่ยนแปลงในแท็บหนึ่ง
- ดูการอัปเดตในแท็บอื่นๆ

## โครงสร้างโปรเจค

```
├── apps/
│   └── web/                    # Next.js web application
│       ├── src/
│       │   ├── app/            # App Router pages
│       │   ├── components/     # React components
│       │   └── lib/            # Utilities และ hooks
├── packages/
│   ├── api/                    # Elysia API server
│   ├── auth/                   # Authentication utilities
│   └── db/                     # Database schema และ migrations
└── tooling/                    # TypeScript configuration
```

## ไฟล์สำคัญ

### Backend
- `packages/api/src/modules/todos/index.ts` - API endpoints และ SSE
- `packages/api/src/modules/todos/service.ts` - Database operations
- `packages/db/src/schemas/todos.schema.ts` - Database schema

### Frontend
- `apps/web/src/components/todo/todo-list-card.tsx` - Component หลัก
- `apps/web/src/lib/hooks/todos/use-todos-sse.ts` - SSE hook
- `apps/web/src/lib/hooks/todos/` - React Query hooks

## การทดสอบ

### 1. ทดสอบการอัปเดตแบบ Real-time
1. เปิดแอปใน 2 แท็บ
2. เข้าสู่ระบบด้วยบัญชีเดียวกัน
3. เพิ่ม todo ในแท็บแรก
4. ดูการอัปเดตในแท็บที่สอง

### 2. ทดสอบการเชื่อมต่อ
1. ดูไอคอนสถานะการเชื่อมต่อ
2. เขียว = เชื่อมต่อ, แดง = ไม่เชื่อมต่อ
3. ทดสอบการเชื่อมต่อใหม่อัตโนมัติ

### 3. ทดสอบการทำงานของ API
```bash
# ทดสอบ health check
curl http://localhost:3000/api/health

# ทดสอบ SSE endpoint (ต้องมี authentication)
curl http://localhost:3000/api/todos/sse
```

## การพัฒนาต่อ

### 1. เพิ่มฟีเจอร์ใหม่
- กำหนดวันที่เสร็จ
- หมวดหมู่ todo
- การแชร์ todo กับผู้อื่น

### 2. ปรับปรุง UI/UX
- Dark mode
- การจัดเรียง todo
- การค้นหา todo

### 3. เพิ่มการทดสอบ
- Unit tests
- Integration tests
- E2E tests

## เอกสารเพิ่มเติม

- [คู่มือการสร้าง Todo ตั้งแต่เริ่มต้น](TODO_CREATION_GUIDE_TH.md)
- [การใช้งาน Server-Sent Events (SSE)](SSE_IMPLEMENTATION_TH.md)
- [Real-time Todo List (English)](REALTIME_TODOS.md)

## การแก้ไขปัญหา

### 1. การเชื่อมต่อ SSE ไม่ทำงาน
- ตรวจสอบ authentication
- ดู console logs ในเบราว์เซอร์
- ตรวจสอบ network tab

### 2. การอัปเดตไม่แสดงผล
- ตรวจสอบสถานะการเชื่อมต่อ
- ดู React Query DevTools
- ตรวจสอบ API responses

### 3. ข้อผิดพลาดในการ build
- ตรวจสอบ TypeScript errors
- รัน `npm run typecheck`
- ตรวจสอบ dependencies

## License
MIT License

## ผู้พัฒนา
สร้างด้วย ❤️ โดยใช้ modern web technologies
