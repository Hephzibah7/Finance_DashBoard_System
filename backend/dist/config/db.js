import mongoose from "mongoose";
const mongoURI = "mongodb://heph:heph@ac-znw7nb2-shard-00-00.qlfx7jh.mongodb.net:27017,ac-znw7nb2-shard-00-01.qlfx7jh.mongodb.net:27017,ac-znw7nb2-shard-00-02.qlfx7jh.mongodb.net:27017/?ssl=true&replicaSet=atlas-mulkxq-shard-0&authSource=admin&appName=Cluster0";
mongoose.set('debug', true);
// Function to connect to MongoDB
export const connectDB = async () => {
    try {
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
