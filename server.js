const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

const db = mysql.createPool({
  host: process.env.DB_HOST || 'mysql-agenciaviajes.alwaysdata.net',
  user: process.env.DB_USER || 'agenciaviajes',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || 'agenciaviajes_destinos',
  waitForConnections: true,
  connectionLimit: 5
});

function consultar(res, sql, params) {
  db.query(sql, params, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
}

app.get('/api/destinos', (req, res) => {
  consultar(res, 'SELECT * FROM destinos', []);
});

app.get('/api/destinos-populares', (req, res) => {
  consultar(res, 'SELECT * FROM destinos_populares ORDER BY id', []);
});

app.get('/api/categorias', (req, res) => {
  consultar(res, 'SELECT * FROM categorias ORDER BY id', []);
});

app.get('/api/paquetes/categoria/:id', (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) return res.status(400).json({ error: 'Categoría inválida' });
  consultar(res, 'SELECT * FROM paquetes WHERE categoria_id = ? ORDER BY id', [id]);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '::', () => {
  console.log('Servidor corriendo en el puerto ' + PORT);
});
