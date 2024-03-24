const router = require("express").Router();
const {performTransaction, fetchTransactions, deleteTransaction} = require('../controllers/transactionController')

router.get('/all',fetchTransactions)
router.post('/transactions',performTransaction)
router.delete('/remove', deleteTransaction)

module.exports = router