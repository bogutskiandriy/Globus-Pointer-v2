import type { Request, Response, NextFunction } from "express";

export const getWeather = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { latitude, longitude } = req.body;

  if (typeof latitude !== "number" || typeof longitude !== "number") {
    res.status(400).json({ error: "Invalid input. Latitude and longitude must be numbers." });
    return;
  }

  // console.log(`Received coordinates: lat=${latitude}, lng=${longitude}`);

  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to fetch weather data: ${response.statusText}`);

    const data = await response.json();
    // console.log("Weather data received:", data);
    res.json(data);
  } catch (error) {
    console.error("Error fetching weather data:", error);
    next(error); // Pass errors to the error-handling middleware
  }
};
