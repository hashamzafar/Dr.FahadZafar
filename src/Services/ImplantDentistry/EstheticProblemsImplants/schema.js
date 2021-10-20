import mongoose from "mongoose";


const { Schema, model } = mongoose

const EstheticProblemSchema = new Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        image: { type: String, required: true }


    },
    { timestamp: true }
)



export default model("estheticProblem", EstheticProblemSchema)