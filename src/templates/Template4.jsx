import React from 'react'
import { ArrowUpRight, Palette, Award, Rocket, Mail, Phone } from 'lucide-react'
import { getPublicAssetUrl } from '../lib/landing-page-api'

/**
 * Template 4: Creative Studio & Agency Template
 * Bold editorial layout with warm coral/amber tones, artistic typography, and portfolio showcases.
 */
export default function Template4({ page }) {
  const sections = page?.sections || {}
  const header = sections.header || {}
  const hero = sections.hero || {}
  const announcement = sections.announcement
  const info = sections.info || {}
  const contact = sections.contact || {}

  const brandName = header.brandName || 'Atelier Studio'
  const logoUrl = getPublicAssetUrl(header.logo)
  const heroImage = getPublicAssetUrl(hero.image)
  const links = Array.isArray(header.links) ? header.links : []

  return (
    <div className="min-h-screen bg-[#0d0d11] text-amber-50 font-sans selection:bg-rose-500 selection:text-white">
      {/* Announcement */}
      {announcement && announcement.isVisible !== false && announcement.text && (
        <aside
          aria-label="Announcement"
          className="px-4 py-2 text-center text-xs sm:text-sm font-semibold tracking-wider uppercase border-b border-rose-500/20"
          style={{
            backgroundColor: announcement.bgColor || 'rgba(244, 63, 94, 0.15)',
            color: announcement.textColor || '#fb7185',
          }}
        >
          {announcement.text}
        </aside>
      )}

      {/* Navigation */}
      {header.isVisible !== false && (
        <header className="px-6 sm:px-12 py-6 flex items-center justify-between border-b border-white/5">
          <div className="flex items-center gap-3">
            {logoUrl ? (
              <img src={logoUrl} alt={brandName} className="h-10 w-auto object-contain" />
            ) : (
              <span className="font-serif italic font-extrabold text-2xl tracking-tight text-transparent bg-gradient-to-r from-rose-400 via-orange-400 to-amber-300 bg-clip-text">
                {brandName}
              </span>
            )}
          </div>

          {links.length > 0 && (
            <nav aria-label="Main navigation" className="hidden md:flex items-center gap-8 text-sm uppercase tracking-widest text-amber-100/70">
              {links
                .filter((link) => link.isActive !== false)
                .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
                .map((link, idx) => (
                  <a key={link._id || idx} href={link.url || link.href} className="hover:text-rose-400 transition-colors">
                    {link.label || link.title || link.text}
                  </a>
                ))}
            </nav>
          )}

          {hero.ctaUrl && (
            <a
              href={hero.ctaUrl}
              className="px-6 py-2.5 rounded-full text-xs uppercase tracking-widest font-bold bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 text-white transition-all shadow-lg shadow-rose-500/20"
            >
              {hero.ctaText || "Let's Talk"}
            </a>
          )}
        </header>
      )}

      {/* Hero */}
      {hero.isVisible !== false && (
        <section className="px-6 sm:px-12 py-20 lg:py-32 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-8">
              <span className="inline-block text-xs uppercase font-mono tracking-widest px-3 py-1 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20">
                Creative Collective
              </span>

              <h1 className="text-4xl sm:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.08] font-serif">
                {hero.title || (
                  <>
                    We design brands that{' '}
                    <span className="italic underline decoration-rose-500/50">captivate</span> and inspire.
                  </>
                )}
              </h1>

              <p className="text-lg text-amber-100/70 max-w-xl leading-relaxed">
                {hero.subtitle ||
                  hero.description ||
                  'Crafting bespoke digital identities, high-impact branding, and experiential web products.'}
              </p>

              <div className="pt-4 flex flex-wrap gap-4">
                <a
                  href={hero.ctaUrl || '#contact'}
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-rose-500 hover:bg-rose-600 text-white font-bold transition-all hover:gap-4"
                >
                  <span>{hero.ctaText || 'Start A Project'}</span>
                  <ArrowUpRight className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden aspect-[4/5] bg-gradient-to-tr from-rose-500/20 to-amber-500/20 border border-white/10 shadow-2xl">
                {heroImage ? (
                  <img src={heroImage} alt="Hero showcase" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-rose-950/40 via-amber-950/20 to-slate-950">
                    <Palette className="w-16 h-16 text-rose-400 mb-4" />
                    <span className="font-serif italic text-2xl font-bold text-amber-100">Distinctive Craft</span>
                    <span className="text-sm text-amber-200/50 mt-2">Design, Strategy & Technology</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Info / Capabilities */}
      <section className="border-t border-white/5 py-24 px-6 sm:px-12 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-rose-400">Capabilities</span>
              <h2 className="text-3xl sm:text-5xl font-serif font-bold mt-2">
                {info.heading || 'What We Create'}
              </h2>
            </div>
            <p className="text-amber-100/60 max-w-md text-sm leading-relaxed">
              {info.subheading || 'Merging strategic design with high-end development to deliver award-winning digital experiences.'}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Palette, title: 'Brand Identity', desc: 'Visual systems, logos, typography, guidelines, and brand design.' },
              { icon: Rocket, title: 'Web Experiences', desc: 'Cutting-edge interactive websites built for maximum speed and conversion.' },
              { icon: Award, title: 'Art Direction', desc: 'Editorial photography, 3D graphics, motion design, and brand voice.' },
            ].map((item, idx) => {
              const Icon = item.icon
              return (
                <div key={idx} className="p-8 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-rose-500/30 transition-all group">
                  <Icon className="w-8 h-8 text-rose-400 mb-6 group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl font-bold font-serif mb-2">{item.title}</h3>
                  <p className="text-amber-100/60 text-sm leading-relaxed">{item.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Contact & Footer */}
      <footer id="contact" className="border-t border-white/10 py-16 px-6 sm:px-12 bg-[#09090c]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="font-serif italic text-2xl font-bold">{brandName}</h3>
            <p className="text-xs uppercase tracking-widest text-amber-100/50 mt-1">Creative Agency</p>
          </div>
          <div className="flex flex-wrap gap-6 text-sm text-amber-100/70">
            {contact.phone && (
              <span className="inline-flex items-center gap-2">
                <Phone className="w-4 h-4 text-rose-400" />
                {contact.phone}
              </span>
            )}
            {contact.email && (
              <span className="inline-flex items-center gap-2">
                <Mail className="w-4 h-4 text-rose-400" />
                {contact.email}
              </span>
            )}
          </div>
          <div className="text-xs text-amber-100/40">
            © {new Date().getFullYear()} {brandName}. Crafted with passion.
          </div>
        </div>
      </footer>
    </div>
  )
}
