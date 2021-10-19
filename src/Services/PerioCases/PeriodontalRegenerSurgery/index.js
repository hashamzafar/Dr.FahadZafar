import express from "express";
import PeriodontalRegenerModel from "./schema.js"
import createError from "http-errors"

const PeriodontalRegenerRouter = express.Router();



PeriodontalRegenerRouter.get('/', async (req, res, next) => {
    try {
        const periodontalRegener = await PeriodontalRegenerModel.find()
        res.send(periodontalRegener)
    } catch (error) {
        next(error)
    }
})
PeriodontalRegenerRouter.post('/', async (req, res, next) => {
    try {
        const newPeriodontalRegener = new PeriodontalRegenerModel(req.body)
        const { _id } = await newPeriodontalRegener.save()
        res.status(201).send({ _id })

    } catch (error) {
        next(error)
    }
})

PeriodontalRegenerRouter.get('/:_id', async (req, res, next) => {
    try {
        const periodontalRegenerId = req.params._id
        const periodontalRegener = await PeriodontalRegenerModel.findById(periodontalRegenerId)
        res.send(periodontalRegener)
    } catch (error) {
        next(error)
    }
})
PeriodontalRegenerRouter.put('/:_id', async (req, res, next) => {
    try {
        const periodontalRegenerId = req.params._id
        const modifiedPeriodontalRegener = await PeriodontalRegenerModel.findByIdAndUpdate(periodontalRegenerId, req.body, {
            new: true
        })
        if (modifiedPeriodontalRegener) {
            res.send(modifiedPeriodontalRegener)
        } else {
            next(createError(404, `Article with id ${periodontalRegenerId} is modified`))
        }
    } catch (error) {

    }
})
PeriodontalRegenerRouter.delete('/:_id', async (req, res, next) => {
    try {
        const periodontalRegenerId = req.params._id
        const deletedPeriodontalRegener = await PeriodontalRegenerModel.findByIdAndDelete(periodontalRegenerId)
        if (deletedPeriodontalRegener) {
            res.status(204).send(`Article with id ${periodontalRegenerId} is deleted`)
        } else {
            next(createError(404, `Article with id ${periodontalRegenerId} not found!`))
        }

    } catch (error) {
        next(error)
    }
})


export default PeriodontalRegenerRouter;