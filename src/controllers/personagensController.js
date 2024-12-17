const { lerPersonagens, salvarPersonagens } = require('../models/personagensModel');
const Joi = require('joi');

const personagemSchema = Joi.object({
    nome: Joi.string().min(3).required(),
    classe: Joi.string().required(),
});

function getPersonagens(req, res) {
    const personagens = lerPersonagens();
    res.json(personagens);
}

function addPersonagem(req, res) {
    const { error } = personagemSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const personagens = lerPersonagens();
    const novoPersonagem = { id: personagens.length + 1, ...req.body };
    personagens.push(novoPersonagem);
    salvarPersonagens(personagens);
    res.status(201).json(novoPersonagem);
}

module.exports = { getPersonagens, addPersonagem };
