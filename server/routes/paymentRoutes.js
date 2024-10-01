const express = require('express');
const router = express.Router();
const cors = require('cors')
const { submitPayment, getPendingTransactions, verifyTransactions } = require('../controllers/paymentController')

//middleware
router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:5173'
    })
)

router.post('/payment', submitPayment);
router.get('/transactions', getPendingTransactions);
router.post('/verify', verifyTransactions);

module.exports = router;