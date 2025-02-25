import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({

    fullName:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        enum:["male","female"],
        required:true
    },
    profilePhoto:{
        type:String,

    }

},{timestamps:true});

export const User = mongoose.model("User",userSchema);