import express from "express";
import GuidedBoneModel from "./schema.js"
import createError from "http-errors"
import cloudinary from "../../utils/cloudinary.js"
// const { CloudinaryStorage } = "multer-storage-cloudinary"
import multer from "multer";
import msc from 'multer-storage-cloudinary'
const GuidedBoneRouter = express.Router()





const cloudinaryStorage = new msc.CloudinaryStorage({
    cloudinary,
    params: { folder: "guidedbone" },
});

const parser = multer({ storage: cloudinaryStorage })


GuidedBoneRouter.post('/', async (req, res, next) => {
    try {
        const newGuidedBone = await new GuidedBoneModel(req.body)
        const { _id } = await newGuidedBone.save()

        return res.status(201).send({ _id })

    } catch (error) {

        next(error)
        console.log(error)
    }
})


GuidedBoneRouter.post('/:id/img', parser.single("image"), async (req, res, next) => {
    try {
        console.log("this is file", req);

        if (req.file) {
            const update = { image: req.file.path }
            await GuidedBoneModel.findByIdAndUpdate(req.params.id, update, { returnOriginal: true })
            res.status(201).send("done")
        } else res.status(500).send("no image")


    } catch (error) {

        next(error)
        console.log(error)
    }
})

GuidedBoneRouter.get('/', async (req, res, next) => {
    try {
        const guidedBone = await GuidedBoneModel.find()
        res.send(guidedBone)
    } catch (error) {
        next(error)
    }
})
GuidedBoneRouter.post('/', async (req, res, next) => {
    try {
        const newGuidedBone = new GuidedBoneModel(req.body)
        const { _id } = await newGuidedBone.save()
        res.status(201).send({ _id })

    } catch (error) {
        next(error)
    }
})

GuidedBoneRouter.get('/:_id', async (req, res, next) => {
    try {
        const guidedBoneId = req.params._id
        const GuidedBone = await GuidedBoneModel.findById(guidedBoneId)
        res.send(GuidedBone)
    } catch (error) {
        next(error)
    }
})
GuidedBoneRouter.put('/:_id', async (req, res, next) => {
    try {
        const guidedBoneId = req.params._id
        const modifiedGuidedBone = await GuidedBoneModel.findByIdAndUpdate(guidedBoneId, req.body, {
            new: true
        })
        if (modifiedGuidedBone) {
            res.send(modifiedGuidedBone)
        } else {
            next(createError(404, `Article with id ${guidedBoneId} is modified`))
        }
    } catch (error) {

    }
})
GuidedBoneRouter.delete('/:_id', async (req, res, next) => {
    try {
        const guidedBoneId = req.params._id
        const deletedGuidedBone = await GuidedBoneModel.findByIdAndDelete(guidedBoneId)
        if (deletedGuidedBone) {
            res.status(204).send(`Article with id ${guidedBoneId} is deleted`)
        } else {
            next(createError(404, `Article with id ${guidedBoneId} not found!`))
        }

    } catch (error) {
        next(error)
    }
})


export default GuidedBoneRouter;