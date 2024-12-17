const path = require('path'); // Adicione esta linha no topo
const express = require('express');
const http = require('http');
const cors = require('cors');
const helmet = require('helmet');
const setupSocket = require('./socket');
const usuariosRoutes = require('./routes/usuariosRoutes');
const salasRoutes = require('./routes/salasRoutes');
const personagensRoutes = require('./routes/personagensRoutes');

require('dotenv').config();
const jwtSecret = process.env.JWT_SECRET;

const app = express();
const server = http.createServer(app);

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Caminhos para arquivos JSON
const personagensPath = path.resolve(__dirname, '../data/personagens.json');
const salasPath = path.resolve(__dirname, '../data/salas.json');

// Rotas
app.use('/usuarios', usuariosRoutes);
app.use('/salas', salasRoutes);
app.use('/personagens', personagensRoutes);

// Socket.IO
setupSocket(server);

// Inicializar o servidor
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
