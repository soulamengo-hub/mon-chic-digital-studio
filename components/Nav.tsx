'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  ['⌂', 'Dashboard', '/'],
  ['▤', 'Artikel', '/products'],
  ['◇', 'Lager', '/business-intelligence'],
  ['🛒', 'Verkäufe', '/business'],
  ['♙', 'CRM', '/business'],
  ['✦', 'AI Studio', '/ai-studio'],
  ['✎', 'Content Studio', '/content-studio'],
  ['€', 'Finance', '/accounting'],
  ['↗', 'Analytics', '/analytics'],
  ['⚙', 'Einstellungen', '/settings'],
] as const;

export function Nav() {
  const pathname = usePathname();

  return (
    <>
      <header className="app-header no-print">
        <Link href="/" className="header-brand" aria-label="MON CHIC PARIS · Digital Studio">
          <div className="header-logo-wrap">
            <Image
              src="/mon-chic-paris-logo-v2.png"
              alt="MON CHIC PARIS · Digital Studio"
              width={126}
              height={126}
              priority
              className="header-logo"
            />
          </div>
          <div className="header-wordmark">
            <div className="wordmark-title">MON CHIC PARIS</div>
            <div className="wordmark-studio">DIGITAL STUDIO</div>
            <div className="wordmark-tagline">Fashion · Creativity · Innovation</div>
          </div>
        </Link>

        <div className="header-actions">
          <button className="icon-button" aria-label="Benachrichtigungen">♧</button>
          <Link className="ai-pill" href="/ai-studio"><span>✦</span> AI Studio</Link>
          <div className="profile-block">
            <div className="profile-avatar">MC</div>
            <div><strong>Mon Chic</strong><span>Administrator</span></div>
            <span className="profile-chevron">⌄</span>
          </div>
        </div>
      </header>

      <aside className="app-sidebar no-print">
        <nav className="sidebar-nav" aria-label="Hauptnavigation">
          {links.map(([icon, label, href]) => {
            const active = href === '/' ? pathname === '/' : pathname.startsWith(href);
            return (
              <Link key={`${label}-${href}`} href={href} className={`sidebar-item${active ? ' is-active' : ''}`}>
                <span className="sidebar-icon" aria-hidden="true">{icon}</span>
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>

        <Link href="/settings" className="premium-card">
          <span className="premium-icon">♧</span>
          <span><strong>Premium Plan</strong><small>Alle Funktionen aktiv</small></span>
          <span>›</span>
        </Link>
      </aside>
    </>
  );
}
