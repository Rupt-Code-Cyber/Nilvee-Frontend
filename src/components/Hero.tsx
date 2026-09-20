import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRightIcon, MessageSquareIcon } from 'lucide-react';
import { heroSignals } from '../data/content';
import { SystemGraph } from './SystemGraph';

interface HeroProps {
  onStartProject: () => void;
}

export function Hero({ onStartProject }: HeroProps) {
  const reduceMotion = useReducedMotion();
  const rise = (delay: number) =>
  reduceMotion ?
  {} :
  {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, delay, ease: [0.23, 1, 0.32, 1] as const }
  };

  return (
    <section
      id="top"
      className="grid-field relative border-b border-line pt-28 pb-16 sm:pt-32 lg:pt-40 lg:pb-24">
      
      <div className="mx-auto grid max-w-shell items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <div>
          <motion.p
            {...rise(0)}
            className="flex items-center gap-2 font-mono text-[11px] tracking-label text-mute-soft">
            
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-signal" />
            INFRASTRUCTURE / SOFTWARE / INTELLIGENCE
          </motion.p>

          <motion.h1
            {...rise(0.05)}
            className="mt-6 text-[2.6rem] font-bold leading-[1.02] tracking-[-0.03em] text-white sm:text-6xl lg:text-[4.35rem]">
            
            Engineering the systems behind ambitious companies.
          </motion.h1>

          <motion.p
            {...rise(0.1)}
            className="mt-7 max-w-xl text-base leading-relaxed text-mute sm:text-lg">
            
            Nilvee builds, secures, automates, and scales the technology systems modern businesses
            depend on—from cloud infrastructure and developer platforms to secure software and
            intelligent automation.
          </motion.p>

          <motion.div {...rise(0.15)} className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <button
              type="button"
              onClick={onStartProject}
              className="group inline-flex items-center justify-center gap-2 bg-signal px-6 py-4 text-[15px] font-semibold text-[#04120a] transition-colors duration-150 ease-out hover:bg-[#12b357] focus:outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-2 focus-visible:ring-offset-ink">
              
              Start an Engineering Project
              <ArrowRightIcon className="h-4 w-4 transition-transform duration-150 ease-out group-hover:translate-x-1" />
            </button>
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 border border-line-strong bg-ink-raised px-6 py-4 text-[15px] font-semibold text-white transition-colors duration-150 ease-out hover:border-signal hover:text-signal focus:outline-none focus-visible:ring-2 focus-visible:ring-signal">
              
              <MessageSquareIcon className="h-4 w-4" />
              Contact Us
            </a>
            <a
              href="#capabilities"
              className="inline-flex items-center justify-center px-6 py-4 text-[15px] font-medium text-mute transition-colors duration-150 ease-out hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-signal">
              
              Explore Capabilities
            </a>
          </motion.div>

          <motion.ul
            {...rise(0.2)}
            className="mt-12 grid grid-cols-1 gap-x-8 gap-y-3 border-t border-line pt-8 sm:grid-cols-2">
            
            {heroSignals.map((signal) =>
            <li
              key={signal}
              className="flex items-center gap-2.5 font-mono text-[11px] tracking-label text-mute-soft">
              
                <span aria-hidden="true" className="h-1.5 w-1.5 bg-signal" />
                {signal}
              </li>
            )}
          </motion.ul>
        </div>

        <motion.div {...rise(0.12)}>
          <SystemGraph />
        </motion.div>
      </div>
    </section>);

}