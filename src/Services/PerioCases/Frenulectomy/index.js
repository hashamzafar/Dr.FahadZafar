import express from "express";
import FrenulectomyModel from "./schema.js"
import createError from "http-errors"

const FrenulectomyRouter = express.Router();




FrenulectomyRouter.post('/', async (req, res, next) => {
    try {
        const newFrenulectomy = new FrenulectomyModel(req.body)
        const { _id } = await newFrenulectomy.save()
        res.status(201).send({ _id })

    } catch (error) {
        next(error)
    }
})
FrenulectomyRouter.get('/', async (req, res, next) => {
    try {
        const frenulectomy = await FrenulectomyModel.find()
        res.send(frenulectomy)
    } catch (error) {
        next(error)
    }
})
FrenulectomyRouter.get('/:_id', async (req, res, next) => {
    try {
        const frenulectomyId = req.params._id
        const frenulectomy = await FrenulectomyModel.findById(frenulectomyId)
        res.send(frenulectomy)
    } catch (error) {
        next(error)
    }
})
FrenulectomyRouter.put('/:_id', async (req, res, next) => {
    try {
        const frenulectomyId = req.params._id
        const modifiedFrenulectomy = await FrenulectomyModel.findByIdAndUpdate(frenulectomyId, req.body, {
            new: true
        })
        if (modifiedFrenulectomy) {
            res.send(modifiedFrenulectomy)
        } else {
            next(createError(404, `Article with id ${frenulectomyId} is modified`))
        }
    } catch (error) {

    }
})
FrenulectomyRouter.delete('/:_id', async (req, res, next) => {
    try {
        const frenulectomyId = req.params._id
        const deletedFrenulectomy = await FrenulectomyModel.findByIdAndDelete(frenulectomyId)
        if (deletedFrenulectomy) {
            res.status(204).send(`Article with id ${frenulectomyId} is deleted`)
        } else {
            next(createError(404, `Article with id ${frenulectomyId} not found!`))
        }

    } catch (error) {
        next(error)
    }
})


export default FrenulectomyRouter;

