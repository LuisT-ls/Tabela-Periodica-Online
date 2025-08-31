'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

// Função para obter a descrição da categoria
const getCategoryDescription = (category: string) => {
  const descriptions: { [key: string]: string } = {
    'metal alcalino': 'Metais altamente reativos do grupo 1',
    'metal alcalino-terroso': 'Metais reativos do grupo 2',
    'metal de transição': 'Metais com propriedades variáveis',
    'metal pós-transição': 'Metais com características intermediárias',
    'semimetal': 'Elementos com propriedades entre metais e não-metais',
    'não-metal': 'Elementos que não são metais',
    'halogênio': 'Elementos altamente reativos do grupo 17',
    'gás nobre': 'Gases inertes e estáveis',
    'lantanídeo': 'Elementos da série dos lantanídeos',
    'actinídeo': 'Elementos radioativos da série dos actinídeos'
  };
  return descriptions[category] || 'Categoria química';
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

// Animações do Framer Motion
const elementVariants = {
  initial: { scale: 1, opacity: 1 },
  hover: {
    scale: 1.08,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20
    }
  },
  highlighted: {
    scale: 1.05,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25
    }
  },
  tap: { scale: 0.95 }
};

const modalVariants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    y: -50
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
      duration: 0.3
    }
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    y: -50,
    transition: {
      duration: 0.2
    }
  }
};

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3 }
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2 }
  }
};

const legendItemVariants = {
  initial: {
    scale: 1,
    y: 0,
    opacity: 1
  },
  hover: {
    scale: 1.02,
    y: -6,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20
    }
  },
  highlighted: {
    scale: 1.02,
    y: -6,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25
    }
  }
};

const tooltipVariants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
    y: 10
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25,
      duration: 0.2
    }
  }
};

interface PeriodicTableProps {
  onElementClick?: (element: Element) => void;
}

