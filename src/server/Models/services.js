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
//         serviceName: "Stain Removal",
//         description: "We will remove stains and spots from your clothes"
//     })

//     const result = await service.save();
//     console.log(result)
// }

// createService()


// const newService = new Services({
//     serviceName: "Iron and Folding",
//     description: "We will iron and fold your clothes"
// });

// // Save the new service document
// newService.save()
//     .then(savedService => {
//         console.log(savedService);
//     })
//     .catch(error => {
//         console.error(error);
//     });



function validateService(service) {
    const schema = Joi.object({
        serviceName: Joi.string().min(3).max(100).required(),
        description: Joi.string().required()
    })

    return schema.validate(service)
}

module.exports.Services = Services;
module.exports.validateService = validateService;
