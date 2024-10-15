import jwt from "jsonwebtoken";
import User from "../model/userModel.js";

// Middleware to require admin access
export const requireAdmin = async (req, res, next) => {
  // Get the token from the request header
  const token = req.header("Authorization")?.replace("Bearer ", "");

  // Check if no token is provided
  if (!token) {
    return res.status(403).send({ message: "No token provided." });
  }

  try {
    // Verify the token with the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user by ID in the decoded token
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).send({ message: "User not found." });
    }

    // Check if the user has admin privileges
    if (user.role !== "admin") {
      return res.status(403).send({ message: "Access denied." });
    }

    // Proceed to the next middleware or route handler
    next();
    // res.status(200).send({ user: user.username});

  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res
        .status(401)
        .send({ message: "Session expired. Please login again." });
    }

    console.error(err); // Log for debugging
    return res.status(401).send({ message: "Unauthorized!" });
  }
};

// Middleware to require user access
export const requireUser = async (req, res, next) => {
  // Get the token from the request header
  const token = req.header("Authorization")?.replace("Bearer ", "");

  // Check if no token is provided
  if (!token) {
    return res.status(403).send({ message: "No token provided." });
  }

  try {
    // Verify the token with the secret key
    jwt.verify(token, process.env.JWT_SECRET);

    // Proceed to the next middleware or route handler
    next();
  } catch (err) {
    console.error(err); // Log the error for debugging
    return res.status(401).send({ message: "Unauthorized!" });
  }
};
