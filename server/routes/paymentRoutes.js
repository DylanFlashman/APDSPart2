const express = require('express');
const router = express.Router();
const cors = require('cors')
const { submitPayment, getPendingTransactions, verifyTransactions } = require('../controllers/paymentController');
const PaymentModel = require('../models/payment');

//middleware
// router.use(
//     cors({
//         credentials: true,
//         origin: 'http://localhost:5173'
//     })
// )

router.post('/payment', submitPayment);
router.get('/transactions', getPendingTransactions);
router.post('/verify', verifyTransactions);
router.get('/transactions/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const payment = await PaymentModel.findById(id);
  
      if (!payment) {
        return res.status(404).json({ error: 'Transaction not found' });
      }
  
      res.json(payment); 
    } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
    }
  });

// router.get('/transactions/:id', async (req, res) => {
//     try {
//       const { id } = req.params;
//       const transaction = await Payment.findById(id);
      
//       if (!transaction) {
//         return res.status(404).json({ error: 'Transaction not found' });
//       }
  
//       res.json(transaction);
//     } catch (error) {
//       console.error(error);
//       res.status(500).send('Server error');
//     }
//   });

module.exports = router;