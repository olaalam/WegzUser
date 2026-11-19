import { getPublicAssetUrl } from '../lib/landing-page-api'

const hiddenFields = new Set([
  '_id',
  '__v',
  'createdAt',
  'updatedAt',
  'isVisible',
  'isActive',
  'order',
  'bgColor',
  'textColor',
  'ctaColor',
  'imageSide',
])

function humanize(value) {
  return value
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase())
}

function getTitle(section, fallback) {
  return section.title || section.heading || section.name || fallback
}

function getImage(section) {
  for (const key of ['image', 'imageUrl', 'logo', 'photo', 'avatar', 'coverImage']) {
    if (typeof section[key] === 'string') {
      return { src: getPublicAssetUrl(section[key]), alt: section.imageAlt || '' }
    }
  }

  return undefined
}

function isLink(item) {
  return item && typeof item === 'object' &&
    typeof (item.url || item.href) === 'string' &&
    typeof (item.label || item.title || item.text) === 'string'
}

function LinkList({ links, className = '' }) {
  const visibleLinks = links
    .filter((link) => isLink(link) && link.isActive !== false)
    .sort((left, right) => (left.order ?? 0) - (right.order ?? 0))

  return (
    <nav className={className}>
      {visibleLinks.map((link, index) => (
        <a
          className="text-sm font-medium transition hover:opacity-70"
          href={link.url || link.href}
          key={link._id || `${link.url || link.href}-${index}`}
        >
          {link.label || link.title || link.text}
        </a>
      ))}
    </nav>
  )
}

function BackendValue({ name, value }) {
  if (value === null || value === undefined || typeof value === 'boolean') return null

  if (Array.isArray(value)) {
    if (value.length === 0) return null
    if (value.every(isLink)) {
      return <LinkList links={value} className="mt-4 flex flex-wrap gap-x-6 gap-y-3" />
    }

    return (
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {value.map((item, index) => (
          <article
            className="rounded-2xl border border-current/10 bg-white/60 p-5"
            key={item?._id || `${name}-${index}`}
          >
            {item && typeof item === 'object' ? (
              Object.entries(item)
                .filter(([key]) => !hiddenFields.has(key))
                .map(([key, itemValue]) => (
                  <BackendValue key={key} name={key} value={itemValue} />
                ))
            ) : (
              <BackendValue name={name} value={item} />
            )}
          </article>
        ))}
      </div>
    )
  }

  if (typeof value === 'object') {
    const entries = Object.entries(value).filter(([key]) => !hiddenFields.has(key))
    if (entries.length === 0) return null

    return (
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {entries.map(([key, nestedValue]) => (
          <BackendValue key={key} name={key} value={nestedValue} />
        ))}
      </div>
    )
  }

  if (typeof value === 'number') {
    return (
      <p className="mt-2 text-base leading-7">
        <span className="font-semibold">{humanize(name)}: </span>{value}
      </p>
    )
  }

  if (typeof value !== 'string' || value.trim() === '') return null

  if (/^(https?:\/\/|\/)/i.test(value) && /(url|href|link)/i.test(name)) {
    return (
      <p className="mt-2">
        <a className="underline underline-offset-4" href={value}>
          {humanize(name)}
        </a>
      </p>
    )
  }

  if (/(image|logo|avatar|photo|cover)/i.test(name)) {
    const src = getPublicAssetUrl(value)
    return src ? (
      <img className="mt-4 max-h-80 w-full rounded-2xl object-cover" src={src} alt="" />
    ) : null
  }

  return (
    <p className="mt-2 whitespace-pre-line text-base leading-7">
      <span className="font-semibold">{humanize(name)}: </span>{value}
    </p>
  )
}

