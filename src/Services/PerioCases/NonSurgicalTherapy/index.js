import express from "express"
import NonSurgicalModel from "./schema.js"
import createError from "http-errors"
import cloudinary from "../../utils/cloudinary.js"
// const { CloudinaryStorage } = "multer-storage-cloudinary)"
import multer from "multer";
import msc from 'multer-storage-cloudinary'
const NonSurgicalRouter = express.Router()
const cloudinaryStorage = new msc.CloudinaryStorage({
    cloudinary,
    params: { folder: "nonsurgical" },
});

const parser = multer({ storage: cloudinaryStorage })



NonSurgicalRouter.post('/', async (req, res, next) => {
    try {
        const newNonSurgical = await new NonSurgicalModel(req.body)
        const { _id } = await newNonSurgical.save()

        return res.status(201).send({ _id })

    } catch (error) {

        next(error)
        console.log(error)
    }
})


NonSurgicalRouter.post('/:id/img', parser.single("image"), async (req, res, next) => {
    try {
        console.log("this is file", req);

        if (req.file) {
            const update = { image: req.file.path }
            await NonSurgicalModel.findByIdAndUpdate(req.params.id, update, { returnOriginal: true })
            res.status(201).send("done")
        } else res.status(500).send("no image")


    } catch (error) {

        next(error)
        console.log(error)
    }
})




NonSurgicalRouter.get('/', async (req, res, next) => {
    try {
        const nonSurgical = await NonSurgicalModel.find()
        res.send(nonSurgical)
    } catch (error) {
        next(error)
    }
})


NonSurgicalRouter.get('/:_id', async (req, res, next) => {
    try {
        const nonSurgicalId = req.params._id
        const nonSurgical = await NonSurgicalModel.findById(nonSurgicalId)
        res.send(nonSurgical)
    } catch (error) {
        next(error)
    }
})
NonSurgicalRouter.put('/:_id', async (req, res, next) => {
    try {
        const nonSurgicalId = req.params._id
        const modifiedNonSurgical = await NonSurgicalModel.findByIdAndUpdate(nonSurgicalId, req.body, {
            new: true
        })
        if (modifiedNonSurgical) {
            res.send(modifiedNonSurgical)
        } else {
            next(createError(404, `Article with id ${nonSurgicalId} is modified`))
        }
    } catch (error) {

    }
})
NonSurgicalRouter.delete('/:_id', async (req, res, next) => {
    try {
        const nonSurgicalId = req.params._id
        const deletedNonSurgical = await NonSurgicalModel.findByIdAndDelete(nonSurgicalId)
        if (deletedNonSurgical) {
            res.status(204).send(`Article with id ${nonSurgicalId} is deleted`)
        } else {
            next(createError(404, `Article with id ${nonSurgicalId} not found!`))
        }

    } catch (error) {
        next(error)
    }
})


export default NonSurgicalRouter;