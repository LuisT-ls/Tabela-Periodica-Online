import elementosData from '@/data/elementos.json';

export interface Elemento {
  numero: number;
  simbolo: string;
  nome: string;
  massa: number;
  categoria: string;
  grupo: number;
  periodo: number;
  configuracao: string;
  estado: string;
  descoberta: number | string;
  descricao: string;
}

export const getAllElementos = (): Elemento[] => {
  return elementosData as Elemento[];
};

export const getElementoByNumero = (numero: number): Elemento | undefined => {
  return elementosData.find(el => el.numero === numero) as Elemento | undefined;
};

export const getElementoBySimbolo = (simbolo: string): Elemento | undefined => {
  return elementosData.find(el => el.simbolo.toLowerCase() === simbolo.toLowerCase()) as Elemento | undefined;
};

export const getElementoByNome = (nome: string): Elemento | undefined => {
  return elementosData.find(el => el.nome.toLowerCase() === nome.toLowerCase()) as Elemento | undefined;
};

export const searchElementos = (query: string): Elemento[] => {
  const lowerQuery = query.toLowerCase();
  return elementosData.filter(el => 
    el.nome.toLowerCase().includes(lowerQuery) ||
    el.simbolo.toLowerCase().includes(lowerQuery) ||
    el.numero.toString().includes(lowerQuery)
  ) as Elemento[];
};

export const getElementosByCategoria = (categoria: string): Elemento[] => {
  return elementosData.filter(el => el.categoria === categoria) as Elemento[];
};

export const getElementosByGrupo = (grupo: number): Elemento[] => {
  return elementosData.filter(el => el.grupo === grupo) as Elemento[];
};

export const getElementosByPeriodo = (periodo: number): Elemento[] => {
  return elementosData.filter(el => el.periodo === periodo) as Elemento[];
};

export const getCategorias = (): string[] => {
  return [...new Set(elementosData.map(el => el.categoria))];
};

export const getGrupos = (): number[] => {
  return [...new Set(elementosData.map(el => el.grupo))].sort((a, b) => a - b);
};

export const getPeriodos = (): number[] => {
  return [...new Set(elementosData.map(el => el.periodo))].sort((a, b) => a - b);
};

export const formatMassaAtomica = (massa: number): string => {
  return `${massa.toFixed(3)} u`;
};

export const getCategoriaColor = (categoria: string): string => {
  const colors: { [key: string]: string } = {
    'não-metal': 'bg-green-100 text-green-800',
    'metal-alcalino': 'bg-red-100 text-red-800',
    'metal-alcalino-terroso': 'bg-orange-100 text-orange-800',
    'metal-transicao': 'bg-blue-100 text-blue-800',
    'halogenio': 'bg-yellow-100 text-yellow-800',
    'gas-nobre': 'bg-purple-100 text-purple-800',
    'actinideo': 'bg-pink-100 text-pink-800',
  };
  
  return colors[categoria] || 'bg-gray-100 text-gray-800';
};
