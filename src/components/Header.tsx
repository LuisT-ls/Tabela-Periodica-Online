'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getRoutes } from '@/routes';
import { useTheme } from '@/contexts/ThemeContext';

export default function Header() {
  const pathname = usePathname();
  const routes = getRoutes();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="bg-primary dark:bg-dark-surface text-white dark:text-dark-text shadow-lg border-b border-gray-200 dark:border-dark-border">
      <nav className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold hover:text-light dark:hover:text-dark-text-secondary transition-colors">
            Tabela Periódica Online
          </Link>

          <div className="flex items-center space-x-4">
            <ul className="flex space-x-6">
              {routes.map((route) => (
                <li key={route.path}>
                  <Link
                    href={route.path}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors ${pathname === route.path
                        ? 'bg-white dark:bg-dark-bg text-primary dark:text-dark-text font-semibold'
                        : 'hover:bg-white dark:hover:bg-dark-bg hover:text-primary dark:hover:text-dark-text'
                      }`}
                  >
                    <i className={route.icon}></i>
                    <span>{route.name}</span>
                  </Link>
                </li>
              ))}
            </ul>

            {/* Botão de alternância de tema */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-md bg-white dark:bg-dark-bg text-primary dark:text-dark-text hover:bg-gray-100 dark:hover:bg-dark-border transition-colors duration-200"
              aria-label={theme === 'light' ? 'Alternar para modo escuro' : 'Alternar para modo claro'}
              title={theme === 'light' ? 'Alternar para modo escuro' : 'Alternar para modo claro'}
            >
              {theme === 'light' ? (
                <i className="fas fa-moon text-lg"></i>
              ) : (
                <i className="fas fa-sun text-lg"></i>
              )}
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
