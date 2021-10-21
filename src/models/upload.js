const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/testBlog");
var conn=mongoose.Collection
const uploadSchema = new mongoose.Schema({
   
    image: String,
   
});

const upload = mongoose.model('upload_image', uploadSchema);

module.exports = upload;