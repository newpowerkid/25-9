export const bookingQueryKeys = {
    all: ['bookings'] as const,
    item: (id: string) => [...bookingQueryKeys.all, id] as const,
    list: () => [...bookingQueryKeys.all, 'list'] as const,
    byKid: (kidId: string) => [...bookingQueryKeys.all, 'kid', kidId] as const,
}