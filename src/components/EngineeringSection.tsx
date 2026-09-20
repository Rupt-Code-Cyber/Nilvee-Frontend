import { engineeringSteps } from '../data/content';
import { SectionHeading } from './SectionHeading';

export function EngineeringSection() {
  return (
    <section id="engineering" className="border-b border-line py-20 lg:py-28">
      <div className="mx-auto max-w-shell px-5 sm:px-8">
        <SectionHeading
          label="ENGINEERING MODEL"
          title="A sequenced programme, not an open-ended retainer."
          body="Every engagement runs through the same four stages so you always know what is being built, what it costs, and when your team takes it over." />
        

        <ol className="mt-14 border-t border-line">
          {engineeringSteps.map((step, index) =>
          <li
            key={step.step}
            className="grid gap-4 border-b border-line py-8 lg:grid-cols-[132px_1fr_160px] lg:items-start lg:gap-10">
            
              <div className="flex items-center gap-3 font-mono text-[11px] tracking-label text-signal">
                <span className="text-mute-soft">{String(index + 1).padStart(2, '0')}</span>
                {step.step}
              </div>
              <div>
                <h3 className="text-xl font-semibold tracking-[-0.01em] text-white sm:text-2xl">
                  {step.title}
                </h3>
                <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-mute">{step.body}</p>
              </div>
              <div className="font-mono text-[11px] tracking-label text-mute-soft lg:text-right">
                {step.duration.toUpperCase()}
              </div>
            </li>
          )}
        </ol>
      </div>
    </section>);

}