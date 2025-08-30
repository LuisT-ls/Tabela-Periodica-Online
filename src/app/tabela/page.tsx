'use client';

import { useState } from 'react';
import { elements, Element } from '@/data/elements';

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

export default function TabelaPage() {
  const [selectedElement, setSelectedElement] = useState<Element | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleElementClick = (element: Element) => {
    setSelectedElement(element);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedElement(null);
  };

  const ElementCard = ({ element }: { element: Element }) => (
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

      {/* Lista de Elementos */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-bold text-primary mb-4">Todos os Elementos</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2">
          {elements.map((element, index) => (
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
