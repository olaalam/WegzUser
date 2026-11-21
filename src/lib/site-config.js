const DEFAULT_ROOT_DOMAIN = 'wegz.org'

function normalizeHostname(hostname) {
  if (!hostname) return ''
  return hostname.trim().toLowerCase().replace(/^\.+|\.+$/g, '')
}

export function getRootDomain() {
  return normalizeHostname(
    import.meta.env.VITE_ROOT_DOMAIN || DEFAULT_ROOT_DOMAIN,
  )
}

export function getTenantSubdomain(
  hostname = typeof window !== 'undefined' ? window.location.hostname : '',
) {
  const normalizedHostname = normalizeHostname(hostname)
  const rootDomain = getRootDomain()

  if (!normalizedHostname || !rootDomain) return undefined
  if (normalizedHostname === rootDomain) return undefined
  if (!normalizedHostname.endsWith(`.${rootDomain}`)) return undefined

  const subdomain = normalizedHostname.slice(
    0,
    -(rootDomain.length + 1),
  )

  if (!subdomain || subdomain.includes('.') || subdomain === 'www') {
    return undefined
  }

  return subdomain.startsWith('api-')
    ? subdomain.slice('api-'.length)
    : subdomain
}

export function getApiBaseUrl() {
  const tenant = getTenantSubdomain()

  if (tenant) {
    return `https://api-${tenant}.${getRootDomain()}`
  }

  const configuredUrl = import.meta.env.VITE_API_BASE_URL
  if (configuredUrl) return configuredUrl.replace(/\/+$/, '')

  return 'https://api-admin1.wegz.org'
}
