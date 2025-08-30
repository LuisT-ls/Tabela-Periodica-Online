import Link from 'next/link';
import { getRoutes } from '@/routes';

export default function HomePage() {
  const routes = getRoutes();

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="text-center mb-12">
        <h1 className="text-5xl font-bold text-primary mb-4">
          Tabela Periódica Online
        </h1>
        <p className="text-xl text-muted mb-8 max-w-3xl mx-auto">
          Explore os elementos químicos de forma interativa e educativa.
          Descubra propriedades, história e aplicações dos elementos que compõem nosso universo.
        </p>
        <div className="flex justify-center space-x-4">
          <Link
            href="/tabela"
            className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors font-semibold"
          >
            <i className="fas fa-table mr-2"></i>
            Ver Tabela Completa
          </Link>
          <Link
            href="/elementos"
            className="bg-secondary text-white px-6 py-3 rounded-lg hover:bg-secondary-dark transition-colors font-semibold"
          >
            <i className="fas fa-atom mr-2"></i>
            Explorar Elementos
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="grid md:grid-cols-3 gap-8 mb-12">
        <div className="text-center p-6 bg-light rounded-lg">
          <i className="fas fa-search text-4xl text-primary mb-4"></i>
          <h3 className="text-xl font-semibold mb-2">Busca Inteligente</h3>
          <p className="text-muted">
            Encontre elementos por nome, símbolo, número atômico ou propriedades específicas.
          </p>
        </div>

        <div className="text-center p-6 bg-light rounded-lg">
          <i className="fas fa-chart-line text-4xl text-primary mb-4"></i>
          <h3 className="text-xl font-semibold mb-2">Dados Detalhados</h3>
          <p className="text-muted">
            Acesse informações completas sobre massa atômica, configuração eletrônica e muito mais.
          </p>
        </div>

        <div className="text-center p-6 bg-light rounded-lg">
          <i className="fas fa-mobile-alt text-4xl text-primary mb-4"></i>
          <h3 className="text-xl font-semibold mb-2">Responsivo</h3>
          <p className="text-muted">
            Interface otimizada para desktop, tablet e dispositivos móveis.
          </p>
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="bg-light p-8 rounded-lg">
        <h2 className="text-3xl font-bold text-center mb-8">Navegação Rápida</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {routes.map((route) => (
            <Link
              key={route.path}
              href={route.path}
              className="flex items-center space-x-3 p-4 bg-white rounded-lg hover:shadow-md transition-shadow"
            >
              <i className={`${route.icon} text-2xl text-primary`}></i>
              <div>
                <h3 className="font-semibold">{route.name}</h3>
                <p className="text-sm text-muted">Acessar {route.name.toLowerCase()}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="mt-12 text-center">
        <h2 className="text-3xl font-bold mb-4">Sobre a Tabela Periódica</h2>
        <p className="text-lg text-muted max-w-4xl mx-auto">
          A tabela periódica é uma ferramenta fundamental na química que organiza os elementos
          químicos de acordo com suas propriedades e estrutura atômica. Desenvolvida por Dmitri
          Mendeleev em 1869, ela continua sendo essencial para o estudo e compreensão da química moderna.
        </p>
      </section>
    </div>
  );
}
