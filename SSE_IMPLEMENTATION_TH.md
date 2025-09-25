# การใช้งาน Server-Sent Events (SSE) ใน Todo List

## ภาพรวม
เอกสารนี้อธิบายการใช้งาน Server-Sent Events (SSE) เพื่อสร้างฟีเจอร์ real-time ใน Todo List

## Server-Sent Events คืออะไร?
SSE เป็นเทคโนโลยีที่ช่วยให้ server ส่งข้อมูลไปยัง client แบบ real-time ผ่าน HTTP connection เดียว โดยไม่ต้องใช้ WebSocket

## ข้อดีของ SSE
- **ง่ายต่อการใช้งาน**: ใช้ JavaScript EventSource API
- **เบากว่า WebSocket**: เหมาะสำหรับการส่งข้อมูลจาก server ไป client
- **รองรับการเชื่อมต่อใหม่อัตโนมัติ**: Browser จะพยายามเชื่อมต่อใหม่อัตโนมัติ
- **รองรับ CORS**: ใช้งานได้ง่ายกับ cross-origin requests

## การใช้งานในโปรเจค

### 1. Backend Implementation

#### SSE Endpoint
```typescript
// packages/api/src/modules/todos/index.ts
.get('/todos/sse', ({ user, set }) => {
  const userId = user.id;
  
  const stream = new ReadableStream({
    start(controller) {
      // เพิ่มการเชื่อมต่อใหม่
      if (!sseConnections.has(userId)) {
        sseConnections.set(userId, []);
      }
      sseConnections.get(userId)!.push(controller);
      
      // ส่งข้อความยืนยันการเชื่อมต่อ
      controller.enqueue(
        new TextEncoder().encode(
          `data: ${JSON.stringify({ type: "connected" })}\n\n`
        )
      );
    },
    cancel(controller) {
      // ลบการเชื่อมต่อเมื่อ client ปิด
      const connections = sseConnections.get(userId);
      if (connections) {
        const index = connections.indexOf(controller);
        if (index > -1) {
          connections.splice(index, 1);
        }
        if (connections.length === 0) {
          sseConnections.delete(userId);
        }
      }
    },
  });

  // ตั้งค่า headers สำหรับ SSE
  set.headers = {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Cache-Control",
  };

  return new Response(stream);
}, { auth: true })
```

#### การส่งข้อมูลไปยัง Clients
```typescript
// ฟังก์ชันสำหรับส่งข้อมูลไปยัง clients ที่เชื่อมต่ออยู่
const broadcastToUser = (userId: string, data: any) => {
  const connections = sseConnections.get(userId);
  if (connections) {
    const message = `data: ${JSON.stringify(data)}\n\n`;
    connections.forEach((controller) => {
      try {
        controller.enqueue(new TextEncoder().encode(message));
      } catch (error) {
        // ลบการเชื่อมต่อที่ปิดแล้ว
        const index = connections.indexOf(controller);
        if (index > -1) {
          connections.splice(index, 1);
        }
      }
    });
  }
};

// ใช้งานใน API endpoints
.post('/todos', async ({ body, status, user }) => {
  const newTodo = await Todos.createTodos(user.id, body);
  
  // ส่งข้อมูลอัปเดตไปยัง clients
  const todos = await Todos.getUserTodos(user.id);
  broadcastToUser(user.id, { type: "todos_updated", todos });

  return status("OK");
})
```

### 2. Frontend Implementation

#### SSE Hook
```typescript
// apps/web/src/lib/hooks/todos/use-todos-sse.ts
export const useTodosSSE = (enabled: boolean = true) => {
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const eventSourceRef = useRef<EventSource | null>(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!enabled) return;

    const connectSSE = () => {
      try {
        const eventSource = new EventSource("/api/todos/sse");
        eventSourceRef.current = eventSource;

        eventSource.onopen = () => {
          setIsConnected(true);
          setError(null);
        };

        eventSource.onmessage = (event) => {
          try {
            const data: SSEEvent = JSON.parse(event.data);
            
            if (data.type === "connected") {
              console.log("SSE connected");
            } else if (data.type === "todos_updated" && data.todos) {
              // อัปเดต React Query cache
              queryClient.setQueryData(todosQueryKeys.list(), data.todos);
            }
          } catch (err) {
            console.error("Error parsing SSE message:", err);
          }
        };

        eventSource.onerror = (err) => {
          console.error("SSE error:", err);
          setError("Connection error");
          setIsConnected(false);
          
          // พยายามเชื่อมต่อใหม่หลังจาก 3 วินาที
          setTimeout(() => {
            if (eventSourceRef.current?.readyState === EventSource.CLOSED) {
              connectSSE();
            }
          }, 3000);
        };
      } catch (err) {
        console.error("Failed to create SSE connection:", err);
        setError("Failed to connect");
      }
    };

    connectSSE();

    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
        eventSourceRef.current = null;
      }
      setIsConnected(false);
    };
  }, [enabled, queryClient]);

  return { isConnected, error };
};
```

