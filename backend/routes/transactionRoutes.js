const express = require('express');
const Transaction = require('../modules/transactionModel');

const router = express.Router();

router.get('/transactions', async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.send(transactions);
  } catch (error) {
    res.status(500).send({ error: 'Error fetching transactions.' });
  }
});

router.post('/transactions', async (req, res) => {
  const { category, amount, type } = req.body;

  if (!category || isNaN(amount) || amount <= 0 || !['income', 'expense'].includes(type)) {
    return res.status(400).send({ error: 'Invalid input data.' });
  }

  try {
    const newTransaction = new Transaction({ category, amount, type });
    await newTransaction.save();
    res.send(newTransaction);
  } catch (error) {
    res.status(500).send({ error: 'Error adding transaction.', error });
  }
});

router.delete('/transactions/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Transaction.findByIdAndDelete(id);
    res.send({ message: 'Transaction deleted' });
  } catch (error) {
    res.status(500).send({ error: 'Error deleting transaction.' });
  }
});

module.exports = router;
