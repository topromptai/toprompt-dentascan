import type { Metadata } from 'next';
import { AboutCard } from '@/components/about/about-card';
import { Shield, Zap, Target, Award, Users, Cpu, Eye, Sparkles } from 'lucide-react';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'About | DentaScan',
  description: 'Learn about DentaScan — the AI-powered car damage detection platform that helps insurers, fleet managers, and auto shops assess vehicle damage instantly.',
  openGraph: {
    title: 'About | DentaScan',
    description: 'Learn about DentaScan — the AI-powered car damage detection platform.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About | DentaScan',
    description: 'Learn about DentaScan — the AI-powered car damage detection platform.',
  },
};

const TEAM = [
  {
    _id: '1',
    name: 'Dr. Mira Osei',
    role: 'Chief Executive Officer',
    bio: 'Former computer vision researcher at MIT Media Lab with 12 years of experience building AI systems for automotive diagnostics.',
    initials: 'MO',
    accent: 'from-[var(--color-primary)] to-[var(--color-accent)]',
  },
  {
    _id: '2',
    name: 'James Whitfield',
    role: 'Head of AI Engineering',
    bio: 'Led neural architecture research at DeepMind. Holds 7 patents in visual damage-recognition systems across automotive sectors.',
    initials: 'JW',
    accent: 'from-[var(--color-accent)] to-[var(--color-primary)]',
  },
  {
    _id: '3',
    name: 'Sofia Varga',
    role: 'Chief Product Officer',
    bio: 'Previously VP of Product at a leading insurtech firm. Passionate about translating complex AI into intuitive user experiences.',
    initials: 'SV',
    accent: 'from-[var(--color-secondary)] to-[var(--color-primary)]',
  },
  {
    _id: '4',
    name: 'Ravi Chandran',
    role: 'Head of Data Science',
    bio: 'Built damage-assessment models trained on over 4 million vehicle images. Expert in semantic segmentation and multi-label classification.',
    initials: 'RC',
    accent: 'from-[var(--color-primary)] to-[var(--color-secondary)]',
  },
  {
    _id: '5',
    name: 'Elena Kozlov',
    role: 'Head of Partnerships',
    bio: 'Manages enterprise relationships with top-10 global insurers and fleet operators across North America and Europe.',
    initials: 'EK',
    accent: 'from-[var(--color-accent)] to-[var(--color-secondary)]',
  },
  {
    _id: '6',
    name: 'Marcus Bell',
    role: 'Principal Engineer',
    bio: 'Architect of the DentaScan real-time inference pipeline. Reduced average scan time from 8 seconds to under 1.2 seconds.',
    initials: 'MB',
    accent: 'from-[var(--color-secondary)] to-[var(--color-accent)]',
  },
];

const STATS = [
  { label: 'Vehicle Scans Completed', value: '2.4M+', icon: Eye },
  { label: 'Accuracy Rate', value: '97.3%', icon: Target },
  { label: 'Enterprise Clients', value: '340+', icon: Users },
  { label: 'Countries Served', value: '28', icon: Award },
];

const MISSION_VALUES = [
  {
    _id: 'mv1',
    icon: Shield,
    title: 'Precision Over Guesswork',
    description:
      "Every damage assessment is backed by models trained on millions of real-world images — not rule-based heuristics. We don't estimate; we identify.",
  },
  {
    _id: 'mv2',
    icon: Zap,
    title: 'Speed Without Compromise',
    description:
      'A full vehicle damage report in under two seconds. Our inference pipeline is optimised so insurers and mechanics get answers before the customer hangs up.',
  },
  {
    _id: 'mv3',
    icon: Cpu,
    title: 'AI That Explains Itself',
    description:
      'DentaScan surfaces confidence scores and highlighted damage zones — not black-box verdicts. Every result is auditable and ready for dispute resolution.',
  },
  {
    _id: 'mv4',
    icon: Sparkles,
    title: 'Built for the Real World',
    description:
      'From smartphone photos taken in rain to professional inspection-bay cameras, our system is robust to lighting, angle, and image quality variations.',
  },
];