#### การใช้งานใน Component
```typescript
// apps/web/src/components/todo/todo-list.tsx
export const TodoList = ({ hasSession }: TodoListProps) => {
  const { data: todos = [], isLoading } = useGetTodosQuery({
    enabled: hasSession,
  });
  
  const { isConnected, error } = useTodosSSE(!!hasSession);

  return (
    <div className="flex flex-col gap-2">
      {/* แสดงสถานะการเชื่อมต่อ */}
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>Real-time updates</span>
        <div className="flex items-center gap-1">
          {isConnected ? (
            <>
              <Wifi className="h-3 w-3 text-green-500" />
              <span className="text-green-500">Connected</span>
            </>
          ) : (
            <>
              <WifiOff className="h-3 w-3 text-red-500" />
              <span className="text-red-500">{error || "Disconnected"}</span>
            </>
          )}
        </div>
      </div>
      
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
};
```

## การทำงานของ SSE

### 1. การเชื่อมต่อ
1. Client ส่งคำขอ GET ไปยัง `/api/todos/sse`
2. Server สร้าง ReadableStream และส่งกลับ
3. Client ใช้ EventSource API เพื่อรับข้อมูล
4. Server เก็บการเชื่อมต่อไว้ใน Map

### 2. การส่งข้อมูล
1. เมื่อมีการเปลี่ยนแปลงข้อมูล (CRUD operations)
2. Server เรียกใช้ `broadcastToUser()` function
3. ส่งข้อมูลไปยัง clients ที่เชื่อมต่ออยู่
4. Client รับข้อมูลและอัปเดต UI

### 3. การจัดการข้อผิดพลาด
1. หากการเชื่อมต่อขาด
2. Client จะพยายามเชื่อมต่อใหม่อัตโนมัติ
3. Server จะลบการเชื่อมต่อที่ปิดแล้วออกจาก Map

## ข้อดีของการใช้ SSE ในโปรเจคนี้

### 1. Real-time Updates
- การเปลี่ยนแปลงข้อมูลแสดงผลทันที
- ไม่ต้อง refresh หน้าเว็บ
- ประสบการณ์ผู้ใช้ที่ดีขึ้น

### 2. ประสิทธิภาพ
- ใช้ HTTP connection เดียว
- ไม่ต้องใช้ WebSocket ที่ซับซ้อน
- รองรับการเชื่อมต่อใหม่อัตโนมัติ

### 3. ความปลอดภัย
- ใช้ authentication เหมือน API endpoints อื่นๆ
- แต่ละผู้ใช้เห็นเฉพาะข้อมูลของตัวเอง
- รองรับ CORS

### 4. การบำรุงรักษา
- โค้ดง่ายต่อการเข้าใจ
- แยกส่วนชัดเจนระหว่าง backend และ frontend
- ใช้ TypeScript ครบทุกส่วน

## การทดสอบ SSE

### 1. เปิดหลายแท็บ
```bash
# เริ่ม development server
npm run dev

# เปิด http://localhost:3000 ในหลายแท็บ
```

### 2. ทดสอบการอัปเดต
1. เข้าสู่ระบบในทั้งสองแท็บ
2. เพิ่ม todo ในแท็บแรก
3. ดูการอัปเดตในแท็บที่สอง
4. ทดสอบการแก้ไขและลบ

### 3. ทดสอบการเชื่อมต่อ
1. ปิดการเชื่อมต่ออินเทอร์เน็ต
2. ดูการแสดงสถานะ "Disconnected"
3. เปิดการเชื่อมต่อใหม่
4. ดูการเชื่อมต่ออัตโนมัติ

## สรุป
SSE เป็นเทคโนโลยีที่เหมาะสำหรับการสร้างฟีเจอร์ real-time ใน Todo List เพราะ:
- ใช้งานง่าย
- ประสิทธิภาพดี
- รองรับการเชื่อมต่อใหม่อัตโนมัติ
- ปลอดภัยและเชื่อถือได้
