var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");

//******************************************************************************
//INDEX - Show All campgrounds
router.get("/",function(req,res){
    Campground.find({},function(err,allCampgrounds){
        if(err){
            console.log(err);
        }else{
            res.render("campgrounds/index",{campgrounds:allCampgrounds});
        }
    });
});
//******************************************************************************
//CREATE - Adding new campground
router.post("/",middleware.isLoggedIn,function(req,res){
    var name=req.body.name;
    var image=req.body.image;
    var description=req.body.description;
    var price=req.body.price;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newCampground={name:name, image:image, description:description, price:price, author:author};
    Campground.create(newCampground,function(err,addedCampground){
        if(err){
            console.log(err);
        }else{
            console.log("new campground added");
            console.log(addedCampground.name);
            res.redirect("/campgrounds");
        }
    });
});
//******************************************************************************
//NEW - Displays form to add campground
router.get("/new",middleware.isLoggedIn,function(req, res) {
    res.render("campgrounds/new");
});
//******************************************************************************
//SHOW - Show Info about one campground
router.get("/:id",function(req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
        if(err){
            req.flash("error","Can't find campground");
            res.redirect("/campgrounds");
        }else{
            res.render("campgrounds/show",{campground:foundCampground});
        }
    });
});

//******************************************************************************
//EDIT - Edit form about one campground
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findById(req.params.id,function(err,campground){
        res.render("campgrounds/edit",{campground:campground});
    });
});
//******************************************************************************
//UPDATE - Update Info about one campground

router.put("/:id",middleware.checkCampgroundOwnership,function(req,res){
   Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,updatedCampground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        }else{
            res.redirect("/campgrounds/"+updatedCampground._id);
        }
    }); 
});
//******************************************************************************
//DESTROY - Destroy Info about one campground
router.delete("/:id",middleware.checkCampgroundOwnership, function(req,res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("back");
        }else{
            req.flash("success","Campground deleted");
            res.redirect("/campgrounds");
        }
    });
});

module.exports = router;