import express from "express";
import NonSurgicalModel from "./schema.js"
import createError from "http-errors"

const NonSurgicalRouter = express.Router();



NonSurgicalRouter.get('/', async (req, res, next) => {
    try {
        const nonSurgical = await NonSurgicalModel.find()
        res.send(nonSurgical)
    } catch (error) {
        next(error)
    }
})
NonSurgicalRouter.post('/', async (req, res, next) => {
    try {
        const newNonSurgical = new NonSurgicalModel(req.body)
        const { _id } = await newNonSurgical.save()
        res.status(201).send({ _id })

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