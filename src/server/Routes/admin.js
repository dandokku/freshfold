const express = require("express");
const { Admins, validateAdmin } = require("../Models/admin");
const route = express.Router();
const _  = require("lodash");
const bcrypt = require("bcrypt");
const adminAuth = require("../Middleware/admin-auth");

route.get("/", async (req, res) => {
    const admins = await Admins.find();
    res.send(admins);
})

route.get("/me", adminAuth, async (req, res) => {
    let admin;
    try{
        admin = await Admins.findById(req.admin._id).select("-password");
    }
    catch(ex){
        res.status(500).send(ex);
    }

    res.status(200).send(admin);
})

route.get("/:id", async (req, res) => {
    const admin = await Admins.findById(req.params.id);
    if(!admin) return res.status(404).send("The admin with the given id does not exist");

    res.status(200).send(admin);
})


route.post("/", async (req, res) => {
    const { error } = validateAdmin(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let admin = await Admins.findOne({email: req.body.email})
    if(admin) return res.status(400).send("The admin already exist");

    admin = new Admins(_.pick(req.body, req.body, ["firstName", "lastName", "address", "phoneNo", "email", "password", "adminImage"]));

    const salt = await bcrypt.genSalt(10);
    admin.password = await bcrypt.hash(admin.password, salt);

    try{
        await admin.save();
    }
    catch(ex) {
        res.status(500).send(ex);
    }

    res.status(200).send(admin);

})

route.put("/:id", async (req, res) => {

    const {error} = validateAdmin(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const admin = await Admins.findByIdAndUpdate(req.params.id, {
        $set: {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            address: req.body.address,
            phoneNo: req.body.phoneNo,
            email: req.body.email,
            adminImage: req.body.adminImage,
        }
    }, { new: true })

    if(!admin) return res.status(404).send("The admin with the given id does not exist...");

    res.send(admin);
})

module.exports = route;
