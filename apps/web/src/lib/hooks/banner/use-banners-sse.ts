import { useEffect, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { bannerQueryKeys } from "./query-keys";
import type { Banner } from "./get-banners.query";

interface SSEEvent {
    type: "connected" | "banners_updated";
    banners?: Banner[];
}

export const useBannersSSE = (enabled: boolean = true) => {
    const [isConnected, setIsConnected] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const eventSourceRef = useRef<EventSource | null>(null);
    const queryClient = useQueryClient();

    useEffect(() => {
        if (!enabled) return;

        const connectSSE = () => {
            try {
                const eventSource = new EventSource("/api/banners/sse");
                eventSourceRef.current = eventSource;

                eventSource.onopen = () => {
                    setIsConnected(true);
                    setError(null);
                };

                eventSource.onmessage = (event) => {
                    try {
                        const data: SSEEvent = JSON.parse(event.data);

                        if (data.type === "connected") {
                            console.log("Banners SSE connected");
                        } else if (data.type === "banners_updated" && data.banners) {
                            // Update the React Query cache with the new banners
                            queryClient.setQueryData(bannerQueryKeys.list(), data.banners);
                        }
                    } catch (err) {
                        console.error("Error parsing SSE message:", err);
                    }
                };

                eventSource.onerror = (err) => {
                    console.error("Banners SSE error:", err);
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
                console.error("Failed to create banners SSE connection:", err);
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