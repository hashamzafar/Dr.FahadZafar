import express from 'express';
import listEndpoints from "express-list-endpoints"
import mongoose from 'mongoose'
import CrownLengthRouter from './Services/PerioCases/CrownLengtheSurgery/index.js';
import { badRequestErrorHandler, catchAllErrorHandler, notFoundErrorHandler, unathorizedHandler, forbiddenHandler } from './errorHandlers.js'
import FrenulectomyRouter from './Services/PerioCases/Frenulectomy/index.js'
import GumPlasticRouter from "./Services/PerioCases/GumPlasticSurgery/index.js"
import ImpactedCanineExposureRouter from './Services/PerioCases/ImpactedCanineExposure/index.js'
import NonSurgicalRouter from './Services/PerioCases/NonSurgicalTherapy/index.js'
import PeriodontalRegenerRouter from './Services/PerioCases/PeriodontalRegenerSurgery/index.js'
import PocketEliminationRouter from "./Services/PerioCases/PocketEliminationSurgery/index.js"
const server = express()

const port = process.env.PORT || 3001
server.use(express.json())

// Router perio
server.use("/perio/crown", CrownLengthRouter)
server.use("/perio/frenulectomy", FrenulectomyRouter)
server.use("/perio/gum", GumPlasticRouter)
server.use("/perio/canine", ImpactedCanineExposureRouter)
server.use("/perio/nonsurgical", NonSurgicalRouter)
server.use("/perio/periodontal", PeriodontalRegenerRouter)
server.use("/perio/pocketelimination", PocketEliminationRouter)

// error handler
server.use(unathorizedHandler)
server.use(forbiddenHandler)
server.use(badRequestErrorHandler)
server.use(notFoundErrorHandler)
server.use(catchAllErrorHandler)

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