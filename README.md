# 🧙‍♂️ Dark Dungeon Online - Plataforma de RPG de Mesa Online

Bem-vindo ao **Dark Dungeon Online**, um projeto para criar e gerenciar salas de RPG de mesa online, com suporte a criação de personagens e chat em tempo real. Ideal para mestres e jogadores interagirem de forma prática e divertida! 🎲

## 🚀 Tecnologias Utilizadas

### Backend
- [![Express.js](https://img.shields.io/badge/-Express.js-000000?style=flat-square&logo=express&logoColor=white)](https://expressjs.com/) - Framework minimalista para Node.js.
- [![Node.js](https://img.shields.io/badge/-Node.js-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/) - Ambiente de execução JavaScript no servidor.
- [![Socket.IO](https://img.shields.io/badge/-Socket.IO-010101?style=flat-square&logo=socket.io)](https://socket.io/) - Comunicação em tempo real entre clientes e servidores.

### Frontend
- [![HTML5](https://img.shields.io/badge/-HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5)
- [![CSS3](https://img.shields.io/badge/-CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
- [![JavaScript](https://img.shields.io/badge/-JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

### Armazenamento
- [![JSON](https://img.shields.io/badge/-JSON-000000?style=flat-square&logo=json&logoColor=white)](https://www.json.org/json-en.html) - Utilizado para persistência dos dados.

### Ambiente
- [![Docker](https://img.shields.io/badge/-Docker-2496ED?style=flat-square&logo=docker&logoColor=white)](https://www.docker.com/) - Para criar e gerenciar containers de forma eficiente.

## 🛠️ Funcionalidades

### ✅ Gerenciamento de Salas
- Crie e gerencie salas de RPG.
- Lista de salas disponíveis com detalhes do mestre e descrição.

### ✅ Criação de Personagens
- Criação personalizada de personagens com nome e classe.
- Lista de personagens criados para fácil seleção.

### ✅ Chat em Tempo Real
- Comunicação em tempo real nas salas utilizando **Socket.IO**.
- Envio de mensagens com suporte a comandos de sistema.

### ✅ Design Responsivo
- Layout moderno e responsivo para uma experiência agradável em diferentes dispositivos.

## 🧰 Pré-requisitos

- [Node.js](https://nodejs.org/) (v18 ou superior).
- [Docker](https://www.docker.com/) (opcional, mas recomendado).
- Navegador moderno (Google Chrome, Firefox, etc.).

## 📦 Como Configurar

### 1. Clone o repositório:
```bash
git clone https://github.com/RodrigoFreireA/dark-dungeon-rpg.git
cd rpg-online
```

### 2. Execute com Docker:
```bash
docker build -t rpg-server .
docker run -p 3001:3001 -v ${PWD}/personagens.json:/app/personagens.json -v ${PWD}/salas.json:/app/salas.json rpg-server
```

### 3. Ou configure localmente:
```bash
npm install
node server.js
```

O servidor estará disponível em [http://localhost:3001](http://localhost:3001).

## 🖥️ Demonstração

### Tela Inicial
![Tela Inicial](Em fase de Testes.).

### Gerenciar Personagens
![Gerenciar Personagens](Em fase de Testes.).

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

<div align="center">
Feito com 💻 e 🎲 por **[Seu Nome](https://github.com/seuusuario)**. Boa diversão!
</div>
