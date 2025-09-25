import { useEffect, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { todosQueryKeys } from "./query-keys";
import type { Todo } from "./get-todos.query";

interface SSEEvent {
  type: "connected" | "todos_updated";
  todos?: Todo[];
}

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
              // Update the React Query cache with the new todos
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

          // Attempt to reconnect after 3 seconds
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
