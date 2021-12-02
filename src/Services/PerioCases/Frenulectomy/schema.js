import mongoose from "mongoose";


const { Schema, model } = mongoose

const FrenulectomySchema = new Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        image: { type: String, required: false }

    },
    { timestamp: true }
)



export default model("frenulectomy", FrenulectomySchema)