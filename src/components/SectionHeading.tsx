import React from 'react';

interface SectionHeadingProps {
  label: string;
  title: string;
  body?: string;
  align?: 'left' | 'between';
  children?: React.ReactNode;
}

export function SectionHeading({ label, title, body, align = 'left', children }: SectionHeadingProps) {
  return (
    <div
      className={
      align === 'between' ?
      'flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between' :
      'max-w-3xl'
      }>
      
      <div className="max-w-2xl">
        <p className="flex items-center gap-2 font-mono text-[11px] tracking-label text-mute-soft">
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-signal" />
          {label}
        </p>
        <h2 className="mt-5 text-3xl font-bold leading-[1.1] tracking-[-0.025em] text-white sm:text-[2.6rem]">
          {title}
        </h2>
        {body && <p className="mt-5 text-base leading-relaxed text-mute">{body}</p>}
      </div>
      {children}
    </div>);

}