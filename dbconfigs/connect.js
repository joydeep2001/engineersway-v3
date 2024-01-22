import mongoose from "mongoose";

export default async function connectToDB() {
  try {
    await mongoose.connect(process.env.mongdb_con_str);
    console.log("connected successfully");
  } catch (err) {
    console.log("error" + err.message);
  }
}
