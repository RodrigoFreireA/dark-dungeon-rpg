const fs = require('fs');
const path = require('path');

const salasPath = path.resolve(__dirname, '../../data/salas.json');

function lerSalas() {
    return JSON.parse(fs.readFileSync(salasPath, 'utf-8') || '[]');
}

function salvarSalas(data) {
    fs.writeFileSync(salasPath, JSON.stringify(data, null, 2));
}

module.exports = { lerSalas, salvarSalas };
