import express from 'express'
import listEndpoints from "express-list-endpoints"
import mongoose from 'mongoose'
import CrownLengthRouter from './Services/PerioCases/CrownLengtheSurgery/index.js'
import { badRequestErrorHandler, catchAllErrorHandler, notFoundErrorHandler, unathorizedHandler, forbiddenHandler } from './errorHandlers.js'
import FrenulectomyRouter from './Services/PerioCases/Frenulectomy/index.js'
import GumPlasticRouter from "./Services/PerioCases/GumPlasticSurgery/index.js"
import ImpactedCanineExposureRouter from './Services/PerioCases/ImpactedCanineExposure/index.js'
import NonSurgicalRouter from './Services/PerioCases/NonSurgicalTherapy/index.js'
import PeriodontalRegenerRouter from './Services/PerioCases/PeriodontalRegenerSurgery/index.js'
import PocketEliminationRouter from "./Services/PerioCases/PocketEliminationSurgery/index.js"
import EstheticProblemRouter from "./Services/ImplantDentistry/EstheticProblemsImplants/index.js"
import ImplantSurgeryRouter from './Services/ImplantDentistry/ImplantSurgery/index.js'
import GuidedBoneRouter from './Services/ImplantDentistry/guidedBoneRegeneration/index.js'
import PeriImplantitisRouter from './Services/ImplantDentistry/PeriImplantitisTreatment/index.js'
import SinusLiftRouter from './Services/ImplantDentistry/SinusLiftProcedure/index.js'
import cors from "cors"
// import testRouter from './Services/test.js'
import UserRouter from "./Services/user/index.js"
const server = express()
const whiteList = [process.env.DEV]// COMING FROM ENV FILE

const corsOpts = {
    origin: function (origin, next) {
        console.log('ORIGIN --> ', origin)
        if (!origin || whiteList.indexOf(origin) !== -1) { // if received origin is in the whitelist I'm going to allow that request
            next(null, true)
        } else { // if it is not, I'm going to reject that request
            next(new Error(`Origin ${origin} not allowed!`))
        }
    }
}


server.use(cors(corsOpts))
// server.use(cors())
server.use(express.json({ limit: '500mb', extended: true }))

// Router perio
server.use("/perio/crown", CrownLengthRouter)
server.use("/perio/frenulectomy", FrenulectomyRouter)
server.use("/perio/gum", GumPlasticRouter)
server.use("/perio/canine", ImpactedCanineExposureRouter)
server.use("/perio/nonsurgical", NonSurgicalRouter)
server.use("/perio/periodontal", PeriodontalRegenerRouter)
server.use("/perio/pocketelimination", PocketEliminationRouter)

// server.use("/test", testRouter)
// Router implant
server.use("/implant/esthetic", EstheticProblemRouter)
server.use("/implant/guidedbone", GuidedBoneRouter)
server.use("/implant/implantsurgery", ImplantSurgeryRouter)
server.use("/implant/peri", PeriImplantitisRouter)
server.use("/implant/sinus", SinusLiftRouter)

// Router user
server.use("/user", UserRouter);
// error handler
server.use(unathorizedHandler)
server.use(forbiddenHandler)
server.use(badRequestErrorHandler)
server.use(notFoundErrorHandler)
server.use(catchAllErrorHandler)

const port = process.env.PORT || 3001
mongoose.connect(process.env.MONGO_URL_PERIO)
mongoose.connection.on("connected", () => {
    console.log('Successfully connected to mongo!')
    server.listen(port, () => {
        console.table(listEndpoints(server))
        console.log("Server is running on port ", port)
    })
})



mongoose.connection.on("error", err => {
    console.log("MONGO ERROR: ", err)
})