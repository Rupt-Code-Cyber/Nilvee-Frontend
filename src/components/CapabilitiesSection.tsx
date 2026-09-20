import { SectionHeading } from './SectionHeading';
import { useCapabilities } from '../hooks/useCapabilities';

export function CapabilitiesSection() {
  const { capabilities, isLoading, usedFallback } = useCapabilities(true);

  return (
    <section id="capabilities" className="border-b border-line py-20 lg:py-28">
      <div className="mx-auto max-w-shell px-5 sm:px-8">
        <SectionHeading
          label="LEVERAGE"
          title="Four capabilities, one engineering system."
          body="Most teams do not need another vendor. They need the layers underneath their product to be deliberate, documented, and owned."
        />

        <div className="mt-14 grid gap-px border border-line bg-line sm:grid-cols-2">
          {isLoading ? (
            // ✅ Clean skeleton design block during asynchronous API evaluation phases
            Array.from({ length: 4 }).map((_, i) => (
              <div 
                key={`skeleton-${i}`} 
                className="animate-pulse bg-ink p-6 sm:p-8 min-h-[340px] flex flex-col justify-between"
              >
                <div>
                  <div className="h-3 w-6 bg-line-strong rounded" />
                  <div className="h-6 w-2/3 bg-line-strong rounded mt-6" />
                  <div className="h-4 w-full bg-line-strong rounded mt-4" />
                  <div className="h-4 w-5/6 bg-line-strong rounded mt-2" />
                </div>
                <div className="h-20 border-t border-line mt-8 pt-6 flex flex-col gap-2">
                  <div className="h-3 w-1/2 bg-line-strong rounded" />
                  <div className="h-3 w-1/3 bg-line-strong rounded" />
                </div>
              </div>
            ))
          ) : (
            capabilities.map((capability) => (
              <article
                key={capability.index}
                className="group flex flex-col bg-ink p-6 transition-colors duration-200 ease-out hover:bg-ink-raised sm:p-8"
              >
                <div className="flex items-center justify-between font-mono text-[11px] tracking-label text-mute-soft">
                  <span>{capability.index}</span>

                  {/* ✅ Show matching visibility status indicators depending on backend data routing status */}
                  <span className={`font-mono text-[11px] tracking-label ${usedFallback ? 'text-mute opacity-40' : 'text-signal group-hover:opacity-100 transition-opacity duration-200 ease-out sm:opacity-0'}`}>
                    {usedFallback ? 'FALLBACK' : 'ACTIVE'}
                  </span>
                </div>

                <h3 className="mt-6 text-xl font-semibold tracking-[-0.01em] text-white sm:text-2xl">
                  {capability.title}
                </h3>

                <p className="mt-3 text-[15px] leading-relaxed text-mute">
                  {capability.summary}
                </p>

                <ul className="mt-8 flex flex-auto flex-col justify-end gap-2 border-t border-line pt-6">
                  {capability.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-center gap-2.5 font-mono text-[11px] tracking-label text-mute-soft"
                    >
                      <span
                        aria-hidden="true"
                        className={`h-1.5 w-1.5 ${usedFallback ? 'bg-mute-soft' : 'bg-signal'}`}
                      />
                      {point.toUpperCase()}
                    </li>
                  ))}
                </ul>
              </article>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
