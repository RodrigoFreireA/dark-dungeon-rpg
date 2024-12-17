const bcrypt = require('bcryptjs');

async function gerarSenha() {
    const novaSenha = 'admin123'; // Substitua pela senha desejada
    const senhaHash = await bcrypt.hash(novaSenha, 10);
    console.log('Nova senha criptografada:', senhaHash);
}

gerarSenha();