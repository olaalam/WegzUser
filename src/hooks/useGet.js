import { useQuery } from '@tanstack/react-query'
import { apiClient } from '../lib/api-client'

export function useGet(url, queryKey = [url]) {
  return useQuery({
    queryKey,
    queryFn: async ({ signal }) => {
      const response = await apiClient.get(url, { signal })
      return response.data
    },
  })
}
