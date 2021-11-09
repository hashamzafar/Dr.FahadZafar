import express from "express";
import LoginSchema from "./schema.js"


const LoginRouter = express.Router()


LoginRouter.post('/login', async (req, res, next) => {
    try {
        const newUser = new UserSchema(req.body)
        const { _id } = await newUser.save()
        res.send(_id)
    } catch (error) {
        next(error)
    }
})

LoginRouter.get('/login', async (req, res, next) => {
    try {
        const login = await LoginSchema.find()
        res.send(login)
    } catch (error) {
        next(error)
    }
})


export default LoginRouter