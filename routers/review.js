const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");  
const ExpressError = require("../utils/ExpressError.js");       
const { validateReview, isloggedin } = require("../middleware.js");
const Listing = require("../models/listing.js");
const Reviews = require("../models/review.js"); 

const reviewController = require("../controllers/reviews.js");

//Reviews Route
//Post Route for reviews
router.post("/",isloggedin, validateReview , wrapAsync(reviewController.postReview));

//Delete Route for reviews
router.delete("/:reviewId",
    isloggedin,
     wrapAsync(reviewController.deleteReview));

module.exports = router;