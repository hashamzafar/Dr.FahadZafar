import express from "express"
import CrownModel from "./Schema.js"
import createError from "http-errors"
import cloudinary from "../../utils/cloudinary.js"
// const { CloudinaryStorage } = "multer-storage-cloudinary"
import multer from "multer";
import msc from 'multer-storage-cloudinary'
const CrownLengthRouter = express.Router();

const cloudinaryStorage = new msc.CloudinaryStorage({
    cloudinary,
    params: { folder: "crowns" },
});

const parser = multer({ storage: cloudinaryStorage })



CrownLengthRouter.post('/', async (req, res, next) => {
    try {
        const newCrownLength = await new CrownModel(req.body)
        const { _id } = await newCrownLength.save()

        return res.status(201).send({ _id })

    } catch (error) {

        next(error)
        console.log(error)
    }
})


CrownLengthRouter.post('/:id/img', parser.single("image"), async (req, res, next) => {
    try {
        console.log("this is file", req);
        /* const newCrownLength = await new CrownModel(req.body)
        const { _id } = await newCrownLength.save() */
        if (req.file) {
            const update = { image: req.file.path }
            await CrownModel.findByIdAndUpdate(req.params.id, update, { returnOriginal: true })
            res.status(201).send("done")
        } else res.status(500).send("no image")


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
        const modifiedCrownLength = await CrownModel.findByIdAndUpdate(crownLengthId,
            { $set: req.body },
            { new: true })
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

