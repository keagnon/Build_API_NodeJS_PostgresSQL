const express = require('express');
const { Pool } = require('pg');
const app = express();
const port = process.env.PORT || 3000;

// Se connecter à la base de données
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: '---',
  password: '-----',
  port: 5432,
});

app.get('/top10', async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM ----- ORDER BY _id DSC LIMIT 10;');
  res.send(rows);
});

app.get('/allnonces', async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM ----;');
  res.send(rows);
});


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
