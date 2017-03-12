var Post = require('../model/post');

function indexSparta(req, res) {
    Post.find({} , function(err, posts) {
        if(err) return res.status(500).send(err);
        res.render("post/index" , {
            title: "Posts",
           	post: posts
        });
    });
}

function showSparta(req, res) {
    Post.findById(req.params.id , function(err, post) {
        if(!post) return res.status(404).send("Sorry Post not found!");
        if(err) return res.status(500).send(err);
        res.render("post/show" , {
              title: "Post",
            post: post
        });
    });
}

function newSparta(req, res) {
    var newPost = {
    	title: "",
        post: ""
    }
    res.render("post/new" , {
        title: "New Post",
        post: newPost
    });
}

function createSparta(req, res) {
    Post.create(req.body, function(err, post) {
        User.findByIdAndUpdate(req.user.id, { $addToSet: { posts: post } }, function(err, user) {
            if(err) req.flash('error' , "Sorry, something went wrong with posting your post please try again!");
            res.redirect("/");
        })
        res.redirect("/");
    });
}
   
function editSparta(req, res) {
    Post.findById(req.params.id , function(err, post) {
        if(!post) return res.status(404).send("Sorry Post not found!");
        if(err) return res.status(500).send(err);
        res.render("posts/edit" , {
              title: "Post",
            post: post
        });
    });
}

function updateSparta(req, res) {
    Post.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { runValidators: true },
        function(err, post) {
            if(err) return res.status(500).send(err);
            res.redirect("/");
        }
    );
}

function deleteSparta(req, res) {
    Post.findByIdAndRemove(req.params.id , function(err) {
        res.redirect("/")
    });
}

module.exports = {
    index: indexSparta,
    show: showSparta,
    new: newSparta,
    create: createSparta,
    edit: editSparta,
    update: updateSparta,
    delete: deleteSparta
}