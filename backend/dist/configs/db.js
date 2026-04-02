import mongoose from "mongoose";
mongoose.set('debug', true);
// Function to connect to MongoDB
export const connectDB = async () => {
    try {
        const mongoURI = process.env.DATABASE_URL;
        await mongoose.connect(mongoURI, {
            // modern mongoose usually doesn't need these but keep for clarity
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 10000, // fail faster if unreachable
        });
        console.log("MongoDB connected");
    }
    catch (err) {
        console.error("MongoDB connection error:", err);
        process.exit(1); // stop the app if DB connection fails
    }
};
