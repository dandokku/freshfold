const mongoose = require("mongoose")
const Joi = require("joi")


const serviceSchema = mongoose.Schema({
    serviceName: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 100
    }, 
    description: {
        type: String,
        required: true
    }
})

const Services = mongoose.model("Services", serviceSchema)

// async function createService() {
//     const service = new Services({
//         serviceName: "Dry Cleaning",
//         description: "We will iron and fold your clothes"
//     })

//     const result = await service.save();
//     console.log(result)
// }

// createService()


function validateService(service) {
    const schema = Joi.object({
        serviceName: Joi.string().min(3).max(100).required(),
        description: Joi.string().required()
    })

    return schema.validate(service)
}

module.exports.Services = Services;
module.exports.validateService = validateService;
