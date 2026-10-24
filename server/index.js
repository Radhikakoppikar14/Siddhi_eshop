const express = require('express');
const cors = require('cors');
const { PRODUCTS_DATA } = require('./data');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get('/api/products', (req, res) => {
  res.json(PRODUCTS_DATA);
});

app.get('/api/products.json', (req, res) => {
  res.json(PRODUCTS_DATA);
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});