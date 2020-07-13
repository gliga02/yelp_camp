const Campground = require("../models/campground");
const Comment   = require("../models/comment");

const middlewareObject = {};

middlewareObject.checkCampgroundOwnership = (req, res, next) => {
        if (req.isAuthenticated()) {
            Campground.findById(req.params.id, (err, foundCampground) => {
                if (err) {
                    req.flash("error", "Campground not found.");
                    res.redirect("back");
                }
        
                else {
                    if (!foundCampground) {
                        req.flash("error", "Campground not found.");
                        res.redirect("back");
                    }


                    if (foundCampground.author.id.equals(req.user._id) || req.user.isAdmin) {
                        next();
                    } 
                    
                    else {
                        req.flash("error", "You don't have premission to do that.");
                        res.redirect("back");
                    }              
                }
           }); 
        } 
        
        else {
            req.flash("error", "You need to be logged in to do that.");
            res.redirect("back");
        }
};

middlewareObject.checkCommentsOwnership = (req, res, next) => {
        if (req.isAuthenticated()) {
            Comment.findById(req.params.comment_id, (err, foundComment) => {
                if (err) {
                    res.redirect("back");
                }
        
                else {
                    if (!foundComment) {
                        req.flash("error", "Comment not found.");
                        res.redirect("back");
                    }

                    if (foundComment.author.id.equals(req.user._id) || req.user.isAdmin) {
                        next();
                    } 
                    
                    else {
                        req.flash("error", "You don't have premission to do that.");
                        res.redirect("back");
                    }              
                }
           }); 
        } 
        
        else {
            req.flash("error", "You need to be logged in to do that.");
            res.redirect("back");
        } 
};

middlewareObject.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }

    req.flash("error", "You need to be logged in to do that.");
    res.redirect("/login");
}

module.exports = middlewareObject;