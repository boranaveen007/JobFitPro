import React, { useState } from "react";
import ResumeUploader from "./ResumeUploader";
import ResumeResults from "./ResumeResults";

const ResumeAnalyzerApp = () => {
  const [resumeText, setResumeText] = useState<string>("");
  const [jobDescription, setJobDescription] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [analysisResult, setAnalysisResult] = useState<any | null>(null);

  const handleAnalysis = async (latestJobDescription?: string) => { // ✅ Make parameter optional
    const jobDescToUse = latestJobDescription ?? jobDescription; 
    // if (!resumeText || !jobDescription) {
    //   alert("Please upload a resume and enter a job description.");
    //   return;
    // }

    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:3000/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeText, jobDescription: jobDescToUse }),
      });

      const result = await response.json();
      setAnalysisResult(result);
    } catch (error) {
      console.error("Analysis failed:", error);
      alert("Failed to analyze resume.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-blue-900 text-white p-8 flex flex-col items-center">
      {/* Project Title */}
      {/* <h1 className="text-4xl font-bold text-center text-orange-400 mb-6">
        🚀 JobFitPro - Resume Analyzer
      </h1> */}

      {/* Uploader Section */}
      <ResumeUploader
        setResumeText={setResumeText}
        setIsLoading={setIsLoading}
        setJobDescription={setJobDescription}
        onAnalyze={handleAnalysis}
      />

      {/* Show Loading Indicator */}
      {/* {isLoading && <p className="text-lg text-orange-300 mt-4">Analyzing...</p>} */}

      {/* Show Results */}
      {analysisResult && <ResumeResults {...analysisResult} />}
    </div>
  );
};

export default ResumeAnalyzerApp;