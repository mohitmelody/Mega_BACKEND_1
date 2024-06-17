
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
            app.on("error", (error) => {
                console.log("ERROR ", error)
                throw error
            })
        })
            .catch((error) => {
                console.log(error)
            })


    })






















































//for databse connection in index js by require 

// require('dotenv').config()
// const databaseConnection = import("./config/database.js")



// bad practise to write code of database connection in main execution file
// require(dotenv).config()
// ( async () => {
//  try{
// await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`,{})
// app.on("error",(error)=>{
//     console.log("ERROR ",error)
//     throw error
// })

// app.listen(process.env.PORT, (req,res) => {
//     //app.listen(` your app is running on ${process.env.PORT}`)
//     console.log(` your app is running on ${process.env.PORT}`)
// })
//  }catch(error){
//  console.error("ERROR :", error)
//  console.log(error)
//  console.error(error)
//  throw error

//  }
// }) ()

