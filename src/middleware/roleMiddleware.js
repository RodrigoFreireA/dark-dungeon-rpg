function verificarPermissao(nivelRequerido) {
    return (req, res, next) => {
        if (!req.usuario || req.usuario.nivel !== nivelRequerido) {
            return res.status(403).json({ error: 'Acesso negado. Permissão insuficiente.' });
        }
        next();
    };
}

module.exports = { verificarPermissao };
