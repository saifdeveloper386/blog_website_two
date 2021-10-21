const User = require('../models/user')

const auth = (req, res, next) => {
    User.findById(req.session.userId, (error, user) => {
        if (error || !user) {
            return res.redirect('/')
        }
        
        next()
    })
}
module.exports=auth;