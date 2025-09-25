import { useEffect, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { billQueryKeys } from "./query-keys";
import type { Bill, BillPrice, BillBooking } from "./get-bills.query";

interface SSEEvent {
    type: "connected" | "bills_updated" | "bill_prices_updated" | "bill_bookings_updated" | "bill_price_deleted" | "bill_booking_deleted";
    bills?: Bill[];
    billPrices?: BillPrice[];
    billBookings?: BillBooking[];
    billId?: string;
    priceId?: string;
    bookingId?: string;
}

export const useBillsSSE = (enabled: boolean = true) => {
    const [isConnected, setIsConnected] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const eventSourceRef = useRef<EventSource | null>(null);
    const queryClient = useQueryClient();

    useEffect(() => {
        if (!enabled) return;

        const connectSSE = () => {
            try {
                const eventSource = new EventSource("/api/bills/sse");
                eventSourceRef.current = eventSource;

                eventSource.onopen = () => {
                    setIsConnected(true);
                    setError(null);
                };

                eventSource.onmessage = (event) => {
                    try {
                        const data: SSEEvent = JSON.parse(event.data);

                        if (data.type === "connected") {
                            console.log("Bills SSE connected");
                        } else if (data.type === "bills_updated" && data.bills) {
                            // Update the React Query cache with the new bills
                            queryClient.setQueryData(billQueryKeys.list(), data.bills);
                        } else if (data.type === "bill_prices_updated" && data.billPrices && data.billId) {
                            // Update the React Query cache with the new bill prices
                            queryClient.setQueryData(billQueryKeys.prices(data.billId), data.billPrices);
                        } else if (data.type === "bill_bookings_updated" && data.billBookings && data.billId) {
                            // Update the React Query cache with the new bill bookings
                            queryClient.setQueryData(billQueryKeys.bookings(data.billId), data.billBookings);
                        } else if (data.type === "bill_price_deleted" && data.priceId) {
                            // Invalidate all bill queries since we don't know which bill this price belonged to
                            queryClient.invalidateQueries({ queryKey: billQueryKeys.all });
                        } else if (data.type === "bill_booking_deleted" && data.bookingId) {
                            // Invalidate all bill queries since we don't know which bill this booking belonged to
                            queryClient.invalidateQueries({ queryKey: billQueryKeys.all });
                        }
                    } catch (err) {
                        console.error("Error parsing SSE message:", err);
                    }
                };

                eventSource.onerror = (err) => {
                    console.error("Bills SSE error:", err);
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
                console.error("Failed to create bills SSE connection:", err);
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