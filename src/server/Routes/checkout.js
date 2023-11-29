const express =  require("express");
const router = express.Router();
const config = require("config")
const { validateBookings } = require("../Models/bookings")
const stripe = require('stripe')(config.get('stripePrivateKey'));


router.post("/", async (req, res) => {
    const { error } = validateBookings(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    try{
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            line_items: req.body.items.map(item => {
                return {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: item.label
                        },
                        unit_amount: item.price * 100
                    },
                    quantity: item.quantity
                }
            }),
            success_url: "http://localhost:3000/services/",
            cancel_url: "http://localhost:3000/services/",
        })
        res.json({url: session.url})
    }
    catch(ex){
        res.status(500).send(ex);
    }
})


module.exports = router;
