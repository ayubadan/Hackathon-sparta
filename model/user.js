var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({

 email : {type: String, required:true},
 password : {type: String, required:true},
 posts : [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }]

});

module.exports = mongoose.model('User' , UserSchema);