import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import { GroqService } from './services/groqService';
import uploadRoutes from './routes/fileUploadRoutes';
import analysisRoutes from './routes/resumeAnalysisRoutes';

const app = express();
const port = process.env.PORT || 3000;
const groqService = new GroqService();


// 🔹 Allow frontend requests
app.use(cors({
  origin: "*",  // Allow all origins (use specific domain in production)
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());
app.use('/api', uploadRoutes);
app.use('/api', analysisRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'healthy' });
});

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});