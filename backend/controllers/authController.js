import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/features.js";

export const register = async (req, res) => {
  try {
    const { username, email, password, confirm_password } = req.body;

    // Email validation using regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: "Invalid email" });
    }

    //If user already exists
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    if (password !== confirm_password) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create a new user

    user = await User.create({
      username,
      email,
      password: hashedPassword,
      role: "user",
    });

    sendCookie(user, res, "User registered successfully", 201);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

//TODO: Do not let the user login if he is already logged in

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check if user exists
    let user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(400).json({ message: "User not found!" });
    }

    // check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    sendCookie(user, res, "User logged in successfully", 200);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie("token", null, {
      httpOnly: true,
      expires: new Date(0),
      sameSite: "none",
    });

    res.status(200).json({
      success: true,
      message: "User logged out successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
