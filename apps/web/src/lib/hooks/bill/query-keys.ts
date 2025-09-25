export const billQueryKeys = {
    all: ['bills'] as const,
    item: (id: string) => [...billQueryKeys.all, id] as const,
    list: () => [...billQueryKeys.all, 'list'] as const,
    byKid: (kidId: string) => [...billQueryKeys.all, 'kid', kidId] as const,
    prices: (billId: string) => [...billQueryKeys.all, billId, 'prices'] as const,
    bookings: (billId: string) => [...billQueryKeys.all, billId, 'bookings'] as const,
}