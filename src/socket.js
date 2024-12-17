const { Server } = require('socket.io');

function setupSocket(server) {
    const io = new Server(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST']
        }
    });

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
            io.to(sala).emit('mensagemSala', {
                usuario: `Usuário ${socket.id}`,
                mensagem
            });
        });

        socket.on('disconnect', () => {
            console.log(`Usuário desconectado: ${socket.id}`);
        });
    });
}

module.exports = setupSocket;
