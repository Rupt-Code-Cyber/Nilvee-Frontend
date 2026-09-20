import { ShieldCheckIcon } from 'lucide-react';
import { securityControls } from '../data/content';
import { SectionHeading } from './SectionHeading';

export function SecuritySection() {
  return (
    <section id="security" className="border-b border-line bg-ink-raised py-20 lg:py-28">
      <div className="mx-auto max-w-shell px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div>
            <SectionHeading
              label="SECURITY BY DESIGN"
              title="Controls that exist in the build, not in a policy PDF."
              body="Security work is part of the architecture from the first sprint: identity, supply chain, data handling, and a rehearsed response path." />
            
            <div className="mt-10 flex items-start gap-3 border border-line bg-ink p-5">
              <ShieldCheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-signal" aria-hidden="true" />
              <p className="text-sm leading-relaxed text-mute">
                Security controls are engineered around applicable ISO 27001, SOC 2, PCI DSS, and HIPAA requirements, 
                with evidence produced as part of delivery.
              </p>
            </div>
          </div>

          <div className="grid gap-px bg-line sm:grid-cols-2">
            {securityControls.map((control) =>
            <article key={control.label} className="flex flex-col bg-ink p-6 sm:p-7">
                <p className="font-mono text-[11px] tracking-label text-signal">{control.label}</p>
                <h3 className="mt-5 text-lg font-semibold text-white">{control.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-mute">{control.body}</p>
              </article>
            )}
          </div>
        </div>
      </div>
    </section>);

}