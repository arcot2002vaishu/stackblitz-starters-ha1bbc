let express = require('express');
let cors = require('cors');
let app = express();
let port = 3000;

app.use(cors());

let cart = [
  { productId: 1, name: 'Laptop', price: 50000, quantity: 1 },
  { productId: 2, name: 'Mobile', price: 20000, quantity: 2 }
];


function addItemToCart(cart, productId, name, price, quantity) {
  cart.push({
    productId: parseInt(productId),
    name: name,
    price: parseFloat(price),
    quantity: parseInt(quantity)
  });
}

app.get('/cart/add', (req, res) => {
  let { productId, name, price, quantity } = req.query;
  addItemToCart(cart, productId, name, price, quantity);
  res.json({ message: cart });
});


function updateItemQuantity(cart, productId, quantity) {
  for (let item of cart) {
    if (item.productId === productId) {
      item.quantity = quantity;
      return item; 
    }
  }
  return null; 
}


app.get('/cart/edit', (req, res) => {
  const productId = parseInt(req.query.productId);
  const quantity = parseInt(req.query.quantity);
  const updatedItem = updateItemQuantity(cart, productId, quantity);
  res.json(cart);
});



function deleteItemFromCart(cart, productId) {
  const initialLength = cart.length;
  cart = cart.filter(item => item.productId !== productId);
  return cart.length < initialLength; 
}

app.get('/cart/delete', (req, res) => {
  const productId = parseInt(req.query.productId);
  const itemDeleted = deleteItemFromCart(cart, productId);
  res.json(cart);
});


function getCartItems(cart) {
  return cart;
}

app.get('/cart', (req, res) => {
  const cartItems = getCartItems(cart);
  res.json({ cart: cartItems });
});


function calculateTotalQuantity(cart) {
  return cart.reduce((total, item) => total + item.quantity, 0);
}

app.get('/cart/total-quantity', (req, res) => {
  const totalQuantity = calculateTotalQuantity(cart);
  res.json({ totalQuantity });
});

function calculateTotalPrice(cart) {
  return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

app.get('/cart/total-price', (req, res) => {
  const totalPrice = calculateTotalPrice(cart);
  res.json({ totalPrice });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});


