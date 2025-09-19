# Yu-Gi-Oh  🃏  

Projeto front-end desenvolvido em **React** para listar cartas de Yu-Gi-Oh consumindo a [API YGOProDeck](https://db.ygoprodeck.com/api-guide/).  
Possui **filtros, paginação, carrinho de compras persistente (localStorage)** e **modal de confirmação** ao adicionar produtos.  

---

## 🚀 Tecnologias utilizadas  

- **[React](https://reactjs.org/)** (v18 ou superior) → Biblioteca principal da interface  
- **[Vite](https://vitejs.dev/)** → Bundler rápido para desenvolvimento  
- **[Axios](https://axios-http.com/)** → Cliente HTTP para consumir a API  
- **React Context API** → Gerenciamento do estado do carrinho  
- **LocalStorage** → Persistência dos itens do carrinho  
- **CSS puro + Responsividade (Mobile First)** → Estilização customizada sem frameworks  

---

## 🏗️ Arquitetura escolhida  

O projeto segue uma estrutura **componentizada** para facilitar manutenção e reuso:  

```
src/
 ├── assets/          # Imagens (logo, ícones, etc.)
 ├── components/      # Componentes reutilizáveis (Header, Footer, Sidebar, Modal, etc.)
 │    ├── CardGrid.jsx
 │    ├── Header.jsx
 │    ├── Sidebar.jsx
 │    ├── Footer.jsx
 │    ├── Modal.jsx
 │    └── Cart.jsx
 ├── styles/          # Estilos organizados por responsabilidade
 │    ├── reset.css
 │    ├── layout.css
 │    ├── header.css
 │    ├── sidebar.css
 │    ├── cards.css
 │    ├── footer.css
 │    ├── pagination.css
 │    ├── responsive.css
 │    └── banner.css
 ├── App.jsx          # Componente principal
 ├── main.jsx         # Ponto de entrada da aplicação
 └── index.html
```

### 🛠️ Decisões de arquitetura:
- **Context API no lugar de Redux** → simples e suficiente para gerenciar o carrinho.  
- **CSS modularizado** → facilita manutenção e evita um único arquivo gigante.  
- **Responsividade por `@media queries`** → layout adaptado para **mobile, 1366px e 1920px**.  
- **Paginação dinâmica** → sempre mostra apenas até 5 páginas de cada vez.  

---

## ▶️ Como rodar o projeto  

### Pré-requisitos  
- Node.js **>= 18**  
- npm ou yarn instalado  

### Passos  

```bash
# 1. Clonar o repositório
git clone https://github.com/SEU_USUARIO/yu-gi-oh.git

# 2. Entrar na pasta do projeto
cd yu-gi-oh

# 3. Instalar dependências
npm install

# 4. Rodar o projeto em modo desenvolvimento
npm run dev

# 5. Acessar no navegador
http://localhost:5173
```

### Build para produção  

```bash
# Gera versão otimizada
npm run build

# Rodar preview do build
npm run preview
```

---

## 📱 Responsividade  

- **Mobile (até 768px):** menu lateral se transforma em off-canvas.  
- **Desktop 1366px e 1920px:** layout adaptado, com até 5 cartas por linha.  
- Todos os botões e textos ajustados para toque em telas pequenas.  

---

## 📌 Funcionalidades  

- [x] Buscar cartas por nome  
- [x] Filtrar por tipo, raça, atributo e arquétipo  
- [x] Paginação com limite de 5 páginas visíveis  
- [x] Adicionar/remover itens do carrinho  
- [x] Persistência do carrinho no localStorage  
- [x] Modal de confirmação ao adicionar produto  
- [x] Tema claro/escuro  

---
