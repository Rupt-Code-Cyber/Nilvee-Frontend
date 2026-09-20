import { useEffect, useRef } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { XIcon } from 'lucide-react';
import { InquiryForm } from './InquiryForm';

interface InquiryDialogProps {
  open: boolean;
  onClose: () => void;
}

export function InquiryDialog({ open, onClose }: InquiryDialogProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.stopPropagation();
        onClose();
        return;
      }
      if (event.key !== 'Tab' || !panelRef.current) return;

      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus?.();
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open &&
      <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto p-4 sm:items-center sm:p-6">
          <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm" />
        
          <motion.div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="inquiry-dialog-title"
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 14, scale: 0.98 }}
          animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 10, scale: 0.98 }}
          transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
          className="relative z-10 my-auto w-full max-w-2xl border border-line bg-ink">
          
            <div className="flex items-start justify-between gap-4 border-b border-line px-6 py-5">
              <div>
                <p className="font-mono text-[11px] tracking-label text-signal">
                  NEW ENGINEERING PROJECT
                </p>
                <h2
                id="inquiry-dialog-title"
                className="mt-3 text-2xl font-bold tracking-[-0.02em] text-white">
                
                  Start an engineering project
                </h2>
              </div>
              <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close dialog"
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center border border-line-strong text-mute transition-colors duration-150 ease-out hover:border-signal hover:text-signal focus:outline-none focus-visible:ring-2 focus-visible:ring-signal">
              
                <XIcon className="h-4 w-4" />
              </button>
            </div>
            <div className="px-6 py-6 sm:px-8 sm:py-8">
              <InquiryForm source="hero-dialog" />
            </div>
          </motion.div>
        </div>
      }
    </AnimatePresence>);

}