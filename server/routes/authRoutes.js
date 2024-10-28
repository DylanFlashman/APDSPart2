const express = require('express');
const router = express.Router();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const {test, registerUser, loginUser, getProfile, registerEmployee} = require('../controllers/authController')

 //admin middleware
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

router.get('/',test)
router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/profile', getProfile)

// New route for creating employees
router.post('/employees/create', checkAdmin, registerEmployee);




//export
module.exports = router