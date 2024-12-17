const express = require('express');
const { getSalas, addSala } = require('../controllers/salasController');
const { verificarToken } = require('../middleware/authMiddleware');
const { verificarPermissao } = require('../middleware/roleMiddleware');

const router = express.Router();

// Rota de listagem de salas - Acessível a todos os usuários autenticados
router.get('/', verificarToken, getSalas);

// Rota de criação de salas - Restrita a Mestres de Mesa
router.post('/', verificarToken, verificarPermissao('Mestre'), addSala);

module.exports = router;
