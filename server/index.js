const express = require('express');
const dotenv = require('dotenv').config()
const cors = require('cors')
const {mongoose} = require('mongoose')
const https = require('https');
const fs = require('fs');
const app = express();
const cookieParser = require('cookie-parser')


mongoose.connect(process.env.Mongo_URL)
.then(() => console.log('database connected'))
.catch((err) => console.log('database not connected', err))

const sslOptions = {
    key: fs.readFileSync('./keys/privatekey.pem'),
    cert: fs.readFileSync('./keys/certificate.pem'),
  };

// middleware
const corsOptions = {
    credentials: true,
    origin: 'https://localhost:5173', // Your client URL
};

app.use((req, res, next) => {
    if (req.secure) {
      next(); // request was via https, so continue
    } else {
      res.redirect(`https://${req.headers.host}${req.url}`); // redirect to https
    }
  });

app.use(cors(corsOptions));

app.use(express.json())
app.use(cookieParser());
app.use(express.urlencoded({extended: false}))

app.use('/', require('./routes/authRoutes'))
app.use('/api/payments', require('./routes/paymentRoutes'))

const port = 8000;
// app.listen(port, () => console.log('this app is running on port ' + port))
https.createServer(sslOptions, app).listen(8000, () => {
    console.log('HTTPS Server running on port 8000');
  });