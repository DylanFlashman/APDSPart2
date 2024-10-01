const express = require('express');
const dotenv = require('dotenv').config()
const cors = require('cors')
const {mongoose} = require('mongoose')
const app = express();
const cookieParser = require('cookie-parser')

mongoose.connect(process.env.Mongo_URL)
.then(() => console.log('database connected'))
.catch((err) => console.log('database not connected', err))

// middleware
//app.use(cors({ origin: ' http://localhost:5173/' })); 
app.use(express.json())
//app.use(cors())
app.use(cookieParser());
app.use(express.urlencoded({extended: false}))

app.use('/', require('./routes/authRoutes'))
app.use('/api/payments', require('./routes/paymentRoutes'))

const port = 8000;
app.listen(port, () => console.log('this app is running on port ' + port))