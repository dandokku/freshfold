const mongoose = require("mongoose")
const express = require("express")
const cors = require("cors")
const priceRoute = require("./Routes/prices")
const serviceRoute = require("./Routes/services")
const userRoute = require("./Routes/users")
const bookingRoute = require("./Routes/bookings")
const auth = require("./Routes/auth")
const adminRoute = require("./Routes/admin")
const adminAuth = require("./Routes/admin-auth")
const checkOut = require("./Routes/checkout")
const config = require("config")
const session = require("express-session")
const cookieParser = require("cookie-parser")
const bodyParser = require("body-parser")
const app = express();



app.use(cookieParser());
app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ limit: '20mb', extended: true }));
app.use(express.json())
app.use("/api/services", serviceRoute);
app.use("/api/users", userRoute);
app.use("/api/bookings", bookingRoute);
app.use("/api/auth", auth);
app.use("/api/admin-auth", adminAuth); 
app.use("/api/checkout-session", checkOut);
app.use("/api/admins", adminRoute);
app.use("/api/admin-auth", adminAuth);
app.use("/api/prices", priceRoute)


app.use(cors());

// Configure CORS options
const corsOptions = {
  exposedHeaders: ['x-auth-token', "x-auth-admin-token"], // Add the header name here
};

// Enable CORS with custom options
app.use(cors(corsOptions));

app.use(
    session({
      secret: 'laundry-booking-sessionKey',
      resave: false,
      saveUninitialized: false,
    })
);


if (!config.get("jwtPrivateKey")) {
    console.error("Big Error: jwtPrivateKey is not defined")
    // process.exit()
}


// Connecting to the Database
mongoose.connect("mongodb://127.0.0.1:27017/freshfold").then(() => console.log("Connected to the Fresh Fold Database Successfully, We are In Boys")).catch(err => console.log(`Error: ${err}`))

app.get("/", (req, res) => {
    res.send("Welcome to the laundry-booking");
})

app.listen(9000, () => {
    console.log("Listening for connections on port 9000")
})
