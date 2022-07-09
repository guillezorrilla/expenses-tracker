const transactionModel = require('../models/transactions');

const createTransaction = async (req, res) => {
  if (!req.body.name)
    return res.status(400).json({ message: 'Post HTTP Data not Provided' });
  const { name, type, amount } = req.body;

  const create = await new transactionModel({
    name,
    type,
    amount,
    date: new Date()
  });

  await create.save((err) => {
    if (!err) return res.json(create);
    return res
      .status(400)
      .json({ message: `Error while creating transaction ${err}` });
  });
};

const getAllTransactions = async (req, res) => {
  const data = await transactionModel.find({});

  const filter = await data.map(({ name, type, amount, date }) => ({
    name,
    type,
    amount,
    date
  }));
  return res.json(filter);
};

const deleteTransactionById = async (req, res) => {
  if (!req.params.id)
    return res.status(400).json({ message: 'Post HTTP Data not Provided' });
  const { id } = req.params;
  await transactionModel
    .findByIdAndDelete(id, (err) => {
      if (!err) return res.json({ message: 'Transaction Deleted' });
      return res
        .status(400)
        .json({ message: `Error while deleting transaction ${err}` });
    })
    .clone()
    .catch((err) => {
      return res.json({ message: `Error while deleting transaction ${err}` });
    });
};

const getLabels = async (req, res) => {
  transactionModel
    .aggregate([
      {
        $lookup: {
          from: 'categories',
          localField: 'type',
          foreignField: 'type',
          as: 'categories_info'
        }
      },
      {
        $unwind: '$categories_info'
      }
    ])
    .then((result) => {
      const data = result.map((item) => ({
        id: item._id,
        name: item.name,
        type: item.type,
        amount: item.amount,
        color: item.categories_info.color
      }));
      res.json(data);
    })
    .catch((err) => {
      res.status(400).json({ message: `Error while getting labels ${err}` });
    });
};

module.exports = {
  createTransaction,
  getAllTransactions,
  deleteTransactionById,
  getLabels
};
