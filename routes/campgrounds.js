const express    = require("express");
const router     = express.Router();
const Campground = require("../models/campground");
const Comment    = require("../models/comment");
const middleware = require("../middleware");


// Campgrounds index
router.get("/", (req, res) => {
    Campground.find({}, (err, allCampgrounds) => {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds: allCampgrounds, currentUser: req.user, page: "campgrounds"});
        }
    });
});

// Campgrounds create
router.post("/", middleware.isLoggedIn, (req, res) => {
    let name = req.body.name;
    let price = req.body.price;
    let image = req.body.image;
    let description = req.body.description;
    let author = {
        id: req.user._id,
        username: req.user.username
    };
    let newCampground = {name: name, price:price, image: image, description: description, author: author};

    Campground.create(newCampground, (err, newCampground) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    });
 });

 // Campgrounds new form
router.get("/new", middleware.isLoggedIn, (req, res) => {
    res.render("campgrounds/new");
});


// Campgrounds show
router.get("/:id", (req, res) => {
    Campground.findById(req.params.id).populate("comments").exec((err, foundCampground) => {
        if (err) {
            console.log(err);
        }

        else {
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

// Campground edit
router.get("/:id/edit", middleware.checkCampgroundOwnership, (req, res) => {
    Campground.findById(req.params.id, (err, foundCampground) => {
        res.render("campgrounds/edit", {campground: foundCampground});
    });  
});


// Campground update
router.put("/:id", middleware.checkCampgroundOwnership, (req, res) => {
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, updatedCampgroud) => {
        if (err) {
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

// Campground destroy
router.delete("/:id", middleware.checkCampgroundOwnership, (req, res) => {
    Campground.findByIdAndDelete(req.params.id, (err, campgroundRemoved) => {
        if (err) {
            res.redirect("/campgrounds");
        }

        Comment.deleteMany({_id: {$in: campgroundRemoved.comments}}, err => {
            if (err) {
                console.log(err);
            }

            res.redirect("/campgrounds");
        });
    });
});


module.exports = router;