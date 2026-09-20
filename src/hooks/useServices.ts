import { useEffect, useState } from 'react';
import { getServices } from '../utils/api';
import { fallbackServices } from '../data/content';
import type { Service } from '../types/api';

interface UseServicesResult {
  options: string[];
  isLoading: boolean;
  usedFallback: boolean;
}

/**
 * Loads the public service catalogue. If the API is cold, slow, or unreachable
 * the form still works — it falls back to the local catalogue.
 */
export function useServices(enabled: boolean): UseServicesResult {
  const [options, setOptions] = useState<string[]>(fallbackServices.map((s) => s.name));
  const [isLoading, setIsLoading] = useState(false);
  const [usedFallback, setUsedFallback] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    const controller = new AbortController();
    let active = true;
    setIsLoading(true);

    getServices(controller.signal).
    then((services: Service[]) => {
      if (!active) return;
      const names = (Array.isArray(services) ? services : []).
      map((service) => service?.name).
      filter((name): name is string => typeof name === 'string' && name.trim().length > 0);

      if (names.length > 0) {
        setOptions([...names, 'Something else']);
        setUsedFallback(false);
      } else {
        setUsedFallback(true);
      }
    }).
    catch(() => {
      if (active) setUsedFallback(true);
    }).
    finally(() => {
      if (active) setIsLoading(false);
    });

    return () => {
      active = false;
      controller.abort();
    };
  }, [enabled]);

  return { options, isLoading, usedFallback };
}