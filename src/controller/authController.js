import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Userdata from "../model/userModel.js";

export const signup_post = async (req, res) => {
  // get data from body
  const { username, email, password,role } = req.body;

  try {
    // convert password to hash string
    const hashPassword = await bcrypt.hash(password, 10);

    // calling model and take data to it
    const user = new Userdata({
      username,
      email,
      password: hashPassword,
      role
    });

    // save data to model
    await user.save();
    // Set token expiration to 30 days (1 month)
    const expirer = 30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds
    // Calculate the exact expiration timestamp
    const expirationDate = Date.now() + expirer;

    // generate a token for the user
    const Token = jwt.sign(
      {
        id: user._id,
        username: user.username,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "30d",
      }
    );

    // Determine if the token is expired
    const isExpired = expirationDate < Date.now();

    res.status(200).send({
      message: "User registered successfully",
      token: Token,
      expiresIn: expirationDate,
      isExpired,
      redirectUrl: "/home",
    });
  } catch (err) {
    console.error("Error registering user:", err);
    res.status(500).send({
      message: "Error registering user",
      error: err.message,
    });
  }
};

export const login_post = async (req, res) => {
  try {
    // find user by email
    const user = await Userdata.findOne({ 
      $or: [{ email: req.body.nameOremail },{username: req.body.nameOremail}]
     });

    // if found user compare password instead
    if (user && (await bcrypt.compare(req.body.password, user.password))) {
      // Set token expiration to 30 days (1 month)
      const expirer = 1 * 60 * 60 * 1000; // 1 hour in milliseconds
      // Calculate the exact expiration timestamp
      const expirationDate = Date.now() + expirer;

      // generate a token for user
      const token = jwt.sign(
        {
          id: user._id,
          username: user.username,
          role: user.role,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      // Determine if the token is expired
      const isExpired = expirationDate < Date.now();

      // if user.role is admin
      if (user.role === "admin") {
        res.status(200).send({
          message: "Admin is accessible",
          token,
          expiresIn: expirationDate,
          isExpired,
          role: "admin",
          redirectUrl: "/admin/home",
        });
      }
      // if user.role is user
      else {
        res.status(200).send({
          message: "User is accessible",
          token,
          expiresIn: expirationDate,
          isExpired,
          role: "user",
          redirectUrl: "/home",
        });
      }
    } else {
      res.status(404).send({
        message: "User not found!",
      });
    }
  } catch (e) {
    console.error("Error login:", err);
    res.status(500).send({
      message: "Error login user",
      error: e.message,
    });
  }
};

export default {
  signup_post,
  login_post,
};
