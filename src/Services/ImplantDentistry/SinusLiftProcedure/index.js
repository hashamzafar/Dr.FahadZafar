import express from "express";
import SinusLiftModel from "./schema.js"
import createError from "http-errors"
import cloudinary from "../../utils/cloudinary.js"
// const{ CloudinaryStorage } = "multer-storage-cloudinary"
import multer from "multer";
import msc from 'multer-storage-cloudinary'
const SinusLiftRouter = express.Router()


const cloudinaryStorage = new msc.CloudinaryStorage({
    cloudinary,
    params: { folder: "SinusLift" },
});

const parser = multer({ storage: cloudinaryStorage })


SinusLiftRouter.post('/', async (req, res, next) => {
    try {
        const newSinusLift = await new SinusLiftModel(req.body)
        const { _id } = await newSinusLift.save()

        return res.status(201).send({ _id })

    } catch (error) {

        next(error)
        console.log(error)
    }
})


SinusLiftRouter.post('/:id/img', parser.single("image"), async (req, res, next) => {
    try {
        console.log("this is file", req);

        if (req.file) {
            const update = { image: req.file.path }
            await SinusLiftModel.findByIdAndUpdate(req.params.id, update, { returnOriginal: true })
            res.status(201).send("done")
        } else res.status(500).send("no image")


    } catch (error) {

        next(error)
        console.log(error)
    }
})


SinusLiftRouter.get('/', async (req, res, next) => {
    try {
        const sinusLift = await SinusLiftModel.find()
        res.send(sinusLift)
    } catch (error) {
        next(error)
    }
})
SinusLiftRouter.post('/', async (req, res, next) => {
    try {
        const newSinusLift = new SinusLiftModel(req.body)
        const { _id } = await newSinusLift.save()
        res.status(201).send({ _id })

    } catch (error) {
        next(error)
    }
})

SinusLiftRouter.get('/:_id', async (req, res, next) => {
    try {
        const sinusLiftId = req.params._id
        const SinusLift = await SinusLiftModel.findById(sinusLiftId)
        res.send(SinusLift)
    } catch (error) {
        next(error)
    }
})
SinusLiftRouter.put('/:_id', async (req, res, next) => {
    try {
        const sinusLiftId = req.params._id
        const modifiedSinusLift = await SinusLiftModel.findByIdAndUpdate(sinusLiftId, req.body, {
            new: true
        })
        if (modifiedSinusLift) {
            res.send(modifiedSinusLift)
        } else {
            next(createError(404, `Article with id ${sinusLiftId} is modified`))
        }
    } catch (error) {

    }
})
SinusLiftRouter.delete('/:_id', async (req, res, next) => {
    try {
        const sinusLiftId = req.params._id
        const deletedSinusLift = await SinusLiftModel.findByIdAndDelete(sinusLiftId)
        if (deletedSinusLift) {
            res.status(204).send(`Article with id ${sinusLiftId} is deleted`)
        } else {
            next(createError(404, `Article with id ${sinusLiftId} not found!`))
        }

    } catch (error) {
        next(error)
    }
})


export default SinusLiftRouter;