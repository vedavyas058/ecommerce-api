const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const productsFile = path.join(__dirname, '../data/products.json');

const getProducts = () => {
  const data = fs.readFileSync(productsFile, 'utf8');
  return JSON.parse(data);
};

const saveProducts = (products) => {
  fs.writeFileSync(productsFile, JSON.stringify(products, null, 2));
};

router.get('/', (req, res) => {
  const products = getProducts();
  res.json(products);
});

router.post('/', (req, res) => {
  const products = getProducts();
  const newProduct = req.body;

  if (!newProduct.name || !newProduct.price) {
    return res.status(400).json({ error: 'Product name and price required' });
  }

  newProduct.id = products.length + 1;
  products.push(newProduct);
  saveProducts(products);

  res.status(201).json({ message: 'Product added successfully', product: newProduct });
});

module.exports = router;
