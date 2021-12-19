import express from "express"
import PeriodontalRegenerModel from "./schema.js"
import createError from "http-errors"
import cloudinary from "../../utils/cloudinary.js"
// const { CloudinaryStorage } = "multer-storage-cloudinary"
import multer from "multer";
import msc from 'multer-storage-cloudinary'
const PeriodontalRegenerRouter = express.Router()

const cloudinaryStorage = new msc.CloudinaryStorage({
    cloudinary,
    params: { folder: "PeriodontalRegener" },
});

const parser = multer({ storage: cloudinaryStorage })



PeriodontalRegenerRouter.post('/', async (req, res, next) => {
    try {
        const newPeriodontalRegener = await new PeriodontalRegenerModel(req.body)
        const { _id } = await newPeriodontalRegener.save()

        return res.status(201).send({ _id })

    } catch (error) {

        next(error)
        console.log(error)
    }
})


PeriodontalRegenerRouter.post('/:id/img', parser.single("image"), async (req, res, next) => {
    try {
        console.log("this is file", req);

        if (req.file) {
            const update = { image: req.file.path }
            await PeriodontalRegenerModel.findByIdAndUpdate(req.params.id, update, { returnOriginal: true })
            res.status(201).send("done")
        } else res.status(500).send("no image")


    } catch (error) {

        next(error)
        console.log(error)
    }
})




PeriodontalRegenerRouter.get('/', async (req, res, next) => {
    try {
        const periodontalRegener = await PeriodontalRegenerModel.find()
        res.send(periodontalRegener)
    } catch (error) {
        next(error)
    }
})


PeriodontalRegenerRouter.get('/:_id', async (req, res, next) => {
    try {
        const periodontalRegenerId = req.params._id
        const periodontalRegener = await PeriodontalRegenerModel.findById(periodontalRegenerId)
        res.send(periodontalRegener)
    } catch (error) {
        next(error)
    }
})
PeriodontalRegenerRouter.put('/:_id', async (req, res, next) => {
    try {
        const periodontalRegenerId = req.params._id
        const modifiedPeriodontalRegener = await PeriodontalRegenerModel.findByIdAndUpdate(periodontalRegenerId, req.body, {
            new: true
        })
        if (modifiedPeriodontalRegener) {
            res.send(modifiedPeriodontalRegener)
        } else {
            next(createError(404, `Article with id ${periodontalRegenerId} is modified`))
        }
    } catch (error) {

    }
})
PeriodontalRegenerRouter.delete('/:_id', async (req, res, next) => {
    try {
        const periodontalRegenerId = req.params._id
        const deletedPeriodontalRegener = await PeriodontalRegenerModel.findByIdAndDelete(periodontalRegenerId)
        if (deletedPeriodontalRegener) {
            res.status(204).send(`Article with id ${periodontalRegenerId} is deleted`)
        } else {
            next(createError(404, `Article with id ${periodontalRegenerId} not found!`))
        }

    } catch (error) {
        next(error)
    }
})


export default PeriodontalRegenerRouter;