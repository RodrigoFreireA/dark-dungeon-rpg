const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3001',
        methods: ['GET', 'POST', 'PUT', 'DELETE']
    }
});

const SECRET_KEY = 'secreta-chave-para-jwt';
const usersFilePath = path.join(__dirname, 'users.json');
const salasFilePath = path.join(__dirname, 'salas.json');
const personagensFilePath = path.join(__dirname, 'personagens.json');


app.use(cors({
    origin: '*', // Permite todas as origens
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos HTTP permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Headers permitidos
}));
app.use(express.json());

// Função para carregar dados de um arquivo JSON
function carregarDados(filePath) {
    try {
        if (fs.existsSync(filePath)) {
            const data = fs.readFileSync(filePath, 'utf8');
            return JSON.parse(data);
        }
        return {};
    } catch (err) {
        console.error(`Erro ao carregar dados de ${filePath}:`, err);
        return {};
    }
}

// Função para salvar dados em um arquivo JSON
function salvarDados(filePath, data) {
    try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    } catch (err) {
        console.error(`Erro ao salvar dados em ${filePath}:`, err);
    }
}

const users = carregarDados(usersFilePath);
const salas = carregarDados(salasFilePath);
const personagens = carregarDados(personagensFilePath);

// Middleware para autenticação
function autenticarToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Token não fornecido.' });

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json({ error: 'Token inválido.' });
        req.user = user;
        next();
    });
}

// Rota para registrar usuário
app.post('/register', (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ error: 'Nome de usuário e senha são obrigatórios.' });
    }
    if (users[username]) {
        return res.status(400).json({ error: 'Usuário já existe.' });
    }
    users[username] = { password };
    salvarDados(usersFilePath, users);
    res.status(201).json({ message: 'Usuário registrado com sucesso.' });
});

// Rota para login
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ error: 'Nome de usuário e senha são obrigatórios.' });
    }
    const user = users[username];
    if (!user || user.password !== password) {
        return res.status(401).json({ error: 'Credenciais inválidas.' });
    }
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
});

// Rota para criar sala (protegida)
app.post('/salas', autenticarToken, (req, res) => {
    const { nome, descricao } = req.body;
    if (!nome) {
        return res.status(400).json({ error: 'O nome da sala é obrigatório.' });
    }
    if (salas[nome]) {
        return res.status(400).json({ error: 'Sala já existe.' });
    }
    salas[nome] = { descricao: descricao || '', mensagens: [], usuarios: [], mestre: req.user.username };
    salvarDados(salasFilePath, salas);
    res.status(201).json({ message: 'Sala criada com sucesso.', nome });
});

// Rota para listar salas
app.get('/salas', (req, res) => {
    console.log('Requisição recebida para listar salas');
    console.log('Salas disponíveis:', salas);

    const listaSalas = Object.keys(salas).map((nome) => ({
        nome,
        descricao: salas[nome].descricao,
        mestre: salas[nome].mestre
    }));

    res.json(listaSalas);
});


// Rota para listar personagens (protegida)
app.get('/personagens', autenticarToken, (req, res) => {
    const personagensUsuario = users[req.user.username]?.personagens || [];
    res.json(personagensUsuario);
});

// Rota para criar personagem (protegida)
app.post('/personagens', autenticarToken, (req, res) => {
    const { nome, classe } = req.body;

    if (!nome || !classe) {
        return res.status(400).json({ error: 'Nome e classe são obrigatórios.' });
    }

    // Garantir que o usuário existe no sistema
    if (!users[req.user.username]) {
        users[req.user.username] = { password: users[req.user.username]?.password, personagens: [] };
    }

    // Salvar o personagem
    if (!users[req.user.username].personagens) {
        users[req.user.username].personagens = [];
    }

    users[req.user.username].personagens.push({ nome, classe });
    salvarDados(usersFilePath, users);

    res.status(201).json({ message: 'Personagem criado com sucesso.', nome });
});

// Rota para excluir personagem (protegida)
app.delete('/personagens', autenticarToken, (req, res) => {
    const { nome } = req.body;

    if (!nome) {
        return res.status(400).json({ error: 'Nome do personagem é obrigatório.' });
    }

    // Filtrar os personagens do usuário para excluir o solicitado
    const personagensUsuario = users[req.user.username]?.personagens || [];
    const personagemIndex = personagensUsuario.findIndex((p) => p.nome === nome);

    if (personagemIndex === -1) {
        return res.status(404).json({ error: 'Personagem não encontrado.' });
    }

    users[req.user.username].personagens.splice(personagemIndex, 1);
    salvarDados(usersFilePath, users);

    res.status(200).json({ message: 'Personagem excluído com sucesso.' });
});

// Evento de conexão do Socket.IO
io.on('connection', (socket) => {
    console.log(`Usuário conectado: ${socket.id}`);

    socket.on('entrarSala', ({ sala, token, personagem }) => {
        jwt.verify(token, SECRET_KEY, (err, user) => {
            if (err) {
                socket.emit('erro', 'Token inválido.');
                return;
            }

            if (!salas[sala]) {
                socket.emit('erro', 'Sala não encontrada.');
                return;
            }

            socket.join(sala);
            salas[sala].usuarios.push({ id: socket.id, personagem });
            salvarDados(salasFilePath, salas);

            // Emitir mensagem de notificação para todos na sala
            io.to(sala).emit('notificacao', {
                mensagem: `${personagem.nome} entrou na sala.`,
            });
        });
    });
});


const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
