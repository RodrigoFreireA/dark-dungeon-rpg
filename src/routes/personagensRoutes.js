const express = require('express');
const { getPersonagens, addPersonagem } = require('../controllers/personagensController');
const { verificarToken } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', verificarToken, getPersonagens);
router.post('/', verificarToken, addPersonagem);

module.exports = router;
