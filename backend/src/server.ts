import express from "express";
import cors from "cors";
import analyzeRoutes from "./routes/analyze";

const app = express();
const port = 5001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api", analyzeRoutes);

// Start Server
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});