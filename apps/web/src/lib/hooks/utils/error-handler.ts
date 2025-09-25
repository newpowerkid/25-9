// Utility function to handle API errors consistently
export const handleApiError = (error: any, defaultMessage: string = 'Request failed') => {
    if (error.status === 422) {
        throw new Error('Validation error', { cause: JSON.stringify(error.value) })
    }

    // For other errors, try to extract a meaningful message
    const errorMessage = typeof error.value === 'string'
        ? error.value
        : JSON.stringify(error.value)

    throw new Error(defaultMessage, { cause: errorMessage })
}