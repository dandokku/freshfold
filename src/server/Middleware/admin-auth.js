const jwt = require("jsonwebtoken");
const config = require("config");

function adminAuth(req, res, next) {
    const token = req.header("x-auth-admin-token");
    console.log("Admin Token: ", token);
    if(!token) return res.status(401).send("Access Denied. No token Provided");

    try{
        const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
        req.admin = decoded;
        next();
    }
    catch(ex){
        res.status(400).send("Invalid Token...");
    }
}


module.exports = adminAuth;
