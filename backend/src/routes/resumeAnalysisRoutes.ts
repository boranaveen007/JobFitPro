import { Router, Request, Response } from 'express';
import { ReportGeneratorService } from '../services/reportGeneratorService';
import { ATSAnalysisService } from '../services/atsAnalysisService';
import { JobMatchService } from '../services/jobMatchAnalysisService';
import { ResumeStructureService } from '../services/resumeStructureAnalysisService';
import { Groq } from 'groq-sdk';

const router = Router();
const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

const reportGenerator = new ReportGeneratorService(
  new ATSAnalysisService(groq),
  new JobMatchService(groq),
  new ResumeStructureService(groq),
  groq
);

router.post('/analyze', async (req: Request, res: Response): Promise<void> => {
  try {
    const { resumeText, jobDescription } = req.body;
    if (!resumeText || !jobDescription) {
      res.status(400).json({ error: 'Both resumeText and jobDescription are required' });
      return; // ✅ Ensures the function exits after response
    }

    const report = await reportGenerator.generateReport(resumeText, jobDescription);
    console.log(report, 'Analysis complete');
    res.json(report); // ✅ No need to return explicitly
  } catch (error) {
    console.error('Analysis error:', error);
    res.status(500).json({ error: 'Failed to analyze resume', details: (error as Error).message });
  }
});

export default router;