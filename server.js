const express = require('express');
const http = require('http');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { Server } = require('socket.io');

// Inicializar o aplicativo e servidor HTTP
const app = express();
const server = http.createServer(app);

// Configurar o Socket.IO
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

// Middleware
app.use(cors());
app.use(express.json());

// Caminhos para os arquivos JSON
const personagensPath = path.resolve('./personagens.json');
const salasPath = path.resolve('./salas.json');

// Funções para carregar e salvar dados
function carregarDados(filePath) {
    try {
        if (fs.existsSync(filePath)) {
            return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        } else {
            return [];
        }
    } catch (err) {
        console.error(`Erro ao carregar ${filePath}:`, err.message);
        return [];
    }
}

function salvarDados(filePath, data) {
    try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    } catch (err) {
        console.error(`Erro ao salvar ${filePath}:`, err.message);
    }
}

// Dados iniciais
let personagens = carregarDados(personagensPath);
let salas = carregarDados(salasPath);

// Rotas de personagens
app.get('/personagens', (req, res) => {
    res.json(personagens);
});

app.post('/personagens', (req, res) => {
    const { nome, classe } = req.body;
    if (!nome || !classe) {
        return res.status(400).json({ error: 'Nome e classe são obrigatórios.' });
    }
    const novoPersonagem = { id: personagens.length + 1, nome, classe };
    personagens.push(novoPersonagem);
    salvarDados(personagensPath, personagens);
    res.status(201).json(novoPersonagem);
});

// Rotas de salas
app.get('/salas', (req, res) => {
    res.json(salas);
});

app.post('/salas', (req, res) => {
    const { nome, descricao, mestre } = req.body;
    if (!nome || !mestre) {
        return res.status(400).json({ error: 'Nome e mestre são obrigatórios.' });
    }
    const novaSala = { id: salas.length + 1, nome, descricao, mestre };
    salas.push(novaSala);
    salvarDados(salasPath, salas);
    res.status(201).json(novaSala);
});

// Eventos do Socket.IO
io.on('connection', (socket) => {
    console.log(`Usuário conectado: ${socket.id}`);

    socket.on('entrarSala', ({ sala, personagem }) => {
        console.log(`Usuário ${socket.id} entrou na sala: ${sala} com personagem: ${personagem.nome}`);
        socket.join(sala);
        io.to(sala).emit('notificacao', {
            mensagem: `${personagem.nome} entrou na sala.`
        });
    });

    socket.on('mensagemSala', ({ sala, mensagem }) => {
        console.log(`Mensagem na sala ${sala}: ${mensagem}`);
        io.to(sala).emit('mensagemSala', {
            usuario: `Usuário ${socket.id}`,
            mensagem
        });
    });

    socket.on('disconnect', () => {
        console.log(`Usuário desconectado: ${socket.id}`);
    });
});

// Inicializar o servidor
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
