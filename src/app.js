// Import necessary modules
import express from 'express'; // Express framework
import cors from 'cors'; // Cross-origin resource sharing middleware
import cookieParser from 'cookie-parser'; // Middleware for handling cookies

// Create an Express app
const app = express();

// Enable CORS with specified origin and credentials
app.use(cors({
    origin: process.env.CORS_ORIGIN, // Set the allowed origin (e.g., http://example.com)
    credentials: true, // Allow credentials (cookies, authorization headers) to be sent
}));

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Parse JSON requests (limiting request size to 16KB)
app.use(express.json({ limit: '16kb' }));

// Parse URL-encoded requests
app.use(express.urlencoded({ extended: true }));

// Parse cookies
app.use(cookieParser());

// Import user routes
import userRouter from "./routes/user.routes.js"; // Adjust the actual path as needed

// Declare user-related routes
app.use("/api/v1/users", userRouter); // Mount the userRouter under the specified path

// Example route: http://localhost:8080/api/v1/users/register
// Export the Express app
export { app };
