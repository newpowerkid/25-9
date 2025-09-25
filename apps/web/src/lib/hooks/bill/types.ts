// Bill paid by enum values
export type BillPaidBy =
    | 'Cash'
    | 'Card'
    | 'Transfer'

export type Bill = {
    id: string
    kidId: string | null
    paidBy: 'Cash' | 'Card' | 'Transfer'
    reportId: string | null
    classBill: string | null
    isPaid: boolean
    totalPaid: string
    comment: string | null
    createdAt: Date
    updatedAt: Date
    // Relations
    kid?: any // Kid type from kid schema
}

export type BillPrice = {
    id: string
    billId: string
    priceId: string
    quantity: number
    plusAndMinus: number | null
    discountAmt: string | null
    discountPct: string | null
    startDate: Date | null
    expiryDate: Date | null
    createdAt: Date
    updatedAt: Date
    // Relations
    bill?: Bill
    price?: any // Price type from price schema
}

export type BillBooking = {
    id: string
    kidId: string
    priceId: string
    billId: string
    remainingLessons: number | null
    expiryDate: Date | null
    createdAt: Date
    updatedAt: Date
    // Relations
    kid?: any // Kid type from kid schema
    price?: any // Price type from price schema
    bill?: Bill
}