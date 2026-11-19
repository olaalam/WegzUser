import React from 'react'
import { motion } from 'framer-motion'
import { Sparkles, ArrowRight, Shield, Zap, Layers, Mail, Phone } from 'lucide-react'
import { getPublicAssetUrl } from '../lib/landing-page-api'

/**
 * Template 3: Modern Tech / SaaS Platform Template
 * High-tech aesthetic with neon cyan & violet accents, dark glassmorphism, and dynamic backend integration.
 */
export default function Template3({ page }) {
  const sections = page?.sections || {}
  const header = sections.header || {}
  const hero = sections.hero || {}
  const announcement = sections.announcement
  const info = sections.info || {}
  const contact = sections.contact || {}

  const brandName = header.brandName || 'NovaTech'
  const logoUrl = getPublicAssetUrl(header.logo)
  const heroImage = getPublicAssetUrl(hero.image)
  const links = Array.isArray(header.links) ? header.links : []

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500 selection:text-black">
      {/* Background ambient glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-cyan-500/15 rounded-full blur-[120px]" />
        <div className="absolute top-1/3 -right-40 w-96 h-96 bg-purple-600/15 rounded-full blur-[140px]" />
        <div className="absolute bottom-10 left-1/4 w-80 h-80 bg-blue-600/15 rounded-full blur-[130px]" />
      </div>

      {/* Announcement Bar */}
      {announcement && announcement.isVisible !== false && announcement.text && (
        <aside
          aria-label="Announcement"
          className="relative z-50 px-4 py-2 text-center text-xs sm:text-sm font-semibold tracking-wide border-b border-cyan-500/20"
          style={{
            backgroundColor: announcement.bgColor || 'rgba(6, 182, 212, 0.15)',
            color: announcement.textColor || '#38bdf8',
          }}
        >
          <div className="inline-flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            <span>{announcement.text}</span>
          </div>
        </aside>
      )}

      {/* Header */}
      {header.isVisible !== false && (
        <header className="sticky top-0 z-40 backdrop-blur-xl bg-slate-950/70 border-b border-slate-800/80">
          <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {logoUrl ? (
                <img src={logoUrl} alt={brandName} className="h-9 w-auto object-contain" />
              ) : (
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center font-black text-xl shadow-lg shadow-cyan-500/20">
                  {brandName.charAt(0)}
                </div>
              )}
              <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-white via-slate-200 to-cyan-400 bg-clip-text text-transparent">
                {brandName}
              </span>
            </div>

            {links.length > 0 && (
              <nav aria-label="Main navigation" className="hidden md:flex items-center gap-8">
                {links
                  .filter((link) => link.isActive !== false)
                  .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
                  .map((link, idx) => (
                    <a
                      key={link._id || idx}
                      href={link.url || link.href}
                      className="text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors"
                    >
                      {link.label || link.title || link.text}
                    </a>
                  ))}
              </nav>
            )}

            <div className="flex items-center gap-3">
              {hero.ctaUrl && (
                <a
                  href={hero.ctaUrl}
                  className="px-5 py-2.5 rounded-full text-sm font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-lg shadow-cyan-500/25 transition-all"
                >
                  {hero.ctaText || 'Get Started'}
                </a>
              )}
            </div>
          </div>
        </header>
      )}

      {/* Hero Section */}
      {hero.isVisible !== false && (
        <section className="relative z-10 pt-20 pb-24 md:pt-28 md:pb-36 px-6">
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-950/40 text-cyan-400 text-xs sm:text-sm font-medium mb-8"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Next Generation Platform</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight max-w-4xl mx-auto leading-[1.1]"
            >
              {hero.title || (
                <>
                  Build Faster with Intelligent{' '}
                  <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent">
                    Digital Solutions
                  </span>
                </>
              )}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-6 text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed"
            >
              {hero.subtitle ||
                hero.description ||
                'Empowering your business with scalable, automated, and hyper-reliable cloud architectures.'}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-10 flex flex-wrap items-center justify-center gap-4"
            >
              <a
                href={hero.ctaUrl || '#contact'}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-base bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-xl shadow-cyan-500/30 transition-all hover:scale-105"
              >
                <span>{hero.ctaText || 'Start Free Trial'}</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#features"
                className="px-7 py-4 rounded-full font-semibold text-base border border-slate-700 bg-slate-900/60 hover:bg-slate-800/80 text-slate-200 transition-all"
              >
                Explore Features
              </a>
            </motion.div>

            {heroImage && (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="mt-16 relative max-w-5xl mx-auto rounded-3xl p-2 bg-gradient-to-b from-cyan-500/30 via-slate-800/20 to-transparent shadow-2xl"
              >
                <img
                  src={heroImage}
                  alt={hero.title || 'Platform Preview'}
                  className="rounded-2xl w-full max-h-[500px] object-cover border border-slate-800"
                />
              </motion.div>
            )}
          </div>
        </section>
      )}

      {/* Feature Highlights Grid */}
      <section id="features" className="relative z-10 py-20 px-6 border-t border-slate-800/80 bg-slate-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              {info.heading || 'Engineered For Extreme Performance'}
            </h2>
            <p className="mt-4 text-slate-400">
              {info.subheading || 'Everything you need to streamline workflows, scale effortlessly, and exceed targets.'}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: 'High Velocity Architecture',
                desc: 'Sub-millisecond latency with ultra-scalable distributed edge computing.',
              },
              {
                icon: Shield,
                title: 'Enterprise Grade Security',
                desc: 'End-to-end encryption, multi-tenant isolation, and automated threat defense.',
              },
              {
                icon: Layers,
                title: 'Seamless Integrations',
                desc: 'Pre-built connectors to plug right into your existing tech stack in minutes.',
              },
            ].map((card, i) => {
              const Icon = card.icon
              return (
                <div
                  key={i}
                  className="rounded-2xl p-8 bg-slate-900/70 border border-slate-800 hover:border-cyan-500/40 transition-all hover:-translate-y-1 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{card.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{card.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Contact / CTA */}
      <section id="contact" className="relative z-10 py-24 px-6">
        <div className="max-w-4xl mx-auto rounded-3xl bg-gradient-to-b from-cyan-950/60 to-slate-900/90 border border-cyan-500/30 p-10 sm:p-14 text-center">
          <h2 className="text-3xl sm:text-4xl font-black mb-4">
            {contact.heading || 'Ready to Transform Your Business?'}
          </h2>
          <p className="text-slate-300 max-w-xl mx-auto mb-8">
            {contact.subheading || 'Join thousands of fast-growing teams building their future with our platform.'}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {contact.phone && (
              <div className="inline-flex items-center gap-2 text-cyan-300 bg-slate-950/60 px-5 py-2.5 rounded-full border border-cyan-500/30 text-sm">
                <Phone className="w-4 h-4" />
                <span>{contact.phone}</span>
              </div>
            )}
            {contact.email && (
              <div className="inline-flex items-center gap-2 text-cyan-300 bg-slate-950/60 px-5 py-2.5 rounded-full border border-cyan-500/30 text-sm">
                <Mail className="w-4 h-4" />
                <span>{contact.email}</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-800 py-12 px-6 text-slate-500 text-sm">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-2 font-bold text-slate-300">
            <span>{brandName}</span>
            <span>•</span>
            <span>Tech Platform</span>
          </div>
          <div>© {new Date().getFullYear()} {brandName}. All rights reserved.</div>
        </div>
      </footer>
    </div>
  )
}
