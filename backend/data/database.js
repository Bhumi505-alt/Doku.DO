import mongoose from "mongoose";
mongoose.set('debug', true);
export const connectDB = ()=>{mongoose.connect("mongodb+srv://khannabhumik56:DflmZ2Jyors6I4bv@cluster0.tj0nyek.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",{
    dbName:"backendapi",

}).then(c=>console.log("data base connected"));}
/// make a fucntion for connecting database