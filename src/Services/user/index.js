import express from "express"
import createHttpError from "http-errors"
import UserModel from "./userSchema.js"
import {
    JWTAuthenticate,
    verifyJWT,
    verifyRefreshAndGenerateTokens,
} from "../../auth/tools.js"
import { JWTAuthMiddleware } from "../../auth/token.js";
// const { imageUpload } from "../../Tools/multerTools.js";
// const { basicAuthMiddleware } from "../../Authorization/basic.js";


const UserRouter = express.Router();


// REGISTRATION
UserRouter.post("/account", async (req, res, next) => {
    try {
        const newUser = new UserModel(req.body);
        await newUser.save();
        res.status(200).send(newUser);
    } catch (error) {
        next(error);
    }
});

// LOGIN
UserRouter.post("/session", async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.checkCredentials(email, password);
        if (user) {
            const { accessToken, refreshToken } = await JWTAuthenticate(user);

            res.send({ accessToken, refreshToken });
        } else {
            next(createHttpError(401, "Credentials are not correct!"));
        }
    } catch (error) {
        next(error);
    }
});
// LOGOUT
UserRouter.delete("/session", JWTAuthMiddleware, async (req, res, next) => {
    try {
        console.log(req.user.refreshToken);
        req.user.refreshToken = undefined;
        await req.user.save();
        res.send("loged out");
    } catch (error) {
        next(error);
    }
});

// REFRESH
UserRouter.post(
    "/session/refresh",
    JWTAuthMiddleware,
    async (req, res, next) => {
        try {
            const currentRefreshToken = req.user.refreshToken;
            const { accessToken, refreshToken } =
                await verifyRefreshAndGenerateTokens(currentRefreshToken);
            res.send({ accessToken, refreshToken });
            req.user.refreshToken = undefined;
            await req.user.save();
            res.send("loged out");
        } catch (error) {
            next(error);
        }
    }
);

// Me
UserRouter.get("/me", JWTAuthMiddleware, async (req, res, next) => {
    try {
        res.send(req.user);
        console.log("coming from me ", req.user);
    } catch (error) {
        next(error);
    }
});

// USER
UserRouter.get("/:id", JWTAuthMiddleware, async (req, res, next) => {
    try {
        const user = await UserModel.findById(req.params.id);
        if (user) res.send(user);
        else
            next(createHttpError(404, `user with id ${req.params.id} is not found`));
    } catch (error) {
        next(error);
    }
});

UserRouter.get("/", JWTAuthMiddleware, async (req, res, next) => {
    try {
        // const filters = req.query;
        const { username, email } = req.query;
        if (username || email) {
            const filteredUsers = await UserModel.find({
                $or: [{ username }, { email }],
            });
            if (filteredUsers.length > 0) {
                res.send(filteredUsers);
            } else {
                res.send("User does not exist");
            }
        } else {
            const allUsers = await UserModel.find();
            res.send(allUsers);
        }
    } catch (error) {
        next(error);
    }
});

export default UserRouter;