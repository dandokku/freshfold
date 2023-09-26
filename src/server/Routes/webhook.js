const express = require('express');
const router = express.Router();
const { Bookings } = require("../Models/bookings");
const { Users } = require("../Models/users");
const mongoose = require("mongoose");
const { BookingCache } = require("../Models/bookings-cache")
const config = require("config")
const stripe = require("stripe")(config.get('stripePrivateKey'));

// Define the webhook endpoint route
// router.post('/stripe', async (req, res) => {
//     const event = req.body;

//     if (event.type === 'checkout.session.completed') {
//         const session = event.data.object;
//         const bookingCacheId = JSON.parse(session.metadata.bookingId);
//         console.log("bookingCacheIDWebHook: ", bookingCacheId);

//         const bookingData = BookingCache.findById(bookingCacheId);
//         console.log("bookingData: ", bookingData);


//         const user = await Users.findOne({ email: bookingData.email });

//         const booking = new Bookings({
//             user: {
//                 _id: user ? user._id : new mongoose.Types.ObjectId(),
//                 firstName: bookingData.firstName,
//                 lastName: bookingData.lastName,
//                 address: bookingData.address,
//                 phoneNo: bookingData.phoneNo,
//                 email: bookingData.email
//             },
//             pickUpDate: bookingData.pickUpDate,
//             deliveryDate: bookingData.deliveryDate,
//             washPreference: {
//                 bleachWhites: bookingData.bleachWhites,
//                 preferredDetergent: bookingData.preferredDetergent,
//                 specialInstructions: bookingData.specialInstructions
//             },
//             items: bookingData.items,
//             itemsTotalPrice: bookingData.itemsTotalPrice
//         });

//         try {
//             await booking.save();
//         } catch (ex) {
//             return res.status(500).send(ex);
//         }

//         res.send(booking);
//     }
// });




// This is your Stripe CLI webhook secret for testing your endpoint locally.
let endpointSecret;

endpointSecret = "whsec_0e369c95de031baba1c149174bf5de36d24a97cb28ecabcbd48e2206e1408c78";


router.post('/webhook', express.raw({type: 'application/json'}), (request, response) => {
  const sig = request.headers['stripe-signature'];

  let data;
  let eventType;

  if(endpointSecret){

      let event;
    
      try {
        event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
        console.log("Verified Webhook");
      } catch (err) {
        console.log(`Webhook Error: ${err.message}`);
        response.status(400).send(`Webhook Error: ${err.message}`);
        return;
      }
      data = event.data.object;
      eventType = event.type;
  }
  else{
    data = request.body.data.object;
    eventType = request.body.type;
  }


  // ========= Handle the event
  if(eventType === "checkout.session.completed"){
    // stripe.customers.retrieve(data.customer).then((customer) => {
    //     console.log(customer);
    //     console.log("data:", data);
    //     }
    // ).catch(err => console.log(err.message));
    console.log("data:", data);
  }
//   switch (event.type) {
//     case 'payment_intent.succeeded':
//       const paymentIntentSucceeded = event.data.object;
//       // Then define and call a function to handle the event payment_intent.succeeded
//       break;
//     // ... handle other event types
//     default:
//       console.log(`Unhandled event type ${event.type}`);
//   }

  // Return a 200 response to acknowledge receipt of the event
  response.send().end();
});


module.exports = router;
