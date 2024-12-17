const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { lerUsuarios, salvarUsuarios } = require('../models/usuariosModel');
const Joi = require('joi');

// Esquema de validação do usuário
const usuarioSchema = Joi.object({
    nome: Joi.string().min(3).required(),
    nivel: Joi.string().valid('ADM', 'Mestre', 'Player').required(),
    senha: Joi.string().min(6).required()
});

async function criarUsuario(req, res) {
    const { error } = usuarioSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const usuarios = lerUsuarios();
    const { nome, nivel, senha } = req.body;

    if (usuarios.find(u => u.nome === nome)) {
        return res.status(400).json({ error: 'Nome de usuário já existe.' });
    }

    const senhaHash = await bcrypt.hash(senha, 10);
    const novoUsuario = { id: usuarios.length + 1, nome, nivel, senha: senhaHash };

    usuarios.push(novoUsuario);
    salvarUsuarios(usuarios);
    res.status(201).json({ message: 'Usuário criado com sucesso!' });
}

async function loginUsuario(req, res) {
    const { nome, senha } = req.body;

    const usuarios = lerUsuarios();
    const usuario = usuarios.find(u => u.nome === nome);
    if (!usuario) return res.status(400).json({ error: 'Usuário ou senha incorretos.' });

    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) return res.status(400).json({ error: 'Usuário ou senha incorretos.' });

    const token = jwt.sign({ id: usuario.id, nivel: usuario.nivel }, 'secreto123', { expiresIn: '1h' });
    res.json({ message: 'Login bem-sucedido!', token });
}

// Exportação das funções
module.exports = { criarUsuario, loginUsuario };
