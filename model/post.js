var mongoose = require('mongoose');

var PostSchema = mongoose.Schema({
    title: String,
    post: String
});
 
module.exports = mongoose.model('Post', PostSchema);
