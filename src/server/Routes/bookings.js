const express = require("express");
const route = express.Router();
const { Bookings, validateBookings } = require("../Models/bookings")
const { Users } = require("../Models/users");
const { BookingCache } = require("../Models/bookings-cache")
const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const config = require("config");
const stripe = require('stripe')(config.get('stripePrivateKey'));
const { ObjectId } = require('mongodb');
const nodeMailer = require("nodemailer");


const transporter = nodeMailer.createTransport({
    service: "gmail",
    auth: {
        user: "jesulobadaniel!@gmail.com",
        pass: config.get("gmailNodemailerPassword")
    }
});



route.get("/", async (req, res) => {
    const bookingCache = await BookingCache.find().sort({_id: -1});
    res.send(bookingCache);
})

route.post("/step1", async (req, res) => {
    const bookingData = req.body;

    const bookingId = generateBookingId();
    console.log(bookingId)

    req.session.bookings = req.session.bookings ? req.session.bookings : {};
    req.session.bookings[bookingId] = bookingData;

    if(req.session.bookings){
        console.log(req.session.bookings);
    }


    res.send(bookingId);
})

route.get("/step2", async (req, res) => {
    try {
      const { bookingId } = req.query;
      const bookingData = req.session.bookings?.[bookingId];
      console.log("Booking Data", req.session.bookings)

      const sidCookie = req.cookies["connect.sid"];
      console.log(sidCookie);
  
      if (!bookingData) {
        return res.status(404).send("The session data does not exist");
      }
    
      res.send(bookingData);
    } catch (error) {
      console.error("Error retrieving booking data:", error);
      res.status(500).send("An error occurred while retrieving booking data");
    }
});

route.get("/recentBookings", async (req, res) => {
    try{
        const bookingCache = await BookingCache.find()
        .limit(5)
        .sort({_id: -1})
        res.send(bookingCache);
    }
    catch(ex){
        res.status(500).send("Error: ", ex);
    }
})

route.get("/user/:id", async (req, res) => {

    const userId = req.params.id;
    let bookingCache;
    // ======== Trying to get the Booking Details for a specific User
    // * SO here i check the id ghotten from the request the id is the id of the user, and based on that i use a find to get every id that is the same as the userId, but here i have to use a new objectId so that it can be changed into an id first.
    try{
         bookingCache = await BookingCache.find({ 'user._id': new mongoose.Types.ObjectId(userId) }).sort({_id: -1});
        console.log(bookingCache);
        if(!bookingCache) return res.status(404).send("No booking History");
    }
    catch(ex){
        res.status(500).send(ex);
    }
    

    res.send(bookingCache);
})



route.get("/:id", async (req, res) => {
    const bookingCache = await BookingCache.findById(req.params.id);
    if(!bookingCache) return res.status(404).send("This booking data does not exist");

    res.send(bookingCache);
})
  


route.post("/", async (req, res) => {
    console.log("Received request body:", req.body);

    const { error } = validateBookings(req.body);
    if (error) {
        console.log("validation error boii"); // This log line might be helpful for debugging
        return res.status(400).send(error.details[0].message);
    }


    const user = await Users.findOne({ email: req.body.email });

    const bookingCache = new BookingCache({
        user: {
            _id: user ? user._id : new mongoose.Types.ObjectId(),
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            address: req.body.address,
            phoneNo: req.body.phoneNo,
            email: req.body.email
        },
        pickUpDate: req.body.pickUpDate,
        deliveryDate: req.body.deliveryDate,
        items: req.body.items,
        itemsTotalPrice: req.body.itemsTotalPrice
    }
    );
    await bookingCache.save();

    const bookingCacheId = bookingCache._id;
    console.log("bookingCacheID: ", bookingCacheId);

    const customer = await stripe.customers.create({
        metadata: {
            userId: req.body.userId,
            bookingId: bookingCacheId, 
        },
    })

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            line_items: req.body.items.map(item => {
                return {
                    price_data: {
                        currency: "usd",
                        unit_amount: item.price * 100,
                        product_data: {
                            name: item.label,// You can also include other product data as needed
                        },
                    },
                    quantity: item.quantity,
                };
            }),
            success_url: "http://localhost:3000/services/",
            cancel_url: "http://localhost:3000/services/",
            metadata: {
                bookingId: JSON.stringify(bookingCacheId),
            },
        });
        
        res.json({ url: session.url });
    } catch (ex) {
        res.status(500).send(ex);
    }
    


})

let endpointSecret;

endpointSecret = "whsec_0e369c95de031baba1c149174bf5de36d24a97cb28ecabcbd48e2206e1408c78";

route.post('/webhook', express.raw({ type: 'application/json' }), async (request, response) => {
    const sig = request.headers['stripe-signature'];

    try {
        let event;

        // Verify the webhook and construct the event
        if (endpointSecret) {
            event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
            console.log("Verified Webhook");
        } else {
            event = request.body;
        }

        const eventType = event.type;
        const data = event.data.object;

        // Handle the event
        if (eventType === "checkout.session.completed") {
            const bookingCacheId = JSON.parse(data.metadata.bookingId);
            console.log(bookingCacheId);
            const bookingData = await BookingCache.findById(bookingCacheId);

            // Log the booking data for debugging
            console.log("Booking Data:", bookingData);

            // Create an instance of the Bookings model and save it
            // const user = await Users.findOne({ email: bookingData.user.email });
            // const booking = new Bookings({
            //     user: {
            //         _id: user ? user._id : new mongoose.Types.ObjectId(),
            //         firstName: bookingData.user.firstName,
            //         lastName: bookingData.user.lastName,
            //         address: bookingData.user.address,
            //         phoneNo: bookingData.user.phoneNo,
            //         email: bookingData.user.email
            //     },
            //     pickUpDate: bookingData.pickUpDate,
            //     deliveryDate: bookingData.deliveryDate,
            //     items: bookingData.items,
            //     itemsTotalPrice: bookingData.itemsTotalPrice
            // });

            // // Save the booking data to the Bookings model
            // await booking.save();

            // // Log success
            // console.log("Booking saved:", booking);
        }

        // Return a 200 response to acknowledge receipt of the event
        response.send().end();
    } catch (error) {
        console.error("Webhook Error:", error);
        response.status(500).send("Webhook Error: " + error.message);
    }
});


route.put("/:id", async (req, res) => {
    const bookingCache = await BookingCache.findByIdAndUpdate(req.params.id, {
        $set: {
            status: req.body.status
        }
    }, { new: true })

    if(!bookingCache) return res.status(404).send("The Booking does not exist");

    res.send(bookingCache);
})

function generateBookingId() {
    return uuidv4();
}

module.exports = route;
