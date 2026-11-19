import { useMutation } from '@tanstack/react-query'
import { apiClient } from '../lib/api-client'

export function useUpdate(endpoint, method = 'patch') {
  if (method !== 'put' && method !== 'patch') {
    throw new Error('Update method must be "put" or "patch".')
  }

  return useMutation({
    mutationFn: async (variables) => {
      const url = typeof endpoint === 'function' ? endpoint(variables) : endpoint
      const response =
        method === 'put'
          ? await apiClient.put(url, variables)
          : await apiClient.patch(url, variables)
      return response.data
    },
  })
}
