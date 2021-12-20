import express from "express";
import EstheticProblemModel from "./schema.js"
import createError from "http-errors"
import cloudinary from "../../utils/cloudinary.js"

import multer from "multer";
import msc from 'multer-storage-cloudinary'

const EstheticProblemRouter = express.Router()
const cloudinaryStorage = new msc.CloudinaryStorage({
    cloudinary,
    params: { folder: "esthetic" },
});

const parser = multer({ storage: cloudinaryStorage })


EstheticProblemRouter.post('/', async (req, res, next) => {
    try {
        const newEstheticProblem = await new EstheticProblemModel(req.body)
        const { _id } = await newEstheticProblem.save()

        return res.status(201).send({ _id })

    } catch (error) {

        next(error)
        console.log(error)
    }
})


EstheticProblemRouter.post('/:id/img', parser.single("image"), async (req, res, next) => {
    try {
        console.log("this is file", req);

        if (req.file) {
            const update = { image: req.file.path }
            await EstheticProblemModel.findByIdAndUpdate(req.params.id, update, { returnOriginal: true })
            res.status(201).send("done")
        } else res.status(500).send("no image")


    } catch (error) {

        next(error)
        console.log(error)
    }
})

EstheticProblemRouter.get('/', async (req, res, next) => {
    try {
        const estheticProblem = await EstheticProblemModel.find()
        res.send(estheticProblem)
    } catch (error) {
        next(error)
    }
})


EstheticProblemRouter.get('/:_id', async (req, res, next) => {
    try {
        const estheticProblemId = req.params._id
        const EstheticProblem = await EstheticProblemModel.findById(estheticProblemId)
        res.send(EstheticProblem)
    } catch (error) {
        next(error)
    }
})
EstheticProblemRouter.put('/:_id', async (req, res, next) => {
    try {
        const estheticProblemId = req.params._id
        const modifiedEstheticProblem = await EstheticProblemModel.findByIdAndUpdate(estheticProblemId, req.body, {
            new: true
        })
        if (modifiedEstheticProblem) {
            res.send(modifiedEstheticProblem)
        } else {
            next(createError(404, `Article with id ${estheticProblemId} is modified`))
        }
    } catch (error) {

    }
})
EstheticProblemRouter.delete('/:_id', async (req, res, next) => {
    try {
        const estheticProblemId = req.params._id
        const deletedEstheticProblem = await EstheticProblemModel.findByIdAndDelete(estheticProblemId)
        if (deletedEstheticProblem) {
            res.status(204).send(`Article with id ${estheticProblemId} is deleted`)
        } else {
            next(createError(404, `Article with id ${estheticProblemId} not found!`))
        }

    } catch (error) {
        next(error)
    }
})


export default EstheticProblemRouter;