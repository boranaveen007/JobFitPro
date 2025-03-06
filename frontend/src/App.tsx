import React, { useState } from "react";
import ResumeWorth from "./components/ResumeWorth";

function App() {
  const [resume, setResume] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any | null>(null);

  const handleAnalyze = async () => {
    if (!resume || !jobDescription) {
      alert("Please upload a resume and enter a job description.");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("resume", resume);
    formData.append("jobDescription", jobDescription);

    try {
      const response = await fetch("http://localhost:5001/api/analyze", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log("Analysis Result:", data);

      if (data.error) {
        setResult(null);
        alert("AI processing failed. Please try again.");
      } else {
        setResult(data);
      }
    } catch (error) {
      console.error("Error:", error);
      setResult(null);
      alert("Error analyzing resume.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-6 bg-gray-100">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
          🚀 JobFitPro - Resume Analyzer
        </h1>

        {/* Resume Upload */}
        <div className="mb-6">
          <label className="block text-lg font-semibold text-gray-700">
            Upload Resume (PDF)
          </label>
          <input
            type="file"
            accept=".pdf"
            className="mt-2 p-3 border border-gray-300 rounded-lg w-full"
            onChange={(e) => setResume(e.target.files ? e.target.files[0] : null)}
          />
        </div>

        {/* Job Description Input */}
        <div className="mb-6">
          <label className="block text-lg font-semibold text-gray-700">
            Paste Job Description
          </label>
          <textarea
            className="w-full mt-2 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            rows={5}
            placeholder="Paste job description here..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
          />
        </div>

        {/* Analyze Button */}
        <button
          className={`w-full py-3 px-4 text-white font-bold rounded-lg transition duration-300 ${
            loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
          }`}
          onClick={handleAnalyze}
          disabled={loading}
        >
          {loading ? "Analyzing..." : "Analyze Resume"}
        </button>

        {/* Display Results */}
        {result && result.atsScore && result.jobMatch && result.structure && result.detailedFeedback ? (
          <ResumeWorth
            atsScore={result.atsScore}
            jobMatch={result.jobMatch}
            structure={result.structure}
            detailedFeedback={result.detailedFeedback}
          />
        ) : null}
      </div>
    </div>
  );
}

export default App;