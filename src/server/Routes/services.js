const express = require("express")
const route = express.Router()
const { Services, validateService } = require("../Models/services")
const Joi = require("joi")
const { validatePrice } = require("../Models/prices")

route.get("/", async (req, res) => {
    const services = await Services.find()
    res.send(services)
})

route.get("/:id", async (req, res) => {
    const serviceId = req.params.id;
    const service = await Services.findById(serviceId)

    if (!service) {
        return res.status(404).send("The service with the given id does not exist.... blud")
    }

    res.send(service);
})

route.post("/", async (req, res) => {
    const { error } = validateService(req.body)
    
    if (error) {
        res.status(400).send(error.details[0].message)
        return;
    }

    let service = new Services({
        serviceName: req.body.serviceName,
        description: req.body.description
    })

    try {
        service = await service.save()
        res.send(service)
    } catch (ex) {
        res.send(ex)
    }
})

route.put("/:id", async (req, res, next) => {
    const { error } = validateUpdateService(req.body);

    if (error) {
        return next(error); // Pass the validation error to the error handler
    }

    const service = await Services.findByIdAndUpdate(
        req.params.id,
        {
            $set: {
                serviceName: req.body.serviceName,
                description: req.body.description
            }
        },
        { new: true }
    );

    if (!service) {
        return res.status(404).send("The Service with the given id does not exist.");
    }

    res.send(service);
});



route.delete("/:id", async (req, res) => {
    const service = await Services.findByIdAndRemove(req.params.id, { new: true });

    if(!service) return res.status(404).send("The Service with the given id does not exist...");

    res.send(service);
})



function validateUpdateService(service) {

    const schema = Joi.object({
        serviceName: Joi.string().min(3).max(100).required(),
        description: Joi.string().required(),
    })

    return schema.validate(service);
}


module.exports = route;
