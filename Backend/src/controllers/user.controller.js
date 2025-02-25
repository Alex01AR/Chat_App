import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import bcrypt from "bcrypt"
import { User } from "../models/user.model.js"
import jwt from "jsonwebtoken"


 const registerUser = asyncHandler(async(req, res) => {
    try {
        const { fullName, username, password, confirmPassword, gender } = req.body;
// console.log("fnmae",fullName);
// console.log("username",username);
// console.log("password",password);
// console.log("cpass",confirmPassword);
// console.log("gender",gender);



        if (!fullName || !username || !password || !confirmPassword || !gender) {
            throw new ApiError(400, "All fields are required!")
        }
        if (password !== confirmPassword) {
            throw new ApiError(400, "Password is not same!")
        }

        const user = await User.findOne({ username });
        if (user) {
            
            throw new ApiError(400, "Username already exit try different")
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        // profilePhoto
        const maleProfilePhoto = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const femaleProfilePhoto = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        await User.create({
            fullName,
            username,
            password: hashedPassword,
            profilePhoto: gender === "male" ? maleProfilePhoto : femaleProfilePhoto,
            gender
        });
        return res.status(201).json(
            new ApiResponse(200, "User registered Successfully")
        )
    } catch (error) {
        throw new ApiError(400,"Error in user Register ",error);
    }
});

const loginUser = asyncHandler(async(req,res) => {

    const {username,password} = req.body
    if(!username || !password){
        throw new ApiError(400,"All filed is Required!");
    }
    const user =await User.findOne({username});
    if(!user){
        throw new ApiError(400,"User not find!");

    }
    const checkpassword  = await bcrypt.compare(password,user.password);
    if(!checkpassword){
        throw new ApiError(400,"Password not match");
    }
    const tokenData = {
        userId: user._id
    };
    const token = await jwt.sign(tokenData, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' });
// const user = await User.findById(user1?._id).select("-password")

    return res.status(200)
    .cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'strict' })
    .json(
        new ApiResponse(
            200,
            {
                _id: user._id,
                username: user.username,
                fullName: user.fullName,
                profilePhoto: user.profilePhoto
               
                
            },
            "User logged in successfully"
        )
    );

})

const logoutUser = asyncHandler(async (req, res) => {
    // Clear cookies by setting them to expire in the past
    res.cookie("token", "", {
      httpOnly: true,
      secure: true,
      expires: new Date(0), // Expire the cookie immediately
    });
  
    // Send a success response
    return res
      .status(200)
      .json(new ApiResponse(200, {}, "User logged out successfully"));
  });


   const getOtherUsers = asyncHandler(async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        // console.log("loggeddinuser",loggedInUserId);
        const otherUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

        return res.status(200)
        .json(
            new ApiResponse(200,otherUsers,"other Users")
            )
          
    } catch (error) {
        throw new ApiError(400,"Error in LOgout",error);
    }
});


export {
    registerUser,
    loginUser,
    logoutUser,
    getOtherUsers
}