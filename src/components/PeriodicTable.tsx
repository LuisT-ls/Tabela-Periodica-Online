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

// Função para verificar se é lantanídeo (57-71)
const isLanthanide = (number: number) => number >= 57 && number <= 71;

// Função para verificar se é actinídeo (89-103)
const isActinide = (number: number) => number >= 89 && number <= 103;

// Função para obter a posição no grid da tabela principal
const getMainGridPosition = (element: Element) => {
  // Elementos especiais que não seguem o padrão normal
  const specialPositions: { [key: number]: { gridColumn: number; gridRow: number } } = {
    // Hélio no grupo 18, período 1
    2: { gridColumn: 18, gridRow: 1 },
    // Lantanídeos e Actinídeos não aparecem na tabela principal
  };

  if (specialPositions[element.number]) {
    return specialPositions[element.number];
  }

  // Para lantanídeos e actinídeos, não retornar posição (serão mostrados separadamente)
  if (isLanthanide(element.number) || isActinide(element.number)) {
    return null;
  }

  // Posicionamento padrão baseado em grupo e período
  return {
    gridColumn: element.group,
    gridRow: element.period
  };
};

interface PeriodicTableProps {
  onElementClick?: (element: Element) => void;
}

export default function PeriodicTable({ onElementClick }: PeriodicTableProps) {
  const [selectedElement, setSelectedElement] = useState<Element | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState<{ element: Element; x: number; y: number } | null>(null);

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

  const handleElementMouseEnter = (element: Element, event: React.MouseEvent) => {
    setHoveredCategory(element.category);
    setTooltip({
      element,
      x: event.clientX,
      y: event.clientY
    });
  };

  const handleElementMouseLeave = () => {
    setHoveredCategory(null);
    setTooltip(null);
  };

  const ElementCard = ({ element, gridPosition }: { element: Element; gridPosition?: { gridColumn: number; gridRow: number } }) => {
    const isHighlighted = hoveredCategory === element.category;

    const baseClasses = `element-card`;
    const finalClasses = isHighlighted ? `${baseClasses} highlighted` : baseClasses;

    return (
      <div
        className={finalClasses}
        data-category={element.category}
        style={gridPosition}
        onClick={() => handleElementClick(element)}
        onMouseEnter={(e) => handleElementMouseEnter(element, e)}
        onMouseLeave={handleElementMouseLeave}
      >
        <div className="element-number">{element.number}</div>
        <div className="element-symbol">{element.symbol}</div>
        <div className="element-name">{element.name}</div>
        <div className="element-mass">{element.atomic_mass}</div>
      </div>
    );
  };

  // Separar elementos
  const mainElements = elements.filter(el => !isLanthanide(el.number) && !isActinide(el.number));
  const lanthanides = elements.filter(el => isLanthanide(el.number));
  const actinides = elements.filter(el => isActinide(el.number));

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-primary dark:text-primary mb-4">
          Tabela Periódica Interativa
        </h1>
        <p className="text-lg text-muted dark:text-dark-text-secondary">
          Passe o mouse sobre os elementos para destacar categorias e clique para ver detalhes completos
        </p>
      </div>

      {/* Tabela Periódica Principal */}
      <div className="bg-white dark:bg-dark-surface rounded-lg shadow-lg dark:shadow-xl dark:shadow-black/20 p-6 mb-8 border border-gray-200 dark:border-dark-border">
        <h2 className="text-2xl font-bold text-primary dark:text-primary mb-4">
          Tabela Periódica Principal
        </h2>

        <div className="periodic-grid-main">
          {mainElements.map((element, index) => {
            const gridPosition = getMainGridPosition(element);
            if (!gridPosition) return null; // Pular lantanídeos e actinídeos

            return (
              <ElementCard
                key={`main-${element.number}`}
                element={element}
                gridPosition={gridPosition}
              />
            );
          })}
        </div>
      </div>

      {/* Seção dos Lantanídeos */}
      {lanthanides.length > 0 && (
        <div className="bg-white dark:bg-dark-surface rounded-lg shadow-lg dark:shadow-xl dark:shadow-black/20 p-6 mb-8 border border-gray-200 dark:border-dark-border">
          <h2 className="text-2xl font-bold text-primary dark:text-primary mb-4">
            Lantanídeos (57-71)
          </h2>
          <p className="text-sm text-muted dark:text-dark-text-secondary mb-4">
            Elementos da série dos lantanídeos, também conhecidos como terras raras
          </p>

          <div className="lanthanides-grid">
            {lanthanides.map((element, index) => (
              <ElementCard
                key={`lanthanide-${element.number}`}
                element={element}
                gridPosition={{ gridColumn: index + 1, gridRow: 1 }}
              />
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
          <p className="text-sm text-muted dark:text-dark-text-secondary mb-4">
            Elementos da série dos actinídeos, todos radioativos
          </p>

          <div className="actinides-grid">
            {actinides.map((element, index) => (
              <ElementCard
                key={`actinide-${element.number}`}
                element={element}
                gridPosition={{ gridColumn: index + 1, gridRow: 1 }}
              />
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

      {/* Tooltip Moderno */}
      {tooltip && (
        <div
          className="element-tooltip"
          style={{
            left: tooltip.x + 15,
            top: tooltip.y - 15,
            transform: 'translateY(-100%)'
          }}
        >
          <div className="tooltip-header">
            <div className="tooltip-symbol">{tooltip.element.symbol}</div>
            <div>
              <div className="tooltip-number">#{tooltip.element.number}</div>
              <div className="tooltip-name">{tooltip.element.name}</div>
            </div>
          </div>
          <div className="tooltip-details">
            <div className="tooltip-detail">
              <span className="tooltip-label">Massa Atômica:</span>
              <span className="tooltip-value">{tooltip.element.atomic_mass} u</span>
            </div>
            <div className="tooltip-detail">
              <span className="tooltip-label">Grupo:</span>
              <span className="tooltip-value">{tooltip.element.group}</span>
            </div>
            <div className="tooltip-detail">
              <span className="tooltip-label">Período:</span>
              <span className="tooltip-value">{tooltip.element.period}</span>
            </div>
            <div className="tooltip-detail">
              <span className="tooltip-label">Categoria:</span>
              <span className="tooltip-value">{getCategoryName(tooltip.element.category)}</span>
            </div>
          </div>
        </div>
      )}

      {/* Modal */}
      {showModal && selectedElement && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header do Modal */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-lg ${getCategoryColor(selectedElement.category).split(' ')[0]}`}>
                  {selectedElement.symbol}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {selectedElement.name}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    Elemento {selectedElement.number}
                  </p>
                </div>
              </div>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-2xl font-bold"
              >
                ×
              </button>
            </div>

            {/* Conteúdo do Modal */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Informações Básicas */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Informações Básicas
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Número Atômico:</span>
                      <span className="font-semibold text-gray-900 dark:text-white">{selectedElement.number}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Símbolo:</span>
                      <span className="font-mono font-bold text-gray-900 dark:text-white">{selectedElement.symbol}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Massa Atômica:</span>
                      <span className="font-semibold text-gray-900 dark:text-white">{selectedElement.atomic_mass} u</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Grupo:</span>
                      <span className="font-semibold text-gray-900 dark:text-white">{selectedElement.group}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Período:</span>
                      <span className="font-semibold text-gray-900 dark:text-white">{selectedElement.period}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Categoria:</span>
                      <span className="font-semibold text-gray-900 dark:text-white">{getCategoryName(selectedElement.category)}</span>
                    </div>
                  </div>
                </div>

                {/* Informações Detalhadas */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Descrição
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    {selectedElement.summary}
                  </p>

                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Descoberta
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    Descoberto por: <span className="font-semibold">{selectedElement.discovered_by}</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Footer do Modal */}
            <div className="flex justify-end space-x-3 p-6 border-t border-gray-200 dark:border-gray-700">
              <a
                href={selectedElement.source}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Ver mais informações
              </a>
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
