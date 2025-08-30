'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getRoutes } from '@/routes';

export default function Header() {
  const pathname = usePathname();
  const routes = getRoutes();

  return (
    <header className="bg-primary text-white shadow-lg">
      <nav className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold hover:text-light">
            Tabela Periódica Online
          </Link>

          <ul className="flex space-x-6">
            {routes.map((route) => (
              <li key={route.path}>
                <Link
                  href={route.path}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors ${pathname === route.path
                      ? 'bg-white text-primary font-semibold'
                      : 'hover:bg-white hover:text-primary'
                    }`}
                >
                  <i className={route.icon}></i>
                  <span>{route.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}
