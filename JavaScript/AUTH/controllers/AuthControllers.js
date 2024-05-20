const Credentials = require('../model/schema.js')
const handleErrors = require('./Validation.js')

module.exports.signup_get =(req,res)=>{
    res.render('signup')
}
module.exports.signup_post = async (req, res) => {
    const { email, password } = req.body; // Assuming you meant to use `username` instead of `email`
    try {
        const user = await Credentials.create({ email, password });
        res.status(201).send("User Creation successful");
    } catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
};
module.exports.login_get =(req,res)=>{
    res.render('Login')
}
module.exports.login_post =(req,res)=>{
    res.send('new login')
}

