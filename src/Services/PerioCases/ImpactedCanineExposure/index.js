import express from "express";
import CanineExposureModel from "./schema.js"
import createError from "http-errors"

const ImpactedCanineExposureRouter = express.Router();



ImpactedCanineExposureRouter.get('/', async (req, res, next) => {
    try {
        const canineExposure = await CanineExposureModel.find()
        res.send(canineExposure)
    } catch (error) {
        next(error)
    }
})
ImpactedCanineExposureRouter.post('/', async (req, res, next) => {
    try {
        const newCanineExposure = new CanineExposureModel(req.body)
        const { _id } = await newCanineExposure.save()
        res.status(201).send({ _id })

    } catch (error) {
        next(error)
    }
})

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