var express = require("express"),
    router = express.Router(),
    Blog = require("../models/blog");

// INDEX ROUTE (app.use set for "/blogs")
router.get("/", function(req, res){
	Blog.find({}, function(err, blogs){
		if(err){
			console.log(err);
		} else{
			res.render("index", {blogs: blogs});
		}
	});
});

// NEW ROUTE
router.get("/new", function(req, res){
	res.render("new");
});

// CREATE ROUTE
router.post("/", function(req, res){
	//sanitize incoming form information
	req.body.blog.body = req.sanitize(req.body.blog.body);
	//create blog
	Blog.create(req.body.blog, function(err, newBlog){
		if(err){
			res.render("new");
		} else {
			//redirect to the index
			res.redirect("/");
		}
	});
});

// SHOW ROUTE
router.get("/:id", function(req, res){
	Blog.findById(req.params.id, function(err, foundBlog){
		if(err){
			res.redirect("/");
		} else{
			res.render("show", {blog: foundBlog});
		}
	})
});

// EDIT ROUTE
router.get("/:id/edit", function(req, res){
	Blog.findById(req.params.id, function(err, foundBlog){
		if(err){
			res.redirect("/");
		} else{
			res.render("edit", {blog: foundBlog});
		}
	});
});

//UPDATE ROUTE
router.put("/:id", function(req, res){
	req.body.blog.body = req.sanitize(req.body.blog.body);
	Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
		if(err){
			res.redirect("/");
		} else{
			res.redirect("/" + req.params.id);
		}
	});
});

//DELETE ROUTE
router.delete("/:id", function(req, res){
	//destroy blog
	Blog.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.redirect("/");
		} else{
			//redirect
			res.redirect("/");
		}
	});
});