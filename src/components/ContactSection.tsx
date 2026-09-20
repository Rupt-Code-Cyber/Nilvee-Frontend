import React from 'react';
import { ClockIcon, MailIcon, MapPinIcon } from 'lucide-react';
import { InquiryForm } from './InquiryForm';
import { SectionHeading } from './SectionHeading';

export function ContactSection() {
  return (
    <section id="contact" className="grid-field border-b border-line py-20 lg:py-28">
      <div className="mx-auto max-w-shell px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div>
            <SectionHeading
              label="START A PROJECT"
              title="Tell us what you are building."
              body="Send a short brief and we will come back with a shaped engagement: scope, sequence, and the team who would deliver it." />
            

            <ul className="mt-10 flex flex-col gap-px bg-line">
              <ContactRow icon={<MailIcon className="h-4 w-4" />} label="EMAIL">
                <a
                  href="mailto:engineering@nilvee.com"
                  className="text-white transition-colors duration-150 ease-out hover:text-signal focus:outline-none focus-visible:ring-2 focus-visible:ring-signal">
                  
                  engineering@nilvee.com
                </a>
              </ContactRow>
              <ContactRow icon={<ClockIcon className="h-4 w-4" />} label="RESPONSE">
                <span className="text-white">Within 1 business day</span>
              </ContactRow>
              <ContactRow icon={<MapPinIcon className="h-4 w-4" />} label="COVERAGE">
                <span className="text-white">Remote-first · EU, UK &amp; US time zones</span>
              </ContactRow>
            </ul>
          </div>

          <div className="border border-line bg-ink-panel p-6 sm:p-8 lg:p-10">
            <InquiryForm source="contact-section" />
          </div>
        </div>
      </div>
    </section>);

}

interface ContactRowProps {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}

function ContactRow({ icon, label, children }: ContactRowProps) {
  return (
    <li className="flex flex-wrap items-center gap-x-4 gap-y-2 bg-ink px-5 py-4">
      <span className="flex items-center gap-2.5 font-mono text-[11px] tracking-label text-mute-soft">
        <span className="text-signal" aria-hidden="true">
          {icon}
        </span>
        {label}
      </span>
      <span className="text-[15px]">{children}</span>
    </li>);

}