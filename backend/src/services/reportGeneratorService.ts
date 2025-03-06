import { ATSAnalysisService } from "./atsAnalysisService";
import { JobMatchService } from "./jobMatchAnalysisService";
import { ResumeStructureService } from "./resumeStructureAnalysisService";
import { AnalysisReport } from "../types/analysisInterface";
import { Groq } from "groq-sdk";

export class ReportGeneratorService {
  private groq: Groq;

  constructor(
    private atsService: ATSAnalysisService,
    private jobMatchService: JobMatchService,
    private structureService: ResumeStructureService,
    groqClient: Groq
  ) {
    this.groq = groqClient;
  }

  async generateReport(
    resumeText: string,
    jobDescription: string
  ): Promise<any> {
    const [atsScore, jobMatch, structure] = await Promise.all([
      this.atsService.analyze(resumeText),
      this.jobMatchService.analyze(resumeText, jobDescription),
      this.structureService.analyze(resumeText),
    ]);

    const suggestions: string[] = [
      ...atsScore.missingKeywords.map((k: string) => `Add keyword: ${k}`),
      ...jobMatch.recommendations.map((rec: string) => rec),
      ...structure.suggestions.map((s: string) => s),
    ];

    const detailedFeedback = await this.generateDetailedFeedback(
      resumeText,
      jobDescription,
      { atsScore, jobMatch, structure, suggestions }
    );

    return {
      atsScore,
      jobMatch,
      structure,
      detailedFeedback
    };
  }

  private async generateDetailedFeedback(
    resumeText: string,
    jobDescription: string,
    analysis: Omit<AnalysisReport, "detailedFeedback">
  ) {
    const prompt = `You are a career coach. Analyze this resume against the job description.

RESUME:
${resumeText}

JOB DESCRIPTION:
${jobDescription}

ATS Score: ${analysis.atsScore.overall}/100
Job Match Score: ${analysis.jobMatch.score}/100
Structure Score: ${analysis.structure.completeness}/100

Return the analysis in this JSON format:
IMPORTANT: Return the analysis in the following strict JSON format WITHOUT ANY ADDITIONAL TEXT, response should start with { and end with } also make sure the whole response is in key value pairs based on the type of value, keep the value in double quotes. 
{
  "overall_score": number between 0-100,
  "summary": A 2-3 sentence overview,
  "strengths": Array of strengths,
  "weaknesses": Array of weaknesses,
  "action_items": Array of improvements,
  "improvement_plan": A detailed paragraph
}   
`;
    
    const completion = await this.groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama-3.2-90b-vision-preview",
      temperature: 0.3,
    });
    console.log('report gene service', completion.choices[0]?.message?.content, "Completion generated");
    const result = JSON.parse(completion.choices[0]?.message?.content || "{}");

    return {
      overallScore: result.overall_score || 0,
      summary: result.summary || "Analysis not available",
      strengths: result.strengths || [],
      weaknesses: result.weaknesses || [],
      actionItems: result.action_items || [],
      improvementPlan: result.improvement_plan || "",
    };
  }
}