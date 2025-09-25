import { useEffect, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { scheduleQueryKeys } from "./query-keys";
import type { Schedule } from "./get-schedules.query";

interface SSEEvent {
    type: "connected" | "schedules_updated";
    schedules?: Schedule[];
}

export const useSchedulesSSE = (enabled: boolean = true) => {
    const [isConnected, setIsConnected] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const eventSourceRef = useRef<EventSource | null>(null);
    const queryClient = useQueryClient();

    useEffect(() => {
        if (!enabled) return;

        const connectSSE = () => {
            try {
                const eventSource = new EventSource("/api/schedules/sse");
                eventSourceRef.current = eventSource;

                eventSource.onopen = () => {
                    setIsConnected(true);
                    setError(null);
                };

                eventSource.onmessage = (event) => {
                    try {
                        const data: SSEEvent = JSON.parse(event.data);

                        if (data.type === "connected") {
                            console.log("Schedules SSE connected");
                        } else if (data.type === "schedules_updated" && data.schedules) {
                            // Update the React Query cache with the new schedules
                            queryClient.setQueryData(scheduleQueryKeys.list(), data.schedules);
                        }
                    } catch (err) {
                        console.error("Error parsing SSE message:", err);
                    }
                };

                eventSource.onerror = (err) => {
                    console.error("Schedules SSE error:", err);
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
                console.error("Failed to create schedules SSE connection:", err);
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