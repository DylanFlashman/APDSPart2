const User = require('../models/user')
const {hashPassword, comparePassword} = require('../helpers/auth')
const jwt = require('jsonwebtoken');

const test = (req,res) =>{
    res.json('test is working')
}

//RegEx patterns
const namePattern = /^[a-zA-Z\s]+$/;
const usernamePattern = /^[a-zA-Z0-9_]+$/;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const idPattern = /^\d{13}$/;
const accountPattern = /^\d+$/;
const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

//Register Users
const registerUser = async (req,res) =>{
    try {
        const {name, username, email, idNumber, accountNumber, password} = req.body;
        //check if name was entered
        if(!namePattern.test(name)){
            return res.json({
                error: 'Full name can only contain letters and spaces.'
            })
        };
        //check username
        if(!usernamePattern.test(username)){
            return res.json({
                error: 'Username can only contain letters, numbers, and underscores.'
            })
        }
        //check email
        if(!emailPattern.test(email)){
            return res.json({
                error: 'Please enter a valid email address.'
            })
        }
        //check ID number
        if(!idPattern.test(idNumber)){
            return res.json({
                error: 'ID number must be 13 digits.'
            })
        }
        //check account number
        if(!accountPattern.test(accountNumber)){
            return res.json({
                error: 'Account number must contain only digits.'
            })
        }
        //check if password is good
        if(!passwordPattern.test(password)){
            return res.json({
                error: 'Password must be at least 8 characters long and contain at least one letter and one number.'
            })
        };
        //check email
        const exist = await User.findOne({email});
        if(exist){
            return res.json({
                error: 'Email is already in use'
            })
        }
        //check account number
        const accountExist = await User.findOne({accountNumber})
        if(accountExist){
            return res.json({
                error: 'Account Number already exists'
            })
        }
        //check id number
        const idExist = await User.findOne({idNumber})
        if(idExist){
            return res.json({
                error: 'ID Number already exists'
            })
        }
        //check username
        const usernameExist = await User.findOne({username})
        if(usernameExist){
            return res.json({
                error: 'Username already in use'
            })
        }

        const hashedPassword = await hashPassword(password)

        const user = await User.create({
            name,username, email,idNumber,accountNumber, password: hashedPassword
        });

        return res.json(user)

    } catch (error) {
        console.log(error)
    }
};

//Login Users Endpoint
const loginUser = async (req, res) => {
    try{
        const {username,accountNumber, password} = req.body;

    //check if user exist
    const user = await User.findOne({username});
    if(!user){
        return res.json({
            error: 'User not found'
        })
    }

    //check account number
    const accountNum = await User.findOne({accountNumber});
    if(!accountNum){
        return res.json({
            error: 'Account Number does not exist'
        })
    }
    //check passwords match
    const match = await comparePassword(password, user.password);
    if(match){
        jwt.sign({email: user.email, id: user._id, name: user.name}, process.env.JWT_SECRET, {}, (err, token) =>{
            if(err) throw err;
            res.cookie('token', token).json({ id: user._id, token })
        })
    }
    if(!match){
        return res.json({
            error:'Password does not match'})
    }

    }catch(error){
        console.log('error')
    }
    
    
}

const getProfile = (req, res) =>{
  /*  const {token} = req.cookies
    if(token){
        jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
            if(err) throw err;
            res.json(user)
        })
    }else{
        res.json(null)
    } */

    const token = req.headers.authorization?.split(' ')[1]; 
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
      if (err) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
      res.json(user); 
    });
  } else {
    res.status(401).json({ error: 'No token provided' });
  }

};

module.exports = {
    test,
    registerUser,
    loginUser,
    getProfile
}