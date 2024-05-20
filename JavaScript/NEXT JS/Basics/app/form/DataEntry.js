"use server";
import mongoose from "mongoose";
import Next_Credentials from "./model/schema";

const connect_to_database = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/NextJS");
    console.log("Connected to database");
  } catch (error) {
    console.error("Failed to connect to database:", error);
  }
};

export default async function DataEntry(data) {
  await connect_to_database();
  const { Username, Password } = data;

  const existingCredentials = await Next_Credentials.findOne({Username, Password,});
  if (existingCredentials) {
    console.log("Credentials already exist");
  } else {
    try {
      await Next_Credentials.create({ Username,Password });
      console.log("Credentials added successfully");
    } catch (error) {
      console.error("Failed to add credentials to the database:", error);
    }
  }
}
