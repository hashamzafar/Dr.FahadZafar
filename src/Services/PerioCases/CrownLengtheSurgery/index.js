import express from "express";
import CrownModel from "./Schema.js"
import createError from "http-errors"
// import cloudinary from "../../utils/cloudinary.js"
// import multer from "multer"
// import { multer } from "../../utils/multer.js"
// const upload = ("../../../utils/multer.js")
// const upload = multer({})
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary"
import multer from "multer";
const CrownLengthRouter = express.Router();

export const storage = new CloudinaryStorage({
    cloudinary,
    params: { folder: "dr.fahadzafar" },
});


// CrownLengthRouter.post('/', multer({ storage }).single("image"), async (req, res) => {
//     try {
//         // const fileStr = new CrownModel(req.body.image)
//         // const uploadedResponse = await cloudinary.uploader.upload(fileStr, { upload_present: 'ml_default' })
//         console.log(uploadedResponse)

//         res.json({ msg: "image uploaded" })
//     } catch (error) {
//         console.error(error)
//         res.status(500).json({ err: "something went wrong" })
//     }
// })
// CrownLengthRouter.get('/image', async function (req, res) {
//     const { resources } = await cloudinary.search.expressions('folder: ml_default')
//         .sort_by('public_id', "desc")
//         .max_results(30)
//         .execute()
//     const publicIds = resources.map(file => file.public_id)
//     res.send(publicIds)
// })


CrownLengthRouter.post('/', multer({ storage }).single("image"), async (req, res, next) => {
    try {

        const newCrownLength = await new CrownModel(req.body)
        const { _id } = await newCrownLength.save()
        if (req.file) {
            const update = { image: req.file.path }
            await CrownModel.findByIdAndUpdate(_id, update, { returnOriginal: false })
        }
        res.status(201).send({ _id })
        console.log(req.file.path)
    } catch (error) {

        next(error)
        console.log(error)
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

