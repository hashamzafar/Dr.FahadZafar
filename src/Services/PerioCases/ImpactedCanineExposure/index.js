import express from "express"
import CanineExposureModel from "./schema.js"
import createError from "http-errors"
import cloudinary from "../../utils/cloudinary.js"
// const { CloudinaryStorage } = "multer-storage-cloudinary"
import multer from "multer";
import msc from 'multer-storage-cloudinary'
const ImpactedCanineExposureRouter = express.Router()
const cloudinaryStorage = new msc.CloudinaryStorage({
    cloudinary,
    params: { folder: "ImpactedCanineExposure" },
});

const parser = multer({ storage: cloudinaryStorage })



ImpactedCanineExposureRouter.post('/', async (req, res, next) => {
    try {
        const newCanineExposure = await new CanineExposureModel(req.body)
        const { _id } = await newCanineExposure.save()

        return res.status(201).send({ _id })

    } catch (error) {

        next(error)
        console.log(error)
    }
})


ImpactedCanineExposureRouter.post('/:id/img', parser.single("image"), async (req, res, next) => {
    try {
        console.log("this is file", req);

        if (req.file) {
            const update = { image: req.file.path }
            await CanineExposureModel.findByIdAndUpdate(req.params.id, update, { returnOriginal: true })
            res.status(201).send("done")
        } else res.status(500).send("no image")


    } catch (error) {

        next(error)
        console.log(error)
    }
})




ImpactedCanineExposureRouter.get('/', async (req, res, next) => {
    try {
        const canineExposure = await CanineExposureModel.find()
        res.send(canineExposure)
    } catch (error) {
        next(error)
    }
})
// ImpactedCanineExposureRouter.post('/', async (req, res, next) => {
//     try {
//         const newCanineExposure = new CanineExposureModel(req.body)
//         const { _id } = await newCanineExposure.save()
//         res.status(201).send({ _id })

//     } catch (error) {
//         next(error)
//     }
// })

ImpactedCanineExposureRouter.get('/:_id', async (req, res, next) => {
    try {
        const canineExposureId = req.params._id
        const canineExposure = await CanineExposureModel.findById(canineExposureId)
        res.send(canineExposure)
    } catch (error) {
        next(error)
    }
})
ImpactedCanineExposureRouter.put('/:_id', async (req, res, next) => {
    try {
        const canineExposureId = req.params._id
        const modifiedCanineExposure = await CanineExposureModel.findByIdAndUpdate(canineExposureId, req.body, {
            new: true
        })
        if (modifiedCanineExposure) {
            res.send(modifiedCanineExposure)
        } else {
            next(createError(404, `Article with id ${canineExposureId} is modified`))
        }
    } catch (error) {

    }
})
ImpactedCanineExposureRouter.delete('/:_id', async (req, res, next) => {
    try {
        const canineExposureId = req.params._id
        const deletedCanineExposure = await CanineExposureModel.findByIdAndDelete(canineExposureId)
        if (deletedCanineExposure) {
            res.status(204).send(`Article with id ${canineExposureId} is deleted`)
        } else {
            next(createError(404, `Article with id ${canineExposureId} not found!`))
        }

    } catch (error) {
        next(error)
    }
})


export default ImpactedCanineExposureRouter;