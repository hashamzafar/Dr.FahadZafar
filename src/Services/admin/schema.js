import mongoose from 'mongoose';
import bcrypt from "bcrypt"
const { schema, model } = mongoose;

const LoginSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true }
})
LoginSchema.pre("save", async function (next) {
    const newLogin = this
    const plainPW = newUser.password
    if (newLogin.isModified(password)) {
        newLogin.password = await bcrypt.hash(plainPW, 11)
    }
    next()
})

loginSchema.methods.toJSON = function () {
    const loginDocument = this
    const loginObject = loginDocument.toObject()
    delete loginObject.password
    delete loginObject.__v
    return loginObject

}

loginSchema.static.checkCredentials = async function (email, password) {
    const user = await this.findOne({ email })
    if (user) {
        const isMatch = await bcrypt.compare(plainPW, user.password)
        if (isMatch)
            return user
        else return null

    } else return null
}

export default model("login", LoginSchema)

