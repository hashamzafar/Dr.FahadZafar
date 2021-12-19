import mongoose from "mongoose";


const { Schema, model } = mongoose

const ImplantSurgerySchema = new Schema(
    {
        title: { type: String, required: false },
        description: { type: String, required: false },
        image: { type: String, required: false }

    },
    { timestamp: true }
)



export default model("implantSurgery", ImplantSurgerySchema)