var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var router = require('./config/routes');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var mongoose = require('mongoose');
var ejs = require('ejs');
var layouts = require('express-ejs-layouts');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var flash = require('connect-flash');
var User = require('./model/user');
var path = require('path');



mongoose.connect('mongodb://localhost/spartanPosts', function() {
  console.log('database connected.')
})

app.use(cookieParser());

app.use(session({
 resave: false,
 saveUninitialized: true,
 secret: 'spartasupersecretkey'
}));

app.use(flash());

app.use(function(req, res, next){
   res.locals.errors = req.flash('error');
   // console.log(res.locals.errors);
   next();
});

app.set('view engine', 'ejs');
// use public folder to insert external files into the website page
app.use(express.static(path.join(__dirname, 'public')))

app.use(bodyParser.urlencoded({ extended: false }));

// method override
app.use(methodOverride(function(req, res){
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method
    delete req.body._method
    return method
  }
}));

app.use(layouts);

// load logged in user
app.use(function(req,res,next) {

  // no user id? just move on
  if(!req.session.user) {
     res.locals.user = false;
    next();
  } else {

    // load the user with the ID in the session
    User.findById(req.session.user , function(err, user){
      
      if(user) {
        // add the user to the request object
        req.user = user;
        // add it to locals so we can use it in all templates
        res.locals.user = user;
      } else {
        // couldn't find it... that's weird. clear the session
        req.session.user = null;
      }

      next(err);
    });
  }
});

app.use(router);

app.listen(port, function() {
    console.log("The server is on and listening on port " + port);
});
     
module.exports = app