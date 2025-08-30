# Comparador de Elementos Químicos

## Funcionalidades Implementadas

### 1. Seleção de Elementos
- **Dois dropdowns**: Permitem selecionar dois elementos químicos diferentes
- **Lista completa**: Todos os elementos da tabela periódica disponíveis
- **Formato claro**: Exibe número, nome e símbolo do elemento

### 2. Cards de Comparação
- **Layout lado a lado**: Cards organizados em duas colunas
- **Informações completas**: Exibe todas as propriedades dos elementos
- **Cores por categoria**: Cada elemento tem cor baseada em sua categoria química

### 3. Destaque de Diferenças
- **Valores numéricos**: 
  - 🟢 Verde: Valor maior
  - 🔴 Vermelho: Valor menor
  - ⚪ Cinza: Valores iguais
- **Propriedades qualitativas**:
  - 🟡 Amarelo: Propriedades diferentes
  - ⚪ Cinza: Propriedades iguais

### 4. Propriedades Comparadas
- **Número Atômico**: Posição na tabela periódica
- **Massa Atômica**: Massa em unidades atômicas (u)
- **Grupo**: Coluna na tabela periódica
- **Período**: Linha na tabela periódica
- **Estado Físico**: Sólido, líquido ou gasoso (temperatura ambiente)
- **Eletronegatividade**: Escala de Pauling
- **Categoria**: Tipo de elemento (metal, não-metal, etc.)
- **Descoberta**: Quem descobriu o elemento
- **Resumo**: Descrição das características principais

### 5. Funcionalidades Adicionais
- **Botão Trocar**: Permite inverter a posição dos elementos
- **Links externos**: Acesso a mais informações na Wikipedia
- **Legenda**: Explica o significado das cores
- **Responsivo**: Funciona em dispositivos móveis e desktop

## Como Usar

1. **Acesse a página**: Navegue para `/comparador`
2. **Selecione elementos**: Escolha dois elementos nos dropdowns
3. **Compare**: Visualize as diferenças destacadas nos cards
4. **Troque**: Use o botão para inverter as posições
5. **Explore**: Clique em "Mais informações" para detalhes adicionais

## Tecnologias Utilizadas

- **Next.js 14**: Framework React com App Router
- **TypeScript**: Tipagem estática
- **Bootstrap 5**: Framework CSS para layout
- **Font Awesome**: Ícones
- **Tailwind CSS**: Classes utilitárias adicionais

## Estrutura do Código

```
src/app/comparador/
└── page.tsx          # Página principal do comparador

src/data/
└── elements.ts       # Dados dos elementos químicos
```

## Melhorias Futuras

- [ ] Adicionar gráficos comparativos
- [ ] Incluir mais propriedades (ponto de fusão, ebulição, etc.)
- [ ] Histórico de comparações
- [ ] Exportar comparações em PDF
- [ ] Modo escuro/claro
- [ ] Animações de transição
