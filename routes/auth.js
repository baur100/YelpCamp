var express = require("express");
var router = express.Router();
var passport = require("passport");
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var User = require("../models/user");

//******************************************************************************
//Landing Page
router.get("/",function(req,res){
    res.render("landing");
});

//******************************************************************************
//register route
router.get("/register",function(req,res){
    res.render("auth/register");
});
router.post("/register",function(req,res){
    var newUser = new User({username: req.body.username});
    var password = req.body.password;
    User.register(newUser,password,function(err,user){
        if(err){

            req.flash("error",err.message);
            return res.redirect("/register");
        }
        passport.authenticate("local")(req,res,function(){
            req.flash("success","Welcome to YelpCamp, "+user.username);
            res.redirect("/campgrounds");
        });
    });
});
//******************************************************************************
//login route
router.get("/login",function(req,res){
    res.render("auth/login");
});

router.post("/login", passport.authenticate("local",
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }), function(req,res){
        
});
//******************************************************************************
//logout
router.get("/logout",function(req,res){
    req.logout();
    req.flash("success","Logged you out!");
    res.redirect("/campgrounds");
});
function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;