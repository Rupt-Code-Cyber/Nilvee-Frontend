import type { InquiryPayload, Service } from '../types/api';

export const API_BASE_URL = 'https://nilvee-backend.onrender.com/api/v1';

const DEFAULT_TIMEOUT = 15000;

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

interface RequestOptions {
  method?: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  body?: unknown;
  signal?: AbortSignal;
  timeout?: number;
}

/**
 * Small, dependency-free fetch wrapper: JSON in / JSON out, hard timeout,
 * caller-controlled abort, and normalized errors so the UI never throws raw.
 */
export async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { method = 'GET', body, signal, timeout = DEFAULT_TIMEOUT } = options;
  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), timeout);

  const onExternalAbort = () => controller.abort();
  if (signal) {
    if (signal.aborted) controller.abort();else
    signal.addEventListener('abort', onExternalAbort);
  }

  try {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      method,
      headers: body ? { 'Content-Type': 'application/json' } : undefined,
      body: body ? JSON.stringify(body) : undefined,
      signal: controller.signal
    });

    const raw = await response.text();
    let parsed: unknown = null;
    if (raw) {
      try {
        parsed = JSON.parse(raw);
      } catch {
        parsed = raw;
      }
    }

    if (!response.ok) {
      const message =
      typeof parsed === 'object' &&
      parsed !== null && (
      (parsed as {message?: string;}).message ||
      (parsed as {error?: string;}).error) ||
      `Request failed with status ${response.status}`;
      throw new ApiError(String(message), response.status);
    }

    return unwrap<T>(parsed);
  } catch (error) {
    if (error instanceof ApiError) throw error;
    if (error instanceof DOMException && error.name === 'AbortError') {
      if (signal?.aborted) throw error;
      throw new ApiError('The request timed out. Please try again.', 408);
    }
    throw new ApiError('Network unavailable. Please check your connection.', 0);
  } finally {
    window.clearTimeout(timer);
    if (signal) signal.removeEventListener('abort', onExternalAbort);
  }
}

/** Accepts either a bare payload or a { data } / { services } envelope. */
function unwrap<T>(parsed: unknown): T {
  if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
    const record = parsed as Record<string, unknown>;
    for (const key of ['data', 'services', 'inquiry', 'result']) {
      if (key in record) return record[key] as T;
    }
  }
  return parsed as T;
}

export function getServices(signal?: AbortSignal): Promise<Service[]> {
  return request<Service[]>('/services', { signal });
}

export function createInquiry(payload: InquiryPayload, signal?: AbortSignal): Promise<unknown> {
  return request('/inquiries', { method: 'POST', body: payload, signal });
}