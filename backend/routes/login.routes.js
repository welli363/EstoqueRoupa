const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const pool = require("../config/db");


//  ROTA TESTE
router.get("/login", (req, res) => {
  res.send("login route funcionando");
});


//  LOGIN
router.post("/login", async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    if ( !nome ||!email || !senha) {
      return res.status(400).json({
        erro: "Nome, email e senha obrigatórios."
      });
    }

    const [rows] = await pool.query(
      "SELECT * FROM usuarios WHERE email = ?",
      [email]
    );

    if (rows.length === 0) {
      return res.status(401).json({
        erro: "Usuário não encontrado."
      });
    }

    const usuario = rows[0];

    // segurança: garante que existe hash
    if (!usuario.senha_hash) {
      return res.status(500).json({
        erro: "Usuário sem senha cadastrada corretamente."
      });
    }

    const senhaValida = await bcrypt.compare(
      senha,
      usuario.senha_hash
    );

    if (!senhaValida) {
      return res.status(401).json({
        erro: "Senha inválida."
      });
    }

    return res.status(200).json({
      mensagem: "Login realizado com sucesso",
      usuario: {
        id: usuario.id,
        email: usuario.email
      }
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      erro: "Erro no servidor"
    });
  }
});


//  CRIAR USUÁRIO
router.post("/usuarios", async (req, res) => {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({
        erro: "Email e senha obrigatórios."
      });
    }

    //  evita duplicado
    const [existente] = await pool.query(
      "SELECT id FROM usuarios WHERE email = ?",
      [email]
    );

    if (existente.length > 0) {
      return res.status(409).json({
        erro: "Email já cadastrado."
      });
    }

    const senhaHash = await bcrypt.hash(senha, 10);

    await pool.query(
      "INSERT INTO usuarios (email, senha_hash) VALUES (?, ?)",
      [email, senhaHash]
    );

    return res.status(201).json({
      message: "Usuário criado com sucesso"
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      erro: "Erro no servidor"
    });
  }
});

module.exports = router;