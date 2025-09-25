export const kidQueryKeys = {
    all: ['kids'] as const,
    item: (id: string) => [...kidQueryKeys.all, id] as const,
    list: () => [...kidQueryKeys.all, 'list'] as const,
    userKids: () => [...kidQueryKeys.all, 'user'] as const,
}