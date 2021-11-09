import createHttpError from "http.error"
import atob from "atob"
import LoginModel from "./LoginModel"

export const basicAuthMiddleware = (req, res, next) => {
    if (!req.header.authorization) {
        next(createHttpError(401, "Please provide credentials in Authorization header"))
    } else {
        const decodedCredentials = atob(req.header.authorization.split(" ")[1])
        const [email, password] = decodedCredentials.split(":")
        await LoginModel.checkCredentials(email, password)


        const user = await LoginModel.checkCredentials(email, password)
        if (user) {
            req.user = user
            next()

        } else {
            next(createHttpError(401, "credentials are not valid"))
        }
    }

}