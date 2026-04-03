import mongoose from "mongoose";



mongoose.set('debug', true);
// Function to connect to MongoDB
export const connectDB = async () => {
    try {

        const mongoURI =process.env.DATABASE_URL as string;


        await mongoose.connect(mongoURI, {
            // modern mongoose usually doesn't need these but keep for clarity
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 10000, // fail faster if unreachable
        } as mongoose.ConnectOptions);
        console.log("Connected to DB:", mongoose.connection.name);
    }
    catch (err) {
        console.error("MongoDB connection error:", err);
        process.exit(1); // stop the app if DB connection fails
    }
};




