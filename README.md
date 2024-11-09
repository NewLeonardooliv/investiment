# Painel de Gestão Financeira e Investimentos

Este projeto é um painel interativo para ajudar no gerenciamento de finanças pessoais e simulação de investimentos. Com ele, você pode visualizar a divisão das suas despesas mensais e calcular o retorno esperado em investimentos como CDB, SELIC e Poupança.

## Funcionalidades

- **Gestão de Despesas**: Com base em um salário especificado, o painel mostra uma divisão recomendada das despesas para categorias essenciais, como:
  - Necessidades (Essenciais)
  - Liberdade Financeira (Investimentos)
  - Educação (Crescimento Pessoal)
  - Poupança para Grandes Compras
  - Diversão (Lazer)
  - Doações (Contribuição)
- **Simulação de Investimentos**: Calcula o retorno de investimentos com base nos valores iniciais, contribuição mensal e taxas de rendimento esperadas.
- **Design Responsivo**: O layout é otimizado para diferentes dispositivos e tamanhos de tela.

## Tecnologias Utilizadas

- **React** para criação de interfaces interativas.
- **useState** para gerenciar estados e configurações dinâmicas do usuário.
- **Componentes UI** (Card, Table, Tabs, Tooltip) para organizar e exibir informações de forma clara.
- **Intl.NumberFormat** para formatação de valores monetários no padrão brasileiro (R$).

## Estrutura do Projeto

1. **Defina Seu Salário**: Utilize o campo de entrada para definir o valor do salário. O painel atualizará automaticamente os valores das despesas com base nas proporções predefinidas.
2. **Configuração de Contribuições e Taxas**: Preencha os campos de valor inicial, aporte mensal e taxa CDI para simulação dos investimentos.
3. **Simulação de Investimentos**: Navegue pelas abas para visualizar as métricas de rendimento de CDB, SELIC e Poupança, incluindo taxas mensais, anuais, rendimentos, impostos e valor líquido.

## Componentes

- **Card**: Exibe as seções de despesas e de configurações de investimento.
- **Table**: Organiza e apresenta as despesas e métricas de investimento.
- **Tabs**: Permite alternar entre diferentes opções de investimento.
- **Tooltip**: Exibe descrições adicionais sobre as categorias e métricas.


