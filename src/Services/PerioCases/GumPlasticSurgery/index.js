import express from "express"
import GumModel from "./schema.js"
import createError from "http-errors"
import cloudinary from "../../utils/cloudinary.js"
// const { CloudinaryStorage } = "multer-storage-cloudinary"
import multer from "multer";
import msc from 'multer-storage-cloudinary'
const GumPlasticRouter = express.Router()

const cloudinaryStorage = new msc.CloudinaryStorage({
    cloudinary,
    params: { folder: "gum" },
});

const parser = multer({ storage: cloudinaryStorage })



GumPlasticRouter.post('/', async (req, res, next) => {
    try {
        const newGumPlastic = await new GumModel(req.body)
        const { _id } = await newGumPlastic.save()

        return res.status(201).send({ _id })

    } catch (error) {

        next(error)
        console.log(error)
    }
})


GumPlasticRouter.post('/:id/img', parser.single("image"), async (req, res, next) => {
    try {
        console.log("this is file", req);

        if (req.file) {
            const update = { image: req.file.path }
            await GumModel.findByIdAndUpdate(req.params.id, update, { returnOriginal: true })
            res.status(201).send("done")
        } else res.status(500).send("no image")


    } catch (error) {

        next(error)
        console.log(error)
    }
})




GumPlasticRouter.get('/', async (req, res, next) => {
    try {
        const gumPlastic = await GumModel.find()
        res.send(gumPlastic)
    } catch (error) {
        next(error)
    }
})


GumPlasticRouter.get('/:_id', async (req, res, next) => {
    try {
        const gumPlasticId = req.params._id
        const gumPlastic = await GumModel.findById(gumPlasticId)
        res.send(gumPlastic)
    } catch (error) {
        next(error)
    }
})
GumPlasticRouter.put('/:_id', async (req, res, next) => {
    try {
        const gumPlasticId = req.params._id
        const modifiedGumPlastic = await GumModel.findByIdAndUpdate(gumPlasticId, req.body, {
            new: true
        })
        if (modifiedGumPlastic) {
            res.send(modifiedGumPlastic)
        } else {
            next(createError(404, `Article with id ${gumPlasticId} is modified`))
        }
    } catch (error) {

    }
})
GumPlasticRouter.delete('/:_id', async (req, res, next) => {
    try {
        const gumPlasticId = req.params._id
        const deletedGumPlastic = await GumModel.findByIdAndDelete(gumPlasticId)
        if (deletedGumPlastic) {
            res.status(204).send(`Article with id ${gumPlasticId} is deleted`)
        } else {
            next(createError(404, `Article with id ${gumPlasticId} not found!`))
        }

    } catch (error) {
        next(error)
    }
})


export default GumPlasticRouter;

