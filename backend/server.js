const express = require('express');
const cors = require('cors');
const pool = require('./config/db');
const loginRoutes = require('./routes/login');

const app = express();

app.use(cors());
app.use(express.json());

// ROTAS
app.use('/auth', loginRoutes);

// TESTE
app.get('/teste', (req, res) => {
  res.send('servidor ok');
});


app.get('/produtos', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM produtos');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao buscar produtos' });
  }
});


app.post('/produtos', async (req, res) => {
  try {
    const { nome, tamanho, quantidade } = req.body;

    if (!nome || !tamanho || !quantidade) {
      return res.status(400).json({ erro: 'Dados incompletos' });
    }

    const sql = `
      INSERT INTO produtos (nome, tamanho, quantidade)
      VALUES (?, ?, ?)
    `;

    const [result] = await pool.query(sql, [nome, tamanho, quantidade]);

    res.json({
      id: result.insertId,
      nome,
      tamanho,
      quantidade
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao inserir produto' });
  }
});


app.delete('/produtos/:id', async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query('DELETE FROM produtos WHERE id = ?', [id]);

    res.json({ ok: true });

  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao deletar' });
  }
});



(async () => {
  try {
    await pool.query('SELECT 1');
    console.log(' Banco conectado!');
  } catch (err) {
    console.error(' Erro ao conectar no banco:', err);
  }
})();


// SERVIDOR
app.listen(3000, '0.0.0.0', () => {
  console.log('Servidor rodando na porta 3000');
});