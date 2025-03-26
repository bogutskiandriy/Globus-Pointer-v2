import dotenv from "dotenv";
import app from "./app.ts";

dotenv.config();

const PORT = process.env['PORT_BACKEND'] || 8000;
const BACKEND = process.env['BACKEND_URL'];

app.listen(PORT, () => {
  console.log(`Server started on ${BACKEND}:${PORT}`);
});
