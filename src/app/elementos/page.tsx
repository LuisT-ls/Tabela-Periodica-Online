'use client';

import { useState } from 'react';
import elementosData from '@/data/elementos.json';

export default function ElementosPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('todos');

  const filteredElementos = elementosData.filter((elemento) => {
    const matchesSearch =
      elemento.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      elemento.simbolo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      elemento.numero.toString().includes(searchTerm);

    const matchesCategory = selectedCategory === 'todos' || elemento.categoria === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const categories = ['todos', ...new Set(elementosData.map(el => el.categoria))];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-primary mb-4">
          Explorar Elementos
        </h1>
        <p className="text-lg text-muted">
          Descubra informações detalhadas sobre cada elemento químico
        </p>
      </div>

      {/* Filtros */}
      <div className="mb-8 bg-white rounded-lg shadow-lg p-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
              Buscar Elemento
            </label>
            <input
              type="text"
              id="search"
              placeholder="Nome, símbolo ou número..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
              Categoria
            </label>
            <select
              id="category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category === 'todos' ? 'Todas as Categorias' : category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Lista de Elementos */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredElementos.map((elemento) => (
          <div
            key={elemento.numero}
            className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer"
          >
            <div className="text-center mb-4">
              <div className="text-2xl font-bold text-primary mb-2">
                {elemento.simbolo}
              </div>
              <div className="text-sm text-muted">
                {elemento.numero}
              </div>
            </div>

            <h3 className="text-lg font-semibold text-center mb-2">
              {elemento.nome}
            </h3>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted">Massa:</span>
                <span className="font-medium">{elemento.massa} u</span>
              </div>

              <div className="flex justify-between">
                <span className="text-muted">Categoria:</span>
                <span className="font-medium capitalize">{elemento.categoria}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-muted">Grupo:</span>
                <span className="font-medium">{elemento.grupo}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-muted">Período:</span>
                <span className="font-medium">{elemento.periodo}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-muted">Estado:</span>
                <span className="font-medium capitalize">{elemento.estado}</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-xs text-muted text-center">
                {elemento.descricao}
              </p>
            </div>
          </div>
        ))}
      </div>

      {filteredElementos.length === 0 && (
        <div className="text-center py-12">
          <i className="fas fa-search text-4xl text-muted mb-4"></i>
          <h3 className="text-xl font-semibold text-muted mb-2">
            Nenhum elemento encontrado
          </h3>
          <p className="text-muted">
            Tente ajustar os filtros de busca
          </p>
        </div>
      )}
    </div>
  );
}
