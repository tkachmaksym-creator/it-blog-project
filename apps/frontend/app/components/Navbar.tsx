'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="navbar">
      <div className="nav-controls">
        <button className="nav-toggle-btn" onClick={toggleMenu}>
          {isOpen ? 'Закрити' : 'Меню'}
        </button>
      </div>
      
      <div className={`nav-links ${isOpen ? 'is-open' : ''}`}>
        <Link href="/" onClick={() => setIsOpen(false)}>Головна</Link>
        <Link href="/categories/programming" onClick={() => setIsOpen(false)}>Програмування</Link>
        <Link href="/categories/ai-ml" onClick={() => setIsOpen(false)}>Штучний інтелект</Link>
        <Link href="/categories/gadgets" onClick={() => setIsOpen(false)}>Пристрої</Link>
        <Link href="/categories/cybersecurity" onClick={() => setIsOpen(false)}>Інформаційна безпека</Link>
        <Link href="/categories/tools" onClick={() => setIsOpen(false)}>Інструменти</Link>
        <Link href="/about" onClick={() => setIsOpen(false)}>Про нас</Link>
      </div>
    </nav>
  );
}
