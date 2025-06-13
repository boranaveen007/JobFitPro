import express, { Request, Response, Router } from "express";
import Groq from "groq-sdk";
import dotenv from "dotenv";

dotenv.config();

const router: Router = express.Router();
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// Ensure JSON parsing middleware is set in the main app, not in the router file
router.post("/analyze-resume", async (req: Request, res: Response): Promise<void> => {
  console.log("Incoming Request Body:", req.body); // ✅ Debugging Line

    const { resume, job_desc } = req.body;

    if (!resume || !job_desc) {
      res.status(400).json({ error: "Missing resume or job description" });
      return; // ✅ Ensures function exits after response
  }

    // Updated structured prompt
    const prompt = `
You are a senior career coach and resume expert with extensive experience in talent acquisition.

IMPORTANT: Return the analysis in the following strict JSON format WITHOUT ANY ADDITIONAL TEXT.

Analyze this resume based on the provided job description and return specific, structured feedback.

### RESUME:
${resume}

### JOB DESCRIPTION:
${job_desc}

### ANALYSIS METRICS:
- ATS Score: Based on keyword optimization, formatting, and section completeness (0-100)
- Job Match Score: Evaluates alignment of skills, experience, and qualifications (0-100)
- Structure Score: Assesses formatting, readability, and ATS optimization (0-100)

### KEY FINDINGS:
- **Detected Keywords**: List all keywords present in the resume that match the job description.
- **Missing Keywords**: List all critical keywords that should be included but are missing.
- **Matching Skills**: List all relevant skills present in the resume.
- **Missing Skills**: List all relevant skills from the job description that are missing.
- **Present Sections**: List all sections present (e.g., Work Experience, Skills, Education).
- **Missing Sections**: List any missing sections that should be added.

### RETURN FORMAT:
Ensure the output follows this strict JSON format:
{
  "overall_score": integer (0-100),
  "summary": "A concise 2-3 sentence overview of how well the resume aligns with the job.",
  "strengths": ["List of 3-5 strong aspects of the resume"],
  "weaknesses": ["List of 3-5 specific areas needing improvement"],
  "action_items": ["List of 4-6 detailed, actionable steps to improve the resume"],
  "improvement_plan": "A structured paragraph explaining how to enhance the resume for better job matching and ATS optimization."
}

### EXAMPLE OUTPUT:
{
  "overall_score": 30,
  "summary": "The resume lacks key details and is not optimized for the Python Developer role. ATS parsing may be ineffective due to missing keywords and sections.",
  "strengths": [
    "Mentions Python experience",
    "Concise and easy to scan"
  ],
  "weaknesses": [
    "No work experience details—unclear what projects or roles were held",
    "Missing essential Python-related skills like Django, Flask, and AWS",
    "No bullet points or structured sections for ATS optimization",
    "No education or certifications listed, making credibility unclear"
  ],
  "action_items": [
    "Add a 'Work Experience' section with job roles, company names, and project details",
    "Include specific technologies used (e.g., Django, Flask, AWS) in the Skills section",
    "Improve formatting by using bullet points for readability",
    "Include an 'Education' section with degree details",
    "Optimize for ATS by incorporating keywords directly from the job description"
  ],
  "improvement_plan": "To improve this resume, add structured sections like Work Experience, Skills, and Education. Incorporate relevant Python frameworks (Django, Flask) and cloud experience (AWS) to match the job description. Use bullet points to enhance readability and ensure ATS compliance by including relevant job keywords."
}
`;

    try {
      const completion = await groq.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        model: "llama3-70b-8192",
        temperature: 0.2 
    });

    let analysis = completion.choices[0]?.message?.content || "{}";

    try {
        analysis = JSON.parse(analysis);
    } catch (parseError) {
        console.error("Failed to parse AI response as JSON:", parseError);
        res.status(500).json({ error: "Invalid AI response format." });
        return;
    }

    res.json(analysis); // ✅ Directly send response

} catch (error) {
    console.error("Error calling Groq:", error);
    res.status(500).json({ error: "Failed to analyze resume." });
}
});

// ✅ Ensure the router is properly exported
export default router;