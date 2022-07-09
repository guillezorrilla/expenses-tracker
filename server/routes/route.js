const routes = require('express').Router();
const categoriesControler = require('../controller/categories');
const transactionsControler = require('../controller/transactions');

routes
  .route('/api/categories')
  .post(categoriesControler.createCategories)
  .get(categoriesControler.getAllCategories);

routes
  .route('/api/transactions')
  .post(transactionsControler.createTransaction)
  .get(transactionsControler.getAllTransactions);

routes
  .route('/api/transactions/:id')
  .delete(transactionsControler.deleteTransactionById);

routes.route('/api/labels').get(transactionsControler.getLabels);

module.exports = routes;
