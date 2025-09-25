"use client";

import { Loader2, Wifi, WifiOff } from "lucide-react";
import { useGetTodosQuery, useTodosSSE } from "~/lib/hooks/todos";
import { TodoItem } from "./todo-item";

interface TodoListProps {
  hasSession?: boolean;
}

export const TodoList = ({ hasSession }: TodoListProps) => {
  const { data: todos = [], isLoading } = useGetTodosQuery({
    enabled: hasSession,
  });

  const { isConnected, error } = useTodosSSE(!!hasSession);

  if (isLoading) {
    return (
      <div className="mx-auto">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  if (todos.length === 0) {
    return;
  }

  return (
    <div className="flex flex-col gap-2">
      {/* Connection status indicator */}
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
