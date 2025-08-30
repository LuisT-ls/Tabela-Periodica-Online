'use client';

import { useEffect } from 'react';

export default function BootstrapScript() {
  useEffect(() => {
    // Carregar Bootstrap JavaScript dinamicamente
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup: remover o script quando o componente for desmontado
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return null;
}
