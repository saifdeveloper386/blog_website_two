const Post = require('../models/post')

const homepage= async (req, res) => {
    const posts = await Post.find({});
    
    res.render("index", {
        posts
    });
}
module.exports =homepage;