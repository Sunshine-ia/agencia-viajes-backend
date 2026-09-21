const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());

const db = mysql.createConnection({
  host: 'mysql-agenciaviajes.alwaysdata.net',
  user: 'agenciaviajes',
  password: 'darongamer123',
  database: 'agenciaviajes_destinos'
});

app.get('/api/destinos', (req, res) => {
  db.query('SELECT * FROM destinos', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

app.listen(3000, () => {
  console.log('Servidor corriendo en el puerto 3000');
});