export default function PeriodicTable({ onElementClick }: PeriodicTableProps) {
  const [selectedElement, setSelectedElement] = useState<Element | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState<{ element: Element; x: number; y: number } | null>(null);
  const [activeTab, setActiveTab] = useState<'resumo' | 'propriedades' | 'historia'>('resumo');
  const [legendHoveredCategory, setLegendHoveredCategory] = useState<string | null>(null);
  const [focusedElement, setFocusedElement] = useState<number | null>(null);

  const handleElementClick = (element: Element) => {
    setSelectedElement(element);
    setShowModal(true);
    setActiveTab('resumo'); // Reset para a primeira tab
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

  const handleLegendMouseEnter = (category: string) => {
    setLegendHoveredCategory(category);
  };

  const handleLegendMouseLeave = () => {
    setLegendHoveredCategory(null);
  };

  const handleKeyDown = (event: React.KeyboardEvent, element: Element) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleElementClick(element);
    }
  };

  const handleLegendKeyDown = (event: React.KeyboardEvent, category: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleLegendMouseEnter(category);
    }
  };

  const ElementCard = ({ element, gridPosition }: { element: Element; gridPosition?: { gridColumn: number; gridRow: number } }) => {
    const isHighlighted = hoveredCategory === element.category || legendHoveredCategory === element.category;
    const isFocused = focusedElement === element.number;

    const baseClasses = `element-card`;
    const finalClasses = isHighlighted ? `${baseClasses} highlighted` : baseClasses;

    return (
      <motion.div
        className={finalClasses}
        data-category={element.category}
        style={gridPosition}
        variants={elementVariants}
        initial="initial"
        whileHover="hover"
        whileTap="tap"
        animate={isHighlighted ? "highlighted" : "initial"}
        onClick={() => handleElementClick(element)}
        onMouseEnter={(e) => handleElementMouseEnter(element, e)}
        onMouseLeave={handleElementMouseLeave}
        onKeyDown={(e) => handleKeyDown(e, element)}
        onFocus={() => setFocusedElement(element.number)}
        onBlur={() => setFocusedElement(null)}
        tabIndex={0}
        role="button"
        aria-label={`${element.name} (${element.symbol}), número atômico ${element.number}, ${getCategoryName(element.category)}`}
        aria-pressed={isFocused}
        whileFocus={{
          scale: 1.05,
          boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.5)",
          transition: { duration: 0.2 }
        }}
      >
        <div className="element-number">{element.number}</div>
        <div className="element-symbol">{element.symbol}</div>
        <div className="element-name">{element.name}</div>
        <div className="element-mass">{element.atomic_mass}</div>
      </motion.div>
    );
  };

  // Separar elementos
  const mainElements = elements.filter(el => !isLanthanide(el.number) && !isActinide(el.number));
  const lanthanides = elements.filter(el => isLanthanide(el.number));
  const actinides = elements.filter(el => isActinide(el.number));

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Skip Link para acessibilidade */}
      <a
        href="#main-content"
        className="skip-link"
        aria-label="Pular para o conteúdo principal"
      >
        Pular para o conteúdo principal
      </a>

      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold text-primary dark:text-primary mb-4">
          Tabela Periódica Interativa
        </h1>
        <p className="text-lg text-muted dark:text-dark-text-secondary">
          Passe o mouse sobre os elementos para destacar categorias e clique para ver detalhes completos
        </p>
      </motion.div>

      {/* Tabela Periódica Principal */}
      <motion.div
        id="main-content"
        className="bg-white dark:bg-dark-surface rounded-lg shadow-lg dark:shadow-xl dark:shadow-black/20 p-6 mb-8 border border-gray-200 dark:border-dark-border"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        role="main"
        aria-label="Tabela periódica principal"
      >
        <h2 className="text-2xl font-bold text-primary dark:text-primary mb-4">
          Tabela Periódica Principal
        </h2>

        <div className="periodic-grid-main">
          {mainElements.map((element, index) => {
            const gridPosition = getMainGridPosition(element);
            if (!gridPosition) return null; // Pular lantanídeos e actinídeos

            return (
              <motion.div
                key={`main-${element.number}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.01,
                  type: "spring",
                  stiffness: 300,
                  damping: 25
                }}
              >
                <ElementCard
                  element={element}
                  gridPosition={gridPosition}
                />
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Seção dos Lantanídeos */}
      {lanthanides.length > 0 && (
        <motion.div
          className="bg-white dark:bg-dark-surface rounded-lg shadow-lg dark:shadow-xl dark:shadow-black/20 p-6 mb-8 border border-gray-200 dark:border-dark-border"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold text-primary dark:text-primary mb-4">
            Lantanídeos (57-71)
          </h2>
          <p className="text-sm text-muted dark:text-dark-text-secondary mb-4">
            Elementos da série dos lantanídeos, também conhecidos como terras raras
          </p>

          <div className="lanthanides-grid">
            {lanthanides.map((element, index) => (
              <motion.div
                key={`lanthanide-${element.number}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.3,
                  delay: 0.5 + index * 0.02,
                  type: "spring",
                  stiffness: 300,
                  damping: 25
                }}
              >
                <ElementCard
                  element={element}
                  gridPosition={{ gridColumn: index + 1, gridRow: 1 }}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Seção dos Actinídeos */}
      {actinides.length > 0 && (
        <motion.div
          className="bg-white dark:bg-dark-surface rounded-lg shadow-lg dark:shadow-xl dark:shadow-black/20 p-6 mb-8 border border-gray-200 dark:border-dark-border"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h2 className="text-2xl font-bold text-primary dark:text-primary mb-4">
            Actinídeos (89-103)
          </h2>
          <p className="text-sm text-muted dark:text-dark-text-secondary mb-4">
            Elementos da série dos actinídeos, todos radioativos
          </p>

          <div className="actinides-grid">
            {actinides.map((element, index) => (
              <motion.div
                key={`actinide-${element.number}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.3,
                  delay: 0.7 + index * 0.02,
                  type: "spring",
                  stiffness: 300,
                  damping: 25
                }}
              >
                <ElementCard
                  element={element}
                  gridPosition={{ gridColumn: index + 1, gridRow: 1 }}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Legenda Interativa */}
      <motion.div
        className="bg-white dark:bg-dark-surface rounded-lg shadow-lg dark:shadow-xl dark:shadow-black/20 p-6 mb-8 border border-gray-200 dark:border-dark-border"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <h2 className="text-2xl font-bold text-primary dark:text-primary mb-6">
          <i className="fas fa-palette me-3"></i>
          Legenda das Categorias Químicas
        </h2>
        <p className="text-muted dark:text-dark-text-secondary mb-6">
          Passe o mouse sobre as categorias para destacar todos os elementos correspondentes na tabela
        </p>

        <AnimatePresence>
          {legendHoveredCategory && (
            <motion.div
              className="highlight-indicator mb-6"
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <div className="highlight-indicator-content">
                <i className="fas fa-eye me-2"></i>
                <span>
                  Destacando <strong>{elements.filter(el => el.category === legendHoveredCategory).length} elementos</strong> da categoria{' '}
                  <strong>{getCategoryName(legendHoveredCategory)}</strong>
                </span>
                <button
                  onClick={handleLegendMouseLeave}
                  className="highlight-clear-btn"
                  title="Limpar destaque"
                  aria-label="Limpar destaque da categoria"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

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
          }).map(([category, name], index) => {
            const elementCount = elements.filter(el => el.category === category).length;
            const isHovered = legendHoveredCategory === category;

            return (
              <motion.div
                key={category}
                className={`legend-item ${getCategoryColor(category)} ${isHovered ? 'hovered' : ''}`}
                variants={legendItemVariants}
                initial="initial"
                whileHover="hover"
                animate={isHovered ? "highlighted" : "initial"}
                onMouseEnter={() => handleLegendMouseEnter(category)}
                onMouseLeave={handleLegendMouseLeave}
                onKeyDown={(e) => handleLegendKeyDown(e, category)}
                tabIndex={0}
                role="button"
                aria-label={`Categoria ${name} com ${elementCount} elementos`}
                aria-pressed={isHovered}
                whileFocus={{
                  scale: 1.02,
                  y: -6,
                  boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.5)",
                  transition: { duration: 0.2 }
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: 0.9 + index * 0.1,
                  type: "spring",
                  stiffness: 300,
                  damping: 25
                }}
              >
                <div className="legend-header">
                  <div className="legend-color-indicator"></div>
                  <h3 className="legend-title">{name}</h3>
                </div>
                <div className="legend-content">
                  <div className="legend-count">
                    <i className="fas fa-atom me-2"></i>
                    {elementCount} elemento{elementCount !== 1 ? 's' : ''}
                  </div>
                  <div className="legend-description">
                    {getCategoryDescription(category)}
                  </div>
                  <div className="legend-stats">
                    <div className="legend-stat">
                      <i className="fas fa-percentage me-1"></i>
                      {((elementCount / elements.length) * 100).toFixed(1)}% da tabela
                    </div>
                  </div>
                </div>
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      className="legend-hover-effect"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 0.7, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.2 }}
                    >
                      <i className="fas fa-mouse-pointer"></i>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Tooltip Moderno */}
      <AnimatePresence>
        {tooltip && (
          <motion.div
            className="element-tooltip"
            style={{
              left: tooltip.x + 15,
              top: tooltip.y - 15,
              transform: 'translateY(-100%)'
            }}
            variants={tooltipVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
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
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal Moderno */}
      <AnimatePresence>
        {showModal && selectedElement && (
          <motion.div
            className="modal-overlay"
            onClick={closeModal}
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.div
              className="modal-content"
              onClick={(e) => e.stopPropagation()}
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {/* Header do Modal */}
              <div className="modal-header">
                <div className="modal-header-content">
                  <div className="modal-symbol-container" data-category={selectedElement.category}>
                    <div className="modal-symbol">{selectedElement.symbol}</div>
                    <div className="modal-number">#{selectedElement.number}</div>
                  </div>
                  <div className="modal-title-section">
                    <h2 className="modal-title">{selectedElement.name}</h2>
                    <p className="modal-category">{getCategoryName(selectedElement.category)}</p>
                  </div>
                </div>
                <button
                  onClick={closeModal}
                  className="modal-close-btn"
                  aria-label="Fechar modal"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>

              {/* Tabs */}
              <div className="modal-tabs">
                <button
                  className={`modal-tab ${activeTab === 'resumo' ? 'active' : ''}`}
                  onClick={() => setActiveTab('resumo')}
                  aria-label="Aba de resumo"
                >
                  <i className="fas fa-info-circle me-2"></i>
                  Resumo
                </button>
                <button
                  className={`modal-tab ${activeTab === 'propriedades' ? 'active' : ''}`}
                  onClick={() => setActiveTab('propriedades')}
                  aria-label="Aba de propriedades"
                >
                  <i className="fas fa-atom me-2"></i>
                  Propriedades
                </button>
                <button
                  className={`modal-tab ${activeTab === 'historia' ? 'active' : ''}`}
                  onClick={() => setActiveTab('historia')}
                  aria-label="Aba de história"
                >
                  <i className="fas fa-history me-2"></i>
                  História
                </button>
              </div>

              {/* Conteúdo das Tabs */}
              <div className="modal-body">
                <AnimatePresence mode="wait">
                  {/* Tab Resumo */}
                  {activeTab === 'resumo' && (
                    <motion.div
                      key="resumo"
                      className="tab-content"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="summary-section">
                        <h3 className="section-title">
                          <i className="fas fa-book-open me-2"></i>
                          Descrição
                        </h3>
                        <p className="summary-text">{selectedElement.summary}</p>
                      </div>

                      <div className="quick-info-section">
                        <h3 className="section-title">
                          <i className="fas fa-chart-bar me-2"></i>
                          Informações Rápidas
                        </h3>
                        <div className="quick-info-grid">
                          <div className="info-item">
                            <span className="info-label">Massa Atômica</span>
                            <span className="info-value">{selectedElement.atomic_mass} u</span>
                          </div>
                          <div className="info-item">
                            <span className="info-label">Grupo</span>
                            <span className="info-value">{selectedElement.group}</span>
                          </div>
                          <div className="info-item">
                            <span className="info-label">Período</span>
                            <span className="info-value">{selectedElement.period}</span>
                          </div>
                          <div className="info-item">
                            <span className="info-label">Categoria</span>
                            <span className="info-value">{getCategoryName(selectedElement.category)}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Tab Propriedades */}
                  {activeTab === 'propriedades' && (
                    <motion.div
                      key="propriedades"
                      className="tab-content"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="properties-section">
                        <h3 className="section-title">
                          <i className="fas fa-microscope me-2"></i>
                          Propriedades Físicas
                        </h3>
                        <div className="properties-grid">
                          <div className="property-item">
                            <span className="property-label">Número Atômico</span>
                            <span className="property-value">{selectedElement.number}</span>
                          </div>
                          <div className="property-item">
                            <span className="property-label">Símbolo Químico</span>
                            <span className="property-value font-mono">{selectedElement.symbol}</span>
                          </div>
                          <div className="property-item">
                            <span className="property-label">Massa Atômica</span>
                            <span className="property-value">{selectedElement.atomic_mass} u</span>
                          </div>
                          <div className="property-item">
                            <span className="property-label">Grupo</span>
                            <span className="property-value">{selectedElement.group}</span>
                          </div>
                          <div className="property-item">
                            <span className="property-label">Período</span>
                            <span className="property-value">{selectedElement.period}</span>
                          </div>
                          <div className="property-item">
                            <span className="property-label">Categoria</span>
                            <span className="property-value">{getCategoryName(selectedElement.category)}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Tab História */}
                  {activeTab === 'historia' && (
                    <motion.div
                      key="historia"
                      className="tab-content"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="history-section">
                        <h3 className="section-title">
                          <i className="fas fa-user me-2"></i>
                          Descoberta
                        </h3>
                        <div className="discovery-info">
                          <p className="discovery-text">
                            <strong>Descoberto por:</strong> {selectedElement.discovered_by}
                          </p>
                        </div>

                        <div className="external-link-section">
                          <h3 className="section-title">
                            <i className="fas fa-external-link-alt me-2"></i>
                            Mais Informações
                          </h3>
                          <a
                            href={selectedElement.source}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="external-link"
                            aria-label={`Ver mais informações sobre ${selectedElement.name} na Wikipédia`}
                          >
                            <i className="fas fa-external-link-alt me-2"></i>
                            Ver na Wikipédia
                            <i className="fas fa-external-link-alt ms-2"></i>
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Footer do Modal */}
              <div className="modal-footer">
                <button
                  onClick={closeModal}
                  className="modal-btn modal-btn-secondary"
                  aria-label="Fechar modal"
                >
                  <i className="fas fa-times me-2"></i>
                  Fechar
                </button>
                <a
                  href={selectedElement.source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="modal-btn modal-btn-primary"
                  aria-label={`Ver mais informações sobre ${selectedElement.name} na Wikipédia`}
                >
                  <i className="fas fa-external-link-alt me-2"></i>
                  Ver mais informações
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
