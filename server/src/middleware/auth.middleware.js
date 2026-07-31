import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const protect = async (req, res, next) => {
  try {
    // Read Authorization header
    const authHeader = req.headers.authorization;
    //Authorization: Bearer eyJhbGc...

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Not authorized",
      });
    }

    // Extract token
    const token = authHeader.split(" ")[1]; 
    // authHeader format: "Bearer <token>", so we split by space and take the second part (the token itself). at index 1

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //returns the payload of the token, which contains the user ID and other information.

    // Find user, fetch user
    const user = await User.findById(decoded.id).select("-password");
    //return the user object without the password field

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    // Attach user to request
    req.user = user;
    //benefit: controllers use the user object without querying the database again.

    next();
    
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};

export default protect;