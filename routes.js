export const routes = {
  home: {
    path: '/',
    name: 'Início',
    icon: 'fas fa-home'
  },
  tabela: {
    path: '/tabela',
    name: 'Tabela Periódica',
    icon: 'fas fa-table'
  },
  sobre: {
    path: '/sobre',
    name: 'Sobre',
    icon: 'fas fa-info-circle'
  },
  quiz: {
    path: '/quiz',
    name: 'Quiz',
    icon: 'fas fa-question-circle'
  },
  comparador: {
    path: '/comparador',
    name: 'Comparador',
    icon: 'fas fa-balance-scale'
  }
};

export const getRoutes = () => Object.values(routes);

export const getRouteByPath = (path) => {
  return Object.values(routes).find(route => route.path === path);
};
