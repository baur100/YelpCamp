var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");
var data = [
    {
        name: "Fort-Ross",
        image: "http://www.naturallyamazing.com/americasparks/633.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ut mattis tellus."
    },
    {
        name: "Catskills",
        image: "http://www.parks.ca.gov/pages/449/images/100_1396.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur quis ex in."
    },
    {
        name: "Storm King",
        image: "http://www.whattododigital.com/wp-content/uploads/2013/09/Storm-King-Collection.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur quis ex in."
    },
    {
        name: "Death Valley",
        image: "https://www.csusm.edu/rec/outdoor_adventures/images/deathvalley.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur quis ex in."
    }
];
var comment = {
    text: "So pretty place",
    author: "Marsha"
}

function seedDB(){
    Comment.remove({},function(err) {
        if(err){
            console.log(err);
        }else{
            console.log("comments cleaned");
        }
    });
    //Remove all campgrounds
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }else{
            console.log("Database was cleaned");
            //Add campgrounds
/*            data.forEach(function(seed){
                Campground.create(seed,function(err,campground){
                    if(err){
                        console.log(err);
                    }else{
                        console.log(campground.name+" added");
                        Comment.create(comment,function(err,comment){
                                            if(err){
                                                console.log(err);
                                            }else{
                                                campground.comments.push(comment);
                                                campground.save();
                                                console.log("created new comment")
                                            }
                            
                                        });
                    }
                });
            }); */
        }
    });   
    
}
module.exports = seedDB;


