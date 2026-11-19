import { useMutation } from '@tanstack/react-query'
import { apiClient } from '../lib/api-client'

export function usePost(endpoint) {
  return useMutation({
    mutationFn: async (variables) => {
      const url = typeof endpoint === 'function' ? endpoint(variables) : endpoint
      const response = await apiClient.post(url, variables)
      return response.data
    },
  })
}
