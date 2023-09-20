const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("config");


const adminSchema = mongoose.Schema({
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
    address: {
        type: String,
        minlength: 10,
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
        unique: true
    },    
    password: {
        type: String,
        minlength: 5,
        maxlength: 255,
        required: true
    },    
})

adminSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({_id: this._id}, config.get("jwtPrivateKey"))
    return token;
}

const Admins = mongoose.model("Admins", adminSchema);

function validateAdmin(admin) {
    const schema = Joi.object({
        firstName: Joi.string().min(2).max(255).required(),
        lastName: Joi.string().min(2).max(255).required(),
        address: Joi.string().min(10).max(255).required(),
        phoneNo: Joi.string().min(5).max(20).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(55).required(),
    })
    return schema.validate(admin)
}

module.exports.Admins = Admins;
module.exports.validateAdmin = validateAdmin;
