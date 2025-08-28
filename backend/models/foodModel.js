import mongoose, { Mongoose } from "mongoose";

const foodScehma =new mongoose.Schema({
    name : {type:String,required:true},
    description : {type:String,required:true},
    price : {type:Number,required:true},
    image : {type:String,required:true},
    category : {type:String,required:true},

})

const foodModel =mongoose.models.food || mongoose.model("food",foodScehma);
export default foodModel;