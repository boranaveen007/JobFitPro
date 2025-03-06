import { Groq } from "groq-sdk";
import { JobMatch } from "../types/analysisInterface";

export class JobMatchService {
  private groq: Groq;

  constructor(groqClient: Groq) {
    this.groq = groqClient;
  }

  async analyze(resumeText: string, jobDescription: string): Promise<JobMatch> {
    const prompt = `You are an experienced recruiter. Compare the following resume and job description.

RESUME:
${resumeText}

JOB DESCRIPTION:
${jobDescription}

Return the analysis in the following JSON format:
{
  "score": number between 0-100,
  "matching_skills": array of detected matching skills,
  "missing_skills": array of missing skills,
  "recommendations": array of suggested improvements,
  "relevance": number between 0-100
}
IMPORTANT: Return the analysis in the following strict JSON format WITHOUT ANY ADDITIONAL TEXT  
`;

    console.log('Job match analysis prompt generated', prompt);
    const completion = await this.groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama-3.2-90b-vision-preview",
      temperature: 0.3,
    });
    console.log('results of job match analysis', completion.choices[0]?.message?.content), 'job match analysis completion generated';
    const result = JSON.parse(completion.choices[0]?.message?.content || "{}");

    return {
      score: result.score || 0,
      matchingSkills: result.matching_skills || [],
      missingSkills: result.missing_skills || [],
      recommendations: result.recommendations || [],
      relevance: result.relevance || 0,
    };
  }
}