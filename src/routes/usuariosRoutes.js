const express = require('express');
const { criarUsuario, loginUsuario } = require('../controllers/usuariosController'); // Importação correta

const router = express.Router();

router.post('/criar', criarUsuario);
router.post('/login', loginUsuario);

module.exports = router;
