import React from 'react'
import { ShoppingBag, ArrowRight, Star, ShieldCheck, Truck, RefreshCw, Mail, Phone } from 'lucide-react'
import { getPublicAssetUrl } from '../lib/landing-page-api'

/**
 * Template 5: Minimal Modern Commerce & Product Showcase
 * Clean, high-conversion, minimalist aesthetic with crisp borders and focus on products/services.
 */
export default function Template5({ page }) {
  const sections = page?.sections || {}
  const header = sections.header || {}
  const hero = sections.hero || {}
  const announcement = sections.announcement
  const info = sections.info || {}
  const contact = sections.contact || {}

  const brandName = header.brandName || 'Lumina Essentials'
  const logoUrl = getPublicAssetUrl(header.logo)
  const heroImage = getPublicAssetUrl(hero.image)
  const links = Array.isArray(header.links) ? header.links : []

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 font-sans selection:bg-neutral-900 selection:text-white">
      {/* Announcement */}
      {announcement && announcement.isVisible !== false && announcement.text && (
        <aside
          aria-label="Announcement"
          className="px-4 py-2.5 text-center text-xs tracking-wider uppercase font-medium border-b border-neutral-200"
          style={{
            backgroundColor: announcement.bgColor || '#171717',
            color: announcement.textColor || '#ffffff',
          }}
        >
          {announcement.text}
        </aside>
      )}

      {/* Navigation */}
      {header.isVisible !== false && (
        <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-neutral-200/80">
          <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {logoUrl ? (
                <img src={logoUrl} alt={brandName} className="h-9 w-auto object-contain" />
              ) : (
                <div className="w-8 h-8 bg-neutral-900 rounded-lg flex items-center justify-center text-white font-bold text-base">
                  {brandName.charAt(0)}
                </div>
              )}
              <span className="font-bold text-xl tracking-tight uppercase text-neutral-900">
                {brandName}
              </span>
            </div>

            {links.length > 0 && (
              <nav aria-label="Main navigation" className="hidden md:flex items-center gap-8 text-xs uppercase tracking-widest font-semibold text-neutral-600">
                {links
                  .filter((link) => link.isActive !== false)
                  .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
                  .map((link, idx) => (
                    <a key={link._id || idx} href={link.url || link.href} className="hover:text-neutral-950 transition-colors">
                      {link.label || link.title || link.text}
                    </a>
                  ))}
              </nav>
            )}

            <div className="flex items-center gap-4">
              {hero.ctaUrl && (
                <a
                  href={hero.ctaUrl}
                  className="px-5 py-2.5 rounded-full text-xs uppercase tracking-wider font-bold bg-neutral-900 text-white hover:bg-neutral-800 transition-all flex items-center gap-2"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>{hero.ctaText || 'Shop Now'}</span>
                </a>
              )}
            </div>
          </div>
        </header>
      )}

      {/* Hero */}
      {hero.isVisible !== false && (
        <section className="py-16 sm:py-24 px-6 max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest font-semibold text-neutral-500">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>New Collection Available</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-neutral-950 leading-[1.15]">
                {hero.title || (
                  <>
                    Minimalist Essentials for the <strong className="font-semibold">Modern Life</strong>
                  </>
                )}
              </h1>

              <p className="text-base sm:text-lg text-neutral-600 leading-relaxed font-normal">
                {hero.subtitle ||
                  hero.description ||
                  'Thoughtfully designed essentials crafted with sustainable, timeless materials.'}
              </p>

              <div className="pt-4 flex flex-wrap gap-4">
                <a
                  href={hero.ctaUrl || '#contact'}
                  className="px-8 py-4 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-white text-sm font-semibold tracking-wide transition-all inline-flex items-center gap-2"
                >
                  <span>{hero.ctaText || 'Explore Collection'}</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-3xl overflow-hidden aspect-square bg-neutral-200 border border-neutral-300/60 shadow-xl">
                {heroImage ? (
                  <img src={heroImage} alt="Featured Product" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-gradient-to-tr from-neutral-100 to-neutral-200">
                    <ShoppingBag className="w-16 h-16 text-neutral-400 mb-4" />
                    <span className="font-semibold text-lg text-neutral-800 uppercase tracking-widest">
                      Curated Elegance
                    </span>
                    <span className="text-xs text-neutral-500 mt-2">Premium Craftsmanship</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Trust Badges */}
      <section className="border-y border-neutral-200 bg-white py-12 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { icon: Truck, title: 'Express Delivery', desc: 'Fast worldwide shipping' },
            { icon: ShieldCheck, title: 'Secure Checkout', desc: '100% encrypted payment' },
            { icon: RefreshCw, title: 'Easy Returns', desc: '30-day hassle-free guarantee' },
            { icon: Star, title: 'Premium Quality', desc: 'Certified authentic items' },
          ].map((item, idx) => {
            const Icon = item.icon
            return (
              <div key={idx} className="flex flex-col items-center">
                <Icon className="w-6 h-6 text-neutral-900 mb-2" />
                <h4 className="font-semibold text-sm text-neutral-900">{item.title}</h4>
                <p className="text-xs text-neutral-500 mt-0.5">{item.desc}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* Info Section */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl font-light tracking-tight text-neutral-950">
            {info.heading || 'Quality In Every Detail'}
          </h2>
          <p className="mt-3 text-sm text-neutral-600">
            {info.subheading || 'We believe in intentional design, ethical sourcing, and products built to last.'}
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="border-t border-neutral-200 bg-neutral-100 py-16 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-neutral-500">
          <div className="flex items-center gap-3">
            <span className="font-bold text-sm uppercase text-neutral-900">{brandName}</span>
            <span>•</span>
            <span>Minimal Store</span>
          </div>

          <div className="flex items-center gap-6">
            {contact.phone && (
              <span className="flex items-center gap-1.5 text-neutral-700">
                <Phone className="w-3.5 h-3.5" />
                {contact.phone}
              </span>
            )}
            {contact.email && (
              <span className="flex items-center gap-1.5 text-neutral-700">
                <Mail className="w-3.5 h-3.5" />
                {contact.email}
              </span>
            )}
          </div>

          <div>© {new Date().getFullYear()} {brandName}. All rights reserved.</div>
        </div>
      </footer>
    </div>
  )
}
