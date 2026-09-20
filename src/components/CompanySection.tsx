import { companyFacts } from '../data/content';
import { SectionHeading } from './SectionHeading';

export function CompanySection() {
  return (
    <section id="company" className="border-b border-line py-20 lg:py-28">
      <div className="mx-auto max-w-shell px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <SectionHeading
            label="COMPANY"
            title="Senior engineers, embedded in your systems."
            body="Nilvee is an engineering firm, not a staffing desk. The people who scope your architecture are the people who build it, and everything they build is documented for the team that inherits it." />
          

          <dl className="grid grid-cols-2 gap-px self-start bg-line">
            {companyFacts.map((fact) =>
            <div key={fact.label} className="bg-ink p-6">
                <dt className="font-mono text-[11px] tracking-label text-mute-soft">{fact.label}</dt>
                <dd className="mt-3 text-2xl font-semibold tracking-[-0.02em] text-white">
                  {fact.value}
                </dd>
              </div>
            )}
          </dl>
        </div>
      </div>
    </section>);

}