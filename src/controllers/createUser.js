const createUser= (req, res) => {
    res.render('register',{
        errors: req.flash('registrationErrors')
    })
}
module.exports=createUser