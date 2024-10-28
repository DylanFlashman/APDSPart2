const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')
const cors = require('cors')
const { submitPayment, getPendingTransactions, verifyTransactions } = require('../controllers/paymentController');
const PaymentModel = require('../models/payment');


const checkAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (token) {
      jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
          if (err) return res.status(401).json({ error: 'Unauthorized' });
          if (user.role !== 'employee') return res.status(403).json({ error: 'Forbidden' });
          req.user = user;
       next();
    });
 } else {
     res.status(401).json({ error: 'No token provided' });
 }
};

router.post('/payment', submitPayment);
router.get('/transactions', getPendingTransactions);
router.post('/verify',checkAdmin, verifyTransactions);
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