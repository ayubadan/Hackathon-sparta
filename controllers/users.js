var User = require('../model/user');

// NEW ( Registration )
function newUser(req,res) {

 res.render('users/new' , {title:"Register"});

}

// CREATE - Handles registrations
function createUser(req,res){
 var user = new User(req.body);
 user.save(function(err,user){
   if(err) req.flash('error' , err.message);
   res.redirect("/sessions/new");
 });
}

module.exports = {
 new: newUser,
 create: createUser
}