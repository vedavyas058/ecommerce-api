const os = require('os');
const http = require('http');

const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

const productRoutes = require('./routes/products');
app.use('/products', productRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log('🖥️ System Info:');
  console.log(`Platform: ${os.platform()}`);
  console.log(`CPU Cores: ${os.cpus().length}`);
});
