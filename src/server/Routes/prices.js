const express = require("express");
const route = express.Router();
const { Prices, validatePrice } = require("../Models/prices");

// Get request for all the prices
route.get("/", async (req, res) => {
    const prices = await Prices.find();
    res.send(prices)
})

// Get request for a specific price
route.get("/:id", async (req, res) => {
    const priceId = req.params.id;
    const price = await Prices.findById(priceId);

    if (!price) {
        res.status(404).send("The price with this id does not exist blud");
    }

    res.send(price)
})

route.post("/", async (req, res) => {
    const { error } = validatePrice(req.body);

    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const price = new Prices({
        name: req.body.name,
        group: req.body.group,
        price: req.body.price
    })

    try{
        await price.save();
    }
    catch(ex) {
        return res.send(ex);
    }

    res.send(price);

})


route.put("/:id", async (req, res) => {

    const price = await Prices.findByIdAndUpdate(req.params.id, {
        $set: {
            name: req.body.name,
            group: req.body.group,
            price: req.body.price
        }
    }, { new: true })
    
    if (!price) {
        return res.status(404).send("The Price does not exist sire");
    }

    res.send(price);
})


// route.delete("/:id", async (req, res) => {
//     const price = await Prices.findByIdAndRemove(req.params.id);
// })


route.delete("/:id", async (req, res) => {
    try {
        const price = await Prices.findByIdAndRemove(req.params.id);

        if (!price) {
            return res.status(404).send("The Price does not exist, sire");
        }

        res.status(200).send({ message: "Price successfully deleted", deletedPrice: price });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});


module.exports = route
