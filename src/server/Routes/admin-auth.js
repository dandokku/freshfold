const express = require("express");
const Joi = require("joi");
const route = express.Router();
const bcrypt = require("bcrypt");
const { Admins } = require("../Models/admin");

route.post("/", async (req, res) => {
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);


    const admin = await Admins.findOne({email: req.body.email});
    if(!admin) return res.status(400).send("Invalid Email or password...");

    const validPassword = await bcrypt.compare(req.body.password, admin.password);
    if(!validPassword) return res.status(400).send("Invalid Email or password...");

    const token = admin.generateAuthToken();
    res.setHeader("Content-Type", "application/json");
    res.header("x-auth-admin-token", token).send("Login Successfull...");
})


function validate(req) {
    const schema = Joi.object({
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(55).required()
    })

    return schema.validate(req);
}

module.exports = route;
