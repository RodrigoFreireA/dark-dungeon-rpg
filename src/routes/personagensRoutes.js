const express = require('express');
const { getPersonagens, addPersonagem } = require('../controllers/personagensController');
const { verificarToken } = require('../middleware/authMiddleware');
const { verificarPermissao } = require('../middleware/roleMiddleware');

const router = express.Router();

// Rotas de gerenciamento de personagens
router.get('/', verificarToken, getPersonagens); // Todos os níveis autenticados podem acessar
router.post('/', verificarToken, verificarPermissao('Player'), addPersonagem); // Somente Players

module.exports = router;
