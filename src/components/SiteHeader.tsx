import { useEffect, useRef, useState } from 'react';
import {
  ArrowRightIcon,
  ChevronDownIcon,
  ExternalLinkIcon,
  MenuIcon,
  XIcon,
} from 'lucide-react';
import { blueprints } from '../data/blueprints';

const navItems = [
  { label: 'Capabilities', href: '#capabilities' },
  { label: 'Engineering', href: '#engineering' },
  { label: 'Security', href: '#security' },
  { label: 'Intelligence', href: '#intelligence' },
  { label: 'Company', href: '#company' },
];

interface SiteHeaderProps {
  onStartProject: () => void;
}

export function SiteHeader({ onStartProject }: SiteHeaderProps) {
  const [open, setOpen] = useState(false);
  const [blueprintsOpen, setBlueprintsOpen] = useState(false);
  const [mobileBlueprintsOpen, setMobileBlueprintsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const blueprintsRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open && !blueprintsOpen) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        setBlueprintsOpen(false);
        setMobileBlueprintsOpen(false);
      }
    };

    window.addEventListener('keydown', onKey);

    return () => window.removeEventListener('keydown', onKey);
  }, [open, blueprintsOpen]);

  useEffect(() => {
    if (!blueprintsOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        blueprintsRef.current &&
        !blueprintsRef.current.contains(event.target as Node)
      ) {
        setBlueprintsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [blueprintsOpen]);

  const closeMobileMenu = () => {
    setOpen(false);
    setMobileBlueprintsOpen(false);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 border-b transition-colors duration-200 ease-out ${
        scrolled || open || blueprintsOpen
          ? 'border-line bg-ink/92 backdrop-blur-md'
          : 'border-transparent bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-shell items-center justify-between px-5 sm:px-8 lg:h-[72px]">
        <a
          href="#top"
          className="flex items-center gap-2.5 rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-signal"
        >
          <span
            aria-hidden="true"
            className="flex h-6 w-6 items-center justify-center border border-line-strong text-[11px] font-semibold text-signal"
          >
            N
          </span>

          <span className="font-mono text-sm font-semibold tracking-label text-white">
            NILVEE
          </span>
        </a>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-[15px] text-mute transition-colors duration-150 ease-out hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-signal"
                >
                  {item.label}
                </a>
              </li>
            ))}

            <li ref={blueprintsRef} className="relative">
              <button
                type="button"
                onClick={() => setBlueprintsOpen((value) => !value)}
                aria-expanded={blueprintsOpen}
                aria-haspopup="true"
                className="flex items-center gap-1 text-[15px] text-mute transition-colors duration-150 ease-out hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-signal"
              >
                Blueprints

                <ChevronDownIcon
                  className={`h-3.5 w-3.5 transition-transform duration-150 ${
                    blueprintsOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {blueprintsOpen && (
                <div className="absolute right-0 top-full mt-4 w-[320px] border border-line bg-ink shadow-2xl">
                  <div className="border-b border-line px-5 py-4">
                    <p className="font-mono text-[10px] tracking-label text-mute-soft">
                      ENGINEERING BLUEPRINTS
                    </p>

                    <p className="mt-1 text-xs leading-relaxed text-mute">
                      Public technical blueprints and reference implementations.
                    </p>
                  </div>

                  <ul className="py-1">
                    {blueprints.map((blueprint) => (
                      <li key={blueprint.name}>
                        <a
                          href={blueprint.href}
                          target="_blank"
                          rel="noreferrer"
                          onClick={() => setBlueprintsOpen(false)}
                          className="group flex items-start justify-between gap-4 px-5 py-3.5 transition-colors duration-150 hover:bg-ink-raised"
                        >
                          <span className="min-w-0">
                            <span className="block text-sm text-white transition-colors group-hover:text-signal">
                              {blueprint.name}
                            </span>

                            <span className="mt-1 block text-xs leading-relaxed text-mute">
                              {blueprint.description}
                            </span>
                          </span>

                          <ExternalLinkIcon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-mute-soft transition-colors group-hover:text-signal" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#contact"
            className="hidden items-center border border-line-strong px-4 py-2 font-mono text-[12px] tracking-label text-white transition-colors duration-150 ease-out hover:border-signal hover:text-signal focus:outline-none focus-visible:ring-2 focus-visible:ring-signal sm:inline-flex"
          >
            CONTACT
          </a>

          <button
            type="button"
            onClick={onStartProject}
            className="group hidden items-center gap-2 bg-signal px-4 py-2 text-sm font-semibold text-[#04120a] transition-colors duration-150 ease-out hover:bg-[#12b357] focus:outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-2 focus-visible:ring-offset-ink sm:inline-flex"
          >
            Start a Project

            <ArrowRightIcon className="h-4 w-4 transition-transform duration-150 ease-out group-hover:translate-x-0.5" />
          </button>

          <button
            type="button"
            onClick={() => {
              if (open) {
                closeMobileMenu();
              } else {
                setOpen(true);
              }
            }}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="inline-flex h-10 w-10 items-center justify-center border border-line-strong text-white transition-colors duration-150 ease-out hover:border-signal focus:outline-none focus-visible:ring-2 focus-visible:ring-signal lg:hidden"
          >
            {open ? (
              <XIcon className="h-5 w-5" />
            ) : (
              <MenuIcon className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {open && (
        <div id="mobile-nav" className="border-t border-line bg-ink lg:hidden">
          <nav
            aria-label="Mobile"
            className="mx-auto max-w-shell px-5 py-4 sm:px-8"
          >
            <ul className="flex flex-col divide-y divide-line">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={closeMobileMenu}
                    className="block py-3 text-base text-white/90 transition-colors duration-150 ease-out hover:text-signal"
                  >
                    {item.label}
                  </a>
                </li>
              ))}

              <li>
                <button
                  type="button"
                  onClick={() =>
                    setMobileBlueprintsOpen((value) => !value)
                  }
                  aria-expanded={mobileBlueprintsOpen}
                  className="flex w-full items-center justify-between py-3 text-base text-white/90 transition-colors duration-150 ease-out hover:text-signal"
                >
                  <span>Blueprints</span>

                  <ChevronDownIcon
                    className={`h-4 w-4 transition-transform duration-150 ${
                      mobileBlueprintsOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {mobileBlueprintsOpen && (
                  <ul className="mb-2 flex flex-col gap-1 border-l border-line pl-4">
                    {blueprints.map((blueprint) => (
                      <li key={`mobile-${blueprint.name}`}>
                        <a
                          href={blueprint.href}
                          target="_blank"
                          rel="noreferrer"
                          onClick={closeMobileMenu}
                          className="flex items-center justify-between gap-3 py-2 text-sm text-mute hover:text-white"
                        >
                          <span className="truncate">
                            {blueprint.name}
                          </span>

                          <ExternalLinkIcon className="h-3.5 w-3.5 shrink-0 text-mute-soft" />
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            </ul>

            <div className="mt-4 grid gap-2">
              <button
                type="button"
                onClick={() => {
                  closeMobileMenu();
                  onStartProject();
                }}
                className="flex items-center justify-center gap-2 bg-signal px-4 py-3 text-sm font-semibold text-[#04120a]"
              >
                Start a Project

                <ArrowRightIcon className="h-4 w-4" />
              </button>

              <a
                href="#contact"
                onClick={closeMobileMenu}
                className="flex items-center justify-center border border-line-strong px-4 py-3 font-mono text-[12px] tracking-label text-white"
              >
                CONTACT
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}