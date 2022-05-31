const mongoose = require('mongoose');
const Schema = mongoose.Schema;  //constructor function

const blogSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    snippet:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    }

},{timestamps:true}); //yamule update hot rahil

//create model based on above schema
const Blog = mongoose.model('Blog', blogSchema); //blogs collection madhe bghel he, what type of object we want to store into the collection
module.exports = Blog;