import mongoose from "mongoose";
import { DB_NAME } from "../constants.js"; // Assuming you have a constants file with the database name

// Establish a connection to MongoDB
const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URL}/${DB_NAME}`
    );
    console.log("Database connection successful");
    console.log(`MongoDB connection! Host: ${connectionInstance.connection.host}`);
  } catch (error) {
    console.error(error);
    console.log("Database connection failed");
    process.exit(1); // Exit the process if there's an error
  }
};

export default connectDB;


// setup database connection by require connection 
// require('dotenv').config()
// const connectDB = async()=>{
//     await mongoose.connect(`${process.env.MONDB_URL}$/{DB_NAME}`, {
//         useNewUrlParser: true,
//         useUnifiedToplology: true,
//     })
//     .then(()=>{
//         console.log("Database connection successful");
//     })
//      .catch(()=>{
//             console.log(err)
//             process.exit(1)
//         })
       
//  }








  
