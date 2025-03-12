const ExpressError = require("../utils/ExpressError.js");
const User = require("../models/user.js");
const passport = require("passport");
const { redirectUrl } = require("../middleware.js");
const Listing = require("../models/listing.js");

module.exports.signupGetForm = (req,res)=>{
    res.render("User/signup.ejs",{title : "Signup to WanderLust "});
}

module.exports.searchFunction = async(req,res)=>{
    let {by,q} = req.query;
    let data;
    if(by=="location"){
     data = await Listing.find({location : q})
    }
    else if(by=="country"){
     data = await Listing.find({country : q})
    }
    else if(by=="price"){
        q = Number(q);
        if(isNaN(q)){
            req.flash("error","Invalid Price")
            return res.redirect("/listings")
        }
        else{
            data = await Listing.find({price:q})
        }
    }
    if(data.length==0){
        req.flash("error","No result Found!")
        return res.redirect("/listings");
    }
    res.render("User/searchresult.ejs",{data , title : `Search Result for ${q} - WanderLust`,query : q})
}

module.exports.signupPostForm = async(req,res)=>{
    let {email,username,password} = req.body;
    let saveUser = {
        email : email,
        username : username
    }
    const regUser = await User.register(saveUser,`${password}`)
    req.login(regUser,(err)=>{
        if(err){
           return next(err);
        }
        req.flash("success","Welcome To WanderLust ! Where luxury meets adventure!");
        return res.redirect("/listings");
    })
}

module.exports.loginGetForm = (req,res)=>{
    res.render("User/login.ejs" ,{title : "Login To WanderLust",user : req.user});
}

module.exports.loginPostForm = (req,res)=>{
    req.flash("success",`Welcome Back ${req.user.username}`)
    // console.log(req.path)
    if(res.locals.redirectUrl!=undefined){
    res.redirect(res.locals.redirectUrl)
    }
    else{
    res.redirect("/listings");
    }
}

module.exports.logoutUser = (req,res)=>{
    req.logOut((err)=>{
        if(err){
            return next(err);
        }
        req.flash("error","Logout successful. Thank you for exploring Wanderlust!")
        return res.redirect("/listings");
    })
}