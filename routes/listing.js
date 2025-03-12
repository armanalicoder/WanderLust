const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const Listing = require("../models/listing");
const ExpressError = require("../utils/ExpressError.js");
const Review = require("../models/review.js");
const User = require("../models/user.js");
const { isLoggedin } = require("../middleware.js");
const {listingSchema} = require("../schema.js");
const listingController = require("../controllers/listing.js");
require('dotenv').config();
const multer  = require('multer')
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage })


//Listing Get & Delete Route
router.route("/")
.get(wrapAsync(listingController.index))

router.route("/new")
.get(isLoggedin,listingController.newListingForm)
.post(isLoggedin,upload.single('image'),wrapAsync(listingController.newPostListing))


router.get("/:id",isLoggedin,wrapAsync(listingController.listingId));

//Listing editForm Get & Edit Listing Route
router.route("/:id/edit")
.get(isLoggedin,wrapAsync(listingController.editListingForm))
.patch(isLoggedin,upload.single('image'),wrapAsync(listingController.updateListing))


router.delete("/:id",isLoggedin,wrapAsync(listingController.deleteListing))

//For Create New Review
router.post("/:id/review",isLoggedin,wrapAsync(listingController.postReview));

//For Edit Review
router.get("/:id/review-edit/:reviewId",isLoggedin,wrapAsync(listingController.editReview));

//For Delete Review
router.delete("/:id/review/:reviewId",isLoggedin,wrapAsync(listingController.reviewDelete));

module.exports = router;