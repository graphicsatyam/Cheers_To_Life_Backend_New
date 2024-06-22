// Importing necessary modules
import express from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import adminRoutes from './routes/admin-router.js';
import { UserRouter } from "./routes/user.js";
import connectDB from './db.js';  // Import the connectDB function

// Load environment variables from .env file
dotenv.config();

// Create an instance of the express application
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// CORS Configuration
const corsOptions = {
    origin: '*', // Allow requests only from this specific origin
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Specify allowed methods
    credentials: true, // Allow credentials (cookies, etc.)
    allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
    preflightContinue: false, // Let the server handle preflight requests
    optionsSuccessStatus: 204 // Respond with 204 for successful OPTIONS requests
};

app.use(cors(corsOptions)); // Apply CORS middleware
app.use(cookieParser()); // Parse cookies

// Routes
app.use('/auth', UserRouter); // Use UserRouter for /auth paths

// Test route
app.get('/', (req, res) => {
    res.send('Hello Vipin Don');
});

// Admin routes
app.use("/api/admin", adminRoutes); // Use adminRoutes for /api/admin paths

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start the server after successful DB connection
const startServer = async () => {
    try {
        await connectDB(); // Connect to the database
        const PORT = process.env.PORT || 8081;
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (err) {
        console.error('Failed to start server', err);
    }
};

startServer();
