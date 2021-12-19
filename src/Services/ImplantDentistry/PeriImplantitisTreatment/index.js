import express from "express";
import PeriImplantitisModel from "./schema.js"
import createError from "http-errors"
import cloudinary from "../../utils/cloudinary.js"
// const { CloudinaryStorage } = "multer-storage-cloudinary"
import multer from "multer";
import msc from 'multer-storage-cloudinary'
const PeriImplantitisRouter = express.Router()

const cloudinaryStorage = new msc.CloudinaryStorage({
    cloudinary,
    params: { folder: "PeriImplantitis" },
});

const parser = multer({ storage: cloudinaryStorage })


PeriImplantitisRouter.post('/', async (req, res, next) => {
    try {
        const newPeriImplantitis = await new PeriImplantitisModel(req.body)
        const { _id } = await newPeriImplantitis.save()

        return res.status(201).send({ _id })

    } catch (error) {

        next(error)
        console.log(error)
    }
})


PeriImplantitisRouter.post('/:id/img', parser.single("image"), async (req, res, next) => {
    try {
        console.log("this is file", req);

        if (req.file) {
            const update = { image: req.file.path }
            await PeriImplantitisModel.findByIdAndUpdate(req.params.id, update, { returnOriginal: true })
            res.status(201).send("done")
        } else res.status(500).send("no image")


    } catch (error) {

        next(error)
        console.log(error)
    }
})


PeriImplantitisRouter.get('/', async (req, res, next) => {
    try {
        const periImplantitis = await PeriImplantitisModel.find()
        res.send(periImplantitis)
    } catch (error) {
        next(error)
    }
})
PeriImplantitisRouter.post('/', async (req, res, next) => {
    try {
        const newPeriImplantitis = new PeriImplantitisModel(req.body)
        const { _id } = await newPeriImplantitis.save()
        res.status(201).send({ _id })

    } catch (error) {
        next(error)
    }
})

PeriImplantitisRouter.get('/:_id', async (req, res, next) => {
    try {
        const periImplantitisId = req.params._id
        const PeriImplantitis = await PeriImplantitisModel.findById(periImplantitisId)
        res.send(PeriImplantitis)
    } catch (error) {
        next(error)
    }
})
PeriImplantitisRouter.put('/:_id', async (req, res, next) => {
    try {
        const periImplantitisId = req.params._id
        const modifiedPeriImplantitis = await PeriImplantitisModel.findByIdAndUpdate(periImplantitisId, req.body, {
            new: true
        })
        if (modifiedPeriImplantitis) {
            res.send(modifiedPeriImplantitis)
        } else {
            next(createError(404, `Article with id ${periImplantitisId} is modified`))
        }
    } catch (error) {

    }
})
PeriImplantitisRouter.delete('/:_id', async (req, res, next) => {
    try {
        const periImplantitisId = req.params._id
        const deletedPeriImplantitis = await PeriImplantitisModel.findByIdAndDelete(periImplantitisId)
        if (deletedPeriImplantitis) {
            res.status(204).send(`Article with id ${periImplantitisId} is deleted`)
        } else {
            next(createError(404, `Article with id ${periImplantitisId} not found!`))
        }

    } catch (error) {
        next(error)
    }
})


export default PeriImplantitisRouter;