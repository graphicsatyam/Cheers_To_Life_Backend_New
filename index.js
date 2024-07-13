import express from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import adminRoutes from './routes/admin-router.js';
import { UserRouter } from "./middlewares/user.js";
import connectDB from './db.js';

// Load environment variables from .env file
dotenv.config();

// Create an instance of the express application
const app = express();

// CORS configuration
const corsOptions = {
    origin: 'http://localhost:3000', // Change this to your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
};

app.use(cors(corsOptions));

// Middleware to parse JSON bodies
app.use(express.json());

// Parse cookies
app.use(cookieParser());

// Logging Middleware to capture request details
// app.use((req, res, next) => {
//     console.log(`Request Origin: ${req.headers.origin}`);
//     console.log(`Request Method: ${req.method}`);
//     console.log(`Request Headers: ${JSON.stringify(req.headers)}`);
//     next();
// });

// Routes

// Test route
app.get('/', (req, res) => {
    res.send('Hello Vipin Don');
});

// Use UserRouter for /auth paths
app.use('/auth', UserRouter);

// Use adminRoutes for /api/admin paths
app.use("/api/admin", adminRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start the server after successful DB connection
const startServer = async () => {
    try {
        await connectDB(); // Connect to the database
        const PORT = process.env.PORT || 3001;
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (err) {
        console.error('Failed to start server', err);
    }
};

startServer();
