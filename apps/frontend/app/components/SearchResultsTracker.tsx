'use client';
import { useEffect } from 'react';
import { trackEvent } from '@/lib/analytics';

interface SearchResultsTrackerProps {
  query: string;
  resultsCount: number;
}

export default function SearchResultsTracker({ query, resultsCount }: SearchResultsTrackerProps) {
  useEffect(() => {
    if (!query.trim()) return;
    trackEvent('view_search_results', {
      search_term: query,
      results_count: resultsCount,
    });
  }, [query, resultsCount]);

  return null;
}
