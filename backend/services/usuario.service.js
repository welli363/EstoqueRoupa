const pool = require("../config/db");
const bcrypt = require('bcrypt');

const criarUsuario = async (nome, email, senha) => {
    const senhaHash = await bcrypt.hash(senha, 10);
    const [resultado] = await pool.query('INSERT INTO usuarios (nome, email, senha_hash) VALUES (?, ?, ?)',
        [nome, email, senha]
    )
    return {
        id: resultado.insertId,
        nome, 
        email,
    }
}

module.exports = {criarUsuario}