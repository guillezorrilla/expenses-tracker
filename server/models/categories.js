const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categoriesModel = new Schema({
  type: {
    type: String,
    default: 'Investment'
  },
  color: {
    type: String,
    default: '#FCBE44'
  }
});

const Categories = mongoose.model('categories', categoriesModel);

module.exports = Categories;
