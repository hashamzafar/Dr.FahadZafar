import express from "express";
import ImplantSurgeryModel from "./schema.js"
import createError from "http-errors"
import cloudinary from "../../utils/cloudinary.js"
import multer from "multer";
import msc from 'multer-storage-cloudinary'
const ImplantSurgeryRouter = express.Router()

const cloudinaryStorage = new msc.CloudinaryStorage({
    cloudinary,
    params: { folder: "implantSurgery" },
});

const parser = multer({ storage: cloudinaryStorage })


ImplantSurgeryRouter.post('/', async (req, res, next) => {
    try {
        const newImplantSurgery = await new ImplantSurgeryModel(req.body)
        const { _id } = await newImplantSurgery.save()

        return res.status(201).send({ _id })

    } catch (error) {

        next(error)
        console.log(error)
    }
})


ImplantSurgeryRouter.post('/:id/img', parser.single("image"), async (req, res, next) => {
    try {
        console.log("this is file", req);

        if (req.file) {
            const update = { image: req.file.path }
            await ImplantSurgeryModel.findByIdAndUpdate(req.params.id, update, { returnOriginal: true })
            res.status(201).send("done")
        } else res.status(500).send("no image")


    } catch (error) {

        next(error)
        console.log(error)
    }
})


ImplantSurgeryRouter.get('/', async (req, res, next) => {
    try {
        const implantSurgery = await ImplantSurgeryModel.find()
        res.send(implantSurgery)
    } catch (error) {
        next(error)
    }
})
ImplantSurgeryRouter.post('/', async (req, res, next) => {
    try {
        const newImplantSurgery = new ImplantSurgeryModel(req.body)
        const { _id } = await newImplantSurgery.save()
        res.status(201).send({ _id })

    } catch (error) {
        next(error)
    }
})

ImplantSurgeryRouter.get('/:_id', async (req, res, next) => {
    try {
        const implantSurgeryId = req.params._id
        const ImplantSurgery = await ImplantSurgeryModel.findById(implantSurgeryId)
        res.send(ImplantSurgery)
    } catch (error) {
        next(error)
    }
})
ImplantSurgeryRouter.put('/:_id', async (req, res, next) => {
    try {
        const implantSurgeryId = req.params._id
        const modifiedImplantSurgery = await ImplantSurgeryModel.findByIdAndUpdate(implantSurgeryId, req.body, {
            new: true
        })
        if (modifiedImplantSurgery) {
            res.send(modifiedImplantSurgery)
        } else {
            next(createError(404, `Article with id ${implantSurgeryId} is modified`))
        }
    } catch (error) {

    }
})
ImplantSurgeryRouter.delete('/:_id', async (req, res, next) => {
    try {
        const implantSurgeryId = req.params._id
        const deletedImplantSurgery = await ImplantSurgeryModel.findByIdAndDelete(implantSurgeryId)
        if (deletedImplantSurgery) {
            res.status(204).send(`Article with id ${implantSurgeryId} is deleted`)
        } else {
            next(createError(404, `Article with id ${implantSurgeryId} not found!`))
        }

    } catch (error) {
        next(error)
    }
})


export default ImplantSurgeryRouter;