function DynamicContent({ section, title, excluded = [] }) {
  const excludedFields = new Set([
    ...hiddenFields,
    'title',
    'heading',
    'name',
    'subtitle',
    'description',
    'text',
    'body',
    'content',
    'imageAlt',
    'ctaText',
    'ctaUrl',
    'image',
    'imageUrl',
    'logo',
    'photo',
    'avatar',
    'coverImage',
    ...excluded,
  ])
  const image = getImage(section)
  const description =
    section.description || section.subtitle || section.text || section.body || section.content
  const ctaText = section.ctaText || section.buttonText
  const ctaUrl = section.ctaUrl || section.buttonUrl || section.url

  return (
    <section
      className="px-6 py-16 md:px-10 md:py-20"
      id={section._id}
      style={{ backgroundColor: section.bgColor, color: section.textColor }}
    >
      <div className="mx-auto max-w-7xl">
        {title && <h2 className="text-3xl font-bold md:text-4xl">{title}</h2>}
        {description && typeof description === 'string' && (
          <p className="mt-5 max-w-3xl whitespace-pre-line text-lg leading-8 opacity-80">
            {description}
          </p>
        )}
        {image && (
          <img
            className="mt-8 max-h-[28rem] w-full rounded-3xl object-cover"
            src={image.src}
            alt={image.alt}
          />
        )}
        {Object.entries(section)
          .filter(([key]) => !excludedFields.has(key))
          .map(([key, value]) => (
            <BackendValue key={key} name={key} value={value} />
          ))}
        {ctaText && ctaUrl && (
          <a
            className="mt-8 inline-flex items-center justify-center rounded-full px-6 py-3 font-semibold transition hover:opacity-80"
            href={ctaUrl}
            style={{ backgroundColor: section.ctaColor, color: section.ctaTextColor }}
          >
            {ctaText}
          </a>
        )}
      </div>
    </section>
  )
}

export function LandingSection({ name, section }) {
  if (!section || section.isVisible === false) return null

  if (name === 'announcement') {
    return (
      <div
        className="px-6 py-3 text-center text-sm font-medium"
        style={{ backgroundColor: section.bgColor, color: section.textColor }}
      >
        {section.text}
      </div>
    )
  }

  if (name === 'header') return null

  if (name === 'hero') {
    const image = getImage(section)
    const title = getTitle(section, '')

    return (
      <section
        className="px-6 py-20 md:px-10 md:py-28"
        id={section._id}
        style={{ backgroundColor: section.bgColor, color: section.textColor }}
      >
        <div className="mx-auto grid max-w-7xl items-center gap-10 md:grid-cols-2">
          <div>
            {title && (
              <h1 className="text-4xl font-bold tracking-tight md:text-6xl">{title}</h1>
            )}
            {(section.subtitle || section.description) && (
              <p className="mt-6 max-w-xl text-lg leading-8 opacity-80">
                {section.subtitle || section.description}
              </p>
            )}
            {section.ctaText && section.ctaUrl && (
              <a
                className="mt-8 inline-flex items-center justify-center rounded-full px-6 py-3 font-semibold transition hover:opacity-80"
                href={section.ctaUrl}
                style={{ backgroundColor: section.ctaColor, color: section.ctaTextColor }}
              >
                {section.ctaText}
              </a>
            )}
          </div>
          {image && (
            <img
              className="max-h-[28rem] w-full rounded-3xl object-cover"
              src={image.src}
              alt={image.alt}
            />
          )}
        </div>
      </section>
    )
  }

  const title = getTitle(section, humanize(name))

  if (name === 'testimonials') {
    const items = section.items || section.testimonials || []
    return (
      <section
        className="px-6 py-16 md:px-10 md:py-20"
        id={section._id}
        style={{ backgroundColor: section.bgColor, color: section.textColor }}
      >
        <div className="mx-auto max-w-7xl">
          {title && <h2 className="text-3xl font-bold md:text-4xl">{title}</h2>}
          {section.subtitle && (
            <p className="mt-4 text-lg leading-8 opacity-80">{section.subtitle}</p>
          )}
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {items.map((item, index) => (
              <article
                className="rounded-2xl border border-current/10 bg-white/60 p-6"
                key={item._id || index}
              >
                <BackendValue name="testimonial" value={item} />
              </article>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (name === 'footer') {
    return (
      <footer
        className="border-t border-current/10 px-6 py-8 md:px-10"
        style={{ backgroundColor: section.bgColor, color: section.textColor }}
      >
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4">
          {section.copyright && <p className="text-sm opacity-75">{section.copyright}</p>}
          {section.text && <p className="text-sm opacity-75">{section.text}</p>}
          {Array.isArray(section.links) && (
            <LinkList links={section.links} className="flex flex-wrap gap-5" />
          )}
          {Object.entries(section)
            .filter(([key]) => !hiddenFields.has(key) &&
              !['copyright', 'text', 'links', 'bgColor', 'textColor'].includes(key))
            .map(([key, value]) => (
              <BackendValue key={key} name={key} value={value} />
            ))}
        </div>
      </footer>
    )
  }

  return <DynamicContent section={section} title={title} />
}
