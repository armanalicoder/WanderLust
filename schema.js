const Joi = require("joi");

const listingSchema = Joi.object({
    listing : Joi.object({
        title : Joi.string().required(),
        description : Joi.string().required(),
        image : {
            filename : Joi.string(),
            url : Joi.string().allow("",null)
        },
        location : Joi.string().required(),
        price : Joi.number().min(0),
        country : Joi.string().required()
    }).required()
})
module.exports = listingSchema;

const reviewSchema = Joi.object({
    comment: Joi.string().required(),
    rating: Joi.number().min(1).max(5).required()
});

module.exports = reviewSchema;
