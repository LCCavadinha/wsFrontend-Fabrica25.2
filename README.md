# PokeDex

Projeto desenvolvido como desafio da **Fábrica de Software da Unipê - Centro Universitário de João Pessoa**.  
O desafio completo está disponível [neste link](https://jewel-guppy-7e5.notion.site/Desafio-Workshop-25d075906a848030a460da218aee8b8f).

Este projeto foi feito em **Next.js** + **React** + **TypeScript** para consumir a API de Pokémon.

## Funcionalidades

- Listagem dos 151 primeiros Pokémon.
- Busca em tempo real com feedback de resultados.
- Seleção de Pokémon para mostrar detalhes (imagem, ID, peso e level).
- Layout responsivo para todas as telas.
- Animações leves para ícones e cards.
- Uso de ícones do **Font Awesome**.
- Import de fontes do Google (**Poppins** e **Oxanium**).
- Estilização com **TailwindCSS** (com variáveis customizadas).

## Como funciona

1. **Carregamento inicial de Pokémons**  
   - Ao abrir a página, o `useEffect` faz fetch da API do Pokémon, carregando os 151 primeiros Pokémon e seus detalhes.  
   - O resultado é armazenado no estado `pokemonList`.

2. **Busca em tempo real**  
   - O campo de pesquisa atualiza o estado `searchTerm` em tempo real.  
   - A lista exibida é filtrada pelos nomes que começam com o que foi digitado.  
   - Feedback visual mostra quantos Pokémons foram encontrados ou se nenhum foi localizado.

3. **Seleção de Pokémon**  
   - Ao clicar em um Pokémon, é feito fetch de seus detalhes e o card é exibido com informações completas.  
   - O card pode ser fechado com o botão “X”.

4. **Estilização e animações**  
   - Layout responsivo usando TailwindCSS.  
   - Cards e elementos interativos com animações de hover e transições suaves.  
   - Google Fonts e Font Awesome utilizados para tipografia e ícones.  
   - Header com ícone de Pokébola animado.

## Tecnologias usadas

- **Next.js** (React Server Components e Client Components)
- **TypeScript** (tipagem de dados)
- **TailwindCSS** (estilização)
- **Font Awesome** (ícones)
- **Google Fonts** (tipografia)
- **API Pokémon** ([https://pokeapi.co/](https://pokeapi.co/))

## Branches e deploy

- Branch principal de desenvolvimento: `development`.
- Merge para `main` será feito após atualização do README.
- Deploy será feito na **Vercel**.

## Observações

- Layout totalmente responsivo e animado.  
- Cards e barra de pesquisa possuem interações visuais (hover, animações).  
- Estrutura modular, permitindo expansão futura com novos recursos.
