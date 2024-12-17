const jwt = require('jsonwebtoken');

function verificarToken(req, res, next) {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ error: 'Acesso negado. Token não fornecido.' });

    try {
        const decoded = jwt.verify(token, 'secreto123'); // Segredo usado para gerar o token
        req.usuario = decoded; // Adiciona os dados do token no request
        next();
    } catch (err) {
        res.status(401).json({ error: 'Token inválido.' });
    }
}

module.exports = { verificarToken };
