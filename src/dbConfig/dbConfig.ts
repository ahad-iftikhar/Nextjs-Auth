import mongoose from "mongoose";

export async function connectDB() {
  try {
    mongoose.connect(process.env.MONGO_URL!); // ! is for preventing type safety, we are confirming it that it will return a string.
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("MongoDB connected!!!");
    });

    connection.on("error", (err) => {
      console.log(
        "MongoDB connection failed. Please make sure db is up and running: " +
          err
      );
      process.exit();
    });
  } catch (error) {
    console.log("Something went wrong while connectiong DB", error);
  }
}
