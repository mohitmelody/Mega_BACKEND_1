// Import necessary modules and configurations
import dotenv from 'dotenv'; // Load environment variables from .env file
import connectDB from './config/database.js'; // Database connection setup
import { app } from './app.js'; // Express app configuration

// Load environment variables from .env file
dotenv.config({
    path: './env',
});

// Establish a database connection
connectDB()
    .then(() => {
        // Start the Express app
        app.listen(process.env.PORT || 8000, () => {
            console.log(`App is listening on port ${process.env.PORT}`);
            // Uncomment the following lines if you want to handle errors explicitly
            // app.on("error", (error) => {
            //     console.log("ERROR ", error);
            //     throw error;
            // });
        });
    })
    .catch((error) => {
        console.log(error);
    });
