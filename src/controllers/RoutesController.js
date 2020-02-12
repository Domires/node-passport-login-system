exports.renderHome = (req, res) => {
    res.render('home')
}
exports.renderLogin = (req, res) => {
    res.render('login')
}
exports.renderRegister = (req, res) => {
    res.render('register')
}
exports.renderDashboard = (req, res) => {
    const { username } = req.user
    res.render('dashboard', { username })
}