import mongoose from "mongoose";
import { DB_NAME } from "../utils/constants.js";
const conectDB = async () => {
  try {
    const conectionInstance=await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
    console.log(`\n MOongoDB Conected !! DB Host ${conectionInstance.connection.host}`);
  } catch (error) {
    console.log(`Database Not Conected ${error} `);
    process.exit(1);
  }
};
export default conectDB;
