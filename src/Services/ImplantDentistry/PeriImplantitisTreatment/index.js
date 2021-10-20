import express from "express";
import PeriImplantitisModel from "./schema.js"
import createError from "http-errors"

const PeriImplantitisRouter = express.Router();



PeriImplantitisRouter.get('/', async (req, res, next) => {
    try {
        const periImplantitis = await PeriImplantitisModel.find()
        res.send(periImplantitis)
    } catch (error) {
        next(error)
    }
})
PeriImplantitisRouter.post('/', async (req, res, next) => {
    try {
        const newPeriImplantitis = new PeriImplantitisModel(req.body)
        const { _id } = await newPeriImplantitis.save()
        res.status(201).send({ _id })

    } catch (error) {
        next(error)
    }
})

PeriImplantitisRouter.get('/:_id', async (req, res, next) => {
    try {
        const periImplantitisId = req.params._id
        const PeriImplantitis = await PeriImplantitisModel.findById(periImplantitisId)
        res.send(PeriImplantitis)
    } catch (error) {
        next(error)
    }
})
PeriImplantitisRouter.put('/:_id', async (req, res, next) => {
    try {
        const periImplantitisId = req.params._id
        const modifiedPeriImplantitis = await PeriImplantitisModel.findByIdAndUpdate(periImplantitisId, req.body, {
            new: true
        })
        if (modifiedPeriImplantitis) {
            res.send(modifiedPeriImplantitis)
        } else {
            next(createError(404, `Article with id ${periImplantitisId} is modified`))
        }
    } catch (error) {

    }
})
PeriImplantitisRouter.delete('/:_id', async (req, res, next) => {
    try {
        const periImplantitisId = req.params._id
        const deletedPeriImplantitis = await PeriImplantitisModel.findByIdAndDelete(periImplantitisId)
        if (deletedPeriImplantitis) {
            res.status(204).send(`Article with id ${periImplantitisId} is deleted`)
        } else {
            next(createError(404, `Article with id ${periImplantitisId} not found!`))
        }

    } catch (error) {
        next(error)
    }
})


export default PeriImplantitisRouter;