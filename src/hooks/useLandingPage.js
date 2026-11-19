import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'
import { getApiErrorMessage } from '../lib/api-client'
import { getLandingPage } from '../lib/landing-page-api'

export function useLandingPage() {
  const query = useQuery({
    queryKey: ['landing-page'],
    queryFn: ({ signal }) => getLandingPage(signal),
  })

  useEffect(() => {
    if (!query.data) return

    const sections = query.data.sections
    const pageTitle =
      sections.header?.brandName ||
      sections.hero?.title ||
      Object.values(sections).find((section) => section?.title)?.title
    if (pageTitle) document.title = pageTitle

    const description =
      sections.hero?.subtitle ||
      sections.hero?.description ||
      sections.announcement?.text
    if (description) {
      document
        .querySelector('meta[name="description"]')
        ?.setAttribute('content', description)
    }
  }, [query.data])

  useEffect(() => {
    if (query.isError) {
      toast.error('Could not load the landing page', {
        description: getApiErrorMessage(query.error),
      })
    }
  }, [query.error, query.isError])

  const retry = () => {
    void query.refetch()
  }

  let state
  if (query.isPending) {
    state = { status: 'loading' }
  } else if (query.isError) {
    state = { status: 'error', message: getApiErrorMessage(query.error) }
  } else {
    state = { status: 'success', page: query.data }
  }

  return { state, retry }
}
