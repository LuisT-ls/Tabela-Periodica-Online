# Tabela Periódica Online

Uma aplicação web interativa para explorar a tabela periódica dos elementos químicos, desenvolvida com Next.js 14, React.js, Bootstrap e FontAwesome.

## 🚀 Características

- **Interface Responsiva**: Otimizada para desktop, tablet e dispositivos móveis
- **Busca Inteligente**: Encontre elementos por nome, símbolo ou número atômico
- **Dados Detalhados**: Informações completas sobre cada elemento químico
- **Navegação Intuitiva**: Menu de navegação centralizado com rotas organizadas
- **Design Moderno**: Interface limpa e profissional com Bootstrap 5

## 🛠️ Tecnologias Utilizadas

- **Next.js 14** - Framework React com App Router
- **React.js 18** - Biblioteca JavaScript para interfaces
- **TypeScript** - Tipagem estática para JavaScript
- **Bootstrap 5** - Framework CSS responsivo
- **FontAwesome** - Ícones vetoriais
- **Tailwind CSS** - Framework CSS utilitário
- **ESLint + Prettier** - Linting e formatação de código

## 📁 Estrutura do Projeto

```
src/
├── app/                 # Páginas da aplicação (App Router)
│   ├── layout.tsx      # Layout principal
│   ├── page.tsx        # Página inicial
│   ├── tabela/         # Página da tabela periódica
│   ├── elementos/      # Página de listagem de elementos
│   └── sobre/          # Página sobre o projeto
├── components/         # Componentes reutilizáveis
│   ├── Header.tsx     # Cabeçalho com navegação
│   └── Footer.tsx     # Rodapé
├── data/              # Dados dos elementos químicos
│   └── elementos.json # JSON com informações dos elementos
├── styles/            # Estilos customizados
│   └── globals.css    # Estilos globais
└── utils/             # Funções auxiliares
    └── elementos.ts   # Utilitários para elementos
```

## 🚀 Como Executar

### Pré-requisitos

- Node.js 18+ 
- npm ou yarn

### Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/tabela-periodica-online.git
cd tabela-periodica-online
```

2. Instale as dependências:
```bash
npm install
# ou
yarn install
```

3. Execute o servidor de desenvolvimento:
```bash
npm run dev
# ou
yarn dev
```

4. Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

### Scripts Disponíveis

- `npm run dev` - Executa o servidor de desenvolvimento
- `npm run build` - Gera a build de produção
- `npm run start` - Executa a aplicação em produção
- `npm run lint` - Executa o ESLint
- `npm run format` - Formata o código com Prettier

## 📦 Deploy

### Vercel (Recomendado)

1. Conecte seu repositório ao Vercel
2. O deploy será automático a cada push para a branch principal
3. A configuração está no arquivo `vercel.json`

### Outras Plataformas

O projeto pode ser deployado em qualquer plataforma que suporte Next.js:
- Netlify
- Railway
- Heroku
- AWS Amplify

## 🎨 Personalização

### Cores

As cores principais podem ser alteradas no arquivo `src/styles/globals.css`:

```css
:root {
  --primary: #007bff;
  --primary-dark: #0056b3;
  --secondary: #6c757d;
  /* ... outras cores */
}
```

### Dados dos Elementos

Os dados dos elementos químicos estão em `src/data/elementos.json` e podem ser facilmente expandidos ou modificados.

## 📱 Rotas Disponíveis

- `/` - Página inicial
- `/tabela` - Tabela periódica completa
- `/elementos` - Listagem de elementos com busca
- `/sobre` - Informações sobre o projeto

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🙏 Agradecimentos

- Dmitri Mendeleev pela criação da tabela periódica
- Comunidade Next.js e React
- FontAwesome pelos ícones
- Bootstrap pelo framework CSS

---

Desenvolvido com ❤️ para a comunidade científica e educacional.