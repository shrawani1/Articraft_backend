
const jwt = require('jsonwebtoken');
const User = require('../models/userModel'); // Ensure this import is present

const authGuard = async (req, res, next) => {
    // Check incoming data
    console.log(req.headers); //pass
   
    // Get authorization data from headers
    const authHeader = req.headers.authorization;
   
    // Check or validate
    if (!authHeader) {
        return res.status(400).json({
            success: false,
            message: "Please login first",
        });
    }
   
    // Split the data (Format: 'Bearer token') -> only token
    const token = authHeader.split(" ")[1];
   
    // If token is not found: stop the process (res)
    if (!token || token === "") {
        return res.status(400).json({
            success: false,
            message: "Please provide a token",
        });
    }
   
    // If token is found, then verify
    try {
        const decodeUserData = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decodeUserData.id).select("-password");
        if (!req.user) {
            return res.status(400).json({
                success: false,
                message: "User not found",
            });
        }
        next();
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success: false,
            message: "Not Authenticated",
        });
    }
};



module.exports = {
    authGuard,
};