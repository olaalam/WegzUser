import React from 'react'
import Template1 from './Template1'
import TruckzitaLandingPage from './TruckzitaLandingPage'
import Template3 from './Template3'
import Template4 from './Template4'
import Template5 from './Template5'

/**
 * 5 Available Landing Page Templates:
 * 1. Template 1: Classic Dynamic Sections Template
 * 2. Template 2: Truckzita Heavy Shipping & Logistics Template
 * 3. Template 3: Modern Tech & SaaS Platform Template
 * 4. Template 4: Creative Studio & Agency Template
 * 5. Template 5: Minimal Modern Commerce & Store Template
 */
export const TEMPLATES = {
  template1: Template1,
  truckzita: TruckzitaLandingPage,
  template3: Template3,
  template4: Template4,
  template5: Template5,
}

/**
 * Normalizes template name from backend (e.g. "Theme 2", "Truckzita", "template-2", etc.)
 * or from URL parameter `?template=` or `?theme=`.
 */
export function resolveTemplateKey(identifier) {
  if (!identifier || typeof identifier !== 'string') return 'template1'

  const normalized = identifier.trim().toLowerCase().replace(/[_\s-]+/g, '')

  // 1. Check for Truckzita / Theme 2
  if (
    normalized.includes('truckzita') ||
    normalized === 'theme2' ||
    normalized === 'template2' ||
    normalized === '2'
  ) {
    return 'truckzita'
  }

  // 2. Check for Theme 1 / Classic
  if (
    normalized.includes('classic') ||
    normalized.includes('default') ||
    normalized === 'theme1' ||
    normalized === 'template1' ||
    normalized === '1'
  ) {
    return 'template1'
  }

  // 3. Check for Theme 3 / Tech SaaS
  if (
    normalized.includes('tech') ||
    normalized.includes('saas') ||
    normalized === 'theme3' ||
    normalized === 'template3' ||
    normalized === '3'
  ) {
    return 'template3'
  }

  // 4. Check for Theme 4 / Creative Agency
  if (
    normalized.includes('creative') ||
    normalized.includes('agency') ||
    normalized === 'theme4' ||
    normalized === 'template4' ||
    normalized === '4'
  ) {
    return 'template4'
  }

  // 5. Check for Theme 5 / Minimal Store
  if (
    normalized.includes('minimal') ||
    normalized.includes('store') ||
    normalized.includes('commerce') ||
    normalized === 'theme5' ||
    normalized === 'template5' ||
    normalized === '5'
  ) {
    return 'template5'
  }

  // Fallback direct match if key exists in TEMPLATES
  if (TEMPLATES[normalized]) {
    return normalized
  }

  // Safe fallback to Template 1
  return 'template1'
}

/**
 * Main Template Dispatcher / Renderer:
 * Inspects URL parameters first (for quick developer testing/previewing),
 * then backend page data (`page.template`, `page.theme`, `page.templateName`, `page.template_name`).
 */
export function TemplateRenderer({ page }) {
  // Check URL query param for dev previewing (e.g. ?template=truckzita or ?theme=Theme 2)
  let urlParam = null
  if (typeof window !== 'undefined' && window.location) {
    const params = new URLSearchParams(window.location.search)
    urlParam = params.get('template') || params.get('theme')
  }

  const backendIdentifier =
    page?.template ||
    page?.theme ||
    page?.templateName ||
    page?.template_name ||
    'theme 1'

  const templateIdentifier = urlParam || backendIdentifier
  const key = resolveTemplateKey(templateIdentifier)

  switch (key) {
    case 'truckzita':
      return <TruckzitaLandingPage page={page} />
    case 'template3':
      return <Template3 page={page} />
    case 'template4':
      return <Template4 page={page} />
    case 'template5':
      return <Template5 page={page} />
    case 'template1':
    default:
      return <Template1 page={page} />
  }
}

export {
  Template1,
  TruckzitaLandingPage,
  Template3,
  Template4,
  Template5,
}