export default function AboutPage() {
  return (
    <div className="animate-fade-in-up bg-[var(--color-background)] min-h-screen">
      {/* ── Hero Centered ── */}
      <section className="relative overflow-hidden py-28 px-6">
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
        <div className="relative max-w-4xl mx-auto text-center">
          <span className="inline-block mb-4 px-3 py-1 rounded-full border border-[var(--color-primary)]/40 bg-[var(--color-primary)]/10 text-[var(--color-primary)] text-xs font-body tracking-widest uppercase">
            About DentaScan
          </span>
          <h1 className="font-heading text-5xl md:text-6xl font-bold text-[var(--color-text)] leading-tight mb-6">
            Forensic Precision for{' '}
            <span className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] bg-clip-text text-transparent">
              Every Dent
            </span>
          </h1>
          <p className="font-body text-[var(--color-text)] text-lg md:text-xl max-w-2xl mx-auto opacity-80 leading-relaxed">
            DentaScan was founded on a single conviction: vehicle damage assessment should be as reliable as a fingerprint match — objective, instant, and irrefutable. We build the AI infrastructure that makes that possible.
          </p>
          <div className="mt-10 relative w-full max-w-3xl mx-auto rounded-xl overflow-hidden border border-[var(--color-border)] shadow-lg">
            <Image
              src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1200&q=80"
              alt="DentaScan team working on AI vehicle damage detection system"
              width={1200}
              height={500}
              className="w-full h-72 object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-background)]/70 to-transparent" />
          </div>
        </div>
      </section>

      {/* ── Mission & Values ── */}
      <section
        aria-labelledby="mission-heading"
        className="py-20 px-6 bg-[var(--color-surface)]"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2
              id="mission-heading"
              className="font-heading text-3xl md:text-4xl font-bold text-[var(--color-text)] mb-3"
            >
              Our Mission &amp; Values
            </h2>
            <p className="font-body text-[var(--color-text)] opacity-70 max-w-xl mx-auto">
              We believe the future of vehicle assessment is built on verifiable data — not adjuster intuition or outdated rule tables.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6" data-stagger>
            {MISSION_VALUES.map((item) => (
              <AboutCard
                key={item._id}
                icon={item.icon}
                title={item.title}
                description={item.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Team Grid ── */}
      <section
        aria-labelledby="team-heading"
        className="py-20 px-6 bg-[var(--color-background)]"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2
              id="team-heading"
              className="font-heading text-3xl md:text-4xl font-bold text-[var(--color-text)] mb-3"
            >
              The Team Behind the Scan
            </h2>
            <p className="font-body text-[var(--color-text)] opacity-70 max-w-xl mx-auto">
              World-class researchers, engineers, and domain experts united by one goal — making vehicle damage invisible to guesswork.
            </p>
          </div>
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            data-stagger
          >
            {TEAM.map((member) => (
              <article
                key={member._id}
                className="bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] p-6 flex flex-col gap-4 transition-transform duration-300 hover:scale-[1.02] hover:shadow-lg"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-14 h-14 rounded-full bg-gradient-to-br ${member.accent} flex items-center justify-center flex-shrink-0`}
                  >
                    <span className="font-heading font-bold text-lg text-[var(--color-background)]">
                      {member.initials}
                    </span>
                  </div>
                  <div>
                    <p className="font-heading font-semibold text-[var(--color-text)] leading-tight">
                      {member.name}
                    </p>
                    <p className="font-body text-xs text-[var(--color-primary)] mt-0.5 tracking-wide">
                      {member.role}
                    </p>
                  </div>
                </div>
                <p className="font-body text-sm text-[var(--color-text)] opacity-75 leading-relaxed">
                  {member.bio}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats Row ── */}
      <section
        aria-labelledby="stats-heading"
        className="py-20 px-6 bg-[var(--color-surface)] border-t border-[var(--color-border)]"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2
              id="stats-heading"
              className="font-heading text-3xl md:text-4xl font-bold text-[var(--color-text)] mb-2"
            >
              Impact by the Numbers
            </h2>
            <p className="font-body text-[var(--color-text)] opacity-60 text-sm">
              Real metrics from production deployments worldwide.
            </p>
          </div>
          <div
            className="grid grid-cols-2 lg:grid-cols-4 gap-6"
            data-stagger
          >
            {STATS.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div
                  key={`stat-${i}`}
                  className="bg-[var(--color-background)] rounded-xl border border-[var(--color-border)] p-6 text-center transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-[var(--color-primary)]/10 mb-4">
                    <Icon className="w-6 h-6 text-[var(--color-primary)]" strokeWidth={1.5} />
                  </div>
                  <p className="font-heading text-3xl font-bold text-[var(--color-primary)] mb-1">
                    {stat.value}
                  </p>
                  <p className="font-body text-xs text-[var(--color-text)] opacity-70 tracking-wide">
                    {stat.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="py-20 px-6 bg-[var(--color-background)]">
        <div className="max-w-3xl mx-auto text-center">
          <div className="relative rounded-xl overflow-hidden border border-[var(--color-primary)]/30 p-12 bg-gradient-to-br from-[var(--color-surface)] to-[var(--color-background)]">
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
            <h2 className="relative font-heading text-3xl font-bold text-[var(--color-text)] mb-4">
              Ready to see it in action?
            </h2>
            <p className="relative font-body text-[var(--color-text)] opacity-70 mb-8 max-w-lg mx-auto">
              Upload a photo of any vehicle and receive a full damage report in seconds — no sign-up required for your first scan.
            </p>
            <a
              href="/upload"
              className="relative inline-flex items-center gap-2 px-8 py-3 rounded-lg bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] text-[var(--color-background)] font-heading font-bold text-sm tracking-wide transition-transform duration-150 hover:-translate-y-0.5 active:scale-[0.97]"
            >
              <Zap className="w-4 h-4" />
              Start Free Scan
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
