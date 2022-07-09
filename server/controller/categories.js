const CategoriesModel = require('../models/categories');

const createCategories = async (req, res) => {
  const create = new CategoriesModel({
    type: req.body.type,
    color: req.body.color
  });

  await create.save(function (err) {
    if (!err) return res.json(create);
    return res
      .status(400)
      .json({ message: `Error while creating categories ${err}` });
  });
};

const getAllCategories = async (req, res) => {
  const data = await CategoriesModel.find({});

  const filter = await data.map(({ type, color }) => ({ type, color }));
  return res.json(filter);
};

module.exports = {
  createCategories,
  getAllCategories
};
