const jwt = require('jsonwebtoken');

function verificarToken(req, res, next) {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ error: 'Acesso negado. Token não fornecido.' });
    }

    try {
        // Extrair token sem o "Bearer "
        const tokenLimpo = token.split(' ')[1];

        // Validar token usando a mesma chave secreta do login
        const decoded = jwt.verify(tokenLimpo, process.env.JWT_SECRET);
        req.usuario = decoded; // Adicionar os dados do token no req
        next();
    } catch (err) {
        return res.status(401).json({ error: 'Token inválido.' });
    }
}

module.exports = { verificarToken };
