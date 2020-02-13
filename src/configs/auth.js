const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

const User = require('./../models/User')

async function authenticateUser(username, password, done) {
    const user = await User.findOne({ username })
    if (!user) return done(null, false, { message: 'Incorrect username.' })
    const bool = await bcrypt.compare(password, user.password)
    if (!bool) return done(null, false, { message: 'Incorrect password.' })
    return done(null, user)
}

passport.use(new LocalStrategy(authenticateUser))

passport.serializeUser((user, done) => done(null, user.id))

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user))
})
