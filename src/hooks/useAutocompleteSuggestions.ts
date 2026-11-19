import { useEffect, useRef, useState, useCallback } from 'react';
import { useMapsLibrary } from '@vis.gl/react-google-maps';

export type UseAutocompleteSuggestionsReturn = {
  suggestions: google.maps.places.AutocompleteSuggestion[];
  isLoading: boolean;
  resetSession: () => void;
};

export function useAutocompleteSuggestions(
  inputString: string,
  enabled: boolean = true,
  requestOptions: Partial<google.maps.places.AutocompleteRequest> = {}
): UseAutocompleteSuggestionsReturn {
  const placesLib = useMapsLibrary('places');

  const sessionTokenRef =
    useRef<google.maps.places.AutocompleteSessionToken | null>(null);

  const [suggestions, setSuggestions] = useState<
    google.maps.places.AutocompleteSuggestion[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!placesLib || !enabled) {
      setSuggestions([]);
      setIsLoading(false);
      return;
    }

    const trimmed = inputString.trim();
    if (trimmed.length < 3) {
      setSuggestions([]);
      setIsLoading(false);
      return;
    }

    const { AutocompleteSessionToken, AutocompleteSuggestion } = placesLib;

    if (!sessionTokenRef.current) {
      sessionTokenRef.current = new AutocompleteSessionToken();
    }

    let cancelled = false;
    const timer = setTimeout(async () => {
      setIsLoading(true);
      try {
        const request: google.maps.places.AutocompleteRequest = {
          ...requestOptions,
          input: trimmed,
          sessionToken: sessionTokenRef.current!,
        };

        const res =
          await AutocompleteSuggestion.fetchAutocompleteSuggestions(request);
        if (!cancelled) {
          setSuggestions(res?.suggestions ?? []);
        }
      } catch (err: any) {
        if (!cancelled) {
          setSuggestions([]);
          const msg = String(err?.message || err || '');
          if (
            msg.includes('RESOURCE_EXHAUSTED') ||
            msg.includes('OVER_QUERY_LIMIT') ||
            msg.includes('429') ||
            err?.status === 429
          ) {
            window.dispatchEvent(new CustomEvent('gmp-quota-exceeded'));
          }
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }, 250);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [placesLib, inputString, enabled]);

  const resetSession = useCallback(() => {
    sessionTokenRef.current = null;
    setSuggestions([]);
  }, []);

  return {
    suggestions,
    isLoading,
    resetSession,
  };
}
