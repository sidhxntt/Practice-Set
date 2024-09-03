const mongoose = require('mongoose')
const moment = require('moment')

const User_Schema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    contact_number: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default:  moment().format('LLL')
    },
})

//model being basically a class that will store its instances as documents/objects
const Users = mongoose.model('Users',User_Schema);
module.exports = Users;
