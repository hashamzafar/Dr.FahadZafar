import express from "express";
import GumModel from "./schema.js"
import createError from "http-errors"

const GumPlasticRouter = express.Router();



GumPlasticRouter.get('/', async (req, res, next) => {
    try {
        const gumPlastic = await GumModel.find()
        res.send(gumPlastic)
    } catch (error) {
        next(error)
    }
})
GumPlasticRouter.post('/', async (req, res, next) => {
    try {
        const newGumPlastic = new GumModel(req.body)
        const { _id } = await newGumPlastic.save()
        res.status(201).send({ _id })

    } catch (error) {
        next(error)
    }
})

GumPlasticRouter.get('/:_id', async (req, res, next) => {
    try {
        const gumPlasticId = req.params._id
        const gumPlastic = await GumModel.findById(gumPlasticId)
        res.send(gumPlastic)
    } catch (error) {
        next(error)
    }
})
GumPlasticRouter.put('/:_id', async (req, res, next) => {
    try {
        const gumPlasticId = req.params._id
        const modifiedGumPlastic = await GumModel.findByIdAndUpdate(gumPlasticId, req.body, {
            new: true
        })
        if (modifiedGumPlastic) {
            res.send(modifiedGumPlastic)
        } else {
            next(createError(404, `Article with id ${gumPlasticId} is modified`))
        }
    } catch (error) {

    }
})
GumPlasticRouter.delete('/:_id', async (req, res, next) => {
    try {
        const gumPlasticId = req.params._id
        const deletedGumPlastic = await GumModel.findByIdAndDelete(gumPlasticId)
        if (deletedGumPlastic) {
            res.status(204).send(`Article with id ${gumPlasticId} is deleted`)
        } else {
            next(createError(404, `Article with id ${gumPlasticId} not found!`))
        }

    } catch (error) {
        next(error)
    }
})


export default GumPlasticRouter;

