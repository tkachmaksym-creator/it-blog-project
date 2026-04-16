import Link from 'next/link';

const navItems = [
  { href: '/', label: 'Головна' },
  { href: '/categories/programming', label: 'Програмування' },
  { href: '/categories/ai-ml', label: 'Штучний інтелект' },
  { href: '/categories/gadgets', label: 'Пристрої' },
  { href: '/categories/cybersecurity', label: 'Інформаційна безпека' },
  { href: '/categories/tools', label: 'Інструменти' },
  { href: '/about', label: 'Про нас' },
];

export default function Navbar() {
  return (
    <nav className="navbar">
      <details className="nav-menu">
        <summary className="nav-toggle-btn">Меню</summary>
        <div className="nav-links">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>{item.label}</Link>
          ))}
        </div>
      </details>
    </nav>
  );
}
