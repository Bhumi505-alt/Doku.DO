import mongoose from "mongoose";

const schema = new mongoose.Schema({
    title: {
    type: String,
    required: true,
    trim: true
  },
   description: {
    type: String,
     trim: true,
    default: "",
    required: false
  
  }, 
  completed: {
    type: Boolean,
   
    default: false 
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // jo collection ka name hai vo dena 
    required: true 
  },
  createdAt:{
    type:Date,
    default: Date.now
  }
}, { timestamps: true });
// MAKING USER

export const Task = mongoose.model("Task" , schema);
