const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    blog_title : String,
    author : String,
    creation_date : Date ,
    content : String ,
    imgurl:String
})

blogSchema.pre('save',function(next){
    this.creation_date = new Date();
    next();
})

module.exports = mongoose.model('blog',blogSchema);