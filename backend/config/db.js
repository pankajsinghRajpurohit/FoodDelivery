import mongoose from'mongoose';
export const connectDB =()=>{
    mongoose.connect("mongodb+srv://FoodWeb:foodweb@food-web.k6zscex.mongodb.net/?retryWrites=true&w=majority&appName=Food-Web").then(()=>{
        console.log("db connected")
    })
}