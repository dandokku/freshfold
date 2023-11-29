const express = require("express");
const route = express.Router();
const { Users, validateUser } = require("../Models/users");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const auth = require("../Middleware/auth");
const Joi = require("joi");

route.get("/", async (req, res) => {
    const users = await Users.find();
    res.send(users);
})

route.get("/me", auth, async(req, res) => {
    console.log("me")
    const user = await Users.findById(req.user._id).select("-password");
    res.send(user);
})

route.get("/recentUsers", async (req, res) => {
    try{
        const users = await Users.find()
        .limit(5)
        .sort({_id: -1})
        res.send(users);
        console.log(users)
    }
    catch(ex){
        res.status(500).send("Error: ", ex);
    }
})

route.get("/:id", async (req, res) => {
    const user = await Users.findById(req.params.id);

    if(!user) return res.status(404).send("The user with the given id does not exist...");
    console.log(user)
    res.send(user);
})


route.post("/", async (req, res) => {

    const { error } = validateUser(req.body);
    if(error) return res.status(400).send(error);

    // * Checking if the user Already Exist
    let user = await Users.findOne({ email: req.body.email });
    if(user) return res.status(400).send("The user already exist...");

    // * setting the Users Object to the DB using Lodash
    user = new Users(_.pick(req.body, ["firstName", "lastName", "address", "phoneNo", "email", "password"]));

    //* Generating a hashed password based on the users password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    try{
        await user.save();
    }

    catch(ex){
        return res.status(400).send(ex);
    }

    res.send(_.pick(user, ["_id", "firstName", "lastName", "address", "phoneNo", "email", "password"]));

    console.log(user)

})

route.put("/:id", async (req, res) => {
    const { error } = validate(req.body);
    if(error) return  res.status(400).send(error.details[0].message);

    const user = await Users.findByIdAndUpdate(req.params.id, {
        $set: {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            address: req.body.address,
            phoneNo: req.body.phoneNo,
        }
    }, { new: true })

    if(!user){
        res.status(404).send("The user with the given id does not exist");
    }

    res.send(user);
})



function validate(user){
    const schema = Joi.object({
        firstName: Joi.string().min(2).max(255).required(),
        lastName: Joi.string().min(2).max(255).required(),
        address: Joi.string().min(10).max(255).required(),
        phoneNo: Joi.string().min(5).max(20).required(),
        email: Joi.string().min(5).max(255).required().email(),

    })

    return schema.validate(user);
}

module.exports = route
