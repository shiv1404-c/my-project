const Listing = require("../models/listing.js");
const Reviews = require("../models/review.js");

module.exports.postReview = async(req , res)=>{
    // console.log(req.params.id);
    let listing = await Listing.findById(req.params.id);
    let newReview = new Reviews(req.body.review);
    newReview.author = req.user._id;
    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();
    req.flash("success", "New Reveiew created!");
    res.redirect(`/listings/${listing._id}`);
};

module.exports.deleteReview = async(req , res)=>{
    let {id , reviewId} = req.params;
    await Listing.findByIdAndUpdate(id , {$pull: {reviews: reviewId}});
    await Reviews.findByIdAndDelete(reviewId);
    req.flash("success", "New Reveiew Deleted!");
    res.redirect(`/listings/${id}`);
};