const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("config")

const userSchema = mongoose.Schema({
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

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id: this._id}, config.get("jwtPrivateKey"));
    return token;
}

const Users = mongoose.model("Users", userSchema);

function validateUser(user) {
    const schema = Joi.object({
        firstName: Joi.string().min(2).max(255).required(),
        lastName: Joi.string().min(2).max(255).required(),
        address: Joi.string().min(10).max(255).required(),
        phoneNo: Joi.string().min(5).max(20).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(55).required(),
    })
    return schema.validate(user);
}


// async function createUser() {
//     const user = new Users({
//         firstName: "Kami",
//         lastName: "Dandokku",
//         address: "Heaven's street, back of God's Yard",
//         phoneNo: "08104618586",
//         email: "jesulobadaniel1@gmail.com",
//         password: "welpwelpwelp"
//     })

//     const result = await user.save();
//     console.log(result)
// }

// createUser()

module.exports.Users = Users;
module.exports.validateUser = validateUser;
