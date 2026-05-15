import type { Metadata } from 'next';
import { MarketingNav } from '@/components/layout/marketing-nav';
import { Footer } from '@/components/layout/footer';
import Image from 'next/image';
import Link from 'next/link';
import { ScanLine, Zap, ShieldCheck, Upload, FileText, Car, Wrench, Camera, Star, ArrowRight, ChevronRight, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'DentaScan — AI-Powered Car Damage Detection',
  description: 'Upload a photo of your damaged vehicle and get instant AI analysis identifying damaged parts, severity levels, and repair cost estimates.',
  openGraph: {
    title: 'DentaScan — AI-Powered Car Damage Detection',
    description: 'Upload a photo of your damaged vehicle and get instant AI analysis identifying damaged parts, severity levels, and repair cost estimates.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DentaScan — AI-Powered Car Damage Detection',
    description: 'Upload a photo of your damaged vehicle and get instant AI analysis identifying damaged parts, severity levels, and repair cost estimates.',
  },
};

const FEATURES = [
  {
    id: 'f1',
    icon: ScanLine,
    title: 'Forensic-Grade Damage Mapping',
    description: 'Our vision model isolates every dent, crack, and panel deformation with sub-centimetre precision — far beyond what a human eye can catch on first inspection.',
    wide: true,
  },
  {
    id: 'f2',
    icon: Zap,
    title: 'Results in Under 8 Seconds',
    description: 'No waiting room. No adjuster appointment. Upload and receive a full damage report instantly.',
    wide: false,
  },
  {
    id: 'f3',
    icon: ShieldCheck,
    title: 'Insurance-Ready Reports',
    description: 'Export structured PDF reports accepted by major insurers and collision repair chains.',
    wide: false,
  },
  {
    id: 'f4',
    icon: Sparkles,
    title: 'Cost Estimation Engine',
    description: 'Repair cost ranges sourced from real workshop databases across 40 regions, updated monthly.',
    wide: true,
  },
];

const INTEGRATIONS = [
  { id: 'i1', name: 'Allianz' },
  { id: 'i2', name: 'AXA' },
  { id: 'i3', name: 'Zurich' },
  { id: 'i4', name: 'Copart' },
  { id: 'i5', name: 'Mitchell' },
  { id: 'i6', name: 'CCC Intelligent' },
];

const STEPS = [
  {
    id: 's1',
    num: '01',
    icon: Camera,
    title: 'Photograph the Vehicle',
    description: 'Take clear photos of all damaged areas. DentaScan accepts JPEG, PNG, and HEIC from any modern smartphone.',
  },
  {
    id: 's2',
    num: '02',
    icon: Upload,
    title: 'Upload & Trigger Analysis',
    description: 'Drag and drop your images or select them from your device. Our GPT-4o vision model processes the batch simultaneously.',
  },
  {
    id: 's3',
    num: '03',
    icon: FileText,
    title: 'Receive Your Damage Report',
    description: 'A colour-coded diagnostic — damaged parts listed by severity, annotated on a vehicle schematic, with cost brackets per component.',
  },
];

const PLANS = [
  {
    id: 'p1',
    name: 'Inspector',
    price: '$0',
    period: 'forever',
    description: 'For individuals assessing their own vehicles.',
    features: ['5 scans per month', 'Basic damage report', 'PDF export', 'Email support'],
    cta: 'Get started free',
    highlight: false,
  },
  {
    id: 'p2',
    name: 'Adjuster Pro',
    price: '$49',
    period: '/month',
    description: 'For independent adjusters and small workshops.',
    features: ['200 scans per month', 'Full forensic report', 'Cost estimation engine', 'API access (500 calls)', 'Priority support'],
    cta: 'Start 14-day trial',
    highlight: true,
  },
  {
    id: 'p3',
    name: 'Fleet Enterprise',
    price: 'Custom',
    period: '',
    description: 'For insurers, rental fleets, and large bodyshops.',
    features: ['Unlimited scans', 'White-label reports', 'Webhook integrations', 'Dedicated account manager', 'SLA guarantee'],
    cta: 'Contact sales',
    highlight: false,
  },
];

const TESTIMONIALS = [
  {
    id: 't1',
    name: 'Rachel Okonkwo',
    role: 'Senior Claims Adjuster, Zurich Insurance',
    quote: "DentaScan cut our average claim assessment time from 3 days to under 2 hours. The forensic-quality reports hold up in every dispute we've had.",
    rating: 5,
  },
  {
    id: 't2',
    name: 'Marcus Feld',
    role: 'Fleet Manager, EuroDrive Rentals',
    quote: "We scan every vehicle at return using DentaScan's API. It flagged $180k of previously missed damage in the first quarter alone.",
    rating: 5,
  },
  {
    id: 't3',
    name: 'Sophia Tan',
    role: 'Owner, Precision Auto Body — Singapore',
    quote: "The cost estimation engine is eerily accurate. Customers trust our quotes more because they see the AI-generated breakdown before we even speak.",
    rating: 5,
  },
];

