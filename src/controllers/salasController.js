const { lerSalas, salvarSalas } = require('../models/salasModel');
const Joi = require('joi');

const salaSchema = Joi.object({
    nome: Joi.string().min(3).required(),
    descricao: Joi.string().optional(),
    mestre: Joi.string().required(),
});

function getSalas(req, res) {
    const salas = lerSalas();
    res.json(salas);
}

function addSala(req, res) {
    const { error } = salaSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const salas = lerSalas();
    const novaSala = { id: salas.length + 1, ...req.body };
    salas.push(novaSala);
    salvarSalas(salas);
    res.status(201).json(novaSala);
}

module.exports = { getSalas, addSala };
