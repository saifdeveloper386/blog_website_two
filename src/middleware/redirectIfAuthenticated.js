const User = require('../models/user')

const redirectIfAuthenticated= (req, res, next) => {
    if (req.session.userId) {
        return res.redirect('/')
    }
    
    next()
}
module.exports =redirectIfAuthenticated;