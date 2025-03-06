import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { MdExpandMore } from "react-icons/md";

type Props = {
  atsScore: { overall: number; keywords: string[]; missingKeywords: string[] };
  jobMatch: { score: number; matchingSkills: string[]; missingSkills: string[] };
  structure: { completeness: number; sectionsPresent: string[]; sectionsMissing: string[] };
  detailedFeedback: { summary: string; strengths: string[]; weaknesses: string[]; actionItems: string[] };
};

const ResumeWorth: React.FC<Props> = ({ atsScore, jobMatch, structure, detailedFeedback }) => {
  return (
    <div className="container">
      <h1>📊 Resume Analysis Results</h1>

      {/* ATS Score */}
      <Card className="accordion">
        <CardHeader className="accordion-header">
          <CardTitle>🚀 ATS Score</CardTitle>
          <MdExpandMore className="text-xl" />
        </CardHeader>
        <CardContent className="accordion-content">
          <p className="text-lg">Overall Score: <span className="text-highlight font-bold">{atsScore.overall}%</span></p>
          <div className="skillTags">
            <p className="text-sm text-highlight font-semibold">✔ Keywords Found:</p>
            {atsScore.keywords.map((kw, idx) => (
              <span key={idx} className="skillTag">{kw}</span>
            ))}
          </div>
          <div className="skillTags">
            <p className="text-sm text-red-400 font-semibold">❌ Missing Keywords:</p>
            {atsScore.missingKeywords.map((kw, idx) => (
              <span key={idx} className="skillTag bg-red-500">{kw}</span>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Job Match */}
      <Card className="accordion">
        <CardHeader className="accordion-header">
          <CardTitle>🛠 Job Match</CardTitle>
          <MdExpandMore className="text-xl" />
        </CardHeader>
        <CardContent className="accordion-content">
          <p className="text-lg">Match Score: <span className="text-highlight font-bold">{jobMatch.score}%</span></p>
          <div className="skillTags">
            <p className="text-sm text-highlight font-semibold">✔ Matching Skills:</p>
            {jobMatch.matchingSkills.map((skill, idx) => (
              <span key={idx} className="skillTag">{skill}</span>
            ))}
          </div>
          <div className="skillTags">
            <p className="text-sm text-red-400 font-semibold">❌ Missing Skills:</p>
            {jobMatch.missingSkills.map((skill, idx) => (
              <span key={idx} className="skillTag bg-red-500">{skill}</span>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Resume Structure */}
      <Card className="accordion">
        <CardHeader className="accordion-header">
          <CardTitle>📑 Resume Structure</CardTitle>
          <MdExpandMore className="text-xl" />
        </CardHeader>
        <CardContent className="accordion-content">
          <p className="text-lg">Structure Score: <span className="text-highlight font-bold">{structure.completeness}%</span></p>
          <div className="skillTags">
            <p className="text-sm text-highlight font-semibold">✔ Present Sections:</p>
            {structure.sectionsPresent.map((sec, idx) => (
              <span key={idx} className="skillTag">{sec}</span>
            ))}
          </div>
          <div className="skillTags">
            <p className="text-sm text-red-400 font-semibold">❌ Missing Sections:</p>
            {structure.sectionsMissing.map((sec, idx) => (
              <span key={idx} className="skillTag bg-red-500">{sec}</span>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Detailed Feedback */}
      <Card className="accordion">
        <CardHeader className="accordion-header">
          <CardTitle>📌 Detailed Feedback</CardTitle>
          <MdExpandMore className="text-xl" />
        </CardHeader>
        <CardContent className="accordion-content">
          <p className="text-lg text-highlight font-semibold">{detailedFeedback.summary}</p>
          <ul className="list-disc list-inside text-textLight mt-4">
            {detailedFeedback.strengths.map((strength, idx) => (
              <li key={idx} className="text-green-400">{strength}</li>
            ))}
          </ul>
          <ul className="list-disc list-inside text-red-400 mt-4">
            {detailedFeedback.weaknesses.map((weakness, idx) => (
              <li key={idx}>{weakness}</li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResumeWorth;