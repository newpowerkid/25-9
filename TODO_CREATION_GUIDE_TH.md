# คู่มือการสร้าง Todo ตั้งแต่เริ่มต้น

## ภาพรวม
คู่มือนี้จะอธิบายการสร้างระบบ Todo List ตั้งแต่เริ่มต้น รวมถึงการเพิ่มฟีเจอร์ real-time ด้วย Server-Sent Events (SSE)

## ไฟล์ที่เกี่ยวข้องทั้งหมด

### 1. Database Schema
**ไฟล์**: `packages/db/src/schemas/todos.schema.ts`
```typescript
// กำหนดโครงสร้างตาราง todos ในฐานข้อมูล
export const todos = pgTable("todos", {
  id: text("id").primaryKey().$defaultFn(() => nanoid()),
  userId: text("user_id").notNull(),
  title: text("title").notNull(),
  completed: boolean("completed").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
```

### 2. Database Service
**ไฟล์**: `packages/api/src/modules/todos/service.ts`
```typescript
// ฟังก์ชันสำหรับจัดการข้อมูล todos ในฐานข้อมูล
export const Todos = {
  getUserTodos: async (userId: string) => { /* ดึง todos ของผู้ใช้ */ },
  getTodo: async (todoId: string) => { /* ดึง todo ตาม ID */ },
  createTodos: async (userId: string, todo: createTodo) => { /* สร้าง todo ใหม่ */ },
  updateTodo: async (todoId: string, todo: updateTodo) => { /* อัปเดต todo */ },
  deleteTodo: async (todoId: string) => { /* ลบ todo */ },
};
```

### 3. API Models
**ไฟล์**: `packages/api/src/modules/todos/models.ts`
```typescript
// กำหนดโครงสร้างข้อมูลสำหรับ API
export const createTodo = t.Object({
  title: t.String({ minLength: 1 }),
  completed: t.Optional(t.Boolean()),
});

export const updateTodo = t.Object({
  title: t.Optional(t.String({ minLength: 1 })),
  completed: t.Optional(t.Boolean()),
});
```

### 4. API Routes (รวม SSE)
**ไฟล์**: `packages/api/src/modules/todos/index.ts`
```typescript
// กำหนด API endpoints
export const todosRouter = new Elysia()
  .get('/todos', ({ user }) => Todos.getUserTodos(user.id), { auth: true })
  .get('/todos/sse', ({ user, set }) => { /* SSE endpoint */ }, { auth: true })
  .post('/todos', async ({ body, status, user }) => { /* สร้าง todo */ }, { auth: true, body: createTodo })
  .patch('/todos/:id', async ({ body, params, status, user }) => { /* อัปเดต todo */ }, { auth: true, body: updateTodo, params: t.Object({ id: t.String() }) })
  .delete('/todos/:id', async ({ params, status, user }) => { /* ลบ todo */ }, { auth: true, params: t.Object({ id: t.String() }) });
```

### 5. React Query Hooks
**ไฟล์**: `apps/web/src/lib/hooks/todos/get-todos.query.ts`
```typescript
// Hook สำหรับดึงข้อมูล todos
export const useGetTodosQuery = (options: { enabled?: boolean } = {}) => {
  return useQuery({ ...todosOptions, ...options });
};
```

**ไฟล์**: `apps/web/src/lib/hooks/todos/create-todo.mutation.ts`
```typescript
// Hook สำหรับสร้าง todo ใหม่
export const useCreateTodoMutation = () => {
  return useMutation({
    mutationFn: async (data: createTodo) => {
      const { error } = await api.todos.post(data);
      if (error) throw new Error('Failed to create todo');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: todosQueryKeys.list() });
    },
  });
};
```

**ไฟล์**: `apps/web/src/lib/hooks/todos/update-todo.mutation.ts`
```typescript
// Hook สำหรับอัปเดต todo
export const useUpdateTodoMutation = () => {
  return useMutation({
    mutationFn: async ({ id, ...data }: updateTodo & { id: string }) => {
      const { error } = await api.todos({ id }).patch(data);
      if (error) throw new Error('Failed to update todo');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: todosQueryKeys.list() });
    },
  });
};
```

**ไฟล์**: `apps/web/src/lib/hooks/todos/delete-todo.mutation.ts`
```typescript
// Hook สำหรับลบ todo
export const useDeleteTodoMutation = () => {
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await api.todos({ id }).delete();
      if (error) throw new Error('Failed to delete todo');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: todosQueryKeys.list() });
    },
  });
};
```

