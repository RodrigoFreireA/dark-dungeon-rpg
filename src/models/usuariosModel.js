const fs = require('fs');
const path = require('path');

const usuariosPath = path.resolve(__dirname, '../../data/usuarios.json');

function lerUsuarios() {
    return JSON.parse(fs.readFileSync(usuariosPath, 'utf-8') || '[]');
}

function salvarUsuarios(data) {
    fs.writeFileSync(usuariosPath, JSON.stringify(data, null, 2));
}

module.exports = { lerUsuarios, salvarUsuarios };
