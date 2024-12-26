

import UserModel from "../models/userModel.js";
import bcryptjs from 'bcryptjs'
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import { sendVerificationEmail, sendWelcomeEmail } from "../nodemailer/emails.js";


export const signup = async (req, res) => {
    const {email, password, name} = req.body;

    try {
        if(!email || !password || !name){
            throw new Error("All fields are required");
        }
           
        const userAlreadyExists = await UserModel.findOne({email});

        if(userAlreadyExists){
            return res.status(400).json({success: false, message: "User already exists"})
        }

        const hashedPassword = await bcryptjs.hash(password, 12);

        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

        const user = new UserModel({
            email,
            password: hashedPassword,
            name,
            verificationToken,
            verificationExpiresAt: Date.now()+24*60*60*1000 //-> +24 hours
        })

        await user.save();

        // jwt creation
        generateTokenAndSetCookie(res, user._id, user.name);
        
        // mail verification code sending
        await sendVerificationEmail(user.email, verificationToken);

        res.status(201).json({
            success: true,
            message: 'User created successfully',
            user: {
                ...user._doc, // to avoid additional mongoose data
                password: undefined
            }
        })

    } catch (error) {
        res.status(400).json({success: false, message: error.message});
    }
}

export const verifyEmail = async (req, res) => {
    const {code} = req.body;

    try {
        const user = await UserModel.findOne({
            verificationToken: code,
            verificationExpiresAt: {$gt: Date.now()} //-> fetch that user whose verificationExpiresAt value is greater than current date and time
        })

        if(!user){
            return res.status(400).json({success: false, message: "Invalid or expired verification code"})
        }

        // if user found
        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationExpiresAt = undefined;

        await user.save();

        // after code verification sending a welcome email to the user
        await sendWelcomeEmail(user.email, user.name);

        res.status(200).json({
            success: true,
            message: "Email verified successfully",
            user: {
                ...user._doc,
                password: undefined
            }
        })

    } catch (error) {
        console.log("error in verifyEmail", error);
        res.status(500).json({success: false, message: error.message});   
    }
}

export const login = async (req, res) => {
    res.send("login Route")
}


export const logout = async (req, res) => {
    res.send("logout Route")
}

