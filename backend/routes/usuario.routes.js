const express = require('express');
const router = express.Router();
const {cadastrarUsuario} = require("../controller/usuario.controller");

router.post('/register', cadastrarUsuario);

module.exports = router;