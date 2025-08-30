'use client';

import { useState } from 'react';
import elements, { Element } from '@/data/elements';

export default function ComparadorPage() {
  const [element1, setElement1] = useState<Element | null>(null);
  const [element2, setElement2] = useState<Element | null>(null);

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'metal alcalino': 'bg-red-200 border-red-400',
      'metal alcalino-terroso': 'bg-orange-200 border-orange-400',
      'metal de transição': 'bg-yellow-200 border-yellow-400',
      'pós-transição': 'bg-green-200 border-green-400',
      'semimetal': 'bg-teal-200 border-teal-400',
      'não-metal': 'bg-blue-200 border-blue-400',
      'halogênio': 'bg-purple-200 border-purple-400',
      'gás nobre': 'bg-pink-200 border-pink-400',
      'lantanídeo': 'bg-indigo-200 border-indigo-400',
      'actinídeo': 'bg-gray-200 border-gray-400'
    };
    return colors[category] || 'bg-gray-200 border-gray-400';
  };

  const getCategoryName = (category: string) => {
    const names: { [key: string]: string } = {
      'metal alcalino': 'Metais Alcalinos',
      'metal alcalino-terroso': 'Metais Alcalino-Terrosos',
      'metal de transição': 'Metais de Transição',
      'pós-transição': 'Metais Pós-Transição',
      'semimetal': 'Semimetais',
      'não-metal': 'Não-Metais',
      'halogênio': 'Halogênios',
      'gás nobre': 'Gases Nobres',
      'lantanídeo': 'Lantanídeos',
      'actinídeo': 'Actinídeos'
    };
    return names[category] || category;
  };

  const getStateOfMatter = (element: Element) => {
    // Determinação simplificada do estado físico baseada na temperatura ambiente
    const gasesNobres = [2, 10, 18, 36, 54, 86]; // He, Ne, Ar, Kr, Xe, Rn
    const gases = [1, 7, 8, 9, 17]; // H, N, O, F, Cl
    const liquidos = [35, 80]; // Br, Hg

    if (gasesNobres.includes(element.number) || gases.includes(element.number)) {
      return 'Gasoso';
    } else if (liquidos.includes(element.number)) {
      return 'Líquido';
    } else {
      return 'Sólido';
    }
  };

  const getElectronegativity = (element: Element) => {
    // Valores aproximados de eletronegatividade (escala de Pauling)
    const electronegativities: { [key: number]: number } = {
      1: 2.20, 2: 0.00, 3: 0.98, 4: 1.57, 5: 2.04, 6: 2.55, 7: 3.04, 8: 3.44, 9: 3.98, 10: 0.00,
      11: 0.93, 12: 1.31, 13: 1.61, 14: 1.90, 15: 2.19, 16: 2.58, 17: 3.16, 18: 0.00, 19: 0.82, 20: 1.00,
      26: 1.83, 29: 1.90, 30: 1.65, 35: 2.96, 36: 0.00, 47: 1.93, 53: 2.66, 54: 0.00, 79: 2.54, 80: 2.00
    };
    return electronegativities[element.number] || 'N/A';
  };

  const compareValues = (value1: any, value2: any, property: string) => {
    if (value1 === value2) return 'equal';
    if (typeof value1 === 'number' && typeof value2 === 'number') {
      return value1 > value2 ? 'higher' : 'lower';
    }
    if (typeof value1 === 'string' && typeof value2 === 'string') {
      return value1 !== value2 ? 'different' : 'equal';
    }
    return 'different';
  };

  const getComparisonClass = (element: Element, otherElement: Element | null, property: keyof Element | 'state' | 'electronegativity') => {
    if (!otherElement) return '';
    
    let value1: any;
    let value2: any;
    
    if (property === 'state') {
      value1 = getStateOfMatter(element);
      value2 = getStateOfMatter(otherElement);
    } else if (property === 'electronegativity') {
      value1 = getElectronegativity(element);
      value2 = getElectronegativity(otherElement);
    } else {
      value1 = element[property as keyof Element];
      value2 = otherElement[property as keyof Element];
    }
    
    const comparison = compareValues(value1, value2, property);
    
    if (comparison === 'higher') return 'text-success fw-bold';
    if (comparison === 'lower') return 'text-danger fw-bold';
    if (comparison === 'different') return 'text-warning fw-bold';
    return '';
  };

  const ElementCard = ({ element, position }: { element: Element; position: 'left' | 'right' }) => {
    const stateOfMatter = getStateOfMatter(element);
    const electronegativity = getElectronegativity(element);
    const otherElement = position === 'left' ? element2 : element1;

    return (
      <div className={`card h-100 ${getCategoryColor(element.category)}`}>
        <div className="card-header text-center">
          <h3 className="card-title mb-0">
            {element.number}. {element.name} ({element.symbol})
          </h3>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-6">
              <strong>Número Atômico:</strong>
              <span className={`ms-2 ${getComparisonClass(element, otherElement, 'number')}`}>
                {element.number}
              </span>
            </div>
            <div className="col-6">
              <strong>Massa Atômica:</strong>
              <span className={`ms-2 ${getComparisonClass(element, otherElement, 'atomic_mass')}`}>
                {element.atomic_mass} u
              </span>
            </div>
          </div>

          <div className="row mt-2">
            <div className="col-6">
              <strong>Grupo:</strong>
              <span className={`ms-2 ${getComparisonClass(element, otherElement, 'group')}`}>
                {element.group}
              </span>
            </div>
            <div className="col-6">
              <strong>Período:</strong>
              <span className={`ms-2 ${getComparisonClass(element, otherElement, 'period')}`}>
                {element.period}
              </span>
            </div>
          </div>

          <div className="row mt-2">
            <div className="col-6">
              <strong>Estado Físico:</strong>
              <span className={`ms-2 ${getComparisonClass(element, otherElement, 'state')}`}>
                {stateOfMatter}
              </span>
            </div>
            <div className="col-6">
              <strong>Eletronegatividade:</strong>
              <span className={`ms-2 ${getComparisonClass(element, otherElement, 'electronegativity')}`}>
                {electronegativity}
              </span>
            </div>
          </div>

          <div className="mt-3">
            <strong>Categoria:</strong>
            <span className={`ms-2 ${getComparisonClass(element, otherElement, 'category')}`}>
              {getCategoryName(element.category)}
            </span>
          </div>

          <div className="mt-3">
            <strong>Descoberto por:</strong>
            <div className="text-muted small">{element.discovered_by}</div>
          </div>

          <div className="mt-3">
            <strong>Resumo:</strong>
            <p className="text-muted small">{element.summary}</p>
          </div>
        </div>
        <div className="card-footer text-center">
          <a href={element.source} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline-primary">
            <i className="fas fa-external-link-alt me-1"></i>
            Mais informações
          </a>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-primary mb-4">
          <i className="fas fa-balance-scale me-3"></i>
          Comparador de Elementos
        </h1>
        <p className="text-lg text-muted">
          Compare as propriedades de dois elementos químicos lado a lado
        </p>
      </div>

      {/* Seletores de Elementos */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-bold text-primary mb-4">
          <i className="fas fa-cogs me-2"></i>
          Selecionar Elementos
        </h2>

        <div className="row g-4">
          <div className="col-md-6">
            <label htmlFor="element1Select" className="form-label">
              <i className="fas fa-atom me-2"></i>
              Primeiro Elemento
            </label>
            <select
              className="form-select"
              id="element1Select"
              value={element1?.number || ''}
              onChange={(e) => {
                const selected = elements.find(el => el.number === parseInt(e.target.value));
                setElement1(selected || null);
              }}
            >
              <option value="">Selecione um elemento...</option>
              {elements.map(element => (
                <option key={element.number} value={element.number}>
                  {element.number}. {element.name} ({element.symbol})
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-6">
            <label htmlFor="element2Select" className="form-label">
              <i className="fas fa-atom me-2"></i>
              Segundo Elemento
            </label>
            <select
              className="form-select"
              id="element2Select"
              value={element2?.number || ''}
              onChange={(e) => {
                const selected = elements.find(el => el.number === parseInt(e.target.value));
                setElement2(selected || null);
              }}
            >
              <option value="">Selecione um elemento...</option>
              {elements.map(element => (
                <option key={element.number} value={element.number}>
                  {element.number}. {element.name} ({element.symbol})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Botão para trocar elementos */}
        <div className="text-center mt-4">
          <button
            className="btn btn-outline-secondary"
            onClick={() => {
              const temp = element1;
              setElement1(element2);
              setElement2(temp);
            }}
            disabled={!element1 || !element2}
          >
            <i className="fas fa-exchange-alt me-2"></i>
            Trocar Elementos
          </button>
        </div>
      </div>

      {/* Cards de Comparação */}
      {element1 && element2 && (
        <div className="row g-4">
          <div className="col-md-6">
            <ElementCard element={element1} position="left" />
          </div>
          <div className="col-md-6">
            <ElementCard element={element2} position="right" />
          </div>
        </div>
      )}

      {/* Mensagem quando apenas um elemento está selecionado */}
      {(element1 && !element2) || (!element1 && element2) ? (
        <div className="text-center mt-8">
          <div className="alert alert-info">
            <i className="fas fa-info-circle me-2"></i>
            Selecione dois elementos para comparar suas propriedades
          </div>
        </div>
      ) : null}

      {/* Mensagem quando nenhum elemento está selecionado */}
      {!element1 && !element2 && (
        <div className="text-center mt-8">
          <div className="alert alert-warning">
            <i className="fas fa-exclamation-triangle me-2"></i>
            Selecione dois elementos químicos para começar a comparação
          </div>
        </div>
      )}

      {/* Legenda das diferenças */}
      {element1 && element2 && (
        <div className="mt-6">
          <div className="card">
            <div className="card-header">
              <h4 className="mb-0">
                <i className="fas fa-info-circle me-2"></i>
                Legenda das Diferenças
              </h4>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-3">
                  <span className="text-success fw-bold">Valor maior</span>
                  <p className="text-muted small">Elemento com valor superior na propriedade</p>
                </div>
                <div className="col-md-3">
                  <span className="text-danger fw-bold">Valor menor</span>
                  <p className="text-muted small">Elemento com valor inferior na propriedade</p>
                </div>
                <div className="col-md-3">
                  <span className="text-warning fw-bold">Diferença</span>
                  <p className="text-muted small">Propriedades diferentes entre os elementos</p>
                </div>
                <div className="col-md-3">
                  <span className="text-muted">Valor igual</span>
                  <p className="text-muted small">Propriedades iguais entre os elementos</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
