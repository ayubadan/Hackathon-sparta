var User = require('../model/user');


// NEW ( Login )
function newSession(req,res) {

  res.render('sessions/new' , {title:"Login"});

}

// CREATE - Handles logins
function createSession(req,res){

  // look up the user with the details from the form
  User.findOne({email: req.body.email} , function(err, user){

      // did we find a user and does the password match
      if(user && user.password == req.body.password) {

        // save the user to the session ( log them in )
        req.session.user = user.id;

        res.redirect("/");

      } else {

        if(err) req.flash('error' , err.message);

        req.flash('error' , "Email or password was incorrect");

        res.redirect("/sessions/new");
      } 
  });
}

// DELETE - handle logouts
function deleteSession(req,res) {

    delete req.session.user;

    res.redirect("/sessions/new");
}

module.exports = {
  new: newSession,
  create: createSession,
  delete: deleteSession
}