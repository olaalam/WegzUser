import axios from 'axios'
import { getApiBaseUrl } from './site-config'

export const apiClient = axios.create({
  baseURL: getApiBaseUrl(),
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
