const express = require('express');
const dotenv = require('dotenv').config()
const cors = require('cors')
const {mongoose} = require('mongoose')
const https = require('https');
const fs = require('fs');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit')
const app = express();
const cookieParser = require('cookie-parser');


// middleware
//db
mongoose.connect(process.env.Mongo_URL)
.then(() => console.log('database connected'))
.catch((err) => console.log('database not connected', err))

//ssl
const sslOptions = {
    key: fs.readFileSync('./keys/privatekey.pem'),
    cert: fs.readFileSync('./keys/certificate.pem'),
  };

  //cors
const corsOptions = {
    credentials: true,
    origin: 'https://localhost:5173', 
};

//ddos attack protection
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 100, 
    message: 'Too many requests, please try again later.'
  });

  //https protection
app.use((req, res, next) => {
    if (req.secure) {
      next(); 
    } else {
      res.redirect(`https://${req.headers.host}${req.url}`); 
    }
  });

app.use(cors(corsOptions));
//set security headers
app.use(helmet({
    frameguard: {
      action: 'deny', 
    }
  }));
app.use('/api/', limiter);
app.use(express.json())
app.use(cookieParser());
app.use(express.urlencoded({extended: false}))

//routes
app.use('/', require('./routes/authRoutes'))
app.use('/api/payments', require('./routes/paymentRoutes'))

const port = 8000;
// app.listen(port, () => console.log('this app is running on port ' + port))
https.createServer(sslOptions, app).listen(8000, () => {
    console.log('HTTPS Server running on port 8000');
  });