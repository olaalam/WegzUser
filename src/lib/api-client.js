import axios from 'axios'

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || undefined,
  headers: {
    'Content-Type': 'application/json',
  },
})

export function getApiErrorMessage(error) {
  if (axios.isAxiosError(error)) {
    const message = error.response?.data?.message
    if (typeof message === 'string' && message.trim() !== '') return message
    if (error.response) return `Request failed (HTTP ${error.response.status}).`
    return error.message || 'Network request failed.'
  }

  return error instanceof Error ? error.message : 'An unexpected error occurred.'
}
