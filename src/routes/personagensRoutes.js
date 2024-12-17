const express = require('express');
const { getPersonagens, addPersonagem } = require('../controllers/personagensController');

const router = express.Router();

router.get('/', getPersonagens);
router.post('/', addPersonagem);

module.exports = router;
