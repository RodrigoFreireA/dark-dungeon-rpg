const express = require('express');
const { getSalas, addSala } = require('../controllers/salasController');

const router = express.Router();

router.get('/', getSalas);
router.post('/', addSala);

module.exports = router;
