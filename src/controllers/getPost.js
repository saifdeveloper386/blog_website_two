const Post = require('../models/post')
let image;
const getPost= async (req, res) => {
    const post = await Post.findById(req.params.id);
    res.render("post", {
        post
      
    });
    console.log(post);
    console.log(image);
}
module.exports =getPost;