export default function LandingPage() {
  return (
    <div className="animate-fade-in-up min-h-screen bg-[var(--color-background)] text-[var(--color-text)]">
      <MarketingNav />

      {/* ── HERO ── */}
      <section className="relative overflow-hidden pt-28 pb-20 px-6">
        {/* Blueprint grid overlay */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
            opacity: 0.18,
          }}
        />
        <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left — copy */}
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--color-accent)]/40 bg-[var(--color-accent)]/10 px-3 py-1 text-xs font-body text-[var(--color-accent)]">
              <ScanLine className="w-3.5 h-3.5" />
              Forensic-grade AI · Powered by GPT-4o Vision
            </span>
            <h1 className="font-heading text-4xl md:text-5xl font-bold leading-tight tracking-tight text-[var(--color-text)]">
              Scan Any Dent.<br />
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: 'linear-gradient(90deg, var(--color-primary), var(--color-accent))' }}
              >
                Know Every Cost.
              </span>
            </h1>
            <p className="font-body text-base text-[var(--color-text)]/70 max-w-md leading-relaxed">
              Upload a photo of your damaged vehicle. DentaScan identifies every affected part, maps severity on a live vehicle schematic, and delivers an insurance-ready report in seconds.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/upload"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-body font-medium text-sm transition-transform duration-150 active:scale-[0.97] hover:-translate-y-0.5 text-[var(--color-background)]"
                style={{ background: 'linear-gradient(90deg, var(--color-primary), var(--color-accent))' }}
              >
                Scan a Vehicle <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-body font-medium text-sm border border-[var(--color-border)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors duration-200 text-[var(--color-text)]"
              >
                See how it works <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="flex items-center gap-6 pt-2">
              {[
                { label: 'Scans completed', value: '2.4M+' },
                { label: 'Accuracy rate', value: '97.3%' },
                { label: 'Avg. report time', value: '7.8 s' },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="font-heading text-xl font-bold text-[var(--color-primary)]">{stat.value}</p>
                  <p className="font-body text-xs text-[var(--color-text)]/50">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — screenshot / diagram */}
          <div className="relative">
            <div className="rounded-xl overflow-hidden border border-[var(--color-border)] shadow-[0_0_48px_-8px_var(--color-primary)] animate-scale-in">
              <Image
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1200&q=80"
                alt="DentaScan forensic damage analysis dashboard"
                width={1200}
                height={800}
                className="w-full object-cover h-[360px]"
                priority
              />
              {/* Overlay badge */}
              <div className="absolute bottom-4 left-4 bg-[var(--color-surface)]/90 backdrop-blur border border-[var(--color-border)] rounded-lg px-3 py-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[var(--color-success)] animate-pulse" />
                <span className="font-body text-xs text-[var(--color-text)]">Analysis complete — 4 damaged zones detected</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURE BENTO GRID ── */}
      <section className="py-20 px-6 bg-[var(--color-surface)]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="font-heading text-3xl font-bold">Precision Tools for Every Inspection</h2>
            <p className="font-body text-sm text-[var(--color-text)]/60 mt-2 max-w-xl mx-auto">
              Built for adjusters, fleet managers, and repair shops who need answers fast.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5" data-stagger>
            {FEATURES.map((f) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.id}
                  className={`bg-[var(--color-background)] border border-[var(--color-border)] rounded-xl p-6 transition-transform duration-300 hover:scale-[1.02] hover:shadow-lg hover:border-[var(--color-primary)]/40 ${
                    f.wide ? 'lg:col-span-2' : ''
                  }`}
                >
                  <div className="w-10 h-10 rounded-lg bg-[var(--color-primary)]/10 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-[var(--color-primary)]" />
                  </div>
                  <h3 className="font-heading text-base font-semibold mb-1">{f.title}</h3>
                  <p className="font-body text-sm text-[var(--color-text)]/60 leading-relaxed">{f.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── INTEGRATION LOGOS ── */}
      <section className="py-14 px-6 bg-[var(--color-background)] border-y border-[var(--color-border)]">
        <div className="max-w-5xl mx-auto text-center">
          <p className="font-body text-xs uppercase tracking-widest text-[var(--color-text)]/40 mb-8">Trusted by teams at</p>
          <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-4" data-stagger>
            {INTEGRATIONS.map((ig) => (
              <span
                key={ig.id}
                className="font-heading text-lg font-bold text-[var(--color-text)]/25 hover:text-[var(--color-primary)] transition-colors duration-200 cursor-default"
              >
                {ig.name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-20 px-6 bg-[var(--color-surface)]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14 animate-fade-in-up">
            <h2 className="font-heading text-3xl font-bold">From Photo to Report in Three Steps</h2>
            <p className="font-body text-sm text-[var(--color-text)]/60 mt-2">
              No training required. No specialist hardware. Just your phone.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative" data-stagger>
            {/* Connector line */}
            <div
              aria-hidden="true"
              className="hidden md:block absolute top-8 left-[calc(16.6%+1rem)] right-[calc(16.6%+1rem)] h-px bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-accent)] to-[var(--color-primary)] opacity-30"
            />
            {STEPS.map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.id} className="flex flex-col items-center text-center space-y-4 transition-transform duration-300 hover:-translate-y-1">
                  <div className="relative w-16 h-16 rounded-full bg-[var(--color-background)] border-2 border-[var(--color-primary)] flex items-center justify-center">
                    <Icon className="w-7 h-7 text-[var(--color-primary)]" />
                    <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-[var(--color-accent)] flex items-center justify-center font-heading text-[10px] font-bold text-[var(--color-background)]">
                      {(step.num || '').replace('0', '')}
                    </span>
                  </div>
                  <h3 className="font-heading text-base font-semibold">{step.title}</h3>
                  <p className="font-body text-sm text-[var(--color-text)]/60 leading-relaxed max-w-xs">{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section className="py-20 px-6 bg-[var(--color-background)]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="font-heading text-3xl font-bold">Straightforward Pricing</h2>
            <p className="font-body text-sm text-[var(--color-text)]/60 mt-2">No hidden scan fees. Cancel anytime.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6" data-stagger>
            {PLANS.map((plan) => (
              <div
                key={plan.id}
                className={`rounded-xl border p-6 flex flex-col transition-transform duration-300 hover:scale-[1.02] hover:shadow-lg ${
                  plan.highlight
                    ? 'border-[var(--color-primary)] bg-[var(--color-surface)] shadow-[0_0_24px_-4px_var(--color-primary)]'
                    : 'border-[var(--color-border)] bg-[var(--color-surface)]'
                }`}
              >
                {plan.highlight && (
                  <span className="self-start mb-3 rounded-full px-2.5 py-0.5 text-xs font-body font-medium bg-[var(--color-primary)]/20 text-[var(--color-primary)]">
                    Most popular
                  </span>
                )}
                <h3 className="font-heading text-lg font-bold">{plan.name}</h3>
                <p className="font-body text-xs text-[var(--color-text)]/50 mt-1 mb-4">{plan.description}</p>
                <div className="mb-6">
                  <span className="font-heading text-3xl font-bold text-[var(--color-primary)]">{plan.price}</span>
                  <span className="font-body text-xs text-[var(--color-text)]/40">{plan.period}</span>
                </div>
                <ul className="space-y-2 mb-8 flex-1">
                  {(Array.isArray(plan.features) ? plan.features : []).map((feat) => (
                    <li key={feat} className="flex items-center gap-2 font-body text-sm">
                      <Sparkles className="w-4 h-4 text-[var(--color-success)] flex-shrink-0" />
                      {feat}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/signup"
                  className={`text-center py-2.5 rounded-lg font-body text-sm font-medium transition-opacity duration-150 hover:opacity-80 ${
                    plan.highlight
                      ? 'bg-[var(--color-primary)] text-[var(--color-background)]'
                      : 'border border-[var(--color-border)] text-[var(--color-text)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-20 px-6 bg-[var(--color-surface)]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="font-heading text-3xl font-bold">Trusted by Professionals Worldwide</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6" data-stagger>
            {TESTIMONIALS.map((t) => (
              <article
                key={t.id}
                className="bg-[var(--color-background)] border border-[var(--color-border)] rounded-xl p-6 flex flex-col gap-4 transition-transform duration-300 hover:scale-[1.02] hover:border-[var(--color-primary)]/30"
              >
                <div className="flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={`${t.id}-star-${i}`} className="w-4 h-4 fill-[var(--color-primary)] text-[var(--color-primary)]" />
                  ))}
                </div>
                <p className="font-body text-sm text-[var(--color-text)]/80 leading-relaxed flex-1">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div>
                  <p className="font-heading text-sm font-semibold">{t.name}</p>
                  <p className="font-body text-xs text-[var(--color-text)]/50">{t.role}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="py-20 px-6 bg-[var(--color-background)]">
        <div
          className="max-w-4xl mx-auto rounded-2xl overflow-hidden relative text-center px-8 py-16 border border-[var(--color-primary)]/30 animate-scale-in"
          style={{ background: 'radial-gradient(ellipse at 60% 50%, color-mix(in oklch, var(--color-primary) 12%, transparent), var(--color-surface) 70%)' }}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                'linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)',
              backgroundSize: '32px 32px',
              opacity: 0.12,
            }}
          />
          <Car className="mx-auto w-12 h-12 text-[var(--color-primary)] mb-4" />
          <h2 className="font-heading text-3xl font-bold mb-3">
            Ready to Run Your First Scan?
          </h2>
          <p className="font-body text-sm text-[var(--color-text)]/60 max-w-md mx-auto mb-8">
            Join 12,000+ adjusters, workshops, and fleet operators who rely on DentaScan to make faster, fairer decisions.
          </p>
          <div className="flex justify-center gap-3 flex-wrap">
            <Link
              href="/upload"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-lg font-body font-semibold text-sm transition-transform duration-150 active:scale-[0.97] hover:-translate-y-0.5 text-[var(--color-background)]"
              style={{ background: 'linear-gradient(90deg, var(--color-primary), var(--color-accent))' }}
            >
              <Wrench className="w-4 h-4" /> Start Free Scan
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-lg font-body font-medium text-sm border border-[var(--color-border)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors duration-200 text-[var(--color-text)]"
            >
              Talk to Sales
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
