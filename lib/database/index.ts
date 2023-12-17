import mongoose from "mongoose";

const MONGODB_URI: string | undefined = process.env.MONGODB_URI;

let cached = (global as any).mongoose || { conn: null, promise: null };

const connectToDatabase = async () => {
  if (cached.conn) return cached.conn;

  if (!MONGODB_URI) throw new Error("MONGODB_URI is missing");

  cached.promise =
    cached.promise ||
    mongoose.connect(MONGODB_URI, {
      dbName: "event-ocean",
      bufferCommands: false,
    });

  cached.conn = await cached.promise;

  return cached.conn;
};

export default connectToDatabase;
