import express from "express";
import PocketEliminationModel from "./schema.js"
import createError from "http-errors"

const PocketEliminationRouter = express.Router();



PocketEliminationRouter.get('/', async (req, res, next) => {
    try {
        const pocketElimination = await PocketEliminationModel.find()
        res.send(pocketElimination)
    } catch (error) {
        next(error)
    }
})
PocketEliminationRouter.post('/', async (req, res, next) => {
    try {
        const newPocketElimination = new PocketEliminationModel(req.body)
        const { _id } = await newPocketElimination.save()
        res.status(201).send({ _id })

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