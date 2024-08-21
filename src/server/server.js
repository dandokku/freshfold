const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const priceRoute = require("./Routes/prices");
const serviceRoute = require("./Routes/services");
const userRoute = require("./Routes/users");
const bookingRoute = require("./Routes/bookings");
const auth = require("./Routes/auth");
const adminRoute = require("./Routes/admin");
const adminAuth = require("./Routes/admin-auth");
const checkOut = require("./Routes/checkout");
const webhookRoute = require("./Routes/webhook.js");
const config = require("config");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const app = express();

app.use(cookieParser());
app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ limit: '20mb', extended: true }));

// Set CORS headers first
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000', 'http://localhost:3001');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Expose-Headers', 'x-auth-token, x-auth-admin-token');
    res.setHeader('Access-Control-Allow-Credentials', 'true'); // Allow credentials (cookies)
    next();
});

// Enable CORS middleware
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:3001'],
    credentials: true,
}));

// Continue with other middleware
app.use(express.json());
app.use("/api/services", serviceRoute);
app.use("/api/users", userRoute);
app.use("/api/bookings", bookingRoute);
app.use("/api/auth", auth)
app.use("/api/admin-auth", adminAuth); 
app.use("/api/checkout-session", checkOut);
app.use("/api/admins", adminRoute);
app.use("/api/admin-auth", adminAuth);
app.use("/api/prices", priceRoute);
app.use("/api/stripe", webhookRoute);

if (!config.get("jwtPrivateKey")) {
    console.error("Big Error: jwtPrivateKey is not defined");
    process.exit();
}

// Connecting to the Database
mongoose.connect("mongodb://127.0.0.1:27017/freshfold")
    .then(() => console.log("Connected to the Fresh Fold Database Successfully, We are In Boys"))
    .catch(err => console.log(`Error: ${err}`));

app.get("/", (req, res) => {
    res.send("Welcome to the laundry-booking");
});

app.listen(9000, () => {
    console.log("Listening for connections on port 9000");
});
