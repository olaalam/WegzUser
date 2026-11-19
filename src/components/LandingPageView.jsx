import { LandingSection } from './LandingSection'
import { getPublicAssetUrl } from '../lib/landing-page-api'

export function LandingPageView({ page }) {
  const sections = Object.entries(page.sections)
  const header = page.sections.header
  const headerVisible = header && header.isVisible !== false
  const headerLinks = Array.isArray(header?.links) ? header.links : []
  const logoUrl = getPublicAssetUrl(header?.logo)
  const pageIsDark = page.mode?.toLowerCase() === 'dark'
  const visibleSections = sections.filter(([name]) => name !== 'header' && name !== 'footer')

  return (
    <div
      className={`min-h-screen ${pageIsDark ? 'bg-slate-950 text-white' : 'bg-white text-slate-900'}`}
      data-theme={page.theme}
    >
      {sections
        .filter(([name]) => name === 'announcement')
        .map(([name, section]) => (
          <LandingSection key={name} name={name} section={section} />
        ))}

      {headerVisible && (
        <header
          className="border-b border-current/10 px-6 py-5 md:px-10"
          style={{ backgroundColor: header.bgColor, color: header.textColor }}
        >
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-5">
            {header.brandName && (
              <div className="flex items-center gap-3 font-bold">
                {logoUrl && <img className="h-9 w-auto" src={logoUrl} alt="" />}
                <span>{header.brandName}</span>
              </div>
            )}
            {headerLinks.length > 0 && (
              <nav
                aria-label="Main navigation"
                className="flex flex-wrap gap-x-6 gap-y-3"
              >
                {headerLinks
                  .filter((link) => link.isActive !== false)
                  .sort((left, right) => (left.order ?? 0) - (right.order ?? 0))
                  .map((link, index) => (
                    <a
                      className="text-sm font-medium transition hover:opacity-70"
                      href={link.url || link.href}
                      key={link._id || `${link.url || link.href}-${index}`}
                    >
                      {link.label || link.title || link.text}
                    </a>
                  ))}
              </nav>
            )}
          </div>
        </header>
      )}

      <main>
        {visibleSections.map(([name, section]) => (
          <LandingSection key={section?._id || name} name={name} section={section} />
        ))}
      </main>

      {sections
        .filter(([name]) => name === 'footer')
        .map(([name, section]) => (
          <LandingSection key={name} name={name} section={section} />
        ))}
    </div>
  )
}
