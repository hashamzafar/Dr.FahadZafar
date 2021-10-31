import express from "express";
import CrownModel from "./Schema.js"
import createError from "http-errors"
import cloudinary from "../../utils/cloudinary.js"
// import { multer } from "../../utils/multer.js"
// const upload = ("../../../utils/multer.js")

const CrownLengthRouter = express.Router();

CrownLengthRouter.post('/', async (req, res) => {
    try {
        const fileStr = req.body.data
        const uploadedResponse = await cloudinary.uploader.upload(fileStr, { upload_present: 'ml_default' })
        console.log(uploadResponse)
        res.json({ msg: "image uploaded" })
    } catch (error) {
        console.error(error)
        res.status(500).json({ err: "something went wrong" })
    }
})


CrownLengthRouter.post('/', async (req, res, next) => {
    try {
        const newCrownLength = new CrownModel(req.body)

        const { _id } = await newCrownLength.save()
        res.status(201).send({ _id })

    } catch (error) {
        next(error)
        console.log(error)
    }
})
CrownLengthRouter.get('/', async (req, res, next) => {
    try {
        const crownlength = await CrownModel.find()
        res.send(crownlength)
    } catch (error) {
        next(error)
    }
})
CrownLengthRouter.get('/:_id', async (req, res, next) => {
    try {
        const crownLengthId = req.params._id
        const crownlength = await CrownModel.findById(crownLengthId)
        res.send(crownlength)
    } catch (error) {
        next(error)
    }
})
CrownLengthRouter.put('/:_id', async (req, res, next) => {
    try {
        const crownLengthId = req.params._id
        const modifiedCrownLength = await CrownModel.findByIdAndUpdate(crownLengthId, req.body, {
            new: true
        })
        if (modifiedCrownLength) {
            res.send(modifiedCrownLength)
        } else {
            next(createError(404, `Article with id ${crownLengthId} is modified`))
        }
    } catch (error) {

    }
})
CrownLengthRouter.delete('/:_id', async (req, res, next) => {
    try {
        const crownLengthId = req.params._id
        const deletedCrownLength = await CrownModel.findByIdAndDelete(crownLengthId)
        if (deletedCrownLength) {
            res.status(204).send(`Article with id ${crownLengthId} is deleted`)
        } else {
            next(createError(404, `Article with id ${crownLengthId} not found!`))
        }

    } catch (error) {
        next(error)
    }
})


export default CrownLengthRouter;

