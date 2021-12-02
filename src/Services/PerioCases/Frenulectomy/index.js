import express from "express";
import FrenulectomyModel from "./schema.js"
import createError from "http-errors"
import cloudinary from "../../utils/cloudinary.js"
import { CloudinaryStorage } from "multer-storage-cloudinary"
import multer from "multer";
const FrenulectomyRouter = express.Router();

const cloudinaryStorage = new CloudinaryStorage({
    cloudinary,
    params: { folder: "frenulectomy" },
});

const parser = multer({ storage: cloudinaryStorage })



FrenulectomyRouter.post('/', async (req, res, next) => {
    try {
        const newFrenulectomy = await new FrenulectomyModel(req.body)
        const { _id } = await newFrenulectomy.save()

        return res.status(201).send({ _id })

    } catch (error) {

        next(error)
        console.log(error)
    }
})


FrenulectomyRouter.post('/:id/img', parser.single("image"), async (req, res, next) => {
    try {
        console.log("this is file", req);

        if (req.file) {
            const update = { image: req.file.path }
            await FrenulectomyModel.findByIdAndUpdate(req.params.id, update, { returnOriginal: true })
            res.status(201).send("done")
        } else res.status(500).send("no image")


    } catch (error) {

        next(error)
        console.log(error)
    }
})

FrenulectomyRouter.get('/', async (req, res, next) => {
    try {
        const frenulectomy = await FrenulectomyModel.find()
        res.send(frenulectomy)
    } catch (error) {
        next(error)
    }
})
FrenulectomyRouter.get('/:_id', async (req, res, next) => {
    try {
        const frenulectomyId = req.params._id
        const frenulectomy = await FrenulectomyModel.findById(frenulectomyId)
        res.send(frenulectomy)
    } catch (error) {
        next(error)
    }
})
FrenulectomyRouter.put('/:_id', async (req, res, next) => {
    try {
        const frenulectomyId = req.params._id
        const modifiedFrenulectomy = await FrenulectomyModel.findByIdAndUpdate(frenulectomyId, req.body, {
            new: true
        })
        if (modifiedFrenulectomy) {
            res.send(modifiedFrenulectomy)
        } else {
            next(createError(404, `Article with id ${frenulectomyId} is modified`))
        }
    } catch (error) {

    }
})
FrenulectomyRouter.delete('/:_id', async (req, res, next) => {
    try {
        const frenulectomyId = req.params._id
        const deletedFrenulectomy = await FrenulectomyModel.findByIdAndDelete(frenulectomyId)
        if (deletedFrenulectomy) {
            res.status(204).send(`Article with id ${frenulectomyId} is deleted`)
        } else {
            next(createError(404, `Article with id ${frenulectomyId} not found!`))
        }

    } catch (error) {
        next(error)
    }
})


export default FrenulectomyRouter;

