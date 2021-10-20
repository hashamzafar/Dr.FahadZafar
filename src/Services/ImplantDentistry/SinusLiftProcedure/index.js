import express from "express";
import SinusLiftModel from "./schema.js"
import createError from "http-errors"

const SinusLiftRouter = express.Router();



SinusLiftRouter.get('/', async (req, res, next) => {
    try {
        const sinusLift = await SinusLiftModel.find()
        res.send(sinusLift)
    } catch (error) {
        next(error)
    }
})
SinusLiftRouter.post('/', async (req, res, next) => {
    try {
        const newSinusLift = new SinusLiftModel(req.body)
        const { _id } = await newSinusLift.save()
        res.status(201).send({ _id })

    } catch (error) {
        next(error)
    }
})

SinusLiftRouter.get('/:_id', async (req, res, next) => {
    try {
        const sinusLiftId = req.params._id
        const SinusLift = await SinusLiftModel.findById(sinusLiftId)
        res.send(SinusLift)
    } catch (error) {
        next(error)
    }
})
SinusLiftRouter.put('/:_id', async (req, res, next) => {
    try {
        const sinusLiftId = req.params._id
        const modifiedSinusLift = await SinusLiftModel.findByIdAndUpdate(sinusLiftId, req.body, {
            new: true
        })
        if (modifiedSinusLift) {
            res.send(modifiedSinusLift)
        } else {
            next(createError(404, `Article with id ${sinusLiftId} is modified`))
        }
    } catch (error) {

    }
})
SinusLiftRouter.delete('/:_id', async (req, res, next) => {
    try {
        const sinusLiftId = req.params._id
        const deletedSinusLift = await SinusLiftModel.findByIdAndDelete(sinusLiftId)
        if (deletedSinusLift) {
            res.status(204).send(`Article with id ${sinusLiftId} is deleted`)
        } else {
            next(createError(404, `Article with id ${sinusLiftId} not found!`))
        }

    } catch (error) {
        next(error)
    }
})


export default SinusLiftRouter;