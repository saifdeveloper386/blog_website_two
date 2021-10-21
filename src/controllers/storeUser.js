const User = require('../models/user')

const storeUser= (req, res) => {
    User.create(req.body, (error, user) => {
        if (error) {
            const registrationErrors = Object.keys(error.errors).map(key => error.errors[key].message)

            req.flash('registrationErrors', registrationErrors)
            return res.redirect('/auth/register')
        }
        res.redirect('/auth/login')
    })
}
module.exports =storeUser;