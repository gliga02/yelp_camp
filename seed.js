const mongoose   = require("mongoose");
const Campground = require("./models/campground");
const Comment    = require("./models/comment");
const data = [
    {
        name: "Cloud's Rest", 
        image:"https://farm4.staticflickr.com/3211/3062207412_03acc28b80.jpg",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },

    {
        name: "Desert Mesa", 
        image:"https://farm3.staticflickr.com/2924/14465824873_026aa469d7.jpg",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },

    {
        name: "Canyon Floor", 
        image:"https://farm4.staticflickr.com/3021/2386124661_843479d1c8.jpg",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    }
];

function seedDb() {
    Campground.remove({}, err => {
        if (err) {
            console.log(err);
        }
    
        console.log("Campgrounds removed");
        data.forEach(seed => {
            Campground.create(seed, (err, campground) => {
                if (err) {
                    console.log(err);
                }
    
                else {
                    console.log("Campground added");
                    Comment.create(
                        {
                            text: "This place is great, but i wish there was internet",
                            author: "Homer"
                        }, (err, comment) => {
                            if (err) {
                                console.log(err);
                            }

                            else {
                                campground.comments.push(comment);
                                campground.save();
                                console.log("Created new comment");
                            }
                        }
                    )
                }
            });
        });
     });
}

module.exports = seedDb;


