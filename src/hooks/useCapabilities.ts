import { useEffect, useState } from 'react';
import { getServices } from '../utils/api';
import { capabilities } from '../data/content';
import type { Service } from '../types/api';

export interface Capability {
  index: string;
  title: string;
  summary: string;
  points: string[];
}

interface UseCapabilitiesResult {
  capabilities: Capability[];
  isLoading: boolean;
  usedFallback: boolean;
}

export function useCapabilities(enabled: boolean): UseCapabilitiesResult {
  const [items, setItems] = useState<Capability[]>(capabilities);
  const [isLoading, setIsLoading] = useState(false);
  const [usedFallback, setUsedFallback] = useState(true);

  useEffect(() => {
    if (!enabled) return;

    const controller = new AbortController();
    let active = true;

    setIsLoading(true);

    getServices(controller.signal)
      .then((services: Service[]) => {
        if (!active) return;

        const validServices = (Array.isArray(services) ? services : []).filter(
          (service) =>
            service &&
            typeof service.name === 'string' &&
            typeof service.description === 'string',
        );

        if (validServices.length === 0) {
          setUsedFallback(true);
          return;
        }

        const mapped = validServices.map((service, index) => {
          // Align dynamic text details with static checklist arrays by name match
          const fallback =
            capabilities.find(
              (capability) =>
                capability.title.toLowerCase() === service.name.toLowerCase(),
            ) ?? capabilities[index];

          return {
            index: String(index + 1).padStart(2, '0'),
            title: service.name,
            summary: service.description || '', // ✅ Fixed: Guarantees string type compliance for strict compiler matching
            points: fallback?.points ?? [],
          };
        });

        setItems(mapped);
        setUsedFallback(false);
      })
      .catch(() => {
        if (active) setUsedFallback(true);
      })
      .finally(() => {
        if (active) setIsLoading(false);
      });

    return () => {
      active = false;
      controller.abort();
    };
  }, [enabled]);

  return {
    capabilities: items,
    isLoading,
    usedFallback,
  };
}
