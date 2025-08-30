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

  const categories = ['todos', ...Array.from(new Set(elementosData.map(el => el.categoria)))];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-primary dark:text-primary mb-4">
          Explorar Elementos
        </h1>
        <p className="text-lg text-muted dark:text-dark-text-secondary">
          Descubra informações detalhadas sobre cada elemento químico
        </p>
      </div>

      {/* Filtros */}
      <div className="mb-8 bg-white dark:bg-dark-surface rounded-lg shadow-lg dark:shadow-xl dark:shadow-black/20 p-6 border border-gray-200 dark:border-dark-border">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 dark:text-dark-text mb-2">
              Buscar Elemento
            </label>
            <input
              type="text"
              id="search"
              placeholder="Nome, símbolo ou número..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-dark-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-dark-bg text-gray-900 dark:text-dark-text"
            />
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-dark-text mb-2">
              Categoria
            </label>
            <select
              id="category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-dark-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-dark-bg text-gray-900 dark:text-dark-text"
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
            className="bg-white dark:bg-dark-surface rounded-lg shadow-lg dark:shadow-xl dark:shadow-black/20 p-6 hover:shadow-xl dark:hover:shadow-2xl dark:hover:shadow-black/30 transition-shadow cursor-pointer border border-gray-200 dark:border-dark-border"
          >
            <div className="text-center mb-4">
              <div className="text-2xl font-bold text-primary dark:text-primary mb-2">
                {elemento.simbolo}
              </div>
              <div className="text-sm text-muted dark:text-dark-text-secondary">
                {elemento.numero}
              </div>
            </div>

            <h3 className="text-lg font-semibold text-center mb-2 dark:text-dark-text">
              {elemento.nome}
            </h3>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted dark:text-dark-text-secondary">Massa:</span>
                <span className="font-medium dark:text-dark-text">{elemento.massa} u</span>
              </div>

              <div className="flex justify-between">
                <span className="text-muted dark:text-dark-text-secondary">Categoria:</span>
                <span className="font-medium capitalize dark:text-dark-text">{elemento.categoria}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-muted dark:text-dark-text-secondary">Grupo:</span>
                <span className="font-medium dark:text-dark-text">{elemento.grupo}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-muted dark:text-dark-text-secondary">Período:</span>
                <span className="font-medium dark:text-dark-text">{elemento.periodo}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-muted dark:text-dark-text-secondary">Estado:</span>
                <span className="font-medium capitalize dark:text-dark-text">{elemento.estado}</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-dark-border">
              <p className="text-xs text-muted dark:text-dark-text-secondary text-center">
                {elemento.descricao}
              </p>
            </div>
          </div>
        ))}
      </div>

      {filteredElementos.length === 0 && (
        <div className="text-center py-12">
          <i className="fas fa-search text-4xl text-muted dark:text-dark-text-secondary mb-4"></i>
          <h3 className="text-xl font-semibold text-muted dark:text-dark-text-secondary mb-2">
            Nenhum elemento encontrado
          </h3>
          <p className="text-muted dark:text-dark-text-secondary">
            Tente ajustar os filtros de busca
          </p>
        </div>
      )}
    </div>
  );
}
