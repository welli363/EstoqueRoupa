const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const pool = require('../config/db');

router.get('/login', (req, res) => {
  res.send('login route funcionando');
});



router.post('/login', async (req, res) => {
    try{
        const {email, senha} = req.body;

        if( !email || !senha ){
            return res.status(400).json({erro: "Email e senha obrigatórios."})
        }
        const [rows] = await pool.query("SELECT * FROM usuarios WHERE email = ?", [email])

        if(rows.length === 0 ){
            return res.status(401).json({erro: "Usuário não encontrado."})
        }

        const usuario = rows[0]
        const senhaValida = await bcrypt.compare(senha, usuario.senha_hash);

        if(!senhaValida){
            return res.status(401).json({erro: "Senha inválida."})
        }

        return res.status(200).json({
            mensagem: "Login realizado com sucesso",
            usuario: {
                id: usuario.id,
                email: usuario.email,
            },
        });

    }catch (error){
        console.error(error);
        return res.status(500).json({erro: "Erro no servidor"})
    }
})

module.exports = router;