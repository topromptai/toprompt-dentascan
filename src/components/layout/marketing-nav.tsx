import Link from 'next/link';

const navLinks = [
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export function MarketingNav() {
  return (
    <nav className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-surface)]/95 backdrop-blur-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-[var(--color-text-primary)]">DentaScan</Link>
        <div className="hidden md:flex items-center gap-6">
          {(Array.isArray(navLinks) ? navLinks : []).map((link, i) => (
            <Link key={`${link.href}-${i}`} href={link.href} className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors">
              {link.label}
            </Link>
          ))}
          <Link href="/signup" className="px-4 py-2 rounded-lg bg-[var(--color-primary)] text-white text-sm font-medium hover:opacity-90 transition-opacity">
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
}
export default MarketingNav;
