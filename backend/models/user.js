import express from "express";
import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name: {
    type: String,
    required: true,
    trim: true
  },
   email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  }, 
  password: {
    type: String,
    required: true,
    select: false 
  }
}, { timestamps: true });
// MAKING USER

export const User = mongoose.model("User" , schema);
