
import mongoose from "mongoose";


const { Schema, model } = mongoose

const CanineExposureSchema = new Schema(
    {
        title: { type: String, required: true },
        article: { type: String, required: true }


    },
    { timestamp: true }
)



export default model("canineExposure", CanineExposureSchema)