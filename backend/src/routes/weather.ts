import { Router } from "express";
import { getWeather } from "../controllers/weatherController.ts";

const router = Router();

// POST route for fetching weather data
router.post("/", async (req, res, next) => {
  try {
    await getWeather(req, res, next); // Call the controller function
  } catch (error) {
    console.error("Error in weather route:", error);
    next(error); // Pass errors to the error-handling middleware
  }
});

export default router;