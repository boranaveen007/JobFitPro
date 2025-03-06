import { Groq } from "groq-sdk";
import { ATSScore } from "../types/analysisInterface";

export class ATSAnalysisService {
  private groq: Groq;

  constructor(groqClient: Groq) {
    this.groq = groqClient;
  }

  async analyze(resumeText: string): Promise<ATSScore> {
    const prompt = `You are an ATS (Applicant Tracking System) expert specializing in resume optimization.

IMPORTANT: Return the analysis in the following strict JSON format WITHOUT ANY ADDITIONAL TEXT.

Analyze this resume for ATS compatibility:
    ${resumeText}

Return the analysis in the following JSON format:
{
  "overall": number between 0-100,
  "keywords": array of detected keywords,
  "missing_keywords": array of missing important keywords,
  "format_score": number between 0-100
}`;

    const completion = await this.groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama-3.2-90b-vision-preview",
      temperature: 0.3,
    });

    const result = JSON.parse(completion.choices[0]?.message?.content || "{}");

    return {
      overall: result.overall || 0,
      keywords: result.keywords || [],
      missingKeywords: result.missing_keywords || [],
      formatScore: result.format_score || 0,
    };
  }
}