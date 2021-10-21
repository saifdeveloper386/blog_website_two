const multer =require("multer")
const path = require('path')
const fs = require('fs');
const Post = require('../models/post')
const Upload=require("../models/upload")

const storePost=( (req, res) => {
    try {
if(!req.files || Object.keys(req.files).length===0){
    return res.send("file is not uploaded");
}
const storage = multer.diskStorage({
    destination:"public/img",
    //  function (req, file, cb) {
    //   cb(null, 'public/img/')
    // },
    filename: function (req, file, cb) {
    //   const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname+"_"+Date.now()+path.extname(file.originalname))
    }
  })
  
  const uploads = multer({ storage: storage }).single("image")
// const image=req.files.;
// const imageDetails=new Upload({
// image:image
// });
// imageDetails.save((err,data)=>{
// })
// const imagePath=`public/posts/${image.name}`;
// image.mv(imagePath,(error)=>{
    //     if(error) res.send(error)
    //     Post.create({
        //         ...req.body,
        //         image:image
        //     }, (error, post) => {
            //                 res.redirect('/');
            //             });
            
            //     console.log(Post.image)
            // })
            const {
                image
            } = req.files
            
            const imagePath=`public/posts/${image.name}`+Date.now();
        image.mv(path.resolve(__dirname,'public/posts', image.name), (error) => {
            Post.create({
                ...req.body,
                image: `/public/posts/${image.name}`
            }, (error, post) => {
                res.redirect('/');
            });
        })
    } catch (error) {
        res.send("post didn't save "+error);
    }
  
})
module.exports =storePost;