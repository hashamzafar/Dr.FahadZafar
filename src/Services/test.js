import express from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

const testRouter = express.Router();

export const storage = new CloudinaryStorage({
    cloudinary,
    params: { folder: "testing" },
});

testRouter.post('/', multer({ storage }).single("image"), async (req, res, next) => {
    try {
        console.log(req.file.path)

    } catch (error) {
        next(error)
        console.log(error)
    }
})
export default testRouter