import express from "express";
import PocketEliminationModel from "./schema.js"
import createError from "http-errors"
import cloudinary from "../../utils/cloudinary.js"
import { CloudinaryStorage } from "multer-storage-cloudinary"
import multer from "multer";

const PocketEliminationRouter = express.Router();


const cloudinaryStorage = new CloudinaryStorage({
    cloudinary,
    params: { folder: "nonsurgical" },
});

const parser = multer({ storage: cloudinaryStorage })



PocketEliminationRouter.post('/', async (req, res, next) => {
    try {
        const newPocketElimination = await new PocketEliminationModel(req.body)
        const { _id } = await newPocketElimination.save()

        return res.status(201).send({ _id })

    } catch (error) {

        next(error)
        console.log(error)
    }
})


PocketEliminationRouter.post('/:id/img', parser.single("image"), async (req, res, next) => {
    try {
        console.log("this is file", req);

        if (req.file) {
            const update = { image: req.file.path }
            await PocketEliminationModel.findByIdAndUpdate(req.params.id, update, { returnOriginal: true })
            res.status(201).send("done")
        } else res.status(500).send("no image")


    } catch (error) {

        next(error)
        console.log(error)
    }
})




PocketEliminationRouter.get('/', async (req, res, next) => {
    try {
        const pocketElimination = await PocketEliminationModel.find()
        res.send(pocketElimination)
    } catch (error) {
        next(error)
    }
})


PocketEliminationRouter.get('/:_id', async (req, res, next) => {
    try {
        const pocketEliminationId = req.params._id
        const pocketElimination = await PocketEliminationModel.findById(pocketEliminationId)
        res.send(pocketElimination)
    } catch (error) {
        next(error)
    }
})
PocketEliminationRouter.put('/:_id', async (req, res, next) => {
    try {
        const pocketEliminationId = req.params._id
        const modifiedPocketElimination = await PocketEliminationModel.findByIdAndUpdate(pocketEliminationId, req.body, {
            new: true
        })
        if (modifiedPocketElimination) {
            res.send(modifiedPocketElimination)
        } else {
            next(createError(404, `Article with id ${pocketEliminationId} is modified`))
        }
    } catch (error) {

    }
})
PocketEliminationRouter.delete('/:_id', async (req, res, next) => {
    try {
        const pocketEliminationId = req.params._id
        const deletedPocketElimination = await PocketEliminationModel.findByIdAndDelete(pocketEliminationId)
        if (deletedPocketElimination) {
            res.status(204).send(`Article with id ${pocketEliminationId} is deleted`)
        } else {
            next(createError(404, `Article with id ${pocketEliminationId} not found!`))
        }

    } catch (error) {
        next(error)
    }
})


export default PocketEliminationRouter;