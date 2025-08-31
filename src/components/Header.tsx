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
    <nav className="navbar navbar-expand-lg fixed-top shadow-sm"
      style={{
        backgroundColor: theme === 'dark' ? '#1a1a1a' : '#ffffff',
        borderBottom: `1px solid ${theme === 'dark' ? '#333' : '#e9ecef'}`
      }}>
      <div className="container">
        {/* Logo/Brand */}
        <Link href="/" className="navbar-brand fw-bold text-decoration-none"
          style={{ color: theme === 'dark' ? '#ffffff' : '#0d6efd' }}>
          <i className="fas fa-atom me-2"></i>
          Tabela Periódica
        </Link>

        {/* Botão do menu mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
          style={{
            borderColor: theme === 'dark' ? '#666' : '#dee2e6',
            color: theme === 'dark' ? '#ffffff' : '#000000'
          }}>
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Links de navegação */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            {routes.map((route) => (
              <li key={route.path} className="nav-item">
                <Link
                  href={route.path}
                  className={`nav-link d-flex align-items-center gap-2 ${pathname === route.path ? 'active fw-semibold' : ''
                    }`}
                  style={{
                    color: pathname === route.path
                      ? (theme === 'dark' ? '#ffffff' : '#0d6efd')
                      : (theme === 'dark' ? '#cccccc' : '#6c757d')
                  }}
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
            className="btn btn-outline-secondary btn-sm d-flex align-items-center gap-2"
            style={{
              borderColor: theme === 'dark' ? '#666' : '#dee2e6',
              color: theme === 'dark' ? '#ffffff' : '#6c757d'
            }}
            aria-label={theme === 'light' ? 'Alternar para modo escuro' : 'Alternar para modo claro'}
            title={theme === 'light' ? 'Alternar para modo escuro' : 'Alternar para modo claro'}
          >
            {theme === 'light' ? (
              <>
                <i className="fas fa-moon"></i>
                <span className="d-none d-sm-inline">Escuro</span>
              </>
            ) : (
              <>
                <i className="fas fa-sun"></i>
                <span className="d-none d-sm-inline">Claro</span>
              </>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}
