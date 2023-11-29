const express = require('express');
const router = express.Router();
const config = require("config")
const stripe = require("stripe")(config.get('stripePrivateKey'));

// This is the Stripe CLI webhook secret for testing your endpoint locally.
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
    
    console.log("data:", data);
  }

  // Return a 200 response to acknowledge receipt of the event
  response.send().end();
});


module.exports = router;
