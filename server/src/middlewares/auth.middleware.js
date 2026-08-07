import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

//verify the token and attach the user to the request object for further use in controllers.
const protect = async (req, res, next) => {
  try {
    const token = // Check for token in cookies or authorization header
    req.cookies.token || (req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
      ? req.headers.authorization.split(" ")[1]
      : null);
  

if (!token) {
  return res.status(401).json({
    success: false,
    message: "Not authorized",
  });
}

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

    next(); // Call the next middleware or route handler, 
    
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};

export default protect;