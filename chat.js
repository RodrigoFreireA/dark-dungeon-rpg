// Certifique-se de expor a função para o escopo global
window.entrarSalaComPersonagem = entrarSalaComPersonagem;

// As outras funções podem permanecer locais se não forem chamadas diretamente pelo navegador
function entrarSalaComPersonagem(personagem) {
    document.getElementById('select-character').style.display = 'none';
    document.getElementById('chat').style.display = 'block';
    document.getElementById('sala-atual').textContent = salaAtual;

    // Emitir o evento para o servidor
    socket.emit('entrarSala', { sala: salaAtual, token, personagem });

    // Configurar eventos do Socket.IO
    socket.on('mensagemSala', (msg) => {
        const chatMessages = document.getElementById('chat-messages');
        const div = document.createElement('div');
        div.textContent = `${msg.usuario}: ${msg.mensagem}`;
        chatMessages.appendChild(div);
    });

    socket.on('notificacao', (notificacao) => {
        const chatMessages = document.getElementById('chat-messages');
        const div = document.createElement('div');
        div.style.fontStyle = 'italic';
        div.textContent = notificacao.mensagem;
        chatMessages.appendChild(div);
    });


    socket.on('erro', erro => {
        alert(erro);
        voltarParaSalas();
    });

    document.getElementById('enviar-mensagem').addEventListener('click', enviarMensagem);
    document.getElementById('mensagem').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') enviarMensagem();
    });
}

function enviarMensagem() {
    const mensagem = document.getElementById('mensagem').value;
    if (mensagem && salaAtual) {
        socket.emit('mensagemSala', { sala: salaAtual, mensagem });
        document.getElementById('mensagem').value = '';
    }
}

function voltarParaSalas() {
    document.getElementById('chat').style.display = 'none';
    document.getElementById('select-character').style.display = 'none';
    document.getElementById('sala-form').style.display = 'block';
    document.getElementById('salas').style.display = 'block';
}
