const express = require('express');
const cors = require('cors');
const db = require('./config/db');

const app = express();
app.use(cors());
app.use(express.json());

/* 🔹 GET - listar produtos */
app.get('/produtos', (req, res) => {
  db.query('SELECT * FROM produtos', (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ erro: 'Erro ao buscar produtos' });
    }
    res.json(result);
  });
});

/* 🔹 POST - adicionar produto */
app.post('/produtos', (req, res) => {
  const { nome, tamanho, quantidade } = req.body;

  if (!nome || !tamanho || !quantidade) {
    return res.status(400).json({ erro: 'Dados incompletos' });
  }

  const sql = `
    INSERT INTO produtos (nome, tamanho, quantidade)
    VALUES (?, ?, ?)
  `;

  db.query(sql, [nome, tamanho, quantidade], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ erro: 'Erro ao inserir produto' });
    }

    res.json({
      id: result.insertId,
      nome,
      tamanho,
      quantidade
    });
  });
});

/* 🔹 DELETE - remover produto */
app.delete('/produtos/:id', (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM produtos WHERE id = ?', [id], (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ erro: 'Erro ao deletar' });
    }

    res.json({ ok: true });
  });
});

/* 🚀 Servidor */
app.listen(3000, '0.0.0.0', () => {
  console.log('Servidor rodando na porta 3000');
});