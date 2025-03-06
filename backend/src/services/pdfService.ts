import pdf from 'pdf-parse';
import fs from 'fs/promises';

export class PDFService {
  async extractText(filePath: string): Promise<string> {
    const dataBuffer = await fs.readFile(filePath);
    const data = await pdf(dataBuffer);
    return data.text;
  }

  async cleanup(filePath: string): Promise<void> {
    await fs.unlink(filePath);
  }
}