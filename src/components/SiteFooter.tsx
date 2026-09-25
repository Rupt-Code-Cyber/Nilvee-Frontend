
const columns = [
{
  title: 'CAPABILITIES',
  links: [
  { label: 'Cloud infrastructure', href: '#capabilities' },
  { label: 'Developer platforms', href: '#capabilities' },
  { label: 'Secure software', href: '#capabilities' },
  { label: 'Intelligent automation', href: '#capabilities' }]

},
{
  title: 'COMPANY',
  links: [
  { label: 'Engineering model', href: '#engineering' },
  { label: 'Security posture', href: '#security' },
  { label: 'Outcomes', href: '#intelligence' },
  { label: 'About Nilvee', href: '#company' }]

},
{
  title: 'CONTACT',
  links: [
  { label: 'Start a project', href: '#contact' },
  { label: 'engineering@nilvee.online', href: 'mailto:engineering@nilvee.com' }]

}];


export function SiteFooter() {
  return (
    <footer className="bg-ink py-14">
      <div className="mx-auto max-w-shell px-5 sm:px-8">
        <div className="grid gap-10 border-b border-line pb-12 lg:grid-cols-[1.2fr_2fr] lg:gap-16">
          <div>
            <div className="flex items-center gap-2.5">
              <span
                aria-hidden="true"
                className="flex h-6 w-6 items-center justify-center border border-line-strong text-[11px] font-semibold text-signal">
                
                N
              </span>
              <span className="font-mono text-sm font-semibold tracking-label text-white">
                NILVEE
              </span>
            </div>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-mute">
              Engineering the infrastructure, software, and automation ambitious companies run on.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            {columns.map((column) =>
            <nav key={column.title} aria-label={column.title}>
                <p className="font-mono text-[10px] tracking-label text-mute-soft">{column.title}</p>
                <ul className="mt-5 flex flex-col gap-3">
                  {column.links.map((link) =>
                <li key={link.label}>
                      <a
                    href={link.href}
                    className="text-sm text-mute transition-colors duration-150 ease-out hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-signal">
                    
                        {link.label}
                      </a>
                    </li>
                )}
                </ul>
              </nav>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-8 font-mono text-[10px] tracking-label text-mute-soft sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} NILVEE ENGINEERING</span>
          <span>SYSTEMS / SECURITY / INTELLIGENCE</span>
        </div>
      </div>
    </footer>);

}