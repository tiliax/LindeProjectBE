import express from "express";
import userModel from "../models/userModel.js";
import isAuthenticated from "../middleware/authMiddleware.js";
import userSignupSchema from "../validationSchemas/userSignupSchema.js"
import validation from "../middleware/validationMiddleware.js";
import * as user from "../controller/userController.js"

const route = express.Router();


//###############ROUTES###############
route.post("/signup",validation(userSignupSchema), user.signup);

route.post("/login", user.login);

route.get("/", isAuthenticated, (req, res) => {
    return res.json({ user: req.user });
});

route.delete("/delete", isAuthenticated, async (req, res) => {
    try {
        await userModel.findByIdAndDelete(req.user._id);
        res.json({ msg: "User Deleted Successfully!" });
        return;
    } catch (error) {
        console.error(error);
        res.status(500).json({
            err: error.message || "Error while deleting user",
        });
    }
});

export default route;
