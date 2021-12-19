import mongoose from "mongoose";


const { Schema, model } = mongoose

const GuidedBoneSchema = new Schema(
    {
        title: { type: String, required: false },
        description: { type: String, required: false },
        image: { type: String, required: false }

    },
    { timestamps: true }
)



export default model("guidedBone", GuidedBoneSchema)