'use client';

import { useState } from 'react';
import { elements } from '@/data/elements';

// Função para obter a cor baseada na categoria do elemento
const getCategoryColor = (category: string) => {
  const colors: { [key: string]: string } = {
    'metal alcalino': 'bg-red-200 hover:bg-red-300 border-red-400',
    'metal alcalino-terroso': 'bg-orange-200 hover:bg-orange-300 border-orange-400',
    'metal de transição': 'bg-blue-200 hover:bg-blue-300 border-blue-400',
    'metal pós-transição': 'bg-green-200 hover:bg-green-300 border-green-400',
    'semimetal': 'bg-yellow-200 hover:bg-yellow-300 border-yellow-400',
    'não-metal': 'bg-purple-200 hover:bg-purple-300 border-purple-400',
    'halogênio': 'bg-pink-200 hover:bg-pink-300 border-pink-400',
    'gás nobre': 'bg-cyan-200 hover:bg-cyan-300 border-cyan-400',
    'lantanídeo': 'bg-indigo-200 hover:bg-indigo-300 border-indigo-400',
    'actinídeo': 'bg-gray-200 hover:bg-gray-300 border-gray-400'
  };
  return colors[category] || 'bg-gray-100 hover:bg-gray-200 border-gray-300';
};

// Função para obter o nome da categoria em português
const getCategoryName = (category: string) => {
  const names: { [key: string]: string } = {
    'metal alcalino': 'Metal Alcalino',
    'metal alcalino-terroso': 'Metal Alcalino-Terroso',
    'metal de transição': 'Metal de Transição',
    'metal pós-transição': 'Metal Pós-Transição',
    'semimetal': 'Semimetal',
    'não-metal': 'Não-Metal',
    'halogênio': 'Halogênio',
    'gás nobre': 'Gás Nobre',
    'lantanídeo': 'Lantanídeo',
    'actinídeo': 'Actinídeo'
  };
  return names[category] || category;
};

// Função para criar a grade da tabela periódica
const createPeriodicTableGrid = () => {
  const grid: (typeof elements[0] | null)[][] = Array(7).fill(null).map(() => Array(18).fill(null));

  elements.forEach(element => {
    const row = element.period - 1;
    const col = element.group - 1;

    // Apenas elementos que não são lantanídeos ou actinídeos
    if (element.number < 57 || (element.number > 71 && element.number < 89) || element.number > 103) {
      grid[row][col] = element;
    }
  });

  return grid;
};

// Função para obter lantanídeos
const getLanthanides = () => {
  return elements.filter(element => element.number >= 57 && element.number <= 71);
};

// Função para obter actinídeos
const getActinides = () => {
  return elements.filter(element => element.number >= 89 && element.number <= 103);
};

export default function TabelaPage() {
  const [selectedElement, setSelectedElement] = useState<typeof elements[0] | null>(null);
  const [showModal, setShowModal] = useState(false);
  const grid = createPeriodicTableGrid();
  const lanthanides = getLanthanides();
  const actinides = getActinides();

  const handleElementClick = (element: typeof elements[0]) => {
    setSelectedElement(element);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedElement(null);
  };

  const ElementCard = ({ element }: { element: typeof elements[0] }) => (
    <div
      className={`border-2 p-2 text-center cursor-pointer transition-all duration-200 transform hover:scale-105 ${getCategoryColor(element.category)}`}
      title={`${element.number}. ${element.name} (${element.symbol}) - ${element.atomic_mass} u`}
      onClick={() => handleElementClick(element)}
    >
      <div className="text-xs font-bold text-gray-600">{element.number}</div>
      <div className="text-lg font-bold text-gray-800">{element.symbol}</div>
      <div className="text-xs text-gray-700 truncate">{element.name}</div>
      <div className="text-xs text-gray-500">{element.atomic_mass}</div>
    </div>
  );

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

      {/* Tabela Periódica Principal */}
      <div className="bg-white rounded-lg shadow-lg p-6 overflow-x-auto mb-8">
        <div className="inline-block min-w-full">
          {/* Cabeçalho dos grupos */}
          <div className="grid grid-cols-18 gap-1 mb-4">
            <div className="text-center text-sm font-semibold text-muted p-2"></div>
            {Array.from({ length: 18 }, (_, i) => (
              <div key={i} className="text-center text-sm font-semibold text-muted p-2">
                {i + 1}
              </div>
            ))}
          </div>

          {/* Linhas dos períodos */}
          {grid.map((row, rowIndex) => (
            <div key={rowIndex} className="grid grid-cols-18 gap-1 mb-1">
              {/* Número do período */}
              <div className="text-center text-sm font-semibold text-muted p-2 flex items-center justify-center">
                {rowIndex + 1}
              </div>

              {/* Células dos elementos */}
              {row.map((element, colIndex) => {
                if (!element) {
                  return <div key={colIndex} className="p-2"></div>;
                }

                return <ElementCard key={colIndex} element={element} />;
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Seção dos Lantanídeos */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-bold text-primary mb-4">Lantanídeos</h2>
        <div className="grid grid-cols-15 gap-1">
          {lanthanides.map((element, index) => (
            <ElementCard key={index} element={element} />
          ))}
        </div>
      </div>

      {/* Seção dos Actinídeos */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-bold text-primary mb-4">Actinídeos</h2>
        <div className="grid grid-cols-15 gap-1">
          {actinides.map((element, index) => (
            <ElementCard key={index} element={element} />
          ))}
        </div>
      </div>

      {/* Legenda */}
      <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-5 gap-4">
        {Object.entries({
          'metal alcalino': 'Metais Alcalinos',
          'metal alcalino-terroso': 'Metais Alcalino-Terrosos',
          'metal de transição': 'Metais de Transição',
          'metal pós-transição': 'Metais Pós-Transição',
          'semimetal': 'Semimetais',
          'não-metal': 'Não-Metais',
          'halogênio': 'Halogênios',
          'gás nobre': 'Gases Nobres',
          'lantanídeo': 'Lantanídeos',
          'actinídeo': 'Actinídeos'
        }).map(([category, name]) => (
          <div key={category} className={`p-4 rounded-lg ${getCategoryColor(category)}`}>
            <h3 className="font-semibold mb-2">{name}</h3>
            <p className="text-sm text-gray-700">
              {elements.filter(el => el.category === category).length} elementos
            </p>
          </div>
        ))}
      </div>

      {/* Modal Bootstrap */}
      {showModal && selectedElement && (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {selectedElement.number}. {selectedElement.name} ({selectedElement.symbol})
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeModal}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-6">
                    <h6>Informações Básicas</h6>
                    <ul className="list-unstyled">
                      <li><strong>Número Atômico:</strong> {selectedElement.number}</li>
                      <li><strong>Símbolo:</strong> {selectedElement.symbol}</li>
                      <li><strong>Nome:</strong> {selectedElement.name}</li>
                      <li><strong>Massa Atômica:</strong> {selectedElement.atomic_mass} u</li>
                      <li><strong>Grupo:</strong> {selectedElement.group}</li>
                      <li><strong>Período:</strong> {selectedElement.period}</li>
                      <li><strong>Categoria:</strong> {getCategoryName(selectedElement.category)}</li>
                    </ul>
                  </div>
                  <div className="col-md-6">
                    <h6>Descrição</h6>
                    <p>{selectedElement.summary}</p>
                    <h6>Descoberto por</h6>
                    <p>{selectedElement.discovered_by}</p>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <a
                  href={selectedElement.source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  Ver mais informações
                </a>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={closeModal}
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
