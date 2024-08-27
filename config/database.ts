import mongoose from "mongoose";
let connected = false;
import { z } from "zod";
const MANGODB_URISchema = z.string();
const parseTest = MANGODB_URISchema.safeParse(process.env.MANGODB_URI);
if (!parseTest.success) {
  throw new Error(`wrong MANGODB_URI,  Error: ${parseTest.error}`);
}
const connectDB = async () => {
  mongoose.set("strictQuery", true);
  if (connected) {
    console.log("MongoDB is already connected...");
    return;
  }
  try {
    await mongoose.connect(process.env.MANGODB_URI as string);
    console.log("MongoDB connected.");
    connected = true;
  } catch (error) {
    console.log(error);
  }
};
export default connectDB;
