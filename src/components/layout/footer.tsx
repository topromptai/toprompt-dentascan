import Link from 'next/link';

const footerLinks = [
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-surface)] py-12 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-lg font-bold text-[var(--color-text-primary)]">DentaScan</div>
          <div className="flex flex-wrap gap-6">
            {(Array.isArray(footerLinks) ? footerLinks : []).map((link, i) => (
              <Link key={`${link.href}-${i}`} href={link.href} className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-[var(--color-border)] text-center text-sm text-[var(--color-text-secondary)]">
          © 2026 DentaScan. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
export default Footer;
