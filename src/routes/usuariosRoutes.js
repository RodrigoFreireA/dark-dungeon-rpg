const express = require('express');
const {
    criarUsuario,
    loginUsuario,
    elevarNivelUsuario,
    alterarSenha // Importar a função alterarSenha
} = require('../controllers/usuariosController');
const { verificarToken } = require('../middleware/authMiddleware');
const { verificarPermissao } = require('../middleware/roleMiddleware');

const router = express.Router();

router.post('/criar', criarUsuario);
router.post('/login', loginUsuario);
router.put('/elevar', verificarToken, verificarPermissao('ADM'), elevarNivelUsuario); // Apenas ADM pode elevar nível

// Rota para alterar senha de um usuário existente
router.put('/alterar-senha', verificarToken, verificarPermissao('ADM'), alterarSenha);

module.exports = router;