### 6. SSE Hook (Real-time)
**ไฟล์**: `apps/web/src/lib/hooks/todos/use-todos-sse.ts`
```typescript
// Hook สำหรับจัดการการเชื่อมต่อ SSE
export const useTodosSSE = (enabled: boolean = true) => {
  // จัดการการเชื่อมต่อ SSE และการอัปเดต cache
  return { isConnected, error };
};
```

### 7. React Components
**ไฟล์**: `apps/web/src/components/todo/todo-list-card.tsx`
```typescript
// Component หลักสำหรับแสดง Todo List
export const TodoListCard = async () => {
  const session = await getSession();
  return (
    <Card>
      <AddTodoForm disabled={!session} />
      <TodoList hasSession={!!session} />
    </Card>
  );
};
```

**ไฟล์**: `apps/web/src/components/todo/todo-list.tsx`
```typescript
// Component สำหรับแสดงรายการ todos พร้อมสถานะ SSE
export const TodoList = ({ hasSession }: TodoListProps) => {
  const { data: todos = [], isLoading } = useGetTodosQuery({ enabled: hasSession });
  const { isConnected, error } = useTodosSSE(!!hasSession);
  
  return (
    <div>
      {/* แสดงสถานะการเชื่อมต่อ SSE */}
      <div>Real-time updates: {isConnected ? 'Connected' : 'Disconnected'}</div>
      {todos.map((todo) => <TodoItem key={todo.id} todo={todo} />)}
    </div>
  );
};
```

**ไฟล์**: `apps/web/src/components/todo/todo-item.tsx`
```typescript
// Component สำหรับแสดง todo แต่ละรายการ
export const TodoItem = ({ todo }: { todo: Todo }) => {
  const updateMutation = useUpdateTodoMutation();
  const deleteMutation = useDeleteTodoMutation();
  
  return (
    <div>
      <Checkbox checked={todo.completed} onChange={handleToggle} />
      <span>{todo.title}</span>
      <Button onClick={handleDelete}>Delete</Button>
    </div>
  );
};
```

**ไฟล์**: `apps/web/src/components/todo/add-todo-form.tsx`
```typescript
// Component สำหรับเพิ่ม todo ใหม่
export const AddTodoForm = ({ disabled }: { disabled?: boolean }) => {
  const createMutation = useCreateTodoMutation();
  
  return (
    <form onSubmit={handleSubmit}>
      <Input placeholder="Add a new todo..." />
      <Button type="submit" disabled={disabled}>Add</Button>
    </form>
  );
};
```

### 8. API Client
**ไฟล์**: `apps/web/src/lib/treaty.ts`
```typescript
// สร้าง API client สำหรับเรียกใช้ API
export const api = treaty<App>('/api');
```

### 9. Main App
**ไฟล์**: `apps/web/src/app/page.tsx`
```typescript
// หน้าหลักของแอป
export default function HomePage() {
  return (
    <div>
      <Navbar />
      <main>
        <TodoListCard />
      </main>
      <Footer />
    </div>
  );
}
```

## ขั้นตอนการสร้าง Todo List

### 1. ตั้งค่าฐานข้อมูล
1. สร้าง schema ใน `packages/db/src/schemas/todos.schema.ts`
2. ตั้งค่า migration สำหรับสร้างตาราง

### 2. สร้าง API Backend
1. สร้าง service functions ใน `packages/api/src/modules/todos/service.ts`
2. กำหนด models ใน `packages/api/src/modules/todos/models.ts`
3. สร้าง API routes ใน `packages/api/src/modules/todos/index.ts`

### 3. สร้าง Frontend
1. สร้าง React Query hooks สำหรับ CRUD operations
2. สร้าง React components สำหรับ UI
3. เชื่อมต่อกับ API ผ่าน treaty client

### 4. เพิ่มฟีเจอร์ Real-time
1. เพิ่ม SSE endpoint ใน API
2. สร้าง useTodosSSE hook
3. อัปเดต components เพื่อแสดงสถานะการเชื่อมต่อ

### 5. การทดสอบ
1. เริ่ม development server
2. เปิดหลายแท็บในเบราว์เซอร์
3. ทดสอบการสร้าง แก้ไข และลบ todos
4. ตรวจสอบการอัปเดตแบบ real-time

## ข้อดีของโครงสร้างนี้
- **แยกส่วนชัดเจน**: Backend และ Frontend แยกกันชัดเจน
- **Type Safety**: ใช้ TypeScript ครบทุกส่วน
- **Real-time**: มีการอัปเดตแบบ real-time
- **Scalable**: สามารถขยายฟีเจอร์ได้ง่าย
- **Maintainable**: โค้ดอ่านง่ายและบำรุงรักษาง่าย
