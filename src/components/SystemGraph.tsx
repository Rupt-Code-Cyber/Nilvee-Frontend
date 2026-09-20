import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { graphBranches, systemGraph } from '../data/content';

const widths = ['w-[136px]', 'w-[136px]', 'w-[136px]', 'w-[156px]', 'w-[156px]'];

export function SystemGraph() {
  const reduceMotion = useReducedMotion();

  return (
    <figure className="border border-line bg-ink-panel">
      <figcaption className="flex items-center justify-between border-b border-line px-4 py-3 font-mono text-[11px] tracking-label text-mute-soft">
        <span>NILVEE / SYSTEM GRAPH</span>
        <span className="flex items-center gap-2 text-signal">
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-signal" />
          ACTIVE
        </span>
      </figcaption>

      <div className="flex flex-col items-center gap-3 px-4 py-8 sm:px-8 sm:py-12">
        {systemGraph.slice(0, 4).map((node, index) =>
        <React.Fragment key={node.label}>
            <GraphNodeChip label={node.label} live={node.live} width={widths[index]} />
            <Connector />
          </React.Fragment>
        )}

        <div className="flex w-full items-center justify-center gap-2 sm:gap-4">
          {graphBranches.map((branch) =>
          <GraphNodeChip key={branch} label={branch} width="w-full max-w-[112px]" small />
          )}
        </div>

        <Connector />
        <GraphNodeChip label="INTELLIGENCE" width="w-[142px]" />
      </div>

      <div className="flex flex-col gap-1 border-t border-line px-4 py-3 font-mono text-[11px] tracking-label text-mute-soft sm:flex-row sm:items-center sm:justify-between">
        <span>LAYERS 06</span>
        <motion.span
          animate={reduceMotion ? undefined : { opacity: [0.55, 1, 0.55] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'linear' }}>
          
          SIGNAL / <span className="text-signal">GREEN = LIVE PATH</span>
        </motion.span>
      </div>
    </figure>);

}

interface ChipProps {
  label: string;
  live?: boolean;
  width: string;
  small?: boolean;
}

function GraphNodeChip({ label, live, width, small }: ChipProps) {
  return (
    <div
      className={`${width} flex items-center justify-center gap-2 border ${
      live ? 'border-signal/60 bg-signal/[0.07]' : 'border-line-strong bg-ink-raised'} ${
      small ? 'px-2 py-2' : 'px-3 py-2.5'}`}>
      
      <span
        aria-hidden="true"
        className={`h-1.5 w-1.5 shrink-0 rounded-full ${live ? 'bg-signal' : 'bg-mute-soft/60'}`} />
      
      <span
        className={`truncate font-mono text-[10px] tracking-label sm:text-[11px] ${
        live ? 'text-signal' : 'text-mute'}`
        }>
        
        {label}
      </span>
    </div>);

}

function Connector() {
  return <span aria-hidden="true" className="h-4 w-px bg-line-strong" />;
}