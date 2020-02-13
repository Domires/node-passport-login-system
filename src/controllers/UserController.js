const bcrypt = require('bcrypt')
const User = require('./../models/User')
const passport = require('passport')

exports.login = passport.authenticate('local', {
    failureRedirect: '/login',
    successRedirect: '/dashboard',
    failureFlash: true
})

exports.register = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        await User.create({ ...req.body, password: hashedPassword })
        res.redirect('login')
    } catch (err) {
        console.log('register error', err)
        res.redirect('register')
    }
}

exports.logout = (req, res) => {
    req.logout()
    res.redirect('/')
}