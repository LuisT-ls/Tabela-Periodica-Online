export default function SobrePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-primary mb-4">
          Sobre o Projeto
        </h1>
        <p className="text-lg text-muted">
          Conheça mais sobre a Tabela Periódica Online e sua história
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white rounded-lg shadow-lg p-6">
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
                <p className="text-sm text-muted">Biblioteca JavaScript para interfaces</p>
              </div>
            </div>
            <div className="flex items-center">
              <i className="fas fa-server text-2xl text-green-500 mr-3"></i>
              <div>
                <h3 className="font-semibold">Next.js 14</h3>
                <p className="text-sm text-muted">Framework React com App Router</p>
              </div>
            </div>
            <div className="flex items-center">
              <i className="fab fa-bootstrap text-2xl text-purple-500 mr-3"></i>
              <div>
                <h3 className="font-semibold">Bootstrap 5</h3>
                <p className="text-sm text-muted">Framework CSS responsivo</p>
              </div>
            </div>
            <div className="flex items-center">
              <i className="fab fa-font-awesome text-2xl text-blue-600 mr-3"></i>
              <div>
                <h3 className="font-semibold">FontAwesome</h3>
                <p className="text-sm text-muted">Ícones vetoriais</p>
              </div>
            </div>
          </div>
        </div>
      </div>

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
