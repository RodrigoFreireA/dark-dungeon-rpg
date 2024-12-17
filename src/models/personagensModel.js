const fs = require('fs');
const path = require('path');

const personagensPath = path.resolve(__dirname, '../../data/personagens.json');

function lerPersonagens() {
    return JSON.parse(fs.readFileSync(personagensPath, 'utf-8') || '[]');
}

function salvarPersonagens(data) {
    fs.writeFileSync(personagensPath, JSON.stringify(data, null, 2));
}

module.exports = { lerPersonagens, salvarPersonagens };
