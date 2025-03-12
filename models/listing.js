const mongoose = require("mongoose");
const Review = require("./review");
const { Schema } = mongoose; // ✅ Destructure Schema from mongoose

const listingSchema = new Schema({ // ✅ Use Schema instead of mongoose.Schema
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required : true
    },
    image: {
        filename: String,
        url: {
            type: String,
            set: (v) => v === "" ? "https://thumbs.dreamstime.com/b/no-image-available-icon-flat-vector-no-image-available-icon-flat-vector-illustration-132482953.jpg" : v,
        }
    },
    price: {
        type: Number,
        min: 1
    },
    location: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    review:[ 
    {
        type: Schema.Types.ObjectId,
        ref: "Review"
    }
],
    owner : [
        {
            type : Schema.Types.ObjectId,
            ref : "User"
        }
    ],
    createdAt : {
        type : Date,
        default: () => Date.now() 
    },
    geometry:{
      coordinates: {
        type: [Number],
        required: true
      }
    }
});
listingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){
        await Review.deleteMany({_id : {$in : listing.review}})
    }
})

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
