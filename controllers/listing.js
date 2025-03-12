const Listing = require("../models/listing");
const Review = require("../models/review.js");
const User = require("../models/user.js");
const {listingSchema} = require("../schema.js");
const ExpressError = require("../utils/ExpressError.js");

module.exports.index = async(req,res)=>{
    let data = await Listing.find({}).populate("owner");
    // console.log(data)
    res.render("listings/home.ejs",{data,title:"Welcome to WanderLust",user :req.user});
}

module.exports.newListingForm = (req,res)=>{
    res.render("listings/newlist.ejs",{title:"Create Your Listing- WanderLust"});
}

module.exports.listingId = async(req,res,next)=>{
    let {id} = req.params;
    let data = await Listing.findById(`${id}`).populate({path : "review",populate : {
        path : "author"
    }}).populate("owner");
    res.render("listings/list.ejs",{data,title:data.title});
}

module.exports.editListingForm = async(req,res)=>{
    let {id} = req.params;
    let data = await Listing.findById(`${id}`);
    let originalUrl = data.image.url;
    originalUrl= originalUrl.replace("/upload","/upload/w_250");
    const listOwnerId = data.owner[0].toString();
    if(req.user._id==listOwnerId){
        res.render("listings/editlist.ejs",{data,originalUrl,title:"Edit Your Listing"});
    }
    else{
        req.flash("error","You aren't the owner of this listing")
        res.redirect("/listings")
    }
}
module.exports.updateListing = async(req,res)=>{
    let {id} = req.params;
    let {title,description,url,price,location,country} = req.body;
    let newData = {
        title:title,
        description : description,
        image : {
            filename : req.file.filename,
            url : req.file.path
        },
        price : price,
        location : location,
        country : country
    }
    let data = await Listing.findById(`${id}`);
    const listOwnerId = data.owner[0].toString();
    if(listOwnerId==req.user._id){
        await Listing.findByIdAndUpdate(`${id}`,newData);
        req.flash("success","Listing Updated Successfully");
        res.redirect(`/listings/${id}`);
    }
    else{
        req.flash("error","You aren't owner of this listing");
        res.redirect("/listings");
    }
}

module.exports.deleteListing = async(req,res)=>{
    let {id} = req.params;
    const data = await Listing.findById(id);
    const listOwnerId = data.owner[0].toString();
    if(listOwnerId==req.user._id){
        await Listing.findByIdAndDelete(`${id}`);
        req.flash("error","Listing Deleted")
        res.redirect("/listings");
    }
    else{
        req.flash("error","You aren't the owner of this listing");
        res.redirect("/listings");
    }
}

module.exports.newPostListing = async(req,res)=>{
    let {title,description,url,price,location,country} = req.body;
    let data = {
        title : title,
        description : description,
        image : {
            filename : req.file.filename,
            url : req.file.path
        },
        price : price,
        location : location,
        country : country,
        owner : req.user,
        geometry : {
            coordinates :[]
        }
    };
    if(price<1){
        throw new ExpressError(400,"Price is not Valid!")
    }
    if (!title || !description || !price || !location || !country) {
        throw new ExpressError(400, "Kindly fill in all listing details.");
    }
    let address = `${location}, ${country}`;
    let response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${address}`);
    let geoData = await response.json();
    if(geoData.length==0){
        req.flash("error","Invalid Location !Try entering a well-known place")
        return res.redirect("/listings/new");
    }
    // console.log(geoData);
    let coordinates = [parseFloat(geoData[0].lat),parseFloat(geoData[0].lon)]
    if (geoData.length === 0) {
        throw new ExpressError(400, "Invalid location! ");
    }
    data.geometry.coordinates = coordinates;
    await Listing.create(data);
    req.flash("success","New Listing Added!")
    return res.redirect("/listings");
}

module.exports.postReview = async(req,res)=>{
    let {id} = req.params;
    let listing = await Listing.findById(id).populate("review");
    let data = listing.review.find((obj)=> obj.author.toString()==req.user._id);
    if(data!=undefined){
        req.flash("error","You've already submitted a review you can edit");
        return res.redirect(`/listings/${id}`);
    }
    else{
        let {comment,rating} = req.body;
        let newReview = new Review({
            comment : comment,
            rating : rating,
            author : req.user._id
        })
        await newReview.save();
        listing.review.push(newReview);
        await listing.save();
        req.flash("success","New review created!")
        return res.redirect(`/listings/${id}`);
    }
}

module.exports.editReview = async(req,res)=>{
    let {id} = req.params;
    let {reviewId} = req.params;
    const reviews = await Review.findById(reviewId);
    if(reviews.author.toString()!=req.user._id){
        req.flash("error","You can't delete this review!")
        return res.redirect(`/listings/${id}`);
    }
    else{
    await Review.findByIdAndDelete(reviewId);
    let data = await Listing.findById(`${id}`).populate({path : "review",populate : {
        path : "author"
    }}).populate("owner");
    const rating = reviews.rating;
    const comment = reviews.comment;
    return res.render("listings/reviewedit.ejs",{title : "Edit Your Review - WanderLust",data,rating,comment})
}
}

module.exports.reviewDelete = async(req,res)=>{
    let {id} = req.params;
    let {reviewId} = req.params;
    let data = await Review.findById(reviewId);
    if(data.author.toString()!=req.user._id){
        req.flash("error","you haven't created this review!");
        return res.redirect(`/listings/${id}`);
    }
    else{
        let review = await Review.findByIdAndDelete(reviewId);
        let listing = await Listing.findByIdAndUpdate(id,{$pull: {review : reviewId}});
        return res.redirect(`/listings/${id}`);
    }
}