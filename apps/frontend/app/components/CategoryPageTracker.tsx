'use client';
import { useEffect } from 'react';
import { trackEvent } from '@/lib/analytics';

interface Props {
  slug: string;
  name: string;
}

export default function CategoryPageTracker({ slug, name }: Props) {
  useEffect(() => {
    trackEvent('view_category_page', { category_slug: slug, category_name: name });
  }, [slug, name]);

  return null;
}
