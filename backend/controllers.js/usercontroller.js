import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { sendCookies } from "../utils/features.js";


export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.json({
      success: true,
      users,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ success: false, message: "User already exists." });
    }

const hashedPassword = await bcrypt.hash(password,10)


    const user = await User.create({ name, email, password: hashedPassword });

    sendCookies(user, res, "Registered successfully", 201)


  
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getUserDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user)
      return res.status(404).json({ success: false, message: "User not found" });

    res.json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


 export const login = async (req,res)=>{


  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email }).select("+password");
    if (!existingUser) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

const isMatch = await bcrypt.compare(password,existingUser.password);
 if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }
    sendCookies(existingUser, res, `welcome back ${existingUser.name}`, 201)


  
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }


 }

 export const getMyProfile = (req,res)=>{



res.status(200).json({
  success:true,
  user:req.user,
});

 };

export const logout = (req, res) => {
  res
    .status(200)
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(0), // clears the cookie
      sameSite: "lax",      // adjust based on frontend-backend origin
      secure: false         // set to true if using HTTPS
    })
    .json({
      success: true,
      message: "Logged out successfully",
    });
};
