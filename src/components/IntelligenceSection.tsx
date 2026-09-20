import { intelligenceOutcomes } from '../data/content';
import { SectionHeading } from './SectionHeading';

export function IntelligenceSection() {
  const [lead, ...rest] = intelligenceOutcomes;

  return (
    <section id="intelligence" className="border-b border-line py-20 lg:py-28">
      <div className="mx-auto max-w-shell px-5 sm:px-8">
        <SectionHeading
          label="INTELLIGENCE"
          title="Automation measured in work removed."
          body="We instrument the process before we automate it, so the result is a number your operators recognise — not a model demo." />
        

        <div className="mt-14 grid gap-px bg-line lg:grid-cols-[1.4fr_1fr]">
          <div className="bg-ink-panel p-8 sm:p-12">
            <p className="font-mono text-[11px] tracking-label text-mute-soft">{lead.note.toUpperCase()}</p>
            <p className="mt-6 text-6xl font-bold tracking-[-0.04em] text-signal sm:text-7xl">
              {lead.metric}
            </p>
            <p className="mt-4 max-w-md text-lg text-white">{lead.label}</p>
            <p className="mt-6 max-w-lg text-sm leading-relaxed text-mute">
              Event pipelines, document extraction, and decision support replace the manual work that quietly 
              limits how fast an operations team can scale.
            </p>
          </div>

          <div className="grid gap-px bg-line">
            {rest.map((item) =>
            <div key={item.label} className="bg-ink p-8">
                <p className="text-3xl font-bold tracking-[-0.03em] text-white sm:text-4xl">
                  {item.metric}
                </p>
                <p className="mt-2 text-sm text-mute">{item.label}</p>
                <p className="mt-4 font-mono text-[10px] tracking-label text-mute-soft">
                  {item.note.toUpperCase()}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>);

}