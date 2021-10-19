import express from "express";
import CrownModel from "./Schema.js"
import createError from "http-errors"

const CrownLengthRouter = express.Router();




CrownLengthRouter.post('/', async (req, res, next) => {
    try {
        const newCrownLength = new CrownModel(req.body)
        const { _id } = await newCrownLength.save()
        res.status(201).send({ _id })

    } catch (error) {
        next(error)
    }
})
CrownLengthRouter.get('/', async (req, res, next) => {
    try {
        const crownlength = await CrownModel.find()
        res.send(crownlength)
    } catch (error) {
        next(error)
    }
})
CrownLengthRouter.get('/:_id', async (req, res, next) => {
    try {
        const crownLengthId = req.params._id
        const crownlength = await CrownModel.findById(crownLengthId)
        res.send(crownlength)
    } catch (error) {
        next(error)
    }
})
CrownLengthRouter.put('/:_id', async (req, res, next) => {
    try {
        const crownLengthId = req.params._id
        const modifiedCrownLength = await CrownModel.findByIdAndUpdate(crownLengthId, req.body, {
            new: true
        })
        if (modifiedCrownLength) {
            res.send(modifiedCrownLength)
        } else {
            next(createError(404, `Article with id ${crownLengthId} is modified`))
        }
    } catch (error) {

    }
})
CrownLengthRouter.delete('/:_id', async (req, res, next) => {
    try {
        const crownLengthId = req.params._id
        const deletedCrownLength = await CrownModel.findByIdAndDelete(crownLengthId)
        if (deletedCrownLength) {
            res.status(204).send(`Article with id ${crownLengthId} is deleted`)
        } else {
            next(createError(404, `Article with id ${crownLengthId} not found!`))
        }

    } catch (error) {
        next(error)
    }
})


export default CrownLengthRouter;

