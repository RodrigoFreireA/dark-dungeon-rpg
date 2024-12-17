const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { lerUsuarios, salvarUsuarios } = require('../models/usuariosModel');
const Joi = require('joi');

// Esquema de validação do usuário
const usuarioSchema = Joi.object({
    nome: Joi.string().min(3).required(),
    senha: Joi.string().min(6).required()
});

async function criarUsuario(req, res) {
    const { error } = usuarioSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const usuarios = lerUsuarios();
    const { nome, senha } = req.body;

    if (usuarios.find(u => u.nome === nome)) {
        return res.status(400).json({ error: 'Nome de usuário já existe.' });
    }

    // Criptografar senha
    const senhaHash = await bcrypt.hash(senha, 10);
    const novoUsuario = {
        id: usuarios.length + 1,
        nome,
        nivel: 'Player', // Nível padrão
        senha: senhaHash,
        status: 'ativo',
        dataCriacao: new Date().toISOString()
    };

    usuarios.push(novoUsuario);
    salvarUsuarios(usuarios);
    res.status(201).json({ message: 'Usuário criado com sucesso!', usuario: novoUsuario });
}

function elevarNivelUsuario(req, res) {
    const { id, novoNivel } = req.body;

    // Validação do nível
    const niveisValidos = ['Mestre', 'ADM'];
    if (!niveisValidos.includes(novoNivel)) {
        return res.status(400).json({ error: 'Nível inválido. Use "Mestre" ou "ADM".' });
    }

    const usuarios = lerUsuarios();
    const usuario = usuarios.find(u => u.id === id);

    if (!usuario) return res.status(404).json({ error: 'Usuário não encontrado.' });
    if (usuario.nivel === 'ADM') return res.status(400).json({ error: 'ADM já possui acesso total.' });

    // Atualizar nível
    usuario.nivel = novoNivel;
    salvarUsuarios(usuarios);
    res.json({ message: `Nível do usuário "${usuario.nome}" alterado para "${novoNivel}".` });
}

//função de login de usuarios
function loginUsuario(req, res) {
    const { nome, senha } = req.body;
    const usuarios = lerUsuarios();

    const usuario = usuarios.find(u => u.nome === nome);
    if (!usuario) return res.status(400).json({ error: 'Usuário ou senha incorretos.' });

    const senhaValida = bcrypt.compareSync(senha, usuario.senha);
    if (!senhaValida) return res.status(400).json({ error: 'Usuário ou senha incorretos.' });

    // Gerar token com JWT_SECRET
    const token = jwt.sign(
        { id: usuario.id, nivel: usuario.nivel },
        process.env.JWT_SECRET, // Usa a chave secreta do .env
        { expiresIn: '1h' }
    );

    res.json({ message: 'Login bem-sucedido!', token });
}

// Alterar senha de um usuário existente
async function alterarSenha(req, res) {
    const { id, novaSenha } = req.body;

    // Validação básica
    if (!novaSenha || novaSenha.length < 6) {
        return res.status(400).json({ error: 'A nova senha deve ter no mínimo 6 caracteres.' });
    }

    const usuarios = lerUsuarios();
    const usuario = usuarios.find(u => u.id === id);

    if (!usuario) {
        return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    // Atualizar senha
    const novaSenhaHash = await bcrypt.hash(novaSenha, 10);
    usuario.senha = novaSenhaHash;

    salvarUsuarios(usuarios);
    res.json({ message: `Senha do usuário "${usuario.nome}" alterada com sucesso.` });
}

// Exportação das funções
module.exports = { criarUsuario, loginUsuario, elevarNivelUsuario, alterarSenha };
