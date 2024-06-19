
import dotenv from 'dotenv'
import connectDB from './config/database.js'
import { app } from './app.js'
dotenv.config({
    path: './env'
})
connectDB()
    .then(() => {
        app.listen(process.env.PORT || 8000, () => {
            console.log(`app is listening on port ${process.env.PORT}`)
            // app.on("error", (error) => {
            //     console.log("ERROR ", error)
            //     throw error
            })
        }).catch((error) => {
            console.log(error)
        })





