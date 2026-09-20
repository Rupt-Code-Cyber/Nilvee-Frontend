export interface Service {
  _id?: string;
  id?: string;
  name: string;
  slug?: string;
  category?: string;
  summary?: string;
  description?: string;
  isInternal?: boolean;
}

export interface InquiryPayload {
  name: string;
  email: string;
  company?: string;
  service?: string;
  budget?: string;
  message: string;
  source?: string;
}

export interface Inquiry extends InquiryPayload {
  _id?: string;
  id?: string;
  status?: string;
  createdAt?: string;
}

export type RequestState = 'idle' | 'loading' | 'success' | 'error';