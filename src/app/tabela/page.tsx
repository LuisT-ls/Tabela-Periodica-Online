import elementosData from '@/data/elementos.json';

export default function TabelaPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-primary mb-4">
          Tabela Periódica Completa
        </h1>
        <p className="text-lg text-muted">
          Visualize todos os elementos químicos organizados por grupos e períodos
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="grid grid-cols-18 gap-1 mb-4">
          {/* Cabeçalho dos grupos */}
          {Array.from({ length: 18 }, (_, i) => (
            <div key={i} className="text-center text-sm font-semibold text-muted p-2">
              {i + 1}
            </div>
          ))}
        </div>

        {/* Linhas dos períodos */}
        {Array.from({ length: 7 }, (_, periodo) => (
          <div key={periodo} className="grid grid-cols-18 gap-1 mb-1">
            {/* Número do período */}
            <div className="text-center text-sm font-semibold text-muted p-2 flex items-center justify-center">
              {periodo + 1}
            </div>

            {/* Células dos elementos */}
            {Array.from({ length: 18 }, (_, grupo) => {
              const elemento = elementosData.find(
                (el) => el.periodo === periodo + 1 && el.grupo === grupo + 1
              );

              if (!elemento) {
                return <div key={grupo} className="p-2"></div>;
              }

              return (
                <div
                  key={grupo}
                  className="border border-gray-300 p-2 text-center hover:bg-light cursor-pointer transition-colors"
                  title={`${elemento.nome} (${elemento.simbolo})`}
                >
                  <div className="text-xs font-bold">{elemento.numero}</div>
                  <div className="text-lg font-bold text-primary">{elemento.simbolo}</div>
                  <div className="text-xs">{elemento.nome}</div>
                  <div className="text-xs text-muted">{elemento.massa}</div>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-light p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Metais Alcalinos</h3>
          <p className="text-sm text-muted">Grupo 1 - Altamente reativos</p>
        </div>
        <div className="bg-light p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Metais Alcalino-Terrosos</h3>
          <p className="text-sm text-muted">Grupo 2 - Reativos</p>
        </div>
        <div className="bg-light p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Metais de Transição</h3>
          <p className="text-sm text-muted">Grupos 3-12 - Propriedades variadas</p>
        </div>
        <div className="bg-light p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Não-Metais</h3>
          <p className="text-sm text-muted">Grupos 14-17 - Formam ácidos</p>
        </div>
      </div>
    </div>
  );
}
