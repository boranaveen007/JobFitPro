import { Groq } from "groq-sdk";
import { ResumeStructure } from "../types/analysisInterface";

export class ResumeStructureService {
  private groq: Groq;

  constructor(groqClient: Groq) {
    this.groq = groqClient;
  }

  async analyze(resumeText: string): Promise<ResumeStructure> {
    const prompt = `You are an expert resume structure analyzer focused on format and organization.

IMPORTANT: Return the analysis in the following strict JSON format WITHOUT ANY ADDITIONAL TEXT

Analyze the structure and formatting of this resume:
${resumeText}

Return the analysis in the following strict JSON format without any additional text:
{
  "completeness": number between 0-100 representing how complete the resume is,
  "sectionsPresent": array of strings containing detected resume sections,
  "sectionsMissing": array of strings containing important missing sections,
  "suggestions": array of strings containing formatting and structure improvements,
  "readability": number between 0-100 representing how readable the resume is
}

Example response:
{
  "completeness": 85,
  "sectionsPresent": ["Summary", "Work Experience", "Education", "Skills"],
  "sectionsMissing": ["Projects", "Certifications"],
  "suggestions": ["Add a projects section", "Make headers more prominent"],
  "readability": 90
}`;

    const completion = await this.groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama-3.2-90b-vision-preview", // Excellent for structure analysis
      temperature: 0.3,
    });

    const result = JSON.parse(completion.choices[0]?.message?.content || "{}");

    return {
      completeness: result.completeness || 0,
      sectionsPresent: result.sectionsPresent || [],
      sectionsMissing: result.sectionsMissing || [],
      suggestions: result.suggestions || [],
      readability: result.readability || 0,
    };
  }
}