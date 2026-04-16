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
      <input id="nav-menu-toggle" className="nav-menu-toggle" type="checkbox" aria-label="Відкрити меню" />
      <label className="nav-toggle-btn" htmlFor="nav-menu-toggle">Меню</label>
      <div className="nav-links">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href}>{item.label}</Link>
        ))}
      </div>
    </nav>
  );
}
