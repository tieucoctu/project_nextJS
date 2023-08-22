import mongoose, { ConnectOptions } from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    return;
  }
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}`, {
      dbName: "share_prompt",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions);

    isConnected = true;
  } catch (error) {
    console.log(error);
  }
};
