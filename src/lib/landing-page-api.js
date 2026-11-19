import { apiClient } from './api-client'

function asObject(value, path) {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    throw new Error(`Invalid landing page response: "${path}" must be an object.`)
  }

  return value
}

export function parseLandingPage(value) {
  const page = asObject(value, 'root')
  const sections = asObject(page.sections, 'sections')

  for (const [name, section] of Object.entries(sections)) {
    if (section !== null) asObject(section, `sections.${name}`)
  }

  return {
    ...page,
    sections,
  }
}

export async function getLandingPage(signal) {
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'https://api-admin1.wegz.org/'
  const endpoint =
    import.meta.env.VITE_LANDING_PAGE_API_URL ||
    `${apiBaseUrl.replace(/\/+$/, '')}/api/public/landing`

  const response = await apiClient.get(endpoint, { signal })
  return parseLandingPage(response.data)
}

export function getPublicAssetUrl(path) {
  if (typeof path !== 'string' || path.trim() === '') return undefined

  try {
    const baseUrl = import.meta.env.VITE_API_BASE_URL || 'https://api-admin1.wegz.org/'
    return new URL(path, baseUrl).toString()
  } catch {
    throw new Error(`Invalid asset URL received from the landing page API: "${path}".`)
  }
}
