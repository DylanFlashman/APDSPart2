const mongoose = require('mongoose')
const {Schema} = mongoose

const userSchema = new Schema({
    name: String,
    username: String,
    email:{
        type: String,
        unique: true
    },
    idNumber:{
        type: String,
        unique: true
    },
    accountNumber:{
        type: String,
        unique: true
    },
    password: String,
    role: {
        type: String,
        enum: ['customer', 'employee'],
        default: 'customer'
    }
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;