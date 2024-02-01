import express from "express";
import multer from "multer";
import * as box from "../controller/boxController.js"


const route = express.Router();

//###############MULTER STORAGE###############
const boxImageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/images");
    },
    filename: (req, file, cb) => {
        const filetype = file.mimetype.split("/").at(-1);
        cb(null, `${file.fieldname}_${Date.now()}.${filetype}`);
    },
});

const boxImageUpload = multer({
    storage: boxImageStorage,
});


route.put("/addbox", boxImageUpload.single("box_image"), box.addBox);


export default route;