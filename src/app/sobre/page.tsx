export default function SobrePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-primary dark:text-primary mb-4">
          Sobre o Projeto
        </h1>
        <p className="text-lg text-muted dark:text-dark-text-secondary">
          Conheça mais sobre a Tabela Periódica Online e sua história
        </p>
      </div>

      {/* Propósito da Aplicação */}
      <div className="bg-white dark:bg-dark-surface rounded-lg shadow-lg dark:shadow-xl dark:shadow-black/20 p-6 mb-8 border border-gray-200 dark:border-dark-border">
        <h2 className="text-2xl font-bold text-primary dark:text-primary mb-4">
          <i className="fas fa-bullseye mr-2"></i>
          Propósito da Aplicação
        </h2>
        <p className="text-muted dark:text-dark-text-secondary mb-4">
          A <strong>Tabela Periódica Online</strong> é uma ferramenta educativa e interativa desenvolvida
          para facilitar o aprendizado e a compreensão dos elementos químicos. Nosso objetivo é tornar
          o estudo da química mais acessível, visual e envolvente para estudantes, professores e
          entusiastas da ciência.
        </p>
        <p className="text-muted dark:text-dark-text-secondary mb-4">
          Através de uma interface moderna e responsiva, oferecemos:
        </p>
        <ul className="list-disc list-inside text-muted dark:text-dark-text-secondary space-y-2 mb-4">
          <li><strong>Exploração Interativa:</strong> Navegue pela tabela periódica com informações detalhadas de cada elemento</li>
          <li><strong>Comparação de Elementos:</strong> Compare propriedades entre diferentes elementos químicos</li>
          <li><strong>Quiz Educativo:</strong> Teste seus conhecimentos sobre os elementos químicos</li>
          <li><strong>Informações Completas:</strong> Acesso a dados como massa atômica, configuração eletrônica, propriedades físicas e químicas</li>
        </ul>
        <p className="text-muted dark:text-dark-text-secondary">
          Esta aplicação é ideal para uso em salas de aula, estudos independentes e como referência
          rápida para profissionais da área.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {/* Sobre a Tabela Periódica */}
        <div className="bg-white dark:bg-dark-surface rounded-lg shadow-lg dark:shadow-xl dark:shadow-black/20 p-6 border border-gray-200 dark:border-dark-border">
          <h2 className="text-2xl font-bold text-primary mb-4">
            <i className="fas fa-info-circle mr-2"></i>
            Sobre a Tabela Periódica
          </h2>
          <p className="text-muted mb-4">
            A tabela periódica é uma ferramenta fundamental na química que organiza os elementos
            químicos de acordo com suas propriedades e estrutura atômica.
          </p>
          <p className="text-muted mb-4">
            Desenvolvida por Dmitri Mendeleev em 1869, ela continua sendo essencial para o estudo
            e compreensão da química moderna, permitindo prever propriedades de elementos e
            compreender as relações entre eles.
          </p>
          <p className="text-muted">
            A tabela é organizada em períodos (linhas horizontais) e grupos (colunas verticais),
            onde elementos com propriedades similares são agrupados juntos.
          </p>
        </div>

        {/* Tecnologias Utilizadas */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-primary mb-4">
            <i className="fas fa-code mr-2"></i>
            Tecnologias Utilizadas
          </h2>
          <div className="space-y-3">
            <div className="flex items-center">
              <i className="fab fa-react text-2xl text-blue-500 mr-3"></i>
              <div>
                <h3 className="font-semibold">React.js</h3>
                <p className="text-sm text-muted">Biblioteca JavaScript para interfaces de usuário</p>
              </div>
            </div>
            <div className="flex items-center">
              <i className="fas fa-server text-2xl text-green-500 mr-3"></i>
              <div>
                <h3 className="font-semibold">Next.js 14</h3>
                <p className="text-sm text-muted">Framework React com App Router e SSR</p>
              </div>
            </div>
            <div className="flex items-center">
              <i className="fab fa-bootstrap text-2xl text-purple-500 mr-3"></i>
              <div>
                <h3 className="font-semibold">Bootstrap 5</h3>
                <p className="text-sm text-muted">Framework CSS responsivo e moderno</p>
              </div>
            </div>
            <div className="flex items-center">
              <i className="fab fa-font-awesome text-2xl text-blue-600 mr-3"></i>
              <div>
                <h3 className="font-semibold">FontAwesome</h3>
                <p className="text-sm text-muted">Biblioteca de ícones vetoriais</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Link para GitHub */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-bold text-primary mb-4">
          <i className="fab fa-github mr-2"></i>
          Código Fonte
        </h2>
        <p className="text-muted mb-4">
          Este projeto é de código aberto e está disponível no GitHub. Contribuições, sugestões e
          melhorias são sempre bem-vindas!
        </p>
        <a
          href="https://github.com/LuisT-ls/Tabela-Periodica-Online"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
        >
          <i className="fab fa-github mr-2"></i>
          Ver no GitHub
        </a>
      </div>

      {/* História da Tabela Periódica */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-bold text-primary mb-4">
          <i className="fas fa-history mr-2"></i>
          História da Tabela Periódica
        </h2>
        <div className="space-y-4">
          <div className="border-l-4 border-primary pl-4">
            <h3 className="font-semibold">1869 - Dmitri Mendeleev</h3>
            <p className="text-muted">
              Mendeleev publicou a primeira versão da tabela periódica, organizando os elementos
              por massa atômica e propriedades químicas.
            </p>
          </div>
          <div className="border-l-4 border-primary pl-4">
            <h3 className="font-semibold">1913 - Henry Moseley</h3>
            <p className="text-muted">
              Moseley reorganizou a tabela por número atômico, criando a base da tabela moderna.
            </p>
          </div>
          <div className="border-l-4 border-primary pl-4">
            <h3 className="font-semibold">1940s - Glenn Seaborg</h3>
            <p className="text-muted">
              Seaborg reorganizou a tabela, criando a série dos actinídeos e expandindo o conhecimento
              sobre elementos transurânicos.
            </p>
          </div>
        </div>
      </div>

      {/* Estatísticas */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-light rounded-lg p-6 text-center">
          <i className="fas fa-atom text-4xl text-primary mb-4"></i>
          <h3 className="text-xl font-semibold mb-2">118 Elementos</h3>
          <p className="text-muted">
            Atualmente conhecidos e organizados na tabela periódica
          </p>
        </div>

        <div className="bg-light rounded-lg p-6 text-center">
          <i className="fas fa-layer-group text-4xl text-primary mb-4"></i>
          <h3 className="text-xl font-semibold mb-2">7 Períodos</h3>
          <p className="text-muted">
            Linhas horizontais que representam níveis de energia
          </p>
        </div>

        <div className="bg-light rounded-lg p-6 text-center">
          <i className="fas fa-columns text-4xl text-primary mb-4"></i>
          <h3 className="text-xl font-semibold mb-2">18 Grupos</h3>
          <p className="text-muted">
            Colunas verticais com propriedades químicas similares
          </p>
        </div>
      </div>
    </div>
  );
}
