import mongoose from "mongoose";
import {DB_NAME} from "../constants.js"



const connectDB = async()=>{
  try{
   const connectionInstance =  await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
    console.log("Database connection successful");
    console.log(`\n MongoDB  connection !! DB host:  ${connectionInstance.connection.host}`)
    
  }catch(error){
    console.log(error)
    console.log("database connection failed")
    process.exit(1)
  }

       
    }
 export default connectDB

 // require('dotenv').config()
// const connectDB = async()=>{
//     await mongoose.connect(`${process.env.MONDB_URL}$/{DB_NAME}`, {
//         useNewUrlParser: true,
//         useUnifiedToplology: true,
//     })
//     .then(()=>{
//         console.log("Database connection successful");
//     })
//         .catch(()=>{
//             console.log(err)
//             process.exit(1)
//         })
       
//     }








  
