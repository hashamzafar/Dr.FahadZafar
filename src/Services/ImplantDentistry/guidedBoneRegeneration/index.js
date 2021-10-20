import express from "express";
import GuidedBoneModel from "./schema.js"
import createError from "http-errors"

const GuidedBoneRouter = express.Router();



GuidedBoneRouter.get('/', async (req, res, next) => {
    try {
        const guidedBone = await GuidedBoneModel.find()
        res.send(guidedBone)
    } catch (error) {
        next(error)
    }
})
GuidedBoneRouter.post('/', async (req, res, next) => {
    try {
        const newGuidedBone = new GuidedBoneModel(req.body)
        const { _id } = await newGuidedBone.save()
        res.status(201).send({ _id })

    } catch (error) {
        next(error)
    }
})

GuidedBoneRouter.get('/:_id', async (req, res, next) => {
    try {
        const guidedBoneId = req.params._id
        const GuidedBone = await GuidedBoneModel.findById(guidedBoneId)
        res.send(GuidedBone)
    } catch (error) {
        next(error)
    }
})
GuidedBoneRouter.put('/:_id', async (req, res, next) => {
    try {
        const guidedBoneId = req.params._id
        const modifiedGuidedBone = await GuidedBoneModel.findByIdAndUpdate(guidedBoneId, req.body, {
            new: true
        })
        if (modifiedGuidedBone) {
            res.send(modifiedGuidedBone)
        } else {
            next(createError(404, `Article with id ${guidedBoneId} is modified`))
        }
    } catch (error) {

    }
})
GuidedBoneRouter.delete('/:_id', async (req, res, next) => {
    try {
        const guidedBoneId = req.params._id
        const deletedGuidedBone = await GuidedBoneModel.findByIdAndDelete(guidedBoneId)
        if (deletedGuidedBone) {
            res.status(204).send(`Article with id ${guidedBoneId} is deleted`)
        } else {
            next(createError(404, `Article with id ${guidedBoneId} not found!`))
        }

    } catch (error) {
        next(error)
    }
})


export default GuidedBoneRouter;