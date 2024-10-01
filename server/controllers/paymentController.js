const Payment = require('../models/payment')

const submitPayment = async (req, res) =>{

   // const userId = localStorage.getItem('userId');

    try {
        const { amount, currency, accountNumber, swiftCode, customerId } = req.body;

        // Check if customerId is present
    //if (!customerId) {
        // res.status(400).json({ error: 'Customer ID is required' });
    //}

        const newPayment = new Payment({

            amount,
            currency,
            accountNumber,
            swiftCode,
            customerId
        });

        await newPayment.save();
        res.json({ message: 'Payment submitted successfully', payment: newPayment });

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error' + error.message);
    }

};

const getPendingTransactions = async (req,res) =>{
    try {
        const payments = await Payment.find({ status: 'Pending' });
        res.json(payments);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};

const verifyTransactions = async (req,res) =>{
    try {
        const { paymentId } = req.body;

        let payment = await Payment.findById(paymentId);
        if (!payment) {
            return res.status(404).json({ error: 'Payment not found' });
        }

        payment.status = 'Verified';
        await payment.save();

        res.json({ message: 'Payment verified and sent to SWIFT', payment });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};

module.exports = {
    submitPayment,
    getPendingTransactions,
    verifyTransactions
};