const express = require("express");
const router = express.Router({ mergeParams: true });
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { listingSchema } = require("../schema.js");
const { isloggedin, isOwner, validateListing } = require("../middleware.js");
const listingsController = require("../controllers/listings.js");
const multer = require("multer");
// const { storage } = require('../cloudConfig.js');
// const upload = multer({ storage });
const { cloudinary, upload } = require('../cloudConfig.js');


router.route("/")
    .get(wrapAsync(listingsController.index))
    // .post(isloggedin, upload.single('listing[image]'), wrapAsync(listingsController.createListing))
    .post(isloggedin, upload.single('listing[image]'),wrapAsync(listingsController.createListing) , async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload_stream(
      { folder: 'wanderlust_DEV' },
      (error, result) => {
        if (error) return res.status(500).send(error);
        res.json(result);
      }
    ).end(req.file.buffer);
  } catch (err) {
    res.status(500).send(err);
  }
});


//New Route
router.get("/new", isloggedin, listingsController.renderNewForm);

router.route("/:id")
    .get(wrapAsync(listingsController.showListing))
    .put(isloggedin, isOwner, upload.single('listing[image]), validateListing, wrapAsync(listingsController.updateListing'))
    .delete(isloggedin, isOwner, wrapAsync(listingsController.deleteListing));

//Edit Route
router.get("/:id/edit", isloggedin, isOwner, wrapAsync(listingsController.renderEditForm));

module.exports = router;