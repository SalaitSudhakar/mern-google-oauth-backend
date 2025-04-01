import jwt from "jsonwebtoken";
import { errorHandler } from "../Utills/error.js";

 const authMiddleware = (req, res, next) => {

    try {
        if (!req.cookies || !req.cookies.access_token){
            return res.status(401).json({success: false, message: 'Token is missing'})
        }

        const token = req.cookies.access_token;
       

        if (!process.env.JWT_SECRET) {
            return res.status(500).json({success: false, message: 'JWT_SECRET is Missing'})
        }
        
       const tokenDecoded = jwt.verify(token, process.env.JWT_SECRET);
       
       if (tokenDecoded){
        req.user = tokenDecoded;
       } else {
        return res.status(401).json({success: false, message: 'Not Authorized. Login Again'})
       }

       next();

    } catch (error) {
        next(errorHandler(500, "Internal Server Error"));
    }
};

export default authMiddleware;