const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressError.js");
const User = require("../models/user.js");
const passport = require("passport");
const { redirectUrl } = require("../middleware.js");
const userController = require("../controllers/user.js");



//Search Functionalty
router.get("/search",wrapAsync(userController.searchFunction))
//Signup get & Post Route
router.route("/signup")
.get(userController.signupGetForm)
.post(wrapAsync(userController.signupPostForm))

//Login Get & Post Route
router.route("/login")
.get(userController.loginGetForm)
.post(redirectUrl,passport.authenticate("local",{failureRedirect : "/login", failureFlash : true}),userController.loginPostForm)

//Logout User Route
router.get("/logout",userController.logoutUser)

module.exports = router;;