import mongoose from "mongoose";


const { Schema, model } = mongoose

const EstheticProblemSchema = new Schema(
    {
        title: { type: String, required: false },
        description: { type: String, required: false },
        image: { type: String, required: false }


    },
    { timestamp: true }
)



export default model("estheticProblem", EstheticProblemSchema)