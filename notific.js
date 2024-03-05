const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/ecommerce', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Failed to connect to MongoDB', err));

// Define a model for product
const Product = mongoose.model('Product', new mongoose.Schema({
  name: String,
  price: Number
}));

// API endpoint to add a new product
app.post('/api/products', async (req, res) => {
  const product = new Product({
    name: req.body.name,
    price: req.body.price
  });
  await product.save();
  res.send(product);

  // Notify clients about the new product
  io.emit('newProduct', product);
});

const port = process.env.PORT || 3000;
const server = app.listen(port, () => console.log(`Listening on port ${port}...`));

// Websocket setup
const io = require('socket.io')(server);
