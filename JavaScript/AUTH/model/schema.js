const mongoose = require("mongoose");
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const credentialsSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: [6, 'Minimum password length is 6 characters'],
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
});

// Post-save middleware
credentialsSchema.post('save', function () {
    console.log('New user created');
});

// Pre-save middleware
credentialsSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt(10);  // Specifying the salt rounds
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

const Credentials = mongoose.model("Credentials", credentialsSchema);
module.exports = Credentials;
