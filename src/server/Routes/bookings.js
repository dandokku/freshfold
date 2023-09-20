const express = require("express");
const route = express.Router();
const { Bookings, validateBookings } = require("../Models/bookings")
const { Users } = require("../Models/users");
// const { BookingCache } = require("../Models/bookings-cache")
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
    const bookings = await Bookings.find().sort({_id: -1});
    res.send(bookings);
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
        const bookings = await Bookings.find()
        .limit(5)
        .sort({_id: -1})
        res.send(bookings);
        // console.log(users)
    }
    catch(ex){
        res.status(500).send("Error: ", ex);
    }
})

route.get("/user/:id", async (req, res) => {

    const userId = req.params.id;
    // console.log("userId", userId);
    let booking;
    // ======== Trying to get the Booking Details for a specific User
    // * SO here i check the id ghotten from the request the id is the id of the user, and based on that i use a find to get every id that is the same as the userId, but here i have to use a new objectId so that it can be changed into an id first.
    try{
         booking = await Bookings.find({ 'user._id': new mongoose.Types.ObjectId(userId) }).sort({_id: -1});
        // console.log(booking);
        if(!booking) return res.status(404).send("No booking History");
    }
    catch(ex){
        res.status(500).send(ex);
    }
    

    res.send(booking);
})



route.get("/:id", async (req, res) => {
    const booking = await Bookings.findById(req.params.id);
    if(!booking) return res.status(404).send("This booking data does not exist");

    res.send(booking);
})
  


route.post("/", async (req, res) => {

    const { error } = validateBookings(req.body);
    if(error) return res.status(400).send(error.details[0].message);

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
        specialInstructions: req.body.specialInstructions,
        items: req.body.items,
        itemsTotalPrice: req.body.itemsTotalPrice
    }
    );
    await bookingCache.save();

    const bookingCacheId = bookingCache._id;
    // console.log("bookingCacheID: ", bookingCacheId);

    // const customer = await stripe.customers.create({
    //     metadata: {
    //         userId: req.body.userId,
    //         bookingId: bookingCacheId, 
    //     },
    // })

    // try{
    //     const session = await stripe.checkout.sessions.create({
    //         payment_method_types: ["card"],
    //         mode: "payment",
    //         line_items: req.body.items.map(item => {
    //             return {
    //                 price_data: {
    //                     currency: "usd",
    //                     product_data: {
    //                         name: item.label
    //                     },
    //                     unit_amount: item.price * 100
    //                 },
    //                 quantity: item.quantity
    //             }
    //         }),
    //         success_url: "http://localhost:3000/booking-success",
    //         cancel_url: "http://localhost:3000/services/",
    //         metadata: {
    //             // userId: req.body.userId,
    //             bookingId: JSON.stringify(bookingCacheId), 
    //         },
    //     })
    //     res.json({url: session.url})
    // }

    // catch(ex){
    //     res.status(500).send(ex);
    // }


})

let endpointSecret;

// endpointSecret = "whsec_a02a2dae4a85405cae4d108c84da28f4583275278788bb08f5f9352289775484";

// route.post('/webhook', express.raw({type: 'application/json'}), async (request, response) => {
//     const sig = request.headers['stripe-signature'];
  
//     let data;
//     let eventType;
  
//     if(endpointSecret){
  
//         let event;
      
//         try {
//           event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
//           console.log("Verified Webhook");
//         } catch (err) {
//           console.log(`Webhook Error: ${err.message}`);
//           response.status(400).send(`Webhook Error: ${err.message}`);
//           return;
//         }
//         data = event.data.object;
//         eventType = event.type;
//     }
//     else{
//       data = request.body.data.object;
//       eventType = request.body.type;
//     }
  
  
//     // ========= Handle the event
//     if(eventType === "checkout.session.completed"){
//       console.log("data:", data);
//       const bookingCacheId = JSON.parse(data.metadata.bookingId);
//       console.log(bookingCacheId);
//       const bookingData = await BookingCache.findById(bookingCacheId);

//         const user = await Users.findOne({ email: bookingData.user.email });
//         console.log(user);

//         const booking = new Bookings({
//             user: {
//                 _id: user ? user._id : new mongoose.Types.ObjectId(),
//                 firstName: bookingData.user.firstName,
//                 lastName: bookingData.user.lastName,
//                 address: bookingData.user.address,
//                 phoneNo: bookingData.user.phoneNo,
//                 email: bookingData.user.email
//             },
//             pickUpDate: bookingData.pickUpDate,
//             deliveryDate: bookingData.deliveryDate,
//             washPreference: {
//                 bleachWhites: bookingData.washPreference[0].bleachWhites,
//                 preferredDetergent: bookingData.washPreference[0].preferredDetergent,
//                 specialInstructions: bookingData.washPreference[0].specialInstructions
//             },
//             items: bookingData.items,
//             itemsTotalPrice: bookingData.itemsTotalPrice
//         });

//         await booking.save();

//         const mailOptions = {
//             from: "cleancycle2023@gmail.com",
//             // ============== Change it here
//             // to: user.email,
//             to: "omobill2000@gmail.com",
//             subject: "Booking Confirmation",
//             text: "Thank you for your booking! Our team will contact you shortly to schedule a cloth pickup."
//         }
        
//         transporter.sendMail(mailOptions, function(error, info){
//             if(error){
//                 console.log(error);
//             }
//             else console.log("Email sent: " + info.response);
//         })

//         // console.log(booking);

// //         res.send(booking);
//     }

  
//     // Return a 200 response to acknowledge receipt of the event
//     response.send().end();
// });

route.put("/:id", async (req, res) => {
    const booking = await Bookings.findByIdAndUpdate(req.params.id, {
        $set: {
            status: req.body.status
        }
    }, { new: true })

    if(!booking) return res.status(404).send("The Booking does not exist");

    res.send(booking);
})

function generateBookingId() {
    return uuidv4();
}

module.exports = route;