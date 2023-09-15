const mongoose = require("mongoose")
const express = require("express")
const cors = require("cors")
const priceRoute = require("./Routes/prices")
const serviceRoute = require("./Routes/services")
const userRoute = require("./Routes/users")
const bookingRoute = require("./Routes/bookings")
const auth = require("./Routes/auth")
const adminRoute = require("./Routes/admin")
const checkOut = require("./Routes/checkout")
// const config = require("config")
// const session = require("express-session")
// const cookieParser = require("cookie-parser")
const bodyParser = require("body-parser")
const app = express();




app.use("/api/prices", priceRoute)




// Connecting to the Database
mongoose.connect("mongodb://127.0.0.1:27017/freshfold").then(() => console.log("Connected to the Fresh Fold Database Successfully, We are In Boys")).catch(err => console.log(`Error: ${err}`))


app.listen(6000, () => {
    console.log("Listening for connections on port 6000")
})
