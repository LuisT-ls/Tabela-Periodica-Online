'use client';

import { useState } from 'react';
import { elements, Element } from '@/data/elements';
import '../styles/periodic-table.css';

// Função para obter a cor baseada na categoria do elemento
const getCategoryColor = (category: string) => {
  const colors: { [key: string]: string } = {
    'metal alcalino': 'bg-red-200 dark:bg-red-800 hover:bg-red-300 dark:hover:bg-red-700 border-red-400 dark:border-red-600',
    'metal alcalino-terroso': 'bg-orange-200 dark:bg-orange-800 hover:bg-orange-300 dark:hover:bg-orange-700 border-orange-400 dark:border-orange-600',
    'metal de transição': 'bg-blue-200 dark:bg-blue-800 hover:bg-blue-300 dark:hover:bg-blue-700 border-blue-400 dark:border-blue-600',
    'metal pós-transição': 'bg-green-200 dark:bg-green-800 hover:bg-green-300 dark:hover:bg-green-700 border-green-400 dark:border-green-600',
    'semimetal': 'bg-yellow-200 dark:bg-yellow-800 hover:bg-yellow-300 dark:hover:bg-yellow-700 border-yellow-400 dark:border-yellow-600',
    'não-metal': 'bg-purple-200 dark:bg-purple-800 hover:bg-purple-300 dark:hover:bg-purple-700 border-purple-400 dark:border-purple-600',
    'halogênio': 'bg-pink-200 dark:bg-pink-800 hover:bg-pink-300 dark:hover:bg-pink-700 border-pink-400 dark:border-pink-600',
    'gás nobre': 'bg-cyan-200 dark:bg-cyan-800 hover:bg-cyan-300 dark:hover:bg-cyan-700 border-cyan-400 dark:border-cyan-600',
    'lantanídeo': 'bg-indigo-200 dark:bg-indigo-800 hover:bg-indigo-300 dark:hover:bg-indigo-700 border-indigo-400 dark:border-indigo-600',
    'actinídeo': 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 border-gray-400 dark:border-gray-500'
  };
  return colors[category] || 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 border-gray-300 dark:border-gray-500';
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

// Função para obter a posição no grid baseada no grupo e período
const getGridPosition = (group: number, period: number) => {
  return {
    gridColumn: group,
    gridRow: period
  };
};

// Função para verificar se é lantanídeo (57-71)
const isLanthanide = (number: number) => number >= 57 && number <= 71;

// Função para verificar se é actinídeo (89-103)
const isActinide = (number: number) => number >= 89 && number <= 103;

// Função para obter a posição dos lantanídeos e actinídeos
const getLanthanideActinidePosition = (number: number) => {
  if (isLanthanide(number)) {
    return {
      gridColumn: number - 56 + 3, // Começa na coluna 3 (grupo 3)
      gridRow: 8 // Período 8 (abaixo do período 7)
    };
  }
  if (isActinide(number)) {
    return {
      gridColumn: number - 88 + 3, // Começa na coluna 3 (grupo 3)
      gridRow: 9 // Período 9 (abaixo dos lantanídeos)
    };
  }
  return null;
};

interface PeriodicTableProps {
  onElementClick?: (element: Element) => void;
}

export default function PeriodicTable({ onElementClick }: PeriodicTableProps) {
  const [selectedElement, setSelectedElement] = useState<Element | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleElementClick = (element: Element) => {
    setSelectedElement(element);
    setShowModal(true);
    if (onElementClick) {
      onElementClick(element);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedElement(null);
  };

  const ElementCard = ({ element }: { element: Element }) => {
    const isLanthanideElement = isLanthanide(element.number);
    const isActinideElement = isActinide(element.number);

    let gridStyle: React.CSSProperties = {};

    if (isLanthanideElement || isActinideElement) {
      const position = getLanthanideActinidePosition(element.number);
      if (position) {
        gridStyle = position;
      }
    } else {
      gridStyle = getGridPosition(element.group, element.period);
    }

    return (
      <div
        className={`element-card ${getCategoryColor(element.category)}`}
        style={gridStyle}
        title={`${element.number}. ${element.name} (${element.symbol}) - ${element.atomic_mass} u`}
        onClick={() => handleElementClick(element)}
      >
        <div className="element-number">{element.number}</div>
        <div className="element-symbol">{element.symbol}</div>
        <div className="element-name">{element.name}</div>
        <div className="element-mass">{element.atomic_mass}</div>
      </div>
    );
  };

  // Separar elementos em grupos
  const mainElements = elements.filter(el => !isLanthanide(el.number) && !isActinide(el.number));
  const lanthanides = elements.filter(el => isLanthanide(el.number));
  const actinides = elements.filter(el => isActinide(el.number));

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-primary dark:text-primary mb-4">
          Tabela Periódica Organizada
        </h1>
        <p className="text-lg text-muted dark:text-dark-text-secondary">
          Visualize a tabela periódica organizada corretamente por grupos e períodos
        </p>
      </div>

      {/* Tabela Periódica Principal */}
      <div className="bg-white dark:bg-dark-surface rounded-lg shadow-lg dark:shadow-xl dark:shadow-black/20 p-6 mb-8 border border-gray-200 dark:border-dark-border">
        <h2 className="text-2xl font-bold text-primary dark:text-primary mb-4">
          Tabela Periódica Principal
        </h2>

        <div className="periodic-grid">
          {mainElements.map((element, index) => (
            <ElementCard key={index} element={element} />
          ))}
        </div>
      </div>

      {/* Seção dos Lantanídeos */}
      {lanthanides.length > 0 && (
        <div className="bg-white dark:bg-dark-surface rounded-lg shadow-lg dark:shadow-xl dark:shadow-black/20 p-6 mb-8 border border-gray-200 dark:border-dark-border">
          <h2 className="text-2xl font-bold text-primary dark:text-primary mb-4">
            Lantanídeos (57-71)
          </h2>

          <div className="lanthanides-grid">
            {lanthanides.map((element, index) => (
              <ElementCard key={index} element={element} />
            ))}
          </div>
        </div>
      )}

      {/* Seção dos Actinídeos */}
      {actinides.length > 0 && (
        <div className="bg-white dark:bg-dark-surface rounded-lg shadow-lg dark:shadow-xl dark:shadow-black/20 p-6 mb-8 border border-gray-200 dark:border-dark-border">
          <h2 className="text-2xl font-bold text-primary dark:text-primary mb-4">
            Actinídeos (89-103)
          </h2>

          <div className="actinides-grid">
            {actinides.map((element, index) => (
              <ElementCard key={index} element={element} />
            ))}
          </div>
        </div>
      )}

      {/* Legenda */}
      <div className="periodic-table-legend">
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
          <div key={category} className={`legend-item ${getCategoryColor(category)}`}>
            <h3 className="font-semibold mb-2 dark:text-gray-100">{name}</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {elements.filter(el => el.category === category).length} elementos
            </p>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && selectedElement && (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content dark:bg-dark-surface dark:text-dark-text dark:border-dark-border">
              <div className="modal-header dark:border-dark-border">
                <h5 className="modal-title">
                  {selectedElement.number}. {selectedElement.name} ({selectedElement.symbol})
                </h5>
                <button
                  type="button"
                  className="btn-close dark:filter-invert"
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
              <div className="modal-footer dark:border-dark-border">
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
                  className="btn btn-secondary dark:bg-dark-border dark:text-dark-text dark:hover:bg-gray-600"
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
