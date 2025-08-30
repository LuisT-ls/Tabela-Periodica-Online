# Guia de Configuração Inicial

## 🚀 Setup Rápido

### 1. Instalar Node.js
Certifique-se de ter o Node.js 18+ instalado:
```bash
node --version
npm --version
```

### 2. Instalar Dependências
```bash
npm install
```

### 3. Executar o Projeto
```bash
npm run dev
```

### 4. Acessar a Aplicação
Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

## 📁 Estrutura Criada

```
tabela-periodica-online/
├── .vscode/                    # Configurações do VSCode
├── src/
│   ├── app/                   # Páginas (App Router)
│   │   ├── layout.tsx        # Layout principal
│   │   ├── page.tsx          # Página inicial
│   │   ├── tabela/           # Página da tabela
│   │   ├── elementos/        # Página de elementos
│   │   └── sobre/            # Página sobre
│   ├── components/           # Componentes reutilizáveis
│   │   ├── Header.tsx       # Cabeçalho
│   │   └── Footer.tsx       # Rodapé
│   ├── data/                # Dados JSON
│   │   └── elementos.json   # Dados dos elementos
│   ├── styles/              # Estilos
│   │   └── globals.css      # CSS global
│   └── utils/               # Funções utilitárias
│       └── elementos.ts     # Utilitários
├── routes.js                # Centralizador de rotas
├── package.json             # Dependências
├── next.config.js           # Config Next.js
├── tailwind.config.js       # Config Tailwind
├── tsconfig.json            # Config TypeScript
├── .eslintrc.json           # Config ESLint
├── .prettierrc              # Config Prettier
├── vercel.json              # Config Vercel
└── README.md                # Documentação
```

## 🛠️ Scripts Disponíveis

- `npm run dev` - Servidor de desenvolvimento
- `npm run build` - Build de produção
- `npm run start` - Executar produção
- `npm run lint` - Verificar código
- `npm run format` - Formatar código

## 🌐 Deploy no Vercel

1. Conecte o repositório ao Vercel
2. O deploy será automático
3. Acesse a URL fornecida

## ✅ Checklist de Verificação

- [ ] Node.js instalado
- [ ] Dependências instaladas (`npm install`)
- [ ] Projeto executando (`npm run dev`)
- [ ] Página inicial carregando
- [ ] Navegação funcionando
- [ ] Busca de elementos funcionando
- [ ] Tabela periódica exibindo
- [ ] Responsividade testada

## 🔧 Solução de Problemas

### Erro de dependências
```bash
rm -rf node_modules package-lock.json
npm install
```

### Erro de TypeScript
```bash
npm run build
```

### Erro de ESLint
```bash
npm run lint -- --fix
```

## 📞 Suporte

Se encontrar problemas, verifique:
1. Versão do Node.js (18+)
2. Logs do terminal
3. Console do navegador
4. Documentação do Next.js
