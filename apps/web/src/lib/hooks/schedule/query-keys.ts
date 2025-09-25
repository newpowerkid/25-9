export const scheduleQueryKeys = {
    all: ['schedules'] as const,
    item: (id: string) => [...scheduleQueryKeys.all, id] as const,
    list: () => [...scheduleQueryKeys.all, 'list'] as const,
}