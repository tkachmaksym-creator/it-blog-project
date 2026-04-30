'use client';
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchForm() {
  const router = useRouter();
  const [query, setQuery] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    router.push(`/search?q=${encodeURIComponent(trimmed)}`);
  };

  return (
    <form className="search-form" onSubmit={handleSubmit} role="search" aria-label="Пошук по сайту">
      <input
        className="search-input"
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Пошук статей..."
        aria-label="Пошук статей"
      />
      <button className="win-btn search-submit" type="submit">
        Знайти
      </button>
    </form>
  );
}
