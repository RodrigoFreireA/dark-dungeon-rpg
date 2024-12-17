const jwt = require('jsonwebtoken');

function gerarTokenAdm() {
    const payload = { id: 4, nome: 'admin', nivel: 'ADM' }; // Dados do ADM
    const segredo = '$2a$10$WpBNrbPz/mDwYxbHZ/CERO2NWx4Ph/Ph4vkkC5.FuRfBXrMZ/Wl.2'; // Substitua pela chave secreta real
    const token = jwt.sign(payload, segredo, { expiresIn: '1h' });
    console.log('Token ADM gerado:', token);
}

gerarTokenAdm();
