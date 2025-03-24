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

// API для отримання даних про температуру
app.post("/api/weather", async (req, res) => {
  const { latitude, longitude } = req.body;

  if (typeof latitude !== "number" || typeof longitude !== "number") {
    return res.status(400).json({ error: "Invalid input. Latitude and longitude must be numbers." });
  }

  console.log(`Received coordinates: lat=${latitude}, lng=${longitude}`);

  // Функція для отримання погоди з API Open-Meteo
  const getWeatherData = async (lat: number, lng: number) => {
    try {
      
      // Формуємо URL з параметром current_weather=true
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current_weather=true`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch weather data");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching weather:", error);
      throw error;
    }
  };

  try {
    const weatherData = await getWeatherData(latitude, longitude);
    console.log("Weather data received from API:", weatherData);

    // Повертаємо лише дані про поточну погоду (temperature, windspeed тощо)
    res.json(weatherData);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
});

// Test data for blog posts
const filePath = path.resolve('src', 'data', 'posts.json');
const posts: Post[] = JSON.parse(fs.readFileSync(filePath, 'utf8'));

app.get("/api/posts", (_, res) => {
  res.json(posts.map((post) => ({ title: post.title, date: post.date, description: post.description })));
});
