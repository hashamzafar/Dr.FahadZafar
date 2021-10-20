import express from "express";
import EstheticProblemModel from "./schema.js"
import createError from "http-errors"

const EstheticProblemRouter = express.Router();



EstheticProblemRouter.get('/', async (req, res, next) => {
    try {
        const estheticProblem = await EstheticProblemModel.find()
        res.send(estheticProblem)
    } catch (error) {
        next(error)
    }
})
EstheticProblemRouter.post('/', async (req, res, next) => {
    try {
        const newEstheticProblem = new EstheticProblemModel(req.body)
        const { _id } = await newEstheticProblem.save()
        res.status(201).send({ _id })

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