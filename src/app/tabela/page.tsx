'use client';

import { useState, useMemo } from 'react';
import { elements, Element } from '@/data/elements';
import PeriodicTable from '@/components/PeriodicTable';

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

// Obter categorias únicas para o dropdown
const getUniqueCategories = () => {
  const categories = [...new Set(elements.map(el => el.category))];
  return categories.sort();
};

export default function TabelaPage() {
  const [selectedElement, setSelectedElement] = useState<Element | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [viewMode, setViewMode] = useState<'organized' | 'list'>('organized');

  // Filtrar elementos baseado na pesquisa e categoria
  const filteredElements = useMemo(() => {
    return elements.filter(element => {
      const matchesSearch = searchTerm === '' ||
        element.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        element.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
        element.number.toString().includes(searchTerm);

      const matchesCategory = selectedCategory === '' || element.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const handleElementClick = (element: Element) => {
    setSelectedElement(element);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedElement(null);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
  };

  const ElementCard = ({ element }: { element: Element }) => (
    <div
      className={`border-2 p-2 text-center cursor-pointer transition-all duration-200 transform hover:scale-105 ${getCategoryColor(element.category)}`}
      title={`${element.number}. ${element.name} (${element.symbol}) - ${element.atomic_mass} u`}
      onClick={() => handleElementClick(element)}
    >
      <div className="text-xs font-bold text-gray-600 dark:text-gray-300">{element.number}</div>
      <div className="text-lg font-bold text-gray-800 dark:text-gray-100">{element.symbol}</div>
      <div className="text-xs text-gray-700 dark:text-gray-200 truncate">{element.name}</div>
      <div className="text-xs text-gray-500 dark:text-gray-400">{element.atomic_mass}</div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-primary dark:text-primary mb-4">
          Tabela Periódica Completa
        </h1>
        <p className="text-lg text-muted dark:text-dark-text-secondary">
          Visualize todos os elementos químicos organizados por grupos e períodos
        </p>
      </div>

      {/* Seletor de Modo de Visualização */}
      <div className="bg-white dark:bg-dark-surface rounded-lg shadow-lg dark:shadow-xl dark:shadow-black/20 p-6 mb-8 border border-gray-200 dark:border-dark-border">
        <h2 className="text-2xl font-bold text-primary dark:text-primary mb-4">Modo de Visualização</h2>

        <div className="flex gap-4 mb-4">
          <button
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${viewMode === 'organized'
                ? 'bg-primary text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            onClick={() => setViewMode('organized')}
          >
            <i className="fas fa-table mr-2"></i>
            Tabela Organizada
          </button>
          <button
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${viewMode === 'list'
                ? 'bg-primary text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            onClick={() => setViewMode('list')}
          >
            <i className="fas fa-list mr-2"></i>
            Lista com Filtros
          </button>
        </div>

        {viewMode === 'list' && (
          <>
            <h3 className="text-xl font-bold text-primary dark:text-primary mb-4">Filtros e Pesquisa</h3>
            <div className="row g-3">
              {/* Barra de Pesquisa */}
              <div className="col-md-6">
                <label htmlFor="searchInput" className="form-label dark:text-dark-text">
                  <i className="fas fa-search me-2"></i>
                  Pesquisar Elementos
                </label>
                <input
                  type="text"
                  className="form-control dark:bg-dark-bg dark:text-dark-text dark:border-dark-border"
                  id="searchInput"
                  placeholder="Digite nome, símbolo ou número..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="form-text dark:text-dark-text-secondary">
                  Pesquise por nome, símbolo ou número atômico
                </div>
              </div>

              {/* Dropdown de Categorias */}
              <div className="col-md-4">
                <label htmlFor="categorySelect" className="form-label dark:text-dark-text">
                  <i className="fas fa-filter me-2"></i>
                  Filtrar por Categoria
                </label>
                <select
                  className="form-select dark:bg-dark-bg dark:text-dark-text dark:border-dark-border"
                  id="categorySelect"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="">Todas as categorias</option>
                  {getUniqueCategories().map(category => (
                    <option key={category} value={category}>
                      {getCategoryName(category)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Botão Limpar */}
              <div className="col-md-2 d-flex align-items-end">
                <button
                  type="button"
                  className="btn btn-outline-secondary w-100 dark:border-dark-border dark:text-dark-text dark:hover:bg-dark-border"
                  onClick={clearFilters}
                  disabled={searchTerm === '' && selectedCategory === ''}
                >
                  <i className="fas fa-times me-2"></i>
                  Limpar
                </button>
              </div>
            </div>

            {/* Resultados da Pesquisa */}
            <div className="mt-3">
              <div className="alert alert-info d-flex align-items-center dark:bg-blue-900 dark:text-blue-100 dark:border-blue-700" role="alert">
                <i className="fas fa-info-circle me-2"></i>
                <div>
                  {filteredElements.length === elements.length ? (
                    `Mostrando todos os ${elements.length} elementos`
                  ) : (
                    `Encontrados ${filteredElements.length} de ${elements.length} elementos`
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Conteúdo baseado no modo de visualização */}
      {viewMode === 'organized' ? (
        <PeriodicTable onElementClick={handleElementClick} />
      ) : (
        <div className="bg-white dark:bg-dark-surface rounded-lg shadow-lg dark:shadow-xl dark:shadow-black/20 p-6 mb-8 border border-gray-200 dark:border-dark-border">
          <h2 className="text-2xl font-bold text-primary dark:text-primary mb-4">
            {filteredElements.length === elements.length ? 'Todos os Elementos' : 'Elementos Filtrados'}
          </h2>

          {filteredElements.length === 0 ? (
            <div className="text-center py-8">
              <i className="fas fa-search fa-3x text-muted dark:text-dark-text-secondary mb-3"></i>
              <h4 className="text-muted dark:text-dark-text-secondary">Nenhum elemento encontrado</h4>
              <p className="text-muted dark:text-dark-text-secondary">Tente ajustar os filtros de pesquisa</p>
              <button
                type="button"
                className="btn btn-primary"
                onClick={clearFilters}
              >
                <i className="fas fa-times me-2"></i>
                Limpar Filtros
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2">
              {filteredElements.map((element, index) => (
                <ElementCard key={index} element={element} />
              ))}
            </div>
          )}
        </div>
      )}

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
            <h3 className="font-semibold mb-2 dark:text-gray-100">{name}</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {elements.filter(el => el.category === category).length} elementos
            </p>
          </div>
        ))}
      </div>

      {/* Modal Bootstrap */}
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
