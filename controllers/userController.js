
import UserModel from "../models/User.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

class UserContoller {
    static userRegistration = async (req, res) => {
        const { name, email, password, password_confirmation, tc } = req.body;

        const user = await UserModel.findOne({ email: email })

        if (user) {
            res.send({ "status": "failed", "message": "Email already exists" })
        }
        else {
            if(name && email && password && password_confirmation && tc)
            {
                if(password === password_confirmation)
                {
                    try {
                        const salt = await bcrypt.genSalt(10);

                        const hashPassword = await bcrypt.hash(password, salt);
    
                        const doc = new UserModel({
                            name: name,
                            email: email,
                            password: hashPassword,
                            tc: tc
                        })

                        await doc.save();
  
                        // creating jwt token
                        const saved_user = await UserModel.findOne({email:email});
                        const token = jwt.sign({userID: saved_user._id}, process.env.JWT_SECRET_KEY, {expiresIn: '5d'})

                        res.status(201).send({ "status": "success", "message": "Registered Successfully", "token": token})
    
                    } catch (error) {
                        res.send({ "status": "failed", "message": "Unable to Register"})
                    }
                }else{
                    res.send({ "status": "failed", "message": "Password and Confirm Password doesn't match"})
                }
            }
            else{
                res.send({ "status": "failed", "message": "All fields are required"})
            }
        }
    }

    static userLogin = async (req, res) => {
        try {
            const {email, password} = req.body;

            if(email && password)
            {
                const user = await UserModel.findOne({email: email});

                if(user != null)
                {
                    const isMatch = await bcrypt.compare(password, user.password);
                    if((user.email === email) && isMatch)
                    {
                        // creating jwt token
                        const token = jwt.sign({userID: user._id}, process.env.JWT_SECRET_KEY, {expiresIn: '5d'})

                        res.send({ "status": "success", "message": "Login Success", "token": token})
                    }else{
                        res.send({ "status": "failed", "message": "Email or Password doestn't Match..."})
                    }
                }
                else{
                    res.send({ "status": "failed", "message": "You are not a registered User"})
                }
            }
            else{
                res.send({ "status": "failed", "message": "All fields are required"})
            }
        } catch (error) {
            res.send({ "status": "failed", "message": "Unable to Login"})
        }
    }
    
    static changeUserPassword = async (req, res) => {
        const {password, password_confirmation} = req.body;
        
        if(password && password_confirmation)
        {
            if(password === password_confirmation)
            {
                const salt = await bcrypt.genSalt(10);
                const hashPassword = await bcrypt.hash(password, salt);
                res.send({ "status": "success", "message": "Password changed successfully"})
            }
            else
            {
                res.send({ "status": "failed", "message": "Password and Confirm password doesn't match."})
            }
        }
        else
        {    
            res.send({ "status": "failed", "message": "All Fields are Required"})
        }

    }
}

export default UserContoller;

