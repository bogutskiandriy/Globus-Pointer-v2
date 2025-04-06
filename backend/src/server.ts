import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "./app.ts"; // Ensure this path matches the actual location of app.ts

dotenv.config(); // Ensure dotenv is loaded first

const PORT = process.env['PORT_BACKEND'] || 8000;
const MONGODB_URI = process.env['MONGODB_URI'] || "mongodb://localhost:27017/GlobusPointer";

mongoose.connect(MONGODB_URI) // Connect to MongoDB
// Підключення до MongoDB
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    console.log(`MongoDB URI: ${MONGODB_URI}`);
  })
  .catch(err => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1); // Виходимо з процесу, якщо з'єднання з MongoDB не вдалося
  });

// Запуск сервера
app.listen(PORT, () => {
  console.log(`✅ Server started on port ${PORT}`);
}).on("error", (err) => {
  console.error("❌ Server startup error:", err);
});