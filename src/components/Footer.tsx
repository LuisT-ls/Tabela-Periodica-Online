'use client';

import { useTheme } from '@/contexts/ThemeContext';

export default function Footer() {
  const { theme } = useTheme();

  return (
    <footer className="py-4 mt-auto border-top"
      style={{
        backgroundColor: theme === 'dark' ? '#1a1a1a' : '#f8f9fa',
        borderTopColor: theme === 'dark' ? '#333' : '#dee2e6'
      }}>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-6 text-center text-md-start">
            <p className="mb-0 small"
              style={{ color: theme === 'dark' ? '#cccccc' : '#6c757d' }}>
              © 2024 Tabela Periódica Online
            </p>
          </div>
          <div className="col-md-6 text-center text-md-end">
            <p className="mb-0 small"
              style={{ color: theme === 'dark' ? '#cccccc' : '#6c757d' }}>
              Desenvolvido por{' '}
              <a
                href="https://github.com/LuisT-ls"
                target="_blank"
                rel="noopener noreferrer"
                className="text-decoration-none fw-semibold"
                style={{ color: theme === 'dark' ? '#0d6efd' : '#0d6efd' }}
              >
                Luís Antonio Souza Teixeira
                <i className="fab fa-github ms-1"></i>
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
