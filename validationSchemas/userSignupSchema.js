import {object,string} from 'yup';
import userModel from '../models/userModel.js';

const userSignupSchema = object({
    signupUsername: string().min(3).max(30).required().test("userUnique","a user with this name already exists",async (username) => {
        
        const userExist = await userModel.findOne({
            userName: username,
        });
        
        return userExist? false: true;
    }),
    signupPassword: string().min(8).max(30).required(),
    signupCurrentUserLocation: string().required()
});

export default userSignupSchema;  