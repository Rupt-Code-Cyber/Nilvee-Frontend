import { useMemo, useRef, useState } from 'react';
import { AlertTriangleIcon, ArrowRightIcon, CheckIcon, Loader2Icon } from 'lucide-react';
import { budgetBands } from '../data/content';
import { useServices } from '../hooks/useServices';
import { ApiError, createInquiry } from '../utils/api';
import type { RequestState } from '../types/api';

interface FormValues {
  name: string;
  email: string;
  company: string;
  service: string;
  budget: string;
  message: string;
}

type FieldErrors = Partial<Record<keyof FormValues, string>>;

const emptyValues: FormValues = {
  name: '',
  email: '',
  company: '',
  service: '',
  budget: '',
  message: ''
};

interface InquiryFormProps {
  source: string;
  onSuccess?: () => void;
}

function Field({ id, label, error, required, children }: { id: string; label: string; error?: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="font-mono text-[11px] tracking-label text-mute">
        {label} {required && <span className="text-signal">*</span>}
      </label>
      {children}
      {error && <p className="text-xs text-red-400 font-mono mt-0.5">{error}</p>}
    </div>
  );
}

const inputClass = (hasError: boolean) =>
  `w-full bg-[#0b1b11] border ${hasError ? 'border-red-500/50 focus:border-red-500' : 'border-line focus:border-signal'} px-4 py-3 text-sm text-white focus:outline-none transition-colors duration-150 ease-out`;

export function InquiryForm({ source, onSuccess }: InquiryFormProps) {
  const [values, setValues] = useState<FormValues>(emptyValues);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [state, setState] = useState<RequestState>('idle');
  const [submitError, setSubmitError] = useState<string | null>(null);
  const inFlight = useRef<AbortController | null>(null);
  const { options, isLoading: servicesLoading } = useServices(true);

  const serviceOptions = useMemo(() => options.slice(0, 24), [options]);

  const setField = (field: keyof FormValues) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { value } = event.target;
    setValues((previous) => ({ ...previous, [field]: value }));
    setErrors((previous) => previous[field] ? { ...previous, [field]: undefined } : previous);
  };

  const validate = (): FieldErrors => {
    const next: FieldErrors = {};
    const trimmedEmail = values.email.trim();

    if (values.name.trim().length < 2) next.name = 'Please enter your name.';
    
    // ✅ Universal baseline check: ensures field isn't empty, contains '@', and has a domain dot
    if (!trimmedEmail) {
      next.email = 'Email address is required.';
    } else if (!trimmedEmail.includes('@') || !trimmedEmail.includes('.')) {
      next.email = 'Please enter a valid email address.';
    }

    if (values.message.trim().length < 20)
      next.message = 'Tell us a little more — at least 20 characters.';
    return next;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (state === 'loading') return;

    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    inFlight.current?.abort();
    const controller = new AbortController();
    inFlight.current = controller;

    setState('loading');
    setSubmitError(null);

    try {
      const chosenService = values.service || 'General Consulting';
      const chosenBudget = values.budget ? ` (${values.budget})` : '';
      const generatedSubject = `Inquiry: ${chosenService}${chosenBudget}`;

      const strictPayload = {
        name: values.name.trim(),
        email: values.email.trim(),
        company: values.company.trim() || undefined, 
        subject: generatedSubject.trim(), 
        message: values.message.trim(),
      };

      await createInquiry(
        strictPayload,
        controller.signal
      );
      
      setState('success');
      setValues(emptyValues);
      onSuccess?.();
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') return;
      setState('error');
      setSubmitError(
        error instanceof ApiError ?
        error.message :
        'Something went wrong sending your inquiry. Please try again.'
      );
    } finally {
      inFlight.current = null;
    }
  };

  if (state === 'success') {
    return (
      <div className="border border-signal/40 bg-signal/[0.06] p-8 text-center">
        <span className="mx-auto flex h-11 w-11 items-center justify-center border border-signal/60 text-signal">
          <CheckIcon className="h-5 w-5" aria-hidden="true" />
        </span>
        <h3 className="mt-6 text-xl font-semibold text-white">Inquiry received</h3>
        <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-mute">
          Your project brief is logged. An engineer will reply within one business day with next steps.
        </p>
        <button
          type="button"
          onClick={() => setState('idle')}
          className="mt-7 inline-flex items-center gap-2 border border-line-strong px-4 py-2.5 font-mono text-[11px] tracking-label text-white transition-colors duration-150 ease-out hover:border-signal hover:text-signal focus:outline-none focus-visible:ring-2 focus-visible:ring-signal">
          SEND ANOTHER
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id={`${source}-name`} label="NAME" error={errors.name} required>
          <input
            id={`${source}-name`}
            name="name"
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={setField('name')}
            aria-invalid={Boolean(errors.name)}
            className={inputClass(Boolean(errors.name))}
            placeholder="Ada Okafor" />
        </Field>
        
        <Field id={`${source}-email`} label="EMAIL ADDRESS" error={errors.email} required>
          <input
            id={`${source}-email`}
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={setField('email')}
            aria-invalid={Boolean(errors.email)}
            className={inputClass(Boolean(errors.email))}
            placeholder="ada@company.com" />
        </Field>
        
        <Field id={`${source}-company`} label="COMPANY">
          <input
            id={`${source}-company`}
            name="company"
            type="text"
            autoComplete="organization"
            value={values.company}
            onChange={setField('company')}
            className={inputClass(false)}
            placeholder="Company Ltd" />
        </Field>
        
        <Field id={`${source}-service`} label={servicesLoading ? 'SERVICE / LOADING…' : 'SERVICE'}>
          <select
            id={`${source}-service`}
            name="service"
            value={values.service}
            onChange={setField('service')}
            className={`${inputClass(false)} appearance-none`}>
            <option value="">Select a capability</option>
            {serviceOptions.map((option) =>
              <option key={option} value={option}>
                {option}
              </option>
            )}
          </select>
        </Field>
        
        <Field id={`${source}-budget`} label="BUDGET BAND">
          <select
            id={`${source}-budget`}
            name="budget"
            value={values.budget}
            onChange={setField('budget')}
            className={`${inputClass(false)} appearance-none`}>
            <option value="">Select a range</option>
            {budgetBands.map((band) =>
              <option key={band} value={band}>
                {band}
              </option>
            )}
          </select>
        </Field>
      </div>

      <Field id={`${source}-message`} label="WHAT ARE YOU BUILDING?" error={errors.message} required>
        <textarea
          id={`${source}-message`}
          name="message"
          rows={5}
          value={values.message}
          onChange={setField('message')}
          aria-invalid={Boolean(errors.message)}
          className={`${inputClass(Boolean(errors.message))} resize-y`}
          placeholder="Current stack, the problem you are solving, and any deadline we should design around." />
      </Field>

      {submitError && (
        <p role="alert" className="flex items-start gap-2 border border-red-500/40 bg-red-500/[0.07] px-4 py-3 text-sm text-red-300">
          <AlertTriangleIcon className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          {submitError}
        </p>
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={state === 'loading'}
          className="group inline-flex items-center justify-center gap-2 bg-signal px-6 py-4 text-[15px] font-semibold text-[#04120a] transition-colors duration-150 ease-out hover:bg-[#12b357] disabled:bg-[#12b357]/40 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2">
          {state === 'loading' ? (
            <>
              <Loader2Icon className="h-4 w-4 animate-spin" />
              SENDING...
            </>
          ) : (
            <>
              SUBMIT INQUIRY
              <ArrowRightIcon className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
