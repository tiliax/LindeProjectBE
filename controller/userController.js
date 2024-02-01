import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

export const signup = async (req, res, next) => {
    try {
        const {
            signupUsername,
            signupPassword,
            signupCurrentUserLocation,
        } = req.body;
                
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(signupPassword, salt);
        const encryptedSignupPassword = hashPassword;

        const newUser = await userModel.create({
            userName: signupUsername,
            userPassword: encryptedSignupPassword,
            userLocation: signupCurrentUserLocation,
            userBoxes: [],
        });

        const token = await jwt.sign(
            { id: newUser._id },
            process.env.JWT_SECRET_KEY,
            { expiresIn: process.env.JWT_EXPIRE },
        );
        
        return res.cookie("token", token).json({
            success: true,
            message: "User signup was successful",
            data: newUser,
        });
        
    } catch (error) {
        return res.json({ error: error });
    }
}

export const login = async (req, res) => {
    try {
        const { loginUsername, loginPassword } = req.body;
        if (!loginUsername || !loginPassword) {
            return res.json({ error: "All fields are required!" });
        }
        const userExist = await userModel.findOne({
            userName: loginUsername,
        });
        if (!userExist) return res.json({ message: "No such user!" });
        const isPasswordCorrect = await bcrypt.compare(
            loginPassword,
            userExist.userPassword,
        );
        if (!isPasswordCorrect) {
            return res.json({ error: "Wrong password!" });
        }
        const token = await jwt.sign(
            { id: userExist._id },
            process.env.JWT_SECRET_KEY,
            { expiresIn: process.env.JWT_EXPIRE },
        );
        return res.json({
            token,
            success: true,
            message: "Login was successful!",
            data: userExist,
        });
    } catch (error) {
        return res.json({ error: error });
    }
};