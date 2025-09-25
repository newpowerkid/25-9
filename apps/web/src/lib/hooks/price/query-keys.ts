export const priceQueryKeys = {
    all: ['prices'] as const,
    item: (id: string) => [...priceQueryKeys.all, id] as const,
    list: () => [...priceQueryKeys.all, 'list'] as const,
}