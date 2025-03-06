import { Router, Request, Response } from 'express';
import { upload } from '../services/fileUploadService';
import { PDFService } from '../services/pdfService';
import { v4 as uuidv4 } from 'uuid';

const router = Router();
const pdfService = new PDFService();

router.post('/upload', upload.single('resume'), async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ error: 'No file uploaded' });
      return; // Ensure function exits
    }

    const text = await pdfService.extractText(req.file.path);
    const resumeId = uuidv4();

    // Cleanup the uploaded file after processing
    await pdfService.cleanup(req.file.path);

    res.json({
      id: resumeId,
      text: text
    });

  } catch (error) {
    console.error("File upload error:", error);
    res.status(500).json({ error: (error as Error).message });
  }
});

export default router;