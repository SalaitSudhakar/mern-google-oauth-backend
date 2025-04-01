import User from "../Models/userModel.js";
import bcrypt from "bcryptjs";
import { errorHandler } from "../Utills/error.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    // validate datas
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "username, email, Password all are required",
      });
    }

    // Check for existing user with the same email
    const existingUser = await User.findOne({ email });

    // return if user already exist
    if (existingUser) {
      return res
        .status(409)
        .json({ success: false, message: "User already exists" });
    }

    // If user is not already exist , create new user
    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // store the user details in the database
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    return res.status(201).json({ message: "User Registered successfully" });
  } catch (error) {
    next(error);
  }
};

export const signIn = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(errorHandler(400, "Both email and password required"));
  }

  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, "User Not found"));

    const validPassword = await bcrypt.compare(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "Invalid Credentials"));

    const { password: hashPassword, ...rest } = validUser._doc;
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    console.log("data", rest);

    res.cookie("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "None" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // convert 7days into milli seconds
    });

    res
      .status(200)
      .json({
        success: true,
        message: "User loggedin successfully",
        user: rest,
      });
  } catch (error) {
    next(error);
  }
};

export const google = async (req, res, next) => {
  if (!req.body || !req.body.email) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid request data" });
  }
  try {
    const user = await User.findOne({ email: req.body.email });
    console.log(user);
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: hashedPassword, ...rest } = user._doc;

      res.cookie("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "None" : "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // convert 7days into milli seconds
      });

      res
        .status(200)
        .json({
          success: true,
          message: "User Loggedin successfully",
          user: rest,
        });
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = await bcrypt.hash(generatedPassword, 10);

      const username =
        req.body.name.split(" ").join("").toLowerCase() +
        Math.random().toString().slice(-8);

      const email = req.body.email;

      const profile = req.body.photo;

      const newUser = new User({
        username,
        email,
        password: hashedPassword,
        profile,
      });

      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password: hashedPassword2, ...rest } = newUser._doc;

      res.cookie("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "None" : "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // convert 7days into milli seconds
      });

      res
        .status(201)
        .json({
          success: true,
          message: "User Registered successfully",
          user: rest,
        });
    }
  } catch (error) {
    next(error);
  }
};

export const signOut = async (req, res) => {
  res
    .clearCookie("access_token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "None" : "strict",
    })
    .status(200)
    .json("User logged out successfully");
};
