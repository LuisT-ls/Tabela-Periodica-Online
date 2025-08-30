export interface Element {
  number: number;
  symbol: string;
  name: string;
  atomic_mass: number;
  category: string;
  group: number;
  period: number;
  summary: string;
  discovered_by: string;
  source: string;
}

export const elements: Element[] = [
  {
    number: 1,
    symbol: "H",
    name: "Hidrogênio",
    atomic_mass: 1.008,
    category: "não-metal",
    group: 1,
    period: 1,
    summary: "Elemento mais abundante do universo, essencial para a vida e combustível limpo do futuro.",
    discovered_by: "Henry Cavendish",
    source: "https://pt.wikipedia.org/wiki/Hidrog%C3%AAnio"
  },
  {
    number: 2,
    symbol: "He",
    name: "Hélio",
    atomic_mass: 4.003,
    category: "gás nobre",
    group: 18,
    period: 1,
    summary: "Gás nobre usado em balões, criogenia e ressonância magnética nuclear.",
    discovered_by: "Pierre Janssen",
    source: "https://pt.wikipedia.org/wiki/H%C3%A9lio"
  },
  {
    number: 3,
    symbol: "Li",
    name: "Lítio",
    atomic_mass: 6.941,
    category: "metal alcalino",
    group: 1,
    period: 2,
    summary: "Metal alcalino mais leve, usado em baterias de íon-lítio e tratamento de transtornos bipolares.",
    discovered_by: "Johann August Arfvedson",
    source: "https://pt.wikipedia.org/wiki/L%C3%ADtio"
  },
  {
    number: 4,
    symbol: "Be",
    name: "Berílio",
    atomic_mass: 9.012,
    category: "metal alcalino-terroso",
    group: 2,
    period: 2,
    summary: "Metal leve e tóxico, usado em reatores nucleares e ligas especiais.",
    discovered_by: "Louis Nicolas Vauquelin",
    source: "https://pt.wikipedia.org/wiki/Ber%C3%ADlio"
  },
  {
    number: 5,
    symbol: "B",
    name: "Boro",
    atomic_mass: 10.811,
    category: "semimetal",
    group: 13,
    period: 2,
    summary: "Semimetal essencial para plantas, usado em vidros especiais e detergentes.",
    discovered_by: "Joseph Louis Gay-Lussac",
    source: "https://pt.wikipedia.org/wiki/Boro"
  },
  {
    number: 6,
    symbol: "C",
    name: "Carbono",
    atomic_mass: 12.011,
    category: "não-metal",
    group: 14,
    period: 2,
    summary: "Base da química orgânica e da vida, forma diamantes, grafite e nanotubos.",
    discovered_by: "Antiguidade",
    source: "https://pt.wikipedia.org/wiki/Carbono"
  },
  {
    number: 7,
    symbol: "N",
    name: "Nitrogênio",
    atomic_mass: 14.007,
    category: "não-metal",
    group: 15,
    period: 2,
    summary: "Componente principal da atmosfera terrestre, essencial para proteínas e DNA.",
    discovered_by: "Daniel Rutherford",
    source: "https://pt.wikipedia.org/wiki/Nitrog%C3%AAnio"
  },
  {
    number: 8,
    symbol: "O",
    name: "Oxigênio",
    atomic_mass: 15.999,
    category: "não-metal",
    group: 16,
    period: 2,
    summary: "Essencial para a respiração e combustão, forma ozônio na atmosfera.",
    discovered_by: "Carl Wilhelm Scheele",
    source: "https://pt.wikipedia.org/wiki/Oxig%C3%AAnio"
  },
  {
    number: 9,
    symbol: "F",
    name: "Flúor",
    atomic_mass: 18.998,
    category: "halogênio",
    group: 17,
    period: 2,
    summary: "Halogênio mais reativo, usado em pasta de dente e refrigeração.",
    discovered_by: "Henri Moissan",
    source: "https://pt.wikipedia.org/wiki/Fl%C3%BAor"
  },
  {
    number: 10,
    symbol: "Ne",
    name: "Neônio",
    atomic_mass: 20.180,
    category: "gás nobre",
    group: 18,
    period: 2,
    summary: "Gás nobre usado em sinais luminosos e lasers.",
    discovered_by: "Sir William Ramsay",
    source: "https://pt.wikipedia.org/wiki/Ne%C3%B4nio"
  },
  {
    number: 11,
    symbol: "Na",
    name: "Sódio",
    atomic_mass: 22.990,
    category: "metal alcalino",
    group: 1,
    period: 3,
    summary: "Metal alcalino reativo, importante em biologia e iluminação pública.",
    discovered_by: "Humphry Davy",
    source: "https://pt.wikipedia.org/wiki/S%C3%B3dio"
  },
  {
    number: 12,
    symbol: "Mg",
    name: "Magnésio",
    atomic_mass: 24.305,
    category: "metal alcalino-terroso",
    group: 2,
    period: 3,
    summary: "Metal leve usado em ligas, biologia e fogos de artifício.",
    discovered_by: "Joseph Black",
    source: "https://pt.wikipedia.org/wiki/Magn%C3%A9sio"
  },
  {
    number: 13,
    symbol: "Al",
    name: "Alumínio",
    atomic_mass: 26.982,
    category: "metal pós-transição",
    group: 13,
    period: 3,
    summary: "Metal leve e resistente à corrosão, muito usado em embalagens e construção.",
    discovered_by: "Hans Christian Ørsted",
    source: "https://pt.wikipedia.org/wiki/Alum%C3%ADnio"
  },
  {
    number: 14,
    symbol: "Si",
    name: "Silício",
    atomic_mass: 28.085,
    category: "semimetal",
    group: 14,
    period: 3,
    summary: "Semimetal fundamental para eletrônicos e vidros, segundo elemento mais abundante na crosta terrestre.",
    discovered_by: "Jöns Jacob Berzelius",
    source: "https://pt.wikipedia.org/wiki/Sil%C3%ADcio"
  },
  {
    number: 15,
    symbol: "P",
    name: "Fósforo",
    atomic_mass: 30.974,
    category: "não-metal",
    group: 15,
    period: 3,
    summary: "Essencial para DNA, ATP e fertilizantes, descoberto na urina.",
    discovered_by: "Hennig Brand",
    source: "https://pt.wikipedia.org/wiki/F%C3%B3sforo"
  },
  {
    number: 16,
    symbol: "S",
    name: "Enxofre",
    atomic_mass: 32.065,
    category: "não-metal",
    group: 16,
    period: 3,
    summary: "Elemento essencial para proteínas, usado em pólvora e vulcanização da borracha.",
    discovered_by: "Antiguidade",
    source: "https://pt.wikipedia.org/wiki/Enxofre"
  },
  {
    number: 17,
    symbol: "Cl",
    name: "Cloro",
    atomic_mass: 35.453,
    category: "halogênio",
    group: 17,
    period: 3,
    summary: "Halogênio usado em desinfecção, PVC e tratamento de água.",
    discovered_by: "Carl Wilhelm Scheele",
    source: "https://pt.wikipedia.org/wiki/Cloro"
  },
  {
    number: 18,
    symbol: "Ar",
    name: "Argônio",
    atomic_mass: 39.948,
    category: "gás nobre",
    group: 18,
    period: 3,
    summary: "Gás nobre usado em lâmpadas, soldagem e atmosfera inerte.",
    discovered_by: "Lord Rayleigh",
    source: "https://pt.wikipedia.org/wiki/Arg%C3%B4nio"
  },
  {
    number: 19,
    symbol: "K",
    name: "Potássio",
    atomic_mass: 39.098,
    category: "metal alcalino",
    group: 1,
    period: 4,
    summary: "Metal alcalino essencial para o sistema nervoso e contração muscular.",
    discovered_by: "Humphry Davy",
    source: "https://pt.wikipedia.org/wiki/Pot%C3%A1ssio"
  },
  {
    number: 20,
    symbol: "Ca",
    name: "Cálcio",
    atomic_mass: 40.078,
    category: "metal alcalino-terroso",
    group: 2,
    period: 4,
    summary: "Metal essencial para ossos, dentes e contração muscular.",
    discovered_by: "Humphry Davy",
    source: "https://pt.wikipedia.org/wiki/C%C3%A1lcio"
  },
  {
    number: 26,
    symbol: "Fe",
    name: "Ferro",
    atomic_mass: 55.845,
    category: "metal de transição",
    group: 8,
    period: 4,
    summary: "Metal de transição essencial para a vida, usado em construção e hemoglobina.",
    discovered_by: "Antiguidade",
    source: "https://pt.wikipedia.org/wiki/Ferro"
  },
  {
    number: 29,
    symbol: "Cu",
    name: "Cobre",
    atomic_mass: 63.546,
    category: "metal de transição",
    group: 11,
    period: 4,
    summary: "Metal de transição usado em eletricidade, joias e moedas.",
    discovered_by: "Antiguidade",
    source: "https://pt.wikipedia.org/wiki/Cobre"
  },
  {
    number: 47,
    symbol: "Ag",
    name: "Prata",
    atomic_mass: 107.868,
    category: "metal de transição",
    group: 11,
    period: 5,
    summary: "Metal precioso usado em joias, fotografia e condutividade elétrica.",
    discovered_by: "Antiguidade",
    source: "https://pt.wikipedia.org/wiki/Prata"
  },
  {
    number: 79,
    symbol: "Au",
    name: "Ouro",
    atomic_mass: 196.967,
    category: "metal de transição",
    group: 11,
    period: 6,
    summary: "Metal precioso usado em joias, eletrônicos e reservas monetárias.",
    discovered_by: "Antiguidade",
    source: "https://pt.wikipedia.org/wiki/Ouro"
  },
  {
    number: 82,
    symbol: "Pb",
    name: "Chumbo",
    atomic_mass: 207.2,
    category: "metal pós-transição",
    group: 14,
    period: 6,
    summary: "Metal pesado usado em baterias, proteção contra radiação e solda.",
    discovered_by: "Antiguidade",
    source: "https://pt.wikipedia.org/wiki/Chumbo"
  },
  {
    number: 92,
    symbol: "U",
    name: "Urânio",
    atomic_mass: 238.029,
    category: "actinídeo",
    group: 3,
    period: 7,
    summary: "Elemento radioativo usado em energia nuclear e armas nucleares.",
    discovered_by: "Martin Heinrich Klaproth",
    source: "https://pt.wikipedia.org/wiki/Ur%C3%A2nio"
  }
];

export default elements;
