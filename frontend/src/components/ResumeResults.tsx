import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { MdExpandMore, MdExpandLess } from "react-icons/md";

type Props = {
  atsScore: {
    overall: number;
    keywords: string[];
    missingKeywords: string[];
    formatScore: number;
  };
  jobMatch: {
    score: number;
    matchingSkills: string[];
    missingSkills: string[];
    recommendations: string[];
    relevance: number;
  };
  structure: {
    completeness: number;
    sectionsPresent: string[];
    sectionsMissing: string[];
    suggestions: string[];
    readability: number;
  };
  detailedFeedback: {
    overallScore: number;
    summary: string;
    strengths: string[];
    weaknesses: string[];
    actionItems: string[];
    improvementPlan: string;
  };
};

const ResumeResults: React.FC<Props> = ({ atsScore, jobMatch, structure, detailedFeedback }) => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const renderScoreBadge = (score: number) => (
    <span className={`px-5 py-2 text-lg font-semibold rounded-md shadow-md ${score >= 80 ? "bg-green-600 text-white" : score >= 60 ? "bg-yellow-500 text-white" : "bg-red-500 text-white"}`}>
      {score}%
    </span>
  );

  const renderKeywords = (keywords: string[], color: string) => (
    <div className="flex flex-wrap gap-2 mt-2">
      {keywords.map((keyword, index) => (
        <span key={index} className={`px-3 py-1 rounded-md text-sm font-medium ${color}`}>
          {keyword}
        </span>
      ))}
    </div>
  );

  return (
    <div className="w-full max-w-6xl mx-auto bg-gray-100 text-gray-900 rounded-lg shadow-xl p-8 mt-8">
      
      {/* ATS Score */}
      <Card className="mb-4 bg-white text-gray-900 rounded-lg shadow-lg border border-gray-300">
        <CardHeader className="flex justify-between items-center px-6 py-4 cursor-pointer" onClick={() => toggleSection("atsScore")}>
          <div className="flex items-center gap-4">
            <CardTitle>ATS Score</CardTitle>
            {renderScoreBadge(atsScore.overall)}
          </div>
          {expandedSection === "atsScore" ? <MdExpandLess className="text-2xl" /> : <MdExpandMore className="text-2xl" />}
        </CardHeader>
        {expandedSection === "atsScore" && (
          <CardContent className="p-6">
            <h4 className="text-lg font-semibold text-gray-800">Matched Keywords</h4>
            {renderKeywords(atsScore.keywords, "bg-green-200 text-green-800")}
            <h4 className="mt-4 text-lg font-semibold text-gray-800">Missing Keywords</h4>
            {renderKeywords(atsScore.missingKeywords, "bg-red-200 text-red-800")}
          </CardContent>
        )}
      </Card>

      {/* Job Match */}
      <Card className="mb-4 bg-white text-gray-900 rounded-lg shadow-lg border border-gray-300">
        <CardHeader className="flex justify-between items-center px-6 py-4 cursor-pointer" onClick={() => toggleSection("jobMatch")}>
          <div className="flex items-center gap-4">
            <CardTitle>Job Match</CardTitle>
            {renderScoreBadge(jobMatch.score)}
          </div>
          {expandedSection === "jobMatch" ? <MdExpandLess className="text-2xl" /> : <MdExpandMore className="text-2xl" />}
        </CardHeader>
        {expandedSection === "jobMatch" && (
          <CardContent className="p-6">
            <h4 className="text-lg font-semibold text-gray-800">Matching Skills</h4>
            {renderKeywords(jobMatch.matchingSkills, "bg-green-200 text-green-800")}
            <h4 className="mt-4 text-lg font-semibold text-gray-800">Missing Skills</h4>
            {renderKeywords(jobMatch.missingSkills, "bg-red-200 text-red-800")}
          </CardContent>
        )}
      </Card>

      {/* Resume Structure */}
      <Card className="mb-4 bg-white text-gray-900 rounded-lg shadow-lg border border-gray-300">
        <CardHeader className="flex justify-between items-center px-6 py-4 cursor-pointer" onClick={() => toggleSection("structure")}>
          <div className="flex items-center gap-4">
            <CardTitle>Resume Structure</CardTitle>
            {renderScoreBadge(structure.completeness)}
          </div>
          {expandedSection === "structure" ? <MdExpandLess className="text-2xl" /> : <MdExpandMore className="text-2xl" />}
        </CardHeader>
        {expandedSection === "structure" && (
          <CardContent className="p-6">
            <h4 className="text-lg font-semibold text-gray-800">Present Sections</h4>
            {renderKeywords(structure.sectionsPresent, "bg-green-200 text-green-800")}
            <h4 className="mt-4 text-lg font-semibold text-gray-800">Missing Sections</h4>
            {renderKeywords(structure.sectionsMissing, "bg-red-200 text-red-800")}
          </CardContent>
        )}
      </Card>

      {/* Detailed Feedback */}
      <Card className="mb-4 bg-white text-gray-900 rounded-lg shadow-lg border border-gray-300">
        <CardHeader className="flex justify-between items-center px-6 py-4 cursor-pointer" onClick={() => toggleSection("detailedFeedback")}>
          <div className="flex items-center gap-4">
            <CardTitle>Detailed Feedback</CardTitle>
            {renderScoreBadge(detailedFeedback.overallScore)}
          </div>
          {expandedSection === "detailedFeedback" ? <MdExpandLess className="text-2xl" /> : <MdExpandMore className="text-2xl" />}
        </CardHeader>
        {expandedSection === "detailedFeedback" && (
          <CardContent className="p-6">
            <h4 className="text-lg font-semibold text-gray-800">Summary</h4>
            <p className="mt-2 text-gray-700">{detailedFeedback.summary}</p>
            <h4 className="mt-4 text-lg font-semibold text-gray-800">Strengths</h4>
            {renderKeywords(detailedFeedback.strengths, "bg-green-200 text-green-800")}
            <h4 className="mt-4 text-lg font-semibold text-gray-800">Areas for Improvement</h4>
            {renderKeywords(detailedFeedback.weaknesses, "bg-red-200 text-red-800")}
            <h4 className="mt-4 text-lg font-semibold text-gray-800">Action Items</h4>
            {renderKeywords(detailedFeedback.actionItems, "bg-yellow-200 text-yellow-800")}
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export default ResumeResults;