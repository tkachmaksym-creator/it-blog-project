'use client';
import { useEffect, useRef } from 'react';
import { trackEvent } from '@/lib/analytics';

interface Props {
  slug: string;
  category?: string;
}

export default function ArticleTracker({ slug, category }: Props) {
  const scroll75Fired = useRef(false);
  const readCompleteFired = useRef(false);
  const startTime = useRef(Date.now());

  useEffect(() => {
    startTime.current = Date.now();
    scroll75Fired.current = false;
    readCompleteFired.current = false;

    const handleScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;
      const pct = window.scrollY / docHeight;

      if (!scroll75Fired.current && pct >= 0.75) {
        scroll75Fired.current = true;
        trackEvent('scroll_75', { article_slug: slug, category });
      }

      if (!readCompleteFired.current && pct >= 0.9) {
        const elapsed = Math.round((Date.now() - startTime.current) / 1000);
        if (elapsed >= 60) {
          readCompleteFired.current = true;
          trackEvent('article_read_complete', { article_slug: slug, category, read_time_s: elapsed });
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [slug, category]);

  return null;
}
