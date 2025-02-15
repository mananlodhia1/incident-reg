import express from "express";
import dotenv from "dotenv";
import incidentRoutes from "./routes/incidentRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import errorHandler from "./middleware/errorHandler.js";

dotenv.config({});
const app = express();
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);

app.options("*", cors());

app.use(cookieParser());
app.use(express.json()); 

app.use("/api", incidentRoutes);
app.use("/auth", authRoutes);
app.use(errorHandler);

// Catch-all route for 404 errors
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Start the server
const PORT = process.env.PORT || 5001;
const HOST = "0.0.0.0";

app.listen(PORT, HOST, () => {
  console.log(`Server running on http://${HOST}:${PORT}`);
});
