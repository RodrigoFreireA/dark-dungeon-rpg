const path = require('path'); // Adicione esta linha no topo
const express = require('express');
const http = require('http');
const cors = require('cors');
const helmet = require('helmet');
const personagensRoutes = require('./routes/personagensRoutes');
const salasRoutes = require('./routes/salasRoutes');
const setupSocket = require('./socket');
const usuariosRoutes = require('./routes/usuariosRoutes');

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
app.use('/personagens', personagensRoutes);
app.use('/salas', salasRoutes);
app.use('/usuarios', usuariosRoutes);

// Socket.IO
setupSocket(server);

// Inicializar o servidor
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
