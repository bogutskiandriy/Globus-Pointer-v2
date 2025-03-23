import express from "express";
import cors from "cors";
import fs from "fs";
import path from 'path';
import dotenv from "dotenv";

interface Post {
  title: string;
  date: string;
  description: string;
}

dotenv.config();

const app = express();
const PORT = process.env['PORT_BACKEND'] || 8000;
const BACKEND = process.env['BACKEND_URL'];

app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server start on ${BACKEND}:${PORT}`);
});

app.get("/", (_, res) => {
  res.send("Сервер працює!");
});

app.post("/api/weather", async (req, res) => {
  const { latitude, longitude } = req.body;

  if (typeof latitude !== "number" || typeof longitude !== "number") {
    return res.status(400).json({ error: "Invalid input. Latitude and longitude must be numbers." });
  }

  console.log(`Received coordinates: lat=${latitude}, lng=${longitude}`);

  // Імітація (test) отримання погоди (в майбутньому можна додати API)
  const weatherDataTest = {
    location: { latitude, longitude },
    temperature: Math.floor(Math.random() * 30), // Випадкова температура
    condition: "Sunny", // Просто тестове значення
  };

  res.json({ weatherDataTest });

  console.log("Weather data sent:", weatherDataTest);
  // Реалізація відправки запиту на реальний API погоди

});



// test data for blog posts

const filePath = path.resolve('src', 'data', 'posts.json');
const posts: Post[] = JSON.parse(fs.readFileSync(filePath, 'utf8'));

app.get("/api/posts", (_, res) => {
  res.json(posts.map((post) => ({ title: post.title, date: post.date, description: post.description })));
});


