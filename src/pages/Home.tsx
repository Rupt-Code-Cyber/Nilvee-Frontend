import React, { useCallback, useState } from 'react';
import { SiteHeader } from '../components/SiteHeader';
import { Hero } from '../components/Hero';
import { CapabilitiesSection } from '../components/CapabilitiesSection';
import { EngineeringSection } from '../components/EngineeringSection';
import { SecuritySection } from '../components/SecuritySection';
import { IntelligenceSection } from '../components/IntelligenceSection';
import { CompanySection } from '../components/CompanySection';
import { ContactSection } from '../components/ContactSection';
import { SiteFooter } from '../components/SiteFooter';
import { InquiryDialog } from '../components/InquiryDialog';

export function Home() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const openDialog = useCallback(() => setDialogOpen(true), []);
  const closeDialog = useCallback(() => setDialogOpen(false), []);

  return (
    <div className="min-h-screen w-full bg-ink">
      <a
        href="#capabilities"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-signal focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-[#04120a]">
        
        Skip to content
      </a>
      <SiteHeader onStartProject={openDialog} />
      <main>
        <Hero onStartProject={openDialog} />
        <CapabilitiesSection />
        <EngineeringSection />
        <SecuritySection />
        <IntelligenceSection />
        <CompanySection />
        <ContactSection />
      </main>
      <SiteFooter />
      <InquiryDialog open={dialogOpen} onClose={closeDialog} />
    </div>);

}