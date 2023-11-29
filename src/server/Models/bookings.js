const mongoose = require("mongoose");
const Joi = require("joi");


const usersSchema = mongoose.Schema({
    firstName: {
        type: String,
        minlength: 2,
        maxlength: 255,
        required: true
    },
    lastName: {
        type: String,
        minlength: 2,
        maxlength: 255,
        required: true
    },
    phoneNo: {
        type: String,
        minlength: 5,
        maxlength: 20,
        required: true
    },
    email: {
        type: String,
        minlength: 5,
        maxlength: 255,
        required: true,
    },
    address: {
        type: String,
        minlength: 10,
        maxlength: 255,
        required: true
    },
})

const bookingSchema = mongoose.Schema({

    user: usersSchema,
    
    bookingDate: {
        type: Date,
        default: Date.now()
    },
    
    pickUpDate: {
        type: Date,
        required: true,
    },
    
    deliveryDate: {
        type: Date,
        required: true,
    },
    
    items: {
        type: Array,
        required: true
    },
    
    itemsTotalPrice: {
        type: Number,
        required: true
    },
    
    status: {
        type: String,
        default: "Pending"
    }
})

const Bookings = mongoose.model("Bookings", bookingSchema)

function validateBookings(booking) {

    const schema = Joi.object({

        firstName: Joi.string().min(2).max(255).required(),
        lastName: Joi.string().min(2).max(255).required(),
        address: Joi.string().min(10).max(255).required(),
        phoneNo: Joi.string().min(5).max(20).required(),
        email: Joi.string().min(5).max(255).required(),
        pickUpDate: Joi.date().required(),
        deliveryDate: Joi.date().required(),
        items: Joi.array().required(),
        itemsTotalPrice: Joi.number().required(),

    })

    return schema.validate(booking);
}

module.exports.Bookings = Bookings;
module.exports.validateBookings = validateBookings;
