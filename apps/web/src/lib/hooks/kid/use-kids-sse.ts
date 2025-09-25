import { useEffect, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { kidQueryKeys } from "./query-keys";
import type { Kid, UserKid } from "./get-kids.query";

interface SSEEvent {
    type: "connected" | "kids_updated" | "user_kids_updated";
    kids?: Kid[];
    userKids?: UserKid[];
}

export const useKidsSSE = (enabled: boolean = true) => {
    const [isConnected, setIsConnected] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const eventSourceRef = useRef<EventSource | null>(null);
    const queryClient = useQueryClient();

    useEffect(() => {
        if (!enabled) return;

        const connectSSE = () => {
            try {
                const eventSource = new EventSource("/api/kids/sse");
                eventSourceRef.current = eventSource;

                eventSource.onopen = () => {
                    setIsConnected(true);
                    setError(null);
                };

                eventSource.onmessage = (event) => {
                    try {
                        const data: SSEEvent = JSON.parse(event.data);

                        if (data.type === "connected") {
                            console.log("Kids SSE connected");
                        } else if (data.type === "kids_updated" && data.kids) {
                            // Update the React Query cache with the new kids
                            queryClient.setQueryData(kidQueryKeys.list(), data.kids);
                        } else if (data.type === "user_kids_updated" && data.userKids) {
                            // Update the React Query cache with the new user kids
                            queryClient.setQueryData(kidQueryKeys.userKids(), data.userKids);
                        }
                    } catch (err) {
                        console.error("Error parsing SSE message:", err);
                    }
                };

                eventSource.onerror = (err) => {
                    console.error("Kids SSE error:", err);
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
                console.error("Failed to create kids SSE connection:", err);
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