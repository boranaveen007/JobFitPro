import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import uploadRoutes from './routes/fileUploadRoutes';
import analysisRoutes from './routes/resumeAnalysisRoutes';

const app = express();
// const port = process.env.PORT || 3000;

// 🔹 Allow frontend requests
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use('/api', uploadRoutes);
app.use('/api', analysisRoutes);
app.get('/health', (req, res) => {
  res.json({ status: 'healthy' });
});

// local deployment, uncomment below and comment out vercel deployment if using locally
// app.listen(port, () => {
//   console.log(`🚀 Server running on port ${port}`);
// });

// vercel deployment
// Export app for Vercel (instead of listening directly)
export default app;