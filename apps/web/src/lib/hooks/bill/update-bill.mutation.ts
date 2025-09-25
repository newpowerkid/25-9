import { useMutation, useQueryClient } from '@tanstack/react-query'

import { api } from '~/lib/treaty'

import type { Bill } from './get-bills.query'
import { billQueryKeys } from './query-keys'

export const useUpdateBillMutation = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({
            id,
            ...bill
        }: {
            id: string
            kidId?: string
            paidBy?: 'Cash' | 'Card' | 'Transfer'
            reportId?: string
            classBill?: string
            isPaid?: boolean
            totalPaid?: string
            comment?: string
        }) => {
            const { error } = await api.bills({ id }).patch(bill)
            if (error) {
                switch (error.status) {
                    case 422:
                        throw new Error('Parsing error', { cause: error.value })
                    default:
                        throw new Error(error.value)
                }
            }
            return
        },
        onMutate: ({ id, ...data }) => {
            queryClient.cancelQueries({ queryKey: billQueryKeys.list() })

            const previousBills = queryClient.getQueryData<Bill[]>(
                billQueryKeys.list()
            )

            queryClient.setQueryData(billQueryKeys.list(), (old: Bill[]): Bill[] =>
                old.map((bill) => {
                    if (bill.id === id) {
                        return { ...bill, ...data }
                    }
                    return bill
                })
            )

            return { previousBills }
        },
        onError: (_, __, context) => {
            queryClient.setQueryData(billQueryKeys.list(), context?.previousBills)
        },
    })
}