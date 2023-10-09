const mongoose = require("mongoose");
const Joi = require("joi");

const pricesSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 255
    },
    group: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    }
})

const Prices = mongoose.model("Prices", pricesSchema);

function validatePrice(price) {
    const schema = Joi.object({
        name: Joi.string().required(),
        group: Joi.string().required(),
        price: Joi.number().required()
    })

    return schema.validate(price)
}

async function addPrice(name, group, clothePrice) {
    let price = new Prices({
        name: name,
        group: group,
        price: clothePrice
    })

    try {
        price = await price.save();
        console.log(price)
    } catch(err) {
        console.log(err)
    }
}

// async function createPrice() {
//     const price = new Prices({
//         name: "Pillow Case",
//         group: "Iron and Folding",
//         price: 6
//     })

//     const result = await price.save();
//     console.log(result)
// }

// createPrice()

module.exports.addPrice = addPrice
module.exports.Prices = Prices
module.exports.validatePrice = validatePrice
