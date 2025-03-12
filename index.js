const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const { title } = require("process");
const Listing = require("./models/listing");
const methodOverride = require("method-override");
const { Initdata } = require("./Init/init");
const ejsMate = require("ejs-mate");
const { error } = require("console");
const wrapAsync = require("./utils/wrapAsync");
const ExpressError = require("./utils/ExpressError.js");
const listingRouter = require("./routes/listing.js");
const userRouter = require("./routes/user.js");
const flash = require("connect-flash");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");
const port = 8000;

const url = process.env.DB_URL;

main().then(()=>{
    console.log("Connection Successfull");
})
.catch(err=>{
    console.log(err);
})

async function main() {
    await mongoose.connect(url);
}

app.use(methodOverride("_method"));
app.use(express.static('public'));
app.use(express.static(path.join(__dirname,"public/css")));
app.use(express.static(path.join(__dirname,"public/js")));

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.engine("ejs",ejsMate);

const store = MongoStore.create({
    mongoUrl: url,
    crypto: {
      secret: process.env.SECRET
    },
    touchAfter : 24 * 3600
})

app.use(session({
    store,
    secret : "mysecretcode",
    resave : false,
    saveUninitialized : true,
    cookie : {
        expires : Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge : 7 * 24 * 60 * 60 * 1000,
        httpOnly : true
    }
}))

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser((user, done) => {
    done(null, user.id); // Store user ID in session
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err);
    }
});
app.use((req,res,next)=>{
    res.locals.successMsg = req.flash("success");
    res.locals.errorMsg = req.flash("error");
    res.locals.currUser = req.user;
    next();
})

app.listen(port,()=>{
    console.log(`App is listening on port ${port}`);
}) 

// app.get("/initdata",async(req,res)=>{
//     await Listing.deleteMany({});
//     // Initdata.data = Initdata.map((obj)=> ({...obj, owner : "67d1386fd1b8e7c97e84a583"}));
//     // let newData = await Listing.insertMany(Initdata.data);
//     res.send("Done");
// })

app.use("/listings",listingRouter)
app.use("/",userRouter);

app.get("/",(req,res)=>{
    res.redirect("/listings");
})

app.all("*",(req,res,next)=>{
    next(new ExpressError(404,"Page Not Found!"));
})

//Error handling middleware
app.use((err,req,res,next)=>{
    let {statusCode=500,message="Something Went Wrong"} = err;
    res.status(statusCode).render("error/error.ejs",{title : "Some Error Occured!",statusCode,message});
})
