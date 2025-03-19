// index.js
const express = require('express');
const app = express();
const PORT = 3200;

app.use(express.json()); // supaya bisa baca body JSON

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
