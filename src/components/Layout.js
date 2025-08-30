'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getRoutes } from '@/routes';

export default function Layout({ children }) {
  const pathname = usePathname();
  const routes = getRoutes();

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Navbar fixo no topo */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top shadow">
        <div className="container">
          <Link href="/" className="navbar-brand fw-bold fs-4">
            <i className="fas fa-atom me-2"></i>
            Tabela Periódica Online
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              {routes.map((route) => (
                <li key={route.path} className="nav-item">
                  <Link
                    href={route.path}
                    className={`nav-link d-flex align-items-center ${
                      pathname === route.path ? 'active fw-semibold' : ''
                    }`}
                  >
                    <i className={`${route.icon} me-2`}></i>
                    <span>{route.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>

      {/* Conteúdo principal com padding-top para compensar o navbar fixo */}
      <main className="flex-grow-1" style={{ paddingTop: '76px' }}>
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-dark text-white py-4 mt-auto">
        <div className="container">
          <div className="text-center">
            <p className="mb-0">
              <i className="fas fa-code me-2"></i>
              Desenvolvido por Luís Antonio Souza Teixeira
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
