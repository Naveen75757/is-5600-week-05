const path = require('path');
const Products = require('./products');
const Orders = require('./orders');
const autoCatch = require('./lib/auto-catch');

async function handleRoot(req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));
}

async function listProducts(req, res) {
  const { offset = 0, limit = 25, tag } = req.query;
  res.json(await Products.list({ offset: Number(offset), limit: Number(limit), tag }));
}

async function getProduct(req, res, next) {
  const { id } = req.params;
  const product = await Products.get(id);
  if (!product) return next();
  res.json(product);
}

async function createProduct(req, res) {
  res.json(await Products.create(req.body));
}

async function editProduct(req, res) {
  res.json(await Products.edit(req.params.id, req.body));
}

async function deleteProduct(req, res) {
  res.json(await Products.destroy(req.params.id));
}

async function listOrders(req, res) {
  const { offset = 0, limit = 25, productId, status } = req.query;
  res.json(await Orders.list({ offset: Number(offset), limit: Number(limit), productId, status }));
}

async function getOrder(req, res, next) {
  const { id } = req.params;
  const order = await Orders.get(id);
  if (!order) return next();
  res.json(order);
}

async function createOrder(req, res) {
  res.json(await Orders.create(req.body));
}

async function editOrder(req, res) {
  res.json(await Orders.edit(req.params.id, req.body));
}

async function deleteOrder(req, res) {
  await Orders.destroy(req.params.id);
  res.status(204).send();
}

module.exports = autoCatch({
  handleRoot,
  listProducts,
  getProduct,
  createProduct,
  editProduct,
  deleteProduct,
  listOrders,
  getOrder,
  createOrder,
  editOrder,
  deleteOrder,
});
