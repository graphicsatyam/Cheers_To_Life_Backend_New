import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const DB = process.env.MONGODB_URI 

const connectDB = async () => {
    try {
        await mongoose.connect(DB, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
        });
        console.log('Connection is successful');
    } catch (err) {
        console.error('No connection', err);
        throw err;
    }
};

export default connectDB;
