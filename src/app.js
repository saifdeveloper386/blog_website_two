const express = require('express');
const hbs = require('hbs');
const path = require('path');
const fileUpload = require("express-fileupload");
const expressSession = require('express-session');
const connectFlash = require("connect-flash");
require("./db/connection");
const Post= require("./models/post")
const uploads= require("./middleware/upload")
const User= require("./models/user")
const auth=require("./middleware/auth")
const storePost=require("./middleware/storePost")
const redirectIfAuthenticated=require("./middleware/redirectIfAuthenticated")
const createPostController = require('./controllers/createPost')
const homePageController = require('./controllers/homePage')
const aboutPageController = require('./controllers/aboutPage')
const contactPageController = require('./controllers/contactPage')
const getPostController = require('./controllers/getPost')
const storePostController = require('./controllers/storePost')
const createUserController = require('./controllers/createUser')
const storeUserController = require('./controllers/storeUser')
const loginController = require('./controllers/login')
const loginUserController = require('./controllers/loginUser');
const logoutController = require('./controllers/logout');
const MongoStore = require('connect-mongo');

const app = express();
const port=process.env.Port || 4000;
const static_path= path.join(__dirname,"../public")
const views_path= path.join(__dirname,"../templates/views")
const partials_path= path.join(__dirname,"../templates/partials")
app.use(fileUpload());
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(static_path))
app.use('/posts/store', storePost)
app.use(connectFlash());
app.set('view engine', "hbs");
app.set('views', views_path);
hbs.registerPartials(partials_path)

// const mongoStore = connectMongo(expressSession);

app.use(expressSession({
    secret: 'secret',
    saveUninitialized: true,
    resave:true,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI||"mongodb://localhost:27017/testBlog" })
}));
// app.use(function (req, res, next) {
//     res.locals = {
//       siteTitle: "My Website's Title",
//       pageTitle: "The Home Page",
//       author: "Cory Gross",
//       description: "My app's description",
//     };
//     next();
//  });
app.use('*', (req, res, next) => {
    res.locals={
        auth:req.session.userId,
        username:req.body.username,
        email:req.body.email

    };
    next()
});
app.use((req,res,next)=>{
    if(req.isAuthenticated) res.locals.isAuthenticated = req.isAuthenticated();
    next();
  });



app.get("/", homePageController);
app.get("/post/:id", getPostController);
app.get("/posts/new", auth,createPostController);
app.get("/auth/register", createUserController);
app.get("/auth/login",redirectIfAuthenticated, loginController);
app.post("/posts/store",auth, storePost, storePostController);
app.post("/users/login", redirectIfAuthenticated ,loginUserController);
app.post("/users/register", redirectIfAuthenticated ,storeUserController);
app.get("/about",aboutPageController)
app.get("/contact",contactPageController)
app.get("/auth/logout", logoutController);






app.listen(port, () => {
    console.log(`App listening on port ${port}!`);
});