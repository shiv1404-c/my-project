const Listing = require("./models/listing");
const ExpressError = require("./utils/ExpressError.js");       
const { listingSchema , reviewSchema} = require("./schema.js");
const review = require("./models/review.js");
// const review = require("./models/review.js");

module.exports.isloggedin = (req , res , next) => {
    if(!req.isAuthenticated()){
        req.session.redirecrUrl = req.originalUrl;
        req.flash("error", "You must be signed in first!");
        return res.redirect("/login");
    }
    next();
}

module.exports.saveRedirectUrl = (req , res , next) => {
    if(req.session.redirecrUrl){
        res.locals.redirecrUrl = req.session.redirecrUrl;
    } 
    next();
};

module.exports.isOwner = async (req, res, next) => {
  const { id } = req.params;
  try {
    const listing = await Listing.findById(id);
    if (!listing) {
      req.flash("error", "Listing not found!");
      return res.redirect("/listings");
    }
    if (!listing.owner || !res.locals.currentUser || !listing.owner.equals(res.locals.currentUser._id)) {
      req.flash("error", "You do not have permission to do that!");
      return res.redirect(`/listings/${id}`);
    }
    next();
  } catch (err) {
    req.flash("error", "Something went wrong.");
    res.redirect(`/listings/${id}`);
  }
};


module.exports.validateListing = (req , res , next) => {
    let {error} = listingSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map(el => el.message).join(",");
        throw new ExpressError(400 , errMsg);
    }else{
        next();
    }          
}

module.exports.validateReview= (req , res , next) => {
    const {error} = reviewSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map(el => el.message).join(",");
        throw new ExpressError(400 , errMsg);
    }else{
        next();
    }          
}

module.exports.isReviewAuthor = async (req, res, next) => {
  const { id, reviewId } = req.params;
  try {
    const review = await review.findById(reviewId);
    if (!review) {
      req.flash("error", "Listing not found!");
      return res.redirect("/listings");
    }
    if (!review.author || !res.locals.currentUser || !listing.owner.equals(res.locals.currentUser._id)) {
      req.flash("error", "You did not create this review!");
      return res.redirect(`/listings/${id}`);
    }
    next();
  } catch (err) {
    req.flash("error", "Something went wrong.");
    res.redirect(`/listings/${id}`);
  }
};