const jwt = require("jsonwebtoken");
const { redisClient } = require("../config/redis");
require("dotenv").config();

const authenticate = async (req, res, next) => {
    const token = req.headers.authorization || `${await redisClient.get("token")}`;
    try {
        if (token) {
            const decode = jwt.verify(token, process.env.secret); 
            if (decode) {
                req.role = decode.role;
                req.userId = decode.userId;
                // console.log(decode.role, decode.userId);
                return next();
            } else {
                return res.status(401).json({ message: "Please login again" });
            }
        } else {
            return res.status(401).json({ message: "Please login first" });
        }
    } catch (error) {
        if (!res.headersSent) {
            return res.status(500).json({ error: error.message });
        }
        console.error('Headers were already sent', error);
    }
};

module.exports = { authenticate };
