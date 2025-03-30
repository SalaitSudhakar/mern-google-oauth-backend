import User from "../Models/userModel.js";
import bcrypt from 'bcryptjs';
import { errorHandler } from "../Utills/error.js";

export const signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    // validate datas
    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Missing Details" });
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

    return res.status(201).json({message: "User Registered successfully"})
  } catch (error) {
    next(error)
  }
};
